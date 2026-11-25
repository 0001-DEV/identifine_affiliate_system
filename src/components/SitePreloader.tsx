"use client";

import React, { useState, useEffect, useRef } from "react";
import { Wifi } from "lucide-react";

const WORDS = ["Turn", "Your", "Network", "Into", "Recurring", "Cash"];

const SCATTER_OFFSETS = [
  { x: -190, y: -130, z: 90, rot: -16, scale: 1.15 }, // Turn
  { x: 200, y: -105, z: 70, rot: 15, scale: 1.12 }, // Your
  { x: -250, y: 15, z: 110, rot: -20, scale: 1.22 }, // Network
  { x: 240, y: 25, z: 80, rot: 18, scale: 1.16 }, // Into
  { x: -200, y: 145, z: 95, rot: -12, scale: 1.2 }, // Recurring
  { x: 220, y: 165, z: 120, rot: 22, scale: 1.28 }, // Cash
];

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

  useEffect(() => {
    // If already played during this client-side session (internal link navigation), skip
    if (hasPlayedInClientSession) {
      setAlreadySeen(true);
      onGlideStart?.();
      onComplete?.();
      return;
    }

    // Mark as played so internal navigation doesn't replay it
    hasPlayedInClientSession = true;

    // Lock body scroll during preloader
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      setScatterFactor(window.innerWidth < 640 ? 0.45 : 1);
    }

    let isCancelled = false;
    let currentLine = 0;
    let currentChar = 0;

    const startHeroGlide = () => {
      if (isCancelled) return;

      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }

      onGlideStart?.();
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
        setPhase("finished");
        onComplete?.();
      }, 1450);
    };

    // Sequential Phase Engine
    const beginScatterSequence = () => {
      if (isCancelled) return;
      setPhase("typed_hold");

      // 1. Hold typed text briefly so user reads the completed words
      timerRef.current = setTimeout(() => {
        if (isCancelled) return;
        setPhase("scatter");

        // 2. Text scatters dynamically into 3D space (700ms)
        timerRef.current = setTimeout(() => {
          if (isCancelled) return;
          setPhase("forming");

          // 3. Scattered text condenses inwards and forms the 24K Gold Card (550ms)
          timerRef.current = setTimeout(() => {
            if (isCancelled) return;
            setPhase("card_showcase");

            // 4. Showcase the formed 24K Gold Metal Mesh card with generous time (1600ms)
            timerRef.current = setTimeout(() => {
              if (isCancelled) return;
              startHeroGlide();
            }, 1600);
          }, 550);
        }, 700);
      }, 450);
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
          // Completed all 6 words! Begin scatter and card formation
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
  }, [onGlideStart, onComplete]);

  if (alreadySeen || phase === "finished") return null;

  const handleSkip = () => {
    hasPlayedInClientSession = true;
    onGlideStart?.();
    setPhase("hero_glide");
    setCardTransform({
      transform: "translate3d(0, -160px, 0) scale(0.38) rotateX(8deg)",
      opacity: 0,
      transition: "transform 350ms ease-out, opacity 300ms ease-out",
    });
    setTimeout(() => {
      document.body.style.overflow = "";
      setPhase("finished");
      onComplete?.();
    }, 380);
  };

  const isCardFormed =
    phase === "forming" || phase === "card_showcase" || phase === "hero_glide";
  const isShuttersOpen = phase === "hero_glide";

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] cursor-pointer select-none overflow-hidden [perspective:1400px]"
    >
      {/* 1. LEFT BLACK SHUTTER: slides smoothly to the left when opening */}
      <div
        className={`absolute inset-y-0 left-0 w-[50.5%] bg-[#0A0608] transition-transform duration-[1400ms] ${
          isShuttersOpen ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.85, 0, 0.15, 1)",
        }}
      />

      {/* 2. RIGHT BLACK SHUTTER: slides smoothly to the right when opening */}
      <div
        className={`absolute inset-y-0 right-0 w-[50.5%] bg-[#0A0608] transition-transform duration-[1400ms] ${
          isShuttersOpen ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.85, 0, 0.15, 1)",
        }}
      />

      {/* 3. CENTER STAGE: Vertical text types, scatters into 3D, condenses to form Gold card, then glides to hero */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        {/* A. SCATTERABLE TEXT STACK */}
        <div
          className={`absolute flex flex-col items-center justify-center text-center py-2 transition-opacity duration-300 ${
            phase === "card_showcase" || phase === "hero_glide"
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }`}
        >
          {WORDS.map((word, i) => {
            const isVisible = i <= lineIndex;
            const isCurrent = i === lineIndex && phase === "typing";
            const currentTyped =
              i < lineIndex ? word : i === lineIndex ? word.slice(0, charIndex) : word;

            // Calculate word transform based on phase
            const offset = SCATTER_OFFSETS[i];
            let wordStyle: React.CSSProperties = {
              transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)",
              opacity: isVisible ? 1 : 0,
              transition: "transform 400ms ease-out, opacity 400ms ease-out",
            };

            if (phase === "scatter") {
              // Word bursts dynamically into 3D space
              wordStyle = {
                transform: `translate3d(${offset.x * scatterFactor}px, ${
                  offset.y * scatterFactor
                }px, ${offset.z}px) rotate(${offset.rot}deg) scale(${offset.scale})`,
                opacity: 0.9,
                transition:
                  "transform 700ms cubic-bezier(0.18, 0.89, 0.32, 1.15), opacity 700ms ease-out",
              };
            } else if (phase === "forming") {
              // Word magnetically accelerates inward to form the card
              wordStyle = {
                transform: "translate3d(0, 0, -160px) rotate(0deg) scale(0.15)",
                opacity: 0,
                transition:
                  "transform 550ms cubic-bezier(0.7, 0, 0.25, 1), opacity 450ms ease-in",
              };
            }

            return (
              <div
                key={word}
                className="flex items-center justify-center py-0.5 sm:py-1 will-change-transform"
                style={wordStyle}
              >
                <span
                  className={`inline-block font-normal tracking-tight leading-[1.08] text-4xl sm:text-5xl md:text-6xl text-white ${
                    phase === "scatter"
                      ? "drop-shadow-[0_0_28px_rgba(245,158,11,0.9)] text-amber-200"
                      : "drop-shadow-[0_2px_14px_rgba(245,158,11,0.3)]"
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

        {/* B. THE AUTHENTIC GOLD METAL MESH CARD SAMPLE: Formed from text, showcased, then glides to hero headline */}
        <div
          ref={cardRef}
          style={{
            ...cardTransform,
            transformOrigin: "center center",
          }}
          className={`relative w-[90vw] max-w-[420px] sm:max-w-[480px] md:max-w-[540px] aspect-[1.58/1] rounded-2xl sm:rounded-3xl overflow-hidden will-change-transform transition-all ${
            phase === "hero_glide"
              ? "" // Controlled by cardTransform
              : phase === "card_showcase"
              ? "opacity-100 scale-100 duration-1000 ease-out shadow-[0_35px_80px_rgba(0,0,0,0.95),0_0_65px_rgba(245,158,11,0.7)] border-2 border-amber-300/90"
              : phase === "forming"
              ? "opacity-95 scale-105 duration-550 ease-out shadow-[0_25px_60px_rgba(245,158,11,0.5)] border border-amber-300"
              : "opacity-0 scale-75 pointer-events-none duration-300"
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
