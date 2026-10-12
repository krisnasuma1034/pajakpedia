import { GlossaryTerm } from '../types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'ptkp',
    term: 'PTKP (Penghasilan Tidak Kena Pajak)',
    slug: 'ptkp',
    plainDefinition:
      'Batas penghasilan tahunan yang tidak dikenai pajak bagi Wajib Pajak Orang Pribadi. Jika penghasilan Anda di bawah angka ini, Anda tidak membayar pajak penghasilan sama sekali.',
    technicalDefinition:
      'Pengurang penghasilan neto Wajib Pajak orang pribadi dalam menghitung Penghasilan Kena Pajak (PKP) sesuai Pasal 7 UU PPh stdd UU HPP. Standar dasar WP sendiri saat ini adalah Rp 54.000.000 per tahun (TK/0).',
    example:
      'Budi lajang dan belum menikah (TK/0). Batas PTKP Budi adalah Rp 54.000.000 per tahun (atau Rp 4.500.000/bulan). Jika penghasilan neto Budi di bawah nilai tersebut, ia tidak dipotong pajak.',
    relatedTerms: ['PKP', 'PPh 21', 'TER'],
    officialSource: 'UU No. 7 Tahun 2021 (UU HPP) Pasal 7',
    applicablePeriod: 'Tahun Pajak 2024–Sekarang',
    lastReviewedDate: '11 Oktober 2026',
    category: 'pph-21',
  },
  {
    id: 'pkp',
    term: 'PKP (Penghasilan Kena Pajak)',
    slug: 'pkp',
    plainDefinition:
      'Sisa penghasilan bersih Anda setelah dikurangi batasan batas bebas pajak (PTKP) dan biaya jabatan. Angka inilah yang dikalikan dengan tarif pajak resmi.',
    technicalDefinition:
      'Dasar penghitungan untuk menentukan besarnya PPh yang terutang bagi Wajib Pajak Orang Pribadi (setelah memperhitungkan pengurang yang diperkenankan dan PTKP) atau Badan (penghasilan bruto dikurangi biaya fiskal).',
    example:
      'Penghasilan neto setahun Rp 100.000.000. Status TK/0 (PTKP Rp 54.000.000). Maka PKP = Rp 100.000.000 - Rp 54.000.000 = Rp 46.000.000. Angka Rp 46 juta inilah yang dikenai tarif PPh Pasal 17 (5%).',
    relatedTerms: ['PTKP', 'PPh 21', 'Tarif Progresif'],
    officialSource: 'UU PPh Pasal 16 & Pasal 17 stdd UU HPP',
    applicablePeriod: 'Tahun Pajak 2024–Sekarang',
    lastReviewedDate: '11 Oktober 2026',
    category: 'pph-21',
  },
  {
    id: 'ter',
    term: 'TER (Tarif Efektif Rata-Rata)',
    slug: 'ter',
    plainDefinition:
      'Tabel persentase potongan pajak bulanan langsung dari gaji kotor untuk memudahkan perusahaan memotong PPh 21 setiap bulan dari Januari hingga November.',
    technicalDefinition:
      'Metode pemotongan PPh Pasal 21 atas penghasilan bruto yang diterima pegawai tetap untuk masa pajak selain Masa Pajak Terakhir, yang dikelompokkan ke dalam TER Bulanan (Kategori A, B, C) berdasarkan status PTKP.',
    example:
      'Rina bergaji Rp 8.000.000 dengan status TK/0 (Kategori A). Berdasarkan tabel PP 58/2023, tarif TER Rina adalah 1,5%. Potongan PPh 21 bulanan = 1,5% × Rp 8.000.000 = Rp 120.000.',
    relatedTerms: ['PPh 21', 'PTKP', 'Bukti Potong'],
    officialSource: 'PP No. 58 Tahun 2023 & PMK No. 168 Tahun 2023',
    applicablePeriod: 'Berlaku sejak 1 Januari 2024',
    lastReviewedDate: '11 Oktober 2026',
    category: 'pph-21',
  },
  {
    id: 'spt',
    term: 'SPT (Surat Pemberitahuan)',
    slug: 'spt',
    plainDefinition:
      'Formulir laporan resmi yang wajib diisi dan dilaporkan oleh Wajib Pajak ke Direktorat Jenderal Pajak untuk melaporkan penghasilan, harta, kewajiban, dan pajak yang sudah dibayar.',
    technicalDefinition:
      'Surat yang oleh Wajib Pajak digunakan untuk melaporkan penghitungan dan/atau pembayaran pajak, objek pajak dan/atau bukan objek pajak, dan/atau harta dan kewajiban sesuai ketentuan perundang-undangan perpajakan (UU KUP Pasal 1 angka 11).',
    example:
      'Setiap awal tahun hingga batas waktu 31 Maret, karyawan wajib menyampaikan SPT Tahunan PPh Orang Pribadi (Formulir 1770 S atau 1770 SS) melalui sistem elektronik DJP.',
    relatedTerms: ['Coretax', 'Bukti Potong', 'NPWP'],
    officialSource: 'UU No. 28 Tahun 2007 tentang KUP Pasal 3',
    applicablePeriod: 'Berlaku Umum',
    lastReviewedDate: '11 Oktober 2026',
    category: 'pajak-dasar',
  },
  {
    id: 'bukti-potong',
    term: 'Bukti Potong (Bupot)',
    slug: 'bukti-potong',
    plainDefinition:
      'Surat atau dokumen resmi yang diberikan oleh pemberi kerja (kantor) atau pihak pembayar yang membuktikan bahwa pajak Anda sudah dipotong dan disetorkan ke kas negara.',
    technicalDefinition:
      'Formulir atau dokumen lain yang dipersamakan yang dibuat oleh Pemotong/Pemungut Pajak sebagai bukti telah dilakukannya pemotongan atau pemungutan pajak, seperti Formulir 1721-A1 (tahunan) atau Bukti Potong Bulanan.',
    example:
      'Saat hendak lapor SPT Tahunan di bulan Februari, karyawan meminta Formulir 1721-A1 ke bagian HR/Finance sebagai bukti penghasilan dan potongan pajak setahun lalu.',
    relatedTerms: ['PPh 21', 'SPT', 'Coretax'],
    officialSource: 'PMK No. 168 Tahun 2023 Pasal 17',
    applicablePeriod: 'Tahun Pajak 2024–Sekarang',
    lastReviewedDate: '11 Oktober 2026',
    category: 'pph-21',
  },
  {
    id: 'faktur-pajak',
    term: 'Faktur Pajak',
    slug: 'faktur-pajak',
    plainDefinition:
      'Bukti resmi pungutan pajak yang dibuat oleh Pengusaha Kena Pajak (PKP) saat menjual barang atau jasa yang dikenai PPN.',
    technicalDefinition:
      'Bukti pungutan pajak yang dibuat oleh Pengusaha Kena Pajak yang melakukan penyerahan Barang Kena Pajak atau penyerahan Jasa Kena Pajak sesuai Pasal 13 UU PPN, yang kini diterbitkan secara elektronik melalui e-Faktur / Coretax.',
    example:
      'Perusahaan distributor komputer menerbitkan Faktur Pajak elektronik saat mengirimkan 50 unit laptop ke klien korporasi dengan pungutan PPN 11%.',
    relatedTerms: ['PPN', 'DPP', 'PKP'],
    officialSource: 'UU PPN stdd UU No. 7 Tahun 2021 Pasal 13',
    applicablePeriod: 'Tahun Pajak 2024–Sekarang',
    lastReviewedDate: '11 Oktober 2026',
    category: 'ppn',
  },
  {
    id: 'dpp',
    term: 'DPP (Dasar Pengenaan Pajak)',
    slug: 'dpp',
    plainDefinition:
      'Nilai harga dasar barang atau jasa yang menjadi acuan pengalian tarif pajak. Jika Anda beli barang seharga Rp 111.000 sudah termasuk PPN 11%, maka DPP-nya adalah Rp 100.000.',
    technicalDefinition:
      'Jumlah Harga Jual, Penggantian, Nilai Impor, Nilai Ekspor, atau nilai lain yang dipakai sebagai dasar untuk menghitung pajak yang terutang.',
    example:
      'Untuk transaksi senilai Rp 55.500.000 (inklusif PPN 11%), DPP dihitung dengan rumus: Rp 55.500.000 ÷ 1,11 = Rp 50.000.000. PPN terutang = Rp 5.000.000.',
    relatedTerms: ['PPN', 'Faktur Pajak'],
    officialSource: 'UU PPN Pasal 1 angka 17',
    applicablePeriod: 'Tahun Pajak 2024–Sekarang',
    lastReviewedDate: '11 Oktober 2026',
    category: 'ppn',
  },
  {
    id: 'coretax',
    term: 'Coretax DJP',
    slug: 'coretax',
    plainDefinition:
      'Sistem teknologi informasi terpadu terbaru dari Direktorat Jenderal Pajak yang mengintegrasikan seluruh layanan administrasi pajak, pembayaran, pelaporan SPT, dan validasi data secara otomatis.',
    technicalDefinition:
      'Core Tax Administration System (CTAS) adalah pembaruan sistem inti administrasi perpajakan yang mengotomatisasi proses bisnis DJP, menggabungkan lebih dari 21 proses administrasi terpisah ke dalam satu ekosistem digital terpadu berbasis NIK 16 digit.',
    example:
      'Mulai masa penerapan Coretax, Wajib Pajak mengakses pembuatan kode billing, pelaporan SPT, e-Faktur, dan riwayat deposit pajak dalam satu akun portal pajak.go.id.',
    relatedTerms: ['NPWP', 'NIK', 'SPT'],
    officialSource: 'Perpres No. 40 Tahun 2018 & PER-06/PJ/2024',
    applicablePeriod: 'Penerapan Bertahap 2024–2025',
    lastReviewedDate: '11 Oktober 2026',
    category: 'coretax',
  },
  {
    id: 'npwp-16-digit',
    term: 'NPWP 16 Digit & NIK',
    slug: 'npwp-16-digit',
    plainDefinition:
      'Nomor identitas pajak baru. Bagi Warga Negara Indonesia (WNI), Nomor Induk Kependudukan (NIK) di KTP kini resmi difungsikan sebagai NPWP 16 digit setelah dilakukan pemadanan data.',
    technicalDefinition:
      'Implementasi single identity number perpajakan sesuai amanat Pasal 2 UU HPP dan PMK 112/PMK.03/2022 stdd PMK 136/2023, di mana NIK 16 digit menjadi NPWP bagi WP Orang Pribadi Penduduk.',
    example:
      'Andi yang memiliki NIK KTP 3171xxxxxxxx0001 cukup memadankan datanya di DJP Online agar NIK tersebut langsung aktif menjadi NPWP tanpa perlu kartu NPWP terpisah.',
    relatedTerms: ['Coretax', 'SPT', 'Pajak Dasar'],
    officialSource: 'PMK No. 112/PMK.03/2022 jo. PMK No. 136/2023',
    applicablePeriod: 'Berlaku Penuh',
    lastReviewedDate: '11 Oktober 2026',
    category: 'pajak-dasar',
  },
  {
    id: 'pph-final-umkm',
    term: 'PPh Final UMKM 0,5%',
    slug: 'pph-final-umkm',
    plainDefinition:
      'Skema tarif pajak ringan 0,5% bagi pelaku usaha kecil menengah dengan omzet tidak lebih dari Rp 4,8 Miliar setahun. Khusus Wajib Pajak Pribadi, omzet hingga Rp 500 Juta setahun bebas pajak.',
    technicalDefinition:
      'Perlakuan PPh bersifat final atas penghasilan dari usaha yang diterima atau diperoleh Wajib Pajak yang memiliki peredaran bruto tertentu sebagaimana diatur dalam PP No. 55 Tahun 2022 (pengganti PP 23/2018).',
    example:
      'Toko kue milik Bu Siti meraih omzet Rp 350 juta dalam setahun. Karena di bawah batas Rp 500 juta, Bu Siti membayar PPh Final sebesar Rp 0 (nihil), namun tetap wajib melaporkan realisasi omzetnya di SPT Tahunan.',
    relatedTerms: ['UMKM', 'SPT Tahunan', 'PP 55/2022'],
    officialSource: 'PP No. 55 Tahun 2022 Pasal 56 & Pasal 60',
    applicablePeriod: 'Tahun Pajak 2022–Sekarang',
    lastReviewedDate: '11 Oktober 2026',
    category: 'pajak-umkm',
  },
];
