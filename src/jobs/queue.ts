/**
 * Background Job Queue – BullMQ
 *
 * Queues defined:
 *   - parse-file: Parse uploaded CSV/XLSX and extract structured data
 *   - generate-report: Generate PDF/DOCX/XLSX report bundles
 *   - recalculate: Re-run calculations after ruleset update
 *   - send-email: Send transactional emails
 *
 * Workers must be started separately (jobs/workers/*.ts).
 * The UI never blocks waiting for these jobs.
 */
import { Queue } from "bullmq";

const REDIS_URL = process.env.REDIS_URL ?? "redis://localhost:6379";

// Use plain connection options to avoid ioredis version conflicts between
// the project's ioredis and BullMQ's bundled ioredis.
function getConnection() {
  const url = new URL(REDIS_URL);
  return {
    host: url.hostname || "localhost",
    port: Number(url.port) || 6379,
    ...(url.password ? { password: url.password } : {}),
    maxRetriesPerRequest: null as null,
  };
}

// ── Queue definitions ─────────────────────────────────────────────────────────

export const parseFileQueue = new Queue("parse-file", {
  connection: getConnection(),
  defaultJobOptions: { attempts: 3, backoff: { type: "exponential", delay: 2000 } },
});

export const generateReportQueue = new Queue("generate-report", {
  connection: getConnection(),
  defaultJobOptions: { attempts: 2, backoff: { type: "exponential", delay: 5000 } },
});

export const recalculateQueue = new Queue("recalculate", {
  connection: getConnection(),
  defaultJobOptions: { attempts: 2 },
});

export const sendEmailQueue = new Queue("send-email", {
  connection: getConnection(),
  defaultJobOptions: { attempts: 3, backoff: { type: "fixed", delay: 1000 } },
});

// ── Job payload types ─────────────────────────────────────────────────────────

export interface ParseFileJob {
  fileId: string;
  engagementId: string;
  fileType: "payroll" | "gl" | "contractor" | "gross_receipts" | "prior_qre";
  mappingTemplateId?: string;
}

export interface GenerateReportJob {
  engagementId: string;
  calculationId: string;
  reportType: "PRELIMINARY_ESTIMATE" | "WORKPAPER_SUMMARY" | "FINAL_PACKAGE";
  requestedBy: string;
}

export interface RecalculateJob {
  engagementId: string;
  ruleVersionId: string;
  triggeredBy: string;
  reason: string;
}

export interface SendEmailJob {
  type: string;
  to: string;
  metadata: Record<string, unknown>;
}

// ── Enqueue helpers ───────────────────────────────────────────────────────────

export async function enqueueParseFile(payload: ParseFileJob): Promise<string> {
  const job = await parseFileQueue.add("parse-file", payload);
  return job.id ?? "";
}

export async function enqueueGenerateReport(payload: GenerateReportJob): Promise<string> {
  const job = await generateReportQueue.add("generate-report", payload);
  return job.id ?? "";
}

export async function enqueueRecalculate(payload: RecalculateJob): Promise<string> {
  const job = await recalculateQueue.add("recalculate", payload);
  return job.id ?? "";
}

export async function enqueueSendEmail(payload: SendEmailJob): Promise<string> {
  const job = await sendEmailQueue.add("send-email", payload);
  return job.id ?? "";
}
