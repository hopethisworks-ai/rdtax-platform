"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConvertLeadButton({ leadId, alreadyConverted, clientId }: { leadId: string; alreadyConverted: boolean; clientId?: string | null }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const router = useRouter();

  if (alreadyConverted && clientId) return (
    <a href={`/admin/clients/${clientId}`} className="bg-green-600 text-white font-semibold px-5 py-2 rounded-lg text-sm inline-block">
      View Client Record →
    </a>
  );

  async function handleConvert() {
    if (!confirm("Convert this lead to a client? This will create a client record, legal entity, and engagement.")) return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(`/api/leads/${leadId}/convert`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        router.push(`/admin/clients/${data.clientId}`);
      } else {
        setError(data.error ?? "Conversion failed");
        setStatus("idle");
      }
    } catch {
      setError("Network error. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <div>
      <button onClick={handleConvert} disabled={status === "loading"} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors disabled:opacity-50">
        {status === "loading" ? "Converting..." : "Convert to Client →"}
      </button>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}
