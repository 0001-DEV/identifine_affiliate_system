"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MarketingNav } from "@/components/MarketingNav";
import { MarketingFooter } from "@/components/MarketingFooter";
import { SitePreloader } from "@/components/SitePreloader";
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
  const [isMuted, setIsMuted] = useState(true);

  // 7.5% commission on average ₦250k order = ₦18,750 per referral
  const heroEstimatedCommission = Math.round(heroReferrals * 250000 * 0.075);

  const handleHeroSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      tab: "register",
      name: heroName,
      email: heroEmail,
      phone: heroPhone,
    });
    router.push(`/portal?${params.toString()}`);
  };

  // 6 Products from the Mockup
  const showcaseProducts = [
    {
      id: "de-titan",
      name: "De-Titan Smart Cards",
      image: "/images/products/de-titan-3in1.webp",
      tag: "Smart Badge",
    },
    {
      id: "du-plex",
      name: "Du-Plex Smart Cards",
      image: "/images/products/gold-mirror-metal.webp",
      tag: "Dual NFC",
    },
    {
      id: "corporate-id",
      name: "Corporate ID Cards",
      image: "/images/products/corporate-id-system.webp",
      tag: "Enterprise",
    },
    {
      id: "business-cards",
      name: "Business Cards",
      image: "/images/products/black-matte-metal.webp",
      tag: "Laser Metal",
    },
    {
      id: "access-membership",
      name: "Access & Membership Cards",
      image: "/images/products/identifine-rfid-suite.webp",
      tag: "RFID + Door",
    },
    {
      id: "digital-qr",
      name: "Digital Identity & QR Solutions",
      image: "/images/products/identifine-smart-id.webp",
      tag: "Cloud vCard",
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
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-[#F59E0B] selection:text-black transition-colors duration-200">
      {/* 1 to 8, XTREME, IDENTIFINE Preloader with Broken Wine & White Line */}
      <SitePreloader />

      <MarketingNav />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO SECTION: 70% XTREME CARDZ VIDEO + 30% AFFILIATE ONBOARDING
           ========================================================================= */}
        <section className="relative w-full border-b border-white/10 bg-black overflow-hidden">
          <div className="w-full grid grid-cols-1 lg:grid-cols-10 min-h-[720px] lg:h-[990px] xl:h-[1010px]">
            {/* ---------- 70% WIDTH: XTREME CARDZ VIDEO SHOWCASE ---------- */}
            <div className="lg:col-span-7 relative h-[500px] sm:h-[650px] lg:h-full overflow-hidden bg-[#0A0709] flex items-center justify-center">
              <video
                key="xtreme-cardz-showcase-video"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover object-center"
              >
                <source src="/videos/xtreme-cardz-showcase.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Ambient Dark Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Floating Video Audio Toggle Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="absolute top-6 left-6 z-20 h-10 w-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition backdrop-blur-md cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Live Badge over Video */}
              <div className="absolute bottom-8 left-8 z-20 hidden sm:flex items-center gap-3 bg-black/75 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl shadow-xl">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#F59E0B] animate-ping" />
                <span className="text-xs font-mono font-bold text-white tracking-wider">
                  XTREME CARDZ SHOWCASE • 7.5% COMMISSION
                </span>
              </div>
            </div>

            {/* ---------- 30% WIDTH: AFFILIATE ONBOARDING PORTAL ---------- */}
            <div className="lg:col-span-3 relative bg-[#F8F9FA] text-neutral-900 flex items-center justify-center p-6 sm:p-8 lg:p-7 border-t lg:border-t-0 lg:border-l border-neutral-200">
              <div className="w-full max-w-[420px] rounded-3xl bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-black/5 p-6 sm:p-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[11px] font-bold text-amber-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                  Identifine &amp; Xtreme Cardz Partner
                </div>

                {/* Residence style Masked Reveal Headline */}
                <div className="mt-3 overflow-hidden">
                  <h1 className="animate-mask-rise text-2xl sm:text-3xl font-black leading-[1.1] tracking-tight">
                    <span className="font-light block text-neutral-800">Become an</span>
                    <span className="block text-black">
                      Executive Partner
                    </span>
                  </h1>
                </div>

                {/* Live earnings slider (7.5%) */}
                <div className="mt-5 rounded-2xl bg-neutral-50 border border-neutral-200 p-3.5">
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
                  <div className="flex flex-col items-center gap-1 p-1.5 rounded-xl bg-neutral-50 border border-neutral-100">
                    <Zap className="w-4 h-4 text-[#F59E0B]" />
                    <span className="text-[10px] font-bold leading-tight">Paystack<br />Instant</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-1.5 rounded-xl bg-neutral-50 border border-neutral-100">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span className="text-[10px] font-bold leading-tight">7.5% Flat<br />Cash</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-1.5 rounded-xl bg-neutral-50 border border-neutral-100">
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
                    className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-xs outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
                  />
                  <input
                    required
                    type="email"
                    value={heroEmail}
                    onChange={(e) => setHeroEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-xs outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
                  />
                  <input
                    required
                    type="tel"
                    value={heroPhone}
                    onChange={(e) => setHeroPhone(e.target.value)}
                    placeholder="Phone / WhatsApp Number"
                    className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-xs outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
                  />
                  <button
                    type="submit"
                    className="group w-full rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold py-3 text-xs shadow-md hover:shadow-xl transition-magnetic flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Activate Affiliate Link</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 duration-300" />
                  </button>
                </form>
                <p className="mt-3 text-center text-[11px] text-neutral-500">
                  Already registered?{" "}
                  <Link href="/portal?tab=login" className="font-bold text-neutral-900 underline underline-offset-2">
                    Sign in
                  </Link>{" "}
                  · <Link href="/pricing" className="font-bold text-neutral-900 underline underline-offset-2">7.5% Earnings</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Buff Motion style Infinite Marquee Ticker (7.5%) */}
        <section className="border-b border-white/10 bg-black py-6 sm:py-8 overflow-hidden select-none">
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
            2. 4 VALUE PILLARS (WHITE HIGH-CONTRAST CARD FROM MOCKUP)
           ========================================================================= */}
        <section className="py-20 md:py-28 bg-black">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="rounded-3xl bg-white text-neutral-900 p-10 md:p-14 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center">
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
            3. OUR PRODUCTS & SERVICES (WEARECHECK HORIZONTAL CAROUSEL FROM MOCKUP)
           ========================================================================= */}
        <section id="products" className="py-24 md:py-36 bg-white text-neutral-900 border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight">
                  Our Products &amp; Services
                </h2>
                <p className="text-base text-neutral-600 mt-2">
                  Promote a wide range of identity and card solutions
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollProducts("left")}
                  aria-label="Scroll left"
                  className="h-12 w-12 rounded-full border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-950 hover:text-white flex items-center justify-center transition shadow-sm cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => scrollProducts("right")}
                  aria-label="Scroll right"
                  className="h-12 w-12 rounded-full border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-950 hover:text-white flex items-center justify-center transition shadow-sm cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Horizontal Product Track */}
            <div
              ref={productScrollRef}
              className="flex items-stretch gap-6 overflow-x-auto pb-6 scroll-smooth no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {showcaseProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="w-[270px] sm:w-[300px] shrink-0 rounded-2xl border border-neutral-200 bg-neutral-50 overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 group"
                >
                  <div className="h-52 bg-neutral-900 overflow-hidden relative">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-black/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wider">
                        {prod.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 bg-white border-t border-neutral-100 flex-1 flex flex-col justify-between">
                    <h3 className="font-bold text-base text-neutral-900 group-hover:text-[#B45309] transition">
                      {prod.name}
                    </h3>
                    <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                      <span className="font-bold text-emerald-700">7.5% Commission</span>
                      <Link
                        href="/portal?tab=register"
                        className="text-neutral-900 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        Refer <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
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
          className="py-28 md:py-40 bg-[#0C0C0E] text-white border-b border-white/10 relative overflow-hidden"
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
        <section className="py-28 md:py-40 bg-white text-neutral-900 border-b border-neutral-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-10 sm:p-16 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
        <section className="py-28 md:py-40 bg-black text-white border-b border-white/10">
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
        <section className="bg-black py-20 md:py-28 px-4 sm:px-6">
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
