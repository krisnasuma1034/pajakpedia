import React, { useState } from 'react';
import { Article, TaxCategory } from '../types';
import { TAX_CATEGORIES } from '../data/categories';
import { Search, ArrowRight, ShieldCheck, Clock, BookOpen } from 'lucide-react';
import { AdSlot } from '../components/AdSlot';

interface ArticleListViewProps {
  articles: Article[];
  selectedCategory?: string;
  onSelectArticle: (slug: string) => void;
  onNavigateCategory?: (category: string) => void;
}

export const ArticleListView: React.FC<ArticleListViewProps> = ({
  articles,
  selectedCategory,
  onSelectArticle,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>(selectedCategory || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const published = articles.filter((a) => a.status === 'published');

  const filtered = published.filter((art) => {
    const matchesCategory = filterCategory === 'all' || art.category === filterCategory;
    const matchesQuery =
      !searchQuery ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="text-xs text-slate-500 font-medium">
          Koleksi Edukasi & Rujukan Fiskal
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-950">
          Panduan Perpajakan Indonesia
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Seluruh artikel panduan ditulis berdasarkan Undang-Undang dan Peraturan Pemerintah resmi, dilengkapi studi kasus nyata, rujukan pasal hukum, dan penelaahan praktisi terdaftar.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Category Filter Pills (Functional Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition ${
              filterCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua Topik ({published.length})
          </button>
          {TAX_CATEGORIES.map((c) => {
            const count = published.filter((a) => a.category === c.id).length;
            if (count === 0) return null;
            return (
              <button
                key={c.id}
                onClick={() => setFilterCategory(c.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition ${
                  filterCategory === c.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Search inside articles */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Saring judul panduan..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center text-sm text-slate-500 border border-dashed border-slate-300 rounded-xl">
          Tidak ditemukan panduan yang sesuai dengan kriteria filter saat ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((art) => (
            <article
              key={art.id}
              onClick={() => onSelectArticle(art.slug)}
              className="cursor-pointer group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-400 hover:shadow-xs transition flex flex-col justify-between"
            >
              <div>
                <div className="aspect-16/10 bg-slate-100 overflow-hidden">
                  <img
                    src={art.coverImage}
                    alt={art.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                  />
                </div>
                <div className="p-5 space-y-3">
                  {/* Zero-Pill Unboxed Metadata */}
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-800">
                      {TAX_CATEGORIES.find((c) => c.id === art.category)?.name || art.category}
                    </span>
                    <span>·</span>
                    <span>{art.readingTimeMinutes} mnt baca</span>
                  </div>

                  <h2 className="font-serif font-bold text-base text-slate-900 group-hover:text-teal-800 transition line-clamp-2 leading-snug">
                    {art.title}
                  </h2>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-mono truncate max-w-[170px]">
                    {art.applicablePeriod}
                  </span>
                  <span className="font-semibold text-slate-900 inline-flex items-center gap-1 group-hover:text-teal-700">
                    Baca
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
