import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";
import { logAudit } from "@/lib/audit";
import { runCalculation } from "@/engine/index";
import type { CalculationInput, EntityInput, TaxRuleConfig } from "@/engine/types";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error, session } = await requireAuth("ANALYST", req);
  if (error) return error;

  try {
    const { id } = await params;
    const body = await req.json();
    const {
      c280cElection = false,
      method: preferredMethod,
      applyScCredit = false,
      acknowledgedFundedResearchContractorIds = [] as string[],
      electPayrollOffset = false,
      payrollOffsetEligibilityInputs,
    } = body;

    const engagement = await prisma.engagement.findUnique({
      where: { id },
      include: {
        ruleVersion: true,
        legalEntity: true,
        projects: {
          where: { qualified: true, fundedResearch: false },
          include: {
            employees: true,
            supplies: true,
            contractors: true,
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

    // ── Build TaxRuleConfig from the stored rule version ──
    const rateConfig = engagement.ruleVersion.creditRates as Record<string, number>;
    const carryConfig = engagement.ruleVersion.carryforwardRules as Record<string, number>;
    const payrollConfig = engagement.ruleVersion.c280cPresentationLogic as Record<string, unknown>;

    const ruleConfig: TaxRuleConfig = {
      ruleVersionId: engagement.ruleVersion.id,
      taxYear: engagement.taxYear,
      formVersion: engagement.ruleVersion.formVersion,
      creditRates: {
        ascRate: rateConfig.ascRate ?? 0.14,
        ascFallbackRate: rateConfig.ascFallbackRate ?? 0.06,
        regularRate: rateConfig.regularRate ?? 0.20,
        contractorQrePct: rateConfig.contractorQrePct ?? 0.65,
        scRate: rateConfig.scRate ?? 0.05,
      },
      carryforwardRules: {
        federalYears: carryConfig.federalYears ?? 20,
        scYears: carryConfig.scYears ?? 10,
      },
      payrollOffsetRules: {
        cap: (engagement.ruleVersion.payrollOffsetCap as unknown as number) ?? 500000,
        qualifiedSmallBusinessMaxGrossReceipts: 5000000,
        maxYearsSinceOrganized: 5,
      },
      c280cRules: {
        regularTaxRate: (payrollConfig as Record<string, number>).regularTaxRate ?? 0.21,
      },
      ascFallbackLogic: "six_percent",
    };

    // ── Load prior-year QRE and gross receipts ──
    const priorQre = await prisma.priorYearQre.findMany({
      where: { engagementId: id },
    });
    const grossReceipts = await prisma.grossReceiptsHistory.findMany({
      where: { engagementId: id },
    });

    // ── Load SC data from legal entity if applicable ──
    type ScRow = { stateSourceQrePct: string | null; stateTaxLiabilityAfterOtherCredits: string | null };
    const scRows = applyScCredit && engagement.legalEntityId
      ? await prisma.$queryRaw<ScRow[]>`
          SELECT "stateSourceQrePct"::text, "stateTaxLiabilityAfterOtherCredits"::text
          FROM "LegalEntity" WHERE id = ${engagement.legalEntityId}
        `
      : [];
    const stateSourceQrePct = applyScCredit ? Number(scRows[0]?.stateSourceQrePct ?? 0) : 0;
    const stateTaxLiability = applyScCredit ? Number(scRows[0]?.stateTaxLiabilityAfterOtherCredits ?? 0) : 0;

    // ── Build EntityInput from projects ──
    // This engagement route flattens all projects into a single entity
    const allEmployees = engagement.projects.flatMap(p =>
      p.employees.map((e) => ({
        id: e.id,
        name: e.name,
        compensation: Number(e.compensation),
        bonus: Number(e.bonus ?? 0),
        bonusIncluded: e.bonusIncluded,
        qualifiedActivityPct: Number(e.qualifiedActivityPct),
        excluded: e.excluded,
      }))
    );
    const allSupplies = engagement.projects.flatMap(p =>
      p.supplies.map((s) => ({
        id: s.id,
        amount: Number(s.amount),
        isDepreciableProperty: s.isDepreciableProperty,
        isLandOrImprovement: s.isLandOrImprovement,
        isOverheadItem: s.isOverheadItem,
        qualified: s.qualified,
        excluded: s.qualificationStatus === "excluded",
      }))
    );
    const allContractors = engagement.projects.flatMap(p =>
      p.contractors.filter(c => !c.excludedReason).map((c) => ({
        id: c.id,
        amount: Number(c.amount),
        usBasedFlag: c.usBasedFlag,
        qualifiedFlag: c.qualifiedFlag,
        substantialRightsRetained: c.substantialRightsRetained,
        successContingentPayment: c.successContingentPayment,
        economicRiskBorne: c.economicRiskBorne,
        contractReviewComplete: c.contractReviewComplete,
        fundedResearchFlag: c.fundedResearchFlag,
        excluded: false,
      }))
    );

    const entityId = engagement.legalEntityId ?? engagement.id;
    const entityName = engagement.legalEntity?.name ?? "Primary Entity";

    const entities: EntityInput[] = [{
      entityId,
      entityName,
      employees: allEmployees,
      supplies: allSupplies,
      contractors: allContractors,
      priorYearQre: priorQre.map((p) => ({
        taxYear: p.taxYear,
        amount: Number(p.qreAmount),
      })),
      grossReceipts: grossReceipts.map((g) => ({
        taxYear: g.taxYear,
        amount: Number(g.amount),
      })),
      stateSourceQrePct,
      stateTaxLiabilityAfterOtherCredits: stateTaxLiability,
    }];

    // ── Determine payroll offset eligibility ──
    const latestGrossReceipts = grossReceipts.sort((a, b) => b.taxYear - a.taxYear)[0];
    const defaultPayrollInputs = {
      isQualifiedSmallBusiness: latestGrossReceipts
        ? Number(latestGrossReceipts.amount) < 5000000
        : false,
      grossReceiptsCurrentYear: latestGrossReceipts
        ? Number(latestGrossReceipts.amount)
        : 0,
      yearsOrganized: payrollOffsetEligibilityInputs?.yearsOrganized ?? 10,
      priorCarryforward: payrollOffsetEligibilityInputs?.priorCarryforward ?? 0,
    };

    // ── Build CalculationInput and run the engine ──
    const calcInput: CalculationInput = {
      engagementId: id,
      taxYear: engagement.taxYear,
      ruleConfig,
      entities,
      isControlledGroup: false,
      method: preferredMethod ?? "RECOMMEND",
      elect280c: c280cElection,
      electPayrollOffset,
      payrollOffsetEligibilityInputs: payrollOffsetEligibilityInputs ?? defaultPayrollInputs,
      assumptions: {
        acknowledgedFundedResearchContractorIds,
        applyScCredit,
      },
    };

    const result = runCalculation(calcInput);

    // ── Persist to DB ──
    const calculation = await prisma.calculation.create({
      data: {
        engagementId: id,
        taxYear: engagement.taxYear,
        ruleVersionId: engagement.ruleVersionId as string,
        method: result.method,
        inputSnapshot: JSON.parse(JSON.stringify(calcInput)),
        assumptionsSnapshot: JSON.parse(JSON.stringify(calcInput.assumptions)),
        resultsSnapshot: JSON.parse(JSON.stringify(result)),
        totalWageQre: result.entityResults.reduce((s, e) => s + e.totalWageQre, 0),
        totalSupplyQre: result.entityResults.reduce((s, e) => s + e.totalSupplyQre, 0),
        totalContractorQre: result.entityResults.reduce((s, e) => s + e.totalContractorQre, 0),
        totalQre: result.consolidatedQre,
        ascCredit: result.consolidatedFederalCredit.ascResult,
        ascBase: result.entityResults[0]?.ascBase ?? 0,
        ascPrior3YearAvgQre: result.entityResults[0]?.ascPrior3YearAvgQre ?? 0,
        ascFallbackUsed: result.entityResults.some((e) => e.ascFallbackUsed),
        regularCredit: result.consolidatedFederalCredit.regularResult,
        regularBase: result.entityResults[0]?.regularBase ?? 0,
        fixedBasePct: result.entityResults[0]?.fixedBasePct ?? 0,
        recommendedMethod: result.consolidatedFederalCredit.recommendedMethod,
        methodRationale: result.consolidatedFederalCredit.methodRationale,
        c280cElectionMade: result.consolidatedFederalCredit.c280cElected,
        grossCredit: result.consolidatedFederalCredit.grossCredit,
        reducedCredit: result.consolidatedFederalCredit.reducedCredit,
        payrollOffsetEligible: result.payrollOffset.eligible,
        payrollOffsetElected: result.payrollOffset.elected,
        payrollOffsetAmount: result.payrollOffset.amount,
        carryforwardReduction: result.payrollOffset.carryforwardReduction,
        scQre: result.entityResults.reduce((s, e) => s + e.scQre, 0),
        scGrossCredit: result.consolidatedScCredit.grossCredit,
        scLiabilityLimit: result.entityResults[0]?.scLiabilityLimit ?? 0,
        scAllowedCredit: result.consolidatedScCredit.allowedCredit,
        scCarryforward: result.consolidatedScCredit.carryforward,
        isConsolidated: false,
        consolidatedQre: result.consolidatedQre,
        calculationNotes: result.warnings.join("\n"),
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
      metadata: {
        method: result.method,
        totalQre: result.consolidatedQre,
        grossCredit: result.consolidatedFederalCredit.grossCredit,
        reducedCredit: result.consolidatedFederalCredit.reducedCredit,
      },
    });

    return NextResponse.json({
      success: true,
      calculationId: calculation.id,
      calculation,
      result,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Calculation failed" },
      { status: 500 }
    );
  }
}
