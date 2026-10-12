import React, { useState } from 'react';
import { X, Send, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { CorrectionReport } from '../types';

interface CorrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleSlug?: string;
  articleTitle?: string;
  onSubmit: (report: Omit<CorrectionReport, 'id' | 'submittedAt' | 'status'>) => void;
}

export const CorrectionModal: React.FC<CorrectionModalProps> = ({
  isOpen,
  onClose,
  articleSlug = '',
  articleTitle = 'PajakPedia Portal Edukasi',
  onSubmit,
}) => {
  const [reporterName, setReporterName] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [section, setSection] = useState('');
  const [correction, setCorrection] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reporterName || !reporterEmail || !correction) return;

    onSubmit({
      articleSlug,
      articleTitle,
      reporterName,
      reporterEmail,
      sectionOrParagraph: section,
      suggestedCorrection: correction,
      supportingSourceUrl: sourceUrl,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setCorrection('');
      setSection('');
      setSourceUrl('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 font-serif text-lg">
              Laporkan Koreksi atau Pembaruan Regulasi
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Artikel: {articleTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
            <h4 className="font-bold text-slate-900 text-base">Terima Kasih!</h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              Laporan koreksi Anda telah diterima oleh tim dewan redaksi PajakPedia. Kami akan memeriksa rujukan peraturan terkait dan memperbarui artikel jika terverifikasi.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="Nama Anda"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Alamat Email *
                </label>
                <input
                  type="email"
                  required
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Bagian / Paragraf yang Memerlukan Koreksi
              </label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="Contoh: Tabel TER Kategori A, paragraf kedua..."
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Uraian Koreksi Faktual *
              </label>
              <textarea
                required
                rows={3}
                value={correction}
                onChange={(e) => setCorrection(e.target.value)}
                placeholder="Jelaskan kekeliruan atau aturan baru yang menggantikannya..."
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Tautan Sumber Resmi Pembanding (DJP / JDIH BPK)
              </label>
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://peraturan.bpk.go.id/... atau https://pajak.go.id/..."
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Kirim Laporan
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
