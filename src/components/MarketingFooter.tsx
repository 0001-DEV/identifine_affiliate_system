"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, ExternalLink, ArrowRight } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer data-dark="true" className="border-t border-white/10 bg-[#17171A] text-white/80 text-xs py-16 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          {/* Column 1: Brand & Duality */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 select-none flex-wrap">
              <span className="font-black tracking-wider text-base text-white">
                IDENTIFINE
              </span>
              <span className="text-white/30 font-light text-lg">|</span>
              <span className="font-black tracking-wider text-base text-white flex items-center">
                <span className="text-[#F59E0B]">X</span>TREME CARDZ
              </span>
              <span className="text-white/30 font-light text-lg">|</span>
              <img
                src="/cr8-logo-white.svg"
                alt="CR8"
                className="h-5 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-white/80 text-xs leading-relaxed max-w-sm">
              The premier luxury smart card and digital identity affiliate network in Nigeria. An initiative powered by Identifine, Xtreme Cardz, and Xtreme Cr8tivity (CR8), connecting enterprise brands, VIP venues, and affiliates with instant Paystack commission payouts.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/90 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Paystack Instant Settlement
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/90 font-medium">
                <Lock className="w-3.5 h-3.5 text-amber-400" /> 256-Bit SSL
              </span>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-white/80 font-medium">
              <li>
                <Link href="/#hero" className="hover:text-white transition">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-white transition">
                  Card Catalog
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  7.5% Earnings
                </Link>
              </li>
              <li>
                <Link href="/portal?tab=register" className="hover:text-white transition">
                  Partner Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Products
            </h4>
            <ul className="space-y-2 text-white/80 font-medium">
              <li>
                <Link href="/#products" className="hover:text-white transition">
                  De-Titan Hybrid Cards
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-white transition">
                  24K Gold Mirror Cards
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-white transition">
                  Corporate ID Systems
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-white transition">
                  Black Matte Titanium
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-white transition">
                  RFID VIP Suites
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources & Support */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-white/80 font-medium">
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  Partner FAQ
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  Commission Calculator
                </Link>
              </li>
              <li>
                <Link href="/portal?tab=login" className="hover:text-white transition">
                  Affiliate Portal Login
                </Link>
              </li>
              <li>
                <Link href="/portal?tab=register" className="hover:text-white transition">
                  Activate Affiliate Link
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/70 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Identifine &amp; Xtreme Cardz Partner Network. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/faq" className="hover:text-white transition">
              Terms of Service
            </Link>
            <Link href="/portal?tab=register" className="text-[#F59E0B] hover:underline font-bold">
              Become an Affiliate &rarr;
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
