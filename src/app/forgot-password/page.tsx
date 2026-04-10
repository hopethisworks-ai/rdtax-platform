
"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStatus("sent");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <span className="font-bold text-lg">CreditPath</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-500 text-sm mt-1">Enter your email and we will send a reset link</p>
        </div>
        {status === "sent" ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <p className="text-green-800 font-semibold mb-2">Check your email</p>
            <p className="text-green-600 text-sm">If an account exists for {email}, you will receive a password reset link shortly.</p>
            <Link href="/login" className="block mt-4 text-blue-600 text-sm hover:underline">Back to login</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="you@company.com"
              />
            </div>
            <button type="submit" disabled={status === "loading"}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
              {status === "loading" ? "Sending..." : "Send Reset Link"}
            </button>
            <p className="text-center text-sm text-gray-500">
              <Link href="/login" className="text-blue-600 hover:underline">Back to login</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
