"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, ExternalLink, ArrowRight } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer data-dark="true" className="border-t border-white/10 bg-[#17171A] text-white text-xs py-16 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          {/* Column 1: Brand & Duality */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 select-none flex-wrap">
              <span style={{ color: "#FFFFFF" }} className="font-black tracking-wider text-base !text-white">
                IDENTIFINE
              </span>
              <span className="text-white/40 font-light text-lg">|</span>
              <span style={{ color: "#FFFFFF" }} className="font-black tracking-wider text-base !text-white flex items-center">
                <span className="text-[#F59E0B]">X</span>TREME CARDZ
              </span>
              <span className="text-white/40 font-light text-lg">|</span>
              <img
                src="/cr8-logo-white.svg"
                alt="CR8"
                className="h-5 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p style={{ color: "#FFFFFF" }} className="!text-white text-xs leading-relaxed max-w-sm">
              The premier luxury smart card and digital identity affiliate network in Nigeria. An initiative powered by Identifine, Xtreme Cardz, and Xtreme Cr8tivity (CR8), connecting enterprise brands, VIP venues, and affiliates with instant Paystack commission payouts.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span style={{ color: "#FFFFFF" }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] !text-white font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Paystack Instant Settlement
              </span>
              <span style={{ color: "#FFFFFF" }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] !text-white font-medium">
                <Lock className="w-3.5 h-3.5 text-amber-400" /> 256-Bit SSL
              </span>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-3">
            <h4 style={{ color: "#FFFFFF" }} className="!text-white font-bold text-xs uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-white font-medium">
              <li>
                <Link href="/#hero" style={{ color: "#FFFFFF" }} className="!text-white hover:text-amber-400 transition">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/#products" style={{ color: "#FFFFFF" }} className="!text-white hover:text-amber-400 transition">
                  Card Catalog
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" style={{ color: "#FFFFFF" }} className="!text-white hover:text-amber-400 transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" style={{ color: "#FFFFFF" }} className="!text-white hover:text-amber-400 transition">
                  7.5% Earnings
                </Link>
              </li>
              <li>
                <Link href="/portal?tab=register" style={{ color: "#FFFFFF" }} className="!text-white hover:text-amber-400 transition">
                  Partner Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="space-y-3">
            <h4 style={{ color: "#FFFFFF" }} className="!text-white font-bold text-xs uppercase tracking-wider">
              Products
            </h4>
            <ul className="space-y-2 text-white font-medium">
              <li>
                <Link href="/#products" style={{ color: "#FFFFFF" }} className="!text-white hover:text-amber-400 transition">
                  De-Titan Hybrid Cards
                </Link>
              </li>
              <li>
                <Link href="/#products" style={{ color: "#FFFFFF" }} className="!text-white hover:text-amber-400 transition">
                  24K Gold Mirror Cards
                </Link>
              </li>
              <li>
                <Link href="/#products" style={{ color: "#FFFFFF" }} className="!text-white hover:text-amber-400 transition">
                  Corporate ID Systems
                </Link>
              </li>
              <li>
                <Link href="/#products" style={{ color: "#FFFFFF" }} className="!text-white hover:text-amber-400 transition">
                  Black Matte Titanium
                </Link>
              </li>
              <li>
                <Link href="/#products" style={{ color: "#FFFFFF" }} className="!text-white hover:text-amber-400 transition">
                  RFID VIP Suites
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources & Support */}
          <div className="space-y-3">
            <h4 style={{ color: "#FFFFFF" }} className="!text-white font-bold text-xs uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-white font-medium">
              <li>
                <Link href="/faq" style={{ color: "#FFFFFF" }} className="!text-white hover:text-amber-400 transition">
                  Partner FAQ
                </Link>
              </li>
              <li>
                <Link href="/pricing" style={{ color: "#FFFFFF" }} className="!text-white hover:text-amber-400 transition">
                  Commission Calculator
                </Link>
              </li>
              <li>
                <Link href="/portal?tab=login" style={{ color: "#FFFFFF" }} className="!text-white hover:text-amber-400 transition">
                  Affiliate Portal Login
                </Link>
              </li>
              <li>
                <Link href="/portal?tab=register" style={{ color: "#FFFFFF" }} className="!text-white hover:text-amber-400 transition">
                  Activate Affiliate Link
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div style={{ color: "#FFFFFF" }} className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 !text-white text-[11px]">
          <div style={{ color: "#FFFFFF" }} className="!text-white">
            &copy; {new Date().getFullYear()} Identifine &amp; Xtreme Cardz Partner Network. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/faq" style={{ color: "#FFFFFF" }} className="!text-white hover:underline transition">
              Privacy Policy
            </Link>
            <Link href="/faq" style={{ color: "#FFFFFF" }} className="!text-white hover:underline transition">
              Terms of Service
            </Link>
            <Link href="/portal?tab=register" style={{ color: "#FFFFFF" }} className="!text-white hover:text-[#F59E0B] font-bold transition">
              Become an Affiliate &rarr;
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
