"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Rocket,
  Diamond,
  Handshake,
  UserPlus,
  Link as LinkIcon,
  Wallet,
  Star,
} from "lucide-react";

export default function MarketingHomePage() {
  // Hero Carousel Card Images (Concept 10 Split Screen)
  const heroCardImages = [
    {
      id: "gold-metal",
      title: "VIP 24K Brushed Gold Metal NFC Suite",
      image: "/images/products/gold-mirror-metal.webp",
    },
    {
      id: "black-matte",
      title: "Black Matte Stealth Metal NFC Card",
      image: "/images/products/black-matte-metal.webp",
    },
    {
      id: "corporate-pack",
      title: "Corporate Enterprise Identity Rollout",
      image: "/images/products/corporate-id-system.webp",
    },
    {
      id: "luxury-unboxing",
      title: "Handcrafted Luxury Presentation Suite",
      image: "/images/products/luxury-unboxing.webp",
    },
    {
      id: "gunmetal-titanium",
      title: "Gunmetal Titanium Smart NFC Card",
      image: "/images/products/gunmetal-titanium.webp",
    },
    {
      id: "elite-gold",
      title: "Elite Pass 24K Gold VIP Card",
      image: "/images/products/elite-pass-gold.webp",
    },
    {
      id: "elite-black",
      title: "Elite Pass Black Matte Executive Card",
      image: "/images/products/elite-pass-black.webp",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroCardImages.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, heroCardImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroCardImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroCardImages.length) % heroCardImages.length);
  };

  // Hero split-screen onboarding panel state
  const router = useRouter();
  const [heroReferrals, setHeroReferrals] = useState(6);
  const [heroName, setHeroName] = useState("");
  const [heroEmail, setHeroEmail] = useState("");
  const [heroPhone, setHeroPhone] = useState("");

  // 3D Card Interactive Tilt & Specular Light (Residence / Buff Motion style)
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0, active: false });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ x: x * 12, y: -y * 12, active: true });
  };

  const handleCardMouseLeave = () => {
    setIsPaused(false);
    setCardTilt({ x: 0, y: 0, active: false });
  };

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
      <MarketingNav />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO SECTION: CONCEPT 10 — 50/50 SPLIT SCREEN
               Left: full-height card photo carousel with 3D tilt | Right: instant affiliate onboarding
           ========================================================================= */}
        <section className="relative grid lg:grid-cols-2 w-full lg:min-h-[calc(100vh-64px)] border-b border-white/10">
          {/* ---------- LEFT: Product Carousel with 3D Tilt ---------- */}
          <div
            className="relative h-[460px] sm:h-[560px] lg:h-auto overflow-hidden bg-black select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            {heroCardImages.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <div
                  className={`w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300 ${
                    index === currentSlide ? "animate-ken-burns" : ""
                  }`}
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    transform: cardTilt.active
                      ? `perspective(1000px) rotateY(${cardTilt.x}deg) rotateX(${cardTilt.y}deg) scale(1.03)`
                      : "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)",
                  }}
                />
                {/* Dynamic Specular Sheen Layer reacting to tilt */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: cardTilt.active
                      ? `radial-gradient(circle at ${50 + cardTilt.x * 3}% ${50 - cardTilt.y * 3}%, rgba(255,255,255,0.18) 0%, transparent 60%), linear-gradient(to top, rgba(0,0,0,0.85), transparent 45%, rgba(0,0,0,0.3))`
                      : "linear-gradient(to top, rgba(0,0,0,0.85), transparent 45%, rgba(0,0,0,0.3))",
                  }}
                />
              </div>
            ))}

            {/* Bottom controls: dots, counter + title, arrows */}
            <div className="absolute bottom-0 inset-x-0 z-30 px-6 sm:px-10 pb-8">
              <div className="flex justify-center gap-2 mb-5">
                {heroCardImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="h-11 w-11 shrink-0 rounded-full border border-white/30 bg-black/40 backdrop-blur text-white hover:bg-white hover:text-black flex items-center justify-center transition-magnetic"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div key={currentSlide} className="text-center text-sm sm:text-base text-white/90 font-medium animate-[slideUpFade_0.6s_ease-out]">
                  <span className="font-mono text-white/60">
                    {String(currentSlide + 1).padStart(2, "0")} / {String(heroCardImages.length).padStart(2, "0")}
                  </span>
                  <span className="mx-2 text-white/40">—</span>
                  {heroCardImages[currentSlide].title}
                </div>
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="h-11 w-11 shrink-0 rounded-full border border-white/30 bg-black/40 backdrop-blur text-white hover:bg-white hover:text-black flex items-center justify-center transition-magnetic"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* ---------- RIGHT: Affiliate Onboarding Panel ---------- */}
          <div className="relative bg-[#F8F9FA] text-neutral-900 flex items-center justify-center px-4 sm:px-8 py-12 lg:py-10">
            <div className="w-full max-w-[480px] rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.18)] border border-black/5 p-7 sm:p-9 animate-[slideUpFade_0.8s_ease-out]">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[11px] font-bold text-amber-800">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                Xtreme Cardz &amp; Identifine Affiliate Programme
              </div>

              {/* Residence style Masked Reveal Headline */}
              <div className="mt-4 overflow-hidden">
                <h1 className="animate-mask-rise text-3xl sm:text-[2.6rem] leading-[1.08] tracking-tight">
                  <span className="font-light block">Become an</span>
                  <span className="font-black block bg-gradient-to-r from-neutral-900 via-black to-neutral-800 bg-clip-text text-transparent">
                    Executive Partner
                  </span>
                </h1>
              </div>

              {/* Live earnings slider */}
              <div className="mt-6 rounded-2xl bg-neutral-50 border border-neutral-200 p-4 transition-magnetic">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">
                    Refer <b className="text-neutral-900 font-mono text-base">{heroReferrals}</b> client{heroReferrals > 1 ? "s" : ""}/month
                  </span>
                  <span className="font-black text-xl text-[#B45309] font-mono tracking-tight">
                    ₦{(heroReferrals * 25000).toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={40}
                  value={heroReferrals}
                  onChange={(e) => setHeroReferrals(Number(e.target.value))}
                  className="mt-3 w-full accent-[#F59E0B] cursor-pointer"
                  aria-label="Number of referrals per month"
                />
                <p className="mt-1 text-[11px] text-neutral-500">
                  Based on an average ₦25,000 commission (10% of a ₦250,000 executive order).
                </p>
              </div>

              {/* Guarantees */}
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-neutral-50 transition">
                  <Zap className="w-5 h-5 text-[#F59E0B]" />
                  <span className="text-[12px] font-semibold leading-tight">Instant Paystack<br />Settlement</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-neutral-50 transition">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <span className="text-[12px] font-semibold leading-tight">10% Cash<br />Commission</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-neutral-50 transition">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <span className="text-[12px] font-semibold leading-tight">Zero<br />Inventory</span>
                </div>
              </div>

              {/* Quick start form -> continues on /portal register */}
              <form onSubmit={handleHeroSignup} className="mt-6 space-y-3">
                <input
                  required
                  value={heroName}
                  onChange={(e) => setHeroName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
                />
                <input
                  required
                  type="email"
                  value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
                />
                <input
                  required
                  type="tel"
                  value={heroPhone}
                  onChange={(e) => setHeroPhone(e.target.value)}
                  placeholder="Phone / WhatsApp Number"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
                />
                <button
                  type="submit"
                  className="group w-full rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold py-3.5 shadow-md hover:shadow-xl transition-magnetic flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Activate Affiliate Link</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 duration-300" />
                </button>
              </form>
              <p className="mt-4 text-center text-xs text-neutral-500">
                Already a partner?{" "}
                <Link href="/portal?tab=login" className="font-semibold text-neutral-900 underline underline-offset-2">
                  Sign in
                </Link>{" "}
                · <Link href="/pricing" className="font-semibold text-neutral-900 underline underline-offset-2">See earnings</Link>
              </p>
            </div>
          </div>
        </section>

        {/* Buff Motion style Infinite Marquee Ticker */}
        <section className="border-b border-white/10 bg-black py-4 overflow-hidden select-none">
          <div className="animate-ticker flex items-center gap-8 text-xs font-bold tracking-widest text-white/80 uppercase">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-8 shrink-0">
                <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> 10% Flat Cash Commission</span>
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
        <section className="py-8 bg-black">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="rounded-3xl bg-white text-neutral-900 p-8 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center">
              <div className="flex flex-col items-center gap-2 p-2 group">
                <div className="h-12 w-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-[#F59E0B] group-hover:text-black transition">
                  <Handshake className="w-6 h-6" />
                </div>
                <div className="font-extrabold text-sm sm:text-base text-neutral-900">
                  Trusted Brands
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 p-2 group">
                <div className="h-12 w-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-[#F59E0B] group-hover:text-black transition">
                  <Diamond className="w-6 h-6" />
                </div>
                <div className="font-extrabold text-sm sm:text-base text-neutral-900">
                  Premium Quality
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 p-2 group">
                <div className="h-12 w-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-[#F59E0B] group-hover:text-black transition">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="font-extrabold text-sm sm:text-base text-neutral-900">
                  Growing Demand
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 p-2 group">
                <div className="h-12 w-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-[#F59E0B] group-hover:text-black transition">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="font-extrabold text-sm sm:text-base text-neutral-900">
                  Earn with Confidence
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. OUR PRODUCTS & SERVICES (WEARECHECK HORIZONTAL CAROUSEL FROM MOCKUP)
           ========================================================================= */}
        <section id="products" className="py-16 md:py-24 bg-white text-neutral-900 border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
                  Our Products &amp; Services
                </h2>
                <p className="text-sm text-neutral-600 mt-1">
                  Promote a wide range of identity and card solutions
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollProducts("left")}
                  aria-label="Scroll left"
                  className="h-10 w-10 rounded-full border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-950 hover:text-white flex items-center justify-center transition shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollProducts("right")}
                  aria-label="Scroll right"
                  className="h-10 w-10 rounded-full border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-950 hover:text-white flex items-center justify-center transition shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Horizontal Product Track */}
            <div
              ref={productScrollRef}
              className="flex items-stretch gap-5 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {showcaseProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="w-[240px] sm:w-[260px] shrink-0 rounded-2xl border border-neutral-200 bg-neutral-50 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all hover:-translate-y-1 duration-300 group"
                >
                  <div className="h-44 bg-neutral-900 overflow-hidden relative">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="rounded-full bg-black/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                        {prod.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-white border-t border-neutral-100 flex-1 flex flex-col justify-between">
                    <h3 className="font-bold text-sm text-neutral-900 group-hover:text-[#B45309] transition">
                      {prod.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
                      <span className="font-semibold text-emerald-700">10% Commission</span>
                      <Link
                        href="/portal?tab=register"
                        className="text-neutral-900 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        Refer <ArrowRight className="w-3 h-3" />
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
          className="py-20 md:py-28 bg-[#0C0C0E] text-white border-b border-white/10 relative overflow-hidden"
        >
          {/* Ambient Gold Waves */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#F59E0B]/15 to-transparent blur-3xl pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
            <div className="text-center space-y-2 mb-16">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                How It Works
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 font-medium">
                Join. Refer. Earn. It&apos;s that simple!
              </p>
            </div>

            {/* 5 Steps connected with arrows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
              {/* Step 1 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center space-y-3 hover:border-[#F59E0B]/50 transition group">
                <div className="h-12 w-12 rounded-full bg-[#F59E0B] text-black font-black text-base flex items-center justify-center mx-auto shadow-lg shadow-[#F59E0B]/25">
                  1
                </div>
                <h3 className="font-extrabold text-base text-white">Register</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Create your free affiliate account
                </p>
              </div>

              {/* Step 2 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center space-y-3 hover:border-[#F59E0B]/50 transition group">
                <div className="h-12 w-12 rounded-full bg-[#F59E0B] text-black font-black text-base flex items-center justify-center mx-auto shadow-lg shadow-[#F59E0B]/25">
                  2
                </div>
                <h3 className="font-extrabold text-base text-white">Get Your Link</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Receive a unique referral link
                </p>
              </div>

              {/* Step 3 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center space-y-3 hover:border-[#F59E0B]/50 transition group">
                <div className="h-12 w-12 rounded-full bg-[#F59E0B] text-black font-black text-base flex items-center justify-center mx-auto shadow-lg shadow-[#F59E0B]/25">
                  3
                </div>
                <h3 className="font-extrabold text-base text-white">Refer Business</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Share with businesses and contacts
                </p>
              </div>

              {/* Step 4 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center space-y-3 hover:border-[#F59E0B]/50 transition group">
                <div className="h-12 w-12 rounded-full bg-[#F59E0B] text-black font-black text-base flex items-center justify-center mx-auto shadow-lg shadow-[#F59E0B]/25">
                  4
                </div>
                <h3 className="font-extrabold text-base text-white">Earn Commission</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  When they purchase, you earn 10%
                </p>
              </div>

              {/* Step 5 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center space-y-3 hover:border-[#F59E0B]/50 transition group">
                <div className="h-12 w-12 rounded-full bg-[#F59E0B] text-black font-black text-base flex items-center justify-center mx-auto shadow-lg shadow-[#F59E0B]/25">
                  5
                </div>
                <h3 className="font-extrabold text-base text-white">Withdraw</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Request payout once eligible
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. YOUR EARNINGS AT A GLANCE (3D BAR CHART FROM MOCKUP)
           ========================================================================= */}
        <section className="py-20 bg-white text-neutral-900 border-b border-neutral-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 sm:p-12 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Left Graphic: 3D Gold Bar Chart */}
              <div className="relative flex items-center justify-center">
                <img
                  src="/images/products/earnings-bar-chart.png"
                  alt="10% Commission Chart"
                  className="max-h-[220px] w-auto object-contain drop-shadow-xl"
                />
              </div>

              {/* Right Content */}
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
                  Your Earnings at a Glance
                </h2>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Earn 10% commission on qualifying sales, with a minimum withdrawal of ₦50,000.
                </p>
                <div className="pt-2">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black px-7 py-3.5 text-sm font-extrabold transition shadow-md hover:scale-[1.02]"
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
            6. WHY BECOME AN AFFILIATE? (CHECKLIST & TESTIMONIAL FROM MOCKUP)
           ========================================================================= */}
        <section className="py-20 md:py-28 bg-black text-white border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Column: Why Become an Affiliate? */}
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Why Become an Affiliate?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shrink-0 font-black text-xs">
                      ✓
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-white">
                      Attractive 10% commission
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shrink-0 font-black text-xs">
                      ✓
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-white">
                      Trusted brands
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shrink-0 font-black text-xs">
                      ✓
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-white">
                      Easy sign-up &amp; tracking
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shrink-0 font-black text-xs">
                      ✓
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-white">
                      Flexible withdrawal options
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Testimonial & Smiling Affiliate */}
              <div className="relative rounded-3xl border border-white/15 bg-neutral-900/80 p-7 sm:p-9 shadow-2xl flex flex-col sm:flex-row items-center gap-6 overflow-hidden">
                <div className="space-y-4 flex-1">
                  <p className="text-sm sm:text-base italic text-neutral-200 leading-relaxed">
                    &ldquo;The Identifine Affiliate Programme is a great opportunity to earn while promoting world-class products.&rdquo;
                  </p>
                  <div>
                    <div className="flex items-center gap-1 text-[#F59E0B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                      ))}
                    </div>
                    <div className="text-xs text-neutral-400 font-medium mt-1">
                      Happy Affiliate
                    </div>
                  </div>
                </div>

                <div className="w-36 h-36 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
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
        <section className="bg-black py-10 px-4 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-2xl bg-gradient-to-r from-[#F59E0B] via-[#E5A826] to-[#D97706] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="flex items-center gap-4 text-neutral-950">
                <div className="h-12 w-12 rounded-full bg-black/15 flex items-center justify-center shrink-0">
                  <Rocket className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-black">
                    Ready to Start Earning?
                  </h3>
                  <p className="text-xs sm:text-sm text-black/80 font-medium">
                    Join the Identifine &amp; Xtreme Cardz Affiliate Programme today!
                  </p>
                </div>
              </div>

              <Link
                href="/portal?tab=register"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-black hover:bg-neutral-900 text-white px-8 py-3.5 text-xs font-black shadow-lg transition hover:scale-105"
              >
                <span>Become an Affiliate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
