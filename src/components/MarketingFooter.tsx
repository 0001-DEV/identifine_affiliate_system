"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, ExternalLink, ArrowRight } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-[#0B132B] text-slate-300 text-xs py-16 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          {/* Column 1: Brand & Duality */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 select-none">
              <span className="font-black tracking-wider text-base text-white">
                IDENTIFINE
              </span>
              <span className="text-white/30 font-light text-lg">|</span>
              <span className="font-black tracking-wider text-base text-white flex items-center">
                <span className="text-[#FF5B37]">X</span>TREME CARDZ
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The leading luxury smart card and digital identity partnership management cloud in Nigeria. Connecting enterprise brands, VIP venues, and affiliates with instant Paystack commission payouts.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Paystack Instant Settlement
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-300 font-medium">
                <Lock className="w-3.5 h-3.5 text-cyan-400" /> 256-Bit SSL
              </span>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <Link href="/#hero" className="hover:text-white transition">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/#lifecycle" className="hover:text-white transition">
                  Partnership Lifecycle
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-white transition">
                  Card Catalog
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  Commission Calculator
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
              Solutions
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <Link href="/#solutions" className="hover:text-white transition">
                  Corporate ID Badges
                </Link>
              </li>
              <li>
                <Link href="/#solutions" className="hover:text-white transition">
                  24K Gold Mirror Cards
                </Link>
              </li>
              <li>
                <Link href="/#solutions" className="hover:text-white transition">
                  Private VIP Venue Access
                </Link>
              </li>
              <li>
                <Link href="/#solutions" className="hover:text-white transition">
                  Agencies &amp; Resellers
                </Link>
              </li>
              <li>
                <Link href="/portal?tab=register" className="hover:text-white transition">
                  Creator Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources & Support */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  Partner FAQ
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  7.5% Earning Tiers
                </Link>
              </li>
              <li>
                <Link href="/portal?tab=login" className="hover:text-white transition">
                  Affiliate Portal Login
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition">
                  Enterprise Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Identifine &amp; Xtreme Cardz Partner Network. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-slate-300 transition">
              Privacy Policy
            </Link>
            <Link href="/faq" className="hover:text-slate-300 transition">
              Terms of Service
            </Link>
            <Link href="/portal?tab=register" className="text-[#FF5B37] hover:underline font-bold">
              Join Partner Cloud &rarr;
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
