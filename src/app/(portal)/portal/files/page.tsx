import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PortalFilesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const client = await prisma.client.findFirst({
    where: { userId: (session.user as { id?: string }).id },
  });
  if (!client) redirect("/portal");

  const files = await prisma.uploadedFile.findMany({
    where: { clientId: client.id },
    orderBy: { createdAt: "desc" },
  });

  const statusColors: Record<string, string> = {
    UPLOADED: "bg-blue-100 text-blue-700",
    NEEDS_REVIEW: "bg-yellow-100 text-yellow-700",
    MAPPED: "bg-purple-100 text-purple-700",
    ACCEPTED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    MISSING_FOLLOW_UP: "bg-orange-100 text-orange-700",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Files</h1>
        <span className="text-sm text-gray-500">{files.length} total</span>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["File Name","Type","Status","Uploaded"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {files.map((f) => (
              <tr key={f.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{f.originalName}</td>
                <td className="px-4 py-3 text-gray-600">{f.mimeType.split("/")[1]?.toUpperCase() ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[f.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {f.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{new Date(f.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {files.length === 0 && <div className="p-8 text-center text-gray-500">No files uploaded yet.</div>}
      </div>
    </div>
  );
}
