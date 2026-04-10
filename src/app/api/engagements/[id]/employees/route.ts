import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth("ANALYST", req);
  if (error) return error;

  try {
    const { id } = await params;
    const engagement = await prisma.engagement.findUnique({
      where: { id },
      select: { legalEntityId: true },
    });
    if (!engagement?.legalEntityId) return NextResponse.json([]);
    const employees = await prisma.employee.findMany({
      where: { legalEntityId: engagement.legalEntityId },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(employees);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "error" }, { status: 500 });
  }
}
