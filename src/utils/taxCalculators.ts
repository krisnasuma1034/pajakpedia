import { PTKPStatus, TERCategory } from '../types';

export const PTKP_VALUES: Record<PTKPStatus, number> = {
  'TK/0': 54000000,
  'TK/1': 58500000,
  'TK/2': 63000000,
  'TK/3': 67500000,
  'K/0': 58500000,
  'K/1': 63000000,
  'K/2': 67500000,
  'K/3': 72000000,
};

export const PTKP_DESCRIPTIONS: Record<PTKPStatus, string> = {
  'TK/0': 'Tidak Kawin, Tanpa Tanggungan (Rp 54.000.000/tahun)',
  'TK/1': 'Tidak Kawin, 1 Tanggungan (Rp 58.500.000/tahun)',
  'TK/2': 'Tidak Kawin, 2 Tanggungan (Rp 63.000.000/tahun)',
  'TK/3': 'Tidak Kawin, 3 Tanggungan (Rp 67.500.000/tahun)',
  'K/0': 'Kawin, Tanpa Tanggungan (Rp 58.500.000/tahun)',
  'K/1': 'Kawin, 1 Tanggungan (Rp 63.000.000/tahun)',
  'K/2': 'Kawin, 2 Tanggungan (Rp 67.500.000/tahun)',
  'K/3': 'Kawin, 3 Tanggungan (Rp 72.000.000/tahun)',
};

export function getTERCategory(status: PTKPStatus): TERCategory {
  switch (status) {
    case 'TK/0':
    case 'TK/1':
    case 'K/0':
      return 'A';
    case 'TK/2':
    case 'TK/3':
    case 'K/1':
    case 'K/2':
      return 'B';
    case 'K/3':
      return 'C';
    default:
      return 'A';
  }
}

interface TERBracket {
  max: number; // upper limit in IDR; Infinity for open end
  rate: number; // percentage (e.g. 0.25 for 0.25%)
}

// Lampiran PP 58/2023 - Tabel TER Bulanan
const TER_A_BRACKETS: TERBracket[] = [
  { max: 5400000, rate: 0 },
  { max: 5650000, rate: 0.25 },
  { max: 5950000, rate: 0.5 },
  { max: 6300000, rate: 0.75 },
  { max: 6750000, rate: 1.0 },
  { max: 7500000, rate: 1.25 },
  { max: 8550000, rate: 1.5 },
  { max: 9650000, rate: 1.75 },
  { max: 10050000, rate: 2.0 },
  { max: 10350000, rate: 2.25 },
  { max: 10700000, rate: 2.5 },
  { max: 11050000, rate: 3.0 },
  { max: 11600000, rate: 3.5 },
  { max: 12500000, rate: 4.0 },
  { max: 13750000, rate: 5.0 },
  { max: 15100000, rate: 6.0 },
  { max: 16950000, rate: 7.0 },
  { max: 19750000, rate: 8.0 },
  { max: 24150000, rate: 9.0 },
  { max: 26450000, rate: 10.0 },
  { max: 28000000, rate: 11.0 },
  { max: 30050000, rate: 12.0 },
  { max: 32400000, rate: 13.0 },
  { max: 35400000, rate: 14.0 },
  { max: 39100000, rate: 15.0 },
  { max: 43850000, rate: 16.0 },
  { max: 47800000, rate: 17.0 },
  { max: 51400000, rate: 18.0 },
  { max: 56300000, rate: 19.0 },
  { max: 62200000, rate: 20.0 },
  { max: 68600000, rate: 21.0 },
  { max: 77500000, rate: 22.0 },
  { max: 89000000, rate: 23.0 },
  { max: 103000000, rate: 24.0 },
  { max: 125000000, rate: 25.0 },
  { max: 157000000, rate: 26.0 },
  { max: 206000000, rate: 27.0 },
  { max: 337000000, rate: 28.0 },
  { max: 454000000, rate: 29.0 },
  { max: 550000000, rate: 30.0 },
  { max: 695000000, rate: 31.0 },
  { max: 910000000, rate: 32.0 },
  { max: 1400000000, rate: 33.0 },
  { max: Infinity, rate: 34.0 },
];

const TER_B_BRACKETS: TERBracket[] = [
  { max: 6200000, rate: 0 },
  { max: 6500000, rate: 0.25 },
  { max: 6850000, rate: 0.5 },
  { max: 7300000, rate: 0.75 },
  { max: 9200000, rate: 1.0 },
  { max: 10750000, rate: 1.5 },
  { max: 12550000, rate: 2.0 },
  { max: 13500000, rate: 3.0 },
  { max: 14050000, rate: 4.0 },
  { max: 15700000, rate: 5.0 },
  { max: 17200000, rate: 6.0 },
  { max: 19500000, rate: 7.0 },
  { max: 22700000, rate: 8.0 },
  { max: 26600000, rate: 9.0 },
  { max: 28100000, rate: 10.0 },
  { max: 30100000, rate: 11.0 },
  { max: 32600000, rate: 12.0 },
  { max: 35400000, rate: 13.0 },
  { max: 38900000, rate: 14.0 },
  { max: 43700000, rate: 15.0 },
  { max: 48400000, rate: 16.0 },
  { max: 53800000, rate: 17.0 },
  { max: 58500000, rate: 18.0 },
  { max: 64000000, rate: 19.0 },
  { max: 71000000, rate: 20.0 },
  { max: 79000000, rate: 21.0 },
  { max: 88300000, rate: 22.0 },
  { max: 100700000, rate: 23.0 },
  { max: 120000000, rate: 24.0 },
  { max: 145500000, rate: 25.0 },
  { max: 181000000, rate: 26.0 },
  { max: 231500000, rate: 27.0 },
  { max: 360000000, rate: 28.0 },
  { max: 470000000, rate: 29.0 },
  { max: 580000000, rate: 30.0 },
  { max: 730000000, rate: 31.0 },
  { max: 950000000, rate: 32.0 },
  { max: 1400000000, rate: 33.0 },
  { max: Infinity, rate: 34.0 },
];

const TER_C_BRACKETS: TERBracket[] = [
  { max: 6600000, rate: 0 },
  { max: 6950000, rate: 0.25 },
  { max: 7350000, rate: 0.5 },
  { max: 7800000, rate: 0.75 },
  { max: 8850000, rate: 1.0 },
  { max: 9800000, rate: 1.25 },
  { max: 10950000, rate: 1.5 },
  { max: 11200000, rate: 1.75 },
  { max: 12050000, rate: 2.0 },
  { max: 12950000, rate: 3.0 },
  { max: 14150000, rate: 4.0 },
  { max: 15550000, rate: 5.0 },
  { max: 17050000, rate: 6.0 },
  { max: 19500000, rate: 7.0 },
  { max: 22700000, rate: 8.0 },
  { max: 25900000, rate: 9.0 },
  { max: 28100000, rate: 10.0 },
  { max: 30400000, rate: 11.0 },
  { max: 33000000, rate: 12.0 },
  { max: 36000000, rate: 13.0 },
  { max: 39600000, rate: 14.0 },
  { max: 44000000, rate: 15.0 },
  { max: 49000000, rate: 16.0 },
  { max: 54000000, rate: 17.0 },
  { max: 59000000, rate: 18.0 },
  { max: 65000000, rate: 19.0 },
  { max: 72000000, rate: 20.0 },
  { max: 80000000, rate: 21.0 },
  { max: 90000000, rate: 22.0 },
  { max: 103000000, rate: 23.0 },
  { max: 125000000, rate: 24.0 },
  { max: 155000000, rate: 25.0 },
  { max: 195000000, rate: 26.0 },
  { max: 250000000, rate: 27.0 },
  { max: 380000000, rate: 28.0 },
  { max: 500000000, rate: 29.0 },
  { max: 610000000, rate: 30.0 },
  { max: 770000000, rate: 31.0 },
  { max: 1000000000, rate: 32.0 },
  { max: 1400000000, rate: 33.0 },
  { max: Infinity, rate: 34.0 },
];

export function getTERRate(grossMonthly: number, terCategory: TERCategory): number {
  if (grossMonthly <= 0) return 0;
  const table =
    terCategory === 'A'
      ? TER_A_BRACKETS
      : terCategory === 'B'
      ? TER_B_BRACKETS
      : TER_C_BRACKETS;

  for (const bracket of table) {
    if (grossMonthly <= bracket.max) {
      return bracket.rate;
    }
  }
  return 34.0;
}

export interface PPh21MonthlyResult {
  monthlyGross: number;
  ptkpStatus: PTKPStatus;
  terCategory: TERCategory;
  terRate: number;
  monthlyPPh21: number;
  netMonthlyPay: number;
  annualizedGross: number;
  estimatedAnnualTax: number;
  effectiveAnnualRate: number;
  regulationCitation: string;
}

export function calculatePPh21MonthlyTER(
  monthlyGross: number,
  ptkpStatus: PTKPStatus
): PPh21MonthlyResult {
  const sanitizedGross = Math.max(0, Math.round(monthlyGross || 0));
  const terCategory = getTERCategory(ptkpStatus);
  const terRate = getTERRate(sanitizedGross, terCategory);
  const monthlyPPh21 = Math.round((sanitizedGross * terRate) / 100);
  const netMonthlyPay = sanitizedGross - monthlyPPh21;

  // Annual projection using Pasal 17 UU HPP
  const annualizedGross = sanitizedGross * 12;
  const estimatedAnnualTax = calculateAnnualPPh21Pasal17(
    annualizedGross,
    ptkpStatus,
    0
  ).totalTax;
  const effectiveAnnualRate =
    annualizedGross > 0 ? (estimatedAnnualTax / annualizedGross) * 100 : 0;

  return {
    monthlyGross: sanitizedGross,
    ptkpStatus,
    terCategory,
    terRate,
    monthlyPPh21,
    netMonthlyPay,
    annualizedGross,
    estimatedAnnualTax,
    effectiveAnnualRate,
    regulationCitation: 'PP No. 58/2023 & PMK No. 168/2023',
  };
}

export interface AnnualTaxBracketBreakdown {
  label: string;
  taxableAmount: number;
  rate: number;
  tax: number;
}

export interface AnnualPPh21Result {
  grossAnnual: number;
  biayaJabatan: number; // 5% max 6jt/th
  iuranPensiunAnnual: number;
  netIncome: number;
  ptkpValue: number;
  pkp: number; // Penghasilan Kena Pajak rounded down to thousands
  brackets: AnnualTaxBracketBreakdown[];
  totalTax: number;
  effectiveRate: number;
}

export function calculateAnnualPPh21Pasal17(
  grossAnnual: number,
  ptkpStatus: PTKPStatus,
  iuranPensiunMonthly = 0
): AnnualPPh21Result {
  const sanitizedGross = Math.max(0, Math.round(grossAnnual || 0));
  const maxBiayaJabatan = 6000000;
  const biayaJabatan = Math.min(sanitizedGross * 0.05, maxBiayaJabatan);
  const iuranPensiunAnnual = iuranPensiunMonthly * 12;
  const netIncome = Math.max(0, sanitizedGross - biayaJabatan - iuranPensiunAnnual);
  const ptkpValue = PTKP_VALUES[ptkpStatus] || 54000000;
  // PKP rounded down to nearest 1.000 according to standard tax rules
  const pkpRaw = Math.max(0, netIncome - ptkpValue);
  const pkp = Math.floor(pkpRaw / 1000) * 1000;

  // UU HPP No. 7/2021 Pasal 17 progressive brackets
  const brackets: AnnualTaxBracketBreakdown[] = [];
  let remainingPKP = pkp;
  let totalTax = 0;

  const progressiveTiers = [
    { limit: 60000000, rate: 0.05, label: 'Lapis 1 (s/d Rp 60 Juta)' },
    { limit: 190000000, rate: 0.15, label: 'Lapis 2 (> Rp 60 Jt s/d Rp 250 Jt)' }, // 250jt - 60jt = 190jt
    { limit: 250000000, rate: 0.25, label: 'Lapis 3 (> Rp 250 Jt s/d Rp 500 Jt)' }, // 500jt - 250jt = 250jt
    { limit: 4500000000, rate: 0.3, label: 'Lapis 4 (> Rp 500 Jt s/d Rp 5 Miliar)' }, // 5M - 500jt = 4.5M
    { limit: Infinity, rate: 0.35, label: 'Lapis 5 (> Rp 5 Miliar)' },
  ];

  for (const tier of progressiveTiers) {
    if (remainingPKP <= 0) break;
    const taxableInTier = Math.min(remainingPKP, tier.limit);
    const taxInTier = Math.round(taxableInTier * tier.rate);
    brackets.push({
      label: tier.label,
      taxableAmount: taxableInTier,
      rate: tier.rate * 100,
      tax: taxInTier,
    });
    totalTax += taxInTier;
    remainingPKP -= taxableInTier;
  }

  const effectiveRate = sanitizedGross > 0 ? (totalTax / sanitizedGross) * 100 : 0;

  return {
    grossAnnual: sanitizedGross,
    biayaJabatan,
    iuranPensiunAnnual,
    netIncome,
    ptkpValue,
    pkp,
    brackets,
    totalTax,
    effectiveRate,
  };
}

// UMKM Tax Calculator (PP 55/2022 & UU HPP)
export interface UmkmMonthlyDetail {
  monthIndex: number;
  monthName: string;
  monthlyRevenue: number;
  cumulativeRevenue: number;
  taxableRevenue: number;
  taxAmount: number;
  status: 'bebas' | 'terkena_pajak';
}

export interface UmkmTaxResult {
  taxpayerType: 'individual' | 'corporate';
  totalAnnualTurnover: number;
  annualThreshold: number; // 500jt for individual, 0 for corporate
  totalTaxableTurnover: number;
  totalTaxOwed: number;
  monthlyDetails: UmkmMonthlyDetail[];
  legalReference: string;
}

export function calculateUmkmTax(
  monthlyRevenues: number[],
  taxpayerType: 'individual' | 'corporate'
): UmkmTaxResult {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  let cumulative = 0;
  const threshold = taxpayerType === 'individual' ? 500000000 : 0;
  let totalTaxable = 0;
  let totalTax = 0;
  const details: UmkmMonthlyDetail[] = [];

  for (let i = 0; i < 12; i++) {
    const rev = Math.max(0, Math.round(monthlyRevenues[i] || 0));
    const previousCumulative = cumulative;
    cumulative += rev;

    let taxableInMonth = 0;
    if (taxpayerType === 'corporate') {
      taxableInMonth = rev;
    } else {
      // Individual with 500jt threshold
      if (cumulative <= threshold) {
        taxableInMonth = 0;
      } else if (previousCumulative < threshold && cumulative > threshold) {
        // Crossing the threshold this month
        taxableInMonth = cumulative - threshold;
      } else {
        // Already surpassed threshold in previous months
        taxableInMonth = rev;
      }
    }

    const taxInMonth = Math.round(taxableInMonth * 0.005);
    totalTaxable += taxableInMonth;
    totalTax += taxInMonth;

    details.push({
      monthIndex: i + 1,
      monthName: months[i],
      monthlyRevenue: rev,
      cumulativeRevenue: cumulative,
      taxableRevenue: taxableInMonth,
      taxAmount: taxInMonth,
      status: taxableInMonth > 0 ? 'terkena_pajak' : 'bebas',
    });
  }

  return {
    taxpayerType,
    totalAnnualTurnover: cumulative,
    annualThreshold: threshold,
    totalTaxableTurnover: totalTaxable,
    totalTaxOwed: totalTax,
    monthlyDetails: details,
    legalReference:
      taxpayerType === 'individual'
        ? 'PP No. 55/2022 Pasal 60 & UU HPP Pasal 7 (Fasilitas batasan omzet bebas pajak Rp 500 Juta)'
        : 'PP No. 55/2022 Pasal 56 (PPh Final 0,5% Peredaran Bruto UMKM Badan)',
  };
}

// PPN Calculator (UU HPP No. 7/2021)
export interface PpnResult {
  inputAmount: number;
  isTaxInclusive: boolean;
  ratePercentage: number;
  dpp: number; // Dasar Pengenaan Pajak
  ppnAmount: number;
  totalWithTax: number;
  formulaDescription: string;
  legalReference: string;
}

export function calculatePPN(
  amount: number,
  isTaxInclusive: boolean,
  ratePercentage = 11
): PpnResult {
  const sanitizedAmount = Math.max(0, Math.round(amount || 0));
  const rateFactor = ratePercentage / 100;

  let dpp = 0;
  let ppnAmount = 0;
  let totalWithTax = 0;
  let formulaDesc = '';

  if (isTaxInclusive) {
    // Harga sudah termasuk PPN
    // DPP = Nilai / (1 + Rate)
    dpp = Math.round(sanitizedAmount / (1 + rateFactor));
    ppnAmount = sanitizedAmount - dpp;
    totalWithTax = sanitizedAmount;
    formulaDesc = `DPP = Harga Transaksi ÷ (1 + ${ratePercentage}%) = Rp ${dpp.toLocaleString('id-ID')}; PPN = Harga - DPP = Rp ${ppnAmount.toLocaleString('id-ID')}`;
  } else {
    // Harga belum termasuk PPN
    dpp = sanitizedAmount;
    ppnAmount = Math.round(dpp * rateFactor);
    totalWithTax = dpp + ppnAmount;
    formulaDesc = `DPP = Rp ${dpp.toLocaleString('id-ID')}; PPN = DPP × ${ratePercentage}% = Rp ${ppnAmount.toLocaleString('id-ID')}; Total Bayar = Rp ${totalWithTax.toLocaleString('id-ID')}`;
  }

  return {
    inputAmount: sanitizedAmount,
    isTaxInclusive,
    ratePercentage,
    dpp,
    ppnAmount,
    totalWithTax,
    formulaDescription: formulaDesc,
    legalReference: 'UU No. 7 Tahun 2021 (Harmonisasi Peraturan Perpajakan / UU HPP)',
  };
}

// Take-Home Pay & BPJS Calculator
export interface TakeHomePayResult {
  grossSalary: number;
  ptkpStatus: PTKPStatus;
  // Employee BPJS contributions
  jhtEmployee: number; // 2%
  jpEmployee: number; // 1% (capped)
  bpjsKesEmployee: number; // 1% (capped)
  totalBpjsEmployee: number;
  // PPh 21
  terCategory: TERCategory;
  terRate: number;
  pph21Monthly: number;
  // Take-home pay
  takeHomePay: number;
  deductionPercentage: number;
}

export function calculateTakeHomePay(
  grossSalary: number,
  ptkpStatus: PTKPStatus
): TakeHomePayResult {
  const sanitizedGross = Math.max(0, Math.round(grossSalary || 0));

  // Cap thresholds (2024 standards)
  const JP_CAP = 10042300;
  const BPJS_KES_CAP = 12000000;

  const jhtEmployee = Math.round(sanitizedGross * 0.02);
  const jpBasis = Math.min(sanitizedGross, JP_CAP);
  const jpEmployee = Math.round(jpBasis * 0.01);

  const kesBasis = Math.min(sanitizedGross, BPJS_KES_CAP);
  const bpjsKesEmployee = Math.round(kesBasis * 0.01);

  const totalBpjsEmployee = jhtEmployee + jpEmployee + bpjsKesEmployee;

  // PPh 21 TER
  const terCategory = getTERCategory(ptkpStatus);
  const terRate = getTERRate(sanitizedGross, terCategory);
  const pph21Monthly = Math.round((sanitizedGross * terRate) / 100);

  const totalDeductions = totalBpjsEmployee + pph21Monthly;
  const takeHomePay = Math.max(0, sanitizedGross - totalDeductions);
  const deductionPercentage =
    sanitizedGross > 0 ? (totalDeductions / sanitizedGross) * 100 : 0;

  return {
    grossSalary: sanitizedGross,
    ptkpStatus,
    jhtEmployee,
    jpEmployee,
    bpjsKesEmployee,
    totalBpjsEmployee,
    terCategory,
    terRate,
    pph21Monthly,
    takeHomePay,
    deductionPercentage,
  };
}

// THR (Tunjangan Hari Raya) - Permenaker No. 6/2016
export interface ThrResult {
  monthlySalary: number;
  monthsOfService: number;
  thrAmount: number;
  calculationType: 'full' | 'prorata' | 'none';
  explanation: string;
  legalReference: string;
}

export function calculateTHR(
  monthlySalary: number,
  monthsOfService: number
): ThrResult {
  const salary = Math.max(0, Math.round(monthlySalary || 0));
  const months = Math.max(0, Math.min(120, monthsOfService || 0));

  let thrAmount = 0;
  let calculationType: 'full' | 'prorata' | 'none' = 'none';
  let explanation = '';

  if (months < 1) {
    thrAmount = 0;
    calculationType = 'none';
    explanation =
      'Pekerja dengan masa kerja kurang dari 1 bulan belum berhak mendapatkan THR keagamaan sesuai regulasi ketenagakerjaan.';
  } else if (months >= 12) {
    thrAmount = salary;
    calculationType = 'full';
    explanation =
      'Masa kerja 12 bulan atau lebih berhak mendapatkan THR sebesar 1 (satu) bulan upah penuh.';
  } else {
    // Prorata: (months / 12) * salary
    thrAmount = Math.round((months / 12) * salary);
    calculationType = 'prorata';
    explanation = `Masa kerja ${months} bulan berhak mendapatkan THR proporsional: (${months}/12) × Upah 1 Bulan = Rp ${thrAmount.toLocaleString('id-ID')}.`;
  }

  return {
    monthlySalary: salary,
    monthsOfService: months,
    thrAmount,
    calculationType,
    explanation,
    legalReference:
      'Peraturan Menteri Ketenagakerjaan (Permenaker) No. 6 Tahun 2016 tentang Tunjangan Hari Raya Keagamaan',
  };
}

// Currency format helper
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount || 0);
}
