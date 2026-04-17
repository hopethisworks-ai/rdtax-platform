import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import PrintButton from "./PrintButton";
import PreliminaryContent from "./PreliminaryContent";

export default async function ReportViewPage({ params }: { params: Promise<{ id: string; reportId: string }> }) {
  const { id, reportId } = await params;
  const report = await prisma.report.findFirst({
    where: { id: reportId, engagementId: id },
    include: {
      engagement: {
        include: {
          client: true,
          legalEntity: true,
          calculations: { orderBy: { runAt: "desc" }, take: 1 },
          projects: {
            include: {
              employees: { where: { excluded: false } },
              supplies: true,
              contractors: true,
            },
            orderBy: { createdAt: "asc" },
          },
        },
      },
    },
  });
  if (!report) notFound();
  const eng = report.engagement;
  const priorYears = await prisma.priorYearQre.findMany({ where: { engagementId: id }, orderBy: { taxYear: "desc" } });
  const grossReceipts = await prisma.grossReceiptsHistory.findMany({ where: { engagementId: id }, orderBy: { taxYear: "desc" } }).catch(() => []);
  const client = eng.client;
  const calc = eng.calculations[0];
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const fmt = (n: number | string | null | undefined) => n ? "$" + Number(n).toLocaleString() : "$0";
  const pct = (n: number | string | null | undefined) => n ? (Number(n) * 100).toFixed(0) + "%" : "0%";

  // Serialize all Prisma Decimal fields to plain numbers for rendering
  const serializedCalc = calc ? {
    totalQre: Number(calc.totalQre),
    totalWageQre: Number(calc.totalWageQre),
    totalSupplyQre: Number(calc.totalSupplyQre),
    totalContractorQre: Number(calc.totalContractorQre),
    grossCredit: Number(calc.grossCredit),
    reducedCredit: Number(calc.reducedCredit),
    scAllowedCredit: Number(calc.scAllowedCredit),
    scGrossCredit: Number(calc.scGrossCredit),
    ascCredit: Number(calc.ascCredit),
    ascBase: Number(calc.ascBase),
    ascPrior3YearAvgQre: Number(calc.ascPrior3YearAvgQre),
    regularCredit: Number(calc.regularCredit),
    regularBase: Number(calc.regularBase),
    fixedBasePct: Number(calc.fixedBasePct),
    method: calc.method,
    c280cElectionMade: calc.c280cElectionMade,
    recommendedMethod: calc.recommendedMethod,
    methodRationale: calc.methodRationale,
  } : null;

  const serializedProjects = eng.projects.map(p => ({
    ...p,
    employees: p.employees.map(e => ({ ...e, compensation: Number(e.compensation), qreAmount: Number(e.qreAmount ?? 0), qualifiedActivityPct: Number(e.qualifiedActivityPct) })),
    supplies: p.supplies.map(s => ({ ...s, amount: Number(s.amount) })),
    contractors: p.contractors.map(c => ({ ...c, amount: Number(c.amount), qualifiedAmount: Number(c.qualifiedAmount ?? 0) })),
  }));

  const qualifiedProjects = serializedProjects.filter(p => p.qualified && !p.fundedResearch);
  const excludedProjects = serializedProjects.filter(p => !p.qualified || p.fundedResearch);
  const allEmployees = qualifiedProjects.flatMap(p => p.employees.map(e => ({ ...e, projectName: p.name })));
  const allSupplies = qualifiedProjects.flatMap(p => p.supplies.filter(s => s.qualified).map(s => ({ ...s, projectName: p.name })));
  const allContractors = qualifiedProjects.flatMap(p => p.contractors.filter(c => c.qualifiedFlag).map(c => ({ ...c, projectName: p.name })));

  const isPrelim = report.reportType === "PRELIMINARY_ESTIMATE";
  const federalCredit = Number(serializedCalc?.reducedCredit ?? serializedCalc?.grossCredit ?? 0);
  const scCredit = Number(serializedCalc?.scAllowedCredit ?? 0);
  const totalCredit = federalCredit + scCredit;

  if (isPrelim) return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-8 py-6">
        <div className="print:hidden mb-6 flex items-center justify-between">
          <Link href={"/admin/engagements/" + id + "/report"} className="text-sm text-blue-600 hover:underline">Back to Reports</Link>
          <PrintButton />
        </div>
        <PreliminaryContent clientName={client.companyName} taxYear={eng.taxYear} calc={serializedCalc} projects={serializedProjects} />
      </div>
    </div>
  );

  // For the full workpaper/final report, a locked calculation is required
  if (!serializedCalc) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-slate-500 text-lg">No calculation found for this report. Run a calculation first.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-8 py-6">
        <div className="print:hidden mb-6 flex items-center justify-between">
          <Link href={"/admin/engagements/" + id + "/report"} className="text-sm text-blue-600 hover:underline">Back to Reports</Link>
          <PrintButton />
        </div>

        {/* Cover Page */}
        <div className="border-b-4 border-blue-700 pb-10 mb-10">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">AB</span>
              </div>
              <div>
                <div className="font-black text-slate-900 text-lg">Alexander &amp; Blake</div>
                <div className="text-xs text-slate-500">South Carolina R&D Tax Credit Specialists</div>
              </div>
            </div>
            <div className="text-right text-xs text-slate-500">
              <p className="font-bold text-red-600">CONFIDENTIAL</p>
              <p>Prepared: {today}</p>
              <p>Report ID: {report.id.slice(-8).toUpperCase()}</p>
              {report.publishedAt && <p className="text-green-600 font-bold mt-1">PUBLISHED</p>}
            </div>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">{report.title}</h1>
          <p className="text-slate-500 text-lg mb-6">{report.reportType.replace(/_/g, " ")} -- Version {report.version}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-50 rounded-lg p-3"><p className="text-xs text-slate-500 uppercase tracking-wide">Taxpayer</p><p className="font-bold text-slate-900 text-sm">{client.companyName}</p></div>
            <div className="bg-slate-50 rounded-lg p-3"><p className="text-xs text-slate-500 uppercase tracking-wide">EIN</p><p className="font-bold text-slate-900 text-sm">{client.ein ?? "---"}</p></div>
            <div className="bg-slate-50 rounded-lg p-3"><p className="text-xs text-slate-500 uppercase tracking-wide">Tax Year</p><p className="font-bold text-slate-900 text-sm">{eng.taxYear}</p></div>
            <div className="bg-slate-50 rounded-lg p-3"><p className="text-xs text-slate-500 uppercase tracking-wide">Entity Type</p><p className="font-bold text-slate-900 text-sm">{eng.legalEntity?.entityType ?? "Corporation"}</p></div>
            <div className="bg-slate-50 rounded-lg p-3"><p className="text-xs text-slate-500 uppercase tracking-wide">Industry</p><p className="font-bold text-slate-900 text-sm">{client.industry ?? "Technology"}</p></div>
            <div className="bg-slate-50 rounded-lg p-3"><p className="text-xs text-slate-500 uppercase tracking-wide">State</p><p className="font-bold text-slate-900 text-sm">{client.state ?? "SC"}</p></div>
            <div className="bg-slate-50 rounded-lg p-3"><p className="text-xs text-slate-500 uppercase tracking-wide">Credit Method</p><p className="font-bold text-slate-900 text-sm">{serializedCalc?.method === "ASC" ? "Alt. Simplified" : "Regular"}</p></div>
            <div className="bg-slate-50 rounded-lg p-3"><p className="text-xs text-slate-500 uppercase tracking-wide">280C Election</p><p className="font-bold text-slate-900 text-sm">{serializedCalc?.c280cElectionMade ? "Yes" : "No"}</p></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-600 rounded-xl p-5 text-center">
              <p className="text-xs text-blue-200 font-bold uppercase tracking-wide mb-1">Total QRE</p>
              <p className="text-3xl font-black text-white">{fmt(serializedCalc?.totalQre)}</p>
            </div>
            <div className="bg-green-600 rounded-xl p-5 text-center">
              <p className="text-xs text-green-200 font-bold uppercase tracking-wide mb-1">Federal Credit</p>
              <p className="text-3xl font-black text-white">{fmt(federalCredit)}</p>
            </div>
            <div className="bg-purple-600 rounded-xl p-5 text-center">
              <p className="text-xs text-purple-200 font-bold uppercase tracking-wide mb-1">SC State Credit</p>
              <p className="text-3xl font-black text-white">{fmt(scCredit)}</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-5 text-center">
              <p className="text-xs text-slate-300 font-bold uppercase tracking-wide mb-1">Total Credits</p>
              <p className="text-3xl font-black text-white">{fmt(totalCredit)}</p>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <section className="mb-10 border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-black text-slate-900 mb-4">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-1 text-sm">
            {[
              "I. Executive Summary",
              "II. Taxpayer Background",
              "III. Credit Calculation",
              "IV. Method Comparison",
              "V. Qualified Business Components",
              "VI. Employee Wage QRE Schedule",
              "VII. Supply QRE Schedule",
              "VIII. Contractor QRE Schedule",
              "IX. Excluded Items",
              "X. Form 6765 Mapping",
              "XI. Legal Authority",
              "XII. Taxpayer Certification",
              "XIII. Preparer Certification",
            ].map((s, i) => (
              <div key={i} className="flex gap-3 py-1 border-b border-slate-50">
                <span className="text-slate-700">{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* I. Executive Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">I. Executive Summary</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            {client.companyName} qualifies for federal and South Carolina R&D tax credits under IRC Section 41 for tax year {eng.taxYear}. This credit study was prepared in accordance with the IRS Audit Technique Guide for the Research Tax Credit (ATG) and applicable Treasury Regulations under Treas. Reg. Sec. 1.41-4.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Alexander & Blake conducted interviews with key technical personnel, reviewed payroll records, contractor agreements, and project documentation. All {qualifiedProjects.length} qualified business components were evaluated under the four-part test as required by IRC Section 41(d). Employee time allocations were documented using contemporaneous records or reconstructed records consistent with Cohan v. Commissioner, 39 F.2d 540 (2d Cir. 1930) and Suder v. Commissioner, T.C. Memo 2014-201.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            Qualified research expenses of {fmt(serializedCalc?.totalQre)} were identified, consisting of {fmt(serializedCalc?.totalWageQre)} in wage expenses, {fmt(serializedCalc?.totalSupplyQre)} in supply expenses, and {fmt(serializedCalc?.totalContractorQre)} in contractor expenses. Using the {serializedCalc?.method === "ASC" ? "Alternative Simplified Credit method under IRC Section 41(c)(5)" : "Regular Credit method under IRC Section 41(c)(1)"}, the federal credit is {fmt(federalCredit)}. Stacked with the South Carolina research credit under SC Code Section 12-6-3375, the total combined credit available to {client.companyName} is {fmt(totalCredit)}.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <p className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-3">Credit Summary</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div><p className="text-xs text-blue-600">Wage QRE</p><p className="font-black text-blue-900">{fmt(serializedCalc?.totalWageQre)}</p></div>
              <div><p className="text-xs text-blue-600">Supply QRE</p><p className="font-black text-blue-900">{fmt(serializedCalc?.totalSupplyQre)}</p></div>
              <div><p className="text-xs text-blue-600">Contractor QRE</p><p className="font-black text-blue-900">{fmt(serializedCalc?.totalContractorQre)}</p></div>
              <div><p className="text-xs text-blue-600">Total QRE</p><p className="font-black text-blue-900">{fmt(serializedCalc?.totalQre)}</p></div>
            </div>
          </div>
        </section>

        {/* II. Taxpayer Background */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">II. Taxpayer Background</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Company Information</h3>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="py-2 text-slate-500 w-40">Legal Name</td><td className="py-2 font-medium text-slate-900">{client.companyName}</td></tr>
                  <tr><td className="py-2 text-slate-500">EIN</td><td className="py-2 font-medium text-slate-900">{client.ein ?? "---"}</td></tr>
                  <tr><td className="py-2 text-slate-500">Entity Type</td><td className="py-2 font-medium text-slate-900">{eng.legalEntity?.entityType ?? "C Corporation"}</td></tr>
                  <tr><td className="py-2 text-slate-500">Industry</td><td className="py-2 font-medium text-slate-900">{client.industry ?? "Technology / Software"}</td></tr>
                  <tr><td className="py-2 text-slate-500">State</td><td className="py-2 font-medium text-slate-900">{client.state ?? "South Carolina"}</td></tr>
                  <tr><td className="py-2 text-slate-500">Contact</td><td className="py-2 font-medium text-slate-900">{client.contactName}</td></tr>
                  <tr><td className="py-2 text-slate-500">Email</td><td className="py-2 font-medium text-slate-900">{client.email}</td></tr>
                  <tr><td className="py-2 text-slate-500">Tax Year</td><td className="py-2 font-medium text-slate-900">{eng.taxYear}</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Research Activities Overview</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                {client.companyName} is engaged in the development of innovative software and technology solutions. The company employs technical personnel including software engineers, research engineers, and quality assurance professionals who devote a significant portion of their time to qualified research activities.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                During tax year {eng.taxYear}, the company conducted {qualifiedProjects.length} qualified business component{qualifiedProjects.length !== 1 ? "s" : ""} involving the development of new or improved software, algorithms, and processes. These activities satisfy all four prongs of the IRC Section 41(d) four-part test.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Qualified Personnel</p>
                <p className="text-sm text-slate-600">{allEmployees.length} employees with qualified research activities totaling {fmt(serializedCalc?.totalWageQre)} in wage QREs.</p>
              </div>
            </div>
          </div>
          {priorYears.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Prior Year QRE History</h3>
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase">Tax Year</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-slate-500 uppercase">QRE Amount</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-slate-500 uppercase">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {priorYears.map(py => (
                    <tr key={py.id}>
                      <td className="px-4 py-2 text-slate-700">{py.taxYear}</td>
                      <td className="px-4 py-2 text-right font-semibold">{fmt(Number(py.qreAmount))}</td>
                      <td className="px-4 py-2 text-right text-slate-400 text-xs">Historical QRE</td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 font-bold">
                    <td className="px-4 py-2 text-slate-900">3-Year Average</td>
                    <td className="px-4 py-2 text-right text-blue-700">{fmt(serializedCalc?.ascPrior3YearAvgQre)}</td>
                    <td className="px-4 py-2 text-right text-slate-400 text-xs">ASC Base Input</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold">
                    <td className="px-4 py-2 text-slate-900">{eng.taxYear} (Current)</td>
                    <td className="px-4 py-2 text-right text-slate-900">{fmt(serializedCalc?.totalQre)}</td>
                    <td className="px-4 py-2 text-right text-slate-400 text-xs">Current Year QRE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* III. Credit Calculation */}
        {calc && (
          <section className="mb-10">
            <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">III. Credit Calculation</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Step 1: Qualified Research Expenses</h3>
                <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-50"><tr><th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">Category</th><th className="px-4 py-2 text-right text-xs font-semibold text-slate-500">Amount</th><th className="px-4 py-2 text-right text-xs font-semibold text-slate-500">IRC Ref</th></tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr><td className="px-4 py-2 text-slate-600">Wages and Salaries</td><td className="px-4 py-2 text-right font-semibold">{fmt(serializedCalc.totalWageQre)}</td><td className="px-4 py-2 text-right text-slate-400 text-xs">41(b)(2)(A)</td></tr>
                    <tr><td className="px-4 py-2 text-slate-600">Supplies</td><td className="px-4 py-2 text-right font-semibold">{fmt(serializedCalc.totalSupplyQre)}</td><td className="px-4 py-2 text-right text-slate-400 text-xs">41(b)(2)(C)</td></tr>
                    <tr><td className="px-4 py-2 text-slate-600">Contract Research (65%)</td><td className="px-4 py-2 text-right font-semibold">{fmt(serializedCalc.totalContractorQre)}</td><td className="px-4 py-2 text-right text-slate-400 text-xs">41(b)(3)</td></tr>
                    <tr className="bg-blue-50 font-bold"><td className="px-4 py-2 text-slate-900">Total QRE</td><td className="px-4 py-2 text-right text-blue-700">{fmt(serializedCalc.totalQre)}</td><td className="px-4 py-2"></td></tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Step 2: {serializedCalc.method === "ASC" ? "ASC Credit Computation" : "Regular Credit Computation"}</h3>
                <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-50"><tr><th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">Item</th><th className="px-4 py-2 text-right text-xs font-semibold text-slate-500">Amount</th></tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {serializedCalc.method === "ASC" ? (<>
                      <tr><td className="px-4 py-2 text-slate-600">Current Year QRE</td><td className="px-4 py-2 text-right font-semibold">{fmt(serializedCalc.totalQre)}</td></tr>
                      <tr><td className="px-4 py-2 text-slate-600">3-Year Average QRE</td><td className="px-4 py-2 text-right font-semibold">{fmt(serializedCalc.ascPrior3YearAvgQre)}</td></tr>
                      <tr><td className="px-4 py-2 text-slate-600">ASC Base (50% x avg)</td><td className="px-4 py-2 text-right font-semibold">{fmt(serializedCalc.ascBase)}</td></tr>
                      <tr><td className="px-4 py-2 text-slate-600">Incremental QRE</td><td className="px-4 py-2 text-right font-semibold">{fmt(Number(serializedCalc.totalQre) - Number(serializedCalc.ascBase ?? 0))}</td></tr>
                      <tr><td className="px-4 py-2 text-slate-600">ASC Rate</td><td className="px-4 py-2 text-right font-semibold">14%</td></tr>
                    </>) : (<>
                      <tr><td className="px-4 py-2 text-slate-600">Fixed Base %</td><td className="px-4 py-2 text-right font-semibold">{serializedCalc.fixedBasePct ? (Number(serializedCalc.fixedBasePct)*100).toFixed(2)+"%" : "N/A"}</td></tr>
                      <tr><td className="px-4 py-2 text-slate-600">Regular Credit Rate</td><td className="px-4 py-2 text-right font-semibold">20%</td></tr>
                    </>)}
                    <tr><td className="px-4 py-2 text-slate-600">Federal Gross Credit</td><td className="px-4 py-2 text-right font-semibold">{fmt(serializedCalc.grossCredit)}</td></tr>
                    {serializedCalc.c280cElectionMade && <tr><td className="px-4 py-2 text-slate-600">IRC 280C Reduction (21%)</td><td className="px-4 py-2 text-right font-semibold text-red-600">({fmt(Number(serializedCalc.grossCredit) - Number(serializedCalc.reducedCredit))})</td></tr>}
                    <tr className="bg-green-50 font-bold"><td className="px-4 py-2 text-slate-900">Net Federal Credit</td><td className="px-4 py-2 text-right text-green-700">{fmt(serializedCalc.reducedCredit ?? serializedCalc.grossCredit)}</td></tr>
                    <tr><td className="px-4 py-2 text-slate-600">SC Credit (5% x QRE)</td><td className="px-4 py-2 text-right font-semibold">{fmt(serializedCalc.scAllowedCredit)}</td></tr>
                    <tr className="bg-slate-800 font-bold"><td className="px-4 py-2 text-white">Total Combined Credit</td><td className="px-4 py-2 text-right text-white">{fmt(totalCredit)}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* IV. Method Comparison */}
        {calc && (
          <section className="mb-10">
            <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">IV. Credit Method Comparison</h2>
            <p className="text-slate-600 text-sm mb-4">Both the Alternative Simplified Credit (ASC) method and the Regular Credit method were evaluated. The {serializedCalc.recommendedMethod === "ASC" ? "ASC" : "Regular"} method was selected as it yields the higher credit for {client.companyName}.</p>
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Item</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-blue-600 uppercase">ASC Method</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Regular Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-3 text-slate-600">Total QRE</td>
                  <td className="px-4 py-3 text-center font-semibold">{fmt(serializedCalc.totalQre)}</td>
                  <td className="px-4 py-3 text-center font-semibold">{fmt(serializedCalc.totalQre)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-600">Base Amount</td>
                  <td className="px-4 py-3 text-center font-semibold">{fmt(serializedCalc.ascBase)} (50% of 3yr avg)</td>
                  <td className="px-4 py-3 text-center font-semibold">{fmt(serializedCalc.regularBase)} (fixed base %)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-600">Credit Rate</td>
                  <td className="px-4 py-3 text-center font-semibold">14%</td>
                  <td className="px-4 py-3 text-center font-semibold">20%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-600">Gross Federal Credit</td>
                  <td className="px-4 py-3 text-center font-semibold">{fmt(serializedCalc.ascCredit)}</td>
                  <td className="px-4 py-3 text-center font-semibold">{fmt(serializedCalc.regularCredit)}</td>
                </tr>
                <tr className={"font-bold " + (serializedCalc.recommendedMethod === "ASC" ? "bg-blue-50" : "bg-slate-50")}>
                  <td className="px-4 py-3 text-slate-900">Recommended</td>
                  <td className="px-4 py-3 text-center text-blue-700">{serializedCalc.recommendedMethod === "ASC" ? "SELECTED" : "---"}</td>
                  <td className="px-4 py-3 text-center text-slate-500">{serializedCalc.recommendedMethod !== "ASC" ? "SELECTED" : "---"}</td>
                </tr>
              </tbody>
            </table>
            {serializedCalc.methodRationale && <p className="text-xs text-slate-500 mt-3 italic">{serializedCalc.methodRationale}</p>}
          </section>
        )}

        {/* V. Qualified Business Components */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">V. Qualified Business Components</h2>
          <p className="text-slate-600 text-sm mb-6">Each business component listed below was evaluated under the four-part test of IRC Section 41(d). To qualify, a business component must satisfy all four prongs: permitted purpose, technological in nature, process of experimentation, and elimination of uncertainty. Components failing any prong are excluded from the QRE base (see Section IX).</p>
          {qualifiedProjects.map((p, idx) => {
            const wageQre = p.employees.reduce((s,e) => s + Number(e.qreAmount ?? 0), 0);
            const supplyQre = p.supplies.filter(s=>s.qualified).reduce((s,i) => s + Number(i.amount ?? 0), 0);
            const contractorQre = p.contractors.filter(c=>c.qualifiedFlag).reduce((s,c) => s + Number(c.qualifiedAmount ?? 0), 0);
            const total = wageQre + supplyQre + contractorQre;
            return (
              <div key={p.id} className="mb-8 border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-blue-700 px-6 py-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-black text-white text-lg">{idx+1}. {p.name}</h3>
                    <p className="text-blue-200 text-xs">{p.businessComponent ?? "Business Component"} -- IRC 41(d)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-white text-2xl">{fmt(total)}</p>
                    <p className="text-blue-200 text-xs">Total QRE</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">Four-Part Test Results</h4>
                      {[
                        { label: "1. Permitted Purpose", val: p.permittedPurpose, desc: "IRC 41(d)(1)(A)" },
                        { label: "2. Technological in Nature", val: p.technologicalInformation, desc: "IRC 41(d)(1)(B)" },
                        { label: "3. Process of Experimentation", val: p.processOfExperimentation, desc: "IRC 41(d)(1)(C)" },
                        { label: "4. Elimination of Uncertainty", val: p.qualifiedResearch, desc: "IRC 41(d)(1)(D)" },
                      ].map(item => (
                        <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-100">
                          <div>
                            <span className="text-xs font-semibold text-slate-700">{item.label}</span>
                            <span className="text-xs text-slate-400 ml-2">{item.desc}</span>
                          </div>
                          <span className={"text-xs font-black px-3 py-1 rounded-full " + (item.val ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600")}>{item.val ? "PASS" : "FAIL"}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">QRE Breakdown</h4>
                      <table className="w-full text-sm">
                        <tbody className="divide-y divide-slate-100">
                          <tr><td className="py-2 text-slate-600">Wage QRE ({p.employees.length} emp)</td><td className="py-2 text-right font-semibold">{fmt(wageQre)}</td></tr>
                          <tr><td className="py-2 text-slate-600">Supply QRE</td><td className="py-2 text-right font-semibold">{fmt(supplyQre)}</td></tr>
                          <tr><td className="py-2 text-slate-600">Contractor QRE</td><td className="py-2 text-right font-semibold">{fmt(contractorQre)}</td></tr>
                          <tr className="border-t-2 border-slate-300 font-bold"><td className="py-2 text-slate-900">Total</td><td className="py-2 text-right text-blue-700">{fmt(total)}</td></tr>
                        </tbody>
                      </table>
                      <div className="mt-3 text-right text-xs text-slate-400">
                        {((total / Number(serializedCalc?.totalQre ?? 1)) * 100).toFixed(1)}% of total QRE
                      </div>
                    </div>
                  </div>
                  {p.uncertaintyNarrative && (
                    <div className="mb-4 bg-slate-50 rounded-lg p-4">
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Technical Uncertainty Narrative (IRC 41(d)(1)(D))</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{p.uncertaintyNarrative}</p>
                    </div>
                  )}
                  {p.experimentationNarrative && (
                    <div className="mb-4 bg-slate-50 rounded-lg p-4">
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Process of Experimentation Narrative (IRC 41(d)(1)(C))</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{p.experimentationNarrative}</p>
                    </div>
                  )}
                  {p.alternativesConsidered && (
                    <div className="mb-4 bg-slate-50 rounded-lg p-4">
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Alternatives Considered</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{p.alternativesConsidered}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        {/* VI. Employee Wage Schedule */}
        {allEmployees.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">VI. Employee Wage QRE Schedule</h2>
            <p className="text-slate-600 text-sm mb-4">
              Wages paid to employees for qualified services constitute qualified research expenses under IRC Section 41(b)(2)(A). Employee time allocations were determined using the methodology documented below, consistent with Cohan v. Commissioner, 39 F.2d 540 (2d Cir. 1930), Ekman v. Commissioner, T.C. Memo 1999-374, and Suder v. Commissioner, T.C. Memo 2014-201. All estimates are supported by a credible basis.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-800">
                  <tr>
                    {["Employee Name","Title","Business Component","Total Comp.","Qualified %","Wage QRE","Methodology","IRC Ref"].map(h => (
                      <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allEmployees.map(e => (
                    <tr key={e.id} className="hover:bg-slate-50">
                      <td className="px-3 py-3 font-semibold text-slate-900">{e.name}</td>
                      <td className="px-3 py-3 text-slate-600 text-xs">{e.title ?? "---"}</td>
                      <td className="px-3 py-3 text-slate-600 text-xs">{e.projectName}</td>
                      <td className="px-3 py-3 text-slate-700">{fmt(e.compensation)}</td>
                      <td className="px-3 py-3 font-semibold text-blue-700">{pct(e.qualifiedActivityPct)}</td>
                      <td className="px-3 py-3 font-black text-slate-900">{fmt(e.qreAmount)}</td>
                      <td className="px-3 py-3 text-slate-500 text-xs">{e.methodologyBasis ? e.methodologyBasis.replace(/-/g," ") : "---"}</td>
                      <td className="px-3 py-3 text-slate-400 text-xs">41(b)(2)(A)</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-800 font-bold">
                    <td colSpan={5} className="px-3 py-3 text-white">Total Wage QRE ({allEmployees.length} Employees)</td>
                    <td className="px-3 py-3 text-white font-black">{fmt(allEmployees.reduce((s,e)=>s+Number(e.qreAmount??0),0))}</td>
                    <td colSpan={2}></td>
                  </tr>
                </tbody>
              </table>
            </div>
            {allEmployees.filter(e => e.supportSource).length > 0 && (
              <div className="mt-6">
                <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Cohan Methodology Documentation</h3>
                <div className="space-y-3">
                  {allEmployees.filter(e => e.supportSource).map(e => (
                    <div key={e.id} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-xs font-bold text-amber-900">{e.name} -- {e.methodologyBasis?.replace(/-/g," ") ?? "Methodology"}</p>
                        <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded font-medium">{pct(e.qualifiedActivityPct)} Qualified</span>
                      </div>
                      <p className="text-xs text-amber-800 leading-relaxed">{e.supportSource}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* VII. Supply Schedule */}
        {allSupplies.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">VII. Supply QRE Schedule</h2>
            <p className="text-slate-600 text-sm mb-4">
              Supplies used in the conduct of qualified research constitute qualified research expenses under IRC Section 41(b)(2)(C). Supplies include any tangible property other than land, improvements to land, or property subject to depreciation. All supply items listed below were used directly in the conduct of qualified research activities.
            </p>
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-800">
                <tr>
                  {["Description","Business Component","Amount","Qualification Basis","IRC Ref"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allSupplies.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-900">{s.description}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{s.projectName}</td>
                    <td className="px-4 py-3 font-black text-slate-900">{fmt(s.amount)}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">Used directly in qualified research -- not depreciable property</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">41(b)(2)(C)</td>
                  </tr>
                ))}
                <tr className="bg-slate-800 font-bold">
                  <td colSpan={2} className="px-4 py-3 text-white">Total Supply QRE</td>
                  <td className="px-4 py-3 text-white font-black">{fmt(allSupplies.reduce((s,i)=>s+Number(i.amount??0),0))}</td>
                  <td colSpan={2}></td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {/* VIII. Contractor Schedule */}
        {allContractors.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">VIII. Contractor QRE Schedule</h2>
            <p className="text-slate-600 text-sm mb-4">
              Contract research expenses constitute qualified research expenses under IRC Section 41(b)(3), subject to a 65% inclusion rate. Contract research is included only where the research is performed on behalf of the taxpayer and the taxpayer retains substantial rights to the research results (Fairchild Industries v. US, 71 F.3d 868 (Fed. Cir. 1996)). Each contractor was evaluated under the five-factor Fairchild analysis.
            </p>
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-800">
                <tr>
                  {["Vendor","Component","Contract Amount","65% QRE","Rights Retained","Econ. Risk","Payment Type","IRC Ref"].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allContractors.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-semibold text-slate-900">{c.vendorName}</td>
                    <td className="px-3 py-3 text-slate-600 text-xs">{c.projectName}</td>
                    <td className="px-3 py-3 text-slate-700">{fmt(c.amount)}</td>
                    <td className="px-3 py-3 font-black text-slate-900">{fmt(c.qualifiedAmount)}</td>
                    <td className="px-3 py-3 text-xs"><span className={"px-2 py-0.5 rounded font-bold " + (c.substantialRightsRetained ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600")}>{c.substantialRightsRetained ? "YES" : "NO"}</span></td>
                    <td className="px-3 py-3 text-xs"><span className={"px-2 py-0.5 rounded font-bold " + (c.economicRiskBorne ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600")}>{c.economicRiskBorne ? "YES" : "NO"}</span></td>
                    <td className="px-3 py-3 text-slate-500 text-xs">{c.successContingentPayment ? "Contingent" : "Fixed Fee"}</td>
                    <td className="px-3 py-3 text-slate-400 text-xs">41(b)(3)</td>
                  </tr>
                ))}
                <tr className="bg-slate-800 font-bold">
                  <td colSpan={3} className="px-3 py-3 text-white">Total Contractor QRE</td>
                  <td className="px-3 py-3 text-white font-black">{fmt(allContractors.reduce((s,c)=>s+Number(c.qualifiedAmount??0),0))}</td>
                  <td colSpan={4}></td>
                </tr>
              </tbody>
            </table>
            {allContractors.filter(c => c.contractReviewNotes).map(c => (
              <div key={c.id} className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-xs font-bold text-slate-700 mb-1">{c.vendorName} -- Fairchild Analysis Notes</p>
                <p className="text-xs text-slate-600">{c.contractReviewNotes}</p>
              </div>
            ))}
          </section>
        )}

        {/* IX. Excluded Items */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">IX. Excluded Items and Activities</h2>
          <p className="text-slate-600 text-sm mb-4">
            The following activities were reviewed but excluded from the QRE base. Documentation of excluded items demonstrates that Alexander & Blake applied a rigorous qualification standard and did not include activities that fail to meet the requirements of IRC Section 41(d).
          </p>
          {excludedProjects.length > 0 ? (
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50">
                <tr>
                  {["Business Component","Type","Reason for Exclusion","IRC Authority"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {excludedProjects.map(p => (
                  <tr key={p.id}>
                    <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{p.businessComponent ?? "---"}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{p.fundedResearch ? "Funded research exclusion" : p.excludedReason ?? "Failed four-part test"}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{p.fundedResearch ? "IRC 41(d)(4)(H)" : "IRC 41(d)"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700">All business components identified during this engagement satisfied the four-part test and are included in the QRE base. No activities were excluded.</p>
            </div>
          )}
        </section>

        {/* X. Form 6765 Mapping */}
        {calc && (
          <section className="mb-10">
            <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">X. Form 6765 Filing Reference</h2>
            <p className="text-slate-600 text-sm mb-4">The following table maps the credit study results to the corresponding lines on IRS Form 6765 (Credit for Increasing Research Activities). Your CPA should use these figures when completing Form 6765 for tax year {eng.taxYear}.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">{serializedCalc.method === "ASC" ? "Section C -- Alternative Simplified Credit" : "Section A -- Regular Credit"}</h3>
                <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-50"><tr><th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">Line</th><th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">Description</th><th className="px-4 py-2 text-right text-xs font-semibold text-slate-500">Amount</th></tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {serializedCalc.method === "ASC" ? (<>
                      <tr><td className="px-4 py-2 text-slate-500 text-xs">Line 28</td><td className="px-4 py-2 text-slate-600 text-xs">Qualified wages</td><td className="px-4 py-2 text-right font-semibold text-xs">{fmt(serializedCalc.totalWageQre)}</td></tr>
                      <tr><td className="px-4 py-2 text-slate-500 text-xs">Line 29</td><td className="px-4 py-2 text-slate-600 text-xs">Qualified supplies</td><td className="px-4 py-2 text-right font-semibold text-xs">{fmt(serializedCalc.totalSupplyQre)}</td></tr>
                      <tr><td className="px-4 py-2 text-slate-500 text-xs">Line 30</td><td className="px-4 py-2 text-slate-600 text-xs">Qualified contract research (65%)</td><td className="px-4 py-2 text-right font-semibold text-xs">{fmt(serializedCalc.totalContractorQre)}</td></tr>
                      <tr><td className="px-4 py-2 text-slate-500 text-xs">Line 31</td><td className="px-4 py-2 text-slate-600 text-xs">Total current year QREs</td><td className="px-4 py-2 text-right font-semibold text-xs">{fmt(serializedCalc.totalQre)}</td></tr>
                      <tr><td className="px-4 py-2 text-slate-500 text-xs">Line 32</td><td className="px-4 py-2 text-slate-600 text-xs">50% of 3-year average QREs</td><td className="px-4 py-2 text-right font-semibold text-xs">{fmt(serializedCalc.ascBase)}</td></tr>
                      <tr><td className="px-4 py-2 text-slate-500 text-xs">Line 33</td><td className="px-4 py-2 text-slate-600 text-xs">Subtract line 32 from line 31</td><td className="px-4 py-2 text-right font-semibold text-xs">{fmt(Number(serializedCalc.totalQre) - Number(serializedCalc.ascBase ?? 0))}</td></tr>
                      <tr className="bg-green-50 font-bold"><td className="px-4 py-2 text-slate-500 text-xs">Line 34</td><td className="px-4 py-2 text-slate-600 text-xs">ASC (14% x line 33)</td><td className="px-4 py-2 text-right text-green-700 text-xs">{fmt(serializedCalc.ascCredit)}</td></tr>
                    </>) : (<>
                      <tr><td className="px-4 py-2 text-slate-500 text-xs">Line 1</td><td className="px-4 py-2 text-slate-600 text-xs">Qualified wages</td><td className="px-4 py-2 text-right font-semibold text-xs">{fmt(serializedCalc.totalWageQre)}</td></tr>
                      <tr><td className="px-4 py-2 text-slate-500 text-xs">Line 2</td><td className="px-4 py-2 text-slate-600 text-xs">Qualified supplies</td><td className="px-4 py-2 text-right font-semibold text-xs">{fmt(serializedCalc.totalSupplyQre)}</td></tr>
                      <tr><td className="px-4 py-2 text-slate-500 text-xs">Line 3</td><td className="px-4 py-2 text-slate-600 text-xs">Contract research (65%)</td><td className="px-4 py-2 text-right font-semibold text-xs">{fmt(serializedCalc.totalContractorQre)}</td></tr>
                      <tr className="bg-green-50 font-bold"><td className="px-4 py-2 text-slate-500 text-xs">Line 17</td><td className="px-4 py-2 text-slate-600 text-xs">Regular credit</td><td className="px-4 py-2 text-right text-green-700 text-xs">{fmt(serializedCalc.regularCredit)}</td></tr>
                    </>)}
                    {serializedCalc.c280cElectionMade && <tr className="bg-amber-50"><td className="px-4 py-2 text-slate-500 text-xs">280C</td><td className="px-4 py-2 text-slate-600 text-xs">Reduced credit elected (21% reduction)</td><td className="px-4 py-2 text-right font-semibold text-xs">{fmt(serializedCalc.reducedCredit)}</td></tr>}
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Section D -- Summary</h3>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between"><span className="text-sm text-slate-600">Federal Credit (Form 6765)</span><span className="font-black text-slate-900">{fmt(serializedCalc.reducedCredit ?? serializedCalc.grossCredit)}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-slate-600">SC Credit (SC I-319)</span><span className="font-black text-slate-900">{fmt(serializedCalc.scAllowedCredit)}</span></div>
                  <div className="flex justify-between border-t border-slate-200 pt-3"><span className="font-bold text-slate-900">Total Credits</span><span className="font-black text-blue-700 text-lg">{fmt(totalCredit)}</span></div>
                </div>
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-blue-800 mb-2">Filing Instructions</p>
                  <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                    <li>Attach Form 6765 to federal return</li>
                    <li>Report federal credit on Form 3800</li>
                    <li>File SC I-319 with state return</li>
                    <li>Retain all documentation for 7 years</li>
                    <li>Credit carries forward 20 years (federal)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

{/* IX-A. Interview Documentation */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">IX-A. Interview Documentation Summary</h2>
          <p className="text-slate-600 text-sm mb-4">Alexander & Blake conducted interviews and reviewed documentation with the following qualified research personnel. All interviews were conducted in accordance with IRS Audit Technique Guide standards. Interview notes are retained in the Alexander & Blake engagement file.</p>
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden mb-4">
            <thead className="bg-slate-800">
              <tr>{["Employee","Title","Business Component","Documentation Method","Qualified %","Documentation Source"].map(h=><th key={h} className="px-3 py-3 text-left text-xs font-semibold text-white uppercase tracking-wide">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allEmployees.map(e=>(
                <tr key={e.id} className="hover:bg-slate-50">
                  <td className="px-3 py-3 font-semibold text-slate-900">{e.name}</td>
                  <td className="px-3 py-3 text-slate-600 text-xs">{e.title ?? "---"}</td>
                  <td className="px-3 py-3 text-slate-600 text-xs">{e.projectName}</td>
                  <td className="px-3 py-3 text-xs"><span className="px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-700 capitalize">{e.methodologyBasis ? e.methodologyBasis.replace(/-/g," ") : "Interview"}</span></td>
                  <td className="px-3 py-3 font-semibold text-blue-700">{pct(e.qualifiedActivityPct)}</td>
                  <td className="px-3 py-3 text-slate-500 text-xs">{e.supportSource ? e.supportSource.slice(0,80)+(e.supportSource.length>80?"...":"") : "Employee interview and attestation"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-xs font-bold text-amber-800 mb-2">Interview Methodology Note</p>
            <p className="text-xs text-amber-700 leading-relaxed">Time allocation estimates were obtained through contemporaneous time tracking records, project-based estimates, and employee surveys. All methodologies are consistent with the credible basis standard in Cohan v. Commissioner and Suder v. Commissioner.</p>
          </div>
        </section>
        {/* IX-B. Documentation Checklist */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">IX-B. Contemporaneous Documentation Checklist</h2>
          <p className="text-slate-600 text-sm mb-4">The following documentation was reviewed and retained in connection with this credit study. All records are available for production in the event of an IRS examination and retained for a minimum of seven years from the date of filing.</p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              {category:"Payroll and Compensation",items:["Federal payroll records (Form W-2, 941)","Employee compensation schedules","Bonus and incentive compensation records","HR employment records confirming titles and dates"]},
              {category:"Time and Activity Records",items:["Time tracking system exports (Jira, Linear, or equivalent)","Project management sprint records","Employee time allocation surveys","Manager attestations for project estimates"]},
              {category:"Technical Documentation",items:["Engineering design documents and specifications","Code repository commit history (GitHub/GitLab)","Test plans, test results, and QA records","Prototype and iteration documentation"]},
              {category:"Financial Records",items:["General ledger entries for R&D expenses","Contractor invoices and payment records","Supply purchase orders and receipts","Project cost center allocations"]},
              {category:"Contractor Documentation",items:["Signed contractor agreements","Statements of work and project scopes","IP ownership and rights assignments","Fairchild analysis worksheets"]},
              {category:"Alexander & Blake Engagement File",items:["Signed engagement letter","Employee interview notes and attestations","Business component qualification worksheets","Four-part test analysis for each component"]},
            ].map(group=>(
              <div key={group.category} className="border border-slate-200 rounded-xl p-4">
                <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wide mb-3 pb-2 border-b border-slate-100">{group.category}</h3>
                <div className="space-y-2">
                  {group.items.map(item=>(
                    <div key={item} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded border-2 border-green-500 bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-2.5 h-2.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-xs text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs font-bold text-blue-800 mb-2">Document Retention Notice</p>
            <p className="text-xs text-blue-700 leading-relaxed">Pursuant to IRC Section 6001 and Treasury Regulation 1.6001-1, taxpayers must maintain records sufficient to establish the right to claim any credit. Alexander & Blake recommends retaining all documentation for a minimum of seven (7) years from the date the return is filed, or three (3) years after any amended return, whichever is later.</p>
          </div>
        </section>

        {/* XI. Legal Authority */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">XI. Legal Authority and Standards</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { category: "Statutory Authority", items: [
                ["IRC Section 41","Research and experimental tax credit -- primary authority"],
                ["IRC Section 41(b)","Qualified research expenses -- wages, supplies, contractors"],
                ["IRC Section 41(c)(5)","Alternative Simplified Credit method (14%)"],
                ["IRC Section 41(d)","Definition of qualified research -- four-part test"],
                ["IRC Section 41(d)(4)(H)","Funded research exclusion"],
                ["IRC Section 280C(c)","Election to claim reduced credit"],
                ["SC Code 12-6-3375","South Carolina research activities credit (5%)"],
              ]},
              { category: "Regulatory Authority", items: [
                ["Treas. Reg. 1.41-4","Qualified research requirements and definitions"],
                ["Treas. Reg. 1.41-2","Qualified research expenses -- detailed rules"],
                ["IRS ATG for R&D Credit","Audit technique guide -- IRS examination standards"],
              ]},
              { category: "Judicial Authority -- Methodology", items: [
                ["Cohan v. Commissioner, 39 F.2d 540 (2d Cir. 1930)","Credible basis standard for estimated expenses"],
                ["Ekman v. Commissioner, T.C. Memo 1999-374","Reconstructed records and affidavits accepted"],
                ["Suder v. Commissioner, T.C. Memo 2014-201","Contemporaneous or reconstructed records accepted"],
                ["US v. McFerrin, 570 F.3d 672 (5th Cir. 2009)","No independent discovery test required post-1986"],
                ["Eustace v. Commissioner, T.C. Memo 2001-66","Process of experimentation -- systematic evaluation"],
              ]},
              { category: "Judicial Authority -- Qualification", items: [
                ["Fairchild Industries v. US, 71 F.3d 868 (Fed. Cir. 1996)","Funded research -- five-factor analysis"],
                ["Lockheed Martin Corp v. US, 210 F.3d 1366 (Fed. Cir. 2000)","Cost-plus contracts -- funded research analysis"],
                ["GeoSyntec Consultants v. US, 776 F.3d 1024 (9th Cir. 2015)","Client-funded engineering work analysis"],
                ["United Stationers Supply Co. v. US, 163 F.3d 440 (7th Cir. 1998)","Shrink-back rule -- narrowing business components"],
                ["Trinity Industries v. US, 757 F.3d 400 (5th Cir. 2014)","Shrink-back rule -- process components"],
                ["Tax and Accounting Software Corp v. US, 301 F.3d 1254 (10th Cir. 2002)","IUS higher threshold of innovation test"],
              ]},
            ].map(group => (
              <div key={group.category} className="border border-slate-200 rounded-xl p-4">
                <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wide mb-3 pb-2 border-b border-slate-100">{group.category}</h3>
                <div className="space-y-2">
                  {group.items.map(([cite, desc]) => (
                    <div key={cite} className="text-xs">
                      <p className="font-semibold text-slate-800">{cite}</p>
                      <p className="text-slate-500">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* XII. Taxpayer Certification */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">XII. Taxpayer Certification</h2>
          <div className="border-2 border-slate-300 rounded-xl p-6">
            <p className="text-sm text-slate-600 mb-8 leading-relaxed">Under penalties of perjury, I declare that I have examined this research tax credit study and the supporting documentation, and to the best of my knowledge and belief, the information provided to Alexander & Blake and contained herein is true, correct, and complete. I understand that this credit study will be used in connection with the preparation of a federal and state income tax return, and I accept responsibility for the accuracy of the underlying facts.</p>
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <div className="border-b-2 border-slate-400 mb-2 h-14"></div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Authorized Signature</p>
              </div>
              <div>
                <div className="border-b-2 border-slate-400 mb-2 h-14"></div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Date</p>
              </div>
              <div>
                <div className="border-b-2 border-slate-200 mb-2 h-8 flex items-end pb-1">
                  <p className="text-sm text-slate-700">{client.contactName}</p>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Printed Name</p>
              </div>
              <div>
                <div className="border-b-2 border-slate-200 mb-2 h-8"></div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Title / Position</p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-700"><strong>Important:</strong> This certification must be signed by an officer, director, or authorized representative of {client.companyName} before the credit is claimed. Retain a signed copy with your tax records.</p>
            </div>
          </div>
        </section>

        {/* XIII. Preparer Certification */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">XIII. Preparer Certification</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="font-black text-slate-900 text-lg">Alexander &amp; Blake</p>
                <p className="text-slate-500 text-sm">South Carolina R&amp;D Tax Credit Specialists</p>
                <p className="text-slate-400 text-xs mt-1">contact@alexanderblake.com | alexanderblake.com</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Study Prepared: {today}</p>
                <p className="text-xs text-slate-500">Tax Year: {eng.taxYear}</p>
                <p className="text-xs text-slate-500">Report Version: {report.version}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Alexander & Blake certifies that this research tax credit study was prepared in accordance with applicable provisions of the Internal Revenue Code, Treasury Regulations, and IRS guidance. This study reflects our professional judgment based on information provided by {client.companyName} and our independent research into the applicable law. We stand behind the positions taken in this study and will provide audit defense support in the event of an IRS examination.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="border-b-2 border-slate-400 mb-2 h-14"></div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Alexander &amp; Blake Authorized Representative</p>
              </div>
              <div>
                <div className="border-b-2 border-slate-400 mb-2 h-14"></div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Date</p>
              </div>
            </div>
          </div>
        </section>

        <div className="border-t-2 border-slate-200 pt-6 mt-8">
          <p className="text-xs text-slate-400 leading-relaxed mb-2">
            This report is confidential and was prepared solely for the use of {client.companyName} and their authorized tax advisors. Unauthorized disclosure or reproduction is prohibited. Alexander & Blake assumes no responsibility for any reliance on this document by any party other than the intended recipient. This report does not constitute legal advice. The credit amounts shown are estimates based on current law and may be subject to adjustment upon IRS review.
          </p>
          <p className="text-xs text-slate-400">Alexander & Blake -- South Carolina R&D Tax Credit Specialists -- Report ID: {report.id.slice(-8).toUpperCase()} -- Prepared: {today}</p>
        </div>
      </div>
    </div>
  );
}
