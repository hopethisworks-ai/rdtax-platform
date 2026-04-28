import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alexander & Blake | R&D Tax Credit Advisory — South Carolina",
  description:
    "Alexander & Blake is a specialist advisory firm helping innovative South Carolina businesses identify qualifying R&D activities, prepare structured credit studies, and coordinate filing with CPA support.",
};

/* ── Icon Components ── */
const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  </svg>
);

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-navy leading-[1.1] mb-8">
                Structured Credit Studies.{" "}
                <span className="text-primary">Built for Review.</span>
              </h1>
              <p className="text-lg text-secondary mb-10 leading-relaxed max-w-lg">
                <span className="hidden sm:inline">Alexander &amp; Blake helps innovative South Carolina businesses identify qualifying R&amp;D activities, build organized documentation, and coordinate CPA-ready filing support — so you can claim with confidence.</span>
                <span className="sm:hidden">We help SC businesses identify qualifying R&amp;D activities and build CPA-ready credit studies — so you can claim with confidence.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/contact" className="bg-primary text-white font-semibold px-8 py-4 rounded-lg text-center hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 min-h-[48px] flex items-center justify-center">
                  Schedule a Consultation
                </Link>
                <Link href="/estimator" className="border border-secondary/30 text-body-text font-semibold px-8 py-4 rounded-lg text-center hover:border-primary hover:text-primary transition-all min-h-[48px] flex items-center justify-center">
                  Estimate Your Credit
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-secondary flex-wrap">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  No upfront cost
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Examination support included
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
                  src="/visuals/hero-process.svg"
                  alt="Alexander & Blake credit study process — from eligibility assessment through delivered study package with project narratives, QRE schedules, and Form 6765 support"
                  width={560} height={440}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRUST STRIP
      ═══════════════════════════════════════════ */}
      <section className="py-6 px-6 bg-navy">
        <div className="trust-strip max-w-6xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <ShieldIcon />
            <span>Specialist R&amp;D credit focus</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldIcon />
            <span>Structured documentation &amp; QRE support</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldIcon />
            <span>CPA-coordinated filing workflow</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldIcon />
            <span>Secure client portal</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldIcon />
            <span>Examination support included</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OUR BACKGROUND
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary text-xs font-bold uppercase tracking-widest">Our Background</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-6">
            National-Firm R&amp;D Credit Experience. South Carolina Focus.
          </h2>
          <p className="text-body-text leading-relaxed max-w-3xl mx-auto">
            Alexander &amp; Blake was founded by a former R&amp;D tax credit consultant with experience at national advisory firms including Aprio and alliantgroup. Our work is built around structured eligibility analysis, technical interviews, QRE modeling, business component documentation, project narratives, and CPA-ready study preparation.
          </p>
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
              <p className="text-secondary text-sm leading-relaxed mb-4">South Carolina companies investing in product development, process improvement, or software — whether claiming the credit for the first time or seeking a more thorough advisory approach.</p>
              <span className="inline-flex items-center text-primary text-sm font-semibold group-hover:underline">Discuss a potential claim →</span>
            </Link>
            <Link href="/cpa-partners" className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">CPA Firms</h3>
              <p className="text-secondary text-sm leading-relaxed mb-4">You maintain the client relationship. We serve as a dedicated specialty resource — preparing the credit study, documentation, and filing support on your behalf.</p>
              <span className="inline-flex items-center text-primary text-sm font-semibold group-hover:underline">For CPA firms →</span>
            </Link>
            <Link href="/contact" className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">Early-Stage Companies</h3>
              <p className="text-secondary text-sm leading-relaxed mb-4">Pre-revenue or early-stage businesses may apply R&amp;D credits against payroll taxes — up to $500K per year under the PATH Act — even without income tax liability.</p>
              <span className="inline-flex items-center text-primary text-sm font-semibold group-hover:underline">Discuss a potential claim →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — WHAT CLIENTS RECEIVE
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
            <Image
              src="/visuals/deliverable-preview.svg"
              alt="Alexander & Blake credit study deliverable package — executive summary, project narratives, QRE schedules, methodology memo, and Form 6765 support"
              width={560} height={420}
              className="w-full h-auto"
            />
          </div>
          <div>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">What You Receive</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-6">A Complete, CPA-Ready Study Package.</h2>
            <p className="text-body-text leading-relaxed mb-8">
              Each engagement produces a structured work product designed to support the credit claim, facilitate CPA review, and withstand examination.
            </p>
            <div className="space-y-4">
              {[
                { title: "Executive Summary & Credit Computation", desc: "A clear overview of qualifying activities, credit calculations, and key findings for management and CPA review." },
                { title: "Project Narratives & Four-Part Test Documentation", desc: "Detailed written narratives documenting the technical uncertainty, process of experimentation, and technological basis for each qualifying project." },
                { title: "QRE Schedules & Financial Substantiation", desc: "Qualified research expense analysis across wages, contractor costs, and supplies — with supporting schedules for each business component." },
                { title: "Methodology Memo & Form 6765 Support", desc: "Comprehensive documentation of the computation method, allocation approach, and filing-ready materials for CPA integration." },
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
            <div className="mt-8">
              <Link href="/sample-deliverables" className="inline-flex items-center border border-primary text-primary font-semibold px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-all">
                View Sample Deliverables
              </Link>
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
              { num: "01", title: "Initial Conversation", desc: "A complimentary consultation to understand your business, review qualifying activities, and outline what a well-supported credit study would include.", icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg> },
              { num: "02", title: "Eligibility Review", desc: "We analyze your activities against the IRS four-part test to confirm qualification and identify the scope of the engagement.", icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
              { num: "03", title: "Interviews & Data", desc: "Guided technical interviews with your team and organized data collection through our secure portal — designed to minimize disruption.", icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg> },
              { num: "04", title: "Study & Documentation", desc: "Complete credit study with project narratives, QRE calculations, methodology memo, and structured documentation — organized for review.", icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg> },
              { num: "05", title: "Filing & Support", desc: "Coordinated delivery to your CPA with Form 6765 support, ongoing examination support, and post-filing assistance at no additional cost.", icon: <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg> },
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
          SECTION 5 — HOW FILING WORKS
      ═══════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary text-xs font-bold uppercase tracking-widest">Filing Workflow</span>
          <h2 className="text-2xl md:text-3xl font-normal text-navy mt-3 mb-4">How Filing Works</h2>
          <p className="text-body-text leading-relaxed max-w-2xl mx-auto mb-8">
            Alexander &amp; Blake prepares the credit study and supporting documentation. Your CPA or qualified tax professional reviews the filing posture and files the return. We coordinate directly throughout.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div className="bg-surface rounded-xl p-6">
              <div className="text-primary font-black text-sm mb-2">We Prepare</div>
              <p className="text-body-text text-sm leading-relaxed">Complete study package: project narratives, QRE schedules, methodology memo, and Form 6765 support.</p>
            </div>
            <div className="bg-surface rounded-xl p-6">
              <div className="text-primary font-black text-sm mb-2">Your CPA Files</div>
              <p className="text-body-text text-sm leading-relaxed">Reviews filing posture, integrates Form 6765 into the return, and files the credit claim.</p>
            </div>
            <div className="bg-surface rounded-xl p-6">
              <div className="text-primary font-black text-sm mb-2">We Support</div>
              <p className="text-body-text text-sm leading-relaxed">Ongoing examination support, correspondence support, and documentation at no additional cost.</p>
            </div>
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
                Our fee is paid only after your credit is filed. Our incentives are aligned with yours — we earn a percentage of credits we identify.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-left">
              <div className="text-3xl font-black text-primary mb-2">100%</div>
              <div className="text-navy font-bold text-sm mb-2">Examination Support</div>
              <p className="text-secondary text-sm leading-relaxed">
                Ongoing examination support is included with every credit study at no additional cost. We stand behind the work we prepare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7 — CASE STUDIES
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Engagement Examples</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-3">Illustrative Engagement Profiles</h2>
            <p className="text-secondary max-w-2xl mx-auto">Illustrative examples based on common R&amp;D credit engagement profiles. These examples are hypothetical and provided for educational purposes only. Individual results depend on qualifying activities, expenses, documentation, tax posture, and CPA review.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                industry: "SC Manufacturer",
                size: "22 employees",
                period: "Current year",
                amount: "$87K",
                details: [
                  "Identified qualifying process-improvement and custom tooling activity across three production lines",
                  "Conducted technical interviews with plant manager and engineering lead",
                  "Built wage and supply support schedules with project-level allocation",
                  "Prepared project narratives documenting uncertainty and experimentation for each qualifying activity",
                  "Coordinated federal and SC state credit filing with the client's CPA",
                  "Delivered complete study package with examination support included",
                ],
              },
              {
                industry: "SC Software Company",
                size: "40 engineers",
                period: "3-year lookback + current",
                amount: "$142K",
                details: [
                  "Client had never claimed the credit — believed only pharmaceutical companies qualified",
                  "Identified qualifying custom development, algorithm design, and platform engineering work",
                  "Evaluated three open tax years plus current year and prepared study materials for CPA-coordinated amended filings",
                  "Prepared business-component mapping across 12 qualifying software projects",
                  "Built QRE schedules with contractor and wage detail for each tax year",
                  "Prepared study materials for the client's CPA to support amended filings",
                ],
              },
              {
                industry: "SC Engineering Firm",
                size: "15 employees",
                period: "Current year",
                amount: "$63K",
                details: [
                  "Qualifying activities in structural engineering design, simulation, and prototype development",
                  "Completed technical interviews in two sessions with minimal disruption",
                  "Documented four-part test compliance for each qualifying project",
                  "Prepared methodology memo and QRE schedules",
                  "Study completed and delivered to CPA in 45 days",
                  "Federal and SC state credit coordinated in a single filing package",
                ],
              },
            ].map((study) => (
              <div key={study.industry} className="bg-surface border border-gray-200 rounded-2xl p-8">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <div className="text-navy font-bold">{study.industry}</div>
                    <div className="text-secondary text-xs">{study.size} · {study.period}</div>
                  </div>
                  <div className="text-2xl font-black text-primary">{study.amount}</div>
                </div>
                <div className="space-y-2">
                  {study.details.map((detail) => (
                    <div key={detail} className="flex items-start gap-2">
                      <CheckIcon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-body-text text-xs leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-secondary text-xs mt-8">Illustrative examples based on common R&amp;D credit engagement profiles. These examples are hypothetical and provided for educational purposes only. Individual results depend on qualifying activities, expenses, documentation, tax posture, and CPA review.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8 — SECURITY & DATA HANDLING
      ═══════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-surface border-y border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Security</span>
            <h2 className="text-2xl md:text-3xl font-normal text-navy mt-3">Your Data Is Handled with Care.</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Encrypted in transit and at rest", icon: <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg> },
              { label: "Secure client portal for file exchange", icon: <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" /></svg> },
              { label: "Role-based access controls", icon: <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" /></svg> },
              { label: "Records retained for examination support", icon: <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg> },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 border border-gray-200">{item.icon}</div>
                <p className="text-body-text text-sm leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-secondary text-xs mt-6">
            <Link href="/privacy" className="underline hover:text-primary transition-colors">Read our full Privacy Policy →</Link>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 9 — FAQ
      ═══════════════════════════════════════════ */}
      <section id="faq" className="py-24 px-6 bg-white">
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
              { q: "Do you coordinate with CPA firms?", a: "Yes — CPA coordination is a core part of how we work. We prepare the complete credit study and deliver it to your CPA with Form 6765 support, methodology documentation, and filing-ready schedules. Your CPA reviews the filing posture and files the return." },
              { q: "What states do you serve?", a: "We focus on South Carolina, where an additional state R&D credit can be coordinated alongside the federal benefit. Our understanding of SC industries, regulations, and the local business landscape allows us to provide more focused and relevant support." },
              { q: "What is the fee structure?", a: "We operate on a contingency basis — our fee is calculated as a percentage of credits successfully identified. There are no upfront costs, retainers, or hourly fees. If we identify no qualifying credits, there is no charge." },
              { q: "When are sensitive documents requested?", a: "Sensitive financial records are requested only after initial eligibility is established and the engagement scope is defined. All documents are exchanged through our secure client portal with encryption at rest and in transit." },
              { q: "Do you replace our CPA?", a: "No. We prepare the credit study and support package. Your CPA or qualified tax professional reviews filing posture and files the return." },
              { q: "Are you a CPA firm or law firm?", a: "No. Alexander & Blake is a specialty R&D credit advisory firm. We do not provide legal or tax advice and do not file returns." },
              { q: "How do you protect client data?", a: "Client data is encrypted at rest and in transit, exchanged through our secure portal, and protected by role-based access controls. Engagement records are retained for seven years to support examination support. See our Data Security page for details." },
            ].map((faq) => (
              <details key={faq.q} className="bg-surface rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow group border border-gray-100">
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
          SECTION 10 — CTA
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-navy mb-4">Request a Complimentary Consultation</h2>
          <p className="text-lg text-secondary mb-10">
            A brief conversation to understand your business, evaluate whether qualifying activities exist, and outline what a structured engagement would include. No obligation, no records required.
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
