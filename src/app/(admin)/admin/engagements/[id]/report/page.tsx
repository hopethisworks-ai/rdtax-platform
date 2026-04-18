import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import EngagementNav from "../EngagementNav";
import ReportGenerator from "./ReportGenerator";

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const eng = await prisma.engagement.findFirst({
    where: { id },
    include: {
      client: { select: { companyName: true, contactName: true, email: true, ein: true } },
      legalEntity: { select: { name: true, entityType: true } },
      calculations: { orderBy: { runAt: "desc" }, take: 1 },
      reports: { orderBy: { createdAt: "desc" } },
      projects: {
        where: { qualified: true, fundedResearch: false },
        include: { employees: true, supplies: { where: { qualified: true } }, contractors: { where: { qualifiedFlag: true } } },
      },
    },
  });

  if (!eng) notFound();

  const calc = eng.calculations[0];

  return (
    <div className="max-w-5xl mx-auto">
      <EngagementNav id={id} />
      <div className="mb-6 flex items-center gap-3">
        <Link href={`/admin/engagements/${id}`} className="text-sm text-blue-600 hover:underline">Back to Engagement</Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-secondary">Report</span>
      </div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">{eng.client.companyName}</h1>
          <p className="text-secondary mt-1">Tax Year {eng.taxYear} -- Credit Study Report</p>
        </div>
        {!calc && (
          <div className="bg-surface border border-primary/20 rounded-lg px-4 py-2">
            <p className="text-primary text-sm font-medium">Run calculation before generating report</p>
          </div>
        )}
      </div>
      {calc && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Total QRE</p>
            <p className="text-2xl font-black text-blue-900 mt-1">${Number(calc.totalQre).toLocaleString()}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-xs text-green-600 font-semibold uppercase tracking-wide">Federal Credit</p>
            <p className="text-2xl font-black text-green-900 mt-1">${Number(calc.reducedCredit ?? calc.grossCredit ?? 0).toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide">SC Credit</p>
            <p className="text-2xl font-black text-purple-900 mt-1">${Number(calc.scAllowedCredit ?? 0).toLocaleString()}</p>
          </div>
          <div className="bg-surface border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-body-text font-semibold uppercase tracking-wide">Method</p>
            <p className="text-2xl font-black text-navy mt-1">{calc.method}</p>
          </div>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-bold text-navy mb-4">Generate New Report</h2>
          {calc ? (
            <ReportGenerator engagementId={id} calculationId={calc.id} clientName={eng.client.companyName} taxYear={eng.taxYear} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm mb-4">No calculation found. Run a calculation first.</p>
              <Link href={`/admin/engagements/${id}/calculate`} className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm">Run Calculation</Link>
            </div>
          )}
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-bold text-navy mb-4">Report History ({eng.reports.length})</h2>
          {eng.reports.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No reports generated yet.</p>
          ) : (
            <div className="space-y-3">
              {eng.reports.map(r => (
                <div key={r.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-navy text-sm">{r.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{r.reportType.replace(/_/g," ")} -- v{r.version}</p>
                      <p className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {r.publishedAt ? (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Published</span>
                      ) : (
                        <span className="text-xs bg-surface text-primary px-2 py-0.5 rounded-full font-medium">Draft</span>
                      )}
                      <Link href={`/admin/engagements/${id}/report/${r.id}`} className="text-xs text-blue-600 hover:underline mt-1 block">View Report</Link>
                    </div>
                  </div>
                  {r.notes && <p className="text-xs text-secondary mt-2">{r.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-bold text-navy mb-4">Qualified Business Components ({eng.projects.length})</h2>
        {eng.projects.length === 0 ? (
          <p className="text-gray-400 text-sm">No qualified components yet. Complete the business component analysis first.</p>
        ) : (
          <div className="space-y-3">
            {eng.projects.map(p => {
              const wageQre = p.employees.reduce((s,e) => s + Number(e.qreAmount ?? 0), 0);
              const supplyQre = p.supplies.reduce((s,i) => s + Number(i.amount ?? 0), 0);
              const contractorQre = p.contractors.reduce((s,c) => s + Number(c.qualifiedAmount ?? 0), 0);
              const total = wageQre + supplyQre + contractorQre;
              return (
                <div key={p.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-navy text-sm">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.businessComponent ?? "No type"}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-navy text-sm">${total.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">QRE</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
