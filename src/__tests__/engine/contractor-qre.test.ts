/**
 * Unit tests – Contractor QRE Calculator
 * Covers funded-research and substantial-rights analysis
 */
import { calculateContractorQre } from "@/engine/contractor-qre";
import type { ContractorInput } from "@/engine/types";

describe("calculateContractorQre", () => {
  const baseContractor = (overrides: Partial<ContractorInput> = {}): ContractorInput => ({
    id: "con-1",
    amount: 100000,
    usBasedFlag: true,
    qualifiedFlag: true,
    substantialRightsRetained: true,
    successContingentPayment: false,
    economicRiskBorne: true,
    contractReviewComplete: true,
    fundedResearchFlag: false,
    excluded: false,
    ...overrides,
  });

  it("applies 65% rule to qualified contractor amount", () => {
    const { totalContractorQre, details } = calculateContractorQre([baseContractor()]);
    expect(totalContractorQre).toBe(65000); // 100000 * 0.65
    expect(details[0].qualifiedAmount).toBe(65000);
  });

  it("excludes non-US contractors", () => {
    const { totalContractorQre, details } = calculateContractorQre([baseContractor({ usBasedFlag: false })]);
    expect(totalContractorQre).toBe(0);
    expect(details[0].excluded).toBe(true);
    expect(details[0].exclusionReason).toMatch(/US/);
  });

  it("marks pending when contract review not complete", () => {
    const { totalContractorQre, details, warnings } = calculateContractorQre([baseContractor({ contractReviewComplete: false })]);
    expect(totalContractorQre).toBe(0);
    expect(details[0].qualifiedAmount).toBe(0);
    expect(warnings.some((w) => w.includes("contract review"))).toBe(true);
  });

  it("warns on funded-research flag", () => {
    const { warnings, details } = calculateContractorQre([baseContractor({ fundedResearchFlag: true })]);
    expect(warnings.some((w) => w.includes("funded-research"))).toBe(true);
    expect(details[0].fundedResearchWarning).toBe(true);
  });

  it("warns when substantial rights NOT retained", () => {
    const { warnings, details } = calculateContractorQre([baseContractor({ substantialRightsRetained: false })]);
    expect(warnings.some((w) => w.includes("substantial rights"))).toBe(true);
    expect(details[0].substantialRightsWarning).toBe(true);
  });

  it("returns 0 for unqualified contractor (still tracked)", () => {
    const { totalContractorQre, details } = calculateContractorQre([baseContractor({ qualifiedFlag: false })]);
    expect(totalContractorQre).toBe(0);
    expect(details[0].excluded).toBe(false); // tracked but not counted
    expect(details[0].qualifiedAmount).toBe(0);
  });

  it("supports custom contractorQrePct", () => {
    const { totalContractorQre } = calculateContractorQre([baseContractor()], 0.5);
    expect(totalContractorQre).toBe(50000);
  });

  it("sums multiple qualified contractors", () => {
    const c1 = baseContractor({ id: "1", amount: 200000 });
    const c2 = baseContractor({ id: "2", amount: 100000 });
    const { totalContractorQre } = calculateContractorQre([c1, c2]);
    expect(totalContractorQre).toBe(195000); // (200000 + 100000) * 0.65
  });

  it("excludes manually excluded contractors", () => {
    const { totalContractorQre } = calculateContractorQre([baseContractor({ excluded: true })]);
    expect(totalContractorQre).toBe(0);
  });
});
