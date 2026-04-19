import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About Alexander & Blake | R&D Tax Credit Advisory Firm",
  description:
    "Alexander & Blake is a dedicated R&D tax credit advisory firm serving South Carolina businesses. Deep tax expertise, rigorous methodology, and complete audit defense.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
            alt="Modern professional office"
            width={1400}
            height={600}
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-navy/80" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
          <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-light text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-primary-light rounded-full" />
            About Our Firm
          </span>
          <h1 className="text-4xl md:text-5xl font-normal text-white leading-tight mb-6">
            A Singular Focus on R&amp;D Tax Credits.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Alexander &amp; Blake exists for one reason: to ensure every qualifying South Carolina business recovers the R&amp;D tax credits it has earned. We handle the complexity so you can focus on what you do best.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOUNDING STORY
      ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-6 leading-tight">
              Built to Close a Gap.
            </h2>
            <p className="text-body-text leading-relaxed mb-5">
              The R&amp;D tax credit has existed since 1981, yet the vast majority of qualifying businesses have never claimed it. Not because they lack eligibility — but because the process demands a rare intersection of tax knowledge, technical documentation expertise, and deep familiarity with IRS audit standards.
            </p>
            <p className="text-body-text leading-relaxed mb-5">
              Most general practice CPA firms lack the bandwidth or specialization to prepare defensible R&amp;D credit studies in-house. The result is billions of dollars in unclaimed credits — particularly among small and mid-market companies that stand to benefit the most.
            </p>
            <p className="text-body-text leading-relaxed">
              Alexander &amp; Blake was founded to address that gap. We are a specialty firm focused exclusively on R&amp;D tax credits, combining rigorous methodology with the practical understanding that comes from deep engagement with South Carolina&apos;s manufacturing, technology, and engineering sectors.
            </p>
          </div>
          <div className="relative">
            <div className="bg-surface rounded-2xl p-8 md:p-10 border border-gray-200">
              <div className="space-y-8">
                {[
                  { stat: "100%", label: "Dedicated to R&D Tax Credits", desc: "We do not prepare tax returns, financial statements, or general advisory work. R&D credits are our sole focus." },
                  { stat: "60 Days", label: "Average Time to Filing", desc: "From signed engagement to a completed, audit-ready credit study delivered to your CPA." },
                  { stat: "$0", label: "Upfront Cost", desc: "Contingency-based engagement. If we identify no qualifying credits, there is no charge." },
                ].map((item) => (
                  <div key={item.stat} className="flex gap-5">
                    <div className="text-3xl font-black text-primary w-20 flex-shrink-0">{item.stat}</div>
                    <div>
                      <div className="font-bold text-navy text-sm">{item.label}</div>
                      <div className="text-secondary text-sm mt-1 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EXPERTISE
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3">What We Bring to Every Engagement</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Tax Credit Specialization",
                desc: "Our team focuses exclusively on IRC Section 41 and related state credits. This depth of specialization means we identify qualifying activities that generalist firms routinely miss — and document them to a standard that withstands IRS examination.",
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                  </svg>
                ),
              },
              {
                title: "Audit-Ready Methodology",
                desc: "Every credit study we produce follows the IRS Audit Techniques Guidelines. We prepare project narratives, four-part test analyses, and QRE calculations as if they will be examined — because they may be. Our clients are never exposed.",
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                ),
              },
              {
                title: "South Carolina Focus",
                desc: "We understand the state's manufacturing base, its growing technology sector, and the specific interplay between federal and SC state R&D credits. That local depth translates directly into more thorough credit identification for our clients.",
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div key={card.title} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center mb-5">{card.icon}</div>
                <h3 className="font-bold text-navy text-lg mb-3">{card.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRINCIPLES
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">How We Operate</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3">Our Principles</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-4xl mx-auto">
            {[
              {
                title: "Aligned Incentives",
                desc: "Our 20% contingency fee means we earn nothing unless you receive credits. There are no retainers, no hourly rates, and no hidden costs. If we identify no qualifying activities, there is no charge.",
              },
              {
                title: "Transparent Process",
                desc: "Every client receives secure portal access, a dedicated analyst, and clear visibility into engagement status. We communicate directly, set realistic expectations, and deliver on time.",
              },
              {
                title: "CPA Partnership",
                desc: "We work alongside your CPA as a specialty resource — never in competition. Your CPA handles the return; we handle the R&D credit study. The coordination is seamless.",
              },
              {
                title: "Defensible Documentation",
                desc: "We do not cut corners on documentation. Every project narrative, every four-part test analysis, and every QRE calculation is prepared to a standard that we are prepared to defend under IRS examination.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                  <p className="text-body-text text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INDUSTRIES SERVED
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Who We Serve</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3">South Carolina Industries</h2>
            <p className="text-secondary mt-4 max-w-2xl mx-auto">
              We serve businesses across every sector where qualifying research activities occur — from precision manufacturing to enterprise software development.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Manufacturing & Industrial",
              "Software & Technology",
              "Engineering & Architecture",
              "Life Sciences & Biotech",
              "Food & Beverage",
              "Construction & Trades",
            ].map((industry) => (
              <div key={industry} className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-sm transition-shadow">
                <span className="font-semibold text-navy text-sm">{industry}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/industries" className="text-primary font-semibold text-sm hover:text-primary-dark transition-colors">
              View All Industries We Serve →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-4">
            Schedule a Complimentary Assessment
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            A 30-minute consultation to evaluate your eligibility, estimate your potential credit, and outline the engagement process. No obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-primary-dark transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/estimator"
              className="border-2 border-white/20 text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-white/10 transition-colors"
            >
              Estimate My Credit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
