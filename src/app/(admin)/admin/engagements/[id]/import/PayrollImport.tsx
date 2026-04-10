"use client";
import { useState } from "react";

interface EmpRow {
  name: string; title: string; employeeId: string;
  compensation: number; bonus: number; qualifiedActivityPct: number;
  valid: boolean; error?: string;
}

export default function PayrollImport({ engagementId }: { engagementId: string }) {
  const [rows, setRows] = useState<EmpRow[]>([]);
  const [status, setStatus] = useState("idle");
  const [imported, setImported] = useState(0);
  const [error, setError] = useState("");

  function parseCSV(text: string) {
    const lines = text.trim().split("\n");
    if (lines.length < 2) { setError("Need header row and data."); return; }
    const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/[^a-z_]/g,""));
    const get = (vals: string[], keys: string[]) => { for (const k of keys) { const i = headers.indexOf(k); if (i>=0) return vals[i]??""; } return ""; };
    const parsed: EmpRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const vals = lines[i].split(",").map(v => v.trim().replace(/^"|"$/g,""));
      const name = get(vals, ["name","employee_name","full_name"]);
      const comp = parseFloat(get(vals, ["compensation","salary","wages","annual_salary"]).replace(/[$,]/g,""));
      let pct = parseFloat(get(vals, ["qualified_pct","rd_pct","pct"])) || 50;
      if (pct > 1) pct = pct / 100;
      parsed.push({
        name, title: get(vals,["title","job_title","position"]),
        employeeId: get(vals,["employee_id","employeeid","id"]),
        compensation: isNaN(comp) ? 0 : comp,
        bonus: parseFloat(get(vals,["bonus"]).replace(/[$,]/g,"")) || 0,
        qualifiedActivityPct: pct,
        valid: !!name && !isNaN(comp) && comp > 0,
        error: !name ? "Missing name" : (!comp || isNaN(comp)) ? "Invalid compensation" : undefined,
      });
    }
    setRows(parsed); setError("");
  }

  async function handleImport() {
    const valid = rows.filter(r => r.valid);
    if (!valid.length) { setError("No valid rows."); return; }
    setStatus("loading");
    try {
      const res = await fetch(`/api/engagements/${engagementId}/import-payroll`, {
        method: "POST", headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ employees: valid }),
      });
      const data = await res.json();
      if (res.ok) { setImported(data.imported); setStatus("success"); }
      else { setError(data.error ?? "Import failed"); setStatus("idle"); }
    } catch { setError("Network error."); setStatus("idle"); }
  }

  if (status === "success") return (
    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h2 className="text-2xl font-black text-slate-900 mb-2">{imported} Employees Imported</h2>
      <p className="text-slate-500 mb-8">Records created and ready to assign to business components.</p>
      <a href={`/admin/engagements/${engagementId}/projects`} className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl inline-block">Go to Business Components</a>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="font-bold text-blue-900 mb-2">Expected CSV Format</h2>
        <code className="block bg-white border border-blue-200 rounded-lg p-3 text-xs font-mono">
          name, title, employee_id, compensation, bonus, qualified_pct
        </code>
        <p className="text-blue-600 text-xs mt-2">Example: Alice Chen, Engineer, EMP001, 145000, 10000, 85</p>
        <p className="text-blue-600 text-xs mt-1">qualified_pct is R&D time percentage (0-100). Defaults to 50%.</p>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="font-bold text-slate-900 mb-4">Upload CSV File</h2>
        <input type="file" accept=".csv,.txt" onChange={e => { const f=e.target.files?.[0]; if(f){const r=new FileReader();r.onload=ev=>parseCSV(ev.target?.result as string);r.readAsText(f);}}} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm" />
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="font-bold text-slate-900 mb-2">Or Paste CSV Data</h2>
        <textarea onChange={e=>parseCSV(e.target.value)} placeholder={"name,title,compensation,qualified_pct\nAlice Chen,Engineer,145000,85"} rows={5} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      </div>
      {rows.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-900">Preview ({rows.length} rows)</h2>
            <div className="flex gap-3 text-sm">
              <span className="text-green-600 font-medium">{rows.filter(r=>r.valid).length} valid</span>
              <span className="text-red-500 font-medium">{rows.filter(r=>!r.valid).length} invalid</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>{["Status","Name","Title","Compensation","R&D %"].map(h=><th key={h} className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row,i)=>(
                  <tr key={i} className={row.valid?"":"bg-red-50"}>
                    <td className="px-4 py-2">{row.valid?<span className="text-green-600 text-xs font-medium">Valid</span>:<span className="text-red-500 text-xs">{row.error}</span>}</td>
                    <td className="px-4 py-2 font-medium text-slate-900">{row.name}</td>
                    <td className="px-4 py-2 text-slate-600">{row.title||"--"}</td>
                    <td className="px-4 py-2 text-slate-700">${row.compensation.toLocaleString()}</td>
                    <td className="px-4 py-2 text-slate-700">{Math.round(row.qualifiedActivityPct*100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center">
            <p className="text-slate-500 text-sm">{rows.filter(r=>r.valid).length} rows will be imported</p>
            <button onClick={handleImport} disabled={status==="loading"||rows.filter(r=>r.valid).length===0} className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl disabled:opacity-50 hover:bg-blue-700">
              {status==="loading"?"Importing...":"Import Employees"}
            </button>
          </div>
        </div>
      )}
      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>}
    </div>
  );
}
