import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";
import { enqueueGenerateReport } from "@/jobs/queue";
import { logAudit } from "@/lib/audit";

const GenerateReportSchema = z.object({
  engagementId: z.string(),
  calculationId: z.string(),
  reportType: z.enum(["PRELIMINARY_ESTIMATE","WORKPAPER_SUMMARY","FINAL_PACKAGE","INDIVIDUAL_MEMO","METHODOLOGY_MEMO"]),
});

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth("ANALYST", req);
  if (error) return error;
  const body = await req.json();
  const parsed = GenerateReportSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const jobId = await enqueueGenerateReport({
    ...parsed.data,
    requestedBy: (session!.user as { id?: string }).id ?? "system",
  });

  // Log the job in DB for tracking
  await prisma.backgroundJob.create({
    data: {
      type: "GENERATE_REPORT",
      status: "PENDING",
      payload: parsed.data,
    },
  });

  await logAudit({
    userId: (session!.user as { id?: string }).id,
    engagementId: parsed.data.engagementId,
    action: "GENERATE_REPORT",
    entityType: "Report",
    metadata: { jobId, ...parsed.data },
  });

  return NextResponse.json({ jobId, status: "QUEUED" }, { status: 202 });
}
