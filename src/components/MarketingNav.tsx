"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  const navRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

  // Update sliding white pill coordinates based on the active element
  const updatePillPosition = useCallback(() => {
    const navEl = navRef.current;
    const activeEl = itemRefs.current[activeId];
    if (navEl && activeEl) {
      const navRect = navEl.getBoundingClientRect();
      const itemRect = activeEl.getBoundingClientRect();
      setPillStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      });
    }
  }, [activeId]);

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

  // Recalculate pill position when activeId changes or window resizes
  useEffect(() => {
    updatePillPosition();
    const timer = setTimeout(updatePillPosition, 60);
    window.addEventListener("resize", updatePillPosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePillPosition);
    };
  }, [activeId, updatePillPosition]);

  // Smooth scroll handler for anchor links on the homepage
  const handleNavClick = (e: React.MouseEvent, link: (typeof navLinks)[0]) => {
    if (pathname === "/" && link.id !== "faq") {
      const el = document.getElementById(link.id);
      if (el) {
        e.preventDefault();
        const navOffset = 80;
        const targetY = el.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top: targetY, behavior: "smooth" });
        setActiveId(link.id);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 text-white backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Brand Dual Logo: IDENTIFINE | XTREME CARDZ */}
        <Link href="/" className="flex items-center gap-2 select-none group">
          <span className="font-extrabold tracking-wider text-sm sm:text-base text-white">
            IDENTIFINE
          </span>
          <span className="text-white/30 font-light text-base sm:text-lg">|</span>
          <span className="font-extrabold tracking-wider text-sm sm:text-base text-white flex items-center">
            <span className="text-[#F59E0B] font-black">X</span>TREME CARDZ
          </span>
        </Link>

        {/* Desktop Navigation Links with Smooth Sliding White Background Pill */}
        <nav
          ref={navRef}
          className="relative hidden md:flex items-center bg-white/[0.07] p-1 rounded-full border border-white/10 backdrop-blur-md shadow-inner"
        >
          {/* Moving White Background Pill */}
          <span
            className="absolute top-1 bottom-1 bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_2px_12px_rgba(255,255,255,0.25)] pointer-events-none"
            style={{
              left: `${pillStyle.left}px`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.width > 0 ? 1 : 0,
            }}
          />

          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <Link
                key={link.id}
                href={link.href}
                ref={(el) => {
                  itemRefs.current[link.id] = el;
                }}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative z-10 px-4 py-1.5 text-xs rounded-full select-none transition-colors duration-300 font-semibold ${
                  isActive
                    ? "text-black font-extrabold"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions & CTA (Sign In button removed as requested) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/portal?tab=register"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-black px-6 py-2 text-xs font-extrabold transition shadow-md hover:scale-[1.02]"
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
        <div className="md:hidden border-b border-white/10 bg-black text-white px-4 pt-2 pb-6 space-y-3">
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
