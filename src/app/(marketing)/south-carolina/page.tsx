import Link from "next/link";
import AssessmentForm from "@/components/AssessmentForm";

export const metadata = {
  title: "South Carolina R&D Tax Credit | CreditPath",
  description: "South Carolina businesses can claim a 5% state R&D tax credit stacked on top of the federal credit. CreditPath helps SC manufacturers, software companies, and contractors claim every dollar.",
};

export default function SouthCarolinaPage() {
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
            <Link href="/cpa-partners" className="text-sm text-slate-600 hover:text-slate-900">CPA Partners</Link>
          </div>
          <Link href="/contact" className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg">Free Assessment</Link>
        </div>
      </nav>
      <section className="pt-32 pb-24 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              South Carolina R&D Tax Credit
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">The SC R&D Tax Credit: <span className="text-blue-400">What Your Business Is Owed.</span></h1>
            <p className="text-lg text-slate-300 mb-8">South Carolina offers a 5% R&D tax credit on top of the federal credit. Most SC businesses qualify and never claim a dollar. We fix that.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/estimator" className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-lg text-center">Calculate My Credit</Link>
              <Link href="/contact" className="bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg text-center">Free Consultation</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-black text-white mb-1">5%</div>
              <div className="text-blue-200 text-sm">SC State Credit Rate on Qualifying Expenses</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-black text-white mb-1">10 yrs</div>
              <div className="text-blue-200 text-sm">Credit Carryforward Period</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-black text-white mb-1">50%</div>
              <div className="text-blue-200 text-sm">Max Credit vs SC Tax Liability</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-black text-white mb-1">Federal+</div>
              <div className="text-blue-200 text-sm">Stack With Federal Credit for Max Recovery</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900">SC R&D Tax Credit — Key Facts</h2>
            <p className="text-slate-500 mt-3 text-lg">Everything South Carolina businesses need to know</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">What is the SC R&D Tax Credit?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">The South Carolina Qualified Research and Development Tax Credit is a state income tax credit equal to 5% of qualified research expenses incurred in South Carolina. It follows the same rules as the federal R&D credit under IRC Section 41.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">Who qualifies?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Any business operating in South Carolina that incurs qualified research expenses — including manufacturers, software developers, construction firms, biotech companies, and engineers — may qualify regardless of size.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">How is it calculated?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">The credit equals 5% of South Carolina qualified research expenses that exceed the base amount, using the same methodology as the federal credit. The credit cannot exceed 50% of your SC income tax liability for the year.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">Can I claim both federal and state?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Yes. SC businesses can claim both the federal R&D tax credit (up to 20% of QREs) AND the SC state credit (5% of SC QREs) for the same qualifying expenses, stacking them together for maximum total recovery.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">What if I have unused credit?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Unused SC R&D credits can be carried forward for up to 10 years, allowing businesses to benefit even in lower-profit years. The credit has no expiration date.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">How do I file?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">SC businesses must file SC Schedule TC-18 (Research Expenses Credit) along with their annual SC state tax return. You must also claim or be eligible for the federal R&D credit under IRC Section 41.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900">SC Cities We Serve</h2>
            <p className="text-slate-500 mt-3">Local expertise across the entire state</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Spartanburg","Greenville","Charleston","Columbia","Rock Hill","Summerville","Florence","Hilton Head","Anderson","Myrtle Beach"].map((city) => (
              <div key={city} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                <div className="font-semibold text-slate-800 text-sm">{city}</div>
                <div className="text-slate-400 text-xs mt-1">South Carolina</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-blue-600">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-white mb-6">SC Manufacturer Recovered $197,000 in Combined Credits</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">A Spartanburg-area manufacturing company had filed taxes for 8 years without ever claiming R&D credits. After a free assessment, we identified $1.2M in qualifying research expenses and recovered $137,000 in federal credits plus $60,000 in SC state credits.</p>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-blue-500"><span className="text-blue-200 text-sm">Industry</span><span className="text-white font-semibold text-sm">Manufacturing</span></div>
              <div className="flex justify-between py-2 border-b border-blue-500"><span className="text-blue-200 text-sm">Location</span><span className="text-white font-semibold text-sm">Spartanburg, SC</span></div>
              <div className="flex justify-between py-2 border-b border-blue-500"><span className="text-blue-200 text-sm">Total QREs</span><span className="text-white font-semibold text-sm">$1,200,000</span></div>
              <div className="flex justify-between py-2 border-b border-blue-500"><span className="text-blue-200 text-sm">Federal Credit</span><span className="text-white font-semibold text-sm">$137,000</span></div>
              <div className="flex justify-between py-2 border-b border-blue-500"><span className="text-blue-200 text-sm">SC State Credit</span><span className="text-white font-semibold text-sm">$60,000</span></div>
              <div className="flex justify-between py-2"><span className="text-blue-200 text-sm font-bold">Total Recovered</span><span className="text-white font-black text-lg">$197,000</span></div>
            </div>
          </div>
          <AssessmentForm />
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            <details className="border border-slate-200 rounded-xl overflow-hidden">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50">Is the SC R&D credit refundable?</summary>
              <div className="px-6 pb-4 text-slate-600 text-sm">No, the SC R&D credit is non-refundable. However, unused credits can be carried forward for up to 10 years to offset future SC tax liability.</div>
            </details>
            <details className="border border-slate-200 rounded-xl overflow-hidden">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50">Do I need to claim the federal credit too?</summary>
              <div className="px-6 pb-4 text-slate-600 text-sm">Yes. South Carolina follows federal R&D credit rules, so you must claim or be eligible for the federal credit under IRC Section 41 to qualify for the SC state credit.</div>
            </details>
            <details className="border border-slate-200 rounded-xl overflow-hidden">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50">Can small businesses and startups claim the SC credit?</summary>
              <div className="px-6 pb-4 text-slate-600 text-sm">Yes. Any SC business that performs qualified research activities can claim the credit regardless of size. There is no minimum revenue or employee requirement.</div>
            </details>
            <details className="border border-slate-200 rounded-xl overflow-hidden">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50">Can I file amended returns to claim past credits?</summary>
              <div className="px-6 pb-4 text-slate-600 text-sm">Yes. If you did not originally claim the SC R&D credit, you can file an amended return within the statute of limitations to claim credits retroactively — often going back 3 years.</div>
            </details>
            <details className="border border-slate-200 rounded-xl overflow-hidden">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50">What industries qualify in South Carolina?</summary>
              <div className="px-6 pb-4 text-slate-600 text-sm">Manufacturing, software development, construction engineering, biotech, automotive, aerospace, food and beverage, and many more. If your team solves technical problems, you likely qualify.</div>
            </details>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Claim Your SC R&D Credits?</h2>
          <p className="text-slate-400 text-lg mb-10">Get a free assessment from South Carolina's R&D tax credit specialists. No upfront cost. No obligation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/estimator" className="bg-blue-600 text-white font-bold px-10 py-4 rounded-xl text-lg">Calculate My Credit</Link>
            <Link href="/contact" className="bg-white/10 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl text-lg">Schedule a Call</Link>
          </div>
        </div>
      </section>
      <footer className="bg-slate-950 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2"><div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">CP</span></div><span className="font-bold text-white">CreditPath</span><span className="text-slate-500 text-sm ml-2">South Carolina R&D Tax Credit Specialists</span></div>
          <div className="flex gap-6"><Link href="/privacy" className="text-slate-600 text-xs">Privacy</Link><Link href="/terms" className="text-slate-600 text-xs">Terms</Link><Link href="/" className="text-slate-600 text-xs">Home</Link></div>
        </div>
      </footer>
    </div>
  );
}
