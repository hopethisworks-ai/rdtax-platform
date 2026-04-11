import { Worker, Job } from "bullmq";
import { prisma } from "@/lib/prisma";
import { uploadFile } from "@/lib/storage";
import { generatePreliminaryEstimatePdf, generateMethodologyMemoPdf } from "@/lib/document-generator";
import type { GenerateReportJob } from "../queue";

// Use plain connection options to avoid ioredis version conflicts with BullMQ.
const _redisUrl = new URL(process.env.REDIS_URL ?? "redis://localhost:6379");
const connection = {
  host: _redisUrl.hostname || "localhost",
  port: Number(_redisUrl.port) || 6379,
  ...(_redisUrl.password ? { password: _redisUrl.password } : {}),
  maxRetriesPerRequest: null as null,
};

const worker = new Worker<GenerateReportJob>(
  "generate-report",
  async (job: Job<GenerateReportJob>) => {
    const { engagementId, calculationId, reportType, requestedBy } = job.data;

    const [calculation, engagement] = await Promise.all([
      prisma.calculation.findUnique({
        where: { id: calculationId },
        include: { ruleVersion: true },
      }),
      prisma.engagement.findUnique({
        where: { id: engagementId },
        include: { client: true },
      }),
    ]);

    if (!calculation || !engagement) {
      throw new Error(`Calculation ${calculationId} or engagement ${engagementId} not found`);
    }

    await prisma.backgroundJob.updateMany({
      where: { payload: { path: ["calculationId"], equals: calculationId } },
      data: { status: "RUNNING", startedAt: new Date() },
    });

    const ctx = {
      client: { companyName: engagement.client.companyName, contactName: engagement.client.contactName },
      engagement: { taxYear: engagement.taxYear, engagementType: engagement.engagementType },
      calculation: {
        totalQre: calculation.totalQre ? Number(calculation.totalQre) : null,
        totalWageQre: calculation.totalWageQre ? Number(calculation.totalWageQre) : null,
        totalSupplyQre: calculation.totalSupplyQre ? Number(calculation.totalSupplyQre) : null,
        totalContractorQre: calculation.totalContractorQre ? Number(calculation.totalContractorQre) : null,
        grossCredit: calculation.grossCredit ? Number(calculation.grossCredit) : null,
        reducedCredit: calculation.reducedCredit ? Number(calculation.reducedCredit) : null,
        scAllowedCredit: calculation.scAllowedCredit ? Number(calculation.scAllowedCredit) : null,
        method: calculation.method,
        c280cElectionMade: calculation.c280cElectionMade,
        methodRationale: calculation.methodRationale,
        ruleVersionId: calculation.ruleVersionId,
        runAt: calculation.runAt,
      },
      ruleVersion: {
        version: calculation.ruleVersion.version,
        formVersion: calculation.ruleVersion.formVersion,
        taxYear: calculation.ruleVersion.taxYear,
      },
    };

    let pdfBytes: Uint8Array;
    let title: string;

    const companyTy = `${engagement.client.companyName} TY${engagement.taxYear}`;
    const assumptions = (calculation.assumptionsSnapshot as Record<string, unknown>) ?? {};

    switch (reportType) {
      case "PRELIMINARY_ESTIMATE":
        pdfBytes = await generatePreliminaryEstimatePdf(ctx);
        title = `Preliminary Estimate – ${companyTy}`;
        break;
      case "METHODOLOGY_MEMO":
      case "INDIVIDUAL_MEMO":
        pdfBytes = await generateMethodologyMemoPdf({ ...ctx, assumptions });
        title = `${reportType === "METHODOLOGY_MEMO" ? "Methodology Memo" : "Individual Memo"} – ${companyTy}`;
        break;
      case "WORKPAPER_SUMMARY":
        pdfBytes = await generatePreliminaryEstimatePdf(ctx);
        title = `Workpaper Summary – ${companyTy}`;
        break;
      case "FINAL_PACKAGE":
        pdfBytes = await generatePreliminaryEstimatePdf(ctx);
        title = `Final Credit Study Package – ${companyTy}`;
        break;
      default:
        throw new Error(`Unsupported report type: ${reportType}`);
    }

    const storageKey = `reports/${engagementId}/${reportType.toLowerCase()}_${Date.now()}.pdf`;
    await uploadFile(storageKey, Buffer.from(pdfBytes), "application/pdf");

    const report = await prisma.report.create({
      data: {
        engagementId,
        calculationId,
        ruleVersionId: calculation.ruleVersionId,
        reportType,
        title,
        storagePath: storageKey,
        publishedAt: reportType === "PRELIMINARY_ESTIMATE" ? new Date() : null,
        publishedBy: requestedBy,
      },
    });

    // Mark backgroundJob as completed
    await prisma.backgroundJob.updateMany({
      where: { payload: { path: ["calculationId"], equals: calculationId }, status: "RUNNING" },
      data: { status: "COMPLETED", completedAt: new Date() },
    });

    return { storageKey, title, reportId: report.id };
  },
  { connection, concurrency: 2 }
);

worker.on("failed", async (job, err) => {
  console.error(`[generate-report] Job ${job?.id} failed:`, err);
  // Mark backgroundJob as failed so it doesn't stay stuck in RUNNING
  if (job?.data?.calculationId) {
    try {
      await prisma.backgroundJob.updateMany({
        where: { payload: { path: ["calculationId"], equals: job.data.calculationId }, status: "RUNNING" },
        data: { status: "FAILED", completedAt: new Date() },
      });
    } catch (e) {
      console.error("[generate-report] Failed to update backgroundJob status:", e);
    }
  }
});

export default worker;
