/**
 * Federal Research Credit Calculator
 *
 * Implements both:
 *   1. Alternative Simplified Credit (ASC) – IRC §41(c)(5)
 *      14% × (current QRE − 50% of avg prior 3-year QRE)
 *      Fallback (no base period): 6% × current QRE
 *
 *   2. Regular Credit – IRC §41(a)(1)
 *      20% × (current QRE − base amount)
 *      Base amount = fixed-base% × avg gross receipts (prior 4 years)
 *      Minimum base = 50% of current QRE
 *
 * 280C reduced-credit election:
 *   - Reduces gross credit by applicable corporate tax rate × gross credit
 *   - Must be made on timely original return (cannot amend)
 *
 * Payroll tax offset:
 *   - Qualified small businesses only (≤$5M gross receipts, ≤5 years old)
 *   - Capped at applicable annual limit
 *   - Reduces research credit carryforward
 */

import type {
  TaxRuleConfig,
  GrossReceiptsInput,
  PriorYearQreInput,
  FederalCreditResult,
  PayrollOffsetResult,
} from "./types";

export function calculateAsc(
  currentQre: number,
  priorYearQre: PriorYearQreInput[],
  ruleConfig: TaxRuleConfig
): { credit: number; base: number; prior3YearAvg: number; fallbackUsed: boolean } {
  const { ascRate, ascFallbackRate } = ruleConfig.creditRates;
  const taxYear = ruleConfig.taxYear;

  // Guard against negative QRE
  if (currentQre <= 0) {
    return { credit: 0, base: 0, prior3YearAvg: 0, fallbackUsed: false };
  }

  const prior3 = [1, 2, 3]
    .map((offset) => {
      const yr = priorYearQre.find((p) => p.taxYear === taxYear - offset);
      return yr?.amount ?? 0;
    });

  const anyPrior = prior3.some((v) => v > 0);

  if (!anyPrior) {
    // Fallback: no meaningful base period (all zeroes or missing)
    // Respect the ascFallbackLogic setting from the rule config
    let credit: number;
    if (ruleConfig.ascFallbackLogic === "half_of_three_pct_qre") {
      // Alternative: 50% × 3% × current QRE (half the startup rate)
      credit = round2(currentQre * 0.03 * 0.5);
    } else {
      // Default: 6% of current QRE per IRC §41(c)(5)(B)(ii)
      credit = round2(currentQre * ascFallbackRate);
    }
    return { credit, base: 0, prior3YearAvg: 0, fallbackUsed: true };
  }

  const prior3YearAvg = prior3.reduce((s, v) => s + v, 0) / 3;
  const base = round2(prior3YearAvg * 0.5);
  const excess = Math.max(0, currentQre - base);
  const credit = round2(excess * ascRate);

  return { credit, base, prior3YearAvg, fallbackUsed: false };
}

export function calculateRegularCredit(
  currentQre: number,
  priorYearQre: PriorYearQreInput[],
  grossReceipts: GrossReceiptsInput[],
  fixedBasePct: number | undefined,
  ruleConfig: TaxRuleConfig
): { credit: number; base: number; fixedBasePct: number; warnings: string[] } {
  const { regularRate } = ruleConfig.creditRates;
  const taxYear = ruleConfig.taxYear;
  const warnings: string[] = [];

  // Guard against negative QRE
  if (currentQre <= 0) {
    return { credit: 0, base: 0, fixedBasePct: fixedBasePct ?? 0.03, warnings };
  }

  // Average gross receipts for prior 4 years
  const prior4Receipts = [1, 2, 3, 4].map((offset) => {
    const yr = grossReceipts.find((g) => g.taxYear === taxYear - offset);
    return yr?.amount ?? 0;
  });
  const avgGrossReceipts =
    prior4Receipts.reduce((s, v) => s + v, 0) / 4;

  // Warn if all gross receipts are zero — regular credit base may be unreliable
  const allZeroReceipts = prior4Receipts.every((v) => v === 0);
  if (allZeroReceipts && currentQre > 0) {
    warnings.push(
      "All prior 4-year gross receipts are zero or missing; regular credit base defaults to 50% of current QRE. Consider using ASC method instead."
    );
  }

  // Fixed-base percentage
  // For established companies: QRE 1984-1988 / GR 1984-1988 (capped at 16%)
  // We accept admin-provided value; default to 3% minimum if not supplied
  const fbPct = Math.min(
    0.16,
    Math.max(0.03, fixedBasePct ?? 0.03)
  );

  let base = round2(fbPct * avgGrossReceipts);
  // Minimum base = 50% of current QRE
  const minBase = round2(currentQre * 0.5);
  if (base < minBase) base = minBase;

  const excess = Math.max(0, currentQre - base);
  const credit = round2(excess * regularRate);

  return { credit, base, fixedBasePct: fbPct, warnings };
}

export function apply280c(
  grossCredit: number,
  elected: boolean,
  ruleConfig: TaxRuleConfig
): number {
  if (!elected) return grossCredit;
  const reduction = round2(grossCredit * ruleConfig.c280cRules.regularTaxRate);
  return round2(grossCredit - reduction);
}

export function buildFederalResult(
  ascResult: ReturnType<typeof calculateAsc>,
  regularResult: Omit<ReturnType<typeof calculateRegularCredit>, "warnings">,
  elect280c: boolean,
  method: "ASC" | "REGULAR" | "RECOMMEND",
  ruleConfig: TaxRuleConfig
): FederalCreditResult {
  let recommendedMethod: "ASC" | "REGULAR";
  let methodRationale: string;

  if (ascResult.credit >= regularResult.credit) {
    recommendedMethod = "ASC";
    methodRationale =
      `ASC yields a higher credit ($${fmt(ascResult.credit)}) vs Regular ($${fmt(regularResult.credit)}). ` +
      (ascResult.fallbackUsed
        ? "Fallback ASC rate applied (no prior 3-year QRE data)."
        : `Based on ${ruleConfig.taxYear - 1}–${ruleConfig.taxYear - 3} average QRE of $${fmt(ascResult.prior3YearAvg)}.`);
  } else {
    recommendedMethod = "REGULAR";
    methodRationale =
      `Regular credit yields a higher credit ($${fmt(regularResult.credit)}) vs ASC ($${fmt(ascResult.credit)}). ` +
      `Fixed-base percentage: ${(regularResult.fixedBasePct * 100).toFixed(2)}%.`;
  }

  const chosenMethod: "ASC" | "REGULAR" =
    method === "RECOMMEND" ? recommendedMethod : method;
  const grossCredit =
    chosenMethod === "ASC" ? ascResult.credit : regularResult.credit;
  const reducedCredit = apply280c(grossCredit, elect280c, ruleConfig);

  return {
    grossCredit,
    reducedCredit,
    c280cElected: elect280c,
    recommendedMethod,
    methodRationale,
    ascResult: ascResult.credit,
    regularResult: regularResult.credit,
  };
}

export function calculatePayrollOffset(
  grossCredit: number,
  elected: boolean,
  inputs: {
    isQualifiedSmallBusiness: boolean;
    grossReceiptsCurrentYear: number;
    yearsOrganized: number;
    priorCarryforward: number;
  },
  ruleConfig: TaxRuleConfig
): PayrollOffsetResult {
  const warnings: string[] = [];
  const { payrollOffsetRules } = ruleConfig;

  // ── Determine eligibility first, independent of election ──
  let eligible = true;

  if (!inputs.isQualifiedSmallBusiness) {
    warnings.push("Taxpayer is not a qualified small business; payroll offset not available.");
    eligible = false;
  } else if (
    inputs.grossReceiptsCurrentYear >
    payrollOffsetRules.qualifiedSmallBusinessMaxGrossReceipts
  ) {
    warnings.push(
      `Gross receipts $${fmt(inputs.grossReceiptsCurrentYear)} exceed the $${fmt(payrollOffsetRules.qualifiedSmallBusinessMaxGrossReceipts)} limit; payroll offset not available.`
    );
    eligible = false;
  } else if (inputs.yearsOrganized > payrollOffsetRules.maxYearsSinceOrganized) {
    warnings.push(
      `Taxpayer has been organized for ${inputs.yearsOrganized} years; payroll offset limited to ${payrollOffsetRules.maxYearsSinceOrganized} years.`
    );
    eligible = false;
  }

  // If not eligible or not elected, return early
  if (!eligible || !elected) {
    return {
      eligible,
      elected: eligible && elected,
      amount: 0,
      cappedAt: 0,
      carryforwardReduction: 0,
      warnings,
    };
  }

  const cappedAt = payrollOffsetRules.cap;
  // Include prior carryforward in the available credit pool
  const availableCredit = grossCredit + Math.max(0, inputs.priorCarryforward);
  const amount = Math.min(availableCredit, cappedAt);
  // Carryforward is reduced by the payroll offset amount
  const carryforwardReduction = amount;

  return {
    eligible: true,
    elected: true,
    amount: round2(amount),
    cappedAt,
    carryforwardReduction: round2(carryforwardReduction),
    warnings,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function fmt(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
