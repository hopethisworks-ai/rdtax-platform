"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InvoiceActions({ invoiceId, status }: { invoiceId: string; status: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function updateStatus(newStatus: string) {
    setLoading(true);
    await fetch(`/api/invoices/${invoiceId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setLoading(false);
    router.refresh();
  }

  async function deleteInvoice() {
    if (!confirm("Delete this draft invoice?")) return;
    setLoading(true);
    await fetch(`/api/invoices/${invoiceId}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  }

  if (loading) return <span className="text-xs text-slate-400">Updating...</span>;

  if (status === "DRAFT") return (
    <div className="flex gap-2">
      <button onClick={() => updateStatus("SENT")}
        className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium px-2.5 py-1 rounded-lg transition-colors">
        Send
      </button>
      <button onClick={deleteInvoice}
        className="text-xs bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600 font-medium px-2.5 py-1 rounded-lg transition-colors">
        Delete
      </button>
    </div>
  );

  if (status === "SENT") return (
    <div className="flex gap-2">
      <button onClick={() => updateStatus("PAID")}
        className="text-xs bg-green-50 text-green-700 hover:bg-green-100 font-medium px-2.5 py-1 rounded-lg transition-colors">
        Mark Paid
      </button>
      <button onClick={() => updateStatus("VOID")}
        className="text-xs bg-slate-50 text-slate-500 hover:bg-slate-100 font-medium px-2.5 py-1 rounded-lg transition-colors">
        Void
      </button>
    </div>
  );

  if (status === "OVERDUE") return (
    <button onClick={() => updateStatus("PAID")}
      className="text-xs bg-green-50 text-green-700 hover:bg-green-100 font-medium px-2.5 py-1 rounded-lg transition-colors">
      Mark Paid
    </button>
  );

  return <span className="text-xs text-slate-400">{status}</span>;
}
