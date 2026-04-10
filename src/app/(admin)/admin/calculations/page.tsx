import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CalculationsPage() {
  const calculations = await prisma.calculation.findMany({
    orderBy: { runAt: "desc" },
    include: {
      engagement: {
        include: { client: { select: { companyName: true } } },
      },
      ruleVersion: { select: { version: true } },
      overrides: { select: { id: true } },
    },
    take: 100,
  });

  const methodColors: Record<string, string> = {
    ASC: "bg-blue-100 text-blue-700",
    TRADITIONAL: "bg-purple-100 text-purple-700",
    ALTERNATIVE_SIMPLIFIED: "bg-indigo-100 text-indigo-700",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calculations</h1>
        <span className="text-sm text-gray-500">{calculations.length} most recent</span>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Client","Tax Year","Method","Total QRE","Gross Credit","Reduced Credit","Rule Version","Overrides","Run At"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {calculations.map((calc) => (
              <tr key={calc.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/engagements/${calc.engagementId}`} className="font-medium text-gray-900 hover:text-blue-600">
                    {calc.engagement.client.companyName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-700 font-medium">{calc.taxYear}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${methodColors[calc.method] ?? "bg-gray-100 text-gray-600"}`}>
                    {calc.method}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">${Number(calc.totalQre).toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-700">${Number(calc.grossCredit).toLocaleString()}</td>
                <td className="px-4 py-3 font-medium text-green-700">${Number(calc.reducedCredit).toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{calc.ruleVersion.version}</td>
                <td className="px-4 py-3 text-center">
                  {calc.overrides.length > 0
                    ? <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">{calc.overrides.length}</span>
                    : <span className="text-gray-400">—</span>}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{new Date(calc.runAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {calculations.length === 0 && <div className="p-8 text-center text-gray-500">No calculations found.</div>}
      </div>
    </div>
  );
}
