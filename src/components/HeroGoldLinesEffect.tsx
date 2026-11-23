"use client";

import React from "react";

interface HeroGoldLinesEffectProps {
  rowCount?: number;
  className?: string;
}

export function HeroGoldLinesEffect({
  rowCount = 26,
  className = "",
}: HeroGoldLinesEffectProps) {
  const rows = Array.from({ length: rowCount }, (_, i) => i);

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-[#09090B] ${className}`}
      aria-hidden="true"
    >
      {/* 1. Full-Width Ambient Luxury Black & Gold Gradient Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#070709] via-[#120E08] to-[#070709]" />
      
      {/* 2. Soft Ambient Radial Gold Glow behind the hero text */}
      <div className="absolute inset-0 w-full h-full opacity-35 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(245,158,11,0.20),transparent)]" />

      {/* 3. Full-Width Kinetic SVG Pattern: Alternating Black & Gold Tapered Wedges & Lines */}
      <svg
        viewBox="0 0 1440 780"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          {/* 24K Luxury Gold Gradient for Primary Tapered Wedges */}
          <linearGradient id="goldWedgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#FDE047" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#D97706" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#92400E" stopOpacity="0.4" />
          </linearGradient>

          {/* Deep Obsidian & Bronze Gradient for Alternating Secondary Wedges */}
          <linearGradient id="darkBronzeWedgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B0907" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#1F160C" stopOpacity="0.95" />
            <stop offset="75%" stopColor="#452709" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.6" />
          </linearGradient>

          {/* Golden Horizontal Line Gradient (Continuous across screen) */}
          <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#FBBF24" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#FBBF24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
          </linearGradient>

          {/* Secondary Champagne Line Gradient */}
          <linearGradient id="champagneLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.75" />
            <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#B45309" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.6" />
          </linearGradient>

          {/* Subtle Glow Filter for the Gold Tips */}
          <filter id="goldGlow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 26 Alternating Black & Gold Lines & Wedges, each moving sequentially one by one */}
        {rows.map((i) => {
          const yCenter = i * 30 + 15;
          const isEven = i % 2 === 0;
          // Stagger each line by 0.12s so they move sequentially one by one in a continuous wave
          const delay = (i * 0.12).toFixed(2);
          // Taper lengths: alternating between ~860px and ~720px like reference
          const taperLength = isEven ? 860 : 720;
          const wedgeHalfHeight = isEven ? 9.5 : 7.5;

          return (
            <g
              key={i}
              className="animate-gold-line-wave will-change-transform"
              style={{
                animationDelay: `${delay}s`,
                transformOrigin: `0px ${yCenter}px`,
              }}
            >
              {/* Full-width continuous horizontal line spanning edge to edge */}
              <line
                x1="-40"
                y1={yCenter}
                x2="1480"
                y2={yCenter}
                stroke={isEven ? "url(#goldLineGrad)" : "url(#champagneLineGrad)"}
                strokeWidth={isEven ? "1.6" : "1.2"}
                opacity={isEven ? "0.85" : "0.65"}
              />

              {/* Tapered Spear / Wedge: starts at left edge and tapers to a sharp needle point */}
              <polygon
                points={`-40,${yCenter - wedgeHalfHeight} ${taperLength},${yCenter} -40,${yCenter + wedgeHalfHeight}`}
                fill={isEven ? "url(#goldWedgeGrad)" : "url(#darkBronzeWedgeGrad)"}
                stroke={isEven ? "#FDE047" : "#F59E0B"}
                strokeWidth={isEven ? "0.6" : "0.9"}
                strokeOpacity={isEven ? "0.5" : "0.75"}
              />

              {/* Inner core accent wedge for high-end luxury dimension */}
              <polygon
                points={`-40,${yCenter - (wedgeHalfHeight * 0.55)} ${taperLength * 0.8},${yCenter} -40,${yCenter + (wedgeHalfHeight * 0.55)}`}
                fill={isEven ? "url(#darkBronzeWedgeGrad)" : "url(#goldWedgeGrad)"}
                opacity="0.8"
              />

              {/* Glowing Diamond / Tip at the end of the taper */}
              <circle
                cx={taperLength}
                cy={yCenter}
                r={isEven ? "2.2" : "1.8"}
                fill={isEven ? "#FFFBEB" : "#FBBF24"}
                filter="url(#goldGlow)"
                opacity="0.95"
              />
            </g>
          );
        })}
      </svg>

      {/* Subtle edge fade at the bottom to blend seamlessly into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#09090B] to-transparent pointer-events-none" />
    </div>
  );
}
