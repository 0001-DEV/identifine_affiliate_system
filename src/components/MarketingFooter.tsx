import React from "react";
import Link from "next/link";
import { XtremLogo } from "./XtremLogo";
import { MessageSquare, Mail, Phone, ShieldCheck, MapPin, ExternalLink } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#070708] text-neutral-400 text-xs transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/">
              <XtremLogo size="md" showSubtitle={false} />
            </Link>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Nigeria&apos;s leading ecosystem for Smart NFC Business Cards, Custom Luxury Metal Identity Suites, and Corporate Digital Networking solutions by Identifine & Xtreme Cardz.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Affiliate Partner Network Active</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Affiliate Program
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/portal?tab=register" className="hover:text-white transition">
                  Join as an Affiliate Partner
                </Link>
              </li>
              <li>
                <Link href="/portal?tab=login" className="hover:text-white transition">
                  Affiliate Portal Sign In
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  Earnings Breakdown & Commission
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition">
                  How Referral Tracking Works
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-white transition">
                  Official System Guide (PDF)
                </Link>
              </li>
              <li>
                <Link href="/portal?tab=referee" className="hover:text-white transition">
                  Have a Referral Code?
                </Link>
              </li>
            </ul>
          </div>

          {/* Products & Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Products We Offer
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-neutral-300 font-medium">Black Matte Metal NFC Cards</span>
              </li>
              <li>
                <span className="text-neutral-300 font-medium">VIP 24K Brushed Gold Metal Cards</span>
              </li>
              <li>
                <span className="text-neutral-300 font-medium">De-titan 3-in-1 Identity Badges</span>
              </li>
              <li>
                <span className="text-neutral-300 font-medium">Corporate Enterprise 100-Pack</span>
              </li>
              <li>
                <span className="text-neutral-300 font-medium">Tap-to-Connect Digital Profile Portals</span>
              </li>
              <li>
                <span className="text-neutral-300 font-medium">Custom Laser Engraved Bespoke Cards</span>
              </li>
            </ul>
          </div>

          {/* Direct Support & Orders */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Contact & Consultations
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/2349030001851"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  WhatsApp: +234 903 000 1851
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                <a href="mailto:billing@identifine.com" className="hover:text-white transition">
                  billing@identifine.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span>Warewa / Lagos-Ibadan Expressway Corridor, Nigeria</span>
              </li>
            </ul>
            <div className="pt-2">
              <a
                href="https://wa.me/2349030001851?text=Hello%20Identifine%2C%20I%20want%20to%20inquire%20about%20your%20Smart%20NFC%20Cards"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-bold text-emerald-400 hover:bg-emerald-500/20 transition"
              >
                <span>Chat Directly on WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Zero Admin Links) */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} IDENTIFINE & XTREME CARDZ TECHNOLOGIES. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/faq" className="hover:text-neutral-300">
              Frequently Asked Questions
            </Link>
            <span>•</span>
            <Link href="/pricing" className="hover:text-neutral-300">
              Payout Policy
            </Link>
            <span>•</span>
            <Link href="/guide" className="hover:text-neutral-300">
              System Guide
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
