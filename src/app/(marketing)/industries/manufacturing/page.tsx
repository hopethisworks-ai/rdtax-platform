import Link from "next/link";
import AssessmentForm from "@/components/AssessmentForm";

export const metadata = {
  title: "R&D Tax Credit for Manufacturers in South Carolina | CreditPath",
  description: "SC manufacturers qualify for federal and state R&D tax credits on process improvements, new product development, tooling, and more. Get your free assessment today.",
};

export default function ManufacturingPage() {
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
              Manufacturing Industry
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">SC Manufacturers Qualify for <span className="text-blue-400">Significant R&D Credits.</span></h1>
            <p className="text-lg text-slate-300 mb-8">If your team improves processes, develops new products, or solves engineering problems, you are likely leaving thousands in unclaimed tax credits on the table every year.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/estimator" className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-lg text-center">Calculate My Credit</Link>
              <Link href="/contact" className="bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg text-center">Free Consultation</Link>
            </div>
          </div>
          <AssessmentForm />
        </div>
      </section>
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900">What Manufacturing Activities Qualify?</h2>
            <p className="text-slate-500 mt-3 text-lg">You may be surprised how much of your everyday work qualifies</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Process Improvement", desc: "Developing or improving manufacturing processes, reducing defects, increasing efficiency, or improving yields all qualify as R&D activities." },
              { title: "New Product Development", desc: "Designing and developing new products, components, or materials — including prototype development, testing, and iteration." },
              { title: "Tooling and Die Design", desc: "Custom tooling, fixture design, die development, and related engineering work to support manufacturing operations." },
              { title: "Automation and Robotics", desc: "Designing, programming, and integrating automated systems, robotics, and custom machinery into production lines." },
              { title: "Materials Testing", desc: "Testing new materials, compounds, or formulations to determine suitability for manufacturing applications." },
              { title: "Quality Engineering", desc: "Developing new quality control methodologies, testing protocols, and inspection systems to meet tighter tolerances." },
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
            <h2 className="text-4xl font-black text-slate-900 mb-6">Real Results for SC Manufacturers</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">A Spartanburg-area manufacturer had filed taxes for 8 years without ever claiming R&D credits. After a free assessment, we identified $1.2M in qualifying research expenses and recovered $197,000 in combined federal and SC state credits.</p>
            <div className="space-y-3">
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-500 text-sm">Industry</span><span className="font-bold text-slate-900 text-sm">Automotive Parts Manufacturing</span></div>
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-500 text-sm">Location</span><span className="font-bold text-slate-900 text-sm">Spartanburg, SC</span></div>
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-500 text-sm">Qualifying Expenses</span><span className="font-bold text-slate-900 text-sm">$1,200,000</span></div>
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-500 text-sm">Federal Credit</span><span className="font-bold text-slate-900 text-sm">$137,000</span></div>
              <div className="flex justify-between py-3 border-b border-slate-200"><span className="text-slate-500 text-sm">SC State Credit</span><span className="font-bold text-slate-900 text-sm">$60,000</span></div>
              <div className="flex justify-between py-3"><span className="text-slate-900 font-bold text-sm">Total Recovered</span><span className="font-black text-blue-600 text-xl">$197,000</span></div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h3>
            <details className="border border-slate-200 rounded-xl overflow-hidden">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50">Does my manufacturing company qualify?</summary>
              <div className="px-6 pb-4 text-slate-600 text-sm">If your engineers or technicians spend time solving technical problems, developing new processes, or improving existing products, you almost certainly qualify. Most manufacturers are surprised by how much qualifies.</div>
            </details>
            <details className="border border-slate-200 rounded-xl overflow-hidden">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50">What records do I need?</summary>
              <div className="px-6 pb-4 text-slate-600 text-sm">Payroll records, project documentation, engineering notes, test results, and contractor invoices are the most common. We help you identify and organize what you already have.</div>
            </details>
            <details className="border border-slate-200 rounded-xl overflow-hidden">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50">How far back can I claim?</summary>
              <div className="px-6 pb-4 text-slate-600 text-sm">You can typically file amended returns going back 3 years for federal credits and up to the statute of limitations for SC state credits, meaning you may recover credits for years you never claimed.</div>
            </details>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Get Your Free Manufacturing R&D Assessment</h2>
          <p className="text-slate-400 text-lg mb-10">Find out exactly what your manufacturing company qualifies for. No upfront cost. No obligation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/estimator" className="bg-blue-600 text-white font-bold px-10 py-4 rounded-xl text-lg">Calculate My Credit</Link>
            <Link href="/contact" className="bg-white/10 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl text-lg">Schedule a Call</Link>
          </div>
        </div>
      </section>
      <footer className="bg-slate-950 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2"><div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">CP</span></div><span className="font-bold text-white">CreditPath</span><span className="text-slate-500 text-sm ml-2">R&D Tax Credit Specialists</span></div>
          <div className="flex gap-6"><Link href="/" className="text-slate-600 text-xs">Home</Link><Link href="/industries" className="text-slate-600 text-xs">Industries</Link><Link href="/contact" className="text-slate-600 text-xs">Contact</Link></div>
        </div>
      </footer>
    </div>
  );
}
