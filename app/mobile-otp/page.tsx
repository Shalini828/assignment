"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function MobileOtpPage() {
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(165);
  const [error, setError] = useState(false);
  const [expired, setExpired] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* TIMER */
  useEffect(() => {
    if (expired || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setExpired(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, expired]);

  /* OTP INPUT */
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
    setError(false);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /* BACKSPACE */
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /* VERIFY */
  const handleVerify = () => {
    if (otp.join("").length !== 6 || expired) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    // Demo: entered OTP is intentionally treated as incorrect
    if (newAttempts < 3) {
      setError(true);
    } else {
      setError(false);
    }
  };

  /* RESEND */
  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(165);
    setExpired(false);
    setError(false);
    setAttempts(0);

    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 50);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsPart = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      secondsPart
    ).padStart(2, "0")}`;
  };

  const isComplete = otp.join("").length === 6;
  const maxAttempts = attempts >= 3;

  return (
    <main className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[640px] bg-white rounded-2xl border border-[#e5e7eb] shadow-sm px-10 py-10">

        {/* BACK */}
        <button
          type="button"
          onClick={() => router.push("/email-otp")}
          className="text-[24px] text-[#64748b] hover:text-[#111827] mb-7"
          aria-label="Go back"
        >
          ←
        </button>

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl ${
              error || expired || maxAttempts
                ? "bg-red-50"
                : "bg-[#ecfdf5]"
            }`}
          >
            📞
          </div>
        </div>

        {/* HEADING */}
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-bold text-[#111827]">
            Mobile Verification
          </h1>

          <p className="text-[14px] text-[#64748b] mt-2">
            Enter the 6-digit code sent to
          </p>

          <p className="text-[15px] font-bold text-[#111827] mt-1">
            +91 98765 43210
          </p>
        </div>

        {/* MAX ATTEMPTS */}
        {maxAttempts ? (
          <div className="text-center">
            <div className="rounded-xl bg-red-50 border border-red-200 p-5 mb-6">
              <p className="text-[16px] font-bold text-red-600">
                Maximum attempts reached
              </p>

              <p className="text-[13px] text-red-500 mt-2">
                Please request a new verification code.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResend}
              className="w-full h-14 rounded-lg bg-[#3155e7] text-white text-[16px] font-semibold hover:bg-[#2447d4]"
            >
              Resend New Code
            </button>
          </div>
        ) : (
          <>
            {/* OTP BOXES */}
            <div className="flex justify-center gap-2 mb-6">
              {otp.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={value}
                  disabled={expired}
                  onChange={(e) =>
                    handleChange(index, e.target.value)
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(index, e)
                  }
                  className={`w-12 h-12 text-center text-[18px] font-bold text-[#111827] bg-white rounded-md border-2 outline-none ${
                    error
                      ? "border-red-400 bg-red-50"
                      : expired
                      ? "border-[#e5e7eb] bg-gray-50"
                      : "border-[#d1d5db] focus:border-[#3155e7] focus:ring-2 focus:ring-[#3155e7]/10"
                  }`}
                />
              ))}
            </div>

            {/* WRONG OTP */}
            {error && (
              <div className="text-center mb-5">
                <p className="text-[14px] font-semibold text-red-500">
                  Incorrect code. Please try again.
                </p>

                <p className="text-[13px] text-red-500 mt-1">
                  You have {3 - attempts} attempt
                  {3 - attempts !== 1 ? "s" : ""} left.
                </p>
              </div>
            )}

            {/* EXPIRED */}
            {expired && (
              <div className="text-center mb-5">
                <p className="text-[14px] font-semibold text-red-500">
                  This code has expired.
                </p>
              </div>
            )}

            {/* TIMER */}
            {!expired && (
              <p className="text-center text-[14px] text-[#64748b]">
                Code expires in{" "}
                <span className="font-bold text-[#3155e7]">
                  {formatTime(timeLeft)}
                </span>
              </p>
            )}

            {/* VERIFY */}
            <button
              type="button"
              onClick={handleVerify}
              disabled={!isComplete || expired}
              className={`w-full h-14 mt-7 rounded-lg text-[16px] font-semibold ${
                isComplete && !expired
                  ? "bg-[#3155e7] text-white hover:bg-[#2447d4]"
                  : "bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
              }`}
            >
              Verify Code
            </button>

            {/* RESEND */}
            <div className="text-center mt-5">
              <button
                type="button"
                onClick={handleResend}
                disabled={!expired && timeLeft > 0}
                className={`text-[14px] font-semibold ${
                  !expired && timeLeft > 0
                    ? "text-[#cbd5e1] cursor-not-allowed"
                    : "text-[#3155e7] hover:underline"
                }`}
              >
                Resend code
                {!expired && ` (${formatTime(timeLeft)})`}
              </button>
            </div>

            {/* CHANGE NUMBER */}
            <p className="text-center text-[13px] text-[#64748b] mt-6">
              Wrong number?{" "}
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="text-[#3155e7] font-semibold hover:underline"
              >
                Change
              </button>
            </p>
          </>
        )}
      </div>
    </main>
  );
}