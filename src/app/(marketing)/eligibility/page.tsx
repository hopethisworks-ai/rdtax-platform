import Link from "next/link";
import EligibilityQuiz from "@/components/EligibilityQuiz";

export const metadata = {
  title: "Am I Eligible for the R&D Tax Credit? | CreditPath",
  description: "Take our free 2-minute quiz to find out if your South Carolina business qualifies for federal and state R&D tax credits. No obligation.",
};

export default function EligibilityPage() {
  return (
    <div className="bg-white min-h-screen">
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
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              Free 2-Minute Quiz
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Does Your Business Qualify for R&D Tax Credits?</h1>
            <p className="text-slate-500 text-lg">Answer 5 quick questions and find out instantly. No obligation, no sales pitch — just answers.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <EligibilityQuiz />
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="text-2xl font-black text-slate-900">2 min</div>
              <div className="text-slate-500 text-xs mt-1">To complete</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="text-2xl font-black text-slate-900">Free</div>
              <div className="text-slate-500 text-xs mt-1">No cost ever</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="text-2xl font-black text-slate-900">Instant</div>
              <div className="text-slate-500 text-xs mt-1">Results</div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-slate-950 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2"><div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">CP</span></div><span className="font-bold text-white">CreditPath</span><span className="text-slate-500 text-sm ml-2">R&D Tax Credit Specialists</span></div>
          <div className="flex gap-6"><Link href="/" className="text-slate-600 text-xs">Home</Link><Link href="/contact" className="text-slate-600 text-xs">Contact</Link></div>
        </div>
      </footer>
    </div>
  );
}
