"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { XtremLogo } from "./XtremLogo";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

export function MarketingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/#products" },
    { label: "Earnings & Pricing", href: "/pricing" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "FAQ", href: "/faq" },
    { label: "System Guide", href: "/guide" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-amber-500/15 bg-[#07070A]/95 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <XtremLogo size="md" showSubtitle={false} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors duration-150 ${
                  isActive
                    ? "text-amber-400 font-bold"
                    : "text-neutral-300 hover:text-amber-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions & CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle showLabel={false} />

          <Link
            href="/portal?tab=login"
            className="rounded-full border border-amber-500/25 bg-amber-500/5 px-4 py-2 text-xs font-semibold text-neutral-200 hover:bg-amber-500/15 hover:text-amber-300 hover:border-amber-400/50 transition"
          >
            Partner Sign In
          </Link>

          <Link
            href="/portal?tab=register"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-4 py-2 text-xs font-black text-neutral-950 hover:brightness-105 transition shadow-md shadow-amber-500/25 border border-amber-200/50 hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5 text-neutral-950 fill-neutral-950" />
            <span>Become an Affiliate</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle showLabel={false} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-neutral-400 hover:text-amber-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-amber-500/20 bg-[#0D0D12] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-neutral-200 hover:bg-amber-500/10 hover:text-amber-300 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <Link
              href="/portal?tab=login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-xl border border-amber-500/20 bg-amber-500/5 py-2.5 text-xs font-bold text-neutral-200 hover:bg-amber-500/15 transition"
            >
              Partner Sign In
            </Link>

            <Link
              href="/portal?tab=register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 py-2.5 text-xs font-black text-neutral-950 transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <span>Become an Affiliate (10% Cash)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/portal?tab=referee"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-xl bg-neutral-900 py-2.5 text-xs font-bold text-amber-300 border border-amber-500/30 hover:bg-neutral-800 transition"
            >
              Have a Referral Code? Enter Here
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
