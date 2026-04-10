import { prisma } from "@/lib/prisma";

export default async function AuditPage({ searchParams }: { searchParams: Promise<{ action?: string; engagementId?: string }> }) {
  const where: Record<string, unknown> = {};
  const { action, engagementId } = await searchParams;
  if (action) where.action = action;
  if (engagementId) where.engagementId = engagementId;

  const logs = await prisma.auditLog.findMany({
    where,
    include: { user: { select: { email: true, name: true } } },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
        <p className="text-gray-600 mt-1">Immutable record of all platform actions.</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Timestamp","User","Action","Entity","Metadata"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-mono">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-500 text-xs whitespace-nowrap">{new Date(log.createdAt).toISOString()}</td>
                <td className="px-4 py-2 text-gray-700 text-xs">{log.user?.email ?? "system"}</td>
                <td className="px-4 py-2">
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">{log.action}</span>
                </td>
                <td className="px-4 py-2 text-gray-600 text-xs">{log.entityType}{log.entityId ? ` (${log.entityId.slice(0,8)}...)` : ""}</td>
                <td className="px-4 py-2 text-gray-500 text-xs max-w-xs truncate">{log.metadata ? JSON.stringify(log.metadata) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && <div className="p-8 text-center text-gray-500">No audit events found.</div>}
      </div>
    </div>
  );
}
