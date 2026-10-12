import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Calculator, FileText, ArrowRight, Radio } from 'lucide-react';
import { Article, GlossaryTerm, RegulatorySourceItem, ExternalNewsItem } from '../types';

interface SearchBarProps {
  articles: Article[];
  glossary: GlossaryTerm[];
  regulations: RegulatorySourceItem[];
  newsList?: ExternalNewsItem[];
  onSelectArticle: (slug: string) => void;
  onSelectGlossary: (slug: string) => void;
  onSelectCalculator: (toolId: string) => void;
  onSelectNews?: (id: string) => void;
  className?: string;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  articles,
  glossary,
  regulations,
  newsList,
  onSelectArticle,
  onSelectGlossary,
  onSelectCalculator,
  onSelectNews,
  className = '',
  placeholder = 'Cari aturan, kalkulator PPh 21, UMKM 0,5%, atau istilah pajak...',
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalized = query.trim().toLowerCase();

  // Search matches
  const matchedArticles = normalized
    ? articles.filter(
        (a) =>
          a.status === 'published' &&
          (a.title.toLowerCase().includes(normalized) ||
            a.excerpt.toLowerCase().includes(normalized) ||
            a.keyTakeaways.some((k) => k.toLowerCase().includes(normalized)))
      ).slice(0, 4)
    : [];

  const matchedGlossary = normalized
    ? glossary.filter(
        (g) =>
          g.term.toLowerCase().includes(normalized) ||
          g.plainDefinition.toLowerCase().includes(normalized)
      ).slice(0, 3)
    : [];

  const matchedCalculators = normalized
    ? [
        { id: 'pph21', title: 'Kalkulator PPh 21 Karyawan (TER PP 58/2023)', keywords: 'pph 21 ter gaji ptkp pkp' },
        { id: 'umkm', title: 'Simulasi Pajak UMKM 0,5% (PP 55/2022)', keywords: 'umkm omzet 500 juta 0.5 persen' },
        { id: 'ppn', title: 'Kalkulator PPN 11% & DPP (Inklusif/Eksklusif)', keywords: 'ppn 11 dpp faktur pajak' },
        { id: 'gajibersih', title: 'Kalkulator Gaji Bersih (Take-Home Pay) & THR', keywords: 'gaji bersih take home pay thr bpjs' },
      ].filter((c) => c.title.toLowerCase().includes(normalized) || c.keywords.includes(normalized)).slice(0, 2)
    : [];

  const matchedNews = normalized && newsList
    ? newsList
        .filter(
          (n) =>
            n.title.toLowerCase().includes(normalized) ||
            n.summary.toLowerCase().includes(normalized) ||
            n.sourceName.toLowerCase().includes(normalized)
        )
        .slice(0, 3)
    : [];

  const hasResults =
    matchedArticles.length > 0 ||
    matchedGlossary.length > 0 ||
    matchedCalculators.length > 0 ||
    matchedNews.length > 0;

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          aria-label="Pencarian materi pajak, kalkulator, dan istilah"
          className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-300 rounded-lg shadow-xs text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-1"
            aria-label="Bersihkan pencarian"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown Suggestions */}
      {isOpen && query.trim().length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto divide-y divide-slate-100">
          {!hasResults ? (
            <div className="p-4 text-center text-sm text-slate-500">
              Tidak ditemukan hasil untuk "{query}". Coba cari kata kunci seperti <em>"PPh 21"</em>, <em>"UMKM"</em>, <em>"PTKP"</em>, atau <em>"PPN"</em>.
            </div>
          ) : (
            <>
              {/* Calculators section */}
              {matchedCalculators.length > 0 && (
                <div className="p-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Kalkulator & Alat Hitung
                  </div>
                  {matchedCalculators.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCalculator(c.id);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-left rounded-md hover:bg-slate-50 text-sm text-slate-800 transition"
                    >
                      <span className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-teal-700 shrink-0" />
                        <span className="font-medium">{c.title}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}

              {/* Articles section */}
              {matchedArticles.length > 0 && (
                <div className="p-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Panduan & Artikel Terverifikasi
                  </div>
                  {matchedArticles.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => {
                        onSelectArticle(a.slug);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-left rounded-md hover:bg-slate-50 text-sm text-slate-800 transition"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-700 shrink-0" />
                        <span className="font-medium line-clamp-1">{a.title}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}

              {/* News section */}
              {matchedNews.length > 0 && (
                <div className="p-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Warta & Berita Pajak Terkini
                  </div>
                  {matchedNews.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        if (onSelectNews) onSelectNews(n.id);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-left rounded-md hover:bg-slate-50 text-sm text-slate-800 transition"
                    >
                      <span className="flex items-center gap-2">
                        <Radio className="w-4 h-4 text-teal-700 shrink-0" />
                        <span className="font-medium line-clamp-1">{n.title}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}

              {/* Glossary section */}
              {matchedGlossary.length > 0 && (
                <div className="p-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Kamus Istilah Pajak
                  </div>
                  {matchedGlossary.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => {
                        onSelectGlossary(g.slug);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-start justify-between px-3 py-2 text-left rounded-md hover:bg-slate-50 text-sm text-slate-800 transition"
                    >
                      <div>
                        <div className="font-medium text-slate-900 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                          {g.term}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {g.plainDefinition}
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-1" />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
