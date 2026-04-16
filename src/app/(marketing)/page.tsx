import Link from "next/link";
import Image from "next/image";

const checkmarkIcon = (
  <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* 1. Hero Section — split layout with image */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
                South Carolina&apos;s R&amp;D Tax Credit Specialists
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
                Turn Your Innovation Into Tax Savings.
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                We handle the complex R&amp;D tax credit process end-to-end — so you get every dollar you&apos;re owed, with zero upfront cost.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/contact" className="bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-center hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/25">
                  Get Free Assessment
                </Link>
                <Link href="#how-it-works" className="border-2 border-slate-300 text-slate-700 font-bold px-8 py-4 rounded-xl text-center hover:border-emerald-600 hover:text-emerald-600 transition-colors">
                  See How It Works
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  No upfront cost
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Audit defense included
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  60-day turnaround
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                  alt="Business team reviewing financial data"
                  width={800}
                  height={550}
                  className="object-cover w-full h-[400px] md:h-[480px]"
                  priority
                />
              </div>
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white rounded-xl p-5 shadow-xl">
                <div className="text-3xl font-black">$50K–$300K</div>
                <p className="text-slate-400 text-sm mt-1">Avg. Credit Recovered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats/Growth Section */}
      <section className="py-16 px-6 bg-blue-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">Proven Results</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-3">R&amp;D Credits Fuel Growth</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Our platform turns your innovation into cash flow. We&apos;ve helped SC businesses recover millions in credits they didn&apos;t know existed.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "💰", stat: "$50K+", label: "Average Credit Recovered" },
              { icon: "📊", stat: "20%", label: "Contingency Fee Only" },
              { icon: "⚡", stat: "60 Days", label: "Assessment to Filing" },
            ].map((item) => (
              <div key={item.stat} className="bg-white/10 rounded-xl p-6 backdrop-blur text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-3xl font-black text-white mb-1">{item.stat}</div>
                <p className="text-blue-100 text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Problem/Solution Section with image */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
              alt="Professional analyzing financial documents"
              width={800}
              height={600}
              className="object-cover w-full h-[380px]"
            />
          </div>
          <div>
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Why CreditPath</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-5">Solve Problems. Save on Taxes.</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Most South Carolina companies miss out on R&amp;D credits because the process seems complex. You&apos;re focused on innovation — tax strategy shouldn&apos;t be your burden.
            </p>
            <div className="space-y-3">
              {[
                "See your savings clearly on our dashboard",
                "IRS-compliant calculations — get every dollar",
                "No paperwork stress — we automate documentation",
                "Works with your existing CPA",
                "Full audit defense included",
              ].map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  {checkmarkIcon}
                  <span className="text-slate-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Industries Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Who We Serve</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-3">Industries That Qualify</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              You don&apos;t need a lab coat. If you&apos;re developing new or improved products, processes, or software, you likely qualify.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Software & Technology", activity: "Developing new platforms, applications, or digital tools", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80" },
              { name: "Manufacturing", activity: "Improving production processes or designing new products", img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=80" },
              { name: "Life Sciences", activity: "R&D for pharmaceuticals, medical devices, or biotech", img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80" },
              { name: "Engineering", activity: "Product design, testing, and innovation projects", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" },
              { name: "Food & Beverage", activity: "Formulation and process improvements", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" },
              { name: "Agriculture", activity: "Crop improvement and equipment innovation", img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80" },
            ].map((industry) => (
              <Link
                key={industry.name}
                href="/industries"
                className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-emerald-600 hover:shadow-lg transition-all group"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={industry.img}
                    alt={industry.name}
                    width={600}
                    height={300}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-slate-600 text-sm">{industry.activity}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">A Smarter Way to Claim R&amp;D</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Free Assessment", desc: "We review your business activities in a 30-minute call to estimate your potential credit.", icon: "📋" },
              { num: "02", title: "Data Collection", desc: "Upload records through our secure portal — we guide you on exactly what's needed.", icon: "📁" },
              { num: "03", title: "Credit Study", desc: "Our engineers and tax experts calculate and prepare IRS-compliant documentation.", icon: "🔬" },
              { num: "04", title: "File & Collect", desc: "We coordinate with your CPA to file and provide full audit defense.", icon: "✅" },
            ].map((step) => (
              <div key={step.num} className="relative">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-2">Step {step.num}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonial Section with image background */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
            alt="Modern office"
            width={1400}
            height={800}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-slate-900/85" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-10">What Our Clients Say</h2>
          <div className="bg-white/10 backdrop-blur rounded-xl p-8 md:p-10 border border-white/10">
            <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
            <blockquote className="text-xl md:text-2xl font-semibold text-white mb-4 leading-relaxed">
              &ldquo;CreditPath made the entire process effortless. They found $156,000 in credits we had no idea we were entitled to. Completely hands-off.&rdquo;
            </blockquote>
            <p className="text-slate-300 font-medium">— CFO, Greenville Software Firm</p>
          </div>
          <div className="flex justify-center gap-10 mt-10 flex-wrap">
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400 mb-1">500+</div>
              <p className="text-slate-400 text-sm">SC Businesses Served</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400 mb-1">$45M+</div>
              <p className="text-slate-400 text-sm">Total Credits Recovered</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400 mb-1">100%</div>
              <p className="text-slate-400 text-sm">Audit-Ready Documentation</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Common Questions</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "What is the R&D tax credit?", a: "The R&D tax credit is a federal tax incentive designed to encourage businesses to invest in research and development. If your company develops new or improved products, processes, or software, you can claim a credit of up to 20% of qualifying research expenses — directly reducing your tax liability." },
              { q: "Does my business qualify?", a: "Most businesses qualify. If you've spent time and resources developing new or improved products, processes, or software — even in traditional industries — you likely have qualifying activities. We offer a free 30-minute assessment to determine your eligibility and estimate potential credits." },
              { q: "How much does it cost?", a: "Zero upfront cost. We work on a contingency basis — we only get paid 20% of the credits we recover for you. This means we're fully aligned with your success. No hidden fees, no minimums." },
              { q: "How long does the process take?", a: "From start to filing typically takes 60 days. The initial assessment takes 30 minutes. Data collection is handled through our secure portal. Once we have your records, our team prepares everything — you don't need to do anything else." },
              { q: "What about audit risk?", a: "We prepare every claim with full IRS audit defense in mind. Our engineers and tax experts ensure 100% compliance. We document everything meticulously and provide complete support if an audit occurs." },
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

      {/* 8. Final CTA Section */}
      <section className="py-16 px-6 bg-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Stop Leaving Money on the Table</h2>
          <p className="text-lg text-emerald-100 mb-8">
            Get a free assessment today. No obligation, no upfront cost.
          </p>
          <Link href="/contact" className="inline-block bg-white text-emerald-600 font-bold px-10 py-4 rounded-xl text-lg hover:bg-slate-50 transition-colors shadow-lg">
            Get Free Assessment →
          </Link>
        </div>
      </section>
    </div>
  );
}
