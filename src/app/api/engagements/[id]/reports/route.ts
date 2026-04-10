import { NextRequest, NextResponse } from "next/server";
import { sendReportPublished } from "@/lib/email";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const body = await req.json();
    const { reportType, title, notes, calculationId, publishNow } = body;
    if (!reportType || !title) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    const existing = await prisma.report.count({ where: { engagementId: id, reportType } });

    const report = await prisma.report.create({
      data: {
        engagementId: id,
        calculationId: calculationId ?? null,
        reportType,
        title,
        notes: notes ?? null,
        version: existing + 1,
        publishedAt: publishNow ? new Date() : null,
        publishedBy: publishNow ? ((session.user as { id?: string }).id ?? "unknown") : null,
      },
    });

    if (publishNow) {
      await prisma.engagement.update({
        where: { id },
        data: { status: "FINAL_REPORT" },
      });
    }

    if (publishNow) {
      try {
        const eng2 = await prisma.engagement.findUnique({ where: { id }, include: { client: true } });
        if (eng2?.client?.email) { await sendReportPublished(eng2.client.email, eng2.client.contactName ?? eng2.client.companyName, id); }
      } catch(e) { console.error("[Email] report published alert failed:", e); }
    }
    return NextResponse.json(report);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "error" }, { status: 500 });
  }
}
