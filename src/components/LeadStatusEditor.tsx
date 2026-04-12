"use client";
import { useState } from "react";

const STATUS_OPTIONS = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "SIGNED", "LOST"] as const;

export default function LeadStatusEditor({
  leadId,
  currentStatus,
  currentNotes,
}: {
  leadId: string;
  currentStatus: string;
  currentNotes: string | null;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(currentNotes ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          notes: notes.trim() || null,
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        const data = await res.json();
        setError(data.error ?? "Failed to save changes");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function resetState() {
    setSaved(false);
    setError("");
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 mt-6">
      <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">Update Lead Status</h2>

      <div className="space-y-4">
        {/* Status Dropdown */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-2">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              resetState();
            }}
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Notes Textarea */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-2">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              resetState();
            }}
            placeholder="Add any notes about this lead..."
            rows={4}
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Save Button and Status */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={save}
            disabled={saving || saved}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving..." : saved ? "Saved!" : "Save"}
          </button>

          {error && (
            <p className="text-sm text-red-600 font-medium">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
