import { NextRequest, NextResponse } from "next/server";
import {
  getDb,
  saveDb,
  resetDb,
  getAffiliateWalletSummary,
  Referral,
  User,
  Withdrawal,
  InvoiceItem,
} from "@/lib/db";

export async function GET(req: NextRequest) {
  const db = getDb();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const referralCode = searchParams.get("referralCode");
  const invoiceNumber = searchParams.get("invoiceNumber");

  if (invoiceNumber) {
    const referral = db.referrals.find(
      (r) => r.invoiceNumber?.toLowerCase() === invoiceNumber.toLowerCase()
    );
    return NextResponse.json({
      referral: referral || null,
      settings: db.settings,
    });
  }

  if (referralCode) {
    const affiliate = db.users.find(
      (u) => u.referralCode.toLowerCase() === referralCode.toLowerCase()
    );
    return NextResponse.json({
      affiliate: affiliate
        ? {
            id: affiliate.id,
            name: affiliate.name,
            referralCode: affiliate.referralCode,
          }
        : null,
      settings: db.settings,
    });
  }

  if (userId) {
    const user = db.users.find((u) => u.id === userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const summary = getAffiliateWalletSummary(db, user.id);
    const referrals = db.referrals.filter((r) => r.affiliateId === user.id);
    const withdrawals = db.withdrawals.filter((w) => w.affiliateId === user.id);
    return NextResponse.json({
      user,
      summary,
      referrals,
      withdrawals,
      settings: db.settings,
    });
  }

  // Return full state with summaries for all affiliates
  const affiliatesWithSummary = db.users
    .filter((u) => u.role === "AFFILIATE")
    .map((u) => ({
      ...u,
      summary: getAffiliateWalletSummary(db, u.id),
    }));

  return NextResponse.json({
    settings: db.settings,
    users: db.users,
    affiliatesWithSummary,
    referrals: db.referrals,
    withdrawals: db.withdrawals,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;
    const db = getDb();

    // 1. REGISTER NEW AFFILIATE ACCOUNT
    if (action === "REGISTER_AFFILIATE") {
      const { name, email, phone, password, bankName, accountNumber, accountName } = body;
      if (!name || !email) {
        return NextResponse.json(
          { error: "Name and Email are required." },
          { status: 400 }
        );
      }

      const existing = db.users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (existing) {
        return NextResponse.json(
          { error: "An account with this email already exists. Please sign in." },
          { status: 400 }
        );
      }

      const cleanBase = name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .slice(0, 8) || "partner";
      const randomNum = Math.floor(100 + Math.random() * 900);
      const referralCode = `${cleanBase}-${randomNum}`;

      const newUser: User = {
        id: `usr_${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || "",
        password: password || "password123",
        role: "AFFILIATE",
        referralCode,
        commissionRate: db.settings.defaultCommissionRate,
        bankName: bankName?.trim() || "",
        accountNumber: accountNumber?.trim() || "",
        accountName: accountName?.trim() || name.trim().toUpperCase(),
        createdAt: new Date().toISOString(),
      };

      db.users.push(newUser);
      saveDb(db);

      return NextResponse.json({
        user: newUser,
        summary: getAffiliateWalletSummary(db, newUser.id),
      });
    }

    // 2. LOGIN ACCOUNT
    if (action === "LOGIN") {
      const { email, password } = body;
      const user = db.users.find(
        (u) => u.email.toLowerCase() === (email || "").trim().toLowerCase()
      );
      if (!user) {
        return NextResponse.json(
          { error: "No account found with that email address." },
          { status: 401 }
        );
      }
      if (password && user.password !== password) {
        return NextResponse.json(
          { error: "Invalid password. (Demo accounts use password123)" },
          { status: 401 }
        );
      }
      return NextResponse.json({
        user,
        summary: getAffiliateWalletSummary(db, user.id),
      });
    }

    // 3. UPDATE AFFILIATE BANK ACCOUNT DETAILS
    if (action === "UPDATE_BANK_DETAILS") {
      const { userId, bankName, accountNumber, accountName } = body;
      const user = db.users.find((u) => u.id === userId);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      user.bankName = (bankName || "").trim();
      user.accountNumber = (accountNumber || "").trim();
      user.accountName = (accountName || "").trim().toUpperCase();
      saveDb(db);
      return NextResponse.json({ user });
    }

    // 4. CREATE REFERRAL (EITHER FROM PUBLIC REFERRAL LINK /r/[code] OR AFFILIATE DASHBOARD)
    if (action === "CREATE_REFERRAL") {
      const {
        affiliateCode,
        affiliateId,
        businessName,
        contactName,
        contactEmail,
        contactPhone,
        serviceInterested,
        notes,
        source,
      } = body;

      const affiliate = db.users.find(
        (u) =>
          (affiliateId && u.id === affiliateId) ||
          (affiliateCode &&
            u.referralCode.toLowerCase() === affiliateCode.toLowerCase())
      );

      if (!affiliate) {
        return NextResponse.json(
          { error: "Valid affiliate referral code or ID not found." },
          { status: 404 }
        );
      }

      if (!businessName) {
        return NextResponse.json(
          { error: "Name or Business Name is required." },
          { status: 400 }
        );
      }

      const newReferral: Referral = {
        id: `ref_${Date.now()}`,
        affiliateId: affiliate.id,
        affiliateName: affiliate.name,
        affiliateCode: affiliate.referralCode,
        businessName: businessName.trim(),
        contactName: (contactName || businessName).trim(),
        contactEmail: (contactEmail || "").trim(),
        contactPhone: (contactPhone || "Via WhatsApp Chat").trim(),
        serviceInterested:
          serviceInterested || "Custom B2B Order / Bespoke Solution",
        notes: (notes || "").trim(),
        source: source === "DASHBOARD_LEAD" ? "DASHBOARD_LEAD" : "REFERRAL_LINK",
        status: "WHATSAPP_INQUIRY",
        invoiceItems: [],
        invoiceTotal: 0,
        amountPaid: 0,
        expectedCommission: 0,
        earnedCommission: 0,
        payments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      db.referrals.unshift(newReferral);
      saveDb(db);

      return NextResponse.json({
        referral: newReferral,
        settings: db.settings,
      });
    }

    // 5. ADMIN: GENERATE OR UPDATE OFFICIAL CLIENT INVOICE
    if (action === "GENERATE_INVOICE") {
      const { referralId, items, invoiceDueDate, notes } = body as {
        referralId: string;
        items: InvoiceItem[];
        invoiceDueDate?: string;
        notes?: string;
      };

      const referral = db.referrals.find((r) => r.id === referralId);
      if (!referral) {
        return NextResponse.json({ error: "Referral not found" }, { status: 404 });
      }

      const affiliate = db.users.find((u) => u.id === referral.affiliateId);
      const commissionRate =
        affiliate?.commissionRate ?? db.settings.defaultCommissionRate;

      const validItems = (items || []).filter(
        (it) => it.description && Number(it.unitPrice) > 0
      );
      if (validItems.length === 0) {
        return NextResponse.json(
          { error: "Please add at least one invoice line item with a price." },
          { status: 400 }
        );
      }

      const invoiceTotal = validItems.reduce(
        (sum, it) => sum + Number(it.quantity || 1) * Number(it.unitPrice),
        0
      );

      if (!referral.invoiceNumber) {
        const count = db.referrals.filter((r) => Boolean(r.invoiceNumber)).length + 101;
        referral.invoiceNumber = `INV-2026-0${count}`;
      }

      const today = new Date().toISOString().split("T")[0];
      const defaultDue = new Date(Date.now() + 7 * 86400000)
        .toISOString()
        .split("T")[0];

      referral.invoiceDate = referral.invoiceDate || today;
      referral.invoiceDueDate = invoiceDueDate || defaultDue;
      referral.invoiceItems = validItems.map((it) => ({
        description: it.description,
        quantity: Number(it.quantity || 1),
        unitPrice: Number(it.unitPrice),
      }));
      referral.invoiceTotal = invoiceTotal;
      referral.expectedCommission = Math.round(
        (invoiceTotal * commissionRate) / 100
      );
      if (notes) {
        referral.notes = notes;
      }

      if (referral.amountPaid >= invoiceTotal && invoiceTotal > 0) {
        referral.status = "PAID_CUSTOMER";
      } else if (referral.amountPaid > 0) {
        referral.status = "PARTIALLY_PAID";
      } else {
        referral.status = "INVOICE_ISSUED";
      }

      referral.updatedAt = new Date().toISOString();
      saveDb(db);

      return NextResponse.json({ referral });
    }

    // 6. RECORD CLIENT INVOICE PAYMENT (ADMIN OR CLIENT ON INVOICE PAGE)
    if (action === "RECORD_INVOICE_PAYMENT") {
      const { referralId, invoiceNumber, amount, method, reference, note } = body;
      const referral = db.referrals.find(
        (r) =>
          (referralId && r.id === referralId) ||
          (invoiceNumber &&
            r.invoiceNumber?.toLowerCase() === invoiceNumber.toLowerCase())
      );

      if (!referral) {
        return NextResponse.json(
          { error: "Referral / Invoice not found" },
          { status: 404 }
        );
      }

      const payAmount = Number(amount);
      if (!payAmount || payAmount <= 0) {
        return NextResponse.json(
          { error: "Payment amount must be greater than zero." },
          { status: 400 }
        );
      }

      const affiliate = db.users.find((u) => u.id === referral.affiliateId);
      const commissionRate =
        affiliate?.commissionRate ?? db.settings.defaultCommissionRate;

      // If no invoice existed yet, create one automatically for this payment amount
      if (!referral.invoiceNumber || referral.invoiceTotal <= 0) {
        const count = db.referrals.filter((r) => Boolean(r.invoiceNumber)).length + 101;
        referral.invoiceNumber = `INV-2026-0${count}`;
        referral.invoiceDate = new Date().toISOString().split("T")[0];
        referral.invoiceDueDate = referral.invoiceDate;
        referral.invoiceItems = [
          {
            description: referral.serviceInterested || "Xtrem Cardz Corporate Order",
            quantity: 1,
            unitPrice: payAmount,
          },
        ];
        referral.invoiceTotal = payAmount;
        referral.expectedCommission = Math.round(
          (payAmount * commissionRate) / 100
        );
      }

      const commissionForThisPayment = Math.round(
        (payAmount * commissionRate) / 100
      );

      referral.amountPaid = (referral.amountPaid || 0) + payAmount;
      referral.earnedCommission =
        (referral.earnedCommission || 0) + commissionForThisPayment;

      if (referral.amountPaid >= referral.invoiceTotal) {
        referral.status = "PAID_CUSTOMER";
      } else {
        referral.status = "PARTIALLY_PAID";
      }

      referral.payments.unshift({
        id: `pay_${Date.now()}`,
        amount: payAmount,
        commissionCredited: commissionForThisPayment,
        date: new Date().toISOString(),
        method: method || "Bank Transfer (WhatsApp Proof Verified)",
        reference:
          reference ||
          `TRX-${Math.floor(100000 + Math.random() * 900000)}`,
        note: note || "Verified client invoice payment.",
      });

      referral.updatedAt = new Date().toISOString();
      saveDb(db);

      return NextResponse.json({
        referral,
        affiliateSummary: getAffiliateWalletSummary(db, referral.affiliateId),
      });
    }

    // 7. AFFILIATE REQUESTS BANK WITHDRAWAL (THRESHOLD GATED)
    if (action === "REQUEST_WITHDRAWAL") {
      const { userId, amount, bankName, accountNumber, accountName } = body;
      const user = db.users.find((u) => u.id === userId);
      if (!user) {
        return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
      }

      if (bankName) user.bankName = bankName.trim();
      if (accountNumber) user.accountNumber = accountNumber.trim();
      if (accountName) user.accountName = accountName.trim().toUpperCase();

      if (!user.bankName || !user.accountNumber || !user.accountName) {
        return NextResponse.json(
          { error: "Please provide complete Bank Name, Account Number, and Account Name." },
          { status: 400 }
        );
      }

      const summary = getAffiliateWalletSummary(db, user.id);

      // STRICT SERVER-SIDE THRESHOLD CHECK
      if (summary.availableBalance < db.settings.minWithdrawalAmount) {
        return NextResponse.json(
          {
            error: `Withdrawal locked! Your available balance (${db.settings.currencySymbol}${summary.availableBalance.toLocaleString()}) has not reached the minimum withdrawal threshold of ${db.settings.currencySymbol}${db.settings.minWithdrawalAmount.toLocaleString()}.`,
          },
          { status: 403 }
        );
      }

      const withdrawAmount = Number(amount);
      if (
        !withdrawAmount ||
        withdrawAmount < db.settings.minWithdrawalAmount ||
        withdrawAmount > summary.availableBalance
      ) {
        return NextResponse.json(
          {
            error: `Withdrawal amount must be between ${db.settings.currencySymbol}${db.settings.minWithdrawalAmount.toLocaleString()} and your available balance (${db.settings.currencySymbol}${summary.availableBalance.toLocaleString()}).`,
          },
          { status: 400 }
        );
      }

      const newWithdrawal: Withdrawal = {
        id: `wd_${Date.now()}`,
        affiliateId: user.id,
        affiliateName: user.name,
        affiliateEmail: user.email,
        amount: withdrawAmount,
        bankName: user.bankName,
        accountNumber: user.accountNumber,
        accountName: user.accountName,
        status: "PENDING",
        reference: `WD-XTR-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString(),
      };

      db.withdrawals.unshift(newWithdrawal);
      saveDb(db);

      return NextResponse.json({
        withdrawal: newWithdrawal,
        summary: getAffiliateWalletSummary(db, user.id),
      });
    }

    // 8. ADMIN: APPROVE OR REJECT AFFILIATE WITHDRAWAL
    if (action === "PROCESS_WITHDRAWAL") {
      const { withdrawalId, status, adminNote } = body;
      const withdrawal = db.withdrawals.find((w) => w.id === withdrawalId);
      if (!withdrawal) {
        return NextResponse.json(
          { error: "Withdrawal request not found" },
          { status: 404 }
        );
      }

      withdrawal.status = status === "REJECTED" ? "REJECTED" : "APPROVED_PAID";
      withdrawal.adminNote = adminNote || (status === "REJECTED" ? "Rejected by Admin" : "Transferred to Affiliate Bank Account");
      withdrawal.processedAt = new Date().toISOString();

      saveDb(db);
      return NextResponse.json({ withdrawal });
    }

    // 9. ADMIN: UPDATE PLATFORM SETTINGS (COMMISSION %, MIN THRESHOLD, WHATSAPP, CURRENCY)
    if (action === "UPDATE_SETTINGS") {
      const {
        defaultCommissionRate,
        minWithdrawalAmount,
        currencySymbol,
        currencyCode,
        companyWhatsapp,
        companyEmail,
        companyBankName,
        companyAccountNumber,
        companyAccountName,
      } = body;

      if (defaultCommissionRate !== undefined) {
        const rate = Number(defaultCommissionRate);
        db.settings.defaultCommissionRate = rate;
        // Update all affiliates to the fixed rate
        db.users.forEach((u) => {
          if (u.role === "AFFILIATE") u.commissionRate = rate;
        });
      }
      if (minWithdrawalAmount !== undefined) {
        db.settings.minWithdrawalAmount = Number(minWithdrawalAmount);
      }
      if (currencySymbol !== undefined) {
        db.settings.currencySymbol = currencySymbol;
      }
      if (currencyCode !== undefined) {
        db.settings.currencyCode = currencyCode;
      }
      if (companyWhatsapp !== undefined) {
        db.settings.companyWhatsapp = companyWhatsapp;
      }
      if (companyEmail !== undefined) {
        db.settings.companyEmail = companyEmail;
      }
      if (companyBankName !== undefined) {
        db.settings.companyBankName = companyBankName;
      }
      if (companyAccountNumber !== undefined) {
        db.settings.companyAccountNumber = companyAccountNumber;
      }
      if (companyAccountName !== undefined) {
        db.settings.companyAccountName = companyAccountName;
      }

      saveDb(db);
      return NextResponse.json({ settings: db.settings });
    }

    // 10. RESET DEMO DATA
    if (action === "RESET_DEMO") {
      const fresh = resetDb();
      return NextResponse.json({ settings: fresh.settings });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
