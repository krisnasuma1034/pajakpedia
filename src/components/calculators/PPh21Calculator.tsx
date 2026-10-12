import React, { useState } from 'react';
import {
  calculatePPh21MonthlyTER,
  formatIDR,
  PTKP_DESCRIPTIONS,
} from '../../utils/taxCalculators';
import { PTKPStatus } from '../../types';
import { Info, HelpCircle, CheckCircle2, BookOpen } from 'lucide-react';

export const PPh21Calculator: React.FC = () => {
  const [grossInput, setGrossInput] = useState<number>(10000000);
  const [ptkp, setPtkp] = useState<PTKPStatus>('TK/0');

  const result = calculatePPh21MonthlyTER(grossInput, ptkp);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 mb-6">
        <div className="text-xs text-slate-500 font-medium mb-1">
          Kalkulator Edukasi · Pemotongan Bulanan Masa Jan–Nov
        </div>
        <h2 className="text-2xl font-bold font-serif text-slate-900">
          Kalkulator PPh 21 Karyawan (Skema TER)
        </h2>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
          Sesuai ketentuan resmi <strong>PP No. 58 Tahun 2023</strong> dan <strong>PMK No. 168 Tahun 2023</strong> yang berlaku untuk seluruh karyawan tetap di Indonesia.
        </p>
      </div>

      {/* Inputs Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Gross Income Input */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Penghasilan Bruto Sebulan (Gaji + Tunjangan)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-sm font-semibold text-slate-400">
              Rp
            </span>
            <input
              type="number"
              min="0"
              step="500000"
              value={grossInput}
              onChange={(e) => setGrossInput(Number(e.target.value) || 0)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 tabular-nums"
              placeholder="Contoh: 10000000"
            />
          </div>
          <p className="text-xs text-slate-500 mt-1.5">
            Total seluruh penghasilan kotor sebelum potongan (gaji pokok, uang makan, tunjangan tetap).
          </p>
        </div>

        {/* PTKP Status Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Status PTKP (Penghasilan Tidak Kena Pajak)
          </label>
          <select
            value={ptkp}
            onChange={(e) => setPtkp(e.target.value as PTKPStatus)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            {(Object.keys(PTKP_DESCRIPTIONS) as PTKPStatus[]).map((key) => (
              <option key={key} value={key}>
                {key} — {PTKP_DESCRIPTIONS[key]}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-500 mt-1.5">
            Status perkawinan dan jumlah tanggungan sedarah pada awal tahun pajak (1 Januari).
          </p>
        </div>
      </div>

      {/* Results Highlight Cards */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* TER Category & Rate */}
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Kategori & Tarif TER
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900 font-serif">
              TER {result.terCategory} · <span className="tabular-nums text-teal-700">{result.terRate}%</span>
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Berdasarkan Lampiran PP 58/2023
            </div>
          </div>

          {/* Monthly PPh 21 Deduction */}
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Potongan PPh 21 Bulanan
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900 tabular-nums">
              {formatIDR(result.monthlyPPh21)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Masa Januari s/d November
            </div>
          </div>

          {/* Net Pay Estimate */}
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Gaji Diterima (Setelah PPh 21)
            </div>
            <div className="mt-1 text-2xl font-bold text-emerald-800 tabular-nums">
              {formatIDR(result.netMonthlyPay)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Belum memperhitungkan potongan BPJS
            </div>
          </div>
        </div>
      </div>

      {/* Calculation Walkthrough Breakdown */}
      <div className="border border-slate-200 rounded-lg p-5 mb-6 space-y-3">
        <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-700" />
          Rincian Langkah Penghitungan (Masa Jan–Nov)
        </h3>
        <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="font-semibold text-slate-900">1. Identifikasi Kategori TER:</span>
            <span>
              Status PTKP Anda adalah <strong>{result.ptkpStatus}</strong>, yang menurut PP 58/2023 masuk ke <strong>TER Kategori {result.terCategory}</strong>.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-slate-900">2. Pencocokan Rentang Gaji:</span>
            <span>
              Penghasilan bruto bulanan {formatIDR(result.monthlyGross)} dikenakan tarif efektif sebesar <strong>{result.terRate}%</strong>.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-slate-900">3. Formula Pemotongan:</span>
            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800">
              {formatIDR(result.monthlyGross)} × {result.terRate}% = {formatIDR(result.monthlyPPh21)}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-slate-900">4. Proyeksi Masa Pajak Desember:</span>
            <span>
              Di akhir tahun (Desember), kantor akan menghitung total pajak terutang setahun menggunakan tarif progresif Pasal 17 UU HPP (est. setahun: {formatIDR(result.estimatedAnnualTax)}), lalu mengurangkannya dengan total potongan Januari–November.
            </span>
          </li>
        </ul>
      </div>

      {/* Verified Regulatory Note & Disclaimer */}
      <div className="bg-teal-50/60 border border-teal-200 rounded-lg p-4 text-xs text-teal-950 flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">Dasar Hukum Terverifikasi:</p>
          <p className="text-teal-900 leading-relaxed">
            Peraturan Pemerintah No. 58/2023 & Peraturan Menteri Keuangan No. 168/2023. Perhitungan ini adalah sarana edukasi mandiri. Pemotongan riil di slip gaji Anda dapat dipengaruhi oleh iuran pensiun, tunjangan natura yang dikecualikan, atau bonus berkala.
          </p>
        </div>
      </div>
    </div>
  );
};
