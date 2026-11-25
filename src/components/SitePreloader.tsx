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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
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
          const scale = Math.min(0.48, Math.max(0.32, (hRect.height / cRect.height) * 1.55));

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

        timerRef.current = setTimeout(typeNextChar, 36);
      } else {
        if (currentLine < WORDS.length - 1) {
          timerRef.current = setTimeout(() => {
            if (isCancelled) return;
            currentLine++;
            currentChar = 0;
            setLineIndex(currentLine);
            setCharIndex(0);
            timerRef.current = setTimeout(typeNextChar, 36);
          }, 75);
        } else {
          // Completed all 6 words!
          setIsTypingComplete(true);

          // Morph text into the authentic Gold Metal Mesh Card sample
          timerRef.current = setTimeout(() => {
            if (isCancelled) return;
            setIsCardVisible(true);

            // Hold Gold Metal Mesh Card so visitor sees it clearly before shrinking to hero
            timerRef.current = setTimeout(() => {
              if (isCancelled) return;
              startHeroTransition();
            }, 550);
          }, 120);
        }
      }
    };

    // Kick off typing after 50ms
    timerRef.current = setTimeout(typeNextChar, 50);

    // Emergency fail-safe: guarantee the preloader finishes after 4.2s
    const emergencyTimer = setTimeout(() => {
      if (!isCancelled) {
        startHeroTransition();
      }
    }, 4200);

    return () => {
      isCancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      clearTimeout(emergencyTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (isFinished) return null;

  const handleSkip = () => {
    setIsTypingComplete(true);
    setIsCardVisible(true);
    setIsExiting(true);
    setTimeout(() => {
      setIsFinished(true);
      onComplete?.();
    }, 350);
  };

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] cursor-pointer select-none overflow-hidden [perspective:1200px]"
    >
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

      {/* 3. CENTER STAGE: Vertical text types, condenses, then shrinks into Gold Metal Mesh card */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {/* A. VERTICAL TEXT WRITING STACK: Fades out as it condenses into the gold card */}
        <div
          className={`absolute flex flex-col items-center justify-center text-center py-2 transition-all duration-500 ease-out ${
            isCardVisible ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
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
                  className={`inline-block font-normal tracking-tight leading-[1.08] text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-[0_2px_14px_rgba(245,158,11,0.3)] ${
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

        {/* B. THE AUTHENTIC GOLD METAL MESH CARD SAMPLE: Shrinks and glides to hero headline */}
        <div
          ref={cardRef}
          style={{
            ...cardTransform,
            transformOrigin: "center center",
          }}
          className={`relative w-[90vw] max-w-[420px] sm:max-w-[480px] md:max-w-[540px] aspect-[1.58/1] rounded-2xl sm:rounded-3xl overflow-hidden will-change-transform transition-all duration-600 ease-out ${
            isCardVisible
              ? "opacity-100 scale-100 shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_55px_rgba(245,158,11,0.6)] border-2 border-amber-300/80"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          {/* Authentic High-Definition 24K Gold Metal Mesh Card Image */}
          <img
            src="/images/products/gold-metal-mesh.webp"
            alt="Xtreme Cardz Gold Metal Mesh Sample"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          />

          {/* Luxury Metallic Specular Glass Sheen Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-amber-100/25 pointer-events-none" />

          {/* Precision 24K Card Face Details & Engraved Headline */}
          <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7 z-10 select-none">
            {/* Top Bar: Etched Smart Chip, NFC Waves & Brand Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* 24K Gold EMV Microchip */}
                <div className="w-10 h-7 sm:w-12 sm:h-8 rounded bg-gradient-to-tr from-amber-600 via-amber-300 to-yellow-100 p-[1.5px] shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  <div className="w-full h-full rounded-[2px] border border-amber-900/50 grid grid-cols-2 grid-rows-3 gap-[1px] p-[1.5px] bg-amber-500/30">
                    <div className="border border-amber-900/30" />
                    <div className="border border-amber-900/30" />
                    <div className="border border-amber-900/30" />
                    <div className="border border-amber-900/30" />
                    <div className="border border-amber-900/30" />
                    <div className="border border-amber-900/30" />
                  </div>
                </div>

                {/* NFC Contactless Wave Indicator */}
                <Wifi className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 rotate-90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
              </div>

              {/* Micro Brand Stamp */}
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] text-neutral-950 uppercase bg-amber-300/90 backdrop-blur-md px-2.5 py-1 rounded shadow-sm border border-amber-200/60">
                XTREME CARDZ
              </span>
            </div>

            {/* Center: The Headline Engraved on the Gold Card Face */}
            <div className="my-auto text-center px-2 py-1">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-neutral-950 tracking-tight leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
                Turn Your Network Into Recurring Cash
              </h3>
            </div>

            {/* Bottom Bar: Executive Gold Mesh Signature */}
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-widest uppercase font-bold text-neutral-900 bg-amber-200/40 backdrop-blur-xs px-2 py-0.5 rounded">
              <span>24K GOLD METAL MESH</span>
              <span>SMART CREDENTIAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
