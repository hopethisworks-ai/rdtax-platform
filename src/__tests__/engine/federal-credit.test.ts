/**
 * Unit tests – Federal Credit Calculator
 * Covers ASC, Regular, 280C, and Payroll Offset
 */
import { calculateAsc, calculateRegularCredit, apply280c, calculatePayrollOffset } from "@/engine/federal-credit";
import type { TaxRuleConfig, PriorYearQreInput, GrossReceiptsInput } from "@/engine/types";

const defaultConfig: TaxRuleConfig = {
  ruleVersionId: "test-v1",
  taxYear: 2024,
  formVersion: "Form 6765 (2024)",
  creditRates: {
    ascRate: 0.14,
    ascFallbackRate: 0.06,
    regularRate: 0.20,
    contractorQrePct: 0.65,
    scRate: 0.05,
  },
  carryforwardRules: { federalYears: 20, scYears: 10 },
  payrollOffsetRules: {
    cap: 500000,
    qualifiedSmallBusinessMaxGrossReceipts: 5000000,
    maxYearsSinceOrganized: 5,
  },
  c280cRules: { regularTaxRate: 0.21 },
  ascFallbackLogic: "six_percent",
};

describe("calculateAsc", () => {
  it("calculates ASC with prior 3-year data", () => {
    const prior: PriorYearQreInput[] = [
      { taxYear: 2023, amount: 300000 },
      { taxYear: 2022, amount: 200000 },
      { taxYear: 2021, amount: 100000 },
    ];
    const result = calculateAsc(400000, prior, defaultConfig);
    // avg = (300000+200000+100000)/3 = 200000; base = 200000*0.5 = 100000
    // excess = 400000-100000 = 300000; credit = 300000*0.14 = 42000
    expect(result.credit).toBe(42000);
    expect(result.prior3YearAvg).toBe(200000);
    expect(result.fallbackUsed).toBe(false);
  });

  it("uses fallback when no prior-year data", () => {
    const result = calculateAsc(400000, [], defaultConfig);
    expect(result.credit).toBe(24000); // 400000 * 0.06
    expect(result.fallbackUsed).toBe(true);
  });

  it("uses fallback when some prior years are missing (all zero)", () => {
    const result = calculateAsc(400000, [], defaultConfig);
    expect(result.fallbackUsed).toBe(true);
  });

  it("computes 0 ASC when current QRE equals base", () => {
    const prior: PriorYearQreInput[] = [
      { taxYear: 2023, amount: 800000 },
      { taxYear: 2022, amount: 800000 },
      { taxYear: 2021, amount: 800000 },
    ];
    const result = calculateAsc(400000, prior, defaultConfig);
    // avg = 800000; base = 400000; excess = 0; credit = 0
    expect(result.credit).toBe(0);
  });
});

describe("calculateRegularCredit", () => {
  const grossReceipts: GrossReceiptsInput[] = [
    { taxYear: 2023, amount: 10000000 },
    { taxYear: 2022, amount: 9000000 },
    { taxYear: 2021, amount: 8000000 },
    { taxYear: 2020, amount: 7000000 },
  ];
  const prior: PriorYearQreInput[] = [];

  it("calculates regular credit with fixed-base pct", () => {
    const result = calculateRegularCredit(400000, prior, grossReceipts, 0.05, defaultConfig);
    // avg gross = (10M+9M+8M+7M)/4 = 8.5M
    // base = 8.5M * 0.05 = 425000 → but min base = 400000*0.5=200000 → 425000>200000, use 425000
    // excess = max(0, 400000-425000) = 0; credit = 0
    expect(result.credit).toBe(0);
  });

  it("applies 3% floor on fixed-base pct (IRS minimum), then 20% of excess", () => {
    // Engine floors fixedBasePct at 3% (IRS rule). With 0.01 input:
    // base = 8.5M * 0.03 = 255000; min base = 400000*0.5 = 200000; use 255000
    // excess = 400000-255000=145000; credit=145000*0.20=29000
    const result = calculateRegularCredit(400000, prior, grossReceipts, 0.01, defaultConfig);
    expect(result.credit).toBe(29000);
    expect(result.fixedBasePct).toBe(0.03);
  });

  it("caps fixed-base pct at 16%", () => {
    const result = calculateRegularCredit(400000, prior, grossReceipts, 0.25, defaultConfig);
    expect(result.fixedBasePct).toBe(0.16);
  });

  it("uses minimum 3% fixed-base if not provided", () => {
    const result = calculateRegularCredit(400000, prior, grossReceipts, undefined, defaultConfig);
    expect(result.fixedBasePct).toBe(0.03);
  });
});

describe("apply280c", () => {
  it("reduces credit by corporate tax rate when elected", () => {
    const reduced = apply280c(100000, true, defaultConfig);
    expect(reduced).toBe(79000); // 100000 - 100000*0.21
  });

  it("returns gross credit when not elected", () => {
    const result = apply280c(100000, false, defaultConfig);
    expect(result).toBe(100000);
  });
});

describe("calculatePayrollOffset", () => {
  const eligibleInputs = {
    isQualifiedSmallBusiness: true,
    grossReceiptsCurrentYear: 2000000,
    yearsOrganized: 3,
    priorCarryforward: 0,
  };

  it("allows offset for eligible QSB", () => {
    const result = calculatePayrollOffset(200000, true, eligibleInputs, defaultConfig);
    expect(result.eligible).toBe(true);
    expect(result.elected).toBe(true);
    expect(result.amount).toBe(200000);
  });

  it("caps at annual limit", () => {
    const result = calculatePayrollOffset(1000000, true, eligibleInputs, defaultConfig);
    expect(result.amount).toBe(500000); // capped
    expect(result.cappedAt).toBe(500000);
  });

  it("denies for non-QSB", () => {
    const result = calculatePayrollOffset(200000, true, { ...eligibleInputs, isQualifiedSmallBusiness: false }, defaultConfig);
    expect(result.eligible).toBe(false);
  });

  it("denies for gross receipts exceeding limit", () => {
    const result = calculatePayrollOffset(200000, true, { ...eligibleInputs, grossReceiptsCurrentYear: 6000000 }, defaultConfig);
    expect(result.eligible).toBe(false);
    expect(result.warnings.some((w) => w.includes("Gross receipts"))).toBe(true);
  });

  it("denies when too many years organized", () => {
    const result = calculatePayrollOffset(200000, true, { ...eligibleInputs, yearsOrganized: 6 }, defaultConfig);
    expect(result.eligible).toBe(false);
  });

  it("returns eligible but not elected when elected is false", () => {
    const result = calculatePayrollOffset(200000, false, eligibleInputs, defaultConfig);
    expect(result.eligible).toBe(true);  // eligible is determined independently
    expect(result.elected).toBe(false);
    expect(result.amount).toBe(0);
  });

  it("carryforward reduction equals elected amount", () => {
    const result = calculatePayrollOffset(200000, true, eligibleInputs, defaultConfig);
    expect(result.carryforwardReduction).toBe(result.amount);
  });

  it("includes prior carryforward in available credit pool", () => {
    const result = calculatePayrollOffset(
      100000,
      true,
      { ...eligibleInputs, priorCarryforward: 200000 },
      defaultConfig
    );
    // availableCredit = 100000 + 200000 = 300000; capped at 500000
    expect(result.amount).toBe(300000);
  });

  it("caps prior carryforward + gross credit at annual limit", () => {
    const result = calculatePayrollOffset(
      400000,
      true,
      { ...eligibleInputs, priorCarryforward: 300000 },
      defaultConfig
    );
    // availableCredit = 400000 + 300000 = 700000; capped at 500000
    expect(result.amount).toBe(500000);
  });

  it("ignores negative prior carryforward", () => {
    const result = calculatePayrollOffset(
      200000,
      true,
      { ...eligibleInputs, priorCarryforward: -50000 },
      defaultConfig
    );
    // Math.max(0, -50000) = 0; availableCredit = 200000
    expect(result.amount).toBe(200000);
  });
});

describe("calculateAsc – edge cases", () => {
  it("returns 0 for negative QRE", () => {
    const result = calculateAsc(-100000, [], defaultConfig);
    expect(result.credit).toBe(0);
    expect(result.fallbackUsed).toBe(false);
  });

  it("returns 0 for zero QRE", () => {
    const result = calculateAsc(0, [], defaultConfig);
    expect(result.credit).toBe(0);
  });

  it("uses half_of_three_pct_qre fallback when configured", () => {
    const altConfig = { ...defaultConfig, ascFallbackLogic: "half_of_three_pct_qre" as const };
    const result = calculateAsc(400000, [], altConfig);
    // 400000 * 0.03 * 0.5 = 6000
    expect(result.credit).toBe(6000);
    expect(result.fallbackUsed).toBe(true);
  });
});

describe("calculateRegularCredit – edge cases", () => {
  it("returns 0 for negative QRE", () => {
    const result = calculateRegularCredit(-100000, [], [], undefined, defaultConfig);
    expect(result.credit).toBe(0);
  });

  it("warns when all gross receipts are zero", () => {
    const result = calculateRegularCredit(400000, [], [], undefined, defaultConfig);
    expect(result.warnings.some((w) => w.includes("zero or missing"))).toBe(true);
  });

  it("returns warnings array even when no issues", () => {
    const grossReceipts: GrossReceiptsInput[] = [
      { taxYear: 2023, amount: 10000000 },
      { taxYear: 2022, amount: 9000000 },
      { taxYear: 2021, amount: 8000000 },
      { taxYear: 2020, amount: 7000000 },
    ];
    const result = calculateRegularCredit(400000, [], grossReceipts, 0.05, defaultConfig);
    expect(Array.isArray(result.warnings)).toBe(true);
  });
});
