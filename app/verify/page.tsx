"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Method = "email" | "sms" | "authenticator";

export default function VerifyPage() {
  const router = useRouter();
  const [method, setMethod] = useState<Method>("email");

  const handleContinue = () => {
    if (method === "email") {
      router.push("/email-otp");
    } else if (method === "sms") {
      router.push("/sms-otp");
    } else {
      router.push("/authenticator");
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[640px] bg-white rounded-2xl border border-[#e5e7eb] shadow-sm px-10 py-10">

        {/* Back */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-[24px] text-[#64748b] hover:text-[#111827] mb-7"
        >
          ←
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#eef2ff] flex items-center justify-center text-3xl">
            🔐
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-9">
          <h1 className="text-[28px] font-bold text-[#111827]">
            Verify your identity
          </h1>

          <p className="text-[16px] text-[#64748b] mt-2">
            Choose a method to continue
          </p>
        </div>

        {/* Email OTP */}
        <button
          type="button"
          onClick={() => setMethod("email")}
          className={`w-full text-left p-5 rounded-xl border-2 mb-3 transition ${
            method === "email"
              ? "border-[#3155e7] bg-[#eff6ff]"
              : "border-[#d1d5db] bg-white hover:border-[#9ca3af]"
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl">✉️</span>

            <div className="flex-1">
              <p className="text-[16px] font-bold text-[#111827]">
                Email OTP
              </p>

              <p className="text-[14px] text-[#64748b] mt-1">
                Receive a code on your email
              </p>
            </div>

            <span
              className={`w-5 h-5 rounded-full border-2 ${
                method === "email"
                  ? "border-[#3155e7] bg-[#3155e7]"
                  : "border-[#cbd5e1]"
              }`}
            />
          </div>
        </button>

        {/* SMS OTP */}
        <button
          type="button"
          onClick={() => setMethod("sms")}
          className={`w-full text-left p-5 rounded-xl border-2 mb-3 transition ${
            method === "sms"
              ? "border-[#3155e7] bg-[#eff6ff]"
              : "border-[#d1d5db] bg-white hover:border-[#9ca3af]"
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl">📱</span>

            <div className="flex-1">
              <p className="text-[16px] font-bold text-[#111827]">
                SMS OTP
              </p>

              <p className="text-[14px] text-[#64748b] mt-1">
                Receive a code on your mobile
              </p>
            </div>

            <span
              className={`w-5 h-5 rounded-full border-2 ${
                method === "sms"
                  ? "border-[#3155e7] bg-[#3155e7]"
                  : "border-[#cbd5e1]"
              }`}
            />
          </div>
        </button>

        {/* Authenticator */}
        <button
          type="button"
          onClick={() => setMethod("authenticator")}
          className={`w-full text-left p-5 rounded-xl border-2 transition ${
            method === "authenticator"
              ? "border-[#3155e7] bg-[#eff6ff]"
              : "border-[#d1d5db] bg-white hover:border-[#9ca3af]"
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl">🔐</span>

            <div className="flex-1">
              <p className="text-[16px] font-bold text-[#111827]">
                Authenticator App
              </p>

              <p className="text-[14px] text-[#64748b] mt-1">
                Use code from your authenticator app
              </p>
            </div>

            <span
              className={`w-5 h-5 rounded-full border-2 ${
                method === "authenticator"
                  ? "border-[#3155e7] bg-[#3155e7]"
                  : "border-[#cbd5e1]"
              }`}
            />
          </div>
        </button>

        {/* Continue */}
        <button
          type="button"
          onClick={handleContinue}
          className="w-full h-14 mt-7 rounded-lg bg-[#3155e7] text-white text-[16px] font-semibold hover:bg-[#2447d4]"
        >
          Continue
        </button>
      </div>
    </main>
  );
}