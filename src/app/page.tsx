"use client";

import React, { useState } from "react";
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
  // Card Visualizer Tab: 'matte-black' | 'gold' | 'de-titan' | 'corporate'
  const [activeCardType, setActiveCardType] = useState<
    "matte-black" | "gold" | "de-titan" | "corporate"
  >("matte-black");

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

  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col selection:bg-white selection:text-black transition-colors duration-200">
      <MarketingNav />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO SECTION WITH ANIMATED INTERACTIVE NFC VISUALIZER
           ========================================================================= */}
        <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-32 border-b border-white/10 bg-gradient-to-b from-neutral-950 via-[#070708] to-[#0A0A0E]">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none animate-glow-slow" />
          <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-emerald-500/10 blur-[110px] rounded-full pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Core Value Proposition */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 shadow-sm animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Official Identifine & Xtreme Cardz Partner Network</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
                  Turn Corporate Introductions into{" "}
                  <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                    10% Cash Commission
                  </span>
                </h1>

                {/* Subtitle / Clear Explanation */}
                <p className="text-sm sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Partner with Nigeria&apos;s premier producer of luxury <strong>Black Matte Metal NFC Cards</strong>, <strong>De-Titan 3-in-1 Access Badges</strong>, and <strong>Corporate Identity Suites</strong>. Earn a flat 10% on every paid client invoice—our WhatsApp sales desk handles all consultations, custom proofs, and nationwide delivery.
                </p>

                {/* CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                  <Link
                    href="/portal?tab=register"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-extrabold text-black hover:bg-neutral-200 transition shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Become an Affiliate Partner</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/pricing"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-neutral-900/80 px-6 py-4 text-sm font-bold text-neutral-200 hover:bg-neutral-800 hover:text-white transition"
                  >
                    <span>Earnings & Package Breakdown</span>
                  </Link>
                </div>

                {/* Core Trust Indicators */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
                  <div className="space-y-0.5">
                    <div className="text-xl sm:text-3xl font-black text-amber-400">10%</div>
                    <div className="text-[11px] font-medium text-neutral-400">Flat Cash Payout</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xl sm:text-3xl font-black text-white">₦50,000</div>
                    <div className="text-[11px] font-medium text-neutral-400">Min. Withdrawal</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xl sm:text-3xl font-black text-emerald-400">3 Hours</div>
                    <div className="text-[11px] font-medium text-neutral-400">Bank Credit Speed</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Animated Interactive Smart Card & Phone Tap Simulator */}
              <div className="lg:col-span-5 flex flex-col items-center">
                {/* Card Type Selector Tabs */}
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/70 border border-white/10 text-[11px] font-bold mb-4">
                  <button
                    onClick={() => setActiveCardType("matte-black")}
                    className={`px-3 py-1.5 rounded-xl transition ${
                      activeCardType === "matte-black"
                        ? "bg-white text-black"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Matte Black
                  </button>
                  <button
                    onClick={() => setActiveCardType("gold")}
                    className={`px-3 py-1.5 rounded-xl transition ${
                      activeCardType === "gold"
                        ? "bg-amber-400 text-black font-bold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    24K Gold
                  </button>
                  <button
                    onClick={() => setActiveCardType("de-titan")}
                    className={`px-3 py-1.5 rounded-xl transition ${
                      activeCardType === "de-titan"
                        ? "bg-white text-black"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    De-Titan 3-in-1
                  </button>
                </div>

                {/* 3D Visual Stage */}
                <div className="relative w-full max-w-sm sm:max-w-md flex flex-col items-center">
                  {/* Floating Smart Card with Metallic Shimmer */}
                  <div
                    onClick={triggerTapSimulation}
                    className={`cursor-pointer relative z-20 w-full rounded-3xl p-6 transition-all duration-500 shadow-2xl overflow-hidden select-none animate-float border group ${
                      activeCardType === "gold"
                        ? "bg-gradient-to-br from-[#D4AF37]/90 via-[#AA771C] to-[#3B2907] border-amber-300 text-black shadow-amber-500/25"
                        : activeCardType === "de-titan"
                        ? "bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] border-indigo-400/40 text-white shadow-indigo-500/25"
                        : "bg-gradient-to-br from-[#1A1A20] via-[#121216] to-[#08080A] border-white/20 text-white shadow-2xl"
                    }`}
                  >
                    {/* Metallic Light Reflection Shimmer Animation */}
                    <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer pointer-events-none" />

                    {/* Card Real Product Image Preview Overlay */}
                    <div className="absolute right-0 bottom-0 w-44 h-44 opacity-25 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-br-3xl">
                      <img
                        src={
                          activeCardType === "gold"
                            ? "/images/products/gold-mirror-metal.webp"
                            : activeCardType === "de-titan"
                            ? "/images/products/de-titan-3in1.webp"
                            : "/images/products/black-matte-metal.webp"
                        }
                        alt="Smart NFC Card Preview"
                        className="w-full h-full object-cover transform translate-x-4 translate-y-4 rotate-[-6deg]"
                      />
                    </div>

                    {/* Card Header */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-7 w-7 rounded-full flex items-center justify-center shadow ${
                            activeCardType === "gold"
                              ? "bg-black text-amber-300"
                              : "bg-gradient-to-tr from-amber-500 to-amber-300 text-black"
                          }`}
                        >
                          <Wifi className="w-4 h-4 rotate-90" />
                        </div>
                        <span
                          className={`font-mono text-xs uppercase tracking-widest font-black ${
                            activeCardType === "gold" ? "text-black" : "text-amber-300"
                          }`}
                        >
                          IDENTIFINE
                        </span>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                          activeCardType === "gold"
                            ? "bg-black/15 border-black/30 text-black"
                            : "bg-white/10 border-white/20 text-neutral-300"
                        }`}
                      >
                        {activeCardType === "gold"
                          ? "24K VIP METAL"
                          : activeCardType === "de-titan"
                          ? "3-IN-1 HYBRID"
                          : "BLACK MATTE NFC"}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="pt-6 pb-2 space-y-1 relative z-10">
                      <div
                        className={`text-lg sm:text-xl font-black tracking-wider uppercase ${
                          activeCardType === "gold" ? "text-black" : "text-white"
                        }`}
                      >
                        CHIEF EXECUTIVE OFFICER
                      </div>
                      <div
                        className={`text-xs font-mono ${
                          activeCardType === "gold" ? "text-neutral-900 font-semibold" : "text-neutral-400"
                        }`}
                      >
                        VANGUARD STERLING LOGISTICS LTD
                      </div>
                    </div>

                    {/* Card Bottom Meta */}
                    <div className="pt-4 flex items-center justify-between text-[11px] font-mono opacity-85 relative z-10">
                      <span>NFC TAP • QR READY</span>
                      <span className="font-bold underline text-amber-400">
                        {hasTapped ? "✓ Card Tapped" : "Click to Tap Phone →"}
                      </span>
                    </div>
                  </div>

                  {/* Pulsating NFC Radio Waves when tapped */}
                  {hasTapped && (
                    <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 z-15 pointer-events-none">
                      <div className="w-40 h-40 rounded-full border-2 border-emerald-400 animate-nfc-wave" />
                    </div>
                  )}

                  {/* Phone Simulator Displaying Instant Digital Profile */}
                  <div
                    className={`mt-4 w-[92%] rounded-2xl border transition-all duration-300 p-4 shadow-xl text-left ${
                      hasTapped
                        ? "border-emerald-500 bg-neutral-900 ring-2 ring-emerald-500/30"
                        : "border-white/10 bg-[#0F0F13]"
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white">
                          {hasTapped ? "⚡ Card Tapped! vCard Profile Connected" : "Client Smartphone Interface"}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        {hasTapped ? "INSTANT READ" : "NO APP REQUIRED"}
                      </span>
                    </div>

                    <div className="pt-3 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">Chidi Nwosu</span>
                        <span className="text-neutral-400 font-mono text-[11px]">Director</span>
                      </div>

                      {/* Action buttons simulating what client's recipient sees */}
                      <div className="grid grid-cols-3 gap-1.5 pt-1">
                        <div className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 py-1.5 px-2 text-center text-[10px] font-bold text-emerald-400 flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Save Contact</span>
                        </div>
                        <div className="rounded-lg bg-white/5 border border-white/10 py-1.5 px-2 text-center text-[10px] font-bold text-neutral-300 flex items-center justify-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </div>
                        <div className="rounded-lg bg-white/5 border border-white/10 py-1.5 px-2 text-center text-[10px] font-bold text-neutral-300 flex items-center justify-center gap-1">
                          <Globe className="w-3 h-3" />
                          <span>Website</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CLIENT TRUST STRIP (COMPANIES & EXECUTIVES USING OUR CARDS)
           ========================================================================= */}
        <section className="py-10 border-b border-white/10 bg-[#0A0A0E]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-5">
            <p className="text-center text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">
              Trusted by Executives & Teams at Nigeria&apos;s Leading Enterprises
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6 items-center justify-items-center opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div className="h-9 flex items-center justify-center grayscale hover:grayscale-0 transition-all hover:scale-105">
                <img src="/images/clients/seplat-energy.webp" alt="Seplat Energy" className="max-h-8 max-w-[100px] object-contain" />
              </div>
              <div className="h-9 flex items-center justify-center grayscale hover:grayscale-0 transition-all hover:scale-105">
                <img src="/images/clients/guinness-nigeria.webp" alt="Guinness Nigeria" className="max-h-8 max-w-[100px] object-contain" />
              </div>
              <div className="h-9 flex items-center justify-center grayscale hover:grayscale-0 transition-all hover:scale-105">
                <img src="/images/clients/rainoil.webp" alt="Rainoil" className="max-h-8 max-w-[100px] object-contain" />
              </div>
              <div className="h-9 flex items-center justify-center grayscale hover:grayscale-0 transition-all hover:scale-105">
                <img src="/images/clients/sapetro-oil.webp" alt="Sapetro Oil" className="max-h-8 max-w-[100px] object-contain" />
              </div>
              <div className="h-9 flex items-center justify-center grayscale hover:grayscale-0 transition-all hover:scale-105">
                <img src="/images/clients/ikeja-electric.webp" alt="Ikeja Electric" className="max-h-8 max-w-[100px] object-contain" />
              </div>
              <div className="h-9 flex items-center justify-center grayscale hover:grayscale-0 transition-all hover:scale-105">
                <img src="/images/clients/nova-bank.webp" alt="Nova Bank" className="max-h-8 max-w-[100px] object-contain" />
              </div>
              <div className="h-9 flex items-center justify-center grayscale hover:grayscale-0 transition-all hover:scale-105">
                <img src="/images/clients/tvc-communications.webp" alt="TVC Communications" className="max-h-8 max-w-[100px] object-contain" />
              </div>
              <div className="h-9 flex items-center justify-center grayscale hover:grayscale-0 transition-all hover:scale-105">
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
              <div className="lg:col-span-5 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent p-6 sm:p-7 text-center space-y-4">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  ESTIMATED CASH YOU TAKE HOME
                </div>
                <div className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tight">
                  ₦{affiliateCommission.toLocaleString()}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Earned from <strong>₦{totalOrderValue.toLocaleString()}</strong> in gross client billing.
                </p>

                <div className="pt-2">
                  <Link
                    href="/portal?tab=register"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-extrabold text-black hover:bg-neutral-200 transition shadow hover:scale-[1.02]"
                  >
                    <span>Start Earning This Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="text-[11px] text-neutral-400 font-mono pt-1">
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

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Product 1: Black Matte Metal NFC */}
              <div className="rounded-3xl border border-white/10 bg-[#111115] overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition hover:-translate-y-1 duration-200 group">
                <div className="h-44 w-full bg-neutral-900 overflow-hidden relative">
                  <img
                    src="/images/products/black-matte-metal.webp"
                    alt="Black Matte Metal NFC Card"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-black/70 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[10px] font-mono font-bold text-amber-300">
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
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Precision laser-engraved stainless steel cards finished with luxury brushed matte coating and gold foil elements for CEOs, partners, and business owners.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/10 text-[11px] text-emerald-400 font-mono font-bold">
                    Affiliate Cut: ₦18,000 per order
                  </div>
                </div>
              </div>

              {/* Product 2: De-Titan 3-in-1 Identity Cards */}
              <div className="rounded-3xl border border-white/10 bg-[#111115] overflow-hidden flex flex-col justify-between hover:border-indigo-500/40 transition hover:-translate-y-1 duration-200 group">
                <div className="h-44 w-full bg-neutral-900 overflow-hidden relative">
                  <img
                    src="/images/products/de-titan-3in1.webp"
                    alt="De-Titan 3-in-1 Smart Badge"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-black/70 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[10px] font-mono font-bold text-indigo-300">
                      3-IN-1 HYBRID
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-white">
                        De-Titan 3-in-1 Smart Badge
                      </h3>
                      <p className="text-xs text-indigo-400 font-mono font-bold">
                        Multi-Functional Corporate
                      </p>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Combines physical company photo identification, RFID door and turnstile access control, and digital tap-to-connect vCard sharing in one sleek card.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/10 text-[11px] text-emerald-400 font-mono font-bold">
                    Affiliate Cut: 10% on total project
                  </div>
                </div>
              </div>

              {/* Product 3: Corporate Enterprise 100-Pack */}
              <div className="rounded-3xl border border-white/10 bg-[#111115] overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition hover:-translate-y-1 duration-200 group">
                <div className="h-44 w-full bg-neutral-900 overflow-hidden relative">
                  <img
                    src="/images/products/corporate-id-system.webp"
                    alt="Corporate Enterprise Identity Pack"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-black/70 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[10px] font-mono font-bold text-emerald-300">
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
                      <p className="text-xs text-emerald-400 font-mono font-bold">
                        ₦650,000 / 100 Units
                      </p>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Full company rollout with centralized administrative dashboard to manage all team member contact profiles, update titles, and track sales team networking.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/10 text-[11px] text-emerald-400 font-mono font-bold">
                    Affiliate Cut: ₦65,000 cash in bank
                  </div>
                </div>
              </div>

              {/* Product 4: Luxury Presentation & VIP Suite */}
              <div className="rounded-3xl border border-white/10 bg-[#111115] overflow-hidden flex flex-col justify-between hover:border-amber-400/40 transition hover:-translate-y-1 duration-200 group">
                <div className="h-44 w-full bg-neutral-900 overflow-hidden relative">
                  <img
                    src="/images/products/gold-mirror-metal.webp"
                    alt="24K Gold & VIP Unboxing"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-black/70 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[10px] font-mono font-bold text-amber-300">
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
                      <p className="text-xs text-amber-400 font-mono font-bold">
                        Starting ₦250,000
                      </p>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Mirror-finish 24K gold cards packaged in handcrafted magnetic presentation cases with individual velvet interior. Unmatched prestige for high-net-worth clients.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/10 text-[11px] text-emerald-400 font-mono font-bold">
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
              <div className="rounded-3xl border border-white/10 bg-[#121216] p-8 space-y-5 relative hover:border-white/20 transition">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black font-black text-base shadow">
                    1
                  </span>
                  <span className="text-[11px] font-mono uppercase text-neutral-400">
                    Takes 30 Seconds
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">
                    Sign Up & Get Your Code
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Create your free account. You instantly get your personal referral code (e.g. <code className="text-amber-300 font-mono bg-black px-1.5 py-0.5 rounded">LOVEOLAO-114</code>) and shareable referral link (<code className="text-white font-mono bg-black px-1.5 py-0.5 rounded">/r/your-code</code>).
                  </p>
                </div>
                <div className="pt-2 text-xs text-emerald-400 font-medium">
                  ✓ Free forever • Instant activation
                </div>
              </div>

              {/* Step 2 */}
              <div className="rounded-3xl border border-white/10 bg-[#121216] p-8 space-y-5 relative hover:border-amber-400/30 transition">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-black font-black text-base shadow">
                    2
                  </span>
                  <span className="text-[11px] font-mono uppercase text-neutral-400">
                    Share Code or Link
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">
                    Introduce Businesses & Clients
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    When you speak with colleagues, corporate executives, realtors, or business owners, give them your code or link. When they click or enter your code, our system locks them under your account and opens WhatsApp to consult with our sales desk.
                  </p>
                </div>
                <div className="pt-2 text-xs text-amber-300 font-medium">
                  ✓ Our WhatsApp team closes the sale for you
                </div>
              </div>

              {/* Step 3 */}
              <div className="rounded-3xl border border-white/10 bg-[#121216] p-8 space-y-5 relative hover:border-emerald-400/30 transition">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-black font-black text-base shadow">
                    3
                  </span>
                  <span className="text-[11px] font-mono uppercase text-neutral-400">
                    Direct Bank Credit
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">
                    Get 10% Cash Commission
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
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
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-extrabold text-black hover:bg-neutral-200 transition shadow-xl hover:scale-[1.02]"
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
        <section className="py-20 md:py-28 bg-gradient-to-t from-neutral-950 via-[#0E0E12] to-[#070708] text-center">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8">
            <div className="h-14 w-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto animate-bounce">
              <Sparkles className="w-7 h-7" />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Start Earning 10% on Every Corporate Card Introduction
              </h2>
              <p className="text-xs sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
                Join our network of professionals, corporate executives, and consultants across Nigeria. Free registration takes less than 30 seconds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/portal?tab=register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-extrabold text-black hover:bg-neutral-200 transition shadow-2xl hover:scale-[1.02]"
              >
                <span>Create Your Free Affiliate Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-neutral-900 px-6 py-4 text-sm font-bold text-white hover:bg-neutral-800 transition"
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
