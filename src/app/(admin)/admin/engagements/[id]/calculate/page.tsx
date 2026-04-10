import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import EngagementNav from "../EngagementNav";
import RunButton from "./RunButton";

export default async function CalculatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const engagement = await prisma.engagement.findUnique({
    where: { id },
    include: {
      client: { select: { companyName: true } },
      ruleVersion: true,
      legalEntity: { select: { entityType: true } },
      projects: {
        include: {
          employees: { where: { excluded: false } },
          supplies: { where: { qualified: true } },
          contractors: true, // include all so we can detect funded-research flags
        },
      },
      calculations: { orderBy: { runAt: "desc" }, take: 5 },
    },
  });
  if (!engagement) notFound();

  // Read operatesInSC via raw query — bypasses Prisma client type until next full generate
  type ScFlagRow = { operatesInSC: boolean };
  const scFlagRows = engagement.legalEntityId
    ? await prisma.$queryRaw<ScFlagRow[]>`
        SELECT "operatesInSC" FROM "LegalEntity" WHERE id = ${engagement.legalEntityId}
      `
    : [];
  const operatesInSC = scFlagRows[0]?.operatesInSC === true;

  const priorYearQres = await prisma.priorYearQre.findMany({
    where: { engagementId: id },
    orderBy: { taxYear: "desc" },
  });

  const qualifiedProjects = engagement.projects.filter(p => p.qualified && !p.fundedResearch);
  const totalWageQre = qualifiedProjects.reduce((s, p) => s + p.employees.reduce((es, e) => es + Number(e.qreAmount ?? 0), 0), 0);
  const totalSupplyQre = qualifiedProjects.reduce((s, p) => s + p.supplies.reduce((ss, sup) => ss + Number(sup.amount), 0), 0);
  const totalContractorQre = qualifiedProjects.reduce((s, p) => s + p.contractors.reduce((cs, c) => cs + Number(c.qualifiedAmount ?? 0), 0), 0);
  const totalQre = totalWageQre + totalSupplyQre + totalContractorQre;

  const rates = engagement.ruleVersion?.creditRates as { scRate: number; ascRate: number; regularRate: number; ascFallbackRate: number } | null;
  const taxYearNum = engagement.taxYear;
  // Use the 3 specific prior years required by IRC §41(c)(5)
  const prior3 = [1, 2, 3].map((offset) => {
    const match = priorYearQres.find((q) => q.taxYear === taxYearNum - offset);
    return match ? Number(match.qreAmount) : 0;
  });
  const ascFallback = prior3.every((v) => v === 0);
  const avgPrior3 = prior3.reduce((s, v) => s + v, 0) / 3;
  const ascBase = avgPrior3 * 0.5;
  const ascIncremental = Math.max(0, totalQre - ascBase);
  const estimatedAsc = ascFallback
    ? totalQre * (rates?.ascFallbackRate ?? 0.06)
    : ascIncremental * (rates?.ascRate ?? 0.14);
  const estimatedSc = operatesInSC ? totalQre * (rates?.scRate ?? 0.05) : 0;

  return (
    <div className="max-w-6xl mx-auto">
      <EngagementNav id={id} />
      <div className="mb-6">
        <Link href={`/admin/engagements/${id}`} className="text-sm text-blue-600 hover:underline">Back to Engagement</Link>
      </div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Run Credit Calculation</h1>
          <p className="text-slate-500 text-sm mt-1">{engagement.client.companyName} - Tax Year {engagement.taxYear}</p>
        </div>
        <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
          {qualifiedProjects.length} qualified components
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Total QRE</div>
          <div className="text-3xl font-black text-slate-900">${totalQre.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-2">Wage: ${totalWageQre.toLocaleString()} - Supply: ${totalSupplyQre.toLocaleString()} - Contractor: ${totalContractorQre.toLocaleString()}</div>
        </div>
        <div className="bg-blue-600 border border-blue-600 rounded-xl p-5">
          <div className="text-xs text-blue-200 uppercase tracking-wide mb-1">Est. Federal Credit</div>
          <div className="text-3xl font-black text-white">${Math.round(estimatedAsc).toLocaleString()}</div>
          <div className="text-xs text-blue-200 mt-2">{priorYearQres.length < 3 ? "ASC Fallback (6%)" : "ASC Method (14%)"}</div>
        </div>
        <div className="bg-slate-900 border border-slate-900 rounded-xl p-5">
          <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Est. SC State Credit</div>
          <div className="text-3xl font-black text-white">
            {operatesInSC ? `$${Math.round(estimatedSc).toLocaleString()}` : "N/A"}
          </div>
          <div className="text-xs text-slate-400 mt-2">
            {operatesInSC ? "5% of SC QREs (§12-6-3375)" : "Not enabled — set SC operations on client page"}
          </div>
        </div>
      </div>

      {qualifiedProjects.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <p className="text-amber-800 font-semibold">No qualified business components found.</p>
          <p className="text-amber-700 text-sm mt-1">Go to Business Components and run the four-part test on your projects before calculating.</p>
          <Link href={`/admin/engagements/${id}/projects`} className="inline-block mt-3 bg-amber-600 text-white font-semibold px-4 py-2 rounded-lg text-sm">Go to Business Components</Link>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-bold text-slate-900 mb-4">QRE Breakdown</h2>
          <div className="space-y-3">
            {qualifiedProjects.map(p => {
              const wQre = p.employees.reduce((s, e) => s + Number(e.qreAmount ?? 0), 0);
              const sQre = p.supplies.reduce((s, sup) => s + Number(sup.amount), 0);
              const cQre = p.contractors.reduce((s, c) => s + Number(c.qualifiedAmount ?? 0), 0);
              const pTotal = wQre + sQre + cQre;
              return (
                <div key={p.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.businessComponent} - W:${wQre.toLocaleString()} S:${sQre.toLocaleString()} C:${cQre.toLocaleString()}</p>
                  </div>
                  <span className="font-bold text-slate-900 text-sm">${pTotal.toLocaleString()}</span>
                </div>
              );
            })}
            {qualifiedProjects.length === 0 && <p className="text-slate-400 text-sm">No qualified components</p>}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-bold text-slate-900 mb-4">Prior Year QREs (ASC Method)</h2>
          <div className="space-y-3 mb-4">
            {priorYearQres.map(q => (
              <div key={q.id} className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Tax Year {q.taxYear}</span>
                <span className="font-semibold text-slate-900 text-sm">${Number(q.qreAmount).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">3-Year Average</span>
              <span className="font-bold text-slate-900">${Math.round(avgPrior3).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-slate-600">ASC Base (50% of avg)</span>
              <span className="font-bold text-slate-900">${Math.round(ascBase).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-slate-600">Incremental QRE</span>
              <span className="font-bold text-blue-600">${Math.round(ascIncremental).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <RunButton
        engagementId={id}
        entityType={engagement.legalEntity?.entityType ?? "C-Corp"}
        initialOperatesInSC={operatesInSC}
        fundedResearchContractors={engagement.projects.flatMap(p =>
          p.contractors
            .filter(c => c.fundedResearchFlag && c.qualifiedFlag && !c.excludedReason)
            .map(c => ({ id: c.id, vendorName: c.vendorName, amount: Number(c.amount) }))
        )}
      />
    </div>
  );
}
