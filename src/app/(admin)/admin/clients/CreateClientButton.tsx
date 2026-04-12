"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateClientButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    industry: "",
    state: "SC",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setOpen(false);
        setForm({ companyName: "", contactName: "", email: "", phone: "", industry: "", state: "SC" });
        router.refresh();
      } else {
        const d = await res.json();
        setError(typeof d.error === "string" ? d.error : "Failed to create client");
      }
    } catch {
      setError("Network error");
    }
    setSaving(false);
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
        + New Client
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Create New Client</h2>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Company Name *</label>
              <input value={form.companyName} onChange={(e) => set("companyName", e.target.value)} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Name *</label>
              <input value={form.contactName} onChange={(e) => set("contactName", e.target.value)} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email *</label>
              <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
              <input value={form.phone} onChange={(e) => set("phone", e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Industry</label>
              <select value={form.industry} onChange={(e) => set("industry", e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                <option value="">Select...</option>
                {["Software & Technology","Manufacturing","Construction","Life Sciences","Engineering","Agriculture","Food & Beverage","Automotive","Aerospace","Other"].map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">State</label>
              <input value={form.state} onChange={(e) => set("state", e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        <p className="text-xs text-slate-400 mt-3">An invitation email will be sent to the client to set up their portal access.</p>
        <div className="flex justify-end gap-3 mt-5">
          <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
          <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm disabled:opacity-50">
            {saving ? "Creating..." : "Create & Invite"}
          </button>
        </div>
      </form>
    </div>
  );
}
