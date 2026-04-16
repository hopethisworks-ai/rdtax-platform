import Link from "next/link";
import Image from "next/image";
import CpaPartnerForm from "./CpaPartnerForm";

export const metadata = {
  title: "CPA Partners | CreditPath R&D Tax Credit",
  description:
    "Partner with CreditPath to offer your clients R&D tax credit studies. We handle the specialty work. You keep the client relationship.",
};

/* ── Reusable Icons ── */
const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const ArrowRight = () => (
  <svg
    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

export default function CpaPartnersPage() {
  return (
    <div className="bg-white">
      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
                For Accounting Professionals
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                Add R&amp;D Tax Credits to Your Practice. Without Adding Complexity.
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                CreditPath works alongside your practice to deliver R&amp;D tax credit studies to your
                clients. You keep the client relationship. We handle the specialty work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#partner-form"
                  className="bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-center hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/25"
                >
                  Become a Partner
                </Link>
                <Link
                  href="/how-it-works"
                  className="border-2 border-slate-300 text-slate-700 font-bold px-8 py-4 rounded-xl text-center hover:border-emerald-600 hover:text-emerald-600 transition-colors"
                >
                  See How It Works
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
                alt="Accountants collaborating over financial documents"
                width={800}
                height={550}
                className="object-cover w-full h-[400px] md:h-[480px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          KEY STATS
      ═══════════════════════════════════════════ */}
      <section className="py-10 px-6 bg-emerald-600">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-black text-white mb-1">$50K+</div>
            <div className="text-emerald-100 text-sm">Avg. credit per client</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white mb-1">20%</div>
            <div className="text-emerald-100 text-sm">Contingency only</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white mb-1">60 days</div>
            <div className="text-emerald-100 text-sm">Assessment to filing</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white mb-1">100%</div>
            <div className="text-emerald-100 text-sm">Audit defense included</div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY PARTNER
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">
              Why Partner With Us
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">
              We Work For You. Not Instead of You.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "You Keep the Client",
                desc: "We never solicit your clients for other services. Your client relationship stays yours. We are a specialty subcontractor, not a competitor.",
                icon: (
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                ),
              },
              {
                title: "We Handle the Heavy Lifting",
                desc: "R&D credit studies require deep technical documentation and IRS ATG compliance. We handle all of it. You review and sign off.",
                icon: (
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                ),
              },
              {
                title: "Audit-Ready Documentation",
                desc: "Every study is built to IRS ATG standards with full business component analysis, four-part test documentation, and funded research review.",
                icon: (
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                ),
              },
              {
                title: "No Risk to Your Clients",
                desc: "Our fee is 20% of credits recovered — paid only when your client receives their credit. No upfront cost, no risk.",
                icon: (
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                ),
              },
              {
                title: "Fast Turnaround",
                desc: "From engagement kickoff to delivered credit study in 60 days. Your clients see results fast.",
                icon: (
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                ),
              },
              {
                title: "South Carolina Focused",
                desc: "We specialize in SC businesses and stack the federal credit with the SC state credit for maximum value.",
                icon: (
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS — 3-step CPA flow
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">
              Simple Three-Step Process
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "You Identify a Client",
                desc: "Think about which clients are manufacturers, software companies, contractors, or engineers. If they are doing something new or improved — they likely qualify. Refer them to us for a free assessment.",
              },
              {
                num: "02",
                title: "We Do the Work",
                desc: "We conduct the assessment, collect data through our secure portal, run the credit study, and prepare complete IRS-compliant documentation. We keep you informed throughout.",
              },
              {
                num: "03",
                title: "You File, Client Collects",
                desc: "We deliver the complete credit study to you. You file Form 6765 with your client's return. Your client collects their credit. We provide full audit defense if the IRS ever questions it.",
              },
            ].map((step) => (
              <div key={step.num} className="border-l-4 border-emerald-600 pl-6">
                <div className="text-emerald-600 font-black text-lg mb-2">{step.num}</div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHO QUALIFIES — referral checklist
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">
                Who Qualifies
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-4">
                Which of Your Clients Should You Refer?
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                If your client answers yes to any of these, they likely qualify for the R&amp;D tax
                credit. When in doubt, refer them — our free assessment takes 30 minutes.
              </p>
              <div className="space-y-3">
                {[
                  "They manufacture a product or develop a manufacturing process",
                  "They write custom software for clients or internal operations",
                  "They design or engineer systems, structures, or equipment",
                  "They develop new formulas, compounds, or materials",
                  "They prototype or test new products before market",
                  "They spend money on contractors for technical work",
                  "They are improving an existing product or process",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80"
                alt="Professional meeting with client"
                width={800}
                height={600}
                className="object-cover w-full h-[420px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RESULTS — illustrative case studies
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
            alt="Modern office"
            width={1400}
            height={800}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-slate-900/90" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">
              Results
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-3">
              What Our CPA Partners Are Seeing
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Illustrative outcomes based on typical SC engagements. Actual results vary by client.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                amount: "$87K",
                type: "SC Manufacturing Client",
                detail:
                  "Federal and SC state credits combined. Client had never claimed the credit before. CPA referred after noticing process development activity.",
                period: "Current year",
              },
              {
                amount: "$142K",
                type: "SC Software Company",
                detail:
                  "Three years of amended returns plus current year. Client thought only pharmaceutical companies qualified.",
                period: "3-year lookback",
              },
              {
                amount: "$63K",
                type: "SC Engineering Firm",
                detail:
                  "Current year credit on structural engineering and design work. Completed in 45 days with full audit defense documentation.",
                period: "Current year",
              },
            ].map((study) => (
              <div
                key={study.type}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6"
              >
                <div className="text-3xl font-black text-emerald-400 mb-1">{study.amount}</div>
                <div className="text-white font-bold text-sm mb-3">{study.type}</div>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">{study.detail}</p>
                <span className="inline-block bg-white/10 text-slate-300 text-xs font-medium px-2 py-1 rounded">
                  {study.period}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-xs mt-6">
            These examples are illustrative and based on typical engagement profiles. Individual results
            depend on qualifying activities, expenses, and tax situation.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PARTNER FORM
      ═══════════════════════════════════════════ */}
      <section id="partner-form" className="py-20 px-6 bg-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-4">Become a CreditPath Partner</h2>
            <p className="text-emerald-100 text-lg">
              Tell us about your practice and we&apos;ll reach out to discuss the partnership. No
              commitment required.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <CpaPartnerForm />
          </div>
        </div>
      </section>
    </div>
  );
}
