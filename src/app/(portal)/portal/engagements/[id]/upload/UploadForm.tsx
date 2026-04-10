"use client";
import { useState, useRef } from "react";

const CATEGORIES = [
  { value: "PAYROLL_EXPORT", label: "Payroll Export" },
  { value: "GENERAL_LEDGER", label: "General Ledger" },
  { value: "TRIAL_BALANCE", label: "Trial Balance" },
  { value: "CONTRACTOR_INVOICE", label: "Contractor Invoice" },
  { value: "CONTRACTOR_AGREEMENT", label: "Contractor Agreement" },
  { value: "TAX_RETURN", label: "Prior Year Tax Return" },
  { value: "PROJECT_LIST", label: "Project List" },
  { value: "TECHNICAL_DOCUMENT", label: "Technical Document" },
  { value: "FINANCIAL_STATEMENT", label: "Financial Statement" },
  { value: "OTHER", label: "Other" },
];

export default function UploadForm({ engagementId }: { engagementId: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState("OTHER");
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<{name:string;success:boolean;error?:string}[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(newFiles: FileList | null) {
    if (!newFiles) return;
    setFiles(prev => [...prev, ...Array.from(newFiles)]);
  }

  function removeFile(idx: number) {
    setFiles(prev => prev.filter((_,i) => i !== idx));
  }

  async function handleUpload() {
    if (!files.length) return;
    setUploading(true);
    setResults([]);
    const newResults = [];
    for (const file of files) {
      try {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("engagementId", engagementId);
        fd.append("category", category);
        const res = await fetch("/api/portal/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (res.ok) {
          newResults.push({ name: file.name, success: true });
        } else {
          newResults.push({ name: file.name, success: false, error: data.error });
        }
      } catch {
        newResults.push({ name: file.name, success: false, error: "Network error" });
      }
    }
    setResults(newResults);
    setFiles([]);
    setUploading(false);
  }

  const fmt = (bytes: number) => bytes < 1024*1024 ? (bytes/1024).toFixed(0)+"KB" : (bytes/1024/1024).toFixed(1)+"MB";

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <h2 className="font-bold text-slate-900 mb-4">Upload Documents</h2>
      {results.length > 0 && (
        <div className="mb-4 space-y-2">
          {results.map((r,i) => (
            <div key={i} className={"flex items-center gap-2 p-3 rounded-lg text-sm "+(r.success?"bg-green-50 border border-green-200":"bg-red-50 border border-red-200")}>
              <span className={r.success?"text-green-600":"text-red-500"}>{r.success?"Uploaded":"Failed"}</span>
              <span className={r.success?"text-green-800":"text-red-700"}>{r.name}</span>
              {r.error && <span className="text-red-500 text-xs">{r.error}</span>}
            </div>
          ))}
          <button onClick={()=>setResults([])} className="text-xs text-slate-500 hover:text-slate-700">Clear</button>
        </div>
      )}
      <div
        className={"border-2 border-dashed rounded-xl p-8 text-center mb-4 transition-colors cursor-pointer "+(dragOver?"border-blue-400 bg-blue-50":"border-slate-200 hover:border-blue-300")}
        onDragOver={e=>{e.preventDefault();setDragOver(true);}}
        onDragLeave={()=>setDragOver(false)}
        onDrop={e=>{e.preventDefault();setDragOver(false);handleFiles(e.dataTransfer.files);}}
        onClick={()=>inputRef.current?.click()}
      >
        <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
        <p className="text-slate-600 font-medium mb-1">Drop files here or click to browse</p>
        <p className="text-slate-400 text-xs">PDF, Excel, CSV, Word, Images -- Max 50MB per file</p>
        <input ref={inputRef} type="file" multiple className="hidden" onChange={e=>handleFiles(e.target.files)} accept=".pdf,.xlsx,.xls,.csv,.doc,.docx,.jpg,.jpeg,.png" />
      </div>
      {files.length > 0 && (
        <div className="mb-4 space-y-2">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{files.length} file{files.length>1?"s":""} selected</p>
          {files.map((f,i) => (
            <div key={i} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
              <div>
                <p className="text-sm font-medium text-slate-800">{f.name}</p>
                <p className="text-xs text-slate-400">{fmt(f.size)}</p>
              </div>
              <button onClick={()=>removeFile(i)} className="text-slate-400 hover:text-red-500 text-lg leading-none">x</button>
            </div>
          ))}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 mb-1">Document Category</label>
        <select value={category} onChange={e=>{setCategory(e.target.value)}} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          {CATEGORIES.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>
      <button onClick={handleUpload} disabled={uploading||files.length===0} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-50">
        {uploading ? "Uploading..." : `Upload ${files.length > 0 ? files.length+" file"+(files.length>1?"s":"") : "Files"}`}
      </button>
      <div className="mt-4 pt-4 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-600 mb-2">Commonly requested documents:</p>
        <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
          <li>Payroll registers or W-2 summary reports</li>
          <li>Contractor invoices and agreements</li>
          <li>General ledger or trial balance</li>
          <li>Prior year tax returns</li>
          <li>Project descriptions or technical summaries</li>
        </ul>
      </div>
    </div>
  );
}

