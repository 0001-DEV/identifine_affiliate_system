"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { MarketingFooter } from "@/components/MarketingFooter";
import {
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Building2,
  CreditCard,
  ShieldCheck,
  Smartphone,
  Clock,
  Sparkles,
  Award,
  Layers,
  HelpCircle,
} from "lucide-react";

export default function PricingEarningsPage() {
  const [selectedPack, setSelectedPack] = useState<number>(1);

  const packages = [
    {
      id: "vip-metal",
      name: "VIP Custom Metal Card Suite",
      units: "10 Luxury Units",
      price: 180000,
      commission: 18000,
      description: "24K Brushed Gold, Rose Gold, or Gunmetal Stainless Steel smart NFC cards for C-Suite executives, founders, and VIP partners.",
      features: [
        "Aircraft-Grade Stainless Steel",
        "Laser Engraved Logo & Details",
        "Contactless Tap-to-Share Profile",
        "Lifetime Digital Cloud Hosting",
        "Luxury Individual Presentation Boxes",
      ],
      badge: "C-Suite Favorite",
    },
    {
      id: "exec-team",
      name: "Executive Team Smart NFC Pack",
      units: "25 Units",
      price: 250000,
      commission: 25000,
      description: "Custom laser-engraved matte black PVC & Metal Hybrid smart cards tailored for executive sales teams, directors, and partners.",
      features: [
        "Premium Matte Black Finish",
        "Dynamic Contact & vCard Sharing",
        "Embedded NTAG High-Frequency Chip",
        "Full Brand Identity Alignment",
        "Dedicated Account Setup Assistance",
      ],
      badge: "Most Popular",
    },
    {
      id: "corp-enterprise",
      name: "Corporate Enterprise Identity Pack",
      units: "100 Units",
      price: 650000,
      commission: 65000,
      description: "Full corporate rollout for medium to large enterprises, law firms, logistics groups, and institutions with central team management.",
      features: [
        "100 Smart NFC Corporate Cards",
        "Centralized Admin Management Portal",
        "CRM & Lead Capture Integration",
        "Dynamic Team Title & Profile Updates",
        "Priority Nationwide Express Dispatch",
      ],
      badge: "Highest Commission",
    },
    {
      id: "bespoke-b2b",
      name: "Bespoke Corporate Rollout / De-Titan",
      units: "150 – 500+ Units",
      price: 1200000,
      commission: 120000,
      description: "Custom RFID/NFC integrated door access badges, hotel keycards, event access systems, and large enterprise solutions.",
      features: [
        "3-in-1 Physical ID + RFID + Smart NFC",
        "Door & Turnstile Access System Encoding",
        "Custom Hologram / Foil Security Seals",
        "Enterprise API & Webhook Hooks",
        "Dedicated Enterprise Account Manager",
      ],
      badge: "Enterprise Custom",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col selection:bg-white selection:text-black transition-colors duration-200">
      <MarketingNav />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-24 border-b border-white/10 bg-gradient-to-b from-neutral-950 via-[#070708] to-[#0A0A0E] text-center">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              <span>Transparent 10% Cash Commission Structure</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Product Pricing & Affiliate Earnings
            </h1>
            <p className="text-xs sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Every package is priced transparently. When your referred client pays their invoice, 10% of their total spend is automatically credited to your wallet in cash.
            </p>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-16 md:py-24 border-b border-white/10 bg-[#070708]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-3xl border border-white/15 bg-[#111115] p-6 space-y-6 flex flex-col justify-between hover:border-amber-500/40 transition shadow-xl relative"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-amber-400/10 border border-amber-400/30 px-2.5 py-1 text-[10px] font-mono font-bold text-amber-300">
                        {pkg.badge}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400 font-bold">
                        {pkg.units}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold text-white">
                        {pkg.name}
                      </h3>
                      <div className="mt-2 text-2xl font-black text-white">
                        ₦{pkg.price.toLocaleString()}
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Affiliate Callout Banner */}
                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 space-y-0.5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
                        YOUR 10% COMMISSION
                      </div>
                      <div className="text-xl font-black text-emerald-400">
                        +₦{pkg.commission.toLocaleString()} CASH
                      </div>
                    </div>

                    {/* Feature list */}
                    <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/portal?tab=register"
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-white py-2.5 text-xs font-bold text-black hover:bg-neutral-200 transition"
                    >
                      <span>Earn ₦{pkg.commission.toLocaleString()}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Earning Scenarios */}
        <section className="py-16 md:py-24 border-b border-white/10 bg-[#09090D]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Realistic Monthly Earnings Models
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                How our partners scale their income based on their network and referral volume.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Level 1 */}
              <div className="rounded-3xl border border-white/10 bg-[#121216] p-7 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold">
                  LEVEL 1: CASUAL INTRODUCER
                </div>
                <div className="text-3xl font-black text-amber-400">
                  ₦75,000 / mo
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Refers just <strong>3 executive packs</strong> or <strong>1 corporate enterprise order</strong> a month simply by showing friends or posting on WhatsApp status.
                </p>
                <div className="pt-3 border-t border-white/10 text-xs text-neutral-400 space-y-1">
                  <div>• 3 × Executive Team (₦25k comm)</div>
                  <div>• Effort: ~1 hour a week</div>
                </div>
              </div>

              {/* Level 2 */}
              <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-[#121216] p-7 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                  LEVEL 2: ACTIVE NETWORKER
                </div>
                <div className="text-3xl font-black text-white">
                  ₦260,000 / mo
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Actively recommends Identifine to <strong>4 corporate companies</strong> and <strong>2 VIP clients</strong> each month through professional circles, LinkedIn, or business meetings.
                </p>
                <div className="pt-3 border-t border-white/10 text-xs text-neutral-400 space-y-1">
                  <div>• 4 × Corporate Enterprise (₦65k comm each)</div>
                  <div>• Effort: Part-time consulting</div>
                </div>
              </div>

              {/* Level 3 */}
              <div className="rounded-3xl border border-white/10 bg-[#121216] p-7 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  LEVEL 3: B2B CONSULTANT / AGENCY
                </div>
                <div className="text-3xl font-black text-emerald-400">
                  ₦650,000+ / mo
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Partners who introduce large corporate rollouts, law firms, banking branches, or universities ordering 100 to 500+ cards for their organization.
                </p>
                <div className="pt-3 border-t border-white/10 text-xs text-neutral-400 space-y-1">
                  <div>• 10 × Enterprise Packs / Bespoke Deployments</div>
                  <div>• Effort: High-value corporate introductions</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Withdrawal Policy & Banking Rules */}
        <section className="py-16 md:py-24 border-b border-white/10 bg-[#070708]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Withdrawal Rules & Banking Terms
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                Clear, transparent, and direct payout policies for all Nigerian partners.
              </p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-[#111115] p-6 sm:p-10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>₦50,000 Minimum Payout Threshold</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Once your available commission reaches ₦50,000, your withdrawal button unlocks automatically. You can withdraw all or part of your balance anytime.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>3 Working Hours Crediting Window</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Withdrawal requests submitted during regular Nigerian banking hours (9:00 AM – 5:00 PM) are reviewed and credited directly to your registered bank account within 3 working hours.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Building2 className="w-4 h-4 text-indigo-400" />
                    <span>All Nigerian Banks Supported</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    We support all CBN-licensed commercial banks and digital microfinance banks, including GTBank, Zenith Bank, Access Bank, First Bank, UBA, Moniepoint, Kuda Bank, OPay, and Providus.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>Zero Withdrawal Fees</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    There are no hidden administrative or bank deduction fees. If you request ₦100,000, exactly ₦100,000 arrives in your bank account.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/portal?tab=register"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-extrabold text-black hover:bg-neutral-200 transition shadow-xl"
              >
                <span>Join Now & Start Earning</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
