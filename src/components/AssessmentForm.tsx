"use client";
import { useState } from "react";

export default function AssessmentForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", industry: "" });
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
      <div className="text-4xl mb-4">✅</div>
      <h3 className="text-xl font-black text-slate-900 mb-2">We Got Your Request</h3>
      <p className="text-slate-500 text-sm">Our team will reach out within 1 business day.</p>
    </div>
  );

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
      <h3 className="text-xl font-black text-slate-900 mb-2">Get Your Free Assessment</h3>
      <p className="text-slate-500 text-sm mb-6">Find out what you qualify for in 30 minutes. No obligation.</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input required type="text" placeholder="Your Name" value={form.name} onChange={e => { setForm({...form, name: e.target.value}) }} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm" />
        <input required type="text" placeholder="Company Name" value={form.company} onChange={e => { setForm({...form, company: e.target.value}) }} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm" />
        <input required type="email" placeholder="Work Email" value={form.email} onChange={e => { setForm({...form, email: e.target.value}) }} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm" />
        <input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => { setForm({...form, phone: e.target.value}) }} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm" />
        <select value={form.industry} onChange={e => { setForm({...form, industry: e.target.value}) }} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-500">
          <option value="">Select Your Industry</option>
          <option>Manufacturing</option>
          <option>Software and Technology</option>
          <option>Construction and Engineering</option>
          <option>Biotech and Life Sciences</option>
          <option>Automotive</option>
          <option>Other</option>
        </select>
        <button type="submit" disabled={status === "loading"} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg text-sm transition-colors disabled:opacity-50">
          {status === "loading" ? "Submitting..." : "Get My Free Assessment"}
        </button>
        {status === "error" && <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>}
      </form>
      <p className="text-xs text-slate-400 mt-4 text-center">No upfront cost. We only get paid when you do.</p>
    </div>
  );
}
