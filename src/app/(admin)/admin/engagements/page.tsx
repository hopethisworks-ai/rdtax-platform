import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function EngagementsPage({ searchParams }: { searchParams: Promise<{ status?: string; taxYear?: string }> }) {
  const { status, taxYear } = await searchParams;
  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (taxYear) where.taxYear = parseInt(taxYear);

  const engagements = await prisma.engagement.findMany({
    where,
    include: {
      client: { select: { companyName: true, email: true } },
      ruleVersion: { select: { version: true } },
      calculations: { select: { id: true, grossCredit: true, reducedCredit: true }, orderBy: { runAt: "desc" }, take: 1 },
    },
    orderBy: { updatedAt: "desc" },
  });

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Engagements</h1>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Client","Tax Year","Status","Rule Version","Latest Credit","Updated"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {engagements.map((eng) => (
              <tr key={eng.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/engagements/${eng.id}`} className="font-medium text-gray-900 hover:text-blue-600">{eng.client.companyName}</Link>
                  <div className="text-xs text-gray-500">{eng.client.email}</div>
                </td>
                <td className="px-4 py-3 text-gray-700 font-medium">{eng.taxYear}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[eng.status] ?? "bg-gray-100 text-gray-600"}`}>{eng.status.replace(/_/g," ")}</span>
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">{eng.ruleVersion?.version ?? "—"}</td>
                <td className="px-4 py-3 text-gray-700">
                  {eng.calculations[0] ? `$${Number(eng.calculations[0].reducedCredit ?? eng.calculations[0].grossCredit ?? 0).toLocaleString()}` : "—"}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{new Date(eng.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {engagements.length === 0 && <div className="p-8 text-center text-gray-500">No engagements found.</div>}
      </div>
    </div>
  );
}
