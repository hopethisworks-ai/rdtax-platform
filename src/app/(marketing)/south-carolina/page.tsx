import Link from "next/link";

export const metadata = {
  title: "South Carolina R&D Tax Credit | Alexander & Blake Advisory",
  description:
    "South Carolina offers a 5% state R&D tax credit that can be coordinated alongside the federal credit. Alexander & Blake prepares well-supported credit studies for SC manufacturers, software companies, engineers, and more.",
};

const CheckIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function SouthCarolinaPage() {
  return (
    <div className="bg-white">
      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="bg-navy">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-light text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-primary-light rounded-full" />
                South Carolina R&amp;D Tax Credit
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight mb-6">
                Federal and State Credits.{" "}
                <span className="text-primary-light">One Coordinated Study.</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                South Carolina may provide an additional 5% state R&amp;D credit for qualifying SC research expenses, subject to state rules, limitations, and CPA review. Alexander &amp; Blake prepares both credits through a single, coordinated engagement — so your business captures the full value without going through two disconnected processes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/estimator"
                  className="bg-primary text-white font-semibold px-8 py-4 rounded-xl text-lg text-center hover:bg-primary-dark transition-colors"
                >
                  Estimate Your Credit
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg text-center hover:bg-white/20 transition-colors"
                >
                  Schedule a Consultation
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "5%", label: "SC State Credit Rate on Qualifying Expenses" },
                { stat: "10 yrs", label: "Credit Carryforward Period" },
                { stat: "50%", label: "Max Credit vs SC Tax Liability" },
                { stat: "Federal+", label: "Coordinated With Federal Credit" },
              ].map((item) => (
                <div key={item.stat} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="text-3xl font-black text-white mb-1">{item.stat}</div>
                  <div className="text-primary-light text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW THE SC CREDIT FITS INTO THE STUDY
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-bold uppercase tracking-widest">One Engagement, Both Credits</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-4">
            How the South Carolina credit fits into the study.
          </h2>
          <p className="text-body-text text-lg leading-relaxed mb-8">
            The SC state credit follows federal qualification rules under IRC Section 41. That means the technical interviews, four-part test documentation, business component mapping, and QRE analysis we prepare for the federal credit also serve as the foundation for the state credit. Your business goes through one process, not two.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-surface rounded-xl p-6 border border-gray-200">
              <div className="text-primary font-black text-sm uppercase tracking-widest mb-3">Federal Credit</div>
              <p className="text-body-text text-sm leading-relaxed">
                We identify qualifying activities, conduct technical interviews, calculate QREs, and prepare the full study package — project narratives, methodology memo, and Form 6765 support.
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-primary/30">
              <div className="text-primary font-black text-sm uppercase tracking-widest mb-3">SC State Credit</div>
              <p className="text-body-text text-sm leading-relaxed">
                The same qualifying activities and expense analysis support the SC credit calculation. We prepare SC Schedule TC-18 documentation and coordinate state-specific filing with your CPA.
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-gray-200">
              <div className="text-primary font-black text-sm uppercase tracking-widest mb-3">CPA Delivery</div>
              <p className="text-body-text text-sm leading-relaxed">
                Your CPA receives one coordinated study package covering both federal and state credits — with filing support for Form 6765 and SC Schedule TC-18 in a single delivery.
              </p>
            </div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <p className="text-primary text-sm leading-relaxed">
              <span className="font-bold">The practical result:</span> SC businesses do not pay for or sit through two separate engagements. The federal qualification work naturally supports the state credit, and we coordinate both through one structured process.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY THIS MATTERS FOR SC COMPANIES
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">SC Industry Focus</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-3">
              Why this matters for South Carolina companies.
            </h2>
            <p className="text-secondary max-w-2xl mx-auto">
              South Carolina&apos;s economy is built on industries that routinely perform qualifying R&amp;D work — but many SC businesses have never explored the credit because they assume it only applies to labs or pharmaceutical companies.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                industry: "SC Manufacturers",
                desc: "Custom tooling, process improvement, new product development, materials testing, and production automation are among the most common qualifying activities we see in the Upstate and Midlands.",
                examples: "CNC programming, die design, quality system development, lean process engineering",
              },
              {
                industry: "SC Software & Technology",
                desc: "Custom application development, algorithm design, platform engineering, and systems integration work performed by Greenville, Charleston, and Columbia tech teams frequently qualifies.",
                examples: "API development, database architecture, UI/UX prototyping, cloud migration engineering",
              },
              {
                industry: "SC Engineering & Architecture",
                desc: "Structural design, simulation, civil engineering innovation, and prototype development performed by SC engineering firms often meet the four-part test.",
                examples: "Structural analysis, environmental engineering, load-bearing design, BIM modeling",
              },
              {
                industry: "SC Construction",
                desc: "Innovative building methods, structural problem-solving, prefabrication development, and energy-efficiency engineering performed by SC general contractors and specialty firms may qualify.",
                examples: "Modular construction methods, seismic design, sustainable materials testing",
              },
              {
                industry: "SC Food & Beverage",
                desc: "New product formulation, process optimization, shelf-life testing, packaging engineering, and USDA compliance work performed by SC food producers qualifies more often than most owners expect.",
                examples: "Recipe formulation, pasteurization optimization, quality control process development",
              },
              {
                industry: "SC Life Sciences & Biotech",
                desc: "Drug development, medical device prototyping, clinical protocol design, and laboratory process improvement performed by SC biotech firms are strong candidates for both credits.",
                examples: "Assay development, compound screening, regulatory pathway engineering",
              },
            ].map((item) => (
              <div key={item.industry} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-2">{item.industry}</h3>
                <p className="text-body-text text-sm leading-relaxed mb-3">{item.desc}</p>
                <p className="text-secondary text-xs"><span className="font-semibold">Common qualifying activities:</span> {item.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SC-SPECIFIC CASE STUDIES
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">SC Engagement Examples</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-3">
              How the coordinated credit works in practice.
            </h2>
            <p className="text-secondary max-w-2xl mx-auto">
              Illustrative examples based on common R&amp;D credit engagement profiles. These examples are hypothetical and provided for educational purposes only. Individual results depend on qualifying activities, expenses, documentation, tax posture, and CPA review.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Case Study 1 */}
            <div className="bg-surface border border-gray-200 rounded-2xl overflow-hidden">
              <div className="bg-navy p-6">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-white font-bold">Upstate Manufacturer</div>
                    <div className="text-slate-400 text-xs">22 employees · Spartanburg area</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-primary-light">$101K</div>
                    <div className="text-slate-400 text-xs">Combined credits</div>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Federal Credit Identified</div>
                  <div className="space-y-1.5">
                    {[
                      "Qualifying process-improvement and custom tooling work across three production lines",
                      "Technical interviews with plant manager documented four-part test compliance",
                      "QRE analysis covered wages, contractor spend, and supply costs",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckIcon className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-body-text text-xs leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">SC State Credit Coordinated</div>
                  <div className="space-y-1.5">
                    {[
                      "Same qualifying activities and QRE data supported the SC 5% credit calculation",
                      "SC Schedule TC-18 documentation prepared alongside federal study",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckIcon className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-body-text text-xs leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">CPA Filing Support Delivered</div>
                  <div className="space-y-1.5">
                    {[
                      "Single coordinated package: Form 6765, SC TC-18, narratives, QRE schedules, methodology memo",
                      "CPA filed both credits through one return cycle",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckIcon className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-body-text text-xs leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-surface border border-gray-200 rounded-2xl overflow-hidden">
              <div className="bg-navy p-6">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-white font-bold">Lowcountry Software Firm</div>
                    <div className="text-slate-400 text-xs">35 engineers · Charleston area</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-primary-light">$168K</div>
                    <div className="text-slate-400 text-xs">Combined credits (3-year lookback)</div>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Federal Credit Identified</div>
                  <div className="space-y-1.5">
                    {[
                      "Qualifying custom platform development, API engineering, and algorithm design work",
                      "Three open tax years evaluated plus current year — study materials prepared for CPA-coordinated filings",
                      "Business-component mapping across 9 qualifying software projects",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckIcon className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-body-text text-xs leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">SC State Credit Coordinated</div>
                  <div className="space-y-1.5">
                    {[
                      "SC-based wage and contractor QREs supported state credit for all four tax years",
                      "SC credit carryforward structure documented for years where credit exceeded liability",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckIcon className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-body-text text-xs leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">CPA Filing Support Delivered</div>
                  <div className="space-y-1.5">
                    {[
                      "Prepared study materials for three prior years plus current-year claim to support CPA-coordinated amended filings",
                      "CPA received study package with federal and SC schedules for each tax year",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckIcon className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-body-text text-xs leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-secondary text-xs mt-8">Illustrative examples based on common R&amp;D credit engagement profiles. These examples are hypothetical and provided for educational purposes only. Individual results depend on qualifying activities, expenses, documentation, tax posture, and CPA review.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          KEY FACTS
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Key Facts</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3">
              SC R&amp;D Tax Credit — What You Need to Know
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "What is the SC R&D Tax Credit?",
                a: "A state income tax credit equal to 5% of qualified research expenses incurred in South Carolina. It follows the same qualification rules as the federal credit under IRC Section 41.",
              },
              {
                q: "Who qualifies?",
                a: "Any business operating in SC that incurs qualified research expenses — manufacturers, software developers, construction firms, food producers, biotech companies, and engineers — regardless of size.",
              },
              {
                q: "How is it calculated?",
                a: "The credit equals 5% of SC qualified research expenses that exceed the base amount, using the same methodology as the federal credit. Cannot exceed 50% of SC income tax liability in a given year.",
              },
              {
                q: "Can I claim both federal and state?",
                a: "Yes. SC businesses may be able to claim both a federal R&D credit and a South Carolina R&D credit on qualifying research expenses, subject to federal and state rules, limitations, and CPA review. Alexander & Blake coordinates both through a single study.",
              },
              {
                q: "What about unused credit?",
                a: "Unused SC R&D credits carry forward for up to 10 years. This is especially valuable for businesses in high-growth years where credit may temporarily exceed liability.",
              },
              {
                q: "How do I file?",
                a: "File SC Schedule TC-18 (Research Expenses Credit) with your annual SC state tax return. Your CPA handles filing — Alexander & Blake prepares the supporting documentation and coordinates delivery.",
              },
            ].map((item) => (
              <div key={item.q} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-navy mb-3">{item.q}</h3>
                <p className="text-body-text text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-5">
            <p className="text-primary text-sm leading-relaxed">
              State credit availability, limitation rules, carryforward treatment, and filing requirements should be confirmed by the taxpayer&apos;s CPA or qualified tax professional based on the taxpayer&apos;s specific facts and filing posture.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SC CITIES
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Local Expertise</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-3">
              Serving Businesses Across South Carolina
            </h2>
            <p className="text-secondary max-w-2xl mx-auto">
              We work with companies across the state — from the manufacturing corridor in the Upstate to the tech hubs in Charleston and Columbia.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              "Greenville",
              "Spartanburg",
              "Charleston",
              "Columbia",
              "Rock Hill",
              "Summerville",
              "Florence",
              "Anderson",
              "Hilton Head",
              "Myrtle Beach",
            ].map((city) => (
              <div key={city} className="bg-surface border border-gray-200 rounded-xl p-4 text-center">
                <div className="font-semibold text-navy text-sm">{city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Common Questions</span>
            <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3">
              SC Credit Questions
            </h2>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "Is the SC R&D credit refundable?",
                a: "No, the SC R&D credit is non-refundable. However, unused credits can be carried forward for up to 10 years to offset future SC tax liability.",
              },
              {
                q: "Do I need to claim the federal credit too?",
                a: "Yes. South Carolina follows federal R&D credit rules, so you must claim or be eligible for the federal credit under IRC Section 41 to qualify for the SC state credit.",
              },
              {
                q: "Can small businesses and startups claim the SC credit?",
                a: "Yes. Any SC business that performs qualified research activities can claim the credit regardless of size. There is no minimum revenue or employee requirement.",
              },
              {
                q: "Can I file amended returns to claim past SC credits?",
                a: "Yes. If you did not originally claim the SC R&D credit, there may be open tax years within the statute of limitations. Alexander & Blake can evaluate those periods and prepare the study materials your CPA or qualified tax professional may use to support amended filings where appropriate.",
              },
              {
                q: "Does Alexander & Blake handle both credits or just one?",
                a: "Both. The federal qualification analysis and documentation process supports the state credit workflow, so SC clients receive coordinated federal and state credit support through one engagement with one study package delivered to their CPA.",
              },
              {
                q: "How does the SC credit interact with federal amended returns?",
                a: "When prior-year federal returns are being amended to claim R&D credits, we prepare the SC state credit documentation for the same tax years alongside the federal study. Your CPA receives coordinated study materials and filing support for both.",
              },
              {
                q: "What industries qualify in South Carolina?",
                a: "Manufacturing, software development, construction engineering, biotech, automotive, aerospace, food and beverage processing, and many more. If your SC team develops, improves, or solves technical problems, there is a reasonable chance qualifying activities exist.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="bg-white rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow group border border-gray-100"
              >
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
          CPA REMINDER
      ═══════════════════════════════════════════ */}
      <section className="px-6 pb-0 pt-12 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-surface border border-gray-200 rounded-xl p-6 text-center">
            <p className="text-body-text text-sm leading-relaxed">
              Your CPA or qualified tax professional should confirm final filing posture, state limitations, carryforward treatment, and return integration.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SC FILING SUPPORT
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary text-xs font-bold uppercase tracking-widest">State Credit Support</span>
          <h2 className="text-3xl md:text-4xl font-normal text-navy mt-3 mb-8">
            SC Filing Support Includes
          </h2>
          <div className="space-y-3">
            {[
              "SC QRE schedule",
              "TC-18 support",
              "Federal/SC reconciliation",
              "Carryforward support",
              "CPA filing notes",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckIcon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-body-text text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white border-t-0">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-navy mb-4">
            Evaluate Your South Carolina R&amp;D Credits
          </h2>
          <p className="text-lg text-secondary mb-8">
            A complimentary consultation to review your qualifying activities and outline what a coordinated federal and SC credit study would include. No obligation.
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
