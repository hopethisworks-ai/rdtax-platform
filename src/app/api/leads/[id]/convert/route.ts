import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    if (lead.convertedToClientId) return NextResponse.json({ error: "Already converted", clientId: lead.convertedToClientId }, { status: 400 });

    const taxYear = new Date().getFullYear();

    const result = await prisma.$transaction(async (tx) => {
      const client = await tx.client.create({
        data: {
          companyName: lead.companyName,
          contactName: lead.contactName,
          email: lead.email,
          phone: lead.phone,
          industry: lead.industry,
          state: lead.state,
          active: true,
          invitedAt: new Date(),
        },
      });

      const legalEntity = await tx.legalEntity.create({
        data: {
          clientId: client.id,
          name: lead.companyName,
          entityType: "C_CORP",
          taxYear,
          state: lead.state ?? "SC",
          isParent: true,
        },
      });

      const ruleVersion = await tx.taxRuleVersion.findFirst({
        where: { taxYear, deprecated: false },
        orderBy: { createdAt: "desc" },
      });

      const engagement = await tx.engagement.create({
        data: {
          clientId: client.id,
          legalEntityId: legalEntity.id,
          taxYear,
          status: "INTAKE",
          engagementType: "standard",
          ruleVersionId: ruleVersion?.id,
          referralSource: lead.leadSource ?? "direct",
          referringCpaName: lead.referringCpaName ?? null,
          referringCpaFirm: lead.referringCpaFirm ?? null,
          referringCpaEmail: lead.referringCpaEmail ?? null,
        },
      });

      await tx.lead.update({
        where: { id },
        data: { status: "SIGNED", convertedToClientId: client.id },
      });

      await tx.auditLog.create({
        data: {
          action: "CONVERT_LEAD",
          entityType: "Client",
          entityId: client.id,
        },
      });

      return { client, legalEntity, engagement };
    });

    // Create portal user account with cryptographically secure temp password
    const tempPassword = crypto.randomBytes(8).toString("hex") + crypto.randomBytes(3).toString("hex").toUpperCase() + "!";
    const passwordHash = await bcrypt.hash(tempPassword, 12);

    const existingUser = await prisma.user.findUnique({ where: { email: lead.email } });
    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          email: lead.email,
          name: lead.contactName,
          passwordHash,
          role: "CLIENT",
          active: true,
        },
      });
      await prisma.client.update({
        where: { id: result.client.id },
        data: { userId: newUser.id },
      });
    }

    // Send onboarding email
    const appUrl = process.env.APP_URL ?? "http://localhost:3001";
    const FROM = process.env.EMAIL_FROM ?? "onboarding@resend.dev";
    try {
      await resend.emails.send({
        from: FROM,
        to: lead.email,
        subject: "Welcome to Alexander & Blake -- Your Portal Access",
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;">
            <div style="text-align:center;margin-bottom:24px;">
              <div style="display:inline-flex;align-items:center;gap:8px;">
                <div style="width:32px;height:32px;background:#2563eb;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;">
                  <span style="color:white;font-weight:bold;font-size:14px;">AB</span>
                </div>
                <span style="font-weight:bold;font-size:18px;">Alexander &amp; Blake</span>
              </div>
            </div>
            <h2 style="color:#1e293b;text-align:center;">Welcome, ${lead.contactName}!</h2>
            <p style="color:#475569;">Your R&D tax credit engagement with Alexander &amp; Blake has been activated. You can now access your secure client portal to upload documents, track progress, and view your credit reports.</p>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin:24px 0;">
              <p style="margin:0 0 8px;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Your Login Credentials</p>
              <p style="margin:4px 0;color:#1e293b;"><strong>Portal URL:</strong> ${appUrl}/portal</p>
              <p style="margin:4px 0;color:#1e293b;"><strong>Email:</strong> ${lead.email}</p>
              <p style="margin:4px 0;color:#1e293b;"><strong>Temporary Password:</strong> <code style="background:#e2e8f0;padding:2px 6px;border-radius:4px;">${tempPassword}</code></p>
            </div>
            <p style="color:#475569;font-size:14px;">Please log in and change your password at your earliest convenience. If you have any questions, reply to this email or contact your Alexander &amp; Blake analyst directly.</p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${appUrl}/portal" style="background:#2563eb;color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">Access Your Portal</a>
            </div>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
            <p style="color:#94a3b8;font-size:12px;text-align:center;">Alexander &amp; Blake -- South Carolina R&amp;D Tax Credit Specialists<br/>This email contains sensitive information. Do not forward.</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("[Convert] Onboarding email failed:", emailErr);
    }

    return NextResponse.json({
      success: true,
      clientId: result.client.id,
      engagementId: result.engagement.id,
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "error" }, { status: 500 });
  }
}
