import Link from "next/link";

export const metadata = {
  title: "About Alexander & Blake | R&D Tax Credit Advisory",
  description:
    "Alexander & Blake is a specialist advisory firm helping innovative businesses identify, document, and support R&D tax credits with precision and confidence.",
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
            A specialist advisory firm helping innovative businesses identify, document, and support R&amp;D tax credits with precision and confidence.
          </h1>
          <div className="space-y-5 text-body-text text-lg leading-relaxed">
            <p>
              We work with companies whose teams are building, improving, testing, and solving hard technical problems — often without realizing they may qualify for meaningful tax incentives. Our role is to translate that innovation into a well-supported credit study designed for both value and long-term reliability.
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
            Careful analysis, clear documentation, quiet confidence.
          </h2>
          <div className="space-y-5 text-body-text leading-relaxed">
            <p>
              We believe strong R&amp;D credit work should reflect the seriousness of the underlying business. It should be carefully analyzed, clearly documented, and communicated in a way that management and outside advisors can rely on.
            </p>
            <p>
              That requires more than a surface-level review. It means understanding how a business actually operates, identifying qualifying activities with care, gathering the right financial data, and producing support that is organized, substantiated, and thoughtfully prepared.
            </p>
            <p>
              Alexander &amp; Blake was built around a different standard: fewer shortcuts, stronger work product, and a process designed to hold up over time — not just at the point of filing.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. WHY ALEXANDER & BLAKE
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Why Alexander &amp; Blake</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-4 mb-8 leading-tight">
            A more considered alternative.
          </h2>
          <div className="space-y-5 text-body-text leading-relaxed">
            <p>
              Many companies either overlook the R&amp;D credit entirely or receive a process that feels rushed, templated, and disconnected from the real work happening inside the business. Alexander &amp; Blake was created to offer a more focused path — one that combines technical understanding, financial care, and a higher standard of client service.
            </p>
            <p>
              We are intentionally selective in how we approach engagements. Our work is not built on high-volume templates or surface-level intake. It is built on careful review, clear support, and a process designed to stand up over time.
            </p>
            <p>
              Our model is focused by design: deliver meaningful value, maintain a considered process, and support each engagement with the level of attention that serious businesses expect from any trusted financial advisor.
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
            Companies doing technical work.
          </h2>
          <div className="space-y-5 text-body-text leading-relaxed">
            <p>
              We work with businesses engaged in the kinds of activities that qualify — product development, process improvement, software development, prototyping and testing, formulation, automation, and engineering design.
            </p>
            <p>
              Our clients include both companies claiming the credit for the first time and established businesses seeking a more responsive and technically grounded advisor.
            </p>
          </div>
          <div className="mt-10">
            <div className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">Industries</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Manufacturing",
                "Software & Technology",
                "Engineering & Architecture",
                "Life Sciences",
                "Food & Beverage",
                "Construction",
              ].map((industry) => (
                <div key={industry} className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center">
                  <span className="text-navy text-sm font-medium">{industry}</span>
                </div>
              ))}
            </div>
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
                desc: "R&D tax credits are not a side service — they are a core focus of our firm. That concentration means we understand the nuances that generalist practices often miss.",
              },
              {
                title: "Documentation-Driven Process",
                desc: "Our work is organized around clear support: well-prepared project narratives, thorough financial substantiation, and structured technical documentation built for review.",
              },
              {
                title: "Practical, Executive-Level Communication",
                desc: "We present our findings in a way that is clear and useful to owners, finance teams, and outside advisors. No unnecessary complexity. No jargon without context.",
              },
              {
                title: "Built for Review",
                desc: "We prepare every engagement with the assumption that the work may one day be examined. That expectation shapes how we conduct interviews, organize support, and present the final deliverable.",
              },
              {
                title: "Client Experience",
                desc: "Responsive, organized, and professional from first conversation to final deliverable. Every client receives a dedicated point of contact and clear visibility into engagement progress.",
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
            Our work is guided by a few simple commitments: precision in analysis, integrity in judgment, clarity in communication, discipline in execution, and partnership in every client relationship. We believe strong advisory work should create confidence — not confusion.
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
            If your company is investing in technical development, product improvement, engineering, software, or process innovation, Alexander &amp; Blake can help you evaluate whether meaningful credits may be available — and support the claim with a well-organized, carefully prepared process.
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
