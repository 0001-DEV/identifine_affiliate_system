"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { XtremLogo } from "@/components/XtremLogo";
import {
  Printer,
  CheckCircle2,
  Landmark,
  Copy,
  Check,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Clock,
} from "lucide-react";

export default function ClientInvoicePage() {
  const params = useParams();
  const invoiceNumber = (params?.invoiceNumber as string) || "INV-2026-0104";

  const [referral, setReferral] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [paying, setPaying] = useState(false);
  const [paySuccess, setPaySuccess] = useState("");

  const loadInvoice = async () => {
    try {
      const res = await fetch(
        `/api/platform?invoiceNumber=${encodeURIComponent(invoiceNumber)}`
      );
      const json = await res.json();
      setReferral(json.referral);
      setSettings(json.settings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoice();
  }, [invoiceNumber]);

  if (loading) {
    return (
      <div className="py-20 text-center text-xs font-mono uppercase tracking-widest text-neutral-400">
        Loading Official Client Invoice...
      </div>
    );
  }

  if (!referral) {
    return (
      <div className="mx-auto max-w-xl py-20 px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">
          Invoice {invoiceNumber} Not Found
        </h1>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs font-bold text-black"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const currency = settings?.currencySymbol || "₦";
  const balanceDue = Math.max(
    0,
    (referral.invoiceTotal || 0) - (referral.amountPaid || 0)
  );
  const isPaid = referral.status === "PAID_CUSTOMER" || balanceDue === 0;

  const handleCopyInvoiceLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleSimulateClientPayment = async () => {
    if (balanceDue <= 0) return;
    setPaying(true);
    try {
      const res = await fetch("/api/platform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "RECORD_INVOICE_PAYMENT",
          referralId: referral.id,
          amount: balanceDue,
          method: "Client Invoice Payment (Online / Bank Transfer Confirmed)",
          note: `Full settlement of invoice ${referral.invoiceNumber}`,
        }),
      });
      if (res.ok) {
        setPaySuccess(
          `Invoice ${referral.invoiceNumber} has been marked PAID! 10% commission (${currency}${Math.round(
            (balanceDue * 10) / 100
          ).toLocaleString()}) has been automatically credited to affiliate partner ${
            referral.affiliateName
          } (${referral.affiliateCode}).`
        );
        await loadInvoice();
      }
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="bg-executive-grid py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Top Action Bar (Hidden when printing) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs font-medium text-neutral-300 hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyInvoiceLink}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Invoice Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link for WhatsApp / Email</span>
                </>
              )}
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-bold text-black hover:bg-neutral-200"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {paySuccess && (
          <div className="no-print rounded-xl border border-white bg-neutral-900 p-4 text-xs sm:text-sm text-white flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-white" />
            <span>{paySuccess}</span>
          </div>
        )}

        {/* OFFICIAL MONOCHROME EXECUTIVE INVOICE SHEET */}
        <div className="rounded-2xl border border-neutral-300 bg-white text-black p-8 sm:p-12 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 border-b-2 border-black pb-8">
            <div className="space-y-2">
              <XtremLogo variant="dark" size="md" showSubtitle={false} />
              <p className="text-xs text-neutral-600 font-medium pt-1">
                {settings?.companyTagline}
              </p>
              <p className="text-xs text-neutral-500 font-mono">
                WhatsApp: +{settings?.companyWhatsapp} • {settings?.companyEmail}
              </p>
            </div>

            <div className="sm:text-right space-y-1">
              <div className="inline-block rounded bg-black px-3 py-1 font-mono text-xs font-black uppercase tracking-widest text-white">
                {isPaid ? "OFFICIAL PAID RECEIPT" : "COMMERCIAL INVOICE"}
              </div>
              <div className="text-2xl font-black font-mono text-black pt-1">
                {referral.invoiceNumber}
              </div>
              <div className="text-xs text-neutral-600 font-mono">
                Issued: {referral.invoiceDate || "2026-11-19"} • Due:{" "}
                {referral.invoiceDueDate || "2026-11-26"}
              </div>
            </div>
          </div>

          {/* Bill To + Referral Attribution Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-neutral-200 text-xs">
            <div className="space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                BILLED TO CLIENT ORGANIZATION:
              </span>
              <div className="text-base font-black text-black">
                {referral.businessName}
              </div>
              <div className="text-neutral-700 font-medium">
                Attn: {referral.contactName}
              </div>
              <div className="text-neutral-600 font-mono">
                WhatsApp: {referral.contactPhone}
              </div>
              {referral.contactEmail && (
                <div className="text-neutral-600 font-mono">
                  Email: {referral.contactEmail}
                </div>
              )}
            </div>

            <div className="sm:text-right space-y-1.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                PARTNER ATTRIBUTION & STATUS:
              </span>
              <div className="font-mono text-xs text-neutral-800">
                Partner Ref Code:{" "}
                <strong className="font-bold text-black">
                  {referral.affiliateCode.toUpperCase()}
                </strong>{" "}
                ({referral.affiliateName})
              </div>
              <div>
                {isPaid ? (
                  <span className="inline-flex items-center gap-1 rounded bg-black px-2.5 py-1 font-mono text-[11px] font-bold text-white">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    PAID IN FULL
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded border border-black px-2.5 py-1 font-mono text-[11px] font-bold text-black">
                    <Clock className="w-3.5 h-3.5" />
                    AWAITING SETTLEMENT ({currency}
                    {balanceDue.toLocaleString()})
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="py-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-black text-[11px] font-mono uppercase tracking-wider text-neutral-600">
                  <th className="py-2.5">Description</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Unit Price</th>
                  <th className="py-2.5 text-right">Line Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-xs sm:text-sm">
                {(referral.invoiceItems?.length > 0
                  ? referral.invoiceItems
                  : [
                      {
                        description: referral.serviceInterested,
                        quantity: 1,
                        unitPrice: referral.invoiceTotal,
                      },
                    ]
                ).map((item: any, idx: number) => (
                  <tr key={idx}>
                    <td className="py-4 font-semibold text-black">
                      {item.description}
                    </td>
                    <td className="py-4 text-center font-mono text-neutral-700">
                      {item.quantity}
                    </td>
                    <td className="py-4 text-right font-mono text-neutral-700">
                      {currency}
                      {Number(item.unitPrice).toLocaleString()}
                    </td>
                    <td className="py-4 text-right font-mono font-bold text-black">
                      {currency}
                      {(
                        Number(item.quantity) * Number(item.unitPrice)
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Bank Settlement Instructions */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 border-t-2 border-black pt-6">
            <div className="sm:col-span-7 rounded-xl bg-neutral-100 p-4 text-xs space-y-1.5 border border-neutral-300">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-black">
                <Landmark className="w-3.5 h-3.5" />
                <span>CORPORATE BANK TRANSFER DETAILS:</span>
              </div>
              <div className="text-neutral-700">
                Bank:{" "}
                <strong className="text-black">
                  {settings?.companyBankName}
                </strong>
              </div>
              <div className="text-neutral-700">
                Account Number:{" "}
                <strong className="font-mono text-sm text-black">
                  {settings?.companyAccountNumber}
                </strong>
              </div>
              <div className="text-neutral-700">
                Account Name:{" "}
                <strong className="font-mono text-black">
                  {settings?.companyAccountName}
                </strong>
              </div>
              <p className="text-[11px] text-neutral-500 pt-1">
                Please include Invoice Reference{" "}
                <strong className="text-black">{referral.invoiceNumber}</strong>{" "}
                in your transfer narration or forward your receipt on WhatsApp.
              </p>
            </div>

            <div className="sm:col-span-5 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Invoice Total:</span>
                <span className="font-mono font-bold text-black">
                  {currency}
                  {(referral.invoiceTotal || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Amount Paid:</span>
                <span className="font-mono font-bold text-black">
                  {currency}
                  {(referral.amountPaid || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-t border-black pt-2 text-sm font-black text-black">
                <span>Balance Due:</span>
                <span className="font-mono">
                  {currency}
                  {balanceDue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Transparent Affiliate Verification Footer */}
          <div className="mt-8 border-t border-neutral-200 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] font-mono text-neutral-500">
            <span>
              XTREM CARDZ VERIFIED INVOICE LEDGER • REF:{" "}
              {referral.affiliateCode.toUpperCase()}
            </span>
            <span>
              Partner 10% Commission Allocation: {currency}
              {(referral.expectedCommission || 0).toLocaleString()} (
              {isPaid ? "CREDITED TO WALLET" : "PENDING CLIENT PAYMENT"})
            </span>
          </div>
        </div>

        {/* Interactive Payment Confirmation Simulator Bar (For Testing the Flow Live) */}
        {!isPaid && (
          <div className="no-print rounded-2xl border border-neutral-800 bg-[#0D0D0D] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                TEST CLIENT INVOICE PAYMENT
              </span>
              <h3 className="text-base font-bold text-white">
                Simulate Client Paying This Invoice ({currency}
                {balanceDue.toLocaleString()})
              </h3>
              <p className="text-xs text-neutral-400">
                Click below to confirm payment of this invoice and watch{" "}
                <strong className="text-white">
                  10% ({currency}
                  {Math.round((balanceDue * 10) / 100).toLocaleString()})
                </strong>{" "}
                automatically credit{" "}
                <strong className="text-white">{referral.affiliateName}</strong>
                &apos;s wallet!
              </p>
            </div>

            <button
              onClick={handleSimulateClientPayment}
              disabled={paying}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-black hover:bg-neutral-200 transition shrink-0 shadow-lg"
            >
              <CreditCard className="w-4 h-4" />
              <span>
                {paying
                  ? "Confirming Payment..."
                  : `Confirm Payment of ${currency}${balanceDue.toLocaleString()}`}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
