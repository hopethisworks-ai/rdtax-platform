import Link from "next/link";
import AssessmentForm from "@/components/AssessmentForm";

export const metadata = {
  title: "R&D Tax Credit for Construction Companies in SC | Alexander & Blake",
  description: "SC construction and engineering firms qualify for federal and state R&D tax credits on innovative methods, structural design, and building technology. Get your free assessment.",
};

export default function ConstructionPage() {
  return (
    <div className="bg-cream">
      <section className="py-16 md:py-20 px-6 bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-600/20 border border-amber-500/30 text-amber-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              Construction Industry
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">Construction Firms Qualify for <span className="text-amber-500">R&D Credits Too.</span></h1>
            <p className="text-lg text-slate-300 mb-8">If your team develops innovative methods, solves structural challenges, or designs complex systems, you likely qualify for significant R&D tax credits.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/estimator" className="bg-amber-700 text-white font-bold px-8 py-4 rounded-xl text-lg text-center">Calculate My Credit</Link>
              <Link href="/contact" className="bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg text-center">Free Consultation</Link>
            </div>
          </div>
          <AssessmentForm />
        </div>
      </section>
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900">What Construction Activities Qualify?</h2>
            <p className="text-slate-500 mt-3 text-lg">More of your engineering work qualifies than you might think</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Innovative Construction Methods", desc: "Developing new construction techniques or building approaches that solve specific technical challenges — including modular, tilt-up, or hybrid methods." },
              { title: "Structural Engineering Design", desc: "Engineering analysis involving uncertainty including complex structural systems, foundation solutions, and load-bearing innovations." },
              { title: "MEP Systems Engineering", desc: "Mechanical, electrical, and plumbing systems design involving technical experimentation and integration of complex building systems." },
              { title: "Environmental Solutions", desc: "Stormwater management, soil stabilization, environmental remediation, LEED-driven innovations, or sustainable construction techniques." },
              { title: "Building Envelope Design", desc: "Innovative work on building envelopes, insulation systems, moisture control, or energy-efficient wall assemblies involving technical uncertainty." },
              { title: "Construction Technology", desc: "New construction technology, BIM applications, prefabrication, modular construction systems, and drone-based site surveying." },
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
            <h2 className="text-4xl font-black text-slate-900 mb-6">Real Results for SC Construction Firms</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">A Charleston-area general contractor had never considered R&D credits. After our assessment, we identified $680,000 in qualifying expenses across structural engineering, MEP design, and innovative site work — recovering $89,000 in combined federal and SC state credits.</p>
            <div className="space-y-3">
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-500 text-sm">Industry</span><span className="font-bold text-slate-900 text-sm">General Contracting / Design-Build</span></div>
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-500 text-sm">Location</span><span className="font-bold text-slate-900 text-sm">Charleston, SC</span></div>
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-500 text-sm">Qualifying Expenses</span><span className="font-bold text-slate-900 text-sm">$680,000</span></div>
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-500 text-sm">Federal Credit</span><span className="font-bold text-slate-900 text-sm">$55,000</span></div>
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-500 text-sm">SC State Credit</span><span className="font-bold text-slate-900 text-sm">$34,000</span></div>
              <div className="flex justify-between py-3"><span className="text-slate-900 font-bold text-sm">Total Recovered</span><span className="font-black text-amber-700 text-xl">$89,000</span></div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h3>
            <details className="border border-slate-200 rounded-xl overflow-hidden">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50">Does construction work really qualify for R&D credits?</summary>
              <div className="px-6 pb-4 text-slate-600 text-sm">Yes. The IRS has affirmed that construction activities involving technical uncertainty qualify. This includes structural engineering, innovative building methods, MEP integration, environmental solutions, and any work requiring experimentation to resolve technical challenges.</div>
            </details>
            <details className="border border-slate-200 rounded-xl overflow-hidden">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50">What about design-build firms?</summary>
              <div className="px-6 pb-4 text-slate-600 text-sm">Design-build firms often have the highest qualifying percentages because both the design and construction phases can involve qualifying R&D activities. Engineering time, prototyping, testing, and iterative problem-solving all count.</div>
            </details>
            <details className="border border-slate-200 rounded-xl overflow-hidden">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50">What records do construction companies need?</summary>
              <div className="px-6 pb-4 text-slate-600 text-sm">Payroll records for engineers and project managers, project documentation, RFIs, engineering calculations, change orders related to technical challenges, and contractor invoices. We help you identify and organize what you already have.</div>
            </details>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Get Your Free Construction R&D Assessment</h2>
          <p className="text-slate-400 text-lg mb-10">Find out exactly what your construction company qualifies for. No upfront cost. No obligation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/estimator" className="bg-amber-700 text-white font-bold px-10 py-4 rounded-xl text-lg">Calculate My Credit</Link>
            <Link href="/contact" className="bg-white/10 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl text-lg">Schedule a Call</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
