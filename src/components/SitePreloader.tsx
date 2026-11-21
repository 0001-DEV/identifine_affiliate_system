"use client";

import React, { useState, useEffect, useRef } from "react";

export function SitePreloader({ onComplete }: { onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtext, setTypedSubtext] = useState("");
  const hasStartedRef = useRef(false);

  // Sequence controller: 1 to 8 fast, then reduced speed for 9 & 10
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
        // REDUCE SPEED for step 9 (XTREME CARDZ)
        setCurrentStep(9);

        // Hold Step 9 for 2000ms so logo descends & text is typed out completely
        setTimeout(() => {
          // REDUCE SPEED for step 10 (IDENTIFINE)
          setCurrentStep(10);

          // Hold Step 10 for 2100ms so Identifine logo descends & text is typed out
          setTimeout(() => {
            setIsExiting(true);
          }, 2100);

          // Remove from DOM after smooth slide up
          setTimeout(() => {
            setIsFinished(true);
            onComplete?.();
          }, 2950);
        }, 2000);
      }
    }, 130);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Simultaneous typing effect when reaching 9 & 10
  useEffect(() => {
    if (currentStep === 9) {
      setTypedTitle("");
      setTypedSubtext("");
      const title = "XTREME CARDZ";
      const sub = "Crafted For The Exceptional • Smart & Metal Cards";

      let i = 0;
      const titleTimer = setInterval(() => {
        i++;
        setTypedTitle(title.slice(0, i));
        if (i >= title.length) {
          clearInterval(titleTimer);

          let j = 0;
          const subTimer = setInterval(() => {
            j += 2;
            setTypedSubtext(sub.slice(0, j));
            if (j >= sub.length) clearInterval(subTimer);
          }, 20);
        }
      }, 45);

      return () => clearInterval(titleTimer);
    } else if (currentStep === 10) {
      setTypedTitle("");
      setTypedSubtext("");
      const title = "IDENTIFINE";
      const sub = "Define. Secure. Belong.";

      let i = 0;
      const titleTimer = setInterval(() => {
        i++;
        setTypedTitle(title.slice(0, i));
        if (i >= title.length) {
          clearInterval(titleTimer);

          let j = 0;
          const subTimer = setInterval(() => {
            j += 1;
            setTypedSubtext(sub.slice(0, j));
            if (j >= sub.length) clearInterval(subTimer);
          }, 28);
        }
      }, 50);

      return () => clearInterval(titleTimer);
    }
  }, [currentStep]);

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
      {/* Center Countdown Display: 1-8, then XTREME CARDZ (9), then IDENTIFINE (10) */}
      <div className="flex flex-col items-center justify-center my-auto">
        {currentStep <= 8 ? (
          <div key={currentStep} className="flex flex-col items-center animate-[pulseGlowSlow_1s_infinite]">
            <span className="font-mono text-8xl sm:text-[11rem] md:text-[14rem] font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(245,158,11,0.25)]">
              {currentStep}
            </span>
          </div>
        ) : currentStep === 9 ? (
          <div className="flex flex-col items-center text-center px-4 max-w-3xl">
            {/* XTREME LOGO: Descends from above and stays right on top of text */}
            <div className="animate-descend-from-top mb-5 sm:mb-6">
              <img
                src="/xtreme-cardz-logo.png"
                alt="Xtreme Cardz Logo"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-[0_15px_35px_rgba(245,158,11,0.35)]"
              />
            </div>

            {/* TEXT: Written simultaneously with cursor */}
            <div className="min-h-[50px] sm:min-h-[70px] md:min-h-[90px] flex items-center justify-center">
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white flex items-center justify-center">
                {typedTitle.startsWith("X") ? (
                  <>
                    <span className="text-[#F59E0B]">X</span>
                    {typedTitle.slice(1)}
                  </>
                ) : (
                  typedTitle
                )}
                {typedTitle.length < 12 && (
                  <span className="inline-block w-1 h-7 sm:h-10 md:h-14 bg-[#F59E0B] ml-2 animate-pulse" />
                )}
              </h2>
            </div>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-neutral-300 min-h-[28px] drop-shadow">
              {typedSubtext}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center px-4 max-w-3xl">
            {/* IDENTIFINE LOGO: Descends from above and stays right on top of text */}
            <div className="animate-descend-from-top mb-5 sm:mb-6">
              <img
                src="/identifine_logo.webp"
                alt="Identifine Logo"
                className="h-14 sm:h-18 md:h-22 w-auto object-contain drop-shadow-[0_15px_35px_rgba(245,158,11,0.4)]"
              />
            </div>

            {/* TEXT: Written simultaneously with cursor */}
            <div className="min-h-[50px] sm:min-h-[70px] md:min-h-[90px] flex items-center justify-center">
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-widest text-[#F59E0B] drop-shadow-[0_0_40px_rgba(245,158,11,0.35)] flex items-center justify-center">
                {typedTitle}
                {typedTitle.length < 10 && (
                  <span className="inline-block w-1 h-7 sm:h-10 md:h-14 bg-white ml-2 animate-pulse" />
                )}
              </h2>
            </div>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-neutral-300 min-h-[28px] drop-shadow">
              {typedSubtext}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
