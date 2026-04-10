import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireAuth } from "@/lib/rbac";
import { generateStorageKey, getSignedDownloadUrl } from "@/lib/storage";

const RegisterUploadSchema = z.object({
  clientId: z.string(),
  engagementId: z.string().optional(),
  originalName: z.string(),
  mimeType: z.string(),
  sizeBytes: z.number().int(),
  category: z.enum(["PAYROLL_EXPORT","GENERAL_LEDGER","TRIAL_BALANCE","CONTRACTOR_INVOICE","CONTRACTOR_AGREEMENT","ORG_CHART","TAX_RETURN","PRIOR_STUDY","PROJECT_LIST","TECHNICAL_DOCUMENT","FINANCIAL_STATEMENT","OTHER"]),
  tags: z.array(z.string()).default([]),
});

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth("CLIENT", req);
  if (error) return error;
  const body = await req.json();
  const parsed = RegisterUploadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const storageKey = generateStorageKey(parsed.data.clientId, parsed.data.engagementId ?? "general", parsed.data.originalName);
  const file = await prisma.uploadedFile.create({
    data: { ...parsed.data, storagePath: storageKey, uploadedBy: (session.user as { id?: string }).id ?? "unknown" },
  });
  await logAudit({
    userId: (session.user as { id?: string }).id,
    engagementId: parsed.data.engagementId,
    action: "UPLOAD_FILE",
    entityType: "UploadedFile",
    entityId: file.id,
    metadata: { filename: parsed.data.originalName, category: parsed.data.category },
  });
  return NextResponse.json({ file, storageKey }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { error, session } = await requireAuth("CLIENT", req);
  if (error) return error;
  const { searchParams } = new URL(req.url);
  const engagementId = searchParams.get("engagementId");
  const clientId = searchParams.get("clientId");
  if (!engagementId && !clientId) return NextResponse.json({ error: "engagementId or clientId required" }, { status: 400 });

  const userRole = (session!.user as { role?: string }).role ?? "CLIENT";
  const userId = (session!.user as { id?: string }).id;

  // CLIENT role users may only access their own files — verify ownership
  if (userRole === "CLIENT") {
    const ownedClient = await prisma.client.findFirst({ where: { userId } });
    if (!ownedClient) return NextResponse.json({ error: "No client associated with this account" }, { status: 403 });

    if (clientId && clientId !== ownedClient.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (engagementId) {
      const eng = await prisma.engagement.findUnique({ where: { id: engagementId }, select: { clientId: true } });
      if (!eng || eng.clientId !== ownedClient.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }
  }

  const files = await prisma.uploadedFile.findMany({
    where: { ...(engagementId && { engagementId }), ...(clientId && { clientId }) },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ files });
}
