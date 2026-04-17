
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const token = crypto.randomBytes(32).toString("hex");
      const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

      await prisma.user.update({
        where: { id: user.id },
        data: { resetToken: token, resetTokenExpiry: expiry },
      });

      const url = `${process.env.APP_URL}/reset-password?token=${token}`;
      const FROM = process.env.EMAIL_FROM ?? "onboarding@resend.dev";

      const emailResult = await resend.emails.send({
        from: FROM,
        to: email,
        subject: "Reset your Alexander & Blake password",
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;">
            <div style="text-align:center;margin-bottom:24px;">
              <div style="display:inline-flex;align-items:center;gap:8px;">
                <div style="width:32px;height:32px;background:#2563eb;border-radius:8px;display:flex;align-items:center;justify-content:center;">
                  <span style="color:white;font-weight:bold;font-size:14px;">AB</span>
                </div>
                <span style="font-weight:bold;font-size:18px;">Alexander &amp; Blake</span>
              </div>
            </div>
            <h2 style="color:#1e293b;text-align:center;">Reset Your Password</h2>
            <p style="color:#475569;">You requested a password reset for your Alexander &amp; Blake account. Click the button below to set a new password.</p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${url}" style="background:#2563eb;color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">Reset Password</a>
            </div>
            <p style="color:#94a3b8;font-size:13px;">This link expires in 1 hour. If you did not request a password reset, you can safely ignore this email.</p>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
            <p style="color:#94a3b8;font-size:12px;text-align:center;">Alexander &amp; Blake -- South Carolina R&amp;D Tax Credit Specialists</p>
          </div>
        `,
      });
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ForgotPassword]", err);
    return NextResponse.json({ success: true }); // Don't expose errors
  }
}
