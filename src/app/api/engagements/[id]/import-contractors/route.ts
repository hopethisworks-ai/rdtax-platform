import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { contractors } = body;
    const engagement = await prisma.engagement.findUnique({ where: { id }, select: { legalEntityId: true } });
    if (!engagement?.legalEntityId) return NextResponse.json({ error: "No legal entity" }, { status: 400 });
    const created = await Promise.all(contractors.map((c: { vendorName: string; amount: number; contractReference?: string; usBasedFlag?: boolean }) =>
      prisma.contractorItem.create({
        data: {
          legalEntityId: engagement.legalEntityId as string,
          vendorName: c.vendorName,
          amount: c.amount,
          qualifiedAmount: Math.round(c.amount * 0.65),
          contractReference: c.contractReference || null,
          usBasedFlag: c.usBasedFlag ?? true,
          contractReviewRequired: true,
        },
      })
    ));
    return NextResponse.json({ imported: created.length });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "error" }, { status: 500 });
  }
}
