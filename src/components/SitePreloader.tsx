"use client";

import React, { useState, useEffect, useRef } from "react";

const WORDS = ["Turn", "Your", "Network", "Into", "Recurring", "Cash"];

// 42 Dynamic Golden Ember Particles for the scatter & transform transitions
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
  | "scatter"       // 1. Text turns into gold particles
  | "forming"       // 2. Particles immediately transform into the Gold Metal Mesh picture
  | "card_ready"    // Card is showcased in center
  | "intro_open"    // 3. Intro section opens WHILE card turns into particles back and flies to hero
  | "hero_dissolve" // 4. Particles dissolve into the initial text in the hero section
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
  const [headlineOffset, setHeadlineOffset] = useState({ x: 0, y: -220 });
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

    // Sequential Phase Engine
    const beginIntroSequence = () => {
      if (isCancelled) return;

      // 1. Text turns into gold particles (immediate scatter)
      setPhase("scatter");

      timerRef.current = setTimeout(() => {
        if (isCancelled) return;

        // 2. Particles immediately transform into the Gold Metal Mesh picture
        setPhase("forming");

        timerRef.current = setTimeout(() => {
          if (isCancelled) return;

          // Card is fully formed in center
          setPhase("card_ready");

          timerRef.current = setTimeout(() => {
            if (isCancelled) return;

            // Measure position of hero headline
            const cEl = cardRef.current;
            const hEl = document.getElementById("hero-headline");
            let deltaX = 0;
            let deltaY = -220;

            if (cEl && hEl) {
              const cRect = cEl.getBoundingClientRect();
              const hRect = hEl.getBoundingClientRect();
              if (cRect.width > 0 && hRect.width > 0) {
                const calcX = hRect.left + hRect.width / 2 - (cRect.left + cRect.width / 2);
                const calcY = hRect.top + hRect.height / 2 - (cRect.top + cRect.height / 2);
                if (!isNaN(calcX) && !isNaN(calcY) && isFinite(calcX) && isFinite(calcY)) {
                  deltaX = calcX;
                  deltaY = calcY;
                }
              }
            }
            setHeadlineOffset({ x: deltaX, y: deltaY });

            // 3. THEN THE INTRO SECTION OPENS, WHILE THE CARD TURNS TO PARTICLES BACK
            setPhase("intro_open");
            onGlideStartRef.current?.();

            // Card shatters / bursts into particles
            setCardTransform({
              transform: `translate3d(0, -25px, 0) scale(1.06)`,
              opacity: 0,
              filter: "drop-shadow(0 0 60px rgba(245,158,11,1)) blur(12px) brightness(1.7)",
              transition: "transform 350ms ease-out, opacity 300ms ease-out, filter 300ms ease-out",
            });

            // 4. Particles fly up and dissolve into the initial text in the hero section
            timerRef.current = setTimeout(() => {
              if (isCancelled) return;
              setPhase("hero_dissolve");

              // 5. Complete preloader and release page
              timerRef.current = setTimeout(() => {
                if (isCancelled) return;
                document.body.style.overflow = originalOverflow;
                hasPlayedInClientSession = true;
                setPhase("finished");
                onCompleteRef.current?.();
              }, 600);
            }, 750);
          }, 350); // 350ms card showcase so user clearly sees the Gold Metal Mesh card
        }, 380); // 380ms particles transform into card
      }, 400); // 400ms text scatter
    };

    const typeNextChar = () => {
      if (isCancelled) return;

      const targetWord = WORDS[currentLine];

      if (currentChar < targetWord.length) {
        currentChar++;
        setLineIndex(currentLine);
        setCharIndex(currentChar);
        timerRef.current = setTimeout(typeNextChar, 24);
      } else {
        if (currentLine < WORDS.length - 1) {
          timerRef.current = setTimeout(() => {
            if (isCancelled) return;
            currentLine++;
            currentChar = 0;
            setLineIndex(currentLine);
            setCharIndex(0);
            timerRef.current = setTimeout(typeNextChar, 24);
          }, 45);
        } else {
          // Completed all 6 words! Immediately trigger particle scatter sequence
          timerRef.current = setTimeout(beginIntroSequence, 120);
        }
      }
    };

    // Kick off typing after 50ms
    timerRef.current = setTimeout(typeNextChar, 50);

    // Emergency fail-safe: guarantee the preloader unblocks after 8s
    const emergencyTimer = setTimeout(() => {
      if (!isCancelled) {
        setPhase("finished");
        document.body.style.overflow = originalOverflow;
        onGlideStartRef.current?.();
        onCompleteRef.current?.();
      }
    }, 8000);

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
    setPhase("intro_open");
    setCardTransform({
      transform: "translate3d(0, -100px, 0) scale(0.5)",
      opacity: 0,
      transition: "transform 250ms ease-out, opacity 200ms ease-out",
    });
    setTimeout(() => {
      document.body.style.overflow = "";
      setPhase("finished");
      onCompleteRef.current?.();
    }, 300);
  };

  const isShuttersOpen = phase === "intro_open" || phase === "hero_dissolve";

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] cursor-pointer select-none overflow-hidden [perspective:1400px]"
    >
      {/* 1. LEFT BLACK SHUTTER: Solid deep black, no line in the middle */}
      <div
        className={`absolute inset-y-0 left-0 w-[50.5%] z-10 bg-black transition-transform duration-[1100ms] ${
          isShuttersOpen ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.85, 0, 0.15, 1)",
        }}
      />

      {/* 2. RIGHT BLACK SHUTTER: Solid deep black, no line in the middle */}
      <div
        className={`absolute inset-y-0 right-0 w-[50.5%] z-10 bg-black transition-transform duration-[1100ms] ${
          isShuttersOpen ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.85, 0, 0.15, 1)",
        }}
      />

      {/* 3. CENTER STAGE: Elevated to z-20 above shutters */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-4 pointer-events-none">
        {/* A. TYPED TEXT STACK (Dissolves into particles upon completion) */}
        <div
          className={`absolute z-30 flex flex-col items-center justify-center text-center py-2 transition-all duration-300 ${
            phase === "scatter"
              ? "opacity-0 scale-105 blur-sm"
              : phase === "forming" || phase === "card_ready" || phase === "intro_open" || phase === "hero_dissolve"
              ? "opacity-0 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
        >
          {WORDS.map((word, i) => {
            const isVisible = i <= lineIndex;
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
                  style={{ color: "#FFFFFF", opacity: 1 }}
                  className="inline-block font-bold sm:font-extrabold tracking-tight leading-[1.08] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white select-none"
                >
                  {currentTyped || word}
                  {showCursor && (
                    <span className="inline-block w-[3.5px] sm:w-[4px] h-[0.75em] bg-white ml-2 align-baseline animate-pulse shadow-[0_0_8px_#ffffff]" />
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* B. GOLDEN PARTICLES (Dissolves from text, forms card, and bursts back out to dissolve into hero headline) */}
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
                opacity: 1,
                transition: `transform 400ms cubic-bezier(0.16, 1, 0.3, 1) ${p.delay * 0.25}ms, opacity 300ms ease-out`,
              };
            } else if (phase === "forming") {
              pStyle = {
                width: `${p.size}px`,
                height: `${p.size}px`,
                transform: "translate3d(0, 0, -40px) scale(0)",
                opacity: 0,
                transition: "transform 380ms cubic-bezier(0.7, 0, 0.2, 1), opacity 250ms ease-in",
              };
            } else if (phase === "card_ready") {
              pStyle = {
                width: `${p.size}px`,
                height: `${p.size}px`,
                transform: "translate3d(0, 0, 0) scale(0)",
                opacity: 0,
              };
            } else if (phase === "intro_open") {
              // CARD TURNS BACK INTO PARTICLES & FLIES UP TO HERO HEADLINE!
              pStyle = {
                width: `${p.size * 1.8}px`,
                height: `${p.size * 1.8}px`,
                transform: `translate3d(${headlineOffset.x + p.x * 2.2}px, ${headlineOffset.y + p.y * 0.75}px, ${p.z}px) scale(1.35)`,
                opacity: 1,
                transition: `transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${p.delay * 0.2}ms, opacity 300ms ease-out`,
              };
            } else if (phase === "hero_dissolve") {
              // PARTICLES DISSOLVE DIRECTLY INTO THE HERO HEADLINE TEXT
              pStyle = {
                width: `${p.size}px`,
                height: `${p.size}px`,
                transform: `translate3d(${headlineOffset.x + p.x * 0.3}px, ${headlineOffset.y + p.y * 0.15}px, 0) scale(0)`,
                opacity: 0,
                transition: `transform 550ms cubic-bezier(0.7, 0, 0.2, 1) ${p.delay * 0.15}ms, opacity 450ms ease-out ${p.delay * 0.15}ms`,
              };
            }

            return (
              <span
                key={p.id}
                style={pStyle}
                className="absolute rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-yellow-100 shadow-[0_0_16px_rgba(245,158,11,1)] will-change-transform"
              />
            );
          })}
        </div>

        {/* C. THE AUTHENTIC 24K GOLD METAL MESH CARD: Formed from particles in center */}
        <div
          ref={cardRef}
          style={{
            transformOrigin: "center center",
            filter:
              phase === "card_ready"
                ? "drop-shadow(0 20px 45px rgba(0,0,0,0.9)) drop-shadow(0 0 35px rgba(245,158,11,0.6))"
                : phase === "forming"
                ? "drop-shadow(0 15px 30px rgba(245,158,11,0.5))"
                : undefined,
            ...cardTransform,
          }}
          className={`relative w-[90vw] max-w-[390px] sm:max-w-[450px] md:max-w-[500px] aspect-[1172/698] will-change-transform transition-all ${
            phase === "intro_open" || phase === "hero_dissolve"
              ? "" // Controlled by cardTransform (burst & dissolve)
              : phase === "card_ready"
              ? "opacity-100 scale-100 duration-300 ease-out"
              : phase === "forming"
              ? "opacity-100 scale-100 duration-380 ease-out"
              : "opacity-0 scale-85 pointer-events-none duration-250"
          }`}
        >
          {/* Authentic 24K Gold Metal Mesh Card - 100% transparent outside card boundary */}
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
