/**
 * Immutable audit logging helper.
 * Every write creates a new record; no updates or deletes are ever performed
 * on AuditLog rows by application code.
 */
import { prisma } from "@/lib/prisma";

export type AuditAction =
  | "USER_SIGN_IN"
  | "CREATE_LEAD"
  | "UPDATE_LEAD"
  | "CONVERT_LEAD"
  | "INVITE_CLIENT"
  | "CREATE_ENGAGEMENT"
  | "UPDATE_ENGAGEMENT"
  | "UPLOAD_FILE"
  | "REVIEW_FILE"
  | "MAP_FILE"
  | "ACCEPT_FILE"
  | "REJECT_FILE"
  | "COMPLETE_QUESTIONNAIRE"
  | "RUN_CALCULATION"
  | "OVERRIDE_CALCULATION"
  | "APPROVE_OVERRIDE"
  | "LOCK_CALCULATION"
  | "GENERATE_REPORT"
  | "PUBLISH_REPORT"
  | "CREATE_INVOICE"
  | "UPDATE_INVOICE_STATUS"
  | "DELETE_INVOICE"
  | "PAY_INVOICE"
  | "CREATE_TAX_RULE"
  | "APPROVE_TAX_RULE"
  | "CREATE_LEGAL_UPDATE"
  | "IMPLEMENT_LEGAL_UPDATE"
  | "STRIPE_WEBHOOK";

interface AuditParams {
  userId?: string;
  engagementId?: string;
  action: AuditAction;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export async function logAudit(params: AuditParams): Promise<void> {
  await prisma.auditLog.create({
    data: {
      userId: params.userId,
      engagementId: params.engagementId,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      // JSON round-trip strips non-serialisable values and satisfies Prisma's
      // InputJsonValue constraint (JSON.parse returns `any`).
      metadata: JSON.parse(JSON.stringify(params.metadata ?? {})),
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
    },
  });
}
