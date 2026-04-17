"use client";
import { useState } from "react";

const questions = [
  {
    id: "industry",
    question: "What industry is your business in?",
    options: [
      "Manufacturing",
      "Software and Technology",
      "Construction and Engineering",
      "Biotech and Life Sciences",
      "Automotive",
      "Other",
    ],
  },
  {
    id: "activities",
    question: "Does your team do any of the following?",
    options: [
      "Develop or improve products",
      "Write custom software",
      "Improve manufacturing processes",
      "Design new systems or structures",
      "Test new materials or formulas",
      "None of the above",
    ],
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
  const isDisqualified = Object.values(answers).some((a) => disqualifying.includes(a));

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
        body: JSON.stringify({
          ...form,
          industry: answers.industry,
          notes: JSON.stringify(answers),
        }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success")
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4">You Very Likely Qualify</h2>
        <p className="text-slate-600 text-lg mb-8 max-w-lg mx-auto">
          Based on your answers, your business shows strong indicators for R&amp;D tax credits. Our
          team will reach out within 1 business day to schedule your free assessment.
        </p>
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 max-w-md mx-auto">
          <div className="text-teal-800 font-semibold mb-2">What happens next:</div>
          <div className="space-y-2 text-sm text-teal-700">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              We review your business details
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              We identify qualifying activities
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              We give you a credit estimate — free
            </div>
          </div>
        </div>
      </div>
    );

  if (isDisqualified && step > 1)
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4">You May Still Qualify</h2>
        <p className="text-slate-600 text-lg mb-8 max-w-lg mx-auto">
          Based on your answers, it is not immediately clear whether you qualify — but many
          businesses are surprised. Schedule a free 15-minute call and we will tell you for certain.
        </p>
        <a
          href="/contact"
          className="bg-teal-600 text-white font-bold px-8 py-4 rounded-xl text-lg inline-block hover:bg-teal-700 transition-colors"
        >
          Schedule a Free Call
        </a>
      </div>
    );

  if (step < questions.length) {
    const q = questions[step];
    return (
      <div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-500 font-medium">
              Question {step + 1} of {questions.length}
            </span>
            <span className="text-sm text-teal-600 font-semibold">{progress}% complete</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-teal-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-8">{q.question}</h2>
        <div className="space-y-3">
          {q.options.map((option) => (
            <button
              key={option}
              onClick={() => selectAnswer(option)}
              className={`w-full text-left px-6 py-4 rounded-xl border-2 font-medium transition-all hover:border-teal-500 hover:bg-teal-50 ${
                answers[q.id] === option
                  ? "border-teal-500 bg-teal-50 text-teal-700"
                  : "border-slate-200 text-slate-700"
              }`}
            >
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
          <span className="text-sm text-teal-600 font-semibold">Almost done!</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div className="bg-teal-600 h-2 rounded-full w-full" />
        </div>
      </div>
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-8">
        <div className="text-teal-800 font-bold text-lg mb-1">
          Good news — you likely qualify
        </div>
        <div className="text-teal-700 text-sm">
          Based on your answers, your business shows strong indicators for R&amp;D tax credits. Enter
          your details to get your free assessment.
        </div>
      </div>
      <h2 className="text-2xl font-black text-slate-900 mb-6">
        Where should we send your results?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
        <input
          required
          type="text"
          placeholder="Company Name"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
        <input
          required
          type="email"
          placeholder="Work Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl text-lg transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Get My Free Assessment"}
        </button>
        {status === "error" && (
          <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>
        )}
      </form>
      <p className="text-xs text-slate-400 mt-4 text-center">
        No upfront cost. We only get paid when you do.
      </p>
    </div>
  );
}
