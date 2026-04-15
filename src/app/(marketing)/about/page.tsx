import Link from "next/link";

export const metadata = {
  title: "About CreditPath | South Carolina R&D Tax Credit Specialists",
  description: "CreditPath is South Carolina's dedicated R&D tax credit platform. We help SC businesses claim every dollar they are owed.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-4">About Us</p>
          <h1 className="text-5xl font-black text-slate-900 leading-tight mb-6">We Help Businesses Claim What They've Already Earned.</h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">CreditPath is a dedicated R&D tax credit specialist. We combine deep tax expertise with purpose-built technology to make claiming your credits simple, fast, and risk-free.</p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-6 bg-emerald-50">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-black text-emerald-600 mb-2">$50K+</div>
            <div className="text-slate-600 text-sm">Avg credit per client</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-emerald-600 mb-2">20%</div>
            <div className="text-slate-600 text-sm">Contingency fee</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-emerald-600 mb-2">60 days</div>
            <div className="text-slate-600 text-sm">To filing</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-emerald-600 mb-2">100%</div>
            <div className="text-slate-600 text-sm">IRS-compliant</div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-4">Our Mission</p>
            <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">Most Qualifying Businesses Never Claim a Dollar.</h2>
            <p className="text-slate-600 leading-relaxed mb-5">The R&D tax credit has existed since 1981. Yet the vast majority of qualifying businesses never claim it — not because they don't qualify, but because they don't know they qualify, or the process seems too complex.</p>
            <p className="text-slate-600 leading-relaxed mb-5">We built CreditPath to fix that. We handle everything — identification, documentation, calculation, filing, and audit defense — so you can focus on running your business.</p>
            <p className="text-slate-600 leading-relaxed">Our fee is 20% of credits recovered. If we don't find credits, you pay nothing.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">SC Focused</h3>
              <p className="text-slate-600 text-sm leading-relaxed">We are local specialists who understand SC industries, tax rules, and businesses.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">Audit-Ready Documentation</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Every credit study is built to withstand IRS scrutiny. We follow IRS ATG guidelines with thorough, defensible documentation.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">No Upfront Cost</h3>
              <p className="text-slate-600 text-sm leading-relaxed">We work on pure contingency. Our fee is 20% of credits recovered. If we don't find credits, you pay nothing.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">CPA Friendly</h3>
              <p className="text-slate-600 text-sm leading-relaxed">We work alongside your CPA — not instead of them. We handle R&D credit work so your CPA can focus elsewhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-4 text-center">Our Process</p>
          <h2 className="text-4xl font-black text-slate-900 mb-12 text-center leading-tight">How We Work</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="border-l-4 border-emerald-600 pl-6">
              <div className="text-emerald-600 font-black text-lg mb-2">01</div>
              <h3 className="font-bold text-slate-900 mb-2">Free Assessment</h3>
              <p className="text-slate-600 text-sm">We review your business in 30 minutes and tell you exactly what you qualify for.</p>
            </div>
            <div className="border-l-4 border-emerald-600 pl-6">
              <div className="text-emerald-600 font-black text-lg mb-2">02</div>
              <h3 className="font-bold text-slate-900 mb-2">Data Collection</h3>
              <p className="text-slate-600 text-sm">You upload records through our secure client portal. We handle the rest.</p>
            </div>
            <div className="border-l-4 border-emerald-600 pl-6">
              <div className="text-emerald-600 font-black text-lg mb-2">03</div>
              <h3 className="font-bold text-slate-900 mb-2">Credit Study</h3>
              <p className="text-slate-600 text-sm">We calculate your credit and prepare a complete IRS-compliant credit study.</p>
            </div>
            <div className="border-l-4 border-emerald-600 pl-6">
              <div className="text-emerald-600 font-black text-lg mb-2">04</div>
              <h3 className="font-bold text-slate-900 mb-2">File & Collect</h3>
              <p className="text-slate-600 text-sm">We coordinate filing with your CPA and provide full audit defense. You collect.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-emerald-600">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-black text-white mb-6 leading-tight">Ready to Find Out What You Qualify For?</h2>
            <p className="text-emerald-50 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">Get a free assessment from R&D tax credit specialists. We'll tell you exactly what your business qualifies for — no obligation, no upfront cost.</p>
            <div className="space-y-3 mb-8 max-w-lg mx-auto text-left">
              <div className="flex items-center gap-3">
                <span className="text-emerald-200 flex-shrink-0">✓</span>
                <span className="text-emerald-50 text-sm">Free 30-minute assessment call</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-200 flex-shrink-0">✓</span>
                <span className="text-emerald-50 text-sm">No upfront cost — contingency only</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-200 flex-shrink-0">✓</span>
                <span className="text-emerald-50 text-sm">Full audit defense included</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-200 flex-shrink-0">✓</span>
                <span className="text-emerald-50 text-sm">Federal and state credits stacked</span>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Get Free Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
