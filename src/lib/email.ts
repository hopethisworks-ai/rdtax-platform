/**
 * Transactional email via Resend.
 * Each notification type has a typed helper so templates stay in one place.
 */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM ?? "noreply@rdtaxplatform.com";
const APP_URL = process.env.APP_URL ?? "http://localhost:3001";

async function send(to: string, subject: string, html: string): Promise<void> {
  const { error } = await resend.emails.send({ from: FROM, to, subject, html });
  if (error) {
    console.error("[Email] Failed to send:", error);
    throw new Error(`Email send failed: ${error.message}`);
  }
}

export async function sendClientInvite(
  to: string,
  name: string,
  inviteToken: string
): Promise<void> {
  const url = `${APP_URL}/portal/accept-invite?token=${inviteToken}`;
  await send(
    to,
    "You have been invited to the R&D Tax Credit Portal",
    `<p>Hello ${name},</p>
     <p>You have been invited to access your secure R&D Tax Credit engagement portal.</p>
     <p><a href="${url}" style="background:#2563eb;color:#fff;padding:12px 24px;border-radius:4px;text-decoration:none;">Accept Invitation</a></p>
     <p>This link expires in 48 hours.</p>`
  );
}

export async function sendEstimateReady(
  to: string,
  name: string,
  engagementId: string
): Promise<void> {
  const url = `${APP_URL}/portal/engagements/${engagementId}`;
  await send(
    to,
    "Your R&D Credit Estimate is Ready",
    `<p>Hello ${name},</p>
     <p>Your preliminary R&D tax credit estimate has been prepared and is ready for review.</p>
     <p><a href="${url}">View Estimate</a></p>`
  );
}

export async function sendReportPublished(
  to: string,
  name: string,
  engagementId: string
): Promise<void> {
  const url = `${APP_URL}/portal/engagements/${engagementId}/reports`;
  await send(
    to,
    "Your Final R&D Credit Report is Ready",
    `<p>Hello ${name},</p>
     <p>Your final R&D tax credit documentation package has been published.</p>
     <p><a href="${url}">Download Reports</a></p>`
  );
}

export async function sendNewLeadAlert(
  adminEmail: string,
  leadId: string,
  companyName: string
): Promise<void> {
  const url = `${APP_URL}/admin/leads/${leadId}`;
  await send(
    adminEmail,
    `New Lead: ${companyName}`,
    `<p>A new lead has been submitted.</p>
     <p>Company: <strong>${companyName}</strong></p>
     <p><a href="${url}">View Lead</a></p>`
  );
}

export async function sendUploadReceived(
  to: string,
  name: string,
  filename: string
): Promise<void> {
  await send(
    to,
    "File Upload Received",
    `<p>Hello ${name},</p>
     <p>We received your uploaded file: <strong>${filename}</strong>. Our team will review it shortly.</p>`
  );
}

export async function sendMissingFileReminder(
  to: string,
  name: string,
  missingDocs: string[]
): Promise<void> {
  const list = missingDocs.map((d) => `<li>${d}</li>`).join("");
  await send(
    to,
    "Action Required: Missing Documents",
    `<p>Hello ${name},</p>
     <p>The following documents are still needed to complete your engagement:</p>
     <ul>${list}</ul>
     <p><a href="${APP_URL}/portal">Log in to upload</a></p>`
  );
}

export async function sendInvoiceDue(
  to: string,
  name: string,
  invoiceId: string,
  amount: number
): Promise<void> {
  const url = `${APP_URL}/portal/invoices/${invoiceId}`;
  await send(
    to,
    "Invoice Due",
    `<p>Hello ${name},</p>
     <p>An invoice of <strong>$${amount.toLocaleString()}</strong> is due.</p>
     <p><a href="${url}">View & Pay Invoice</a></p>`
  );
}

export async function sendRulesetUpdated(adminEmail: string): Promise<void> {
  await send(
    adminEmail,
    "Tax Ruleset Update Approved for Production",
    `<p>A new tax ruleset version has been approved. Please review the Legal Update Registry for implementation tasks.</p>
     <p><a href="${APP_URL}/admin/rules">View Rules Registry</a></p>`
  );
}

export async function sendLegalUpdateFlagged(
  adminEmail: string,
  updateId: string,
  title: string
): Promise<void> {
  const url = `${APP_URL}/admin/legal-updates/${updateId}`;
  await send(
    adminEmail,
    `Legal Update Requires Implementation: ${title}`,
    `<p>A mandatory legal update has been flagged for implementation.</p>
     <p><a href="${url}">Review Update</a></p>`
  );
}
