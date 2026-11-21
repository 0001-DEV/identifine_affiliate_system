"use client";

import React, { useState, useEffect, useRef } from "react";

export function SitePreloader({ onComplete }: { onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtext, setTypedSubtext] = useState("");
  const [isLogoRolledLeft, setIsLogoRolledLeft] = useState(false);
  const hasStartedRef = useRef(false);

  // Sequence controller: 1 to 8 fast, then cinematic deliberate pacing on 9 & 10
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
        // Stage 9: XTREME CARDZ
        setCurrentStep(9);

        // At 2.8s: Roll Xtreme logo to the left side of text
        setTimeout(() => {
          setIsLogoRolledLeft(true);
        }, 2800);

        // At 4.5s: Transition to Stage 10 (IDENTIFINE)
        setTimeout(() => {
          setIsLogoRolledLeft(false);
          setCurrentStep(10);

          // Hold IDENTIFINE for 3.2s so full typing and reading complete comfortably
          setTimeout(() => {
            setIsExiting(true);
          }, 3200);

          // Finish and remove from DOM after smooth slide up (850ms)
          setTimeout(() => {
            setIsFinished(true);
            onComplete?.();
          }, 4050);
        }, 4500);
      }
    }, 130);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Deliberate typewriter effect: slower and clearly visible letter-by-letter
  useEffect(() => {
    if (currentStep === 9) {
      setTypedTitle("");
      setTypedSubtext("");
      const title = "XTREME CARDZ";
      const sub = "Crafted For The Exceptional • Smart & Metal Cards";

      let i = 0;
      // 90ms per letter so the writing effect is clearly noticed
      const titleTimer = setInterval(() => {
        i++;
        setTypedTitle(title.slice(0, i));
        if (i >= title.length) {
          clearInterval(titleTimer);

          // Subtitle starts typing after title completes (30ms per char)
          let j = 0;
          const subTimer = setInterval(() => {
            j += 1;
            setTypedSubtext(sub.slice(0, j));
            if (j >= sub.length) clearInterval(subTimer);
          }, 30);
        }
      }, 90);

      return () => clearInterval(titleTimer);
    } else if (currentStep === 10) {
      setTypedTitle("");
      setTypedSubtext("");
      const title = "IDENTIFINE";
      const sub = "Define. Secure. Belong.";

      let i = 0;
      // 100ms per letter for deliberate, prestigious reveal
      const titleTimer = setInterval(() => {
        i++;
        setTypedTitle(title.slice(0, i));
        if (i >= title.length) {
          clearInterval(titleTimer);

          // Subtitle typing (45ms per char)
          let j = 0;
          const subTimer = setInterval(() => {
            j += 1;
            setTypedSubtext(sub.slice(0, j));
            if (j >= sub.length) clearInterval(subTimer);
          }, 45);
        }
      }, 100);

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
          <div className="relative flex flex-col items-center text-center px-4 max-w-4xl">
            {/* XTREME LOGO: Descends from above on top of text, then rolls to left side of text */}
            <div
              className={`transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isLogoRolledLeft
                  ? "-translate-x-[115px] sm:-translate-x-[175px] md:-translate-x-[235px] lg:-translate-x-[285px] translate-y-[56px] sm:translate-y-[76px] md:translate-y-[96px] rotate-[-360deg] scale-[0.75] sm:scale-[0.82] z-20"
                  : "animate-descend-from-top translate-x-0 translate-y-0 rotate-0 mb-5 sm:mb-6"
              }`}
            >
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
                  <span className="inline-block w-1.5 h-7 sm:h-10 md:h-14 bg-[#F59E0B] ml-2 animate-pulse" />
                )}
              </h2>
            </div>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-neutral-300 min-h-[28px] drop-shadow">
              {typedSubtext}
              {typedTitle.length >= 12 && typedSubtext.length < 47 && (
                <span className="inline-block w-1 h-3.5 sm:h-4 bg-white/70 ml-1.5 animate-pulse" />
              )}
            </p>
          </div>
        ) : (
          <div className="relative flex flex-col items-center text-center px-4 max-w-4xl">
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
                  <span className="inline-block w-1.5 h-7 sm:h-10 md:h-14 bg-white ml-2 animate-pulse" />
                )}
              </h2>
            </div>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-neutral-300 min-h-[28px] drop-shadow">
              {typedSubtext}
              {typedTitle.length >= 10 && typedSubtext.length < 23 && (
                <span className="inline-block w-1 h-3.5 sm:h-4 bg-white/70 ml-1.5 animate-pulse" />
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
