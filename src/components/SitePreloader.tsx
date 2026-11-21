"use client";

import React, { useState, useEffect, useRef } from "react";

export function SitePreloader({ onComplete }: { onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isXtremeDocked, setIsXtremeDocked] = useState(false);
  const hasStartedRef = useRef(false);

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
        // Stage 9: XTREME CARDZ begins (big in center)
        setCurrentStep(9);

        // After being big (~850ms), smoothly move logo icon to the left side beside text
        setTimeout(() => {
          setIsXtremeDocked(true);
        }, 850);

        // Hold the docked lockup until 2700ms, then transition to IDENTIFINE
        setTimeout(() => {
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
        }, 2700);
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
      {/* Center Countdown Display: 1-8, then XTREME CARDZ Lockup (9), then IDENTIFINE Logo (10) */}
      <div className="flex flex-col items-center justify-center my-auto">
        {currentStep <= 8 ? (
          <div key={currentStep} className="flex flex-col items-center animate-[pulseGlowSlow_1s_infinite]">
            <span className="font-mono text-8xl sm:text-[11rem] md:text-[14rem] font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(245,158,11,0.25)]">
              {currentStep}
            </span>
          </div>
        ) : currentStep === 9 ? (
          <div className="flex flex-col items-center justify-center px-4 w-full max-w-5xl">
            <div className="flex items-center justify-center">
              {/* Logo Icon: Starts big in center, then smoothly moves to left beside text */}
              <div
                className={`transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center ${
                  isXtremeDocked
                    ? "scale-100 mr-4 sm:mr-6"
                    : "scale-[1.4] sm:scale-[1.7] md:scale-[2.0] mr-0 animate-descend-from-top"
                }`}
              >
                <img
                  src="/xtreme-cardz-logo.png"
                  alt="Xtreme Cardz"
                  className="h-16 sm:h-22 md:h-28 lg:h-32 w-auto object-contain drop-shadow-[0_20px_50px_rgba(245,158,11,0.45)]"
                />
              </div>

              {/* Text XTREME CARDZ: Reveals to the right of the logo icon once docked */}
              <div
                className={`overflow-hidden transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isXtremeDocked
                    ? "max-w-[700px] opacity-100 translate-x-0"
                    : "max-w-0 opacity-0 -translate-x-12"
                }`}
              >
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white flex items-center whitespace-nowrap">
                  <span className="text-[#F59E0B]">X</span>TREME&nbsp;CARDZ
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center animate-descend-from-top px-4">
            {/* Pure IDENTIFINE Logo */}
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
