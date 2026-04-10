import Link from "next/link";
import AssessmentForm from "@/components/AssessmentForm";

export default function HomePage() {
  return (
    <div className="bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">CP</span></div>
            <span className="font-bold text-slate-900 text-lg">CreditPath</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-sm text-slate-600 hover:text-slate-900">How It Works</Link>
            <Link href="/industries" className="text-sm text-slate-600 hover:text-slate-900">Industries</Link>
            <Link href="/about" className="text-sm text-slate-600 hover:text-slate-900">About</Link>
            <Link href="/contact" className="text-sm text-slate-600 hover:text-slate-900">Contact</Link>
            <Link href="/cpa-partners" className="text-sm text-slate-600 hover:text-slate-900">CPA Partners</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-600 hidden sm:block">Sign In</Link>
            <Link href="/contact" className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg">Free Assessment</Link>
          </div>
        </div>
      </nav>
      <section className="pt-32 pb-24 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 max-w-4xl">Your Business Is Sitting On <span className="text-blue-400">Unclaimed Tax Credits.</span></h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-10">Most SC manufacturers, software companies, and contractors qualify for $50,000-$300,000 in R&D tax credits every year. Most never claim a dollar.</p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/estimator" className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-lg text-center">Calculate Your Credit</Link>
            <Link href="/contact" className="bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg text-center">Free Assessment</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10">
            <div><div className="text-2xl font-black text-white mb-1">$50K-$300K</div><div className="text-sm text-slate-400">Average Credit</div></div>
            <div><div className="text-2xl font-black text-white mb-1">No Upfront</div><div className="text-sm text-slate-400">Contingency Only</div></div>
            <div><div className="text-2xl font-black text-white mb-1">Federal+SC</div><div className="text-sm text-slate-400">Credits Stacked</div></div>
            <div><div className="text-2xl font-black text-white mb-1">100%</div><div className="text-sm text-slate-400">IRS-Compliant</div></div>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 border-b border-slate-200 py-5 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500 font-medium">
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>Manufacturing</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>Software and Technology</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>Construction</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>Biotech and Life Sciences</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>Automotive</span>
        </div>
      </section>
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-4">From Assessment to Cash in 60 Days</h2>
          <p className="text-slate-500 text-lg mb-16">We handle everything. You collect.</p>
          <div className="grid md:grid-cols-4 gap-8 text-left">
            <div><div className="text-6xl font-black text-slate-100 mb-4">01</div><h3 className="text-lg font-bold text-slate-900 mb-2">Free Assessment</h3><p className="text-slate-500 text-sm">We review your business in 30 minutes.</p></div>
            <div><div className="text-6xl font-black text-slate-100 mb-4">02</div><h3 className="text-lg font-bold text-slate-900 mb-2">We Do the Work</h3><p className="text-slate-500 text-sm">We identify qualifying activities and prepare documentation.</p></div>
            <div><div className="text-6xl font-black text-slate-100 mb-4">03</div><h3 className="text-lg font-bold text-slate-900 mb-2">We File and Defend</h3><p className="text-slate-500 text-sm">We file your claim with full audit defense.</p></div>
            <div><div className="text-6xl font-black text-slate-100 mb-4">04</div><h3 className="text-lg font-bold text-slate-900 mb-2">You Collect</h3><p className="text-slate-500 text-sm">Our fee is 20% of what we recover. Nothing upfront.</p></div>
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-blue-600">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-200 text-sm font-semibold uppercase">Case Study</span>
            <h2 className="text-4xl font-black text-white mt-2 mb-6">SC Manufacturer Recovered $197,000 They Did Not Know Existed</h2>
            <p className="text-blue-100 mb-8">A Spartanburg manufacturer filed taxes for 8 years without claiming R&D credits. We found $1.2M in qualifying expenses and recovered $197,000 in combined credits.</p>
            <Link href="/contact" className="bg-white text-blue-600 font-bold px-6 py-3 rounded-xl inline-block">Get Your Free Assessment</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/20 rounded-xl p-5"><div className="text-2xl font-black text-white">$1.2M</div><div className="text-blue-200 text-xs mt-1">Qualified Expenses</div></div>
            <div className="bg-white/20 rounded-xl p-5"><div className="text-2xl font-black text-white">$137K</div><div className="text-blue-200 text-xs mt-1">Federal Credit</div></div>
            <div className="bg-white/20 rounded-xl p-5"><div className="text-2xl font-black text-white">$60K</div><div className="text-blue-200 text-xs mt-1">SC State Credit</div></div>
            <div className="bg-white/20 rounded-xl p-5"><div className="text-2xl font-black text-white">$197K</div><div className="text-blue-200 text-xs mt-1">Total Recovered</div></div>
          </div>
        </div>
      </section>
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Client Results</span>
            <h2 className="text-4xl font-black text-slate-900 mt-2">Real Credits. Real Businesses.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6"><div className="text-blue-600 font-bold text-sm mb-4">$84,000 recovered</div><p className="text-slate-700 text-sm leading-relaxed mb-6 italic">We had no idea our product development work qualified. CreditPath found $84,000 in credits on our first filing.</p><div className="font-semibold text-slate-900 text-sm">Operations Director</div><div className="text-slate-500 text-xs">SC Manufacturing Co.</div></div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6"><div className="text-blue-600 font-bold text-sm mb-4">$156,000 recovered</div><p className="text-slate-700 text-sm leading-relaxed mb-6 italic">The process was completely hands-off. They handled everything and we just received the credit.</p><div className="font-semibold text-slate-900 text-sm">CFO</div><div className="text-slate-500 text-xs">Greenville Software Firm</div></div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6"><div className="text-blue-600 font-bold text-sm mb-4">3 clients referred</div><p className="text-slate-700 text-sm leading-relaxed mb-6 italic">As a CPA, I recommend CreditPath to all my manufacturing clients. Thorough and IRS-audit ready.</p><div className="font-semibold text-slate-900 text-sm">CPA Partner</div><div className="text-slate-500 text-xs">Upstate SC Accounting Firm</div></div>
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 text-sm font-semibold uppercase">South Carolina</span>
            <h2 className="text-4xl font-black text-slate-900 mt-2 mb-6">Stack Federal AND State Credits</h2>
            <p className="text-slate-600 mb-8">SC businesses can claim both the federal R&D credit AND a separate SC state credit for significantly higher total recovery.</p>
            <div className="space-y-3">
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-600 text-sm">Federal Credit Rate</span><span className="font-bold text-slate-900 text-sm">Up to 20% of QREs</span></div>
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-600 text-sm">SC State Credit Rate</span><span className="font-bold text-slate-900 text-sm">5% of SC QREs</span></div>
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-600 text-sm">SC Carryforward</span><span className="font-bold text-slate-900 text-sm">10 years</span></div>
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-600 text-sm">Liability Cap</span><span className="font-bold text-slate-900 text-sm">50% of SC tax</span></div>
            </div>
          </div>
          <AssessmentForm />
        </div>
      </section>
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">Stop Leaving Money on the Table.</h2>
          <p className="text-slate-400 text-xl mb-10">Every year you do not claim is a year of credits lost forever.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/estimator" className="bg-blue-600 text-white font-bold px-10 py-4 rounded-xl text-lg">Calculate My Credit</Link>
            <Link href="/contact" className="bg-white/10 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl text-lg">Schedule a Call</Link>
          </div>
        </div>
      </section>
      <footer className="bg-slate-950 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            <div><div className="flex items-center gap-2 mb-4"><div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">CP</span></div><span className="font-bold text-white">CreditPath</span></div><p className="text-slate-500 text-sm">South Carolina R&D Tax Credit specialists.</p></div>
            <div><h4 className="text-white font-semibold text-sm mb-4">Company</h4><div className="space-y-2"><Link href="/about" className="block text-slate-500 text-sm">About</Link><Link href="/how-it-works" className="block text-slate-500 text-sm">How It Works</Link><Link href="/contact" className="block text-slate-500 text-sm">Contact</Link><Link href="/login" className="block text-slate-500 text-sm">Client Login</Link></div></div>
            <div><h4 className="text-white font-semibold text-sm mb-4">Industries</h4><div className="space-y-2"><Link href="/industries" className="block text-slate-500 text-sm">Manufacturing</Link><Link href="/industries" className="block text-slate-500 text-sm">Software</Link><Link href="/industries" className="block text-slate-500 text-sm">Construction</Link><Link href="/industries" className="block text-slate-500 text-sm">Biotech</Link></div></div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex justify-between items-center">
            <p className="text-slate-600 text-xs">2025 CreditPath. All rights reserved.</p>
            <div className="flex gap-6"><Link href="/privacy" className="text-slate-600 text-xs">Privacy</Link><Link href="/terms" className="text-slate-600 text-xs">Terms</Link><span className="text-slate-600 text-xs flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>256-bit encrypted</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
