"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { XtremLogo } from "@/components/XtremLogo";
import { MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";

export default function ReferralLandingPage() {
  const params = useParams();
  const urlCode = (params?.code as string) || "";

  const [refCode, setRefCode] = useState(urlCode);
  const [affiliate, setAffiliate] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);

  const [businessName, setBusinessName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (urlCode) setRefCode(urlCode);
    async function load() {
      const res = await fetch(
        `/api/platform?referralCode=${encodeURIComponent(urlCode)}`
      );
      const json = await res.json();
      setAffiliate(json.affiliate);
      setSettings(json.settings);
    }
    load();
  }, [urlCode]);

  const handleStartWhatsappChat = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/platform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "CREATE_REFERRAL",
          affiliateCode: refCode.trim(),
          businessName,
          contactName: businessName,
          source: "REFERRAL_LINK",
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Invalid referral code.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
      const companyPhone = "2349030001851"; // Maps directly to 09030001851
      const msg = `Hello IDENTIFINE,\n\nI was referred with code *${refCode
        .trim()
        .toUpperCase()}*.\n• Name / Business: ${businessName}`;
      const whatsappUrl = `https://wa.me/${companyPhone}?text=${encodeURIComponent(msg)}`;
      const newWin = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
        window.location.href = whatsappUrl;
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070708] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <XtremLogo size="lg" />
        </div>

        <div className="rounded-3xl border border-white/15 bg-[#111113] p-6 shadow-2xl space-y-5">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h2 className="text-lg font-bold text-white">
                Welcome to Identifine!
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Your referral code{" "}
                <strong className="text-white font-mono">
                  {refCode.toUpperCase()}
                </strong>{" "}
                has been applied for{" "}
                <strong className="text-white">{businessName}</strong>.
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                Thank you for choosing Identifine to redefine your professional
                and corporate identity. Please continue your conversation with our
                team on WhatsApp.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h1 className="text-lg font-bold text-white">
                  Welcome to Identifine
                </h1>
                <p className="text-xs text-neutral-400 mt-1">
                  {affiliate
                    ? `Referred by ${affiliate.name} (${affiliate.referralCode})`
                    : "Confirm your referral code and chat with us on WhatsApp"}
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl bg-neutral-900 p-3 text-xs text-white">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleStartWhatsappChat} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Referral Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={refCode}
                    onChange={(e) => setRefCode(e.target.value)}
                    placeholder="Enter referral code (e.g. joshua-842)"
                    className="w-full rounded-xl border border-white/20 bg-black px-4 py-3 font-mono text-sm font-bold text-white"
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder="Your Name or Business Name *"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white"
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-xs font-black text-black hover:bg-neutral-200 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>
                    {submitting
                      ? "Opening WhatsApp..."
                      : "Apply Code & Chat with Us on WhatsApp"}
                  </span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
