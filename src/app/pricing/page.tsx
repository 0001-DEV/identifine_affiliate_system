"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { MarketingFooter } from "@/components/MarketingFooter";
import {
  DollarSign,
  ArrowRight,
  ShieldCheck,
  FileText,
  Landmark,
  Zap,
  Sparkles,
  Layers,
} from "lucide-react";

export default function PricingEarningsPage() {
  const [salesInput, setSalesInput] = useState<string>("500000");
  const [calculatedCommission, setCalculatedCommission] = useState<number>(50000);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = Number(salesInput.replace(/[^0-9]/g, ""));
    if (!isNaN(cleanNum)) {
      setCalculatedCommission(Math.round(cleanNum * 0.1));
    }
  };

  const exampleTable = [
    { sales: "₦100,000", commission: "₦10,000" },
    { sales: "₦500,000", commission: "₦50,000" },
    { sales: "₦1,000,000", commission: "₦100,000" },
    { sales: "₦5,000,000", commission: "₦500,000" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-[#F59E0B] selection:text-black transition-colors duration-200">
      <MarketingNav />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO: EARNINGS & COMMISSION (EXACT MATCH TO MOCKUP)
           ========================================================================= */}
        <section className="py-16 md:py-20 border-b border-white/10 bg-black relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left Title */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                  Earnings &amp; Commission
                </h1>
                <p className="text-sm sm:text-base text-neutral-300 font-medium">
                  Know exactly how you earn and how to get paid.
                </p>
              </div>

              {/* Right Hero Graphic: Black & Gold card with stacked coins */}
              <div className="flex justify-center md:justify-end">
                <img
                  src="/images/products/earnings-coins-card.png"
                  alt="Earnings and Commission"
                  className="max-h-[180px] w-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. TWO BIG STAT CARDS (10% & ₦50,000)
           ========================================================================= */}
        <section className="py-10 bg-white text-neutral-900 border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1: Commission Rate */}
              <div className="rounded-3xl border border-neutral-200 bg-neutral-50/80 p-8 text-center space-y-2 shadow-sm">
                <div className="text-sm font-bold text-neutral-600">
                  Commission Rate
                </div>
                <div className="text-5xl sm:text-6xl font-black text-[#D97706] tracking-tight">
                  10%
                </div>
                <div className="text-xs text-neutral-500 font-medium">
                  on qualifying sales
                </div>
              </div>

              {/* Card 2: Minimum Withdrawal */}
              <div className="rounded-3xl border border-neutral-200 bg-neutral-50/80 p-8 text-center space-y-2 shadow-sm">
                <div className="text-sm font-bold text-neutral-600">
                  Minimum Withdrawal
                </div>
                <div className="text-5xl sm:text-6xl font-black text-[#D97706] tracking-tight">
                  ₦50,000
                </div>
                <div className="text-xs text-neutral-500 font-medium">
                  per request
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. ESTIMATE YOUR EARNINGS (CALCULATOR + TABLE)
           ========================================================================= */}
        <section className="py-16 md:py-20 bg-white text-neutral-900 border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-10">
            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
                Estimate Your Earnings
              </h2>
              <p className="text-sm text-neutral-600">
                Enter a sales amount to see your potential commission.
              </p>
            </div>

            {/* Input + Calculate Form */}
            <form onSubmit={handleCalculate} className="max-w-xl mx-auto flex items-center gap-3">
              <input
                type="text"
                value={salesInput}
                onChange={(e) => setSalesInput(e.target.value)}
                placeholder="Enter sales amount (₦)"
                className="flex-1 rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold px-7 py-3 text-sm transition shadow-sm cursor-pointer"
              >
                Calculate
              </button>
            </form>

            {/* Calculator Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
              {/* Left Result Card */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-8 flex flex-col items-center justify-center text-center space-y-2 shadow-sm">
                <div className="text-xs sm:text-sm font-bold text-neutral-600">
                  Your Estimated Commission
                </div>
                <div className="text-4xl sm:text-5xl font-black text-neutral-950 font-mono">
                  ₦{calculatedCommission.toLocaleString()}
                </div>
                <div className="text-xs text-neutral-500 font-medium">
                  (10% of your sales)
                </div>
              </div>

              {/* Right Example Earnings Table */}
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-6 shadow-sm">
                <div className="font-extrabold text-sm text-neutral-900 mb-3">
                  Example Earnings
                </div>
                <div className="overflow-hidden rounded-xl border border-neutral-200">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-neutral-100 text-neutral-700 font-bold border-b border-neutral-200">
                      <tr>
                        <th className="py-2.5 px-4">Sales Amount</th>
                        <th className="py-2.5 px-4">Your Commission</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 bg-white">
                      {exampleTable.map((row, idx) => (
                        <tr key={idx} className="hover:bg-neutral-50 transition">
                          <td className="py-2.5 px-4 font-mono font-medium text-neutral-900">{row.sales}</td>
                          <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">{row.commission}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. HOW YOU GET PAID (3 STEPS + PAYSTACK BADGE)
           ========================================================================= */}
        <section className="py-16 md:py-24 bg-white text-neutral-900 border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-neutral-950">
              How You Get Paid
            </h2>

            {/* 3 Step Icons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-16 w-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D97706] shadow-sm">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="text-xs font-bold text-neutral-500">1</div>
                <p className="text-sm font-bold text-neutral-900 max-w-[200px]">
                  Reach the minimum threshold (₦50,000)
                </p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="h-16 w-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D97706] shadow-sm">
                  <Landmark className="w-8 h-8" />
                </div>
                <div className="text-xs font-bold text-neutral-500">2</div>
                <p className="text-sm font-bold text-neutral-900 max-w-[200px]">
                  Request a withdrawal
                </p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="h-16 w-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D97706] shadow-sm">
                  <Zap className="w-8 h-8" />
                </div>
                <div className="text-xs font-bold text-neutral-500">3</div>
                <p className="text-sm font-bold text-neutral-900 max-w-[200px]">
                  Receive payment into your bank account
                </p>
              </div>
            </div>

            {/* Paystack Security Badge */}
            <div className="max-w-2xl mx-auto rounded-2xl bg-neutral-950 text-white p-5 flex items-center gap-4 shadow-xl">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#F59E0B]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Withdrawals are processed securely via Paystack, with your safety and convenience in mind.
              </p>
            </div>
          </div>
        </section>

        {/* Quick CTA */}
        <section className="bg-black py-12 px-4 sm:px-6 text-center">
          <div className="mx-auto max-w-4xl space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Ready to Start Earning?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Join thousands of professionals introducing luxury NFC smart cards in Nigeria.
            </p>
            <div className="pt-2">
              <Link
                href="/portal?tab=register"
                className="inline-flex items-center gap-2 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-black px-8 py-3.5 text-xs font-black shadow-lg transition hover:scale-105"
              >
                <span>Become an Affiliate</span>
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
