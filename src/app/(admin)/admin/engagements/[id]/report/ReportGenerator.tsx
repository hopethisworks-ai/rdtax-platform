"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const REPORT_TYPES = [
  { value: "PRELIMINARY_ESTIMATE", label: "Preliminary Estimate" },
  { value: "WORKPAPER_SUMMARY", label: "Workpaper Summary" },
  { value: "FINAL_PACKAGE", label: "Final Package" },
  { value: "INDIVIDUAL_MEMO", label: "Individual Memo" },
  { value: "METHODOLOGY_MEMO", label: "Methodology Memo" },
];

export default function ReportGenerator({ engagementId, calculationId, clientName, taxYear }: {
  engagementId: string;
  calculationId: string;
  clientName: string;
  taxYear: number;
}) {
  const router = useRouter();
  const [reportType, setReportType] = useState("FINAL_PACKAGE");
  const [title, setTitle] = useState(`${clientName} -- ${taxYear} R&D Tax Credit Study`);
  const [notes, setNotes] = useState("");
  const [publish, setPublish] = useState(false);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    setSaving(true);
    setError("");
    try {
      // Create the report metadata record
      const res = await fetch("/api/engagements/" + engagementId + "/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportType, title, notes, calculationId, publishNow: publish }),
      });
      if (res.ok) {
        // Also enqueue the PDF generation job so the report gets a downloadable file
        await fetch("/api/reports/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ engagementId, calculationId, reportType }),
        }).catch(() => { /* PDF generation is non-blocking; metadata record already created */ });
        setDone(true);
        setTimeout(() => { setDone(false); router.refresh(); }, 1500);
      } else {
        const d = await res.json();
        setError(d.error ?? "Failed to generate report");
      }
    } catch {
      setError("Network error");
    }
    setSaving(false);
  }

  if (done) return (
    <div className="text-center py-8">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <p className="font-bold text-slate-900">Report Generated!</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Report Type</label>
        <select value={reportType} onChange={e=>{setReportType(e.target.value)}} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          {REPORT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Report Title</label>
        <input value={title} onChange={e=>{setTitle(e.target.value)}} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Notes (optional)</label>
        <textarea value={notes} onChange={e=>{setNotes(e.target.value)}} rows={2} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Internal notes about this report version..." />
      </div>
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={publish} onChange={e=>{setPublish(e.target.checked)}} className="w-4 h-4 text-blue-600 rounded" />
        <div>
          <p className="text-sm font-semibold text-slate-700">Publish to client portal</p>
          <p className="text-xs text-slate-400">Client will be able to see this report in their portal immediately</p>
        </div>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={generate} disabled={saving || !title.trim()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-50">
        {saving ? "Generating..." : "Generate Report"}
      </button>
    </div>
  );
}

