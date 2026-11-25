"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface ClientData {
  name: string;
  industry: string;
  tier: string;
  logo: string;
  location: string;
  highlight: string;
}

const CLIENTS: ClientData[] = [
  {
    name: "Guinness Nigeria",
    industry: "Multinational Consumer Goods & Beverage",
    tier: "Global Enterprise",
    logo: "/images/clients/logo-guinness-nigeria.webp",
    location: "Lagos, Nigeria",
    highlight: "Executive NFC credentials & VIP brand access suites",
  },
  {
    name: "Seplat Energy",
    industry: "Energy Infrastructure & Exploration",
    tier: "FTSE & NGX Listed",
    logo: "/images/clients/logo-seplat-energy.webp",
    location: "Lagos & London",
    highlight: "High-security operational ID hardware & encrypted field badges",
  },
  {
    name: "Nova Bank",
    industry: "Commercial & Merchant Banking",
    tier: "Tier-1 Financial",
    logo: "/images/clients/logo-nova-bank.webp",
    location: "National Banking",
    highlight: "Cryptographic smart cards & corporate executive ID systems",
  },
  {
    name: "Rainoil Limited",
    industry: "Petroleum & Downstream Logistics",
    tier: "Energy Conglomerate",
    logo: "/images/clients/logo-rainoil.webp",
    location: "Nationwide Logistics",
    highlight: "Automated depot entry passes & biometric RFID fleet credentials",
  },
  {
    name: "Ikeja Electric",
    industry: "Power Utilities & Distribution",
    tier: "Major Power Utility",
    logo: "/images/clients/logo-ikeja-electric.webp",
    location: "Lagos Metropolitan",
    highlight: "Substation smart badges & NFC staff network identification",
  },
  {
    name: "Sapetro Oil",
    industry: "Deepwater Exploration & Production",
    tier: "Offshore Energy",
    logo: "/images/clients/logo-sapetro-oil.webp",
    location: "West African Basin",
    highlight: "Ruggedized offshore RFID cards & executive metal identifiers",
  },
  {
    name: "TVC Communications",
    industry: "National Broadcast & Media Network",
    tier: "Media & Entertainment",
    logo: "/images/clients/logo-tvc-communications.webp",
    location: "Broadcast Headquarters",
    highlight: "Broadcast studio secure NFC access & media pass ecosystem",
  },
  {
    name: "Credit Direct",
    industry: "Consumer Credit & Financial Services",
    tier: "FCMB Group",
    logo: "/images/clients/logo-credit-direct.webp",
    location: "Financial Services",
    highlight: "Digital branch NFC cards & corporate executive smart credentials",
  },
  {
    name: "NECA Nigeria",
    industry: "Employers Consultative Network",
    tier: "National Apex Body",
    logo: "/images/clients/logo-neca-nigeria.webp",
    location: "Consultative Association",
    highlight: "Executive summit badges & digital delegate identity architectures",
  },
  {
    name: "Optiva Capital",
    industry: "Wealth Management & Advisory",
    tier: "Private Wealth",
    logo: "/images/clients/logo-optiva-capital.webp",
    location: "Investment Advisory",
    highlight: "Black matte metal high-net-worth partner identification suites",
  },
  {
    name: "Invera Energy",
    industry: "Renewable & Clean Energy",
    tier: "Clean Tech Group",
    logo: "/images/clients/logo-invera-energy.webp",
    location: "Infrastructure",
    highlight: "Green energy smart passes & solar facility RFID protocols",
  },
  {
    name: "Sterling Capital",
    industry: "Investment Banking & Assets",
    tier: "Asset Management",
    logo: "/images/clients/logo-sterling-capital.webp",
    location: "Capital Markets",
    highlight: "Institutional investor smart cards & encrypted asset credentials",
  },
  {
    name: "Apex Synergy",
    industry: "Corporate Real Estate & Assets",
    tier: "Commercial Development",
    logo: "/images/clients/logo-apex-synergy.webp",
    location: "Prime Properties",
    highlight: "Luxury commercial building access cards & tenant smart passes",
  },
  {
    name: "Falcon Oil",
    industry: "Marine Logistics & Energy",
    tier: "Maritime Operations",
    logo: "/images/clients/logo-falcon-oil.webp",
    location: "Maritime Hub",
    highlight: "Vessel crew NFC badges & terminal logistics identification",
  },
  {
    name: "Horizon Group",
    industry: "Conglomerate & Strategic Assets",
    tier: "Multi-Sector Holding",
    logo: "/images/clients/logo-horizon-group.svg",
    location: "Strategic Holdings",
    highlight: "Enterprise-wide staff identity systems & smart corporate cards",
  },
  {
    name: "IOGC Petroleum",
    industry: "Oilfield Services & Engineering",
    tier: "Upstream Engineering",
    logo: "/images/clients/logo-iogc-petroleum.webp",
    location: "Industrial Engineering",
    highlight: "Rig safety smart credentials & oilfield access management",
  },
];

export default function ClientShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalClients = CLIENTS.length;

  const nextClient = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalClients);
  }, [totalClients]);

  const prevClient = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalClients) % totalClients);
  }, [totalClients]);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying || isHovered || isDragging) return;
    const interval = setInterval(() => {
      nextClient();
    }, 3200);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, isDragging, nextClient]);

  // Touch & Drag Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const currentX = e.touches[0].clientX;
    setDragOffset(currentX - dragStartX);
  };

  const handleTouchEnd = () => {
    if (dragOffset > 50) {
      prevClient();
    } else if (dragOffset < -50) {
      nextClient();
    }
    setDragStartX(null);
    setDragOffset(0);
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX === null) return;
    setDragOffset(e.clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (dragOffset > 60) {
      prevClient();
    } else if (dragOffset < -60) {
      nextClient();
    }
    setDragStartX(null);
    setDragOffset(0);
    setIsDragging(false);
  };

  const activeClient = CLIENTS[activeIndex];

  return (
    <div
      className="relative w-full max-w-full overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (isDragging) handleMouseUp();
      }}
    >
      {/* 3D Perspective Horizon Stage */}
      <div
        className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
        style={{ perspective: isMobile ? "800px" : "1200px" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Soft Ambient Gold Pedestal Spotlight (Center stage) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[480px] h-[220px] sm:h-[280px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.22),transparent_70%)] pointer-events-none blur-2xl z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[320px] h-[160px] sm:h-[200px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_65%)] pointer-events-none blur-xl z-0" />

        {/* 3D Curved Arc Container */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {CLIENTS.map((client, idx) => {
            // Compute cyclic distance from activeIndex: -8 to +7
            let offset = idx - activeIndex;
            if (offset > totalClients / 2) offset -= totalClients;
            if (offset < -totalClients / 2) offset += totalClients;

            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);

            // Hide items beyond visual horizon
            const maxVisible = isMobile ? 2 : 3;
            if (absOffset > maxVisible) return null;

            // 3D positioning metrics
            const spacing = isMobile ? 140 : 250;
            const translateX = offset * spacing + (isDragging ? dragOffset * 0.4 : 0);
            const rotateY = -offset * (isMobile ? 24 : 26);
            const translateZ = isCenter ? 60 : -absOffset * (isMobile ? 80 : 100);
            const scale = isCenter ? 1.18 : Math.max(0.65, 1 - absOffset * 0.16);
            const opacity = isCenter ? 1 : Math.max(0.2, 1 - absOffset * 0.32);
            const zIndex = 30 - absOffset;

            return (
              <div
                key={client.name}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isCenter) setActiveIndex(idx);
                }}
                className={`absolute flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isCenter ? "cursor-default" : "cursor-pointer hover:opacity-90"
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Logo Display Wrapper with Full Color & Contrast Halo */}
                <div
                  className={`relative flex items-center justify-center p-4 sm:p-6 rounded-2xl transition-all duration-500 ${
                    isCenter
                      ? "bg-white/[0.04] backdrop-blur-md border border-amber-500/30 shadow-[0_8px_32px_rgba(245,158,11,0.22)]"
                      : "bg-white/[0.015] border border-white/5"
                  }`}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-12 sm:h-16 md:h-20 w-auto max-w-[160px] sm:max-w-[200px] object-contain transition-all duration-500"
                    style={{
                      filter: isCenter
                        ? "drop-shadow(0 8px 24px rgba(245, 158, 11, 0.5)) drop-shadow(0 2px 12px rgba(255, 255, 255, 0.3))"
                        : "drop-shadow(0 2px 12px rgba(255, 255, 255, 0.22))",
                    }}
                  />
                </div>

                {/* Ground Reflection Accent */}
                {isCenter && (
                  <div className="w-24 sm:w-36 h-2 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent blur-sm mt-3 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Active Brand Spotlight Details Card */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 mt-4 sm:mt-6">
        <div className="relative rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/90 p-5 sm:p-7 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all duration-500">
          {/* Subtle Ambient Border Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 pointer-events-none" />

          {/* Left: Active Brand Identity */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                Verified Partner
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                {activeClient.tier}
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-xs text-neutral-400">
                {activeClient.location}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              {activeClient.name}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 mt-1 font-normal">
              {activeClient.industry}
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-neutral-400 bg-neutral-950/50 px-3 py-1.5 rounded-lg border border-neutral-800/80 w-fit">
              <span className="text-amber-400 font-semibold">Deployment:</span>
              <span className="text-neutral-300">{activeClient.highlight}</span>
            </div>
          </div>

          {/* Right: Interactive Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            {/* Previous Button */}
            <button
              onClick={prevClient}
              aria-label="Previous corporate client"
              className="p-2.5 sm:p-3 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-white border border-neutral-700/80 hover:border-amber-400/50 transition-all duration-300 shadow-md active:scale-95 group"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform group-hover:-translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Play / Pause Toggle Button */}
            <button
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              aria-label={isAutoPlaying ? "Pause rotation" : "Play rotation"}
              className="px-3.5 py-2 sm:py-2.5 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 border border-neutral-700/80 hover:border-amber-400/50 transition-all duration-300 flex items-center gap-1.5 active:scale-95"
            >
              {isAutoPlaying ? (
                <>
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                  <span className="hidden sm:inline">Auto</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="hidden sm:inline">Paused</span>
                </>
              )}
            </button>

            {/* Next Button */}
            <button
              onClick={nextClient}
              aria-label="Next corporate client"
              className="p-2.5 sm:p-3 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-white border border-neutral-700/80 hover:border-amber-400/50 transition-all duration-300 shadow-md active:scale-95 group"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* 16 Micro Navigation Indicator Pills */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-6 overflow-x-auto py-2">
          {CLIENTS.map((client, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={client.name}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Jump to ${client.name}`}
                className={`transition-all duration-400 rounded-full ${
                  isActive
                    ? "w-8 sm:w-10 h-2 bg-gradient-to-r from-amber-500 to-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
                    : "w-2 h-2 bg-neutral-700 hover:bg-neutral-500"
                }`}
                title={client.name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
