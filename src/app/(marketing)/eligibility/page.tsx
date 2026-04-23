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
            <p className="text-secondary text-lg mb-3">
              Answer five questions to receive an immediate preliminary assessment. No obligation, no commitment — just a clear starting point.
            </p>
            <p className="text-secondary text-sm">
              This is a preliminary screen only. No records are required and no information is stored unless you choose to continue.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <EligibilityQuiz />
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
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

          {/* Who This Is Best For */}
          <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-8">
            <h3 className="font-bold text-navy mb-4 text-center">This Assessment Is Best For</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Companies investing in product development or process improvement",
                "Software teams building custom applications or platforms",
                "Manufacturers developing new processes or tooling",
                "Engineering firms solving technical design challenges",
                "Businesses that have never explored R&D credits before",
                "Companies with a CPA who may want specialist R&D support",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span className="text-body-text text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-8 bg-surface border border-gray-200 rounded-2xl p-8 text-center">
            <h3 className="font-bold text-navy mb-2">What To Do Next</h3>
            <p className="text-body-text text-sm mb-4">
              Based on your result, you can estimate your potential credit or speak directly with our team. The initial consultation is complimentary, with no obligation and no records required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-lg text-sm text-center transition-colors"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/estimator"
                className="bg-white border border-secondary/30 text-body-text font-semibold px-6 py-2.5 rounded-lg text-sm text-center hover:bg-surface transition-colors"
              >
                Estimate Your Credit
              </Link>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-secondary">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
              No data stored without consent
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
              No records required
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              No obligation
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
