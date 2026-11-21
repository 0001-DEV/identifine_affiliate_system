"use client";

import React, { useState, useEffect, useRef } from "react";

export function SitePreloader({ onComplete }: { onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isXtremeIconLeft, setIsXtremeIconLeft] = useState(false);
  const hasStartedRef = useRef(false);

  // Sequence: 1 to 8 rapid countdown, then XTREME Cardz (9), then IDENTIFINE (10)
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
        // Stage 9: XTREME Cardz (Icon + Text come in stacked)
        setCurrentStep(9);

        // After the logo comes in (~800ms), move the icon to the left of the text
        setTimeout(() => {
          setIsXtremeIconLeft(true);
        }, 800);

        // Transition to Stage 10: IDENTIFINE after holding horizontal lockup
        setTimeout(() => {
          setIsXtremeIconLeft(false);
          setCurrentStep(10);

          // Hold Identifine Logo for 2.2s so the slow glide from the right completes and settles smoothly
          setTimeout(() => {
            setIsExiting(true);
          }, 2200);

          // Remove preloader after smooth slide-up exit (850ms)
          setTimeout(() => {
            setIsFinished(true);
            onComplete?.();
          }, 3050);
        }, 2500);
      }
    }, 130);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0A0608] text-white flex flex-col items-center justify-center p-8 sm:p-14 select-none pointer-events-auto overflow-hidden transition-transform duration-[850ms] ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.76, 0.007, 0.25, 1)",
      }}
    >
      {/* Center Countdown Display: 1-8, then XTREME (9), then IDENTIFINE (10) */}
      <div className="flex flex-col items-center justify-center my-auto w-full">
        {currentStep <= 8 ? (
          <div key={currentStep} className="flex flex-col items-center animate-[pulseGlowSlow_1s_infinite]">
            <span className="font-mono text-8xl sm:text-[11rem] md:text-[14rem] font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(245,158,11,0.25)]">
              {currentStep}
            </span>
          </div>
        ) : currentStep === 9 ? (
          <div className="relative flex flex-col items-center justify-center animate-descend-from-top px-4 w-full">
            {/* XTREME CARDZ: Icon and Text as two entities; Icon moves to the left of the text */}
            <div className="relative flex items-center justify-center w-full max-w-4xl h-44 sm:h-64">
              {/* 1. XTREME ICON: starts centered above, then moves to the left */}
              <img
                src="/xtreme-cardz-icon.png"
                alt="Xtreme Cardz Icon"
                className={`absolute transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] object-contain drop-shadow-[0_20px_50px_rgba(245,158,11,0.5)] ${
                  isXtremeIconLeft
                    ? "h-14 sm:h-20 md:h-28 -translate-x-[120px] sm:-translate-x-[180px] md:-translate-x-[240px] lg:-translate-x-[300px] translate-y-0"
                    : "h-24 sm:h-36 md:h-44 translate-x-0 -translate-y-12 sm:-translate-y-16 md:-translate-y-20"
                }`}
              />

              {/* 2. XTREME TEXT: starts centered below, aligns beside icon */}
              <img
                src="/xtreme-cardz-text.png"
                alt="Xtreme Cardz Text"
                className={`absolute transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] object-contain drop-shadow-[0_15px_35px_rgba(255,255,255,0.25)] ${
                  isXtremeIconLeft
                    ? "h-8 sm:h-12 md:h-16 translate-x-[40px] sm:translate-x-[60px] md:translate-x-[80px] lg:translate-x-[100px] translate-y-0"
                    : "h-9 sm:h-14 md:h-18 translate-x-0 translate-y-12 sm:translate-y-16 md:translate-y-20"
                }`}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center animate-slide-in-right-slow px-4">
            {/* Pure IDENTIFINE Logo: comes in smoothly from the right */}
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
