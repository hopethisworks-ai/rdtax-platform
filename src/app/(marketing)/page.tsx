import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alexander & Blake | R&D Tax Credit Advisory — South Carolina",
  description:
    "Alexander & Blake is a specialist advisory firm helping innovative South Carolina businesses identify, document, and support R&D tax credits with precision and confidence.",
};

/* ── Icon Components ── */
const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO / BRAND PROMISE
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white/50 to-surface/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(44,122,123,0.08),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-surface border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                R&amp;D Tax Credit Advisory
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-navy leading-[1.1] mb-8">
                Carefully Prepared Credit Studies.{" "}
                <span className="text-primary">Built for Confidence.</span>
              </h1>
              <p className="text-lg text-secondary mb-10 leading-relaxed max-w-lg">
                Alexander &amp; Blake helps innovative South Carolina businesses identify qualifying R&amp;D activities, prepare well-supported credit studies, and coordinate filing with clarity and care — so you can claim with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/contact" className="bg-primary text-white font-semibold px-8 py-4 rounded-lg text-center hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30">
                  Schedule a Consultation
                </Link>
                <Link href="/estimator" className="border border-secondary/30 text-body-text font-semibold px-8 py-4 rounded-lg text-center hover:border-primary hover:text-primary transition-all">
                  Estimate Your Credit
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-secondary flex-wrap">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Structured documentation
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Coordinated filing support
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Federal + SC state credits
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                  alt="Business professionals reviewing financial strategy"
                  width={800} height={550}
                  className="object-cover w-full h-[400px] md:h-[500px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — WHO WE WORK WITH
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Who We Work With</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3">Companies Doing Technical Work.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/contact" className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">Established Businesses</h3>
              <p className="text-secondary text-sm leading-relaxed mb-4">South Carolina companies investing in product development, process improvement, or software — whether claiming the credit for the first time or seeking a more thoughtful advisory approach.</p>
              <span className="inline-flex items-center text-primary text-sm font-semibold group-hover:underline">Learn more →</span>
            </Link>
            <Link href="/cpa-partners" className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">CPA Firms</h3>
              <p className="text-secondary text-sm leading-relaxed mb-4">You maintain the client relationship. We serve as a dedicated specialty resource — preparing the credit study, documentation, and filing support on your behalf.</p>
              <span className="inline-flex items-center text-primary text-sm font-semibold group-hover:underline">Explore our partnership →</span>
            </Link>
            <Link href="/contact" className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">Early-Stage Companies</h3>
              <p className="text-secondary text-sm leading-relaxed mb-4">Pre-revenue or early-stage businesses may apply R&amp;D credits against payroll taxes — up to $500K per year under the PATH Act — even without income tax liability.</p>
              <span className="inline-flex items-center text-primary text-sm font-semibold group-hover:underline">Learn more →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — WHAT MAKES OUR PROCESS DIFFERENT
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
              alt="Professional reviewing financial documents"
              width={800} height={600}
              className="object-cover w-full h-[380px]"
            />
          </div>
          <div>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-6">Careful Analysis. Clear Documentation. Quiet Confidence.</h2>
            <p className="text-body-text leading-relaxed mb-8">
              We believe strong R&amp;D credit work should reflect the seriousness of the underlying business. That means understanding how your company actually operates, identifying qualifying activities with care, and producing support that is organized, substantiated, and thoughtfully prepared.
            </p>
            <div className="space-y-5">
              {[
                { title: "Specialized Focus", desc: "R&D tax credits are not a side service — they are the core focus of our firm. That concentration produces a higher standard of work." },
                { title: "Documentation-Driven Process", desc: "Well-prepared project narratives, thorough financial substantiation, and structured technical documentation — organized for clarity and built for review." },
                { title: "Coordinated Filing Support", desc: "We work directly with your CPA to deliver Form 6765 support, contemporaneous documentation, and clear filing coordination." },
                { title: "Prepared for Examination", desc: "Every engagement is prepared with the expectation that the work may one day be reviewed. That standard shapes how we conduct interviews, organize support, and present the final deliverable." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1"><CheckIcon className="w-5 h-5 text-primary" /></div>
                  <div>
                    <h3 className="font-bold text-navy text-sm">{item.title}</h3>
                    <p className="text-body-text text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — HOW THE PROCESS WORKS
      ═══════════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3">From Initial Conversation to Completed Study.</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { num: "01", title: "Initial Conversation", desc: "A complimentary consultation to understand your business, review qualifying activities, and discuss what a well-supported credit study would look like.", icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg> },
              { num: "02", title: "Eligibility Review", desc: "We analyze your activities against the IRS four-part test to confirm qualification and identify the scope of the engagement.", icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
              { num: "03", title: "Interviews & Data", desc: "Guided technical interviews with your team and organized data collection through our secure portal — designed to minimize disruption.", icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg> },
              { num: "04", title: "Study & Documentation", desc: "Complete credit study with project narratives, QRE calculations, and structured documentation — prepared with care and organized for review.", icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg> },
              { num: "05", title: "Filing & Support", desc: "Coordinated delivery to your CPA for filing, with ongoing audit support included at no additional cost.", icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg> },
            ].map((step) => (
              <div key={step.num}>
                <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center mb-4 border border-gray-200">{step.icon}</div>
                <div className="text-xs font-black text-primary uppercase tracking-widest mb-2">Step {step.num}</div>
                <h3 className="text-base font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — SERVICES OVERVIEW
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-3">Full-Lifecycle Credit Advisory</h2>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              From initial identification through filing and ongoing support — we manage the complete R&amp;D tax credit engagement.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              { title: "Federal R&D Credit", desc: "IRC Section 41 credit studies with complete engineering analysis, QRE calculations, and structured documentation.", icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21" /></svg> },
              { title: "SC State Credits", desc: "South Carolina offers additional R&D credits that can be coordinated alongside your federal benefit.", icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg> },
              { title: "Amended Returns", desc: "Up to three years of open tax returns may be eligible for amended filing — recovering credits from prior years.", icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
              { title: "Payroll Tax Offset", desc: "Qualifying early-stage companies can apply credits against payroll taxes — up to $500K per year under the PATH Act.", icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
              { title: "Audit Support", desc: "Every study includes ongoing audit support — documentation, representation, and resolution at no additional cost.", icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg> },
            ].map((svc) => (
              <div key={svc.title} className="bg-surface border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-3 border border-gray-100">{svc.icon}</div>
                <h3 className="text-sm font-bold text-navy mb-2">{svc.title}</h3>
                <p className="text-body-text text-xs leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — ENGAGEMENT MODEL
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface border-y border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary text-xs font-bold uppercase tracking-widest">Our Model</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-4">Aligned Incentives. Clear Terms.</h2>
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
                We earn a percentage of the credits we identify. Our fee is paid only after your credit is filed. Our incentives are aligned with yours.
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
          SECTION 7 — REPRESENTATIVE OUTCOMES
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Representative Outcomes</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-3">What Typical Engagements Look Like</h2>
            <p className="text-secondary max-w-2xl mx-auto">Illustrative examples based on typical South Carolina engagements. Individual outcomes depend on qualifying activities and expenses.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { amount: "$87K", type: "Manufacturing Firm", detail: "Federal and SC state credits combined. 22 employees, with qualifying activities in custom tooling and process development.", period: "Current year" },
              { amount: "$142K", type: "Software Company", detail: "Three years of amended returns recovered credits from open tax years. 40 engineers engaged in qualifying development work.", period: "3-year lookback" },
              { amount: "$63K", type: "Engineering Firm", detail: "Qualifying activities in prototype development and simulation. Study completed and delivered in 45 days.", period: "Current year" },
            ].map((study) => (
              <div key={study.type} className="bg-surface border border-gray-200 rounded-2xl p-8">
                <div className="text-3xl font-black text-primary mb-1">{study.amount}</div>
                <div className="text-navy font-bold text-sm mb-3">{study.type}</div>
                <p className="text-secondary text-sm leading-relaxed mb-4">{study.detail}</p>
                <span className="inline-block bg-white text-primary text-xs font-medium px-3 py-1 rounded-full border border-gray-100">{study.period}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-secondary text-xs mt-8">These examples are illustrative and based on typical engagement profiles. Individual results depend on qualifying activities, expenses, and tax situation.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8 — FAQ
      ═══════════════════════════════════════════ */}
      <section id="faq" className="py-24 px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Common Questions</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "What activities qualify for the R&D tax credit?", a: "Any activity that involves developing new or improved products, processes, software, techniques, formulas, or inventions may qualify — including in traditional industries like manufacturing, food production, and construction. The IRS evaluates qualification using a four-part test: permitted purpose, technological in nature, elimination of uncertainty, and process of experimentation." },
              { q: "How long does the process take?", a: "From the initial conversation to a completed credit study typically takes approximately 60 days. The complimentary consultation takes about 30 minutes. Data collection is managed through our secure portal and is designed to require minimal time from your team." },
              { q: "What documentation is required?", a: "We typically work with payroll records, contractor invoices, project descriptions, and general ledger data. Our portal provides a guided checklist, and our team manages the organization and analysis of all materials on your behalf." },
              { q: "Do you coordinate with CPA firms?", a: "Yes — CPA coordination is a core part of how we work. We serve as a dedicated specialty resource, delivering complete credit studies with Form 6765 support and clear filing documentation. Many of our engagements are referred through CPA relationships." },
              { q: "What states do you serve?", a: "We focus on South Carolina, where an additional state R&D credit can be coordinated alongside the federal benefit. Our understanding of SC industries, regulations, and the local business landscape allows us to provide more focused and relevant support." },
              { q: "What is the fee structure?", a: "We operate on a contingency basis — our fee is calculated as a percentage of credits successfully identified. There are no upfront costs, retainers, or hourly fees. If we identify no qualifying credits, there is no charge." },
            ].map((faq) => (
              <details key={faq.q} className="bg-white rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow group border border-gray-100">
                <summary className="flex items-center justify-between font-bold text-navy">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-primary group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-body-text mt-3 leading-relaxed text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 9 — CTA
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-navy mb-4">Request a Complimentary Consultation</h2>
          <p className="text-lg text-secondary mb-10">
            A brief conversation to understand your business, evaluate whether meaningful credits may be available, and outline what a well-supported engagement would look like. No obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-primary text-white font-semibold px-10 py-4 rounded-xl text-lg hover:bg-primary-dark transition-colors shadow-md">
              Schedule a Consultation
            </Link>
            <Link href="/estimator" className="border border-secondary/30 text-body-text font-semibold px-10 py-4 rounded-xl text-lg hover:border-primary hover:text-primary transition-colors">
              Estimate Your Credit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
