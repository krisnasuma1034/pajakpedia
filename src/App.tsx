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
import { LegalViews } from './views/LegalViews';
import { INITIAL_ARTICLES } from './data/articles';
import { GLOSSARY_TERMS } from './data/glossary';
import { REGULATORY_SOURCES } from './data/regulatorySources';
import { Article, CorrectionReport, AdSenseSettings } from './types';
import { SEOMeta } from './components/SEOMeta';

export default function App() {
  // Application Data States (persisted to localStorage)
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

  // Navigation State
  const [activeView, setActiveView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);

  // Modals State
  const [correctionModalOpen, setCorrectionModalOpen] = useState(false);
  const [correctionArticleInfo, setCorrectionArticleInfo] = useState({ slug: '', title: '' });
  const [sitemapModalOpen, setSitemapModalOpen] = useState(false);

  // Sync to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('pajakpedia_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('pajakpedia_corrections', JSON.stringify(correctionReports));
  }, [correctionReports]);

  useEffect(() => {
    localStorage.setItem('pajakpedia_adsense', JSON.stringify(adSettings));
  }, [adSettings]);

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

      if (['home', 'articles', 'article-detail', 'calculators', 'glossary', 'regulations', 'about', 'methodology', 'privacy', 'disclaimer', 'corrections', 'admin'].includes(primary)) {
        setActiveView(primary);
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
    } else if (view === 'calculators' && param) {
      window.location.hash = `kalkulator/${param}`;
    } else if (view === 'glossary' && param) {
      window.location.hash = `kamus/${param}`;
    } else {
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      {/* Dynamic Base SEO */}
      <SEOMeta />

      {/* Main Header */}
      {activeView !== 'admin' && (
        <Header
          activeView={activeView}
          onNavigate={(view, param) => navigateTo(view, param)}
        />
      )}

      {/* Main Page Content */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HomeView
            articles={articles}
            glossary={GLOSSARY_TERMS}
            regulations={REGULATORY_SOURCES}
            adSettings={adSettings}
            onNavigate={navigateTo}
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
            onUpdateArticle={handleUpdateArticle}
            onCreateArticle={handleCreateArticle}
            onUpdateAdSettings={setAdSettings}
            onUpdateCorrectionStatus={handleUpdateCorrectionStatus}
            onClose={() => navigateTo('home')}
          />
        )}
      </main>

      {/* Main Footer */}
      {activeView !== 'admin' && (
        <Footer
          onNavigate={navigateTo}
          onOpenSitemap={() => setSitemapModalOpen(true)}
        />
      )}

      {/* Reader Correction Report Modal */}
      <CorrectionModal
        isOpen={correctionModalOpen}
        onClose={() => setCorrectionModalOpen(false)}
        articleSlug={correctionArticleInfo.slug}
        articleTitle={correctionArticleInfo.title}
        onSubmit={handleSubmitCorrection}
      />

      {/* Sitemap and Technical SEO Modal */}
      <SitemapModal
        isOpen={sitemapModalOpen}
        onClose={() => setSitemapModalOpen(false)}
        articles={articles}
        glossary={GLOSSARY_TERMS}
      />
    </div>
  );
}
