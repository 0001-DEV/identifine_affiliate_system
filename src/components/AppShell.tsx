"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { XtremLogo } from "./XtremLogo";
import { LogOut } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");

  const syncUser = () => {
    if (typeof window === "undefined") return;
    setCurrentUserId(localStorage.getItem("xtrem_user_id"));
    setUserName(localStorage.getItem("xtrem_user_name") || "");
    setUserRole(localStorage.getItem("xtrem_user_role") || "");
    setMounted(true);
  };

  useEffect(() => {
    syncUser();
    window.addEventListener("xtrem-auth-change", syncUser);
    return () => window.removeEventListener("xtrem-auth-change", syncUser);
  }, [pathname]);

  const isPublicRoute =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/guide" ||
    pathname?.startsWith("/r/") ||
    pathname?.startsWith("/invoice/");

  useEffect(() => {
    if (!mounted) return;
    if (!currentUserId && !isPublicRoute) {
      router.replace("/");
      return;
    }
    if (
      currentUserId &&
      userRole !== "ADMIN" &&
      pathname?.startsWith("/admin")
    ) {
      router.replace("/dashboard");
    }
  }, [mounted, currentUserId, userRole, isPublicRoute, pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("xtrem_user_id");
    localStorage.removeItem("xtrem_user_name");
    localStorage.removeItem("xtrem_user_role");
    localStorage.removeItem("xtrem_user_code");
    window.dispatchEvent(new Event("xtrem-auth-change"));
    router.push("/");
  };

  if (
    !currentUserId ||
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/guide" ||
    pathname?.startsWith("/invoice/") ||
    pathname?.startsWith("/r/")
  ) {
    return (
      <div className="min-h-screen bg-[#070708] text-white">{children}</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070708] text-white">
      {/* Ultra-Clean Minimal App Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070708]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <Link href={userRole === "ADMIN" ? "/admin" : "/dashboard"}>
            <XtremLogo variant="light" size="sm" showSubtitle={false} />
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-neutral-300">
              {userName}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:bg-white hover:text-black transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main
        className={`mx-auto px-4 py-8 ${
          pathname?.startsWith("/admin") ? "max-w-5xl" : "max-w-2xl"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
