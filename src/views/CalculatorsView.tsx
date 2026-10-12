import React, { useState, useEffect } from 'react';
import { PPh21Calculator } from '../components/calculators/PPh21Calculator';
import { UmkmCalculator } from '../components/calculators/UmkmCalculator';
import { PpnCalculator } from '../components/calculators/PpnCalculator';
import { TakeHomePayCalculator } from '../components/calculators/TakeHomePayCalculator';
import { Calculator, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SEOMeta } from '../components/SEOMeta';

interface CalculatorsViewProps {
  initialTool?: string;
}

export const CalculatorsView: React.FC<CalculatorsViewProps> = ({ initialTool = 'pph21' }) => {
  const [activeTool, setActiveTool] = useState<string>(initialTool);

  useEffect(() => {
    if (initialTool) {
      setActiveTool(initialTool);
    }
  }, [initialTool]);

  const tools = [
    { id: 'pph21', label: 'PPh 21 TER (PP 58/2023)' },
    { id: 'umkm', label: 'Pajak UMKM 0,5% (PP 55/2022)' },
    { id: 'ppn', label: 'PPN 11% & DPP' },
    { id: 'gajibersih', label: 'Gaji Bersih & THR' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <SEOMeta
        title="Kalkulator Pajak Indonesia Terverifikasi (PPh 21, UMKM, PPN, THP)"
        description="Gunakan kalkulator pajak teruji resmi untuk menghitung pemotongan PPh 21 TER bulanan, batasan omzet bebas pajak UMKM Rp 500 juta, dan PPN 11%."
      />

      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Kalkulator Pajak Berbasis Peraturan Pemerintah Resmi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-950">
          Pusat Alat Hitung Pajak & Keuangan
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Seluruh alat hitung di bawah ini divalidasi dengan unit test terhadap lampiran resmi Direktorat Jenderal Pajak dan Kementerian Keuangan Republik Indonesia.
        </p>
      </div>

      {/* Segmented Tool Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTool(t.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition cursor-pointer ${
              activeTool === t.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Active Calculator Component */}
      <div>
        {activeTool === 'pph21' && <PPh21Calculator />}
        {activeTool === 'umkm' && <UmkmCalculator />}
        {activeTool === 'ppn' && <PpnCalculator />}
        {activeTool === 'gajibersih' && <TakeHomePayCalculator />}
      </div>
    </div>
  );
};
