import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";
import { getSignedDownloadUrl } from "@/lib/storage";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error, session } = await requireAuth("CLIENT", req);
  if (error) return error;

  const report = await prisma.report.findUnique({
    where: { id },
    include: { engagement: { include: { client: true } } },
  });

  if (!report || !report.storagePath) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Must be published to be downloadable by clients
  if (!report.publishedAt) {
    const role = (session!.user as { role?: string }).role;
    if (!["ANALYST","ADMIN","SUPER_ADMIN"].includes(role ?? "")) {
      return NextResponse.json({ error: "Report not published" }, { status: 403 });
    }
  }

  // Client isolation
  const userId = (session!.user as { id?: string; role?: string }).id;
  const userRole = (session!.user as { role?: string }).role ?? "CLIENT";
  if (userRole === "CLIENT") {
    const clientRecord = await prisma.client.findFirst({ where: { userId } });
    if (!clientRecord || clientRecord.id !== report.engagement.clientId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const url = await getSignedDownloadUrl(report.storagePath, 900);
  return NextResponse.redirect(url);
}
