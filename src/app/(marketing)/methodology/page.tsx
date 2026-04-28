import Link from "next/link";

export const metadata = {
  title: "Methodology & Engagement Standards | Alexander & Blake",
  description:
    "Learn how Alexander & Blake conducts R&D tax credit studies — from qualification assessment and technical interviews through QRE analysis, methodology documentation, and CPA-coordinated filing.",
};

const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function MethodologyPage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Methodology &amp; Standards</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-navy mt-4 mb-8 leading-tight">
            How we conduct R&amp;D credit studies.
          </h1>
          <p className="text-body-text text-lg leading-relaxed">
            <span className="hidden sm:inline">Every Alexander &amp; Blake engagement follows a structured methodology designed for thoroughness, defensibility, and CPA coordination. This page documents the process, standards, and deliverables that define our work.</span>
            <span className="sm:hidden">Our engagements follow a structured methodology built for defensibility and CPA coordination. Here is how we work.</span>
          </p>
        </div>
      </section>

      {/* HOW QUALIFICATION IS ASSESSED */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Qualification</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            How qualification is assessed.
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            Qualification is evaluated against the IRS four-part test. Each business activity must satisfy all four requirements to be included in the credit study.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Permitted Purpose", desc: "The activity must relate to developing or improving a product, process, software, technique, formula, or invention that is intended for sale, lease, license, or internal use." },
              { title: "Technological in Nature", desc: "The activity must fundamentally rely on principles of engineering, computer science, biological science, or physical science." },
              { title: "Elimination of Uncertainty", desc: "The taxpayer must face uncertainty regarding capability, method, or design at the outset of the activity." },
              { title: "Process of Experimentation", desc: "The taxpayer must engage in a systematic process to evaluate alternatives and resolve the uncertainty — through modeling, simulation, testing, or iterative design." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW INTERVIEWS ARE CONDUCTED */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Technical Interviews</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            How interviews are conducted.
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            Technical interviews are the foundation of every credit study. They document the qualifying activities, technical uncertainties, and experimentation processes that support each credit position.
          </p>
          <div className="space-y-4">
            {[
              "Interviews are conducted with technical leads, project managers, and engineering staff who can speak to the nature of the work",
              "Each interview follows a structured format aligned with the four-part test requirements",
              "We document the specific uncertainties encountered, alternatives evaluated, and outcomes achieved",
              "Interview notes are reviewed by the technical review team before inclusion in the final study",
              "Sessions are designed to take 30–60 minutes per project area, with minimal disruption to operations",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-surface rounded-lg p-4">
                <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-body-text text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW QRE SUPPORT IS BUILT */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Financial Analysis</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            How QRE support is built.
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            Qualified research expenses (QREs) are the financial foundation of the credit computation. We build supporting schedules at the project level with clear documentation for each expense category.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Wages", desc: "Employee wages allocated to qualifying activities based on time spent on R&D, supported by payroll records and activity allocation analysis." },
              { title: "Contract Research", desc: "Payments to contractors for qualifying work, calculated at 65% per IRC Section 41 requirements, with supporting invoices and scope documentation." },
              { title: "Supplies", desc: "Materials consumed in the R&D process, documented with purchase records and allocation to qualifying projects." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW METHODOLOGY IS DOCUMENTED */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Documentation</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            How methodology is documented.
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            Every completed study includes a methodology memo that documents the approach, assumptions, and basis for each position. This memo serves as the primary reference for CPAs, management, and any future review.
          </p>
          <div className="space-y-3">
            {[
              "Credit computation method selection and rationale (ASC or Regular Credit)",
              "QRE allocation approach and basis for activity-level estimates",
              "Base amount calculation methodology and assumptions",
              "State credit coordination approach (for SC engagements)",
              "Documentation of positions taken and their factual support",
              "Summary of qualifying activities and business component mapping",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-body-text text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CPA COORDINATION */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">CPA Coordination</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            How CPA coordination works.
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            We work directly with the client&apos;s CPA or qualified tax professional throughout the engagement. This coordination ensures clean integration of the credit study with the overall tax return filing.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Filing Posture Review", desc: "We coordinate with the CPA to confirm filing approach, prior-year credit history, and any relevant return details before finalizing the study." },
              { title: "Study Package Delivery", desc: "The CPA receives a complete study package including executive summary, QRE schedules, project narratives, methodology memo, and Form 6765 support." },
              { title: "Form 6765 Integration", desc: "We provide filing-ready schedules and computation detail that map directly to Form 6765 line items for efficient return integration." },
              { title: "Ongoing Support", desc: "If questions arise during or after filing, we coordinate directly with the CPA on resolution, documentation, and correspondence." },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-primary/30 pl-6 py-1">
                <h3 className="font-bold text-navy mb-1">{item.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT "PREPARED FOR REVIEW" MEANS */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Our Standard</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            What &ldquo;prepared for review&rdquo; means.
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            We prepare every engagement with the expectation that the work may be examined. This standard shapes how we conduct interviews, organize documentation, and present the final deliverable.
          </p>
          <div className="space-y-4">
            {[
              "Every credit position is grounded in documented facts, not assumptions",
              "Project narratives are written to withstand detailed technical questioning",
              "QRE schedules include supporting detail sufficient for line-item verification",
              "The methodology memo documents the analytical basis for each position taken",
              "Work product is organized for efficient navigation by examiners and advisors",
              "All supporting work papers are retained for the statutory retention period",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-surface rounded-lg p-4">
                <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-body-text text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMINATION SUPPORT */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Examination Support</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            What examination support includes.
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            Every engagement includes ongoing examination support at no additional cost. If the credit claim is reviewed, we support the credit documentation by providing workpapers, narratives, schedules, and technical materials to your CPA or authorized representative.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Documentation Support", desc: "We provide all original work papers, narratives, schedules, and methodology documentation to support the credit documentation." },
              { title: "Correspondence Support", desc: "We assist your CPA or authorized representative by drafting response materials for IRS or state inquiries, including information document requests and technical position papers." },
              { title: "Technical Documentation Support", desc: "We assist with technical documentation for CPA or representative meetings and provide detailed explanations of study methodology and qualifying activities." },
              { title: "Adjustment Review Support", desc: "If adjustments are proposed, we work with the CPA to evaluate options and provide supporting documentation for an informed resolution." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY CONTROL */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Quality Assurance</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            Internal Quality Control Before Delivery
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            Before a study package is delivered, each engagement is reviewed against a defined quality-control checklist designed to confirm that qualification, computation, documentation, and CPA delivery materials are complete.
          </p>
          <div className="space-y-3">
            {[
              "Each claimed activity is tied to a defined business component",
              "Each business component is evaluated under the four-part test",
              "Technical uncertainty is documented at the project level",
              "Experimentation is clearly described",
              "Wage QREs are tied to employees, roles, and allocation methodology",
              "Contractor QREs are reviewed for scope and 65% inclusion treatment",
              "Supply QREs are tied to qualifying activities and supporting records",
              "Federal and SC credit calculations are reconciled",
              "Exclusions are documented",
              "Form 6765 support schedules are prepared",
              "SC Schedule TC-18 support is prepared when applicable",
              "Assumptions and limitations are disclosed",
              "CPA delivery package is complete",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-body-text text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RISK REVIEW */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Risk Assessment</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            Issue Identification &amp; Risk Review
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            Not every potential activity is treated the same. During each engagement, Alexander &amp; Blake identifies items that may require additional support, CPA discussion, or exclusion from the final claim.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "Strong support",
                desc: "Clear business component, documented uncertainty, documented experimentation, reliable financial support.",
              },
              {
                title: "Moderate support",
                desc: "Qualifying facts appear present, but allocations or documentation require additional support or CPA discussion.",
              },
              {
                title: "Excluded or deferred",
                desc: "Unsupported estimates, routine production, non-technical uncertainty, sales/admin time, general quality control, or activities outside the credit period.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE SCREEN OUT */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Credit Discipline</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            What We Screen Out
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            A strong R&amp;D credit study is not just about identifying qualifying work. It is also about excluding activities that are not supportable.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Routine production",
              "Cosmetic or aesthetic changes",
              "Market research and surveys",
              "Sales and customer support time",
              "General management and administration",
              "Unsupported time estimates",
              "Non-technical uncertainty",
              "Standard quality control without experimentation",
              "Work outside the eligible tax year",
              "Contractor costs without scope support",
              "Funded research where the taxpayer lacks substantial rights",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-surface rounded-lg p-4">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                <span className="text-body-text text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-navy mb-4">Questions About Our Process?</h2>
          <p className="text-lg text-secondary mb-10">
            Schedule a complimentary consultation to discuss how our methodology applies to your business activities. No obligation, no records required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-primary-dark transition-colors"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/about"
              className="border border-gray-300 text-secondary font-semibold px-8 py-4 rounded-xl text-base hover:border-primary hover:text-primary transition-colors"
            >
              About Alexander &amp; Blake
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
