import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function PortalReportsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userId = (session.user as { id?: string }).id;
  const client = await prisma.client.findFirst({ where: { userId } });
  if (!client) redirect("/login");

  const { id } = await params;

  // Verify engagement belongs to this client
  const engagement = await prisma.engagement.findFirst({
    where: { id, clientId: client.id },
    include: {
      reports: {
        where: { publishedAt: { not: null } },
        orderBy: { createdAt: "desc" },
      },
      calculations: {
        orderBy: { runAt: "desc" },
        take: 1,
      },
    },
  });

  if (!engagement) notFound();

  const calc = engagement.calculations[0];
  const federalCredit = Number(calc?.reducedCredit ?? calc?.grossCredit ?? 0);
  const scCredit = Number(calc?.scAllowedCredit ?? 0);
  const totalCredit = federalCredit + scCredit;
  const fmt = (n: number) => "$" + n.toLocaleString();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href={`/portal/engagements/${id}`} className="text-sm text-blue-600 hover:underline">
          Back to Engagement
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Your Reports</h1>
        <p className="text-slate-500 mt-1">Tax Year {engagement.taxYear} Credit Study Documents</p>
      </div>

      {calc && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
            <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">Federal Credit</p>
            <p className="text-2xl font-black text-green-900">{fmt(federalCredit)}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-center">
            <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide mb-1">SC State Credit</p>
            <p className="text-2xl font-black text-purple-900">{fmt(scCredit)}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">Total Credits</p>
            <p className="text-2xl font-black text-blue-900">{fmt(totalCredit)}</p>
          </div>
        </div>
      )}

      {engagement.reports.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">No Reports Available Yet</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Your credit study is still in progress. Once your analyst completes the analysis, your reports will appear here for download.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {engagement.reports.map((report) => (
            <div
              key={report.id}
              className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{report.title}</h3>
                  <p className="text-sm text-slate-500">
                    {report.reportType.replace(/_/g, " ")} -- Version {report.version}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Published {new Date(report.publishedAt!).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>
              {report.storagePath ? (
                <a
                  href={`/api/reports/${report.id}/download`}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
              ) : (
                <span className="text-sm text-slate-400 italic">Generating...</span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h3 className="font-bold text-slate-900 mb-2">Need Help?</h3>
        <p className="text-sm text-slate-600">
          If you have questions about your credit study or need additional documentation, contact your CreditPath analyst or email{" "}
          <a href="mailto:support@creditpath.com" className="text-blue-600 hover:underline">support@creditpath.com</a>.
        </p>
      </div>
    </div>
  );
}
