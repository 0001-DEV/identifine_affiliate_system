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
} from "lucide-react";

export default function MarketingHomePage() {
  // Interactive Earnings Calculator State
  const [executivePacks, setExecutivePacks] = useState(1); // 250k each -> 25k comm
  const [enterprisePacks, setEnterprisePacks] = useState(1); // 650k each -> 65k comm
  const [metalSuites, setMetalSuites] = useState(1); // 180k each -> 18k comm

  const totalOrderValue =
    executivePacks * 250000 + enterprisePacks * 650000 + metalSuites * 180000;
  const affiliateCommission = Math.round(totalOrderValue * 0.1);

  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col selection:bg-white selection:text-black transition-colors duration-200">
      <MarketingNav />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO SECTION
           ========================================================================= */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-white/10 bg-gradient-to-b from-neutral-950 via-[#070708] to-[#0A0A0E]">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Core Value Proposition */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Official Identifine & Xtreme Cardz Affiliate Network</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
                  Turn Corporate Referrals into{" "}
                  <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                    10% Cash Income
                  </span>
                </h1>

                {/* Subtitle / Clear Explanation */}
                <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Earn a guaranteed <strong>10% cash commission</strong> whenever a professional, executive, or business you refer orders our premium <strong>Smart NFC Business Cards</strong> and <strong>Corporate Identity Packs</strong>. No selling stress—our team handles the consultations, production, and nationwide delivery.
                </p>

                {/* CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                  <Link
                    href="/portal?tab=register"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-extrabold text-black hover:bg-neutral-200 transition shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Become an Affiliate Partner</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/pricing"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-neutral-900/80 px-6 py-4 text-sm font-bold text-neutral-200 hover:bg-neutral-800 hover:text-white transition"
                  >
                    <span>View Earnings Breakdown</span>
                  </Link>
                </div>

                {/* Core Trust Indicators */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-amber-400">10%</div>
                    <div className="text-[11px] font-medium text-neutral-400">Flat Cash Payout</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-white">₦50,000</div>
                    <div className="text-[11px] font-medium text-neutral-400">Min. Withdrawal</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-400">3 Hours</div>
                    <div className="text-[11px] font-medium text-neutral-400">Bank Credit Speed</div>
                  </div>
                </div>
              </div>

              {/* Right Column: High-End Card Visual & Tap Demo */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md">
                  {/* Floating Card: Black Matte Metal NFC */}
                  <div className="relative rounded-3xl border border-amber-500/20 bg-gradient-to-br from-[#1E1E24] via-[#141418] to-[#0A0A0C] p-6 shadow-2xl space-y-6 overflow-hidden">
                    {/* Metallic Accent Sheen */}
                    <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-400/10 blur-2xl rounded-full" />
                    
                    {/* Card Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow">
                          <Wifi className="w-3.5 h-3.5 text-black rotate-90" />
                        </div>
                        <span className="font-mono text-xs uppercase tracking-widest text-amber-300 font-bold">
                          IDENTIFINE SMART NFC
                        </span>
                      </div>
                      <span className="rounded-full bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 text-[10px] font-mono text-amber-300">
                        DE-TITAN EDITION
                      </span>
                    </div>

                    {/* Card Body Simulation */}
                    <div className="pt-4 pb-2 space-y-3">
                      <div className="text-xl font-bold text-white tracking-wide">
                        CHIEF EXECUTIVE OFFICER
                      </div>
                      <div className="text-xs font-mono text-neutral-400">
                        MATTE BLACK STAINLESS STEEL • 24K GOLD LASER ETCH
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-300 pt-1">
                        <Smartphone className="w-4 h-4 text-emerald-400" />
                        <span>Tap to connect instantly to any iPhone / Android</span>
                      </div>
                    </div>

                    {/* Commission Callout Box */}
                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-emerald-300 font-bold">
                          CLIENT BUYS CORPORATE PACK
                        </div>
                        <div className="text-base font-extrabold text-white mt-0.5">
                          ₦650,000 Order Value
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-mono uppercase text-neutral-400">
                          YOU GET CREDITED
                        </div>
                        <div className="text-lg font-black text-emerald-400">
                          +₦65,000 CASH
                        </div>
                      </div>
                    </div>

                    {/* Footer perks */}
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 font-mono">
                      <span>• No App Installation Needed</span>
                      <span>• Real-time Tracking</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE EARNINGS CALCULATOR
           ========================================================================= */}
        <section className="py-16 md:py-24 border-b border-white/10 bg-[#09090D] relative">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                <Calculator className="w-3.5 h-3.5" />
                <span>Affiliate Earnings Simulator</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Calculate Exactly How Much You Can Earn
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                Adjust the sliders below to see your guaranteed 10% commission when clients order our products.
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
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-extrabold text-black hover:bg-neutral-200 transition shadow"
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
            3. WHAT ARE THE PRODUCTS? (WHY PEOPLE BUY IDENTIFINE & XTREME CARDZ)
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
              <div className="rounded-3xl border border-white/10 bg-[#111115] p-6 space-y-4 hover:border-amber-500/40 transition">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <CreditCard className="w-6 h-6" />
                </div>
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
                <div className="text-[11px] text-emerald-400 font-mono font-semibold pt-1">
                  Affiliate Cut: ₦18,000 per order
                </div>
              </div>

              {/* Product 2: De-Titan 3-in-1 Identity Cards */}
              <div className="rounded-3xl border border-white/10 bg-[#111115] p-6 space-y-4 hover:border-amber-500/40 transition">
                <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-white">
                    De-Titan 3-in-1 Smart Badge
                  </h3>
                  <p className="text-xs text-indigo-400 font-mono font-bold">
                    Multi-Functional Corporate
                  </p>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Combines physical company photo identification, RFID door and building access control, and digital tap-to-connect vCard sharing in one sleek card.
                </p>
                <div className="text-[11px] text-emerald-400 font-mono font-semibold pt-1">
                  Affiliate Cut: 10% on total project
                </div>
              </div>

              {/* Product 3: Corporate Enterprise 100-Pack */}
              <div className="rounded-3xl border border-white/10 bg-[#111115] p-6 space-y-4 hover:border-amber-500/40 transition">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Building2 className="w-6 h-6" />
                </div>
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
                <div className="text-[11px] text-emerald-400 font-mono font-semibold pt-1">
                  Affiliate Cut: ₦65,000 cash in bank
                </div>
              </div>

              {/* Product 4: Tap-to-Connect Digital Portal */}
              <div className="rounded-3xl border border-white/10 bg-[#111115] p-6 space-y-4 hover:border-amber-500/40 transition">
                <div className="h-12 w-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-white">
                    Tap-to-Connect Technology
                  </h3>
                  <p className="text-xs text-rose-400 font-mono font-bold">
                    Zero App Installation
                  </p>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  No app download required. The client taps the card against any smartphone, instantly displaying their company bio, WhatsApp, phone, email, and catalog.
                </p>
                <div className="text-[11px] text-emerald-400 font-mono font-semibold pt-1">
                  Clients Love It • High Conversion
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
              <div className="rounded-3xl border border-white/10 bg-[#121216] p-8 space-y-5 relative">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black font-black text-base">
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
              <div className="rounded-3xl border border-white/10 bg-[#121216] p-8 space-y-5 relative">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-black font-black text-base">
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
              <div className="rounded-3xl border border-white/10 bg-[#121216] p-8 space-y-5 relative">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-black font-black text-base">
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
                    When the client pays for their cards, 10% is immediately credited to your live dashboard balance. Request a withdrawal anytime once you have ₦50,000—credited within 3 working hours into your Nigerian bank.
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
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-extrabold text-black hover:bg-neutral-200 transition shadow-xl"
              >
                <span>Get Your Referral Code Now (Free)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. CORE BENEFITS FOR AFFILIATES
           ========================================================================= */}
        <section className="py-20 md:py-28 border-b border-white/10 bg-[#070708]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-14">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-neutral-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Affiliate Advantages</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Why Affiliates Choose Identifine
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Benefit 1 */}
              <div className="rounded-3xl border border-white/10 bg-[#101014] p-7 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  High Ticket B2B Sizes
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Unlike consumer products with small commissions, corporate card orders frequently run from ₦250,000 to ₦1,500,000+. A single corporate intro can earn you ₦65,000 to ₦150,000 in one go.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="rounded-3xl border border-white/10 bg-[#101014] p-7 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-400/10 flex items-center justify-center text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  3-Hour Bank Payouts
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  No waiting for 30 days or end-of-month cycles. Once your verified wallet hits the ₦50,000 threshold, click withdraw and receive funds in your Nigerian bank account within 3 working hours.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="rounded-3xl border border-white/10 bg-[#101014] p-7 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-400/10 flex items-center justify-center text-indigo-400">
                  <Share2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Zero Selling Stress
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  You don&apos;t need to explain technical card specifications, laser vector files, or negotiate prices. You simply introduce them with your code; our sales desk handles all WhatsApp questions and closes the order.
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="rounded-3xl border border-white/10 bg-[#101014] p-7 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-rose-400/10 flex items-center justify-center text-rose-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Dedicated Live Dashboard
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Log in anytime to see the status of every company you referred: WhatsApp inquiries, issued invoices, client payments, and your growing wallet balance.
                </p>
              </div>

              {/* Benefit 5 */}
              <div className="rounded-3xl border border-white/10 bg-[#101014] p-7 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Lifetime Client Re-Orders
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Companies frequently hire new executives, promote staff, or expand offices. When a company you referred re-orders new cards in the future, you receive your commission on their continuous orders.
                </p>
              </div>

              {/* Benefit 6 */}
              <div className="rounded-3xl border border-white/10 bg-[#101014] p-7 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-purple-400/10 flex items-center justify-center text-purple-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Premium Quality Reputation
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  You are recommending an industry leader. Identifine & Xtreme Cardz cards are engineered with premium metallic finishes, reliable NTAG chips, and stunning presentation packaging.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. QUICK FAQ PREVIEW
           ========================================================================= */}
        <section className="py-20 md:py-28 border-b border-white/10 bg-[#09090D]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-neutral-300">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Got Questions?</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                Everything you need to know about the affiliate partnership.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Is there any registration fee to join?
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  No. Joining the Identifine Affiliate Program is <strong>100% free</strong>. You will never be asked to pay any subscription, activation, or membership fee.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  How does the system track my referrals?
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  You are assigned a unique Referral Code and Referral Link. When a prospective client clicks your link or types your code into the platform, they are permanently locked under your profile. Even if they chat with our team on WhatsApp, the referral credit remains securely attached to you.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  How and when do I get paid?
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Once your client completes payment for their invoice, your 10% commission is credited to your dashboard wallet immediately. As soon as your balance reaches <strong>₦50,000</strong>, you can request a withdrawal to any Nigerian bank (GTBank, Zenith, Access, Moniepoint, Kuda, etc.) and be credited within <strong>3 working hours</strong>.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Do I have to do graphic design or handle card delivery?
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  No. Identifine and Xtreme Cardz handle all graphic layouts, NFC chip encoding, physical card production, quality checks, and nationwide courier delivery. You only connect the client.
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/faq"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4"
              >
                <span>View All 20+ Frequently Asked Questions</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. FINAL CALL TO ACTION
           ========================================================================= */}
        <section className="py-20 md:py-28 bg-gradient-to-t from-neutral-950 via-[#0E0E12] to-[#070708] text-center">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8">
            <div className="h-14 w-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto">
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
