"use client";

import React, { useState, useEffect, useRef } from "react";

export function SitePreloader({ onComplete }: { onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    let step = 1;

    // Tick 1 to 8 rapidly every 150ms
    const interval = setInterval(() => {
      step++;
      if (step <= 8) {
        setCurrentStep(step);
      } else if (step === 9) {
        setCurrentStep(9); // XTREME CARDZ
      } else if (step === 10) {
        setCurrentStep(10); // IDENTIFINE
        clearInterval(interval);

        // Allow reading IDENTIFINE tagline (1.1s)
        setTimeout(() => {
          setIsExiting(true);
        }, 1100);

        // Complete transition and remove from DOM (850ms exit)
        setTimeout(() => {
          setIsFinished(true);
          onComplete?.();
        }, 1950);
      }
    }, 150);

    return () => {
      clearInterval(interval);
    };
  }, []); // Run strictly once on mount

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
          <div key={currentStep} className="flex flex-col items-center animate-[pulseGlowSlow_1s_infinite]">
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
