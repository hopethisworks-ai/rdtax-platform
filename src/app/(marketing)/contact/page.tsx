"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
      <div className="pt-16 pb-24 px-6 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-4xl font-normal text-slate-800 mb-4">Thank You for Your Inquiry</h2>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed">A member of our team will respond within one business day. In the meantime, you may estimate your credit or assess your eligibility.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/estimator" className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-3 rounded-xl transition-colors">Calculate My Credit</Link>
            <Link href="/eligibility" className="bg-slate-100 border border-slate-200 text-slate-900 font-semibold px-8 py-3 rounded-xl hover:bg-stone-50 transition-colors">Check Eligibility</Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Top accent bar with image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
          alt="Modern office space"
          width={1400}
          height={400}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-800/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="inline-block bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Get In Touch</span>
            <h1 className="text-3xl md:text-4xl font-normal text-white">Schedule a Consultation</h1>
          </div>
        </div>
      </div>
      <div className="pt-12 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-start">
          {/* Left Column: Info */}
          <div>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">Request a complimentary 30-minute consultation. We will evaluate your eligibility, estimate your potential credit, and outline the engagement process. No obligation.</p>

            {/* Feature Rows */}
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-base">30-Minute Complimentary Assessment</p>
                  <p className="text-slate-600 text-sm mt-1">We evaluate your business activities and provide a preliminary eligibility determination.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-base">Contingency-Based Engagement</p>
                  <p className="text-slate-600 text-sm mt-1">20% of credits recovered. No retainers, no hourly fees. If we identify no qualifying credits, there is no charge.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-base">One Business Day Response</p>
                  <p className="text-slate-600 text-sm mt-1">Every inquiry receives a response within one business day.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-base">South Carolina Focus</p>
                  <p className="text-slate-600 text-sm mt-1">Deep expertise in SC industries, state regulations, and the local business landscape.</p>
                </div>
              </div>
            </div>

            {/* Bottom Card */}
            <div className="bg-stone-50 border border-slate-200 rounded-2xl p-8">
              <p className="text-slate-700 text-sm font-medium mb-5">Not ready to talk? Start with a free estimate.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/estimator" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm text-center transition-colors">Calculate My Credit</Link>
                <Link href="/eligibility" className="bg-white border border-slate-300 text-slate-900 font-semibold px-5 py-2.5 rounded-lg text-sm text-center hover:bg-stone-50 transition-colors">Check Eligibility</Link>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-8">Request a Consultation</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Your Name *</label>
                  <input
                    required
                    value={form.contactName}
                    onChange={e=>{setForm({...form,contactName:e.target.value})}}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Company Name *</label>
                  <input
                    required
                    value={form.companyName}
                    onChange={e=>{setForm({...form,companyName:e.target.value})}}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    placeholder="Acme Manufacturing"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Work Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e=>{setForm({...form,email:e.target.value})}}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    placeholder="john@acme.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Phone</label>
                  <input
                    value={form.phone}
                    onChange={e=>{setForm({...form,phone:e.target.value})}}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    placeholder="(864) 555-0100"
                  />
                </div>
              </div>

              {/* What are you looking for? */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">What are you looking for? *</label>
                <select
                  value={form.consultType}
                  onChange={e=>{setForm({...form,consultType:e.target.value})}}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                >
                  <option value="book_call">Schedule a free consultation call</option>
                  <option value="start_intake">Start the engagement process now</option>
                  <option value="cpa">I am a CPA looking to partner</option>
                  <option value="general">General question</option>
                </select>
              </div>

              {/* Tell us about your business */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Tell us about your business</label>
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={e=>{setForm({...form,notes:e.target.value})}}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent resize-none"
                  placeholder="What does your company make or develop? How many employees? Any prior R&D credits claimed?"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {loading ? "Submitting..." : "Request Consultation"}
              </button>

              {/* Privacy Note */}
              <p className="text-xs text-slate-500 text-center">We respond within one business day. Your information is never sold or shared.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
