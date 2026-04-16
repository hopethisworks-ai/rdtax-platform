import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CreditPath | South Carolina R&D Tax Credit Specialists",
  description:
    "CreditPath helps South Carolina businesses claim R&D tax credits. Free assessment, no upfront cost, full audit defense. Average credit recovered: $50K–$300K.",
};

/* ── Icon Components ── */
const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const CheckCircleSmall = () => (
  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const ArrowRight = () => (
  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
          Headline + subhead + dual CTA + proof strip
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
                South Carolina R&amp;D Tax Credit Specialists
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
                Turn Your Innovation Into Tax Savings.
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                We identify, document, and defend R&amp;D tax credits for South Carolina businesses — so you get every dollar you&apos;re owed, with zero upfront cost.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/contact" className="bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-center hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/25">
                  Get Free Assessment
                </Link>
                <Link href="/estimator" className="border-2 border-slate-300 text-slate-700 font-bold px-8 py-4 rounded-xl text-center hover:border-emerald-600 hover:text-emerald-600 transition-colors">
                  Estimate My Credit
                </Link>
              </div>
              {/* Proof strip */}
              <div className="flex items-center gap-5 text-sm text-slate-500 flex-wrap">
                <div className="flex items-center gap-1.5"><CheckCircleSmall /> No upfront cost</div>
                <div className="flex items-center gap-1.5"><CheckCircleSmall /> Full audit defense</div>
                <div className="flex items-center gap-1.5"><CheckCircleSmall /> 60-day turnaround</div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                  alt="Business professionals reviewing financial strategy"
                  width={800} height={550}
                  className="object-cover w-full h-[400px] md:h-[480px]"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white rounded-xl p-5 shadow-xl">
                <div className="text-3xl font-black">$50K–$300K</div>
                <p className="text-slate-400 text-sm mt-1">Avg. Credit Recovered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — WHO WE HELP
          Three audience cards
      ═══════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Who We Help</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-3">R&amp;D Credits for Every Stage</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/contact" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Businesses Claiming Credits</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">Established SC companies developing new products, processes, or software — we identify every qualifying activity and maximize your credit.</p>
              <span className="inline-flex items-center text-emerald-400 text-sm font-semibold group-hover:underline">Get assessed <ArrowRight /></span>
            </Link>
            <Link href="/cpa-partners" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">CPA Firms Needing a Partner</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">You keep the client relationship. We handle the specialty R&amp;D credit work — studies, documentation, and audit defense — on a contingency basis.</p>
              <span className="inline-flex items-center text-emerald-400 text-sm font-semibold group-hover:underline">Partner with us <ArrowRight /></span>
            </Link>
            <Link href="/contact" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Startups Using Payroll Offset</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">Pre-revenue or early-stage? Qualifying startups can apply R&amp;D credits against payroll taxes — up to $500K per year under the PATH Act.</p>
              <span className="inline-flex items-center text-emerald-400 text-sm font-semibold group-hover:underline">Learn more <ArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — HOW IT WORKS
          5-step process matching spec
      ═══════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">From Discovery to Filing in 60 Days</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { num: "01", title: "Discovery", desc: "Free 30-minute call to understand your business and estimate potential credit.", icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg> },
              { num: "02", title: "Eligibility Review", desc: "We analyze your activities against the IRS four-part test to confirm qualification.", icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
              { num: "03", title: "Interviews & Data", desc: "Technical interviews with your team plus secure data collection through our portal.", icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg> },
              { num: "04", title: "Calculation & Report", desc: "Engineering analysis, QRE calculation, and a complete IRS-compliant credit study.", icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg> },
              { num: "05", title: "Filing Support", desc: "We coordinate with your CPA to file and provide full audit defense if needed.", icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg> },
            ].map((step) => (
              <div key={step.num}>
                <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">{step.icon}</div>
                <div className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-2">Step {step.num}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — SERVICES
          Federal, State, Amended, Payroll Offset, Audit
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-3">Comprehensive R&amp;D Tax Credit Services</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From initial identification through filing and audit defense — we cover the full lifecycle of your R&amp;D credit.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              { title: "Federal R&D Credit", desc: "IRC Section 41 credit studies with full engineering analysis and QRE calculations.", icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21" /></svg> },
              { title: "SC State Credits", desc: "South Carolina offers additional R&D credits that stack on top of your federal benefit.", icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg> },
              { title: "Amended Returns", desc: "Claim credits for up to 3 prior open tax years — recover money you already left behind.", icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
              { title: "Payroll Tax Offset", desc: "Qualifying startups can offset up to $500K/year in payroll taxes under the PATH Act.", icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
              { title: "Audit Support", desc: "Every study includes full IRS audit defense — documentation, representation, and resolution.", icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg> },
            ].map((svc) => (
              <div key={svc.title} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">{svc.icon}</div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{svc.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — WHY CHOOSE US
          Specialized, Defensible, Streamlined, CPA-friendly
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
              alt="Professional analyzing financial documents"
              width={800} height={600}
              className="object-cover w-full h-[380px]"
            />
          </div>
          <div>
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Why CreditPath</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-6">A Defensible Approach. Built for Your CPA.</h2>
            <div className="space-y-5">
              {[
                { title: "Specialized Experience", desc: "We focus exclusively on R&D tax credits — not general tax prep. Deep specialization means higher-quality studies." },
                { title: "Defensible Methodology", desc: "Every study follows IRS Audit Techniques Guidelines (ATG) and the four-part test. Built to withstand scrutiny." },
                { title: "Streamlined Process", desc: "Secure portal, guided data collection, and a dedicated analyst. Minimal disruption to your operations." },
                { title: "CPA-Friendly Delivery", desc: "Deliverables are designed for your CPA — Form 6765 support, contemporaneous documentation, and filing coordination." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1"><CheckIcon className="w-5 h-5 text-emerald-600" /></div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — PROOF
          Anonymized outcomes (honest, with disclaimer)
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80" alt="Modern office" width={1400} height={800} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-slate-900/90" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Results</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-3">What R&amp;D Credits Look Like in Practice</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Illustrative outcomes based on typical SC engagements. Actual results vary by business.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { amount: "$87K", type: "Manufacturing Firm", detail: "Federal + SC state credits combined. 22 employees, custom tooling and process development.", period: "Current year" },
              { amount: "$142K", type: "Software Company", detail: "Three-year amended returns recovered credits from open tax years. 40 engineers on staff.", period: "3-year lookback" },
              { amount: "$63K", type: "Engineering Firm", detail: "Prototype development and simulation activities. Study completed in 45 days.", period: "Current year" },
            ].map((study) => (
              <div key={study.type} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                <div className="text-3xl font-black text-emerald-400 mb-1">{study.amount}</div>
                <div className="text-white font-bold text-sm mb-3">{study.type}</div>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">{study.detail}</p>
                <span className="inline-block bg-white/10 text-slate-300 text-xs font-medium px-2 py-1 rounded">{study.period}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-xs mt-6">These examples are illustrative and based on typical engagement profiles. Individual results depend on qualifying activities, expenses, and tax situation.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7 — FAQ
          Matches spec questions
      ═══════════════════════════════════════════ */}
      <section id="faq" className="py-20 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Common Questions</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "What activities qualify for the R&D tax credit?", a: "Any activity that involves developing new or improved products, processes, software, techniques, formulas, or inventions may qualify — even in traditional industries like manufacturing and food production. The IRS uses a four-part test: permitted purpose, technological in nature, elimination of uncertainty, and process of experimentation." },
              { q: "How long does the process take?", a: "From initial discovery call to a completed credit study typically takes 60 days. The assessment itself takes about 30 minutes. Data collection is handled through our secure portal with minimal disruption to your team." },
              { q: "What documentation is needed?", a: "We typically need payroll records, contractor invoices, project descriptions, and general ledger data. Our portal guides you through exactly what's needed, and our team handles the heavy lifting of organizing and analyzing the data." },
              { q: "Do you work with CPA firms?", a: "Yes — CPA partnerships are a core part of our model. We handle the specialty R&D credit work while you maintain the client relationship. Our deliverables are designed for seamless CPA integration, including Form 6765 support and filing coordination." },
              { q: "What states do you cover?", a: "We specialize in South Carolina, which offers additional state R&D credits that stack on top of the federal benefit. Our deep knowledge of SC industries, regulations, and the local business landscape allows us to maximize credits for SC-based companies." },
              { q: "How much does it cost?", a: "Zero upfront cost. We work on a 20% contingency basis — we only earn a fee from credits we successfully identify. If we don't find qualifying credits, you owe nothing." },
            ].map((faq) => (
              <details key={faq.q} className="bg-white rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow group border border-slate-100">
                <summary className="flex items-center justify-between font-bold text-slate-900">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-emerald-600 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-slate-600 mt-3 leading-relaxed text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8 — CTA BANNER
      ═══════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Not Sure If You Qualify? Let&apos;s Review Your Facts.</h2>
          <p className="text-lg text-emerald-100 mb-8">
            Free 30-minute assessment. No obligation, no upfront cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-emerald-600 font-bold px-10 py-4 rounded-xl text-lg hover:bg-slate-50 transition-colors shadow-lg">
              Schedule Free Assessment
            </Link>
            <Link href="/estimator" className="border-2 border-white/40 text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-white/10 transition-colors">
              Estimate My Credit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
