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
    title: "De-Titan 3-in-1 Hybrid Cards",
    desc: "Titanium-reinforced smart cards with dual-chip NFC/RFID",
  },
  {
    title: "24K Gold Mirror Cards",
    desc: "Handcrafted 24K mirror gold finish for VIP executives",
  },
  {
    title: "Black Matte Stealth Titanium",
    desc: "Tactical ultra-durable dark aerospace metal cards",
  },
  {
    title: "VIP Suites & Accessories",
    desc: "Custom presentation boxes, magnetic holders & carbon cases",
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

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
      return;
    }
    if (pathname === "/pricing") {
      setActiveId("earnings");
      return;
    }
    if (pathname !== "/") {
      return;
    }

    const sectionIds = ["hero", "partners-scroll", "clients", "products", "how-it-works", "earnings"];

    const onScroll = () => {
      const scrollY = window.scrollY;
      const targetOffset = scrollY + 160;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (targetOffset >= top) {
            // Both partners-scroll and clients map to "clients" (Partners link)
            setActiveId(id === "partners-scroll" ? "clients" : id);
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
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
    <header className="sticky top-0 z-50 bg-white text-black border-b border-neutral-200/90 h-16 sm:h-[68px] transition-colors duration-200 shadow-sm">
      <div className="w-full flex h-full items-center justify-between px-3 sm:px-6 md:px-8 lg:px-10">
        {/* Brand Tri-Logo: Identifine | Xtreme Cardz | CR8 */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 select-none group shrink-0 -ml-1 sm:-ml-2"
        >
          {/* 1. IDENTIFINE LOGO (Dark text version for white header) */}
          <img
            src="/identifine_logo_dark.webp"
            alt="Identifine Logo"
            className="h-7 sm:h-8 w-auto object-contain transition-opacity group-hover:opacity-90"
          />

          {/* Elegant Divider */}
          <span className="text-black/20 font-light text-base sm:text-lg">|</span>

          {/* 2. XTREME CARDZ LOGO (Icon + Text Horizontal Lockup) */}
          <div className="flex items-center gap-1.5 h-6 sm:h-7">
            <img
              src="/xtreme-cardz-icon.png"
              alt="Xtreme Cardz Icon"
              className="h-6 sm:h-7 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            />
            <img
              src="/xtreme-cardz-text.png"
              alt="Xtreme Cardz Text"
              className="h-3 sm:h-3.5 w-auto object-contain brightness-0"
            />
          </div>

          {/* Elegant Divider */}
          <span className="text-black/20 font-light text-base sm:text-lg">|</span>

          {/* 3. CR8 (Xtreme Cr8tivity) */}
          <div className="flex items-center h-6 sm:h-7">
            <img
              src="/cr8-logo-dark.svg"
              alt="CR8"
              className="h-5 sm:h-6 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
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
                          ? "text-neutral-700 font-extrabold"
                          : "text-neutral-500 group-hover:text-black"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          productsDropdownOpen
                            ? "rotate-180 text-black"
                            : "text-neutral-400 group-hover:text-black"
                        }`}
                      />
                    </span>

                    {/* Black animated fill when active */}
                    {isActive && (
                      <div
                        key={`active-bg-${link.id}`}
                        className="absolute inset-0 bg-black z-20 flex items-center justify-center px-6 animate-fill-left-to-right pointer-events-none"
                      >
                        <span className="text-white font-black uppercase tracking-wider text-xs whitespace-nowrap flex items-center gap-1.5">
                          <span>{link.label}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-white" />
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Mega Dropdown on Hover */}
                  {productsDropdownOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-[840px] max-w-[95vw] pointer-events-auto animate-in fade-in slide-in-from-top-1 duration-200"
                      onMouseEnter={handleMouseEnterProducts}
                      onMouseLeave={handleMouseLeaveProducts}
                    >
                      <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200/90 overflow-hidden">
                        {/* Gradient Top Line */}
                        <div className="h-1 bg-gradient-to-r from-amber-400 via-neutral-900 to-amber-400" />

                        {/* 3-Column Grid */}
                        <div className="grid grid-cols-3 divide-x divide-neutral-100 p-6 sm:p-7 gap-6">
                          {/* Column 1: IDENTIFINE */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2.5 border-b border-neutral-100">
                              <img
                                src="/identifine_logo_dark.webp"
                                alt="Identifine"
                                className="h-5 w-auto object-contain"
                              />
                              <h4 className="font-black text-sm uppercase tracking-wider text-black">
                                IDENTIFINE
                              </h4>
                            </div>
                            <p className="text-[11px] text-neutral-500 font-medium">
                              Digital identity architecture, encrypted credentials & enterprise verification systems.
                            </p>
                            <ul className="space-y-2">
                              {identifineServices.map((item, idx) => (
                                <li key={idx}>
                                  <Link
                                    href="/#products"
                                    onClick={handleProductScroll}
                                    className="group/item block rounded-lg p-2 -mx-2 hover:bg-neutral-50 transition-colors"
                                  >
                                    <div className="text-xs font-bold text-black group-hover/item:text-[#F59E0B] transition-colors flex items-center justify-between">
                                      <span>{item.title}</span>
                                      <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-[#F59E0B]" />
                                    </div>
                                    <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                                      {item.desc}
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Column 2: XTREME CARDZ */}
                          <div className="pl-6 space-y-4">
                            <div className="flex items-center gap-2 pb-2.5 border-b border-neutral-100">
                              <img
                                src="/xtreme-cardz-icon.png"
                                alt="Xtreme Cardz"
                                className="h-5 w-auto object-contain"
                              />
                              <h4 className="font-black text-sm uppercase tracking-wider text-black">
                                XTREME CARDZ
                              </h4>
                            </div>
                            <p className="text-[11px] text-neutral-500 font-medium">
                              Ultra-luxury smart metal cards, 24K mirror gold, and RFID executive suites.
                            </p>
                            <ul className="space-y-2">
                              {xtremeCardzServices.map((item, idx) => (
                                <li key={idx}>
                                  <Link
                                    href="/#products"
                                    onClick={handleProductScroll}
                                    className="group/item block rounded-lg p-2 -mx-2 hover:bg-neutral-50 transition-colors"
                                  >
                                    <div className="text-xs font-bold text-black group-hover/item:text-[#F59E0B] transition-colors flex items-center justify-between">
                                      <span>{item.title}</span>
                                      <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-[#F59E0B]" />
                                    </div>
                                    <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                                      {item.desc}
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Column 3: CR8 */}
                          <div className="pl-6 space-y-4">
                            <div className="flex items-center gap-2 pb-2.5 border-b border-neutral-100">
                              <img
                                src="/cr8-logo-dark.svg"
                                alt="CR8"
                                className="h-5 w-auto object-contain"
                              />
                              <h4 className="font-black text-sm uppercase tracking-wider text-black">
                                CR8
                              </h4>
                            </div>
                            <p className="text-[11px] text-neutral-500 font-medium">
                              Brand memorability, tangible thinking, bespoke signatures and industrial design.
                            </p>
                            <ul className="space-y-2">
                              {cr8Services.map((item, idx) => (
                                <li key={idx}>
                                  <Link
                                    href="/#products"
                                    onClick={handleProductScroll}
                                    className="group/item block rounded-lg p-2 -mx-2 hover:bg-neutral-50 transition-colors"
                                  >
                                    <div className="text-xs font-bold text-black group-hover/item:text-[#F59E0B] transition-colors flex items-center justify-between">
                                      <span>{item.title}</span>
                                      <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-[#F59E0B]" />
                                    </div>
                                    <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                                      {item.desc}
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                          <span className="text-neutral-500">
                            Earn recurring commissions by connecting clients to any of these enterprise solutions.
                          </span>
                          <Link
                            href="/#products"
                            onClick={handleProductScroll}
                            className="font-bold text-black hover:text-[#F59E0B] transition-colors inline-flex items-center gap-1"
                          >
                            <span>View Full Catalog</span>
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
                {/* Base text (dark gray / black) */}
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive
                      ? "text-neutral-700 font-extrabold"
                      : "text-neutral-500 group-hover:text-black"
                  }`}
                >
                  {link.label}
                </span>

                {/* Black background around text expanding from left to right, revealing white text */}
                {isActive && (
                  <div
                    key={`active-bg-${link.id}`}
                    className="absolute inset-0 bg-black z-20 flex items-center justify-center px-6 animate-fill-left-to-right pointer-events-none"
                  >
                    <span className="text-white font-black uppercase tracking-wider text-xs whitespace-nowrap">
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
            className="inline-flex items-center gap-1.5 rounded-full bg-black hover:bg-neutral-800 text-white px-6 py-2.5 text-xs font-semibold transition shadow-md hover:scale-[1.02]"
          >
            <span>Become an Affiliate</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-neutral-700 hover:text-black focus:outline-none"
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
