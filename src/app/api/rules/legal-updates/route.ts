import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireAuth } from "@/lib/rbac";
import { sendLegalUpdateFlagged } from "@/lib/email";

const CreateLegalUpdateSchema = z.object({
  sourceType: z.enum(["IRS_INSTRUCTION","REGULATION","ATG","IRM","DIRECTIVE","COURT_CASE","STATE_GUIDANCE"]),
  sourceTitle: z.string(),
  jurisdiction: z.string(),
  citation: z.string().optional(),
  effectiveDate: z.string().datetime().optional(),
  summary: z.string(),
  impactedModules: z.array(z.string()).default([]),
  isMandatory: z.boolean().default(false),
  notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const { error } = await requireAuth("ANALYST", req);
  if (error) return error;
  const { searchParams } = new URL(req.url);
  const where: Record<string, unknown> = {};
  if (searchParams.get("implemented") !== null) where.implemented = searchParams.get("implemented") === "true";
  const updates = await prisma.legalUpdateRecord.findMany({ where, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ updates });
}

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth("ADMIN", req);
  if (error) return error;
  const body = await req.json();
  const parsed = CreateLegalUpdateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const update = await prisma.legalUpdateRecord.create({
    data: {
      ...parsed.data,
      effectiveDate: parsed.data.effectiveDate ? new Date(parsed.data.effectiveDate) : undefined,
    },
  });
  await logAudit({ userId: (session!.user as { id?: string }).id, action: "CREATE_LEGAL_UPDATE", entityType: "LegalUpdateRecord", entityId: update.id });
  if (update.isMandatory && process.env.ADMIN_EMAIL) {
    await sendLegalUpdateFlagged(process.env.ADMIN_EMAIL, update.id, update.sourceTitle).catch(console.error);
  }
  return NextResponse.json({ update }, { status: 201 });
}
