import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";
import { getSignedDownloadUrl } from "@/lib/storage";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error, session } = await requireAuth("CLIENT", req);
  if (error) return error;
  const file = await prisma.uploadedFile.findUnique({ where: { id }, include: { client: true } });
  if (!file) return NextResponse.json({ error: "Not found" }, { status: 404 });
  // Client isolation: clients can only access their own files
  const userId = (session!.user as { id?: string; role?: string }).id;
  const userRole = (session!.user as { role?: string }).role ?? "CLIENT";
  if (userRole === "CLIENT") {
    const clientRecord = await prisma.client.findFirst({ where: { userId } });
    if (!clientRecord || clientRecord.id !== file.clientId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }
  const url = await getSignedDownloadUrl(file.storagePath, 900);
  return NextResponse.json({ url, expiresInSeconds: 900 });
}
