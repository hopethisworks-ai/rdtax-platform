import Link from "next/link";
import AssessmentForm from "@/components/AssessmentForm";

export const metadata = {
  title: "R&D Tax Credit for Software Companies in South Carolina | Alexander & Blake",
  description: "SC software and technology companies qualify for federal and state R&D tax credits on custom development, algorithms, platforms, and more. Get your free assessment.",
};

export default function SoftwarePage() {
  return (
    <div className="bg-white">
      <section className="py-16 md:py-20 px-6 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span>
              Software and Technology Industry
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">Your Code Is Worth <span className="text-teal-400">More Than You Think.</span></h1>
            <p className="text-lg text-slate-300 mb-8">Software companies routinely miss out on R&D tax credits for work they are already doing — custom development, new algorithms, platform building, and internal tools all qualify.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/estimator" className="bg-teal-600 text-white font-bold px-8 py-4 rounded-xl text-lg text-center">Calculate My Credit</Link>
              <Link href="/contact" className="bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg text-center">Free Consultation</Link>
            </div>
          </div>
          <AssessmentForm />
        </div>
      </section>
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900">What Software Activities Qualify?</h2>
            <p className="text-slate-500 mt-3 text-lg">Most software development qualifies — including work your team does every day</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Custom Software Development", desc: "Building new software products, platforms, or applications where the technical approach involves uncertainty and experimentation." },
              { title: "Algorithm Development", desc: "Creating new algorithms, data models, machine learning systems, or optimization logic that solves technical problems in novel ways." },
              { title: "API and Integration Work", desc: "Developing new APIs, system integrations, or data pipelines that require technical experimentation to achieve the desired outcome." },
              { title: "Internal Tools", desc: "Building proprietary internal tools, dashboards, or automation systems that improve business operations through technical innovation." },
              { title: "Performance Optimization", desc: "Significant work to improve system performance, scalability, reliability, or security through technical research and testing." },
              { title: "New Technology Adoption", desc: "Experimenting with and implementing new technologies, frameworks, or architectures to solve business problems in new ways." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-6">Real Results for SC Software Companies</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">A Greenville-based software firm had been developing a custom platform for 3 years without ever claiming R&D credits. We identified $800,000 in qualifying developer salaries and recovered $156,000 in combined federal and SC state credits.</p>
            <div className="space-y-3">
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-500 text-sm">Industry</span><span className="font-bold text-slate-900 text-sm">SaaS Software Development</span></div>
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-500 text-sm">Location</span><span className="font-bold text-slate-900 text-sm">Greenville, SC</span></div>
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-500 text-sm">Qualifying Expenses</span><span className="font-bold text-slate-900 text-sm">$800,000</span></div>
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-500 text-sm">Federal Credit</span><span className="font-bold text-slate-900 text-sm">$116,000</span></div>
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-500 text-sm">SC State Credit</span><span className="font-bold text-slate-900 text-sm">$40,000</span></div>
              <div className="flex justify-between py-3"><span className="text-slate-900 font-bold text-sm">Total Recovered</span><span className="font-black text-teal-600 text-xl">$156,000</span></div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h3>
            <details className="border border-slate-200 rounded-xl overflow-hidden">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50">Does off-the-shelf software development qualify?</summary>
              <div className="px-6 pb-4 text-slate-600 text-sm">Internal use software can qualify if it meets specific IRS tests. Custom-developed software for clients or for sale almost always qualifies. We evaluate each project individually.</div>
            </details>
            <details className="border border-slate-200 rounded-xl overflow-hidden">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50">Do developer salaries count as qualifying expenses?</summary>
              <div className="px-6 pb-4 text-slate-600 text-sm">Yes. Developer and engineer wages spent on qualifying R&D activities are the largest category of qualifying expenses for most software companies. Contract developer costs also qualify at 65%.</div>
            </details>
            <details className="border border-slate-200 rounded-xl overflow-hidden">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50">What if we use agile or iterative development?</summary>
              <div className="px-6 pb-4 text-slate-600 text-sm">Agile development actually aligns well with the IRS process of experimentation test. Sprint-based development with iteration and testing is a strong indicator of qualifying R&D activity.</div>
            </details>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Get Your Free Software R&D Assessment</h2>
          <p className="text-slate-400 text-lg mb-10">Find out how much your development work qualifies for. No upfront cost. No obligation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/estimator" className="bg-teal-600 text-white font-bold px-10 py-4 rounded-xl text-lg">Calculate My Credit</Link>
            <Link href="/contact" className="bg-white/10 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl text-lg">Schedule a Call</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
