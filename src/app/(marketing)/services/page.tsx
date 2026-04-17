import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Alexander & Blake — R&D Tax Credit Advisory",
  description:
    "Federal R&D credit studies, South Carolina state credits, amended returns, payroll tax offset, and complete audit defense. Alexander & Blake manages the full lifecycle of your R&D tax credit engagement.",
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
      desc: "The federal Research and Experimentation Tax Credit rewards companies investing in innovation. We prepare complete credit studies with engineering analysis, QRE calculations, and IRS-compliant documentation.",
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
      desc: "South Carolina offers an additional R&D tax credit that stacks on top of the federal benefit. We identify and document both credits simultaneously, maximizing your total recovery.",
      items: [
        "SC state credit identification and documentation",
        "Federal + state credit stacking strategy",
        "SC-specific regulatory compliance",
        "Coordination with SC Department of Revenue",
        "Deep knowledge of SC industry landscape",
      ],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      imageAlt: "South Carolina business district",
    },
    {
      title: "Amended Returns",
      subtitle: "3-Year Lookback",
      desc: "Never claimed the R&D credit before? You may have up to three years of open tax returns eligible for amended filing. We identify and recover credits from prior years you already left behind.",
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
      desc: "Every credit study we prepare includes full IRS audit defense at no additional cost. Our documentation is built from day one to withstand scrutiny — following IRS Audit Techniques Guidelines (ATG) standards.",
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
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
              What We Do
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
              Comprehensive R&amp;D Tax Credit Services
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              From initial identification through filing and audit defense — we cover the full
              lifecycle of your R&amp;D tax credit. Federal, state, current year, and amended returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-center hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/25"
              >
                Get Free Assessment
              </Link>
              <Link
                href="/how-it-works"
                className="border-2 border-slate-300 text-slate-700 font-bold px-8 py-4 rounded-xl text-center hover:border-emerald-600 hover:text-emerald-600 transition-colors"
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
          className={`py-20 px-6 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
        >
          <div className="max-w-6xl mx-auto">
            <div
              className={`grid md:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">
                  {svc.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 mb-4">
                  {svc.title}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">{svc.desc}</p>
                <div className="space-y-3">
                  {svc.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{item}</span>
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
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">
            Our Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-4">
            Aligned Incentives. No Upfront Cost.
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            We operate on a contingency basis — 20% of credits successfully identified and recovered. If
            we identify no qualifying credits, there is no charge.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left">
              <div className="text-3xl font-black text-emerald-400 mb-2">$0</div>
              <div className="text-white font-bold text-sm mb-2">Upfront Cost</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                No retainers, no hourly fees, no deposits. The initial assessment is complimentary and the engagement begins at zero cost.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left">
              <div className="text-3xl font-black text-emerald-400 mb-2">20%</div>
              <div className="text-white font-bold text-sm mb-2">Contingency Fee</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                We earn 20% of the credits we identify. Paid only after your credit is filed and
                approved. Our incentives are aligned with yours.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left">
              <div className="text-3xl font-black text-emerald-400 mb-2">100%</div>
              <div className="text-white font-bold text-sm mb-2">Audit Defense</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Full IRS audit representation is included with every credit study at no additional
                cost. We stand behind our work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Not Sure Which Services Apply to You?
          </h2>
          <p className="text-lg text-emerald-100 mb-8">
            Our free 30-minute assessment covers everything. We&apos;ll identify exactly which credits
            and services apply to your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-emerald-600 font-bold px-10 py-4 rounded-xl text-lg hover:bg-slate-50 transition-colors shadow-lg"
            >
              Schedule Free Assessment
            </Link>
            <Link
              href="/estimator"
              className="border-2 border-white/40 text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-white/10 transition-colors"
            >
              Estimate My Credit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
