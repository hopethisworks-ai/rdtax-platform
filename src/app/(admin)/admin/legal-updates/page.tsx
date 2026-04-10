import { prisma } from "@/lib/prisma";

export default async function LegalUpdatesPage({ searchParams }: { searchParams: Promise<{ implemented?: string }> }) {
  const { implemented: imp } = await searchParams;
  const implemented = imp === "true" ? true : imp === "false" ? false : undefined;
  const updates = await prisma.legalUpdateRecord.findMany({
    where: implemented !== undefined ? { implemented } : {},
    include: { implementedBy: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  const sourceColors: Record<string, string> = {
    IRS_INSTRUCTION: "bg-blue-100 text-blue-700",
    REGULATION: "bg-purple-100 text-purple-700",
    ATG: "bg-indigo-100 text-indigo-700",
    IRM: "bg-gray-100 text-gray-700",
    DIRECTIVE: "bg-orange-100 text-orange-700",
    COURT_CASE: "bg-red-100 text-red-700",
    STATE_GUIDANCE: "bg-green-100 text-green-700",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Legal Update Registry</h1>
          <p className="text-gray-600 mt-1">Track IRS guidance, regulations, and court cases that impact the calculation engine.</p>
        </div>
        <div className="flex gap-2">
          <a href="/admin/legal-updates" className={`text-xs px-3 py-2 rounded-lg font-medium border ${!imp ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300"}`}>All</a>
          <a href="/admin/legal-updates?implemented=false" className={`text-xs px-3 py-2 rounded-lg font-medium border ${imp === "false" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300"}`}>Pending</a>
          <a href="/admin/legal-updates?implemented=true" className={`text-xs px-3 py-2 rounded-lg font-medium border ${imp === "true" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300"}`}>Implemented</a>
        </div>
      </div>
      <div className="space-y-4">
        {updates.map((u) => (
          <div key={u.id} className={`bg-white border rounded-xl p-6 ${u.isMandatory && !u.implemented ? "border-red-300 bg-red-50" : "border-gray-200"}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${sourceColors[u.sourceType] ?? "bg-gray-100 text-gray-600"}`}>{u.sourceType.replace(/_/g," ")}</span>
                  {u.isMandatory && <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">MANDATORY</span>}
                  {u.implemented ? (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">IMPLEMENTED</span>
                  ) : (
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">PENDING</span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{u.sourceTitle}</h3>
                {u.citation && <p className="text-xs text-gray-500 mb-2">Citation: {u.citation}</p>}
                <p className="text-sm text-gray-600 mb-3">{u.summary}</p>
                {u.impactedModules.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs text-gray-500 font-medium">Impacts:</span>
                    {u.impactedModules.map((m) => (
                      <span key={m} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{m}</span>
                    ))}
                  </div>
                )}
                {u.implemented && u.implementedBy && (
                  <p className="text-xs text-gray-400 mt-2">Implemented by {u.implementedBy.name ?? u.implementedBy.email} on {u.implementedDate ? new Date(u.implementedDate).toLocaleDateString() : "—"}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        {updates.length === 0 && <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-500">No legal updates found.</div>}
      </div>
    </div>
  );
}
