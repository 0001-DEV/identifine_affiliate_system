"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { XtremLogo } from "@/components/XtremLogo";
import {
  UserPlus,
  ArrowRight,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/platform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "REGISTER_AFFILIATE",
          name,
          email,
          phone,
          password: password || "password123",
          bankName,
          accountNumber,
          accountName: accountName || name.toUpperCase(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed.");
        setLoading(false);
        return;
      }

      // Save new affiliate session & go directly to dashboard where their referral link awaits
      localStorage.setItem("xtrem_user_id", data.user.id);
      localStorage.setItem("xtrem_user_name", data.user.name);
      localStorage.setItem("xtrem_user_role", data.user.role);
      localStorage.setItem("xtrem_user_code", data.user.referralCode);
      window.dispatchEvent(new Event("xtrem-auth-change"));

      router.push("/dashboard?welcome=1");
    } catch (err: any) {
      setError("Network error while creating account.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-executive-grid min-h-[calc(100vh-110px)] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-xl rounded-2xl border border-neutral-800 bg-[#0C0C0C] p-6 sm:p-10 shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6 mb-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
              PARTNER ONBOARDING
            </span>
            <h1 className="text-2xl font-black text-white mt-1">
              Create Your Affiliate Account
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Get your unique referral link immediately and earn 7.5% on every paid client invoice.
            </p>
          </div>
          <div className="hidden sm:block">
            <XtremLogo variant="light" size="sm" showSubtitle={false} />
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2.5 rounded-lg border border-neutral-700 bg-neutral-900 p-3.5 text-xs text-white">
            <AlertCircle className="w-4 h-4 shrink-0 text-white" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Chinedu Okafor"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!accountName) setAccountName(e.target.value.toUpperCase());
                }}
                className="w-full rounded-lg border border-neutral-800 bg-black px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                WhatsApp Phone Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. +234 803 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-neutral-800 bg-black px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-neutral-800 bg-black px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Password *
              </label>
              <input
                type="password"
                required
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-neutral-800 bg-black px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none"
              />
            </div>
          </div>

          {/* Payout Bank Account Setup (Optional during signup, required before withdrawal) */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-white" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Payout Bank Account (For Commission Withdrawals)
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">
                Can also be updated later
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. GTBank / Zenith"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full rounded-lg border border-neutral-800 bg-black px-3 py-2 text-xs text-white placeholder-neutral-600 focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">
                  10-Digit Account Number
                </label>
                <input
                  type="text"
                  maxLength={10}
                  placeholder="0123456789"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full rounded-lg border border-neutral-800 bg-black px-3 py-2 text-xs font-mono text-white placeholder-neutral-600 focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  placeholder="ACCOUNT NAME"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value.toUpperCase())}
                  className="w-full rounded-lg border border-neutral-800 bg-black px-3 py-2 text-xs font-mono text-white placeholder-neutral-600 focus:border-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3.5 text-sm font-bold text-black hover:bg-neutral-200 transition disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            <span>
              {loading
                ? "Generating Your Referral Link & Account..."
                : "Create Affiliate Account & Get Referral Link"}
            </span>
          </button>
        </form>

        <div className="mt-6 border-t border-neutral-800 pt-5 flex items-center justify-between text-xs text-neutral-400">
          <span>Already have a partner account?</span>
          <Link
            href="/login"
            className="font-semibold text-white underline underline-offset-4 hover:text-neutral-300"
          >
            Sign In to Your Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}
