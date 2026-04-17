type Calc = {
  totalQre: number | string;
  grossCredit: number | string | null;
  reducedCredit: number | string | null;
  scAllowedCredit: number | string | null;
  method: string;
} | null;

type Project = {
  id: string;
  name: string;
  businessComponent: string | null;
  qualified: boolean;
  permittedPurpose: boolean | null;
  technologicalInformation: boolean | null;
  processOfExperimentation: boolean | null;
  qualifiedResearch: boolean | null;
  employees: { qreAmount: number | string | null }[];
  supplies: { amount: number | string }[];
  contractors: { qualifiedAmount: number | string | null }[];
};

export default function PreliminaryContent({ clientName, taxYear, calc, projects }: {
  clientName: string;
  taxYear: number;
  calc: Calc;
  projects: Project[];
}) {
  const fmt = (n: number | string | null | undefined) => n ? "$" + Number(n).toLocaleString() : "$0";

  const federalCredit = Number(calc?.reducedCredit ?? calc?.grossCredit ?? 0);
  const scCredit = Number(calc?.scAllowedCredit ?? 0);
  const totalCredit = federalCredit + scCredit;
  const lowEstimate = Math.round(totalCredit * 0.85);
  const highEstimate = Math.round(totalCredit * 1.15);

  const qualifiedComponents = projects.filter(p => p.qualified);

  return (
    <>
      <section className="mb-10">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-8">
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-2">Preliminary Credit Estimate</p>
          <h2 className="text-3xl font-black mb-2">Your Estimated R&D Tax Credit</h2>
          <p className="text-blue-100 mb-8">Based on initial assessment of {clientName} qualifying activities for tax year {taxYear}.</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/15 rounded-xl p-5 text-center">
              <p className="text-blue-200 text-xs font-semibold uppercase tracking-wide mb-2">Conservative Estimate</p>
              <p className="text-4xl font-black">{fmt(lowEstimate)}</p>
            </div>
            <div className="bg-white rounded-xl p-5 text-center">
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-2">Expected Credit</p>
              <p className="text-4xl font-black text-blue-900">{fmt(totalCredit)}</p>
              <p className="text-blue-400 text-xs mt-1">Federal + SC Combined</p>
            </div>
            <div className="bg-white/15 rounded-xl p-5 text-center">
              <p className="text-blue-200 text-xs font-semibold uppercase tracking-wide mb-2">Optimistic Estimate</p>
              <p className="text-4xl font-black">{fmt(highEstimate)}</p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="border border-green-200 bg-green-50 rounded-xl p-5">
            <p className="text-xs text-green-600 font-bold uppercase tracking-wide mb-1">Federal Credit (IRC 41)</p>
            <p className="text-3xl font-black text-green-900">{fmt(federalCredit)}</p>
            <p className="text-xs text-green-600 mt-1">{calc?.method === "ASC" ? "Alternative Simplified Credit Method" : "Regular Credit Method"}</p>
          </div>
          <div className="border border-purple-200 bg-purple-50 rounded-xl p-5">
            <p className="text-xs text-purple-600 font-bold uppercase tracking-wide mb-1">SC State Credit (SC Code 12-6-3375)</p>
            <p className="text-3xl font-black text-purple-900">{fmt(scCredit)}</p>
            <p className="text-xs text-purple-600 mt-1">5% of qualified research expenses</p>
          </div>
        </div>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">Qualifying Activities Identified</h2>
        <p className="text-slate-600 text-sm mb-4">Based on our initial assessment, the following activities at {clientName} appear to qualify for the R&D tax credit under IRC Section 41. A complete credit study will document and substantiate each activity.</p>
        {qualifiedComponents.length > 0 ? (
          <div className="space-y-3 mb-6">
            {qualifiedComponents.map(p => {
              const total = p.employees.reduce((s,e)=>s+Number(e.qreAmount??0),0) +
                p.supplies.reduce((s,i)=>s+Number(i.amount),0) +
                p.contractors.reduce((s,c)=>s+Number(c.qualifiedAmount??0),0);
              const passCount = [p.permittedPurpose, p.technologicalInformation, p.processOfExperimentation, p.qualifiedResearch].filter(Boolean).length;
              return (
                <div key={p.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.businessComponent ?? "Business Component"} -- {passCount}/4 four-part test prongs satisfied</p>
                    </div>
                  </div>
                  {total > 0 && <p className="font-black text-blue-700">{fmt(total)}</p>}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-amber-700">No qualified business components have been identified yet. Complete the business component analysis to populate this section with the client&apos;s specific qualifying activities.</p>
          </div>
        )}
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">Next Steps</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border border-slate-200 rounded-xl p-5 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-700 font-black text-lg">1</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Sign Engagement Letter</h3>
            <p className="text-slate-500 text-xs">20% contingency fee -- paid only when your credit is recovered. No upfront cost.</p>
          </div>
          <div className="border border-slate-200 rounded-xl p-5 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-700 font-black text-lg">2</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Document Activities</h3>
            <p className="text-slate-500 text-xs">We collect payroll data, contractor agreements, and technical narratives through our secure portal.</p>
          </div>
          <div className="border border-slate-200 rounded-xl p-5 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-700 font-black text-lg">3</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">File and Collect</h3>
            <p className="text-slate-500 text-xs">Your CPA files Form 6765 with your return. You collect your credit within 60 days.</p>
          </div>
        </div>
      </section>
      <div className="bg-slate-800 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-black text-white mb-2">Ready to Claim Your Credit?</h3>
        <p className="text-slate-300 mb-6">Contact Alexander &amp; Blake to begin your full credit study. Most engagements are completed in 45-60 days.</p>
        <div className="inline-flex flex-col sm:flex-row gap-4 justify-center">
          <div className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl">alexanderblake.com/contact</div>
          <div className="bg-white/10 text-white font-semibold px-8 py-3 rounded-xl">South Carolina R&amp;D Tax Specialists</div>
        </div>
      </div>
      <div className="border-t border-slate-200 pt-6 mt-8">
        <p className="text-xs text-slate-400 leading-relaxed">This preliminary estimate is based on an initial assessment and is subject to change upon full documentation and analysis. Actual credits may be higher or lower depending on final qualified research expense calculations. This document does not constitute tax advice. Consult with your tax advisor regarding the application of these credits.</p>
      </div>
    </>
  );
}
