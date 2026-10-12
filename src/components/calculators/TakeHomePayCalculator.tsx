import React, { useState } from 'react';
import {
  calculateTakeHomePay,
  calculateTHR,
  formatIDR,
  PTKP_DESCRIPTIONS,
} from '../../utils/taxCalculators';
import { PTKPStatus } from '../../types';
import { Wallet, Gift, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const TakeHomePayCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'takehome' | 'thr'>('takehome');

  // Take-home pay states
  const [grossSalary, setGrossSalary] = useState<number>(10000000);
  const [ptkp, setPtkp] = useState<PTKPStatus>('TK/0');

  // THR states
  const [thrSalary, setThrSalary] = useState<number>(10000000);
  const [monthsOfService, setMonthsOfService] = useState<number>(12);

  const thpResult = calculateTakeHomePay(grossSalary, ptkp);
  const thrResult = calculateTHR(thrSalary, monthsOfService);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 mb-6">
        <div className="text-xs text-slate-500 font-medium mb-1">
          Kalkulator Edukasi · Keuangan Karyawan & Pekerja
        </div>
        <h2 className="text-2xl font-bold font-serif text-slate-900">
          Kalkulator Gaji Bersih (Take-Home Pay) & THR
        </h2>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
          Simulasikan estimasi penerimaan gaji bersih bulanan setelah potongan BPJS Ketenagakerjaan, BPJS Kesehatan, dan PPh 21 TER, serta kalkulasi hak THR keagamaan.
        </p>

        {/* Tab switch */}
        <div className="flex gap-2 mt-5 p-1 bg-slate-100 rounded-lg max-w-sm">
          <button
            type="button"
            onClick={() => setActiveTab('takehome')}
            className={`flex-1 py-2 text-xs font-medium rounded-md transition ${
              activeTab === 'takehome'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Gaji Bersih (Take-Home Pay)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('thr')}
            className={`flex-1 py-2 text-xs font-medium rounded-md transition ${
              activeTab === 'thr'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kalkulator THR Keagamaan
          </button>
        </div>
      </div>

      {activeTab === 'takehome' ? (
        <div>
          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Gaji Pokok & Tunjangan Tetap (Gross)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-sm font-semibold text-slate-400">
                  Rp
                </span>
                <input
                  type="number"
                  min="0"
                  step="500000"
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(Number(e.target.value) || 0)}
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 tabular-nums"
                  placeholder="10000000"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Status PTKP
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
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">
                  Gaji Kotor (Bruto)
                </div>
                <div className="mt-1 text-2xl font-bold text-slate-900 tabular-nums">
                  {formatIDR(thpResult.grossSalary)}
                </div>
                <div className="text-xs text-slate-500 mt-1">Gaji sebulan penuh</div>
              </div>

              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">
                  Total Potongan Wajib
                </div>
                <div className="mt-1 text-2xl font-bold text-rose-700 tabular-nums">
                  {formatIDR(thpResult.totalBpjsEmployee + thpResult.pph21Monthly)}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  BPJS ({formatIDR(thpResult.totalBpjsEmployee)}) + PPh 21 ({formatIDR(thpResult.pph21Monthly)})
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">
                  Estimasi Gaji Bersih (THP)
                </div>
                <div className="mt-1 text-2xl font-bold text-emerald-800 tabular-nums font-serif">
                  {formatIDR(thpResult.takeHomePay)}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Yang masuk ke rekening bank
                </div>
              </div>
            </div>
          </div>

          {/* Deductions Breakdown Table */}
          <div className="border border-slate-200 rounded-lg overflow-hidden mb-6">
            <div className="px-4 py-3 bg-slate-100/70 border-b border-slate-200">
              <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                Rincian Potongan Slip Gaji Karyawan
              </span>
            </div>
            <table className="w-full text-xs text-left">
              <tbody className="divide-y divide-slate-100 tabular-nums text-slate-800">
                <tr>
                  <td className="p-3 font-medium">BPJS Jaminan Hari Tua (JHT) Pekerja</td>
                  <td className="p-3 text-slate-500">2% dari Gaji Bruto</td>
                  <td className="p-3 text-right font-semibold text-slate-900">
                    {formatIDR(thpResult.jhtEmployee)}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">BPJS Jaminan Pensiun (JP) Pekerja</td>
                  <td className="p-3 text-slate-500">1% (Batas maksimal upah Rp 10.042.300)</td>
                  <td className="p-3 text-right font-semibold text-slate-900">
                    {formatIDR(thpResult.jpEmployee)}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">BPJS Kesehatan Pekerja</td>
                  <td className="p-3 text-slate-500">1% (Batas maksimal upah Rp 12.000.000)</td>
                  <td className="p-3 text-right font-semibold text-slate-900">
                    {formatIDR(thpResult.bpjsKesEmployee)}
                  </td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="p-3 font-medium">PPh 21 TER Kategori {thpResult.terCategory}</td>
                  <td className="p-3 text-slate-500">Tarif efektif PP 58/2023: {thpResult.terRate}%</td>
                  <td className="p-3 text-right font-semibold text-slate-900">
                    {formatIDR(thpResult.pph21Monthly)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          {/* THR Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Upah 1 Bulan (Gaji Pokok + Tunjangan Tetap)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-sm font-semibold text-slate-400">
                  Rp
                </span>
                <input
                  type="number"
                  min="0"
                  step="500000"
                  value={thrSalary}
                  onChange={(e) => setThrSalary(Number(e.target.value) || 0)}
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 tabular-nums"
                  placeholder="10000000"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Masa Kerja (Bulan Kalender Berkelanjutan)
              </label>
              <input
                type="number"
                min="0"
                max="120"
                value={monthsOfService}
                onChange={(e) => setMonthsOfService(Number(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 tabular-nums"
                placeholder="12"
              />
              <p className="text-xs text-slate-500 mt-1.5">
                Minimal 1 bulan kerja untuk berhak menerima THR proporsional.
              </p>
            </div>
          </div>

          {/* THR Result Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Estimasi Hak THR Keagamaan
            </div>
            <div className="mt-2 text-3xl font-bold text-slate-900 font-serif tabular-nums">
              {formatIDR(thrResult.thrAmount)}
            </div>
            <p className="text-sm text-slate-700 mt-2 leading-relaxed">
              {thrResult.explanation}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-700 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Dasar Regulasi Ketenagakerjaan:</p>
              <p className="text-slate-600">{thrResult.legalReference}. Wajib dibayarkan oleh perusahaan paling lambat 7 hari sebelum hari raya keagamaan (H-7).</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
