"use client";
import { useState } from "react";

export default function MfaSetup({ mfaEnabled: initialEnabled }: { mfaEnabled: boolean }) {
  const [mfaEnabled, setMfaEnabled] = useState(initialEnabled);
  const [step, setStep] = useState<"idle" | "setup" | "disable">("idle");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function startSetup() {
    setLoading(true); setError("");
    const res = await fetch("/api/auth/mfa/setup", { method: "POST" });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error); return; }
    setQrDataUrl(data.qrDataUrl);
    setSecret(data.secret);
    setStep("setup");
  }

  async function enableMfa() {
    setLoading(true); setError("");
    const res = await fetch("/api/auth/mfa/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, action: "enable" }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error); return; }
    setMfaEnabled(true); setStep("idle"); setCode(""); setSuccess("MFA enabled successfully.");
  }

  async function disableMfa() {
    setLoading(true); setError("");
    const res = await fetch("/api/auth/mfa/disable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error); return; }
    setMfaEnabled(false); setStep("idle"); setCode(""); setSuccess("MFA disabled.");
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="font-semibold text-slate-800">Two-Factor Authentication</h2>
          <p className="text-sm text-slate-500 mt-1">Add an extra layer of security using an authenticator app.</p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${mfaEnabled ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
          {mfaEnabled ? "Enabled" : "Disabled"}
        </span>
      </div>

      {success && <p className="text-green-600 text-sm mb-4 bg-green-50 px-3 py-2 rounded-lg">{success}</p>}

      {step === "idle" && (
        <>
          {mfaEnabled ? (
            <button onClick={() => { setStep("disable"); setSuccess(""); }}
              className="text-sm px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              Disable MFA
            </button>
          ) : (
            <button onClick={() => { startSetup(); setSuccess(""); }} disabled={loading}
              className="text-sm px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50">
              {loading ? "Setting up..." : "Enable MFA"}
            </button>
          )}
        </>
      )}

      {step === "setup" && (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.), then enter the 6-digit code to confirm.</p>
          {qrDataUrl && (
            <div className="flex justify-center">
              <img src={qrDataUrl} alt="MFA QR Code" className="w-44 h-44 border border-slate-200 rounded-lg" />
            </div>
          )}
          <div className="bg-slate-50 rounded-lg px-3 py-2">
            <p className="text-xs text-slate-500 mb-1">Manual entry key:</p>
            <p className="text-xs font-mono text-slate-700 break-all">{secret}</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Enter 6-digit code</label>
            <input type="text" inputMode="numeric" maxLength={6} value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono tracking-widest focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex gap-3">
            <button onClick={() => { setStep("idle"); setCode(""); setError(""); }}
              className="flex-1 py-2 border border-slate-300 text-slate-600 text-sm rounded-lg hover:bg-slate-50">
              Cancel
            </button>
            <button onClick={enableMfa} disabled={code.length !== 6 || loading}
              className="flex-1 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {loading ? "Verifying..." : "Enable MFA"}
            </button>
          </div>
        </div>
      )}

      {step === "disable" && (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">Enter your current authenticator code to disable MFA.</p>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">6-digit code</label>
            <input type="text" inputMode="numeric" maxLength={6} value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono tracking-widest focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex gap-3">
            <button onClick={() => { setStep("idle"); setCode(""); setError(""); }}
              className="flex-1 py-2 border border-slate-300 text-slate-600 text-sm rounded-lg hover:bg-slate-50">
              Cancel
            </button>
            <button onClick={disableMfa} disabled={code.length !== 6 || loading}
              className="flex-1 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50">
              {loading ? "Disabling..." : "Disable MFA"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
