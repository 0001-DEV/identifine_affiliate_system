import React from "react";
import Link from "next/link";
import { Facebook, Linkedin, Youtube } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 bg-black text-neutral-400 text-xs py-10 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Dual Brand Logo */}
          <Link href="/" className="flex items-center gap-2 select-none">
            <span className="font-black tracking-wider text-base text-white">
              IDENTIFINE
            </span>
            <span className="text-white/30 font-light text-lg">|</span>
            <span className="font-black tracking-wider text-base text-white flex items-center">
              <span className="text-[#F59E0B]">X</span>TREME CARDZ
            </span>
          </Link>

          {/* Slogan */}
          <p className="text-neutral-400 text-xs italic">
            Together, we create greater value.
          </p>

          {/* Quick Links */}
          <div className="flex items-center gap-6 font-medium text-xs">
            <Link href="/#how-it-works" className="hover:text-white transition">
              How It Works
            </Link>
            <Link href="/#products" className="hover:text-white transition">
              Products
            </Link>
            <Link href="/pricing" className="hover:text-white transition">
              Earnings
            </Link>
            <Link href="/faq" className="hover:text-white transition">
              FAQ
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-neutral-400">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-neutral-500 text-[11px]">
          © 2026 Identifine &amp; Xtreme Cardz. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
