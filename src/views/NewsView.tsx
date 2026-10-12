import React, { useState, useMemo } from 'react';
import {
  ExternalNewsItem,
  NewsSource,
  NewsCategory,
  VerificationStatus,
  AdSenseSettings,
} from '../types';
import {
  Search,
  ExternalLink,
  ShieldCheck,
  Clock,
  Filter,
  RefreshCw,
  Building2,
  FileCheck2,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Globe,
  Radio,
  Calendar,
} from 'lucide-react';
import { SEOMeta } from '../components/SEOMeta';
import { AdSlot } from '../components/AdSlot';

interface NewsViewProps {
  newsList: ExternalNewsItem[];
  sources: NewsSource[];
  adSettings: AdSenseSettings;
  isSyncing: boolean;
  lastSyncTime?: string;
  onManualSync: () => void;
  onOpenArticleDetail?: (slug: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({
  newsList,
  sources,
  adSettings,
  isSyncing,
  lastSyncTime,
  onManualSync,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedVerification, setSelectedVerification] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter categories metadata
  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Semua Berita' },
    { id: 'coretax', label: 'Coretax DJP' },
    { id: 'regulasi', label: 'Regulasi & Hukum' },
    { id: 'pajak-umkm', label: 'Pajak UMKM' },
    { id: 'pph-ppn', label: 'PPh & PPN' },
    { id: 'fiskal', label: 'Kebijakan Fiskal' },
    { id: 'pengumuman', label: 'Pengumuman Resmi' },
  ];

  // Filtered and sorted news list
  const filteredNews = useMemo(() => {
    return newsList
      .filter((item) => {
        // Exclude archived
        if (item.editorialStatus === 'archived') return false;

        const matchesQuery =
          !searchQuery ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.sourceName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategory === 'all' || item.category === selectedCategory;

        const matchesSource =
          selectedSource === 'all' || item.sourceId === selectedSource;

        const matchesVerification =
          selectedVerification === 'all' ||
          item.verificationStatus === selectedVerification;

        return matchesQuery && matchesCategory && matchesSource && matchesVerification;
      })
      .sort((a, b) => {
        const timeA = new Date(a.publishedAt).getTime();
        const timeB = new Date(b.publishedAt).getTime();
        return sortOrder === 'latest' ? timeB - timeA : timeA - timeB;
      });
  }, [newsList, searchQuery, selectedCategory, selectedSource, selectedVerification, sortOrder]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Featured lead news (top editorially verified item)
  const leadNews = filteredNews[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      <SEOMeta
        title="Berita & Update Pajak Indonesia Terkini — DJP, Coretax & Kebijakan Fiskal"
        description="Portal agregasi berita resmi perpajakan, siaran pers DJP, pembaruan sistem Coretax, dan kebijakan fiskal Indonesia yang terverifikasi."
      />

      {/* Header & Live Sync Status Banner */}
      <div className="space-y-4 border-b border-slate-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
            <Radio className="w-4 h-4 text-teal-700 animate-pulse" />
            <span>Pusat Berita & Agregasi Regulasi Resmi Terverifikasi</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            {lastSyncTime && (
              <span className="hidden sm:inline">
                Pembaruan Terakhir: {new Date(lastSyncTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
              </span>
            )}
            <button
              onClick={onManualSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-teal-700' : ''}`} />
              {isSyncing ? 'Menyinkronkan Feed...' : 'Perbarui Feed'}
            </button>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-slate-950">
          Berita & Update Pajak Indonesia
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Informasi aktual seputar implementasi Coretax DJP, PPh, PPN, insentif UMKM, dan siaran pers resmi pemerintah dengan kurasi transparan dan rujukan sumber primer.
        </p>
      </div>

      {/* Source Transparency Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-2 font-medium text-slate-900">
          <Globe className="w-4 h-4 text-teal-700" />
          <span>Status Sumber Terhubung:</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {sources.map((s) => (
            <div key={s.id} className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  s.lastFetchStatus === 'success'
                    ? 'bg-emerald-500'
                    : s.lastFetchStatus === 'manual_only'
                    ? 'bg-blue-500'
                    : 'bg-rose-500'
                }`}
              />
              <span className="font-semibold text-slate-800">{s.name}</span>
              <span className="text-[11px] text-slate-500">
                ({s.sourceType === 'pemerintah' ? 'Resmi Pemerintah' : 'Media Terverifikasi'})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Multi-Filter Controls */}
      <div className="space-y-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari topik berita (contoh: Coretax, UMKM 500 juta, PPh 21 TER, Faktur Pajak)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCategory(c.id);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Secondary dropdown filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Sumber */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Sumber:</span>
              <select
                value={selectedSource}
                onChange={(e) => {
                  setSelectedSource(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2 py-1 bg-slate-50 border border-slate-300 rounded text-slate-800 focus:bg-white"
              >
                <option value="all">Semua Penerbit</option>
                {sources.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Status Verifikasi Regulasi */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Status Verifikasi:</span>
              <select
                value={selectedVerification}
                onChange={(e) => {
                  setSelectedVerification(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2 py-1 bg-slate-50 border border-slate-300 rounded text-slate-800 focus:bg-white"
              >
                <option value="all">Semua Status</option>
                <option value="terverifikasi">Terverifikasi Dewan Redaksi</option>
                <option value="menunggu_pemeriksaan">Menunggu Pemeriksaan</option>
                <option value="perlu_review">Perlu Konfirmasi Aturan</option>
              </select>
            </div>
          </div>

          {/* Sort order toggle */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Urutkan:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="px-2 py-1 bg-slate-50 border border-slate-300 rounded text-slate-800 focus:bg-white"
            >
              <option value="latest">Tanggal Terbaru</option>
              <option value="oldest">Tanggal Terlama</option>
            </select>
          </div>
        </div>
      </div>

      {/* AdSense Top Placement */}
      {filteredNews.length > 0 && (
        <AdSlot slotId="slot-news-top" format="banner" settings={adSettings} />
      )}

      {/* News Items Grid */}
      {filteredNews.length === 0 ? (
        <div className="p-12 text-center text-sm text-slate-500 border border-dashed border-slate-300 rounded-xl space-y-3">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="font-medium text-slate-700">
            Tidak ditemukan berita atau siaran pers yang sesuai dengan filter.
          </p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Coba bersihkan kata kunci pencarian atau ganti pilihan kategori untuk melihat seluruh pembaruan pajak.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedNews.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-xs transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Metadata Row: Zero-Pill Unboxed Text with Separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-900">{item.sourceName}</span>
                    <span>·</span>
                    <span>{item.publishedAt}</span>
                    <span>·</span>
                    <span className="capitalize">{item.category.replace('-', ' ').toUpperCase()}</span>
                  </div>

                  {/* Verification Status Badge & External Indicator */}
                  <div className="flex items-center gap-2">
                    {item.verificationStatus === 'terverifikasi' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Terverifikasi Ahli Pajak
                      </span>
                    ) : item.verificationStatus === 'menunggu_pemeriksaan' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Menunggu Telaah Editor
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        <AlertCircle className="w-3 h-3 text-rose-600" />
                        Perlu Konfirmasi Aturan
                      </span>
                    )}

                    {item.isExternal && (
                      <span className="text-[11px] text-slate-500">
                        · Sumber Eksternal
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug hover:text-teal-800 transition">
                    <a
                      href={item.originalUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:underline flex items-start justify-between gap-2"
                    >
                      <span>{item.title}</span>
                      <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                    </a>
                  </h2>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4">
                    {item.summary}
                  </p>

                  {/* Editor verification note if available */}
                  {item.editorNotes && (
                    <div className="p-2.5 bg-slate-50 border border-slate-100 rounded text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-800">Catatan Redaksi: </span>
                      {item.editorNotes}
                    </div>
                  )}
                </div>

                {/* Bottom Footer: External Link */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    Diambil: {new Date(item.fetchedAt).toLocaleDateString('id-ID')}
                  </span>

                  <a
                    href={item.originalUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-semibold text-teal-800 hover:text-teal-950 inline-flex items-center gap-1 transition"
                  >
                    Baca Sumber Asli
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-slate-300 rounded-md disabled:opacity-40 hover:bg-slate-50"
              >
                Halaman Sebelumnya
              </button>
              <span className="text-slate-600">
                Halaman {currentPage} dari {totalPages} ({filteredNews.length} Berita)
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-slate-300 rounded-md disabled:opacity-40 hover:bg-slate-50"
              >
                Halaman Selanjutnya
              </button>
            </div>
          )}
        </div>
      )}

      {/* Editorial Disclaimer on External News Aggregation */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-600 leading-relaxed space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-900 font-serif text-sm">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          Kebijakan Hak Cipta & Standar Agregasi Berita PajakPedia
        </div>
        <p>
          Fitur Berita & Update Pajak mengagregasi tajuk dan ringkasan warta dari situs resmi otoritas pemerintah (Direktorat Jenderal Pajak, Kementerian Keuangan, BPK RI) serta lembaga kantor berita terdaftar. Seluruh hak cipta, merek dagang, dan isi naskah utuh tetap sepenuhnya merupakan milik penerbit asli.
        </p>
        <p>
          PajakPedia tidak menyalin teks lengkap tanpa hak dan senantiasa menyediakan tautan langsung "Baca Sumber Asli" ke portal penerbit masing-masing.
        </p>
      </div>
    </div>
  );
};
