"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Client { id: string; companyName: string; }

export default function CreateInvoiceButton({ clients }: { clients: Client[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [form, setForm] = useState({
    clientId: "",
    engagementFee: "",
    contingencyFee: "",
    auditSupportFee: "",
    dueDate: "",
    notes: "",
  });

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.clientId || !form.engagementFee) { setError("Client and engagement fee are required"); return; }
    setLoading(true); setError("");
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: form.clientId,
        engagementFee: parseFloat(form.engagementFee),
        contingencyFee: form.contingencyFee ? parseFloat(form.contingencyFee) : undefined,
        auditSupportFee: form.auditSupportFee ? parseFloat(form.auditSupportFee) : undefined,
        dueDate: form.dueDate || undefined,
        notes: form.notes || undefined,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error ?? "Failed to create invoice"); return; }
    setOpen(false);
    router.refresh();
  }

  const total =
    (parseFloat(form.engagementFee) || 0) +
    (parseFloat(form.contingencyFee) || 0) +
    (parseFloat(form.auditSupportFee) || 0);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        + New Invoice
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-900">Create Invoice</h2>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl">×</button>
            </div>
            <form onSubmit={submit} className="px-6 py-5 space-y-4">
              {/* Client */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Client *</label>
                <select required value={form.clientId} onChange={e => set("clientId", e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Select client...</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
                </select>
              </div>

              {/* Fees */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Engagement Fee *</label>
                  <input required type="number" min="0" step="0.01" placeholder="0.00"
                    value={form.engagementFee} onChange={e => set("engagementFee", e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Contingency Fee</label>
                  <input type="number" min="0" step="0.01" placeholder="0.00"
                    value={form.contingencyFee} onChange={e => set("contingencyFee", e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Audit Support</label>
                  <input type="number" min="0" step="0.01" placeholder="0.00"
                    value={form.auditSupportFee} onChange={e => set("auditSupportFee", e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>

              {total > 0 && (
                <div className="bg-slate-50 rounded-lg px-4 py-2 flex justify-between items-center">
                  <span className="text-sm text-slate-600">Total</span>
                  <span className="font-bold text-slate-900">${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              )}

              {/* Due Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Due Date</label>
                <input type="date" value={form.dueDate} onChange={e => set("dueDate", e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Notes</label>
                <textarea rows={2} value={form.notes} onChange={e => set("notes", e.target.value)}
                  placeholder="Optional notes for the client..."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setOpen(false)}
                  className="flex-1 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  {loading ? "Creating..." : "Create Draft"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
