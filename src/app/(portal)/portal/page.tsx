import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PortalDashboard() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string }).id;

  const client = await prisma.client.findFirst({
    where: { userId },
    include: {
      engagements: {
        include: {
          documentRequirements: true,
          uploadedFiles: true,
          questionnaires: true,
          calculations: { orderBy: { runAt: "desc" }, take: 1 },
          reports: { where: { publishedAt: { not: null } } },
          invoices: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!client) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Your Portal</h2>
        <p className="text-gray-600">Your account is being set up. You'll receive an email when your engagement is ready.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {client.contactName}</h1>
      <p className="text-gray-600 mb-10">{client.companyName}</p>
      {client.engagements.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
          <p className="text-gray-600">Your engagement is being set up. Check back soon.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {client.engagements.map((eng) => {
            const totalDocs = eng.documentRequirements.length;
            const fulfilledDocs = eng.documentRequirements.filter((d) => d.fulfilled).length;
            const totalQ = eng.questionnaires.length;
            const completedQ = eng.questionnaires.filter((q) => q.completedAt).length;
            const hasCalc = eng.calculations.length > 0;
            const hasReport = eng.reports.length > 0;

            return (
              <div key={eng.id} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Tax Year {eng.taxYear}</h2>
                    <span className="text-sm text-gray-500">{eng.engagementType}</span>
                  </div>
                  <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">{eng.status.replace(/_/g," ")}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{fulfilledDocs}/{totalDocs}</div>
                    <div className="text-xs text-gray-500 mt-1">Documents</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{completedQ}/{totalQ}</div>
                    <div className="text-xs text-gray-500 mt-1">Questionnaires</div>
                  </div>
                  <div className={`text-center p-4 rounded-lg ${hasCalc ? "bg-green-50" : "bg-gray-50"}`}>
                    <div className={`text-sm font-bold ${hasCalc ? "text-green-700" : "text-gray-400"}`}>
                      {hasCalc ? `$${Number(eng.calculations[0].reducedCredit ?? eng.calculations[0].grossCredit ?? 0).toLocaleString()}` : "Pending"}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Est. Credit</div>
                  </div>
                  <div className={`text-center p-4 rounded-lg ${hasReport ? "bg-green-50" : "bg-gray-50"}`}>
                    <div className={`text-sm font-bold ${hasReport ? "text-green-700" : "text-gray-400"}`}>
                      {hasReport ? "Ready" : "In Progress"}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Final Report</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link href={`/portal/engagements/${eng.id}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                    View Engagement
                  </Link>
                  {hasReport && (
                    <Link href={`/portal/engagements/${eng.id}/reports`} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                      Download Reports
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
