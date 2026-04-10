-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PUBLIC', 'CLIENT', 'ANALYST', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'SIGNED', 'LOST');

-- CreateEnum
CREATE TYPE "EngagementStatus" AS ENUM ('INTAKE', 'DATA_COLLECTION', 'ANALYSIS', 'CALCULATION', 'REVIEW', 'DOCUMENTATION', 'FINAL_REPORT', 'DELIVERED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('UPLOADED', 'NEEDS_REVIEW', 'MAPPED', 'ACCEPTED', 'REJECTED', 'MISSING_FOLLOW_UP');

-- CreateEnum
CREATE TYPE "DocumentCategory" AS ENUM ('PAYROLL_EXPORT', 'GENERAL_LEDGER', 'TRIAL_BALANCE', 'CONTRACTOR_INVOICE', 'CONTRACTOR_AGREEMENT', 'ORG_CHART', 'TAX_RETURN', 'PRIOR_STUDY', 'PROJECT_LIST', 'TECHNICAL_DOCUMENT', 'FINANCIAL_STATEMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "CalculationMethod" AS ENUM ('ASC', 'REGULAR');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "LegalSourceType" AS ENUM ('IRS_INSTRUCTION', 'REGULATION', 'ATG', 'IRM', 'DIRECTIVE', 'COURT_CASE', 'STATE_GUIDANCE');

-- CreateEnum
CREATE TYPE "OverrideApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'SENT', 'PAID', 'OVERDUE', 'VOID');

-- CreateEnum
CREATE TYPE "QuestionnaireSection" AS ENUM ('BUSINESS_OVERVIEW', 'PROJECT_QUALIFICATION', 'FOUR_PART_TEST', 'WAGE_ALLOCATION', 'CONTRACTOR_QUALIFICATION', 'SUPPLY_QUALIFICATION', 'CONTROLLED_GROUP', 'PRIOR_YEAR_QRE', 'GROSS_RECEIPTS', 'STATE_NEXUS', 'PAYROLL_TAX_OFFSET', 'PRIOR_CLAIMS');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('PRELIMINARY_ESTIMATE', 'WORKPAPER_SUMMARY', 'FINAL_PACKAGE', 'INDIVIDUAL_MEMO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "name" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'CLIENT',
    "passwordHash" TEXT,
    "mfaEnabled" BOOLEAN NOT NULL DEFAULT false,
    "mfaSecret" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "industry" TEXT,
    "state" TEXT,
    "revenueBand" TEXT,
    "employeeCount" INTEGER,
    "leadSource" TEXT,
    "notes" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "convertedToClientId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimatorRun" (
    "id" TEXT NOT NULL,
    "leadId" TEXT,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "industry" TEXT,
    "state" TEXT,
    "revenueBand" TEXT,
    "employeeCount" INTEGER,
    "technicalEmployees" INTEGER,
    "annualPayroll" DECIMAL(15,2) NOT NULL,
    "contractorSpend" DECIMAL(15,2) NOT NULL,
    "supplySpend" DECIMAL(15,2) NOT NULL,
    "priorCreditClaimed" BOOLEAN NOT NULL DEFAULT false,
    "estimateLow" DECIMAL(15,2) NOT NULL,
    "estimateHigh" DECIMAL(15,2) NOT NULL,
    "multipliersVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EstimatorRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimatorConfig" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "wageMultiplier" DECIMAL(5,4) NOT NULL,
    "contractorMultiplier" DECIMAL(5,4) NOT NULL,
    "supplyMultiplier" DECIMAL(5,4) NOT NULL,
    "federalCreditRate" DECIMAL(5,4) NOT NULL,
    "scCreditRate" DECIMAL(5,4) NOT NULL,
    "notes" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EstimatorConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "industry" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "ein" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "invitedAt" TIMESTAMP(3),
    "onboardedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalEntity" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ein" TEXT,
    "entityType" TEXT NOT NULL,
    "taxYear" INTEGER NOT NULL,
    "state" TEXT,
    "isParent" BOOLEAN NOT NULL DEFAULT false,
    "parentId" TEXT,
    "ownershipPct" DECIMAL(5,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxRuleVersion" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "taxYear" INTEGER NOT NULL,
    "federalRuleVersion" TEXT NOT NULL,
    "stateRuleVersion" TEXT,
    "formVersion" TEXT NOT NULL,
    "creditRates" JSONB NOT NULL,
    "carryforwardRules" JSONB NOT NULL,
    "payrollOffsetCap" DECIMAL(15,2) NOT NULL,
    "c280cPresentationLogic" JSONB NOT NULL,
    "groupReportingLogic" JSONB NOT NULL,
    "disclosureRequirements" JSONB NOT NULL,
    "ascFallbackRules" JSONB NOT NULL,
    "deprecated" BOOLEAN NOT NULL DEFAULT false,
    "effectiveFrom" TIMESTAMP(3) NOT NULL,
    "effectiveTo" TIMESTAMP(3),
    "notes" TEXT,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxRuleVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalUpdateRecord" (
    "id" TEXT NOT NULL,
    "sourceType" "LegalSourceType" NOT NULL,
    "sourceTitle" TEXT NOT NULL,
    "jurisdiction" TEXT NOT NULL,
    "citation" TEXT,
    "effectiveDate" TIMESTAMP(3),
    "summary" TEXT NOT NULL,
    "impactedModules" TEXT[],
    "isMandatory" BOOLEAN NOT NULL DEFAULT false,
    "implemented" BOOLEAN NOT NULL DEFAULT false,
    "implementedById" TEXT,
    "implementedDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalUpdateRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Engagement" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "legalEntityId" TEXT,
    "taxYear" INTEGER NOT NULL,
    "status" "EngagementStatus" NOT NULL DEFAULT 'INTAKE',
    "ruleVersionId" TEXT,
    "engagementType" TEXT NOT NULL DEFAULT 'standard',
    "assignedTo" TEXT,
    "internalNotes" TEXT,
    "lockedAt" TIMESTAMP(3),
    "lockedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Engagement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "engagementId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "businessComponent" TEXT,
    "objective" TEXT,
    "permittedPurpose" BOOLEAN,
    "technologicalInformation" BOOLEAN,
    "processOfExperimentation" BOOLEAN,
    "qualifiedResearch" BOOLEAN,
    "uncertaintyNarrative" TEXT,
    "alternativesConsidered" TEXT,
    "experimentationNarrative" TEXT,
    "outcome" TEXT,
    "qualified" BOOLEAN NOT NULL DEFAULT false,
    "qualificationNotes" TEXT,
    "excludedReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "legalEntityId" TEXT NOT NULL,
    "projectId" TEXT,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "employeeId" TEXT,
    "compensation" DECIMAL(15,2) NOT NULL,
    "bonus" DECIMAL(15,2),
    "bonusIncluded" BOOLEAN NOT NULL DEFAULT false,
    "qualifiedActivityPct" DECIMAL(5,4) NOT NULL,
    "qreAmount" DECIMAL(15,2),
    "methodologyBasis" TEXT,
    "supportSource" TEXT,
    "excluded" BOOLEAN NOT NULL DEFAULT false,
    "excludedReason" TEXT,
    "sourceFileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplyItem" (
    "id" TEXT NOT NULL,
    "legalEntityId" TEXT NOT NULL,
    "projectId" TEXT,
    "description" TEXT NOT NULL,
    "glAccount" TEXT,
    "amount" DECIMAL(15,2) NOT NULL,
    "qualified" BOOLEAN NOT NULL DEFAULT false,
    "isDepreciableProperty" BOOLEAN NOT NULL DEFAULT false,
    "isLandOrImprovement" BOOLEAN NOT NULL DEFAULT false,
    "isOverheadItem" BOOLEAN NOT NULL DEFAULT false,
    "qualificationStatus" TEXT NOT NULL DEFAULT 'pending',
    "supportSource" TEXT,
    "excludedReason" TEXT,
    "sourceFileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupplyItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractorItem" (
    "id" TEXT NOT NULL,
    "legalEntityId" TEXT NOT NULL,
    "projectId" TEXT,
    "vendorName" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "usBasedFlag" BOOLEAN NOT NULL DEFAULT true,
    "contractReference" TEXT,
    "qualifiedFlag" BOOLEAN NOT NULL DEFAULT false,
    "substantialRightsRetained" BOOLEAN,
    "successContingentPayment" BOOLEAN,
    "economicRiskBorne" BOOLEAN,
    "arrangedBeforeWork" BOOLEAN,
    "performedOnBehalf" BOOLEAN,
    "fundedResearchFlag" BOOLEAN NOT NULL DEFAULT false,
    "contractReviewRequired" BOOLEAN NOT NULL DEFAULT true,
    "contractReviewComplete" BOOLEAN NOT NULL DEFAULT false,
    "contractReviewNotes" TEXT,
    "qualifiedAmount" DECIMAL(15,2),
    "excludedReason" TEXT,
    "sourceFileId" TEXT,
    "contractFileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContractorItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadedFile" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "engagementId" TEXT,
    "originalName" TEXT NOT NULL,
    "storagePath" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "category" "DocumentCategory" NOT NULL,
    "status" "DocumentStatus" NOT NULL DEFAULT 'UPLOADED',
    "tags" TEXT[],
    "uploadedBy" TEXT NOT NULL,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewNotes" TEXT,
    "mappingTemplateId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UploadedFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentRequirement" (
    "id" TEXT NOT NULL,
    "engagementId" TEXT NOT NULL,
    "category" "DocumentCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "fulfilled" BOOLEAN NOT NULL DEFAULT false,
    "followUpSentAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MappingTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "columnMappings" JSONB NOT NULL,
    "requiredFields" TEXT[],
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MappingTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questionnaire" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "section" "QuestionnaireSection" NOT NULL,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "questions" JSONB NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Questionnaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionnaireAssignment" (
    "id" TEXT NOT NULL,
    "engagementId" TEXT NOT NULL,
    "questionnaireId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3),
    "responses" JSONB,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionnaireAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calculation" (
    "id" TEXT NOT NULL,
    "engagementId" TEXT NOT NULL,
    "taxYear" INTEGER NOT NULL,
    "ruleVersionId" TEXT NOT NULL,
    "method" "CalculationMethod" NOT NULL,
    "inputSnapshot" JSONB NOT NULL,
    "assumptionsSnapshot" JSONB NOT NULL,
    "resultsSnapshot" JSONB NOT NULL,
    "totalWageQre" DECIMAL(15,2) NOT NULL,
    "totalSupplyQre" DECIMAL(15,2) NOT NULL,
    "totalContractorQre" DECIMAL(15,2) NOT NULL,
    "totalQre" DECIMAL(15,2) NOT NULL,
    "ascCredit" DECIMAL(15,2),
    "ascBase" DECIMAL(15,2),
    "ascPrior3YearAvgQre" DECIMAL(15,2),
    "ascFallbackUsed" BOOLEAN NOT NULL DEFAULT false,
    "regularCredit" DECIMAL(15,2),
    "regularBase" DECIMAL(15,2),
    "fixedBasePct" DECIMAL(5,4),
    "recommendedMethod" "CalculationMethod" NOT NULL,
    "methodRationale" TEXT,
    "c280cElectionMade" BOOLEAN NOT NULL DEFAULT false,
    "grossCredit" DECIMAL(15,2),
    "reducedCredit" DECIMAL(15,2),
    "payrollOffsetEligible" BOOLEAN NOT NULL DEFAULT false,
    "payrollOffsetElected" BOOLEAN NOT NULL DEFAULT false,
    "payrollOffsetAmount" DECIMAL(15,2),
    "carryforwardReduction" DECIMAL(15,2),
    "scQre" DECIMAL(15,2),
    "scGrossCredit" DECIMAL(15,2),
    "scLiabilityLimit" DECIMAL(15,2),
    "scAllowedCredit" DECIMAL(15,2),
    "scCarryforward" DECIMAL(15,2),
    "isConsolidated" BOOLEAN NOT NULL DEFAULT false,
    "consolidatedQre" DECIMAL(15,2),
    "calculationNotes" TEXT,
    "lockedAt" TIMESTAMP(3),
    "lockedBy" TEXT,
    "runBy" TEXT NOT NULL,
    "runAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Calculation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalculationOverride" (
    "id" TEXT NOT NULL,
    "calculationId" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "previousValue" JSONB NOT NULL,
    "newValue" JSONB NOT NULL,
    "reason" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ruleVersionId" TEXT NOT NULL,
    "approvalStatus" "OverrideApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "reversedAt" TIMESTAMP(3),
    "reversedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CalculationOverride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriorYearQre" (
    "id" TEXT NOT NULL,
    "engagementId" TEXT NOT NULL,
    "taxYear" INTEGER NOT NULL,
    "entityId" TEXT,
    "qreAmount" DECIMAL(15,2) NOT NULL,
    "sourceFileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriorYearQre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrossReceiptsHistory" (
    "id" TEXT NOT NULL,
    "engagementId" TEXT NOT NULL,
    "taxYear" INTEGER NOT NULL,
    "entityId" TEXT,
    "amount" DECIMAL(15,2) NOT NULL,
    "sourceFileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GrossReceiptsHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "engagementId" TEXT NOT NULL,
    "calculationId" TEXT,
    "ruleVersionId" TEXT,
    "reportType" "ReportType" NOT NULL,
    "title" TEXT NOT NULL,
    "storagePath" TEXT,
    "xlsxPath" TEXT,
    "publishedAt" TIMESTAMP(3),
    "publishedBy" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "templateType" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportCitation" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fileId" TEXT,
    "citation" TEXT,
    "relevance" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupportCitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "engagementId" TEXT,
    "stripeInvoiceId" TEXT,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'DRAFT',
    "engagementFee" DECIMAL(15,2) NOT NULL,
    "contingencyFee" DECIMAL(15,2),
    "auditSupportFee" DECIMAL(15,2),
    "totalAmount" DECIMAL(15,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "dueDate" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "notes" TEXT,
    "lineItems" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "engagementId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackgroundJob" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "payload" JSONB NOT NULL,
    "result" JSONB,
    "error" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BackgroundJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_convertedToClientId_key" ON "Lead"("convertedToClientId");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_state_idx" ON "Lead"("state");

-- CreateIndex
CREATE INDEX "Lead_industry_idx" ON "Lead"("industry");

-- CreateIndex
CREATE UNIQUE INDEX "EstimatorRun_leadId_key" ON "EstimatorRun"("leadId");

-- CreateIndex
CREATE UNIQUE INDEX "EstimatorConfig_version_key" ON "EstimatorConfig"("version");

-- CreateIndex
CREATE UNIQUE INDEX "Client_userId_key" ON "Client"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE INDEX "Client_state_idx" ON "Client"("state");

-- CreateIndex
CREATE INDEX "LegalEntity_clientId_idx" ON "LegalEntity"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "TaxRuleVersion_version_key" ON "TaxRuleVersion"("version");

-- CreateIndex
CREATE INDEX "TaxRuleVersion_taxYear_idx" ON "TaxRuleVersion"("taxYear");

-- CreateIndex
CREATE INDEX "LegalUpdateRecord_implemented_idx" ON "LegalUpdateRecord"("implemented");

-- CreateIndex
CREATE INDEX "LegalUpdateRecord_jurisdiction_idx" ON "LegalUpdateRecord"("jurisdiction");

-- CreateIndex
CREATE INDEX "Engagement_clientId_idx" ON "Engagement"("clientId");

-- CreateIndex
CREATE INDEX "Engagement_taxYear_idx" ON "Engagement"("taxYear");

-- CreateIndex
CREATE INDEX "Engagement_status_idx" ON "Engagement"("status");

-- CreateIndex
CREATE INDEX "Project_engagementId_idx" ON "Project"("engagementId");

-- CreateIndex
CREATE INDEX "Employee_legalEntityId_idx" ON "Employee"("legalEntityId");

-- CreateIndex
CREATE INDEX "Employee_projectId_idx" ON "Employee"("projectId");

-- CreateIndex
CREATE INDEX "SupplyItem_legalEntityId_idx" ON "SupplyItem"("legalEntityId");

-- CreateIndex
CREATE INDEX "ContractorItem_legalEntityId_idx" ON "ContractorItem"("legalEntityId");

-- CreateIndex
CREATE INDEX "UploadedFile_clientId_idx" ON "UploadedFile"("clientId");

-- CreateIndex
CREATE INDEX "UploadedFile_engagementId_idx" ON "UploadedFile"("engagementId");

-- CreateIndex
CREATE INDEX "UploadedFile_status_idx" ON "UploadedFile"("status");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionnaireAssignment_engagementId_questionnaireId_key" ON "QuestionnaireAssignment"("engagementId", "questionnaireId");

-- CreateIndex
CREATE INDEX "Calculation_engagementId_idx" ON "Calculation"("engagementId");

-- CreateIndex
CREATE INDEX "Calculation_taxYear_idx" ON "Calculation"("taxYear");

-- CreateIndex
CREATE INDEX "CalculationOverride_calculationId_idx" ON "CalculationOverride"("calculationId");

-- CreateIndex
CREATE INDEX "PriorYearQre_engagementId_idx" ON "PriorYearQre"("engagementId");

-- CreateIndex
CREATE INDEX "GrossReceiptsHistory_engagementId_idx" ON "GrossReceiptsHistory"("engagementId");

-- CreateIndex
CREATE INDEX "Report_engagementId_idx" ON "Report"("engagementId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_stripeInvoiceId_key" ON "Invoice"("stripeInvoiceId");

-- CreateIndex
CREATE INDEX "Invoice_clientId_idx" ON "Invoice"("clientId");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_engagementId_idx" ON "AuditLog"("engagementId");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_read_idx" ON "Notification"("read");

-- CreateIndex
CREATE INDEX "BackgroundJob_status_idx" ON "BackgroundJob"("status");

-- CreateIndex
CREATE INDEX "BackgroundJob_type_idx" ON "BackgroundJob"("type");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_convertedToClientId_fkey" FOREIGN KEY ("convertedToClientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimatorRun" ADD CONSTRAINT "EstimatorRun_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalEntity" ADD CONSTRAINT "LegalEntity_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalEntity" ADD CONSTRAINT "LegalEntity_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "LegalEntity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalUpdateRecord" ADD CONSTRAINT "LegalUpdateRecord_implementedById_fkey" FOREIGN KEY ("implementedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_legalEntityId_fkey" FOREIGN KEY ("legalEntityId") REFERENCES "LegalEntity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_ruleVersionId_fkey" FOREIGN KEY ("ruleVersionId") REFERENCES "TaxRuleVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_legalEntityId_fkey" FOREIGN KEY ("legalEntityId") REFERENCES "LegalEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplyItem" ADD CONSTRAINT "SupplyItem_legalEntityId_fkey" FOREIGN KEY ("legalEntityId") REFERENCES "LegalEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplyItem" ADD CONSTRAINT "SupplyItem_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractorItem" ADD CONSTRAINT "ContractorItem_legalEntityId_fkey" FOREIGN KEY ("legalEntityId") REFERENCES "LegalEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractorItem" ADD CONSTRAINT "ContractorItem_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedFile" ADD CONSTRAINT "UploadedFile_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedFile" ADD CONSTRAINT "UploadedFile_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedFile" ADD CONSTRAINT "UploadedFile_mappingTemplateId_fkey" FOREIGN KEY ("mappingTemplateId") REFERENCES "MappingTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentRequirement" ADD CONSTRAINT "DocumentRequirement_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionnaireAssignment" ADD CONSTRAINT "QuestionnaireAssignment_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionnaireAssignment" ADD CONSTRAINT "QuestionnaireAssignment_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "Questionnaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculation" ADD CONSTRAINT "Calculation_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculation" ADD CONSTRAINT "Calculation_ruleVersionId_fkey" FOREIGN KEY ("ruleVersionId") REFERENCES "TaxRuleVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalculationOverride" ADD CONSTRAINT "CalculationOverride_calculationId_fkey" FOREIGN KEY ("calculationId") REFERENCES "Calculation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalculationOverride" ADD CONSTRAINT "CalculationOverride_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_calculationId_fkey" FOREIGN KEY ("calculationId") REFERENCES "Calculation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_ruleVersionId_fkey" FOREIGN KEY ("ruleVersionId") REFERENCES "TaxRuleVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportCitation" ADD CONSTRAINT "SupportCitation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
