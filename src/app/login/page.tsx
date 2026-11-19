"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { XtremLogo } from "@/components/XtremLogo";
import { LogIn, AlertCircle, Lock, CheckCircle2, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/platform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "LOGIN",
          email,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Sign in failed.");
        setLoading(false);
        return;
      }

      localStorage.setItem("xtrem_user_id", data.user.id);
      localStorage.setItem("xtrem_user_name", data.user.name);
      localStorage.setItem("xtrem_user_role", data.user.role);
      localStorage.setItem("xtrem_user_code", data.user.referralCode);
      window.dispatchEvent(new Event("xtrem-auth-change"));

      if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Network error while signing in.");
      setLoading(false);
    }
  };

  const quickLogin = (
    id: string,
    name: string,
    role: string,
    code: string,
    target: string
  ) => {
    localStorage.setItem("xtrem_user_id", id);
    localStorage.setItem("xtrem_user_name", name);
    localStorage.setItem("xtrem_user_role", role);
    localStorage.setItem("xtrem_user_code", code);
    window.dispatchEvent(new Event("xtrem-auth-change"));
    router.push(target);
  };

  return (
    <div className="bg-executive-grid min-h-[calc(100vh-110px)] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-[#0C0C0C] p-6 sm:p-10 shadow-2xl">
        <div className="mb-6 border-b border-neutral-800 pb-6">
          <XtremLogo variant="light" size="sm" />
          <h1 className="text-2xl font-black text-white mt-4">
            Sign In to Your Account
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Access your referral link, track client invoices, or withdraw earnings.
          </p>
        </div>

        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 p-3 text-xs text-white">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="joshua@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-neutral-800 bg-black px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="password123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-800 bg-black px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-bold text-black hover:bg-neutral-200 transition disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? "Signing In..." : "Sign In"}</span>
          </button>
        </form>

        {/* Instant 1-Click Demo Logins */}
        <div className="mt-6 border-t border-neutral-800 pt-5 space-y-2.5">
          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
            Instant Demo Accounts (1-Click):
          </div>

          <button
            type="button"
            onClick={() =>
              quickLogin(
                "usr_aff_1",
                "Joshua Olusola",
                "AFFILIATE",
                "joshua-842",
                "/dashboard"
              )
            }
            className="flex w-full items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-neutral-200 hover:bg-neutral-900 hover:border-neutral-700 transition"
          >
            <span className="flex items-center gap-2 font-medium">
              <Lock className="w-3.5 h-3.5 text-neutral-400" />
              Joshua Olusola (Affiliate • ₦35k Balance / Below Threshold)
            </span>
            <span className="font-mono text-[10px] text-neutral-400">Open →</span>
          </button>

          <button
            type="button"
            onClick={() =>
              quickLogin(
                "usr_aff_2",
                "Tunde Bakare",
                "AFFILIATE",
                "tunde-510",
                "/dashboard"
              )
            }
            className="flex w-full items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-neutral-200 hover:bg-neutral-900 hover:border-neutral-700 transition"
          >
            <span className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              Tunde Bakare (Affiliate • ₦68k Balance / Withdrawal Unlocked)
            </span>
            <span className="font-mono text-[10px] text-neutral-400">Open →</span>
          </button>

          <button
            type="button"
            onClick={() =>
              quickLogin(
                "usr_admin",
                "Xtrem Cardz Admin",
                "ADMIN",
                "xtrem-hq",
                "/admin"
              )
            }
            className="flex w-full items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-neutral-200 hover:bg-neutral-900 hover:border-neutral-700 transition"
          >
            <span className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              Xtrem Cardz Admin (Generate Invoices & Approve Payouts)
            </span>
            <span className="font-mono text-[10px] text-neutral-400">Open →</span>
          </button>
        </div>

        <div className="mt-6 border-t border-neutral-800 pt-4 text-center text-xs text-neutral-400">
          New to Xtrem Cardz Partner Network?{" "}
          <Link
            href="/register"
            className="font-semibold text-white underline underline-offset-4"
          >
            Create an Affiliate Account
          </Link>
        </div>
      </div>
    </div>
  );
}
