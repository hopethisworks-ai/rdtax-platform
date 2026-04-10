import { prisma } from "@/lib/prisma";

export default async function RulesPage() {
  const versions = await prisma.taxRuleVersion.findMany({ orderBy: [{ taxYear: "desc" }, { createdAt: "desc" }] });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tax Rules Registry</h1>
          <p className="text-gray-600 mt-1">All calculations are locked to a specific rule version at time of delivery.</p>
        </div>
      </div>
      <div className="space-y-4">
        {versions.map((v) => (
          <div key={v.id} className={`bg-white border rounded-xl p-6 ${v.deprecated ? "opacity-60 border-gray-200" : "border-blue-200"}`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{v.version}</h3>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">TY {v.taxYear}</span>
                  {v.deprecated && <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">DEPRECATED</span>}
                  {!v.deprecated && !v.effectiveTo && <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">ACTIVE</span>}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div><span className="text-gray-500">Form:</span> <span className="font-medium text-gray-700">{v.formVersion}</span></div>
                  <div><span className="text-gray-500">Federal:</span> <span className="font-medium text-gray-700">{v.federalRuleVersion}</span></div>
                  <div><span className="text-gray-500">Effective:</span> <span className="font-medium text-gray-700">{new Date(v.effectiveFrom).toLocaleDateString()}</span></div>
                  <div><span className="text-gray-500">Payroll Cap:</span> <span className="font-medium text-gray-700">${Number(v.payrollOffsetCap).toLocaleString()}</span></div>
                </div>
                {v.notes && <p className="text-gray-500 text-sm mt-3">{v.notes}</p>}
              </div>
            </div>
          </div>
        ))}
        {versions.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-500">
            No rule versions configured. Use the API to add the initial ruleset.
          </div>
        )}
      </div>
    </div>
  );
}
