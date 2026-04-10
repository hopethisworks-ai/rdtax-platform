import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireAuth } from "@/lib/rbac";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error, session } = await requireAuth("ANALYST", req);
  if (error) return error;
  const engagement = await prisma.engagement.findUnique({
    where: { id },
    include: {
      client: true,
      legalEntity: true,
      ruleVersion: true,
      projects: { include: { employees: true, supplies: true, contractors: true } },
      questionnaires: { include: { questionnaire: true } },
      uploadedFiles: true,
      calculations: { orderBy: { runAt: "desc" }, take: 5 },
      reports: true,
      invoices: true,
      documentRequirements: true,
    },
  });
  if (!engagement) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ engagement });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error, session } = await requireAuth("ANALYST", req);
  if (error) return error;
  const body = await req.json();
  const engagement = await prisma.engagement.update({
    where: { id },
    data: {
      ...(body.status && { status: body.status }),
      ...(body.internalNotes !== undefined && { internalNotes: body.internalNotes }),
      ...(body.ruleVersionId && { ruleVersionId: body.ruleVersionId }),
      ...(body.assignedTo && { assignedTo: body.assignedTo }),
    },
  });
  await logAudit({
    userId: (session!.user as { id?: string }).id,
    engagementId: engagement.id,
    action: "UPDATE_ENGAGEMENT",
    entityType: "Engagement",
    entityId: engagement.id,
    metadata: body,
  });
  return NextResponse.json({ engagement });
}
