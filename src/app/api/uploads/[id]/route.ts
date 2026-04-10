import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const body = await req.json();
    const file = await prisma.uploadedFile.update({
      where: { id },
      data: {
        status: body.status,
        reviewNotes: body.reviewNotes ?? null,
        reviewedBy: (session.user as { id?: string }).id ?? "unknown",
        reviewedAt: new Date(),
      },
    });
    return NextResponse.json(file);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "error" }, { status: 500 });
  }
}
