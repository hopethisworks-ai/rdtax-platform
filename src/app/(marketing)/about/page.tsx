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
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-emerald-50">
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
              { title: "SC Focused", desc: "We are local specialists who understand SC industries, tax rules, and businesses.", icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg> },
              { title: "Audit-Ready", desc: "Every credit study is built to withstand IRS scrutiny. We follow ATG guidelines.", icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg> },
              { title: "No Upfront Cost", desc: "Pure contingency. 20% of credits recovered. No credits, no fee.", icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
              { title: "CPA Friendly", desc: "We work alongside your CPA — not instead of them. Seamless collaboration.", icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg> },
            ].map((card) => (
              <div key={card.title} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">{card.icon}</div>
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
