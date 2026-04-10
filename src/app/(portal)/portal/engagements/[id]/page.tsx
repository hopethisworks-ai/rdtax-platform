import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EngagementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string }).id;
  const client = await prisma.client.findFirst({ where: { userId } });
  if (!client) redirect("/portal");

  const engagement = await prisma.engagement.findFirst({
    where: { id, clientId: client.id },
    include: {
      documentRequirements: true,
      uploadedFiles: { orderBy: { createdAt: "desc" } },
      questionnaires: { include: { questionnaire: true } },
      calculations: { orderBy: { runAt: "desc" }, take: 1 },
      reports: { where: { publishedAt: { not: null } }, orderBy: { createdAt: "desc" } },
      invoices: true,
    },
  });

  if (!engagement) redirect("/portal");

  const statusOrder = ["INTAKE","DATA_COLLECTION","ANALYSIS","CALCULATION","REVIEW","DOCUMENTATION","FINAL_REPORT","DELIVERED"];
  const currentIdx = statusOrder.indexOf(engagement.status);

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/portal" className="text-gray-500 hover:text-gray-700 text-sm">← Portal</Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-2xl font-bold text-gray-900">Tax Year {engagement.taxYear}</h1>
        <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">{engagement.status.replace(/_/g," ")}</span>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Engagement Progress</h2>
        <div className="flex items-center gap-0">
          {statusOrder.slice(0, -1).map((status, i) => (
            <div key={status} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i <= currentIdx ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                {i < currentIdx ? "✓" : i + 1}
              </div>
              <div className={`flex-1 h-1 ${i < currentIdx ? "bg-blue-600" : "bg-gray-200"}`} />
            </div>
          ))}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${currentIdx >= statusOrder.length - 1 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}>
            {statusOrder.length}
          </div>
        </div>
        <div className="flex justify-between mt-2">
          {statusOrder.map((s) => (
            <div key={s} className="text-xs text-gray-400 text-center" style={{width: `${100/statusOrder.length}%`}}>{s.replace(/_/g," ")}</div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Document Checklist */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Document Checklist</h2>
          {engagement.documentRequirements.length === 0 ? (
            <p className="text-gray-500 text-sm">Document checklist will be assigned by your analyst.</p>
          ) : (
            <ul className="space-y-2">
              {engagement.documentRequirements.map((req) => (
                <li key={req.id} className="flex items-center gap-2 text-sm">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${req.fulfilled ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                    {req.fulfilled ? "✓" : "○"}
                  </div>
                  <span className={req.fulfilled ? "text-gray-500 line-through" : "text-gray-700"}>{req.description}</span>
                  {req.required && !req.fulfilled && <span className="text-xs text-red-500">Required</span>}
                </li>
              ))}
            </ul>
          )}
          <Link href={`/portal/engagements/${id}/upload`} className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            Upload Files
          </Link>
        </div>

        {/* Questionnaires */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Questionnaires</h2>
          {engagement.questionnaires.length === 0 ? (
            <p className="text-gray-500 text-sm">Questionnaires will be assigned by your analyst.</p>
          ) : (
            <ul className="space-y-2">
              {engagement.questionnaires.map((qa) => (
                <li key={qa.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${qa.completedAt ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                      {qa.completedAt ? "✓" : "!"}
                    </div>
                    <span className="text-gray-700">{qa.questionnaire.title}</span>
                  </div>
                  {!qa.completedAt && (
                    <Link href={`/portal/engagements/${id}/questionnaires/${qa.id}`} className="text-xs text-blue-600 hover:underline">Complete</Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Latest Calculation */}
        {engagement.calculations[0] && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Credit Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Total QRE</span><span className="font-medium">${Number(engagement.calculations[0].totalQre).toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Federal Credit</span><span className="font-medium text-green-700">${Number(engagement.calculations[0].reducedCredit ?? engagement.calculations[0].grossCredit ?? 0).toLocaleString()}</span></div>
              {engagement.calculations[0].scAllowedCredit && Number(engagement.calculations[0].scAllowedCredit) > 0 && (
                <div className="flex justify-between text-sm"><span className="text-gray-500">SC State Credit</span><span className="font-medium text-green-700">${Number(engagement.calculations[0].scAllowedCredit).toLocaleString()}</span></div>
              )}
              <div className="flex justify-between text-sm"><span className="text-gray-500">Method</span><span className="font-medium">{engagement.calculations[0].method}</span></div>
            </div>
          </div>
        )}

        {/* Reports */}
        {engagement.reports.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Available Reports</h2>
            <ul className="space-y-2">
              {engagement.reports.map((r) => (
                <li key={r.id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{r.title}</span>
                  <a href={`/api/reports/${r.id}/download`} className="text-xs text-blue-600 hover:underline">Download</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
