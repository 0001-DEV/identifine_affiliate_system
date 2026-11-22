"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MarketingNav } from "@/components/MarketingNav";
import { MarketingFooter } from "@/components/MarketingFooter";
import { SitePreloader } from "@/components/SitePreloader";
import { HeroGoldLinesEffect } from "@/components/HeroGoldLinesEffect";
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
  Rocket,
  Diamond,
  Handshake,
  UserPlus,
  Link as LinkIcon,
  Wallet,
  Star,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function MarketingHomePage() {
  const router = useRouter();

  // Hero split-screen onboarding panel state (7.5% commission rate)
  const [heroReferrals, setHeroReferrals] = useState(6);
  const [heroName, setHeroName] = useState("");
  const [heroEmail, setHeroEmail] = useState("");
  const [heroPhone, setHeroPhone] = useState("");
  const [heroReferralCode, setHeroReferralCode] = useState("");

  // 7.5% commission on average ₦250k order = ₦18,750 per referral
  const heroEstimatedCommission = Math.round(heroReferrals * 250000 * 0.075);

  const handleHeroSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      tab: "register",
      name: heroName,
      email: heroEmail,
      phone: heroPhone,
      ...(heroReferralCode.trim() ? { code: heroReferralCode.trim().toLowerCase() } : {}),
    });
    router.push(`/portal?${params.toString()}`);
  };

  // 6 Products from the Mockup with rich descriptions for hover/click cards
  const [activeProductCard, setActiveProductCard] = useState<string | null>(null);

  const showcaseProducts = [
    {
      id: "de-titan",
      name: "De-Titan Smart Cards",
      image: "/images/products/de-titan-3in1.webp",
      tag: "Smart Badge",
      description: "Titanium-reinforced 3-in-1 hybrid credentials designed for executive identification, contactless NFC networking, and corporate access control.",
    },
    {
      id: "du-plex",
      name: "Du-Plex Smart Cards",
      image: "/images/products/gold-mirror-metal.webp",
      tag: "Dual NFC",
      description: "Dual-chip 24K mirror gold metal cards combining digital NFC contact sharing with door access RFID encryption.",
    },
    {
      id: "corporate-id",
      name: "Corporate ID Cards",
      image: "/images/products/corporate-id-system.webp",
      tag: "Enterprise",
      description: "Enterprise smart identification badges engineered for modern corporate organizations and secure staff tracking.",
    },
    {
      id: "business-cards",
      name: "Business Cards",
      image: "/images/products/black-matte-metal.webp",
      tag: "Laser Metal",
      description: "Laser-engraved matte black metal cards designed to leave an unforgettable impression with every instant NFC tap.",
    },
    {
      id: "access-membership",
      name: "Access & Membership Cards",
      image: "/images/products/identifine-rfid-suite.webp",
      tag: "RFID + Door",
      description: "Encrypted RFID credentials tailored for luxury private clubs, VIP lounges, gyms, and gated corporate campuses.",
    },
    {
      id: "digital-qr",
      name: "Digital Identity & QR Solutions",
      image: "/images/products/identifine-smart-id.webp",
      tag: "Cloud vCard",
      description: "Dynamic cloud-powered digital vCards and encrypted QR solutions for real-time contact sharing without requiring an app.",
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
    <div className="min-h-screen bg-[#121214] text-white flex flex-col selection:bg-[#F59E0B] selection:text-black transition-colors duration-200">
      {/* 1 to 8, XTREME, IDENTIFINE Preloader with Broken Wine & White Line */}
      <SitePreloader />

      <MarketingNav />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO SECTION: BLACK & GOLD LINE EFFECT MOVING ONE BY ONE, CONTAINER ON TOP
           ========================================================================= */}
        <section
          id="hero"
          className="relative w-full border-b border-white/10 bg-[#0E0E10] py-14 sm:py-20 lg:py-28 overflow-hidden min-h-[660px] flex items-center"
        >
          {/* Black & Gold Lines Effect: 24 lines moving one by one covering the entire hero */}
          <HeroGoldLinesEffect rowCount={24} />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10 w-full flex justify-end items-center">
            {/* The Container (Affiliate Onboarding Portal Card: Off-White) - On Top */}
            <div className="w-full max-w-[460px] rounded-3xl bg-[#F8F9FA] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.7),0_10px_30px_-5px_rgba(0,0,0,0.4)] border border-neutral-300/80 p-7 sm:p-8 text-neutral-900 relative z-20 backdrop-blur-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[11px] font-bold text-amber-800">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                Identifine &amp; Xtreme Cardz Partner
              </div>

              {/* Residence style Masked Reveal Headline */}
              <div className="mt-3 overflow-hidden">
                <h2 className="animate-mask-rise text-2xl sm:text-3xl font-black leading-[1.15] tracking-tight">
                  <span className="font-light block text-neutral-700">Become an</span>
                  <span className="block text-black">
                    Executive Partner
                  </span>
                </h2>
              </div>

              {/* Live earnings slider (7.5%) */}
              <div className="mt-5 rounded-2xl bg-white border border-neutral-200 p-3.5 shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-600 font-medium">
                    Refer <b className="text-neutral-900 font-mono text-sm">{heroReferrals}</b> client{heroReferrals > 1 ? "s" : ""}/mo
                  </span>
                  <span className="font-black text-lg text-[#B45309] font-mono tracking-tight">
                    ₦{heroEstimatedCommission.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={40}
                  value={heroReferrals}
                  onChange={(e) => setHeroReferrals(Number(e.target.value))}
                  className="mt-2.5 w-full accent-[#F59E0B] cursor-pointer"
                  aria-label="Number of referrals per month"
                />
                <p className="mt-1 text-[10px] text-neutral-500">
                  7.5% cash commission on executive client orders.
                </p>
              </div>

              {/* Guarantees */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white border border-neutral-200 shadow-sm">
                  <Zap className="w-4 h-4 text-[#F59E0B]" />
                  <span className="text-[10px] font-bold leading-tight">Paystack<br />Instant</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white border border-neutral-200 shadow-sm">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] font-bold leading-tight">7.5% Flat<br />Cash</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white border border-neutral-200 shadow-sm">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span className="text-[10px] font-bold leading-tight">Zero<br />Inventory</span>
                </div>
              </div>

              {/* Quick start form -> continues on /portal register */}
              <form onSubmit={handleHeroSignup} className="mt-4 space-y-2.5">
                <input
                  required
                  value={heroName}
                  onChange={(e) => setHeroName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
                />
                <input
                  required
                  type="email"
                  value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
                />
                <input
                  required
                  type="tel"
                  value={heroPhone}
                  onChange={(e) => setHeroPhone(e.target.value)}
                  placeholder="Phone / WhatsApp Number"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
                />
                <input
                  value={heroReferralCode}
                  onChange={(e) => setHeroReferralCode(e.target.value.toUpperCase())}
                  placeholder="Referral Code (Optional, e.g. JOSHUA-842)"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition placeholder:normal-case placeholder:font-sans placeholder:tracking-normal placeholder:text-neutral-400"
                />
                <button
                  type="submit"
                  className="group w-full rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold py-3.5 text-xs shadow-md hover:shadow-xl transition-magnetic flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Activate Affiliate Link</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 duration-300" />
                </button>
              </form>

              <p className="mt-3.5 text-center text-[11px] text-neutral-500">
                Already registered?{" "}
                <Link href="/portal?tab=login" className="font-bold text-neutral-900 underline underline-offset-2">
                  Sign in
                </Link>{" "}
                · <Link href="/pricing" className="font-bold text-neutral-900 underline underline-offset-2">7.5% Earnings</Link>
              </p>
            </div>
          </div>
        </section>

        {/* Buff Motion style Infinite Marquee Ticker (7.5%) */}
        <section className="border-b border-white/10 bg-[#121214] py-6 sm:py-8 overflow-hidden select-none">
          <div className="animate-ticker flex items-center gap-8 text-xs font-bold tracking-widest text-white/80 uppercase">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-8 shrink-0">
                <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> 7.5% Flat Cash Commission</span>
                <span className="text-white/20">•</span>
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-emerald-400" /> Instant Paystack Settlement</span>
                <span className="text-white/20">•</span>
                <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[#F59E0B]" /> 24K Brushed Gold &amp; Titanium NFC Cards</span>
                <span className="text-white/20">•</span>
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-blue-400" /> Zero Inventory Required</span>
                <span className="text-white/20">•</span>
                <span className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-emerald-400" /> ₦50,000 Minimum Bank Withdrawal</span>
                <span className="text-white/20">•</span>
                <span className="flex items-center gap-2"><Building2 className="w-4 h-4 text-purple-400" /> Enterprise Corporate Rollouts</span>
                <span className="text-white/20">•</span>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            2. 4 VALUE PILLARS (OFF-WHITE HIGH-CONTRAST CARD)
           ========================================================================= */}
        <section className="py-20 md:py-28 bg-[#121214]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="rounded-3xl bg-[#F8F9FA] text-neutral-900 p-10 md:p-14 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center border border-neutral-300/60">
              <div className="flex flex-col items-center gap-3 p-3 group">
                <div className="h-14 w-14 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-[#F59E0B] group-hover:text-black transition shadow-sm">
                  <Handshake className="w-7 h-7" />
                </div>
                <div className="font-extrabold text-base sm:text-lg text-neutral-900">
                  Trusted Brands
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 p-3 group">
                <div className="h-14 w-14 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-[#F59E0B] group-hover:text-black transition shadow-sm">
                  <Diamond className="w-7 h-7" />
                </div>
                <div className="font-extrabold text-base sm:text-lg text-neutral-900">
                  Premium Quality
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 p-3 group">
                <div className="h-14 w-14 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-[#F59E0B] group-hover:text-black transition shadow-sm">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <div className="font-extrabold text-base sm:text-lg text-neutral-900">
                  Growing Demand
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 p-3 group">
                <div className="h-14 w-14 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-[#F59E0B] group-hover:text-black transition shadow-sm">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div className="font-extrabold text-base sm:text-lg text-neutral-900">
                  Earn with Confidence
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. OUR PRODUCTS & SERVICES (INCREASED FONT SIZE, NO BORDERS, 50PX DOWN OFFSET, 20PX MARGIN)
           ========================================================================= */}
        <section id="products" className="py-36 md:py-52 lg:py-60 min-h-[960px] bg-[#F8F9FA] text-neutral-900 border-b border-neutral-300/60 flex flex-col justify-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
              <div>
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-neutral-950 tracking-tight leading-none">
                  Our Products &amp; Services
                </h2>
                <p className="text-lg sm:text-2xl text-neutral-600 mt-4 font-medium">
                  Promote a wide range of identity and card solutions
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollProducts("left")}
                  aria-label="Scroll left"
                  className="h-14 w-14 rounded-full border border-neutral-300 bg-[#F8F9FA] text-neutral-800 hover:bg-neutral-950 hover:text-white flex items-center justify-center transition shadow-sm cursor-pointer"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={() => scrollProducts("right")}
                  aria-label="Scroll right"
                  className="h-14 w-14 rounded-full border border-neutral-300 bg-[#F8F9FA] text-neutral-800 hover:bg-neutral-950 hover:text-white flex items-center justify-center transition shadow-sm cursor-pointer"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </div>
            </div>

            {/* Horizontal Product Track: Shifted down by 50px as requested (mt-[50px]) */}
            <div
              ref={productScrollRef}
              className="flex items-stretch overflow-x-auto pb-8 scroll-smooth no-scrollbar mt-[50px]"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {showcaseProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => setActiveProductCard(activeProductCard === prod.id ? null : prod.id)}
                  className="w-[300px] sm:w-[380px] md:w-[420px] shrink-0 bg-transparent flex flex-col group cursor-pointer m-[20px]"
                >
                  {/* Container: ONLY the image shows inside (no borders, no text on image) */}
                  <div className="relative h-80 sm:h-96 md:h-[440px] w-full bg-neutral-950 overflow-hidden rounded-2xl shadow-md">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Hover / Click Overlay: Changes to off-white background with card name and description (NO ICONS IN TEXT) */}
                    <div
                      className={`absolute inset-0 bg-[#F8F9FA] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 z-20 ${
                        activeProductCard === prod.id
                          ? "opacity-100 pointer-events-auto"
                          : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="inline-block rounded-full bg-neutral-200/80 px-3.5 py-1 text-xs sm:text-sm font-bold text-neutral-500">
                          {prod.tag} — 7.5% Cash Commission
                        </div>

                        <h3 className="font-black text-2xl sm:text-3xl lg:text-4xl text-neutral-950 leading-tight">
                          {prod.name}
                        </h3>

                        <p className="text-base sm:text-lg lg:text-xl text-neutral-700 leading-relaxed font-medium">
                          {prod.description}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-neutral-200 flex items-center justify-between">
                        <span className="font-mono font-bold text-sm sm:text-base text-neutral-500">
                          7.5% Cash Payout
                        </span>
                        <Link
                          href={`/portal?tab=register&product=${prod.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-full bg-black text-white hover:bg-neutral-800 px-6 py-2.5 text-xs sm:text-sm font-extrabold transition shadow-md"
                        >
                          Refer Card
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Name of each container is under the image */}
                  <div className="pt-4 pb-2 px-1">
                    <h3 className="font-black text-xl sm:text-2xl lg:text-3xl text-neutral-900 tracking-tight">
                      {prod.name}
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-neutral-500 mt-1">
                      7.5% Cash Commission
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. HOW IT WORKS (5-STEP FLOW FROM MOCKUP)
           ========================================================================= */}
        <section
          id="how-it-works"
          className="py-28 md:py-40 bg-[#141416] text-white border-b border-white/10 relative overflow-hidden"
        >
          {/* Ambient Wine/Gold Waves */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#800020]/20 via-[#F59E0B]/10 to-transparent blur-3xl pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
            <div className="text-center space-y-3 mb-20">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                How It Works
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 font-medium">
                Join. Refer. Earn. It&apos;s that simple!
              </p>
            </div>

            {/* 5 Steps connected with arrows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
              {/* Step 1 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center space-y-4 hover:border-[#F59E0B]/50 transition group min-h-[220px] flex flex-col justify-between">
                <div className="h-14 w-14 rounded-full bg-[#F59E0B] text-black font-black text-lg flex items-center justify-center mx-auto shadow-lg shadow-[#F59E0B]/25">
                  1
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white">Register</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-2">
                    Create your free affiliate account
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center space-y-4 hover:border-[#F59E0B]/50 transition group min-h-[220px] flex flex-col justify-between">
                <div className="h-14 w-14 rounded-full bg-[#F59E0B] text-black font-black text-lg flex items-center justify-center mx-auto shadow-lg shadow-[#F59E0B]/25">
                  2
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white">Get Your Link</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-2">
                    Receive a unique referral link
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center space-y-4 hover:border-[#F59E0B]/50 transition group min-h-[220px] flex flex-col justify-between">
                <div className="h-14 w-14 rounded-full bg-[#F59E0B] text-black font-black text-lg flex items-center justify-center mx-auto shadow-lg shadow-[#F59E0B]/25">
                  3
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white">Refer Business</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-2">
                    Share with businesses and contacts
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center space-y-4 hover:border-[#F59E0B]/50 transition group min-h-[220px] flex flex-col justify-between">
                <div className="h-14 w-14 rounded-full bg-[#F59E0B] text-black font-black text-lg flex items-center justify-center mx-auto shadow-lg shadow-[#F59E0B]/25">
                  4
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white">Earn Commission</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-2">
                    When they purchase, you earn 7.5%
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center space-y-4 hover:border-[#F59E0B]/50 transition group min-h-[220px] flex flex-col justify-between">
                <div className="h-14 w-14 rounded-full bg-[#F59E0B] text-black font-black text-lg flex items-center justify-center mx-auto shadow-lg shadow-[#F59E0B]/25">
                  5
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white">Withdraw</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-2">
                    Request payout once eligible
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. YOUR EARNINGS AT A GLANCE (7.5%)
           ========================================================================= */}
        <section id="earnings" className="py-28 md:py-40 bg-[#F8F9FA] text-neutral-900 border-b border-neutral-300/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="rounded-3xl border border-neutral-300/80 bg-white p-10 sm:p-16 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Graphic: 3D Gold Bar Chart */}
              <div className="relative flex items-center justify-center">
                <img
                  src="/images/products/earnings-bar-chart.png"
                  alt="7.5% Commission Chart"
                  className="max-h-[280px] w-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Right Content */}
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight">
                  Your Earnings at a Glance
                </h2>
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                  Earn 7.5% commission on qualifying sales, with a minimum withdrawal of ₦50,000.
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
            6. WHY BECOME AN AFFILIATE? (7.5% ATTRACTIVE COMMISSION)
           ========================================================================= */}
        <section className="py-28 md:py-40 bg-[#121214] text-white border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
              {/* Left Column: Why Become an Affiliate? */}
              <div className="space-y-8">
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Why Become an Affiliate?
                </h2>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="h-7 w-7 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shrink-0 font-black text-sm">
                      ✓
                    </div>
                    <span className="text-lg sm:text-xl font-semibold text-white">
                      Attractive 7.5% commission
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-7 w-7 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shrink-0 font-black text-sm">
                      ✓
                    </div>
                    <span className="text-lg sm:text-xl font-semibold text-white">
                      Trusted brands
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-7 w-7 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shrink-0 font-black text-sm">
                      ✓
                    </div>
                    <span className="text-lg sm:text-xl font-semibold text-white">
                      Easy sign-up &amp; tracking
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-7 w-7 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shrink-0 font-black text-sm">
                      ✓
                    </div>
                    <span className="text-lg sm:text-xl font-semibold text-white">
                      Flexible withdrawal options
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Testimonial & Smiling Affiliate */}
              <div className="relative rounded-3xl border border-white/15 bg-neutral-900/80 p-8 sm:p-12 shadow-2xl flex flex-col sm:flex-row items-center gap-8 overflow-hidden min-h-[300px]">
                <div className="space-y-5 flex-1">
                  <p className="text-base sm:text-lg italic text-neutral-200 leading-relaxed">
                    &ldquo;The Identifine Affiliate Programme is a great opportunity to earn while promoting world-class products.&rdquo;
                  </p>
                  <div>
                    <div className="flex items-center gap-1 text-[#F59E0B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#F59E0B]" />
                      ))}
                    </div>
                    <div className="text-sm text-neutral-400 font-medium mt-1">
                      Happy Affiliate
                    </div>
                  </div>
                </div>

                <div className="w-40 h-40 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                  <img
                    src="/images/products/happy-affiliate.png"
                    alt="Happy Affiliate"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. READY TO START EARNING? (GOLD RIBBON CTA FROM MOCKUP)
           ========================================================================= */}
        <section className="bg-[#121214] py-20 md:py-28 px-4 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-3xl bg-gradient-to-r from-[#F59E0B] via-[#E5A826] to-[#D97706] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
              <div className="flex items-center gap-5 text-neutral-950">
                <div className="h-16 w-16 rounded-full bg-black/15 flex items-center justify-center shrink-0">
                  <Rocket className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-black">
                    Ready to Start Earning?
                  </h3>
                  <p className="text-sm sm:text-base text-black/80 font-medium mt-1">
                    Join the Identifine &amp; Xtreme Cardz Affiliate Programme today!
                  </p>
                </div>
              </div>

              <Link
                href="/portal?tab=register"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-black hover:bg-neutral-900 text-white px-9 py-4 text-sm font-black shadow-xl transition hover:scale-105"
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
