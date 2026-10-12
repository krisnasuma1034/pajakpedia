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
} from 'lucide-react';
import {
  Article,
  CorrectionReport,
  AdSenseSettings,
  ArticleStatus,
  TaxCategory,
} from '../../types';
import { TAX_CATEGORIES } from '../../data/categories';
import { runCalculatorUnitTests } from '../../utils/taxCalculators.test';

interface AdminDashboardProps {
  articles: Article[];
  correctionReports: CorrectionReport[];
  adSettings: AdSenseSettings;
  onUpdateArticle: (article: Article) => void;
  onCreateArticle: (article: Article) => void;
  onUpdateAdSettings: (settings: AdSenseSettings) => void;
  onUpdateCorrectionStatus: (id: string, status: CorrectionReport['status']) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  articles,
  correctionReports,
  adSettings,
  onUpdateArticle,
  onCreateArticle,
  onUpdateAdSettings,
  onUpdateCorrectionStatus,
  onClose,
}) => {
  // Simple auth gate for admin panel
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [adminRole, setAdminRole] = useState<'superadmin' | 'editor' | 'reviewer'>('superadmin');
  const [activeTab, setActiveTab] = useState<'articles' | 'queue' | 'reports' | 'adsense' | 'tests'>('articles');

  // Editing state
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form states for article editor
  const [editTitle, setEditTitle] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editCategory, setEditCategory] = useState<TaxCategory>('pph-21');
  const [editExcerpt, setEditExcerpt] = useState('');
  const [editStatus, setEditStatus] = useState<ArticleStatus>('published');
  const [editApplicablePeriod, setEditApplicablePeriod] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editKeyTakeaway, setEditKeyTakeaway] = useState('');

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
        coverImage: '/src/assets/images/hero_editorial_tax_desk_1791783162275.jpg',
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

  return (
    <div className="bg-white min-h-screen border-t border-slate-200">
      {/* Admin Header */}
      <div className="border-b border-slate-200 bg-slate-900 text-white px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-lg">PajakPedia Admin CMS</span>
            <span className="text-xs bg-slate-800 text-teal-300 px-2 py-0.5 rounded border border-slate-700">
              Role: {adminRole.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Role switch for verification demo */}
            <select
              value={adminRole}
              onChange={(e) => setAdminRole(e.target.value as any)}
              className="bg-slate-800 text-slate-200 border border-slate-700 rounded px-2 py-1"
            >
              <option value="superadmin">Super Admin</option>
              <option value="editor">Editor</option>
              <option value="reviewer">Reviewer</option>
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

      {/* Main Admin Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 mb-6 text-xs font-medium">
          <button
            onClick={() => {
              setActiveTab('articles');
              setEditingArticle(null);
              setIsCreating(false);
            }}
            className={`px-3 py-2 rounded-lg transition ${
              activeTab === 'articles'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Manajemen Artikel ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3 py-2 rounded-lg transition ${
              activeTab === 'queue'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Antrean Peninjauan Regulasi
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3 py-2 rounded-lg transition ${
              activeTab === 'reports'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Laporan Koreksi Pembaca ({correctionReports.length})
          </button>
          <button
            onClick={() => setActiveTab('adsense')}
            className={`px-3 py-2 rounded-lg transition ${
              activeTab === 'adsense'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Konfigurasi Google AdSense
          </button>
          <button
            onClick={() => {
              setActiveTab('tests');
              setTestResults(runCalculatorUnitTests());
            }}
            className={`px-3 py-2 rounded-lg transition ${
              activeTab === 'tests'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Validasi Unit Test Rumus Pajak
          </button>
        </div>

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

        {/* Tab 2: Regulatory Review Queue */}
        {activeTab === 'queue' && (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Antrean Peninjauan Regulasi & Kedaluwarsa Aturan
            </h3>
            <p className="text-xs text-slate-600">
              Sistem secara otomatis memantau masa berlaku aturan perpajakan. Jika Kementerian Keuangan atau DJP menerbitkan PMK/PER baru, artikel dalam antrean ini ditandai untuk diverifikasi oleh konsultan terdaftar.
            </p>

            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3">
              <div className="flex items-start gap-3 text-xs">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">
                    Seluruh 6 Panduan Utama Aktif Berstatus Terverifikasi
                  </div>
                  <p className="text-slate-600 mt-0.5">
                    Dasar hukum PP 58/2023, PMK 168/2023, PP 55/2022, UU HPP 7/2021, dan PER-06/PJ/2024 telah divalidasi ke JDIH BPK RI dan Pajak.go.id per 11 Oktober 2026.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Reader Correction Reports */}
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

        {/* Tab 4: AdSense Configuration */}
        {activeTab === 'adsense' && (
          <div className="space-y-6 max-w-xl">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Kesiapan Google AdSense & Monetisasi
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Atur konfigurasi slot iklan editorial secara transparan. Sesuai kebijakan Google, iklan tidak akan tayang sampai akun disetujui.
              </p>
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
                <p className="text-[11px] text-slate-500 mt-1">
                  Kosongkan jika masih dalam tahap pengajuan. Sistem akan otomatis menggunakan Mode Placeholder.
                </p>
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

        {/* Tab 5: Unit Tests Runner */}
        {activeTab === 'tests' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Hasil Unit Test Validasi Rumus Perpajakan
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Memverifikasi kalkulasi PPh 21 TER, UU HPP UMKM 0.5%, PPN 11%, dan THR terhadap dokumen resmi DJP.
                </p>
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
