import { prisma } from "@/lib/prisma";
import Link from "next/link";
import FileReviewActions from "./FileReviewActions";
import DownloadFileButton from "@/components/DownloadFileButton";

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
    NEEDS_REVIEW: "bg-surface text-primary",
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
          <h1 className="text-2xl font-bold text-navy tracking-tight">Uploaded Files</h1>
          <p className="text-sm text-secondary mt-1">{files.length} file{files.length !== 1 ? "s" : ""} found</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link href="/admin/uploads" className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${!status ? "bg-blue-600 text-white border-blue-600" : "bg-white text-body-text border-gray-300 hover:bg-surface"}`}>
            All
          </Link>
          {statuses.map((s) => (
            <Link key={s} href={`/admin/uploads?status=${s}`} className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${status === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-body-text border-gray-300 hover:bg-surface"}`}>
              {s.replace(/_/g, " ")}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface border-b border-gray-200">
            <tr>
              {["File Name","Client","Tax Year","Category","Size","Status","Uploaded","Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium text-secondary text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {files.map((f) => (
              <tr key={f.id} className="hover:bg-surface transition-colors">
                <td className="px-4 py-3">
                  <DownloadFileButton fileId={f.id} fileName={f.originalName} className="font-medium text-blue-600 hover:text-blue-700 truncate max-w-xs block text-left text-sm disabled:opacity-50" />
                  <div className="text-xs text-gray-400 mt-0.5">{f.mimeType}</div>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/clients/${f.clientId}`} className="text-navy hover:text-blue-600 font-medium">
                    {f.client.companyName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-body-text">{f.engagement?.taxYear ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-gray-100 text-body-text px-2 py-1 rounded font-medium">
                    {f.category.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-secondary text-xs">{formatBytes(f.sizeBytes)}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[f.status] ?? "bg-gray-100 text-body-text"}`}>
                    {f.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">{new Date(f.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3"><FileReviewActions fileId={f.id} initialStatus={f.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {files.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 text-sm">No files found{status ? ` with status "${status}"` : ""}.</div>
          </div>
        )}
      </div>
    </div>
  );
}
