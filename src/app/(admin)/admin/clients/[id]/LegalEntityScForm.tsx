"use client";

import { useState } from "react";

interface Props {
  entityId: string;
  entityName: string;
  initialOperatesInSC: boolean;
  /** Stored as 0–1 decimal, e.g. 0.85 means 85 % */
  initialStateSourceQrePct: number | null;
  initialStateTaxLiability: number | null;
}

export default function LegalEntityScForm({
  entityId,
  entityName,
  initialOperatesInSC,
  initialStateSourceQrePct,
  initialStateTaxLiability,
}: Props) {
  const [operatesInSC, setOperatesInSC] = useState(initialOperatesInSC);
  const [pct, setPct] = useState(
    initialStateSourceQrePct != null ? String(Math.round(initialStateSourceQrePct * 10000) / 100) : ""
  );
  const [liability, setLiability] = useState(
    initialStateTaxLiability != null ? String(initialStateTaxLiability) : ""
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setError(null);
    setSaved(false);

    const pctNum = !operatesInSC || pct.trim() === "" ? null : parseFloat(pct) / 100;
    const liabilityNum = !operatesInSC || liability.trim() === "" ? null : parseFloat(liability);

    if (operatesInSC && pctNum !== null && (isNaN(pctNum) || pctNum < 0 || pctNum > 1)) {
      setError("SC QRE % must be between 0 and 100.");
      return;
    }
    if (operatesInSC && liabilityNum !== null && (isNaN(liabilityNum) || liabilityNum < 0)) {
      setError("SC tax liability must be a non-negative number.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/legal-entities/${entityId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operatesInSC,
          stateSourceQrePct: pctNum,
          stateTaxLiabilityAfterOtherCredits: liabilityNum,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Save failed.");
      } else {
        setSaved(true);
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-slate-700">{entityName} — SC Credit (§12-6-3375)</p>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <span className="text-xs text-slate-500">Operates in SC</span>
          <button
            type="button"
            role="switch"
            aria-checked={operatesInSC}
            onClick={() => { setOperatesInSC(v => !v); setSaved(false); }}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              operatesInSC ? "bg-blue-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                operatesInSC ? "translate-x-4" : "translate-x-1"
              }`}
            />
          </button>
        </label>
      </div>

      {!operatesInSC && (
        <p className="text-xs text-slate-400 italic">
          SC credit disabled — toggle on if this entity has qualifying R&amp;D activity in South Carolina.
        </p>
      )}

      {operatesInSC && (
        <div className="grid grid-cols-2 gap-4 mt-1">
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              SC-Sourced QRE %
              <span className="ml-1 text-slate-400">(0 – 100)</span>
            </label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={0}
                max={100}
                step={0.01}
                value={pct}
                onChange={(e) => { setPct(e.target.value); setSaved(false); }}
                placeholder="e.g. 85"
                className="w-full text-sm border border-slate-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-400">%</span>
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              SC Tax Liability After Credits
              <span className="ml-1 text-slate-400">($)</span>
            </label>
            <div className="flex items-center gap-1">
              <span className="text-sm text-slate-400">$</span>
              <input
                type="number"
                min={0}
                step={1}
                value={liability}
                onChange={(e) => { setLiability(e.target.value); setSaved(false); }}
                placeholder="e.g. 50000"
                className="w-full text-sm border border-slate-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}

      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {saved && <span className="text-xs text-green-600 font-medium">Saved ✓</span>}
      </div>
    </div>
  );
}
