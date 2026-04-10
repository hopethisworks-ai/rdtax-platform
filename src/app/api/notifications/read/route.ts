/**
 * POST /api/notifications/read – mark all notifications as read for current user
 * POST /api/notifications/read?id=xxx – mark single notification as read
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth("CLIENT", req);
  if (error) return error;

  const userId = (session!.user as { id: string }).id;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    await prisma.notification.updateMany({
      where: { id, userId },
      data: { read: true },
    });
  } else {
    await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  }

  return NextResponse.json({ ok: true });
}
