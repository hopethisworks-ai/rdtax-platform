/**
 * Unit tests – Supply QRE Calculator
 */
import { calculateSupplyQre } from "@/engine/supply-qre";
import type { SupplyInput } from "@/engine/types";

describe("calculateSupplyQre", () => {
  const baseSupply = (overrides: Partial<SupplyInput> = {}): SupplyInput => ({
    id: "sup-1",
    amount: 50000,
    isDepreciableProperty: false,
    isLandOrImprovement: false,
    isOverheadItem: false,
    qualified: true,
    excluded: false,
    ...overrides,
  });

  it("includes qualified, non-excluded supplies", () => {
    const { totalSupplyQre } = calculateSupplyQre([baseSupply()]);
    expect(totalSupplyQre).toBe(50000);
  });

  it("excludes depreciable property", () => {
    const { totalSupplyQre, details } = calculateSupplyQre([baseSupply({ isDepreciableProperty: true })]);
    expect(totalSupplyQre).toBe(0);
    expect(details[0].excluded).toBe(true);
    expect(details[0].exclusionReason).toMatch(/Depreciable/);
  });

  it("excludes land and improvements", () => {
    const { totalSupplyQre, details } = calculateSupplyQre([baseSupply({ isLandOrImprovement: true })]);
    expect(totalSupplyQre).toBe(0);
    expect(details[0].exclusionReason).toMatch(/[Ll]and/);
  });

  it("excludes overhead items", () => {
    const { totalSupplyQre, details } = calculateSupplyQre([baseSupply({ isOverheadItem: true })]);
    expect(totalSupplyQre).toBe(0);
    expect(details[0].exclusionReason).toMatch(/[Oo]verhead/);
  });

  it("excludes manually excluded supplies", () => {
    const { totalSupplyQre } = calculateSupplyQre([baseSupply({ excluded: true })]);
    expect(totalSupplyQre).toBe(0);
  });

  it("excludes non-qualified supplies from total", () => {
    const { totalSupplyQre, details } = calculateSupplyQre([baseSupply({ qualified: false })]);
    expect(totalSupplyQre).toBe(0);
    expect(details[0].qualified).toBe(false);
    expect(details[0].excluded).toBe(false);
  });

  it("sums multiple qualified supplies", () => {
    const s1 = baseSupply({ id: "1", amount: 10000 });
    const s2 = baseSupply({ id: "2", amount: 20000 });
    const s3 = baseSupply({ id: "3", amount: 5000, isDepreciableProperty: true });
    const { totalSupplyQre } = calculateSupplyQre([s1, s2, s3]);
    expect(totalSupplyQre).toBe(30000); // s3 excluded
  });
});
