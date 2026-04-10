import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireAuth } from "@/lib/rbac";

const UpdateLeadSchema = z.object({
  status: z.enum(["NEW","CONTACTED","QUALIFIED","PROPOSAL_SENT","SIGNED","LOST"]).optional(),
  notes: z.string().optional(),
  assignedTo: z.string().optional(),
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, session } = await requireAuth("ANALYST", req);
  if (error) return error;
  const lead = await prisma.lead.findUnique({ where: { id: params.id }, include: { estimatorRun: true } });
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ lead });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, session } = await requireAuth("ANALYST", req);
  if (error) return error;
  const body = await req.json();
  const parsed = UpdateLeadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const lead = await prisma.lead.update({ where: { id: params.id }, data: parsed.data });
  await logAudit({
    userId: (session!.user as { id?: string }).id,
    action: "UPDATE_LEAD",
    entityType: "Lead",
    entityId: lead.id,
    metadata: parsed.data,
  });
  return NextResponse.json({ lead });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, session } = await requireAuth("ADMIN", req);
  if (error) return error;
  await prisma.lead.delete({ where: { id: params.id } });
  await logAudit({ userId: (session!.user as { id?: string }).id, action: "UPDATE_LEAD", entityType: "Lead", entityId: params.id, metadata: { deleted: true } });
  return NextResponse.json({ success: true });
}
