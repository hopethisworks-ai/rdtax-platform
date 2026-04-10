import { prisma } from "@/lib/prisma";
import Link from "next/link";
import EngagementNav from "./EngagementNav";
import { notFound } from "next/navigation";
import ReferralFeeEditor from "./ReferralFeeEditor";

export default async function EngagementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const eng = await prisma.engagement.findUnique({
    where: { id },
    include: {
      client: true,
      legalEntity: true,
      ruleVersion: { select: { version: true, taxYear: true } },
      calculations: { orderBy: { runAt: "desc" }, take: 5 },
      uploadedFiles: { select: { id: true, originalName: true, status: true, createdAt: true } },
      auditLogs: { orderBy: { createdAt: "desc" }, take: 10, include: { user: { select: { name: true, email: true } } } },
    },
  });
  if (!eng) notFound();

  const statusColors: Record<string, string> = {
    INTAKE: "bg-gray-100 text-gray-700",
    DATA_COLLECTION: "bg-yellow-100 text-yellow-700",
    ANALYSIS: "bg-blue-100 text-blue-700",
    CALCULATION: "bg-purple-100 text-purple-700",
    REVIEW: "bg-orange-100 text-orange-700",
    DOCUMENTATION: "bg-indigo-100 text-indigo-700",
    FINAL_REPORT: "bg-teal-100 text-teal-700",
    DELIVERED: "bg-green-100 text-green-700",
    ARCHIVED: "bg-gray-100 text-gray-500",
  };

  return (
    <div>
      <EngagementNav id={id} />
      <div className="mb-6">
        <Link href="/admin/engagements" className="text-sm text-blue-600 hover:underline">← Back to Engagements</Link>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Engagement Workflow</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href={`/admin/engagements/${id}/import`} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold text-slate-800 text-sm">Import Payroll</div>
            <div className="text-slate-400 text-xs mt-1">Upload employee CSV</div>
          </Link>
          <Link href={`/admin/engagements/${id}/import-contractors`} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all text-center">
            <div className="text-2xl mb-2">🏢</div>
            <div className="font-semibold text-slate-800 text-sm">Import Contractors</div>
            <div className="text-slate-400 text-xs mt-1">Add contractor spend</div>
          </Link>
          <Link href={`/admin/engagements/${id}/import-supplies`} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all text-center">
            <div className="text-2xl mb-2">🔬</div>
            <div className="font-semibold text-slate-800 text-sm">Import Supplies</div>
            <div className="text-slate-400 text-xs mt-1">Add supply expenses</div>
          </Link>
          <Link href={`/admin/engagements/${id}/projects`} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all text-center">
            <div className="text-2xl mb-2">🧩</div>
            <div className="font-semibold text-slate-800 text-sm">Business Components</div>
            <div className="text-slate-400 text-xs mt-1">Assign QREs + Four-Part Test</div>
          </Link>
          <Link href={`/admin/engagements/${id}/calculate`} className="bg-blue-600 border border-blue-600 rounded-xl p-4 hover:bg-blue-700 transition-all text-center">
            <div className="text-2xl mb-2">🧮</div>
            <div className="font-semibold text-white text-sm">Run Calculation</div>
            <div className="text-blue-200 text-xs mt-1">Calculate federal + SC credit</div>
          </Link>
          <Link href={`/admin/engagements/${id}/report`} className="bg-green-600 border border-green-600 rounded-xl p-4 hover:bg-green-700 transition-all text-center">
            <div className="text-white text-lg mb-1">5</div>
            <div className="text-white font-semibold text-sm">Generate Report</div>
            <div className="text-green-200 text-xs mt-0.5">Deliver credit study</div>
          </Link>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium">Step 1</span>
          <span>Import data</span>
          <span className="text-slate-300">→</span>
          <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium">Step 2</span>
          <span>Assign to business components</span>
          <span className="text-slate-300">→</span>
          <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium">Step 3</span>
          <span>Run four-part test</span>
          <span className="text-slate-300">→</span>
          <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium">Step 4</span>
          <span>Calculate credit</span>
        </div>
      </div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{eng.client.companyName}</h1>
          <p className="text-gray-500 mt-1">Tax Year {eng.taxYear} · {eng.engagementType}</p>
        </div>
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${statusColors[eng.status] ?? "bg-gray-100 text-gray-600"}`}>
          {eng.status.replace(/_/g, " ")}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Engagement Info</h2>
          <dl className="space-y-3">
            {[
              ["Client", eng.client.companyName],
              ["Tax Year", eng.taxYear],
              ["Type", eng.engagementType],
              ["Rule Version", eng.ruleVersion?.version ?? "—"],
              ["Assigned To", eng.assignedTo ?? "—"],
              ["Created", new Date(eng.createdAt).toLocaleDateString()],
              ["Updated", new Date(eng.updatedAt).toLocaleDateString()],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-sm text-gray-500">{label}</dt>
                <dd className="text-sm font-medium text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {eng.referralSource && eng.referralSource !== "direct" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 md:col-span-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Referral & Fee Tracking</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-slate-500">Referral Source</p>
                <p className="font-semibold text-slate-900 text-sm">{eng.referralSource}</p>
              </div>
              {eng.referringCpaName && <div>
                <p className="text-xs text-slate-500">Referring CPA</p>
                <p className="font-semibold text-slate-900 text-sm">{eng.referringCpaName}</p>
              </div>}
              {eng.referringCpaFirm && <div>
                <p className="text-xs text-slate-500">CPA Firm</p>
                <p className="font-semibold text-slate-900 text-sm">{eng.referringCpaFirm}</p>
              </div>}
              {eng.referringCpaEmail && <div>
                <p className="text-xs text-slate-500">CPA Email</p>
                <p className="font-semibold text-slate-900 text-sm">{eng.referringCpaEmail}</p>
              </div>}
              <div>
                <p className="text-xs text-slate-500">Referral Fee Paid</p>
                <span className={"text-xs px-2 py-1 rounded-full font-medium "+(eng.referralFeePaid?"bg-green-100 text-green-700":"bg-amber-100 text-amber-700")}>
                  {eng.referralFeePaid?"Paid":"Pending"}
                </span>
              </div>
              {eng.referralFeeAmount && <div>
                <p className="text-xs text-slate-500">Fee Amount</p>
                <p className="font-semibold text-slate-900 text-sm">${Number(eng.referralFeeAmount).toLocaleString()}</p>
              </div>}
            </div>
            <ReferralFeeEditor engagementId={eng.id} initialAmount={eng.referralFeeAmount ? Number(eng.referralFeeAmount) : null} initialPaid={eng.referralFeePaid} />
          </div>
        )}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Latest Calculations</h2>
          {eng.calculations.length === 0 ? (
            <p className="text-sm text-gray-500">No calculations yet.</p>
          ) : (
            <div className="space-y-3">
              {eng.calculations.map((calc) => (
                <div key={calc.id} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">${Number(calc.reducedCredit).toLocaleString()} credit</p>
                    <p className="text-xs text-gray-500">{calc.method} · {new Date(calc.runAt).toLocaleDateString()}</p>
                  </div>
                  <p className="text-xs text-gray-500">QRE: ${Number(calc.totalQre).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Uploaded Files ({eng.uploadedFiles.length})</h2>
        {eng.uploadedFiles.length === 0 ? (
          <p className="text-sm text-gray-500">No files uploaded yet.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {eng.uploadedFiles.map((f) => (
              <div key={f.id} className="flex justify-between items-center py-2">
                <p className="text-sm text-gray-900">{f.originalName}</p>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{f.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Recent Audit Log</h2>
        {eng.auditLogs.length === 0 ? (
          <p className="text-sm text-gray-500">No audit events.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {eng.auditLogs.map((log) => (
              <div key={log.id} className="py-2 flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">{log.action}</p>
                  <p className="text-xs text-gray-500">{log.user?.name ?? log.user?.email ?? "System"} · {log.entityType}</p>
                </div>
                <p className="text-xs text-gray-400">{new Date(log.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
