"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { XtremLogo } from "@/components/XtremLogo";
import { LogIn, AlertCircle } from "lucide-react";

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

        {/* Switch to Register */}
        <div className="mt-6 border-t border-neutral-800 pt-4 text-center text-xs text-neutral-400">
          New to Identifine Partner Network?{" "}
          <Link
            href="/register"
            className="font-semibold text-white underline underline-offset-4 hover:text-neutral-200"
          >
            Create an Affiliate Account
          </Link>
        </div>
      </div>
    </div>
  );
}
