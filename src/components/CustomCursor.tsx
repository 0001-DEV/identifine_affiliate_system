"use client";

import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOnDarkBg, setIsOnDarkBg] = useState(false);

  // Direct mouse positions (immediate pinpoint)
  const mousePos = useRef({ x: -100, y: -100 });
  // Trailing ring positions (interpolated fluid physics)
  const trailingPos = useRef({ x: -100, y: -100 });
  
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Helper to detect if cursor is currently over a dark background
  const checkDarkBackground = (target: HTMLElement | null): boolean => {
    if (!target) return false;

    // Fast check for known dark sections / attributes
    if (
      target.closest(
        "[data-dark='true'], #clients, footer, .bg-black, .bg-neutral-900, .bg-neutral-950, .bg-\\[\\#121214\\], .bg-\\[\\#070708\\], .bg-\\[\\#09090B\\], .bg-\\[\\#0D0D0E\\]"
      )
    ) {
      return true;
    }

    // Traverse ancestors up to 5 levels to inspect computed background color
    let current: HTMLElement | null = target;
    let depth = 0;
    while (current && depth < 6 && current !== document.documentElement && current !== document.body) {
      const bg = window.getComputedStyle(current).backgroundColor;
      if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
        const match = bg.match(/(\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const r = parseInt(match[1], 10);
          const g = parseInt(match[2], 10);
          const b = parseInt(match[3], 10);
          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
          return luminance < 125;
        }
      }
      current = current.parentElement;
      depth++;
    }

    return false;
  };

  useEffect(() => {
    // Check if pointer is fine (desktop/mouse) and not touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setMounted(true);
    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Immediately translate the precision inner dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check background under cursor
      const target = (e.target as HTMLElement | null) || (document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null);
      if (target) {
        setIsOnDarkBg(checkDarkBackground(target));
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Detect clickable elements dynamically
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("textarea") ||
        target.closest("[role='button']") ||
        target.closest(".cursor-pointer") ||
        target.hasAttribute("data-cursor-hover");

      setIsHovered(!!isInteractive);
      setIsOnDarkBg(checkDarkBackground(target));
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    // 60-120fps physics loop for smooth trailing ring
    const loop = () => {
      const lerp = 0.16; // trailing responsiveness factor
      trailingPos.current.x += (mousePos.current.x - trailingPos.current.x) * lerp;
      trailingPos.current.y += (mousePos.current.y - trailingPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trailingPos.current.x}px, ${trailingPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[999999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 1. Precision Center Dot (Snaps instantly to mouse coordinates, turns Gold on dark bg) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-[4px] -mt-[4px] will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div
          className={`rounded-full transition-all duration-200 ease-out ${
            isHovered
              ? "w-2.5 h-2.5 bg-[#F59E0B] scale-125 shadow-[0_0_12px_rgba(245,158,11,1)]"
              : isClicked
              ? isOnDarkBg
                ? "w-2 h-2 bg-[#FBBF24] scale-75 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                : "w-2 h-2 bg-black scale-75"
              : isOnDarkBg
              ? "w-2 h-2 bg-[#F59E0B] shadow-[0_0_10px_rgba(245,158,11,0.95)]"
              : "w-2 h-2 bg-black"
          }`}
        />
      </div>

      {/* 2. Luxury Trailing Ring (Smooth lag with fluid spring lerp, turns Gold on dark bg) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -ml-[18px] -mt-[18px] will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ease-out flex items-center justify-center ${
            isHovered
              ? "w-12 h-12 -ml-[6px] -mt-[6px] border-[#F59E0B] bg-[#F59E0B]/15 shadow-[0_0_24px_rgba(245,158,11,0.35)] scale-110"
              : isClicked
              ? isOnDarkBg
                ? "w-9 h-9 border-[#FBBF24] bg-[#FBBF24]/20 scale-90 shadow-[0_0_14px_rgba(251,191,36,0.4)]"
                : "w-9 h-9 border-black/80 bg-black/10 scale-90"
              : isOnDarkBg
              ? "w-9 h-9 border-[#F59E0B]/85 bg-[#F59E0B]/10 shadow-[0_0_18px_rgba(245,158,11,0.3)]"
              : "w-9 h-9 border-black/40 bg-transparent"
          }`}
        />
      </div>
    </div>
  );
}
