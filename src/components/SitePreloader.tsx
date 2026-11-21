"use client";

import React, { useState, useEffect } from "react";

export function SitePreloader({ onComplete }: { onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Sequence: 1 to 8, then 9 (XTREME), then 10 (IDENTIFINE)
    const timers: NodeJS.Timeout[] = [];

    // Rapid pulse 1 to 8 (~160ms each = ~1.28s)
    for (let i = 1; i <= 8; i++) {
      timers.push(
        setTimeout(() => {
          setCurrentStep(i);
        }, (i - 1) * 160)
      );
    }

    // Step 9: XTREME at ~1.35s
    timers.push(
      setTimeout(() => {
        setCurrentStep(9);
      }, 8 * 160)
    );

    // Step 10: IDENTIFINE at ~1.85s
    timers.push(
      setTimeout(() => {
        setCurrentStep(10);
      }, 8 * 160 + 500)
    );

    // Slide up exit at ~2.5s
    timers.push(
      setTimeout(() => {
        setIsExiting(true);
      }, 8 * 160 + 1150)
    );

    // Remove from DOM after exit animation (800ms)
    timers.push(
      setTimeout(() => {
        setIsFinished(true);
        if (onComplete) onComplete();
      }, 8 * 160 + 1950)
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
      {/* Center Countdown Display: 1-8, then XTREME, then IDENTIFINE */}
      <div className="flex flex-col items-center justify-center my-auto">
        {currentStep <= 8 ? (
          <div className="flex flex-col items-center animate-[pulseGlowSlow_1s_infinite]">
            <span className="font-mono text-8xl sm:text-[11rem] md:text-[14rem] font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(128,0,32,0.4)]">
              {currentStep}
            </span>
          </div>
        ) : currentStep === 9 ? (
          <div className="flex flex-col items-center animate-[slideUpFade_0.35s_ease-out]">
            <span className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-white flex items-center">
              <span className="text-[#F59E0B]">X</span>TREME
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-[slideUpFade_0.35s_ease-out]">
            <span className="text-6xl sm:text-8xl md:text-9xl font-black tracking-widest text-[#F59E0B] drop-shadow-[0_0_40px_rgba(245,158,11,0.3)]">
              IDENTIFINE
            </span>
          </div>
        )}
      </div>

      {/* Bottom Broken Wine and White Segmented Line (Steady aesthetic broken line, no progress filling or text updates) */}
      <div className="w-full max-w-md pb-6 sm:pb-8 flex flex-col items-center">
        <div className="w-full h-2.5 rounded-full bg-black/60 border border-white/10 p-0.5 overflow-hidden flex items-center gap-1.5 shadow-xl">
          {[...Array(12)].map((_, i) => {
            const isWine = i % 2 === 0;
            return (
              <div
                key={i}
                className={`flex-1 h-full rounded-sm ${
                  isWine
                    ? "bg-[#800020] shadow-[0_0_8px_#800020]"
                    : "bg-white/90 shadow-[0_0_6px_#FFFFFF]"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
