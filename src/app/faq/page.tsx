"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { MarketingFooter } from "@/components/MarketingFooter";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  Clock,
  Sparkles,
  MessageSquare,
} from "lucide-react";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    "faq-0": true,
    "faq-1": true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const faqData = [
    {
      category: "Getting Started & Eligibility",
      questions: [
        {
          q: "Is it really 100% free to join the affiliate program?",
          a: "Yes! There are absolutely zero registration, activation, or subscription fees. You will never be asked to pay any money to become or remain an Identifine & Xtreme Cardz Affiliate Partner.",
        },
        {
          q: "Who can become an affiliate partner?",
          a: "Anyone with a network of professionals, corporate executives, colleagues, business owners, or organizations! Our partners include management consultants, HR executives, tech founders, real estate consultants, university alumni, and freelance professionals across Nigeria.",
        },
        {
          q: "How do I get my referral code and link?",
          a: "Simply click 'Become an Affiliate' on this website and fill in your name, email, and WhatsApp number. In less than 30 seconds, your account will be activated and your dashboard will generate your personal Referral Code (e.g. LOVEOLAO-114) and your direct shareable Referral Link (/r/your-code).",
        },
      ],
    },
    {
      category: "Referral Tracking & WhatsApp",
      questions: [
        {
          q: "How does the platform track who I refer?",
          a: "Our software uses two bulletproof tracking methods: First, if someone clicks your personal link (/r/your-code), our system locks your code in their browser session. Second, if you tell someone your code directly (e.g. at a meeting or over the phone), they can go to the website, click 'Have a Code?', and enter your code. Once entered, their business name is permanently tied to your profile in the database.",
        },
        {
          q: "What happens when a client clicks 'Apply Code & Chat on WhatsApp'?",
          a: "Two things happen instantly: (1) The client is permanently recorded under your affiliate wallet in our database, and (2) WhatsApp opens automatically with a pre-filled message introducing them to our sales line with your code attached. Our sales and design team immediately takes over the consultation and closes the order.",
        },
        {
          q: "Can another affiliate claim my client?",
          a: "No. Once a client is registered with your referral code or link, our database locks that company under your affiliate account. Any invoice generated for that company is attributed exclusively to you.",
        },
      ],
    },
    {
      category: "Commissions & Earnings",
      questions: [
        {
          q: "What is the commission rate?",
          a: "Every affiliate receives a flat 10% cash commission on the gross invoice amount paid by their referred client. For instance, on an executive order of ₦250,000, you earn ₦25,000. On a corporate rollout of ₦650,000, you earn ₦65,000 cash.",
        },
        {
          q: "When is my commission credited to my wallet?",
          a: "Your commission is credited to your live dashboard wallet immediately when our team verifies and marks the client's invoice as paid. You can log into your portal anytime to inspect your live balance.",
        },
        {
          q: "Do I earn commission if the same client orders more cards in the future?",
          a: "Yes! When companies expand, hire new directors, or promote team members, they order additional cards. You receive your 10% commission on those recurring corporate re-orders.",
        },
      ],
    },
    {
      category: "Bank Withdrawals & Nigerian Accounts",
      questions: [
        {
          q: "What is the minimum withdrawal amount?",
          a: "The minimum payout threshold is ₦50,000. As soon as your cumulative earned commissions reach ₦50,000 or more, the withdrawal button unlocks in your dashboard.",
        },
        {
          q: "How fast is my withdrawal credited into my bank?",
          a: "Withdrawals requested during regular working hours (Monday to Friday, 9:00 AM – 5:00 PM) are reviewed and credited directly to your registered bank account within 3 working hours.",
        },
        {
          q: "Which Nigerian banks can I withdraw into?",
          a: "All CBN-licensed commercial banks and digital microfinance banks in Nigeria are supported. You can withdraw to GTBank, Zenith Bank, Access Bank, First Bank, UBA, Moniepoint MFB, Kuda Bank, OPay, Providus Bank, Stanbic IBTC, and many others.",
        },
        {
          q: "Are there any hidden deductions or transfer fees?",
          a: "No! There are zero platform deductions or hidden transaction fees. If you withdraw ₦100,000, exactly ₦100,000 is transferred into your bank account.",
        },
      ],
    },
    {
      category: "Products & Quality Assurance",
      questions: [
        {
          q: "What products does Identifine & Xtreme Cardz produce?",
          a: "We produce physical Black Matte Metal NFC Cards, VIP 24K Brushed Gold Cards, Titanium & Smart RFID Access Badges (ID + RFID access + digital vCard), Corporate Team PVC packs, and custom laser-engraved NFC products.",
        },
        {
          q: "Do smartphones need an app to read the smart cards?",
          a: "No! No app is required. When the card is tapped against any modern iPhone or Android smartphone, the contact profile or website opens instantly in their browser, allowing them to save contact details directly to their phone address book with a single tap.",
        },
        {
          q: "Do I have to do graphic designs or deliver the cards?",
          a: "No! Identifine and Xtreme Cardz handle all graphic proofing, laser engraving, NFC chip programming, packaging, and nationwide door-to-door courier delivery. You never touch the physical cards or deal with logistics.",
        },
      ],
    },
  ];

  const filteredFaqs = faqData
    .map((category) => {
      const filteredQuestions = category.questions.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...category, questions: filteredQuestions };
    })
    .filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col selection:bg-white selection:text-black transition-colors duration-200">
      <MarketingNav />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-24 border-b border-white/10 bg-gradient-to-b from-neutral-950 via-[#070708] to-[#0A0A0E] text-center">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Comprehensive Knowledge Base</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-xs sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Find instant, clear answers to every question about the Identifine & Xtreme Cardz Affiliate Program, referral tracking, commissions, and bank payouts.
            </p>

            {/* Search Input */}
            <div className="max-w-md mx-auto pt-4 relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search any question (e.g. withdrawal, bank, commission)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/15 bg-black/80 pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 md:py-24 border-b border-white/10 bg-[#070708]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-12">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 text-neutral-400 text-sm">
                No matching questions found for &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;commission&rdquo;, &ldquo;bank&rdquo;, or &ldquo;tracking&rdquo;.
              </div>
            ) : (
              filteredFaqs.map((category, catIdx) => (
                <div key={catIdx} className="space-y-4">
                  <h2 className="text-base sm:text-lg font-mono uppercase tracking-wider font-bold text-amber-300 border-b border-white/10 pb-2">
                    {category.category}
                  </h2>

                  <div className="space-y-3">
                    {category.questions.map((item, qIdx) => {
                      const id = `cat-${catIdx}-q-${qIdx}`;
                      const isOpen = openItems[id];
                      return (
                        <div
                          key={qIdx}
                          className="rounded-2xl border border-white/10 bg-[#111115] overflow-hidden transition"
                        >
                          <button
                            onClick={() => toggleItem(id)}
                            className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition"
                          >
                            <span className="text-sm sm:text-base font-bold text-white leading-snug">
                              {item.q}
                            </span>
                            <span className="text-neutral-400 shrink-0">
                              {isOpen ? (
                                <ChevronUp className="w-4 h-4 text-amber-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </span>
                          </button>

                          {isOpen && (
                            <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed border-t border-white/5 pt-4">
                              {item.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Still Have Questions Contact Box */}
        <section className="py-16 md:py-20 bg-[#09090D] text-center">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 space-y-6">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Have a Question Not Listed Here?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Our support team is available on WhatsApp to answer any specific questions about corporate packages or partnership setups.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href="https://wa.me/2349030001851?text=Hello%20Identifine%2C%20I%20have%20a%20question%20about%20the%20Affiliate%20Program"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-xs font-bold text-emerald-300 hover:bg-emerald-500/20 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat With Us on WhatsApp (+234 903 000 1851)</span>
              </a>

              <Link
                href="/portal?tab=register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-extrabold text-black hover:bg-neutral-200 transition"
              >
                <span>Join Program (Free)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
