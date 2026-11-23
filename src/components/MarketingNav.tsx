"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

export function MarketingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navigation items corresponding to the main landing page sections
  const navLinks = [
    { id: "hero", label: "Home", href: "/#hero" },
    { id: "partners", label: "Partners", href: "/#partners" },
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

    const sectionIds = ["hero", "partners", "products", "how-it-works", "earnings"];

    const onScroll = () => {
      const scrollY = window.scrollY;
      const targetOffset = scrollY + 160;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (targetOffset >= top) {
            setActiveId(id);
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

  return (
    <header className="sticky top-0 z-50 bg-white text-black border-b border-neutral-200/90 h-16 sm:h-[68px] transition-colors duration-200 shadow-sm">
      <div className="w-full flex h-full items-center justify-between px-3 sm:px-6 md:px-8 lg:px-10">
        {/* Brand Dual Logo: Shifted to the far left as requested */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3.5 select-none group shrink-0 -ml-1 sm:-ml-2"
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
        </Link>

        {/* Desktop Navigation Links:
            - White header background
            - Black background around the active text
            - Animates from left to right on scroll, revealing white text inside
            - No glassmorphism, no borders around texts */}
        <nav className="relative hidden md:flex items-stretch h-full overflow-hidden">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
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
            className="inline-flex items-center gap-1.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-black px-6 py-2.5 text-xs font-extrabold transition shadow-md hover:scale-[1.02]"
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
        <div className="md:hidden border-b border-neutral-200 bg-white text-black px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1.5 pt-2">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
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
              className="w-full text-center rounded-xl bg-[#F59E0B] hover:bg-[#D97706] py-3 text-xs font-extrabold text-black transition flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Become an Affiliate (7.5% Cash)</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
