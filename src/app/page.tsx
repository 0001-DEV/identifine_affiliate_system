"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MarketingNav } from "@/components/MarketingNav";
import { MarketingFooter } from "@/components/MarketingFooter";
import { SitePreloader } from "@/components/SitePreloader";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Users,
  Award,
  Zap,
  Building2,
  Layers,
  DollarSign,
  Lock,
  Star,
  Check,
  Copy,
  Briefcase,
  Crown,
  Share2,
  Eye,
  Sliders,
  ChevronRight,
  CreditCard,
  FileCheck,
} from "lucide-react";

export default function ImpactPartnerHomePage() {
  const router = useRouter();

  // 1. Hero Live Referral Calculator state (7.5% flat cash commission)
  const [heroReferrals, setHeroReferrals] = useState<number>(6);
  const [heroName, setHeroName] = useState("");
  const [heroEmail, setHeroEmail] = useState("");
  const [heroPhone, setHeroPhone] = useState("");
  const [heroReferralCode, setHeroReferralCode] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  // 7.5% commission on average ₦250k order = ₦18,750 per referral
  const heroEstimatedCommission = Math.round(heroReferrals * 250000 * 0.075);

  const handleHeroSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      tab: "register",
      name: heroName,
      email: heroEmail,
      phone: heroPhone,
      ...(heroReferralCode.trim()
        ? { code: heroReferralCode.trim().toLowerCase() }
        : {}),
    });
    router.push(`/portal?${params.toString()}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://identifine.com/partner/XTREME-842");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // 2. Impact.com Signature Audience Segment Switcher Tabs
  const [activeAudience, setActiveAudience] = useState<"corporate" | "creators" | "clubs" | "agencies">("corporate");

  const audienceData = {
    corporate: {
      title: "Corporate & Enterprise Partners",
      subtitle: "Equip modern enterprises with encrypted RFID credentials & executive staff badges.",
      badge: "Enterprise Scale",
      description: "Scale recurring commissions by introducing corporate identity suites, encrypted facility access passes, and NFC business cards to high-growth organizations and banks.",
      benefits: [
        "High average order value (₦500k – ₦5M+ per corporate batch)",
        "Automated 7.5% cash commission paid directly via Paystack",
        "Zero inventory required — 100% fulfilled by Identifine & Xtreme Cardz",
        "Dedicated corporate onboarding manager & custom client digital mockups",
      ],
      previewTag: "Batch Enterprise Package",
      previewTitle: "Corporate ID & NFC Access Suite",
      previewPayout: "₦187,500 – ₦375,000",
      previewNote: "Avg. monthly payout based on 2-3 corporate company rollouts",
      image: "/images/products/corporate-id-system.webp",
    },
    creators: {
      title: "Creators, Executives & Affiliates",
      subtitle: "Promote ultra-luxurious 24K mirror gold and laser-engraved metal smart cards.",
      badge: "Creator Economy",
      description: "Turn your social network, WhatsApp contacts, and business meetings into cash. Hand out an authentic metal card, let clients tap with their phones, and earn instantly when they order.",
      benefits: [
        "Instant visual appeal: 24K mirror finish, heavy titanium, & matte black",
        "Viral tap-and-share contact sharing demo sells itself in seconds",
        "Unique affiliate tracking link & branded promo code (e.g., JOSHUA-842)",
        "Minimum bank withdrawal of ₦50,000 with same-day settlement",
      ],
      previewTag: "Luxury Executive Line",
      previewTitle: "24K Gold Mirror & Titanium Smart Cards",
      previewPayout: "₦75,000 – ₦225,000",
      previewNote: "Avg. monthly payout based on 5-12 direct card referrals",
      image: "/images/products/gold-mirror-metal.webp",
    },
    clubs: {
      title: "Private VIP Clubs & Venues",
      subtitle: "Digitize member access with encrypted RFID passes and dynamic VIP credentials.",
      badge: "Hospitality & Venues",
      description: "Partner with luxury private lounges, members clubs, golf resorts, and residential estates. Introduce seamless encrypted door access cards and premium member credentials.",
      benefits: [
        "Annual and seasonal membership card re-orders create recurring income",
        "Encrypted RFID + digital vCard dynamic QR multi-chip technology",
        "Pre-configured reader compatibility across leading access control locks",
        "Transparent real-time partner attribution inside your partner portal",
      ],
      previewTag: "Encrypted Venue Solution",
      previewTitle: "RFID VIP & Membership Access Cards",
      previewPayout: "₦150,000 – ₦450,000",
      previewNote: "Avg. payout per 150-500 private club member cards",
      image: "/images/products/identifine-rfid-suite.webp",
    },
    agencies: {
      title: "Agencies, Consultants & Resellers",
      subtitle: "Offer branded smart identity solutions to your existing corporate client roster.",
      badge: "Agency Resellers",
      description: "Add high-margin smart card and identity solutions to your creative, PR, or IT agency services. Provide turnkey physical credentials to executives and brand launches without manufacturing overhead.",
      benefits: [
        "White-glove priority manufacturing and rapid delivery across Nigeria",
        "Client branding, laser logo engraving, and customized NFC chips",
        "Volume partner bonuses and tiered revenue sharing",
        "Instant Paystack payout automation straight to your agency account",
      ],
      previewTag: "Agency Enterprise License",
      previewTitle: "De-Titan 3-in-1 Hybrid Credentials",
      previewPayout: "₦300,000 – ₦1,200,000",
      previewNote: "Avg. agency partner commission on ongoing corporate accounts",
      image: "/images/products/de-titan-3in1.webp",
    },
  };

  // 3. Products Catalog
  const showcaseProducts = [
    {
      id: "de-titan",
      name: "De-Titan Smart Cards",
      image: "/images/products/de-titan-3in1.webp",
      tag: "Smart Badge",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      description:
        "Titanium-reinforced 3-in-1 hybrid credentials designed for executive identification, contactless NFC networking, and corporate access control.",
      commission: "₦18,750 / referral",
    },
    {
      id: "du-plex",
      name: "Du-Plex 24K Gold Mirror",
      image: "/images/products/gold-mirror-metal.webp",
      tag: "Dual NFC",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      description:
        "Dual-chip 24K mirror gold metal cards combining digital NFC contact sharing with door access RFID encryption.",
      commission: "₦22,500 / referral",
    },
    {
      id: "corporate-id",
      name: "Corporate ID Access Systems",
      image: "/images/products/corporate-id-system.webp",
      tag: "Enterprise",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      description:
        "Enterprise smart identification badges engineered for modern corporate organizations and secure staff tracking.",
      commission: "₦37,500 / batch",
    },
    {
      id: "business-cards",
      name: "Black Matte Laser Titanium",
      image: "/images/products/black-matte-metal.webp",
      tag: "Laser Metal",
      badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
      description:
        "Laser-engraved matte black metal cards designed to leave an unforgettable impression with every instant NFC tap.",
      commission: "₦18,750 / referral",
    },
    {
      id: "access-membership",
      name: "RFID VIP Membership Suites",
      image: "/images/products/identifine-rfid-suite.webp",
      tag: "RFID + Door",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      description:
        "Encrypted RFID credentials tailored for luxury private clubs, VIP lounges, gyms, and gated corporate campuses.",
      commission: "₦30,000 / batch",
    },
    {
      id: "digital-qr",
      name: "Digital Identity & Cloud vCard",
      image: "/images/products/identifine-smart-id.webp",
      tag: "Cloud vCard",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      description:
        "Dynamic cloud-powered digital vCards and encrypted QR solutions for real-time contact sharing without requiring an app.",
      commission: "₦15,000 / referral",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-[#FF5B37] selection:text-white font-sans antialiased">
      <SitePreloader />
      <MarketingNav />

      <main className="flex-1">
        {/* =========================================================================
            1. IMPACT.COM HERO SECTION (HIGH CONVERSION DUAL COLUMN)
           ========================================================================= */}
        <section
          id="hero"
          className="relative w-full bg-[#0B132B] text-white py-16 sm:py-24 lg:py-28 overflow-hidden border-b border-white/10"
        >
          {/* Impact-style Ambient Violet/Blue Radial Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-500/15 via-[#FF5B37]/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-[600px] h-[400px] bg-gradient-to-tl from-[#FF5B37]/15 to-transparent blur-3xl pointer-events-none" />

          {/* Micro Grid Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              {/* Left Column: Impact.com Display Copy & CTAs */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                {/* Pre-headline Pill Badge */}
                <div className="inline-flex items-center gap-2.5 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur-md">
                  <span className="flex h-2 w-2 rounded-full bg-[#FF5B37] animate-pulse" />
                  <span>The #1 Partnership Cloud for Smart Cards &amp; Identity</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
                  Transform Card Partnerships into Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#FF5B37]">
                    #1 Growth Engine
                  </span>
                </h1>

                {/* Subheadline */}
                <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                  Promote 24K gold mirror smart cards, laser-engraved titanium credentials, and enterprise RFID identity suites. Earn automated <strong className="text-white font-bold">7.5% recurring cash commissions</strong> with zero inventory and instant Paystack settlements.
                </p>

                {/* Dual Action CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
                  <Link
                    href="/portal?tab=register"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5B37] hover:bg-[#E04824] text-white px-8 py-4 text-sm font-extrabold shadow-xl shadow-orange-500/25 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    <span>Become a Partner</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white px-7 py-4 text-sm font-bold backdrop-blur-md transition-all duration-200 hover:border-white/30"
                  >
                    <span>Explore 7.5% Earnings</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </div>

                {/* Social Proof Text directly below CTA */}
                <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center -space-x-2">
                    <div className="h-7 w-7 rounded-full bg-indigo-600 border-2 border-[#0B132B] flex items-center justify-center text-[10px] font-bold text-white">IC</div>
                    <div className="h-7 w-7 rounded-full bg-amber-600 border-2 border-[#0B132B] flex items-center justify-center text-[10px] font-bold text-white">XC</div>
                    <div className="h-7 w-7 rounded-full bg-emerald-600 border-2 border-[#0B132B] flex items-center justify-center text-[10px] font-bold text-white">VIP</div>
                  </div>
                  <span>Trusted by 2,500+ corporate leaders, VIP venues &amp; affiliates across Nigeria.</span>
                </div>
              </div>

              {/* Right Column: Impact.com Floating Partnership Console Mockup */}
              <div className="lg:col-span-5 relative">
                {/* Glowing Backdrop */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#FF5B37]/20 to-indigo-500/20 blur-2xl pointer-events-none" />

                <div className="relative rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
                  {/* Console Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Identifine Partnership Cloud
                      </span>
                    </div>
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-orange-50 text-[#FF5B37] border border-orange-200">
                      7.5% Payout Active
                    </span>
                  </div>

                  {/* 1-Click Referral Link Box */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>Your Unique Partner Link</span>
                      <span className="text-[11px] text-emerald-600 font-bold">Auto-Attributed</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                      <span className="truncate">identifine.com/partner/XTREME-842</span>
                      <button
                        onClick={handleCopyLink}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FF5B37] hover:text-[#E04824] shrink-0 cursor-pointer"
                        title="Copy link"
                      >
                        {copiedLink ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Interactive Monthly Revenue Simulator Slider */}
                  <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-orange-50/30 border border-slate-200 p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-semibold">
                        Monthly Referrals: <strong className="font-mono text-slate-900 text-sm">{heroReferrals} client{heroReferrals > 1 ? "s" : ""}</strong>
                      </span>
                      <div className="text-right">
                        <span className="text-[10px] block text-slate-500 uppercase tracking-wider font-semibold">Estimated Payout</span>
                        <span className="text-xl font-black text-[#FF5B37] font-mono tracking-tight">
                          ₦{heroEstimatedCommission.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={40}
                      value={heroReferrals}
                      onChange={(e) => setHeroReferrals(Number(e.target.value))}
                      className="w-full accent-[#FF5B37] cursor-pointer"
                      aria-label="Monthly referral simulator"
                    />
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>1 Referral (₦18,750)</span>
                      <span>40 Referrals (₦750,000)</span>
                    </div>
                  </div>

                  {/* Quick-Start Form */}
                  <form onSubmit={handleHeroSignup} className="space-y-2.5">
                    <input
                      required
                      value={heroName}
                      onChange={(e) => setHeroName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none focus:border-[#FF5B37] focus:bg-white focus:ring-2 focus:ring-orange-500/10 transition"
                    />
                    <input
                      required
                      type="email"
                      value={heroEmail}
                      onChange={(e) => setHeroEmail(e.target.value)}
                      placeholder="Corporate or Business Email"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none focus:border-[#FF5B37] focus:bg-white focus:ring-2 focus:ring-orange-500/10 transition"
                    />
                    <input
                      required
                      type="tel"
                      value={heroPhone}
                      onChange={(e) => setHeroPhone(e.target.value)}
                      placeholder="WhatsApp / Phone Number"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none focus:border-[#FF5B37] focus:bg-white focus:ring-2 focus:ring-orange-500/10 transition"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-[#FF5B37] hover:bg-[#E04824] text-white font-extrabold py-3 text-xs shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Create Free Partner Account</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  {/* Security Guarantees */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500" /> Paystack Instant
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> 7.5% Flat Rate
                    </span>
                    <span className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-indigo-500" /> Zero Inventory
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. IMPACT.COM SECTION 1: TRUST MARQUEE & ENTERPRISE BADGES
           ========================================================================= */}
        <section className="py-8 bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 text-center md:text-left">
                Trusted by Top Corporate Firms, VIP Venues &amp; Private Networks:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 font-extrabold text-xs sm:text-sm tracking-wider uppercase">
                <span className="hover:text-slate-800 transition">Access Corporate</span>
                <span className="hover:text-slate-800 transition">Transcorp VIP</span>
                <span className="hover:text-slate-800 transition">Eko Suites</span>
                <span className="hover:text-slate-800 transition">Prime Capital</span>
                <span className="hover:text-slate-800 transition">Genesis Group</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. IMPACT.COM SECTION 2: INTERACTIVE AUDIENCE SWITCHER (HALLMARK FEATURE)
           ========================================================================= */}
        <section id="solutions" className="py-20 lg:py-28 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF5B37] text-xs font-bold uppercase tracking-wider">
                Tailored Solutions
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                Built for Every Type of Partner
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-normal">
                Whether you connect corporate enterprises, private clubs, or executive clients, our platform provides turnkey smart card monetization.
              </p>
            </div>

            {/* 4 Interactive Segment Tabs (Impact.com Style) */}
            <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 max-w-4xl mx-auto mb-12 overflow-x-auto">
              <button
                onClick={() => setActiveAudience("corporate")}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                  activeAudience === "corporate"
                    ? "bg-white text-slate-900 shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Building2 className="w-4 h-4 text-[#FF5B37]" />
                <span>Corporate &amp; Enterprise</span>
              </button>

              <button
                onClick={() => setActiveAudience("creators")}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                  activeAudience === "creators"
                    ? "bg-white text-slate-900 shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-500" />
                <span>Affiliates &amp; Creators</span>
              </button>

              <button
                onClick={() => setActiveAudience("clubs")}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                  activeAudience === "clubs"
                    ? "bg-white text-slate-900 shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Crown className="w-4 h-4 text-indigo-500" />
                <span>Private Clubs &amp; VIP Venues</span>
              </button>

              <button
                onClick={() => setActiveAudience("agencies")}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                  activeAudience === "agencies"
                    ? "bg-white text-slate-900 shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Briefcase className="w-4 h-4 text-emerald-500" />
                <span>Agencies &amp; Resellers</span>
              </button>
            </div>

            {/* Dynamic Audience Detail Split Card */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-8 sm:p-12 lg:p-14 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left Detail Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
                    {audienceData[activeAudience].badge}
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {audienceData[activeAudience].title}
                  </h3>

                  <p className="text-base text-slate-600 leading-relaxed font-normal">
                    {audienceData[activeAudience].description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {audienceData[activeAudience].benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 leading-snug">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      href="/portal?tab=register"
                      className="inline-flex items-center gap-2 rounded-full bg-[#FF5B37] hover:bg-[#E04824] text-white px-7 py-3 text-xs font-bold shadow-md transition"
                    >
                      <span>Join as a Partner</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/pricing"
                      className="text-xs font-bold text-slate-700 hover:text-slate-900 transition flex items-center gap-1"
                    >
                      <span>View commission schedule</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Interactive Preview Card */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-white border border-slate-200 shadow-xl p-6 sm:p-7 space-y-5">
                    <div className="relative h-56 sm:h-64 rounded-xl bg-slate-900 overflow-hidden">
                      <img
                        src={audienceData[activeAudience].image}
                        alt={audienceData[activeAudience].previewTitle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-900 shadow">
                        {audienceData[activeAudience].previewTag}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-extrabold text-lg text-slate-900">
                        {audienceData[activeAudience].previewTitle}
                      </h4>
                      <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-600">Expected Commission:</span>
                        <span className="text-base font-black text-[#FF5B37] font-mono">
                          {audienceData[activeAudience].previewPayout}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 italic">
                        {audienceData[activeAudience].previewNote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. IMPACT.COM SECTION 3: THE 5-STAGE PARTNERSHIP LIFECYCLE
           ========================================================================= */}
        <section id="lifecycle" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                Full-Funnel Management
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                The 5-Stage Partnership Lifecycle
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-normal">
                Everything you need to recruit, track, and monetize smart credentials from initiation to instant payout.
              </p>
            </div>

            {/* 5 Impact-style Framework Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Stage 1 */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-6 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between border-t-4 border-t-[#FF5B37]">
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-orange-50 text-[#FF5B37] font-extrabold flex items-center justify-center text-sm">
                    01
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Discover &amp; Recruit
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Generate your custom link or promo code. Share digital card catalogs with corporate procurement and executive contacts.
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-bold text-[#FF5B37]">
                  Instant Setup &rarr;
                </div>
              </div>

              {/* Stage 2 */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-6 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between border-t-4 border-t-indigo-500">
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 font-extrabold flex items-center justify-center text-sm">
                    02
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Contract &amp; Pay
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Fixed 7.5% flat cash commission on every qualifying card order. Automated Paystack settlement with zero hidden fees.
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-bold text-indigo-600">
                  7.5% Guaranteed &rarr;
                </div>
              </div>

              {/* Stage 3 */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-6 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between border-t-4 border-t-emerald-500">
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 font-extrabold flex items-center justify-center text-sm">
                    03
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Track &amp; Attribute
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Real-time link click attribution, invoice status tracking, and multi-device order logging inside your partner portal.
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-bold text-emerald-600">
                  Live Attribution &rarr;
                </div>
              </div>

              {/* Stage 4 */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-6 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between border-t-4 border-t-blue-500">
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 font-extrabold flex items-center justify-center text-sm">
                    04
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Engage &amp; Scale
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Access digital marketing kits, NFC tap demo scripts, and volume re-order bonuses for recurring corporate renewals.
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-bold text-blue-600">
                  Partner Toolkit &rarr;
                </div>
              </div>

              {/* Stage 5 */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-6 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between border-t-4 border-t-purple-500">
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 font-extrabold flex items-center justify-center text-sm">
                    05
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Protect &amp; Verify
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Bank-grade encrypted NFC chips, authenticated 24K mirror metals, and certified RFID credentials protected from spoofing.
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-bold text-purple-600">
                  Hardware Security &rarr;
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. IMPACT.COM SECTION 4: ENTERPRISE DATA & SCALE METRICS (DARK BLOCK)
           ========================================================================= */}
        <section className="py-20 lg:py-24 bg-[#0B132B] text-white border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.12),transparent_70%)] pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
              {/* Stat 1 */}
              <div className="space-y-2 p-4">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#FF5B37] font-mono tracking-tight">
                  ₦250M+
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-300">
                  Card Volume Tracked
                </div>
                <div className="text-[11px] text-slate-500">
                  Across enterprise &amp; luxury orders
                </div>
              </div>

              {/* Stat 2 */}
              <div className="space-y-2 p-4">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-400 font-mono tracking-tight">
                  7.5%
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-300">
                  Flat Cash Commission
                </div>
                <div className="text-[11px] text-slate-500">
                  Transparent recurring earnings
                </div>
              </div>

              {/* Stat 3 */}
              <div className="space-y-2 p-4">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-emerald-400 font-mono tracking-tight">
                  ₦50,000
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-300">
                  Min. Bank Withdrawal
                </div>
                <div className="text-[11px] text-slate-500">
                  Accessible threshold for all partners
                </div>
              </div>

              {/* Stat 4 */}
              <div className="space-y-2 p-4">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-400 font-mono tracking-tight">
                  Instant
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-300">
                  Paystack Settlement
                </div>
                <div className="text-[11px] text-slate-500">
                  Direct credit to Nigerian bank accounts
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. IMPACT.COM SECTION 5: CARD PRODUCTS & SOLUTIONS (ELEVATED CARDS)
           ========================================================================= */}
        <section id="products" className="py-20 lg:py-28 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
                  Product Suite
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                  High-Converting Card Solutions
                </h2>
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal">
                  Promote verified hardware credentials engineered for executives, private venues, and corporate enterprises.
                </p>
              </div>

              <Link
                href="/portal?tab=register"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 px-6 py-3 text-xs font-bold transition shadow-sm shrink-0"
              >
                <span>View All Products in Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 6 Elevated Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {showcaseProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Image Box */}
                    <div className="relative h-60 w-full bg-slate-900 overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${prod.badgeColor}`}>
                        {prod.tag}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pt-2 space-y-2.5">
                      <h3 className="font-black text-xl text-slate-900 tracking-tight">
                        {prod.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {prod.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] block text-slate-400 uppercase font-semibold">Your Earning</span>
                      <span className="font-mono font-bold text-xs sm:text-sm text-emerald-700">
                        {prod.commission}
                      </span>
                    </div>

                    <Link
                      href={`/portal?tab=register&product=${prod.id}`}
                      className="rounded-full bg-slate-900 hover:bg-[#FF5B37] text-white px-5 py-2 text-xs font-bold transition shadow"
                    >
                      Refer Card &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. IMPACT.COM SECTION 6: QUANTIFIED PARTNER CASE STUDY
           ========================================================================= */}
        <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 lg:p-16 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left: Testimonial & Pull Quote */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-500" />
                    ))}
                  </div>

                  <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-snug tracking-tight">
                    &ldquo;Partnering with Identifine and Xtreme Cardz allowed us to introduce luxury smart cards to our corporate clients. The 7.5% cash commission is credited seamlessly via Paystack without managing any inventory.&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="h-12 w-12 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
                      TA
                    </div>
                    <div>
                      <div className="font-extrabold text-base text-slate-900">
                        Tunde Adeleke
                      </div>
                      <div className="text-xs text-slate-500">
                        Managing Partner, Vanguard Executive Consulting
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Quantified Results Cards (Impact.com Hallmark) */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-1">
                    <div className="text-2xl sm:text-3xl font-black text-[#FF5B37] font-mono">
                      +340%
                    </div>
                    <div className="text-xs font-bold text-slate-800">
                      Annual Partner Revenue Growth
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Generated via corporate batch re-orders
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-1">
                    <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
                      ₦850,000+
                    </div>
                    <div className="text-xs font-bold text-slate-800">
                      Average Monthly Commission
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Paid out automatically on qualifying orders
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-1">
                    <div className="text-2xl sm:text-3xl font-black text-indigo-600 font-mono">
                      100%
                    </div>
                    <div className="text-xs font-bold text-slate-800">
                      On-Time Paystack Settlements
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Direct deposit to Nigerian bank accounts
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. IMPACT.COM SECTION 7: HIGH-CONVERSION PRE-FOOTER CTA BANNER
           ========================================================================= */}
        <section className="py-20 lg:py-24 bg-white px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#0F172A] to-[#1E293B] border border-white/10 p-10 sm:p-14 lg:p-16 text-white text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
              <div className="space-y-4 max-w-2xl relative z-10">
                <div className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-orange-400 text-xs font-bold uppercase tracking-wider">
                  Start Monetizing Your Network
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Ready to Accelerate Your Revenue with Modern Partnerships?
                </h3>
                <p className="text-base text-slate-300 font-normal">
                  Join hundreds of top professionals, private venue directors, and creators earning 7.5% recurring cash commissions with Identifine &amp; Xtreme Cardz.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 relative z-10 w-full sm:w-auto">
                <Link
                  href="/portal?tab=register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5B37] hover:bg-[#E04824] text-white px-8 py-4 text-sm font-extrabold shadow-xl shadow-orange-500/25 transition hover:scale-105"
                >
                  <span>Become an Affiliate</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white px-7 py-4 text-sm font-bold backdrop-blur-md transition"
                >
                  <span>Calculate Earnings</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
