import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import LegalEntityScForm from "./LegalEntityScForm";

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      engagements: {
        orderBy: { createdAt: "desc" },
        include: { calculations: { select: { reducedCredit: true }, orderBy: { runAt: "desc" }, take: 1 } },
      },
      legalEntities: true,
      uploadedFiles: { select: { id: true, originalName: true, status: true, createdAt: true }, take: 10 },
    },
  });
  if (!client) notFound();

  // Read SC credit fields via raw query — the Prisma client types will pick these
  // up automatically once `prisma migrate dev` regenerates the client.
  type ScRow = { id: string; operatesInSC: boolean; stateSourceQrePct: number | null; stateTaxLiabilityAfterOtherCredits: number | null };
  const scRows = await prisma.$queryRaw<ScRow[]>`
    SELECT id,
           "operatesInSC",
           "stateSourceQrePct"::float                  AS "stateSourceQrePct",
           "stateTaxLiabilityAfterOtherCredits"::float  AS "stateTaxLiabilityAfterOtherCredits"
    FROM   "LegalEntity"
    WHERE  "clientId" = ${id}
  `;
  const scByEntityId = Object.fromEntries(scRows.map((r) => [r.id, r]));

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
      <div className="mb-6">
        <Link href="/admin/clients" className="text-sm text-blue-600 hover:underline">← Back to Clients</Link>
      </div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{client.companyName}</h1>
          <p className="text-gray-500 mt-1">{client.contactName} · {client.email}</p>
        </div>
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${client.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {client.active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Client Info</h2>
          <dl className="space-y-3">
            {[
              ["Phone", client.phone ?? "—"],
              ["Industry", client.industry ?? "—"],
              ["Address", [client.address, client.city, client.state, client.zip].filter(Boolean).join(", ") || "—"],
              ["Invited", client.invitedAt ? new Date(client.invitedAt).toLocaleDateString() : "—"],
              ["Onboarded", client.onboardedAt ? new Date(client.onboardedAt).toLocaleDateString() : "—"],
              ["Created", new Date(client.createdAt).toLocaleDateString()],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-sm text-gray-500">{label}</dt>
                <dd className="text-sm font-medium text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Legal Entities ({client.legalEntities.length})</h2>
          {client.legalEntities.length === 0 ? (
            <p className="text-sm text-gray-500">No legal entities.</p>
          ) : (
            <div className="space-y-4">
              {client.legalEntities.map((le) => (
                <div key={le.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-900">{le.name}</p>
                    <span className="text-xs text-gray-500">{le.entityType} · TY{le.taxYear}</span>
                  </div>
                  <LegalEntityScForm
                    entityId={le.id}
                    entityName={le.name}
                    initialOperatesInSC={scByEntityId[le.id]?.operatesInSC ?? false}
                    initialStateSourceQrePct={scByEntityId[le.id]?.stateSourceQrePct ?? null}
                    initialStateTaxLiability={scByEntityId[le.id]?.stateTaxLiabilityAfterOtherCredits ?? null}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Engagements ({client.engagements.length})</h2>
        {client.engagements.length === 0 ? (
          <p className="text-sm text-gray-500">No engagements yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Tax Year","Status","Latest Credit","Updated"].map((h) => (
                  <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {client.engagements.map((eng) => (
                <tr key={eng.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/engagements/${eng.id}`} className="font-medium text-blue-600 hover:underline">{eng.taxYear}</Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[eng.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {eng.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {eng.calculations[0] ? `$${Number(eng.calculations[0].reducedCredit).toLocaleString()}` : "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{new Date(eng.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Recent Files ({client.uploadedFiles.length})</h2>
        {client.uploadedFiles.length === 0 ? (
          <p className="text-sm text-gray-500">No files uploaded yet.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {client.uploadedFiles.map((f) => (
              <div key={f.id} className="flex justify-between items-center py-2">
                <p className="text-sm text-gray-900">{f.originalName}</p>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{f.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
