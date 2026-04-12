import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: Promise<{ qaId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string }).id;
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const client = await prisma.client.findFirst({ where: { userId } });
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    const { qaId } = await params;
    const body = await req.json();
    const { responses, notes } = body;

    // Verify the assignment exists and belongs to this client's engagement
    const assignment = await prisma.questionnaireAssignment.findUnique({
      where: { id: qaId },
      include: { engagement: { select: { clientId: true } } },
    });

    if (!assignment) return NextResponse.json({ error: "Questionnaire not found" }, { status: 404 });
    if (assignment.engagement.clientId !== client.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.questionnaireAssignment.update({
      where: { id: qaId },
      data: {
        responses: responses ?? {},
        notes: notes ?? null,
        completedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, completedAt: updated.completedAt });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Submission failed" }, { status: 500 });
  }
}

// Allow saving drafts without marking complete
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ qaId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string }).id;
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const client = await prisma.client.findFirst({ where: { userId } });
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    const { qaId } = await params;
    const body = await req.json();
    const { responses, notes } = body;

    const assignment = await prisma.questionnaireAssignment.findUnique({
      where: { id: qaId },
      include: { engagement: { select: { clientId: true } } },
    });

    if (!assignment) return NextResponse.json({ error: "Questionnaire not found" }, { status: 404 });
    if (assignment.engagement.clientId !== client.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.questionnaireAssignment.update({
      where: { id: qaId },
      data: {
        responses: responses ?? assignment.responses,
        notes: notes ?? assignment.notes,
        // Don't set completedAt — this is a draft save
      },
    });

    return NextResponse.json({ success: true, saved: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Save failed" }, { status: 500 });
  }
}
