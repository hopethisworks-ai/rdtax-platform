/**
 * POST /api/auth/mfa/setup – generate a new TOTP secret and QR code for the current user
 * GET  /api/auth/mfa/setup – return current MFA status
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";
import { generateSecret, generateURI, verify } from "otplib";
import QRCode from "qrcode";

export async function GET(req: NextRequest) {
  const { error, session } = await requireAuth("CLIENT", req);
  if (error) return error;
  const userId = (session!.user as { id: string }).id;
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { mfaEnabled: true } });
  return NextResponse.json({ mfaEnabled: user?.mfaEnabled ?? false });
}

export async function POST(req: NextRequest) {
  const { error, session } = await requireAuth("CLIENT", req);
  if (error) return error;
  const userId = (session!.user as { id: string }).id;
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const secret = generateSecret();
  const otpauth = generateURI({ secret, label: user.email!, issuer: "Alexander & Blake R&D" });
  const qrDataUrl = await QRCode.toDataURL(otpauth);

  // Store secret temporarily (not yet enabled — user must verify first)
  await prisma.user.update({ where: { id: userId }, data: { mfaSecret: secret } });

  return NextResponse.json({ secret, qrDataUrl });
}
