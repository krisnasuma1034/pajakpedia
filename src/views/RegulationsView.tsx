import React from 'react';
import { RegulatorySourceItem } from '../types';
import { ExternalLink, ShieldCheck, Scale, CheckCircle2 } from 'lucide-react';
import { SEOMeta } from '../components/SEOMeta';

interface RegulationsViewProps {
  regulations: RegulatorySourceItem[];
}

export const RegulationsView: React.FC<RegulationsViewProps> = ({ regulations }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <SEOMeta
        title="Direktori Regulasi & Peraturan Pajak Indonesia Resmi (PP 58/2023, UU HPP)"
        description="Direktori resmi peraturan perundang-undangan perpajakan Republik Indonesia yang telah diverifikasi ke JDIH BPK RI dan Kementerian Keuangan."
      />

      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <Scale className="w-4 h-4" />
          <span>Rujukan Hukum Primer Republik Indonesia</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-950">
          Direktori Regulasi & Peraturan Perpajakan
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          PajakPedia menjunjung tinggi asas kepastian hukum fiskal. Seluruh panduan, artikel, dan simulator kami didasarkan langsung pada naskah otentik peraturan perundang-undangan di bawah ini.
        </p>
      </div>

      {/* Regulations List */}
      <div className="space-y-6">
        {regulations.map((reg) => (
          <div
            key={reg.id}
            className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-teal-900 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                  {reg.docNumber}
                </span>
                <span className="text-xs text-slate-500">·</span>
                <span className="text-xs font-semibold text-slate-700">{reg.authority}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Status: Berlaku
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-serif font-bold text-slate-900 leading-snug">
                {reg.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {reg.summary}
              </p>
            </div>

            {/* Key provisions bullet list */}
            <div className="bg-slate-50 rounded-lg p-4 space-y-2 border border-slate-100">
              <span className="text-xs font-semibold text-slate-800 block">
                Pokok Pengaturan Utama:
              </span>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                {reg.keyPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Metadata and Direct Official Link */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-3">
                <span>Ditetapkan: {reg.publicationDate}</span>
                <span>·</span>
                <span>Mulai Berlaku: {reg.effectiveDate}</span>
                <span>·</span>
                <span>Verifikasi Terakhir: {reg.lastVerifiedDate}</span>
              </div>

              <a
                href={reg.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition shrink-0"
              >
                Unduh / Buka Dokumen Resmi JDIH
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
