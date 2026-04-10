import { prisma } from "@/lib/prisma";
import Link from "next/link";
import FileReviewActions from "./FileReviewActions";

export default async function UploadsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const where: Record<string, unknown> = {};
  if (status) where.status = status;

  const files = await prisma.uploadedFile.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      client: { select: { companyName: true } },
      engagement: { select: { taxYear: true } },
    },
  });

  const statusColors: Record<string, string> = {
    UPLOADED: "bg-blue-50 text-blue-700",
    NEEDS_REVIEW: "bg-amber-50 text-amber-700",
    MAPPED: "bg-indigo-50 text-indigo-700",
    ACCEPTED: "bg-green-50 text-green-700",
    REJECTED: "bg-red-50 text-red-700",
    MISSING_FOLLOW_UP: "bg-orange-50 text-orange-700",
  };

  const statuses = ["UPLOADED","NEEDS_REVIEW","MAPPED","ACCEPTED","REJECTED","MISSING_FOLLOW_UP"];

  function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Uploaded Files</h1>
          <p className="text-sm text-slate-500 mt-1">{files.length} file{files.length !== 1 ? "s" : ""} found</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link href="/admin/uploads" className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${!status ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"}`}>
            All
          </Link>
          {statuses.map((s) => (
            <Link key={s} href={`/admin/uploads?status=${s}`} className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${status === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"}`}>
              {s.replace(/_/g, " ")}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {["File Name","Client","Tax Year","Category","Size","Status","Uploaded","Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium text-slate-500 text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {files.map((f) => (
              <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-800 truncate max-w-xs">{f.originalName}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{f.mimeType}</div>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/clients/${f.clientId}`} className="text-slate-700 hover:text-blue-600 font-medium">
                    {f.client.companyName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-600">{f.engagement?.taxYear ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium">
                    {f.category.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">{formatBytes(f.sizeBytes)}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[f.status] ?? "bg-slate-100 text-slate-600"}`}>
                    {f.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-400 text-xs">{new Date(f.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3"><FileReviewActions fileId={f.id} initialStatus={f.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {files.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-slate-400 text-sm">No files found{status ? ` with status "${status}"` : ""}.</div>
          </div>
        )}
      </div>
    </div>
  );
}
