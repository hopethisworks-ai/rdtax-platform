import Link from "next/link";
import AssessmentForm from "@/components/AssessmentForm";

export const metadata = {
  title: "R&D Tax Credit for Construction Companies in SC | CreditPath",
  description: "SC construction and engineering firms qualify for R&D tax credits. Get your free assessment.",
};

export default function ConstructionPage() {
  return (
    <div className="bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">CP</span></div>
            <span className="font-bold text-slate-900 text-lg">CreditPath</span>
          </div>
          <Link href="/contact" className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg">Free Assessment</Link>
        </div>
      </nav>
      <section className="pt-32 pb-24 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">Construction Firms Qualify for <span className="text-blue-400">R&D Credits Too.</span></h1>
            <p className="text-lg text-slate-300 mb-8">If your team develops innovative methods, solves structural challenges, or designs complex systems, you likely qualify for significant R&D tax credits.</p>
            <Link href="/estimator" className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-lg inline-block">Calculate My Credit</Link>
          </div>
          <AssessmentForm />
        </div>
      </section>
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900 text-center mb-12">What Construction Activities Qualify?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6"><h3 className="font-bold text-slate-900 mb-2">Innovative Construction Methods</h3><p className="text-slate-500 text-sm">Developing new construction techniques or building approaches that solve specific technical challenges.</p></div>
            <div className="bg-white border border-slate-200 rounded-xl p-6"><h3 className="font-bold text-slate-900 mb-2">Structural Engineering Design</h3><p className="text-slate-500 text-sm">Engineering analysis involving uncertainty including complex structural systems and foundation solutions.</p></div>
            <div className="bg-white border border-slate-200 rounded-xl p-6"><h3 className="font-bold text-slate-900 mb-2">MEP Systems Engineering</h3><p className="text-slate-500 text-sm">Mechanical, electrical, and plumbing systems design involving technical experimentation.</p></div>
            <div className="bg-white border border-slate-200 rounded-xl p-6"><h3 className="font-bold text-slate-900 mb-2">Environmental Solutions</h3><p className="text-slate-500 text-sm">Stormwater management, soil stabilization, environmental remediation, or sustainable construction.</p></div>
            <div className="bg-white border border-slate-200 rounded-xl p-6"><h3 className="font-bold text-slate-900 mb-2">Building Envelope Design</h3><p className="text-slate-500 text-sm">Innovative work on building envelopes, insulation systems, or moisture control involving technical uncertainty.</p></div>
            <div className="bg-white border border-slate-200 rounded-xl p-6"><h3 className="font-bold text-slate-900 mb-2">Construction Technology</h3><p className="text-slate-500 text-sm">New construction technology, BIM applications, prefabrication, or modular construction systems.</p></div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Get Your Free Construction R&D Assessment</h2>
          <p className="text-slate-400 text-lg mb-10">No upfront cost. No obligation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/estimator" className="bg-blue-600 text-white font-bold px-10 py-4 rounded-xl text-lg">Calculate My Credit</Link>
            <Link href="/contact" className="bg-white/10 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl text-lg">Schedule a Call</Link>
          </div>
        </div>
      </section>
      <footer className="bg-slate-950 py-12 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-bold text-white">CreditPath</span>
          <div className="flex gap-6"><Link href="/" className="text-slate-600 text-xs">Home</Link><Link href="/contact" className="text-slate-600 text-xs">Contact</Link></div>
        </div>
      </footer>
    </div>
  );
}
