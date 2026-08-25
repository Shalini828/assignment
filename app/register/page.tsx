"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const isValid =
    fullName.trim() !== "" &&
    email.trim() !== "" &&
    mobile.trim() !== "" &&
    passwordRules.length &&
    passwordRules.uppercase &&
    passwordRules.number &&
    passwordRules.special &&
    agreed;

  const handleRegister = () => {
    if (!isValid) return;

    // Registration flow starts with email verification
    router.push("/email-otp");
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[700px] bg-white rounded-2xl border border-[#e5e7eb] shadow-sm px-8 sm:px-12 py-8">

        {/* Back */}
        <button
          type="button"
          onClick={() => router.back()}
          className="text-[#64748b] text-2xl mb-5 hover:text-[#111827]"
          aria-label="Go back"
        >
          ←
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[26px] font-bold text-[#111827]">
            Create your account
          </h1>

          <p className="text-[15px] text-[#64748b] mt-2">
            Let's get you started
          </p>
        </div>

        {/* Full Name */}
        <div className="mb-5">
          <label className="block text-[15px] font-medium text-[#1f2937] mb-2">
            Full Name
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full h-12 rounded-lg border border-[#d1d5db] px-4 text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#3155e7] focus:ring-2 focus:ring-[#3155e7]/10"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-[15px] font-medium text-[#1f2937] mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full h-12 rounded-lg border border-[#d1d5db] px-4 text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#3155e7] focus:ring-2 focus:ring-[#3155e7]/10"
          />
        </div>

        {/* Mobile Number */}
        <div className="mb-5">
          <label className="block text-[15px] font-medium text-[#1f2937] mb-2">
            Mobile Number
          </label>

          <div className="flex gap-2">
            <select
              defaultValue="+91"
              className="w-[90px] h-12 rounded-lg border border-[#d1d5db] px-3 text-[#111827] bg-white outline-none focus:border-[#3155e7]"
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>

            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile Number"
              className="flex-1 h-12 rounded-lg border border-[#d1d5db] px-4 text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#3155e7] focus:ring-2 focus:ring-[#3155e7]/10"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-[15px] font-medium text-[#1f2937] mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full h-12 rounded-lg border border-[#d1d5db] px-4 pr-12 text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#3155e7] focus:ring-2 focus:ring-[#3155e7]/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "◉" : "◌"}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="rounded-lg bg-[#f8fafc] border border-[#eef2f7] p-4 mb-5">
          <p className="text-[13px] font-medium text-[#475569] mb-3">
            Password must contain:
          </p>

          <div className="space-y-2 text-[13px]">
            <PasswordRule
              valid={passwordRules.length}
              text="At least 8 characters"
            />

            <PasswordRule
              valid={passwordRules.uppercase}
              text="1 uppercase letter"
            />

            <PasswordRule
              valid={passwordRules.number}
              text="1 number"
            />

            <PasswordRule
              valid={passwordRules.special}
              text="1 special character"
            />
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 mb-6">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 mt-0.5 accent-[#3155e7]"
          />

          <p className="text-[13px] text-[#64748b]">
            I agree to the{" "}
            <button
              type="button"
              className="text-[#3155e7] font-medium hover:underline"
            >
              Terms & Conditions
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="text-[#3155e7] font-medium hover:underline"
            >
              Privacy Policy
            </button>
          </p>
        </div>

        {/* Create Account */}
        <button
          type="button"
          disabled={!isValid}
          onClick={handleRegister}
          className={`w-full h-[52px] rounded-lg text-[16px] font-semibold transition ${
            isValid
              ? "bg-[#3155e7] text-white hover:bg-[#2447d4]"
              : "bg-[#dbe2f5] text-[#94a3b8] cursor-not-allowed"
          }`}
        >
          Create Account
        </button>

        {/* Login */}
        <p className="text-center text-[14px] text-[#64748b] mt-5">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-[#3155e7] font-semibold hover:underline"
          >
            Login
          </button>
        </p>

        {/* Footer */}
        <p className="text-center text-[11px] text-[#94a3b8] mt-7">
          © 2024 SecureID. All rights reserved.
        </p>
      </div>
    </main>
  );
}

function PasswordRule({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
          valid
            ? "bg-green-100 text-green-600"
            : "bg-[#e5e7eb] text-[#94a3b8]"
        }`}
      >
        {valid ? "✓" : ""}
      </span>

      <span className={valid ? "text-[#16a34a]" : "text-[#64748b]"}>
        {text}
      </span>
    </div>
  );
}