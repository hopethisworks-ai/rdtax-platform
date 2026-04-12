import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth("ANALYST", req);
  if (error) return error;
  try {
    const { id } = await params;
    const body = await req.json();
    const { supplies } = body;
    const engagement = await prisma.engagement.findUnique({ where: { id }, select: { legalEntityId: true } });
    if (!engagement?.legalEntityId) return NextResponse.json({ error: "No legal entity" }, { status: 400 });
    const created = await Promise.all(supplies.map((s: { description: string; amount: number; glAccount?: string; qualified?: boolean }) =>
      prisma.supplyItem.create({
        data: {
          legalEntityId: engagement.legalEntityId as string,
          description: s.description,
          amount: s.amount,
          glAccount: s.glAccount || null,
          qualified: s.qualified ?? true,
          qualificationStatus: s.qualified ? "qualified" : "pending",
        },
      })
    ));
    return NextResponse.json({ imported: created.length });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "error" }, { status: 500 });
  }
}
