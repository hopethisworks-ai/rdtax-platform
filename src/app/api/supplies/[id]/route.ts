import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
