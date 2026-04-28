#!/bin/bash
# Run this from your rdtax-platform directory:
# bash public/apply-estimator-email.sh

# 1. Update src/app/api/estimator/route.ts - add import
sed -i '' 's|import { prisma } from "@/lib/prisma";|import { prisma } from "@/lib/prisma";\nimport { sendEstimatorAlert } from "@/lib/email";|' src/app/api/estimator/route.ts

# 2. Update src/app/api/estimator/route.ts - add email alert before return
sed -i '' 's|await prisma.estimatorRun.update({ where: { id: run.id }, data: { leadId: lead.id } });|await prisma.estimatorRun.update({ where: { id: run.id }, data: { leadId: lead.id } });\
\
  // Send admin email alert\
  const adminEmail = process.env.ADMIN_EMAIL ?? "partnerships@alexanderandblake.com";\
  await sendEstimatorAlert(adminEmail, {\
    companyName: d.companyName,\
    contactName: d.contactName,\
    email: d.email,\
    phone: d.phone,\
    industry: d.industry,\
    state: d.state,\
    annualPayroll: d.annualPayroll,\
    contractorSpend: d.contractorSpend,\
    supplySpend: d.supplySpend,\
    estimateLow: creditLow,\
    estimateHigh: creditHigh,\
    scCreditLow,\
    scCreditHigh,\
    leadId: lead.id,\
  }).catch(console.error);|' src/app/api/estimator/route.ts

echo "Updated src/app/api/estimator/route.ts"
echo ""
echo "Now adding sendEstimatorAlert function to src/lib/email.ts..."

# 3. Add sendEstimatorAlert function to email.ts after sendNewLeadAlert
cat >> src/lib/email.ts.patch << 'PATCH'

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
PATCH

# Insert the new function before sendUploadReceived
sed -i '' '/^export async function sendUploadReceived/e cat src/lib/email.ts.patch' src/lib/email.ts 2>/dev/null

echo "Done! Now run:"
echo "  git add src/lib/email.ts src/app/api/estimator/route.ts"
echo "  git commit -m 'Add email notification for estimator leads'"
echo "  git push origin main"

# Cleanup
rm -f src/lib/email.ts.patch
