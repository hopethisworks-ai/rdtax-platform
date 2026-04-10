# Tax Engine Specification

## Overview

The credit calculation engine (`src/engine/`) is a pure TypeScript module that implements IRC §41 research credit calculations for federal and South Carolina state purposes. It has **zero side effects**: no database access, no HTTP calls. It receives a typed `CalculationInput` and returns a typed `CalculationResult`.

---

## Wage QRE (`src/engine/wage-qre.ts`)

**Legal basis**: IRC §41(b)(2)(A); IRS ATG substantiation requirements

**Formula**:
```
Wage QRE = eligible wage base × qualified activity percentage
Eligible wage base = base compensation + bonus (if bonusIncluded = true)
```

**Validation**:
- `qualifiedActivityPct` clamped to [0, 1]; warning if out of range
- Excluded employees contribute $0 to QRE
- Negative wage base skipped with warning

**IRS ATG alignment**: Substantiation links employees to business components via payroll records, job descriptions, time-tracking, surveys, or manager attestation.

---

## Supply QRE (`src/engine/supply-qre.ts`)

**Legal basis**: IRC §41(b)(2)(C); IRS ATG exclusion rules

**Auto-exclusions**:
| Flag | Reason |
|------|--------|
| `isDepreciableProperty: true` | §41(b)(2)(C) — depreciable property excluded |
| `isLandOrImprovement: true` | §41(b)(2)(C)(i) — land/improvements excluded |
| `isOverheadItem: true` | IRS ATG — overhead, license fees, leased assets not qualifying supplies |

**Inclusion**: Supply must have `qualified: true` and none of the exclusion flags to be counted.

---

## Contractor QRE (`src/engine/contractor-qre.ts`)

**Legal basis**: IRC §41(b)(3); IRS ATG funded-research analysis; *Populous* substantial-rights doctrine

**Formula**:
```
Contractor QRE = qualified gross amount × contractorQrePct (default 65%)
```

**Validation workflow** (all must be satisfied):
1. `usBasedFlag: true` — US performance required
2. `contractReviewComplete: true` — contract must be reviewed before amount qualifies
3. `qualifiedFlag: true` — analyst must affirmatively mark as qualified

**Funded-research / substantial-rights flags** (warnings, not auto-exclusions):
| Flag | Warning |
|------|---------|
| `fundedResearchFlag: true` | Funded-research exclusion may apply |
| `substantialRightsRetained: false` | Taxpayer did not retain substantial rights |
| `successContingentPayment: true` | Payment success-contingent (favorable indicator) |
| `economicRiskBorne: false` | Taxpayer did not bear economic risk |

---

## ASC Method (`src/engine/federal-credit.ts`)

**Legal basis**: IRC §41(c)(5)

**Formula (base-period)**:
```
Prior 3-year avg QRE = (QRE[y-1] + QRE[y-2] + QRE[y-3]) / 3
Base = prior 3-year avg × 50%
Excess = max(0, current QRE − base)
ASC Credit = excess × ASC rate (14%)
```

**Fallback (no prior-year data)**:
```
ASC Credit = current QRE × fallback rate (6%)
```

---

## Regular Credit (`src/engine/federal-credit.ts`)

**Legal basis**: IRC §41(a)(1)

**Formula**:
```
Average gross receipts = avg of prior 4 years
Fixed-base percentage = capped at 16%, minimum 3%
Base amount = fixed-base% × average gross receipts
Minimum base = 50% of current QRE
Adjusted base = max(computed base, minimum base)
Excess = max(0, current QRE − adjusted base)
Regular Credit = excess × 20%
```

---

## Method Recommendation

The engine compares ASC and Regular credit results and recommends the higher one. The `methodRationale` field explains why, including prior-year averages, fixed-base percentage, and the specific dollar comparison.

---

## 280C Reduced Credit (`apply280c`)

**Legal basis**: IRC §280C(c)

**Formula**:
```
Reduced credit = gross credit − (gross credit × corporate tax rate)
```

**Important filing rule** (enforced via override validation):
> The 280C election must be made on a **timely original return**. It cannot be newly made or changed on an amended return for that year.

---

## Payroll Tax Offset (`calculatePayrollOffset`)

**Legal basis**: IRC §41(h)

**Eligibility**:
- Qualified small business (gross receipts ≤ configured limit, default $5M)
- ≤ configured years since organized (default 5)

**Formula**:
```
Offset amount = min(gross credit, payroll offset cap)
Carryforward reduction = offset amount elected
```

---

## South Carolina Credit (`src/engine/sc-credit.ts`)

**Legal basis**: SC Code §12-6-3375

**Formula**:
```
SC QRE = total QRE × stateSourceQrePct
SC Gross Credit = SC QRE × 5%
SC Liability Limit = state tax liability after other credits × 50%
SC Allowed Credit = min(SC Gross Credit, SC Liability Limit)
SC Carryforward = SC Gross Credit − SC Allowed Credit (carried up to 10 years)
```

---

## Controlled-Group Aggregation

When `isControlledGroup: true`:
1. Entity-level calculations run for each entity
2. Prior-year QRE summed across all entities by year
3. Gross receipts summed across all entities by year
4. Consolidated QRE = sum of all entity-level total QREs
5. Federal credit calculated on consolidated totals
6. SC credit calculated on consolidated SC QRE

---

## Reproducibility Guarantee

Every `CalculationResult` contains:
- `inputSnapshot`: exact copy of all inputs
- `assumptionsSnapshot`: all assumptions applied
- `ruleVersionId`: ruleset version used

Running `runCalculation(result.inputSnapshot)` with the same `ruleConfig` will always produce the same output, regardless of when the re-run occurs.

---

## Rule Configuration (TaxRuleConfig)

All rates are loaded from the `TaxRuleVersion` database record, not hardcoded:

```typescript
creditRates: {
  ascRate: 0.14,           // §41(c)(5) — 14% of excess
  ascFallbackRate: 0.06,   // no base-period fallback
  regularRate: 0.20,       // §41(a)(1) — 20% of excess
  contractorQrePct: 0.65,  // §41(b)(3) — 65% of qualified amounts
  scRate: 0.05,            // SC §12-6-3375 — 5%
}
```

---

## Testing

Run all engine unit tests:
```bash
npm test -- --testPathPattern=engine
```

Coverage targets:
- Wage QRE: 100%
- Supply QRE: 100%
- Contractor QRE: 100%
- ASC: 100%
- Regular credit: 100%
- 280C: 100%
- Payroll offset: 100%
- SC credit: 100%
- Full integration: 80%+
