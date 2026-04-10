/**
 * Calculation Engine – Type Definitions
 *
 * These types define all inputs and outputs of the credit engine.
 * The engine is intentionally decoupled from the database layer so it can be
 * tested independently (see __tests__/engine/).
 */

export type CalculationMethod = "ASC" | "REGULAR";

// ── Rule configuration (loaded from TaxRuleVersion record) ───────────────────

export interface CreditRates {
  ascRate: number;           // default 0.14
  ascFallbackRate: number;   // default 0.06 (no base-period)
  regularRate: number;       // default 0.20
  contractorQrePct: number;  // default 0.65 (65% of amounts paid)
  scRate: number;            // default 0.05
}

export interface CarryforwardRules {
  federalYears: number;      // default 20
  scYears: number;           // default 10
}

export interface PayrollOffsetRules {
  cap: number;               // annual cap in dollars (e.g. $500,000 for 2023)
  qualifiedSmallBusinessMaxGrossReceipts: number; // e.g. $5,000,000
  maxYearsSinceOrganized: number; // e.g. 5
}

export interface C280cRules {
  regularTaxRate: number;    // e.g. 0.21 for C-corps
}

export interface TaxRuleConfig {
  ruleVersionId: string;
  taxYear: number;
  formVersion: string;
  creditRates: CreditRates;
  carryforwardRules: CarryforwardRules;
  payrollOffsetRules: PayrollOffsetRules;
  c280cRules: C280cRules;
  ascFallbackLogic: "six_percent" | "half_of_three_pct_qre";
}

// ── Engine Inputs ─────────────────────────────────────────────────────────────

export interface EmployeeInput {
  id: string;
  name: string;
  compensation: number;
  bonus: number;
  bonusIncluded: boolean;
  qualifiedActivityPct: number; // 0.0 – 1.0
  excluded: boolean;
}

export interface SupplyInput {
  id: string;
  amount: number;
  isDepreciableProperty: boolean;
  isLandOrImprovement: boolean;
  isOverheadItem: boolean;
  qualified: boolean;
  excluded: boolean;
}

export interface ContractorInput {
  id: string;
  amount: number;
  usBasedFlag: boolean;
  qualifiedFlag: boolean;
  substantialRightsRetained: boolean | null;
  successContingentPayment: boolean | null;
  economicRiskBorne: boolean | null;
  contractReviewComplete: boolean;
  fundedResearchFlag: boolean;
  excluded: boolean;
}

export interface PriorYearQreInput {
  taxYear: number;
  amount: number;
}

export interface GrossReceiptsInput {
  taxYear: number;
  amount: number;
}

export interface EntityInput {
  entityId: string;
  entityName: string;
  employees: EmployeeInput[];
  supplies: SupplyInput[];
  contractors: ContractorInput[];
  priorYearQre: PriorYearQreInput[];
  grossReceipts: GrossReceiptsInput[];
  fixedBasePct?: number;       // for regular credit method
  stateSourceQrePct?: number;  // fraction of QRE attributable to SC activities
  stateTaxLiabilityAfterOtherCredits?: number; // for SC 50% cap
}

export interface CalculationInput {
  engagementId: string;
  taxYear: number;
  ruleConfig: TaxRuleConfig;
  entities: EntityInput[];
  isControlledGroup: boolean;
  method: CalculationMethod | "RECOMMEND";
  elect280c: boolean;
  electPayrollOffset: boolean;
  payrollOffsetEligibilityInputs: {
    isQualifiedSmallBusiness: boolean;
    grossReceiptsCurrentYear: number;
    yearsOrganized: number;
    priorCarryforward: number;
  };
  assumptions: Record<string, unknown>;
}

// ── Engine Outputs ────────────────────────────────────────────────────────────

export interface WageQreDetail {
  employeeId: string;
  name: string;
  eligibleWageBase: number;  // comp + bonus if included
  qualifiedActivityPct: number;
  qreAmount: number;
  excluded: boolean;
}

export interface SupplyQreDetail {
  supplyId: string;
  amount: number;
  qualified: boolean;
  excluded: boolean;
  exclusionReason?: string;
}

export interface ContractorQreDetail {
  contractorId: string;
  grossAmount: number;
  qualifiedAmount: number; // 65% of qualified gross
  excluded: boolean;
  exclusionReason?: string;
  substantialRightsWarning: boolean;
  fundedResearchWarning: boolean;
}

export interface EntityCalculationResult {
  entityId: string;
  entityName: string;
  // QRE breakdowns
  wageQreDetails: WageQreDetail[];
  supplyQreDetails: SupplyQreDetail[];
  contractorQreDetails: ContractorQreDetail[];
  totalWageQre: number;
  totalSupplyQre: number;
  totalContractorQre: number;
  totalQre: number;
  warnings: string[];
  // ASC
  ascCredit: number | null;
  ascBase: number | null;
  ascPrior3YearAvgQre: number | null;
  ascFallbackUsed: boolean;
  // Regular
  regularCredit: number | null;
  regularBase: number | null;
  fixedBasePct: number | null;
  // SC
  scQre: number;
  scGrossCredit: number;
  scLiabilityLimit: number;
  scAllowedCredit: number;
  scCarryforward: number;
}

export interface FederalCreditResult {
  grossCredit: number;        // before 280C
  reducedCredit: number;      // after 280C (if elected)
  c280cElected: boolean;
  recommendedMethod: CalculationMethod;
  methodRationale: string;
  ascResult: number | null;
  regularResult: number | null;
}

export interface PayrollOffsetResult {
  eligible: boolean;
  elected: boolean;
  amount: number;
  cappedAt: number;
  carryforwardReduction: number;
  warnings: string[];
}

export interface CalculationResult {
  engagementId: string;
  taxYear: number;
  ruleVersionId: string;
  method: CalculationMethod;
  // Entity-level results
  entityResults: EntityCalculationResult[];
  // Consolidated / controlled-group totals
  consolidatedQre: number;
  consolidatedFederalCredit: FederalCreditResult;
  consolidatedScCredit: {
    grossCredit: number;
    allowedCredit: number;
    carryforward: number;
  };
  payrollOffset: PayrollOffsetResult;
  // Flags and warnings
  warnings: string[];
  errors: string[];
  // Snapshots for immutable storage
  inputSnapshot: CalculationInput;
  assumptionsSnapshot: Record<string, unknown>;
}
