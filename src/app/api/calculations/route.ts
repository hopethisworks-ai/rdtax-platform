import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireAuth } from "@/lib/rbac";
import { runCalculation } from "@/engine/index";
import type { CalculationInput, EntityInput, TaxRuleConfig } from "@/engine/types";

const RunCalculationSchema = z.object({
  engagementId: z.string(),
  taxYear: z.number().int(),
  ruleVersionId: z.string(),
  method: z.enum(["ASC", "REGULAR", "RECOMMEND"]).default("RECOMMEND"),
  elect280c: z.boolean().default(false),
  electPayrollOffset: z.boolean().default(false),
  payrollOffsetEligibilityInputs: z.object({
    isQualifiedSmallBusiness: z.boolean(),
    grossReceiptsCurrentYear: z.number(),
    yearsOrganized: z.number(),
    priorCarryforward: z.number().default(0),
  }),
  assumptions: z.record(z.unknown()).default({}),
});

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth("ANALYST", req);
  if (error) return error;
  const body = await req.json();
  const parsed = RunCalculationSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const d = parsed.data;

  // Load rule version
  const ruleVersion = await prisma.taxRuleVersion.findUnique({ where: { id: d.ruleVersionId } });
  if (!ruleVersion) return NextResponse.json({ error: "Rule version not found" }, { status: 404 });

  // Load engagement and all entity data
  const engagement = await prisma.engagement.findUnique({
    where: { id: d.engagementId },
    include: {
      client: { include: { legalEntities: {
        where: { taxYear: d.taxYear },
        include: { employees: true, supplies: true, contractors: true },
      }}},
    },
  });
  if (!engagement) return NextResponse.json({ error: "Engagement not found" }, { status: 404 });

  // Load prior-year QRE and gross receipts
  const priorQre = await prisma.priorYearQre.findMany({ where: { engagementId: d.engagementId } });
  const grossReceipts = await prisma.grossReceiptsHistory.findMany({ where: { engagementId: d.engagementId } });

  const rateConfig = ruleVersion.creditRates as Record<string, number>;
  const carryConfig = ruleVersion.carryforwardRules as Record<string, number>;
  const payrollConfig = ruleVersion.c280cPresentationLogic as Record<string, unknown>;

  const ruleConfig: TaxRuleConfig = {
    ruleVersionId: ruleVersion.id,
    taxYear: d.taxYear,
    formVersion: ruleVersion.formVersion,
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
      cap: (ruleVersion.payrollOffsetCap as unknown as number) ?? 500000,
      qualifiedSmallBusinessMaxGrossReceipts: 5000000,
      maxYearsSinceOrganized: 5,
    },
    c280cRules: {
      regularTaxRate: (payrollConfig as Record<string, number>).regularTaxRate ?? 0.21,
    },
    ascFallbackLogic: "six_percent",
  };

  const entities: EntityInput[] = engagement.client.legalEntities.map((entity) => ({
    entityId: entity.id,
    entityName: entity.name,
    employees: entity.employees.map((e) => ({
      id: e.id,
      name: e.name,
      compensation: Number(e.compensation),
      bonus: Number(e.bonus ?? 0),
      bonusIncluded: e.bonusIncluded,
      qualifiedActivityPct: Number(e.qualifiedActivityPct),
      excluded: e.excluded,
    })),
    supplies: entity.supplies.map((s) => ({
      id: s.id,
      amount: Number(s.amount),
      isDepreciableProperty: s.isDepreciableProperty,
      isLandOrImprovement: s.isLandOrImprovement,
      isOverheadItem: s.isOverheadItem,
      qualified: s.qualified,
      excluded: s.qualificationStatus === "excluded",
    })),
    contractors: entity.contractors.map((c) => ({
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
    })),
    priorYearQre: priorQre
      .filter((p) => !p.entityId || p.entityId === entity.id)
      .map((p) => ({ taxYear: p.taxYear, amount: Number(p.qreAmount) })),
    grossReceipts: grossReceipts
      .filter((g) => !g.entityId || g.entityId === entity.id)
      .map((g) => ({ taxYear: g.taxYear, amount: Number(g.amount) })),
    stateSourceQrePct: entity.stateSourceQrePct !== null ? Number(entity.stateSourceQrePct) : 1.0,
    stateTaxLiabilityAfterOtherCredits: entity.stateTaxLiabilityAfterOtherCredits !== null ? Number(entity.stateTaxLiabilityAfterOtherCredits) : 0,
  }));

  const calcInput: CalculationInput = {
    engagementId: d.engagementId,
    taxYear: d.taxYear,
    ruleConfig,
    entities,
    isControlledGroup: entities.length > 1,
    method: d.method,
    elect280c: d.elect280c,
    electPayrollOffset: d.electPayrollOffset,
    payrollOffsetEligibilityInputs: d.payrollOffsetEligibilityInputs,
    assumptions: d.assumptions,
  };

  const result = runCalculation(calcInput);

  // Persist to DB
  const calc = await prisma.calculation.create({
    data: {
      engagementId: d.engagementId,
      taxYear: d.taxYear,
      ruleVersionId: d.ruleVersionId,
      method: result.method,
      // JSON round-trip gives `any`, which satisfies Prisma's InputJsonValue.
      inputSnapshot: JSON.parse(JSON.stringify(calcInput)),
      assumptionsSnapshot: JSON.parse(JSON.stringify(d.assumptions)),
      resultsSnapshot: JSON.parse(JSON.stringify(result)),
      totalWageQre: result.entityResults.reduce((s, e) => s + e.totalWageQre, 0),
      totalSupplyQre: result.entityResults.reduce((s, e) => s + e.totalSupplyQre, 0),
      totalContractorQre: result.entityResults.reduce((s, e) => s + e.totalContractorQre, 0),
      totalQre: result.consolidatedQre,
      ascCredit: result.consolidatedFederalCredit.ascResult,
      ascFallbackUsed: result.entityResults.some((e) => e.ascFallbackUsed),
      regularCredit: result.consolidatedFederalCredit.regularResult,
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
      scAllowedCredit: result.consolidatedScCredit.allowedCredit,
      scCarryforward: result.consolidatedScCredit.carryforward,
      isConsolidated: result.entityResults.length > 1,
      consolidatedQre: result.consolidatedQre,
      calculationNotes: result.warnings.join("\n"),
      runBy: (session!.user as { id?: string }).id ?? "system",
    },
  });

  await logAudit({
    userId: (session!.user as { id?: string }).id,
    engagementId: d.engagementId,
    action: "RUN_CALCULATION",
    entityType: "Calculation",
    entityId: calc.id,
    metadata: { taxYear: d.taxYear, ruleVersionId: d.ruleVersionId, method: result.method },
  });

  return NextResponse.json({ calculation: calc, result }, { status: 201 });
}
