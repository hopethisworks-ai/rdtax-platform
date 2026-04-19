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
      <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <h3 className="text-2xl font-black text-navy mb-2">Thank You</h3>
      <p className="text-secondary">We&apos;ll reach out promptly to discuss whether there may be a fit.</p>
    </div>
  );

  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Your Name</label>
        <input required value={form.name} onChange={e=>{setForm({...form,name:e.target.value})}} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" placeholder="Jane Smith, CPA" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Firm Name</label>
        <input required value={form.firm} onChange={e=>{setForm({...form,firm:e.target.value})}} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" placeholder="Smith and Associates CPA" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Email</label>
        <input required type="email" value={form.email} onChange={e=>{setForm({...form,email:e.target.value})}} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" placeholder="jane@smithcpa.com" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Phone</label>
        <input value={form.phone} onChange={e=>{setForm({...form,phone:e.target.value})}} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" placeholder="(864) 555-0100" />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold text-navy mb-2">How many business clients do you have?</label>
        <select required value={form.clientCount} onChange={e=>{setForm({...form,clientCount:e.target.value})}} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy bg-white appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23486581%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow">
          <option value="">Select range</option>
          <option>Under 25</option>
          <option>25 to 50</option>
          <option>50 to 100</option>
          <option>100 to 250</option>
          <option>Over 250</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold text-navy mb-2">What industries do most of your clients operate in?</label>
        <textarea value={form.industries} onChange={e=>{setForm({...form,industries:e.target.value})}} rows={3} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow resize-none" placeholder="e.g. Manufacturing, construction, software, engineering..." />
      </div>
      <div className="sm:col-span-2 pt-2">
        <button type="submit" disabled={status==="loading"} className="w-full bg-primary text-white font-bold py-4 rounded-xl text-lg hover:bg-primary-dark transition-colors disabled:opacity-50">
          {status==="loading" ? "Submitting..." : "Request a Partner Conversation"}
        </button>
        {status==="error" && <p className="text-red-500 text-sm text-center mt-2">Something went wrong. Please try again.</p>}
        <p className="text-xs text-secondary text-center mt-4">We&apos;ll reach out promptly to discuss whether there may be a fit.</p>
      </div>
    </form>
  );
}
