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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070708]/90 backdrop-blur-md transition-colors duration-200">
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
                    ? "text-white font-bold"
                    : "text-neutral-400 hover:text-white"
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
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-neutral-300 hover:bg-white/10 hover:text-white transition"
          >
            Partner Sign In
          </Link>

          <Link
            href="/portal?tab=register"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-black hover:bg-neutral-200 transition shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>Become an Affiliate</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle showLabel={false} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-neutral-400 hover:text-white focus:outline-none"
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
        <div className="md:hidden border-b border-white/10 bg-[#0D0D10] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-neutral-300 hover:bg-white/5 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <Link
              href="/portal?tab=login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-xl border border-white/15 py-2.5 text-xs font-bold text-neutral-300 hover:bg-white/5 transition"
            >
              Partner Sign In
            </Link>

            <Link
              href="/portal?tab=register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-xl bg-white py-2.5 text-xs font-extrabold text-black hover:bg-neutral-200 transition flex items-center justify-center gap-1.5"
            >
              <span>Become an Affiliate (10% Cash)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/portal?tab=referee"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-xl bg-black py-2.5 text-xs font-bold text-neutral-300 border border-white/10 hover:text-white transition"
            >
              Have a Referral Code? Enter Here
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
