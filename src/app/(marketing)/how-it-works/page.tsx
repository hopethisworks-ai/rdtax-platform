import Link from "next/link";
import AssessmentForm from "@/components/AssessmentForm";

export const metadata = {
  title: "How It Works | CreditPath R&D Tax Credit",
  description: "See exactly how CreditPath helps South Carolina businesses claim R&D tax credits — from free assessment to filed credit study in 60 days.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Free Assessment",
      duration: "30 minutes",
      desc: "We review your business on a free 30-minute call and tell you exactly what you qualify for. No obligation, no pressure.",
      items: ["Online credit estimator", "Free 30-min consultation call", "Preliminary qualification assessment", "Credit range estimate"],
    },
    {
      number: "02",
      title: "Engagement Kickoff",
      duration: "1-2 days",
      desc: "After signing the engagement letter, you receive secure portal access and a customized document checklist tailored to your business.",
      items: ["Signed engagement letter", "Secure client portal access", "Customized document checklist", "Dedicated analyst assigned"],
    },
    {
      number: "03",
      title: "Data Collection",
      duration: "1-2 weeks",
      desc: "Upload payroll, contractor, and project data through your secure portal. We guide you every step of the way.",
      items: ["Payroll data upload", "Contractor agreements", "Project qualification questionnaires", "Four-part test interviews"],
    },
    {
      number: "04",
      title: "Credit Analysis",
      duration: "2-3 weeks",
      desc: "Our analysts map your data to qualifying activities, apply IRS criteria, and calculate your maximum allowable credit.",
      items: ["Business component mapping", "Four-part test analysis", "Wage QRE calculation", "Contractor analysis", "ASC vs Regular method comparison"],
    },
    {
      number: "05",
      title: "Report and Filing",
      duration: "1 week",
      desc: "You receive a complete audit-defense package. We coordinate with your CPA to file and stand behind every claim.",
      items: ["Executive summary report", "Project narratives", "Methodology memo", "Form 6765 preparation", "Full audit defense coverage"],
    },
  ];

  return (
    <div className="bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">CP</span></div>
            <span className="font-bold text-slate-900 text-lg">CreditPath</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-sm text-blue-600 font-semibold">How It Works</Link>
            <Link href="/industries" className="text-sm text-slate-600 hover:text-slate-900">Industries</Link>
            <Link href="/about" className="text-sm text-slate-600 hover:text-slate-900">About</Link>
            <Link href="/contact" className="text-sm text-slate-600 hover:text-slate-900">Contact</Link>
            <Link href="/cpa-partners" className="text-sm text-slate-600 hover:text-slate-900">CPA Partners</Link>
          </div>
          <Link href="/contact" className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg">Free Assessment</Link>
        </div>
      </nav>
      <section className="pt-32 pb-16 px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">The Process</p>
          <h1 className="text-5xl font-black text-slate-900 leading-tight mb-6">From Free Assessment to Filed Credit in 60 Days.</h1>
          <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">We handle everything — identification, documentation, calculation, filing, and audit defense. Here is exactly what happens from the moment you reach out.</p>
        </div>
      </section>
      <section className="py-16 px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><div className="text-4xl font-black text-blue-600 mb-2">30 min</div><div className="text-slate-500 text-sm">Free assessment call</div></div>
          <div><div className="text-4xl font-black text-blue-600 mb-2">60 days</div><div className="text-slate-500 text-sm">Average to filing</div></div>
          <div><div className="text-4xl font-black text-blue-600 mb-2">20%</div><div className="text-slate-500 text-sm">Contingency fee only</div></div>
          <div><div className="text-4xl font-black text-blue-600 mb-2">100%</div><div className="text-slate-500 text-sm">Audit defense included</div></div>
        </div>
      </section>
      <section className="py-20 px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto space-y-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex gap-8 relative">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-white font-black text-sm">{step.number}</span>
                </div>
                {i < steps.length - 1 && <div className="w-0.5 bg-blue-100 flex-1 my-2"></div>}
              </div>
              <div className={`flex-1 ${i < steps.length - 1 ? "pb-12" : ""}`}>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-xl font-black text-slate-900">{step.title}</h2>
                  <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-semibold">{step.duration}</span>
                </div>
                <p className="text-slate-600 mb-4 leading-relaxed">{step.desc}</p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {step.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
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
      <section className="py-20 px-6 border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">What You Get</p>
            <h2 className="text-3xl font-black text-slate-900">Everything Included. Nothing Extra.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="mb-3">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Complete Credit Study</h3>
              <p className="text-slate-500 text-sm leading-relaxed">A fully documented credit study including project narratives, methodology memo, and Form 6765 support — ready for your CPA to file.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="mb-3">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7.5-4.5A9 9 0 1121 12a9 9 0 01-9.5-9.5z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Full Audit Defense</h3>
              <p className="text-slate-500 text-sm leading-relaxed">If the IRS ever questions your credit, we defend it. Our documentation is built from day one to withstand IRS scrutiny.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="mb-3">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Secure Client Portal</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Upload documents, track your engagement status, and communicate with your analyst — all through your secure CreditPath portal.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="mb-3">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM4.318 20H2v-2a3 3 0 015.856-1.487M15 10h.01" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">CPA Coordination</h3>
              <p className="text-slate-500 text-sm leading-relaxed">We work directly with your CPA to ensure seamless filing. We handle the R&D specialty work — they handle the rest of your return.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="mb-3">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Federal and SC Credits</h3>
              <p className="text-slate-500 text-sm leading-relaxed">We claim both the federal R&D credit and the SC state credit simultaneously, stacking them for maximum total recovery.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="mb-3">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Amended Returns</h3>
              <p className="text-slate-500 text-sm leading-relaxed">If you have not claimed credits in prior years, we can file amended returns going back 3 years to recover credits you have already missed.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-blue-600">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-white mb-6">Ready to Get Started?</h2>
            <p className="text-blue-100 leading-relaxed mb-8">The free assessment takes 30 minutes and costs nothing. We will tell you exactly what your business qualifies for and walk you through the entire process.</p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3"><svg className="w-5 h-5 text-blue-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-blue-100 text-sm">Free 30-minute assessment call</span></div>
              <div className="flex items-center gap-3"><svg className="w-5 h-5 text-blue-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-blue-100 text-sm">No upfront cost — 20% contingency only</span></div>
              <div className="flex items-center gap-3"><svg className="w-5 h-5 text-blue-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-blue-100 text-sm">Federal and SC state credits combined</span></div>
              <div className="flex items-center gap-3"><svg className="w-5 h-5 text-blue-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-blue-100 text-sm">Full audit defense on every claim</span></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/estimator" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl text-lg text-center">Calculate My Credit</Link>
              <Link href="/eligibility" className="bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl text-lg text-center border border-blue-400">Check Eligibility</Link>
            </div>
          </div>
          <AssessmentForm />
        </div>
      </section>
      <footer className="bg-slate-950 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2"><div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">CP</span></div><span className="font-bold text-white">CreditPath</span><span className="text-slate-500 text-sm ml-2">South Carolina R&D Tax Credit Specialists</span></div>
          <div className="flex gap-6"><Link href="/" className="text-slate-600 text-xs">Home</Link><Link href="/about" className="text-slate-600 text-xs">About</Link><Link href="/contact" className="text-slate-600 text-xs">Contact</Link><Link href="/privacy" className="text-slate-600 text-xs">Privacy</Link></div>
        </div>
      </footer>
    </div>
  );
}
