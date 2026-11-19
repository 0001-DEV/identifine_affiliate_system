"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Landmark,
  Users,
  Settings,
  Copy,
  Check,
  ArrowUpRight,
  X,
  CreditCard,
  Lock,
  Unlock,
} from "lucide-react";

export default function AdminPortalPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "REFERRALS" | "WITHDRAWALS" | "AFFILIATES" | "SETTINGS"
  >("REFERRALS");
  const [bannerMsg, setBannerMsg] = useState("");
  const [copiedId, setCopiedId] = useState("");

  // Invoice Generator Modal State
  const [invoiceTarget, setInvoiceTarget] = useState<any>(null);
  const [itemDesc, setItemDesc] = useState("");
  const [itemQty, setItemQty] = useState<number>(1);
  const [itemUnitPrice, setItemUnitPrice] = useState<number>(250000);
  const [invoiceNotes, setInvoiceNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Payment Confirmation Modal State
  const [paymentTarget, setPaymentTarget] = useState<any>(null);
  const [payAmount, setPayAmount] = useState<number>(0);
  const [payReference, setPayReference] = useState("");
  const [payMethod] = useState(
    "Bank Transfer (Confirmed via WhatsApp Receipt)"
  );

  // Settings State
  const [commissionRate, setCommissionRate] = useState<number>(10);
  const [minThreshold, setMinThreshold] = useState<number>(50000);
  const [currencySymbol, setCurrencySymbol] = useState<string>("₦");
  const [companyWhatsapp, setCompanyWhatsapp] = useState<string>("");
  const [companyBankName, setCompanyBankName] = useState<string>("");
  const [companyAccountNumber, setCompanyAccountNumber] = useState<string>("");
  const [companyAccountName, setCompanyAccountName] = useState<string>("");

  const loadAdminData = async () => {
    try {
      const res = await fetch("/api/platform");
      const json = await res.json();
      setData(json);
      if (json.settings) {
        setCommissionRate(json.settings.defaultCommissionRate);
        setMinThreshold(json.settings.minWithdrawalAmount);
        setCurrencySymbol(json.settings.currencySymbol);
        setCompanyWhatsapp(json.settings.companyWhatsapp);
        setCompanyBankName(json.settings.companyBankName);
        setCompanyAccountNumber(json.settings.companyAccountNumber);
        setCompanyAccountName(json.settings.companyAccountName);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  const { settings, referrals, withdrawals, affiliatesWithSummary } = data;
  const currency = settings.currencySymbol || "₦";
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000";

  const openInvoiceGenerator = (ref: any) => {
    setInvoiceTarget(ref);
    if (ref.invoiceItems?.length > 0) {
      setItemDesc(ref.invoiceItems[0].description);
      setItemQty(ref.invoiceItems[0].quantity);
      setItemUnitPrice(ref.invoiceItems[0].unitPrice);
    } else {
      setItemDesc(ref.serviceInterested || "Identifine Smart NFC Package");
      setItemQty(1);
      const foundPkg = settings.servicePackages?.find(
        (p: any) => p.name === ref.serviceInterested
      );
      setItemUnitPrice(foundPkg?.defaultPrice || 250000);
    }
    setInvoiceNotes(ref.notes || "");
  };

  const handleGenerateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceTarget) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/platform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "GENERATE_INVOICE",
          referralId: invoiceTarget.id,
          items: [
            {
              description: itemDesc,
              quantity: Number(itemQty),
              unitPrice: Number(itemUnitPrice),
            },
          ],
          notes: invoiceNotes,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setInvoiceTarget(null);
        setBannerMsg(
          `Invoice ${json.referral.invoiceNumber} (${currency}${json.referral.invoiceTotal.toLocaleString()}) created for ${json.referral.businessName}.`
        );
        setTimeout(() => setBannerMsg(""), 4500);
        await loadAdminData();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const openRecordPayment = (ref: any) => {
    setPaymentTarget(ref);
    const remaining = Math.max(
      0,
      (ref.invoiceTotal || 250000) - (ref.amountPaid || 0)
    );
    setPayAmount(remaining > 0 ? remaining : 250000);
    setPayReference(`TRX-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentTarget) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/platform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "RECORD_INVOICE_PAYMENT",
          referralId: paymentTarget.id,
          amount: payAmount,
          method: payMethod,
          reference: payReference,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        const credited = Math.round(
          (Number(payAmount) * settings.defaultCommissionRate) / 100
        );
        setPaymentTarget(null);
        setBannerMsg(
          `Payment confirmed! +${currency}${credited.toLocaleString()} (10%) added to ${json.referral.affiliateName}'s balance.`
        );
        setTimeout(() => setBannerMsg(""), 4500);
        await loadAdminData();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleProcessWithdrawal = async (
    withdrawalId: string,
    status: "APPROVED_PAID" | "REJECTED"
  ) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/platform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "PROCESS_WITHDRAWAL",
          withdrawalId,
          status,
        }),
      });
      if (res.ok) {
        setBannerMsg(
          status === "APPROVED_PAID"
            ? "Withdrawal approved and marked as Paid!"
            : "Withdrawal rejected and returned to partner balance."
        );
        setTimeout(() => setBannerMsg(""), 4500);
        await loadAdminData();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/platform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_SETTINGS",
          defaultCommissionRate: commissionRate,
          minWithdrawalAmount: minThreshold,
          currencySymbol,
          companyWhatsapp,
          companyBankName,
          companyAccountNumber,
          companyAccountName,
        }),
      });
      if (res.ok) {
        setBannerMsg("Platform settings saved.");
        setTimeout(() => setBannerMsg(""), 4000);
        await loadAdminData();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const copyWhatsAppInvoiceMessage = (ref: any) => {
    const invoiceUrl = `${origin}/invoice/${ref.invoiceNumber}`;
    const text = `Hello ${ref.contactName} (${ref.businessName}),\n\nHere is your official *IDENTIFINE* invoice (${ref.invoiceNumber}) for *${currency}${ref.invoiceTotal.toLocaleString()}*:\n\n${invoiceUrl}\n\nBank Transfer:\n• ${settings.companyBankName}\n• ${settings.companyAccountNumber}\n• ${settings.companyAccountName}`;
    navigator.clipboard.writeText(text);
    setCopiedId(ref.id);
    setTimeout(() => setCopiedId(""), 2500);
  };

  const pendingWithdrawalsCount = withdrawals.filter(
    (w: any) => w.status === "PENDING"
  ).length;
  const paidCount = referrals.filter(
    (r: any) => r.status === "PAID_CUSTOMER"
  ).length;

  return (
    <div className="space-y-6">
      {bannerMsg && (
        <div className="flex items-center justify-between rounded-2xl bg-white px-5 py-3.5 text-xs sm:text-sm font-bold text-black shadow-xl">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{bannerMsg}</span>
          </div>
          <button onClick={() => setBannerMsg("")}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. CLEAR TITLE & 3 QUICK OVERVIEW BOXES */}
      <div className="rounded-3xl border border-white/15 bg-[#111113] p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Admin Control Center
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              1. Create an invoice for a referred client → 2. Confirm when they pay → 3. Approve affiliate bank withdrawals
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-black p-4">
            <div className="text-xs text-neutral-400">Referred Clients</div>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {referrals.length}{" "}
              <span className="text-xs font-normal text-emerald-400">
                ({paidCount} Paid)
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black p-4">
            <div className="text-xs text-neutral-400">Registered Affiliates</div>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {affiliatesWithSummary.length}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black p-4">
            <div className="text-xs text-neutral-400">Pending Withdrawals</div>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {pendingWithdrawalsCount}
            </div>
          </div>
        </div>

        {/* 4 EASY NAVIGATION TABS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <button
            onClick={() => setActiveTab("REFERRALS")}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition ${
              activeTab === "REFERRALS"
                ? "bg-white text-black shadow"
                : "border border-white/10 bg-black text-neutral-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>1. Client Invoices ({referrals.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("WITHDRAWALS")}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition ${
              activeTab === "WITHDRAWALS"
                ? "bg-white text-black shadow"
                : "border border-white/10 bg-black text-neutral-400 hover:text-white"
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>2. Withdrawals ({withdrawals.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("AFFILIATES")}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition ${
              activeTab === "AFFILIATES"
                ? "bg-white text-black shadow"
                : "border border-white/10 bg-black text-neutral-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>3. Affiliates ({affiliatesWithSummary.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("SETTINGS")}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition ${
              activeTab === "SETTINGS"
                ? "bg-white text-black shadow"
                : "border border-white/10 bg-black text-neutral-400 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>4. Settings</span>
          </button>
        </div>
      </div>

      {/* TAB 1: REFERRED CLIENTS & INVOICES (CLEAN ROW LIST) */}
      {activeTab === "REFERRALS" && (
        <div className="space-y-3">
          {referrals.map((ref: any) => {
            const isPaid = ref.status === "PAID_CUSTOMER";
            return (
              <div
                key={ref.id}
                className="rounded-3xl border border-white/10 bg-[#111113] p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
              >
                {/* Left: Client & Who Referred Them */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-base font-bold text-white">
                      {ref.businessName}
                    </span>
                    {isPaid ? (
                      <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-400">
                        PAID CUSTOMER
                      </span>
                    ) : ref.invoiceNumber ? (
                      <span className="rounded-full bg-amber-400/20 border border-amber-400/40 px-2.5 py-0.5 font-mono text-[11px] font-bold text-amber-300">
                        INVOICE SENT ({ref.invoiceNumber})
                      </span>
                    ) : (
                      <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-neutral-300">
                        NEW WHATSAPP LEAD
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-neutral-400">
                    Referred by:{" "}
                    <strong className="text-white">{ref.affiliateName}</strong>{" "}
                    <span className="font-mono text-neutral-300">
                      (Code: {ref.affiliateCode})
                    </span>
                  </div>

                  {/* Invoice & 10% Commission Breakdown */}
                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
                    <div>
                      <span className="text-neutral-500">Client Invoice: </span>
                      <strong className="font-mono text-white">
                        {ref.invoiceTotal > 0
                          ? `${currency}${ref.invoiceTotal.toLocaleString()}`
                          : "Not created yet"}
                      </strong>
                    </div>

                    <div>
                      <span className="text-neutral-500">
                        Affiliate 10% Commission:{" "}
                      </span>
                      <strong
                        className={`font-mono ${
                          isPaid ? "text-emerald-400" : "text-white"
                        }`}
                      >
                        {ref.earnedCommission > 0
                          ? `+${currency}${ref.earnedCommission.toLocaleString()} (Credited)`
                          : ref.expectedCommission > 0
                          ? `${currency}${ref.expectedCommission.toLocaleString()} (Waiting for payment)`
                          : "10% once billed"}
                      </strong>
                    </div>

                    {ref.invoiceNumber && (
                      <Link
                        href={`/invoice/${ref.invoiceNumber}`}
                        className="inline-flex items-center gap-1 font-mono text-xs text-white underline"
                      >
                        <span>View Invoice</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right: Clear Step-by-Step Buttons */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => openInvoiceGenerator(ref)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-neutral-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 transition"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>
                      {ref.invoiceNumber
                        ? "Edit Invoice"
                        : "Step 1: Create Invoice"}
                    </span>
                  </button>

                  {ref.invoiceNumber && (
                    <button
                      onClick={() => copyWhatsAppInvoiceMessage(ref)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black px-3.5 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white transition"
                    >
                      {copiedId === ref.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Invoice</span>
                        </>
                      )}
                    </button>
                  )}

                  {!isPaid && (
                    <button
                      onClick={() => openRecordPayment(ref)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-black text-black hover:bg-neutral-200 transition shadow"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Step 2: Mark Paid (Credit 10%)</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: AFFILIATE BANK WITHDRAWALS (ZERO-FEE DIRECT BANK TRANSFER WORKFLOW) */}
      {activeTab === "WITHDRAWALS" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-black p-4 text-xs text-neutral-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <strong className="text-white">How Zero-Fee Payouts Work:</strong>{" "}
              1. Copy the affiliate&apos;s bank account number below → 2. Transfer
              the amount from your company bank app → 3. Click{" "}
              <strong className="text-white">&ldquo;Confirm Transferred&rdquo;</strong> to
              update their dashboard.
            </div>
          </div>

          {withdrawals.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#111113] p-10 text-center space-y-2">
              <Landmark className="w-8 h-8 text-neutral-500 mx-auto" />
              <div className="text-sm font-bold text-white">
                No Bank Withdrawal Requests Yet
              </div>
              <p className="text-xs text-neutral-400">
                When an affiliate reaches {currency}
                {settings.minWithdrawalAmount.toLocaleString()} and clicks
                Withdraw, their bank account details and payout button will
                appear here.
              </p>
            </div>
          ) : (
            withdrawals.map((w: any) => (
              <div
                key={w.id}
                className="rounded-3xl border border-white/10 bg-[#111113] p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold text-white">
                      {w.affiliateName}
                    </span>
                    <span className="font-mono text-xs text-neutral-400">
                      ({w.reference})
                    </span>
                    <span className="text-xs text-neutral-500">
                      • {new Date(w.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Bank Details Box with 1-Click Copy Account Number */}
                  <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-black px-4 py-2.5 text-xs">
                    <div>
                      <span className="text-neutral-400">Bank: </span>
                      <strong className="text-white">{w.bankName}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400">Account No: </span>
                      <strong className="font-mono text-sm text-white">
                        {w.accountNumber}
                      </strong>
                    </div>
                    <div>
                      <span className="text-neutral-400">Name: </span>
                      <strong className="font-mono text-white">
                        {w.accountName}
                      </strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(w.accountNumber);
                        setCopiedId(`acc_${w.id}`);
                        setTimeout(() => setCopiedId(""), 2500);
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-neutral-900 px-2.5 py-1 font-mono text-[11px] font-bold text-white hover:bg-white hover:text-black transition"
                    >
                      {copiedId === `acc_${w.id}` ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Account No Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Account No</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4">
                  <div className="lg:text-right">
                    <div className="text-[10px] font-mono uppercase text-neutral-400">
                      Amount to Transfer
                    </div>
                    <div className="font-mono text-2xl font-black text-white">
                      {currency}
                      {w.amount.toLocaleString()}
                    </div>
                  </div>

                  {w.status === "PENDING" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleProcessWithdrawal(w.id, "APPROVED_PAID")
                        }
                        disabled={submitting}
                        className="rounded-xl bg-emerald-500 px-4 py-3 text-xs font-black text-black hover:bg-emerald-400 transition shadow"
                      >
                        ✓ Confirm Transferred
                      </button>
                      <button
                        onClick={() =>
                          handleProcessWithdrawal(w.id, "REJECTED")
                        }
                        disabled={submitting}
                        className="rounded-xl border border-white/15 px-3 py-3 text-xs font-bold text-neutral-300 hover:text-white"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`rounded-xl px-3.5 py-2 font-mono text-xs font-bold ${
                        w.status === "APPROVED_PAID"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/10 text-neutral-400"
                      }`}
                    >
                      {w.status === "APPROVED_PAID"
                        ? "✓ TRANSFERRED TO BANK"
                        : "REJECTED"}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: REGISTERED AFFILIATES */}
      {activeTab === "AFFILIATES" && (
        <div className="space-y-3">
          {affiliatesWithSummary.map((aff: any) => {
            const isGreen = aff.summary.thresholdProgressPercent >= 50;
            return (
              <div
                key={aff.id}
                className="rounded-3xl border border-white/10 bg-[#111113] p-5 sm:p-6 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="text-base font-bold text-white">
                      {aff.name}
                    </div>
                    <div className="text-xs text-neutral-400">
                      Referral Code:{" "}
                      <strong className="font-mono text-white">
                        {aff.referralCode}
                      </strong>{" "}
                      • Commission Rate:{" "}
                      <strong className="text-white">
                        {aff.commissionRate}%
                      </strong>{" "}
                      • Bank:{" "}
                      {aff.bankName
                        ? `${aff.bankName} (${aff.accountNumber})`
                        : "Not set"}
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <div className="font-mono text-xl font-black text-white">
                      Balance: {currency}
                      {aff.summary.availableBalance.toLocaleString()}
                    </div>
                    <div
                      className={`text-xs font-mono font-bold ${
                        aff.summary.canWithdraw
                          ? "text-emerald-400"
                          : "text-neutral-400"
                      }`}
                    >
                      {aff.summary.canWithdraw
                        ? "✓ Eligible to Withdraw"
                        : `Locked (Needs ${currency}${aff.summary.amountRemainingToUnlock.toLocaleString()} more)`}
                    </div>
                  </div>
                </div>

                {/* Progress Bar (Gold under 50%, Green 50% and above) */}
                <div className="h-2 w-full rounded-full bg-black overflow-hidden">
                  <div
                    className={`h-full ${
                      isGreen ? "bg-emerald-500" : "bg-amber-400"
                    }`}
                    style={{
                      width: `${aff.summary.thresholdProgressPercent}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 4: PLATFORM SETTINGS */}
      {activeTab === "SETTINGS" && (
        <div className="rounded-3xl border border-white/10 bg-[#111113] p-6 space-y-5">
          <h2 className="text-base font-bold text-white">
            Commission Rate, Withdrawal Threshold & Bank Details
          </h2>
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  Affiliate Commission (%)
                </label>
                <input
                  type="number"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 font-mono font-bold text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  Minimum Withdrawal ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={minThreshold}
                  onChange={(e) => setMinThreshold(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 font-mono font-bold text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  Currency
                </label>
                <select
                  value={currencySymbol}
                  onChange={(e) => setCurrencySymbol(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 font-mono text-white"
                >
                  <option value="₦">₦ (NGN)</option>
                  <option value="$">$ (USD)</option>
                  <option value="£">£ (GBP)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  Company WhatsApp Number
                </label>
                <input
                  type="text"
                  value={companyWhatsapp}
                  onChange={(e) => setCompanyWhatsapp(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-2.5 font-mono text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  Company Bank Name (Shown on Client Invoices)
                </label>
                <input
                  type="text"
                  value={companyBankName}
                  onChange={(e) => setCompanyBankName(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  Company Account Number
                </label>
                <input
                  type="text"
                  value={companyAccountNumber}
                  onChange={(e) => setCompanyAccountNumber(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-2.5 font-mono text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  Company Account Name
                </label>
                <input
                  type="text"
                  value={companyAccountName}
                  onChange={(e) => setCompanyAccountName(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-2.5 font-mono text-xs text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-white px-6 py-3 text-xs font-black text-black hover:bg-neutral-200 transition"
            >
              Save Settings
            </button>
          </form>
        </div>
      )}

      {/* MODAL A: STEP 1 — CREATE CLIENT INVOICE */}
      {invoiceTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#111113] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  Step 1: Create Client Invoice
                </h3>
                <p className="text-xs text-neutral-400">
                  Client: {invoiceTarget.businessName} (Referred by{" "}
                  {invoiceTarget.affiliateName})
                </p>
              </div>
              <button onClick={() => setInvoiceTarget(null)}>
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            <form onSubmit={handleGenerateInvoice} className="space-y-3.5">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  What is the client buying? *
                </label>
                <input
                  type="text"
                  required
                  value={itemDesc}
                  onChange={(e) => setItemDesc(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={itemQty}
                    onChange={(e) => setItemQty(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 font-mono text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    Price ({currency}) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1000}
                    value={itemUnitPrice}
                    onChange={(e) => setItemUnitPrice(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 font-mono text-sm text-white"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black p-4 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Total Client Invoice:</span>
                  <span className="font-mono font-bold text-white">
                    {currency}
                    {(Number(itemQty) * Number(itemUnitPrice)).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">
                    Affiliate&apos;s 10% Commission:
                  </span>
                  <span className="font-mono font-black text-emerald-400">
                    {currency}
                    {Math.round(
                      (Number(itemQty) *
                        Number(itemUnitPrice) *
                        settings.defaultCommissionRate) /
                        100
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-white py-3.5 text-xs font-black text-black"
              >
                {submitting ? "Creating Invoice..." : "Create Invoice"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL B: STEP 2 — MARK CLIENT INVOICE AS PAID */}
      {paymentTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#111113] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  Step 2: Confirm Client Payment
                </h3>
                <p className="text-xs text-neutral-400">
                  {paymentTarget.businessName}
                </p>
              </div>
              <button onClick={() => setPaymentTarget(null)}>
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  Amount Paid by Client ({currency}) *
                </label>
                <input
                  type="number"
                  required
                  min={1000}
                  value={payAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-lg font-mono font-black text-white"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-black p-4 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Affiliate Credited:</span>
                  <span className="font-bold text-white">
                    {paymentTarget.affiliateName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">
                    10% Added to Their Balance:
                  </span>
                  <span className="font-mono text-sm font-black text-emerald-400">
                    +{currency}
                    {Math.round(
                      (Number(payAmount) * settings.defaultCommissionRate) / 100
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-white py-3.5 text-xs font-black text-black"
              >
                {submitting
                  ? "Confirming..."
                  : "Confirm Paid & Credit 10% to Affiliate"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
