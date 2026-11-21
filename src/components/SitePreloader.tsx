"use client";

import React, { useState, useEffect } from "react";

export function SitePreloader({ onComplete }: { onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Sequence: 1 to 8, then 9 (XTREME CARDZ), then 10 (IDENTIFINE)
    const timers: NodeJS.Timeout[] = [];

    // Rapid pulse 1 to 8 (~140ms each = ~1.12s)
    for (let i = 1; i <= 8; i++) {
      timers.push(
        setTimeout(() => {
          setCurrentStep(i);
        }, (i - 1) * 140)
      );
    }

    // Step 9: XTREME CARDZ at ~1.15s
    timers.push(
      setTimeout(() => {
        setCurrentStep(9);
      }, 8 * 140)
    );

    // Step 10: IDENTIFINE at ~1.95s (+800ms)
    timers.push(
      setTimeout(() => {
        setCurrentStep(10);
      }, 8 * 140 + 800)
    );

    // Slide up exit at ~2.85s (+900ms)
    timers.push(
      setTimeout(() => {
        setIsExiting(true);
      }, 8 * 140 + 1700)
    );

    // Remove from DOM after exit animation (850ms)
    timers.push(
      setTimeout(() => {
        setIsFinished(true);
        if (onComplete) onComplete();
      }, 8 * 140 + 2550)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0A0608] text-white flex flex-col items-center justify-center p-8 sm:p-14 select-none pointer-events-auto transition-transform duration-[850ms] ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.76, 0.007, 0.25, 1)",
      }}
    >
      {/* Center Countdown Display: 1-8, then XTREME CARDZ, then IDENTIFINE */}
      <div className="flex flex-col items-center justify-center my-auto">
        {currentStep <= 8 ? (
          <div className="flex flex-col items-center animate-[pulseGlowSlow_1s_infinite]">
            <span className="font-mono text-8xl sm:text-[11rem] md:text-[14rem] font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(245,158,11,0.25)]">
              {currentStep}
            </span>
          </div>
        ) : currentStep === 9 ? (
          <div className="flex flex-col items-center text-center animate-[slideUpFade_0.35s_ease-out] px-4 max-w-3xl">
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white flex items-center justify-center">
              <span className="text-[#F59E0B]">X</span>TREME&nbsp;CARDZ
            </span>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg font-medium tracking-[0.25em] uppercase text-neutral-300 drop-shadow">
              Crafted For The Exceptional • Smart &amp; Metal Cards
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center animate-[slideUpFade_0.35s_ease-out] px-4 max-w-3xl">
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-widest text-[#F59E0B] drop-shadow-[0_0_40px_rgba(245,158,11,0.35)]">
              IDENTIFINE
            </span>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg font-medium tracking-[0.3em] uppercase text-neutral-300 drop-shadow">
              Define. Secure. Belong.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
