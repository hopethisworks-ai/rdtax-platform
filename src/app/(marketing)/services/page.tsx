import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Alexander & Blake — R&D Tax Credit Advisory",
  description:
    "Federal R&D credit studies, South Carolina state credits, amended returns, payroll tax offset, and ongoing audit support. Alexander & Blake provides full-lifecycle R&D tax credit advisory.",
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
      desc: "The federal Research and Experimentation Tax Credit supports companies investing in innovation. We prepare complete credit studies with careful engineering analysis, QRE calculations, and structured documentation designed for clarity and review.",
      items: [
        "Four-part test analysis for every qualifying activity",
        "Wage, contractor, and supply QRE calculations",
        "ASC vs. Regular Credit method comparison",
        "Form 6765 preparation and filing support",
        "Complete project narratives and methodology memo",
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      imageAlt: "Financial analysis on computer screens",
    },
    {
      title: "South Carolina State Credits",
      subtitle: "SC Code Section 12-6-3415",
      desc: "South Carolina offers an additional R&D tax credit that can be coordinated alongside the federal benefit. We identify and document both credits simultaneously as part of every qualifying engagement.",
      items: [
        "SC state credit identification and documentation",
        "Federal + state credit coordination strategy",
        "SC-specific regulatory compliance",
        "Coordination with SC Department of Revenue",
        "Deep knowledge of SC industry landscape",
      ],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      imageAlt: "South Carolina business skyline",
    },
    {
      title: "Amended Returns",
      subtitle: "3-Year Lookback",
      desc: "If your business has not previously claimed the credit, up to three years of open tax returns may be eligible for amended filing. We review prior periods and prepare the documentation needed to support those claims.",
      items: [
        "Analysis of up to 3 prior open tax years",
        "Amended return preparation (Form 1040-X or 1120-X)",
        "Historical QRE reconstruction from existing records",
        "Coordination with your CPA for multi-year filing",
        "Audit defense for all amended claims",
      ],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
      imageAlt: "Financial documents and calculator",
    },
    {
      title: "Payroll Tax Offset",
      subtitle: "PATH Act — Up to $500K/year",
      desc: "Qualifying small businesses and startups can apply R&D credits against payroll taxes instead of income taxes — even if you have no income tax liability. This applies to businesses with less than $5M in gross receipts and fewer than 5 years of revenue.",
      items: [
        "PATH Act qualification assessment",
        "Payroll tax offset calculation (Form 8974)",
        "Up to $500,000 per year in payroll tax savings",
        "Ideal for pre-revenue and early-stage companies",
        "Quarterly payroll tax offset coordination",
      ],
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
      imageAlt: "Startup team collaborating",
    },
    {
      title: "Audit Defense",
      subtitle: "Included with Every Study",
      desc: "Every credit study we prepare includes ongoing audit support at no additional cost. Our documentation is structured from day one with the expectation that it may be reviewed — following IRS Audit Techniques Guidelines and organized for examination.",
      items: [
        "ATG-compliant documentation methodology",
        "Full representation before the IRS",
        "Contemporaneous documentation support",
        "Business component analysis and four-part test records",
        "Resolution through appeals if necessary",
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
              From initial identification through filing and ongoing support — we manage the complete R&amp;D tax credit engagement with care and precision. Federal, state, current year, and amended returns.
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
                  className="object-cover w-full h-[360px]"
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
            We operate on a contingency basis — our fee is calculated as a percentage of credits successfully identified. If we identify no qualifying credits, there is no charge.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-left">
              <div className="text-3xl font-black text-primary mb-2">$0</div>
              <div className="text-navy font-bold text-sm mb-2">Upfront Cost</div>
              <p className="text-secondary text-sm leading-relaxed">
                No retainers, no hourly fees, no deposits. The initial consultation is complimentary and the engagement begins at zero cost.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-left">
              <div className="text-3xl font-black text-primary mb-2">20%</div>
              <div className="text-navy font-bold text-sm mb-2">Contingency Fee</div>
              <p className="text-secondary text-sm leading-relaxed">
                Our fee is calculated as a percentage of credits identified. Paid only after your credit is filed. Our incentives are aligned with yours.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-left">
              <div className="text-3xl font-black text-primary mb-2">100%</div>
              <div className="text-navy font-bold text-sm mb-2">Audit Support</div>
              <p className="text-secondary text-sm leading-relaxed">
                Ongoing audit support is included with every credit study at no additional cost. We stand behind the work we prepare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface border-t border-primary/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-navy mb-4">
            Not Sure Which Services Apply?
          </h2>
          <p className="text-lg text-secondary mb-8">
            A brief consultation covers everything. We&apos;ll help you understand which credits and services are relevant to your business.
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
