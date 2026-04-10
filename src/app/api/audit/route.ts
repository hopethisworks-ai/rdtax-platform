import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";

export async function GET(req: NextRequest) {
  const { error } = await requireAuth("ADMIN", req);
  if (error) return error;
  const { searchParams } = new URL(req.url);
  const where: Record<string, unknown> = {};
  if (searchParams.get("userId")) where.userId = searchParams.get("userId");
  if (searchParams.get("engagementId")) where.engagementId = searchParams.get("engagementId");
  if (searchParams.get("action")) where.action = searchParams.get("action");
  const logs = await prisma.auditLog.findMany({
    where,
    include: { user: { select: { email: true, name: true } } },
    orderBy: { createdAt: "desc" },
    take: parseInt(searchParams.get("limit") ?? "100"),
    skip: parseInt(searchParams.get("offset") ?? "0"),
  });
  return NextResponse.json({ logs });
}
