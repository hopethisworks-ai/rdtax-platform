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
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Your Estimate Is Ready
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-3">
                Your Estimated R&amp;D Tax Credit
              </h1>
              <p className="text-slate-500 text-lg">
                Based on the financial information you provided
              </p>
            </div>
            <div className="bg-teal-600 rounded-2xl p-10 text-center mb-6">
              <p className="text-teal-100 text-sm font-semibold uppercase tracking-widest mb-3">
                Federal R&amp;D Tax Credit Estimate
              </p>
              <div className="text-6xl font-black text-white mb-2">
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
                <p className="text-slate-400 text-sm mb-2">Combined Federal + SC State Estimate</p>
                <div className="text-4xl font-black text-white">
                  {fmt(result.estimateLow + result.scCreditLow)} –{" "}
                  {fmt(result.estimateHigh + result.scCreditHigh)}
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  Stack both credits for maximum recovery
                </p>
              </div>
            )}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
              <p className="text-amber-800 font-bold text-sm mb-1">
                This is a preliminary estimate only
              </p>
              <p className="text-amber-700 text-xs leading-relaxed">{result.disclaimer}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-6">
              <h2 className="text-xl font-black text-slate-900 mb-2">
                Ready to Claim Your Credits?
              </h2>
              <p className="text-slate-500 text-sm mb-6">
                Schedule a free 30-minute consultation and we will walk you through exactly how to
                claim your credits. No upfront cost — our fee is 20% of what we recover.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-teal-600 text-white font-bold px-8 py-4 rounded-xl text-lg text-center flex-1 hover:bg-teal-700 transition-colors"
                >
                  Schedule Free Consultation
                </Link>
                <Link
                  href="/eligibility"
                  className="bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-xl text-lg text-center flex-1 hover:bg-slate-100 transition-colors"
                >
                  Check Eligibility
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="font-black text-slate-900">20%</div>
                <div className="text-slate-500 text-xs mt-1">Contingency fee only</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="font-black text-slate-900">60 days</div>
                <div className="text-slate-500 text-xs mt-1">To filing</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="font-black text-slate-900">100%</div>
                <div className="text-slate-500 text-xs mt-1">Audit defense</div>
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
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-widest mb-3 block">
              Free R&amp;D Credit Calculator
            </span>
            <h1 className="text-4xl font-black text-slate-900 mb-3">
              How Much Could You Recover?
            </h1>
            <p className="text-slate-500 text-lg">
              Get a preliminary estimate in under 2 minutes. No account required.
            </p>
          </div>
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-8 flex items-start gap-3">
            <svg className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5h.01" />
            </svg>
            <div>
              <p className="text-teal-800 font-semibold text-sm">SC businesses get more</p>
              <p className="text-teal-700 text-xs">
                South Carolina businesses can stack the federal credit with an additional 5% SC state
                credit. Select SC as your state to see your full estimate.
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-8"
          >
            <div>
              <h2 className="font-black text-slate-900 text-lg mb-4 pb-2 border-b border-slate-100">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    required
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Work Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-black text-slate-900 text-lg mb-4 pb-2 border-b border-slate-100">
                Business Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Industry</label>
                  <select
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  >
                    <option value="">Select industry</option>
                    {INDUSTRIES.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">State</label>
                  <select
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  >
                    {US_STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Revenue Band
                  </label>
                  <select
                    value={form.revenueBand}
                    onChange={(e) => setForm({ ...form, revenueBand: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  >
                    <option value="">Select range</option>
                    {REVENUE_BANDS.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Total Employees
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.employeeCount}
                    onChange={(e) => setForm({ ...form, employeeCount: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    placeholder="e.g. 50"
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-black text-slate-900 text-lg mb-1 pb-2 border-b border-slate-100">
                Financial Details
              </h2>
              <p className="text-slate-400 text-xs mb-4">
                Used only to calculate your estimate. Never shared.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Annual US Payroll *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-400 text-sm">$</span>
                    <input
                      required
                      type="number"
                      min="0"
                      placeholder="2,000,000"
                      value={form.annualPayroll}
                      onChange={(e) => setForm({ ...form, annualPayroll: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    />
                  </div>
                  <p className="text-slate-400 text-xs mt-1">Total wages paid to US employees</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Contractor Spend
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-400 text-sm">$</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="500,000"
                      value={form.contractorSpend}
                      onChange={(e) => setForm({ ...form, contractorSpend: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    />
                  </div>
                  <p className="text-slate-400 text-xs mt-1">R&amp;D-related contractor costs</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Supply and Prototype Spend
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-400 text-sm">$</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="100,000"
                      value={form.supplySpend}
                      onChange={(e) => setForm({ ...form, supplySpend: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    />
                  </div>
                  <p className="text-slate-400 text-xs mt-1">Materials used in R&amp;D activities</p>
                </div>
                <div className="sm:col-span-2 flex items-center gap-3 bg-slate-50 rounded-lg p-4">
                  <input
                    type="checkbox"
                    id="prior"
                    checked={form.priorCreditClaimed}
                    onChange={(e) => setForm({ ...form, priorCreditClaimed: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <label htmlFor="prior" className="text-sm text-slate-700">
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
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl text-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Calculating Your Estimate..." : "Calculate My R&D Credit"}
            </button>
            <p className="text-xs text-slate-400 text-center">
              Your information is never sold or shared. This estimate does not constitute tax advice.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
