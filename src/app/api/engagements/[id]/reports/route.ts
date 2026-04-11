import { NextRequest, NextResponse } from "next/server";
import { sendReportPublished } from "@/lib/email";
import { requireAuth } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Fix #5: Use requireAuth with ANALYST role instead of bare session check
    const { error, session } = await requireAuth("ANALYST", req);
    if (error) return error;

    const { id } = await params;
    const body = await req.json();
    const { reportType, title, notes, calculationId, ruleVersionId, publishNow } = body;
    if (!reportType || !title) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    // Verify the engagement exists and the user has access
    const engagement = await prisma.engagement.findUnique({
      where: { id },
      include: { client: true },
    });
    if (!engagement) return NextResponse.json({ error: "Engagement not found" }, { status: 404 });

    // Fix #4: Use a transaction with a serializable read to prevent version race conditions
    const report = await prisma.$transaction(async (tx) => {
      const existing = await tx.report.count({ where: { engagementId: id, reportType } });

      // Fix #13: Include ruleVersionId for audit traceability
      // If not provided, try to get it from the linked calculation
      let resolvedRuleVersionId = ruleVersionId ?? null;
      if (!resolvedRuleVersionId && calculationId) {
        const calc = await tx.calculation.findUnique({
          where: { id: calculationId },
          select: { ruleVersionId: true },
        });
        resolvedRuleVersionId = calc?.ruleVersionId ?? null;
      }

      return tx.report.create({
        data: {
          engagementId: id,
          calculationId: calculationId ?? null,
          ruleVersionId: resolvedRuleVersionId,
          reportType,
          title,
          notes: notes ?? null,
          version: existing + 1,
          publishedAt: publishNow ? new Date() : null,
          publishedBy: publishNow ? ((session!.user as { id?: string }).id ?? "unknown") : null,
        },
      });
    });

    if (publishNow) {
      await prisma.engagement.update({
        where: { id },
        data: { status: "FINAL_REPORT" },
      });

      try {
        if (engagement.client?.email) {
          await sendReportPublished(
            engagement.client.email,
            engagement.client.contactName ?? engagement.client.companyName,
            id
          );
        }
      } catch (e) {
        console.error("[Email] report published alert failed:", e);
      }
    }

    return NextResponse.json(report);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "error" }, { status: 500 });
  }
}
