"use client";

import React, { useState, useEffect, useRef } from "react";
import { Wifi } from "lucide-react";

const WORDS = ["Turn", "Your", "Network", "Into", "Recurring", "Cash"];

export function SitePreloader({ onComplete }: { onComplete?: () => void }) {
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [isCardVisible, setIsCardVisible] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [cardTransform, setCardTransform] = useState<React.CSSProperties>({});

  const cardRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Lock body scroll during preloader
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    let isCancelled = false;
    let currentLine = 0;
    let currentChar = 0;

    const startHeroTransition = () => {
      if (isCancelled) return;

      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }

      const cEl = cardRef.current;
      const hEl = document.getElementById("hero-headline");

      if (cEl && hEl) {
        const cRect = cEl.getBoundingClientRect();
        const hRect = hEl.getBoundingClientRect();

        if (cRect.width > 0 && hRect.width > 0) {
          const deltaX = hRect.left + hRect.width / 2 - (cRect.left + cRect.width / 2);
          const deltaY = hRect.top + hRect.height / 2 - (cRect.top + cRect.height / 2);
          const scale = Math.min(0.46, Math.max(0.32, (hRect.height / cRect.height) * 1.55));

          if (
            !isNaN(deltaX) &&
            !isNaN(deltaY) &&
            !isNaN(scale) &&
            isFinite(deltaX) &&
            isFinite(deltaY) &&
            isFinite(scale)
          ) {
            setCardTransform({
              transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale}) rotateX(12deg) rotateZ(-3deg)`,
              opacity: 0,
              transition:
                "transform 1000ms cubic-bezier(0.85, 0, 0.15, 1), opacity 950ms cubic-bezier(0.85, 0, 0.15, 1)",
            });
          }
        }
      } else {
        setCardTransform({
          transform: "translate3d(0, -160px, 0) scale(0.42) rotateX(10deg)",
          opacity: 0,
          transition:
            "transform 1000ms cubic-bezier(0.85, 0, 0.15, 1), opacity 950ms cubic-bezier(0.85, 0, 0.15, 1)",
        });
      }

      setIsExiting(true);

      // Complete preloader as shutters finish opening (1050ms)
      setTimeout(() => {
        if (isCancelled) return;
        document.body.style.overflow = originalOverflow;
        setIsFinished(true);
        onComplete?.();
      }, 1050);
    };

    const typeNextChar = () => {
      if (isCancelled) return;

      const targetWord = WORDS[currentLine];

      if (currentChar < targetWord.length) {
        currentChar++;
        setLineIndex(currentLine);
        setCharIndex(currentChar);

        setTimeout(typeNextChar, 38);
      } else {
        if (currentLine < WORDS.length - 1) {
          setTimeout(() => {
            if (isCancelled) return;
            currentLine++;
            currentChar = 0;
            setLineIndex(currentLine);
            setCharIndex(0);
            setTimeout(typeNextChar, 38);
          }, 80);
        } else {
          // Completed all 6 words!
          setIsTypingComplete(true);
          // Illuminate card frame around text
          setIsCardVisible(true);

          // Hold completed card for 420ms so visitor sees the executive card
          setTimeout(() => {
            if (isCancelled) return;
            startHeroTransition();
          }, 420);
        }
      }
    };

    const initialTimer = setTimeout(typeNextChar, 180);

    return () => {
      isCancelled = true;
      clearTimeout(initialTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden [perspective:1200px]">
      {/* 1. LEFT BLACK SHUTTER: slides smoothly to the left when opening */}
      <div
        className={`absolute inset-y-0 left-0 w-[50.5%] bg-[#0A0608] transition-transform duration-[1000ms] ${
          isExiting ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.85, 0, 0.15, 1)",
        }}
      />

      {/* 2. RIGHT BLACK SHUTTER: slides smoothly to the right when opening */}
      <div
        className={`absolute inset-y-0 right-0 w-[50.5%] bg-[#0A0608] transition-transform duration-[1000ms] ${
          isExiting ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.85, 0, 0.15, 1)",
        }}
      />

      {/* 3. CARD CONTAINER: Types vertically, morphs into luxury metal card, shrinks & flies to hero */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          ref={cardRef}
          style={{
            ...cardTransform,
            transformOrigin: "center center",
          }}
          className={`relative w-[88vw] max-w-[340px] sm:max-w-[400px] md:max-w-[440px] aspect-[1/1.52] sm:aspect-[1/1.54] rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden will-change-transform transition-all duration-500 ease-out ${
            isCardVisible
              ? "bg-gradient-to-br from-[#1C1C1F] via-[#111113] to-[#08080A] border border-amber-400/50 shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.3)] ring-1 ring-inset ring-amber-300/20"
              : "bg-transparent border-transparent shadow-none"
          }`}
        >
          {/* Subtle Brushed Metal Light Sheen Overlay */}
          <div
            className={`absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_65%)] pointer-events-none transition-opacity duration-500 ${
              isCardVisible ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* TOP BAR OF CARD: Smart EMV Chip, NFC Waves, Luxury Foil Stamp */}
          <div
            className={`relative z-10 flex items-center justify-between transition-all duration-500 ${
              isCardVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            {/* Left: Contactless Waves & EMV Chip */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Etched Gold EMV Smart Chip */}
              <div className="w-10 h-7 sm:w-11 sm:h-8 rounded-md bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-[1.5px] shadow-[0_2px_8px_rgba(245,158,11,0.35)]">
                <div className="w-full h-full rounded-[4px] border border-amber-900/40 grid grid-cols-2 grid-rows-3 gap-[1px] p-[2px] bg-amber-500/25">
                  <div className="border border-amber-900/30 rounded-[1px]" />
                  <div className="border border-amber-900/30 rounded-[1px]" />
                  <div className="border border-amber-900/30 rounded-[1px]" />
                  <div className="border border-amber-900/30 rounded-[1px]" />
                  <div className="border border-amber-900/30 rounded-[1px]" />
                  <div className="border border-amber-900/30 rounded-[1px]" />
                </div>
              </div>

              {/* NFC Contactless Wave Indicator */}
              <Wifi className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 rotate-90" />
            </div>

            {/* Right: Micro Gold Foil Branding */}
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-amber-300/85 uppercase">
              XTREME • IDENTIFINE
            </span>
          </div>

          {/* CENTER: The 6 Vertical Headline Words */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-2">
            {WORDS.map((word, i) => {
              const isVisible = i <= lineIndex;
              const isCurrent = i === lineIndex && !isTypingComplete;
              const currentTyped =
                i < lineIndex ? word : i === lineIndex ? word.slice(0, charIndex) : word;

              return (
                <div
                  key={word}
                  className="flex items-center justify-center py-0.5 sm:py-1"
                >
                  <span
                    className={`inline-block font-normal tracking-tight leading-[1.08] text-3xl sm:text-4xl md:text-[44px] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] ${
                      !isVisible ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
                  >
                    {isVisible ? currentTyped : word}
                    {isCurrent && (
                      <span className="inline-block w-[3px] sm:w-[3.5px] h-[0.75em] bg-amber-400 ml-1.5 align-baseline animate-pulse shadow-[0_0_12px_rgba(245,158,11,1)]" />
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {/* BOTTOM BAR OF CARD: Executive Security Credential Bar */}
          <div
            className={`relative z-10 flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.2em] font-mono uppercase transition-all duration-500 ${
              isCardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <span className="text-neutral-400">ENCRYPTED SMART CARD</span>
            <span className="text-amber-400/95 font-semibold">24K METAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
