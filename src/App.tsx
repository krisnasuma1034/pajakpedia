/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CorrectionModal } from './components/CorrectionModal';
import { SitemapModal } from './components/SitemapModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { HomeView } from './views/HomeView';
import { ArticleListView } from './views/ArticleListView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { CalculatorsView } from './views/CalculatorsView';
import { GlossaryView } from './views/GlossaryView';
import { RegulationsView } from './views/RegulationsView';
import { NewsView } from './views/NewsView';
import { LegalViews } from './views/LegalViews';
import { INITIAL_ARTICLES } from './data/articles';
import { GLOSSARY_TERMS } from './data/glossary';
import { REGULATORY_SOURCES } from './data/regulatorySources';
import { INITIAL_NEWS_SOURCES } from './data/newsSources';
import { INITIAL_EXTERNAL_NEWS } from './data/initialNews';
import {
  Article,
  CorrectionReport,
  AdSenseSettings,
  NewsSource,
  ExternalNewsItem,
  NewsSyncLog,
  EditorialDraft,
} from './types';
import { syncActiveNewsSources } from './utils/newsSyncEngine';
import { SEOMeta } from './components/SEOMeta';

export default function App() {
  // Articles & Content States
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('pajakpedia_articles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_ARTICLES;
  });

  const [correctionReports, setCorrectionReports] = useState<CorrectionReport[]>(() => {
    const saved = localStorage.getItem('pajakpedia_corrections');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [adSettings, setAdSettings] = useState<AdSenseSettings>(() => {
    const saved = localStorage.getItem('pajakpedia_adsense');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      enabled: false,
      publisherId: '',
      placeholderMode: true,
      showTopBanner: true,
      showInArticle: true,
      showSidebar: true,
    };
  });

  // News & Tax Updates System States
  const [newsSources, setNewsSources] = useState<NewsSource[]>(() => {
    const saved = localStorage.getItem('pajakpedia_news_sources');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_NEWS_SOURCES;
  });

  const [newsList, setNewsList] = useState<ExternalNewsItem[]>(() => {
    const saved = localStorage.getItem('pajakpedia_news_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_EXTERNAL_NEWS;
  });

  const [newsSyncLogs, setNewsSyncLogs] = useState<NewsSyncLog[]>(() => {
    const saved = localStorage.getItem('pajakpedia_news_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [editorialDrafts, setEditorialDrafts] = useState<EditorialDraft[]>(() => {
    const saved = localStorage.getItem('pajakpedia_drafts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>(() => {
    return localStorage.getItem('pajakpedia_last_sync') || new Date().toISOString();
  });

  // Navigation State
  const [activeView, setActiveView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);

  // Modals State
  const [correctionModalOpen, setCorrectionModalOpen] = useState(false);
  const [correctionArticleInfo, setCorrectionArticleInfo] = useState({ slug: '', title: '' });
  const [sitemapModalOpen, setSitemapModalOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('pajakpedia_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('pajakpedia_corrections', JSON.stringify(correctionReports));
  }, [correctionReports]);

  useEffect(() => {
    localStorage.setItem('pajakpedia_adsense', JSON.stringify(adSettings));
  }, [adSettings]);

  useEffect(() => {
    localStorage.setItem('pajakpedia_news_sources', JSON.stringify(newsSources));
  }, [newsSources]);

  useEffect(() => {
    localStorage.setItem('pajakpedia_news_list', JSON.stringify(newsList));
  }, [newsList]);

  useEffect(() => {
    localStorage.setItem('pajakpedia_news_logs', JSON.stringify(newsSyncLogs));
  }, [newsSyncLogs]);

  useEffect(() => {
    localStorage.setItem('pajakpedia_drafts', JSON.stringify(editorialDrafts));
  }, [editorialDrafts]);

  // Handle URL hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setActiveView('home');
        setViewParam(undefined);
        return;
      }

      const parts = hash.split('/');
      const primary = parts[0];
      const param = parts[1];

      if (
        [
          'home',
          'articles',
          'article-detail',
          'news',
          'calculators',
          'glossary',
          'regulations',
          'about',
          'methodology',
          'privacy',
          'disclaimer',
          'corrections',
          'admin',
        ].includes(primary)
      ) {
        setActiveView(primary);
        setViewParam(param);
      } else if (primary === 'berita') {
        setActiveView('news');
        setViewParam(param);
      } else if (primary === 'panduan' && param) {
        setActiveView('article-detail');
        setViewParam(param);
      } else if (primary === 'kalkulator') {
        setActiveView('calculators');
        setViewParam(param);
      } else if (primary === 'kamus') {
        setActiveView('glossary');
        setViewParam(param);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: string, param?: string) => {
    setActiveView(view);
    setViewParam(param);
    if (view === 'article-detail' && param) {
      window.location.hash = `panduan/${param}`;
    } else if (view === 'news') {
      window.location.hash = param ? `berita/${param}` : 'berita';
    } else if (view === 'calculators' && param) {
      window.location.hash = `kalkulator/${param}`;
    } else if (view === 'glossary' && param) {
      window.location.hash = `kamus/${param}`;
    } else {
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync Handlers
  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      // 1. Try serverless endpoint first if running on Vercel deployment
      let serverSuccess = false;
      try {
        const res = await fetch('/api/sync-news', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          if (data?.latestNews && Array.isArray(data.latestNews)) {
            serverSuccess = true;
          }
        }
      } catch {
        // Fallback to client-side engine if serverless endpoint is not mounted in dev
      }

      // 2. Client-side engine execution for immediate updates and offline reliability
      const syncResult = await syncActiveNewsSources(newsSources, newsList);
      setNewsList(syncResult.updatedNews);
      setNewsSources(syncResult.updatedSources);
      setNewsSyncLogs((prev) => [...syncResult.logs, ...prev].slice(0, 50));

      const now = new Date().toISOString();
      setLastSyncTime(now);
      localStorage.setItem('pajakpedia_last_sync', now);
    } catch (err) {
      console.error('Error syncing news feeds:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleToggleNewsSource = (sourceId: string, active: boolean) => {
    setNewsSources((prev) =>
      prev.map((s) => (s.id === sourceId ? { ...s, active } : s))
    );
  };

  const handleUpdateNewsSourceInterval = (sourceId: string, intervalMinutes: number) => {
    setNewsSources((prev) =>
      prev.map((s) => (s.id === sourceId ? { ...s, syncIntervalMinutes: intervalMinutes } : s))
    );
  };

  const handleAddNewsSource = (newSource: NewsSource) => {
    setNewsSources((prev) => [...prev, newSource]);
  };

  const handleUpdateNewsItem = (updated: ExternalNewsItem) => {
    setNewsList((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  };

  const handleDeleteNewsItem = (itemId: string) => {
    setNewsList((prev) => prev.filter((n) => n.id !== itemId));
  };

  // AI Educational Draft Generator and Editorial Approval
  const handleCreateDraftFromNews = (newsItem: ExternalNewsItem) => {
    const newDraft: EditorialDraft = {
      id: `draft-${Date.now()}`,
      newsItemId: newsItem.id,
      title: `Telaah Regulasi: ${newsItem.title}`,
      educationalTakeaway: `Pembaruan warta dari ${newsItem.sourceName} menegaskan urgensi kepatuhan administrasi terkait ${newsItem.category.toUpperCase()}. Ringkasan: ${newsItem.summary}`,
      practicalImpact:
        'Wajib pajak dan pelaku usaha disarankan untuk memeriksa kembali data administrasi pada sistem perpajakan DJP serta menyesuaikan pembukuan transaksi.',
      originalSourceUrl: newsItem.originalUrl,
      sourceName: newsItem.sourceName,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending_review',
    };
    setEditorialDrafts((prev) => [newDraft, ...prev]);
  };

  const handleApproveDraft = (draftId: string) => {
    const draft = editorialDrafts.find((d) => d.id === draftId);
    if (!draft) return;

    // Convert into PajakPedia published article
    const newArticle: Article = {
      id: `art-${Date.now()}`,
      title: draft.title,
      slug: draft.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, ''),
      excerpt: draft.educationalTakeaway,
      category: 'regulasi',
      author: {
        id: 'redaksi-pajakpedia',
        name: 'Dewan Redaksi PajakPedia',
        role: 'Editor Regulasi & Kebijakan Fiskal',
        bio: 'Tim riset dan telaah kebijakan fiskal Indonesia.',
      },
      reviewer: {
        id: 'rev-hendra',
        name: 'Hendra Setiawan, S.E., Ak., M.Ak., BKP',
        credentials: 'Konsultan Pajak Terdaftar (BKP Madya)',
        verifiedDate: new Date().toISOString().split('T')[0],
      },
      publishedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      applicablePeriod: 'Tahun Pajak 2026',
      coverImage: '/src/assets/images/hero_editorial_tax_desk_1791783162275.jpg',
      imageAlt: draft.title,
      readingTimeMinutes: 4,
      keyTakeaways: [
        draft.educationalTakeaway,
        draft.practicalImpact,
        `Dirujuk langsung dari rilis resmi ${draft.sourceName}.`,
      ],
      content: `
        <h3>Ikhtisar Kebijakan</h3>
        <p>${draft.educationalTakeaway}</p>
        <h3>Dampak Praktis bagi Wajib Pajak</h3>
        <p>${draft.practicalImpact}</p>
        <h3>Rujukan Sumber Primer</h3>
        <p>Materi ini didasarkan pada siaran pers / warta resmi yang diterbitkan oleh <strong>${draft.sourceName}</strong>. Wajib pajak dapat membaca dokumen naskah lengkap melalui tautan sumber asli yang disediakan.</p>
      `,
      sources: [
        {
          title: `Rilis Resmi: ${draft.title}`,
          documentNumber: 'Siaran Pers Resmi',
          issuingAuthority: draft.sourceName,
          url: draft.originalSourceUrl,
          effectiveDate: new Date().toISOString().split('T')[0],
          status: 'berlaku',
        },
      ],
      relatedArticleSlugs: [],
      status: 'published',
      seoTitle: `${draft.title} | PajakPedia`,
      metaDescription: draft.educationalTakeaway,
    };

    setArticles((prev) => [newArticle, ...prev]);
    setEditorialDrafts((prev) =>
      prev.map((d) => (d.id === draftId ? { ...d, status: 'approved' } : d))
    );
  };

  const handleRejectDraft = (draftId: string) => {
    setEditorialDrafts((prev) =>
      prev.map((d) => (d.id === draftId ? { ...d, status: 'rejected' } : d))
    );
  };

  // Handlers for Articles
  const handleUpdateArticle = (updated: Article) => {
    setArticles((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  const handleCreateArticle = (created: Article) => {
    setArticles((prev) => [created, ...prev]);
  };

  // Handlers for Corrections
  const handleSubmitCorrection = (
    report: Omit<CorrectionReport, 'id' | 'submittedAt' | 'status'>
  ) => {
    const newReport: CorrectionReport = {
      ...report,
      id: `rep-${Date.now()}`,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setCorrectionReports((prev) => [newReport, ...prev]);
  };

  const handleUpdateCorrectionStatus = (
    id: string,
    status: CorrectionReport['status']
  ) => {
    setCorrectionReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  // Selected article for detail view
  const currentArticle =
    activeView === 'article-detail' && viewParam
      ? articles.find((a) => a.slug === viewParam) || articles[0]
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <SEOMeta />

      {activeView !== 'admin' && (
        <Header
          activeView={activeView}
          onNavigate={(view, param) => navigateTo(view, param)}
        />
      )}

      <main className="flex-1">
        {activeView === 'home' && (
          <HomeView
            articles={articles}
            glossary={GLOSSARY_TERMS}
            regulations={REGULATORY_SOURCES}
            newsList={newsList}
            adSettings={adSettings}
            onNavigate={navigateTo}
          />
        )}

        {activeView === 'news' && (
          <NewsView
            newsList={newsList}
            sources={newsSources}
            adSettings={adSettings}
            isSyncing={isSyncing}
            lastSyncTime={lastSyncTime}
            onManualSync={handleManualSync}
            onOpenArticleDetail={(slug) => navigateTo('article-detail', slug)}
          />
        )}

        {activeView === 'articles' && (
          <ArticleListView
            articles={articles}
            selectedCategory={viewParam}
            onSelectArticle={(slug) => navigateTo('article-detail', slug)}
          />
        )}

        {activeView === 'article-detail' && currentArticle && (
          <ArticleDetailView
            article={currentArticle}
            allArticles={articles}
            adSettings={adSettings}
            onBack={() => navigateTo('articles')}
            onSelectArticle={(slug) => navigateTo('article-detail', slug)}
            onOpenCorrection={(slug, title) => {
              setCorrectionArticleInfo({ slug, title });
              setCorrectionModalOpen(true);
            }}
            onOpenCalculator={(toolId) => navigateTo('calculators', toolId)}
          />
        )}

        {activeView === 'calculators' && (
          <CalculatorsView initialTool={viewParam || 'pph21'} />
        )}

        {activeView === 'glossary' && (
          <GlossaryView
            glossary={GLOSSARY_TERMS}
            initialTermSlug={viewParam}
          />
        )}

        {activeView === 'regulations' && (
          <RegulationsView regulations={REGULATORY_SOURCES} />
        )}

        {['about', 'methodology', 'privacy', 'disclaimer', 'corrections'].includes(
          activeView
        ) && (
          <LegalViews
            pageType={activeView as any}
            onOpenCorrectionModal={() => {
              setCorrectionArticleInfo({ slug: 'portal-umum', title: 'Portal PajakPedia' });
              setCorrectionModalOpen(true);
            }}
          />
        )}

        {activeView === 'admin' && (
          <AdminDashboard
            articles={articles}
            correctionReports={correctionReports}
            adSettings={adSettings}
            newsSources={newsSources}
            newsList={newsList}
            newsSyncLogs={newsSyncLogs}
            editorialDrafts={editorialDrafts}
            isSyncing={isSyncing}
            onUpdateArticle={handleUpdateArticle}
            onCreateArticle={handleCreateArticle}
            onUpdateAdSettings={setAdSettings}
            onUpdateCorrectionStatus={handleUpdateCorrectionStatus}
            onToggleNewsSource={handleToggleNewsSource}
            onUpdateNewsSourceInterval={handleUpdateNewsSourceInterval}
            onAddNewsSource={handleAddNewsSource}
            onUpdateNewsItem={handleUpdateNewsItem}
            onDeleteNewsItem={handleDeleteNewsItem}
            onManualSync={handleManualSync}
            onApproveDraft={handleApproveDraft}
            onRejectDraft={handleRejectDraft}
            onCreateDraftFromNews={handleCreateDraftFromNews}
            onClose={() => navigateTo('home')}
          />
        )}
      </main>

      {activeView !== 'admin' && (
        <Footer
          onNavigate={navigateTo}
          onOpenSitemap={() => setSitemapModalOpen(true)}
        />
      )}

      <CorrectionModal
        isOpen={correctionModalOpen}
        onClose={() => setCorrectionModalOpen(false)}
        articleSlug={correctionArticleInfo.slug}
        articleTitle={correctionArticleInfo.title}
        onSubmit={handleSubmitCorrection}
      />

      <SitemapModal
        isOpen={sitemapModalOpen}
        onClose={() => setSitemapModalOpen(false)}
        articles={articles}
        glossary={GLOSSARY_TERMS}
      />
    </div>
  );
}
