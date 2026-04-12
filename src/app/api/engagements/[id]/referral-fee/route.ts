import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth("ADMIN", req);
  if (error) return error;
  try {
    const { id } = await params;
    const body = await req.json();
    const engagement = await prisma.engagement.update({
      where: { id },
      data: {
        referralFeeAmount: body.referralFeeAmount ?? null,
        referralFeePaid: body.referralFeePaid ?? false,
        referralFeePaidAt: body.referralFeePaidAt ? new Date(body.referralFeePaidAt) : null,
      },
    });
    return NextResponse.json(engagement);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "error" }, { status: 500 });
  }
}
