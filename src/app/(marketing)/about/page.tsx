import Link from "next/link";
import AssessmentForm from "@/components/AssessmentForm";

export const metadata = {
  title: "About CreditPath | South Carolina R&D Tax Credit Specialists",
  description: "CreditPath is South Carolina's dedicated R&D tax credit platform. We help SC businesses claim every dollar they are owed.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">CP</span></div>
            <span className="font-bold text-slate-900 text-lg">CreditPath</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-sm text-slate-600 hover:text-slate-900">How It Works</Link>
            <Link href="/industries" className="text-sm text-slate-600 hover:text-slate-900">Industries</Link>
            <Link href="/about" className="text-sm text-blue-600 font-semibold">About</Link>
            <Link href="/contact" className="text-sm text-slate-600 hover:text-slate-900">Contact</Link>
            <Link href="/cpa-partners" className="text-sm text-slate-600 hover:text-slate-900">CPA Partners</Link>
          </div>
          <Link href="/contact" className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg">Free Assessment</Link>
        </div>
      </nav>
      <section className="pt-32 pb-16 px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">About Us</p>
          <h1 className="text-5xl font-black text-slate-900 leading-tight mb-6">We Help South Carolina Businesses Claim What They Have Already Earned.</h1>
          <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">CreditPath is South Carolina's dedicated R&D tax credit specialist. We combine deep tax expertise with purpose-built technology to make claiming your credits simple, fast, and risk-free.</p>
        </div>
      </section>
      <section className="py-16 px-6 border-b border-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-black text-blue-600 mb-2">$50K+</div>
            <div className="text-slate-500 text-sm">Average credit per client</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-blue-600 mb-2">20%</div>
            <div className="text-slate-500 text-sm">Contingency fee only</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-blue-600 mb-2">60 days</div>
            <div className="text-slate-500 text-sm">Assessment to filing</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-blue-600 mb-2">100%</div>
            <div className="text-slate-500 text-sm">IRS-compliant documentation</div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 border-b border-slate-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">Our Mission</p>
            <h2 className="text-3xl font-black text-slate-900 mb-6">Most Qualifying SC Businesses Never Claim a Dollar.</h2>
            <p className="text-slate-600 leading-relaxed mb-5">The R&D tax credit has existed since 1981. Yet the vast majority of qualifying South Carolina businesses never claim it — not because they do not qualify, but because they do not know they qualify, or the process seems too complex.</p>
            <p className="text-slate-600 leading-relaxed mb-5">We built CreditPath to fix that. We handle everything — identification, documentation, calculation, filing, and audit defense — so you can focus on running your business.</p>
            <p className="text-slate-600 leading-relaxed">Our fee is 20% of credits recovered. If we do not find credits, you pay nothing.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">South Carolina Focused</h3>
              <p className="text-slate-500 text-sm leading-relaxed">We are not a national firm treating SC as an afterthought. We are local specialists who understand SC industries, SC tax rules, and SC businesses.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">Audit-Ready Documentation</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Every credit study we prepare is built to withstand IRS scrutiny. We follow IRS ATG guidelines and support every claim with thorough, defensible documentation.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">No Upfront Cost</h3>
              <p className="text-slate-500 text-sm leading-relaxed">We work on a pure contingency basis. Our fee is 20% of credits recovered. If we do not find credits, you pay nothing — ever.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">CPA Friendly</h3>
              <p className="text-slate-500 text-sm leading-relaxed">We work alongside your existing CPA — not instead of them. We handle the R&D credit specialty work so your CPA can focus on everything else.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4 text-center">Our Process</p>
          <h2 className="text-3xl font-black text-slate-900 mb-16 text-center">How We Work</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="border-l-4 border-blue-600 pl-6">
              <div className="text-blue-600 font-black text-lg mb-2">01</div>
              <h3 className="font-bold text-slate-900 mb-2">Free Assessment</h3>
              <p className="text-slate-500 text-sm">We review your business in 30 minutes and tell you exactly what you qualify for.</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <div className="text-blue-600 font-black text-lg mb-2">02</div>
              <h3 className="font-bold text-slate-900 mb-2">Data Collection</h3>
              <p className="text-slate-500 text-sm">You upload records through our secure client portal. We handle the rest.</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <div className="text-blue-600 font-black text-lg mb-2">03</div>
              <h3 className="font-bold text-slate-900 mb-2">Credit Study</h3>
              <p className="text-slate-500 text-sm">We calculate your credit and prepare a complete IRS-compliant credit study.</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <div className="text-blue-600 font-black text-lg mb-2">04</div>
              <h3 className="font-bold text-slate-900 mb-2">File and Collect</h3>
              <p className="text-slate-500 text-sm">We coordinate filing with your CPA and provide full audit defense. You collect.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-blue-600">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-white mb-6">Ready to Find Out What You Qualify For?</h2>
            <p className="text-blue-100 leading-relaxed mb-8">Get a free assessment from South Carolina's R&D tax credit specialists. We will tell you exactly what your business qualifies for — no obligation, no upfront cost.</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3"><span className="text-blue-200">✓</span><span className="text-blue-100 text-sm">Free 30-minute assessment call</span></div>
              <div className="flex items-center gap-3"><span className="text-blue-200">✓</span><span className="text-blue-100 text-sm">No upfront cost — contingency only</span></div>
              <div className="flex items-center gap-3"><span className="text-blue-200">✓</span><span className="text-blue-100 text-sm">Full audit defense included</span></div>
              <div className="flex items-center gap-3"><span className="text-blue-200">✓</span><span className="text-blue-100 text-sm">Federal and SC state credits stacked</span></div>
            </div>
          </div>
          <AssessmentForm />
        </div>
      </section>
      <footer className="bg-slate-950 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2"><div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">CP</span></div><span className="font-bold text-white">CreditPath</span><span className="text-slate-500 text-sm ml-2">South Carolina R&D Tax Credit Specialists</span></div>
          <div className="flex gap-6"><Link href="/" className="text-slate-600 text-xs">Home</Link><Link href="/how-it-works" className="text-slate-600 text-xs">How It Works</Link><Link href="/contact" className="text-slate-600 text-xs">Contact</Link><Link href="/privacy" className="text-slate-600 text-xs">Privacy</Link></div>
        </div>
      </footer>
    </div>
  );
}
