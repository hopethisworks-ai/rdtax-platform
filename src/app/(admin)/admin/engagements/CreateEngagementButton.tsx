"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Client {
  id: string;
  companyName: string;
}

export default function CreateEngagementButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const currentYear = new Date().getFullYear();
  const [form, setForm] = useState({
    clientId: "",
    taxYear: currentYear,
    status: "INTAKE",
  });

  const set = (k: string, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (open && clients.length === 0) {
      setLoadingClients(true);
      fetch("/api/clients?limit=500")
        .then((res) => res.json())
        .then((data) => {
          if (data.clients) {
            setClients(data.clients);
          }
        })
        .catch(() => setError("Failed to load clients"))
        .finally(() => setLoadingClients(false));
    }
  }, [open, clients.length]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/engagements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: form.clientId,
          taxYear: form.taxYear,
          engagementType: "standard",
        }),
      });
      if (res.ok) {
        setOpen(false);
        setForm({ clientId: "", taxYear: currentYear, status: "INTAKE" });
        router.refresh();
      } else {
        const d = await res.json();
        setError(typeof d.error === "string" ? d.error : "Failed to create engagement");
      }
    } catch {
      setError("Network error");
    }
    setSaving(false);
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
        + New Engagement
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Create New Engagement</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Client *</label>
            <select
              value={form.clientId}
              onChange={(e) => set("clientId", e.target.value)}
              required
              disabled={loadingClients}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm disabled:opacity-50"
            >
              <option value="">{loadingClients ? "Loading..." : "Select a client"}</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.companyName}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Tax Year *</label>
              <input
                type="number"
                value={form.taxYear}
                onChange={(e) => set("taxYear", parseInt(e.target.value))}
                required
                min="2000"
                max="2100"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
              <select value={form.status} onChange={(e) => set("status", e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                <option value="INTAKE">INTAKE</option>
                <option value="DATA_COLLECTION">DATA_COLLECTION</option>
                <option value="ANALYSIS">ANALYSIS</option>
                <option value="CALCULATION">CALCULATION</option>
                <option value="REVIEW">REVIEW</option>
                <option value="DOCUMENTATION">DOCUMENTATION</option>
                <option value="FINAL_REPORT">FINAL_REPORT</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        <div className="flex justify-end gap-3 mt-5">
          <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm disabled:opacity-50">
            {saving ? "Creating..." : "Create Engagement"}
          </button>
        </div>
      </form>
    </div>
  );
}
