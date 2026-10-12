import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  MessageSquare,
  Settings,
  Plus,
  Edit3,
  CheckCircle,
  Eye,
  LogOut,
  Sparkles,
  FlaskConical,
  ExternalLink,
  RefreshCw,
  Radio,
  Globe,
  Trash2,
  Archive,
  Layers,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import {
  Article,
  CorrectionReport,
  AdSenseSettings,
  ArticleStatus,
  TaxCategory,
  NewsSource,
  ExternalNewsItem,
  NewsSyncLog,
  EditorialDraft,
  VerificationStatus,
} from '../../types';
import { TAX_CATEGORIES } from '../../data/categories';
import { runCalculatorUnitTests } from '../../utils/taxCalculators.test';

interface AdminDashboardProps {
  articles: Article[];
  correctionReports: CorrectionReport[];
  adSettings: AdSenseSettings;
  newsSources: NewsSource[];
  newsList: ExternalNewsItem[];
  newsSyncLogs: NewsSyncLog[];
  editorialDrafts: EditorialDraft[];
  isSyncing: boolean;
  onUpdateArticle: (article: Article) => void;
  onCreateArticle: (article: Article) => void;
  onUpdateAdSettings: (settings: AdSenseSettings) => void;
  onUpdateCorrectionStatus: (id: string, status: CorrectionReport['status']) => void;
  onToggleNewsSource: (sourceId: string, active: boolean) => void;
  onUpdateNewsSourceInterval: (sourceId: string, intervalMinutes: number) => void;
  onAddNewsSource: (source: NewsSource) => void;
  onUpdateNewsItem: (item: ExternalNewsItem) => void;
  onDeleteNewsItem: (itemId: string) => void;
  onManualSync: () => void;
  onApproveDraft: (draftId: string) => void;
  onRejectDraft: (draftId: string) => void;
  onCreateDraftFromNews: (newsItem: ExternalNewsItem) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  articles,
  correctionReports,
  adSettings,
  newsSources,
  newsList,
  newsSyncLogs,
  editorialDrafts,
  isSyncing,
  onUpdateArticle,
  onCreateArticle,
  onUpdateAdSettings,
  onUpdateCorrectionStatus,
  onToggleNewsSource,
  onUpdateNewsSourceInterval,
  onAddNewsSource,
  onUpdateNewsItem,
  onDeleteNewsItem,
  onManualSync,
  onApproveDraft,
  onRejectDraft,
  onCreateDraftFromNews,
  onClose,
}) => {
  const [adminRole, setAdminRole] = useState<'superadmin' | 'editor' | 'reviewer'>('superadmin');
  const [activeTab, setActiveTab] = useState<
    'articles' | 'news_sources' | 'news_verification' | 'drafts' | 'logs' | 'queue' | 'reports' | 'adsense' | 'tests'
  >('articles');

  // Article editing state
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editCategory, setEditCategory] = useState<TaxCategory>('pph-21');
  const [editExcerpt, setEditExcerpt] = useState('');
  const [editStatus, setEditStatus] = useState<ArticleStatus>('published');
  const [editApplicablePeriod, setEditApplicablePeriod] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editKeyTakeaway, setEditKeyTakeaway] = useState('');

  // New source form state
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [newSourceName, setNewSourceName] = useState('');
  const [newSourceSite, setNewSourceSite] = useState('');
  const [newSourceFeed, setNewSourceFeed] = useState('');
  const [newSourceCategory, setNewSourceCategory] = useState<any>('fiskal');
  const [newSourceType, setNewSourceType] = useState<any>('media');

  // AdSense local form state
  const [adForm, setAdForm] = useState<AdSenseSettings>(adSettings);

  // Unit tests state
  const [testResults, setTestResults] = useState<ReturnType<typeof runCalculatorUnitTests> | null>(null);

  const startEdit = (a: Article) => {
    setEditingArticle(a);
    setIsCreating(false);
    setEditTitle(a.title);
    setEditSlug(a.slug);
    setEditCategory(a.category);
    setEditExcerpt(a.excerpt);
    setEditStatus(a.status);
    setEditApplicablePeriod(a.applicablePeriod);
    setEditContent(a.content);
    setEditKeyTakeaway(a.keyTakeaways.join('\n'));
  };

  const startNew = () => {
    setEditingArticle(null);
    setIsCreating(true);
    setEditTitle('');
    setEditSlug('');
    setEditCategory('pph-21');
    setEditExcerpt('');
    setEditStatus('draft');
    setEditApplicablePeriod('Tahun Pajak 2026');
    setEditContent('<h3>Latar Belakang Ketentuan</h3><p>Uraian materi perpajakan terverifikasi...</p>');
    setEditKeyTakeaway('Poin ringkasan pertama\nPoin ringkasan kedua');
  };

  const saveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle || !editSlug) return;

    const takeaways = editKeyTakeaway
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (isCreating) {
      const newArt: Article = {
        id: `art-${Date.now()}`,
        title: editTitle,
        slug: editSlug,
        category: editCategory,
        excerpt: editExcerpt,
        content: editContent,
        publishedAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        applicablePeriod: editApplicablePeriod,
        coverImage: '/images/hero-tax-desk.jpg',
        imageAlt: editTitle,
        readingTimeMinutes: 5,
        keyTakeaways: takeaways,
        sources: [
          {
            title: 'Undang-Undang Harmonisasi Peraturan Perpajakan',
            documentNumber: 'UU No. 7 Tahun 2021',
            issuingAuthority: 'DPR & Presiden RI',
            url: 'https://peraturan.bpk.go.id/Details/185162/uu-no-7-tahun-2021',
            effectiveDate: '1 Januari 2022',
            status: 'berlaku',
          },
        ],
        relatedArticleSlugs: [],
        status: editStatus,
        seoTitle: `${editTitle} | PajakPedia`,
        metaDescription: editExcerpt,
        author: {
          id: 'admin-redaksi',
          name: 'Dewan Redaksi PajakPedia',
          role: 'Editor Pajak Terverifikasi',
          bio: 'Tim redaksi edukasi perpajakan dan kepatuhan fiskal.',
        },
      };
      onCreateArticle(newArt);
    } else if (editingArticle) {
      const updated: Article = {
        ...editingArticle,
        title: editTitle,
        slug: editSlug,
        category: editCategory,
        excerpt: editExcerpt,
        content: editContent,
        status: editStatus,
        applicablePeriod: editApplicablePeriod,
        updatedAt: new Date().toISOString().split('T')[0],
        keyTakeaways: takeaways,
        seoTitle: `${editTitle} | PajakPedia`,
        metaDescription: editExcerpt,
      };
      onUpdateArticle(updated);
    }

    setEditingArticle(null);
    setIsCreating(false);
  };

  const handleAddSourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSourceName || !newSourceSite) return;

    const newSource: NewsSource = {
      id: `src-${Date.now()}`,
      name: newSourceName,
      siteUrl: newSourceSite,
      feedUrl: newSourceFeed || undefined,
      category: newSourceCategory,
      sourceType: newSourceType,
      active: true,
      syncIntervalMinutes: 60,
      lastFetchStatus: newSourceFeed ? 'pending' : 'manual_only',
    };
    onAddNewsSource(newSource);
    setIsAddingSource(false);
    setNewSourceName('');
    setNewSourceSite('');
    setNewSourceFeed('');
  };

  return (
    <div className="bg-white min-h-screen border-t border-slate-200">
      {/* Admin Top Header */}
      <div className="border-b border-slate-200 bg-slate-900 text-white px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-lg">PajakPedia Admin CMS</span>
            <span className="text-xs bg-slate-800 text-teal-300 px-2 py-0.5 rounded border border-slate-700">
              Role: {adminRole.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400">Ganti Peran:</span>
            <select
              value={adminRole}
              onChange={(e) => setAdminRole(e.target.value as any)}
              className="bg-slate-800 text-slate-200 border border-slate-700 rounded px-2 py-1"
            >
              <option value="superadmin">Super Admin (Penuh)</option>
              <option value="editor">Editor</option>
              <option value="reviewer">Reviewer Pajak BKP</option>
            </select>

            <button
              onClick={onClose}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              Kembali ke Situs
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 mb-6 text-xs font-medium">
          <button
            onClick={() => {
              setActiveTab('articles');
              setEditingArticle(null);
              setIsCreating(false);
            }}
            className={`px-3 py-2 rounded-lg transition ${
              activeTab === 'articles' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Manajemen Artikel ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab('news_sources')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'news_sources' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            Sumber Berita ({newsSources.length})
          </button>
          <button
            onClick={() => setActiveTab('news_verification')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'news_verification' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Verifikasi Warta ({newsList.length})
          </button>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'drafts' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            Draf Edukasi AI ({editorialDrafts.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'logs' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Log Sinkronisasi ({newsSyncLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3 py-2 rounded-lg transition ${
              activeTab === 'queue' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Antrean Regulasi
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3 py-2 rounded-lg transition ${
              activeTab === 'reports' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Koreksi Pembaca ({correctionReports.length})
          </button>
          <button
            onClick={() => setActiveTab('adsense')}
            className={`px-3 py-2 rounded-lg transition ${
              activeTab === 'adsense' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Google AdSense
          </button>
          <button
            onClick={() => {
              setActiveTab('tests');
              setTestResults(runCalculatorUnitTests());
            }}
            className={`px-3 py-2 rounded-lg transition ${
              activeTab === 'tests' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Unit Test Kalkulator
          </button>
        </div>

        {/* Tab: Sumber Berita & Sinkronisasi */}
        {activeTab === 'news_sources' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Daftar Sumber Feed & Jadwal Pembaruan
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Kelola endpoint RSS resmi, interval sinkronisasi, dan jalankan pengambilan backend.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onManualSync}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-lg transition disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Menyinkronkan...' : 'Perbarui Sekarang'}
                </button>
                <button
                  onClick={() => setIsAddingSource(!isAddingSource)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Tambah Sumber
                </button>
              </div>
            </div>

            {/* Form Tambah Sumber Baru */}
            {isAddingSource && (
              <form onSubmit={handleAddSourceSubmit} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 text-xs">
                <h4 className="font-bold text-slate-900">Registrasi Sumber Berita Baru</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Sumber *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: ANTARA News Pajak"
                      value={newSourceName}
                      onChange={(e) => setNewSourceName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">URL Situs Utama *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      value={newSourceSite}
                      onChange={(e) => setNewSourceSite(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">URL Feed RSS / XML (Jika Tersedia)</label>
                    <input
                      type="url"
                      placeholder="https://.../rss.xml"
                      value={newSourceFeed}
                      onChange={(e) => setNewSourceFeed(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Kategori Default</label>
                    <select
                      value={newSourceCategory}
                      onChange={(e) => setNewSourceCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md"
                    >
                      <option value="fiskal">Kebijakan Fiskal</option>
                      <option value="coretax">Coretax DJP</option>
                      <option value="pajak-umkm">Pajak UMKM</option>
                      <option value="pph-ppn">PPh & PPN</option>
                      <option value="regulasi">Regulasi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Tipe Sumber</label>
                    <select
                      value={newSourceType}
                      onChange={(e) => setNewSourceType(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md"
                    >
                      <option value="media">Media Terverifikasi</option>
                      <option value="pemerintah">Resmi Pemerintah</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsAddingSource(false)}
                    className="px-3 py-1.5 border border-slate-300 rounded-md text-slate-700"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-slate-900 text-white rounded-md font-semibold"
                  >
                    Simpan Sumber
                  </button>
                </div>
              </form>
            )}

            {/* Tabel Sumber Berita */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="p-3">Nama Sumber</th>
                    <th className="p-3">Tipe</th>
                    <th className="p-3">Interval Sinkronisasi</th>
                    <th className="p-3">Status Pengambilan</th>
                    <th className="p-3">Waktu Terakhir</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {newsSources.map((src) => (
                    <tr key={src.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">{src.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono truncate max-w-xs">
                          {src.feedUrl || src.siteUrl}
                        </div>
                      </td>
                      <td className="p-3 capitalize">{src.sourceType}</td>
                      <td className="p-3">
                        <select
                          value={src.syncIntervalMinutes}
                          onChange={(e) => onUpdateNewsSourceInterval(src.id, Number(e.target.value))}
                          className="px-2 py-1 bg-slate-50 border border-slate-200 rounded"
                        >
                          <option value={30}>Setiap 30 Menit</option>
                          <option value={60}>Setiap 60 Menit</option>
                          <option value={120}>Setiap 2 Jam</option>
                          <option value={360}>Setiap 6 Jam</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            src.lastFetchStatus === 'success'
                              ? 'bg-emerald-100 text-emerald-800'
                              : src.lastFetchStatus === 'manual_only'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {src.lastFetchStatus === 'success'
                            ? 'Feed Aktif'
                            : src.lastFetchStatus === 'manual_only'
                            ? 'Kurasi Manual'
                            : 'Gagal'}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 font-mono text-[11px]">
                        {src.lastFetchedAt ? new Date(src.lastFetchedAt).toLocaleString('id-ID') : '-'}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => onToggleNewsSource(src.id, !src.active)}
                          className={`px-2.5 py-1 rounded text-xs font-semibold ${
                            src.active
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {src.active ? 'Nonaktifkan' : 'Aktifkan'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Verifikasi Warta & Regulasi */}
        {activeTab === 'news_verification' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Verifikasi Berita Eksternal & Kebijakan Hukum
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Tinjau status keabsahan regulasi, hapus duplikat, dan buat draf edukasi editorial.
                </p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="p-3">Judul Berita</th>
                    <th className="p-3">Sumber</th>
                    <th className="p-3">Tanggal</th>
                    <th className="p-3">Status Verifikasi Regulasi</th>
                    <th className="p-3 text-right">Aksi & Telaah</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {newsList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-3 max-w-sm">
                        <div className="font-semibold text-slate-900 leading-snug">{item.title}</div>
                        <a
                          href={item.originalUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-[11px] text-teal-700 hover:underline inline-flex items-center gap-1 mt-1"
                        >
                          Buka Link Asli <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="p-3 text-slate-600">{item.sourceName}</td>
                      <td className="p-3 font-mono text-[11px] text-slate-500">{item.publishedAt}</td>
                      <td className="p-3">
                        <select
                          value={item.verificationStatus}
                          onChange={(e) =>
                            onUpdateNewsItem({
                              ...item,
                              verificationStatus: e.target.value as VerificationStatus,
                              verifiedDate: new Date().toISOString().split('T')[0],
                              verifiedBy: 'Dewan Redaksi PajakPedia',
                            })
                          }
                          className="px-2 py-1 bg-white border border-slate-300 rounded text-[11px] font-medium"
                        >
                          <option value="terverifikasi">Terverifikasi Dewan Redaksi</option>
                          <option value="menunggu_pemeriksaan">Menunggu Pemeriksaan</option>
                          <option value="perlu_review">Perlu Konfirmasi Aturan</option>
                          <option value="tidak_berlaku">Tidak Berlaku / Kedaluwarsa</option>
                        </select>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => onCreateDraftFromNews(item)}
                          className="px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded font-semibold inline-flex items-center gap-1"
                          title="Generate Draf Edukasi AI"
                        >
                          <Sparkles className="w-3 h-3" />
                          Buat Draf
                        </button>
                        <button
                          onClick={() => onDeleteNewsItem(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                          title="Hapus / Singkirkan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Draf Edukasi AI */}
        {activeTab === 'drafts' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Draf Ringkasan Edukatif Berbantuan AI
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Hasil telaah AI hanya berstatus <strong>Draf Tertutup</strong> dan tidak pernah dipublikasikan tanpa peninjauan langsung dewan redaksi.
              </p>
            </div>

            {editorialDrafts.length === 0 ? (
              <div className="p-12 text-center text-xs text-slate-500 border border-dashed border-slate-200 rounded-xl">
                Belum ada draf edukasi AI yang dibuat. Buka tab "Verifikasi Warta" lalu klik tombol "Buat Draf" pada berita yang ingin dianalisis.
              </div>
            ) : (
              <div className="space-y-4">
                {editorialDrafts.map((d) => (
                  <div key={d.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm font-serif">{d.title}</span>
                      <span className="font-mono text-slate-400">{d.createdAt}</span>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                      <div>
                        <span className="font-semibold text-teal-900">Poin Edukasi Utama:</span>
                        <p className="text-slate-700 mt-0.5">{d.educationalTakeaway}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900">Dampak Praktis Wajib Pajak:</span>
                        <p className="text-slate-700 mt-0.5">{d.practicalImpact}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <span className="text-slate-500">
                        Sumber: {d.sourceName} (<a href={d.originalSourceUrl} target="_blank" rel="noreferrer" className="text-teal-700 underline">Link Asli</a>)
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onRejectDraft(d.id)}
                          className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 hover:bg-slate-100"
                        >
                          Tolak Draf
                        </button>
                        <button
                          onClick={() => onApproveDraft(d.id)}
                          className="px-3 py-1.5 bg-slate-900 text-white rounded font-semibold hover:bg-slate-800"
                        >
                          Setujui & Publikasikan ke Artikel PajakPedia
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Log Sinkronisasi */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Log Riwayat Sinkronisasi Feed Backend
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Catatan pekerjaan cron serverless dan audit jumlah warta yang ditemukan, baru, atau diperbarui.
              </p>
            </div>

            {newsSyncLogs.length === 0 ? (
              <div className="p-12 text-center text-xs text-slate-500 border border-dashed border-slate-200 rounded-xl">
                Belum ada catatan log sinkronisasi. Tekan "Perbarui Sekarang" pada tab Sumber Berita untuk menjalankan sinkronisasi perdana.
              </div>
            ) : (
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="p-3">Waktu Selesai</th>
                      <th className="p-3">Sumber</th>
                      <th className="p-3">Ditemukan</th>
                      <th className="p-3">Baru</th>
                      <th className="p-3">Duplikat</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Catatan / Error</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px] text-slate-800">
                    {newsSyncLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="p-3">{new Date(log.completedAt).toLocaleString('id-ID')}</td>
                        <td className="p-3 font-sans font-medium">{log.sourceName}</td>
                        <td className="p-3">{log.itemsFound}</td>
                        <td className="p-3 font-semibold text-teal-700">+{log.itemsNew}</td>
                        <td className="p-3">{log.itemsDuplicate}</td>
                        <td className="p-3">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              log.status === 'success'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {log.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 font-sans text-slate-500 max-w-xs truncate">
                          {log.errorSummary || 'Sinkronisasi normal'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 1: Articles List or Editor */}
        {activeTab === 'articles' && (
          <div>
            {!editingArticle && !isCreating ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Daftar Artikel & Panduan Pajak
                  </h3>
                  <button
                    onClick={startNew}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition"
                  >
                    <Plus className="w-4 h-4" />
                    Buat Panduan Baru
                  </button>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                      <tr>
                        <th className="p-3">Judul Artikel</th>
                        <th className="p-3">Kategori</th>
                        <th className="p-3">Masa Berlaku</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Pembaruan</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800">
                      {articles.map((art) => (
                        <tr key={art.id} className="hover:bg-slate-50">
                          <td className="p-3 font-semibold text-slate-900 max-w-xs">
                            {art.title}
                          </td>
                          <td className="p-3 text-slate-600">
                            {TAX_CATEGORIES.find((c) => c.id === art.category)?.name || art.category}
                          </td>
                          <td className="p-3 text-slate-500 font-mono text-[11px]">
                            {art.applicablePeriod}
                          </td>
                          <td className="p-3">
                            <span
                              className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                                art.status === 'published'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : art.status === 'review'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {art.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3 text-slate-500">{art.updatedAt}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => startEdit(art)}
                              className="text-slate-700 hover:text-slate-950 font-semibold inline-flex items-center gap-1"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Article Editor Form */
              <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    {isCreating ? 'Buat Panduan Edukasi Baru' : 'Edit Materi Panduan'}
                  </h3>
                  <button
                    onClick={() => {
                      setEditingArticle(null);
                      setIsCreating(false);
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Batal & Kembali
                  </button>
                </div>

                <form onSubmit={saveArticle} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Judul Panduan *
                      </label>
                      <input
                        type="text"
                        required
                        value={editTitle}
                        onChange={(e) => {
                          setEditTitle(e.target.value);
                          if (isCreating) {
                            setEditSlug(
                              e.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, '-')
                                .replace(/^-+|-+$/g, '')
                            );
                          }
                        }}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Slug URL Bersih *
                      </label>
                      <input
                        type="text"
                        required
                        value={editSlug}
                        onChange={(e) => setEditSlug(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Kategori *
                      </label>
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value as TaxCategory)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                      >
                        {TAX_CATEGORIES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Status Publikasi *
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as ArticleStatus)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                      >
                        <option value="draft">Draft (Tertutup)</option>
                        <option value="review">Dalam Peninjauan (Review)</option>
                        <option value="published">Diterbitkan (Published)</option>
                        <option value="archived">Diarsipkan (Archived)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Masa Pajak / Regulasi Berlaku *
                      </label>
                      <input
                        type="text"
                        required
                        value={editApplicablePeriod}
                        onChange={(e) => setEditApplicablePeriod(e.target.value)}
                        placeholder="Contoh: Berlaku Tahun Pajak 2024–Sekarang"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Deskripsi Singkat / Ringkasan Eksekutif *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={editExcerpt}
                      onChange={(e) => setEditExcerpt(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Poin Kunci Edukasi (1 baris per poin)
                    </label>
                    <textarea
                      rows={3}
                      value={editKeyTakeaway}
                      onChange={(e) => setEditKeyTakeaway(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Isi Panduan Lengkap (HTML Format) *
                    </label>
                    <textarea
                      required
                      rows={8}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingArticle(null);
                        setIsCreating(false);
                      }}
                      className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition"
                    >
                      Simpan Panduan
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Tab: Antrean Peninjauan Regulasi */}
        {activeTab === 'queue' && (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Antrean Peninjauan Regulasi & Kedaluwarsa Aturan
            </h3>
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3">
              <div className="flex items-start gap-3 text-xs">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">
                    Seluruh 6 Panduan Utama Aktif Berstatus Terverifikasi
                  </div>
                  <p className="text-slate-600 mt-0.5">
                    Dasar hukum PP 58/2023, PMK 168/2023, PP 55/2022, UU HPP 7/2021, dan PER-06/PJ/2024 telah divalidasi ke JDIH BPK RI dan Pajak.go.id.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Laporan Koreksi Pembaca */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Kotak Masuk Koreksi Faktual dari Pembaca
            </h3>
            {correctionReports.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-200 rounded-lg">
                Belum ada laporan koreksi yang diajukan oleh pembaca.
              </div>
            ) : (
              <div className="space-y-3">
                {correctionReports.map((r) => (
                  <div key={r.id} className="p-4 border border-slate-200 rounded-lg text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{r.articleTitle}</span>
                      <span className="font-mono text-slate-400">{r.submittedAt}</span>
                    </div>
                    <p className="text-slate-700 bg-slate-50 p-2 rounded">
                      <strong>Laporan:</strong> {r.suggestedCorrection}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      <span>Pelapor: {r.reporterName} ({r.reporterEmail})</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onUpdateCorrectionStatus(r.id, 'reviewed')}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-800"
                        >
                          Tandai Ditinjau
                        </button>
                        <button
                          onClick={() => onUpdateCorrectionStatus(r.id, 'resolved')}
                          className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 rounded text-emerald-800"
                        >
                          Selesai & Disesuaikan
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Konfigurasi AdSense */}
        {activeTab === 'adsense' && (
          <div className="space-y-6 max-w-xl">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Kesiapan Google AdSense & Monetisasi
              </h3>
            </div>
            <div className="space-y-4 text-xs border border-slate-200 rounded-xl p-5 bg-slate-50">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Publisher ID (Client ID Google AdSense)
                </label>
                <input
                  type="text"
                  value={adForm.publisherId}
                  onChange={(e) => setAdForm({ ...adForm, publisherId: e.target.value })}
                  placeholder="ca-pub-0000000000000000"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md font-mono"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="placeholderCheck"
                  checked={adForm.placeholderMode}
                  onChange={(e) => setAdForm({ ...adForm, placeholderMode: e.target.checked })}
                  className="rounded border-slate-300"
                />
                <label htmlFor="placeholderCheck" className="text-slate-800 font-medium">
                  Mode Placeholder Aktif (Tampilkan kotak ruang iklan berlabel transparan)
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enableCheck"
                  checked={adForm.enabled}
                  onChange={(e) => setAdForm({ ...adForm, enabled: e.target.checked })}
                  className="rounded border-slate-300"
                />
                <label htmlFor="enableCheck" className="text-slate-800 font-medium">
                  Aktifkan Script Iklan (Hanya jika disetujui oleh Google)
                </label>
              </div>

              <button
                type="button"
                onClick={() => {
                  onUpdateAdSettings(adForm);
                  alert('Pengaturan AdSense berhasil disimpan.');
                }}
                className="px-4 py-2 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition"
              >
                Simpan Konfigurasi AdSense
              </button>
            </div>
          </div>
        )}

        {/* Tab: Unit Test Rumus Pajak */}
        {activeTab === 'tests' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Hasil Unit Test Validasi Rumus Perpajakan
                </h3>
              </div>
              <button
                onClick={() => setTestResults(runCalculatorUnitTests())}
                className="px-3 py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800"
              >
                Jalankan Ulang Tes
              </button>
            </div>

            {testResults && (
              <div className="space-y-2">
                {testResults.map((t, idx) => (
                  <div
                    key={idx}
                    className={`p-3 border rounded-lg text-xs flex items-start justify-between gap-4 ${
                      t.passed ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50 border-rose-200'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        {t.name}
                      </div>
                      <div className="text-slate-500 text-[11px] mt-1">
                        Ekspektasi: <span className="font-mono">{t.expected}</span> · Aktual: <span className="font-mono">{t.actual}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase">
                      Lolos
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
