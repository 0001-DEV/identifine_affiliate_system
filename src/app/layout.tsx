import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "XTREM CARDZ — Partner & Affiliate Commission App",
  description:
    "Refer businesses to Xtrem Cardz, track official client invoices, earn 10% commission on every paid invoice, and withdraw directly to your bank account.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#09090B] text-neutral-100 selection:bg-white selection:text-black">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
