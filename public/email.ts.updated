/**
 * Transactional email via Resend.
 * Each notification type has a typed helper so templates stay in one place.
 */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM ?? "noreply@rdtaxplatform.com";
const APP_URL = process.env.APP_URL ?? "http://localhost:3001";

/** Escape user-supplied values before interpolation into HTML templates */
function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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
    `<p>Hello ${esc(name)},</p>
     <p>You have been invited to access your secure R&amp;D Tax Credit engagement portal.</p>
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
    `<p>Hello ${esc(name)},</p>
     <p>Your preliminary R&amp;D tax credit estimate has been prepared and is ready for review.</p>
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
    `<p>Hello ${esc(name)},</p>
     <p>Your final R&amp;D tax credit documentation package has been published.</p>
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
     <p>Company: <strong>${esc(companyName)}</strong></p>
     <p><a href="${url}">View Lead</a></p>`
  );
}

export async function sendEstimatorAlert(
  adminEmail: string,
  data: {
    companyName: string;
    contactName: string;
    email: string;
    phone?: string;
    industry?: string;
    state?: string;
    annualPayroll: number;
    contractorSpend: number;
    supplySpend: number;
    estimateLow: number;
    estimateHigh: number;
    scCreditLow: number;
    scCreditHigh: number;
    leadId: string;
  }
): Promise<void> {
  const url = `${APP_URL}/admin/leads/${data.leadId}`;
  const totalLow = data.estimateLow + data.scCreditLow;
  const totalHigh = data.estimateHigh + data.scCreditHigh;
  await send(
    adminEmail,
    `Estimator Lead: ${data.companyName} — $${totalLow.toLocaleString()}–$${totalHigh.toLocaleString()}`,
    `<p><strong>${esc(data.companyName)}</strong> just ran a credit estimate on your site.</p>
     <table style="border-collapse:collapse; margin:12px 0;">
       <tr><td style="padding:4px 16px 4px 0; color:#666;">Contact</td><td style="padding:4px 0;"><strong>${esc(data.contactName)}</strong></td></tr>
       <tr><td style="padding:4px 16px 4px 0; color:#666;">Email</td><td style="padding:4px 0;"><a href="mailto:${esc(data.email)}">${esc(data.email)}</a></td></tr>
       ${data.phone ? `<tr><td style="padding:4px 16px 4px 0; color:#666;">Phone</td><td style="padding:4px 0;">${esc(data.phone)}</td></tr>` : ""}
       ${data.industry ? `<tr><td style="padding:4px 16px 4px 0; color:#666;">Industry</td><td style="padding:4px 0;">${esc(data.industry)}</td></tr>` : ""}
       ${data.state ? `<tr><td style="padding:4px 16px 4px 0; color:#666;">State</td><td style="padding:4px 0;">${esc(data.state)}</td></tr>` : ""}
       <tr><td style="padding:4px 16px 4px 0; color:#666;">Annual Payroll</td><td style="padding:4px 0;">$${data.annualPayroll.toLocaleString()}</td></tr>
       <tr><td style="padding:4px 16px 4px 0; color:#666;">Contractor Spend</td><td style="padding:4px 0;">$${data.contractorSpend.toLocaleString()}</td></tr>
       <tr><td style="padding:4px 16px 4px 0; color:#666;">Supply Spend</td><td style="padding:4px 0;">$${data.supplySpend.toLocaleString()}</td></tr>
     </table>
     <p style="font-size:18px; margin:16px 0;"><strong>Estimated Credit: $${totalLow.toLocaleString()} – $${totalHigh.toLocaleString()}</strong></p>
     ${data.scCreditLow > 0 ? `<p style="color:#666;">Federal: $${data.estimateLow.toLocaleString()}–$${data.estimateHigh.toLocaleString()} | SC State: $${data.scCreditLow.toLocaleString()}–$${data.scCreditHigh.toLocaleString()}</p>` : ""}
     <p><a href="${url}" style="background:#2C7A7B; color:#fff; padding:10px 20px; border-radius:4px; text-decoration:none; display:inline-block; margin-top:8px;">View Lead</a></p>`
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
    `<p>Hello ${esc(name)},</p>
     <p>We received your uploaded file: <strong>${esc(filename)}</strong>. Our team will review it shortly.</p>`
  );
}

export async function sendMissingFileReminder(
  to: string,
  name: string,
  missingDocs: string[]
): Promise<void> {
  const list = missingDocs.map((d) => `<li>${esc(d)}</li>`).join("");
  await send(
    to,
    "Action Required: Missing Documents",
    `<p>Hello ${esc(name)},</p>
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
    `<p>Hello ${esc(name)},</p>
     <p>An invoice of <strong>$${amount.toLocaleString()}</strong> is due.</p>
     <p><a href="${url}">View &amp; Pay Invoice</a></p>`
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
