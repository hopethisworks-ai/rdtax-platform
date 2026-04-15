import Link from "next/link";

const checkmarkIcon = (
  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="pt-20 pb-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
              Turn Your Innovation Into Tax Savings.
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              South Carolina's dedicated R&D tax credit specialists. We handle everything — so you get every dollar you're owed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-emerald-600 text-white font-bold px-8 py-4 rounded-2xl text-lg text-center hover:bg-emerald-700 transition-colors">
                Get Free Assessment
              </Link>
              <Link href="/contact" className="border-2 border-emerald-600 text-emerald-600 font-bold px-8 py-4 rounded-2xl text-lg text-center hover:bg-emerald-50 transition-colors">
                See How It Works
              </Link>
            </div>
          </div>
          <div className="bg-slate-900 rounded-2xl p-8 text-white">
            <div className="text-center">
              <div className="text-5xl font-black mb-2">$50K–$300K</div>
              <p className="text-lg text-slate-300">Average Credit Recovered</p>
              <hr className="border-slate-700 my-6" />
              <p className="text-sm text-slate-400 leading-relaxed">
                Most SC companies don't know they're sitting on significant R&D tax credits. Our specialists identify exactly what you're owed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats/Growth Section */}
      <section className="py-20 px-6 bg-blue-600">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <span className="text-blue-200 text-sm font-semibold uppercase tracking-widest">Proven Results</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4">R&D Credits Fuel Growth</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our automated platform turns your innovation into cash flow. We've helped SC businesses recover millions in credits they didn't know existed.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">
              <div className="text-4xl font-black text-white mb-3">$50K+</div>
              <p className="text-blue-100 font-semibold">Average Credit Recovered</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">
              <div className="text-4xl font-black text-white mb-3">20%</div>
              <p className="text-blue-100 font-semibold">Contingency Fee Only</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">
              <div className="text-4xl font-black text-white mb-3">60 Days</div>
              <p className="text-blue-100 font-semibold">Assessment to Filing</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem/Solution Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">The Challenge</span>
            <h2 className="text-5xl font-black text-slate-900 mt-4 mb-6">Solve Problems. Save on Taxes.</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Most South Carolina companies miss out on R&D credits because the process seems complex. You're focused on innovation—tax strategy shouldn't be your burden. That's where we come in. We handle the technical documentation, IRS compliance, and audit defense so you can focus on building your business.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              {checkmarkIcon}
              <div>
                <h3 className="font-bold text-slate-900 mb-1">See your savings clearly on our dashboard</h3>
                <p className="text-slate-600 text-sm">Real-time visibility into every credit we're recovering for you.</p>
              </div>
            </div>
            <div className="flex gap-4">
              {checkmarkIcon}
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Get every dollar you're owed — IRS-compliant calculations</h3>
                <p className="text-slate-600 text-sm">Our engineers and tax experts ensure 100% audit-ready documentation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              {checkmarkIcon}
              <div>
                <h3 className="font-bold text-slate-900 mb-1">No paperwork stress — we automate documentation</h3>
                <p className="text-slate-600 text-sm">Secure portal. Simple uploads. We handle the rest.</p>
              </div>
            </div>
            <div className="flex gap-4">
              {checkmarkIcon}
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Works with your existing CPA</h3>
                <p className="text-slate-600 text-sm">We integrate seamlessly with your tax advisors.</p>
              </div>
            </div>
            <div className="flex gap-4">
              {checkmarkIcon}
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Full audit defense included</h3>
                <p className="text-slate-600 text-sm">We stand behind our work with complete IRS support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Industries Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">Serving</span>
            <h2 className="text-5xl font-black text-slate-900 mt-4 mb-4">Who Qualifies?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              You don't need a lab coat. If you're developing new or improved products, processes, or software, you likely qualify.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Software & Technology", activity: "Developing new platforms, applications, or digital tools" },
              { name: "Manufacturing", activity: "Improving production processes or designing new products" },
              { name: "Life Sciences", activity: "R&D for pharmaceuticals, medical devices, or biotech" },
              { name: "Engineering", activity: "Product design, testing, and innovation projects" },
              { name: "Food & Beverage", activity: "Formulation and process improvements" },
              { name: "Agriculture", activity: "Crop improvement and equipment innovation" }
            ].map((industry) => (
              <Link
                key={industry.name}
                href="/industries"
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-600 hover:shadow-lg transition-all group"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {industry.name}
                </h3>
                <p className="text-slate-600 text-sm mb-4">{industry.activity}</p>
                <div className="flex items-center text-emerald-600 font-semibold text-sm">
                  Learn more
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">Our Process</span>
            <h2 className="text-5xl font-black text-slate-900 mt-4">A Smarter Way to Claim R&D</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "1", title: "Free Assessment", desc: "We review your business in 30 minutes" },
              { num: "2", title: "Data Collection", desc: "Upload records through our secure portal" },
              { num: "3", title: "Credit Study", desc: "We calculate and prepare IRS-compliant documentation" },
              { num: "4", title: "File & Collect", desc: "We coordinate filing and provide audit defense" }
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="text-6xl font-black text-emerald-100 mb-4">{step.num}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonial/Trust Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-slate-900 mb-12">Easy Process. Real Value.</h2>
          <div className="bg-white rounded-2xl p-10 shadow-lg mb-8">
            <div className="text-5xl mb-6">⭐⭐⭐⭐⭐</div>
            <blockquote className="text-2xl font-semibold text-slate-900 mb-4 leading-relaxed">
              "CreditPath made the entire process effortless. They found $156,000 in credits we had no idea we were entitled to. Completely hands-off."
            </blockquote>
            <p className="text-slate-600 font-semibold">CFO, Greenville Software Firm</p>
          </div>
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-600 mb-1">500+</div>
              <p className="text-slate-600 text-sm">SC Businesses Served</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-600 mb-1">$45M+</div>
              <p className="text-slate-600 text-sm">Total Credits Recovered</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-600 mb-1">100%</div>
              <p className="text-slate-600 text-sm">Audit-Ready Documentation</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">Questions?</span>
            <h2 className="text-5xl font-black text-slate-900 mt-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            <details className="bg-white rounded-2xl p-6 cursor-pointer hover:shadow-md transition-shadow group">
              <summary className="flex items-center justify-between font-bold text-slate-900 text-lg">
                <span>What is the R&D tax credit?</span>
                <svg className="w-6 h-6 text-emerald-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed">
                The R&D tax credit is a federal tax incentive designed to encourage businesses to invest in research and development. If your company develops new or improved products, processes, or software, you can claim a credit of up to 20% of qualifying research expenses—directly reducing your tax liability.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 cursor-pointer hover:shadow-md transition-shadow group">
              <summary className="flex items-center justify-between font-bold text-slate-900 text-lg">
                <span>Does my business qualify?</span>
                <svg className="w-6 h-6 text-emerald-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed">
                Most businesses qualify. If you've spent time and resources developing new or improved products, processes, or software—even in traditional industries—you likely have qualifying activities. The IRS is broad in what counts. We offer a free 30-minute assessment to determine your eligibility and estimate potential credits.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 cursor-pointer hover:shadow-md transition-shadow group">
              <summary className="flex items-center justify-between font-bold text-slate-900 text-lg">
                <span>How much does it cost?</span>
                <svg className="w-6 h-6 text-emerald-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed">
                Zero upfront cost. We work on a contingency basis—we only get paid 20% of the credits we recover for you. This means we're fully aligned with your success. No hidden fees, no minimums.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 cursor-pointer hover:shadow-md transition-shadow group">
              <summary className="flex items-center justify-between font-bold text-slate-900 text-lg">
                <span>How long does the process take?</span>
                <svg className="w-6 h-6 text-emerald-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed">
                From start to filing typically takes 60 days. The initial assessment takes 30 minutes. Data collection is handled through our secure portal. Once we have your records, our engineers and tax experts prepare everything—you don't need to do anything else.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 cursor-pointer hover:shadow-md transition-shadow group">
              <summary className="flex items-center justify-between font-bold text-slate-900 text-lg">
                <span>What about audit risk?</span>
                <svg className="w-6 h-6 text-emerald-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed">
                We prepare every claim with full IRS audit defense in mind. Our engineers and tax experts ensure 100% compliance. We document everything meticulously and provide complete support if an audit occurs. Your CPA will have a complete audit defense package.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="py-16 px-6 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">Stop Leaving Money on the Table</h2>
          <p className="text-xl text-emerald-100 mb-12">
            Get a free assessment today. No obligation, no upfront cost.
          </p>
          <Link href="/contact" className="inline-block bg-white text-emerald-600 font-bold px-10 py-4 rounded-2xl text-lg hover:bg-slate-50 transition-colors">
            Get Free Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
