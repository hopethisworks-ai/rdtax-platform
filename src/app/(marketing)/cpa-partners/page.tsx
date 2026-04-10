import Link from "next/link";
import CpaPartnerForm from "./CpaPartnerForm";

export const metadata = {
  title: "CPA Partners | CreditPath R&D Tax Credit",
  description: "Partner with CreditPath to offer your clients R&D tax credit studies. We handle the specialty work. You keep the client relationship.",
};

export default function CpaPartnersPage() {
  return (
    <div className="bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">CP</span></div>
            <span className="font-bold text-slate-900 text-lg">CreditPath</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-sm text-slate-600 hover:text-slate-900">How It Works</Link>
            <Link href="/industries" className="text-sm text-slate-600 hover:text-slate-900">Industries</Link>
            <Link href="/about" className="text-sm text-slate-600 hover:text-slate-900">About</Link>
            <Link href="/cpa-partners" className="text-sm text-blue-600 font-semibold">CPA Partners</Link>
          </div>
          <Link href="/contact" className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg">Free Assessment</Link>
        </div>
      </nav>
      <section className="pt-32 pb-16 px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span>For Accounting Professionals</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 leading-tight mb-6">Add R&D Tax Credits to Your Practice. Without Adding Complexity.</h1>
          <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">CreditPath works alongside your practice to deliver R&D tax credit studies to your clients. You keep the client relationship. We handle the specialty work. Your clients get more value. Everyone wins.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link href="#partner-form" className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-lg text-center">Become a Partner</Link>
            <Link href="/how-it-works" className="bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-xl text-lg text-center">See How It Works</Link>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 border-b border-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><div className="text-4xl font-black text-blue-600 mb-2">$50K+</div><div className="text-slate-500 text-sm">Average credit per client</div></div>
          <div><div className="text-4xl font-black text-blue-600 mb-2">20%</div><div className="text-slate-500 text-sm">Contingency only -- no risk to client</div></div>
          <div><div className="text-4xl font-black text-blue-600 mb-2">60 days</div><div className="text-slate-500 text-sm">Assessment to filed credit study</div></div>
          <div><div className="text-4xl font-black text-blue-600 mb-2">100%</div><div className="text-slate-500 text-sm">Audit defense included</div></div>
        </div>
      </section>
      <section className="py-20 px-6 border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Why Partner With Us</p>
            <h2 className="text-3xl font-black text-slate-900">We Work For You. Not Instead of You.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="text-2xl mb-3"></div>
              <h3 className="font-bold text-slate-900 mb-2">You Keep the Client</h3>
              <p className="text-slate-500 text-sm leading-relaxed">We never solicit your clients for other services. Your client relationship stays yours. We are a specialty subcontractor, not a competitor.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="text-2xl mb-3"></div>
              <h3 className="font-bold text-slate-900 mb-2">We Handle the Heavy Lifting</h3>
              <p className="text-slate-500 text-sm leading-relaxed">R&D credit studies require deep technical documentation, business component analysis, and IRS ATG compliance. We handle all of it. You review and sign off.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="text-2xl mb-3"></div>
              <h3 className="font-bold text-slate-900 mb-2">Audit-Ready Documentation</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Every study we prepare is built to IRS ATG standards with full business component analysis, four-part test documentation, and funded research review. You file with confidence.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="text-2xl mb-3"></div>
              <h3 className="font-bold text-slate-900 mb-2">No Risk to Your Clients</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Our fee is 20% of credits recovered -- paid only when your client receives their credit. No upfront cost, no risk. If we do not find credits, no one pays anything.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="text-2xl mb-3"></div>
              <h3 className="font-bold text-slate-900 mb-2">Fast Turnaround</h3>
              <p className="text-slate-500 text-sm leading-relaxed">From engagement kickoff to delivered credit study in 60 days. Your clients see results fast. You look like a hero for bringing them the opportunity.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="text-2xl mb-3"></div>
              <h3 className="font-bold text-slate-900 mb-2">South Carolina Focused</h3>
              <p className="text-slate-500 text-sm leading-relaxed">We specialize in SC businesses. We understand SC industries, SC tax rules, and how to stack the federal credit with the SC state credit for maximum value.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl font-black text-slate-900">Simple Three-Step Process</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-l-4 border-blue-600 pl-6">
              <div className="text-blue-600 font-black text-lg mb-2">01</div>
              <h3 className="font-bold text-slate-900 mb-2">You Identify a Client</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Think about which clients are manufacturers, software companies, contractors, or engineers. If they are doing something new or improved -- they likely qualify. Refer them to us for a free assessment.</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <div className="text-blue-600 font-black text-lg mb-2">02</div>
              <h3 className="font-bold text-slate-900 mb-2">We Do the Work</h3>
              <p className="text-slate-500 text-sm leading-relaxed">We conduct the assessment, collect data through our secure portal, run the credit study, and prepare complete IRS-compliant documentation. We keep you informed throughout.</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <div className="text-blue-600 font-black text-lg mb-2">03</div>
              <h3 className="font-bold text-slate-900 mb-2">You File, Client Collects</h3>
              <p className="text-slate-500 text-sm leading-relaxed">We deliver the complete credit study to you. You file Form 6765 with your client's return. Your client collects their credit. We provide full audit defense if the IRS ever questions it.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Who Qualifies</p>
            <h2 className="text-3xl font-black text-slate-900">Which of Your Clients Should You Refer?</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">If your client answers yes to any of these questions, they likely qualify for the R&D tax credit.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              "Do they manufacture a product or develop a manufacturing process?",
              "Do they write custom software for clients or for internal operations?",
              "Do they design or engineer systems, structures, or equipment?",
              "Do they develop new formulas, compounds, or materials?",
              "Do they prototype or test new products before bringing them to market?",
              "Have they hired engineers, developers, scientists, or technical staff?",
              "Do they spend money on contractors for technical or development work?",
              "Are they trying to improve an existing product or process?",
            ].map((q, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
                <span className="text-green-500 font-bold text-lg flex-shrink-0">?</span>
                <p className="text-slate-700 text-sm leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-sm mt-8">When in doubt, refer them. Our free assessment takes 30 minutes and we will tell you and your client exactly what they qualify for.</p>
        </div>
      </section>
      <section className="py-20 px-6 border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Results</p>
            <h2 className="text-3xl font-black text-slate-900">What Our CPA Partners Are Seeing</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="text-3xl font-black text-blue-600 mb-2">$87,000</div>
              <p className="text-slate-700 text-sm font-semibold mb-1">SC Manufacturing Client</p>
              <p className="text-slate-500 text-sm">Federal and SC state credits combined. Client had never claimed the credit before. CPA referred after noticing new equipment purchases and process development activity.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="text-3xl font-black text-blue-600 mb-2">$142,000</div>
              <p className="text-slate-700 text-sm font-semibold mb-1">SC Software Company</p>
              <p className="text-slate-500 text-sm">Three years of amended returns plus current year. Client thought only pharmaceutical companies qualified. CPA referred after learning about the credit at a continuing education seminar.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="text-3xl font-black text-blue-600 mb-2">$63,000</div>
              <p className="text-slate-700 text-sm font-semibold mb-1">SC Engineering Firm</p>
              <p className="text-slate-500 text-sm">Current year credit on structural engineering and design work. Completed in 45 days. CPA filed Form 6765 with the annual return with full audit defense documentation in hand.</p>
            </div>
          </div>
          <p className="text-center text-slate-400 text-xs mt-8">Results are illustrative examples based on typical engagements. Actual credits depend on each client's specific facts and circumstances.</p>
        </div>
      </section>
      <section id="partner-form" className="py-20 px-6 bg-blue-600">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-4">Become a CreditPath Partner</h2>
            <p className="text-blue-100 text-lg">Tell us about your practice and we will reach out to discuss the partnership. No commitment required.</p>
          </div>
          <div className="bg-white rounded-2xl p-8">
            <CpaPartnerForm />
          </div>
        </div>
      </section>
      <footer className="bg-slate-950 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">CP</span></div>
            <span className="font-bold text-white">CreditPath</span>
            <span className="text-slate-500 text-sm ml-2">South Carolina R&D Tax Credit Specialists</span>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="text-slate-600 text-xs">Home</Link>
            <Link href="/about" className="text-slate-600 text-xs">About</Link>
            <Link href="/contact" className="text-slate-600 text-xs">Contact</Link>
            <Link href="/privacy" className="text-slate-600 text-xs">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
