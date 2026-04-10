/**
 * Supply QRE Calculator
 *
 * IRC §41(b)(2)(C): supplies = tangible property other than:
 *   (i) land or improvements to land
 *   (ii) property of a character subject to depreciation allowance (§167/§168)
 *
 * IRS ATG: overhead, license fees, and leased-asset costs are NOT supplies.
 */

import type { SupplyInput, SupplyQreDetail } from "./types";

export function calculateSupplyQre(supplies: SupplyInput[]): {
  details: SupplyQreDetail[];
  totalSupplyQre: number;
  warnings: string[];
} {
  const warnings: string[] = [];
  const details: SupplyQreDetail[] = [];

  for (const s of supplies) {
    if (s.excluded) {
      details.push({
        supplyId: s.id,
        amount: s.amount,
        qualified: false,
        excluded: true,
        exclusionReason: "Manually excluded",
      });
      continue;
    }

    // Auto-exclude by IRS ATG rules
    if (s.isDepreciableProperty) {
      details.push({
        supplyId: s.id,
        amount: s.amount,
        qualified: false,
        excluded: true,
        exclusionReason: "Depreciable property; not a qualifying supply under §41(b)(2)(C)",
      });
      continue;
    }

    if (s.isLandOrImprovement) {
      details.push({
        supplyId: s.id,
        amount: s.amount,
        qualified: false,
        excluded: true,
        exclusionReason: "Land or land improvement; excluded under §41(b)(2)(C)(i)",
      });
      continue;
    }

    if (s.isOverheadItem) {
      details.push({
        supplyId: s.id,
        amount: s.amount,
        qualified: false,
        excluded: true,
        exclusionReason: "Overhead/license/leased-asset cost; not a tangible supply per IRS ATG",
      });
      continue;
    }

    if (!s.qualified) {
      details.push({
        supplyId: s.id,
        amount: s.amount,
        qualified: false,
        excluded: false,
        exclusionReason: "Not yet marked as qualified",
      });
      continue;
    }

    if (s.amount < 0) {
      warnings.push(`Supply ${s.id}: negative amount; skipped.`);
      details.push({
        supplyId: s.id,
        amount: 0,
        qualified: false,
        excluded: false,
        exclusionReason: "Negative amount",
      });
      continue;
    }

    details.push({
      supplyId: s.id,
      amount: s.amount,
      qualified: true,
      excluded: false,
    });
  }

  const totalSupplyQre = details
    .filter((d) => d.qualified && !d.excluded)
    .reduce((sum, d) => sum + d.amount, 0);

  return { details, totalSupplyQre: round2(totalSupplyQre), warnings };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
