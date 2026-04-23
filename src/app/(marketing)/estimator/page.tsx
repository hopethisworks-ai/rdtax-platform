"use client";
import { useState } from "react";
import Link from "next/link";

const INDUSTRIES = [
  "Manufacturing",
  "Software and Technology",
  "Construction and Engineering",
  "Biotech and Life Sciences",
  "Automotive",
  "Food and Beverage",
  "Agriculture",
  "Energy",
  "Defense",
  "Other",
];
const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];
const REVENUE_BANDS = [
  "Under $1M",
  "$1M - $5M",
  "$5M - $20M",
  "$20M - $50M",
  "$50M - $100M",
  "Over $100M",
];

interface EstimateResult {
  estimateLow: number;
  estimateHigh: number;
  scCreditLow: number;
  scCreditHigh: number;
  disclaimer: string;
}

export default function EstimatorPage() {
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    industry: "",
    state: "SC",
    revenueBand: "",
    employeeCount: "",
    annualPayroll: "",
    contractorSpend: "",
    supplySpend: "",
    priorCreditClaimed: false,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/estimator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: form.companyName,
          contactName: form.contactName,
          email: form.email,
          phone: form.phone || undefined,
          industry: form.industry || undefined,
          state: form.state || undefined,
          revenueBand: form.revenueBand || undefined,
          employeeCount: form.employeeCount ? parseInt(form.employeeCount) : undefined,
          annualPayroll: parseFloat(form.annualPayroll),
          contractorSpend: parseFloat(form.contractorSpend || "0"),
          supplySpend: parseFloat(form.supplySpend || "0"),
          priorCreditClaimed: form.priorCreditClaimed,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error?.toString() ?? "Error");
        return;
      }
      setResult(data);
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fmt = (n: number) => "$" + n.toLocaleString();

  if (result)
    return (
      <div className="bg-white">
        <div className="py-16 md:py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-surface border border-primary/20 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Your Estimate Is Ready
              </div>
              <h1 className="text-4xl font-normal text-navy mb-3">
                Your Preliminary Credit Estimate
              </h1>
              <p className="text-secondary text-lg">
                Based on the financial information you provided
              </p>
            </div>
            <div className="bg-primary rounded-2xl p-10 text-center mb-6">
              <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-3">
                Federal R&amp;D Tax Credit Estimate
              </p>
              <div className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-2">
                {fmt(result.estimateLow)} – {fmt(result.estimateHigh)}
              </div>
              {result.scCreditHigh > 0 && (
                <div className="mt-4 bg-white/20 rounded-xl px-6 py-3 inline-block">
                  <span className="text-white text-sm font-semibold">
                    + {fmt(result.scCreditLow)} – {fmt(result.scCreditHigh)} SC State Credit
                  </span>
                </div>
              )}
            </div>
            {result.scCreditHigh > 0 && (
              <div className="bg-slate-900 rounded-2xl p-6 text-center mb-6">
                <p className="text-secondary text-sm mb-2">Combined Federal + SC State Estimate</p>
                <div className="text-4xl font-black text-white">
                  {fmt(result.estimateLow + result.scCreditLow)} –{" "}
                  {fmt(result.estimateHigh + result.scCreditHigh)}
                </div>
                <p className="text-secondary text-xs mt-2">
                  Federal and state credits coordinated together
                </p>
              </div>
            )}
            <div className="bg-surface border border-primary/20 rounded-xl p-6 mb-8">
              <p className="text-primary font-bold text-sm mb-1">
                This is a preliminary estimate only
              </p>
              <p className="text-primary text-xs leading-relaxed">{result.disclaimer}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6">
              <h2 className="text-xl font-bold text-navy mb-2">
                Interested in a Detailed Study?
              </h2>
              <p className="text-secondary text-sm mb-6">
                This estimate is a starting point. A detailed credit study will refine these numbers based on a thorough review of your qualifying activities, financial data, and documentation. The initial consultation is complimentary.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-primary text-white font-semibold px-8 py-4 rounded-xl text-lg text-center flex-1 hover:bg-primary-dark transition-colors"
                >
                  Schedule a Consultation
                </Link>
                <Link
                  href="/eligibility"
                  className="bg-slate-50 border border-gray-200 text-body-text font-semibold px-8 py-4 rounded-xl text-lg text-center flex-1 hover:bg-slate-100 transition-colors"
                >
                  Evaluate Eligibility
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="font-black text-navy">20%</div>
                <div className="text-secondary text-xs mt-1">Contingency fee only</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="font-black text-navy">60 days</div>
                <div className="text-secondary text-xs mt-1">To filing</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="font-black text-navy">100%</div>
                <div className="text-secondary text-xs mt-1">Audit defense</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-white">
      <div className="py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
              Credit Estimator
            </span>
            <h1 className="text-4xl font-normal text-navy mb-3">
              Estimate Your R&amp;D Tax Credit
            </h1>
            <p className="text-secondary text-lg">
              A preliminary estimate based on your financial information. This is a starting point — not a final determination. A detailed credit study will refine these numbers.
            </p>
          </div>
          <div className="bg-surface border border-primary/20 rounded-xl p-4 mb-8 flex items-start gap-3">
            <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5h.01" />
            </svg>
            <div>
              <p className="text-navy font-semibold text-sm">South Carolina businesses may benefit from both credits</p>
              <p className="text-primary text-xs">
                South Carolina offers an additional 5% state R&amp;D credit that can be coordinated alongside the federal benefit. Select SC as your state to see a combined estimate.
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-8"
          >
            <div>
              <h2 className="font-black text-navy text-lg mb-4 pb-2 border-b border-gray-100">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-body-text mb-1">
                    Company Name *
                  </label>
                  <input
                    required
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-body-text mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-body-text mb-1">
                    Work Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-body-text mb-1">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-black text-navy text-lg mb-4 pb-2 border-b border-gray-100">
                Business Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-body-text mb-1">Industry</label>
                  <select
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select industry</option>
                    {INDUSTRIES.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-body-text mb-1">State</label>
                  <select
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {US_STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-body-text mb-1">
                    Revenue Band
                  </label>
                  <select
                    value={form.revenueBand}
                    onChange={(e) => setForm({ ...form, revenueBand: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select range</option>
                    {REVENUE_BANDS.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-body-text mb-1">
                    Total Employees
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.employeeCount}
                    onChange={(e) => setForm({ ...form, employeeCount: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. 50"
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-black text-navy text-lg mb-1 pb-2 border-b border-gray-100">
                Financial Details
              </h2>
              <p className="text-secondary text-xs mb-4">
                Used only to calculate your estimate. Never shared.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-body-text mb-1">
                    Annual US Payroll (W-2 Wages) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-secondary text-sm">$</span>
                    <input
                      required
                      type="number"
                      min="0"
                      placeholder="2,000,000"
                      value={form.annualPayroll}
                      onChange={(e) => setForm({ ...form, annualPayroll: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <p className="text-secondary text-xs mt-1">Total W-2 wages paid to US employees in the most recent tax year</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-body-text mb-1">
                    Contractor Spend
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-secondary text-sm">$</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="500,000"
                      value={form.contractorSpend}
                      onChange={(e) => setForm({ ...form, contractorSpend: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <p className="text-secondary text-xs mt-1">Payments to outside contractors for qualifying technical work</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-body-text mb-1">
                    Supply and Prototype Spend
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-secondary text-sm">$</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="100,000"
                      value={form.supplySpend}
                      onChange={(e) => setForm({ ...form, supplySpend: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <p className="text-secondary text-xs mt-1">Raw materials, components, and supplies consumed in R&amp;D activities</p>
                </div>
                <div className="sm:col-span-2 flex items-center gap-3 bg-slate-50 rounded-lg p-4">
                  <input
                    type="checkbox"
                    id="prior"
                    checked={form.priorCreditClaimed}
                    onChange={(e) => setForm({ ...form, priorCreditClaimed: e.target.checked })}
                    className="w-5 h-5 text-primary rounded cursor-pointer"
                  />
                  <label htmlFor="prior" className="text-sm text-body-text">
                    We have claimed the R&amp;D tax credit in a prior year
                  </label>
                </div>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl text-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Preparing Your Estimate..." : "Get Preliminary Estimate"}
            </button>
            <p className="text-xs text-secondary text-center">
              Your information is never sold or shared. This estimate does not constitute tax advice.
            </p>
          </form>

          {/* Reassurance Block */}
          <div className="mt-10 bg-surface border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-navy text-sm mb-4">What Happens After This Estimate</h3>
            <div className="space-y-3 mb-4">
              {[
                "This is a preliminary estimate only — your final credit depends on a detailed study of qualifying activities and expenses",
                "There is no obligation attached to this estimate",
                "If the estimate suggests meaningful credit potential, you can schedule a complimentary consultation to discuss a detailed study",
                "Sensitive financial records are not requested at this stage — only basic company and expense information",
                "Your information is handled securely and never shared with third parties",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span className="text-body-text text-xs leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <Link href="/contact" className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
              Schedule a Consultation
            </Link>
          </div>

          {/* Security Footer */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-secondary">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
              Encrypted data handling
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
              No obligation
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" /></svg>
              <Link href="/privacy" className="underline hover:text-primary transition-colors">Privacy policy</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
