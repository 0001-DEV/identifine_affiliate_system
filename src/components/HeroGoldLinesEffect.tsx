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
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-[#0D0D10] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 760"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          {/* 24K Luxury Gold Gradient for Outer Wedge */}
          <linearGradient id="goldWedgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#FBBF24" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#D97706" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#92400E" stopOpacity="0.4" />
          </linearGradient>

          {/* Deep Black-Bronze Gradient for Inner Wedge */}
          <linearGradient id="darkGoldInnerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E160C" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#2A1B0A" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#5B3308" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.7" />
          </linearGradient>

          {/* Golden Horizontal Line Stroke Gradient */}
          <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#FBBF24" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#D97706" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.15" />
          </linearGradient>

          {/* Gold Shimmer Glow Filter */}
          <filter id="goldGlow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
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

        {/* 24 Black & Gold Lines, each animating one by one */}
        {rows.map((i) => {
          const yCenter = i * 31.6 + 15.8;
          // Stagger each line by 0.12s so they move sequentially one by one
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
              {/* Full-width continuous horizontal gold line */}
              <line
                x1="0"
                y1={yCenter}
                x2="1440"
                y2={yCenter}
                stroke="url(#goldLineGrad)"
                strokeWidth="1.5"
                opacity="0.75"
              />

              {/* Outer Tapered Golden Wedge (resembling reference structure) */}
              <polygon
                points={`0,${yCenter - 11} 480,${yCenter} 0,${yCenter + 11}`}
                fill="url(#goldWedgeGrad)"
              />

              {/* Inner Contrast Wedge (Black & Dark Bronze Gold) */}
              <polygon
                points={`0,${yCenter - 7} 370,${yCenter} 0,${yCenter + 7}`}
                fill="url(#darkGoldInnerGrad)"
                stroke="#F59E0B"
                strokeWidth="0.75"
                strokeOpacity="0.6"
              />

              {/* Golden Tip Accent Dot */}
              <circle
                cx="480"
                cy={yCenter}
                r="1.8"
                fill="#FFD700"
                opacity="0.9"
              />
            </g>
          );
        })}
      </svg>

      {/* Subtle radial vignette overlay to blend edges seamlessly */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#121214] to-transparent pointer-events-none" />
    </div>
  );
}
