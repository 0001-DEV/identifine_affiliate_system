"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { XtremLogo } from "./XtremLogo";
import {
  LayoutDashboard,
  ShieldCheck,
  UserPlus,
  LogIn,
  LogOut,
  Users,
  ExternalLink,
  CheckCircle2,
  Lock,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUserId, setCurrentUserId] = useState<string>("usr_aff_1");
  const [userName, setUserName] = useState<string>("Joshua Olusola");
  const [userRole, setUserRole] = useState<string>("AFFILIATE");
  const [referralCode, setReferralCode] = useState<string>("joshua-842");

  const syncUserFromStorage = () => {
    if (typeof window === "undefined") return;
    const savedId = localStorage.getItem("xtrem_user_id") || "usr_aff_1";
    const savedName = localStorage.getItem("xtrem_user_name") || "Joshua Olusola";
    const savedRole = localStorage.getItem("xtrem_user_role") || "AFFILIATE";
    const savedCode = localStorage.getItem("xtrem_user_code") || "joshua-842";
    setCurrentUserId(savedId);
    setUserName(savedName);
    setUserRole(savedRole);
    setReferralCode(savedCode);
  };

  useEffect(() => {
    syncUserFromStorage();
    window.addEventListener("xtrem-auth-change", syncUserFromStorage);
    return () =>
      window.removeEventListener("xtrem-auth-change", syncUserFromStorage);
  }, [pathname]);

  const switchDemoAccount = (
    id: string,
    name: string,
    role: string,
    code: string,
    targetRoute: string
  ) => {
    localStorage.setItem("xtrem_user_id", id);
    localStorage.setItem("xtrem_user_name", name);
    localStorage.setItem("xtrem_user_role", role);
    localStorage.setItem("xtrem_user_code", code);
    window.dispatchEvent(new Event("xtrem-auth-change"));
    router.push(targetRoute);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-[#080808]/95 backdrop-blur-md">
      {/* Top Interactive Demo Bar so User can test Affiliate vs Admin vs Referral Link in 1 click */}
      <div className="border-b border-neutral-900 bg-neutral-950 px-4 py-1.5 text-xs text-neutral-400">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-white animate-pulse" />
            <span className="font-mono uppercase tracking-wider text-neutral-300 font-semibold">
              Live Sandbox Mode:
            </span>
            <span className="hidden sm:inline text-neutral-400">
              Switch views instantly to test the full Affiliate → WhatsApp → Invoice → Payout cycle:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() =>
                switchDemoAccount(
                  "usr_aff_1",
                  "Joshua Olusola",
                  "AFFILIATE",
                  "joshua-842",
                  "/dashboard"
                )
              }
              className={`inline-flex items-center gap-1 rounded px-2.5 py-1 font-medium transition ${
                currentUserId === "usr_aff_1" && pathname === "/dashboard"
                  ? "bg-white text-black font-semibold"
                  : "bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800"
              }`}
            >
              <Lock className="w-3 h-3" />
              Joshua (₦35k / Locked)
            </button>

            <button
              onClick={() =>
                switchDemoAccount(
                  "usr_aff_2",
                  "Tunde Bakare",
                  "AFFILIATE",
                  "tunde-510",
                  "/dashboard"
                )
              }
              className={`inline-flex items-center gap-1 rounded px-2.5 py-1 font-medium transition ${
                currentUserId === "usr_aff_2" && pathname === "/dashboard"
                  ? "bg-white text-black font-semibold"
                  : "bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800"
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              Tunde (₦68k / Unlocked)
            </button>

            <Link
              href={`/r/${referralCode || "joshua-842"}`}
              className={`inline-flex items-center gap-1 rounded px-2.5 py-1 font-medium transition ${
                pathname?.startsWith("/r/")
                  ? "bg-white text-black font-semibold"
                  : "bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800"
              }`}
            >
              <ExternalLink className="w-3 h-3" />
              Test Referral Link (/r/{referralCode || "joshua-842"})
            </Link>

            <button
              onClick={() =>
                switchDemoAccount(
                  "usr_admin",
                  "Xtrem Cardz Admin",
                  "ADMIN",
                  "xtrem-hq",
                  "/admin"
                )
              }
              className={`inline-flex items-center gap-1 rounded px-2.5 py-1 font-medium transition ${
                pathname?.startsWith("/admin")
                  ? "bg-white text-black font-semibold"
                  : "bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800"
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              Admin & Invoice Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="focus:outline-none">
          <XtremLogo variant="light" size="md" />
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/dashboard"
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition ${
              pathname === "/dashboard"
                ? "bg-white text-black font-semibold shadow-sm"
                : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Affiliate Dashboard</span>
          </Link>

          <Link
            href="/admin"
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition ${
              pathname === "/admin"
                ? "bg-white text-black font-semibold shadow-sm"
                : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin & Invoices</span>
          </Link>

          <div className="h-5 w-px bg-neutral-800 mx-1 hidden sm:block" />

          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-900 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-white hover:text-black transition"
          >
            <UserPlus className="w-4 h-4" />
            <span className="hidden md:inline">Create Affiliate Account</span>
            <span className="md:hidden">Sign Up</span>
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium text-neutral-400 hover:text-white transition"
          >
            <LogIn className="w-4 h-4" />
            <span className="hidden lg:inline">Sign In</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
