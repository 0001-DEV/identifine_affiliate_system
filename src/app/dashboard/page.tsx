"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  Lock,
  Unlock,
  Landmark,
  Plus,
  CheckCircle2,
  X,
  AlertCircle,
  Send,
  ArrowUpRight,
} from "lucide-react";

const NIGERIAN_BANKS = [
  // Prominent Tier-1 & Popular Digital Banks First
  "GTBank (Guaranty Trust Bank)",
  "Access Bank",
  "Zenith Bank",
  "First Bank of Nigeria",
  "UBA (United Bank for Africa)",
  "OPay",
  "Moniepoint MFB",
  "PalmPay",
  "Kuda Bank",
  // Other Major Commercial Banks
  "Fidelity Bank",
  "FCMB (First City Monument Bank)",
  "Stanbic IBTC Bank",
  "Sterling Bank",
  "Union Bank of Nigeria",
  "Wema Bank / ALAT",
  "Polaris Bank",
  "Providus Bank",
  "Keystone Bank",
  "Ecobank Nigeria",
  "Jaiz Bank",
  "Globus Bank",
  "Parallex Bank",
  "PremiumTrust Bank",
  "SunTrust Bank",
  "Titan Trust Bank",
  "Unity Bank",
  "VFD Microfinance Bank",
  "Sparkle Microfinance Bank",
];

export default function AffiliateDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Modals
  const [showLeadModal, setShowLeadModal] = useState<boolean>(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [showBankModal, setShowBankModal] = useState<boolean>(false);

  // Form states — Submit a Business Lead
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Form states — Bank & Withdrawal
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState<number>(50000);

  const loadDashboard = async () => {
    const activeId =
      typeof window !== "undefined"
        ? localStorage.getItem("xtrem_user_id")
        : null;
    if (!activeId) return;

    try {
      const res = await fetch(`/api/platform?userId=${activeId}`);
      const json = await res.json();
      if (res.ok && json.user) {
        setData(json);
        setBankName(json.user.bankName || "");
        setAccountNumber(json.user.accountNumber || "");
        setAccountName(json.user.accountName || json.user.name.toUpperCase());
        setWithdrawAmount(
          Math.max(
            json.settings.minWithdrawalAmount,
            json.summary.availableBalance
          )
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
    window.addEventListener("xtrem-auth-change", loadDashboard);
    return () =>
      window.removeEventListener("xtrem-auth-change", loadDashboard);
  }, []);

  if (loading || !data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  const { user, summary, referrals, withdrawals, settings } = data;
  const currency = settings.currencySymbol || "₦";
  const referralCode = user.referralCode.toUpperCase();

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/platform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "CREATE_REFERRAL",
          affiliateId: user.id,
          affiliateCode: user.referralCode,
          businessName,
          contactName,
          contactPhone,
          contactEmail,
          source: "DASHBOARD_LEAD",
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setFormError(json.error || "Could not add referral.");
        setSubmitting(false);
        return;
      }
      setBusinessName("");
      setContactName("");
      setContactPhone("");
      setContactEmail("");
      setShowLeadModal(false);
      setFormSuccess(`Referral "${json.referral.businessName}" added.`);
      setTimeout(() => setFormSuccess(""), 3500);
      loadDashboard();
    } catch (err) {
      setFormError("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveBankDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/platform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_BANK_DETAILS",
          userId: user.id,
          bankName,
          accountNumber,
          accountName,
        }),
      });
      if (res.ok) {
        setShowBankModal(false);
        setFormSuccess("Bank account saved.");
        setTimeout(() => setFormSuccess(""), 3500);
        loadDashboard();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleRequestWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/platform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "REQUEST_WITHDRAWAL",
          userId: user.id,
          amount: withdrawAmount,
          bankName,
          accountNumber,
          accountName,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setFormError(json.error || "Withdrawal failed.");
        setSubmitting(false);
        return;
      }
      setShowWithdrawModal(false);
      setFormSuccess(
        `Withdrawal of ${currency}${Number(
          withdrawAmount
        ).toLocaleString()} requested! Your bank account will be credited within 3 working hours.`
      );
      setTimeout(() => setFormSuccess(""), 6000);
      loadDashboard();
    } catch (err) {
      setFormError("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {formSuccess && (
        <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-xs font-bold text-black shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{formSuccess}</span>
          </div>
          <button onClick={() => setFormSuccess("")}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. CLEAN WALLET & WITHDRAWAL CARD */}
      <div className="rounded-3xl border border-white/15 bg-[#111113] p-6 sm:p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs text-neutral-400">Your Balance</span>
            <div className="text-4xl sm:text-5xl font-black font-mono text-white mt-1">
              {currency}
              {summary.availableBalance.toLocaleString()}
            </div>
          </div>

          <span className="rounded-full bg-white text-black px-3.5 py-1 font-mono text-xs font-black">
            {summary.commissionRate}% Commission
          </span>
        </div>

        {/* Simple Progress Bar to Withdrawal: Gold below 50%, Green at 50% and more */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-400">
              Minimum to Withdraw:{" "}
              <strong className="text-white font-mono">
                {currency}
                {summary.minThreshold.toLocaleString()}
              </strong>
            </span>
            <span
              className={`font-mono font-bold ${
                summary.thresholdProgressPercent >= 50
                  ? "text-emerald-400"
                  : "text-amber-400"
              }`}
            >
              {summary.thresholdProgressPercent}%
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-black overflow-hidden border border-white/10">
            <div
              className={`h-full transition-all duration-500 ${
                summary.thresholdProgressPercent >= 50
                  ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                  : "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.4)]"
              }`}
              style={{ width: `${summary.thresholdProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Single Clear Withdraw Action + Bank Link */}
        <div className="pt-1 space-y-3">
          <button
            onClick={() => {
              setFormError("");
              if (summary.canWithdraw) {
                setShowWithdrawModal(true);
              }
            }}
            disabled={!summary.canWithdraw}
            className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-black transition ${
              summary.canWithdraw
                ? "bg-white text-black hover:bg-neutral-200 cursor-pointer shadow-lg"
                : "bg-neutral-900 text-neutral-500 border border-white/5 cursor-not-allowed"
            }`}
          >
            {summary.canWithdraw ? (
              <>
                <Unlock className="w-4 h-4" />
                <span>
                  Withdraw {currency}
                  {summary.availableBalance.toLocaleString()} to Bank
                </span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>
                  Earn {currency}
                  {summary.amountRemainingToUnlock.toLocaleString()} more to
                  withdraw
                </span>
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
            <span>
              Bank:{" "}
              {user.bankName
                ? `${user.bankName} (${user.accountNumber})`
                : "Not added yet"}
            </span>
            <button
              onClick={() => setShowBankModal(true)}
              className="font-semibold text-white underline underline-offset-4"
            >
              {user.bankName ? "Change Bank" : "Add Bank Account"}
            </button>
          </div>
          <div className="text-[11px] text-neutral-500 px-1">
            ⚡ Approved withdrawals are credited to your bank account within{" "}
            <strong className="text-neutral-300">3 working hours</strong>.
          </div>
        </div>
      </div>

      {/* 2. SIMPLE REFERRAL CODE BOX */}
      <div className="rounded-3xl border border-white/10 bg-[#111113] p-5 space-y-3">
        <div className="text-xs font-semibold text-neutral-300">
          Your Referral Code
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 rounded-xl border border-white/10 bg-black px-4 py-3 font-mono text-base font-bold tracking-wider text-white">
            {referralCode}
          </div>
          <button
            onClick={copyReferralCode}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-5 py-3 text-xs font-black text-black hover:bg-neutral-200 transition"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4" />
                <span>Code Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. SIMPLE REFERRED CLIENTS LIST */}
      <div className="rounded-3xl border border-white/10 bg-[#111113] p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">
            Your Referrals ({referrals.length})
          </h2>
          <button
            onClick={() => {
              setFormError("");
              setShowLeadModal(true);
            }}
            className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-white hover:bg-white hover:text-black transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Client</span>
          </button>
        </div>

        {referrals.length === 0 ? (
          <p className="py-8 text-center text-xs text-neutral-500">
            No referrals yet. Share your link above to start earning 10%.
          </p>
        ) : (
          <div className="divide-y divide-white/10">
            {referrals.map((ref: any) => {
              const isPaid = ref.status === "PAID_CUSTOMER";
              return (
                <div
                  key={ref.id}
                  className="py-4 first:pt-1 last:pb-1 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="text-sm font-bold text-white">
                      {ref.businessName}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5 flex items-center gap-2">
                      <span>
                        {ref.invoiceTotal > 0
                          ? `Client Billed: ${currency}${ref.invoiceTotal.toLocaleString()}`
                          : "Referral Registered"}
                      </span>
                      {ref.invoiceNumber && (
                        <Link
                          href={`/invoice/${ref.invoiceNumber}`}
                          className="inline-flex items-center gap-0.5 font-mono text-white underline"
                        >
                          <span>Invoice</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {isPaid ? (
                      <div>
                        <div className="font-mono text-sm font-black text-white">
                          +{currency}
                          {ref.earnedCommission.toLocaleString()}
                        </div>
                        <span className="text-[10px] font-mono uppercase text-neutral-400">
                          Paid (10%)
                        </span>
                      </div>
                    ) : ref.expectedCommission > 0 ? (
                      <div>
                        <div className="font-mono text-sm font-bold text-neutral-300">
                          {currency}
                          {ref.expectedCommission.toLocaleString()}
                        </div>
                        <span className="text-[10px] font-mono uppercase text-neutral-500">
                          Invoice Sent
                        </span>
                      </div>
                    ) : (
                      <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] text-neutral-400">
                        Pending Quote
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. WITHDRAWAL HISTORY (Only if any exists) */}
      {withdrawals.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-[#111113] p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Withdrawals</h2>
            <span className="text-[11px] text-neutral-400">
              Credited within 3 working hours
            </span>
          </div>
          <div className="divide-y divide-white/10">
            {withdrawals.map((w: any) => (
              <div
                key={w.id}
                className="py-3 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-white">
                    {w.bankName} • {w.accountNumber}
                  </div>
                  <div className="text-neutral-500 font-mono">
                    {new Date(w.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm font-black text-white">
                    {currency}
                    {w.amount.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400">
                    {w.status === "APPROVED_PAID"
                      ? "✓ Paid to Bank"
                      : "Processing (Within 3 working hrs)"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: ADD A CLIENT */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#111113] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">
                Add a Referred Business
              </h3>
              <button onClick={() => setShowLeadModal(false)}>
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 rounded-xl bg-neutral-900 p-3 text-xs text-white">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateLead} className="space-y-3.5">
              <input
                type="text"
                required
                placeholder="Business Name *"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white"
              />
              <input
                type="text"
                required
                placeholder="Contact Person Name *"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white"
              />
              <input
                type="text"
                required
                placeholder="Client WhatsApp Phone Number *"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white"
              />
              <input
                type="email"
                placeholder="Client Email (Optional)"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-white py-3 text-xs font-black text-black"
              >
                {submitting ? "Saving..." : "Save Referral"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: WITHDRAW */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#111113] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">
                Withdraw to Bank
              </h3>
              <button onClick={() => setShowWithdrawModal(false)}>
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 rounded-xl bg-neutral-900 p-3 text-xs text-white">
                {formError}
              </div>
            )}

            <form onSubmit={handleRequestWithdrawal} className="space-y-3.5">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  Amount ({currency})
                </label>
                <input
                  type="number"
                  required
                  min={summary.minThreshold}
                  max={summary.availableBalance}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-lg font-mono font-bold text-white"
                />
              </div>
              <select
                required
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white focus:border-white focus:outline-none"
              >
                <option value="" disabled>
                  Select Your Bank *
                </option>
                {NIGERIAN_BANKS.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
              <input
                type="text"
                required
                maxLength={10}
                placeholder="Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm font-mono text-white"
              />
              <input
                type="text"
                required
                placeholder="Account Name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value.toUpperCase())}
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm font-mono text-white"
              />

              <div className="rounded-xl border border-white/10 bg-black/70 px-3.5 py-2.5 text-[11px] text-neutral-300 text-center">
                ⚡ Your nominated bank account will be credited{" "}
                <strong className="text-white">within 3 working hours</strong>{" "}
                of submitting your withdrawal request.
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-white py-3.5 text-xs font-black text-black"
              >
                {submitting
                  ? "Processing..."
                  : `Withdraw ${currency}${Number(
                      withdrawAmount
                    ).toLocaleString()}`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: BANK DETAILS */}
      {showBankModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#111113] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">
                Your Bank Account
              </h3>
              <button onClick={() => setShowBankModal(false)}>
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            <form onSubmit={handleSaveBankDetails} className="space-y-3.5">
              <select
                required
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white focus:border-white focus:outline-none"
              >
                <option value="" disabled>
                  Select Your Bank *
                </option>
                {NIGERIAN_BANKS.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
              <input
                type="text"
                required
                maxLength={10}
                placeholder="10-Digit Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm font-mono text-white"
              />
              <input
                type="text"
                required
                placeholder="Account Name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value.toUpperCase())}
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm font-mono text-white"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-white py-3 text-xs font-black text-black"
              >
                Save Bank Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
