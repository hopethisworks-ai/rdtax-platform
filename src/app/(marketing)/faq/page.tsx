import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Alexander & Blake — R&D Tax Credit Advisory",
  description:
    "Common questions about R&D tax credits, the qualification process, documentation requirements, and how Alexander & Blake works with South Carolina businesses and their CPAs.",
};

export default function FAQPage() {
  const sections = [
    {
      heading: "Eligibility & Qualification",
      faqs: [
        {
          q: "What activities qualify for the R&D tax credit?",
          a: "Any activity that involves developing new or improved products, processes, software, techniques, formulas, or inventions may qualify — including in traditional industries like manufacturing, food production, and construction. The IRS evaluates qualification using a four-part test: permitted purpose, technological in nature, elimination of uncertainty, and process of experimentation.",
        },
        {
          q: "Does my company need to be in a 'high-tech' industry to qualify?",
          a: "No. The R&D tax credit applies broadly across industries. We work with manufacturers, software companies, engineering firms, food and beverage producers, construction companies, and many others. If your business is developing or improving products, processes, or software, there is a reasonable chance qualifying activities exist.",
        },
        {
          q: "What if we've never claimed the credit before?",
          a: "Many businesses that qualify have never claimed the credit — either because they weren't aware of it or assumed it didn't apply to their industry. If you have open tax returns from the past three years, we can evaluate whether amended returns may be appropriate to recover credits from prior periods.",
        },
        {
          q: "Do startups or pre-revenue companies qualify?",
          a: "Yes. Qualifying early-stage businesses can apply R&D credits against payroll taxes — up to $500,000 per year under the PATH Act — even without income tax liability. This applies to companies with less than $5 million in gross receipts and fewer than five years of revenue history.",
        },
      ],
    },
    {
      heading: "Our Process",
      faqs: [
        {
          q: "How long does the process take?",
          a: "From the initial conversation to a completed credit study typically takes approximately 60 days. The complimentary consultation takes about 30 minutes. Data collection is managed through our secure portal and is designed to require minimal time from your team.",
        },
        {
          q: "What documentation is required from our side?",
          a: "We typically work with payroll records, contractor invoices, project descriptions, and general ledger data. Our portal provides a guided checklist tailored to your business, and our team manages the organization and analysis of all materials on your behalf.",
        },
        {
          q: "How much time will this take from our team?",
          a: "We've designed our process to minimize disruption. After an initial consultation, the primary time commitment involves one or two guided technical interviews with your project leads and uploading financial documents through our secure portal. Most clients find the process requires only a few hours of their team's time over the course of the engagement.",
        },
        {
          q: "What does the final deliverable look like?",
          a: "You receive a comprehensive credit study that includes an executive summary, detailed project narratives for each qualifying activity, a methodology memo outlining our analytical approach, QRE calculations, and Form 6765 preparation support — all organized for clarity and built for review.",
        },
      ],
    },
    {
      heading: "Fees & Engagement",
      faqs: [
        {
          q: "What is the fee structure?",
          a: "We operate on a contingency basis — our fee is calculated as a percentage of credits successfully identified. There are no upfront costs, retainers, or hourly fees. If we identify no qualifying credits, there is no charge.",
        },
        {
          q: "Is the initial consultation really free?",
          a: "Yes. The initial conversation is complimentary and carries no obligation. We use this time to understand your business, review potential qualifying activities, and provide a preliminary assessment of whether an engagement makes sense.",
        },
        {
          q: "What happens if we're audited?",
          a: "Every credit study we prepare includes ongoing audit support at no additional cost. Our documentation is structured from day one with the expectation that it may be reviewed. If the IRS examines your credit, we provide full representation and work toward resolution on your behalf.",
        },
      ],
    },
    {
      heading: "Working With CPAs",
      faqs: [
        {
          q: "Do you coordinate with our CPA?",
          a: "Yes — CPA coordination is a core part of how we work. We deliver the completed credit study with Form 6765 support and clear filing documentation directly to your CPA. Many of our engagements are referred through CPA relationships, and we serve as a dedicated specialty resource rather than a competing practice.",
        },
        {
          q: "Can CPA firms partner with Alexander & Blake?",
          a: "Absolutely. We work with accounting firms across South Carolina as a specialty advisory partner. You maintain the client relationship, and we handle the technical R&D credit work — from initial assessment through documentation and filing support. There is no cost to the CPA firm, and the engagement operates on a contingency basis with the client.",
        },
      ],
    },
    {
      heading: "South Carolina Specific",
      faqs: [
        {
          q: "What states do you serve?",
          a: "We focus on South Carolina, where an additional state R&D credit can be coordinated alongside the federal benefit. Our understanding of SC industries, regulations, and the local business landscape allows us to provide more focused and relevant advisory support.",
        },
        {
          q: "How does the South Carolina state credit work?",
          a: "South Carolina offers its own R&D tax credit under SC Code Section 12-6-3415, which can be claimed in addition to the federal credit. We identify and document both credits simultaneously as part of every engagement, coordinating with the SC Department of Revenue as needed.",
        },
        {
          q: "What industries in South Carolina typically qualify?",
          a: "We work with SC businesses across manufacturing, software and technology, engineering and architecture, life sciences, food and beverage, agriculture, and construction. Any company engaged in developing or improving products, processes, or software may have qualifying activities worth evaluating.",
        },
      ],
    },
  ];

  return (
    <div className="bg-white">
      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Common Questions</span>
          <h1 className="text-4xl md:text-5xl font-normal text-navy mt-4 mb-6 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-secondary leading-relaxed max-w-2xl mx-auto">
            Answers to the questions we hear most often about R&amp;D tax credits, how the process works, and what to expect from an engagement with Alexander &amp; Blake.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ SECTIONS
      ═══════════════════════════════════════════ */}
      {sections.map((section, idx) => (
        <section
          key={section.heading}
          className={`py-16 px-6 ${idx % 2 === 0 ? "bg-surface" : "bg-white"}`}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-normal text-navy mb-8">{section.heading}</h2>
            <div className="space-y-3">
              {section.faqs.map((faq) => (
                <details
                  key={faq.q}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-surface"} rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow group border border-gray-100`}
                >
                  <summary className="flex items-center justify-between font-bold text-navy text-sm md:text-base">
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
      ))}

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-navy mb-4">Still Have Questions?</h2>
          <p className="text-lg text-secondary mb-8 leading-relaxed">
            We&apos;re happy to discuss your specific situation. The initial conversation is complimentary and carries no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-white font-semibold px-10 py-4 rounded-xl text-lg hover:bg-primary-dark transition-colors shadow-md"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/eligibility"
              className="border border-secondary/30 text-body-text font-semibold px-10 py-4 rounded-xl text-lg hover:border-primary hover:text-primary transition-colors"
            >
              Evaluate Eligibility
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
