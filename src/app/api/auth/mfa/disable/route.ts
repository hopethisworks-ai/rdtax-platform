/**
 * POST /api/auth/mfa/disable – disable MFA for current user (requires valid TOTP code)
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";
import { verify } from "otplib";

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth("CLIENT", req);
  if (error) return error;
  const userId = (session!.user as { id: string }).id;

  const { code } = await req.json();
  if (!code) return NextResponse.json({ error: "Code required to disable MFA" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { mfaSecret: true } });
  if (!user?.mfaSecret) return NextResponse.json({ error: "MFA not enabled" }, { status: 400 });

  const result = await verify({ token: code, secret: user.mfaSecret });
  if (!result.valid) return NextResponse.json({ error: "Invalid code" }, { status: 400 });

  await prisma.user.update({ where: { id: userId }, data: { mfaEnabled: false, mfaSecret: null } });
  return NextResponse.json({ ok: true });
}
