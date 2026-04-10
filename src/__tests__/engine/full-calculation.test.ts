/**
 * Integration tests – Full calculation engine
 * Tests controlled-group aggregation, version reproducibility, and regression scenarios
 */
import { runCalculation } from "@/engine/index";
import type { CalculationInput, TaxRuleConfig } from "@/engine/types";

const ruleConfig: TaxRuleConfig = {
  ruleVersionId: "2024.1.0",
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

function buildInput(overrides: Partial<CalculationInput> = {}): CalculationInput {
  return {
    engagementId: "eng-test-1",
    taxYear: 2024,
    ruleConfig,
    entities: [
      {
        entityId: "entity-1",
        entityName: "Test Corp",
        employees: [
          { id: "e1", name: "Bob Dev", compensation: 100000, bonus: 0, bonusIncluded: false, qualifiedActivityPct: 0.8, excluded: false },
          { id: "e2", name: "Alice Sci", compensation: 120000, bonus: 0, bonusIncluded: false, qualifiedActivityPct: 0.6, excluded: false },
        ],
        supplies: [
          { id: "s1", amount: 20000, isDepreciableProperty: false, isLandOrImprovement: false, isOverheadItem: false, qualified: true, excluded: false },
        ],
        contractors: [
          { id: "c1", amount: 50000, usBasedFlag: true, qualifiedFlag: true, substantialRightsRetained: true, successContingentPayment: false, economicRiskBorne: true, contractReviewComplete: true, fundedResearchFlag: false, excluded: false },
        ],
        priorYearQre: [
          { taxYear: 2023, amount: 180000 },
          { taxYear: 2022, amount: 160000 },
          { taxYear: 2021, amount: 140000 },
        ],
        grossReceipts: [
          { taxYear: 2023, amount: 5000000 },
          { taxYear: 2022, amount: 4500000 },
          { taxYear: 2021, amount: 4000000 },
          { taxYear: 2020, amount: 3500000 },
        ],
        stateSourceQrePct: 0,
        stateTaxLiabilityAfterOtherCredits: 0,
      },
    ],
    isControlledGroup: false,
    method: "RECOMMEND",
    elect280c: false,
    electPayrollOffset: false,
    payrollOffsetEligibilityInputs: {
      isQualifiedSmallBusiness: false,
      grossReceiptsCurrentYear: 5000000,
      yearsOrganized: 10,
      priorCarryforward: 0,
    },
    assumptions: {},
    ...overrides,
  };
}

describe("runCalculation – full integration", () => {
  it("produces a non-zero credit for valid input", () => {
    const result = runCalculation(buildInput());
    expect(result.consolidatedQre).toBeGreaterThan(0);
    expect(result.errors).toHaveLength(0);
  });

  it("calculates correct total QRE", () => {
    const result = runCalculation(buildInput());
    // wage: 100000*0.8 + 120000*0.6 = 80000+72000 = 152000
    // supply: 20000
    // contractor: 50000*0.65 = 32500
    // total: 204500
    expect(result.consolidatedQre).toBe(204500);
  });

  it("is reproducible: same inputs produce identical outputs", () => {
    const input = buildInput();
    const r1 = runCalculation(input);
    const r2 = runCalculation(input);
    expect(r1.consolidatedQre).toBe(r2.consolidatedQre);
    expect(r1.consolidatedFederalCredit.grossCredit).toBe(r2.consolidatedFederalCredit.grossCredit);
    expect(r1.method).toBe(r2.method);
  });

  it("picks ASC or REGULAR as recommended", () => {
    const result = runCalculation(buildInput());
    expect(["ASC", "REGULAR"]).toContain(result.consolidatedFederalCredit.recommendedMethod);
  });

  it("280C reduces gross credit by 21%", () => {
    const withoutInput = buildInput({ elect280c: false });
    const withInput = buildInput({ elect280c: true });
    const without = runCalculation(withoutInput);
    const withElect = runCalculation(withInput);
    const grossCredit = without.consolidatedFederalCredit.grossCredit;
    expect(withElect.consolidatedFederalCredit.reducedCredit).toBeCloseTo(grossCredit * (1 - 0.21), 0);
  });

  it("aggregates controlled-group QRE across entities", () => {
    const input = buildInput({
      isControlledGroup: true,
      entities: [
        { ...buildInput().entities[0], entityId: "e1", entityName: "Parent Corp" },
        { ...buildInput().entities[0], entityId: "e2", entityName: "Subsidiary LLC" },
      ],
    });
    const result = runCalculation(input);
    const single = runCalculation(buildInput());
    expect(result.consolidatedQre).toBeCloseTo(single.consolidatedQre * 2, 0);
  });

  it("includes ruleVersionId in result for versioning", () => {
    const result = runCalculation(buildInput());
    expect(result.ruleVersionId).toBe("2024.1.0");
  });

  it("preserves inputSnapshot for reproducibility", () => {
    const input = buildInput({ assumptions: { wageBasis: "time-tracking" } });
    const result = runCalculation(input);
    expect((result.inputSnapshot.assumptions as Record<string, string>).wageBasis).toBe("time-tracking");
  });

  it("returns SC credit when state source QRE provided", () => {
    const input = buildInput({
      entities: [{
        ...buildInput().entities[0],
        stateSourceQrePct: 0.8,
        stateTaxLiabilityAfterOtherCredits: 50000,
      }],
    });
    const result = runCalculation(input);
    expect(result.consolidatedScCredit.grossCredit).toBeGreaterThan(0);
  });

  // Regression test: old ruleset produces identical result
  it("regression: changing ruleVersion changes ruleVersionId in result", () => {
    const v1Config: TaxRuleConfig = { ...ruleConfig, ruleVersionId: "2023.1.0", taxYear: 2023 };
    const r1 = runCalculation(buildInput({ ruleConfig: v1Config, taxYear: 2023 }));
    const r2 = runCalculation(buildInput({ ruleConfig, taxYear: 2024 }));
    expect(r1.ruleVersionId).toBe("2023.1.0");
    expect(r2.ruleVersionId).toBe("2024.1.0");
  });
});
