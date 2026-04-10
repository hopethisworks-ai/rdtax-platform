import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { sendNewLeadAlert } from "@/lib/email";
import { notifyAdmins } from "@/lib/notify";
import { requireAuth } from "@/lib/rbac";

const CreateLeadSchema = z.object({
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  industry: z.string().optional(),
  state: z.string().optional(),
  revenueBand: z.string().optional(),
  employeeCount: z.number().int().optional(),
  leadSource: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const { error: authError } = await requireAuth("ANALYST", req);
  if (authError) return authError;
  const { searchParams } = new URL(req.url);
  const where: Record<string, unknown> = {};
  if (searchParams.get("status")) where.status = searchParams.get("status");
  if (searchParams.get("state")) where.state = searchParams.get("state");
  if (searchParams.get("industry")) where.industry = searchParams.get("industry");
  if (searchParams.get("source")) where.leadSource = searchParams.get("source");
  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: parseInt(searchParams.get("limit") ?? "50"),
    skip: parseInt(searchParams.get("offset") ?? "0"),
  });
  return NextResponse.json({ leads });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = CreateLeadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const lead = await prisma.lead.create({ data: parsed.data });
  await logAudit({
    action: "CREATE_LEAD",
    entityType: "Lead",
    entityId: lead.id,
    metadata: { email: lead.email, companyName: lead.companyName },
    ipAddress: req.headers.get("x-forwarded-for") ?? undefined,
  });
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    await sendNewLeadAlert(adminEmail, lead.id, lead.companyName).catch(console.error);
  }
  await notifyAdmins(
    "new_lead",
    "New Lead Submitted",
    `${lead.companyName} — ${lead.contactName} (${lead.email})`,
    { leadId: lead.id }
  );
  return NextResponse.json({ lead }, { status: 201 });
}
