import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CreateInvoiceButton from "./CreateInvoiceButton";
import InvoiceActions from "./InvoiceActions";

export default async function InvoicesPage() {
  const [invoices, clients] = await Promise.all([
    prisma.invoice.findMany({
      include: { client: { select: { companyName: true, email: true } }, engagement: { select: { taxYear: true } } },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.client.findMany({ select: { id: true, companyName: true }, orderBy: { companyName: "asc" } }),
  ]);

  const statusColors: Record<string, string> = {
    DRAFT:   "bg-slate-100 text-slate-600",
    SENT:    "bg-blue-50 text-blue-700",
    PAID:    "bg-green-50 text-green-700",
    OVERDUE: "bg-red-50 text-red-700",
    VOID:    "bg-slate-100 text-slate-400 line-through",
  };

  const totalPaid = invoices.filter(i => i.status === "PAID").reduce((sum, i) => sum + Number(i.totalAmount), 0);
  const totalOutstanding = invoices.filter(i => i.status === "SENT").reduce((sum, i) => sum + Number(i.totalAmount), 0);
  const totalDraft = invoices.filter(i => i.status === "DRAFT").reduce((sum, i) => sum + Number(i.totalAmount), 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
          <p className="text-sm text-slate-500 mt-1">Manage client billing</p>
        </div>
        <CreateInvoiceButton clients={clients} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-2xl font-bold text-green-600">${totalPaid.toLocaleString()}</div>
          <div className="text-sm text-slate-500 mt-1">Collected</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-2xl font-bold text-blue-600">${totalOutstanding.toLocaleString()}</div>
          <div className="text-sm text-slate-500 mt-1">Outstanding</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-2xl font-bold text-slate-400">${totalDraft.toLocaleString()}</div>
          <div className="text-sm text-slate-500 mt-1">Draft</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Client</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Tax Year</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Due Date</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {invoices.length === 0 && (
              <tr><td colSpan={6} className="text-center py-12 text-slate-400">No invoices yet</td></tr>
            )}
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-800">{inv.client.companyName}</div>
                  <div className="text-xs text-slate-400">{inv.client.email}</div>
                </td>
                <td className="px-6 py-4 text-slate-600">{inv.engagement?.taxYear ?? "—"}</td>
                <td className="px-6 py-4 text-right font-semibold text-slate-900">${Number(inv.totalAmount).toLocaleString()}</td>
                <td className="px-6 py-4 text-slate-500">
                  {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "—"}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[inv.status] ?? "bg-slate-100 text-slate-600"}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <InvoiceActions invoiceId={inv.id} status={inv.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
