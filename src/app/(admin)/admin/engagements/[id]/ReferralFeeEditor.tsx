"use client";
import { useState } from "react";

export default function ReferralFeeEditor({ engagementId, initialAmount, initialPaid }: {
  engagementId: string;
  initialAmount: number | null;
  initialPaid: boolean;
}) {
  const [amount, setAmount] = useState(initialAmount?.toString() ?? "");
  const [paid, setPaid] = useState(initialPaid);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    await fetch("/api/engagements/" + engagementId + "/referral-fee", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referralFeeAmount: amount ? parseFloat(amount) : null,
        referralFeePaid: paid,
        referralFeePaidAt: paid ? new Date().toISOString() : null,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="mt-4 pt-4 border-t border-slate-100">
      <p className="text-xs font-semibold text-slate-600 mb-3">Update Referral Fee</p>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="text-slate-400 text-sm">$</span>
          <input type="number" min="0" value={amount} onChange={e=>{setAmount(e.target.value);setSaved(false);}} placeholder="Fee amount" className="w-32 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={paid} onChange={e=>{setPaid(e.target.checked);setSaved(false);}} className="w-4 h-4 text-blue-600 rounded" />
          <span className="text-sm text-slate-700">Mark as paid</span>
        </label>
        <button onClick={save} disabled={saving} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {saving ? "Saving..." : saved ? "Saved!" : "Save"}
        </button>
      </div>
    </div>
  );
}

