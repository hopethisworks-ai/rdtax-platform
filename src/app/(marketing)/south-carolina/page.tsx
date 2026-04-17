import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "South Carolina R&D Tax Credit | Alexander & Blake Advisory",
  description:
    "South Carolina offers a 5% state R&D tax credit that stacks on top of the federal credit. Alexander & Blake prepares audit-ready credit studies for SC manufacturers, software companies, and engineering firms.",
};

export default function SouthCarolinaPage() {
  return (
    <div className="bg-white">
      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=80"
            alt="Modern business workspace"
            width={1400}
            height={600}
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
                South Carolina R&amp;D Tax Credit
              </span>
              <h1 className="text-4xl md:text-5xl font-normal text-white leading-tight mb-6">
                The SC R&amp;D Tax Credit:{" "}
                <span className="text-teal-400">What Your Business Is Owed.</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                South Carolina offers a 5% R&amp;D tax credit on top of the federal credit. The majority of qualifying SC businesses have never claimed it. Alexander &amp; Blake changes that.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/estimator"
                  className="bg-teal-600 text-white font-bold px-8 py-4 rounded-xl text-lg text-center hover:bg-teal-700 transition-colors"
                >
                  Calculate My Credit
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg text-center hover:bg-white/20 transition-colors"
                >
                  Free Consultation
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "5%", label: "SC State Credit Rate on Qualifying Expenses" },
                { stat: "10 yrs", label: "Credit Carryforward Period" },
                { stat: "50%", label: "Max Credit vs SC Tax Liability" },
                { stat: "Federal+", label: "Stack With Federal Credit for Max Recovery" },
              ].map((item) => (
                <div key={item.stat} className="bg-white/10 rounded-xl p-6 border border-white/10">
                  <div className="text-3xl font-black text-white mb-1">{item.stat}</div>
                  <div className="text-teal-200 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          KEY FACTS
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-teal-600 text-xs font-bold uppercase tracking-widest">
              Key Facts
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-slate-800 mt-3">
              SC R&amp;D Tax Credit — What You Need to Know
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "What is the SC R&D Tax Credit?",
                a: "A state income tax credit equal to 5% of qualified research expenses incurred in South Carolina. It follows the same rules as the federal credit under IRC Section 41.",
              },
              {
                q: "Who qualifies?",
                a: "Any business operating in SC that incurs qualified research expenses — manufacturers, software developers, construction firms, biotech companies, and engineers — regardless of size.",
              },
              {
                q: "How is it calculated?",
                a: "The credit equals 5% of SC qualified research expenses that exceed the base amount, using the same methodology as the federal credit. Cannot exceed 50% of SC income tax liability.",
              },
              {
                q: "Can I claim both federal and state?",
                a: "Yes. SC businesses can claim both the federal R&D credit (up to 20% of QREs) AND the SC state credit (5% of SC QREs) for the same qualifying expenses.",
              },
              {
                q: "What about unused credit?",
                a: "Unused SC R&D credits carry forward for up to 10 years, allowing businesses to benefit even in lower-profit years.",
              },
              {
                q: "How do I file?",
                a: "File SC Schedule TC-18 (Research Expenses Credit) with your annual SC state tax return. You must also claim or be eligible for the federal credit under IRC Section 41.",
              },
            ].map((item) => (
              <div key={item.q} className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3 text-lg">{item.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SC CITIES
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-teal-600 text-xs font-bold uppercase tracking-widest">
              Local Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-slate-800 mt-3">
              SC Cities We Serve
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              "Spartanburg",
              "Greenville",
              "Charleston",
              "Columbia",
              "Rock Hill",
              "Summerville",
              "Florence",
              "Hilton Head",
              "Anderson",
              "Myrtle Beach",
            ].map((city) => (
              <div
                key={city}
                className="bg-stone-50 border border-slate-200 rounded-xl p-4 text-center"
              >
                <div className="font-semibold text-slate-800 text-sm">{city}</div>
                <div className="text-slate-400 text-xs mt-1">South Carolina</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ILLUSTRATIVE CASE STUDY
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1400&q=80"
            alt="Manufacturing facility"
            width={1400}
            height={800}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-teal-800/80" />
        </div>
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-teal-300 text-xs font-bold uppercase tracking-widest">
              Illustrative Example
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-white mt-3 mb-6">
              SC Manufacturer Recovered Combined Credits
            </h2>
            <p className="text-teal-100 mb-8 leading-relaxed">
              A Spartanburg-area manufacturing company had filed taxes for years without ever claiming
              R&amp;D credits. After a free assessment, qualifying research expenses were identified
              and both federal and SC state credits were recovered.
            </p>
            <div className="space-y-3">
              {[
                ["Industry", "Manufacturing"],
                ["Location", "Spartanburg, SC"],
                ["Credits Claimed", "Federal + SC State"],
                ["Method", "3-year lookback + current year"],
                ["Timeline", "Completed in 60 days"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between py-2 border-b border-teal-700/50"
                >
                  <span className="text-teal-200 text-sm">{label}</span>
                  <span className="text-white font-semibold text-sm">{value}</span>
                </div>
              ))}
            </div>
            <p className="text-teal-300/60 text-xs mt-4">
              This example is illustrative. Actual results depend on qualifying activities and
              expenses.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-white font-bold text-lg mb-4">See What You Could Recover</h3>
            <p className="text-teal-100 text-sm mb-6">
              Get a free estimate in under 2 minutes — no obligation, no upfront cost.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/estimator"
                className="bg-white text-teal-700 font-bold px-8 py-4 rounded-xl text-center hover:bg-stone-50 transition-colors"
              >
                Calculate My Credit
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl text-center hover:bg-white/10 transition-colors"
              >
                Schedule a Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-teal-600 text-xs font-bold uppercase tracking-widest">
              Common Questions
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-slate-800 mt-3">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "Is the SC R&D credit refundable?",
                a: "No, the SC R&D credit is non-refundable. However, unused credits can be carried forward for up to 10 years to offset future SC tax liability.",
              },
              {
                q: "Do I need to claim the federal credit too?",
                a: "Yes. South Carolina follows federal R&D credit rules, so you must claim or be eligible for the federal credit under IRC Section 41 to qualify for the SC state credit.",
              },
              {
                q: "Can small businesses and startups claim the SC credit?",
                a: "Yes. Any SC business that performs qualified research activities can claim the credit regardless of size. There is no minimum revenue or employee requirement.",
              },
              {
                q: "Can I file amended returns to claim past credits?",
                a: "Yes. If you did not originally claim the SC R&D credit, you can file an amended return within the statute of limitations — often going back 3 years.",
              },
              {
                q: "What industries qualify in South Carolina?",
                a: "Manufacturing, software development, construction engineering, biotech, automotive, aerospace, food and beverage, and many more. If your team solves technical problems, you likely qualify.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="bg-white rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow group border border-slate-100"
              >
                <summary className="flex items-center justify-between font-bold text-slate-900">
                  <span>{faq.q}</span>
                  <svg
                    className="w-5 h-5 text-teal-600 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-slate-600 mt-3 leading-relaxed text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-teal-50 border-t border-teal-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-slate-800 mb-4">
            Ready to Claim Your SC R&amp;D Credits?
          </h2>
          <p className="text-lg text-slate-500 mb-8">
            Free assessment from South Carolina&apos;s R&amp;D tax credit specialists. No upfront
            cost. No obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-teal-600 text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-teal-700 transition-colors shadow-md"
            >
              Schedule Free Assessment
            </Link>
            <Link
              href="/estimator"
              className="border-2 border-stone-300 text-slate-700 font-bold px-10 py-4 rounded-xl text-lg hover:border-teal-600 hover:text-teal-600 transition-colors"
            >
              Estimate My Credit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
