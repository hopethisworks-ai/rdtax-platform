import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";
import { logAudit } from "@/lib/audit";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error, session } = await requireAuth("ANALYST", req);
  if (error) return error;

  try {
    const { id } = await params;
    const body = await req.json();
    const {
      c280cElection,
      method: preferredMethod,
      c280cRate: submittedC280cRate,
      applyScCredit = false,
      acknowledgedFundedResearchContractorIds = [] as string[],
    } = body;

    const engagement = await prisma.engagement.findUnique({
      where: { id },
      include: {
        ruleVersion: true,
        legalEntity: true,
        projects: {
          where: { qualified: true, fundedResearch: false },
          include: {
            employees: { where: { excluded: false } },
            supplies: { where: { qualified: true } },
            contractors: true, // include all so funded-research gate can check every contractor
          },
        },
      },
    });
    if (!engagement) return NextResponse.json({ error: "Engagement not found" }, { status: 404 });
    if (!engagement.ruleVersion) return NextResponse.json({ error: "No rule version assigned" }, { status: 400 });

    // Gate: funded-research contractors marked qualified must be explicitly acknowledged
    const unacknowledgedFr = engagement.projects.flatMap(p =>
      p.contractors.filter(c =>
        c.fundedResearchFlag && c.qualifiedFlag && !c.excludedReason &&
        !acknowledgedFundedResearchContractorIds.includes(c.id)
      )
    );
    if (unacknowledgedFr.length > 0) {
      return NextResponse.json({
        error: `${unacknowledgedFr.length} funded-research contractor(s) require analyst acknowledgment before calculation: ${unacknowledgedFr.map(c => c.vendorName).join(", ")}`,
      }, { status: 400 });
    }

    const rates = engagement.ruleVersion.creditRates as {
      scRate: number; ascRate: number; regularRate: number;
      ascFallbackRate: number; contractorQrePct: number;
    };

    // Sum QREs from qualified business components
    let totalWageQre = 0;
    let totalSupplyQre = 0;
    let totalContractorQre = 0;

    for (const project of engagement.projects) {
      for (const emp of project.employees) {
        totalWageQre += Number(emp.qreAmount ?? (Number(emp.compensation) * Number(emp.qualifiedActivityPct)));
      }
      for (const sup of project.supplies) {
        totalSupplyQre += Number(sup.amount);
      }
      for (const con of project.contractors.filter(c => c.qualifiedFlag && !c.excludedReason)) {
        totalContractorQre += Number(con.qualifiedAmount ?? (Number(con.amount) * rates.contractorQrePct));
      }
    }

    const totalQre = totalWageQre + totalSupplyQre + totalContractorQre;

    // Get prior year QREs for ASC method — load all available, then extract specific years
    const priorYearQres = await prisma.priorYearQre.findMany({
      where: { engagementId: id },
      orderBy: { taxYear: "desc" },
    });

    const taxYear = engagement.taxYear;
    // ASC requires the 3 immediately preceding years (IRC §41(c)(5))
    const prior3 = [1, 2, 3].map((offset) => {
      const match = priorYearQres.find((q) => q.taxYear === taxYear - offset);
      return match ? Number(match.qreAmount) : 0;
    });
    // Fallback applies when NONE of the 3 required years have data
    const ascFallbackUsed = prior3.every((v) => v === 0);
    // Average always divided by 3; missing years count as 0 (IRC-consistent)
    const avgPrior3YearQre = prior3.reduce((s, v) => s + v, 0) / 3;

    // ASC Method: 14% x (currentQRE - 50% of avg prior 3yr QRE)
    const ascBase = round2(avgPrior3YearQre * 0.5);
    const ascIncrementalQre = Math.max(0, totalQre - ascBase);
    const ascCredit = round2(ascIncrementalQre * rates.ascRate);

    const ascFallbackCredit = round2(totalQre * rates.ascFallbackRate);
    const finalAscCredit = ascFallbackUsed ? ascFallbackCredit : ascCredit;

    // Regular Method: requires fixed base percentage
    // Using simplified calculation - actual requires gross receipts history
    const grossReceipts = await prisma.grossReceiptsHistory.findMany({
      where: { engagementId: id },
      orderBy: { taxYear: "desc" },
      take: 4,
    });

    let regularCredit = 0;
    let regularBase = 0;
    let fixedBasePct = 0;

    if (grossReceipts.length >= 4 && !prior3.every((v) => v === 0)) {
      const avgGrossReceipts = grossReceipts.reduce((s, g) => s + Number(g.amount), 0) / 4;
      const avgHistoricalQre = prior3.reduce((s, v) => s + v, 0) / 3;
      // Fixed-base % = historical QRE / historical GR, floored at 3% and capped at 16% (IRC §41(c)(1))
      fixedBasePct = Math.min(0.16, Math.max(0.03, avgHistoricalQre / avgGrossReceipts));
      regularBase = round2(fixedBasePct * avgGrossReceipts);
      // Minimum base = 50% of current QRE (IRC §41(c)(2))
      const minBase = round2(totalQre * 0.5);
      if (regularBase < minBase) regularBase = minBase;
      const regularIncrementalQre = Math.max(0, totalQre - regularBase);
      regularCredit = round2(regularIncrementalQre * rates.regularRate);
    }

    // Pick better method
    const recommendedMethod = finalAscCredit >= regularCredit ? "ASC" : "REGULAR";
    const chosenMethod = preferredMethod ?? recommendedMethod;
    const grossCredit = chosenMethod === "ASC" ? finalAscCredit : regularCredit;

    // 280C election: use submitted rate (pass-through) or default to 21% (C-corp)
    // Rate is validated: must be between 0.01 and 0.50 when election is made
    const c280cRateDecimal = c280cElection
      ? Math.min(0.50, Math.max(0.01, Number(submittedC280cRate ?? 0.21)))
      : 0.21;
    const reducedCredit = c280cElection ? round2(grossCredit * (1 - c280cRateDecimal)) : grossCredit;

    // SC State Credit (§12-6-3375): only applies when analyst toggled SC on for this run.
    // Read the stored QRE % and liability from the legal entity via raw query.
    type ScRow = { stateSourceQrePct: string | null; stateTaxLiabilityAfterOtherCredits: string | null };
    const scRows = applyScCredit && engagement.legalEntityId
      ? await prisma.$queryRaw<ScRow[]>`
          SELECT "stateSourceQrePct"::text, "stateTaxLiabilityAfterOtherCredits"::text
          FROM "LegalEntity" WHERE id = ${engagement.legalEntityId}
        `
      : [];
    const stateSourceQrePct = applyScCredit ? Number(scRows[0]?.stateSourceQrePct ?? 0) : 0;
    const stateTaxLiability = applyScCredit ? Number(scRows[0]?.stateTaxLiabilityAfterOtherCredits ?? 0) : 0;
    const scQre = Math.round(totalQre * stateSourceQrePct * 100) / 100;
    const scGrossCredit = Math.round(scQre * rates.scRate * 100) / 100;
    const scLiabilityLimit = Math.round(stateTaxLiability * 0.5 * 100) / 100;
    const scAllowedCredit = Math.min(scGrossCredit, scLiabilityLimit);
    const scCarryforward = Math.round((scGrossCredit - scAllowedCredit) * 100) / 100;

    // Payroll offset eligibility (startups with <$5M revenue)
    const latestGrossReceipts = grossReceipts[0];
    const payrollOffsetEligible = latestGrossReceipts
      ? Number(latestGrossReceipts.amount) < 5000000
      : false;

    // Save calculation
    const calculation = await prisma.calculation.create({
      data: {
        engagementId: id,
        taxYear: engagement.taxYear,
        ruleVersionId: engagement.ruleVersionId as string,
        method: chosenMethod as "ASC" | "REGULAR",
        inputSnapshot: {
          totalWageQre, totalSupplyQre, totalContractorQre,
          projectCount: engagement.projects.length,
          priorYearQres: [1, 2, 3].map((offset) => ({ taxYear: taxYear - offset, amount: prior3[offset - 1] })),
        },
        assumptionsSnapshot: {
          rates, c280cElection, c280cRateDecimal, preferredMethod, ascFallbackUsed,
          avgPrior3YearQre, fixedBasePct,
          acknowledgedFundedResearchContractorIds,
        },
        resultsSnapshot: {
          ascCredit: finalAscCredit, regularCredit, grossCredit, reducedCredit,
          scGrossCredit, recommendedMethod,
        },
        totalWageQre,
        totalSupplyQre,
        totalContractorQre,
        totalQre,
        ascCredit: finalAscCredit,
        ascBase,
        ascPrior3YearAvgQre: avgPrior3YearQre,
        ascFallbackUsed,
        regularCredit,
        regularBase,
        fixedBasePct,
        recommendedMethod: recommendedMethod as "ASC" | "REGULAR",
        methodRationale: `${recommendedMethod} method yields higher credit ($${Math.round(finalAscCredit).toLocaleString()} ASC vs $${Math.round(regularCredit).toLocaleString()} Regular)`,
        c280cElectionMade: c280cElection ?? false,
        grossCredit,
        reducedCredit,
        payrollOffsetEligible,
        payrollOffsetElected: false,
        payrollOffsetAmount: 0,
        carryforwardReduction: 0,
        consolidatedQre: totalQre,
        scQre,
        scGrossCredit,
        scLiabilityLimit,
        scAllowedCredit,
        scCarryforward,
        isConsolidated: false,
        runBy: (session!.user as { id?: string }).id ?? "system",
      },
    });

    // Update engagement status to CALCULATION
    await prisma.engagement.update({
      where: { id },
      data: { status: "CALCULATION" },
    });

    await logAudit({
      userId: (session!.user as { id?: string }).id,
      engagementId: id,
      action: "RUN_CALCULATION",
      entityType: "Calculation",
      entityId: calculation.id,
      metadata: { method: chosenMethod, totalQre, grossCredit, reducedCredit },
    });

    return NextResponse.json({
      success: true, calculationId: calculation.id, calculation,
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "error" }, { status: 500 });
  }
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
