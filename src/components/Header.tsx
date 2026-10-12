import React, { useState } from 'react';
import { Menu, X, ShieldCheck, Search } from 'lucide-react';

interface HeaderProps {
  activeView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'news', label: 'Berita & Update' },
    { id: 'articles', label: 'Panduan Pajak' },
    { id: 'calculators', label: 'Kalkulator' },
    { id: 'glossary', label: 'Kamus Pajak' },
    { id: 'regulations', label: 'Regulasi Resmi' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
      {/* Official Government Disclaimer Sub-bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 text-center">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span>
            Portal Edukasi Mandiri & Riset Regulasi Indonesia — Bukan Situs Resmi Pemerintah (DJP). Berdasarkan UU HPP & PP 58/2023.
          </span>
        </div>
      </div>

      {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Action) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="text-xl font-bold tracking-tight text-slate-950 font-serif whitespace-nowrap shrink-0 hover:text-slate-800 transition text-left"
        >
          PajakPedia
        </button>

        {/* Zone 2: 4-5 Concise Single-line Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-slate-950 ${
                  isActive
                    ? 'text-slate-950 font-semibold border-b-2 border-slate-900'
                    : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action CTA + Mobile Menu Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('calculators')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
          >
            Mulai Hitung Pajak
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-950 focus:outline-none"
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                activeView === item.id
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onNavigate('calculators');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg text-center"
            >
              Mulai Hitung Pajak
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
