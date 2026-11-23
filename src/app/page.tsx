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

  // 7 Partner Persona Cards (People we can partner with)
  const partnerShowcase = [
    {
      id: "corporate",
      role: "Corporate Executives & C-Suite",
      badge: "Corporate Identity",
      opportunity: "Batch rollouts of smart staff badges, encrypted facility passes, and executive credentials.",
      avgOrder: "₦500k – ₦5M",
      commission: "7.5% Cash Payout",
      image: "/images/partners/corporate-executive.jpg",
    },
    {
      id: "creators",
      role: "Luxury Creators & Influencers",
      badge: "Creator Economy",
      opportunity: "Tap-and-share networking demos with custom 24K mirror gold cards to personal audiences.",
      avgOrder: "₦150k – ₦600k",
      commission: "7.5% Cash Payout",
      image: "/images/partners/luxury-creator.jpg",
    },
    {
      id: "hospitality",
      role: "VIP Hospitality & Venues",
      badge: "VIP Access",
      opportunity: "Encrypted RFID membership cards, VIP lounge credentials, and dynamic vCard passes.",
      avgOrder: "₦350k – ₦1.8M",
      commission: "7.5% Cash Payout",
      image: "/images/partners/club-manager.jpg",
    },
    {
      id: "realestate",
      role: "Real Estate Developers",
      badge: "Property Access",
      opportunity: "Smart keycard credentials and VIP homeowner identity cards for luxury developments.",
      avgOrder: "₦800k – ₦3M",
      commission: "7.5% Cash Payout",
      image: "/images/partners/hospitality-director.jpg",
    },
    {
      id: "tech",
      role: "Tech Founders & Startups",
      badge: "Tech Networking",
      opportunity: "De-Titan 3-in-1 hybrid cards for investor pitches, tech conferences, and team rollouts.",
      avgOrder: "₦250k – ₦1.2M",
      commission: "7.5% Cash Payout",
      image: "/images/partners/tech-founder.jpg",
    },
    {
      id: "agency",
      role: "Creative Agencies & PR",
      badge: "Agency Resellers",
      opportunity: "Turnkey client smart card branding and VIP executive gifts without inventory risk.",
      avgOrder: "₦400k – ₦2.5M",
      commission: "7.5% Cash Payout",
      image: "/images/partners/agency-consultant.jpg",
    },
    {
      id: "bankers",
      role: "Private Wealth Advisors",
      badge: "Private Banking",
      opportunity: "Custom laser-engraved titanium credentials for high-net-worth client onboarding.",
      avgOrder: "₦600k – ₦4M",
      commission: "7.5% Cash Payout",
      image: "/images/partners/private-banker.jpg",
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
            1. HERO SECTION: TEXT ONLY + PINNED HORIZONTAL CONTAINER OF PICTURES
               MOVES ON SCROLL, THEN UNPINS AND CONTINUES TO NEXT SECTION
           ========================================================================= */}
        <section
          ref={heroSectionRef}
          id="hero"
          className="relative w-full h-[360vh] bg-[#09090B] border-b border-neutral-800"
        >
          {/* Sticky Viewport: Stays fixed as user scrolls, animating the horizontal container */}
          <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-10 sm:pt-14 pb-8 sm:pb-12 overflow-hidden bg-[#09090B]">
            
            {/* Full-width Black & Gold Tapered Lines Effect in Background */}
            <HeroGoldLinesEffect />

            {/* Top Area: HERO TEXT ONLY (Spaced paragraphs, clean crisp typography) */}
            <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center space-y-7 shrink-0 z-10 relative">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-sm">
                Turn Your Network Into{" "}
                <span className="text-[#F59E0B]">7.5% Recurring Cash</span>
              </h1>

              <p className="text-base sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl mx-auto">
                Promote 24K gold mirror metal cards, laser-engraved titanium smart credentials, and corporate identity suites. Zero stock to purchase, automated commission tracking, and instant Paystack payouts.
              </p>

              <div className="flex items-center justify-center gap-4 pt-2">
                <Link
                  href="/portal?tab=register"
                  className="rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-black px-9 py-4 text-xs sm:text-sm font-extrabold shadow-lg shadow-amber-500/20 hover:scale-105 transition"
                >
                  Become an Affiliate
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-full border border-neutral-700 bg-black/60 hover:bg-neutral-900 text-neutral-200 hover:text-white px-8 py-4 text-xs sm:text-sm font-bold backdrop-blur-sm transition"
                >
                  Explore 7.5% Earnings
                </Link>
              </div>

              {/* People that can partner with us: Crisp white text */}
              <div className="pt-3 flex items-center justify-center">
                <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                  people that can partner with us
                </span>
              </div>
            </div>

            {/* Bottom Area: HORIZONTAL CONTAINER OF PICTURES THAT MOVES ON SCROLL */}
            <div className="relative w-full overflow-hidden mt-6 z-10">
              <div
                ref={trackRef}
                className="flex items-start gap-6 px-6 sm:px-12 will-change-transform transition-transform duration-75"
                style={{
                  transform: `translateX(-${scrollProgress * maxTranslate}px)`,
                }}
              >
                {partnerShowcase.map((partner) => (
                  <div
                    key={partner.id}
                    className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0 flex flex-col group cursor-pointer"
                  >
                    {/* Picture Container: ONLY the image inside, increased height, NO text on image */}
                    <div className="relative h-[320px] sm:h-[380px] md:h-[430px] w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-800/80 group-hover:border-[#F59E0B]/50 transition-all duration-300 bg-neutral-950">
                      <img
                        src={partner.image}
                        alt={partner.role}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Text Section OUTSIDE the container: Just the people */}
                    <div className="pt-3.5 pb-1 px-1">
                      <h3 className="font-black text-base sm:text-lg md:text-xl text-white tracking-tight group-hover:text-[#F59E0B] transition-colors">
                        {partner.role}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll Progress Bar indicator */}
              <div className="mx-auto max-w-xs mt-4 h-1 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F59E0B] transition-all duration-75 rounded-full"
                  style={{ width: `${Math.max(5, scrollProgress * 100)}%` }}
                />
              </div>
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

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
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
