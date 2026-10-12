import React, { useState } from 'react';
import { X, Copy, Check, FileCode2, Globe, Shield } from 'lucide-react';
import { Article, GlossaryTerm } from '../types';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  glossary: GlossaryTerm[];
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  articles,
  glossary,
}) => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots' | 'console'>('sitemap');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://pajakpedia.id';

  const publishedArticles = articles.filter((a) => a.status === 'published');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Halaman Utama & Portal -->
  <url>
    <loc>${origin}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${origin}/panduan</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${origin}/berita</loc>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${origin}/kalkulator</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${origin}/kamus</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${origin}/regulasi</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Artikel Panduan Terverifikasi -->
${publishedArticles
  .map(
    (a) => `  <url>
    <loc>${origin}/panduan/${a.slug}</loc>
    <lastmod>${a.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`
  )
  .join('\n')}

  <!-- Istilah Kamus Pajak -->
${glossary
  .map(
    (g) => `  <url>
    <loc>${origin}/kamus/${g.slug}</loc>
    <lastmod>${g.lastReviewedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const robotsTxt = `# PajakPedia robots.txt
User-agent: *
Allow: /
Allow: /panduan/
Allow: /kalkulator/
Allow: /kamus/
Allow: /regulasi/

# Proteksi Area Redaksi & Internal Search Low-Value Pages
Disallow: /admin
Disallow: /admin/*
Disallow: /preview/
Disallow: /search?*

Sitemap: ${origin}/sitemap.xml`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-slate-800" />
            <h3 className="font-bold text-slate-900 font-serif text-lg">
              Arsitektur SEO & Verifikasi Mesin Pencari
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-5 pt-3 border-b border-slate-100 flex gap-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`pb-2.5 transition border-b-2 ${
              activeTab === 'sitemap'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            XML Sitemap ({publishedArticles.length + glossary.length + 5} URLs)
          </button>
          <button
            onClick={() => setActiveTab('robots')}
            className={`pb-2.5 transition border-b-2 ${
              activeTab === 'robots'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            robots.txt
          </button>
          <button
            onClick={() => setActiveTab('console')}
            className={`pb-2.5 transition border-b-2 ${
              activeTab === 'console'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Google Search Console
          </button>
        </div>

        {/* Body content */}
        <div className="p-5 overflow-y-auto flex-1 text-xs">
          {activeTab === 'sitemap' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">
                  Struktur Peta Situs Standar XML Sitemaps Protocol 0.9:
                </span>
                <button
                  onClick={() => copyToClipboard(sitemapXml)}
                  className="flex items-center gap-1 text-xs text-slate-700 hover:text-slate-950 font-medium"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Tersalin' : 'Salin XML'}
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg overflow-x-auto text-[11px] font-mono leading-relaxed max-h-72">
                {sitemapXml}
              </pre>
            </div>
          )}

          {activeTab === 'robots' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">
                  Petunjuk Perayapan Mesin Pencari (robots.txt):
                </span>
                <button
                  onClick={() => copyToClipboard(robotsTxt)}
                  className="flex items-center gap-1 text-xs text-slate-700 hover:text-slate-950 font-medium"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Tersalin' : 'Salin Teks'}
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg overflow-x-auto text-[11px] font-mono leading-relaxed">
                {robotsTxt}
              </pre>
            </div>
          )}

          {activeTab === 'console' && (
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                <p className="font-semibold text-slate-900 mb-1">
                  Langkah Menghubungkan Domain PajakPedia ke Google Search Console:
                </p>
                <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                  <li>Buka <code>search.google.com/search-console</code> dan tambahkan Properti Domain PajakPedia.</li>
                  <li>Pilih metode verifikasi DNS TXT record atau tag meta HTML.</li>
                  <li>Masukkan tag verifikasi ke dalam <code>index.html</code> pada tag <code>&lt;head&gt;</code>.</li>
                  <li>Kirimkan URL Peta Situs (Sitemap): <code>{origin}/sitemap.xml</code>.</li>
                </ol>
              </div>
              <div className="text-slate-500">
                PajakPedia tidak menampilkan statistik perayapan palsu. Statistik organik (klik, impresi, CTR) akan otomatis tampil setelah Google Search Console aktif dan terhubung.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
