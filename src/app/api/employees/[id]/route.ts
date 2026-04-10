import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { projectId, qualifiedActivityPct } = body;
    const qreAmount = projectId
      ? await prisma.employee.findUnique({ where: { id }, select: { compensation: true } }).then(e => Number(e?.compensation ?? 0) * Number(qualifiedActivityPct ?? 0))
      : null;
    const employee = await prisma.employee.update({
      where: { id },
      data: {
        projectId: projectId || null,
        qualifiedActivityPct: qualifiedActivityPct ?? undefined,
        qreAmount: qreAmount,
      },
    });
    return NextResponse.json(employee);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "error" }, { status: 500 });
  }
}
