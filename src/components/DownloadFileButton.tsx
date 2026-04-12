"use client";
import { useState } from "react";

export default function DownloadFileButton({ fileId, fileName, className }: { fileId: string; fileName?: string; className?: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const res = await fetch(`/api/uploads/${fileId}/signed-url`);
      const data = await res.json();
      if (data.url) {
        window.open(data.url, "_blank");
      }
    } catch {
      // silent fail
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={className ?? "text-blue-600 hover:text-blue-700 text-xs font-medium disabled:opacity-50"}
    >
      {loading ? "..." : (fileName ?? "Download")}
    </button>
  );
}
