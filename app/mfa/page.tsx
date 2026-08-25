"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MfaPage() {
  const router = useRouter();

  const [selectedMethod, setSelectedMethod] = useState("authenticator");

  const handleContinue = () => {
    if (selectedMethod === "authenticator") {
      router.push("/authenticator");
    } else {
      router.push("/mobile-otp");
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[640px] bg-white rounded-2xl border border-[#e5e7eb] shadow-sm px-8 sm:px-10 py-9">

        {/* BACK */}
        <button
          type="button"
          onClick={() => router.push("/mobile-otp")}
          className="text-[24px] text-[#64748b] hover:text-[#111827] mb-6"
          aria-label="Go back"
        >
          ←
        </button>

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#eef2ff] flex items-center justify-center text-3xl">
            🛡️
          </div>
        </div>

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-bold text-[#111827]">
            Set up Multi-Factor Authentication
          </h1>

          <p className="text-[14px] text-[#64748b] mt-2">
            Add an extra layer of security to your account
          </p>
        </div>

        {/* INFO */}
        <div className="rounded-xl border border-[#dbeafe] bg-[#eff6ff] p-4 mb-7">
          <div className="flex gap-3">
            <span className="text-xl">🔐</span>

            <div>
              <p className="text-[14px] font-semibold text-[#1e3a8a]">
                Protect your account
              </p>

              <p className="text-[13px] text-[#475569] mt-1 leading-5">
                MFA helps protect your account even if
                someone knows your password.
              </p>
            </div>
          </div>
        </div>

        {/* METHODS */}
        <div className="space-y-4">

          {/* AUTHENTICATOR */}
          <button
            type="button"
            onClick={() => setSelectedMethod("authenticator")}
            className={`w-full text-left rounded-xl border-2 p-5 transition ${
              selectedMethod === "authenticator"
                ? "border-[#3155e7] bg-[#f5f7ff]"
                : "border-[#e5e7eb] bg-white hover:border-[#cbd5e1]"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-[#eef2ff] flex items-center justify-center text-xl shrink-0">
                🔐
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[16px] font-semibold text-[#111827]">
                    Authenticator App
                  </h2>

                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === "authenticator"
                        ? "border-[#3155e7]"
                        : "border-[#cbd5e1]"
                    }`}
                  >
                    {selectedMethod === "authenticator" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3155e7]" />
                    )}
                  </span>
                </div>

                <p className="text-[13px] text-[#64748b] mt-1">
                  Use Google Authenticator, Microsoft
                  Authenticator, Authy, or another
                  authenticator app.
                </p>

                <span className="inline-block mt-2 text-[12px] font-medium text-[#3155e7]">
                  Recommended
                </span>
              </div>
            </div>
          </button>

          {/* SMS */}
          <button
            type="button"
            onClick={() => setSelectedMethod("sms")}
            className={`w-full text-left rounded-xl border-2 p-5 transition ${
              selectedMethod === "sms"
                ? "border-[#3155e7] bg-[#f5f7ff]"
                : "border-[#e5e7eb] bg-white hover:border-[#cbd5e1]"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-[#ecfdf5] flex items-center justify-center text-xl shrink-0">
                📱
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[16px] font-semibold text-[#111827]">
                    SMS Verification
                  </h2>

                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === "sms"
                        ? "border-[#3155e7]"
                        : "border-[#cbd5e1]"
                    }`}
                  >
                    {selectedMethod === "sms" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3155e7]" />
                    )}
                  </span>
                </div>

                <p className="text-[13px] text-[#64748b] mt-1">
                  Receive a one-time verification code
                  through SMS on your registered mobile
                  number.
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* CONTINUE */}
        <button
          type="button"
          onClick={handleContinue}
          className="w-full h-14 mt-7 rounded-lg bg-[#3155e7] text-white text-[16px] font-semibold hover:bg-[#2447d4] transition"
        >
          Continue
        </button>

        {/* SKIP */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="w-full mt-4 text-[13px] font-medium text-[#64748b] hover:text-[#3155e7]"
        >
          Set up later
        </button>

        {/* FOOTER */}
        <p className="text-center text-[11px] text-[#94a3b8] mt-7">
          You can change your MFA method later from
          your account security settings.
        </p>
      </div>
    </main>
  );
}