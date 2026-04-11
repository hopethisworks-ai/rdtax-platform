/**
 * South Carolina Research Credit Module
 *
 * SC Code §12-6-3375:
 *   - 5% of qualified research expenses made in South Carolina
 *   - Limited to 50% of remaining state tax liability after other credits
 *   - Unused credit carried forward up to 10 years
 *
 * "Expenses made in South Carolina" = QREs attributable to SC activities.
 * stateSourceQrePct is the fraction of total QRE attributable to SC.
 */

import type { TaxRuleConfig } from "./types";

export interface ScCreditResult {
  scQre: number;
  scGrossCredit: number;
  scLiabilityLimit: number;
  scAllowedCredit: number;
  scCarryforward: number;
  warnings: string[];
}

export function calculateScCredit(
  totalQre: number,
  stateSourceQrePct: number,
  stateTaxLiabilityAfterOtherCredits: number,
  ruleConfig: TaxRuleConfig
): ScCreditResult {
  const warnings: string[] = [];
  const { scRate } = ruleConfig.creditRates;
  const { scYears } = ruleConfig.carryforwardRules;

  if (stateSourceQrePct < 0 || stateSourceQrePct > 1) {
    warnings.push(
      `stateSourceQrePct ${stateSourceQrePct} out of range; clamped to [0,1].`
    );
  }
  const pct = Math.min(1, Math.max(0, stateSourceQrePct));

  // Guard against negative inputs
  const safeTotalQre = Math.max(0, totalQre);
  const safeLiability = Math.max(0, stateTaxLiabilityAfterOtherCredits);

  const scQre = round2(safeTotalQre * pct);
  const scGrossCredit = round2(scQre * scRate);

  // 50% of remaining state tax liability after other credits
  const scLiabilityLimit = round2(safeLiability * 0.5);
  const scAllowedCredit = Math.min(scGrossCredit, scLiabilityLimit);
  const scCarryforward = round2(scGrossCredit - scAllowedCredit);

  if (scCarryforward > 0) {
    warnings.push(
      `SC credit of $${fmt(scCarryforward)} carried forward (max ${scYears} years per SC §12-6-3375).`
    );
  }

  return {
    scQre,
    scGrossCredit: round2(scGrossCredit),
    scLiabilityLimit,
    scAllowedCredit: round2(scAllowedCredit),
    scCarryforward,
    warnings,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function fmt(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 0 });
}
