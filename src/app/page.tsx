"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MarketingNav } from "@/components/MarketingNav";
import { MarketingFooter } from "@/components/MarketingFooter";
import { SitePreloader, getHasPlayedInClientSession } from "@/components/SitePreloader";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
  DollarSign,
  Star,
  Users,
  Building2,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(() => getHasPlayedInClientSession());
  const [isHeroHeadlineRevealed, setIsHeroHeadlineRevealed] = useState(() => getHasPlayedInClientSession());

  const handleGlideStart = useCallback(() => {
    setIsHeroHeadlineRevealed(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsHeroHeadlineRevealed(true);
    setIsPreloaderFinished(true);
  }, []);

  useEffect(() => {
    if (isPreloaderFinished) return;
    const fallbackTimer = setTimeout(() => {
      setIsHeroHeadlineRevealed(true);
      setIsPreloaderFinished(true);
    }, 9500);
    return () => clearTimeout(fallbackTimer);
  }, [isPreloaderFinished]);

  // =========================================================================
  // PINNED HORIZONTAL SCROLL FOR HERO SECTION (PARTNER IMAGES MOVE ON SCROLL)
  // =========================================================================
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(1600);

  const updateMaxTranslate = () => {
    if (trackRef.current) {
      const fullWidth = trackRef.current.scrollWidth;
      const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
      setMaxTranslate(Math.max(0, fullWidth - viewportWidth + 120));
    }
  };

  useEffect(() => {
    updateMaxTranslate();
    const t1 = setTimeout(updateMaxTranslate, 300);
    const t2 = setTimeout(updateMaxTranslate, 1000);
    window.addEventListener("resize", updateMaxTranslate);

    let rafId: number | null = null;
    const handleScroll = () => {
      if (!heroSectionRef.current) return;
      const section = heroSectionRef.current;
      const rect = section.getBoundingClientRect();
      // Sticky top offset is 80px (top-20)
      const stickyTop = 80;
      const totalScrollableDistance = section.offsetHeight - (window.innerHeight - stickyTop);
      if (totalScrollableDistance <= 0) return;

      const scrolled = stickyTop - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance));
      setScrollProgress(progress);
    };

    // Keep scroll progress in sync with Lenis smooth-scroll requestAnimationFrame
    const onTick = () => {
      handleScroll();
      rafId = requestAnimationFrame(onTick);
    };
    rafId = requestAnimationFrame(onTick);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateMaxTranslate);
    };
  }, []);

  // 4 Focused Partner Establishment Cards
  const partnerShowcase = [
    {
      id: "office-colleagues",
      role: "Corporate Offices & Coworkers",
      image: "/images/partners/office-colleagues-chatting.jpg",
    },
    {
      id: "executive-boardroom",
      role: "Executive Boardrooms & C-Suite",
      image: "/images/partners/executive-boardroom-meeting.jpg",
    },
    {
      id: "creative-agency",
      role: "Creative Agencies & Studios",
      image: "/images/partners/creative-agency-studio.jpg",
    },
    {
      id: "tech-startups",
      role: "Tech Startups & Teams",
      image: "/images/partners/tech-startup-team.jpg",
    },
  ];

  // Authentic, Full-Color Enterprise Client Roster (Zero monochrome / Zero black-and-white)
  const clientLogosRow1 = [
    {
      name: "Guinness Nigeria",
      industry: "Luxury FMCG & Hospitality",
      logo: "/images/clients/logo-guinness-nigeria.png",
    },
    {
      name: "Seplat Energy",
      industry: "Energy & Infrastructure",
      logo: "/images/clients/logo-seplat-energy.png",
    },
    {
      name: "Nova Bank",
      industry: "Commercial Banking & Treasury",
      logo: "/images/clients/logo-nova-bank.png",
    },
    {
      name: "Rainoil Limited",
      industry: "Petroleum & Downstream Logistics",
      logo: "/images/clients/logo-rainoil.png",
    },
    {
      name: "Ikeja Electric",
      industry: "Power Utilities & Distribution",
      logo: "/images/clients/logo-ikeja-electric.png",
    },
    {
      name: "Sapetro Oil",
      industry: "Deepwater Exploration & Production",
      logo: "/images/clients/logo-sapetro-oil.webp",
    },
    {
      name: "TVC Communications",
      industry: "National Broadcast & Media Network",
      logo: "/images/clients/logo-tvc-communications.png",
    },
    {
      name: "Credit Direct",
      industry: "Consumer Credit & Financial Services",
      logo: "/images/clients/logo-credit-direct.png",
    },
  ];

  const clientLogosRow2 = [
    {
      name: "NECA Nigeria",
      industry: "Employers Consultative Network",
      logo: "/images/clients/logo-neca-nigeria.png",
    },
    {
      name: "Optiva Capital",
      industry: "Wealth Management & Advisory",
      logo: "/images/clients/logo-optiva-capital.webp",
    },
    {
      name: "Invera Energy",
      industry: "Renewable & Clean Energy",
      logo: "/images/clients/logo-invera-energy.png",
    },
    {
      name: "Sterling Capital",
      industry: "Investment Banking & Assets",
      logo: "/images/clients/logo-sterling-capital.webp",
    },
    {
      name: "Apex Synergy",
      industry: "Corporate Real Estate & Assets",
      logo: "/images/clients/logo-apex-synergy.png",
    },
    {
      name: "Falcon Oil",
      industry: "Marine Logistics & Energy",
      logo: "/images/clients/logo-falcon-oil.png",
    },
    {
      name: "Horizon Group",
      industry: "Conglomerate & Strategic Assets",
      logo: "/images/clients/logo-horizon-group.svg",
    },
    {
      name: "IOGC Petroleum",
      industry: "Oilfield Services & Engineering",
      logo: "/images/clients/logo-iogc-petroleum.png",
    },
  ];

  // Showcase Products Extracted from Identifine, Xtreme Cardz & CR8 Websites
  const [activeProductCard, setActiveProductCard] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<"all" | "identifine" | "xtremecardz" | "cr8">("all");

  const showcaseProducts = [
    // --- IDENTIFINE PRODUCTS ---
    {
      id: "identifine-smart-id",
      brand: "identifine",
      brandLabel: "Identifine",
      name: "Smart Identity Systems",
      tag: "NFC Digital Profile",
      image: "/images/products/identifine-smart-id.webp",
      description:
        "NFC-enabled contactless corporate credentials, digital portfolios, and encrypted instant contact sync without requiring an app.",
    },
    {
      id: "identifine-rfid-suite",
      brand: "identifine",
      brandLabel: "Identifine",
      name: "RFID Facility Access Suite",
      tag: "Access Control",
      image: "/images/products/identifine-access-control.webp",
      description:
        "Enterprise encrypted RFID smart credentials for high-security doors, corporate turnstiles, executive elevators, and VIP suites.",
    },
    {
      id: "identifine-corp-id",
      brand: "identifine",
      brandLabel: "Identifine",
      name: "Corporate ID Infrastructure",
      tag: "Staff Identification",
      image: "/images/products/identifine-smart-card-reader.webp",
      description:
        "Multi-site organizational staff identification, badge issuance workflows, and centralized employee security tiering.",
    },
    {
      id: "identifine-vcard",
      brand: "identifine",
      brandLabel: "Identifine",
      name: "Cloud vCard & QR Solutions",
      tag: "Dynamic Cloud QR",
      image: "/images/products/identifine-digital-identity.webp",
      description:
        "Real-time updateable cloud vCards with branded dynamic QR codes and analytics for modern corporate networking teams.",
    },

    // --- XTREME CARDZ PRODUCTS ---
    {
      id: "xtreme-metal-cards",
      brand: "xtremecardz",
      brandLabel: "Xtreme Cardz",
      name: "Black Matte Metal Cards",
      tag: "Metal Matte & Gunmetal",
      image: "/images/products/black-matte-metal.webp",
      description:
        "Premium metal cards crafted in Metal Matte, Gunmetal, and Titanium Steel finishes, made for organizations that demand an unforgettable first impression.",
    },
    {
      id: "xtreme-gold-mirror",
      brand: "xtremecardz",
      brandLabel: "Xtreme Cardz",
      name: "Gold Metal Cards",
      tag: "24K Gold Plated",
      image: "/images/products/gold-metal-mesh.webp",
      description:
        "Ultra-exclusive mirror-finish brass plated in pure 24K gold, precision-etched with sub-millimeter CNC craftsmanship for VIP clientele.",
    },
    {
      id: "xtreme-corporate-id",
      brand: "xtremecardz",
      brandLabel: "Xtreme Cardz",
      name: "Corporate ID Systems",
      tag: "Eggshell & Nubis",
      image: "/images/products/card-corporate-id-system.png",
      description:
        "Reliable, versatile cards in soft Eggshell, Frosted Translux, and textured Nubis finishes designed for executive staff and organizational prestige.",
    },
    {
      id: "xtreme-smart-cards",
      brand: "xtremecardz",
      brandLabel: "Xtreme Cardz",
      name: "Access & Smart Cards",
      tag: "De-Titan 3-in-1",
      image: "/images/products/card-access-smart-nfc.jpg",
      description:
        "Technology-enabled 3-in-1 multifunctional credentials combining ID card, physical access badge, and tap-and-connect NFC smart card.",
    },
    {
      id: "xtreme-membership",
      brand: "xtremecardz",
      brandLabel: "Xtreme Cardz",
      name: "Membership & Special Purpose",
      tag: "VIP Club Suites",
      image: "/images/products/card-membership-special.png",
      description:
        "Distinctive VIP, private club, and luxury hospitality membership cards engineered with custom serialized security chips.",
    },
    {
      id: "xtreme-accessories",
      brand: "xtremecardz",
      brandLabel: "Xtreme Cardz",
      name: "Bespoke Accessories & Holders",
      tag: "Custom Packaging",
      image: "/images/products/card-accessories-lanyard.jpg",
      description:
        "Complete identity systems with aerospace aluminum card holders, braided custom lanyards, and handcrafted presentation boxes.",
    },

    // --- CR8 (XTREME CR8TIVITY) PRODUCTS & SERVICES ---
    {
      id: "cr8-brand-memorability",
      brand: "cr8",
      brandLabel: "CR8",
      name: "Brand Memorability",
      tag: "Identity & Architecture",
      image: "/images/products/cr8-brand-memorability.webp",
      description:
        "Building brands with clarity, character, and distinction. From brand strategy and architecture to visual identity systems and creative direction.",
    },
    {
      id: "cr8-tangible-thinking",
      brand: "cr8",
      brandLabel: "CR8",
      name: "Tangible Thinking",
      tag: "Product & Industrial Design",
      image: "/images/products/cr8-tangible-thinking.webp",
      description:
        "Transforming opportunities and concepts into physical products, industrial objects, custom trophies, and tangible interactive brand experiences.",
    },
    {
      id: "cr8-brand-signatures",
      brand: "cr8",
      brandLabel: "CR8",
      name: "Brand Signatures & Memorabilia",
      tag: "Executive Gifting",
      image: "/images/products/cr8-brand-signatures.webp",
      description:
        "Distinctive physical expressions of brands: corporate executive gifting, commemorative identities, anniversary coin suites, and limited-edition objects.",
    },
    {
      id: "cr8-creative-direction",
      brand: "cr8",
      brandLabel: "CR8",
      name: "Creative Direction & Campaigns",
      tag: "Experiential Design",
      image: "/images/products/cr8-creative-direction.webp",
      description:
        "High-impact multi-channel campaign creative direction, high-fidelity 3D industrial renderings, and memorable physical-meets-digital brand narratives.",
    },
  ];

  const productScrollRef = useRef<HTMLDivElement>(null);
  const scrollProducts = (dir: "left" | "right") => {
    if (productScrollRef.current) {
      const offset = dir === "left" ? -300 : 300;
      productScrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col selection:bg-[#F59E0B] selection:text-black">
      {!isPreloaderFinished && (
        <SitePreloader
          onGlideStart={handleGlideStart}
          onComplete={handlePreloaderComplete}
        />
      )}
      <MarketingNav />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO SECTION: TEXT ONLY (Increased headline height, reduced copy height)
           ========================================================================= */}
        <section id="hero" className="pt-24 sm:pt-32 pb-8 sm:pb-10 px-4 sm:px-6 bg-white">
          <div className="mx-auto max-w-5xl text-center space-y-5 sm:space-y-6">
            <h1
              id="hero-headline"
              className={`text-6xl sm:text-7xl md:text-8xl lg:text-[88px] xl:text-[96px] font-normal tracking-tight leading-[1.05] transition-all duration-1000 ease-out ${
                isHeroHeadlineRevealed
                  ? "opacity-100 scale-100 translate-y-0 text-black drop-shadow-none"
                  : "opacity-0 scale-90 translate-y-2 text-[#F59E0B] drop-shadow-[0_0_35px_rgba(245,158,11,0.9)]"
              }`}
            >
              Turn Your Network Into Recurring Cash
            </h1>

            <p className="text-sm sm:text-base md:text-[17px] text-neutral-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Join our high-earning affiliate program. Refer corporate clients, creative agencies, and luxury establishments to custom metal smart cards and digital identity suites. Earn high-yield recurring commissions on every closed deal with automated referral tracking and instant payouts.
            </p>

            <div className="flex items-center justify-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/portal?tab=register"
                className="rounded-full bg-black hover:bg-neutral-800 text-white px-8 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base font-medium shadow-md hover:scale-105 transition"
              >
                Join Affiliate Program
              </Link>
              <Link
                href="/pricing"
                className="rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-medium transition"
              >
                Affiliate Commission Guide
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            1B. PINNED HORIZONTAL CONTAINER OF PICTURES (MOVES ON SCROLL)
                "people who partner with us" placed directly with the images
           ========================================================================= */}
        <section
          ref={heroSectionRef}
          id="partners-scroll"
          className="relative w-full h-[320vh] bg-white border-b border-neutral-200"
        >
          {/* Sticky Viewport: Pins beneath header as user scrolls, animating cards horizontally */}
          <div className="sticky top-20 h-[calc(100vh-80px)] w-full flex flex-col justify-center overflow-hidden bg-white">
            {/* people who partner with us: CENTER ALIGNED directly attached to images */}
            <div className="w-full text-center px-4 mb-3 sm:mb-4">
              <p className="text-sm sm:text-base text-gray-500 font-medium lowercase">
                people who partner with us
              </p>
            </div>

            <div className="relative w-full overflow-hidden py-1">
              <div
                ref={trackRef}
                className="flex items-start gap-8 sm:gap-10 px-8 sm:px-16 will-change-transform transition-transform duration-75"
                style={{
                  transform: `translateX(-${scrollProgress * maxTranslate}px)`,
                }}
              >
                {partnerShowcase.map((partner) => (
                  <div
                    key={partner.id}
                    className="w-[320px] sm:w-[380px] md:w-[440px] lg:w-[480px] shrink-0 flex flex-col group"
                  >
                    {/* Picture Container: High image height, clean with NO text on image */}
                    <div className="relative h-80 sm:h-96 md:h-[420px] lg:h-[460px] xl:h-[490px] w-full rounded-3xl overflow-hidden bg-neutral-950 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                      <img
                        src={partner.image}
                        alt={partner.role}
                        onLoad={updateMaxTranslate}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Text outside the container: PROMINENT NAME OF WHAT IT REPRESENTS */}
                    <div className="pt-4 pb-1 px-1">
                      <h3 className="font-semibold text-lg sm:text-xl md:text-2xl text-black tracking-tight">
                        {partner.role}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom Animated Scroll Indicator: Obsidian & 24K Gold */}
              <div className="flex flex-col items-center justify-center mt-5 sm:mt-6 gap-2.5 select-none">
                {/* Animated Scroll Device Pill */}
                <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#121214] border border-neutral-800 shadow-[0_4px_16px_rgba(0,0,0,0.18)]">
                  {/* Animated Mouse Capsule with Rolling Gold Wheel */}
                  <div className="relative w-4 h-6 rounded-full border-[1.5px] border-[#F59E0B]/70 flex justify-center pt-1 overflow-hidden shrink-0">
                    <span className="w-1 h-1.5 bg-[#F59E0B] rounded-full animate-scroll-wheel shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  </div>

                  {/* Swipe/Scroll Text with Animated 24K Gold Directional Glide */}
                  <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-medium">
                    <span>scroll to explore</span>
                    <span className="inline-block animate-swipe-glide text-[#F59E0B] font-bold">→</span>
                  </div>
                </div>

                {/* Dynamic Horizontal Progress Bar */}
                <div className="w-36 sm:w-44 h-1 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F59E0B] transition-all duration-75 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                    style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            1C. OUR CLIENTS SECTION (Continuous Kinetic Horizon Stream)
                Positioned directly before Our Products & Services
           ========================================================================= */}
        <section id="clients" data-dark="true" className="py-20 sm:py-24 bg-[#17171A] border-y border-white/10 w-full overflow-hidden relative">
          {/* Subtle Ambient Radial Lighting: Lifts dark logos with soft contrast */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(255,255,255,0.06),transparent_75%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(217,119,6,0.14),transparent_70%)] pointer-events-none" />

          {/* Reduced-width Centered Container */}
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 sm:mb-14 text-center relative z-10">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.05]">
                Clients We Have Worked With
              </h2>
              <p className="text-sm sm:text-base text-white mt-4 font-normal max-w-lg mx-auto leading-relaxed">
                Our encrypted smart credentials and bespoke hardware suites power identification, networking, and access for leading luxury brands, hotel establishments, and corporate enterprises.
              </p>
            </div>

            {/* Continuous Standard Linear Infinite Marquee */}
            <div className="marquee-track relative w-full overflow-hidden select-none rounded-2xl bg-white/[0.02] border border-white/5 py-4">
              {/* Upper Track: Standard Linear Marquee (Glides Left) */}
              <div className="relative w-full overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
                <div className="animate-standard-marquee-left gap-12 sm:gap-16 md:gap-20 flex items-center will-change-transform">
                  {[...clientLogosRow1, ...clientLogosRow1].map((client, idx) => (
                    <div
                      key={`${client.name}-${idx}`}
                      className="relative flex flex-col items-center justify-center shrink-0 group/logo cursor-pointer py-2"
                    >
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="h-10 sm:h-12 md:h-14 max-w-[130px] sm:max-w-[160px] w-auto object-contain drop-shadow-[0_2px_14px_rgba(255,255,255,0.28)] group-hover/logo:scale-110 group-hover/logo:drop-shadow-[0_16px_36px_rgba(245,158,11,0.55)] transition-all duration-300"
                      />
                      {/* Micro Industry Domain Badge */}
                      <span className="opacity-0 group-hover/logo:opacity-100 transition-all duration-300 transform translate-y-1 group-hover/logo:translate-y-0 text-[10px] tracking-wider uppercase font-semibold text-amber-300 bg-neutral-900/90 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-lg border border-neutral-700 mt-2 whitespace-nowrap text-center pointer-events-none">
                        {client.industry}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lower Track: Standard Linear Marquee (Glides Right) */}
              <div className="relative w-full overflow-hidden py-2 mt-1 sm:mt-2 [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
                <div className="animate-standard-marquee-right gap-12 sm:gap-16 md:gap-20 flex items-center will-change-transform">
                  {[...clientLogosRow2, ...clientLogosRow2].map((client, idx) => (
                    <div
                      key={`${client.name}-${idx}`}
                      className="relative flex flex-col items-center justify-center shrink-0 group/logo cursor-pointer py-2"
                    >
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="h-10 sm:h-12 md:h-14 max-w-[130px] sm:max-w-[160px] w-auto object-contain drop-shadow-[0_2px_14px_rgba(255,255,255,0.28)] group-hover/logo:scale-110 group-hover/logo:drop-shadow-[0_16px_36px_rgba(245,158,11,0.55)] transition-all duration-300"
                      />
                      {/* Micro Industry Domain Badge */}
                      <span className="opacity-0 group-hover/logo:opacity-100 transition-all duration-300 transform translate-y-1 group-hover/logo:translate-y-0 text-[10px] tracking-wider uppercase font-semibold text-amber-300 bg-neutral-900/90 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-lg border border-neutral-700 mt-2 whitespace-nowrap text-center pointer-events-none">
                        {client.industry}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. OUR PRODUCTS & SERVICES SECTION
               (Hero typography: font-normal tracking-tight leading-[1.05])
               (Extracted authentic offerings from Identifine, Xtreme Cardz & CR8)
           ========================================================================= */}
        <section id="products" className="py-24 sm:py-32 bg-[#F8F9FA] text-neutral-900 border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header Text Section: Increased height, spacious and grand */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 py-6 sm:py-10 mb-10 sm:mb-14">
              <div>
                <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[90px] font-normal text-black tracking-tight leading-[1.05]">
                  Our Products &amp; Services
                </h2>
                <p className="text-lg sm:text-2xl text-neutral-600 mt-5 font-normal max-w-3xl leading-relaxed">
                  Promote verified hardware credentials, identity architectures, and brand systems engineered across the ecosystem.
                </p>
              </div>

              {/* Option 3: Obsidian & 24K Gold Luxury Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollProducts("left")}
                  aria-label="Scroll left"
                  className="group relative h-12 w-12 rounded-full bg-[#121214] border border-neutral-800 hover:border-[#F59E0B] text-[#F59E0B] hover:text-[#FBBF24] flex items-center justify-center transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_0_24px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                </button>
                <button
                  onClick={() => scrollProducts("right")}
                  aria-label="Scroll right"
                  className="group relative h-12 w-12 rounded-full bg-[#121214] border border-neutral-800 hover:border-[#F59E0B] text-[#F59E0B] hover:text-[#FBBF24] flex items-center justify-center transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_0_24px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Brand Filter Tabs: Shifted 4px from the left */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar pl-[4px]">
              {[
                { id: "all", label: "All Offerings" },
                { id: "identifine", label: "Identifine" },
                { id: "xtremecardz", label: "Xtreme Cardz" },
                { id: "cr8", label: "CR8 (Xtreme Cr8tivity)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedBrand(tab.id as any)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer ${
                    selectedBrand === tab.id
                      ? "bg-black text-white shadow-md scale-105"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50 hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Horizontal Product Track */}
            <div
              ref={productScrollRef}
              className="flex items-stretch overflow-x-auto pb-8 scroll-smooth no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {showcaseProducts
                .filter((p) => selectedBrand === "all" || p.brand === selectedBrand)
                .map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => setActiveProductCard(activeProductCard === prod.id ? null : prod.id)}
                    className="w-[300px] sm:w-[380px] md:w-[420px] shrink-0 bg-transparent flex flex-col group cursor-pointer m-[16px]"
                  >
                    {/* Container: image inside */}
                    <div className="relative h-80 sm:h-96 md:h-[420px] w-full bg-neutral-950 overflow-hidden rounded-2xl shadow-md">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Hover / Click Overlay: Changes to white background with description */}
                      <div
                        className={`absolute inset-0 bg-white p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 z-20 ${
                          activeProductCard === prod.id
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                        }`}
                      >
                        <div className="space-y-4">
                          <div className="inline-block rounded-full bg-amber-50 px-3.5 py-1 text-xs sm:text-sm font-bold text-amber-800">
                            {prod.brandLabel} — {prod.tag}
                          </div>

                          <h3 className="font-black text-2xl sm:text-3xl lg:text-4xl text-neutral-950 leading-tight">
                            {prod.name}
                          </h3>

                          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-medium">
                            {prod.description}
                          </p>
                        </div>

                        <div className="pt-6 border-t border-neutral-200 flex items-center justify-between">
                          <span className="font-mono font-bold text-sm sm:text-base text-neutral-500">
                            7.5% Commission
                          </span>
                          <Link
                            href={`/portal?tab=register&product=${prod.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-full bg-black text-white hover:bg-neutral-800 px-6 py-2.5 text-xs sm:text-sm font-extrabold transition shadow-md"
                          >
                            Refer Offering
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Name & Brand under image */}
                    <div className="pt-4 pb-2 px-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                          {prod.brandLabel}
                        </span>
                        <span className="text-xs font-semibold text-neutral-400">• {prod.tag}</span>
                      </div>
                      <h3 className="font-bold text-xl sm:text-2xl text-neutral-900 tracking-tight">
                        {prod.name}
                      </h3>
                      <p className="text-sm font-bold text-neutral-500 mt-1">
                        7.5% Cash Commission
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. HOW IT WORKS SECTION
           ========================================================================= */}
        <section id="how-it-works" data-dark="true" className="py-24 sm:py-32 bg-[#17171A] text-white border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16 sm:mb-20">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[1.05]">
                How It Works
              </h2>
              <p className="text-base sm:text-xl text-white font-normal">
                Join. Refer. Earn. It&apos;s that simple!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { step: "1", title: "Register", desc: "Create your free affiliate account in seconds" },
                { step: "2", title: "Get Your Link", desc: "Receive unique tracking link & custom promo code" },
                { step: "3", title: "Refer Business", desc: "Share with companies, executives & contacts" },
                { step: "4", title: "Earn Commission", desc: "Earn 7.5% flat cash on every card purchase" },
                { step: "5", title: "Withdraw", desc: "Instant automated Paystack bank transfers" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 text-center space-y-4 hover:border-[#F59E0B]/50 transition group flex flex-col justify-between"
                >
                  <div className="h-12 w-12 rounded-full bg-[#F59E0B] text-white font-black text-base flex items-center justify-center mx-auto shadow-md">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">{item.title}</h3>
                    <p className="text-xs text-white/90 leading-relaxed mt-2">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. YOUR EARNINGS AT A GLANCE
           ========================================================================= */}
        <section id="earnings" className="py-24 sm:py-32 bg-[#F8F9FA] text-neutral-900 border-b border-neutral-300/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="rounded-3xl border border-neutral-300/80 bg-white p-10 sm:p-16 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative flex items-center justify-center">
                <img
                  src="/images/products/earnings-bar-chart.png"
                  alt="7.5% Commission Chart"
                  className="max-h-[280px] w-auto object-contain drop-shadow-2xl"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-black tracking-tight leading-[1.05]">
                  Your Earnings at a Glance
                </h2>
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                  Earn 7.5% commission on qualifying sales, with a minimum withdrawal of ₦50,000 paid instantly via Paystack.
                </p>
                <div className="pt-2">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black px-8 py-4 text-sm font-extrabold transition shadow-md hover:scale-[1.02]"
                  >
                    <span>View Detailed Breakdown</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. READY TO START EARNING (CTA BANNER)
           ========================================================================= */}
        <section data-dark="true" className="bg-[#17171A] py-20 px-4 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-3xl bg-neutral-900 border border-white/10 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
              <div className="space-y-3 text-white">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-[1.05]">
                  Ready to Start Earning?
                </h2>
                <p className="text-sm sm:text-base text-white/90 font-normal">
                  Join the Identifine &amp; Xtreme Cardz Affiliate Programme today!
                </p>
              </div>

              <Link
                href="/portal?tab=register"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-white px-9 py-4 text-sm font-bold shadow-xl transition hover:scale-105"
              >
                <span>Become an Affiliate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
