import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireAuth } from "@/lib/rbac";
import { sendClientInvite } from "@/lib/email";
import { randomBytes } from "crypto";

const CreateClientSchema = z.object({
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  industry: z.string().optional(),
  state: z.string().optional(),
  leadId: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const { error } = await requireAuth("ANALYST", req);
  if (error) return error;
  const { searchParams } = new URL(req.url);
  const where: Record<string, unknown> = {};
  if (searchParams.get("status")) where.active = searchParams.get("status") === "active";
  const clients = await prisma.client.findMany({
    where,
    include: { engagements: { select: { id: true, taxYear: true, status: true } } },
    orderBy: { createdAt: "desc" },
    take: parseInt(searchParams.get("limit") ?? "50"),
  });
  return NextResponse.json({ clients });
}

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth("ADMIN", req);
  if (error) return error;
  const body = await req.json();
  const parsed = CreateClientSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  // Create user account for the client
  const user = await prisma.user.upsert({
    where: { email: parsed.data.email },
    update: {},
    create: { email: parsed.data.email, name: parsed.data.contactName, role: "CLIENT" },
  });
  const client = await prisma.client.create({
    data: {
      userId: user.id,
      companyName: parsed.data.companyName,
      contactName: parsed.data.contactName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      industry: parsed.data.industry,
      state: parsed.data.state,
      invitedAt: new Date(),
    },
  });
  // Link lead if provided
  if (parsed.data.leadId) {
    await prisma.lead.update({
      where: { id: parsed.data.leadId },
      data: { convertedToClientId: client.id, status: "SIGNED" },
    });
  }
  // Generate magic-link style invite token
  const inviteToken = randomBytes(32).toString("hex");
  await prisma.verificationToken.create({
    data: {
      identifier: parsed.data.email,
      token: inviteToken,
      expires: new Date(Date.now() + 48 * 60 * 60 * 1000),
    },
  });
  await sendClientInvite(parsed.data.email, parsed.data.contactName, inviteToken).catch(console.error);
  await logAudit({
    userId: (session!.user as { id?: string }).id,
    action: "INVITE_CLIENT",
    entityType: "Client",
    entityId: client.id,
    metadata: { email: parsed.data.email },
  });
  return NextResponse.json({ client }, { status: 201 });
}
