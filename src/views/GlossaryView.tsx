import React, { useState } from 'react';
import { GlossaryTerm } from '../types';
import { Search, BookOpen, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { SEOMeta } from '../components/SEOMeta';

interface GlossaryViewProps {
  glossary: GlossaryTerm[];
  initialTermSlug?: string;
  onSelectTerm?: (slug: string) => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({
  glossary,
  initialTermSlug,
}) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(
    initialTermSlug ? glossary.find((g) => g.slug === initialTermSlug)?.id || null : null
  );

  const filtered = glossary.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      !search ||
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.plainDefinition.toLowerCase().includes(search.toLowerCase()) ||
      item.technicalDefinition.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <SEOMeta
        title="Kamus Istilah Pajak Indonesia (PTKP, PKP, TER, SPT, Coretax, Faktur)"
        description="Pelajari definisi istilah teknis perpajakan Indonesia dalam bahasa sehari-hari yang mudah dipahami, dilengkapi rujukan undang-undang dan contoh kasus."
      />

      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="text-xs text-slate-500 font-medium">
          Kamus & Glosarium Pajak Resmi
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-950">
          Kamus Pajak Indonesia
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Temukan penjelasan istilah teknis perpajakan dalam Bahasa Indonesia yang lugas dan mudah dimengerti tanpa mengurangi bobot hukum resminya.
        </p>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari istilah (contoh: PTKP, TER)..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {[
            { id: 'all', label: 'Semua Istilah' },
            { id: 'pph-21', label: 'PPh & Gaji' },
            { id: 'pajak-umkm', label: 'UMKM' },
            { id: 'ppn', label: 'PPN & Faktur' },
            { id: 'coretax', label: 'Coretax' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Items List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="cursor-pointer flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-teal-800 uppercase tracking-wider">
                      {item.category.toUpperCase()}
                    </span>
                    <span>·</span>
                    <span>Ditinjau: {item.lastReviewedDate}</span>
                  </div>
                  <h2 className="text-lg font-bold font-serif text-slate-900">
                    {item.term}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                    {item.plainDefinition}
                  </p>
                </div>

                <button
                  type="button"
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 shrink-0 mt-2"
                >
                  {isExpanded ? 'Tutup Rincian ▲' : 'Rincian Lengkap ▼'}
                </button>
              </div>

              {/* Expanded technical and example details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-slate-900 block mb-0.5">
                      Definisi Teknis / Yuridis:
                    </span>
                    <p className="text-slate-600 bg-slate-50 p-3 rounded-lg leading-relaxed font-sans">
                      {item.technicalDefinition}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-900 block mb-0.5">
                      Contoh Penerapan Nyata:
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {item.example}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">Dasar Hukum:</span>
                      <span className="font-mono">{item.officialSource}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">Istilah Terkait:</span>{' '}
                      {item.relatedTerms.join(', ')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
