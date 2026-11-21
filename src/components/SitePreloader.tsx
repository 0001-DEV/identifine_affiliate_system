"use client";

import React, { useState, useEffect, useRef } from "react";

export function SitePreloader({ onComplete }: { onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const hasStartedRef = useRef(false);

  // Sequence: 1 to 8 rapid countdown, then pure XTREME logo (9), then pure IDENTIFINE logo (10)
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    let step = 1;

    // Fast 1 to 8 countdown (~130ms each = ~1.04s)
    const interval = setInterval(() => {
      step++;
      if (step <= 8) {
        setCurrentStep(step);
      } else if (step === 9) {
        clearInterval(interval);
        // Stage 9: Pure XTREME Logo
        setCurrentStep(9);

        // Hold Xtreme Logo for 1.6s
        setTimeout(() => {
          // Stage 10: Pure IDENTIFINE Logo
          setCurrentStep(10);

          // Hold Identifine Logo for 1.6s
          setTimeout(() => {
            setIsExiting(true);
          }, 1600);

          // Remove preloader after smooth slide-up exit (850ms)
          setTimeout(() => {
            setIsFinished(true);
            onComplete?.();
          }, 2450);
        }, 1600);
      }
    }, 130);

    return () => clearInterval(interval);
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
      {/* Center Countdown Display: 1-8, then XTREME Logo (9), then IDENTIFINE Logo (10) */}
      <div className="flex flex-col items-center justify-center my-auto">
        {currentStep <= 8 ? (
          <div key={currentStep} className="flex flex-col items-center animate-[pulseGlowSlow_1s_infinite]">
            <span className="font-mono text-8xl sm:text-[11rem] md:text-[14rem] font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(245,158,11,0.25)]">
              {currentStep}
            </span>
          </div>
        ) : currentStep === 9 ? (
          <div className="flex flex-col items-center justify-center animate-descend-from-top px-4">
            {/* Pure XTREME Logo: Extra Large Cinematic Display */}
            <img
              src="/xtreme-cardz-logo.png"
              alt="Xtreme Cardz"
              className="h-32 sm:h-44 md:h-56 lg:h-64 max-w-[85vw] w-auto object-contain drop-shadow-[0_25px_60px_rgba(245,158,11,0.5)]"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center animate-descend-from-top px-4">
            {/* Pure IDENTIFINE Logo: Extra Large Cinematic Display */}
            <img
              src="/identifine_logo.webp"
              alt="Identifine"
              className="h-24 sm:h-36 md:h-48 lg:h-56 max-w-[85vw] w-auto object-contain drop-shadow-[0_25px_60px_rgba(255,255,255,0.4)]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
