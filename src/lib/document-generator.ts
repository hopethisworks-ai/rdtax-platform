/**
 * Document Generation Module
 *
 * Generates PDF documents for:
 *   - Client preliminary estimate
 *   - Methodology memo
 *   - Project narratives
 *   - Financial reconciliation memo
 *   - Final documentation package
 *
 * Documents are generated server-side and stored in object storage.
 * Each document is linked to a specific calculation and rule version.
 */
import { PDFDocument, StandardFonts, rgb, PageSizes } from "pdf-lib";
import type { Calculation, TaxRuleVersion, Engagement, Client } from "@prisma/client";

export type DocumentContext = {
  client: { companyName: string; contactName: string };
  engagement: { taxYear: number; engagementType: string };
  calculation: {
    totalQre: number | null;
    totalWageQre: number | null;
    totalSupplyQre: number | null;
    totalContractorQre: number | null;
    grossCredit: number | null;
    reducedCredit: number | null;
    scAllowedCredit: number | null;
    method: string;
    c280cElectionMade: boolean;
    methodRationale: string | null;
    ruleVersionId: string;
    runAt: Date;
  };
  ruleVersion: { version: string; formVersion: string; taxYear: number };
};

const DISCLAIMER = "THIS DOCUMENT IS PREPARED BY CREDITPATH R&D AND IS INTENDED FOR USE BY THE CLIENT'S TAX COUNSEL IN PREPARING OR AMENDING FEDERAL AND STATE TAX RETURNS. IT DOES NOT CONSTITUTE LEGAL OR TAX ADVICE. ALL CREDIT DETERMINATIONS MUST BE REVIEWED BY QUALIFIED TAX COUNSEL BEFORE FILING.";

function fmt(n: number | null | undefined): string {
  if (n == null) return "—";
  return `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export async function generatePreliminaryEstimatePdf(ctx: DocumentContext): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage(PageSizes.Letter);
  const { width, height } = page.getSize();
  const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);
  const font = await doc.embedFont(StandardFonts.Helvetica);

  const BLUE = rgb(0.149, 0.376, 0.878);
  const DARK = rgb(0.1, 0.1, 0.1);
  const GRAY = rgb(0.4, 0.4, 0.4);

  // Header bar
  page.drawRectangle({ x: 0, y: height - 80, width, height: 80, color: BLUE });
  page.drawText("CreditPath R&D", { x: 40, y: height - 30, size: 18, font: boldFont, color: rgb(1,1,1) });
  page.drawText("Preliminary R&D Tax Credit Estimate", { x: 40, y: height - 55, size: 12, font, color: rgb(0.8,0.9,1) });

  let y = height - 110;
  const line = (text: string, size: number = 10, f = font, color = DARK) => {
    page.drawText(text, { x: 40, y, size, font: f, color });
    y -= size + 6;
  };
  const gap = (n = 10) => { y -= n; };

  line(`Client: ${ctx.client.companyName}`, 11, boldFont, DARK);
  line(`Contact: ${ctx.client.contactName}`, 10, font, GRAY);
  line(`Tax Year: ${ctx.engagement.taxYear}`, 10, font, GRAY);
  line(`Rule Version: ${ctx.ruleVersion.version} (${ctx.ruleVersion.formVersion})`, 10, font, GRAY);
  line(`Generated: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`, 10, font, GRAY);
  gap(20);

  // Credit summary box
  page.drawRectangle({ x: 40, y: y - 110, width: width - 80, height: 110, color: rgb(0.95,0.97,1), borderColor: BLUE, borderWidth: 1 });
  y -= 10;
  line("CREDIT SUMMARY", 11, boldFont, BLUE);
  gap(4);

  const rows = [
    ["Total QRE", fmt(ctx.calculation.totalQre)],
    ["  Wage QRE", fmt(ctx.calculation.totalWageQre)],
    ["  Supply QRE", fmt(ctx.calculation.totalSupplyQre)],
    ["  Contractor QRE", fmt(ctx.calculation.totalContractorQre)],
    [`Federal Credit (${ctx.calculation.method})`, fmt(ctx.calculation.reducedCredit ?? ctx.calculation.grossCredit)],
  ];
  if (ctx.calculation.scAllowedCredit && Number(ctx.calculation.scAllowedCredit) > 0) {
    rows.push(["SC State Credit", fmt(ctx.calculation.scAllowedCredit)]);
  }

  for (const [label, value] of rows) {
    page.drawText(label, { x: 50, y, size: 10, font, color: DARK });
    page.drawText(value, { x: width - 150, y, size: 10, font: boldFont, color: DARK });
    y -= 16;
  }

  gap(30);
  line("METHOD RECOMMENDATION", 11, boldFont, DARK);
  gap(4);
  line(`Selected Method: ${ctx.calculation.method}${ctx.calculation.c280cElectionMade ? " (280C reduced)" : ""}`, 10, font, DARK);
  if (ctx.calculation.methodRationale) {
    // Word-wrap the rationale
    const words = ctx.calculation.methodRationale.split(" ");
    let currentLine = "";
    for (const word of words) {
      if ((currentLine + word).length > 85) {
        line(currentLine.trim(), 9, font, GRAY);
        currentLine = word + " ";
      } else {
        currentLine += word + " ";
      }
    }
    if (currentLine.trim()) line(currentLine.trim(), 9, font, GRAY);
  }

  gap(30);
  // Disclaimer at bottom — rendered in reading order, stacked upward from page bottom
  const disclaimerLines = DISCLAIMER.match(/.{1,95}/g) ?? [];
  const disclaimerBlockHeight = disclaimerLines.length * 8 + 14; // lines + separator gap
  let dy = 40 + disclaimerBlockHeight; // start high enough to fit all lines above y=40
  page.drawLine({ start: { x: 40, y: dy }, end: { x: width - 40, y: dy }, thickness: 0.5, color: GRAY });
  dy -= 10;
  for (const dl of disclaimerLines) {
    page.drawText(dl, { x: 40, y: dy, size: 6, font, color: GRAY });
    dy -= 8;
  }

  return doc.save();
}

export async function generateMethodologyMemoPdf(ctx: DocumentContext & {
  assumptions: Record<string, unknown>;
  legalUpdateBaseline?: string;
}): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage(PageSizes.Letter);
  const { width, height } = page.getSize();
  const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const BLUE = rgb(0.149, 0.376, 0.878);
  const DARK = rgb(0.1, 0.1, 0.1);
  const GRAY = rgb(0.4, 0.4, 0.4);

  page.drawRectangle({ x: 0, y: height - 80, width, height: 80, color: BLUE });
  page.drawText("CreditPath R&D – Methodology Memorandum", { x: 40, y: height - 30, size: 14, font: boldFont, color: rgb(1,1,1) });
  page.drawText(`${ctx.client.companyName} | Tax Year ${ctx.engagement.taxYear}`, { x: 40, y: height - 55, size: 10, font, color: rgb(0.8,0.9,1) });

  let y = height - 110;
  const line = (text: string, size = 10, f = font, color = DARK) => {
    if (y < 80) return; // prevent overflow
    page.drawText(text, { x: 40, y, size, font: f, color });
    y -= size + 6;
  };
  const gap = (n = 10) => { y -= n; };
  const section = (title: string) => { gap(10); line(title, 11, boldFont, BLUE); gap(4); };

  section("ENGAGEMENT INFORMATION");
  line(`Tax Year: ${ctx.ruleVersion.taxYear}`, 10, font, DARK);
  line(`Rule Version: ${ctx.ruleVersion.version}`, 10, font, DARK);
  line(`Form Version: ${ctx.ruleVersion.formVersion}`, 10, font, DARK);
  if (ctx.legalUpdateBaseline) line(`Legal Update Baseline: ${ctx.legalUpdateBaseline}`, 10, font, DARK);
  line(`Calculation Method: ${ctx.calculation.method}`, 10, font, DARK);

  section("LEGAL STANDARDS");
  line("IRC §41 – Research Credit: Four-part test required for all QREs.", 9, font, DARK);
  line("IRS ATG – Substantiation: Business-component mapping required.", 9, font, DARK);
  line("IRC §41(c)(5) – ASC: 14% × (current QRE − 50% of prior 3-year average).", 9, font, DARK);
  line("IRC §41(a)(1) – Regular: 20% × (current QRE − base amount).", 9, font, DARK);
  line("IRC §280C – Reduced credit election applied if elected on original return.", 9, font, DARK);

  section("WAGE METHODOLOGY");
  const wageMethod = (ctx.assumptions.wageMethodology as string) ?? "Employee-provided time allocations reviewed against project records.";
  line(wageMethod, 9, font, DARK);

  section("CONTRACTOR METHODOLOGY");
  const contractorMethod = (ctx.assumptions.contractorMethodology as string) ?? "Contract review performed for each vendor. Substantial rights and funded-research analysis applied per IRS ATG.";
  line(contractorMethod, 9, font, DARK);

  section("SUPPLY METHODOLOGY");
  const supplyMethod = (ctx.assumptions.supplyMethodology as string) ?? "GL accounts reviewed. Depreciable, overhead, and land items excluded per §41(b)(2)(C).";
  line(supplyMethod, 9, font, DARK);

  section("LIMITATIONS");
  line("This memorandum reflects analysis as of the date of delivery under the rule version noted above.", 9, font, GRAY);
  line("Results may differ under amended returns or subsequent IRS examinations.", 9, font, GRAY);

  const disclaimerLines2 = DISCLAIMER.match(/.{1,95}/g) ?? [];
  const disclaimerBlockHeight2 = disclaimerLines2.length * 8 + 14;
  let dy2 = 40 + disclaimerBlockHeight2;
  page.drawLine({ start: { x: 40, y: dy2 }, end: { x: width - 40, y: dy2 }, thickness: 0.5, color: GRAY });
  dy2 -= 10;
  for (const dl of disclaimerLines2) {
    page.drawText(dl, { x: 40, y: dy2, size: 6, font, color: GRAY });
    dy2 -= 8;
  }

  return doc.save();
}
