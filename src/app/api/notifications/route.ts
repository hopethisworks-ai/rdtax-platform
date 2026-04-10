/**
 * GET  /api/notifications        – fetch current user's notifications (latest 50)
 * POST /api/notifications/read   – mark all as read (handled below)
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";

export async function GET(req: NextRequest) {
  const { error, session } = await requireAuth("CLIENT", req);
  if (error) return error;

  const userId = (session!.user as { id: string }).id;

  const [notifications, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.notification.count({ where: { userId, read: false } }),
  ]);

  return NextResponse.json({ notifications, unreadCount });
}
