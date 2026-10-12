import React, { useState } from 'react';
import { calculatePPN, formatIDR } from '../../utils/taxCalculators';
import { Receipt, Info, CheckCircle2 } from 'lucide-react';

export const PpnCalculator: React.FC = () => {
  const [amountInput, setAmountInput] = useState<number>(11100000);
  const [isTaxInclusive, setIsTaxInclusive] = useState<boolean>(true);
  const [rate, setRate] = useState<number>(11);

  const result = calculatePPN(amountInput, isTaxInclusive, rate);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 mb-6">
        <div className="text-xs text-slate-500 font-medium mb-1">
          Kalkulator Edukasi · Pajak Konsumsi & Faktur Pajak
        </div>
        <h2 className="text-2xl font-bold font-serif text-slate-900">
          Kalkulator PPN (Pajak Pertambahan Nilai) & DPP
        </h2>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
          Hitung Dasar Pengenaan Pajak (DPP) dan PPN terutang untuk transaksi harga <strong>inklusif (sudah termasuk PPN)</strong> maupun <strong>eksklusif (belum termasuk PPN)</strong>.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Status Nilai Transaksi
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setIsTaxInclusive(true)}
              className={`py-2 text-xs font-medium rounded-md transition ${
                isTaxInclusive
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sudah Termasuk PPN
            </button>
            <button
              type="button"
              onClick={() => setIsTaxInclusive(false)}
              className={`py-2 text-xs font-medium rounded-md transition ${
                !isTaxInclusive
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Belum Termasuk PPN
            </button>
          </div>
        </div>

        {/* Rate Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Tarif PPN yang Berlaku
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setRate(11)}
              className={`py-2 text-xs font-medium rounded-md transition ${
                rate === 11
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              11% (Tarif Resmi UU HPP)
            </button>
            <button
              type="button"
              onClick={() => setRate(12)}
              className={`py-2 text-xs font-medium rounded-md transition ${
                rate === 12
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              12% (Simulasi Masa Datang)
            </button>
          </div>
        </div>
      </div>

      {/* Input Amount */}
      <div className="mb-8">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
          {isTaxInclusive
            ? 'Nilai Transaksi (Harga Final Termasuk PPN)'
            : 'Nilai Transaksi / Harga Pokok (Sebelum PPN)'}
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-3 text-sm font-semibold text-slate-400">Rp</span>
          <input
            type="number"
            min="0"
            step="100000"
            value={amountInput}
            onChange={(e) => setAmountInput(Number(e.target.value) || 0)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 tabular-nums"
            placeholder="11100000"
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {[1110000, 5550000, 11100000, 22200000, 50000000].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmountInput(preset)}
              className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition"
            >
              {formatIDR(preset)}
            </button>
          ))}
        </div>
      </div>

      {/* Result Cards */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Dasar Pengenaan Pajak (DPP)
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900 tabular-nums">
              {formatIDR(result.dpp)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Harga murni barang / jasa
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              PPN ({rate}%) Terutang
            </div>
            <div className="mt-1 text-2xl font-bold text-teal-800 tabular-nums">
              {formatIDR(result.ppnAmount)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Nilai yang disetor / faktur pajak
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Total Pembayaran
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900 tabular-nums">
              {formatIDR(result.totalWithTax)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              DPP + PPN {rate}%
            </div>
          </div>
        </div>
      </div>

      {/* Formula Explanation */}
      <div className="border border-slate-200 rounded-lg p-4 bg-white mb-6 text-xs text-slate-700 space-y-2">
        <div className="font-semibold text-slate-900">Langkah Penghitungan Matematis:</div>
        <p className="font-mono bg-slate-50 p-2.5 rounded border border-slate-100 text-slate-800">
          {result.formulaDescription}
        </p>
        <p className="text-slate-500">
          Untuk Faktur Pajak elektronik (e-Faktur), nilai DPP dan PPN wajib dicantumkan secara terpisah agar pembeli berstatus PKP dapat mengkreditkan Pajak Masukan.
        </p>
      </div>

      {/* Regulatory Reference */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-700 flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-slate-900">Dasar Regulasi:</p>
          <p className="text-slate-600 leading-relaxed">
            Undang-Undang Nomor 7 Tahun 2021 tentang Harmonisasi Peraturan Perpajakan (UU HPP) Bab VI Pajak Pertambahan Nilai.
          </p>
        </div>
      </div>
    </div>
  );
};
