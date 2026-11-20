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
      className={`fixed inset-0 z-[9999] bg-[#0A0608] text-white flex flex-col items-center justify-between p-8 sm:p-14 select-none pointer-events-auto transition-transform duration-[850ms] ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.76, 0.007, 0.25, 1)",
      }}
    >
      {/* Top Brand Tagline & Status */}
      <div className="w-full flex items-center justify-between text-xs font-mono tracking-widest uppercase">
        <span className="text-[#800020] font-bold flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#800020] animate-pulse" />
          SYSTEM INITIALIZING
        </span>
        <span className="text-white/60">7.5% AFFILIATE ECOSYSTEM</span>
      </div>

      {/* Center Countdown Display: 1-8, then XTREME, then IDENTIFINE */}
      <div className="flex flex-col items-center justify-center my-auto">
        {currentStep <= 8 ? (
          <div className="flex flex-col items-center animate-[pulseGlowSlow_1s_infinite]">
            <span className="font-mono text-8xl sm:text-[11rem] md:text-[14rem] font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(128,0,32,0.4)]">
              {currentStep}
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#800020] font-bold -mt-2 sm:-mt-6">
              PHASE 0{currentStep} / 08
            </span>
          </div>
        ) : currentStep === 9 ? (
          <div className="flex flex-col items-center animate-[slideUpFade_0.35s_ease-out]">
            <span className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-white flex items-center">
              <span className="text-[#F59E0B]">X</span>TREME
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-white/50 mt-2 font-bold">
              SMART LUXURY NFC
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-[slideUpFade_0.35s_ease-out]">
            <span className="text-6xl sm:text-8xl md:text-9xl font-black tracking-widest text-[#F59E0B] drop-shadow-[0_0_40px_rgba(245,158,11,0.3)]">
              IDENTIFINE
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-white/60 mt-2 font-bold">
              CORPORATE IDENTITY &amp; AFFILIATES
            </span>
          </div>
        )}
      </div>

      {/* Bottom Broken Wine and White Segmented Line */}
      <div className="w-full max-w-md flex flex-col items-center gap-3">
        {/* Broken Wine & White Segmented Line Track */}
        <div className="w-full h-2.5 rounded-full bg-black/60 border border-white/10 p-0.5 overflow-hidden flex items-center gap-1.5">
          {[...Array(12)].map((_, i) => {
            const isWine = i % 2 === 0;
            const activeThreshold = Math.ceil((currentStep / 10) * 12);
            const isLit = i < activeThreshold;
            return (
              <div
                key={i}
                className={`flex-1 h-full rounded-sm transition-all duration-200 ${
                  isLit
                    ? isWine
                      ? "bg-[#800020] shadow-[0_0_10px_#800020]"
                      : "bg-white shadow-[0_0_8px_#FFFFFF]"
                    : "bg-white/10 opacity-30"
                }`}
              />
            );
          })}
        </div>

        {/* Dynamic Label */}
        <div className="flex justify-between w-full text-[11px] font-mono text-neutral-400">
          <span className="text-[#800020] font-bold">
            {currentStep <= 8 ? `STEP ${currentStep}/8` : currentStep === 9 ? "XTREME" : "IDENTIFINE"}
          </span>
          <span>{currentStep === 10 ? "READY" : "LOADING..."}</span>
        </div>
      </div>
    </div>
  );
}
