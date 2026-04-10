/**
 * POST /api/auth/mfa/verify – verify a TOTP code and enable MFA if correct
 * Body: { code: string, action: "enable" | "verify" }
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";
import { verify } from "otplib";

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth("CLIENT", req);
  if (error) return error;
  const userId = (session!.user as { id: string }).id;

  const { code, action } = await req.json();
  if (!code) return NextResponse.json({ error: "Code required" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { mfaSecret: true, mfaEnabled: true } });
  if (!user?.mfaSecret) return NextResponse.json({ error: "MFA not set up" }, { status: 400 });

  const result = await verify({ token: code, secret: user.mfaSecret });
  if (!result.valid) return NextResponse.json({ error: "Invalid code" }, { status: 400 });

  if (action === "enable") {
    await prisma.user.update({ where: { id: userId }, data: { mfaEnabled: true } });
    return NextResponse.json({ ok: true, message: "MFA enabled successfully" });
  }

  return NextResponse.json({ ok: true });
}
