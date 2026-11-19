"use client";

import React, { useEffect, useState } from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
}

export function IdentifineLogo({
  variant,
  size = "md",
  showSubtitle = false,
}: LogoProps) {
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const checkTheme = () => {
      const isLight = document.documentElement.classList.contains("light");
      setCurrentTheme(isLight ? "light" : "dark");
    };
    checkTheme();
    window.addEventListener("theme-change", checkTheme);
    return () => window.removeEventListener("theme-change", checkTheme);
  }, []);

  const heightClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-14",
  };

  // If variant not passed, dark mode uses white text (/identifine_logo.webp), light mode uses dark text (/identifine_logo_dark.webp)
  const isDarkTextNeeded = variant ? variant === "dark" : currentTheme === "light";
  const logoSrc = isDarkTextNeeded
    ? "/identifine_logo_dark.webp"
    : "/identifine_logo.webp";

  return (
    <div className="inline-flex flex-col items-center select-none">
      <img
        src={logoSrc}
        alt="Identifine"
        className={`${heightClasses[size]} w-auto object-contain`}
      />
      {showSubtitle && (
        <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400 mt-1">
          Affiliate Partner Network
        </span>
      )}
    </div>
  );
}

export const XtremLogo = IdentifineLogo;


