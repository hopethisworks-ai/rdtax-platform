/**
 * Credit Calculation Engine – Orchestrator
 *
 * This is the single entry point for running a credit calculation.
 * It is completely decoupled from Next.js, the database, and any UI layer.
 * The engine accepts a typed CalculationInput and returns a CalculationResult.
 *
 * Design principles:
 *  - No side effects (no DB writes, no HTTP calls)
 *  - Fully reproducible: same inputs + ruleConfig → same outputs
 *  - Tested independently in __tests__/engine/
 */

import type {
  CalculationInput,
  CalculationResult,
  EntityCalculationResult,
  EntityInput,
  TaxRuleConfig,
} from "./types";
import { calculateWageQre } from "./wage-qre";
import { calculateSupplyQre } from "./supply-qre";
import { calculateContractorQre } from "./contractor-qre";
import {
  calculateAsc,
  calculateRegularCredit,
  buildFederalResult,
  calculatePayrollOffset,
} from "./federal-credit";
import { calculateScCredit } from "./sc-credit";

export function runCalculation(input: CalculationInput): CalculationResult {
  const warnings: string[] = [];
  const errors: string[] = [];

  const entityResults: EntityCalculationResult[] = input.entities.map(
    (entity) => calculateEntity(entity, input.ruleConfig, input)
  );

  // Controlled-group consolidation: sum all entity totals
  let consolidatedQre = round2(
    entityResults.reduce((s, e) => s + e.totalQre, 0)
  );

  // For controlled groups, prior-year QRE is also aggregated across all entities
  const consolidatedPriorQre = mergeAndSumPriorQre(input.entities);
  const consolidatedGrossReceipts = mergeAndSumGrossReceipts(input.entities);

  // Use the first entity's fixedBasePct for consolidated regular-credit calc,
  // or require separate entity-level if not consolidated
  const consolidatedFixedBasePct = input.entities[0]?.fixedBasePct;

  const ascResult = calculateAsc(
    consolidatedQre,
    consolidatedPriorQre,
    input.ruleConfig
  );
  const regularResult = calculateRegularCredit(
    consolidatedQre,
    consolidatedPriorQre,
    consolidatedGrossReceipts,
    consolidatedFixedBasePct,
    input.ruleConfig
  );

  const consolidatedFederal = buildFederalResult(
    ascResult,
    regularResult,
    input.elect280c,
    input.method,
    input.ruleConfig
  );

  const consolidatedScQre = round2(
    entityResults.reduce((s, e) => s + e.scQre, 0)
  );
  const scLiability = round2(
    input.entities.reduce(
      (s, e) => s + (e.stateTaxLiabilityAfterOtherCredits ?? 0),
      0
    )
  );

  const { scYears } = input.ruleConfig.carryforwardRules;
  const scGross = round2(consolidatedScQre * input.ruleConfig.creditRates.scRate);
  const scLimit = round2(scLiability * 0.5);
  const scAllowed = Math.min(scGross, scLimit);
  const scCarryforward = round2(scGross - scAllowed);
  if (scCarryforward > 0) {
    warnings.push(
      `Consolidated SC credit of $${scCarryforward} carried forward (max ${scYears} years).`
    );
  }

  const payrollOffset = calculatePayrollOffset(
    consolidatedFederal.grossCredit,
    input.electPayrollOffset,
    input.payrollOffsetEligibilityInputs,
    input.ruleConfig
  );
  warnings.push(...payrollOffset.warnings);

  // Collect entity-level warnings and surface them in the consolidated result
  for (const er of entityResults) {
    for (const w of er.warnings) {
      warnings.push(`[${er.entityName}] ${w}`);
    }
  }

  return {
    engagementId: input.engagementId,
    taxYear: input.taxYear,
    ruleVersionId: input.ruleConfig.ruleVersionId,
    method: consolidatedFederal.recommendedMethod,
    entityResults,
    consolidatedQre,
    consolidatedFederalCredit: consolidatedFederal,
    consolidatedScCredit: {
      grossCredit: scGross,
      allowedCredit: round2(scAllowed),
      carryforward: scCarryforward,
    },
    payrollOffset,
    warnings,
    errors,
    inputSnapshot: input,
    assumptionsSnapshot: input.assumptions,
  };
}

function calculateEntity(
  entity: EntityInput,
  ruleConfig: TaxRuleConfig,
  input: CalculationInput
): EntityCalculationResult {
  const {
    details: wageDetails,
    totalWageQre,
    warnings: wageWarnings,
  } = calculateWageQre(entity.employees);

  const {
    details: supplyDetails,
    totalSupplyQre,
    warnings: supplyWarnings,
  } = calculateSupplyQre(entity.supplies);

  const {
    details: contractorDetails,
    totalContractorQre,
    warnings: contractorWarnings,
  } = calculateContractorQre(
    entity.contractors,
    ruleConfig.creditRates.contractorQrePct
  );

  const totalQre = round2(totalWageQre + totalSupplyQre + totalContractorQre);

  const ascResult = calculateAsc(totalQre, entity.priorYearQre, ruleConfig);
  const regularResult = calculateRegularCredit(
    totalQre,
    entity.priorYearQre,
    entity.grossReceipts,
    entity.fixedBasePct,
    ruleConfig
  );

  const scResult = calculateScCredit(
    totalQre,
    entity.stateSourceQrePct ?? 0,
    entity.stateTaxLiabilityAfterOtherCredits ?? 0,
    ruleConfig
  );

  const entityWarnings = [
    ...wageWarnings,
    ...supplyWarnings,
    ...contractorWarnings,
    ...scResult.warnings,
  ];

  return {
    entityId: entity.entityId,
    entityName: entity.entityName,
    wageQreDetails: wageDetails,
    supplyQreDetails: supplyDetails,
    contractorQreDetails: contractorDetails,
    totalWageQre,
    totalSupplyQre,
    totalContractorQre,
    totalQre,
    warnings: entityWarnings,
    ascCredit: ascResult.credit,
    ascBase: ascResult.base,
    ascPrior3YearAvgQre: ascResult.prior3YearAvg,
    ascFallbackUsed: ascResult.fallbackUsed,
    regularCredit: regularResult.credit,
    regularBase: regularResult.base,
    fixedBasePct: regularResult.fixedBasePct,
    scQre: scResult.scQre,
    scGrossCredit: scResult.scGrossCredit,
    scLiabilityLimit: scResult.scLiabilityLimit,
    scAllowedCredit: scResult.scAllowedCredit,
    scCarryforward: scResult.scCarryforward,
  };
}

function mergeAndSumPriorQre(entities: EntityInput[]) {
  const map = new Map<number, number>();
  for (const e of entities) {
    for (const p of e.priorYearQre) {
      map.set(p.taxYear, (map.get(p.taxYear) ?? 0) + p.amount);
    }
  }
  return Array.from(map.entries()).map(([taxYear, amount]) => ({
    taxYear,
    amount,
  }));
}

function mergeAndSumGrossReceipts(entities: EntityInput[]) {
  const map = new Map<number, number>();
  for (const e of entities) {
    for (const g of e.grossReceipts) {
      map.set(g.taxYear, (map.get(g.taxYear) ?? 0) + g.amount);
    }
  }
  return Array.from(map.entries()).map(([taxYear, amount]) => ({
    taxYear,
    amount,
  }));
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// Re-export types and sub-calculators for independent testing
export * from "./types";
export { calculateWageQre } from "./wage-qre";
export { calculateSupplyQre } from "./supply-qre";
export { calculateContractorQre } from "./contractor-qre";
export { calculateAsc, calculateRegularCredit, calculatePayrollOffset } from "./federal-credit";
export { calculateScCredit } from "./sc-credit";
