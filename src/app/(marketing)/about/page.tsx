import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About CreditPath | South Carolina R&D Tax Credit Specialists",
  description: "CreditPath is South Carolina's dedicated R&D tax credit platform. We help SC businesses claim every dollar they are owed.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section with image */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                We Help Businesses Claim What They&apos;ve Already Earned.
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                CreditPath is a dedicated R&amp;D tax credit specialist. We combine deep tax expertise with purpose-built technology to make claiming your credits simple, fast, and risk-free.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Team collaborating in modern office"
                width={800}
                height={550}
                className="object-cover w-full h-[380px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 px-6 bg-emerald-600">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { stat: "$50K+", label: "Avg credit per client" },
            { stat: "20%", label: "Contingency fee" },
            { stat: "60 Days", label: "To filing" },
            { stat: "100%", label: "IRS-compliant" },
          ].map((item) => (
            <div key={item.stat} className="text-center">
              <div className="text-3xl font-black text-white mb-1">{item.stat}</div>
              <div className="text-emerald-100 text-sm">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section with image */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Our Mission</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-5 leading-tight">Most Qualifying Businesses Never Claim a Dollar.</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              The R&amp;D tax credit has existed since 1981. Yet the vast majority of qualifying businesses never claim it — not because they don&apos;t qualify, but because they don&apos;t know they qualify, or the process seems too complex.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              We built CreditPath to fix that. We handle everything — identification, documentation, calculation, filing, and audit defense — so you can focus on running your business.
            </p>
            <p className="text-slate-700 font-semibold">Our fee is 20% of credits recovered. If we don&apos;t find credits, you pay nothing.</p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
              alt="Professional consulting meeting"
              width={800}
              height={600}
              className="object-cover w-full h-[380px]"
            />
          </div>
        </div>
      </section>

      {/* Values Cards */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Why CreditPath</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">What Sets Us Apart</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "SC Focused", desc: "We are local specialists who understand SC industries, tax rules, and businesses.", icon: "📍" },
              { title: "Audit-Ready", desc: "Every credit study is built to withstand IRS scrutiny. We follow ATG guidelines.", icon: "🛡️" },
              { title: "No Upfront Cost", desc: "Pure contingency. 20% of credits recovered. No credits, no fee.", icon: "💰" },
              { title: "CPA Friendly", desc: "We work alongside your CPA — not instead of them. Seamless collaboration.", icon: "🤝" },
            ].map((card) => (
              <div key={card.title} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">How We Work</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Free Assessment", desc: "We review your business in 30 minutes and tell you exactly what you qualify for." },
              { num: "02", title: "Data Collection", desc: "You upload records through our secure client portal. We handle the rest." },
              { num: "03", title: "Credit Study", desc: "We calculate your credit and prepare a complete IRS-compliant credit study." },
              { num: "04", title: "File & Collect", desc: "We coordinate filing with your CPA and provide full audit defense." },
            ].map((step) => (
              <div key={step.num} className="border-l-4 border-emerald-600 pl-6">
                <div className="text-emerald-600 font-black text-lg mb-2">{step.num}</div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Find Out What You Qualify For?</h2>
          <p className="text-lg text-emerald-100 mb-8">
            Free 30-minute assessment. No obligation, no upfront cost.
          </p>
          <Link href="/contact" className="inline-block bg-white text-emerald-600 font-bold px-10 py-4 rounded-xl text-lg hover:bg-slate-50 transition-colors shadow-lg">
            Get Free Assessment →
          </Link>
        </div>
      </section>
    </div>
  );
}
