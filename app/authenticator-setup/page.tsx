"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthenticatorSetupPage() {
  const router = useRouter();

  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const setupKey = "JBSW Y3DP EHPK 3PXP";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(setupKey.replace(/\s/g, ""));
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleContinue = () => {
    router.push("/authenticator");
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[800px] bg-white rounded-2xl border border-[#e5e7eb] shadow-sm px-8 sm:px-12 py-8">

        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={() => router.push("/verify")}
          className="text-[28px] leading-none text-[#64748b] hover:text-[#111827] transition mb-5"
          aria-label="Go back"
        >
          ←
        </button>

        {/* ICON */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-[#eef2ff] flex items-center justify-center">
            <span className="text-[38px]">🔐</span>
          </div>
        </div>

        {/* HEADER */}
        <div className="text-center mb-9">
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[#111827]">
            Authenticator Setup
          </h1>

          <p className="text-[15px] sm:text-[16px] text-[#64748b] mt-2">
            Set up your authenticator app
          </p>
        </div>

        {/* STEP 1 */}
        <div className="flex gap-4 mb-8">
          <div className="w-9 h-9 shrink-0 rounded-full bg-[#3155e7] text-white flex items-center justify-center font-bold">
            1
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-[#111827]">
              Install an authenticator app
            </h2>

            <p className="text-[15px] text-[#64748b] mt-1 leading-6">
              Use Google Authenticator, Microsoft Authenticator, Authy, or
              another compatible authenticator app.
            </p>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="flex gap-4 mb-5">
          <div className="w-9 h-9 shrink-0 rounded-full bg-[#3155e7] text-white flex items-center justify-center font-bold">
            2
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-[#111827]">
              Scan the QR code
            </h2>

            <p className="text-[15px] text-[#64748b] mt-1">
              Open your authenticator app and scan this QR code.
            </p>
          </div>
        </div>

        {/* QR CODE */}
        <div className="flex justify-center mb-4">
          <div className="w-[240px] h-[240px] bg-white border border-[#dbe1ea] rounded-2xl p-4 flex items-center justify-center shadow-sm">
            <FakeQRCode />
          </div>
        </div>

        <p className="text-center text-[15px] text-[#64748b] mb-7">
          Scan the QR code with your authenticator app.
        </p>

        {/* MANUAL KEY */}
        <div className="rounded-xl bg-[#f8fafc] border border-[#dbe3ed] p-5 mb-7">

          <div className="flex items-center justify-between gap-4 mb-3">
            <div>
              <p className="text-[15px] font-bold text-[#111827]">
                Can't scan?
              </p>

              <p className="text-[14px] text-[#64748b] mt-1">
                Enter this setup key manually.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="text-[14px] font-semibold text-[#3155e7] hover:underline whitespace-nowrap"
            >
              {showKey ? "Hide key" : "Show key"}
            </button>
          </div>

          {showKey && (
            <div className="border border-dashed border-[#cbd5e1] bg-white rounded-lg p-3 flex items-center justify-between gap-3">

              <span className="font-mono text-[16px] sm:text-[18px] tracking-[2px] text-[#111827]">
                {setupKey}
              </span>

              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 h-10 px-4 rounded-lg border border-[#3155e7] text-[#3155e7] font-semibold text-[14px] hover:bg-[#eef2ff] transition"
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>
          )}
        </div>

        {/* CONTINUE */}
        <button
          type="button"
          onClick={handleContinue}
          className="w-full h-14 rounded-lg bg-[#3155e7] text-white text-[16px] font-semibold hover:bg-[#2447d4] transition"
        >
          Continue
        </button>

        {/* HELPER TEXT */}
        <p className="text-center text-[13px] text-[#64748b] mt-4">
          After scanning, you'll be asked to enter the 6-digit code
          from your authenticator app.
        </p>

        {/* FOOTER */}
        <p className="text-center text-[11px] text-[#94a3b8] mt-7">
          © 2024 SecureID. All rights reserved.
        </p>
      </div>
    </main>
  );
}


/* =========================================================
   REALISTIC QR-STYLE COMPONENT
   ========================================================= */

function FakeQRCode() {
  const size = 29;

  const matrix = createQRPattern(size);

  return (
    <div
      className="grid w-full h-full"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
        gap: "0px",
      }}
      aria-label="Authenticator QR code"
    >
      {matrix.map((filled, index) => (
        <div
          key={index}
          className={filled ? "bg-[#111827]" : "bg-white"}
        />
      ))}
    </div>
  );
}


/* =========================================================
   QR PATTERN GENERATOR
   ========================================================= */

function createQRPattern(size: number): boolean[] {
  const grid = Array(size * size).fill(false);

  const setCell = (x: number, y: number, value = true) => {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      grid[y * size + x] = value;
    }
  };

  /* Finder patterns */

  const addFinder = (startX: number, startY: number) => {
    for (let y = -1; y <= 7; y++) {
      for (let x = -1; x <= 7; x++) {
        const px = startX + x;
        const py = startY + y;

        if (
          px < 0 ||
          py < 0 ||
          px >= size ||
          py >= size
        ) {
          continue;
        }

        const inside =
          x >= 0 &&
          x <= 6 &&
          y >= 0 &&
          y <= 6;

        const outer =
          x === 0 ||
          x === 6 ||
          y === 0 ||
          y === 6;

        const inner =
          x >= 2 &&
          x <= 4 &&
          y >= 2 &&
          y <= 4;

        setCell(px, py, inside && (outer || inner));
      }
    }
  };

  // Top-left
  addFinder(0, 0);

  // Top-right
  addFinder(size - 7, 0);

  // Bottom-left
  addFinder(0, size - 7);

  /* Timing patterns */

  for (let i = 8; i < size - 8; i++) {
    if (i % 2 === 0) {
      setCell(i, 6, true);
      setCell(6, i, true);
    }
  }

  /* Alignment pattern */

  const alignmentX = size - 7;
  const alignmentY = size - 7;

  for (let y = -2; y <= 2; y++) {
    for (let x = -2; x <= 2; x++) {
      const distance = Math.max(Math.abs(x), Math.abs(y));

      setCell(
        alignmentX + x,
        alignmentY + y,
        distance !== 1
      );
    }
  }

  /* Deterministic data pattern */

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const index = y * size + x;

      // Don't overwrite finder areas
      const topLeft =
        x < 8 && y < 8;

      const topRight =
        x >= size - 8 && y < 8;

      const bottomLeft =
        x < 8 && y >= size - 8;

      const alignment =
        x >= size - 9 &&
        x <= size - 5 &&
        y >= size - 9 &&
        y <= size - 5;

      const timing =
        x === 6 || y === 6;

      if (
        topLeft ||
        topRight ||
        bottomLeft ||
        alignment ||
        timing
      ) {
        continue;
      }

      const pattern =
        (
          x * 17 +
          y * 31 +
          x * y * 7 +
          (x % 3) * 11 +
          (y % 5) * 13
        ) % 11;

      if (pattern < 5) {
        grid[index] = true;
      }
    }
  }

  return grid;
}