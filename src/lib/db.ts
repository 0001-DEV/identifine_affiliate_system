import fs from "fs";
import path from "path";

export type UserRole = "AFFILIATE" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string; // plain for local prototype simplicity
  role: UserRole;
  referralCode: string;
  commissionRate: number; // e.g., 10 for 10%
  bankName: string;
  accountNumber: string;
  accountName: string;
  createdAt: string;
}

export type ReferralStatus =
  | "WHATSAPP_INQUIRY" // Client clicked link or affiliate submitted lead
  | "IN_DISCUSSION" // Chatting on WhatsApp / Email
  | "INVOICE_ISSUED" // Invoice generated & sent to client on WhatsApp/Email
  | "PARTIALLY_PAID" // Client paid a deposit on the invoice
  | "PAID_CUSTOMER"; // Client paid invoice in full

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  commissionCredited: number;
  date: string;
  method: string; // e.g. "Bank Transfer (WhatsApp Proof)" | "Online Invoice Checkout"
  reference: string;
  note?: string;
}

export interface Referral {
  id: string;
  affiliateId: string;
  affiliateName: string;
  affiliateCode: string;
  businessName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string; // WhatsApp phone
  serviceInterested: string;
  notes: string;
  source: "REFERRAL_LINK" | "DASHBOARD_LEAD";
  status: ReferralStatus;
  invoiceNumber?: string;
  invoiceDate?: string;
  invoiceDueDate?: string;
  invoiceItems: InvoiceItem[];
  invoiceTotal: number;
  amountPaid: number;
  expectedCommission: number; // 10% of invoiceTotal
  earnedCommission: number; // 10% of amountPaid (actually credited to wallet)
  payments: PaymentRecord[];
  createdAt: string;
  updatedAt: string;
}

export type WithdrawalStatus = "PENDING" | "APPROVED_PAID" | "REJECTED";

export interface Withdrawal {
  id: string;
  affiliateId: string;
  affiliateName: string;
  affiliateEmail: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: WithdrawalStatus;
  reference: string;
  adminNote?: string;
  createdAt: string;
  processedAt?: string;
}

export interface PlatformSettings {
  companyName: string;
  companyTagline: string;
  companyWhatsapp: string;
  companyEmail: string;
  companyBankName: string;
  companyAccountNumber: string;
  companyAccountName: string;
  defaultCommissionRate: number; // 7.5%
  minWithdrawalAmount: number; // e.g. 50000
  currencySymbol: string; // "₦" or "$"
  currencyCode: string; // "NGN" or "USD"
  servicePackages: {
    name: string;
    defaultPrice: number;
    description: string;
  }[];
}

export interface DatabaseSchema {
  settings: PlatformSettings;
  users: User[];
  referrals: Referral[];
  withdrawals: Withdrawal[];
}

const DB_FILE_PATH = process.env.VERCEL
  ? path.join("/tmp", "xtrefliate-db.json")
  : path.join(process.cwd(), "data", "xtrefliate-db.json");

const INITIAL_DB: DatabaseSchema = {
  settings: {
    companyName: "IDENTIFINE",
    companyTagline: "Smart NFC Business Cards & Corporate Identity Solutions",
    companyWhatsapp: "2349030001851",
    companyEmail: "billing@identifine.com",
    companyBankName: "Providus Bank / Moniepoint MFB",
    companyAccountNumber: "8012345678",
    companyAccountName: "IDENTIFINE TECHNOLOGIES LTD",
    defaultCommissionRate: 7.5,
    minWithdrawalAmount: 50000,
    currencySymbol: "₦",
    currencyCode: "NGN",
    servicePackages: [
      {
        name: "Executive Team Smart NFC Cards (25 Units)",
        defaultPrice: 250000,
        description: "Custom laser-engraved matte black PVC & Metal NFC cards with team profile dashboard.",
      },
      {
        name: "Corporate Enterprise Identity Pack (100 Units)",
        defaultPrice: 650000,
        description: "Full organization NFC card rollout, CRM lead capture integration & custom branding.",
      },
      {
        name: "VIP Custom Metal Card Suite (10 Units)",
        defaultPrice: 180000,
        description: "24K Brushed Black Steel NFC smart cards for C-Suite executives.",
      },
      {
        name: "Custom B2B Order / Bespoke Solution",
        defaultPrice: 350000,
        description: "Tailored corporate package quoted after WhatsApp or Email consultation.",
      },
    ],
  },
  users: [
    {
      id: "usr_admin",
      name: "Identifine Admin",
      email: "admin@identifine.com",
      phone: "+234 800 000 0000",
      password: "password123",
      role: "ADMIN",
      referralCode: "identifine-hq",
      commissionRate: 10,
      bankName: "Access Bank",
      accountNumber: "0011223344",
      accountName: "IDENTIFINE HQ",
      createdAt: "2026-10-01T09:00:00.000Z",
    },
    {
      id: "usr_aff_1",
      name: "Joshua Olusola",
      email: "joshua@example.com",
      phone: "+234 812 345 6789",
      password: "password123",
      role: "AFFILIATE",
      referralCode: "joshua-842",
      commissionRate: 10,
      bankName: "GTBank (Guaranty Trust Bank)",
      accountNumber: "0158492011",
      accountName: "JOSHUA OLUSOLA",
      createdAt: "2026-11-01T10:15:00.000Z",
    },
    {
      id: "usr_aff_2",
      name: "Tunde Bakare",
      email: "tunde@example.com",
      phone: "+234 809 876 5432",
      password: "password123",
      role: "AFFILIATE",
      referralCode: "tunde-510",
      commissionRate: 10,
      bankName: "Zenith Bank",
      accountNumber: "2089341209",
      accountName: "TUNDE BAKARE",
      createdAt: "2026-11-05T14:20:00.000Z",
    },
  ],
  referrals: [],
  withdrawals: [],
};

export function getDb(): DatabaseSchema {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE_PATH)) {
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(INITIAL_DB, null, 2), "utf-8");
      return INITIAL_DB;
    }
    const raw = fs.readFileSync(DB_FILE_PATH, "utf-8");
    return JSON.parse(raw) as DatabaseSchema;
  } catch (err) {
    console.error("Failed to read DB, returning INITIAL_DB", err);
    return INITIAL_DB;
  }
}

export function saveDb(data: DatabaseSchema): void {
  const dir = path.dirname(DB_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function resetDb(): DatabaseSchema {
  saveDb(INITIAL_DB);
  return INITIAL_DB;
}

export function getAffiliateWalletSummary(db: DatabaseSchema, affiliateId: string) {
  const user = db.users.find((u) => u.id === affiliateId);
  const commissionRate = user?.commissionRate ?? db.settings.defaultCommissionRate;

  const myReferrals = db.referrals.filter((r) => r.affiliateId === affiliateId);
  const myWithdrawals = db.withdrawals.filter((w) => w.affiliateId === affiliateId);

  const totalEarned = myReferrals.reduce((sum, r) => sum + (r.earnedCommission || 0), 0);
  const pendingExpectedCommission = myReferrals.reduce(
    (sum, r) => sum + Math.max(0, (r.expectedCommission || 0) - (r.earnedCommission || 0)),
    0
  );

  const totalWithdrawnOrPending = myWithdrawals
    .filter((w) => w.status === "APPROVED_PAID" || w.status === "PENDING")
    .reduce((sum, w) => sum + w.amount, 0);

  const totalPaidOut = myWithdrawals
    .filter((w) => w.status === "APPROVED_PAID")
    .reduce((sum, w) => sum + w.amount, 0);

  const pendingWithdrawalAmount = myWithdrawals
    .filter((w) => w.status === "PENDING")
    .reduce((sum, w) => sum + w.amount, 0);

  const availableBalance = Math.max(0, totalEarned - totalWithdrawnOrPending);
  const minThreshold = db.settings.minWithdrawalAmount;
  const canWithdraw = availableBalance >= minThreshold;
  const amountRemainingToUnlock = Math.max(0, minThreshold - availableBalance);
  const thresholdProgressPercent = Math.min(
    100,
    minThreshold > 0 ? Math.round((availableBalance / minThreshold) * 100) : 100
  );

  return {
    commissionRate,
    totalEarned,
    pendingExpectedCommission,
    availableBalance,
    totalPaidOut,
    pendingWithdrawalAmount,
    minThreshold,
    canWithdraw,
    amountRemainingToUnlock,
    thresholdProgressPercent,
    totalReferralsCount: myReferrals.length,
    payingCustomersCount: myReferrals.filter((r) => r.status === "PAID_CUSTOMER").length,
    invoicedCount: myReferrals.filter(
      (r) => r.status === "INVOICE_ISSUED" || r.status === "PARTIALLY_PAID"
    ).length,
  };
}
