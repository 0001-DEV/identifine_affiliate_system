"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { XtremLogo } from "@/components/XtremLogo";
import {
  ArrowRight,
  AlertCircle,
  MessageSquare,
  UserPlus,
  LogIn,
  CheckCircle2,
  ArrowLeft,
  DollarSign,
  HelpCircle,
  Shield,
} from "lucide-react";

function PortalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<"LOGIN" | "REGISTER" | "REFEREE">("LOGIN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Affiliate Auth Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Referee Fields
  const [refCodeInput, setRefCodeInput] = useState("");
  const [clientBusiness, setClientBusiness] = useState("");
  const [refereeSubmitted, setRefereeSubmitted] = useState(false);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "register") setMode("REGISTER");
    else if (tab === "referee") setMode("REFEREE");
    else if (tab === "login") setMode("LOGIN");

    const code = searchParams.get("code");
    if (code) {
      setRefCodeInput(code);
      setMode("REFEREE");
    }
  }, [searchParams]);

  const signInAndRedirect = (user: any) => {
    localStorage.setItem("xtrem_user_id", user.id);
    localStorage.setItem("xtrem_user_name", user.name);
    localStorage.setItem("xtrem_user_role", user.role);
    localStorage.setItem("xtrem_user_code", user.referralCode);
    window.dispatchEvent(new Event("xtrem-auth-change"));
    router.push(user.role === "ADMIN" ? "/admin" : "/dashboard");
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/platform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "LOGIN"
            ? { action: "LOGIN", email, password }
            : {
                action: "REGISTER_AFFILIATE",
                name,
                email,
                phone,
                password: password || "password123",
              }
        ),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Authentication failed. Please check credentials.");
        setLoading(false);
        return;
      }

      signInAndRedirect(data.user);
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefereeWhatsapp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const cleanCode = refCodeInput.trim().toLowerCase();

    if (!cleanCode) {
      setError("Please enter the referral code given to you.");
      return;
    }
    if (!clientBusiness.trim()) {
      setError("Please enter your name or business name.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/platform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "SUBMIT_REFERRAL_CODE",
          referralCode: cleanCode,
          businessName: clientBusiness,
          contactName: clientBusiness,
          contactPhone: "",
          contactEmail: "",
          notes: "Client entered referral code on web portal and clicked WhatsApp chat.",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid referral code. Please check the code.");
        setLoading(false);
        return;
      }

      const companyPhone = data.settings?.companyWhatsapp || "2349030001851";
      const msg = `Hello IDENTIFINE,\n\nI was referred with code *${cleanCode.toUpperCase()}*.\n• Name / Business: ${clientBusiness}`;
      window.open(
        `https://wa.me/${companyPhone}?text=${encodeURIComponent(msg)}`,
        "_blank",
        "noopener,noreferrer"
      );
      setRefereeSubmitted(true);
    } catch (err) {
      setError("Could not connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070708] flex flex-col items-center justify-center px-4 py-10 relative">
      {/* Back to Home Link */}
      <div className="w-full max-w-md flex items-center justify-between mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Website</span>
        </Link>
        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <Link href="/pricing" className="hover:text-white transition">
            Earnings
          </Link>
          <span>•</span>
          <Link href="/faq" className="hover:text-white transition">
            FAQ
          </Link>
        </div>
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Official Identifine Logo */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/">
            <XtremLogo size="lg" showSubtitle={true} />
          </Link>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-white/15 bg-[#111113] p-6 shadow-2xl space-y-5">
          {/* 3 Tabs: 1. Sign In | 2. Register | 3. Referee Code */}
          <div className="grid grid-cols-3 rounded-xl bg-black p-1 border border-white/10 gap-1">
            <button
              type="button"
              onClick={() => {
                setError("");
                setMode("LOGIN");
              }}
              className={`rounded-lg py-2.5 text-xs font-bold transition ${
                mode === "LOGIN"
                  ? "bg-white text-black"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setError("");
                setMode("REGISTER");
              }}
              className={`rounded-lg py-2.5 text-xs font-bold transition ${
                mode === "REGISTER"
                  ? "bg-white text-black"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => {
                setError("");
                setMode("REFEREE");
              }}
              className={`rounded-lg py-2.5 text-xs font-bold transition ${
                mode === "REFEREE"
                  ? "bg-white text-black"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Have a Code?
            </button>
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {mode === "REFEREE" ? (
            refereeSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-white">
                  Welcome to Identifine!
                </h2>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Your referral code{" "}
                  <strong className="text-white font-mono">
                    {refCodeInput.trim().toUpperCase()}
                  </strong>{" "}
                  has been recorded for{" "}
                  <strong className="text-white">{clientBusiness}</strong>.
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                  Thank you for choosing Identifine to redefine your
                  professional and corporate identity. Please continue your
                  order on WhatsApp with our team.
                </p>
                <button
                  onClick={() => setRefereeSubmitted(false)}
                  className="mt-3 text-xs text-white underline underline-offset-4 hover:text-neutral-300"
                >
                  Enter another code
                </button>
              </div>
            ) : (
              <form onSubmit={handleRefereeWhatsapp} className="space-y-3.5">
                <div className="text-center pb-1">
                  <div className="text-sm font-bold text-white">
                    Were You Referred to Identifine?
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Enter the referral code given to you to link your order and chat with us on WhatsApp.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Referral Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. LOVEOLAO-114"
                    value={refCodeInput}
                    onChange={(e) => setRefCodeInput(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black px-4 py-2.5 text-sm font-mono uppercase text-white placeholder:text-neutral-600 focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Your Name or Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vanguard Logistics Ltd"
                    value={clientBusiness}
                    onChange={(e) => setClientBusiness(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-white py-3 text-xs font-bold text-black hover:bg-neutral-200 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>
                    {loading ? "Connecting..." : "Apply Code & Chat on WhatsApp"}
                  </span>
                </button>
              </form>
            )
          ) : (
            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {mode === "REGISTER" && (
                <>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Love Olaoye"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +234 812 345 6789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:outline-none"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. partner@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-white py-3 text-xs font-bold text-black hover:bg-neutral-200 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg mt-2"
              >
                {mode === "LOGIN" ? (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>{loading ? "Signing In..." : "Sign In to Dashboard"}</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>{loading ? "Creating..." : "Create Affiliate Account"}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Perks Bar */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <DollarSign className="w-3.5 h-3.5" /> 10% Cash Commission
            </span>
            <span>•</span>
            <span>₦50k Bank Payout</span>
            <span>•</span>
            <span>3hr Working Hours</span>
          </div>
        </div>

        {/* Footer info (Strictly No Admin Link) */}
        <div className="text-center text-xs text-neutral-500 space-y-1">
          <p>© {new Date().getFullYear()} IDENTIFINE & XTREME CARDZ. All rights reserved.</p>
          <div className="flex justify-center gap-4 pt-1">
            <Link href="/" className="hover:text-neutral-300">
              Home
            </Link>
            <Link href="/pricing" className="hover:text-neutral-300">
              Earnings Breakdown
            </Link>
            <Link href="/faq" className="hover:text-neutral-300">
              FAQ
            </Link>
            <Link href="/guide" className="hover:text-neutral-300">
              System Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070708] flex items-center justify-center text-white text-xs">Loading portal...</div>}>
      <PortalContent />
    </Suspense>
  );
}
