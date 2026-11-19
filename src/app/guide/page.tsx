"use client";

import React from "react";
import Link from "next/link";
import { Printer, ArrowLeft, Download } from "lucide-react";

export default function SystemGuidePage() {
  return (
    <div
      className="min-h-screen bg-[#070708] py-10 px-4 sm:px-6"
      style={{
        fontFamily:
          "'Plus Jakarta Sans', 'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Top Action Bar (Hidden in PDF Print) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-neutral-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-neutral-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to App</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <a
              href="/api/guide-pdf"
              download="Identifine_Affiliate_System_Guide.pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-extrabold text-black hover:bg-neutral-200 transition shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Now</span>
            </a>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-neutral-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-neutral-800 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Save / Print PDF</span>
            </button>
          </div>
        </div>

        {/* Clean, Bold, Structured Executive Document Sheet */}
        <div className="rounded-3xl bg-white text-neutral-900 p-8 sm:p-14 shadow-2xl space-y-9">
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b-4 border-black pb-7">
            <div className="space-y-2">
              <img
                src="/identifine_logo_dark.webp"
                alt="Identifine"
                className="h-14 w-auto object-contain"
              />
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black pt-2">
                Affiliate Partner Platform — How It Works
              </h1>
              <p className="text-sm sm:text-base font-semibold text-neutral-600">
                Official Step-by-Step Guide for Affiliates, Clients & Administrators
              </p>
            </div>

            <div className="self-start sm:self-center rounded-2xl bg-black text-white px-4 py-3 text-center">
              <div className="text-xs font-bold uppercase tracking-widest text-neutral-300">
                COMMISSION RATE
              </div>
              <div className="text-2xl font-black mt-0.5">10%</div>
            </div>
          </div>

          {/* Section 1: The Big Idea */}
          <div className="rounded-2xl bg-neutral-900 text-white p-6 sm:p-7 shadow-md">
            <div className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              1. THE BIG IDEA IN ONE SENTENCE
            </div>
            <p className="text-base sm:text-lg font-bold text-white mt-2 leading-relaxed">
              People sign up to get a personal Referral Code, give that code to
              clients who want Identifine products, earn 10% of whatever
              those clients pay you, and withdraw their money once their
              earnings reach ₦50,000.
            </p>
          </div>

          {/* Section 2: The 3 People in the System */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-wide text-black border-b-2 border-neutral-200 pb-2">
              2. The 3 People in the System
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border-2 border-neutral-200 bg-neutral-50 p-5 space-y-1.5">
                <div className="inline-block rounded-lg bg-black text-white px-2.5 py-1 text-xs font-extrabold uppercase">
                  1. The Affiliate
                </div>
                <div className="text-base font-extrabold text-black pt-1">
                  The Referrer
                </div>
                <p className="text-sm font-medium text-neutral-700 leading-relaxed">
                  Someone who signs up on the platform to earn a{" "}
                  <strong className="font-extrabold text-black">
                    10% commission
                  </strong>{" "}
                  by bringing paying clients to Identifine.
                </p>
              </div>

              <div className="rounded-2xl border-2 border-neutral-200 bg-neutral-50 p-5 space-y-1.5">
                <div className="inline-block rounded-lg bg-black text-white px-2.5 py-1 text-xs font-extrabold uppercase">
                  2. The Referee
                </div>
                <div className="text-base font-extrabold text-black pt-1">
                  The Client / Customer
                </div>
                <p className="text-sm font-medium text-neutral-700 leading-relaxed">
                  A person or business who wants to buy Smart NFC Cards from
                  Identifine using an Affiliate&apos;s{" "}
                  <strong className="font-extrabold text-black">
                    Referral Code
                  </strong>
                  .
                </p>
              </div>

              <div className="rounded-2xl border-2 border-neutral-200 bg-neutral-50 p-5 space-y-1.5">
                <div className="inline-block rounded-lg bg-black text-white px-2.5 py-1 text-xs font-extrabold uppercase">
                  3. The Admin
                </div>
                <div className="text-base font-extrabold text-black pt-1">
                  Identifine Team
                </div>
                <p className="text-sm font-medium text-neutral-700 leading-relaxed">
                  Your team that chats with the client on WhatsApp, records
                  their invoice & payment in the portal, and pays the affiliate.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Step-by-Step Workflow */}
          <div className="space-y-5">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-wide text-black border-b-2 border-neutral-200 pb-2">
              3. Step-by-Step: How a Deal Happens
            </h2>

            <div className="space-y-4">
              {/* STEP 1 */}
              <div className="rounded-2xl border-2 border-neutral-200 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black text-white font-black text-sm">
                    1
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-black">
                    The Affiliate Creates an Account & Gets a Code
                  </h3>
                </div>
                <ul className="space-y-2 text-sm sm:text-base font-medium text-neutral-800 list-disc pl-6">
                  <li>
                    A new person opens the app, clicks{" "}
                    <strong className="font-extrabold text-black">Sign Up</strong>,
                    and enters their{" "}
                    <strong className="font-extrabold text-black">
                      Name, Phone, Email, and Password
                    </strong>
                    .
                  </li>
                  <li>
                    The system immediately creates their personal dashboard and
                    gives them a unique{" "}
                    <strong className="font-extrabold text-black">
                      Referral Code
                    </strong>{" "}
                    (for example: <strong className="font-black">JOSHUA-842</strong>).
                  </li>
                  <li>
                    They also select their{" "}
                    <strong className="font-extrabold text-black">Bank Name</strong>{" "}
                    (from the dropdown of prominent Nigerian banks) and save their{" "}
                    <strong className="font-extrabold text-black">
                      10-digit Account Number
                    </strong>{" "}
                    for receiving payouts.
                  </li>
                </ul>
              </div>

              {/* STEP 2 */}
              <div className="rounded-2xl border-2 border-neutral-200 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black text-white font-black text-sm">
                    2
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-black">
                    A Client Uses That Code to Chat With You on WhatsApp
                  </h3>
                </div>
                <ul className="space-y-2 text-sm sm:text-base font-medium text-neutral-800 list-disc pl-6">
                  <li>
                    The Affiliate tells a client about Identifine and gives them
                    their code (<strong className="font-black">JOSHUA-842</strong>).
                  </li>
                  <li>
                    The client opens the platform, clicks{" "}
                    <strong className="font-extrabold text-black">
                      &ldquo;Have a Code?&rdquo;
                    </strong>
                    , enters <strong className="font-black">JOSHUA-842</strong> and
                    their{" "}
                    <strong className="font-extrabold text-black">
                      Name / Business Name
                    </strong>
                    , and clicks{" "}
                    <strong className="font-extrabold text-black">
                      &ldquo;Apply Code & Chat on WhatsApp&rdquo;
                    </strong>
                    .
                  </li>
                  <li>
                    <strong className="font-extrabold text-black">
                      Two things happen automatically at that exact second:
                    </strong>
                    <ol className="list-decimal pl-6 mt-1.5 space-y-1">
                      <li>
                        The system locks and records that client under Joshua&apos;s
                        account so Joshua gets credit for bringing them.
                      </li>
                      <li>
                        It opens a WhatsApp chat straight to your Identifine line
                        (<strong className="font-black">09030001851</strong>) saying:{" "}
                        <em>
                          &ldquo;Hello IDENTIFINE, I was referred with code
                          JOSHUA-842...&rdquo;
                        </em>
                      </li>
                    </ol>
                  </li>
                </ul>
              </div>

              {/* STEP 3 */}
              <div className="rounded-2xl border-2 border-neutral-200 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black text-white font-black text-sm">
                    3
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-black">
                    You Chat With the Client & Create Their Invoice in Admin
                  </h3>
                </div>
                <ul className="space-y-2 text-sm sm:text-base font-medium text-neutral-800 list-disc pl-6">
                  <li>
                    Your team chats with the client on WhatsApp (
                    <strong className="font-black">09030001851</strong>) and agrees
                    on what they are buying and the price (for example,{" "}
                    <strong className="font-black">₦300,000</strong>).
                  </li>
                  <li>
                    Your Admin opens the{" "}
                    <strong className="font-extrabold text-black">
                      Admin Control Center
                    </strong>{" "}
                    (<em>1. Client Invoices</em> tab) and clicks{" "}
                    <strong className="font-extrabold text-black">
                      Step 1: Create Invoice
                    </strong>{" "}
                    next to that client, entering the item and price (
                    <strong className="font-black">₦300,000</strong>).
                  </li>
                  <li>
                    <strong className="font-extrabold text-black">
                      How the Affiliate knows how much the client was billed:
                    </strong>{" "}
                    As soon as you create that invoice, Joshua&apos;s dashboard
                    automatically updates to show:
                    <ul className="list-disc pl-6 mt-1.5 space-y-1">
                      <li>
                        <strong className="font-extrabold text-black">
                          Client Billed:
                        </strong>{" "}
                        ₦300,000 (with a link to view the official invoice)
                      </li>
                      <li>
                        <strong className="font-extrabold text-black">
                          Expected 10% Commission:
                        </strong>{" "}
                        ₦30,000 (Invoice Sent)
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* STEP 4 */}
              <div className="rounded-2xl border-2 border-neutral-200 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black text-white font-black text-sm">
                    4
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-black">
                    The Client Pays & the Affiliate Earns 10%
                  </h3>
                </div>
                <ul className="space-y-2 text-sm sm:text-base font-medium text-neutral-800 list-disc pl-6">
                  <li>
                    Once the client pays for their order, you open the Admin
                    Portal and click{" "}
                    <strong className="font-extrabold text-black">
                      Step 2: Mark Paid (Credit 10%)
                    </strong>
                    .
                  </li>
                  <li>
                    The system automatically calculates{" "}
                    <strong className="font-extrabold text-black">10%</strong>{" "}
                    (₦30,000) and adds{" "}
                    <strong className="font-black">+₦30,000</strong> directly into
                    Joshua&apos;s wallet balance.
                  </li>
                </ul>
              </div>

              {/* STEP 5 */}
              <div className="rounded-2xl border-2 border-neutral-200 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black text-white font-black text-sm">
                    5
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-black">
                    The Progress Line & Withdrawal at ₦50,000
                  </h3>
                </div>
                <ul className="space-y-2 text-sm sm:text-base font-medium text-neutral-800 list-disc pl-6">
                  <li>
                    Inside the Affiliate&apos;s dashboard, there is a{" "}
                    <strong className="font-extrabold text-black">
                      Minimum Withdrawal Progress Bar
                    </strong>{" "}
                    set to <strong className="font-black">₦50,000</strong>.
                  </li>
                  <li>
                    When the progress bar is{" "}
                    <strong className="font-extrabold text-black">under 50%</strong>
                    , the line is <strong className="font-extrabold">Gold</strong>.
                    Once the progress bar reaches{" "}
                    <strong className="font-extrabold text-black">
                      50% and above
                    </strong>
                    , the line turns{" "}
                    <strong className="font-extrabold text-emerald-700">
                      Green
                    </strong>
                    .
                  </li>
                  <li>
                    While their balance is{" "}
                    <strong className="font-extrabold text-black">
                      less than ₦50,000
                    </strong>
                    , the Withdraw button stays{" "}
                    <strong className="font-extrabold text-black">Locked</strong>.
                    As soon as their balance reaches{" "}
                    <strong className="font-extrabold text-black">
                      ₦50,000 or more
                    </strong>
                    , the Withdraw button{" "}
                    <strong className="font-extrabold text-black">Unlocks</strong>!
                  </li>
                </ul>
              </div>

              {/* STEP 6 */}
              <div className="rounded-2xl border-2 border-neutral-200 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black text-white font-black text-sm">
                    6
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-black">
                    Bank Payout to the Affiliate
                  </h3>
                </div>
                <ul className="space-y-2 text-sm sm:text-base font-medium text-neutral-800 list-disc pl-6">
                  <li>
                    When the Affiliate clicks{" "}
                    <strong className="font-extrabold text-black">
                      Withdraw to Bank
                    </strong>
                    , their request appears in your{" "}
                    <strong className="font-extrabold text-black">
                      Admin Portal → 2. Withdrawals tab
                    </strong>{" "}
                    (affiliates are informed their bank account will be{" "}
                    <strong className="font-extrabold text-black">
                      credited within 3 working hours
                    </strong>
                    ).
                  </li>
                  <li>
                    You see their{" "}
                    <strong className="font-extrabold text-black">
                      Bank Name, Account Number, Account Name
                    </strong>
                    , and a{" "}
                    <strong className="font-extrabold text-black">
                      Copy Account No
                    </strong>{" "}
                    button.
                  </li>
                  <li>
                    You copy their account number, transfer their 10% commission
                    from your banking app, and click{" "}
                    <strong className="font-extrabold text-black">
                      ✓ Confirm Transferred
                    </strong>
                    . Their dashboard updates to{" "}
                    <strong className="font-extrabold text-black">Paid</strong>!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
