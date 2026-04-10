import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import EngagementNav from "../EngagementNav";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const engagement = await prisma.engagement.findUnique({
    where: { id },
    include: {
      client: { select: { companyName: true } },
      projects: {
        include: {
          employees: { select: { id: true, name: true, qreAmount: true, qualifiedActivityPct: true } },
          supplies: { select: { id: true, description: true, amount: true, qualified: true } },
          contractors: { select: { id: true, vendorName: true, amount: true, qualifiedAmount: true, fundedResearchFlag: true, substantialRightsRetained: true, successContingentPayment: true, economicRiskBorne: true, qualifiedFlag: true } },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });
  if (!engagement) notFound();

  const serialized = engagement.projects.map(p => ({
    ...p,
    employees: p.employees.map(e => ({...e, qreAmount: Number(e.qreAmount??0), qualifiedActivityPct: Number(e.qualifiedActivityPct??0), compensation: Number(0)})),
    supplies: p.supplies.map(s => ({...s, amount: Number(s.amount??0)})),
    contractors: p.contractors.map(c => ({...c, amount: Number(c.amount??0), qualifiedAmount: Number(c.qualifiedAmount??0)})),
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <EngagementNav id={id} />
      <div className="mb-6">
        <Link href={`/admin/engagements/${id}`} className="text-sm text-blue-600 hover:underline">Back to Engagement</Link>
      </div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Business Components</h1>
          <p className="text-slate-500 text-sm mt-1">{engagement.client.companyName} - Tax Year {engagement.taxYear}</p>
        </div>
      </div>
      <ProjectsClient engagementId={id} initialProjects={serialized} />
    </div>
  );
}
