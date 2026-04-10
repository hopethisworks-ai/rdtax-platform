import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PortalInvoicesPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string }).id;

  const client = await prisma.client.findFirst({
    where: { userId },
    include: {
      invoices: {
        include: { engagement: { select: { taxYear: true, engagementType: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!client) return (
    <div className="text-center py-20">
      <p className="text-gray-600">No account found.</p>
    </div>
  );

  const invoices = client.invoices;

  const statusColors: Record<string, string> = {
    DRAFT: "bg-gray-100 text-gray-600",
    SENT: "bg-blue-100 text-blue-700",
    PAID: "bg-green-100 text-green-700",
    OVERDUE: "bg-red-100 text-red-700",
    VOID: "bg-gray-100 text-gray-400",
  };

  const totalPaid = invoices.filter(i => i.status === "PAID").reduce((s, i) => s + Number(i.totalAmount), 0);
  const totalPending = invoices.filter(i => i.status === "SENT").reduce((s, i) => s + Number(i.totalAmount), 0);

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-500 mt-1">{client.companyName}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Total Invoices</div>
          <div className="text-3xl font-black text-slate-900">{invoices.length}</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="text-xs text-green-600 uppercase tracking-wide mb-1">Total Paid</div>
          <div className="text-3xl font-black text-green-700">${totalPaid.toLocaleString()}</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="text-xs text-blue-600 uppercase tracking-wide mb-1">Pending</div>
          <div className="text-3xl font-black text-blue-700">${totalPending.toLocaleString()}</div>
        </div>
      </div>
      {invoices.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <div className="text-4xl mb-4"></div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No Invoices Yet</h2>
          <p className="text-slate-500">Invoices will appear here once your engagement is underway. Your fee is contingency-based -- you only pay when your credit is recovered.</p>
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-sm mx-auto">
            <p className="text-blue-800 text-sm font-semibold">How our fee works</p>
            <p className="text-blue-700 text-xs mt-1">We charge 20% of credits recovered. No upfront cost. No credit, no fee.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-900">Invoice History</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {invoices.map(inv => (
              <div key={inv.id} className="px-6 py-4 flex justify-between items-center hover:bg-slate-50">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    {inv.engagement ? `Tax Year ${inv.engagement.taxYear}` : "General"} -- {inv.engagement?.engagementType ?? "Engagement"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Issued {new Date(inv.createdAt).toLocaleDateString()}
                    {inv.dueDate && ` -- Due ${new Date(inv.dueDate).toLocaleDateString()}`}
                    {inv.paidAt && ` -- Paid ${new Date(inv.paidAt).toLocaleDateString()}`}
                  </p>
                  {inv.notes && <p className="text-xs text-slate-500 mt-1">{inv.notes}</p>}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-black text-slate-900">${Number(inv.totalAmount).toLocaleString()}</p>
                    {inv.contingencyFee && (
                      <p className="text-xs text-slate-400">Contingency: ${Number(inv.contingencyFee).toLocaleString()}</p>
                    )}
                  </div>
                  <span className={"text-xs px-3 py-1 rounded-full font-medium " + (statusColors[inv.status] ?? "bg-gray-100 text-gray-600")}>
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h3 className="font-bold text-slate-900 mb-2">Questions About Your Invoice?</h3>
        <p className="text-slate-500 text-sm mb-4">Contact us and we will walk you through any questions about your fee or payment.</p>
        <Link href="/contact" className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm inline-block">Contact Us</Link>
      </div>
    </div>
  );
}
