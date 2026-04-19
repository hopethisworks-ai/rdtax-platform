import Link from "next/link";
import Image from "next/image";
import CpaPartnerForm from "./CpaPartnerForm";

export const metadata = {
  title: "CPA Partners | Alexander & Blake — R&D Tax Credit Advisory",
  description:
    "Partner with Alexander & Blake to deliver R&D tax credit studies to your clients. We serve as your dedicated specialty resource — you retain the client relationship.",
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
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-surface">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-surface text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
                For Accounting Professionals
              </span>
              <h1 className="text-4xl md:text-5xl font-normal text-navy leading-tight mb-6">
                A Specialist R&amp;D Credit Resource for Your Firm
              </h1>
              <p className="text-lg text-body-text mb-8 leading-relaxed max-w-lg">
                Alexander &amp; Blake works alongside accounting firms that want a reliable specialist partner for R&amp;D tax credit studies and related documentation. You maintain the client relationship. We handle the specialty work and coordinate closely throughout the engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#partner-form"
                  className="bg-primary text-white font-semibold px-8 py-4 rounded-xl text-center hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
                >
                  Explore a Partnership
                </Link>
                <Link
                  href="/how-it-works"
                  className="border-2 border-secondary/30 text-body-text font-bold px-8 py-4 rounded-xl text-center hover:border-primary hover:text-primary transition-colors"
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
          WHY PARTNER
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              How We Work Together
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3">
              Specialist Support for Trusted Advisors.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Your Client, Your Relationship",
                desc: "We never solicit your clients for other services. We function as an extension of your practice — a specialty resource, not a competitor.",
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                ),
              },
              {
                title: "Complete Technical Execution",
                desc: "R&D credit studies require careful technical documentation and structured analysis. We manage the entire process — you review and approve.",
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                ),
              },
              {
                title: "Documentation Built for Review",
                desc: "Every study is prepared with structured project narratives, four-part test documentation, and thorough financial substantiation — organized for clarity and prepared with review in mind.",
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                ),
              },
              {
                title: "Clear Engagement Economics",
                desc: "Our fee is typically contingency-based and paid after filing, with no upfront cost to your firm or your client in most engagements.",
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                ),
              },
              {
                title: "Organized Delivery",
                desc: "We run a structured process designed to minimize disruption, provide visibility throughout the engagement, and deliver the completed study on a practical timeline.",
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                ),
              },
              {
                title: "South Carolina Focused",
                desc: "We specialize in SC businesses and coordinate the federal credit alongside the SC state credit for comprehensive benefit.",
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-surface border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-bold text-navy mb-2">{card.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS — 3-step CPA flow
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3">
              A Straightforward Engagement Process
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "You Identify an Opportunity",
                desc: "Consider which clients may have qualifying activities — product development, process improvement, software engineering, or technical design work. We can help evaluate whether an engagement makes sense.",
              },
              {
                num: "02",
                title: "We Prepare the Study",
                desc: "We conduct technical interviews, collect financial data through our secure portal, and prepare a complete credit study with structured documentation. You receive visibility throughout the engagement.",
              },
              {
                num: "03",
                title: "You File with Confidence",
                desc: "We deliver the completed study, supporting schedules, and Form 6765 materials to your team for filing coordination. Ongoing support is included if questions arise later.",
              },
            ].map((step) => (
              <div key={step.num} className="border-l-4 border-primary pl-6">
                <div className="text-primary font-black text-lg mb-2">{step.num}</div>
                <h3 className="font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{step.desc}</p>
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
              <span className="text-primary text-xs font-bold uppercase tracking-widest">
                Who Qualifies
              </span>
              <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-4">
                Which Clients May Have Qualifying Activities?
              </h2>
              <p className="text-body-text mb-6 leading-relaxed">
                If any of the following describe a client&apos;s business, there is a reasonable chance qualifying R&amp;D activities exist. We are happy to evaluate and advise — the initial conversation is complimentary.
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
                    <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-body-text text-sm">{item}</span>
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
          WHAT WE NEED FROM THE CPA
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary text-xs font-bold uppercase tracking-widest">
            Your Role
          </span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-4">
            What We Need From the CPA
          </h2>
          <p className="text-body-text leading-relaxed max-w-2xl mx-auto">
            In most engagements, we ask the CPA to help confirm filing posture, prior-year credit history, and any relevant return details. We handle the specialty R&amp;D work so your team does not need to build an internal process from scratch.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RESULTS — illustrative case studies
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80"
            alt="Professional consulting session"
            width={1400}
            height={800}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-slate-800/80" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              Results
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-white mt-3 mb-3">
              Representative Partner Engagement Outcomes
            </h2>
            <p className="text-secondary max-w-2xl mx-auto">
              Illustrative examples based on representative South Carolina engagements. Actual outcomes depend on the client&apos;s facts, qualifying activities, expenses, and filing posture.
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
                  "Current year credit on structural engineering and design work. Study completed and delivered in 45 days with structured documentation.",
                period: "Current year",
              },
            ].map((study) => (
              <div
                key={study.type}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6"
              >
                <div className="text-3xl font-black text-primary mb-1">{study.amount}</div>
                <div className="text-white font-bold text-sm mb-3">{study.type}</div>
                <p className="text-secondary text-sm leading-relaxed mb-3">{study.detail}</p>
                <span className="inline-block bg-white/10 text-slate-300 text-xs font-medium px-2 py-1 rounded">
                  {study.period}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-secondary text-xs mt-6">
            These examples are illustrative and based on typical engagement profiles. Individual results
            depend on qualifying activities, expenses, and tax situation.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PARTNER FORM
      ═══════════════════════════════════════════ */}
      <section id="partner-form" className="py-20 px-6 bg-surface border-t border-primary/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-normal text-navy mb-4">Start a Conversation</h2>
            <p className="text-secondary text-lg">
              Tell us about your practice and we&apos;ll reach out to discuss how we might work together. No commitment required.
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
