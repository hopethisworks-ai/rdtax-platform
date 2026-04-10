"use client";
import { useState } from "react";

interface FundedResearchContractor {
  id: string;
  vendorName: string;
  amount: number;
}

interface Props {
  engagementId: string;
  entityType: string;
  fundedResearchContractors: FundedResearchContractor[];
  /** Pre-populated from the legal entity's operatesInSC flag */
  initialOperatesInSC: boolean;
}

function defaultRateForEntity(entityType: string): number {
  const et = entityType.toLowerCase();
  if (et.includes("c-corp") || et.includes("c corp") || et === "ccorp") return 21;
  return 0;
}

function isPassThrough(entityType: string): boolean {
  return defaultRateForEntity(entityType) === 0;
}

export default function RunButton({ engagementId, entityType, fundedResearchContractors, initialOperatesInSC }: Props) {
  const [status, setStatus]   = useState("idle");
  const [result, setResult]   = useState<Record<string, unknown> | null>(null);
  const [error, setError]     = useState("");
  const [method, setMethod]   = useState("ASC");
  const [c280c, setC280c]     = useState(false);
  const [c280cRate, setC280cRate] = useState<string>(String(defaultRateForEntity(entityType)));
  const [operatesInSC, setOperatesInSC] = useState(initialOperatesInSC);
  const [frAcknowledged, setFrAcknowledged] = useState<Set<string>>(new Set());

  const passThrough      = isPassThrough(entityType);
  const hasFundedResearch = fundedResearchContractors.length > 0;
  const allFrAcknowledged = fundedResearchContractors.every(c => frAcknowledged.has(c.id));

  function toggleFr(id: string) {
    setFrAcknowledged(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function run() {
    if (c280c && passThrough && (!c280cRate || Number(c280cRate) <= 0)) {
      setError("Enter the owner's applicable marginal tax rate for the 280C election.");
      return;
    }
    if (hasFundedResearch && !allFrAcknowledged) {
      setError("You must acknowledge each funded-research contractor below before running.");
      return;
    }
    setStatus("loading"); setError("");
    try {
      const rateDecimal = c280c ? Number(c280cRate) / 100 : 0.21;
      const res = await fetch("/api/engagements/" + engagementId + "/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method,
          c280cElection: c280c,
          c280cRate: rateDecimal,
          applyScCredit: operatesInSC,
          acknowledgedFundedResearchContractorIds: Array.from(frAcknowledged),
        }),
      });
      const data = await res.json();
      if (res.ok) { setResult(data.calculation); setStatus("success"); }
      else { setError(data.error ?? "Calculation failed"); setStatus("idle"); }
    } catch { setError("Network error — please try again"); setStatus("idle"); }
  }

  // ── Success state ────────────────────────────────────────────────────────────
  if (status === "success" && result) return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-6">
      <h2 className="font-bold text-green-900 text-lg mb-4">Calculation Complete</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4 text-center border border-slate-200">
          <div className="text-xs text-slate-500 mb-1">Total QRE</div>
          <div className="text-xl font-black text-slate-900">${Number(result.totalQre ?? 0).toLocaleString()}</div>
        </div>
        <div className="bg-blue-600 rounded-xl p-4 text-center">
          <div className="text-xs text-blue-200 mb-1">Gross Federal Credit</div>
          <div className="text-xl font-black text-white">${Number(result.grossCredit ?? 0).toLocaleString()}</div>
        </div>
        <div className="bg-slate-900 rounded-xl p-4 text-center">
          <div className="text-xs text-slate-400 mb-1">Net Federal Credit</div>
          <div className="text-xl font-black text-white">${Number(result.reducedCredit ?? 0).toLocaleString()}</div>
        </div>
        <div className="bg-green-600 rounded-xl p-4 text-center">
          <div className="text-xs text-green-200 mb-1">SC State Credit</div>
          <div className="text-xl font-black text-white">${Number(result.scAllowedCredit ?? 0).toLocaleString()}</div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <div className="flex justify-between py-1 border-b border-slate-100">
          <span className="text-slate-600 text-sm">Method</span>
          <span className="font-bold text-slate-900 text-sm">{String(result.method)}</span>
        </div>
        {!!result.c280cElectionMade && (
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-600 text-sm">280C Rate Applied</span>
            <span className="font-medium text-slate-900 text-sm">{Number(result.c280cRate ?? 21).toFixed(0)}%</span>
          </div>
        )}
        <div className="flex justify-between py-1 border-b border-slate-100">
          <span className="text-slate-600 text-sm">SC Credit Applied</span>
          <span className="font-medium text-slate-900 text-sm">{Number(result.scAllowedCredit ?? 0) > 0 ? "Yes" : "No"}</span>
        </div>
        <div className="flex justify-between py-2 mt-1">
          <span className="font-bold text-slate-900">Total Federal + SC</span>
          <span className="font-black text-blue-600 text-xl">
            ${(Number(result.reducedCredit ?? 0) + Number(result.scAllowedCredit ?? 0)).toLocaleString()}
          </span>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <a href={"/admin/engagements/" + engagementId} className="flex-1 text-center text-green-700 font-semibold text-sm py-2">
          Back to Engagement
        </a>
        <button onClick={() => { setStatus("idle"); setResult(null); }}
          className="flex-1 text-center bg-white border border-green-300 text-green-700 font-semibold text-sm py-2 rounded-lg">
          Run Again
        </button>
      </div>
    </div>
  );

  // ── Form state ───────────────────────────────────────────────────────────────
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 mt-6 space-y-6">
      <h2 className="font-bold text-slate-900">Calculation Settings</h2>

      {/* SC Credit Toggle — first thing the analyst sees */}
      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-800">South Carolina R&amp;D Credit (§12-6-3375)</p>
            <p className="text-xs text-slate-500 mt-0.5">
              {operatesInSC
                ? "SC credit will be calculated at 5% of SC-sourced QREs, capped at 50% of SC tax liability."
                : "Toggle on if this company has qualifying R&D activity in South Carolina."}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={operatesInSC}
            onClick={() => setOperatesInSC(v => !v)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              operatesInSC ? "bg-blue-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                operatesInSC ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        {operatesInSC && (
          <p className="text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mt-3">
            SC QRE % and liability limits are configured on the client&apos;s legal entity page.
            Ensure those values are set before running.
          </p>
        )}
      </div>

      {/* Method + 280C */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Credit Method</label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer">
              <input type="radio" name="m" value="ASC" checked={method === "ASC"} onChange={e => setMethod(e.target.value)} />
              <div>
                <div className="font-medium text-slate-900 text-sm">ASC Method (Recommended)</div>
                <div className="text-slate-400 text-xs">14% of incremental QREs above 50% of 3yr average</div>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer">
              <input type="radio" name="m" value="REGULAR" checked={method === "REGULAR"} onChange={e => setMethod(e.target.value)} />
              <div>
                <div className="font-medium text-slate-900 text-sm">Regular Method</div>
                <div className="text-slate-400 text-xs">20% of incremental QREs above fixed base</div>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Section 280C Election</label>
          <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer">
            <input type="checkbox" checked={c280c} onChange={e => setC280c(e.target.checked)} className="mt-0.5" />
            <div>
              <div className="font-medium text-slate-900 text-sm">Make 280C Election</div>
              <div className="text-slate-400 text-xs mt-0.5">
                Reduces credit by the applicable tax rate but allows full R&D expense deduction.
              </div>
            </div>
          </label>

          {c280c && (
            <div className="mt-3 p-4 border border-slate-200 rounded-lg bg-slate-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Entity Type</span>
                <span className="text-sm font-medium text-slate-800">{entityType}</span>
              </div>
              {passThrough ? (
                <>
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2 mb-3">
                    <strong>Pass-through entity:</strong> Enter the owner&apos;s applicable marginal tax rate.
                  </p>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Applicable Marginal Rate (%)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number" min={1} max={50} step={0.1}
                      value={c280cRate} onChange={e => setC280cRate(e.target.value)}
                      placeholder="e.g. 37"
                      className="w-28 border border-slate-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <span className="text-sm text-slate-500">%</span>
                  </div>
                </>
              ) : (
                <p className="text-xs text-slate-600">
                  C-Corp rate of <strong>21%</strong> will be applied (IRC §280C(c)(2)).
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Funded-research acknowledgment */}
      {hasFundedResearch && (
        <div className="border border-amber-300 bg-amber-50 rounded-xl p-5">
          <div className="flex items-start gap-3 mb-4">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <div>
              <p className="text-sm font-bold text-amber-800">Funded-Research Contractor Review Required</p>
              <p className="text-xs text-amber-700 mt-1">
                Per IRC §41(b)(3), confirm economic risk and substantial rights retained for each contractor below.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {fundedResearchContractors.map(c => (
              <label key={c.id} className="flex items-start gap-3 p-3 bg-white border border-amber-200 rounded-lg cursor-pointer">
                <input type="checkbox" checked={frAcknowledged.has(c.id)} onChange={() => toggleFr(c.id)} className="mt-0.5 accent-amber-600" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">{c.vendorName}</p>
                  <p className="text-xs text-slate-500">${c.amount.toLocaleString()} — taxpayer bore economic risk and retained substantial rights.</p>
                </div>
              </label>
            ))}
          </div>
          {!allFrAcknowledged && (
            <p className="text-xs text-amber-700 mt-3 font-medium">
              {fundedResearchContractors.length - frAcknowledged.size} contractor(s) still need acknowledgment.
            </p>
          )}
        </div>
      )}

      <button
        onClick={run}
        disabled={
          status === "loading" ||
          (hasFundedResearch && !allFrAcknowledged) ||
          (c280c && passThrough && !Number(c280cRate))
        }
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {status === "loading" ? "Running…" : "Run Credit Calculation"}
      </button>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
}
