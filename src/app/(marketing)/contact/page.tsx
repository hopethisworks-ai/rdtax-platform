"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ contactName:"", email:"", companyName:"", phone:"", notes:"", consultType:"book_call" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.contactName,
          company: form.companyName,
          email: form.email,
          phone: form.phone,
          notes: form.notes + (form.consultType ? " | Interest: " + form.consultType : ""),
          leadSource: "contact_form",
        }),
      });
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  if (done) return (
    <div className="bg-white min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">CP</span></div>
            <span className="font-bold text-slate-900 text-lg">CreditPath</span>
          </Link>
        </div>
      </nav>
      <div className="pt-32 pb-24 px-6 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-3">We Will Be In Touch</h2>
          <p className="text-slate-500 text-lg mb-8">We typically respond within one business day. In the meantime, you can estimate your credit or check your eligibility.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/estimator" className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl">Calculate My Credit</Link>
            <Link href="/eligibility" className="bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-8 py-3 rounded-xl">Check Eligibility</Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
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
            <Link href="/cpa-partners" className="text-sm text-slate-600 hover:text-slate-900">CPA Partners</Link>
          </div>
          <Link href="/estimator" className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg">Free Estimate</Link>
        </div>
      </nav>
      <div className="pt-24 pb-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div className="pt-8">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">Get In Touch</p>
            <h1 className="text-4xl font-black text-slate-900 leading-tight mb-6">Let's Talk About Your R&D Credit Opportunity.</h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">Schedule a free 30-minute consultation and we will tell you exactly what your business qualifies for. No obligation, no upfront cost.</p>
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900">30-Minute Free Assessment</p>
                  <p className="text-slate-500 text-sm">We review your business and tell you exactly what you qualify for.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900">No Upfront Cost</p>
                  <p className="text-slate-500 text-sm">20% contingency only. If we do not find credits, you pay nothing.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Response Within One Business Day</p>
                  <p className="text-slate-500 text-sm">We respond to every inquiry within one business day.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900">South Carolina Specialists</p>
                  <p className="text-slate-500 text-sm">We serve SC businesses exclusively. We know your market.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <p className="text-slate-500 text-sm mb-3">Not ready to talk? Start with a free estimate.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/estimator" className="bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm text-center">Calculate My Credit</Link>
                <Link href="/eligibility" className="bg-white border border-slate-200 text-slate-700 font-semibold px-5 py-2.5 rounded-lg text-sm text-center">Check Eligibility</Link>
              </div>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-6">Schedule Your Free Consultation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Your Name *</label>
                  <input required value={form.contactName} onChange={e=>{setForm({...form,contactName:e.target.value})}} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Smith" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Company Name *</label>
                  <input required value={form.companyName} onChange={e=>{setForm({...form,companyName:e.target.value})}} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Acme Manufacturing" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Work Email *</label>
                  <input required type="email" value={form.email} onChange={e=>{setForm({...form,email:e.target.value})}} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@acme.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
                  <input value={form.phone} onChange={e=>{setForm({...form,phone:e.target.value})}} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="(864) 555-0100" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">What are you looking for?</label>
                <select value={form.consultType} onChange={e=>{setForm({...form,consultType:e.target.value})}} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="book_call">Schedule a free consultation call</option>
                  <option value="start_intake">Start the engagement process now</option>
                  <option value="cpa">I am a CPA looking to partner</option>
                  <option value="general">General question</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Tell us about your business</label>
                <textarea rows={4} value={form.notes} onChange={e=>{setForm({...form,notes:e.target.value})}} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="What does your company make or develop? How many employees? Any prior R&D credits claimed?" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-colors disabled:opacity-50">
                {loading ? "Sending..." : "Schedule Free Consultation"}
              </button>
              <p className="text-xs text-slate-400 text-center">We respond within one business day. Your information is never sold or shared.</p>
            </form>
          </div>
        </div>
      </div>
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
            <Link href="/cpa-partners" className="text-slate-600 text-xs">CPA Partners</Link>
            <Link href="/privacy" className="text-slate-600 text-xs">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
