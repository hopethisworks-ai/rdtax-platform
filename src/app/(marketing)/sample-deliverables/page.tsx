import Link from "next/link";

export const metadata = {
  title: "Sample Deliverables | Alexander & Blake",
  description:
    "See how our R&D credit study packages are organized — executive summary, credit computation, business component map, project narratives, QRE schedules, and CPA filing support.",
};

export default function SampleDeliverablesPage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Sample Deliverables</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-navy mt-4 mb-8 leading-tight">
            See How Our R&amp;D Credit Study Packages Are Organized.
          </h1>
          <p className="text-body-text text-lg leading-relaxed">
            <span className="hidden sm:inline">Each engagement produces a structured work product designed for CPA review and examination support. Below is an outline of what a completed study package typically includes.</span>
            <span className="sm:hidden">See what a completed R&amp;D credit study package includes, from executive summary to filing support.</span>
          </p>
        </div>
      </section>

      {/* EXECUTIVE SUMMARY */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Section 1</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            Executive Summary
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            The executive summary provides a high-level overview of the credit study, designed for management and CPA review.
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <ul className="space-y-3">
              {[
                "Total federal and state credit amounts",
                "Filing year and entity information",
                "Industries and business activities covered",
                "Qualified activity overview with summary of R&D projects",
                "Major assumptions and methodology highlights",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-0.5">&bull;</span>
                  <span className="text-body-text text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CREDIT COMPUTATION SUMMARY */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Section 2</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            Credit Computation Summary
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            A detailed breakdown of the credit calculation, showing how qualifying expenses translate into credit amounts.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Federal Credit", desc: "Total federal R&D credit computed under the selected method (ASC or Regular Credit), with line-item detail." },
              { title: "SC State Credit", desc: "South Carolina research credit computation, coordinated with the federal credit position." },
              { title: "QRE by Category", desc: "Qualified research expenses broken down by wages, contract research (at 65%), and supplies." },
              { title: "Method Used", desc: "Documentation of the computation method selected and the rationale for that selection." },
            ].map((item) => (
              <div key={item.title} className="bg-surface border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS COMPONENT MAP */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Section 3</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            Business Component Map
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            The business component map organizes qualifying activities at the project level, linking technical detail to expense categories.
          </p>
          <div className="overflow-x-auto -mx-6 px-6">
          <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left text-navy font-semibold px-4 py-3">Business Component</th>
                  <th className="text-left text-navy font-semibold px-4 py-3">Project Description</th>
                  <th className="text-left text-navy font-semibold px-4 py-3">Technical Uncertainty</th>
                  <th className="text-left text-navy font-semibold px-4 py-3">Experimentation Process</th>
                  <th className="text-left text-navy font-semibold px-4 py-3">Employees Involved</th>
                  <th className="text-left text-navy font-semibold px-4 py-3">QRE Category</th>
                </tr>
              </thead>
              <tbody className="text-body-text">
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3">Automated QC Module</td>
                  <td className="px-4 py-3">Vision-based defect detection for production line</td>
                  <td className="px-4 py-3">Detection accuracy under variable lighting</td>
                  <td className="px-4 py-3">Iterative model training and threshold testing</td>
                  <td className="px-4 py-3">3 engineers</td>
                  <td className="px-4 py-3">Wages</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3">Thermal Barrier Coating</td>
                  <td className="px-4 py-3">New coating formulation for high-temp components</td>
                  <td className="px-4 py-3">Adhesion performance above 1200&deg;F</td>
                  <td className="px-4 py-3">Lab testing of 12 formulation variants</td>
                  <td className="px-4 py-3">2 engineers, 1 technician</td>
                  <td className="px-4 py-3">Wages, Supplies</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">API Integration Platform</td>
                  <td className="px-4 py-3">Custom middleware for legacy system interoperability</td>
                  <td className="px-4 py-3">Data mapping consistency across disparate schemas</td>
                  <td className="px-4 py-3">Prototype-test cycles with schema validation</td>
                  <td className="px-4 py-3">4 developers</td>
                  <td className="px-4 py-3">Wages, Contract</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
          <p className="text-body-text text-xs mt-4 italic">
            Sample data shown for illustration purposes only.
          </p>
        </div>
      </section>

      {/* PROJECT NARRATIVE SAMPLE */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Section 4</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            Project Narrative Sample
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            Each qualifying project includes a written narrative that addresses the IRS four-part test. Narratives are structured to provide clear, defensible documentation of the qualifying activity.
          </p>
          <div className="space-y-4">
            {[
              { title: "Permitted Purpose", desc: "Describes how the activity relates to developing or improving a product, process, software, or technique intended for functional use." },
              { title: "Technological in Nature", desc: "Establishes reliance on engineering, computer science, biological science, or physical science principles." },
              { title: "Elimination of Uncertainty", desc: "Documents the specific technical uncertainties faced at the outset — whether related to capability, method, or design." },
              { title: "Process of Experimentation", desc: "Details the systematic approach used to evaluate alternatives and resolve the uncertainty, including testing, modeling, simulation, or iterative development." },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-primary/30 pl-6 py-1">
                <h3 className="font-bold text-navy mb-1">{item.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QRE SCHEDULE SAMPLE */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Section 5</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            QRE Schedule Sample
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            QRE schedules provide the financial detail supporting each credit position, organized by expense category with clear source document references.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Wage QREs", desc: "Employee-level wage allocations based on time spent on qualifying activities, supported by payroll records and allocation analysis." },
              { title: "Contractor QREs", desc: "Payments to third-party contractors for qualifying work, calculated at the 65% inclusion rate per IRC Section 41(b)(3)." },
              { title: "Supply QREs", desc: "Materials and supplies consumed in the research process, with purchase records and allocation to qualifying projects." },
              { title: "Exclusions & References", desc: "Documentation of excluded expenses, funded research adjustments, and source document references for each line item." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY MEMO */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Section 6</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            Methodology Memo
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            The methodology memo documents the analytical approach, assumptions, and basis for each position. Below is a representative table of contents.
          </p>
          <div className="bg-surface border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-navy mb-4">Table of Contents</h3>
            <ol className="space-y-2">
              {[
                "Scope of Engagement",
                "Methodology Overview",
                "QRE Identification Approach",
                "Allocation Methodology",
                "Computation Method Selection",
                "Limitations",
                "Assumptions",
              ].map((item, idx) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-primary font-semibold text-sm min-w-[1.5rem]">{idx + 1}.</span>
                  <span className="text-body-text text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CPA FILING SUPPORT */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Section 7</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            CPA Filing Support
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            The study package includes filing-ready schedules and computation detail for both federal and South Carolina credits.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Form 6765 Support", desc: "Line-item detail mapping directly to IRS Form 6765 (Credit for Increasing Research Activities), including QRE totals, base amount computation, and credit calculation by method." },
              { title: "SC Schedule TC-18 Support", desc: "South Carolina research credit computation detail aligned with Schedule TC-18 filing requirements, coordinated with the federal credit position." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-body-text text-sm leading-relaxed italic border-l-2 border-gray-300 pl-6">
            Sample materials are illustrative only and are not based on a specific client engagement. Individual study packages vary based on the taxpayer&apos;s facts, qualifying activities, and filing requirements.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-navy mb-4">Ready to See What Your Study Would Look Like?</h2>
          <p className="text-lg text-secondary mb-10">
            Schedule a complimentary consultation to discuss your qualifying activities and learn how a completed study package supports your credit position.
          </p>
          <Link
            href="/contact"
            className="bg-primary text-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-primary-dark transition-colors"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
