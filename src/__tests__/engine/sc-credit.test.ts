/**
 * Unit tests – South Carolina Research Credit
 * SC Code §12-6-3375: 5% rate, 50% liability limit, 10-year carryforward
 */
import { calculateScCredit } from "@/engine/sc-credit";
import type { TaxRuleConfig } from "@/engine/types";

const config: TaxRuleConfig = {
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
  payrollOffsetRules: { cap: 500000, qualifiedSmallBusinessMaxGrossReceipts: 5000000, maxYearsSinceOrganized: 5 },
  c280cRules: { regularTaxRate: 0.21 },
  ascFallbackLogic: "six_percent",
};

describe("calculateScCredit", () => {
  it("calculates 5% of SC QRE", () => {
    const result = calculateScCredit(1000000, 1.0, 1000000, config);
    expect(result.scQre).toBe(1000000);
    expect(result.scGrossCredit).toBe(50000); // 1000000 * 0.05
  });

  it("applies 50% liability limitation", () => {
    const result = calculateScCredit(1000000, 1.0, 60000, config);
    // gross credit = 50000; 50% of 60000 = 30000; allowed = 30000; carryforward = 20000
    expect(result.scGrossCredit).toBe(50000);
    expect(result.scLiabilityLimit).toBe(30000);
    expect(result.scAllowedCredit).toBe(30000);
    expect(result.scCarryforward).toBe(20000);
  });

  it("allows full credit when liability is sufficient", () => {
    const result = calculateScCredit(1000000, 1.0, 200000, config);
    // 50% of 200000 = 100000 > 50000 gross credit
    expect(result.scAllowedCredit).toBe(50000);
    expect(result.scCarryforward).toBe(0);
  });

  it("applies stateSourceQrePct correctly", () => {
    const result = calculateScCredit(1000000, 0.4, 200000, config);
    // SC QRE = 1000000 * 0.4 = 400000; gross credit = 400000 * 0.05 = 20000
    expect(result.scQre).toBe(400000);
    expect(result.scGrossCredit).toBe(20000);
  });

  it("returns zero credit when QRE is zero", () => {
    const result = calculateScCredit(0, 1.0, 100000, config);
    expect(result.scGrossCredit).toBe(0);
    expect(result.scAllowedCredit).toBe(0);
  });

  it("warns when carryforward exists", () => {
    const result = calculateScCredit(1000000, 1.0, 60000, config);
    expect(result.warnings.some((w) => w.includes("carried forward"))).toBe(true);
  });

  it("clamps stateSourceQrePct to [0, 1]", () => {
    const result = calculateScCredit(1000000, 1.5, 200000, config);
    expect(result.scQre).toBe(1000000); // clamped to 1.0
    expect(result.warnings.some((w) => w.includes("out of range"))).toBe(true);
  });

  it("guards against negative totalQre", () => {
    const result = calculateScCredit(-500000, 1.0, 100000, config);
    expect(result.scQre).toBe(0);
    expect(result.scGrossCredit).toBe(0);
    expect(result.scAllowedCredit).toBe(0);
  });

  it("guards against negative state tax liability", () => {
    const result = calculateScCredit(1000000, 1.0, -50000, config);
    expect(result.scLiabilityLimit).toBe(0);
    expect(result.scAllowedCredit).toBe(0);
    expect(result.scCarryforward).toBe(50000); // full credit carried forward
  });
});
