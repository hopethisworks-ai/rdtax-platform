"use client";
import { useState } from "react";

interface SupRow {
  description: string; amount: number; glAccount: string;
  qualified: boolean; valid: boolean; error?: string;
}

export default function SupplyImport({ engagementId }: { engagementId: string }) {
  const [rows, setRows] = useState<SupRow[]>([]);
  const [status, setStatus] = useState("idle");
  const [imported, setImported] = useState(0);
  const [error, setError] = useState("");

  function parseCSV(text: string) {
    const lines = text.trim().split("\n");
    if (lines.length < 2) { setError("Need header row and data."); return; }
    const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/[^a-z_]/g,""));
    const get = (vals: string[], keys: string[]) => { for (const k of keys) { const i = headers.indexOf(k); if (i>=0) return vals[i]??""; } return ""; };
    const parsed: SupRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const vals = lines[i].split(",").map(v => v.trim().replace(/^"|"$/g,""));
      const description = get(vals, ["description","item","supply","name","material"]);
      const amount = parseFloat(get(vals, ["amount","cost","total","spend"]).replace(/[$,]/g,""));
      const qualStr = get(vals, ["qualified","rd_qualified","qualifies"]).toLowerCase();
      parsed.push({
        description,
        amount: isNaN(amount) ? 0 : amount,
        glAccount: get(vals, ["gl_account","gl","account","account_code"]),
        qualified: qualStr === "true" || qualStr === "yes" || qualStr === "1" || qualStr === "",
        valid: !!description && !isNaN(amount) && amount > 0,
        error: !description ? "Missing description" : (!amount||isNaN(amount)) ? "Invalid amount" : undefined,
      });
    }
    setRows(parsed); setError("");
  }

  async function handleImport() {
    const valid = rows.filter(r => r.valid);
    if (!valid.length) { setError("No valid rows."); return; }
    setStatus("loading");
    try {
      const res = await fetch(`/api/engagements/${engagementId}/import-supplies`, {
        method: "POST", headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ supplies: valid }),
      });
      const data = await res.json();
      if (res.ok) { setImported(data.imported); setStatus("success"); }
      else { setError(data.error ?? "Import failed"); setStatus("idle"); }
    } catch { setError("Network error."); setStatus("idle"); }
  }

  if (status === "success") return (
    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h2 className="text-2xl font-black text-slate-900 mb-2">{imported} Supply Items Imported</h2>
      <p className="text-slate-500 mb-8">Records created and ready to assign to business components.</p>
      <a href={`/admin/engagements/${engagementId}/projects`} className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl inline-block">Go to Business Components</a>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="font-bold text-blue-900 mb-2">Expected CSV Format</h2>
        <code className="block bg-white border border-blue-200 rounded-lg p-3 text-xs font-mono">description, amount, gl_account, qualified</code>
        <p className="text-blue-600 text-xs mt-2">Example: AWS cloud compute, 48000, 6200, true</p>
        <p className="text-blue-600 text-xs mt-1">qualified defaults to true if not specified. Set to false to mark as pending review.</p>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="font-bold text-slate-900 mb-4">Upload CSV File</h2>
        <input type="file" accept=".csv,.txt" onChange={e=>{const f=e.target.files?.[0];if(f){const r=new FileReader();r.onload=ev=>parseCSV(ev.target?.result as string);r.readAsText(f);}}} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm" />
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="font-bold text-slate-900 mb-2">Or Paste CSV Data</h2>
        <textarea onChange={e=>parseCSV(e.target.value)} placeholder={"description,amount,gl_account,qualified\nAWS cloud compute,48000,6200,true\n3D printing materials,12000,6300,true"} rows={5} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
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
                <tr>{["Status","Description","Amount","GL Account","Qualified"].map(h=><th key={h} className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row,i)=>(
                  <tr key={i} className={row.valid?"":"bg-red-50"}>
                    <td className="px-4 py-2">{row.valid?<span className="text-green-600 text-xs font-medium">Valid</span>:<span className="text-red-500 text-xs">{row.error}</span>}</td>
                    <td className="px-4 py-2 font-medium text-slate-900">{row.description}</td>
                    <td className="px-4 py-2 text-slate-700">${row.amount.toLocaleString()}</td>
                    <td className="px-4 py-2 text-slate-500 text-xs">{row.glAccount||"--"}</td>
                    <td className="px-4 py-2"><span className={"text-xs px-2 py-0.5 rounded-full font-medium "+(row.qualified?"bg-green-100 text-green-700":"bg-amber-100 text-amber-700")}>{row.qualified?"Yes":"Pending"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center">
            <p className="text-slate-500 text-sm">{rows.filter(r=>r.valid).length} rows will be imported</p>
            <button onClick={handleImport} disabled={status==="loading"||rows.filter(r=>r.valid).length===0} className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl disabled:opacity-50 hover:bg-blue-700">
              {status==="loading"?"Importing...":"Import Supplies"}
            </button>
          </div>
        </div>
      )}
      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>}
    </div>
  );
}
