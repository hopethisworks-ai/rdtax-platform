/**
 * Wage QRE Calculator
 *
 * IRC §41(b)(2)(A): wages for qualified services = wages paid or incurred to
 * an employee for qualified services (engaging in qualified research, directly
 * supervising qualified research, or directly supporting qualified research).
 *
 * IRS ATG: substantiation must link employees to specific business components
 * via payroll records, job descriptions, evaluations, calendars, etc.
 */

import type { EmployeeInput, WageQreDetail } from "./types";

export function calculateWageQre(employees: EmployeeInput[]): {
  details: WageQreDetail[];
  totalWageQre: number;
  warnings: string[];
} {
  const warnings: string[] = [];
  const details: WageQreDetail[] = [];

  for (const emp of employees) {
    if (emp.excluded) {
      details.push({
        employeeId: emp.id,
        name: emp.name,
        eligibleWageBase: 0,
        qualifiedActivityPct: emp.qualifiedActivityPct,
        qreAmount: 0,
        excluded: true,
      });
      continue;
    }

    // Validate percentage
    if (emp.qualifiedActivityPct < 0 || emp.qualifiedActivityPct > 1) {
      warnings.push(
        `Employee ${emp.name}: qualifiedActivityPct ${emp.qualifiedActivityPct} is out of range [0,1]; clamped.`
      );
    }
    const pct = Math.min(1, Math.max(0, emp.qualifiedActivityPct));

    // Eligible wage base = base comp + bonus if included
    const eligibleWageBase =
      emp.compensation + (emp.bonusIncluded ? emp.bonus : 0);

    if (eligibleWageBase < 0) {
      warnings.push(`Employee ${emp.name}: negative wage base; skipped.`);
      details.push({
        employeeId: emp.id,
        name: emp.name,
        eligibleWageBase: 0,
        qualifiedActivityPct: pct,
        qreAmount: 0,
        excluded: false,
      });
      continue;
    }

    const qreAmount = round2(eligibleWageBase * pct);

    details.push({
      employeeId: emp.id,
      name: emp.name,
      eligibleWageBase,
      qualifiedActivityPct: pct,
      qreAmount,
      excluded: false,
    });
  }

  const totalWageQre = details.reduce((sum, d) => sum + d.qreAmount, 0);

  return { details, totalWageQre: round2(totalWageQre), warnings };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
