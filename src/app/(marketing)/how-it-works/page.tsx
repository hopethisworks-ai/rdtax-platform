import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Our Process | Alexander & Blake — R&D Tax Credit Advisory",
  description:
    "Alexander & Blake's structured five-step process takes South Carolina businesses from initial conversation to a carefully prepared, well-supported credit study.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Initial Conversation",
      duration: "30 minutes",
      desc: "A complimentary consultation to understand your business, review potential qualifying activities, and discuss what a well-supported engagement would look like.",
      items: [
        "Online credit estimator",
        "Free 30-min consultation call",
        "Preliminary qualification assessment",
        "Credit range estimate",
      ],
    },
    {
      number: "02",
      title: "Engagement Kickoff",
      duration: "1-2 days",
      desc: "Upon executing the engagement letter, you receive secure portal access and a document checklist tailored to your business and industry.",
      items: [
        "Signed engagement letter",
        "Secure client portal access",
        "Customized document checklist",
        "Dedicated analyst assigned",
      ],
    },
    {
      number: "03",
      title: "Data Collection",
      duration: "1-2 weeks",
      desc: "Upload payroll records, contractor agreements, and project data through our secure portal. Your dedicated analyst guides the process.",
      items: [
        "Payroll data upload",
        "Contractor agreements",
        "Project qualification questionnaires",
        "Four-part test interviews",
      ],
    },
    {
      number: "04",
      title: "Credit Analysis",
      duration: "2-3 weeks",
      desc: "Our team maps your data to qualifying activities, applies IRS criteria, and prepares a thorough credit calculation with supporting documentation.",
      items: [
        "Business component mapping",
        "Four-part test analysis",
        "Wage QRE calculation",
        "Contractor analysis",
        "ASC vs Regular method comparison",
      ],
    },
    {
      number: "05",
      title: "Report and Filing",
      duration: "1 week",
      desc: "You receive a carefully prepared credit study with complete documentation. We coordinate directly with your CPA for filing and provide ongoing audit support.",
      items: [
        "Executive summary report",
        "Project narratives",
        "Methodology memo",
        "Form 6765 preparation",
        "Full audit defense coverage",
      ],
    },
  ];

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
                The Process
              </span>
              <h1 className="text-4xl md:text-5xl font-normal text-navy leading-tight mb-6">
                A Structured Process. From Conversation to Completed Study.
              </h1>
              <p className="text-lg text-body-text mb-8 leading-relaxed max-w-lg">
                We manage the full engagement — activity identification, technical documentation, credit calculation, coordinated filing, and ongoing audit support. Here is how the process works from initial conversation to delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-primary text-white font-semibold px-8 py-4 rounded-xl text-center hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
                >
                  Schedule a Consultation
                </Link>
                <Link
                  href="/estimator"
                  className="border border-secondary/30 text-body-text font-semibold px-8 py-4 rounded-xl text-center hover:border-primary hover:text-primary transition-colors"
                >
                  Estimate Your Credit
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80"
                alt="Team reviewing project timeline on whiteboard"
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
          KEY STATS BAR
      ═══════════════════════════════════════════ */}
      <section className="py-10 px-6 bg-surface border-y border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          <div>
            <div className="text-3xl font-black text-navy mb-1">30 min</div>
            <div className="text-secondary text-sm">Free assessment call</div>
          </div>
          <div>
            <div className="text-3xl font-black text-navy mb-1">60 days</div>
            <div className="text-secondary text-sm">Average to filing</div>
          </div>
          <div>
            <div className="text-3xl font-black text-navy mb-1">20%</div>
            <div className="text-secondary text-sm">Contingency fee only</div>
          </div>
          <div>
            <div className="text-3xl font-black text-navy mb-1">100%</div>
            <div className="text-secondary text-sm">Audit defense included</div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TIMELINE — 5 steps
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex gap-8 relative">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-white font-black text-sm">{step.number}</span>
                </div>
                {i < steps.length - 1 && <div className="w-0.5 bg-surface flex-1 my-2" />}
              </div>
              <div className={`flex-1 ${i < steps.length - 1 ? "pb-12" : ""}`}>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-xl font-black text-navy">{step.title}</h2>
                  <span className="text-xs bg-surface text-primary border border-primary/20 px-3 py-1 rounded-full font-semibold">
                    {step.duration}
                  </span>
                </div>
                <p className="text-body-text mb-4 leading-relaxed">{step.desc}</p>
                <div className="bg-surface border border-gray-200 rounded-xl p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {step.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-body-text">
                        <div className="w-4 h-4 bg-surface rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3 h-3 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHAT YOU GET — deliverables grid
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              What You Get
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3">
              What the Engagement Includes
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Complete Credit Study",
                desc: "A fully documented study including project narratives, methodology memo, and Form 6765 support — ready for your CPA to file.",
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                ),
              },
              {
                title: "Ongoing Audit Support",
                desc: "If the IRS ever reviews your credit, we provide full representation. Our documentation is prepared from day one with the expectation that it may be examined.",
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                ),
              },
              {
                title: "Secure Client Portal",
                desc: "Upload documents, track engagement status, and communicate with your analyst — all through your secure Alexander & Blake portal.",
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                ),
              },
              {
                title: "CPA Coordination",
                desc: "We work directly with your CPA to ensure seamless filing. We handle the specialty work — they handle the rest of your return.",
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                ),
              },
              {
                title: "Federal and SC Credits",
                desc: "We identify and document both the federal and SC state credit simultaneously, coordinating them for comprehensive benefit.",
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21" />
                  </svg>
                ),
              },
              {
                title: "Amended Returns",
                desc: "If you have not claimed credits in prior years, we can file amended returns going back 3 years to recover credits you already missed.",
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
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
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface border-t border-primary/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-navy mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-secondary mb-8">
            The initial consultation is complimentary and takes about 30 minutes. We&apos;ll review your business, evaluate potential qualifying activities, and outline what a well-supported engagement would look like.
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
