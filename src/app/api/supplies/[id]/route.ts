import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth("ANALYST", req);
  if (error) return error;

  try {
    const { id } = await params;
    const body = await req.json();
    const supply = await prisma.supplyItem.update({
      where: { id },
      data: {
        projectId: body.projectId ?? null,
        qualified: body.qualified ?? undefined,
      },
    });
    return NextResponse.json(supply);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "error" }, { status: 500 });
  }
}
