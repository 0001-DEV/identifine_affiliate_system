"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { XtremLogo } from "@/components/XtremLogo";
import {
  ArrowRight,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  UserPlus,
  LogIn,
} from "lucide-react";

export default function EntryAuthPortalPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"LOGIN" | "REGISTER" | "REFEREE">("LOGIN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Affiliate / Admin Auth Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Referee (Referred Client) Fields
  const [refCodeInput, setRefCodeInput] = useState("");
  const [clientBusiness, setClientBusiness] = useState("");
  const [refereeSubmitted, setRefereeSubmitted] = useState(false);

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
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }
      signInAndRedirect(data.user);
    } catch (err) {
      setError("Connection error.");
      setLoading(false);
    }
  };

  const handleRefereeWhatsapp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const cleanCode = refCodeInput.trim();
      const res = await fetch("/api/platform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "CREATE_REFERRAL",
          affiliateCode: cleanCode,
          businessName: clientBusiness,
          contactName: clientBusiness,
          source: "REFERRAL_LINK",
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
    <div className="min-h-screen bg-[#070708] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        {/* Official Identifine Logo */}
        <div className="flex flex-col items-center text-center space-y-2">
          <XtremLogo size="lg" showSubtitle={true} />
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-white/15 bg-[#111113] p-6 shadow-2xl space-y-5">
          {/* 3 Clear Tabs: 1. Partner Sign In | 2. Become Partner | 3. Referee (Enter Code & Chat on WhatsApp) */}
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
              Sign Up
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
            <div className="flex items-center gap-2 rounded-xl bg-neutral-900 border border-white/15 p-3 text-xs text-white">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* TAB 3: REFEREE / CLIENT ENTERING REFERRAL CODE TO CHAT ON WHATSAPP */}
          {mode === "REFEREE" ? (
            refereeSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-white">
                  Welcome to Identifine!
                </h2>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Your referral code{" "}
                  <strong className="text-white font-mono">
                    {refCodeInput.trim().toUpperCase()}
                  </strong>{" "}
                  has been applied for{" "}
                  <strong className="text-white">{clientBusiness}</strong>.
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                  Thank you for choosing Identifine to redefine your
                  professional and corporate identity. Please continue your
                  conversation with our team on WhatsApp.
                </p>
              </div>
            ) : (
            <form onSubmit={handleRefereeWhatsapp} className="space-y-3.5">
              <div className="text-center pb-1">
                <div className="text-sm font-bold text-white">
                  Were You Referred to Identifine?
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Enter the referral code given to you and chat with us on WhatsApp
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                  Referral Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. joshua-842"
                  value={refCodeInput}
                  onChange={(e) => setRefCodeInput(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-black px-4 py-3 font-mono text-sm font-bold text-white placeholder-neutral-600 focus:border-white focus:outline-none"
                />
              </div>

              <input
                type="text"
                required
                placeholder="Your Name or Business Name *"
                value={clientBusiness}
                onChange={(e) => setClientBusiness(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-xs font-black text-black hover:bg-neutral-200 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>
                  {loading ? "Connecting..." : "Apply Code & Chat on WhatsApp"}
                </span>
              </button>
            </form>
            )
          ) : (
            /* TAB 1 & 2: AFFILIATE / ADMIN LOGIN OR REGISTER */
            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {mode === "REGISTER" && (
                <>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="WhatsApp Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none"
                  />
                </>
              )}

              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none"
              />

              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-xs font-black text-black hover:bg-neutral-200 transition"
              >
                <span>
                  {loading
                    ? "Please wait..."
                    : mode === "LOGIN"
                    ? "Sign In"
                    : "Create Partner Account"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Clean Footer Portal Links so You Know Exactly Where Referee & Admin Are */}
        <div className="flex items-center justify-between px-2 text-xs text-neutral-400">
          <button
            type="button"
            onClick={() => {
              setError("");
              setMode("REFEREE");
            }}
            className="hover:text-white underline underline-offset-4"
          >
            Referee: Enter Referral Code
          </button>

          <button
            type="button"
            onClick={() =>
              signInAndRedirect({
                id: "usr_admin",
                name: "Identifine Admin",
                role: "ADMIN",
                referralCode: "identifine-hq",
              })
            }
            className="inline-flex items-center gap-1.5 hover:text-white underline underline-offset-4"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Open Admin Portal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
