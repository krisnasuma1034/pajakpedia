import React, { useState } from 'react';
import { calculateUmkmTax, formatIDR } from '../../utils/taxCalculators';
import { Store, ShieldCheck, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';

export const UmkmCalculator: React.FC = () => {
  const [taxpayerType, setTaxpayerType] = useState<'individual' | 'corporate'>('individual');
  const [averageMonthlyRev, setAverageMonthlyRev] = useState<number>(50000000);
  const [customMonthly, setCustomMonthly] = useState<number[]>(Array(12).fill(50000000));
  const [useCustomMonthly, setUseCustomMonthly] = useState<boolean>(false);

  // Update custom monthly when average changes if not using custom mode
  const activeRevenues = useCustomMonthly ? customMonthly : Array(12).fill(averageMonthlyRev);
  const result = calculateUmkmTax(activeRevenues, taxpayerType);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 mb-6">
        <div className="text-xs text-slate-500 font-medium mb-1">
          Kalkulator Edukasi · PPh Final UMKM 0,5%
        </div>
        <h2 className="text-2xl font-bold font-serif text-slate-900">
          Simulasi Pajak UMKM (PP 55/2022 & UU HPP)
        </h2>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
          Ketahui hak bebas pajak omzet hingga <strong>Rp 500.000.000 per tahun</strong> bagi Wajib Pajak Orang Pribadi dan hitung kewajiban PPh Final 0,5%.
        </p>
      </div>

      {/* Taxpayer Type Segmented Control */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
          Bentuk Entitas Usaha
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setTaxpayerType('individual')}
            className={`p-4 rounded-lg border text-left transition ${
              taxpayerType === 'individual'
                ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="font-semibold text-slate-900 text-sm">
              Wajib Pajak Orang Pribadi (Perorangan)
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Mendapat fasilitas bebas pajak atas omzet kumulatif hingga Rp 500 Juta per tahun.
            </div>
          </button>

          <button
            type="button"
            onClick={() => setTaxpayerType('corporate')}
            className={`p-4 rounded-lg border text-left transition ${
              taxpayerType === 'corporate'
                ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="font-semibold text-slate-900 text-sm">
              Badan Usaha (CV, PT, Koperasi)
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Dikenakan tarif 0,5% langsung dari omzet tanpa fasilitas bebas pajak Rp 500 juta.
            </div>
          </button>
        </div>
      </div>

      {/* Monthly Revenue Input */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Rata-Rata Peredaran Bruto (Omzet) Per Bulan
          </label>
          <button
            type="button"
            onClick={() => setUseCustomMonthly(!useCustomMonthly)}
            className="text-xs text-teal-700 hover:underline font-medium"
          >
            {useCustomMonthly ? 'Kembali ke Rata-Rata Tetap' : 'Sesuaikan Omzet Tiap Bulan'}
          </button>
        </div>

        {!useCustomMonthly ? (
          <div>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-sm font-semibold text-slate-400">
                Rp
              </span>
              <input
                type="number"
                min="0"
                step="5000000"
                value={averageMonthlyRev}
                onChange={(e) => setAverageMonthlyRev(Number(e.target.value) || 0)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 tabular-nums"
                placeholder="50000000"
              />
            </div>
            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-2 mt-2.5">
              {[25000000, 40000000, 50000000, 75000000, 100000000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAverageMonthlyRev(val)}
                  className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition"
                >
                  {formatIDR(val)}/bln
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {months.map((m, idx) => (
              <div key={m}>
                <span className="text-[11px] font-semibold text-slate-500 uppercase">{m}</span>
                <input
                  type="number"
                  min="0"
                  step="1000000"
                  value={customMonthly[idx]}
                  onChange={(e) => {
                    const copy = [...customMonthly];
                    copy[idx] = Number(e.target.value) || 0;
                    setCustomMonthly(copy);
                  }}
                  className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded text-slate-900 focus:bg-white tabular-nums"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Highlight Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Total Omzet 1 Tahun
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900 tabular-nums">
              {formatIDR(result.totalAnnualTurnover)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Akumulasi 12 bulan
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Omzet Kena Pajak
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900 tabular-nums">
              {formatIDR(result.totalTaxableTurnover)}
            </div>
            <div className="text-xs text-slate-600 mt-1">
              {taxpayerType === 'individual'
                ? 'Setelah dipotong fasilitas Rp 500 Jt'
                : 'Dikenakan dari omzet pertama'}
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Total PPh Final 0,5% Setahun
            </div>
            <div className="mt-1 text-2xl font-bold text-teal-800 tabular-nums">
              {formatIDR(result.totalTaxOwed)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Disetor tiap tanggal 15 bulan berikutnya
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Cumulative Progress Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-3 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
            Tabel Akumulasi Omzet & Setoran Pajak Bulanan
          </span>
          <span className="text-xs text-slate-500 font-mono">Tahun Pajak 2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="p-3">Bulan</th>
                <th className="p-3 text-right">Omzet Sebulan</th>
                <th className="p-3 text-right">Akumulasi Omzet</th>
                <th className="p-3 text-right">Omzet Kena Pajak</th>
                <th className="p-3 text-right">PPh Final 0,5%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 tabular-nums text-slate-800">
              {result.monthlyDetails.map((m) => (
                <tr key={m.monthIndex} className={m.taxAmount > 0 ? 'bg-amber-50/20' : ''}>
                  <td className="p-3 font-medium text-slate-900">{m.monthName}</td>
                  <td className="p-3 text-right">{formatIDR(m.monthlyRevenue)}</td>
                  <td className="p-3 text-right font-medium">{formatIDR(m.cumulativeRevenue)}</td>
                  <td className="p-3 text-right">
                    {m.taxableRevenue > 0 ? (
                      formatIDR(m.taxableRevenue)
                    ) : (
                      <span className="text-slate-400">Rp 0 (Bebas)</span>
                    )}
                  </td>
                  <td className="p-3 text-right font-bold text-slate-900">
                    {m.taxAmount > 0 ? (
                      formatIDR(m.taxAmount)
                    ) : (
                      <span className="text-emerald-700 font-normal">Nihil (Rp 0)</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legal Reference & Verification Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-700 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-slate-900">Rujukan Ketentuan Hukum:</p>
          <p className="leading-relaxed">{result.legalReference}.</p>
          <p className="text-slate-500 leading-relaxed">
            Catatan: Pelaku UMKM tetap wajib menyampaikan Surat Pemberitahuan (SPT) Tahunan paling lambat 31 Maret (Orang Pribadi) atau 30 April (Badan) meskipun status pajaknya nihil.
          </p>
        </div>
      </div>
    </div>
  );
};
