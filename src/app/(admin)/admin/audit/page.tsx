import { prisma } from "@/lib/prisma";
import Link from "next/link";

const PAGE_SIZE = 25;

function buildFilterUrl(params: Record<string, string | null | undefined>) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.set(key, value);
  });
  const queryString = query.toString();
  return queryString ? `/admin/audit?${queryString}` : "/admin/audit";
}

export default async function AuditPage({ searchParams }: { searchParams: Promise<{ action?: string; engagementId?: string; page?: string; from?: string; to?: string; userEmail?: string }> }) {
  const { action, engagementId, page: pageParam, from, to, userEmail } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const where: Record<string, unknown> = {};
  if (action) where.action = action;
  if (engagementId) where.engagementId = engagementId;

  if (userEmail) {
    where.user = { email: { contains: userEmail, mode: "insensitive" } };
  }

  if (from || to) {
    where.createdAt = {};
    if (from) {
      const fromDate = new Date(from);
      if (!isNaN(fromDate.getTime())) {
        (where.createdAt as Record<string, unknown>).gte = fromDate;
      }
    }
    if (to) {
      const toDate = new Date(to);
      if (!isNaN(toDate.getTime())) {
        const endOfDay = new Date(toDate);
        endOfDay.setHours(23, 59, 59, 999);
        (where.createdAt as Record<string, unknown>).lte = endOfDay;
      }
    }
  }

  const [logs, totalCount] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: { user: { select: { email: true, name: true } } },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.auditLog.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
        <p className="text-gray-600 mt-1">Immutable record of all platform actions.</p>
      </div>

      <form method="GET" action="/admin/audit" className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
            <input
              type="text"
              name="userEmail"
              placeholder="Filter by email..."
              defaultValue={userEmail ?? ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <input
              type="date"
              name="from"
              defaultValue={from ?? ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <input
              type="date"
              name="to"
              defaultValue={to ?? ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
            <input
              type="text"
              name="action"
              placeholder="Filter by action..."
              defaultValue={action ?? ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Apply Filters
          </button>
          {(action || userEmail || from || to) && (
            <Link
              href="/admin/audit"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear Filters
            </Link>
          )}
        </div>
      </form>

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

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, totalCount)} of {totalCount}
          </p>
          <div className="flex gap-2">
            {currentPage > 1 && (
              <Link
                href={buildFilterUrl({ action, engagementId, from, to, userEmail, page: String(currentPage - 1) })}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Previous
              </Link>
            )}
            {currentPage < totalPages && (
              <Link
                href={buildFilterUrl({ action, engagementId, from, to, userEmail, page: String(currentPage + 1) })}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
