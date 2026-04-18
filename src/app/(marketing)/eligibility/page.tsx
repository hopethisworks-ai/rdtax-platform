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
            <span className="inline-flex items-center gap-2 bg-surface border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Free 2-Minute Quiz
            </span>
            <h1 className="text-4xl md:text-5xl font-normal text-navy mb-4">
              Does Your Business Qualify for R&amp;D Tax Credits?
            </h1>
            <p className="text-secondary text-lg">
              Answer five questions to receive an immediate preliminary assessment. No obligation, no commitment — just a clear answer.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <EligibilityQuiz />
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-surface rounded-xl p-4">
              <div className="text-2xl font-black text-navy">2 min</div>
              <div className="text-secondary text-xs mt-1">To complete</div>
            </div>
            <div className="bg-surface rounded-xl p-4">
              <div className="text-2xl font-black text-navy">Free</div>
              <div className="text-secondary text-xs mt-1">No cost ever</div>
            </div>
            <div className="bg-surface rounded-xl p-4">
              <div className="text-2xl font-black text-navy">Instant</div>
              <div className="text-secondary text-xs mt-1">Results</div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-surface border border-gray-200 rounded-2xl p-8 text-center">
            <p className="text-body-text text-sm font-medium mb-4">
              Prefer to talk to someone? Get a free 30-minute assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-lg text-sm text-center transition-colors"
              >
                Schedule Free Consultation
              </Link>
              <Link
                href="/estimator"
                className="bg-white border border-secondary/30 text-body-text font-semibold px-6 py-2.5 rounded-lg text-sm text-center hover:bg-surface transition-colors"
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
