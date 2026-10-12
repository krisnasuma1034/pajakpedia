import React from 'react';
import { ExternalLink, ShieldCheck, Scale, FileCheck2, Info, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenSitemap?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSitemap }) => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700 mt-20">
      {/* Upper Footer: Editorial Statement & Official Source Directory */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="text-lg font-bold font-serif text-slate-900">PajakPedia</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Memahami Pajak, Mengelola Keuangan, Menjalankan Usaha.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Portal edukasi independen yang dirancang untuk membantu masyarakat dan pelaku usaha Indonesia memahami kewajiban perpajakan dengan panduan faktual dan kalkulator transparan.
            </p>
            <div className="pt-1">
              <span className="text-[11px] text-slate-400 block">
                Pembaruan Regulasi Terakhir: Oktober 2026
              </span>
            </div>
          </div>

          {/* Navigasi Utama */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-900">
              Navigasi Konten
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('articles')}
                  className="hover:text-slate-900 transition-colors text-left"
                >
                  Panduan PPh 21 TER
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculators', 'umkm')}
                  className="hover:text-slate-900 transition-colors text-left"
                >
                  Simulasi UMKM 0,5%
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculators', 'ppn')}
                  className="hover:text-slate-900 transition-colors text-left"
                >
                  Kalkulator PPN 11% & DPP
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('glossary')}
                  className="hover:text-slate-900 transition-colors text-left"
                >
                  Kamus Istilah Pajak
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('regulations')}
                  className="hover:text-slate-900 transition-colors text-left"
                >
                  Direktori Regulasi Resmi
                </button>
              </li>
            </ul>
          </div>

          {/* Standar & Tata Kelola Editorial */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-900">
              Transparansi & Hukum
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('methodology')}
                  className="hover:text-slate-900 transition-colors text-left"
                >
                  Metodologi Editorial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('corrections')}
                  className="hover:text-slate-900 transition-colors text-left"
                >
                  Kebijakan Koreksi Konten
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disclaimer')}
                  className="hover:text-slate-900 transition-colors text-left"
                >
                  Sangkalan Hukum (Disclaimer)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-slate-900 transition-colors text-left"
                >
                  Kebijakan Privasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-slate-900 transition-colors text-left"
                >
                  Tentang PajakPedia & Kontak
                </button>
              </li>
              {onOpenSitemap && (
                <li>
                  <button
                    onClick={onOpenSitemap}
                    className="hover:text-slate-900 transition-colors text-left"
                  >
                    Peta Situs (XML Sitemap)
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Rujukan Pemerintah Resmi */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-900">
              Rujukan Resmi Negara
            </h4>
            <p className="text-xs text-slate-500">
              Seluruh materi disusun merujuk langsung pada dokumen perundangan resmi Republik Indonesia:
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.pajak.go.id"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900"
                >
                  Direktorat Jenderal Pajak (DJP)
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.kemenkeu.go.id"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900"
                >
                  Kementerian Keuangan RI
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://peraturan.bpk.go.id"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900"
                >
                  JDIH Badan Pemeriksa Keuangan
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Quiet Copyright & Admin Access */}
      <div className="border-t border-slate-100 bg-slate-50 py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>
            © {new Date().getFullYear()} PajakPedia. Seluruh hak cipta dilindungi undang-undang.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-1 text-slate-400 hover:text-slate-700 transition"
              title="Panel Redaksi & Manajemen Konten"
            >
              <Lock className="w-3 h-3" />
              <span>Redaksi (Admin)</span>
            </button>
            <span>·</span>
            <span>Standar Aksesibilitas WCAG AA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
