import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
}

export function XtremLogo({
  size = "md",
  showSubtitle = false,
}: LogoProps) {
  const heightClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-14",
  };

  return (
    <div className="inline-flex flex-col items-center select-none">
      <img
        src="/xtreme-cardz-logo.png"
        alt="Xtreme Cardz"
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
