"use client";

import React, { useState, useEffect, useRef } from "react";

const WORDS = ["Turn", "Your", "Network", "Into", "Recurring", "Cash"];

// 42 Dynamic Golden Ember Particles for the text-to-card scatter transition
const PARTICLES = Array.from({ length: 42 }).map((_, i) => {
  const angle = (i / 42) * 2 * Math.PI + (i % 3) * 0.25;
  const distance = 130 + (i % 7) * 48;
  const x = Math.round(Math.cos(angle) * distance);
  const y = Math.round(Math.sin(angle) * (distance * 0.72));
  const z = Math.round(((i % 5) - 2) * 45);
  const size = 3.5 + (i % 4) * 2.2;
  const delay = (i % 8) * 35;
  return { id: i, x, y, z, size, delay };
});

type PreloaderPhase =
  | "typing"
  | "typed_hold"
  | "scatter"
  | "forming"
  | "card_showcase"
  | "hero_glide"
  | "finished";

interface SitePreloaderProps {
  onGlideStart?: () => void;
  onComplete?: () => void;
}

let hasPlayedInClientSession = false;

// Clear any stale sessionStorage flag from previous sessions so refreshes always show the intro
if (typeof window !== "undefined") {
  try {
    sessionStorage.removeItem("has_seen_preloader");
  } catch (e) {}
}

export function getHasPlayedInClientSession() {
  return hasPlayedInClientSession;
}

export function SitePreloader({ onGlideStart, onComplete }: SitePreloaderProps) {
  const [alreadySeen, setAlreadySeen] = useState<boolean>(() => hasPlayedInClientSession);
  const [phase, setPhase] = useState<PreloaderPhase>("typing");
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [cardTransform, setCardTransform] = useState<React.CSSProperties>({});
  const [scatterFactor, setScatterFactor] = useState<number>(1);

  const cardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const onGlideStartRef = useRef(onGlideStart);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onGlideStartRef.current = onGlideStart;
    onCompleteRef.current = onComplete;
  });

  const hasStartedRef = useRef(false);

  useEffect(() => {
    // If already played during this client-side session (internal link navigation), skip
    if (hasPlayedInClientSession) {
      setAlreadySeen(true);
      onGlideStartRef.current?.();
      onCompleteRef.current?.();
      return;
    }

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Lock body scroll during preloader
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      setScatterFactor(window.innerWidth < 640 ? 0.5 : 1);
    }

    let isCancelled = false;
    let currentLine = 0;
    let currentChar = 0;

    const startHeroGlide = () => {
      if (isCancelled) return;

      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }

      onGlideStartRef.current?.();
      setPhase("hero_glide");

      const cEl = cardRef.current;
      const hEl = document.getElementById("hero-headline");

      if (cEl && hEl) {
        const cRect = cEl.getBoundingClientRect();
        const hRect = hEl.getBoundingClientRect();

        if (cRect.width > 0 && hRect.width > 0) {
          const deltaX = hRect.left + hRect.width / 2 - (cRect.left + cRect.width / 2);
          const deltaY = hRect.top + hRect.height / 2 - (cRect.top + cRect.height / 2);
          const scale = Math.min(0.55, Math.max(0.34, (hRect.height / cRect.height) * 1.6));

          if (
            !isNaN(deltaX) &&
            !isNaN(deltaY) &&
            !isNaN(scale) &&
            isFinite(deltaX) &&
            isFinite(deltaY) &&
            isFinite(scale)
          ) {
            setCardTransform({
              transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale}) rotateX(6deg) rotateZ(-2deg)`,
              opacity: 0,
              transition:
                "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1300ms cubic-bezier(0.85, 0, 0.15, 1)",
            });
          }
        }
      } else {
        setCardTransform({
          transform: "translate3d(0, -160px, 0) scale(0.4) rotateX(8deg)",
          opacity: 0,
          transition:
            "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1300ms cubic-bezier(0.85, 0, 0.15, 1)",
        });
      }

      // Finish preloader as shutters and glide complete
      timerRef.current = setTimeout(() => {
        if (isCancelled) return;
        document.body.style.overflow = originalOverflow;
        hasPlayedInClientSession = true;
        setPhase("finished");
        onCompleteRef.current?.();
      }, 1450);
    };

    // Sequential Phase Engine
    const beginScatterSequence = () => {
      if (isCancelled) return;
      setPhase("typed_hold");

      // 1. Hold completed typed text cleanly WITHOUT any blinking cursor (400ms)
      timerRef.current = setTimeout(() => {
        if (isCancelled) return;
        setPhase("scatter");

        // 2. Text dissolves into glowing particles scattering outwards into 3D space (750ms)
        timerRef.current = setTimeout(() => {
          if (isCancelled) return;
          setPhase("forming");

          // 3. Particles rush inward magnetically to form the 24K Gold Card (550ms)
          timerRef.current = setTimeout(() => {
            if (isCancelled) return;
            setPhase("card_showcase");

            // 4. Showcase the clean gold card with text directly on card face (1600ms)
            timerRef.current = setTimeout(() => {
              if (isCancelled) return;
              startHeroGlide();
            }, 1600);
          }, 550);
        }, 750);
      }, 400);
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
          // Completed all 6 words! No cursor line - proceed to particle scatter
          beginScatterSequence();
        }
      }
    };

    // Kick off typing after 50ms
    timerRef.current = setTimeout(typeNextChar, 50);

    // Emergency fail-safe: guarantee the preloader unblocks after 9.5s
    const emergencyTimer = setTimeout(() => {
      if (!isCancelled) {
        startHeroGlide();
      }
    }, 9500);

    return () => {
      isCancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      clearTimeout(emergencyTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (alreadySeen || phase === "finished") return null;

  const handleSkip = () => {
    hasPlayedInClientSession = true;
    onGlideStartRef.current?.();
    setPhase("hero_glide");
    setCardTransform({
      transform: "translate3d(0, -160px, 0) scale(0.38) rotateX(8deg)",
      opacity: 0,
      transition: "transform 350ms ease-out, opacity 300ms ease-out",
    });
    setTimeout(() => {
      document.body.style.overflow = "";
      setPhase("finished");
      onCompleteRef.current?.();
    }, 380);
  };

  const isShuttersOpen = phase === "hero_glide";

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] cursor-pointer select-none overflow-hidden [perspective:1400px]"
    >
      {/* 1. LEFT BLACK SHUTTER: Seamless solid black, no line in the middle */}
      <div
        className={`absolute inset-y-0 left-0 w-[50.5%] z-10 bg-[#0A0608] transition-transform duration-[1400ms] ${
          isShuttersOpen ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.85, 0, 0.15, 1)",
        }}
      />

      {/* 2. RIGHT BLACK SHUTTER: Seamless solid black, no line in the middle */}
      <div
        className={`absolute inset-y-0 right-0 w-[50.5%] z-10 bg-[#0A0608] transition-transform duration-[1400ms] ${
          isShuttersOpen ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.85, 0, 0.15, 1)",
        }}
      />

      {/* 3. CENTER STAGE: Elevated to z-20 above shutters so text is vivid and never embedded or clipped */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-4 pointer-events-none">
        {/* A. TYPED TEXT STACK (Dissolves into particles upon completion) */}
        <div
          className={`absolute z-30 flex flex-col items-center justify-center text-center py-2 transition-all duration-500 ${
            phase === "scatter"
              ? "opacity-0 scale-105 blur-sm"
              : phase === "forming" || phase === "card_showcase" || phase === "hero_glide"
              ? "opacity-0 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
        >
          {WORDS.map((word, i) => {
            const isVisible = i <= lineIndex;
            // Only show the cursor while typing is actively typing that word; never after writing is complete!
            const showCursor =
              phase === "typing" &&
              i === lineIndex &&
              charIndex < word.length;
            const currentTyped =
              i < lineIndex ? word : i === lineIndex ? word.slice(0, charIndex) : "";

            if (!isVisible && phase === "typing") {
              return null;
            }

            return (
              <div
                key={word}
                className="flex items-center justify-center py-0.5 sm:py-1 will-change-transform"
              >
                <span
                  style={{ color: "#ffffff" }}
                  className="inline-block font-normal tracking-tight leading-[1.08] text-4xl sm:text-5xl md:text-6xl text-white"
                >
                  {currentTyped}
                  {showCursor && (
                    <span className="inline-block w-[2.5px] sm:w-[3px] h-[0.75em] bg-white ml-1.5 align-baseline animate-pulse" />
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* B. GOLDEN PARTICLES (Dissolves from text, scatters into 3D, then pulls into card) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {PARTICLES.map((p) => {
            let pStyle: React.CSSProperties = {
              width: `${p.size}px`,
              height: `${p.size}px`,
              transform: "translate3d(0, 0, 0) scale(0)",
              opacity: 0,
            };

            if (phase === "scatter") {
              pStyle = {
                width: `${p.size}px`,
                height: `${p.size}px`,
                transform: `translate3d(${p.x * scatterFactor}px, ${p.y * scatterFactor}px, ${p.z}px) scale(1)`,
                opacity: 0.95,
                transition: `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${p.delay}ms, opacity 500ms ease-out ${p.delay}ms`,
              };
            } else if (phase === "forming") {
              pStyle = {
                width: `${p.size}px`,
                height: `${p.size}px`,
                transform: "translate3d(0, 0, -80px) scale(0)",
                opacity: 0,
                transition: "transform 500ms cubic-bezier(0.7, 0, 0.2, 1), opacity 350ms ease-in",
              };
            }

            return (
              <span
                key={p.id}
                style={pStyle}
                className="absolute rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-yellow-100 shadow-[0_0_12px_rgba(245,158,11,1)] will-change-transform"
              />
            );
          })}
        </div>

        {/* C. THE AUTHENTIC 24K GOLD METAL MESH CARD: Pure isolated card, zero studio background, zero container */}
        <div
          ref={cardRef}
          style={{
            ...cardTransform,
            transformOrigin: "center center",
            filter:
              phase === "card_showcase"
                ? "drop-shadow(0 20px 45px rgba(0,0,0,0.9)) drop-shadow(0 0 35px rgba(245,158,11,0.5))"
                : phase === "forming"
                ? "drop-shadow(0 15px 30px rgba(245,158,11,0.4))"
                : undefined,
          }}
          className={`relative w-[90vw] max-w-[390px] sm:max-w-[450px] md:max-w-[500px] aspect-[1172/698] will-change-transform transition-all ${
            phase === "hero_glide"
              ? "" // Controlled by cardTransform during hero glide
              : phase === "card_showcase"
              ? "opacity-100 scale-100 duration-1000 ease-out"
              : phase === "forming"
              ? "opacity-95 scale-105 duration-550 ease-out"
              : "opacity-0 scale-75 pointer-events-none duration-300"
          }`}
        >
          {/* Authentic 24K Gold Metal Mesh Card - 100% transparent outside card boundary, no container box or studio background */}
          <img
            src="/images/products/gold-metal-mesh-pure.webp"
            alt="Xtreme Cardz 24K Gold Metal Mesh Card"
            className="w-full h-full object-contain select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
