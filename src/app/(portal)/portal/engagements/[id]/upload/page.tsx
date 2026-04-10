import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import UploadForm from "./UploadForm";
import { notFound, redirect } from "next/navigation";

export default async function PortalUploadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string }).id;
  if (!userId) redirect("/login");

  const client = await prisma.client.findFirst({ where: { userId } });
  if (!client) notFound();

  const engagement = await prisma.engagement.findFirst({
    where: { id, clientId: client.id },
    include: {
      documentRequirements: { orderBy: { createdAt: "asc" } },
      uploadedFiles: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!engagement) notFound();

  const categoryColors: Record<string, string> = {
    PAYROLL: "bg-blue-100 text-blue-700",
    CONTRACTOR: "bg-purple-100 text-purple-700",
    SUPPLY: "bg-green-100 text-green-700",
    FINANCIAL: "bg-amber-100 text-amber-700",
    PROJECT: "bg-indigo-100 text-indigo-700",
    OTHER: "bg-gray-100 text-gray-600",
  };

  return (
    <div>
      <div className="mb-6">
        <Link href={`/portal/engagements/${id}`} className="text-sm text-blue-600 hover:underline">Back to Engagement</Link>
      </div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Upload Files</h1>
          <p className="text-slate-500 mt-1">Tax Year {engagement.taxYear}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <UploadForm engagementId={id} />
        <div className="space-y-4">
          {engagement.documentRequirements.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="font-bold text-slate-900 mb-4">Document Checklist ({engagement.documentRequirements.filter(d => d.fulfilled).length}/{engagement.documentRequirements.length} complete)</h2>
              <div className="space-y-2">
                {engagement.documentRequirements.map(req => (
                  <div key={req.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                    <div className={"w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 " + (req.fulfilled ? "bg-green-100" : "bg-slate-100")}>
                      {req.fulfilled ? (
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={"text-sm " + (req.fulfilled ? "text-slate-400 line-through" : "text-slate-700")}>{req.description}</p>
                      {req.category && (
                        <span className={"text-xs px-2 py-0.5 rounded-full font-medium " + (categoryColors[req.category] ?? "bg-gray-100 text-gray-600")}>{req.category}</span>
                      )}
                    </div>
                    {req.required && !req.fulfilled && (
                      <span className="text-xs text-red-500 font-medium">Required</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {engagement.uploadedFiles.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="font-bold text-slate-900 mb-4">Uploaded Files ({engagement.uploadedFiles.length})</h2>
              <div className="space-y-2">
                {engagement.uploadedFiles.map(f => (
                  <div key={f.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <p className="text-sm text-slate-700">{f.originalName}</p>
                    <span className={"text-xs px-2 py-1 rounded-full font-medium " + (f.status === "ACCEPTED" ? "bg-green-100 text-green-700" : f.status === "NEEDS_REVIEW" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>
                      {f.status.replace(/_/g, " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {engagement.uploadedFiles.length === 0 && engagement.documentRequirements.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
              <p className="text-slate-400 text-sm">No files uploaded yet. Send your documents to the email above and they will appear here once processed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
