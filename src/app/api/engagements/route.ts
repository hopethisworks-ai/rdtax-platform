import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireAuth } from "@/lib/rbac";

const CreateEngagementSchema = z.object({
  clientId: z.string(),
  legalEntityId: z.string().optional(),
  taxYear: z.number().int().min(2000).max(2100),
  ruleVersionId: z.string().optional(),
  engagementType: z.string().default("standard"),
  assignedTo: z.string().optional(),
  internalNotes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const { error, session } = await requireAuth("ANALYST", req);
  if (error) return error;
  const { searchParams } = new URL(req.url);
  const where: Record<string, unknown> = {};
  if (searchParams.get("clientId")) where.clientId = searchParams.get("clientId");
  if (searchParams.get("status")) where.status = searchParams.get("status");
  if (searchParams.get("taxYear")) where.taxYear = parseInt(searchParams.get("taxYear")!);
  const engagements = await prisma.engagement.findMany({
    where,
    include: { client: { select: { companyName: true, email: true } }, ruleVersion: { select: { version: true } } },
    orderBy: { createdAt: "desc" },
    take: parseInt(searchParams.get("limit") ?? "50"),
    skip: parseInt(searchParams.get("offset") ?? "0"),
  });
  return NextResponse.json({ engagements });
}

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth("ADMIN", req);
  if (error) return error;
  const body = await req.json();
  const parsed = CreateEngagementSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const engagement = await prisma.engagement.create({
    data: parsed.data,
    include: { client: { select: { companyName: true } } },
  });
  await logAudit({
    userId: (session!.user as { id?: string }).id,
    engagementId: engagement.id,
    action: "CREATE_ENGAGEMENT",
    entityType: "Engagement",
    entityId: engagement.id,
    metadata: { taxYear: engagement.taxYear, clientId: engagement.clientId },
  });
  return NextResponse.json({ engagement }, { status: 201 });
}
