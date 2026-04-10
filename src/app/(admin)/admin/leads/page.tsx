import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ status?: string; state?: string }> }) {
  const where: Record<string, unknown> = {};
  const { status, state } = await searchParams;
  if (status) where.status = status;
  if (state) where.state = state;

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { estimatorRun: { select: { estimateLow: true, estimateHigh: true } } },
  });

  const statusColors: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-700",
    CONTACTED: "bg-yellow-100 text-yellow-700",
    QUALIFIED: "bg-green-100 text-green-700",
    PROPOSAL_SENT: "bg-purple-100 text-purple-700",
    SIGNED: "bg-emerald-100 text-emerald-700",
    LOST: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
        <div className="flex gap-2">
          {["NEW","CONTACTED","QUALIFIED","PROPOSAL_SENT","SIGNED","LOST"].map((s) => (
            <Link key={s} href={`/admin/leads?status=${s}`} className={`text-xs px-3 py-1.5 rounded-full font-medium border ${status === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"}`}>
              {s.replace("_"," ")}
            </Link>
          ))}
          {status && <Link href="/admin/leads" className="text-xs px-3 py-1.5 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50">Clear</Link>}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Company","Contact","Email","State","Industry","Est. Credit","Status","Created"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <Link href={`/admin/leads/${lead.id}`} className="hover:text-blue-600">{lead.companyName}</Link>
                </td>
                <td className="px-4 py-3 text-gray-600">{lead.contactName}</td>
                <td className="px-4 py-3 text-gray-600">{lead.email}</td>
                <td className="px-4 py-3 text-gray-600">{lead.state ?? "—"}</td>
                <td className="px-4 py-3 text-gray-600">{lead.industry ?? "—"}</td>
                <td className="px-4 py-3 text-gray-600">
                  {lead.estimatorRun ? `$${Number(lead.estimatorRun.estimateLow).toLocaleString()}–$${Number(lead.estimatorRun.estimateHigh).toLocaleString()}` : "—"}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[lead.status] ?? "bg-gray-100 text-gray-600"}`}>{lead.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  <Link href={`/admin/leads/${lead.id}`} className="hover:text-blue-600">{new Date(lead.createdAt).toLocaleDateString()}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && <div className="p-8 text-center text-gray-500">No leads found.</div>}
      </div>
    </div>
  );
}
