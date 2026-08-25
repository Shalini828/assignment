"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthenticatorPage() {
  const router = useRouter();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode);
    setError(false);

    if (value && index < 5) {
      document.getElementById(`auth-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !code[index] &&
      index > 0
    ) {
      document.getElementById(`auth-${index - 1}`)?.focus();
    }
  };

  const handleVerify = () => {
    if (code.join("").length !== 6) return;

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    /*
      Demo behaviour:
      First 2 attempts = incorrect
      3rd attempt = successful verification
    */
    if (nextAttempts >= 3) {
      router.push("/success");
      return;
    }

    setError(true);
  };

  const clearCode = () => {
    setCode(["", "", "", "", "", ""]);
    setError(false);

    setTimeout(() => {
      document.getElementById("auth-0")?.focus();
    }, 50);
  };

  const isComplete = code.join("").length === 6;

  return (
    <main className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[640px] bg-white rounded-2xl border border-[#e5e7eb] shadow-sm px-8 sm:px-10 py-9">

        {/* BACK */}
        <button
          type="button"
          onClick={() => router.push("/authenticator-setup")}
          className="text-[26px] leading-none text-[#64748b] hover:text-[#111827] transition mb-7"
          aria-label="Go back"
        >
          ←
        </button>

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center text-[34px] ${
              error
                ? "bg-red-50"
                : "bg-[#eef2ff]"
            }`}
          >
            {error ? "🔒" : "🔐"}
          </div>
        </div>

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-bold text-[#111827]">
            Enter the 6-digit code
          </h1>

          <p className="text-[14px] text-[#64748b] mt-2">
            Enter the code from your authenticator app
          </p>
        </div>

        {/* INFO */}
        <div className="rounded-xl bg-[#f8fafc] border border-[#e2e8f0] p-4 mb-7">
          <div className="flex gap-3 items-start">
            <div className="w-9 h-9 rounded-lg bg-[#eef2ff] flex items-center justify-center shrink-0">
              🔐
            </div>

            <div>
              <p className="text-[14px] font-semibold text-[#111827]">
                Open your authenticator app
              </p>

              <p className="text-[13px] text-[#64748b] mt-1 leading-5">
                Enter the current 6-digit verification code
                shown in your authenticator app.
              </p>
            </div>
          </div>
        </div>

        {/* CODE BOXES */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-6">
          {code.map((value, index) => (
            <input
              key={index}
              id={`auth-${index}`}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={value}
              onChange={(e) =>
                handleChange(index, e.target.value)
              }
              onKeyDown={(e) =>
                handleKeyDown(index, e)
              }
              className={`w-12 h-14 sm:w-14 sm:h-14 text-center text-[20px] font-bold text-[#111827] bg-white rounded-lg border-2 outline-none transition ${
                error
                  ? "border-red-400 bg-red-50/30"
                  : "border-[#d1d5db] focus:border-[#3155e7] focus:ring-2 focus:ring-[#3155e7]/10"
              }`}
              aria-label={`Authenticator digit ${index + 1}`}
            />
          ))}
        </div>

        {/* ERROR */}
        {error && (
          <div className="text-center mb-5">
            <p className="text-[14px] font-semibold text-red-500">
              Incorrect code. Please try again.
            </p>

            <p className="text-[13px] text-red-500 mt-1">
              You have {3 - attempts} attempt
              {3 - attempts === 1 ? "" : "s"} left.
            </p>
          </div>
        )}

        {/* VERIFY */}
        <button
          type="button"
          onClick={handleVerify}
          disabled={!isComplete}
          className={`w-full h-14 rounded-lg text-[16px] font-semibold transition ${
            isComplete
              ? "bg-[#3155e7] text-white hover:bg-[#2447d4]"
              : "bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
          }`}
        >
          Verify Code
        </button>

        {/* CLEAR */}
        {isComplete && (
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={clearCode}
              className="text-[13px] font-medium text-[#3155e7] hover:underline"
            >
              Clear code
            </button>
          </div>
        )}

        {/* DIFFERENT METHOD */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => router.push("/verify")}
            className="text-[13px] font-medium text-[#3155e7] hover:underline"
          >
            Use a different verification method
          </button>
        </div>

        {/* FOOTER */}
        <p className="text-center text-[13px] text-[#64748b] mt-7">
          Make sure your authenticator app is synchronized
          with the correct account.
        </p>

        <p className="text-center text-[11px] text-[#94a3b8] mt-6">
          © 2024 SecureID. All rights reserved.
        </p>
      </div>
    </main>
  );
}