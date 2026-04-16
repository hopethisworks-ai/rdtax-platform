import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CreditPath | South Carolina R&D Tax Credit Specialists",
  description:
    "CreditPath helps South Carolina businesses claim R&D tax credits. Free assessment, no upfront cost, full audit defense. Average credit recovered: $50K–$300K.",
};

/* Reusable SVG icons — clean and professional, no emojis */
const CheckCircleIcon = () => (
  <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const DollarIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* 1. Hero */}
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
              <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white rounded-xl p-5 shadow-xl">
                <div className="text-3xl font-black">$50K–$300K</div>
                <p className="text-slate-400 text-sm mt-1">Avg. Credit Recovered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats — SVG icons, no emojis */}
      <section className="py-16 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Why It Matters</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-3">R&amp;D Credits Fuel Growth</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              The federal R&amp;D tax credit lets qualifying businesses recover up to 20% of their research expenses — directly reducing their tax liability.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <div className="w-14 h-14 bg-emerald-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarIcon />
              </div>
              <div className="text-3xl font-black text-white mb-1">$50K–$300K</div>
              <p className="text-slate-400 text-sm font-medium">Average Credit Recovered</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <div className="w-14 h-14 bg-emerald-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ChartIcon />
              </div>
              <div className="text-3xl font-black text-white mb-1">20%</div>
              <p className="text-slate-400 text-sm font-medium">Contingency Fee — No Upfront Cost</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <div className="w-14 h-14 bg-emerald-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ClockIcon />
              </div>
              <div className="text-3xl font-black text-white mb-1">60 Days</div>
              <p className="text-slate-400 text-sm font-medium">From Assessment to Filing</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem/Solution with image */}
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
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-5">Focus on Innovation. We Handle the Credits.</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Most South Carolina companies miss out on R&amp;D credits because the process seems complex. You&apos;re focused on building your business — tax credit strategy shouldn&apos;t be your burden.
            </p>
            <div className="space-y-3">
              {[
                "Real-time dashboard to track your credit recovery",
                "IRS-compliant calculations backed by engineering analysis",
                "Automated documentation — no paperwork on your end",
                "Seamless coordination with your existing CPA",
                "Full audit defense included at no extra cost",
              ].map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <CheckCircleIcon />
                  <span className="text-slate-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Industries */}
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
                  <Image src={industry.img} alt={industry.name} width={600} height={300} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{industry.name}</h3>
                  <p className="text-slate-600 text-sm">{industry.activity}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works — SVG icons, no emojis */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">Simple. Thorough. Audit-Ready.</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Free Assessment", desc: "We review your business activities in a 30-minute call to estimate your potential credit.", icon: <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" /></svg> },
              { num: "02", title: "Data Collection", desc: "Upload records through our secure portal — we guide you on exactly what\u2019s needed.", icon: <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg> },
              { num: "03", title: "Credit Study", desc: "Our engineers and tax experts calculate and prepare IRS-compliant documentation.", icon: <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg> },
              { num: "04", title: "File & Collect", desc: "We coordinate with your CPA to file and provide full audit defense.", icon: <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
            ].map((step) => (
              <div key={step.num} className="relative">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">{step.icon}</div>
                <div className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-2">Step {step.num}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Trust/Credibility — honest, no fake stats */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80" alt="Modern office" width={1400} height={800} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-slate-900/85" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Built for Confidence</h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Every credit study we produce is engineered to be IRS audit-ready from day one. We don&apos;t cut corners — because your business depends on it.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-6">
              <div className="text-2xl font-black text-emerald-400 mb-2">IRS-Compliant</div>
              <p className="text-slate-300 text-sm">Every study follows ATG guidelines and Section 41 requirements</p>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-6">
              <div className="text-2xl font-black text-emerald-400 mb-2">Audit Defense</div>
              <p className="text-slate-300 text-sm">Full representation and support if the IRS reviews your claim</p>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-6">
              <div className="text-2xl font-black text-emerald-400 mb-2">CPA-Ready</div>
              <p className="text-slate-300 text-sm">Deliverables designed for seamless CPA integration and filing</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Common Questions</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "What is the R&D tax credit?", a: "The R&D tax credit is a federal incentive under IRC Section 41 that rewards businesses for investing in research and development. If your company develops new or improved products, processes, or software, you can claim a credit of up to 20% of qualifying research expenses — directly reducing your tax liability." },
              { q: "Does my business qualify?", a: "Most businesses are surprised to learn they qualify. If you've spent time and resources developing new or improved products, processes, or software — even in traditional industries like manufacturing or food production — you likely have qualifying activities. Our free assessment determines eligibility in 30 minutes." },
              { q: "How much does it cost?", a: "Zero upfront cost. We work on a 20% contingency basis — we only earn a fee from the credits we successfully recover for you. If we don't identify qualifying credits, you owe nothing." },
              { q: "How long does the process take?", a: "From initial assessment to filing typically takes 60 days. The assessment call takes 30 minutes. Data collection is handled through our secure portal. Once we have your records, our engineering and tax team handles the rest." },
              { q: "What about IRS audit risk?", a: "We prepare every claim with full audit defense from day one. Our team follows IRS Audit Techniques Guidelines (ATG) and ensures thorough, defensible documentation. If an audit occurs, we provide complete representation at no additional cost." },
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

      {/* 8. CTA */}
      <section className="py-16 px-6 bg-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Stop Leaving Money on the Table</h2>
          <p className="text-lg text-emerald-100 mb-8">
            Schedule a free 30-minute assessment. No obligation, no upfront cost.
          </p>
          <Link href="/contact" className="inline-block bg-white text-emerald-600 font-bold px-10 py-4 rounded-xl text-lg hover:bg-slate-50 transition-colors shadow-lg">
            Get Free Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
