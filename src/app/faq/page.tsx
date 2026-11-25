"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { MarketingFooter } from "@/components/MarketingFooter";
import {
  HelpCircle,
  Plus,
  Minus,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({
    0: true,
  });

  const toggleItem = (idx: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const faqItems = [
    {
      q: "What is the Identifine and Xtreme Cardz Affiliate Programme?",
      a: "It is an exclusive partner network that allows professionals, executives, agencies, and consultants to earn a flat 7.5% cash commission by introducing businesses, executives, and organizations to Identifine and Xtreme Cardz luxury smart NFC business cards, corporate identity suites, and RFID badge systems.",
    },
    {
      q: "Who can become an affiliate?",
      a: "Anyone with access to corporate executives, business owners, professionals, or organizations! Our active affiliates include corporate executives, HR managers, realtors, agency founders, university alumni, and freelance professionals nationwide.",
    },
    {
      q: "Is registration free?",
      a: "Yes! Joining the programme is 100% free with zero registration fees, zero subscription costs, and zero hidden maintenance deductions. You will never be asked to pay to be an affiliate.",
    },
    {
      q: "What products and services can I promote?",
      a: "You can promote our full suite of luxury laser-engraved 24K gold, matte black, and titanium smart NFC business cards, corporate employee smart badges (like De-Titan 3-in-1), RFID building access cards, hotel keycards, and digital cloud profile solutions.",
    },
    {
      q: "How do I refer a business?",
      a: "Once registered, you receive a unique personal referral link (e.g. /r/your-code) and referral code. You can share your link via WhatsApp, email, or social media, or tell clients to enter your referral code when booking an order.",
    },
    {
      q: "How much commission do I earn?",
      a: "You earn a flat 7.5% cash commission on every qualifying paid invoice. For example, on a ₦500,000 corporate order, your take-home cash commission is ₦37,500. On a ₦5,000,000 enterprise rollout, you earn ₦375,000.",
    },
    {
      q: "When is my commission approved?",
      a: "Your commission is automatically approved and credited to your live dashboard wallet immediately after the referred client settles their official invoice with our sales desk.",
    },
    {
      q: "How can I withdraw my earnings?",
      a: "Once your balance reaches the ₦50,000 minimum threshold, simply click 'Withdraw' inside your affiliate dashboard. Payouts are processed securely via Paystack directly into any commercial or digital Nigerian bank account within 3 working hours.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-[#F59E0B] selection:text-black transition-colors duration-200">
      <MarketingNav />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO: FREQUENTLY ASKED QUESTIONS (EXACT MATCH TO MOCKUP)
           ========================================================================= */}
        <section className="py-16 md:py-20 border-b border-white/10 bg-black relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left Title */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.05]">
                  Frequently Asked Questions
                </h1>
                <p className="text-sm sm:text-base text-neutral-300 font-medium">
                  Get answers to common questions about the Identifine Affiliate Programme.
                </p>
              </div>

              {/* Right Hero Graphic: 3D Speech bubbles with question mark */}
              <div className="flex justify-center md:justify-end">
                <img
                  src="/images/products/faq-speech-bubbles.png"
                  alt="Frequently Asked Questions"
                  className="max-h-[180px] w-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. 8 ACCORDION QUESTIONS (WHITE CLEAN SECTION FROM MOCKUP)
           ========================================================================= */}
        <section className="py-16 md:py-24 bg-white text-neutral-900 border-b border-neutral-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="divide-y divide-neutral-200 border-y border-neutral-200">
              {faqItems.map((item, idx) => {
                const isOpen = !!openItems[idx];
                return (
                  <div key={idx} className="py-4">
                    <button
                      onClick={() => toggleItem(idx)}
                      className="w-full flex items-center justify-between text-left py-2 gap-4 text-sm sm:text-base font-bold text-neutral-900 hover:text-[#D97706] transition"
                    >
                      <span>{item.q}</span>
                      <span className="text-[#D97706] shrink-0 h-6 w-6 rounded-full border border-neutral-200 flex items-center justify-center">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pt-2 pb-3 text-xs sm:text-sm text-neutral-600 leading-relaxed animate-[slideUpFade_0.3s_ease-out]">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Support Callout Card */}
            <div className="mt-14 rounded-2xl bg-neutral-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="flex items-center gap-4 text-left">
                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-[#F59E0B]">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Still have questions?
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400">
                    Contact our support team for assistance.
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/2349030001851?text=Hello%20Identifine%2C%20I%20have%20questions%20about%20the%20Affiliate%20Programme."
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-black px-7 py-3 text-xs font-extrabold transition shadow-md hover:scale-105"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
