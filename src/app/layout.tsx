import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "IDENTIFINE — Partner & Affiliate Commission App",
  description:
    "Refer businesses to Identifine, track official client invoices, earn 10% commission on every paid invoice, and withdraw directly to your bank account.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}else{document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#09090B] text-neutral-100 selection:bg-white selection:text-black">
        <SmoothScroll />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
