"use client";

import React, { useState, useEffect, useRef } from "react";

const WORDS = ["Turn", "Your", "Network", "Into", "Recurring", "Cash"];

export function SitePreloader({ onComplete }: { onComplete?: () => void }) {
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [wordTransforms, setWordTransforms] = useState<{ [key: number]: React.CSSProperties }>({});

  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Lock scroll during preloader
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

      const newStyles: { [key: number]: React.CSSProperties } = {};
      let anyMatched = false;

      for (let i = 0; i < WORDS.length; i++) {
        const pEl = wordRefs.current[i];
        const hEl = document.getElementById(`hero-word-${i}`);

        if (pEl && hEl) {
          const pRect = pEl.getBoundingClientRect();
          const hRect = hEl.getBoundingClientRect();

          if (pRect.width > 0 && hRect.width > 0 && pRect.height > 0 && hRect.height > 0) {
            anyMatched = true;
            const deltaX = hRect.left - pRect.left;
            const deltaY = hRect.top - pRect.top;
            const scaleX = hRect.width / pRect.width;
            const scaleY = hRect.height / pRect.height;

            if (
              !isNaN(deltaX) &&
              !isNaN(deltaY) &&
              !isNaN(scaleX) &&
              !isNaN(scaleY) &&
              isFinite(deltaX) &&
              isFinite(deltaY) &&
              isFinite(scaleX) &&
              isFinite(scaleY)
            ) {
              newStyles[i] = {
                transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleX}, ${scaleY})`,
                transformOrigin: "top left",
                color: "#000000",
              };
            }
          }
        }
      }

      if (anyMatched) {
        setWordTransforms(newStyles);
      } else {
        const fallbackStyles: { [key: number]: React.CSSProperties } = {};
        for (let i = 0; i < WORDS.length; i++) {
          fallbackStyles[i] = {
            transform: "translate3d(0, -120px, 0) scale(0.85)",
            color: "#000000",
            opacity: 0,
          };
        }
        setWordTransforms(fallbackStyles);
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
          }, 85);
        } else {
          setIsTypingComplete(true);

          setTimeout(() => {
            if (isCancelled) return;
            startHeroTransition();
          }, 450);
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

  const getWordStyle = (idx: number): React.CSSProperties => {
    if (isExiting && wordTransforms[idx]) {
      return {
        ...wordTransforms[idx],
        transition: "transform 1000ms cubic-bezier(0.85, 0, 0.15, 1), color 750ms ease, opacity 1000ms ease",
      };
    }
    return {
      transform: "translate3d(0, 0, 0) scale(1, 1)",
      transformOrigin: "top left",
      color: "#FFFFFF",
      transition: "color 300ms ease",
    };
  };

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden">
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

      {/* 3. VERTICAL TEXT CONTAINER: Types out vertically, then glides and shrinks into hero */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center text-center">
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
                  ref={(el) => {
                    wordRefs.current[i] = el;
                  }}
                  style={getWordStyle(i)}
                  className={`inline-block font-normal tracking-tight leading-[1.05] will-change-transform text-5xl sm:text-7xl md:text-8xl lg:text-[92px] xl:text-[104px] ${
                    !isVisible ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  {isVisible ? currentTyped : word}
                  {isCurrent && (
                    <span className="inline-block w-[3px] sm:w-[4px] h-[0.75em] bg-amber-400 ml-2 align-baseline animate-pulse shadow-[0_0_14px_rgba(245,158,11,1)]" />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
