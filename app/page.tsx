"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleLogin = () => {
    // Demo assignment behavior:
    // show invalid credentials first.
    setLoginError(true);
  };

  const handleContinue = () => {
    router.push("/verify");
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[640px] bg-white rounded-2xl border border-[#e5e7eb] shadow-sm px-10 sm:px-12 py-10 sm:py-12">
        {/* ICON */}
        <div className="flex justify-center mb-7">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center ${
              loginError ? "bg-red-50" : "bg-[#eef2ff]"
            }`}
          >
            <span className="text-3xl">🔒</span>
          </div>
        </div>

        {/* HEADER */}
        <div className="text-center mb-9">
          <h1 className="text-[28px] leading-tight font-bold text-[#111827]">
            Welcome back!
          </h1>

          <p className="text-[16px] text-[#64748b] mt-2">
            Login to your account
          </p>
        </div>

        {/* EMAIL / USERNAME */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-[16px] font-medium text-[#1f2937] mb-2"
          >
            Email or Username
          </label>

          <div className="relative">
            <span
              className={`absolute left-4 top-1/2 -translate-y-1/2 text-[18px] ${
                loginError ? "text-red-400" : "text-[#64748b]"
              }`}
            >
              ✉
            </span>

            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLoginError(false);
              }}
              placeholder="Email or Username"
              autoComplete="username"
              className={`w-full h-14 rounded-lg border pl-12 pr-4 bg-white text-[16px] font-medium text-[#111827] placeholder:text-[#9ca3af] outline-none transition ${
                loginError
                  ? "border-red-400 bg-red-50/20"
                  : "border-[#d1d5db] focus:border-[#3155e7] focus:ring-2 focus:ring-[#3155e7]/10"
              }`}
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="password"
              className="text-[16px] font-medium text-[#1f2937]"
            >
              Password
            </label>

            <button
              type="button"
              className="text-[14px] font-medium text-[#3155e7] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <span
              className={`absolute left-4 top-1/2 -translate-y-1/2 text-[18px] ${
                loginError ? "text-red-400" : "text-[#64748b]"
              }`}
            >
              🔑
            </span>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginError(false);
              }}
              placeholder="Password"
              autoComplete="current-password"
              className={`w-full h-14 rounded-lg border pl-12 pr-12 bg-white text-[16px] font-medium text-[#111827] placeholder:text-[#9ca3af] outline-none transition ${
                loginError
                  ? "border-red-400 bg-red-50/20"
                  : "border-[#d1d5db] focus:border-[#3155e7] focus:ring-2 focus:ring-[#3155e7]/10"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#111827]"
            >
              {showPassword ? "◉" : "◌"}
            </button>
          </div>

          {/* ERROR */}
          {loginError && (
            <p className="text-[13px] font-medium text-red-500 mt-2">
              Invalid email or password. Please try again.
            </p>
          )}
        </div>

        {/* REMEMBER ME */}
        <div className="flex items-center gap-2 mt-5 mb-6">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 accent-[#3155e7]"
          />

          <label htmlFor="remember" className="text-[14px] text-[#475569]">
            Remember me
          </label>
        </div>

        {/* LOGIN */}
        <button
          type="button"
          onClick={handleLogin}
          className="w-full h-14 rounded-lg bg-[#3155e7] text-white text-[16px] font-semibold hover:bg-[#2447d4] transition"
        >
          Login
        </button>

        {/* CONTINUE AFTER INVALID LOGIN */}
        {loginError && (
          <button
            type="button"
            onClick={handleContinue}
            className="w-full h-12 mt-3 rounded-lg border border-[#3155e7] bg-white text-[#3155e7] font-semibold hover:bg-[#eff6ff] transition"
          >
            Continue
          </button>
        )}

        {/* DIVIDER */}
        <div className="flex items-center gap-4 my-7">
          <div className="h-px bg-[#e5e7eb] flex-1" />

          <span className="text-[13px] text-[#94a3b8]">or</span>

          <div className="h-px bg-[#e5e7eb] flex-1" />
        </div>

        {/* GOOGLE */}
        <button
          type="button"
          className="w-full h-14 rounded-lg border border-[#d1d5db] flex items-center justify-center gap-3 text-[16px] font-medium text-[#1f2937] bg-white hover:bg-gray-50 transition"
        >
          <span className="font-bold text-red-500">G</span>
          Continue with Google
        </button>

        {/* REGISTER */}
        <p className="text-center text-[14px] text-[#64748b] mt-7">
          New here?{" "}
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="text-[#3155e7] font-semibold hover:underline"
          >
            Create an account
          </button>
        </p>
      </div>
    </main>
  );
}
