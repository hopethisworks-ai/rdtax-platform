"use client";
import { useState } from "react";

const questions = [
  {
    id: "activities",
    question: "Which of the following best describes your team's work?",
    options: [
      "We develop or improve physical products",
      "We build or improve software systems",
      "We design or engineer structures, systems, or equipment",
      "We develop new processes, formulas, or techniques",
      "We do a combination of the above",
      "None of these apply",
    ],
  },
  {
    id: "uncertainty",
    question: "Does your work involve solving technical problems where the outcome isn't certain at the start?",
    options: [
      "Yes — we regularly face uncertainty in design, method, or capability",
      "Sometimes — certain projects involve experimentation or iteration",
      "Rarely — most of our work follows established methods",
      "Not sure",
    ],
  },
  {
    id: "experimentation",
    question: "How does your team approach technical challenges?",
    options: [
      "We prototype, test, and iterate on designs or processes",
      "We model, simulate, or evaluate alternatives systematically",
      "We conduct trial and error to find workable solutions",
      "We primarily follow known procedures with little variation",
    ],
  },
  {
    id: "employees",
    question: "How many employees does your business have?",
    options: ["1-10", "11-50", "51-200", "201-500", "500+"],
  },
  {
    id: "claimed",
    question: "Have you ever claimed the R&D tax credit before?",
    options: [
      "No, this would be our first time",
      "Yes, but we're looking for a more thorough approach",
      "Yes, we claim it annually",
      "Not sure",
    ],
  },
];

const disqualifying = ["None of these apply"];

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
          industry: answers.activities,
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
        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-navy mb-4">Thank You for Your Interest</h2>
        <p className="text-body-text text-lg mb-8 max-w-lg mx-auto">
          Based on your responses, your business appears to have activities that may qualify for R&amp;D tax credits. A member of our team will reach out within one business day to discuss next steps.
        </p>
        <div className="bg-surface border border-primary/20 rounded-xl p-6 max-w-md mx-auto">
          <div className="text-navy font-semibold mb-3">What happens next:</div>
          <div className="space-y-2 text-sm text-body-text">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              We review your responses and business details
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              We schedule a complimentary consultation
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              We discuss qualifying activities and outline next steps
            </div>
          </div>
        </div>
      </div>
    );

  if (isDisqualified && step > 1)
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-navy mb-4">It&apos;s Worth a Closer Look</h2>
        <p className="text-body-text text-lg mb-8 max-w-lg mx-auto">
          Based on your responses, it&apos;s not immediately clear whether qualifying activities exist — but many businesses are surprised to learn they do. A brief conversation can help clarify.
        </p>
        <a
          href="/contact"
          className="bg-primary text-white font-semibold px-8 py-4 rounded-xl text-lg inline-block hover:bg-primary-dark transition-colors"
        >
          Schedule a Consultation
        </a>
      </div>
    );

  if (step < questions.length) {
    const q = questions[step];
    return (
      <div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-secondary font-medium">
              Question {step + 1} of {questions.length}
            </span>
            <span className="text-sm text-primary font-semibold">{progress}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-navy mb-8">{q.question}</h2>
        <div className="space-y-3">
          {q.options.map((option) => (
            <button
              key={option}
              onClick={() => selectAnswer(option)}
              className={`w-full text-left px-6 py-4 rounded-xl border-2 font-medium transition-all hover:border-primary hover:bg-surface ${
                answers[q.id] === option
                  ? "border-primary bg-surface text-primary"
                  : "border-gray-200 text-navy"
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
          <span className="text-sm text-secondary font-medium">Final Step</span>
          <span className="text-sm text-primary font-semibold">Almost done</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full w-full" />
        </div>
      </div>
      <div className="bg-surface border border-primary/20 rounded-xl p-4 mb-8">
        <div className="text-navy font-bold text-lg mb-1">
          Your responses suggest qualifying activities may exist
        </div>
        <div className="text-primary text-sm">
          Provide your contact details and we&apos;ll follow up with a complimentary consultation to discuss your specific situation.
        </div>
      </div>
      <h2 className="text-2xl font-bold text-navy mb-6">
        Where should we send your results?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <input
          required
          type="text"
          placeholder="Company Name"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <input
          required
          type="email"
          placeholder="Work Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <input
          type="tel"
          placeholder="Phone Number (optional)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl text-lg transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Request a Consultation"}
        </button>
        {status === "error" && (
          <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>
        )}
      </form>
      <p className="text-xs text-secondary mt-4 text-center">
        Your information is kept confidential. The initial consultation is complimentary and carries no obligation.
      </p>
    </div>
  );
}
