/**
 * Notification utility — creates in-app notifications for users.
 * Call this alongside email sends so analysts see alerts inside the platform too.
 */
import { prisma } from "@/lib/prisma";

export type NotificationType =
  | "new_lead"
  | "upload_received"
  | "client_invited"
  | "estimate_ready"
  | "report_published"
  | "override_pending"
  | "legal_update"
  | "invoice_due"
  | "engagement_status";

interface NotifyOptions {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  metadata?: Record<string, unknown>;
}

export async function createNotification(opts: NotifyOptions): Promise<void> {
  try {
    await prisma.notification.create({
      data: {
        userId: opts.userId,
        type: opts.type,
        title: opts.title,
        body: opts.body,
        metadata: JSON.parse(JSON.stringify(opts.metadata ?? {})),
      },
    });
  } catch (err) {
    // Never let notification failure break the main request
    console.error("[Notify] Failed to create notification:", err);
  }
}

/**
 * Notify all ANALYST and SUPER_ADMIN users about a platform-wide event.
 */
export async function notifyAdmins(
  type: NotificationType,
  title: string,
  body: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    const admins = await prisma.user.findMany({
      where: { role: { in: ["ANALYST", "ADMIN", "SUPER_ADMIN"] }, active: true },
      select: { id: true },
    });
    await prisma.notification.createMany({
      data: admins.map((u) => ({
        userId: u.id,
        type,
        title,
        body,
        metadata: JSON.parse(JSON.stringify(metadata ?? {})),
      })),
    });
  } catch (err) {
    console.error("[Notify] Failed to notify admins:", err);
  }
}
