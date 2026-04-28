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
          <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-4xl font-normal text-navy mb-4">Thank You for Your Inquiry</h2>
          <p className="text-body-text text-lg mb-10 leading-relaxed">A member of our team will respond within one business day. In the meantime, you may estimate your credit or assess your eligibility.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/estimator" className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-xl transition-colors min-h-[48px] flex items-center justify-center">Estimate Your Credit</Link>
            <Link href="/eligibility" className="bg-gray-100 border border-gray-200 text-navy font-semibold px-8 py-3 rounded-xl hover:bg-surface transition-colors min-h-[48px] flex items-center justify-center">Evaluate Eligibility</Link>
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
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="inline-block bg-primary/20 text-primary-light text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Get In Touch</span>
            <h1 className="text-3xl md:text-4xl font-normal text-white">Schedule a Consultation</h1>
          </div>
        </div>
      </div>
      {/* No Sensitive Records Section */}
      <div className="py-10 px-6 bg-surface border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-normal text-navy mb-4">No Sensitive Records Required for the First Conversation</h2>
          <p className="text-body-text leading-relaxed text-sm">
            The first conversation is used to understand your business, activities, and potential fit. Payroll records, tax returns, GL detail, and contractor invoices are not requested until an engagement scope is defined.
          </p>
        </div>
      </div>

      <div className="pt-12 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-start">
          {/* Left Column: Info */}
          <div>
            {/* What Happens Next */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-navy mb-4">What Happens Next</h2>
              <div className="space-y-4">
                {[
                  { num: "1", text: "We review your inquiry within one business day" },
                  { num: "2", text: "We schedule a short complimentary consultation" },
                  { num: "3", text: "We provide an initial eligibility view based on your activities" },
                  { num: "4", text: "If there appears to be fit, we outline scope and document needs" },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">{step.num}</div>
                    <p className="text-body-text text-sm mt-0.5">{step.text}</p>
                  </div>
                ))}
              </div>
              <p className="text-secondary text-xs mt-4 italic">Sensitive records are requested only after initial fit is established and are handled through our secure portal.</p>
            </div>

            {/* Who This Is Best For */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-navy mb-4">This Is a Good Fit If You</h2>
              <div className="space-y-2">
                {[
                  "Invest in product development, process improvement, or software",
                  "Have 5 or more employees engaged in technical work",
                  "Operate in South Carolina or have SC-based operations",
                  "Want a structured, documented approach to claiming R&D credits",
                  "Are a CPA looking for a specialist R&D credit resource",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className="text-body-text text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What to Include */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-navy mb-4">What to Include in Your Message</h2>
              <div className="space-y-2">
                {[
                  "Industry",
                  "Number of employees",
                  "Type of technical work performed",
                  "Whether you have claimed the credit before",
                  "Whether you have a CPA involved",
                  "Whether the business has South Carolina operations",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    <span className="text-body-text text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Rows */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-navy text-sm">Contingency-Based — 20% of Credits Identified</p>
                  <p className="text-body-text text-xs mt-1">No retainers, no hourly fees. If we identify no qualifying credits, there is no charge.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-navy text-sm">South Carolina Specialist</p>
                  <p className="text-body-text text-xs mt-1">Federal and SC credits coordinated through one structured study process.</p>
                </div>
              </div>
            </div>

            {/* Bottom Card */}
            <div className="bg-surface border border-gray-200 rounded-2xl p-6">
              <p className="text-body-text text-sm font-medium mb-4">Not ready to talk? Start with a free estimate.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/estimator" className="bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2.5 rounded-lg text-sm text-center transition-colors">Estimate Your Credit</Link>
                <Link href="/eligibility" className="bg-white border border-secondary/30 text-navy font-semibold px-5 py-2.5 rounded-lg text-sm text-center hover:bg-surface transition-colors">Evaluate Eligibility</Link>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
            <h2 className="text-2xl font-black text-navy mb-8">Request a Consultation</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Your Name *</label>
                  <input
                    required
                    value={form.contactName}
                    onChange={e=>{setForm({...form,contactName:e.target.value})}}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Company Name *</label>
                  <input
                    required
                    value={form.companyName}
                    onChange={e=>{setForm({...form,companyName:e.target.value})}}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Acme Manufacturing"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Work Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e=>{setForm({...form,email:e.target.value})}}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="john@acme.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Phone</label>
                  <input
                    value={form.phone}
                    onChange={e=>{setForm({...form,phone:e.target.value})}}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="(864) 555-0100"
                  />
                </div>
              </div>

              {/* What are you looking for? */}
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">What are you looking for? *</label>
                <select
                  value={form.consultType}
                  onChange={e=>{setForm({...form,consultType:e.target.value})}}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="book_call">Schedule a free consultation call</option>
                  <option value="start_intake">Start the engagement process now</option>
                  <option value="cpa">I am a CPA looking to partner</option>
                  <option value="general">General question</option>
                </select>
              </div>

              {/* Tell us about your business */}
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Tell us about your business</label>
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={e=>{setForm({...form,notes:e.target.value})}}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="What does your company make or develop? How many employees? Any prior R&D credits claimed?"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {loading ? "Submitting..." : "Request Consultation"}
              </button>

              {/* Privacy Note */}
              <p className="text-xs text-secondary text-center mb-2">We respond within one business day. Your information is never sold or shared.</p>
              <p className="text-xs text-center mb-4">
                <Link href="/cpa-partners" className="text-primary hover:underline font-medium">CPA firm? Request the Partner Kit instead.</Link>
              </p>

              {/* Trust Footer */}
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-secondary">
                <span>No obligation</span>
                <span className="text-gray-300">·</span>
                <span>No retainer required</span>
                <span className="text-gray-300">·</span>
                <span>Secure data handling</span>
                <span className="text-gray-300">·</span>
                <span>CPA coordination available</span>
              </div>
            </form>
          </div>
        </div>

        {/* Business Credibility */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="bg-surface border border-gray-200 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-navy mb-6 text-center">Contact Information</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 border border-gray-200">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <p className="text-navy font-semibold text-sm mb-1">Email</p>
                <a href="mailto:partnerships@alexanderandblake.com" className="text-primary text-xs hover:underline">partnerships@alexanderandblake.com</a>
              </div>
              <div>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 border border-gray-200">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <p className="text-navy font-semibold text-sm mb-1">Location</p>
                <p className="text-body-text text-xs">South Carolina</p>
              </div>
              <div>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 border border-gray-200">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="text-navy font-semibold text-sm mb-1">Response Time</p>
                <p className="text-body-text text-xs">Typically within one business day</p>
              </div>
              <div>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 border border-gray-200">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                </div>
                <p className="text-navy font-semibold text-sm mb-1">LinkedIn</p>
                <a href="https://www.linkedin.com/company/alexander-and-blake" target="_blank" rel="noopener noreferrer" className="text-primary text-xs hover:underline">Alexander &amp; Blake</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
