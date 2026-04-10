
"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match"); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setStatus("loading"); setError("");
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    if (res.ok) { setStatus("success"); setTimeout(() => router.push("/login"), 2000); }
    else { setError(data.error ?? "Reset failed"); setStatus("idle"); }
  }

  if (!token) return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
      <p className="text-red-800 font-semibold">Invalid reset link</p>
      <Link href="/forgot-password" className="block mt-3 text-blue-600 text-sm hover:underline">Request a new reset link</Link>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-4">
      {status === "success" ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <p className="text-green-800 font-semibold">Password updated successfully</p>
          <p className="text-green-600 text-sm mt-1">Redirecting to login...</p>
        </div>
      ) : (<>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="At least 8 characters" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
          <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Repeat your password" />
        </div>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <button type="submit" disabled={status === "loading"}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
          {status === "loading" ? "Updating..." : "Update Password"}
        </button>
        <p className="text-center text-sm">
          <Link href="/login" className="text-blue-600 hover:underline">Back to login</Link>
        </p>
      </>)}
    </form>
  );
}

export default function ResetPasswordPage() {
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
          <h1 className="text-2xl font-bold text-gray-900">Set New Password</h1>
        </div>
        <Suspense fallback={<p className="text-center text-gray-500 text-sm">Loading...</p>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}
