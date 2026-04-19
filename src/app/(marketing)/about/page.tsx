import Link from "next/link";

export const metadata = {
  title: "About Alexander & Blake | R&D Tax Credit Advisory",
  description:
    "Alexander & Blake is a specialist advisory firm focused on helping innovative businesses identify, document, and claim R&D tax credits with clarity, rigor, and confidence.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* ═══════════════════════════════════════════
          1. OPENING BRAND STATEMENT
      ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">About Alexander &amp; Blake</span>
          <h1 className="text-4xl md:text-5xl font-normal text-navy mt-4 mb-8 leading-tight">
            A specialist advisory firm focused on R&amp;D tax credits.
          </h1>
          <div className="space-y-5 text-body-text text-lg leading-relaxed">
            <p>
              Alexander &amp; Blake is a specialist advisory firm focused on helping innovative businesses identify, document, and claim valuable federal and state R&amp;D tax credits with clarity, rigor, and confidence.
            </p>
            <p>
              We work with companies whose teams are building, improving, testing, and solving hard technical problems — often without realizing they may qualify for meaningful tax incentives. Our role is to translate that innovation into a well-supported credit study designed for both value and defensibility.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. OUR APPROACH
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Our Approach</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-8 leading-tight">
            Thoughtful, precise, and built to withstand scrutiny.
          </h2>
          <div className="space-y-5 text-body-text leading-relaxed">
            <p>
              We believe R&amp;D tax credit work should be precise, thoughtful, and built to withstand scrutiny. That requires more than a surface-level review. It requires understanding how a business operates, identifying qualifying activities carefully, gathering the right financial data, and developing support that management and outside advisors can stand behind.
            </p>
            <p>
              Alexander &amp; Blake was built around a higher standard: stronger documentation, a more disciplined process, and a client experience designed to reflect the seriousness of the work.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. WHY WE EXIST
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Why Alexander &amp; Blake</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-8 leading-tight">
            A more focused alternative.
          </h2>
          <div className="space-y-5 text-body-text leading-relaxed">
            <p>
              Many companies either overlook the R&amp;D credit entirely or receive an approach that feels rushed, templated, and disconnected from the underlying business. We created Alexander &amp; Blake to offer a more focused alternative — one that combines technical understanding, financial discipline, and a refined standard of service.
            </p>
            <p>
              Alexander &amp; Blake was established to bring a more considered standard to R&amp;D tax credit advisory — one grounded in professionalism, careful analysis, and long-term client trust. Our model is intentionally focused: deliver meaningful value, maintain a disciplined process, and support each engagement with the level of care serious businesses expect.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. WHO WE WORK WITH
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Who We Work With</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-8 leading-tight">
            Companies solving technical problems.
          </h2>
          <div className="space-y-5 text-body-text leading-relaxed">
            <p>
              We work with businesses engaged in technical development, process improvement, product design, software development, manufacturing innovation, engineering, formulation, prototyping, and other forms of qualified research activity.
            </p>
            <p>
              Our clients include both companies claiming the credit for the first time and established businesses seeking a more responsive and disciplined advisor.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-10">
            {[
              "Manufacturing",
              "Software Development",
              "Engineering",
              "Life Sciences",
              "Food & Beverage",
              "Construction",
              "Architecture",
              "Product Design",
              "Process Innovation",
            ].map((industry) => (
              <div key={industry} className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center">
                <span className="text-navy text-sm font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. WHAT SETS US APART
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">What Sets Us Apart</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-12 leading-tight">
            A different standard of work.
          </h2>
          <div className="space-y-10">
            {[
              {
                title: "Specialized Focus",
                desc: "R&D tax credits are not a side service — they are the core focus of our firm. That depth of specialization means we identify qualifying activities that generalist firms routinely overlook.",
              },
              {
                title: "Documentation-Driven Process",
                desc: "We emphasize support, organization, and defensibility. Every credit study is prepared with clear project narratives, thorough financial substantiation, and structured technical documentation.",
              },
              {
                title: "Practical, Executive-Level Communication",
                desc: "We present findings in a way that is clear and useful to owners, finance teams, and outside advisors. No unnecessary complexity. No jargon without context.",
              },
              {
                title: "Defensibility Matters",
                desc: "We believe credit work should be prepared with the expectation that it may one day be reviewed. That standard shapes every decision we make — from how we conduct interviews to how we organize the final deliverable.",
              },
              {
                title: "Client Experience",
                desc: "Responsive, organized, and professional from first call to final deliverable. Every client receives secure portal access, a dedicated point of contact, and clear visibility into engagement progress.",
              },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-primary/30 pl-6">
                <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. OUR PRINCIPLES
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Our Principles</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-6 leading-tight">
            What guides our work.
          </h2>
          <p className="text-body-text leading-relaxed mb-10">
            Our work is guided by a few simple principles: precision in analysis, integrity in judgment, clarity in communication, and discipline in execution. We believe strong advisory work should create confidence — not confusion.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { word: "Precision", desc: "In analysis" },
              { word: "Integrity", desc: "In judgment" },
              { word: "Clarity", desc: "In communication" },
              { word: "Discipline", desc: "In execution" },
              { word: "Partnership", desc: "In relationship" },
            ].map((value) => (
              <div key={value.word} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
                <div className="font-bold text-navy text-sm">{value.word}</div>
                <div className="text-secondary text-xs mt-1">{value.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. CTA
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-body-text leading-relaxed mb-8 text-lg">
            If your company is investing in technical development, product improvement, engineering, software, or process innovation, Alexander &amp; Blake can help you evaluate whether meaningful credits may be available — and support the claim through a disciplined, defensible process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-primary-dark transition-colors"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/eligibility"
              className="border border-gray-300 text-secondary font-semibold px-8 py-4 rounded-xl text-base hover:border-primary hover:text-primary transition-colors"
            >
              Evaluate Eligibility
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
