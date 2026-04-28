import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Alexander & Blake — R&D Tax Credit Advisory",
  description:
    "Federal R&D credit studies, South Carolina state credits, amended returns, payroll tax offset, and ongoing examination support. Alexander & Blake provides full-lifecycle R&D tax credit advisory.",
};

/* ── Icon Components ── */
const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function ServicesPage() {
  const services = [
    {
      title: "Federal R&D Tax Credit",
      subtitle: "IRC Section 41",
      desc: "We prepare federal R&D tax credit studies for businesses engaged in qualified research activity. Each study includes qualification analysis, QRE calculations, method review, and filing support materials prepared with clarity and care.",
      items: [
        "Four-part test analysis by activity",
        "Wage, contractor, and supply QRE calculations",
        "ASC and Regular Credit method review",
        "Form 6765 support and CPA coordination",
        "Project narratives and methodology summary",
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      imageAlt: "Financial analysis on computer screens",
    },
    {
      title: "South Carolina State Credits",
      subtitle: "SC Code Section 12-6-3415",
      desc: "For qualifying South Carolina businesses, we coordinate the federal credit alongside the additional state credit as part of one integrated engagement.",
      items: [
        "State credit identification and support",
        "Federal and state coordination",
        "Filing support aligned with your CPA",
        "Familiarity with South Carolina industries and credit planning",
      ],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      imageAlt: "South Carolina business skyline",
    },
    {
      title: "Amended Returns",
      subtitle: "3-Year Lookback",
      desc: "If the credit has not been claimed previously, we review open tax years and prepare the support needed for amended filings where appropriate.",
      items: [
        "Review of open prior-year periods",
        "Historical QRE reconstruction from available records",
        "Amended filing support",
        "Coordination with your CPA across tax years",
        "Examination support included in coordination with your CPA or authorized tax representative",
      ],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
      imageAlt: "Financial documents and calculator",
    },
    {
      title: "Payroll Tax Offset",
      subtitle: "PATH Act — Up to $500K/year",
      desc: "Certain early-stage businesses may be able to apply R&D credits against payroll taxes rather than income taxes. We assess eligibility and prepare the necessary calculations and support.",
      items: [
        "PATH Act eligibility review",
        "Form 8974 support",
        "Up to $500,000 annual payroll offset potential",
        "Especially relevant for early-stage and pre-profit companies",
        "Coordination with payroll and tax filing process",
      ],
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
      imageAlt: "Startup team collaborating",
    },
    {
      title: "Ongoing Support",
      subtitle: "Included with Every Study",
      desc: "Every study we prepare includes ongoing support if the credit is later reviewed. Our documentation is organized from the outset with review in mind, and we remain available to assist the client and their advisors with follow-up questions and supporting materials.",
      items: [
        "Documentation organized for review",
        "Contemporaneous support and project records",
        "Business component and four-part test support",
        "Coordination with the client and CPA during follow-up",
        "Ongoing assistance at no additional cost",
      ],
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
      imageAlt: "Professional reviewing legal documents",
    },
  ];

  return (
    <div className="bg-white">
      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-surface">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <span className="inline-block bg-surface text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
              What We Do
            </span>
            <h1 className="text-4xl md:text-5xl font-normal text-navy leading-tight mb-6">
              Full-Lifecycle R&amp;D Tax Credit Advisory
            </h1>
            <p className="text-lg text-body-text leading-relaxed max-w-2xl mb-8">
              From initial evaluation through filing support, we manage the full R&amp;D tax credit study process with structured documentation and CPA-coordinated filing support — including federal credits, South Carolina credits, current-year claims, and amended returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-primary text-white font-semibold px-8 py-4 rounded-xl text-center hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/how-it-works"
                className="border-2 border-secondary/30 text-body-text font-bold px-8 py-4 rounded-xl text-center hover:border-primary hover:text-primary transition-colors"
              >
                See Our Process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICE DETAIL SECTIONS
      ═══════════════════════════════════════════ */}
      {services.map((svc, i) => (
        <section
          key={svc.title}
          className={`py-20 px-6 ${i % 2 === 0 ? "bg-white" : "bg-surface"}`}
        >
          <div className="max-w-6xl mx-auto">
            <div
              className={`grid md:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">
                  {svc.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl font-normal text-navy mt-2 mb-4">
                  {svc.title}
                </h2>
                <p className="text-body-text leading-relaxed mb-6">{svc.desc}</p>
                <div className="space-y-3">
                  {svc.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-body-text text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={svc.image}
                  alt={svc.imageAlt}
                  width={800}
                  height={600}
                  className="object-cover w-full h-[240px] sm:h-[300px] md:h-[360px]"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ═══════════════════════════════════════════
          PRICING MODEL
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface border-y border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary text-xs font-bold uppercase tracking-widest">
            Engagement Model
          </span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-4">
            Aligned Incentives. Clear Terms.
          </h2>
          <p className="text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Alexander &amp; Blake typically works on a contingency basis. We explain scope, timing, and fee terms clearly at the start of each engagement so clients understand exactly how the process works.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-left">
              <div className="text-navy font-bold text-sm mb-2">No Upfront Retainer</div>
              <p className="text-secondary text-sm leading-relaxed">
                There is no retainer or deposit to begin the engagement. The initial consultation is complimentary.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-left">
              <div className="text-navy font-bold text-sm mb-2">Contingency-Based Fee</div>
              <p className="text-secondary text-sm leading-relaxed">
                Our fee is typically based on a percentage of credits identified, paid after filing. We discuss terms clearly before beginning any work.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-left">
              <div className="text-navy font-bold text-sm mb-2">Examination Support Included</div>
              <p className="text-secondary text-sm leading-relaxed">
                Ongoing support is included with every study at no additional cost. We remain available to assist if questions arise later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHAT WE DO NOT DO
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-bold uppercase tracking-widest">
            Scope Clarity
          </span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-8">
            What We Do Not Do
          </h2>
          <div className="space-y-4">
            {[
              "We do not file tax returns",
              "We do not replace your CPA",
              "We do not provide legal advice",
              "We do not guarantee a credit amount",
              "We do not include unsupported activities",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-body-text text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface border-t border-primary/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-navy mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-lg text-secondary mb-8">
            A brief consultation can help determine which credits, filing paths, and support needs may be relevant to your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-white font-semibold px-10 py-4 rounded-xl text-lg hover:bg-primary-dark transition-colors shadow-md"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/estimator"
              className="border border-secondary/30 text-body-text font-semibold px-10 py-4 rounded-xl text-lg hover:border-primary hover:text-primary transition-colors"
            >
              Estimate Your Credit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
