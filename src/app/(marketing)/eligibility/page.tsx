import Link from "next/link";
import EligibilityQuiz from "@/components/EligibilityQuiz";

export const metadata = {
  title: "Eligibility Assessment | Alexander & Blake — R&D Tax Credit Advisory",
  description:
    "Complete a brief eligibility assessment to determine whether your South Carolina business qualifies for federal and state R&D tax credits. No obligation.",
};

export default function EligibilityPage() {
  return (
    <div className="bg-white">
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              Free 2-Minute Quiz
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Does Your Business Qualify for R&amp;D Tax Credits?
            </h1>
            <p className="text-slate-500 text-lg">
              Answer five questions to receive an immediate preliminary assessment. No obligation, no commitment — just a clear answer.
            </p>
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

          {/* CTA */}
          <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
            <p className="text-slate-700 text-sm font-medium mb-4">
              Prefer to talk to someone? Get a free 30-minute assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm text-center transition-colors"
              >
                Schedule Free Consultation
              </Link>
              <Link
                href="/estimator"
                className="bg-white border border-slate-300 text-slate-700 font-semibold px-6 py-2.5 rounded-lg text-sm text-center hover:bg-slate-50 transition-colors"
              >
                Calculate My Credit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
