"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { MarketingFooter } from "@/components/MarketingFooter";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  TrendingUp,
  Clock,
  CheckCircle2,
  Share2,
  Users,
  Smartphone,
  Award,
  Zap,
  Building2,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Layers,
  HelpCircle,
  Briefcase,
  DollarSign,
  QrCode,
  Wifi,
  ExternalLink,
  Lock,
  Mail,
  Phone,
  Globe,
} from "lucide-react";

export default function MarketingHomePage() {
  // Hero Carousel Slides (Images from Xtreme Cardz & Identifine)
  const heroSlides = [
    {
      id: "gold-metal",
      tag: "VIP 24K BRUSHED GOLD METAL",
      badgeColor: "bg-amber-400 text-black border-amber-300",
      title: "Turn Corporate Introductions into 10% Cash Commission",
      description:
        "Partner with Nigeria's premier producer of luxury laser-engraved 24K gold, rose gold, and stainless steel smart business cards. Earn a flat 10% cash payout on every paid client invoice.",
      image: "/images/products/gold-mirror-metal.webp",
      highlight: "Earn ₦18,000 to ₦120,000+ per referred client",
      ctaText: "Become an Affiliate Partner",
      ctaLink: "/portal?tab=register",
      secondaryText: "Earnings & Package Breakdown",
      secondaryLink: "/pricing",
    },
    {
      id: "black-matte",
      tag: "BLACK MATTE STEALTH METAL NFC",
      badgeColor: "bg-neutral-800 text-white border-neutral-600",
      title: "Black Matte Metal NFC Cards for CEOs & Directors",
      description:
        "Aerospace-grade stainless steel with luxury matte stealth coating. One contactless tap against any smartphone instantly shares contact details, WhatsApp, and company catalog without any app.",
      image: "/images/products/black-matte-metal.webp",
      highlight: "Instant Tap • Zero Mobile App Required",
      ctaText: "Become an Affiliate Partner",
      ctaLink: "/portal?tab=register",
      secondaryText: "View Card Specifications",
      secondaryLink: "/pricing",
    },
    {
      id: "corporate-pack",
      tag: "CORPORATE ENTERPRISE 100-PACK",
      badgeColor: "bg-emerald-600 text-white border-emerald-400",
      title: "Full Enterprise Team Identity Rollout & Cloud Portal",
      description:
        "Equip entire sales teams, directors, and field executives with centralized administrative control, real-time title updates, lead capture, and priority nationwide courier delivery.",
      image: "/images/products/corporate-id-system.webp",
      highlight: "₦65,000 cash commission on every 100-unit rollout",
      ctaText: "Register as an Affiliate",
      ctaLink: "/portal?tab=register",
      secondaryText: "Calculate Your Payouts",
      secondaryLink: "#calculator",
    },
    {
      id: "luxury-unboxing",
      tag: "BESPOKE VIP PRESENTATION SUITES",
      badgeColor: "bg-purple-600 text-white border-purple-400",
      title: "Unrivaled First Impressions for High-Net-Worth Clients",
      description:
        "Each VIP card is delivered in handcrafted magnetic presentation cases with individual molded velvet interior. Unmatched prestige that clients proudly show colleagues.",
      image: "/images/products/luxury-unboxing.webp",
      highlight: "₦50,000 minimum withdrawal paid to all Nigerian banks",
      ctaText: "Join Our Affiliate Network",
      ctaLink: "/portal?tab=register",
      secondaryText: "Frequently Asked Questions",
      secondaryLink: "/faq",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play timer matching okomuoil.com (5.5s per slide)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Tap simulation state
  const [hasTapped, setHasTapped] = useState(false);

  // Interactive Earnings Calculator State
  const [executivePacks, setExecutivePacks] = useState(1); // 250k each -> 25k comm
  const [enterprisePacks, setEnterprisePacks] = useState(1); // 650k each -> 65k comm
  const [metalSuites, setMetalSuites] = useState(1); // 180k each -> 18k comm

  const totalOrderValue =
    executivePacks * 250000 + enterprisePacks * 650000 + metalSuites * 180000;
  const affiliateCommission = Math.round(totalOrderValue * 0.1);

  const triggerTapSimulation = () => {
    setHasTapped(true);
    setTimeout(() => setHasTapped(false), 4500);
  };

  const activeSlideData = heroSlides[currentSlide];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-white selection:text-black transition-colors duration-200">
      <MarketingNav />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO SECTION: FULL-WIDTH CARDS CAROUSEL (OKOMUOIL.COM STYLE ANIMATION)
           ========================================================================= */}
        <section
          className="relative min-h-[640px] md:min-h-[720px] lg:min-h-[780px] w-full overflow-hidden bg-black flex items-center justify-center border-b border-white/10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Background Images Carousel with Ken Burns Zoom & Smooth Fade */}
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Product Background Image with Ken Burns Scale */}
              <div
                className={`w-full h-full bg-cover bg-center ${
                  index === currentSlide ? "animate-ken-burns" : ""
                }`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Deep Cinematic Contrast Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/60 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70 z-10" />
            </div>
          ))}

          {/* Foreground Slide Content Container */}
          <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-28 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Slide Text Content (Animated Slide Up on Change) */}
              <div
                key={currentSlide}
                className="lg:col-span-8 space-y-6 text-center lg:text-left animate-slide-up"
              >
                {/* Category Pill Tag */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{activeSlideData.tag}</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] drop-shadow-md">
                  {activeSlideData.title}
                </h1>

                {/* Description Paragraph */}
                <p className="text-sm sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow">
                  {activeSlideData.description}
                </p>

                {/* Affiliate Earning Highlight Pill */}
                <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-xs font-mono font-bold text-emerald-400">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>{activeSlideData.highlight}</span>
                </div>

                {/* CTA Buttons: High-Contrast White Button with Black Text */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link
                    href={activeSlideData.ctaLink}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-extrabold text-black hover:bg-neutral-200 transition shadow-2xl hover:scale-[1.02] active:scale-[0.98] group"
                  >
                    <span>{activeSlideData.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={activeSlideData.secondaryLink}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-black/60 backdrop-blur-md px-6 py-4 text-sm font-bold text-white hover:bg-white/10 hover:border-white transition shadow-sm"
                  >
                    <span>{activeSlideData.secondaryText}</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Active Card Real Photo Showcase & Tap Simulator */}
              <div className="lg:col-span-4 flex flex-col items-center">
                <div
                  onClick={triggerTapSimulation}
                  className="cursor-pointer group relative w-full max-w-sm rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-neutral-950 p-4 transition-all duration-300 hover:border-white/50 hover:scale-[1.02]"
                >
                  <div className="h-56 sm:h-64 w-full rounded-2xl overflow-hidden relative bg-neutral-900">
                    <img
                      src={activeSlideData.image}
                      alt={activeSlideData.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1 text-[11px] font-mono font-bold text-white">
                        {activeSlideData.tag}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                      <div className="flex items-center justify-between w-full text-xs font-mono">
                        <span className="text-neutral-300">NFC TAP • QR READY</span>
                        <span className="text-amber-400 font-bold underline flex items-center gap-1">
                          {hasTapped ? "✓ Card Tapped" : "Click to Test Tap →"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pulsating NFC Radio Waves when tapped */}
                  {hasTapped && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                      <div className="w-48 h-48 rounded-full border-2 border-emerald-400 animate-nfc-wave" />
                    </div>
                  )}

                  {/* Mini Contact Handshake Preview */}
                  <div
                    className={`mt-3 rounded-xl border p-3 text-left transition-all duration-300 ${
                      hasTapped
                        ? "border-emerald-500 bg-neutral-900 ring-2 ring-emerald-500/30"
                        : "border-white/10 bg-neutral-900/60"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                        {hasTapped ? "⚡ Instant Profile Connected" : "Smartphone Handshake"}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        NO APP NEEDED
                      </span>
                    </div>
                    <div className="pt-2 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">Chidi Nwosu</div>
                        <div className="text-[11px] text-neutral-400 font-mono">Managing Director</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="rounded-lg bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white">
                          Save Contact
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows (Left & Right) */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-black/60 border border-white/20 text-white hover:bg-white hover:text-black flex items-center justify-center transition shadow-2xl backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-black/60 border border-white/20 text-white hover:bg-white hover:text-black flex items-center justify-center transition shadow-2xl backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bottom Thumbnails & Progress Bar Navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
            {/* Dots / Indicators */}
            <div className="flex items-center gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? "w-8 bg-white shadow"
                      : "w-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            {/* Mini Card Thumbnails for Direct Click */}
            <div className="hidden sm:flex items-center gap-2 p-1 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10">
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`relative h-11 w-16 rounded-xl overflow-hidden border transition-all duration-200 ${
                    idx === currentSlide
                      ? "border-white ring-2 ring-white/50 scale-105"
                      : "border-white/20 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.tag}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Core Trust Indicators Below Hero */}
        <section className="py-6 border-b border-white/10 bg-neutral-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xl font-black text-white">10% Flat Cash</div>
                  <div className="text-xs text-neutral-400">Paid immediately upon client invoice settlement</div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                  <CreditCard className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-xl font-black text-white">₦50,000 Threshold</div>
                  <div className="text-xs text-neutral-400">Instant withdrawal request from your dashboard</div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                  <Clock className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <div className="text-xl font-black text-white">3 Hours Payout</div>
                  <div className="text-xs text-neutral-400">Direct credit to all Nigerian commercial banks</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CLIENT TRUST STRIP (COMPANIES & EXECUTIVES USING OUR CARDS)
           ========================================================================= */}
        <section className="py-12 border-b border-amber-500/20 bg-gradient-to-r from-[#0C0A06] via-[#100D08] to-[#0A090D] relative overflow-hidden">
          <div className="absolute inset-0 bg-executive-grid opacity-20 pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-6 relative z-10">
            <div className="flex items-center justify-center gap-2">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/40" />
              <p className="text-center text-xs font-mono font-bold tracking-widest text-amber-300 uppercase">
                Trusted by Executives & Teams at Nigeria&apos;s Leading Enterprises
              </p>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/40" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 items-center justify-items-center">
              <div className="w-full h-14 rounded-2xl border border-amber-500/20 bg-white/[0.04] backdrop-blur-md p-2 flex items-center justify-center hover:border-amber-400/50 hover:bg-amber-500/10 transition-all hover:scale-105 shadow-sm">
                <img src="/images/clients/seplat-energy.webp" alt="Seplat Energy" className="max-h-8 max-w-[100px] object-contain" />
              </div>
              <div className="w-full h-14 rounded-2xl border border-amber-500/20 bg-white/[0.04] backdrop-blur-md p-2 flex items-center justify-center hover:border-amber-400/50 hover:bg-amber-500/10 transition-all hover:scale-105 shadow-sm">
                <img src="/images/clients/guinness-nigeria.webp" alt="Guinness Nigeria" className="max-h-8 max-w-[100px] object-contain" />
              </div>
              <div className="w-full h-14 rounded-2xl border border-amber-500/20 bg-white/[0.04] backdrop-blur-md p-2 flex items-center justify-center hover:border-amber-400/50 hover:bg-amber-500/10 transition-all hover:scale-105 shadow-sm">
                <img src="/images/clients/rainoil.webp" alt="Rainoil" className="max-h-8 max-w-[100px] object-contain" />
              </div>
              <div className="w-full h-14 rounded-2xl border border-amber-500/20 bg-white/[0.04] backdrop-blur-md p-2 flex items-center justify-center hover:border-amber-400/50 hover:bg-amber-500/10 transition-all hover:scale-105 shadow-sm">
                <img src="/images/clients/sapetro-oil.webp" alt="Sapetro Oil" className="max-h-8 max-w-[100px] object-contain" />
              </div>
              <div className="w-full h-14 rounded-2xl border border-amber-500/20 bg-white/[0.04] backdrop-blur-md p-2 flex items-center justify-center hover:border-amber-400/50 hover:bg-amber-500/10 transition-all hover:scale-105 shadow-sm">
                <img src="/images/clients/ikeja-electric.webp" alt="Ikeja Electric" className="max-h-8 max-w-[100px] object-contain" />
              </div>
              <div className="w-full h-14 rounded-2xl border border-amber-500/20 bg-white/[0.04] backdrop-blur-md p-2 flex items-center justify-center hover:border-amber-400/50 hover:bg-amber-500/10 transition-all hover:scale-105 shadow-sm">
                <img src="/images/clients/nova-bank.webp" alt="Nova Bank" className="max-h-8 max-w-[100px] object-contain" />
              </div>
              <div className="w-full h-14 rounded-2xl border border-amber-500/20 bg-white/[0.04] backdrop-blur-md p-2 flex items-center justify-center hover:border-amber-400/50 hover:bg-amber-500/10 transition-all hover:scale-105 shadow-sm">
                <img src="/images/clients/tvc-communications.webp" alt="TVC Communications" className="max-h-8 max-w-[100px] object-contain" />
              </div>
              <div className="w-full h-14 rounded-2xl border border-amber-500/20 bg-white/[0.04] backdrop-blur-md p-2 flex items-center justify-center hover:border-amber-400/50 hover:bg-amber-500/10 transition-all hover:scale-105 shadow-sm">
                <img src="/images/clients/neca-nigeria.webp" alt="NECA Nigeria" className="max-h-8 max-w-[100px] object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE EARNINGS SIMULATOR
           ========================================================================= */}
        <section className="py-16 md:py-24 border-b border-white/10 bg-[#09090D] relative">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400">
                <Calculator className="w-3.5 h-3.5" />
                <span>Affiliate Earnings Simulator</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Calculate Exactly How Much You Can Earn
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                Move the sliders to project your monthly 10% commission when organizations in your network order.
              </p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-[#121216] p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Executive Team NFC Pack */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">
                      Executive Team NFC Packs (₦250k each)
                    </span>
                    <span className="font-mono text-amber-400 font-bold">
                      {executivePacks} Referral{executivePacks > 1 ? "s" : ""} (₦{(executivePacks * 25000).toLocaleString()} comm.)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={executivePacks}
                    onChange={(e) => setExecutivePacks(Number(e.target.value))}
                    className="w-full accent-amber-400 bg-neutral-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                    <span>0</span>
                    <span>5</span>
                    <span>10 orders</span>
                  </div>
                </div>

                {/* 2. Corporate Enterprise Identity Pack */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">
                      Corporate Enterprise Packs (₦650k each)
                    </span>
                    <span className="font-mono text-amber-400 font-bold">
                      {enterprisePacks} Referral{enterprisePacks > 1 ? "s" : ""} (₦{(enterprisePacks * 65000).toLocaleString()} comm.)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={enterprisePacks}
                    onChange={(e) => setEnterprisePacks(Number(e.target.value))}
                    className="w-full accent-amber-400 bg-neutral-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                    <span>0</span>
                    <span>5</span>
                    <span>10 orders</span>
                  </div>
                </div>

                {/* 3. VIP Custom Metal Suites */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">
                      VIP Custom Metal Suites (₦180k each)
                    </span>
                    <span className="font-mono text-amber-400 font-bold">
                      {metalSuites} Referral{metalSuites > 1 ? "s" : ""} (₦{(metalSuites * 18000).toLocaleString()} comm.)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={metalSuites}
                    onChange={(e) => setMetalSuites(Number(e.target.value))}
                    className="w-full accent-amber-400 bg-neutral-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                    <span>0</span>
                    <span>5</span>
                    <span>10 orders</span>
                  </div>
                </div>
              </div>

              {/* Total Summary Output */}
              <div className="lg:col-span-5 rounded-3xl border border-amber-400/50 bg-gradient-to-b from-amber-500/20 via-amber-950/20 to-[#0F0E14] p-6 sm:p-8 text-center space-y-5 shadow-2xl shadow-amber-500/15">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                  <span>Estimated Cash You Take Home</span>
                </div>
                <div className="text-4xl sm:text-5xl font-black text-amber-300 tracking-tight drop-shadow-sm">
                  ₦{affiliateCommission.toLocaleString()}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Earned from <strong className="text-white">₦{totalOrderValue.toLocaleString()}</strong> in gross client billing.
                </p>

                <div className="pt-2">
                  <Link
                    href="/portal?tab=register"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 px-5 py-3.5 text-xs font-black text-neutral-950 hover:brightness-110 transition shadow-lg shadow-amber-500/30 hover:scale-[1.02]"
                  >
                    <span>Start Earning This Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="text-[11px] text-amber-200/70 font-mono pt-1">
                  Paid within 3 working hours into any Nigerian Bank account upon withdrawal.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. PRODUCT SHOWCASE (WHAT YOU ARE PROMOTING)
           ========================================================================= */}
        <section id="products" className="py-20 md:py-28 border-b border-white/10 bg-[#070708]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-14">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-neutral-300">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                <span>High-Value Products & Corporate Solutions</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Why Companies & Executives Spend Millions on Our Cards
              </h2>
              <p className="text-xs sm:text-base text-neutral-400 leading-relaxed">
                When you share your affiliate link or referral code, you are introducing clients to Nigeria&apos;s most sought-after corporate technology and physical luxury identity products.
              </p>
            </div>

            {/* 4 Feature Cards with Distinct Color-Coded Themes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Product 1: Black Matte Metal NFC */}
              <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-[#111116] to-[#0A0A0D] overflow-hidden flex flex-col justify-between hover:border-amber-400/60 transition hover:-translate-y-1.5 duration-300 group shadow-xl">
                <div className="h-44 w-full bg-neutral-900 overflow-hidden relative">
                  <img
                    src="/images/products/black-matte-metal.webp"
                    alt="Black Matte Metal NFC Card"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-black/80 backdrop-blur-md border border-amber-400/50 px-2.5 py-1 text-[10px] font-mono font-bold text-amber-300">
                      VIP METAL
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-white">
                        Black Matte Metal NFC
                      </h3>
                      <p className="text-xs text-amber-400 font-mono font-bold">
                        Starting ₦180,000 / Suite
                      </p>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Precision laser-engraved stainless steel cards finished with luxury brushed matte coating and gold foil elements for CEOs, partners, and business owners.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-amber-500/20 text-[11px] text-emerald-400 font-mono font-bold">
                    Affiliate Cut: ₦18,000 per order
                  </div>
                </div>
              </div>

              {/* Product 2: Gunmetal Titanium Smart Card */}
              <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 via-[#111116] to-[#0A0A0D] overflow-hidden flex flex-col justify-between hover:border-indigo-400/60 transition hover:-translate-y-1.5 duration-300 group shadow-xl">
                <div className="h-44 w-full bg-neutral-900 overflow-hidden relative">
                  <img
                    src="/images/products/gunmetal-titanium.webp"
                    alt="Gunmetal Titanium Smart Card"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-black/80 backdrop-blur-md border border-indigo-400/50 px-2.5 py-1 text-[10px] font-mono font-bold text-indigo-300">
                      GUNMETAL TITANIUM
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-white">
                        Gunmetal Titanium Smart NFC
                      </h3>
                      <p className="text-xs text-indigo-300 font-mono font-bold">
                        Aerospace-Grade Alloy
                      </p>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Ultra-durable, scratch-resistant titanium cards with precision laser-etched insignia and contactless NFC chip integration for top-tier executives.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-indigo-500/20 text-[11px] text-emerald-400 font-mono font-bold">
                    Affiliate Cut: ₦22,000 per order
                  </div>
                </div>
              </div>

              {/* Product 3: Corporate Enterprise 100-Pack */}
              <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 via-[#111116] to-[#0A0A0D] overflow-hidden flex flex-col justify-between hover:border-emerald-400/60 transition hover:-translate-y-1.5 duration-300 group shadow-xl">
                <div className="h-44 w-full bg-neutral-900 overflow-hidden relative">
                  <img
                    src="/images/products/corporate-id-system.webp"
                    alt="Corporate Enterprise Identity Pack"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-black/80 backdrop-blur-md border border-emerald-400/50 px-2.5 py-1 text-[10px] font-mono font-bold text-emerald-300">
                      ENTERPRISE 100
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-white">
                        Corporate Enterprise Pack
                      </h3>
                      <p className="text-xs text-emerald-300 font-mono font-bold">
                        ₦650,000 / 100 Units
                      </p>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Full company rollout with centralized administrative dashboard to manage all team member contact profiles, update titles, and track sales team networking.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-400 font-mono font-bold">
                    Affiliate Cut: ₦65,000 cash in bank
                  </div>
                </div>
              </div>

              {/* Product 4: Luxury Presentation & VIP Suite */}
              <div className="rounded-3xl border border-yellow-500/40 bg-gradient-to-b from-yellow-500/15 via-[#111116] to-[#0A0A0D] overflow-hidden flex flex-col justify-between hover:border-amber-300/80 transition hover:-translate-y-1.5 duration-300 group shadow-xl shadow-amber-500/5">
                <div className="h-44 w-full bg-neutral-900 overflow-hidden relative">
                  <img
                    src="/images/products/gold-mirror-metal.webp"
                    alt="24K Gold & VIP Unboxing"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-black/80 backdrop-blur-md border border-amber-300/60 px-2.5 py-1 text-[10px] font-mono font-bold text-amber-300">
                      24K GOLD VIP
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-white">
                        24K Gold & Luxury Unboxing
                      </h3>
                      <p className="text-xs text-amber-300 font-mono font-bold">
                        Starting ₦250,000
                      </p>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Mirror-finish 24K gold cards packaged in handcrafted magnetic presentation cases with individual velvet interior. Unmatched prestige for high-net-worth clients.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-amber-500/20 text-[11px] text-emerald-400 font-mono font-bold">
                    Affiliate Cut: ₦25,000+ per suite
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. HOW IT WORKS (3 SIMPLE STEPS)
           ========================================================================= */}
        <section id="how-it-works" className="py-20 md:py-28 border-b border-white/10 bg-[#09090D]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-16">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
                <Zap className="w-3.5 h-3.5" />
                <span>Simple 3-Step Earning Mechanism</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                How You Make Money as an Affiliate
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                No complex paperwork. Everything is transparent, real-time, and tracked by software.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="rounded-3xl border border-amber-500/25 bg-gradient-to-b from-amber-500/10 via-[#121217] to-[#0A0A0D] p-8 space-y-5 relative hover:border-amber-400/50 transition shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-black font-black text-lg shadow-lg shadow-amber-500/30 border border-amber-300">
                    1
                  </span>
                  <span className="text-[11px] font-mono uppercase text-amber-300 font-bold">
                    Takes 30 Seconds
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">
                    Sign Up & Get Your Code
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Create your free account. You instantly get your personal referral code (e.g. <code className="text-amber-300 font-mono bg-black px-1.5 py-0.5 rounded border border-amber-500/30">LOVEOLAO-114</code>) and shareable referral link (<code className="text-white font-mono bg-black px-1.5 py-0.5 rounded border border-white/20">/r/your-code</code>).
                  </p>
                </div>
                <div className="pt-2 text-xs text-emerald-400 font-medium">
                  ✓ Free forever • Instant activation
                </div>
              </div>

              {/* Step 2 */}
              <div className="rounded-3xl border border-sky-500/25 bg-gradient-to-b from-sky-500/10 via-[#121217] to-[#0A0A0D] p-8 space-y-5 relative hover:border-sky-400/50 transition shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white font-black text-lg shadow-lg shadow-sky-500/30 border border-sky-300">
                    2
                  </span>
                  <span className="text-[11px] font-mono uppercase text-sky-300 font-bold">
                    Share Code or Link
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">
                    Introduce Businesses & Clients
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    When you speak with colleagues, corporate executives, realtors, or business owners, give them your code or link. When they click or enter your code, our system locks them under your account and opens WhatsApp to consult with our sales desk.
                  </p>
                </div>
                <div className="pt-2 text-xs text-amber-300 font-medium">
                  ✓ Our WhatsApp team closes the sale for you
                </div>
              </div>

              {/* Step 3 */}
              <div className="rounded-3xl border border-emerald-500/25 bg-gradient-to-b from-emerald-500/10 via-[#121217] to-[#0A0A0D] p-8 space-y-5 relative hover:border-emerald-400/50 transition shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white font-black text-lg shadow-lg shadow-emerald-500/30 border border-emerald-300">
                    3
                  </span>
                  <span className="text-[11px] font-mono uppercase text-emerald-300 font-bold">
                    Direct Bank Credit
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">
                    Get 10% Cash Commission
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    When the client pays for their cards, 10% is immediately credited to your live dashboard wallet. Request a withdrawal anytime once you have ₦50,000—credited within 3 working hours into your Nigerian bank.
                  </p>
                </div>
                <div className="pt-2 text-xs text-emerald-400 font-medium">
                  ✓ Paid to GTB, Zenith, Access, Kuda, Moniepoint, etc.
                </div>
              </div>
            </div>

            {/* Middle Action Bar */}
            <div className="text-center">
              <Link
                href="/portal?tab=register"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 px-8 py-4 text-sm font-black text-neutral-950 hover:brightness-110 transition shadow-xl shadow-amber-500/25 hover:scale-[1.02] border border-amber-200/60"
              >
                <span>Get Your Referral Code Now (Free)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. FINAL CALL TO ACTION
           ========================================================================= */}
        <section className="py-20 md:py-28 bg-gradient-to-t from-[#141008] via-[#0E0C14] to-[#07070A] text-center border-t border-amber-500/20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8 relative z-10">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-amber-500/25 to-yellow-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 mx-auto shadow-lg shadow-amber-500/20 animate-bounce">
              <Sparkles className="w-7 h-7 text-amber-400 fill-amber-400" />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Start Earning 10% on Every Corporate Card Introduction
              </h2>
              <p className="text-xs sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
                Join our network of professionals, corporate executives, and consultants across Nigeria. Free registration takes less than 30 seconds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/portal?tab=register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 px-8 py-4 text-sm font-black text-neutral-950 hover:brightness-110 transition shadow-[0_0_35px_rgba(245,158,11,0.35)] hover:scale-[1.02] border border-amber-200/80"
              >
                <span>Create Your Free Affiliate Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-amber-400/40 bg-neutral-900/90 px-6 py-4 text-sm font-bold text-amber-200 hover:bg-amber-500/15 transition shadow-sm"
              >
                <span>Review Commission Table</span>
              </Link>
            </div>

            <div className="pt-4 flex flex-wrap justify-center items-center gap-6 text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free Signup
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> ₦50k Threshold
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 3-Hour Bank Payout
              </span>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
