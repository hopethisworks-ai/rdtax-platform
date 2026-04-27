import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEstimatorAlert } from "@/lib/email";

const EstimatorSchema = z.object({
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  industry: z.string().optional(),
  state: z.string().optional(),
  revenueBand: z.string().optional(),
  employeeCount: z.number().int().optional(),
  technicalEmployees: z.number().int().optional(),
  annualPayroll: z.number().positive(),
  contractorSpend: z.number().min(0),
  supplySpend: z.number().min(0),
  priorCreditClaimed: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = EstimatorSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const config = await prisma.estimatorConfig.findFirst({ where: { active: true }, orderBy: { createdAt: "desc" } });
  if (!config) return NextResponse.json({ error: "Estimator not configured" }, { status: 500 });

  const d = parsed.data;
  const wageMultiplier = Number(config.wageMultiplier);
  const contractorMultiplier = Number(config.contractorMultiplier);
  const supplyMultiplier = Number(config.supplyMultiplier);
  const federalRate = Number(config.federalCreditRate);
  const scRate = Number(config.scCreditRate);

  // Estimate QRE range
  const qreLow = d.annualPayroll * wageMultiplier * 0.8 + d.contractorSpend * contractorMultiplier * 0.65 * 0.8 + d.supplySpend * supplyMultiplier * 0.8;
  const qreHigh = d.annualPayroll * wageMultiplier * 1.0 + d.contractorSpend * contractorMultiplier * 0.65 * 1.0 + d.supplySpend * supplyMultiplier * 1.0;
  const creditLow = Math.round(qreLow * federalRate * 0.14 / 0.20); // ASC tends to yield less
  const creditHigh = Math.round(qreHigh * federalRate);
  const scCreditLow = d.state === "SC" ? Math.round(qreLow * scRate) : 0;
  const scCreditHigh = d.state === "SC" ? Math.round(qreHigh * scRate) : 0;

  const run = await prisma.estimatorRun.create({
    data: {
      companyName: d.companyName,
      contactName: d.contactName,
      email: d.email,
      phone: d.phone,
      industry: d.industry,
      state: d.state,
      revenueBand: d.revenueBand,
      employeeCount: d.employeeCount,
      technicalEmployees: d.technicalEmployees,
      annualPayroll: d.annualPayroll,
      contractorSpend: d.contractorSpend,
      supplySpend: d.supplySpend,
      priorCreditClaimed: d.priorCreditClaimed,
      estimateLow: creditLow,
      estimateHigh: creditHigh,
      multipliersVersion: config.version,
    },
  });

  // Create a lead
  const lead = await prisma.lead.create({
    data: {
      companyName: d.companyName,
      contactName: d.contactName,
      email: d.email,
      phone: d.phone,
      industry: d.industry,
      state: d.state,
      revenueBand: d.revenueBand,
      leadSource: "estimator",
    },
  });
  await prisma.estimatorRun.update({ where: { id: run.id }, data: { leadId: lead.id } });

  // Send admin email alert
  const adminEmail = process.env.ADMIN_EMAIL ?? "partnerships@alexanderandblake.com";
  await sendEstimatorAlert(adminEmail, {
    companyName: d.companyName,
    contactName: d.contactName,
    email: d.email,
    phone: d.phone,
    industry: d.industry,
    state: d.state,
    annualPayroll: d.annualPayroll,
    contractorSpend: d.contractorSpend,
    supplySpend: d.supplySpend,
    estimateLow: creditLow,
    estimateHigh: creditHigh,
    scCreditLow,
    scCreditHigh,
    leadId: lead.id,
  }).catch(console.error);

  return NextResponse.json({
    estimateLow: creditLow,
    estimateHigh: creditHigh,
    scCreditLow,
    scCreditHigh,
    disclaimer: "This is a preliminary estimate only. Actual credits depend on detailed review of your specific facts, documentation, and applicable law. This estimate does not constitute tax advice.",
    cta: "Schedule a free consultation to discuss your full engagement.",
    runId: run.id,
    leadId: lead.id,
  });
}
