import React from 'react';
import { Article, AdSenseSettings } from '../types';
import {
  ArrowLeft,
  Calendar,
  Clock,
  ShieldCheck,
  User,
  ExternalLink,
  BookOpen,
  AlertCircle,
  Share2,
  FileText,
  Calculator,
  MessageSquareWarning,
} from 'lucide-react';
import { SEOMeta } from '../components/SEOMeta';
import { AdSlot } from '../components/AdSlot';
import { TAX_CATEGORIES } from '../data/categories';

interface ArticleDetailViewProps {
  article: Article;
  allArticles: Article[];
  adSettings: AdSenseSettings;
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
  onOpenCorrection: (articleSlug: string, articleTitle: string) => void;
  onOpenCalculator?: (toolId: string) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  allArticles,
  adSettings,
  onBack,
  onSelectArticle,
  onOpenCorrection,
  onOpenCalculator,
}) => {
  const categoryName =
    TAX_CATEGORIES.find((c) => c.id === article.category)?.name || article.category;

  const relatedArticles = allArticles.filter(
    (a) => article.relatedArticleSlugs.includes(a.slug) && a.status === 'published'
  );

  return (
    <div className="pb-16">
      {/* Dynamic SEO Meta */}
      <SEOMeta
        title={article.seoTitle || article.title}
        description={article.metaDescription || article.excerpt}
        type="article"
        article={article}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-slate-100/70 border-b border-slate-200 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2 truncate">
            <button
              onClick={onBack}
              className="hover:text-slate-900 inline-flex items-center gap-1 font-medium shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali
            </button>
            <span>/</span>
            <span className="text-slate-700 truncate">{categoryName}</span>
          </div>
          <button
            onClick={() => onOpenCorrection(article.slug, article.title)}
            className="text-slate-600 hover:text-slate-950 font-medium inline-flex items-center gap-1 shrink-0"
          >
            <MessageSquareWarning className="w-3.5 h-3.5 text-slate-500" />
            Laporkan Koreksi
          </button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        {/* Unboxed Metadata (Zero-Pill Rule) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-4">
          <span className="font-semibold text-teal-800 uppercase tracking-wider">
            {categoryName}
          </span>
          <span aria-hidden="true">·</span>
          <span>Dipublikasikan {article.publishedAt}</span>
          <span aria-hidden="true">·</span>
          <span>Diperbarui {article.updatedAt}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readingTimeMinutes} Menit Baca</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-slate-950 leading-[1.2] tracking-tight mb-4">
          {article.title}
        </h1>

        {/* Lead Excerpt */}
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans mb-6">
          {article.excerpt}
        </p>

        {/* Credibility & Reviewer Attribution Box */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0 font-serif">
              {article.author.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">{article.author.name}</div>
              <div className="text-[11px] text-slate-500">{article.author.role}</div>
            </div>
          </div>

          {article.reviewer && (
            <div className="border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-5 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-slate-900">
                  Ditinjau oleh: {article.reviewer.name}
                </div>
                <div className="text-[11px] text-slate-500">
                  {article.reviewer.credentials} · Verifikasi: {article.reviewer.verifiedDate}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cover Image */}
        <figure className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          <img
            src={article.coverImage}
            alt={article.imageAlt}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.endsWith('/images/hero-tax-desk.jpg')) {
                target.src = '/images/hero-tax-desk.jpg';
              }
            }}
            className="w-full h-auto aspect-16/9 object-cover"
          />
          <figcaption className="p-3 text-[11px] text-slate-500 italic bg-white border-t border-slate-100">
            {article.imageAlt} · Rujukan: {article.applicablePeriod}
          </figcaption>
        </figure>

        {/* Key Takeaways Box */}
        {article.keyTakeaways.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
            <h2 className="text-sm font-bold font-serif text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-800" />
              Poin Kunci Edukasi
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-teal-700 font-bold shrink-0">✓</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Formula Blocks if any */}
        {article.formulas && article.formulas.length > 0 && (
          <div className="border border-slate-200 rounded-xl p-5 mb-8 bg-white space-y-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Rumus & Formula Perhitungan Resmi
            </h3>
            {article.formulas.map((f, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="font-semibold text-xs text-slate-900">{f.name}</div>
                <div className="font-mono text-xs sm:text-sm text-teal-900 font-bold my-1 bg-white p-2 rounded border border-slate-200">
                  {f.formula}
                </div>
                <div className="text-xs text-slate-600">{f.description}</div>
              </div>
            ))}
          </div>
        )}

        {/* In-Article Ad Slot */}
        <AdSlot slotId="slot-article-middle" format="in-article" settings={adSettings} />

        {/* Main Article Body (Rendered with high contrast and readable line length) */}
        <div
          className="prose prose-slate max-w-prose mx-auto text-slate-800 leading-relaxed space-y-4 text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* FAQs if present */}
        {article.faq && article.faq.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200 space-y-4">
            <h2 className="font-serif font-bold text-xl text-slate-900">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <div className="space-y-3">
              {article.faq.map((item, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-white">
                  <h3 className="font-semibold text-sm text-slate-900">{item.question}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verified Official Sources Registry (Section 8) */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="font-serif font-bold text-base text-slate-900 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              Daftar Rujukan Peraturan Resmi
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Materi dalam artikel ini didasarkan pada dokumen hukum resmi berikut:
            </p>

            <div className="space-y-3">
              {article.sources.map((src, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-lg p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-semibold text-slate-900">{src.title}</div>
                    <div className="text-slate-500 font-mono text-[11px] mt-0.5">
                      {src.documentNumber} · Berlaku: {src.effectiveDate}
                      {src.relevantArticles && ` · ${src.relevantArticles}`}
                    </div>
                  </div>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-teal-800 hover:text-teal-950 font-semibold inline-flex items-center gap-1 shrink-0"
                  >
                    Buka Dokumen
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial Disclaimer Footer */}
        <div className="mt-8 p-4 bg-slate-100 rounded-lg text-xs text-slate-500 leading-relaxed border border-slate-200">
          <strong>Sangkalan Edukasi:</strong> Artikel ini diterbitkan oleh PajakPedia semata-mata untuk tujuan pendidikan dan informasi umum. Informasi ini tidak menggantikan nasihat hukum, perpajakan, atau akuntansi profesional dari konsultan terdaftar. Jika Anda menemukan kesalahan regulasi, silakan gunakan tombol "Laporkan Koreksi".
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="font-serif font-bold text-lg text-slate-900 mb-4">
              Panduan Terkait
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel.slug)}
                  className="cursor-pointer p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-400 hover:shadow-xs transition"
                >
                  <div className="text-[11px] text-slate-500">
                    {TAX_CATEGORIES.find((c) => c.id === rel.category)?.name}
                  </div>
                  <div className="font-serif font-bold text-sm text-slate-900 mt-1 line-clamp-2">
                    {rel.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
