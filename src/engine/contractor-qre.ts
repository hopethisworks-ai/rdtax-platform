/**
 * Contractor QRE Calculator
 *
 * IRC §41(b)(2)(B): contract research expenses = 65% of amounts paid or
 * incurred to any person (other than employee) for qualified research.
 *
 * Key funded-research/substantial-rights analysis (IRS ATG, Populous, etc.):
 *   - Is payment contingent on the success of the research?
 *   - Did the taxpayer retain substantial rights?
 *   - Was the contract arranged before the work commenced?
 *   - Was the work performed on behalf of the taxpayer?
 *   - Did the taxpayer bear the economic risk of failure?
 *
 * If funded-research exclusion applies, the amount is not a qualified contract
 * research expense even if US-based.
 */

import type { ContractorInput, ContractorQreDetail } from "./types";

export function calculateContractorQre(
  contractors: ContractorInput[],
  contractorQrePct: number = 0.65
): {
  details: ContractorQreDetail[];
  totalContractorQre: number;
  warnings: string[];
} {
  const warnings: string[] = [];
  const details: ContractorQreDetail[] = [];

  for (const c of contractors) {
    if (c.excluded) {
      details.push({
        contractorId: c.id,
        grossAmount: c.amount,
        qualifiedAmount: 0,
        excluded: true,
        exclusionReason: "Manually excluded",
        substantialRightsWarning: false,
        fundedResearchWarning: false,
      });
      continue;
    }

    let exclusionReason: string | undefined;
    let substantialRightsWarning = false;
    let fundedResearchWarning = false;

    // Must be US-based
    if (!c.usBasedFlag) {
      details.push({
        contractorId: c.id,
        grossAmount: c.amount,
        qualifiedAmount: 0,
        excluded: true,
        exclusionReason: "Non-US contractor; §41(b)(3) requires US performance",
        substantialRightsWarning: false,
        fundedResearchWarning: false,
      });
      continue;
    }

    // Contract review must be complete before a qualified flag is accepted
    if (!c.contractReviewComplete) {
      warnings.push(
        `Contractor ${c.id}: contract review not complete; treated as unqualified until reviewed.`
      );
      details.push({
        contractorId: c.id,
        grossAmount: c.amount,
        qualifiedAmount: 0,
        excluded: false,
        exclusionReason: "Contract review pending",
        substantialRightsWarning: false,
        fundedResearchWarning: false,
      });
      continue;
    }

    // Funded research analysis
    if (c.fundedResearchFlag) {
      fundedResearchWarning = true;
      exclusionReason = "Funded research exclusion may apply; verify substantial rights";
      warnings.push(
        `Contractor ${c.id}: funded-research flag set. Review Populous / IRS ATG criteria.`
      );
    }

    // Substantial-rights flag
    if (c.substantialRightsRetained === false) {
      substantialRightsWarning = true;
      warnings.push(
        `Contractor ${c.id}: substantial rights were NOT retained by taxpayer. Verify qualified status.`
      );
      if (!exclusionReason) {
        exclusionReason =
          "Taxpayer did not retain substantial rights; funded research exclusion risk";
      }
    }

    if (!c.qualifiedFlag) {
      details.push({
        contractorId: c.id,
        grossAmount: c.amount,
        qualifiedAmount: 0,
        excluded: false,
        exclusionReason: exclusionReason ?? "Not marked as qualified",
        substantialRightsWarning,
        fundedResearchWarning,
      });
      continue;
    }

    const qualifiedAmount = round2(c.amount * contractorQrePct);

    details.push({
      contractorId: c.id,
      grossAmount: c.amount,
      qualifiedAmount,
      excluded: false,
      exclusionReason,
      substantialRightsWarning,
      fundedResearchWarning,
    });
  }

  const totalContractorQre = details
    .filter((d) => !d.excluded && d.qualifiedAmount > 0)
    .reduce((sum, d) => sum + d.qualifiedAmount, 0);

  return {
    details,
    totalContractorQre: round2(totalContractorQre),
    warnings,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
