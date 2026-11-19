import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
}

export function IdentifineLogo({
  variant = "light",
  size = "md",
  showSubtitle = false,
}: LogoProps) {
  const heightClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-14",
  };

  const logoSrc =
    variant === "dark" ? "/identifine_logo_dark.webp" : "/identifine_logo.webp";

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

