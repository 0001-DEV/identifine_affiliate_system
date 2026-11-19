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
  defaultCommissionRate: number; // 10%
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
    defaultCommissionRate: 10,
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
  referrals: [
    {
      id: "ref_101",
      affiliateId: "usr_aff_1",
      affiliateName: "Joshua Olusola",
      affiliateCode: "joshua-842",
      businessName: "Vanguard Sterling Logistics Ltd",
      contactName: "Chidi Nwosu",
      contactEmail: "c.nwosu@vanguardsterling.com",
      contactPhone: "+234 803 400 1122",
      serviceInterested: "Executive Team Smart NFC Cards (25 Units)",
      notes: "Spoke with their Operations Director. They needed 35 executive NFC cards.",
      source: "REFERRAL_LINK",
      status: "PAID_CUSTOMER",
      invoiceNumber: "INV-2026-0101",
      invoiceDate: "2026-11-10",
      invoiceDueDate: "2026-11-17",
      invoiceItems: [
        {
          description: "Executive Matte Black NFC Smart Cards (35 Units)",
          quantity: 35,
          unitPrice: 10000,
        },
      ],
      invoiceTotal: 350000,
      amountPaid: 350000,
      expectedCommission: 35000,
      earnedCommission: 35000,
      payments: [
        {
          id: "pay_001",
          amount: 350000,
          commissionCredited: 35000,
          date: "2026-11-12T15:30:00.000Z",
          method: "Bank Transfer (Verified on WhatsApp)",
          reference: "TRX-9482019-VSL",
          note: "Full invoice payment received via Providus corporate account.",
        },
      ],
      createdAt: "2026-11-09T11:00:00.000Z",
      updatedAt: "2026-11-12T15:30:00.000Z",
    },
    {
      id: "ref_102",
      affiliateId: "usr_aff_1",
      affiliateName: "Joshua Olusola",
      affiliateCode: "joshua-842",
      businessName: "Meridian Real Estate Partners",
      contactName: "Amina Bello",
      contactEmail: "amina@meridianrealtors.ng",
      contactPhone: "+234 805 229 8811",
      serviceInterested: "Corporate Enterprise Identity Pack (100 Units)",
      notes: "Client chatted on WhatsApp; invoice for ₦300,000 issued and sent on WhatsApp.",
      source: "REFERRAL_LINK",
      status: "INVOICE_ISSUED",
      invoiceNumber: "INV-2026-0104",
      invoiceDate: "2026-11-17",
      invoiceDueDate: "2026-11-24",
      invoiceItems: [
        {
          description: "Custom Brushed Metal & PVC Smart Cards for Sales Agents",
          quantity: 30,
          unitPrice: 10000,
        },
      ],
      invoiceTotal: 300000,
      amountPaid: 0,
      expectedCommission: 30000,
      earnedCommission: 0,
      payments: [],
      createdAt: "2026-11-16T09:40:00.000Z",
      updatedAt: "2026-11-17T14:10:00.000Z",
    },
    {
      id: "ref_103",
      affiliateId: "usr_aff_1",
      affiliateName: "Joshua Olusola",
      affiliateCode: "joshua-842",
      businessName: "NovaTech Advisory Group",
      contactName: "David Okafor",
      contactEmail: "d.okafor@novatech.io",
      contactPhone: "+234 818 900 4455",
      serviceInterested: "VIP Custom Metal Card Suite (10 Units)",
      notes: "Clicked Joshua's referral link and initiated WhatsApp chat.",
      source: "REFERRAL_LINK",
      status: "WHATSAPP_INQUIRY",
      invoiceItems: [],
      invoiceTotal: 0,
      amountPaid: 0,
      expectedCommission: 0,
      earnedCommission: 0,
      payments: [],
      createdAt: "2026-11-18T17:20:00.000Z",
      updatedAt: "2026-11-18T17:20:00.000Z",
    },
    {
      id: "ref_104",
      affiliateId: "usr_aff_2",
      affiliateName: "Tunde Bakare",
      affiliateCode: "tunde-510",
      businessName: "Crestview Capital & Law",
      contactName: "Barr. Segun Adeyemi",
      contactEmail: "segun@crestviewlaw.com",
      contactPhone: "+234 802 331 9090",
      serviceInterested: "Corporate Enterprise Identity Pack (100 Units)",
      notes: "Enterprise rollout for 80 partners and associates.",
      source: "DASHBOARD_LEAD",
      status: "PAID_CUSTOMER",
      invoiceNumber: "INV-2026-0098",
      invoiceDate: "2026-11-07",
      invoiceDueDate: "2026-11-14",
      invoiceItems: [
        {
          description: "Corporate Enterprise Identity Pack (80 NFC Smart Cards + Digital Portal)",
          quantity: 1,
          unitPrice: 680000,
        },
      ],
      invoiceTotal: 680000,
      amountPaid: 680000,
      expectedCommission: 68000,
      earnedCommission: 68000,
      payments: [
        {
          id: "pay_002",
          amount: 680000,
          commissionCredited: 68000,
          date: "2026-11-08T12:00:00.000Z",
          method: "Bank Transfer (WhatsApp Receipt Confirmed)",
          reference: "TRX-778120-CCL",
          note: "Full settlement confirmed.",
        },
      ],
      createdAt: "2026-11-06T10:00:00.000Z",
      updatedAt: "2026-11-08T12:00:00.000Z",
    },
  ],
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
