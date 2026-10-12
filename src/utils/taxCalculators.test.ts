import {
  calculatePPh21MonthlyTER,
  calculateAnnualPPh21Pasal17,
  calculateUmkmTax,
  calculatePPN,
  calculateTHR,
} from './taxCalculators';

export function runCalculatorUnitTests(): {
  name: string;
  passed: boolean;
  expected: string;
  actual: string;
}[] {
  const results = [];

  // Test 1: PPh 21 TER A for Rp 6.000.000 TK/0
  const t1 = calculatePPh21MonthlyTER(6000000, 'TK/0');
  results.push({
    name: 'PPh 21 TER A (Gaji Rp 6 Jt, TK/0) harus tarif 0.75% = Rp 45.000',
    passed: t1.terRate === 0.75 && t1.monthlyPPh21 === 45000,
    expected: 'Tarif 0.75%, Potongan Rp 45.000',
    actual: `Tarif ${t1.terRate}%, Potongan Rp ${t1.monthlyPPh21}`,
  });

  // Test 2: PPh 21 TER A for Rp 10.000.000 TK/0
  const t2 = calculatePPh21MonthlyTER(10000000, 'TK/0');
  results.push({
    name: 'PPh 21 TER A (Gaji Rp 10 Jt, TK/0) harus tarif 2.0% = Rp 200.000',
    passed: t2.terRate === 2.0 && t2.monthlyPPh21 === 200000,
    expected: 'Tarif 2%, Potongan Rp 200.000',
    actual: `Tarif ${t2.terRate}%, Potongan Rp ${t2.monthlyPPh21}`,
  });

  // Test 3: UMKM OP Omzet Rp 40 Jt/bulan (Rp 480 Jt/tahun) - di bawah batas Rp 500 Jt
  const revsUnder500 = Array(12).fill(40000000);
  const t3 = calculateUmkmTax(revsUnder500, 'individual');
  results.push({
    name: 'UMKM OP Omzet Rp 480 Jt/th (dibawah Rp 500 Jt) harus Pajak Rp 0 (Bebas Pajak UU HPP)',
    passed: t3.totalTaxOwed === 0 && t3.totalTaxableTurnover === 0,
    expected: 'Pajak Rp 0, Omzet Kena Pajak Rp 0',
    actual: `Pajak Rp ${t3.totalTaxOwed}, Omzet Kena Pajak Rp ${t3.totalTaxableTurnover}`,
  });

  // Test 4: UMKM OP Omzet Rp 50 Jt/bulan (Total Rp 600 Jt/tahun)
  // Bulan 1-10 = 500 Jt (Pajak 0), Bulan 11-12 = 100 Jt terkena 0.5% = Rp 500.000
  const revs600 = Array(12).fill(50000000);
  const t4 = calculateUmkmTax(revs600, 'individual');
  results.push({
    name: 'UMKM OP Omzet Rp 600 Jt/th: omzet kena pajak Rp 100 Jt, PPh Final 0.5% = Rp 500.000',
    passed: t4.totalTaxableTurnover === 100000000 && t4.totalTaxOwed === 500000,
    expected: 'Kena Pajak Rp 100.000.000, PPh Rp 500.000',
    actual: `Kena Pajak Rp ${t4.totalTaxableTurnover}, PPh Rp ${t4.totalTaxOwed}`,
  });

  // Test 5: PPN 11% Harga termasuk pajak Rp 11.100.000
  const t5 = calculatePPN(11100000, true, 11);
  results.push({
    name: 'PPN 11% Harga Termasuk Pajak Rp 11.100.000: DPP Rp 10.000.000, PPN Rp 1.100.000',
    passed: t5.dpp === 10000000 && t5.ppnAmount === 1100000,
    expected: 'DPP Rp 10.000.000, PPN Rp 1.100.000',
    actual: `DPP Rp ${t5.dpp}, PPN Rp ${t5.ppnAmount}`,
  });

  // Test 6: THR 6 bulan kerja gaji Rp 6.000.000 (prorata)
  const t6 = calculateTHR(6000000, 6);
  results.push({
    name: 'THR Prorata 6 bulan kerja upah Rp 6 Jt = Rp 3.000.000',
    passed: t6.thrAmount === 3000000,
    expected: 'THR Rp 3.000.000',
    actual: `THR Rp ${t6.thrAmount}`,
  });

  return results;
}
