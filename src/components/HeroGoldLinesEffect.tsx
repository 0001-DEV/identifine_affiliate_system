"use client";

import React from "react";

interface HeroGoldLinesEffectProps {
  rowCount?: number;
  className?: string;
}

export function HeroGoldLinesEffect({
  rowCount = 24,
  className = "",
}: HeroGoldLinesEffectProps) {
  const rows = Array.from({ length: rowCount }, (_, i) => i);

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-[#09090B] ${className}`}
      aria-hidden="true"
    >
      {/* 1. Full-Width Ambient Black & Gold Gradient Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#08080A] via-[#151008] to-[#08080A]" />
      
      {/* 2. Soft Centered Gold Ambient Glow directly behind the centered container */}
      <div className="absolute inset-0 w-full h-full opacity-40 bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,rgba(245,158,11,0.22),transparent)]" />

      {/* 3. Full-Width Kinetic SVG Pattern: 24 Black & Gold Lines spanning edge-to-edge */}
      <svg
        viewBox="0 0 1440 760"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          {/* 24K Luxury Gold Gradient for Full-Width Outer Wedge */}
          <linearGradient id="goldWedgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#FBBF24" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#D97706" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#F59E0B" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#92400E" stopOpacity="0.5" />
          </linearGradient>

          {/* Deep Black-Bronze Gradient for Full-Width Inner Contrast Wedge */}
          <linearGradient id="darkGoldInnerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0A0806" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#1E150A" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#452605" stopOpacity="0.85" />
            <stop offset="90%" stopColor="#92400E" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.65" />
          </linearGradient>

          {/* Golden Horizontal Line Stroke Gradient: Full-width vibrant gold across the entire screen */}
          <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#FBBF24" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#FBBF24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.95" />
          </linearGradient>

          {/* Gold Shimmer Glow Filter */}
          <filter id="goldGlow" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.96
                      0 1 0 0 0.62
                      0 0 1 0 0.04
                      0 0 0 1 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 24 Black & Gold Lines spanning the full width, each moving one by one */}
        {rows.map((i) => {
          const yCenter = i * 31.6 + 15.8;
          // Stagger each line by 0.13s so they move sequentially one by one in a cascading wave
          const delay = (i * 0.13).toFixed(2);

          return (
            <g
              key={i}
              className="animate-gold-line-wave transition-transform"
              style={{
                animationDelay: `${delay}s`,
                transformOrigin: `0px ${yCenter}px`,
              }}
            >
              {/* Full-width continuous horizontal gold line spanning edge-to-edge */}
              <line
                x1="-60"
                y1={yCenter}
                x2="1500"
                y2={yCenter}
                stroke="url(#goldLineGrad)"
                strokeWidth="1.6"
                opacity="0.8"
              />

              {/* Full-width Outer Tapered Golden Wedge: starts at left edge and tapers across entire hero */}
              <polygon
                points={`-60,${yCenter - 11} 1420,${yCenter} -60,${yCenter + 11}`}
                fill="url(#goldWedgeGrad)"
              />

              {/* Full-width Inner Contrast Wedge (Black & Dark Bronze Gold) */}
              <polygon
                points={`-60,${yCenter - 6.5} 1220,${yCenter} -60,${yCenter + 6.5}`}
                fill="url(#darkGoldInnerGrad)"
                stroke="#F59E0B"
                strokeWidth="0.8"
                strokeOpacity="0.7"
              />

              {/* Golden Tip Accent Dot */}
              <circle
                cx="1420"
                cy={yCenter}
                r="2"
                fill="#FFD700"
                opacity="0.95"
              />
            </g>
          );
        })}
      </svg>

      {/* Subtle edge fade at the bottom to blend seamlessly into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#121214] to-transparent pointer-events-none" />
    </div>
  );
}
