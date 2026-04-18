"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  {
    id: "welcome",
    title: "Welcome to Alexander & Blake",
    description: "Let's walk you through how the R&D credit study process works and what we'll need from you.",
  },
  {
    id: "how-it-works",
    title: "How Your Study Works",
    description: "Here's what happens at each stage of your engagement.",
  },
  {
    id: "documents",
    title: "Documents We'll Need",
    description: "Gathering these documents early speeds up your study significantly.",
  },
  {
    id: "ready",
    title: "You're All Set",
    description: "Your portal is ready. Let's get started.",
  },
];

const DOC_CATEGORIES = [
  { icon: "💼", label: "Payroll Records", desc: "W-2s or payroll export for all employees who worked on R&D activities (engineers, developers, scientists, project managers)" },
  { icon: "📋", label: "Contractor Agreements", desc: "1099s and contracts for any third-party contractors involved in R&D work" },
  { icon: "🧾", label: "Supply Invoices", desc: "Receipts or invoices for supplies and materials consumed in R&D activities" },
  { icon: "📁", label: "Project Documentation", desc: "Project lists, timesheets, technical documents, or anything that shows what R&D activities were performed" },
  { icon: "📊", label: "Prior Tax Returns", desc: "Federal tax returns for the past 3-5 years (needed to calculate your base period)" },
  { icon: "💰", label: "Financial Statements", desc: "Income statements or general ledger showing gross receipts for prior years" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else router.push("/portal");
  }
  function back() { if (step > 0) setStep(step - 1); }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100">
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <div className="px-8 py-8">
          {/* Step counter */}
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
            Step {step + 1} of {STEPS.length}
          </p>
          <h1 className="text-2xl font-bold text-navy mb-2">{STEPS[step].title}</h1>
          <p className="text-secondary mb-8">{STEPS[step].description}</p>

          {/* Step content */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="font-semibold text-navy">What is the R&D Tax Credit?</h3>
                  <p className="text-sm text-body-text mt-1">The federal R&D tax credit (IRC §41) rewards companies for investing in qualified research activities. Credits typically range from 6–10% of qualifying R&D spend and can be worth hundreds of thousands of dollars.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="text-2xl">✅</div>
                <div>
                  <h3 className="font-semibold text-navy">Your Dedicated Analyst</h3>
                  <p className="text-sm text-body-text mt-1">An Alexander & Blake analyst has been assigned to your engagement. They'll guide you through every step, review your documents, and prepare your final credit study.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-primary/10">
                <div className="text-2xl">🔒</div>
                <div>
                  <h3 className="font-semibold text-navy">Secure & Confidential</h3>
                  <p className="text-sm text-body-text mt-1">All documents are encrypted and stored securely. Your financial data is never shared without your consent.</p>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              {[
                { stage: "1", label: "Data Collection", desc: "You upload payroll, contractor, and supply records through this portal.", color: "bg-blue-600" },
                { stage: "2", label: "Analysis", desc: "Our analysts review your documents and identify qualifying R&D activities.", color: "bg-indigo-600" },
                { stage: "3", label: "Calculation", desc: "We run your credit calculation using the ASC or Regular method — whichever yields the higher credit.", color: "bg-violet-600" },
                { stage: "4", label: "Documentation", desc: "We prepare your full credit study package including technical narratives and IRS-ready forms.", color: "bg-purple-600" },
                { stage: "5", label: "Delivery", desc: "You receive your final report and documentation package, ready to hand to your CPA.", color: "bg-green-600" },
              ].map((s) => (
                <div key={s.stage} className="flex items-start gap-4">
                  <div className={`w-8 h-8 ${s.color} rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5`}>
                    {s.stage}
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{s.label}</p>
                    <p className="text-sm text-secondary">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DOC_CATEGORIES.map((doc) => (
                <div key={doc.label} className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl hover:border-blue-200 transition-colors">
                  <div className="text-xl flex-shrink-0">{doc.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-navy">{doc.label}</p>
                    <p className="text-xs text-secondary mt-0.5 leading-snug">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎉</span>
              </div>
              <p className="text-body-text mb-6">Your portal is set up and your analyst has been notified. Head to your dashboard to view your engagement, upload documents, and track your study progress.</p>
              <div className="bg-surface rounded-xl p-4 text-left space-y-2">
                <p className="text-sm font-semibold text-navy">Quick tips:</p>
                <p className="text-sm text-secondary">• Upload documents in the <strong>Upload</strong> section of your engagement</p>
                <p className="text-sm text-secondary">• Check the <strong>Documents</strong> checklist to see what's still needed</p>
                <p className="text-sm text-secondary">• Your analyst will reach out if they have questions</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={back}
              className={`px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-navy hover:bg-surface transition-colors ${step === 0 ? "invisible" : ""}`}
            >
              Back
            </button>
            <button
              onClick={next}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {step === STEPS.length - 1 ? "Go to My Dashboard →" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
