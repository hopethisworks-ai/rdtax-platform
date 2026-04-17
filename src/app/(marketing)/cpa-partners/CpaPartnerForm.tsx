"use client";
import { useState } from "react";

export default function CpaPartnerForm() {
  const [form, setForm] = useState({ name:"", firm:"", email:"", phone:"", clientCount:"", industries:"" });
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactName: form.name,
          companyName: form.firm,
          email: form.email,
          phone: form.phone,
          notes: "CPA Partner Application. Client count: " + form.clientCount + ". Industries: " + form.industries,
          leadSource: "cpa-partner",
        }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-2">Application Received</h3>
      <p className="text-slate-500">We will reach out within one business day to discuss the partnership.</p>
    </div>
  );

  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Your Name</label>
        <input required value={form.name} onChange={e=>{setForm({...form,name:e.target.value})}} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" placeholder="Jane Smith, CPA" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Firm Name</label>
        <input required value={form.firm} onChange={e=>{setForm({...form,firm:e.target.value})}} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" placeholder="Smith and Associates CPA" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
        <input required type="email" value={form.email} onChange={e=>{setForm({...form,email:e.target.value})}} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" placeholder="jane@smithcpa.com" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
        <input value={form.phone} onChange={e=>{setForm({...form,phone:e.target.value})}} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" placeholder="(864) 555-0100" />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold text-slate-700 mb-1">How many business clients do you have?</label>
        <select required value={form.clientCount} onChange={e=>{setForm({...form,clientCount:e.target.value})}} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600">
          <option value="">Select range</option>
          <option>Under 25</option>
          <option>25 to 50</option>
          <option>50 to 100</option>
          <option>100 to 250</option>
          <option>Over 250</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold text-slate-700 mb-1">What industries do most of your clients operate in?</label>
        <textarea value={form.industries} onChange={e=>{setForm({...form,industries:e.target.value})}} rows={3} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none" placeholder="e.g. Manufacturing, construction, software, engineering..." />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={status==="loading"} className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl text-lg hover:bg-teal-700 transition-colors disabled:opacity-50">
          {status==="loading" ? "Submitting..." : "Submit Partner Application"}
        </button>
        {status==="error" && <p className="text-red-500 text-sm text-center mt-2">Something went wrong. Please try again.</p>}
        <p className="text-xs text-slate-400 text-center mt-3">We will reach out within one business day to discuss the partnership.</p>
      </div>
    </form>
  );
}
