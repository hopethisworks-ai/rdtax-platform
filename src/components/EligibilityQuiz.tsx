"use client";
import { useState } from "react";

const questions = [
  {
    id: "industry",
    question: "What industry is your business in?",
    options: ["Manufacturing", "Software and Technology", "Construction and Engineering", "Biotech and Life Sciences", "Automotive", "Other"],
  },
  {
    id: "activities",
    question: "Does your team do any of the following?",
    options: ["Develop or improve products", "Write custom software", "Improve manufacturing processes", "Design new systems or structures", "Test new materials or formulas", "None of the above"],
  },
  {
    id: "employees",
    question: "How many employees does your business have?",
    options: ["1-10", "11-50", "51-200", "201-500", "500+"],
  },
  {
    id: "revenue",
    question: "What is your approximate annual revenue?",
    options: ["Under $500K", "$500K - $2M", "$2M - $10M", "$10M - $50M", "$50M+"],
  },
  {
    id: "claimed",
    question: "Have you ever claimed the R&D tax credit before?",
    options: ["No, never", "Yes, but not recently", "Yes, every year", "Not sure"],
  },
];

const disqualifying = ["None of the above"];

export default function EligibilityQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "" });
  const [status, setStatus] = useState("idle");

  const progress = Math.round((step / (questions.length + 1)) * 100);
  const isDisqualified = Object.values(answers).some(a => disqualifying.includes(a));

  function selectAnswer(answer: string) {
    const q = questions[step];
    setAnswers({ ...answers, [q.id]: answer });
    setTimeout(() => setStep(step + 1), 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, industry: answers.industry, notes: JSON.stringify(answers) }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") return (
    <div className="text-center py-12">
      <div className="text-6xl mb-6">🎉</div>
      <h2 className="text-3xl font-black text-slate-900 mb-4">You Very Likely Qualify</h2>
      <p className="text-slate-600 text-lg mb-8 max-w-lg mx-auto">Based on your answers, your business shows strong indicators for R&D tax credits. Our team will reach out within 1 business day to schedule your free assessment.</p>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-md mx-auto">
        <div className="text-blue-800 font-semibold mb-2">What happens next:</div>
        <div className="space-y-2 text-sm text-blue-700">
          <div>✓ We review your business details</div>
          <div>✓ We identify qualifying activities</div>
          <div>✓ We give you a credit estimate — free</div>
        </div>
      </div>
    </div>
  );

  if (isDisqualified && step > 1) return (
    <div className="text-center py-12">
      <div className="text-6xl mb-6">🤔</div>
      <h2 className="text-3xl font-black text-slate-900 mb-4">You May Still Qualify</h2>
      <p className="text-slate-600 text-lg mb-8 max-w-lg mx-auto">Based on your answers, it is not immediately clear whether you qualify — but many businesses are surprised. Schedule a free 15-minute call and we will tell you for certain.</p>
      <a href="/contact" className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-lg inline-block">Schedule a Free Call</a>
    </div>
  );

  if (step < questions.length) {
    const q = questions[step];
    return (
      <div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-500 font-medium">Question {step + 1} of {questions.length}</span>
            <span className="text-sm text-blue-600 font-semibold">{progress}% complete</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{width: `${progress}%`}}></div>
          </div>
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-8">{q.question}</h2>
        <div className="space-y-3">
          {q.options.map((option) => (
            <button key={option} onClick={() => selectAnswer(option)} className={`w-full text-left px-6 py-4 rounded-xl border-2 font-medium transition-all hover:border-blue-500 hover:bg-blue-50 ${answers[q.id] === option ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-700"}`}>
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500 font-medium">Final Step</span>
          <span className="text-sm text-blue-600 font-semibold">Almost done!</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full w-full"></div>
        </div>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8">
        <div className="text-green-800 font-bold text-lg mb-1">Good news — you likely qualify</div>
        <div className="text-green-700 text-sm">Based on your answers, your business shows strong indicators for R&D tax credits. Enter your details to get your free assessment.</div>
      </div>
      <h2 className="text-2xl font-black text-slate-900 mb-6">Where should we send your results?</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required type="text" placeholder="Your Name" value={form.name} onChange={e => { setForm({...form, name: e.target.value}) }} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input required type="text" placeholder="Company Name" value={form.company} onChange={e => { setForm({...form, company: e.target.value}) }} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input required type="email" placeholder="Work Email" value={form.email} onChange={e => { setForm({...form, email: e.target.value}) }} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => { setForm({...form, phone: e.target.value}) }} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" disabled={status === "loading"} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-colors disabled:opacity-50">
          {status === "loading" ? "Submitting..." : "Get My Free Assessment"}
        </button>
        {status === "error" && <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>}
      </form>
      <p className="text-xs text-slate-400 mt-4 text-center">No upfront cost. We only get paid when you do.</p>
    </div>
  );
}
