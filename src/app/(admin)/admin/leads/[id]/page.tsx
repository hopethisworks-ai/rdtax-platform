import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConvertLeadButton from "@/components/ConvertLeadButton";
import LeadStatusEditor from "@/components/LeadStatusEditor";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { estimatorRun: true },
  });
  if (!lead) notFound();

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
      <div className="mb-6">
        <Link href="/admin/leads" className="text-sm text-blue-600 hover:underline">← Back to Leads</Link>
      </div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{lead.companyName}</h1>
          <p className="text-gray-500 mt-1">{lead.contactName} · {lead.email}</p>
        </div>
        <div className="flex items-center gap-3">
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${statusColors[lead.status] ?? "bg-gray-100 text-gray-600"}`}>{lead.status}</span>
        <ConvertLeadButton leadId={lead.id} alreadyConverted={!!lead.convertedToClientId} clientId={lead.convertedToClientId} />
      </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Lead Details</h2>
          <dl className="space-y-3">
            {[
              ["Phone", lead.phone ?? "—"],
              ["Industry", lead.industry ?? "—"],
              ["State", lead.state ?? "—"],
              ["Revenue Band", lead.revenueBand ?? "—"],
              ["Employee Count", lead.employeeCount ?? "—"],
              ["Lead Source", lead.leadSource ?? "—"],
              ["Created", new Date(lead.createdAt).toLocaleDateString()],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-sm text-gray-500">{label}</dt>
                <dd className="text-sm font-medium text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        {lead.estimatorRun && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Estimator Result</h2>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Estimate Low</dt>
                <dd className="text-sm font-medium text-gray-900">${Number(lead.estimatorRun.estimateLow).toLocaleString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Estimate High</dt>
                <dd className="text-sm font-medium text-gray-900">${Number(lead.estimatorRun.estimateHigh).toLocaleString()}</dd>
              </div>
            </dl>
          </div>
        )}
        {lead.notes && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:col-span-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Notes</h2>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{lead.notes}</p>
          </div>
        )}
      </div>

      <LeadStatusEditor
        leadId={lead.id}
        currentStatus={lead.status}
        currentNotes={lead.notes}
      />
    </div>
  );
}
