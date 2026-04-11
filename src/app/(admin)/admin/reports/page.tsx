import { prisma } from "@/lib/prisma";
import Link from "next/link";

const PAGE_SIZE = 25;

export default async function ReportsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const [reports, totalCount] = await Promise.all([
    prisma.report.findMany({
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        engagement: { include: { client: { select: { companyName: true } } } },
      },
    }),
    prisma.report.count(),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const typeColors: Record<string, string> = {
    PRELIMINARY_ESTIMATE: "bg-slate-100 text-slate-600",
    WORKPAPER_SUMMARY: "bg-blue-100 text-blue-700",
    FINAL_PACKAGE: "bg-green-100 text-green-700",
    INDIVIDUAL_MEMO: "bg-purple-100 text-purple-700",
    METHODOLOGY_MEMO: "bg-amber-100 text-amber-700",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
          <p className="text-slate-500 mt-1">{totalCount} report{totalCount !== 1 ? "s" : ""} generated</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {["Title","Client","Tax Year","Type","Version","Status","Created"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-medium text-slate-500 text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.map(r => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/engagements/${r.engagementId}/report`} className="font-medium text-slate-900 hover:text-blue-600">{r.title}</Link>
                </td>
                <td className="px-4 py-3 text-slate-600">{r.engagement.client.companyName}</td>
                <td className="px-4 py-3 text-slate-600">{r.engagement.taxYear}</td>
                <td className="px-4 py-3">
                  <span className={"text-xs px-2 py-1 rounded-full font-medium " + (typeColors[r.reportType] ?? "bg-gray-100 text-gray-600")}>
                    {r.reportType.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">v{r.version}</td>
                <td className="px-4 py-3">
                  {r.publishedAt ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Published</span>
                  ) : (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">Draft</span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-400 text-xs">{new Date(r.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {reports.length === 0 && (
          <div className="p-12 text-center text-slate-400 text-sm">No reports yet. Generate one from an engagement.</div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-slate-500">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, totalCount)} of {totalCount}
          </p>
          <div className="flex gap-2">
            {currentPage > 1 && (
              <Link href={`/admin/reports?page=${currentPage - 1}`} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Previous</Link>
            )}
            {currentPage < totalPages && (
              <Link href={`/admin/reports?page=${currentPage + 1}`} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Next</Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
