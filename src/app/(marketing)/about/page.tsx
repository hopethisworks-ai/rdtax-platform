import Link from "next/link";

export const metadata = {
  title: "About Alexander & Blake | R&D Tax Credit Advisory",
  description:
    "Alexander & Blake is a specialist R&D tax credit advisory firm. Learn about our engagement process, deliverables, leadership structure, and standards.",
};

/* ── Reusable Icons ── */
const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* ═══════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">About Alexander &amp; Blake</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-navy mt-4 mb-8 leading-tight">
            A specialist advisory firm built around disciplined R&amp;D credit work.
          </h1>
          <div className="space-y-5 text-body-text text-lg leading-relaxed">
            <p>
              We work with companies whose teams are building, improving, testing, and solving hard technical problems — often without realizing they may qualify for meaningful tax incentives. Our role is to translate that innovation into a well-supported credit study: technically grounded, clearly documented, and prepared for long-term reliability.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOUNDER BACKGROUND
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Our Background</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-6 leading-tight">
            Founded on National R&amp;D Credit Experience
          </h2>
          <div className="space-y-5 text-body-text leading-relaxed">
            <p>
              Alexander &amp; Blake was founded by a former R&amp;D tax credit consultant with experience at national advisory firms including Aprio and alliantgroup. That experience includes eligibility analysis, technical interviews, business component mapping, QRE modeling, project narratives, methodology documentation, and CPA-ready study preparation for companies across manufacturing, software, engineering, construction, and process-improvement environments.
            </p>
            <p>
              The firm was created to bring national-firm R&amp;D credit discipline to South Carolina businesses and CPA firms through a focused, documentation-first advisory model.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. HOW ENGAGEMENTS ARE RUN
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Engagement Process</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            How engagements are run.
          </h2>
          <p className="text-body-text leading-relaxed mb-10">
            Every engagement follows a structured process designed for thoroughness, efficiency, and minimal disruption to your operations.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { step: "01", title: "Eligibility Assessment", desc: "We evaluate your business activities against the IRS four-part test to confirm qualification and identify the scope of qualifying work." },
              { step: "02", title: "Technical Interviews", desc: "Guided conversations with your technical team to document qualifying activities, uncertainties encountered, and the process of experimentation used." },
              { step: "03", title: "Business Component Mapping", desc: "We identify and document each business component — the product, process, software, technique, formula, or invention being developed or improved." },
              { step: "04", title: "QRE Calculations", desc: "Qualified research expense analysis across wages, contractor costs, and supplies — with supporting schedules for each business component." },
              { step: "05", title: "Project Narratives", desc: "Detailed written narratives for each qualifying project, documenting the technical uncertainty, process of experimentation, and technological information relied upon." },
              { step: "06", title: "Methodology Memo", desc: "A comprehensive memo documenting the credit computation method, assumptions, allocation approach, and the basis for each position taken." },
              { step: "07", title: "CPA Coordination", desc: "We deliver the completed study package to your CPA or qualified tax professional and coordinate directly on filing posture, Form 6765, and return integration." },
              { step: "08", title: "Post-Filing Support", desc: "Ongoing audit support at no additional cost — including documentation, correspondence, and resolution support if questions arise after filing." },
            ].map((item) => (
              <div key={item.step} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-primary text-xs font-black uppercase tracking-widest mb-2">Step {item.step}</div>
                <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. WHAT CLIENTS RECEIVE
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Deliverables</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            What clients receive.
          </h2>
          <p className="text-body-text leading-relaxed mb-10">
            Every completed engagement produces a structured work product package designed to support the credit claim, facilitate CPA review, and withstand examination.
          </p>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
            {[
              "Executive summary with credit computation and key findings",
              "Methodology memo documenting approach, assumptions, and positions",
              "Project narratives for each qualifying business component",
              "QRE schedules with wage, contractor, and supply detail",
              "Four-part test documentation for each qualifying activity",
              "Form 6765 support and filing-ready schedules",
              "CPA coordination materials and filing guidance",
              "Ongoing audit support documentation and representation",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-body-text text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. HOW FILING WORKS
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Filing Workflow</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            How filing works.
          </h2>
          <p className="text-body-text leading-relaxed mb-10">
            Alexander &amp; Blake is a specialty advisory firm — not a CPA firm or law firm. We prepare the credit study and supporting documentation. Your CPA or qualified tax professional reviews the filing posture and files the return.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
              </div>
              <h3 className="font-bold text-navy mb-3">Alexander &amp; Blake Prepares</h3>
              <div className="space-y-2">
                {[
                  "Complete credit study and supporting documentation",
                  "Project narratives and QRE schedules",
                  "Methodology memo and computation detail",
                  "Form 6765 support materials",
                  "Executive summary for management review",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-body-text text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              </div>
              <h3 className="font-bold text-navy mb-3">Your CPA Reviews &amp; Files</h3>
              <div className="space-y-2">
                {[
                  "Reviews study package and filing posture",
                  "Confirms credit computation and method",
                  "Integrates Form 6765 into tax return",
                  "Files the return with the credit claim",
                  "Coordinates with A&B on any questions",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-body-text text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. LEADERSHIP & OVERSIGHT
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Leadership &amp; Oversight</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            Structured oversight at every stage.
          </h2>
          <p className="text-body-text leading-relaxed mb-10">
            Every engagement is managed by a defined team structure with clear accountability. Each role is designed to maintain quality, consistency, and client confidence throughout the process.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                role: "Managing Director",
                scope: "Firm-level quality standards, engagement oversight, and final review of all completed studies before delivery.",
              },
              {
                role: "Client Engagement Lead",
                scope: "Primary point of contact for the client. Manages the engagement timeline, coordinates data collection, and ensures a smooth, responsive experience.",
              },
              {
                role: "Technical Review",
                scope: "Reviews all four-part test documentation, project narratives, and methodology positions for technical accuracy and defensibility.",
              },
              {
                role: "Documentation & Substantiation",
                scope: "Prepares QRE schedules, financial substantiation, and supporting work papers with the precision required for examination readiness.",
              },
            ].map((item) => (
              <div key={item.role} className="border-l-2 border-primary/30 pl-6">
                <h3 className="font-bold text-navy mb-2">{item.role}</h3>
                <p className="text-body-text text-sm leading-relaxed">{item.scope}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. ENGAGEMENT STANDARDS
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Our Standards</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            What guides every engagement.
          </h2>
          <p className="text-body-text leading-relaxed mb-10">
            These standards are not aspirational — they are operational. Every engagement is evaluated against them before delivery.
          </p>
          <div className="space-y-6">
            {[
              {
                title: "Supportable Positions",
                desc: "Every credit position is grounded in the facts of the engagement and documented with sufficient technical and financial evidence to withstand review.",
              },
              {
                title: "Organized Documentation",
                desc: "Work product is structured for clarity — project narratives, QRE schedules, methodology memos, and supporting work papers are organized for efficient review by CPAs and examiners.",
              },
              {
                title: "Prepared-for-Review Methodology",
                desc: "We prepare every study with the expectation that it may be examined. That standard shapes interview approach, documentation structure, and the level of detail in every deliverable.",
              },
              {
                title: "Disciplined Communication",
                desc: "Clients and their CPAs receive clear, executive-level communication throughout the engagement — no jargon without context, no unnecessary complexity.",
              },
              {
                title: "Client & CPA Coordination",
                desc: "We coordinate directly with the client's CPA on filing posture, Form 6765 integration, and any questions that arise during or after filing.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6 flex gap-4">
                <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-navy mb-1">{item.title}</h3>
                  <p className="text-body-text text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. WHO WE WORK WITH
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Who We Work With</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-4 leading-tight">
            Companies doing technical work.
          </h2>
          <p className="text-body-text leading-relaxed mb-8">
            We work with businesses engaged in product development, process improvement, software development, prototyping and testing, formulation, automation, and engineering design. Our clients include both companies claiming the credit for the first time and established businesses seeking a more technically grounded advisory approach.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "Manufacturing",
              "Software & Technology",
              "Engineering & Architecture",
              "Life Sciences",
              "Food & Beverage",
              "Construction",
            ].map((industry) => (
              <div key={industry} className="bg-surface border border-gray-200 rounded-lg px-4 py-3 text-center">
                <span className="text-navy text-sm font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. CTA
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-body-text leading-relaxed mb-8 text-lg">
            If your company is investing in technical development, product improvement, engineering, software, or process innovation, Alexander &amp; Blake can help you evaluate whether meaningful credits may be available — and support the claim with organized documentation, structured analysis, and CPA-coordinated filing support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-primary-dark transition-colors"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/methodology"
              className="border border-gray-300 text-secondary font-semibold px-8 py-4 rounded-xl text-base hover:border-primary hover:text-primary transition-colors"
            >
              View Our Methodology
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
