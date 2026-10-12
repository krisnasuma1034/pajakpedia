import { RegulatorySourceItem } from '../types';

export const REGULATORY_SOURCES: RegulatorySourceItem[] = [
  {
    id: 'pp-58-2023',
    title: 'Tarif Pemotongan Pajak Penghasilan Pasal 21 atas Penghasilan Sehubungan dengan Pekerjaan, Jasa, atau Kegiatan Wajib Pajak Orang Pribadi',
    authority: 'Pemerintah Republik Indonesia (Presiden)',
    docNumber: 'PP Nomor 58 Tahun 2023',
    publicationDate: '27 Desember 2023',
    effectiveDate: '1 Januari 2024',
    lastVerifiedDate: '11 Oktober 2026',
    status: 'berlaku',
    summary:
      'Mengatur skema Tarif Efektif Rata-Rata (TER) untuk pemotongan PPh 21 bulanan (TER A, TER B, TER C) dan harian, menyederhanakan perhitungan masa pajak Januari–November.',
    url: 'https://peraturan.bpk.go.id/Details/273629/pp-no-58-tahun-2023',
    keyPoints: [
      'TER Kategori A untuk PTKP TK/0, TK/1, K/0 (dimulai dari bruto > Rp 5,4 Jt)',
      'TER Kategori B untuk PTKP TK/2, TK/3, K/1, K/2 (dimulai dari bruto > Rp 6,2 Jt)',
      'TER Kategori C untuk PTKP K/3 (dimulai dari bruto > Rp 6,6 Jt)',
      'Masa Desember tetap menggunakan tarif progresif Pasal 17 ayat (1) huruf a UU PPh.',
    ],
  },
  {
    id: 'pmk-168-2023',
    title: 'Petunjuk Pelaksanaan Pemotongan Pajak atas Penghasilan Sehubungan dengan Pekerjaan, Jasa, atau Kegiatan Orang Pribadi',
    authority: 'Kementerian Keuangan Republik Indonesia',
    docNumber: 'PMK Nomor 168 Tahun 2023',
    publicationDate: '29 Desember 2023',
    effectiveDate: '1 Januari 2024',
    lastVerifiedDate: '11 Oktober 2026',
    status: 'berlaku',
    summary:
      'Peraturan turunan teknis pelaksana PP 58/2023 yang merinci tata cara pemotongan PPh Pasal 21 bagi pegawai tetap, bukan pegawai, peserta kegiatan, pensiunan, dan dewan komisaris.',
    url: 'https://jdih.kemenkeu.go.id/in/dokumen/peraturan/pmk-no-168-tahun-2023',
    keyPoints: [
      'Definisi lengkap penghasilan bruto bulanan',
      'Contoh penghitungan resmi untuk gaji, tunjangan, bonus, dan THR',
      'Ketentuan bukti potong 1721-A1 dan 1721-VIII bulanan',
    ],
  },
  {
    id: 'uu-7-2021-hpp',
    title: 'Undang-Undang tentang Harmonisasi Peraturan Perpajakan (UU HPP)',
    authority: 'Dewan Perwakilan Rakyat & Presiden RI',
    docNumber: 'UU Nomor 7 Tahun 2021',
    publicationDate: '29 Oktober 2021',
    effectiveDate: '1 Januari 2022',
    lastVerifiedDate: '11 Oktober 2026',
    status: 'berlaku',
    summary:
      'Reformasi struktural perpajakan Indonesia: menambah bracket PPh OP ke-5 (35% di atas 5M), batas peredaran bruto UMKM bebas pajak Rp 500 juta, dan kenaikan tarif PPN.',
    url: 'https://peraturan.bpk.go.id/Details/185162/uu-no-7-tahun-2021',
    keyPoints: [
      'Pasal 17: Tarif progresif 5% (s/d 60 jt), 15% (60-250 jt), 25% (250-500 jt), 30% (500 jt-5M), 35% (> 5M)',
      'Pasal 7: Batasan peredaran bruto tidak dikenai pajak Rp 500.000.000 bagi UMKM OP',
      'Pasal 2: Penggunaan NIK sebagai Nomor Pokok Wajib Pajak (NPWP)',
      'Pasal 4: Kenaikan tarif PPN menjadi 11% mulai April 2022',
    ],
  },
  {
    id: 'pp-55-2022',
    title: 'Penyesuaian Pengaturan di Bidang Pajak Penghasilan',
    authority: 'Pemerintah Republik Indonesia (Presiden)',
    docNumber: 'PP Nomor 55 Tahun 2022',
    publicationDate: '20 Desember 2022',
    effectiveDate: '20 Desember 2022',
    lastVerifiedDate: '11 Oktober 2026',
    status: 'berlaku',
    summary:
      'Mengatur kelanjutan PPh Final UMKM 0,5% (menggantikan PP 23/2018), batasan omzet bebas pajak Rp 500 juta, perlakuan natura/kenikmatan, serta jangka waktu pemanfaatan tarif final.',
    url: 'https://peraturan.bpk.go.id/Details/234676/pp-no-55-tahun-2022',
    keyPoints: [
      'Pasal 56: Tarif PPh final 0,5% dari peredaran bruto hingga Rp 4,8 Milyar/tahun',
      'Pasal 60: WP Orang Pribadi dengan omzet hingga Rp 500 juta tidak dikenai pajak',
      'Batas waktu pemanfaatan: 7 tahun (OP), 4 tahun (Badan Koperasi/CV/Firma), 3 tahun (PT)',
    ],
  },
  {
    id: 'per-06-pj-2024',
    title: 'Petunjuk Teknis Pelaksanaan Penggunaan NIK sebagai NPWP dan Penerapan Sistem Inti Administrasi Perpajakan (Coretax)',
    authority: 'Direktorat Jenderal Pajak',
    docNumber: 'PER-06/PJ/2024',
    publicationDate: '1 Juli 2024',
    effectiveDate: '1 Juli 2024',
    lastVerifiedDate: '11 Oktober 2026',
    status: 'berlaku',
    summary:
      'Pedoman teknis bagi Wajib Pajak mengenai format NPWP 16 digit, pemadanan NIK-NPWP, portal Coretax DJP, serta tata cara administrasi digital terkini.',
    url: 'https://pajak.go.id/id/peraturan/per-06-pj-2024',
    keyPoints: [
      'Format NIK 16 digit berlaku penuh sebagai NPWP Orang Pribadi Residen',
      'Wajib Pajak Badan & Instansi menggunakan NPWP 16 digit dengan angka 0 di depan',
      'Akses satu pintu ke seluruh layanan administrasi pajak melalui portal Coretax',
    ],
  },
  {
    id: 'permenaker-6-2016',
    title: 'Tunjangan Hari Raya Keagamaan Bagi Pekerja/Buruh di Perusahaan',
    authority: 'Kementerian Ketenagakerjaan Republik Indonesia',
    docNumber: 'Permenaker Nomor 6 Tahun 2016',
    publicationDate: '8 Maret 2016',
    effectiveDate: '8 Maret 2016',
    lastVerifiedDate: '11 Oktober 2026',
    status: 'berlaku',
    summary:
      'Mengatur kewajiban pengusaha memberikan THR keagamaan kepada buruh/pekerja dengan masa kerja minimal 1 bulan secara terus menerus, perhitungan prorata, serta batas waktu pembayaran H-7.',
    url: 'https://jdih.kemnaker.go.id/katalog-peraturan/peraturan-menteri/permenaker-no-6-tahun-2016',
    keyPoints: [
      'Masa kerja 12 bulan atau lebih: 1 bulan upah',
      'Masa kerja 1 s/d < 12 bulan: dihitung prorata (masa kerja / 12 × upah sebulan)',
      'Wajib dibayarkan paling lambat 7 hari sebelum hari raya keagamaan',
    ],
  },
];
