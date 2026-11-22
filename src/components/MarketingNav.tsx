"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, ArrowRight } from "lucide-react";

export function MarketingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navigation items corresponding to the main landing page sections & FAQ
  const navLinks = [
    { id: "hero", label: "Home", href: "/#hero" },
    { id: "products", label: "Products", href: "/#products" },
    { id: "how-it-works", label: "How It Works", href: "/#how-it-works" },
    { id: "earnings", label: "Earnings", href: "/#earnings" },
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

    const sectionIds = ["hero", "products", "how-it-works", "earnings"];

    const onScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollBottom = scrollY + viewportHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Bottom of page: highlight the last section (earnings)
      if (scrollBottom >= docHeight - 120) {
        setActiveId("earnings");
        return;
      }

      // Check sections from top to bottom
      let current = "hero";
      const targetOffset = scrollY + 160;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (targetOffset >= top) {
            current = id;
          }
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Smooth scroll handler for anchor links on the homepage
  const handleNavClick = (e: React.MouseEvent, link: (typeof navLinks)[0]) => {
    if (pathname === "/" && link.id !== "faq") {
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
    <header className="sticky top-0 z-50 bg-[#121214] text-white border-b border-white/10 h-16 sm:h-[68px] transition-colors duration-200">
      <div className="w-full flex h-full items-center justify-between px-3 sm:px-6 md:px-8 lg:px-10">
        {/* Brand Dual Logo: Shifted to the far left as requested */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3.5 select-none group shrink-0 -ml-1 sm:-ml-2"
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

        {/* Desktop Navigation Links:
            - Full header height white background
            - Expands from small width on the left and moves left to right (e.g. from "Pr" across the word)
            - Crisp black text revealed cleanly inside the sweep
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
                {/* Base Nav Link Text */}
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive
                      ? "text-neutral-300 font-extrabold"
                      : "text-neutral-400 group-hover:text-white"
                  }`}
                >
                  {link.label}
                </span>

                {/* Left-to-Right Expanding White Fill: starts at left and fills the entire feature */}
                {isActive && (
                  <div
                    key={`active-bg-${link.id}`}
                    className="absolute inset-0 bg-white z-20 flex items-center justify-center px-6 animate-fill-left-to-right pointer-events-none"
                  >
                    <span className="text-black font-black uppercase tracking-wider text-xs whitespace-nowrap">
                      {link.label}
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions & CTA (Sign In button removed as requested) */}
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
          <ThemeToggle showLabel={false} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#121214] text-white px-4 pt-2 pb-6 space-y-3">
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
                      ? "bg-white text-black font-extrabold"
                      : "text-neutral-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <Link
              href="/portal?tab=register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-xl bg-[#F59E0B] hover:bg-[#D97706] py-2.5 text-xs font-extrabold text-black transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Become an Affiliate (7.5% Cash)</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </Link>

            <Link
              href="/portal?tab=referee"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-xl bg-neutral-900 py-2.5 text-xs font-bold text-neutral-200 border border-white/10 hover:bg-neutral-800 transition"
            >
              Have a Referral Code? Enter Here
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
