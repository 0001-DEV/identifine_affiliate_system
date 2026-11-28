"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";

// Products and Services catalog across Identifine, Xtreme Cardz, and CR8
const identifineServices = [
  {
    title: "Smart Identity Systems",
    desc: "NFC corporate digital profiles & instant contact sync",
  },
  {
    title: "RFID Facility Access",
    desc: "Encrypted turnstile, office & high-security door credentials",
  },
  {
    title: "Corporate ID Infrastructure",
    desc: "Enterprise-wide staff identification & access tiers",
  },
  {
    title: "Instant Commission Engine",
    desc: "Automated Paystack affiliate payouts & real-time analytics",
  },
];

const xtremeCardzServices = [
  {
    title: "Metal Business Cards",
    desc: "Metal Matte, Gunmetal & Titanium Steel finishes built to make a lasting impression",
  },
  {
    title: "Corporate ID Systems",
    desc: "Eggshell, Frosted translux & Nubis cards for staff, access & brand presence",
  },
  {
    title: "Access & Smart Cards",
    desc: "De-Titan 3-in-1 hybrid cards & tap-and-connect NFC smart networking",
  },
  {
    title: "Membership & Special Purpose",
    desc: "Distinctive VIP, club and loyalty cards combining prestige finishes with smart identification",
  },
  {
    title: "Accessories & Packaging",
    desc: "Bespoke card holders, custom branded lanyards and luxury unboxing suites",
  },
];

const cr8Services = [
  {
    title: "Brand Memorability",
    desc: "Brand strategy, brand architecture & visual systems",
  },
  {
    title: "Tangible Thinking",
    desc: "Industrial design, concept development & rapid prototyping",
  },
  {
    title: "Brand Signatures",
    desc: "Corporate gifts, brand memorabilia & bespoke commemorative items",
  },
  {
    title: "Creative Direction",
    desc: "Multi-platform visual storytelling & experiential campaigns",
  },
];

export function MarketingNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [isOverDark, setIsOverDark] = useState<boolean>(pathname === "/");
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Navigation items: Partners links directly to the Clients section, Clients removed as standalone
  const navLinks = [
    { id: "hero", label: "Home", href: "/#hero" },
    { id: "clients", label: "Partners", href: "/#clients" },
    { id: "products", label: "Products", href: "/#products" },
    { id: "how-it-works", label: "How It Works", href: "/#how-it-works" },
    { id: "earnings", label: "Earnings", href: "/pricing" },
    { id: "faq", label: "FAQ", href: "/faq" },
  ];

  // Active section tracking
  const [activeId, setActiveId] = useState<string>("hero");

  // Handle route-specific active state and scrollspy on the home page
  useEffect(() => {
    if (pathname === "/faq") {
      setActiveId("faq");
      setIsOverDark(false);
      return;
    }
    if (pathname === "/pricing") {
      setActiveId("earnings");
      setIsOverDark(false);
      return;
    }
    if (pathname !== "/") {
      setIsOverDark(false);
      return;
    }

    const sectionIds = [
      "hero",
      "partners-scroll",
      "clients",
      "products",
      "how-it-works",
      "earnings",
    ];

    const onScroll = () => {
      const scrollY = window.scrollY;
      const navHeight = 70;
      const probeY = navHeight + 40;

      // 1. Check if near very top of page
      if (scrollY < 80) {
        setActiveId("hero");
        const heroEl = document.getElementById("hero");
        setIsOverDark(heroEl ? heroEl.getAttribute("data-dark") === "true" : true);
        return;
      }

      // 2. Check if near bottom of page
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveId("earnings");
        setIsOverDark(false);
        return;
      }

      // 3. Find section currently beneath the top bar probe point
      let currentSectionId: string | null = null;
      let overDarkSection = false;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= probeY && rect.bottom > probeY) {
            currentSectionId = id === "partners-scroll" ? "clients" : id;
            if (el.getAttribute("data-dark") === "true") {
              overDarkSection = true;
            }
            break;
          }
        }
      }

      if (currentSectionId) {
        setActiveId(currentSectionId);
      }
      setIsOverDark(overDarkSection);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const interval = setInterval(onScroll, 100);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(interval);
    };
  }, [pathname]);

  // Smooth scroll handler for anchor links on the homepage
  const handleNavClick = (e: React.MouseEvent, link: (typeof navLinks)[0]) => {
    if (pathname === "/" && link.id !== "faq" && link.id !== "earnings") {
      const el = document.getElementById(link.id);
      if (el) {
        e.preventDefault();
        const navOffset = 70;
        const targetY = el.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top: targetY, behavior: "smooth" });
        setActiveId(link.id);
      }
    }
  };

  const handleProductScroll = (e: React.MouseEvent) => {
    if (pathname === "/") {
      const el = document.getElementById("products");
      if (el) {
        e.preventDefault();
        const navOffset = 70;
        const targetY = el.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top: targetY, behavior: "smooth" });
        setActiveId("products");
      }
    }
    setProductsDropdownOpen(false);
  };

  const handleMouseEnterProducts = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setProductsDropdownOpen(true);
  };

  const handleMouseLeaveProducts = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 150);
  };

  return (
    <header
      className={`sticky top-0 z-50 h-16 sm:h-[68px] transition-colors duration-300 shadow-sm ${
        isOverDark
          ? "bg-[#17171A]/95 text-white border-b border-white/10 backdrop-blur-md"
          : "bg-white/95 text-black border-b border-neutral-200/90 backdrop-blur-md"
      }`}
    >
      <div className="w-full flex h-full items-center justify-between px-3 sm:px-6 md:px-8 lg:px-10">
        {/* Brand Logo: Xtreme Cardz */}
        <Link
          href="/"
          className="flex items-center gap-2 select-none group shrink-0"
        >
          {/* XTREME CARDZ LOGO (Icon + Text Horizontal Lockup) */}
          <div className="flex items-center gap-2 h-7 sm:h-8">
            <img
              src="/xtreme-cardz-icon.png"
              alt="Xtreme Cardz Icon"
              className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            />
            <img
              src="/xtreme-cardz-text.png"
              alt="Xtreme Cardz Text"
              className={`h-3.5 sm:h-4 w-auto object-contain transition-all duration-300 ${
                isOverDark ? "brightness-100 invert" : "brightness-0"
              }`}
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="relative hidden md:flex items-stretch h-full">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;

            if (link.id === "products") {
              return (
                <div
                  key={link.id}
                  className="relative h-full flex items-center"
                  onMouseEnter={handleMouseEnterProducts}
                  onMouseLeave={handleMouseLeaveProducts}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="relative h-full flex items-center justify-center px-6 text-xs uppercase tracking-wider font-bold select-none group overflow-hidden"
                  >
                    {/* Base text */}
                    <span
                      className={`relative z-10 transition-colors duration-200 flex items-center gap-1.5 ${
                        isActive
                          ? isOverDark
                            ? "text-white font-extrabold"
                            : "text-neutral-700 font-extrabold"
                          : isOverDark
                          ? "text-neutral-400 group-hover:text-white"
                          : "text-neutral-500 group-hover:text-black"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          productsDropdownOpen
                            ? isOverDark
                              ? "rotate-180 text-white"
                              : "rotate-180 text-black"
                            : isOverDark
                            ? "text-neutral-400 group-hover:text-white"
                            : "text-neutral-400 group-hover:text-black"
                        }`}
                      />
                    </span>

                    {/* Animated fill when active */}
                    {isActive && (
                      <div
                        key={`active-bg-${link.id}`}
                        className={`absolute inset-0 z-20 flex items-center justify-center px-6 animate-fill-left-to-right pointer-events-none ${
                          isOverDark ? "bg-white/20 text-white border-y border-white/40 backdrop-blur-xs" : "bg-black text-white"
                        }`}
                      >
                        <span className="font-black uppercase tracking-wider text-xs whitespace-nowrap flex items-center gap-1.5">
                          <span>{link.label}</span>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Mega Dropdown on Hover */}
                  {productsDropdownOpen && (
                    <div
                      className="fixed top-16 sm:top-[68px] left-1/2 -translate-x-1/2 pt-2 z-50 w-[1080px] max-w-[calc(100vw-32px)] pointer-events-auto animate-in fade-in slide-in-from-top-1 duration-200"
                      onMouseEnter={handleMouseEnterProducts}
                      onMouseLeave={handleMouseLeaveProducts}
                    >
                      <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200/90 overflow-hidden">
                        {/* Gradient Top Line */}
                        <div className="h-1 bg-gradient-to-r from-amber-400 via-neutral-900 to-amber-400" />

                        {/* 3-Column Grid */}
                        <div className="grid grid-cols-3 divide-x divide-neutral-100 p-8 sm:p-9 md:p-10 gap-8 md:gap-10">
                          {/* Column 1: IDENTIFINE */}
                          <div className="space-y-4">
                            <div className="pb-3 border-b border-neutral-100">
                              <h4 className="font-black text-base uppercase tracking-wider text-black">
                                IDENTIFINE
                              </h4>
                            </div>
                            <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                              Digital identity architecture, encrypted credentials & enterprise verification systems.
                            </p>
                            <ul className="space-y-2.5">
                              {identifineServices.map((item, idx) => (
                                <li key={idx}>
                                  <Link
                                    href="/#products"
                                    onClick={handleProductScroll}
                                    className="group/item block rounded-xl p-2.5 -mx-2.5 hover:bg-neutral-50 transition-colors"
                                  >
                                    <div className="text-xs font-bold text-black group-hover/item:text-[#F59E0B] transition-colors flex items-center justify-between">
                                      <span>{item.title}</span>
                                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-[#F59E0B]" />
                                    </div>
                                    <div className="text-[11px] text-neutral-500 leading-snug mt-1">
                                      {item.desc}
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Column 2: XTREME CARDZ */}
                          <div className="pl-8 md:pl-10 space-y-4">
                            <div className="pb-3 border-b border-neutral-100">
                              <h4 className="font-black text-base uppercase tracking-wider text-black">
                                XTREME CARDZ
                              </h4>
                            </div>
                            <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                              Ultra-luxury metal business cards, corporate ID finishes, smart NFC cards & accessories.
                            </p>
                            <ul className="space-y-2.5">
                              {xtremeCardzServices.map((item, idx) => (
                                <li key={idx}>
                                  <Link
                                    href="/#products"
                                    onClick={handleProductScroll}
                                    className="group/item block rounded-xl p-2.5 -mx-2.5 hover:bg-neutral-50 transition-colors"
                                  >
                                    <div className="text-xs font-bold text-black group-hover/item:text-[#F59E0B] transition-colors flex items-center justify-between">
                                      <span>{item.title}</span>
                                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-[#F59E0B]" />
                                    </div>
                                    <div className="text-[11px] text-neutral-500 leading-snug mt-1">
                                      {item.desc}
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Column 3: CR8 */}
                          <div className="pl-8 md:pl-10 space-y-4">
                            <div className="pb-3 border-b border-neutral-100">
                              <h4 className="font-black text-base uppercase tracking-wider text-black">
                                CR8
                              </h4>
                            </div>
                            <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                              Brand memorability, tangible thinking, brand signatures, and industrial design.
                            </p>
                            <ul className="space-y-2.5">
                              {cr8Services.map((item, idx) => (
                                <li key={idx}>
                                  <Link
                                    href="/#products"
                                    onClick={handleProductScroll}
                                    className="group/item block rounded-xl p-2.5 -mx-2.5 hover:bg-neutral-50 transition-colors"
                                  >
                                    <div className="text-xs font-bold text-black group-hover/item:text-[#F59E0B] transition-colors flex items-center justify-between">
                                      <span>{item.title}</span>
                                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-[#F59E0B]" />
                                    </div>
                                    <div className="text-[11px] text-neutral-500 leading-snug mt-1">
                                      {item.desc}
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="bg-neutral-50 px-8 py-3.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                          <span className="text-neutral-500 font-medium">
                            Earn recurring commission payouts by referring corporate clients and brands to any of these ecosystems.
                          </span>
                          <Link
                            href="/#products"
                            onClick={handleProductScroll}
                            className="font-bold text-black hover:text-[#F59E0B] transition-colors inline-flex items-center gap-1.5 shrink-0"
                          >
                            <span>Explore Full Catalog</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="relative h-full flex items-center justify-center px-6 text-xs uppercase tracking-wider font-bold select-none group overflow-hidden"
              >
                {/* Base text */}
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive
                      ? isOverDark
                        ? "text-white font-extrabold"
                        : "text-neutral-700 font-extrabold"
                      : isOverDark
                      ? "text-neutral-400 group-hover:text-white"
                      : "text-neutral-500 group-hover:text-black"
                  }`}
                >
                  {link.label}
                </span>

                {/* Animated fill when active */}
                {isActive && (
                  <div
                    key={`active-bg-${link.id}`}
                    className={`absolute inset-0 z-20 flex items-center justify-center px-6 animate-fill-left-to-right pointer-events-none ${
                      isOverDark ? "bg-white/20 text-white border-y border-white/40 backdrop-blur-xs" : "bg-black text-white"
                    }`}
                  >
                    <span className="font-black uppercase tracking-wider text-xs whitespace-nowrap">
                      {link.label}
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions & CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="/portal?tab=register"
            style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
            className={`inline-flex items-center gap-1.5 rounded-full px-6 py-2.5 text-xs font-semibold transition shadow-md hover:scale-[1.02] ${
              isOverDark
                ? "bg-black hover:bg-neutral-800 text-white border border-white/30"
                : "bg-black hover:bg-neutral-800 text-white border border-transparent"
            }`}
          >
            <span>Become an Affiliate</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`rounded-lg p-2 focus:outline-none transition-colors ${
              isOverDark ? "text-white hover:text-neutral-300" : "text-neutral-700 hover:text-black"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (White Theme) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white text-black px-4 pt-2 pb-6 space-y-3 shadow-lg max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1.5 pt-2">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;

              if (link.id === "products") {
                return (
                  <div key={link.id} className="space-y-1">
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                        isActive
                          ? "bg-black text-white font-extrabold"
                          : "text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileProductsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {mobileProductsOpen && (
                      <div className="pl-3 pr-1 py-2 space-y-4 border-l-2 border-neutral-200 ml-3">
                        {/* Identifine */}
                        <div>
                          <h5 className="font-black text-xs uppercase tracking-wider text-black">
                            IDENTIFINE
                          </h5>
                          <ul className="mt-1.5 space-y-1">
                            {identifineServices.map((item, idx) => (
                              <li key={idx}>
                                <Link
                                  href="/#products"
                                  onClick={(e) => {
                                    handleProductScroll(e);
                                    setMobileMenuOpen(false);
                                  }}
                                  className="text-xs text-neutral-600 hover:text-black block py-0.5"
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Xtreme Cardz */}
                        <div>
                          <h5 className="font-black text-xs uppercase tracking-wider text-black">
                            XTREME CARDZ
                          </h5>
                          <ul className="mt-1.5 space-y-1">
                            {xtremeCardzServices.map((item, idx) => (
                              <li key={idx}>
                                <Link
                                  href="/#products"
                                  onClick={(e) => {
                                    handleProductScroll(e);
                                    setMobileMenuOpen(false);
                                  }}
                                  className="text-xs text-neutral-600 hover:text-black block py-0.5"
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CR8 */}
                        <div>
                          <h5 className="font-black text-xs uppercase tracking-wider text-black">
                            CR8
                          </h5>
                          <ul className="mt-1.5 space-y-1">
                            {cr8Services.map((item, idx) => (
                              <li key={idx}>
                                <Link
                                  href="/#products"
                                  onClick={(e) => {
                                    handleProductScroll(e);
                                    setMobileMenuOpen(false);
                                  }}
                                  className="text-xs text-neutral-600 hover:text-black block py-0.5"
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "bg-black text-white font-extrabold"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2.5">
            <Link
              href="/portal?tab=register"
              onClick={() => setMobileMenuOpen(false)}
              style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
              className="w-full text-center rounded-xl bg-black hover:bg-neutral-800 py-3 text-xs font-semibold text-white transition flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Become an Affiliate</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
