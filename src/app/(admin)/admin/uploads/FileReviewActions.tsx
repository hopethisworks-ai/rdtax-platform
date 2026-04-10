"use client";
import { useState } from "react";

export default function FileReviewActions({ fileId, initialStatus }: { fileId: string; initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);

  async function updateStatus(newStatus: string) {
    setSaving(true);
    const res = await fetch("/api/uploads/" + fileId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus, reviewNotes: note || null }),
    });
    if (res.ok) {
      setStatus(newStatus);
      setShowNote(false);
      setNote("");
    }
    setSaving(false);
  }

  if (status === "ACCEPTED") return (
    <div className="flex items-center gap-2">
      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Approved</span>
      <button onClick={()=>updateStatus("NEEDS_REVIEW")} className="text-xs text-slate-400 hover:text-slate-600">Undo</button>
    </div>
  );

  if (status === "REJECTED") return (
    <div className="flex items-center gap-2">
      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">Rejected</span>
      <button onClick={()=>updateStatus("NEEDS_REVIEW")} className="text-xs text-slate-400 hover:text-slate-600">Undo</button>
    </div>
  );

  return (
    <div className="space-y-1">
      {showNote && (
        <input value={note} onChange={e=>{setNote(e.target.value)}} placeholder="Review note (optional)" className="w-full text-xs border border-slate-200 rounded px-2 py-1 mb-1" />
      )}
      <div className="flex items-center gap-1">
        <button onClick={()=>updateStatus("ACCEPTED")} disabled={saving} className="text-xs bg-green-600 text-white px-2 py-1 rounded font-medium hover:bg-green-700 disabled:opacity-50">
          Approve
        </button>
        <button onClick={()=>setShowNote(!showNote)} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-medium hover:bg-red-200">
          Reject
        </button>
        {showNote && (
          <button onClick={()=>updateStatus("REJECTED")} disabled={saving||!true} className="text-xs bg-red-600 text-white px-2 py-1 rounded font-medium hover:bg-red-700 disabled:opacity-50">
            Confirm
          </button>
        )}
        <button onClick={()=>updateStatus("NEEDS_REVIEW")} disabled={saving} className="text-xs text-slate-400 hover:text-slate-600 px-1">
          Flag
        </button>
      </div>
    </div>
  );
}
