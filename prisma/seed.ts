/**
 * Database seed – creates demo data for local/staging environments.
 * Creates: admin user, demo client, engagements, tax rule versions, estimator config
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱  Seeding database...");

  // ── Tax Rule Versions ──────────────────────────────────────────────────────
  const rule2024 = await prisma.taxRuleVersion.upsert({
    where: { version: "2024.1.0" },
    update: {},
    create: {
      version: "2024.1.0",
      taxYear: 2024,
      federalRuleVersion: "IRC-41-2024",
      stateRuleVersion: "SC-12-6-3375-2024",
      formVersion: "Form 6765 (Rev. January 2024)",
      creditRates: {
        ascRate: 0.14,
        ascFallbackRate: 0.06,
        regularRate: 0.20,
        contractorQrePct: 0.65,
        scRate: 0.05,
      },
      carryforwardRules: { federalYears: 20, scYears: 10 },
      payrollOffsetCap: 500000,
      c280cPresentationLogic: { regularTaxRate: 0.21 },
      groupReportingLogic: { aggregateControlledGroup: true },
      disclosureRequirements: { form6765Required: true },
      ascFallbackRules: { fallbackRate: 0.06, condition: "no_prior_3_year_qre" },
      effectiveFrom: new Date("2024-01-01"),
      notes: "Initial 2024 tax year ruleset. ASC: 14%, Regular: 20%, SC: 5%.",
    },
  });

  const rule2023 = await prisma.taxRuleVersion.upsert({
    where: { version: "2023.1.0" },
    update: {},
    create: {
      version: "2023.1.0",
      taxYear: 2023,
      federalRuleVersion: "IRC-41-2023",
      stateRuleVersion: "SC-12-6-3375-2023",
      formVersion: "Form 6765 (Rev. January 2023)",
      creditRates: {
        ascRate: 0.14,
        ascFallbackRate: 0.06,
        regularRate: 0.20,
        contractorQrePct: 0.65,
        scRate: 0.05,
      },
      carryforwardRules: { federalYears: 20, scYears: 10 },
      payrollOffsetCap: 500000,
      c280cPresentationLogic: { regularTaxRate: 0.21 },
      groupReportingLogic: { aggregateControlledGroup: true },
      disclosureRequirements: { form6765Required: true },
      ascFallbackRules: { fallbackRate: 0.06, condition: "no_prior_3_year_qre" },
      effectiveFrom: new Date("2023-01-01"),
      effectiveTo: new Date("2023-12-31"),
      notes: "2023 tax year ruleset.",
    },
  });

  console.log("  ✓ Tax rule versions created");

  // ── Legal Update Records ───────────────────────────────────────────────────
  await prisma.legalUpdateRecord.upsert({
    where: { id: "legal-little-sandy" },
    update: {},
    create: {
      id: "legal-little-sandy",
      sourceType: "COURT_CASE",
      sourceTitle: "Little Sandy Coal Co. v. Commissioner",
      jurisdiction: "federal",
      citation: "7th Cir. 2022",
      effectiveDate: new Date("2022-01-01"),
      summary: "7th Circuit affirmed denial of research credit where taxpayer failed strict project/business-component substantiation. Reinforces requirement for project-level QRE support.",
      impactedModules: ["wage_qre", "project_narrative", "substantiation"],
      isMandatory: true,
      implemented: true,
      implementedDate: new Date("2022-06-01"),
      notes: "Platform requires business-component mapping and project-level qualification flags for all QRE buckets.",
    },
  });

  await prisma.legalUpdateRecord.upsert({
    where: { id: "legal-siemer" },
    update: {},
    create: {
      id: "legal-siemer",
      sourceType: "COURT_CASE",
      sourceTitle: "Siemer Milling Co. v. Commissioner",
      jurisdiction: "federal",
      citation: "T.C. Memo 2021",
      effectiveDate: new Date("2021-01-01"),
      summary: "Court denied credit where project documentation lacked specific uncertainty, alternatives considered, and experimentation details. Requires project-level four-part-test narratives.",
      impactedModules: ["project_narrative", "four_part_test", "questionnaire"],
      isMandatory: true,
      implemented: true,
      implementedDate: new Date("2022-01-01"),
      notes: "Questionnaire engine requires uncertainty narrative, alternatives considered, and experimentation narrative for each project.",
    },
  });

  await prisma.legalUpdateRecord.upsert({
    where: { id: "legal-populous" },
    update: {},
    create: {
      id: "legal-populous",
      sourceType: "COURT_CASE",
      sourceTitle: "Populous Group, Inc. v. Commissioner",
      jurisdiction: "federal",
      citation: "T.C. Memo 2020",
      effectiveDate: new Date("2020-01-01"),
      summary: "Court analyzed funded-research exclusion and substantial-rights retention for architecture firm. Highlights importance of contract-level analysis for contractor QRE.",
      impactedModules: ["contractor_qre", "funded_research", "substantial_rights"],
      isMandatory: true,
      implemented: true,
      implementedDate: new Date("2021-01-01"),
      notes: "Contractor review workflow requires substantialRightsRetained, successContingentPayment, and economicRiskBorne flags.",
    },
  });

  console.log("  ✓ Legal update records created");

  // ── Estimator Config ───────────────────────────────────────────────────────
  await prisma.estimatorConfig.upsert({
    where: { version: "v1.0" },
    update: {},
    create: {
      version: "v1.0",
      wageMultiplier: 0.65,
      contractorMultiplier: 0.35,
      supplyMultiplier: 0.50,
      federalCreditRate: 0.12, // conservative ASC-based estimate
      scCreditRate: 0.05,
      notes: "Default estimator multipliers. Adjustable by super admin without code deployment.",
      active: true,
    },
  });

  console.log("  ✓ Estimator config created");

  // ── Admin User ─────────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("Admin123!demo", 12);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@rdtaxdemo.com" },
    update: { passwordHash: adminPassword, active: true, role: "SUPER_ADMIN" },
    create: {
      email: "admin@rdtaxdemo.com",
      name: "Platform Admin",
      role: "SUPER_ADMIN",
      passwordHash: adminPassword,
      active: true,
    },
  });

  const analystPassword = await bcrypt.hash("Analyst123!demo", 12);
  const analystUser = await prisma.user.upsert({
    where: { email: "analyst@rdtaxdemo.com" },
    update: { passwordHash: analystPassword, active: true, role: "ANALYST" },
    create: {
      email: "analyst@rdtaxdemo.com",
      name: "Demo Analyst",
      role: "ANALYST",
      passwordHash: analystPassword,
      active: true,
    },
  });

  console.log("  ✓ Admin and analyst users created");

  // ── Demo Client ────────────────────────────────────────────────────────────
  const clientPassword = await bcrypt.hash("Client123!demo", 12);
  const clientUser = await prisma.user.upsert({
    where: { email: "client@acmesoftware.demo" },
    update: { passwordHash: clientPassword, active: true, role: "CLIENT" },
    create: {
      email: "client@acmesoftware.demo",
      name: "Jane Smith",
      role: "CLIENT",
      passwordHash: clientPassword,
      active: true,
    },
  });

  const demoClient = await prisma.client.upsert({
    where: { email: "client@acmesoftware.demo" },
    update: {},
    create: {
      userId: clientUser.id,
      companyName: "Acme Software Inc.",
      contactName: "Jane Smith",
      email: "client@acmesoftware.demo",
      phone: "555-123-4567",
      industry: "Software & Technology",
      state: "SC",
      invitedAt: new Date(),
      onboardedAt: new Date(),
    },
  });

  // ── Legal Entity ───────────────────────────────────────────────────────────
  const legalEntity = await prisma.legalEntity.upsert({
    where: { id: "entity-acme-2024" },
    update: {},
    create: {
      id: "entity-acme-2024",
      clientId: demoClient.id,
      name: "Acme Software Inc.",
      entityType: "C-Corp",
      taxYear: 2024,
      state: "SC",
      isParent: true,
    },
  });

  console.log("  ✓ Demo client and legal entity created");

  // ── Demo Engagement ────────────────────────────────────────────────────────
  const engagement = await prisma.engagement.upsert({
    where: { id: "engagement-acme-2024" },
    update: {},
    create: {
      id: "engagement-acme-2024",
      clientId: demoClient.id,
      legalEntityId: legalEntity.id,
      taxYear: 2024,
      status: "CALCULATION",
      ruleVersionId: rule2024.id,
      engagementType: "standard",
      assignedTo: analystUser.id,
      internalNotes: "Demo engagement. All data is synthetic.",
    },
  });

  // ── Employees ──────────────────────────────────────────────────────────────
  await prisma.employee.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "emp-alice",
        legalEntityId: legalEntity.id,
        name: "Alice Chen",
        title: "Senior Software Engineer",
        compensation: 145000,
        bonus: 15000,
        bonusIncluded: true,
        qualifiedActivityPct: 0.85,
        methodologyBasis: "time-tracking",
      },
      {
        id: "emp-bob",
        legalEntityId: legalEntity.id,
        name: "Bob Torres",
        title: "Research Engineer",
        compensation: 130000,
        bonus: 0,
        bonusIncluded: false,
        qualifiedActivityPct: 1.0,
        methodologyBasis: "project-estimate",
      },
      {
        id: "emp-carol",
        legalEntityId: legalEntity.id,
        name: "Carol Watts",
        title: "QA Engineer",
        compensation: 95000,
        bonus: 0,
        bonusIncluded: false,
        qualifiedActivityPct: 0.4,
        methodologyBasis: "survey",
      },
    ],
  });

  // ── Supplies ───────────────────────────────────────────────────────────────
  await prisma.supplyItem.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "sup-cloud",
        legalEntityId: legalEntity.id,
        description: "AWS cloud compute for R&D workloads",
        glAccount: "7200",
        amount: 48000,
        qualified: true,
        isDepreciableProperty: false,
        isLandOrImprovement: false,
        isOverheadItem: false,
        qualificationStatus: "qualified",
      },
      {
        id: "sup-proto",
        legalEntityId: legalEntity.id,
        description: "3D printing materials for prototype testing",
        glAccount: "7210",
        amount: 12000,
        qualified: true,
        isDepreciableProperty: false,
        isLandOrImprovement: false,
        isOverheadItem: false,
        qualificationStatus: "qualified",
      },
    ],
  });

  // ── Contractors ────────────────────────────────────────────────────────────
  await prisma.contractorItem.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "con-devfirm",
        legalEntityId: legalEntity.id,
        vendorName: "DevFirm LLC",
        amount: 80000,
        usBasedFlag: true,
        contractReference: "SOW-2024-001",
        qualifiedFlag: true,
        substantialRightsRetained: true,
        successContingentPayment: false,
        economicRiskBorne: true,
        arrangedBeforeWork: true,
        performedOnBehalf: true,
        fundedResearchFlag: false,
        contractReviewRequired: true,
        contractReviewComplete: true,
        contractReviewNotes: "Contract reviewed. Fixed-fee arrangement. Taxpayer retains all IP rights. Substantial rights confirmed.",
        qualifiedAmount: 52000, // 80000 * 0.65
      },
    ],
  });

  console.log("  ✓ Demo employees, supplies, and contractors created");

  // ── Projects ───────────────────────────────────────────────────────────────
  await prisma.project.upsert({
    where: { id: "proj-api-platform" },
    update: {},
    create: {
      id: "proj-api-platform",
      engagementId: engagement.id,
      name: "Next-Gen API Platform",
      description: "Development of a high-throughput, fault-tolerant API routing platform with novel rate-limiting algorithms.",
      businessComponent: "software",
      objective: "Develop a new API gateway with sub-millisecond routing that reduces latency by 60% versus existing solutions.",
      permittedPurpose: true,
      technologicalInformation: true,
      processOfExperimentation: true,
      qualifiedResearch: true,
      uncertaintyNarrative: "Substantial uncertainty existed as to whether the target latency could be achieved using existing technologies. Multiple architectural approaches were evaluated.",
      alternativesConsidered: "Evaluated nginx-based proxy, eBPF kernel bypass, and custom Rust implementation. Each had different trade-offs in latency, throughput, and maintainability.",
      experimentationNarrative: "Systematic testing was performed: profiling existing architecture, prototyping three alternative designs, benchmarking under simulated load, and iterating based on performance data.",
      outcome: "Novel eBPF-based routing layer developed, achieving 0.8ms median latency vs 12ms baseline.",
      qualified: true,
    },
  });

  console.log("  ✓ Demo project created");

  // ── Document Requirements ──────────────────────────────────────────────────
  await prisma.documentRequirement.createMany({
    skipDuplicates: true,
    data: [
      { id: "docreq-1", engagementId: engagement.id, category: "PAYROLL_EXPORT", description: "2024 payroll export (all employees)", required: true, fulfilled: true },
      { id: "docreq-2", engagementId: engagement.id, category: "GENERAL_LEDGER", description: "2024 general ledger – R&D accounts", required: true, fulfilled: true },
      { id: "docreq-3", engagementId: engagement.id, category: "CONTRACTOR_AGREEMENT", description: "SOW-2024-001 (DevFirm LLC)", required: true, fulfilled: true },
      { id: "docreq-4", engagementId: engagement.id, category: "PROJECT_LIST", description: "Master project list with team assignments", required: true, fulfilled: false },
      { id: "docreq-5", engagementId: engagement.id, category: "PRIOR_STUDY", description: "Prior-year R&D credit study (if any)", required: false, fulfilled: false },
    ],
  });

  console.log("  ✓ Document requirements created");

  // ── Prior-Year QRE ─────────────────────────────────────────────────────────
  await prisma.priorYearQre.createMany({
    skipDuplicates: true,
    data: [
      { id: "pqre-2023", engagementId: engagement.id, taxYear: 2023, entityId: legalEntity.id, qreAmount: 280000 },
      { id: "pqre-2022", engagementId: engagement.id, taxYear: 2022, entityId: legalEntity.id, qreAmount: 240000 },
      { id: "pqre-2021", engagementId: engagement.id, taxYear: 2021, entityId: legalEntity.id, qreAmount: 200000 },
    ],
  });

  // ── Gross Receipts ─────────────────────────────────────────────────────────
  await prisma.grossReceiptsHistory.createMany({
    skipDuplicates: true,
    data: [
      { id: "gr-2023", engagementId: engagement.id, taxYear: 2023, entityId: legalEntity.id, amount: 8500000 },
      { id: "gr-2022", engagementId: engagement.id, taxYear: 2022, entityId: legalEntity.id, amount: 7200000 },
      { id: "gr-2021", engagementId: engagement.id, taxYear: 2021, entityId: legalEntity.id, amount: 6100000 },
      { id: "gr-2020", engagementId: engagement.id, taxYear: 2020, entityId: legalEntity.id, amount: 5000000 },
    ],
  });

  console.log("  ✓ Prior-year QRE and gross receipts created");

  // ── Sample Lead ────────────────────────────────────────────────────────────
  await prisma.lead.upsert({
    where: { id: "lead-demo-1" },
    update: {},
    create: {
      id: "lead-demo-1",
      companyName: "Beta Technologies LLC",
      contactName: "Mark Johnson",
      email: "mark@betatech.demo",
      phone: "555-987-6543",
      industry: "Manufacturing",
      state: "SC",
      revenueBand: "$5M–$20M",
      employeeCount: 45,
      leadSource: "estimator",
      status: "QUALIFIED",
      notes: "Demo lead. Manufacturer in SC with active R&D in process improvement.",
    },
  });

  console.log("  ✓ Sample lead created");

  console.log("\n✅  Seed complete!\n");
  console.log("Demo accounts:");
  console.log("  Admin:   admin@rdtaxdemo.com    / Admin123!demo");
  console.log("  Analyst: analyst@rdtaxdemo.com  / Analyst123!demo");
  console.log("  Client:  client@acmesoftware.demo / Client123!demo");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
