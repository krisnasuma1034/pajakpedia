import React, { useState } from 'react';
import {
  ShieldCheck,
  Scale,
  FileCheck2,
  Lock,
  Mail,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { SEOMeta } from '../components/SEOMeta';

interface LegalViewProps {
  pageType: 'about' | 'methodology' | 'privacy' | 'disclaimer' | 'corrections';
  onOpenCorrectionModal?: () => void;
}

export const LegalViews: React.FC<LegalViewProps> = ({ pageType, onOpenCorrectionModal }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* 1. Tentang Kami */}
      {pageType === 'about' && (
        <div className="space-y-6">
          <SEOMeta
            title="Tentang PajakPedia — Misi & Dewan Redaksi"
            description="Mengenal PajakPedia, portal edukasi perpajakan dan keuangan Indonesia yang berkomitmen menyajikan informasi faktual dan transparan."
          />
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-950">
              Tentang PajakPedia
            </h1>
            <p className="text-base text-slate-600 mt-2 font-serif italic">
              "Memahami Pajak, Mengelola Keuangan, Menjalankan Usaha."
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 space-y-4 leading-relaxed">
            <p>
              <strong>PajakPedia</strong> adalah portal edukasi perpajakan, keuangan pribadi, dan kepatuhan administrasi bisnis Indonesia independen. Kami didirikan dengan misi sederhana namun mendasar: <em>menjembatani jarak antara bahasa regulasi perpajakan yang kaku dengan pemahaman praktis masyarakat awam dan pelaku UMKM</em>.
            </p>
            <p>
              Kami meyakini bahwa kepatuhan pajak yang sukarela (voluntary compliance) hanya dapat tercapai apabila Wajib Pajak memahami hak, kewajiban, dan cara penghitungan pajak mereka secara transparan tanpa rasa takut atau kebingungan.
            </p>

            <h3 className="font-serif font-bold text-xl text-slate-900 pt-4">Prinsip Pokok Redaksi Kami</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>Ketepatan Faktual (Accuracy):</strong> Setiap materi wajib bersumber dari dokumen hukum primer yang dapat diverifikasi (UU, PP, PMK, PER DJP).</li>
              <li><strong>Transparansi Menyeluruh:</strong> Menampilkan tanggal pembaruan, masa pajak yang berlaku, dan dasar hukum pada setiap panduan dan simulator.</li>
              <li><strong>Bukan Pengganti Konsultasi Resmi:</strong> Kami menyajikan materi edukasi umum dan senantiasa menganjurkan wajib pajak untuk berkonsultasi dengan Kantor Pelayanan Pajak (KPP) atau konsultan pajak berizin untuk kasus kasus spesifik.</li>
            </ul>

            <h3 className="font-serif font-bold text-xl text-slate-900 pt-4">Hubungi Dewan Redaksi</h3>
            <p>Untuk pertanyaan editorial, undangan sosialisasi, atau koreksi naskah:</p>
            
            {contactSent ? (
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg text-teal-900 text-xs">
                Pesan Anda telah berhasil dikirimkan ke dewan redaksi PajakPedia. Terima kasih atas dukungan Anda.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3 bg-white p-5 border border-slate-200 rounded-xl text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Alamat Email</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pesan atau Pertanyaan</label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-md hover:bg-slate-800 transition inline-flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Kirim Pesan
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2. Metodologi Editorial */}
      {pageType === 'methodology' && (
        <div className="space-y-6">
          <SEOMeta
            title="Metodologi Editorial & Standar Verifikasi — PajakPedia"
            description="Standar penulisan, penelaahan hukum, dan verifikasi fakta perpajakan yang diterapkan di portal PajakPedia."
          />
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-950">
              Metodologi Editorial
            </h1>
            <p className="text-sm text-slate-600 mt-2">
              Prosedur 5 Tahap Pengujian Konten untuk Menjamin Integritas Materi Perpajakan
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <div className="p-5 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
              <div className="font-bold text-slate-900 text-base font-serif">
                1. Riset Naskah Hukum Primer
              </div>
              <p>
                Penulis dilarang menyadur artikel dari blog pihak ketiga tanpa memeriksa sumber aslinya. Riset wajib berpusat pada dokumen resmi JDIH Kementerian Keuangan, JDIH BPK RI, atau pengumuman resmi Direktorat Jenderal Pajak.
              </p>
            </div>

            <div className="p-5 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
              <div className="font-bold text-slate-900 text-base font-serif">
                2. Verifikasi Status Keberlakuan Regulasi
              </div>
              <p>
                Memastikan bahwa undang-undang atau peraturan pemerintah yang dirujuk tidak dalam status dicabut, diganti, atau diamandemen oleh aturan yang lebih baru (lex posterior derogat legi priori).
              </p>
            </div>

            <div className="p-5 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
              <div className="font-bold text-slate-900 text-base font-serif">
                3. Validasi Matematis & Unit Test Rumus
              </div>
              <p>
                Setiap simulator dan rumus hitung (seperti tabel TER PP 58/2023, formula DPP PPN, atau batas omzet UMKM Rp 500 juta) wajib diuji melalui unit test dengan kasus uji resmi dari lampiran regulasi sebelum diterbitkan.
              </p>
            </div>

            <div className="p-5 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
              <div className="font-bold text-slate-900 text-base font-serif">
                4. Penelaahan Praktisi & Ahli Pajak Terdaftar
              </div>
              <p>
                Materi ditinjau oleh reviewer yang memiliki kualifikasi Brevet / Konsultan Pajak Terdaftar (BKP) guna memastikan konteks penafsiran tidak menyesatkan pembaca.
              </p>
            </div>

            <div className="p-5 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
              <div className="font-bold text-slate-900 text-base font-serif">
                5. Pemantauan & Mekanisme Koreksi Terbuka
              </div>
              <p>
                Setiap artikel menyediakan tombol "Laporkan Koreksi" agar pembaca dan praktisi dapat memberikan masukan jika terjadi revisi kebijakan pemerintah.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Kebijakan Privasi */}
      {pageType === 'privacy' && (
        <div className="space-y-6">
          <SEOMeta
            title="Kebijakan Privasi & Perlindungan Data — PajakPedia"
            description="Kebijakan privasi PajakPedia mengenai perlindungan data pribadi pengunjung, kepatuhan AdSense, dan tidak disimpannya data keuangan sensitif."
          />
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-950">
              Kebijakan Privasi
            </h1>
            <p className="text-sm text-slate-600 mt-2">
              Berlaku sejak: 1 Januari 2024 · Pembaruan Terakhir: Oktober 2026
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-4 leading-relaxed">
            <p>
              Privasi Anda adalah prioritas utama kami. Kebijakan ini menjelaskan bagaimana PajakPedia mengelola informasi saat Anda menggunakan portal dan alat hitung kami:
            </p>

            <h3 className="font-serif font-bold text-lg text-slate-900 pt-3">
              1. Tidak Menyimpan Data Pajak Sensitif
            </h3>
            <p>
              Kalkulator PajakPedia beroperasi <strong>secara lokal di peramban (browser) Anda</strong>. Kami <strong>TIDAK PERNAH</strong> meminta, mencatat, atau menyimpan:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nomor Induk Kependudukan (NIK)</li>
              <li>Nomor Pokok Wajib Pajak (NPWP)</li>
              <li>Kata sandi akun DJP Online / Coretax</li>
              <li>Nomor rekening bank atau data finansial pribadi rahasia</li>
            </ul>

            <h3 className="font-serif font-bold text-lg text-slate-900 pt-3">
              2. Kuki (Cookies) & Iklan Pihak Ketiga (Google AdSense)
            </h3>
            <p>
              PajakPedia dipersiapkan untuk penayangan iklan yang mematuhi pedoman Google AdSense. Google, sebagai vendor pihak ketiga, menggunakan kuki (seperti kuki DoubleClick) untuk menayangkan iklan kepada pengguna berdasarkan kunjungan mereka ke situs kami dan/atau situs lain di internet.
            </p>
            <p>
              Pengguna dapat memilih untuk menonaktifkan penggunaan kuki iklan hasil personalisasi dengan mengunjungi Pengaturan Iklan Google (<em>adssettings.google.com</em>).
            </p>

            <h3 className="font-serif font-bold text-lg text-slate-900 pt-3">
              3. Data Penggunaan Teknis
            </h3>
            <p>
              Kami mengumpulkan data teknis anonim standar (seperti jenis peramban, resolusi layar, dan waktu kunjungan) untuk meningkatkan kecepatan dan pengalaman navigasi situs. Kami tidak menjual data pengguna kepada pihak mana pun.
            </p>
          </div>
        </div>
      )}

      {/* 4. Disclaimer / Sangkalan Hukum */}
      {pageType === 'disclaimer' && (
        <div className="space-y-6">
          <SEOMeta
            title="Sangkalan Hukum (Disclaimer) — PajakPedia"
            description="Pernyataan sangkalan independensi PajakPedia sebagai portal edukasi non-pemerintah."
          />
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-950">
              Sangkalan Hukum (Disclaimer)
            </h1>
            <p className="text-sm text-slate-600 mt-2">
              Pernyataan Batasan Tanggung Jawab & Independensi
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-4 leading-relaxed">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 font-medium">
              PERHATIAN PENTING: PajakPedia adalah portal edukasi independen milik swasta dan BUKAN situs resmi Direktorat Jenderal Pajak (DJP), Kementerian Keuangan RI, ataupun lembaga pemerintah lainnya.
            </div>

            <p>
              Seluruh artikel, panduan, diagram, dan kalkulator yang tersedia di <strong>PajakPedia</strong> disusun semata-mata untuk tujuan pendidikan, literasi umum, dan simulasi perkiraan.
            </p>
            <p>
              Meskipun tim kami berupaya semaksimal mungkin untuk menjaga kemutakhiran data berdasarkan naskah perundang-undangan resmi, informasi yang disajikan di situs ini <strong>tidak dapat dianggap sebagai nasihat hukum, perpajakan, atau akuntansi resmi yang mengikat</strong>.
            </p>
            <p>
              Penerapan ketentuan perpajakan pada kasus riil seringkali bergantung pada fakta material spesifik, status wajib pajak, dan penafsiran otoritas berwenang (Kantor Pelayanan Pajak). Untuk pemenuhan kewajiban formal atau sengketa perpajakan, pembaca disarankan untuk mengonfirmasi langsung ke <strong>Kring Pajak 1500200</strong>, Kantor Pelayanan Pajak (KPP) terdaftar, atau konsultan pajak berizin resmi.
            </p>
          </div>
        </div>
      )}

      {/* 5. Kebijakan Koreksi Konten */}
      {pageType === 'corrections' && (
        <div className="space-y-6">
          <SEOMeta
            title="Kebijakan Koreksi Konten & Pembaruan Regulasi — PajakPedia"
            description="Mekanisme dan tata cara pengajuan koreksi faktual materi perpajakan di portal PajakPedia."
          />
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-950">
              Kebijakan Koreksi Konten
            </h1>
            <p className="text-sm text-slate-600 mt-2">
              Prosedur Penanganan Kesalahan Faktual dan Pembaruan Regulasi
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-4 leading-relaxed">
            <p>
              PajakPedia berkomitmen penuh untuk mengoreksi setiap kekeliruan data, salah kutip pasal hukum, atau rumus penghitungan yang sudah kedaluwarsa secara cepat dan transparan.
            </p>

            <h3 className="font-serif font-bold text-lg text-slate-900 pt-3">
              Tahapan Penanganan Koreksi
            </h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Penerimaan Laporan:</strong> Pembaca dapat mengirimkan laporan koreksi melalui tautan "Laporkan Koreksi" pada setiap artikel panduan.
              </li>
              <li>
                <strong>Pemeriksaan Rujukan:</strong> Tim redaksi dan konsultan penelaah membandingkan laporan dengan dokumen resmi di JDIH BPK RI atau DJP dalam waktu 2×24 jam kerja.
              </li>
              <li>
                <strong>Revisi Naskah & Log Pembaruan:</strong> Jika kekeliruan terbukti, naskah artikel akan segera diperbaiki, dan tanggal "Diperbarui" akan diperbarui disertai catatan perbaikan singkat jika menyangkut substansi tarif atau hukum.
              </li>
            </ol>

            {onOpenCorrectionModal && (
              <div className="pt-4">
                <button
                  onClick={onOpenCorrectionModal}
                  className="px-4 py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition text-xs"
                >
                  Buka Formulir Laporkan Koreksi Sekarang
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
