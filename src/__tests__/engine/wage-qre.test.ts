/**
 * Unit tests – Wage QRE Calculator
 */
import { calculateWageQre } from "@/engine/wage-qre";
import type { EmployeeInput } from "@/engine/types";

describe("calculateWageQre", () => {
  const baseEmployee = (overrides: Partial<EmployeeInput> = {}): EmployeeInput => ({
    id: "emp-1",
    name: "Alice Engineer",
    compensation: 100000,
    bonus: 10000,
    bonusIncluded: false,
    qualifiedActivityPct: 0.75,
    excluded: false,
    ...overrides,
  });

  it("calculates basic wage QRE", () => {
    const { totalWageQre, details } = calculateWageQre([baseEmployee()]);
    expect(totalWageQre).toBe(75000); // 100000 * 0.75
    expect(details[0].qreAmount).toBe(75000);
  });

  it("includes bonus when bonusIncluded is true", () => {
    const { totalWageQre } = calculateWageQre([baseEmployee({ bonusIncluded: true })]);
    expect(totalWageQre).toBe(82500); // (100000 + 10000) * 0.75
  });

  it("excludes bonus when bonusIncluded is false", () => {
    const { totalWageQre } = calculateWageQre([baseEmployee({ bonusIncluded: false })]);
    expect(totalWageQre).toBe(75000); // 100000 * 0.75
  });

  it("returns 0 for excluded employees", () => {
    const { totalWageQre, details } = calculateWageQre([baseEmployee({ excluded: true })]);
    expect(totalWageQre).toBe(0);
    expect(details[0].qreAmount).toBe(0);
    expect(details[0].excluded).toBe(true);
  });

  it("clamps qualifiedActivityPct to [0, 1]", () => {
    const { totalWageQre, warnings } = calculateWageQre([baseEmployee({ qualifiedActivityPct: 1.5 })]);
    expect(totalWageQre).toBe(100000); // clamped to 1.0
    expect(warnings.length).toBeGreaterThan(0);
  });

  it("handles zero qualified activity", () => {
    const { totalWageQre } = calculateWageQre([baseEmployee({ qualifiedActivityPct: 0 })]);
    expect(totalWageQre).toBe(0);
  });

  it("sums multiple employees", () => {
    const emp1 = baseEmployee({ id: "1", compensation: 100000, qualifiedActivityPct: 0.5 });
    const emp2 = baseEmployee({ id: "2", compensation: 80000, qualifiedActivityPct: 1.0 });
    const { totalWageQre } = calculateWageQre([emp1, emp2]);
    expect(totalWageQre).toBe(130000); // 50000 + 80000
  });

  it("rounds to 2 decimal places", () => {
    const { totalWageQre } = calculateWageQre([baseEmployee({ compensation: 100001, qualifiedActivityPct: 1 / 3 })]);
    expect(totalWageQre).toBe(Math.round(100001 / 3 * 100) / 100);
  });
});
