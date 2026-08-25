"use client";

import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[640px] bg-white rounded-2xl border border-[#e5e7eb] shadow-sm px-8 sm:px-10 py-10 text-center">

        {/* SUCCESS ICON */}
        <div className="flex justify-center mb-7">
          <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#16a34a] flex items-center justify-center">
              <span className="text-white text-[36px] font-bold">
                ✓
              </span>
            </div>
          </div>
        </div>

        {/* HEADING */}
        <h1 className="text-[30px] font-bold text-[#111827]">
          Verification Successful
        </h1>

        <p className="text-[15px] text-[#64748b] mt-3 leading-6">
          Your identity has been successfully verified.
        </p>

        {/* SUCCESS CARD */}
        <div className="mt-8 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] p-5 text-left">
          <div className="flex gap-3 items-start">
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <span className="text-green-600 font-bold">
                ✓
              </span>
            </div>

            <div>
              <p className="text-[15px] font-bold text-[#166534]">
                Account verification completed
              </p>

              <p className="text-[13px] text-[#15803d] mt-1 leading-5">
                Your email address and authenticator verification
                have been successfully completed.
              </p>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-6 border border-[#e5e7eb] rounded-xl p-5 text-left">
          <p className="text-[13px] font-semibold text-[#64748b] mb-4">
            Security checks completed
          </p>

          <div className="space-y-3">
            <VerificationItem text="Email verification" />

            <VerificationItem text="Identity verification" />

            <VerificationItem text="Authenticator verification" />
          </div>
        </div>

        {/* CONTINUE */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="w-full h-14 mt-8 rounded-lg bg-[#3155e7] text-white text-[16px] font-semibold hover:bg-[#2447d4] transition"
        >
          Continue to Login
        </button>

        {/* MESSAGE */}
        <p className="text-[13px] text-[#64748b] mt-5">
          You can now sign in securely using your registered
          credentials.
        </p>

        {/* FOOTER */}
        <p className="text-[11px] text-[#94a3b8] mt-8">
          © 2024 SecureID. All rights reserved.
        </p>
      </div>
    </main>
  );
}

function VerificationItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
        <span className="text-[12px] font-bold text-green-600">
          ✓
        </span>
      </div>

      <span className="text-[14px] text-[#334155]">
        {text}
      </span>

      <span className="ml-auto text-[12px] font-semibold text-green-600">
        Verified
      </span>
    </div>
  );
}