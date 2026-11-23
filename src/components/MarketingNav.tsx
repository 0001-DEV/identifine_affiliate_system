"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

export function MarketingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navigation items corresponding to Impact.com's architectural layout
  const navLinks = [
    { id: "hero", label: "Overview", href: "/#hero" },
    { id: "solutions", label: "Solutions", href: "/#solutions" },
    { id: "lifecycle", label: "Partnership Lifecycle", href: "/#lifecycle" },
    { id: "products", label: "Products", href: "/#products" },
    { id: "earnings", label: "Earnings", href: "/pricing" },
    { id: "faq", label: "FAQ", href: "/faq" },
  ];

  // Active section tracking
  const [activeId, setActiveId] = useState<string>("hero");

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

    const sectionIds = ["hero", "solutions", "lifecycle", "products", "earnings"];

    const onScroll = () => {
      const scrollY = window.scrollY;
      const targetOffset = scrollY + 140;

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
    <header className="sticky top-0 z-50 bg-[#0B132B]/95 backdrop-blur-md text-white border-b border-white/10 h-16 sm:h-[70px] transition-colors duration-200">
      <div className="w-full flex h-full items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Brand Dual Logo: Identifine | Xtreme Cardz */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3.5 select-none group shrink-0"
        >
          {/* 1. IDENTIFINE LOGO */}
          <img
            src="/identifine_logo.webp"
            alt="Identifine Logo"
            className="h-6 sm:h-7 w-auto object-contain transition-opacity group-hover:opacity-90"
          />

          {/* Elegant Divider */}
          <span className="text-white/20 font-light text-base sm:text-lg">|</span>

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
              className="h-3 sm:h-3.5 w-auto object-contain brightness-125"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links (Impact.com Style: Clean, Modern, Elegant Indicators) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative px-3.5 py-2 text-[13px] font-semibold transition-colors duration-200 rounded-lg group ${
                  isActive
                    ? "text-white"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#FF5B37] rounded-full animate-fade-in" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Impact.com CTAs (Right-Aligned: Ghost "Sign In" + Vibrant Coral "Become a Partner" Pill) */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <Link
            href="/portal?tab=login"
            className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition"
          >
            Sign In
          </Link>

          <Link
            href="/portal?tab=register"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5B37] hover:bg-[#E04824] text-white px-5 sm:px-6 py-2.5 text-xs font-bold transition shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Become a Partner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Impact.com Deep Navy Slate Theme) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#0B132B] text-white px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <div className="flex flex-col space-y-1">
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
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 flex items-center justify-between ${
                    isActive
                      ? "bg-white/10 text-[#FF5B37] font-bold"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#FF5B37]" />}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/portal?tab=login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-semibold text-slate-300 hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/portal?tab=register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5B37] text-white py-3 text-sm font-bold shadow-md"
            >
              <span>Become a Partner</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
