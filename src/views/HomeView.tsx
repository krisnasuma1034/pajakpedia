import React from 'react';
import {
  Calculator,
  BookOpen,
  Scale,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { Article, GlossaryTerm, RegulatorySourceItem, AdSenseSettings } from '../types';
import { SearchBar } from '../components/SearchBar';
import { AdSlot } from '../components/AdSlot';

interface HomeViewProps {
  articles: Article[];
  glossary: GlossaryTerm[];
  regulations: RegulatorySourceItem[];
  adSettings: AdSenseSettings;
  onNavigate: (view: string, param?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  articles,
  glossary,
  regulations,
  adSettings,
  onNavigate,
}) => {
  const publishedArticles = articles.filter((a) => a.status === 'published');
  const leadArticle = publishedArticles[0];
  const secondaryArticles = publishedArticles.slice(1, 4);

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-12 bg-linear-to-b from-slate-100/70 to-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headline & Search */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                <span>Portal Edukasi Fiskal & Pajak Terpercaya Indonesia</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-slate-950 tracking-tight leading-[1.15]">
                Belajar Pajak Indonesia Jadi Lebih Mudah.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Panduan praktis, kalkulator PPh 21 skema TER terbaru, simulasi UMKM bebas pajak Rp 500 juta, dan penelusuran regulasi resmi tanpa istilah berbelit.
              </p>

              {/* Instant Search Bar */}
              <div className="pt-2 max-w-xl">
                <SearchBar
                  articles={publishedArticles}
                  glossary={glossary}
                  regulations={regulations}
                  onSelectArticle={(slug) => onNavigate('article-detail', slug)}
                  onSelectGlossary={(slug) => onNavigate('glossary', slug)}
                  onSelectCalculator={(toolId) => onNavigate('calculators', toolId)}
                />
              </div>

              {/* Popular quick jump shortcuts */}
              <div className="pt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Akses Cepat:</span>
                <button
                  onClick={() => onNavigate('calculators', 'pph21')}
                  className="px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-400 rounded-md transition"
                >
                  PPh 21 TER 2024
                </button>
                <button
                  onClick={() => onNavigate('calculators', 'umkm')}
                  className="px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-400 rounded-md transition"
                >
                  Pajak UMKM 0,5%
                </button>
                <button
                  onClick={() => onNavigate('calculators', 'ppn')}
                  className="px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-400 rounded-md transition"
                >
                  Hitung PPN 11%
                </button>
                <button
                  onClick={() => onNavigate('calculators', 'gajibersih')}
                  className="px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-400 rounded-md transition"
                >
                  Gaji Bersih & THR
                </button>
              </div>
            </div>

            {/* Right Column: Featured Visual Hero Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="aspect-16/10 overflow-hidden bg-slate-100 relative">
                  <img
                    src="/src/assets/images/hero_editorial_tax_desk_1791783162275.jpg"
                    alt="Meja analisis perpajakan dan pelaporan keuangan di Indonesia"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded">
                    Rujukan Resmi 2026
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>Panduan Utama</span>
                    <span>·</span>
                    <span>Diperbarui Oktober 2026</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-slate-900 leading-snug">
                    Pemotongan PPh 21 TER: Bagaimana Menghitung Potongan Bulanan Anda?
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    Ketahui tabel resmi TER Kategori A, B, dan C berdasarkan PP 58/2023 serta mekanisme penyesuaian gaji pada masa pajak Desember.
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      onClick={() => onNavigate('calculators', 'pph21')}
                      className="text-xs font-semibold text-slate-900 hover:text-teal-700 inline-flex items-center gap-1 transition"
                    >
                      Buka Kalkulator TER
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onNavigate('article-detail', 'panduan-lengkap-pph-21-ter-pp-58-2023')}
                      className="text-xs text-slate-500 hover:text-slate-900 transition"
                    >
                      Baca Panduan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Operational & Verification Utility Bar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900">Rujukan Hukum Primer</div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Merujuk UU HPP, PP 58/2023, PP 55/2022, dan JDIH BPK RI.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900">Penelaahan Ahli</div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Ditinjau oleh Konsultan Pajak Terdaftar (BKP) dan Praktisi Akuntansi.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileCheck2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900">Formula Tervalidasi</div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Kalkulator diuji menggunakan unit test terhadap studi kasus resmi DJP.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Scale className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900">Transparansi Publik</div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Fitur laporan koreksi jika terdapat pembaruan regulasi kementerian.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Popular Tax Tools Hub (Kalkulator Unggulan) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Alat Hitung Edukasi
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950">
              Kalkulator Pajak Praktis & Transparan
            </h2>
          </div>
          <button
            onClick={() => onNavigate('calculators')}
            className="text-xs font-semibold text-slate-900 hover:text-teal-700 inline-flex items-center gap-1 transition"
          >
            Lihat Semua Alat Hitung
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tool Card 1: PPh 21 TER */}
          <div
            onClick={() => onNavigate('calculators', 'pph21')}
            className="group cursor-pointer bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-400 hover:shadow-sm transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                Kalkulator PPh 21 TER
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hitung persentase TER Kategori A, B, atau C untuk potongan bulanan karyawan tetap berdasarkan PP 58/2023.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-800">
              <span>Buka Simulasi</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Tool Card 2: Pajak UMKM 0,5% */}
          <div
            onClick={() => onNavigate('calculators', 'umkm')}
            className="group cursor-pointer bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-400 hover:shadow-sm transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                Pajak UMKM 0,5%
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Simulasi batas omzet bebas pajak Rp 500 juta bagi Orang Pribadi dan akumulasi setoran bulanan PP 55/2022.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-800">
              <span>Buka Simulasi</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Tool Card 3: PPN & DPP */}
          <div
            onClick={() => onNavigate('calculators', 'ppn')}
            className="group cursor-pointer bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-400 hover:shadow-sm transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                Kalkulator PPN & DPP
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hitung DPP dan nilai PPN 11% untuk harga inklusif (sudah termasuk pajak) atau eksklusif (belum termasuk).
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-800">
              <span>Buka Simulasi</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Tool Card 4: Gaji Bersih & THR */}
          <div
            onClick={() => onNavigate('calculators', 'gajibersih')}
            className="group cursor-pointer bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-400 hover:shadow-sm transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                Gaji Bersih & THR
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Estimasi uang masuk rekening setelah potongan BPJS Ketenagakerjaan, BPJS Kesehatan, dan perhitungan THR keagamaan.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-800">
              <span>Buka Simulasi</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Top Slot */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <AdSlot slotId="slot-home-top" format="banner" settings={adSettings} />
      </section>

      {/* 4. Essential Tax Guides (Panduan Utama) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Materi Edukasi Pilihan
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950">
              Panduan Perpajakan Esensial
            </h2>
          </div>
          <button
            onClick={() => onNavigate('articles')}
            className="text-xs font-semibold text-slate-900 hover:text-teal-700 inline-flex items-center gap-1 transition"
          >
            Lihat Semua Panduan ({publishedArticles.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3-Tier Salience Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Lead Story */}
          {leadArticle && (
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-sm transition">
              <div className="aspect-16/9 bg-slate-100 overflow-hidden">
                <img
                  src={leadArticle.coverImage}
                  alt={leadArticle.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-102 transition duration-300"
                />
              </div>
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-teal-800 uppercase tracking-wider">
                    PPh 21 Karyawan
                  </span>
                  <span>·</span>
                  <span>{leadArticle.readingTimeMinutes} Menit Membaca</span>
                  <span>·</span>
                  <span>Ditinjau oleh Konsultan Pajak BKP</span>
                </div>

                <h3
                  onClick={() => onNavigate('article-detail', leadArticle.slug)}
                  className="cursor-pointer font-serif font-bold text-xl sm:text-2xl text-slate-950 hover:text-teal-800 transition leading-snug"
                >
                  {leadArticle.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {leadArticle.excerpt}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Masa Berlaku: {leadArticle.applicablePeriod}
                  </span>
                  <button
                    onClick={() => onNavigate('article-detail', leadArticle.slug)}
                    className="text-xs font-semibold text-slate-900 hover:text-teal-700 inline-flex items-center gap-1 transition"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Features Stack */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {secondaryArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => onNavigate('article-detail', art.slug)}
                className="cursor-pointer bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-400 hover:shadow-xs transition flex gap-4"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={art.coverImage}
                    alt={art.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>{art.readingTimeMinutes} mnt baca</span>
                    <span>·</span>
                    <span className="text-teal-700 font-medium">Terverifikasi</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-900 hover:text-teal-800 transition line-clamp-2 leading-snug">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Latest Regulatory Updates (Pembaruan Aturan Terkini) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-1">
                Pembaruan Regulasi Nasional
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Direktori Peraturan Pajak Resmi
              </h2>
            </div>
            <button
              onClick={() => onNavigate('regulations')}
              className="text-xs font-semibold text-teal-300 hover:text-white inline-flex items-center gap-1 transition"
            >
              Lihat Seluruh Regulasi
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regulations.slice(0, 3).map((reg) => (
              <div
                key={reg.id}
                className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono text-teal-400">{reg.docNumber}</span>
                    <span className="text-emerald-400">Berlaku</span>
                  </div>
                  <h3 className="font-serif font-bold text-sm text-white leading-snug">
                    {reg.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {reg.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-700/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">
                    Ditetapkan: {reg.publicationDate}
                  </span>
                  <a
                    href={reg.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-teal-300 hover:text-white font-medium inline-flex items-center gap-1"
                  >
                    Buka JDIH
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Popular Glossary Terms (Kamus Istilah Pajak) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Kamus Istilah Pajak
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950">
              Pahami Istilah Penting Perpajakan
            </h2>
          </div>
          <button
            onClick={() => onNavigate('glossary')}
            className="text-xs font-semibold text-slate-900 hover:text-teal-700 inline-flex items-center gap-1 transition"
          >
            Buka Seluruh Kamus ({glossary.length} Istilah)
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {glossary.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('glossary', item.slug)}
              className="cursor-pointer bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-400 hover:shadow-xs transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Istilah Resmi
                </div>
                <h3 className="font-serif font-bold text-base text-slate-900">
                  {item.term}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.plainDefinition}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[10px] truncate max-w-[150px]">
                  {item.officialSource}
                </span>
                <span className="text-slate-900 font-semibold">Detail →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Editorial Standards & Methodology Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Komitmen Akurasi & Metodologi Editorial PajakPedia
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Setiap artikel dan simulator di PajakPedia melalui proses 5 tahap: <strong>Penyusunan Draf</strong> → <strong>Verifikasi Peraturan</strong> → <strong>Validasi Formula</strong> → <strong>Penelaahan Ahli Pajak Terdaftar</strong> → <strong>Publikasi & Pemantauan Regulasi Berkala</strong>.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => onNavigate('methodology')}
              className="px-4 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition"
            >
              Baca Metodologi Kami
            </button>
            <button
              onClick={() => onNavigate('disclaimer')}
              className="px-4 py-2.5 bg-white border border-slate-300 text-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-50 transition"
            >
              Sangkalan Hukum
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
