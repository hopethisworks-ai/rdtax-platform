import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function PortalEngagementsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const client = await prisma.client.findFirst({
    where: { userId: (session.user as { id?: string }).id },
  });
  if (!client) redirect("/portal");

  const engagements = await prisma.engagement.findMany({
    where: { clientId: client.id },
    orderBy: { updatedAt: "desc" },
    include: {
      calculations: { select: { reducedCredit: true }, orderBy: { runAt: "desc" }, take: 1 },
      ruleVersion: { select: { version: true } },
    },
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
        <h1 className="text-3xl font-bold text-gray-900">My Engagements</h1>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Tax Year","Status","Latest Credit","Rule Version","Updated"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {engagements.map((eng) => (
              <tr key={eng.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link href={`/portal/engagements/${eng.id}`} className="font-medium text-blue-600 hover:underline">{eng.taxYear}</Link>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[eng.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {eng.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {eng.calculations[0] ? `$${Number(eng.calculations[0].reducedCredit).toLocaleString()}` : "—"}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{eng.ruleVersion?.version ?? "—"}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{new Date(eng.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {engagements.length === 0 && <div className="p-8 text-center text-gray-500">No engagements yet.</div>}
      </div>
    </div>
  );
}
