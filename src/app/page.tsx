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

  // =========================================================================
  // PINNED HORIZONTAL SCROLL FOR HERO SECTION (PARTNER IMAGES MOVE ON SCROLL)
  // =========================================================================
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(1600);

  useEffect(() => {
    const updateMaxTranslate = () => {
      if (trackRef.current) {
        const fullWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setMaxTranslate(Math.max(0, fullWidth - viewportWidth + 80));
      }
    };

    updateMaxTranslate();
    window.addEventListener("resize", updateMaxTranslate);

    const handleScroll = () => {
      if (!heroSectionRef.current) return;
      const section = heroSectionRef.current;
      const rect = section.getBoundingClientRect();
      const totalScrollableDistance = section.offsetHeight - window.innerHeight;
      if (totalScrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
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

  // Clients We Have Worked With
  const clientsListRow1 = [
    {
      name: "Transcorp Hilton",
      category: "Luxury Hospitality",
      credential: "VIP Smart Passes",
      initial: "TH",
    },
    {
      name: "Access Holdings",
      category: "Corporate Banking",
      credential: "Executive Metal ID",
      initial: "AH",
    },
    {
      name: "Eko Hotels & Suites",
      category: "Hospitality & Events",
      credential: "RFID Access Suites",
      initial: "EH",
    },
    {
      name: "Zenith Bank Plc",
      category: "Private Wealth",
      credential: "24K Mirror Credentials",
      initial: "ZB",
    },
    {
      name: "Landmark Africa",
      category: "Real Estate & Venues",
      credential: "Smart Facility Passes",
      initial: "LA",
    },
    {
      name: "Paystack HQ",
      category: "Fintech Enterprise",
      credential: "Smart Staff Identity",
      initial: "PS",
    },
  ];

  const clientsListRow2 = [
    {
      name: "The George Lagos",
      category: "Boutique Hotel",
      credential: "Encrypted Room Cards",
      initial: "TG",
    },
    {
      name: "Radisson Blu",
      category: "Hotel & Conference",
      credential: "NFC Member Cards",
      initial: "RB",
    },
    {
      name: "Aluko & Oyebode",
      category: "Legal & Advisory",
      credential: "Titanium Partner Badges",
      initial: "AO",
    },
    {
      name: "PwC Nigeria",
      category: "Professional Services",
      credential: "Corporate Access Suite",
      initial: "PW",
    },
    {
      name: "Flutterwave",
      category: "Global Fintech",
      credential: "Smart Digital Credentials",
      initial: "FW",
    },
    {
      name: "Oriental Hotel",
      category: "Luxury Hospitality",
      credential: "VIP Keycards",
      initial: "OH",
    },
  ];

  // Showcase Products
  const [activeProductCard, setActiveProductCard] = useState<string | null>(null);

  const showcaseProducts = [
    {
      id: "de-titan",
      name: "De-Titan Smart Cards",
      image: "/images/products/de-titan-3in1.webp",
      tag: "Smart Badge",
      description:
        "Titanium-reinforced 3-in-1 hybrid credentials designed for executive identification, contactless NFC networking, and corporate access control.",
    },
    {
      id: "du-plex",
      name: "Du-Plex Smart Cards",
      image: "/images/products/gold-mirror-metal.webp",
      tag: "Dual NFC",
      description:
        "Dual-chip 24K mirror gold metal cards combining digital NFC contact sharing with door access RFID encryption.",
    },
    {
      id: "corporate-id",
      name: "Corporate ID Cards",
      image: "/images/products/corporate-id-system.webp",
      tag: "Enterprise",
      description:
        "Enterprise smart identification badges engineered for modern corporate organizations and secure staff tracking.",
    },
    {
      id: "business-cards",
      name: "Business Cards",
      image: "/images/products/black-matte-metal.webp",
      tag: "Laser Metal",
      description:
        "Laser-engraved matte black metal cards designed to leave an unforgettable impression with every instant NFC tap.",
    },
    {
      id: "access-membership",
      name: "Access & Membership Cards",
      image: "/images/products/identifine-rfid-suite.webp",
      tag: "RFID + Door",
      description:
        "Encrypted RFID credentials tailored for luxury private clubs, VIP lounges, gyms, and gated corporate campuses.",
    },
    {
      id: "digital-qr",
      name: "Digital Identity & QR Solutions",
      image: "/images/products/identifine-smart-id.webp",
      tag: "Cloud vCard",
      description:
        "Dynamic cloud-powered digital vCards and encrypted QR solutions for real-time contact sharing without requiring an app.",
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
      <SitePreloader />
      <MarketingNav />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO SECTION: TEXT ONLY (Increased headline height, reduced copy height)
           ========================================================================= */}
        <section id="hero" className="pt-24 sm:pt-32 pb-8 sm:pb-10 px-4 sm:px-6 bg-white">
          <div className="mx-auto max-w-5xl text-center space-y-5 sm:space-y-6">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[88px] xl:text-[96px] font-normal text-black tracking-tight leading-[1.05]">
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
                "people that can partner with us" placed directly with the images
           ========================================================================= */}
        <section
          ref={heroSectionRef}
          id="partners-scroll"
          className="relative w-full h-[280vh] bg-white border-b border-neutral-200"
        >
          {/* Sticky Viewport: Pins beneath header as user scrolls, animating cards horizontally */}
          <div className="sticky top-20 h-[calc(100vh-80px)] w-full flex flex-col justify-center overflow-hidden bg-white">
            {/* people that can partner with us: CENTER ALIGNED directly attached to images */}
            <div className="w-full text-center px-4 mb-3 sm:mb-4">
              <p className="text-sm sm:text-base text-gray-500 font-medium lowercase">
                people that can partner with us
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

              {/* Horizontal Scroll Progress Bar */}
              <div className="mx-auto max-w-xs mt-6 h-1 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-75 rounded-full"
                  style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            1C. OUR CLIENTS SECTION (Continuous Kinetic Marquee Animation)
                Positioned directly before Our Products & Services
           ========================================================================= */}
        <section id="clients" className="py-20 sm:py-24 bg-white border-b border-neutral-200 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 sm:mb-14 text-center">
            <span className="text-xs uppercase tracking-widest text-[#F59E0B] font-bold bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Trusted Partnerships
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight">
              Clients We Have Worked With
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-3 font-normal max-w-2xl mx-auto">
              Our encrypted smart credentials and 24K metal suites power identification, networking, and access for leading luxury brands, hotel establishments, and corporate enterprises.
            </p>
          </div>

          {/* Marquee Row 1: Sliding Left */}
          <div className="relative w-full overflow-hidden py-2">
            <div className="animate-ticker gap-4 sm:gap-6 flex items-center will-change-transform">
              {[...clientsListRow1, ...clientsListRow1].map((client, idx) => (
                <div
                  key={`${client.name}-${idx}`}
                  className="group relative flex items-center gap-4 px-6 py-4 rounded-2xl bg-neutral-50 hover:bg-black border border-neutral-200/90 hover:border-neutral-800 transition-all duration-300 shadow-sm hover:shadow-xl shrink-0 cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-black group-hover:bg-[#F59E0B] text-white group-hover:text-black font-black text-xs flex items-center justify-center transition-colors duration-300 shrink-0">
                    {client.initial}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-sm sm:text-base text-black group-hover:text-white transition-colors duration-300">
                      {client.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-neutral-500 group-hover:text-neutral-400 font-medium">
                        {client.category}
                      </span>
                      <span className="text-[10px] text-neutral-300 group-hover:text-neutral-600">•</span>
                      <span className="text-[11px] text-[#F59E0B] font-semibold">
                        {client.credential}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2: Sliding Right (Reverse Direction) */}
          <div className="relative w-full overflow-hidden py-3 mt-3">
            <div className="animate-ticker-reverse gap-4 sm:gap-6 flex items-center will-change-transform">
              {[...clientsListRow2, ...clientsListRow2].map((client, idx) => (
                <div
                  key={`${client.name}-${idx}`}
                  className="group relative flex items-center gap-4 px-6 py-4 rounded-2xl bg-neutral-50 hover:bg-black border border-neutral-200/90 hover:border-neutral-800 transition-all duration-300 shadow-sm hover:shadow-xl shrink-0 cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-black group-hover:bg-[#F59E0B] text-white group-hover:text-black font-black text-xs flex items-center justify-center transition-colors duration-300 shrink-0">
                    {client.initial}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-sm sm:text-base text-black group-hover:text-white transition-colors duration-300">
                      {client.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-neutral-500 group-hover:text-neutral-400 font-medium">
                        {client.category}
                      </span>
                      <span className="text-[10px] text-neutral-300 group-hover:text-neutral-600">•</span>
                      <span className="text-[11px] text-[#F59E0B] font-semibold">
                        {client.credential}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. OUR PRODUCTS & SERVICES SECTION
           ========================================================================= */}
        <section id="products" className="py-24 sm:py-32 bg-[#F8F9FA] text-neutral-900 border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
              <div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-950 tracking-tight leading-none">
                  Our Products &amp; Services
                </h2>
                <p className="text-base sm:text-xl text-neutral-600 mt-3 font-medium">
                  Promote verified hardware credentials engineered for executives, private venues, and corporate enterprises.
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

            {/* Horizontal Product Track */}
            <div
              ref={productScrollRef}
              className="flex items-stretch overflow-x-auto pb-8 scroll-smooth no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {showcaseProducts.map((prod) => (
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
                          {prod.tag} — 7.5% Cash Commission
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

                  {/* Name under image */}
                  <div className="pt-4 pb-2 px-1">
                    <h3 className="font-black text-xl sm:text-2xl text-neutral-900 tracking-tight">
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
        <section id="how-it-works" className="py-24 sm:py-32 bg-[#121214] text-white border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                How It Works
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 font-medium">
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
                  <div className="h-12 w-12 rounded-full bg-[#F59E0B] text-black font-black text-base flex items-center justify-center mx-auto shadow-md">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">{item.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mt-2">{item.desc}</p>
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
                <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight">
                  Your Earnings at a Glance
                </h2>
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
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
        <section className="bg-[#121214] py-20 px-4 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-3xl bg-gradient-to-r from-[#F59E0B] via-[#E5A826] to-[#D97706] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
              <div className="space-y-2 text-neutral-950">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-black">
                  Ready to Start Earning?
                </h3>
                <p className="text-sm sm:text-base text-black/80 font-medium">
                  Join the Identifine &amp; Xtreme Cardz Affiliate Programme today!
                </p>
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
