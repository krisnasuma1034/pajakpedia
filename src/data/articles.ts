import { Article } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-pph21-ter-2024',
    title: 'Panduan Lengkap PPh 21 Skema TER (Tarif Efektif Rata-Rata) Berdasarkan PP 58/2023 & PMK 168/2023',
    slug: 'panduan-lengkap-pph-21-ter-pp-58-2023',
    excerpt:
      'Pahami cara pemotongan PPh Pasal 21 terbaru menggunakan skema TER Bulanan Kategori A, B, dan C untuk masa Januari–November serta penghitungan masa pajak Desember.',
    category: 'pph-21',
    subcategory: 'PPh 21 Karyawan',
    author: {
      id: 'tim-edukasi-pajak',
      name: 'Tim Edukasi PajakPedia',
      role: 'Analis Kebijakan Fiskal & Pajak',
      bio: 'Spesialis riset regulasi perpajakan Indonesia dengan komitmen menyajikan panduan faktual berbasis peraturan perundang-undangan.',
      credentials: 'BKP Pratama, Praktisi Pajak Terdaftar',
    },
    reviewer: {
      id: 'rev-hendra',
      name: 'Hendra Setiawan, S.E., Ak., M.Ak., BKP',
      credentials: 'Konsultan Pajak Terdaftar (BKP Madya), Anggota IKPI',
      organization: 'Kantor Konsultan Pajak & Edukasi Fiskal',
      verifiedDate: '11 Oktober 2026',
    },
    publishedAt: '2024-01-15',
    updatedAt: '2026-10-11',
    applicablePeriod: 'Berlaku sejak 1 Januari 2024 hingga Sekarang',
    coverImage: '/images/guide-pph21-salary.jpg',
    imageAlt: 'Karyawan profesional menelaah bukti potong dan slip gaji pemotongan PPh 21 TER',
    readingTimeMinutes: 7,
    keyTakeaways: [
      'Skema TER (Tarif Efektif Rata-Rata) hanya berlaku untuk pemotongan bulanan masa Januari sampai November.',
      'Kategori TER ditentukan semata-mata oleh status PTKP pada awal tahun pajak (A, B, atau C).',
      'Pada masa pajak Desember (akhir tahun), pemotongan dihitung ulang menggunakan tarif progresif Pasal 17 UU HPP dikurangi akumulasi potongan Januari–November.',
      'Skema TER tidak menambah beban pajak tahunan, melainkan meratakan arus kas pemotongan bulanan.',
    ],
    formulas: [
      {
        name: 'Pemotongan Masa Januari - November',
        formula: 'PPh 21 Bulanan = Penghasilan Bruto Sebulan × Tarif TER yang Sesuai (%)',
        description:
          'Dihitung langsung dari seluruh penghasilan bruto yang diterima dalam satu bulan kalender tanpa mengurangi biaya jabatan atau PTKP bulanan.',
      },
      {
        name: 'Perhitungan Masa Pajak Desember',
        formula: 'PPh 21 Desember = PPh 21 Terutang Setahun (Pasal 17) - Σ PPh 21 Telah Dipotong (Jan–Nov)',
        description:
          'Menggunakan perhitungan netto setahun dikurangi PTKP setahun, lalu dikalikan tarif progresif Pasal 17 UU HPP.',
      },
    ],
    sources: [
      {
        title: 'Tarif Pemotongan Pajak Penghasilan Pasal 21 atas Penghasilan Sehubungan dengan Pekerjaan',
        documentNumber: 'PP No. 58 Tahun 2023',
        issuingAuthority: 'Pemerintah RI',
        url: 'https://peraturan.bpk.go.id/Details/273629/pp-no-58-tahun-2023',
        effectiveDate: '1 Januari 2024',
        relevantArticles: 'Pasal 2, Pasal 3, Lampiran Tabel TER A, B, C',
        status: 'berlaku',
      },
      {
        title: 'Petunjuk Pelaksanaan Pemotongan Pajak atas Penghasilan Sehubungan dengan Pekerjaan',
        documentNumber: 'PMK No. 168 Tahun 2023',
        issuingAuthority: 'Kementerian Keuangan RI',
        url: 'https://jdih.kemenkeu.go.id/in/dokumen/peraturan/pmk-no-168-tahun-2023',
        effectiveDate: '1 Januari 2024',
        relevantArticles: 'Pasal 5, Pasal 13, Lampiran Contoh Penghitungan',
        status: 'berlaku',
      },
    ],
    relatedArticleSlugs: [
      'memahami-ptkp-dan-pkp-pajak-penghasilan-orang-pribadi',
      'panduan-coretax-djp-integrasi-nik-npwp-16-digit',
    ],
    status: 'published',
    seoTitle: 'Panduan Lengkap PPh 21 Skema TER Bulanan PP 58/2023 | PajakPedia',
    metaDescription:
      'Pelajari cara menghitung pemotongan PPh 21 skema TER (Kategori A, B, C) sesuai PP 58/2023 dan PMK 168/2023 lengkap dengan simulasi masa Januari-Desember.',
    content: `
<h3>Latar Belakang Pemberlakuan Skema TER</h3>
<p>Sebelum tahun 2024, penghitungan PPh Pasal 21 bulanan mengharuskan pemberi kerja menghitung estimasi penghasilan neto disetahunkan, mengurangkan biaya jabatan serta iuran pensiun, memperhitungkan PTKP, dan mengalikan dengan tarif pasal 17 lapis demi lapis setiap bulan. Hal ini sering menimbulkan ketidakpastian dan kerumitan administrasi bagi jutaan bendahara perusahaan di Indonesia.</p>
<p>Melalui <strong>Peraturan Pemerintah Nomor 58 Tahun 2023</strong> yang mulai berlaku pada 1 Januari 2024, pemerintah menetapkan <strong>Tarif Efektif Rata-Rata (TER)</strong> yang terdiri atas TER Bulanan dan TER Harian. Tujuannya adalah memberikan kemudahan, kepastian, dan efisiensi dalam pemotongan pajak penghasilan karyawan tetap.</p>

<h3>Klasifikasi Kategori TER Bulanan</h3>
<p>TER Bulanan dibagi menjadi 3 kategori berdasarkan status Penghasilan Tidak Kena Pajak (PTKP) Wajib Pajak pada awal tahun pajak:</p>
<ul>
  <li><strong>TER Kategori A</strong>: Meliputi Wajib Pajak dengan status PTKP <strong>TK/0</strong> (Rp 54 juta), <strong>TK/1</strong> (Rp 58,5 juta), dan <strong>K/0</strong> (Rp 58,5 juta). Tarif dimulai dari 0% untuk penghasilan bruto sampai dengan Rp 5.400.000 sebulan.</li>
  <li><strong>TER Kategori B</strong>: Meliputi status PTKP <strong>TK/2</strong> (Rp 63 juta), <strong>TK/3</strong> (Rp 67,5 juta), <strong>K/1</strong> (Rp 63 juta), dan <strong>K/2</strong> (Rp 67,5 juta). Tarif dimulai dari 0% untuk penghasilan bruto sampai dengan Rp 6.200.000 sebulan.</li>
  <li><strong>TER Kategori C</strong>: Meliputi status PTKP <strong>K/3</strong> (Rp 72 juta). Tarif 0% berlaku untuk penghasilan bruto hingga Rp 6.600.000 sebulan.</li>
</ul>

<h3>Studi Kasus Penghitungan Nyata</h3>
<p><strong>Contoh 1: Pegawai Tetap dengan Gaji Tetap</strong></p>
<p>Aditya berstatus belum menikah dan tidak memiliki tanggungan (TK/0). Aditya bekerja di PT Maju Makmur dengan gaji pokok Rp 10.000.000 per bulan tanpa tunjangan tambahan lainnya.</p>
<ol>
  <li>Status TK/0 masuk ke dalam <strong>TER Kategori A</strong>.</li>
  <li>Berdasarkan tabel lampiran PP 58/2023, penghasilan bruto Rp 10.000.000 berada pada rentang di atas Rp 9.650.000 s/d Rp 10.050.000 dengan tarif <strong>2,00%</strong>.</li>
  <li>Pemotongan PPh 21 per bulan (Januari s/d November): 2,00% × Rp 10.000.000 = <strong>Rp 200.000</strong> per bulan.</li>
  <li>Akumulasi potongan Jan–Nov (11 bulan) = 11 × Rp 200.000 = Rp 2.200.000.</li>
  <li><strong>Penghitungan Masa Desember</strong>:
    <ul>
      <li>Bruto setahun = 12 × Rp 10.000.000 = Rp 120.000.000</li>
      <li>Biaya Jabatan (5%, maks 6 jt) = Rp 6.000.000</li>
      <li>Penghasilan Neto Setahun = Rp 114.000.000</li>
      <li>PTKP (TK/0) = Rp 54.000.000</li>
      <li>PKP (Penghasilan Kena Pajak) = Rp 60.000.000</li>
      <li>PPh 21 Terutang Setahun (5% × 60 jt) = Rp 3.000.000</li>
      <li>Potongan Masa Desember = Rp 3.000.000 - Rp 2.200.000 = <strong>Rp 800.000</strong>.</li>
    </ul>
  </li>
</ol>
<p>Dari simulasi di atas, terlihat bahwa total pajak yang dipotong sepanjang 12 bulan tetap persis Rp 3.000.000 sesuai ketentuan Undang-Undang PPh.</p>
    `,
    faq: [
      {
        question: 'Apakah skema TER menaikkan total pajak yang saya bayar dalam setahun?',
        answer:
          'Tidak. Skema TER hanya metode penentuan potongan bulanan. Pada akhir tahun (masa Desember), total pajak dihitung ulang dengan tarif Pasal 17 UU PPh. Total beban pajak setahun Anda tetap sama.',
      },
      {
        question: 'Mengapa potongan pajak di bulan Desember seringkali berbeda dari bulan-bulan sebelumnya?',
        answer:
          'Karena bulan Desember berfungsi sebagai masa penyesuaian (true-up). Kantor Anda akan menghitung total pajak terutang setahun penuh berdasarkan penghasilan riil, lalu mengurangkannya dengan jumlah yang sudah dipotong dari Januari hingga November.',
      },
    ],
  },
  {
    id: 'art-umkm-pp55-2022',
    title: 'Pajak UMKM 0,5%: Batasan Omzet Bebas Pajak Rp 500 Juta dan Cara Menghitungnya',
    slug: 'pajak-umkm-0-5-bebas-pajak-500-juta',
    excerpt:
      'Panduan lengkap pemanfaatan PPh Final 0,5% bagi UMKM berdasarkan PP 55/2022. Ketahui hak bebas pajak omzet Rp 500 juta untuk wajib pajak orang pribadi.',
    category: 'pajak-umkm',
    subcategory: 'PPh Final UMKM',
    author: {
      id: 'tim-edukasi-pajak',
      name: 'Tim Edukasi PajakPedia',
      role: 'Analis Kebijakan Fiskal & Pajak',
      bio: 'Spesialis riset regulasi perpajakan Indonesia.',
      credentials: 'BKP Pratama, Praktisi Pajak Terdaftar',
    },
    reviewer: {
      id: 'rev-hendra',
      name: 'Hendra Setiawan, S.E., Ak., M.Ak., BKP',
      credentials: 'Konsultan Pajak Terdaftar (BKP Madya), Anggota IKPI',
      organization: 'Kantor Konsultan Pajak & Edukasi Fiskal',
      verifiedDate: '11 Oktober 2026',
    },
    publishedAt: '2024-02-10',
    updatedAt: '2026-10-11',
    applicablePeriod: 'Berlaku Berdasarkan UU HPP & PP No. 55/2022',
    coverImage: '/images/guide-umkm-business.jpg',
    imageAlt: 'Pelaku usaha UMKM mengelola pembukuan dan catatan peredaran bruto harian di toko',
    readingTimeMinutes: 6,
    keyTakeaways: [
      'Wajib Pajak Orang Pribadi UMKM mendapat fasilitas batas peredaran bruto tidak kena pajak sampai dengan Rp 500.000.000 per tahun.',
      'PPh Final 0,5% hanya dibayarkan atas porsi omzet yang melebihi Rp 500 juta dalam tahun kalender berjalan.',
      'Wajib Pajak Badan (PT, CV, Koperasi) TIDAK mendapatkan fasilitas bebas Rp 500 juta (langsung bayar 0,5% dari omzet pertama).',
      'Pemanfaatan tarif final 0,5% memiliki batas waktu: 7 tahun untuk Orang Pribadi, 4 tahun untuk CV/Koperasi, dan 3 tahun untuk PT.',
    ],
    formulas: [
      {
        name: 'Omzet Orang Pribadi Melebihi Rp 500 Juta',
        formula: 'PPh Final 0,5% = (Peredaran Bruto Kumulatif - Rp 500.000.000) × 0,5%',
        description:
          'Dihitung pada bulan di mana akumulasi omzet mulai melampaui Rp 500 juta dan bulan-bulan berikutnya dalam tahun pajak yang sama.',
      },
    ],
    sources: [
      {
        title: 'Penyesuaian Pengaturan di Bidang Pajak Penghasilan',
        documentNumber: 'PP No. 55 Tahun 2022',
        issuingAuthority: 'Pemerintah RI',
        url: 'https://peraturan.bpk.go.id/Details/234676/pp-no-55-tahun-2022',
        effectiveDate: '20 Desember 2022',
        relevantArticles: 'Pasal 56 s/d Pasal 61',
        status: 'berlaku',
      },
      {
        title: 'Undang-Undang Harmonisasi Peraturan Perpajakan',
        documentNumber: 'UU No. 7 Tahun 2021',
        issuingAuthority: 'DPR & Presiden RI',
        url: 'https://peraturan.bpk.go.id/Details/185162/uu-no-7-tahun-2021',
        effectiveDate: '1 Januari 2022',
        relevantArticles: 'Pasal 7 ayat (2a)',
        status: 'berlaku',
      },
    ],
    relatedArticleSlugs: [
      'dasar-dasar-ppn-dpp-faktur-dan-barang-bebas-pajak',
      'panduan-coretax-djp-integrasi-nik-npwp-16-digit',
    ],
    status: 'published',
    seoTitle: 'Pajak UMKM 0,5%: Aturan Batas Omzet Bebas Pajak Rp 500 Juta | PajakPedia',
    metaDescription:
      'Simulasi dan aturan resmi PPh Final UMKM 0,5% PP 55/2022. Cara menghitung omzet bebas pajak Rp 500 juta untuk wajib pajak orang pribadi dan batas waktu tarif.',
    content: `
<h3>Fasilitas Afirmatif bagi Pelaku Usaha Mikro dan Kecil</h3>
<p>Salah satu terobosan paling berpihak pada rakyat kecil dalam <strong>Undang-Undang Harmonisasi Peraturan Perpajakan (UU HPP)</strong> dan ditegaskan kembali dalam <strong>Peraturan Pemerintah Nomor 55 Tahun 2022</strong> adalah pembebasan pajak atas omzet usaha hingga <strong>Rp 500.000.000</strong> per tahun untuk Wajib Pajak Orang Pribadi.</p>
<p>Artinya, jika Anda memiliki warung, coffee shop, toko online, atau usaha perorangan lainnya dengan pendapatan kotor setahun di bawah setengah miliar rupiah, Anda <strong>tidak perlu menyetorkan PPh Final sepeser pun (Rp 0)</strong>.</p>

<h3>Bagaimana Cara Perhitungan Kumulatifnya?</h3>
<p>Perhitungan dilakukan secara akumulatif sejak bulan Januari sampai Desember tahun kalender yang bersangkutan:</p>
<ul>
  <li>Selama total omzet kumulatif belum melampaui Rp 500.000.000, setoran PPh Final tiap bulannya adalah NIHIL.</li>
  <li>Pada bulan ketika omzet kumulatif melewati angka Rp 500.000.000, pajak 0,5% hanya dikenakan atas <em>selisih kelebihannya</em>.</li>
  <li>Untuk bulan-bulan setelahnya di tahun yang sama, pajak 0,5% dikenakan penuh atas omzet bulan bersangkutan.</li>
</ul>

<h3>Perbedaan Penting: Orang Pribadi vs Badan Usaha</h3>
<p>Banyak pengusaha pemula yang keliru menganggap fasilitas Rp 500 juta ini berlaku untuk semua entitas usaha. Perlu dicatat dengan tegas:</p>
<ul>
  <li><strong>Wajib Pajak Orang Pribadi</strong>: Mendapat pembebasan omzet Rp 500 juta pertama. Jangka waktu pemanfaatan tarif 0,5% maksimal <strong>7 tahun pajak</strong>.</li>
  <li><strong>CV, Firma, Koperasi</strong>: <em>Tidak mendapat fasilitas pembebasan</em> Rp 500 juta. Setiap rupiah omzet langsung dikenakan 0,5%. Batas waktu pemanfaatan maksimal <strong>4 tahun pajak</strong>.</li>
  <li><strong>Perseroan Terbatas (PT)</strong>: Tidak mendapat fasilitas pembebasan Rp 500 juta. Batas waktu pemanfaatan tarif final maksimal <strong>3 tahun pajak</strong>. Setelah itu wajib menggunakan tarif umum Pasal 17 dengan pembukuan.</li>
</ul>
    `,
    faq: [
      {
        question: 'Jika omzet saya di bawah Rp 500 juta, apakah saya tetap wajib lapor SPT Tahunan?',
        answer:
          'Ya, tetap wajib. Anda tetap wajib melaporkan realisasi omzet bulanan Anda pada formulir lampiran SPT Tahunan PPh Orang Pribadi, meskipun status pajaknya nihil.',
      },
    ],
  },
  {
    id: 'art-coretax-nik-npwp',
    title: 'Coretax DJP: Panduan Integrasi NIK Jadi NPWP 16 Digit dan Layanan Digital Pajak',
    slug: 'panduan-coretax-djp-integrasi-nik-npwp-16-digit',
    excerpt:
      'Panduan teknis penerapan sistem Coretax DJP dan aktivasi NIK sebagai NPWP 16 digit sesuai PER-06/PJ/2024. Tata cara pembuatan billing dan akses terpadu.',
    category: 'coretax',
    subcategory: 'Layanan Digital Pajak',
    author: {
      id: 'tim-edukasi-pajak',
      name: 'Tim Edukasi PajakPedia',
      role: 'Analis Kebijakan Fiskal & Pajak',
      bio: 'Spesialis riset regulasi perpajakan Indonesia.',
      credentials: 'BKP Pratama, Praktisi Pajak Terdaftar',
    },
    reviewer: {
      id: 'rev-hendra',
      name: 'Hendra Setiawan, S.E., Ak., M.Ak., BKP',
      credentials: 'Konsultan Pajak Terdaftar (BKP Madya), Anggota IKPI',
      organization: 'Kantor Konsultan Pajak & Edukasi Fiskal',
      verifiedDate: '11 Oktober 2026',
    },
    publishedAt: '2024-07-05',
    updatedAt: '2026-10-11',
    applicablePeriod: 'Berlaku Penuh Sesuai PER-06/PJ/2024',
    coverImage: '/images/guide-coretax-digital.jpg',
    imageAlt: 'Tampilan antarmuka sistem terpadu Coretax DJP pada perangkat komputer modern',
    readingTimeMinutes: 5,
    keyTakeaways: [
      'NIK pada KTP secara resmi berfungsi sebagai NPWP 16 digit bagi penduduk Indonesia.',
      'Sistem Coretax menyatukan puluhan aplikasi terpisah (e-Filing, e-Billing, e-Bupot, e-Faktur) ke dalam satu portal terpadu.',
      'Wajib Pajak Badan menggunakan format NPWP 16 digit dengan menambahkan angka 0 di depan 15 digit lama.',
      'Akun Wajib Pajak kini dilengkapi fitur Deposit Pajak (Tax Deposit Account) untuk mempermudah penyetoran.',
    ],
    sources: [
      {
        title: 'Petunjuk Teknis Penggunaan NIK sebagai NPWP dan Penerapan Sistem Inti Administrasi Perpajakan',
        documentNumber: 'PER-06/PJ/2024',
        issuingAuthority: 'Direktorat Jenderal Pajak',
        url: 'https://pajak.go.id/id/peraturan/per-06-pj-2024',
        effectiveDate: '1 Juli 2024',
        relevantArticles: 'Pasal 2 s/d Pasal 8',
        status: 'berlaku',
      },
    ],
    relatedArticleSlugs: [
      'panduan-lengkap-pph-21-ter-pp-58-2023',
      'pajak-umkm-0-5-bebas-pajak-500-juta',
    ],
    status: 'published',
    seoTitle: 'Panduan Coretax DJP & Integrasi NIK Jadi NPWP 16 Digit | PajakPedia',
    metaDescription:
      'Langkah aktivasi NIK jadi NPWP 16 digit dan panduan menggunakan portal sistem administrasi terpadu Coretax DJP resmi berdasarkan PER-06/PJ/2024.',
    content: `
<h3>Apa Itu Sistem Coretax DJP?</h3>
<p><strong>Core Tax Administration System (CTAS)</strong> atau yang dikenal luas dengan sebutan <strong>Coretax</strong> adalah pembaruan menyeluruh sistem teknologi informasi Direktorat Jenderal Pajak. Coretax dirancang untuk menggantikan arsitektur SIDJP lama yang telah beroperasi selama puluhan tahun.</p>
<p>Sebelum Coretax, Wajib Pajak harus berpindah-pindah platform untuk memenuhi kewajibannya: mengakses DJP Online untuk e-Filing, membuka aplikasi terpisah untuk e-Faktur, menggunakan e-Bupot untuk bukti potong, dan meminta kode billing secara terpisah. Coretax menyatukan 21 proses bisnis inti perpajakan ke dalam satu gerbang digital.</p>

<h3>Integrasi NIK sebagai NPWP 16 Digit</h3>
<p>Sesuai mandat UU HPP dan PER-06/PJ/2024, Indonesia secara resmi menerapkan <em>Single Identity Number</em> untuk administrasi perpajakan:</p>
<ol>
  <li><strong>Wajib Pajak Orang Pribadi Residen</strong>: Menggunakan NIK 16 digit yang tertera pada e-KTP.</li>
  <li><strong>Wajib Pajak Badan, Instansi Pemerintah, dan Orang Pribadi Non-Residen</strong>: Menggunakan NPWP 16 digit dengan format penambahan angka '0' di depan 15 digit NPWP lama.</li>
  <li><strong>Cabang (Nomor Identitas Tempat Kegiatan Usaha / NITKU)</strong>: Menggantikan fungsi NPWP Cabang untuk keperluan administrasi lokasi usaha terpisah.</li>
</ol>
    `,
    faq: [
      {
        question: 'Apakah setiap orang yang memiliki NIK otomatis wajib membayar pajak?',
        answer:
          'Tidak. Penggunaan NIK sebagai NPWP tidak berarti semua pemilik KTP wajib membayar pajak. Kewajiban membayar pajak hanya berlaku jika penghasilan Anda telah melampaui Penghasilan Tidak Kena Pajak (PTKP).',
      },
    ],
  },
  {
    id: 'art-ptkp-pkp-simulasi',
    title: 'Memahami PTKP dan PKP: Simulasi Penghitungan Pajak Penghasilan Orang Pribadi',
    slug: 'memahami-ptkp-dan-pkp-pajak-penghasilan-orang-pribadi',
    excerpt:
      'Pelajari perbedaan mendasar antara PTKP dan PKP beserta 5 lapis tarif progresif PPh Orang Pribadi Pasal 17 UU HPP lengkap dengan studi kasus.',
    category: 'pph-21',
    subcategory: 'Konsep Dasar Pajak',
    author: {
      id: 'tim-edukasi-pajak',
      name: 'Tim Edukasi PajakPedia',
      role: 'Analis Kebijakan Fiskal & Pajak',
      bio: 'Spesialis riset regulasi perpajakan Indonesia.',
      credentials: 'BKP Pratama, Praktisi Pajak Terdaftar',
    },
    reviewer: {
      id: 'rev-hendra',
      name: 'Hendra Setiawan, S.E., Ak., M.Ak., BKP',
      credentials: 'Konsultan Pajak Terdaftar (BKP Madya), Anggota IKPI',
      organization: 'Kantor Konsultan Pajak & Edukasi Fiskal',
      verifiedDate: '11 Oktober 2026',
    },
    publishedAt: '2024-03-01',
    updatedAt: '2026-10-11',
    applicablePeriod: 'Berlaku Berdasarkan UU HPP No. 7/2021',
    coverImage: '/images/hero-tax-desk.jpg',
    imageAlt: 'Perhitungan penghasilan kena pajak dan simulasi tarif progresif di meja kerja',
    readingTimeMinutes: 5,
    keyTakeaways: [
      'PTKP adalah batas penghasilan bebas pajak; PKP adalah sisa penghasilan bersih yang menjadi dasar pengenaan tarif.',
      'Besaran standar PTKP dasar untuk diri Wajib Pajak sendiri adalah Rp 54.000.000 per tahun.',
      'Tambahan status kawin adalah Rp 4.500.000 per tahun, dan tambahan setiap tanggungan sedarah semenda (maksimal 3 orang) adalah Rp 4.500.000.',
      'UU HPP memperluas lapis tarif 5% dari sebelumnya Rp 50 juta menjadi Rp 60 juta, memberikan keringanan bagi pekerja kelas menengah.',
    ],
    sources: [
      {
        title: 'Undang-Undang Harmonisasi Peraturan Perpajakan',
        documentNumber: 'UU No. 7 Tahun 2021',
        issuingAuthority: 'DPR & Presiden RI',
        url: 'https://peraturan.bpk.go.id/Details/185162/uu-no-7-tahun-2021',
        effectiveDate: '1 Januari 2022',
        relevantArticles: 'Pasal 7 & Pasal 17',
        status: 'berlaku',
      },
    ],
    relatedArticleSlugs: [
      'panduan-lengkap-pph-21-ter-pp-58-2023',
      'pajak-umkm-0-5-bebas-pajak-500-juta',
    ],
    status: 'published',
    seoTitle: 'Memahami PTKP dan PKP Pajak Penghasilan Orang Pribadi | PajakPedia',
    metaDescription:
      'Penjelasan lengkap daftar PTKP 2024, rumus menghitung Penghasilan Kena Pajak (PKP), dan 5 bracket tarif progresif PPh Pasal 17 UU HPP.',
    content: `
<h3>Konsep Dasar: Menghindari Pajak atas Kebutuhan Hidup Dasar</h3>
<p>Dalam prinsip keadilan fiskal, negara tidak boleh memungut pajak atas bagian pendapatan yang dibutuhkan oleh seseorang untuk memenuhi kebutuhan hidup paling mendasar (pangan, papan, sandang). Itulah esensi dari <strong>Penghasilan Tidak Kena Pajak (PTKP)</strong>.</p>
<p>Setelah seluruh pendapatan neto setahun dikurangi dengan nilai PTKP, sisanya disebut sebagai <strong>Penghasilan Kena Pajak (PKP)</strong>. Jika hasil pengurangan tersebut adalah nol atau negatif, maka Wajib Pajak tidak memiliki kewajiban membayar pajak.</p>

<h3>Daftar Besaran PTKP Terbaru</h3>
<table class="w-full text-sm text-left my-4 border border-slate-200">
  <thead class="bg-slate-100 font-semibold text-slate-800">
    <tr>
      <th class="p-3 border-b">Kode Status</th>
      <th class="p-3 border-b">Uraian Status Wajib Pajak</th>
      <th class="p-3 border-b">Besaran PTKP / Tahun</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b"><td class="p-3 font-mono font-medium">TK/0</td><td class="p-3">Tidak Kawin, tanpa tanggungan</td><td class="p-3 font-mono">Rp 54.000.000</td></tr>
    <tr class="border-b"><td class="p-3 font-mono font-medium">TK/1</td><td class="p-3">Tidak Kawin, 1 tanggungan</td><td class="p-3 font-mono">Rp 58.500.000</td></tr>
    <tr class="border-b"><td class="p-3 font-mono font-medium">K/0</td><td class="p-3">Kawin, tanpa tanggungan</td><td class="p-3 font-mono">Rp 58.500.000</td></tr>
    <tr class="border-b"><td class="p-3 font-mono font-medium">K/1</td><td class="p-3">Kawin, 1 tanggungan</td><td class="p-3 font-mono">Rp 63.000.000</td></tr>
    <tr class="border-b"><td class="p-3 font-mono font-medium">K/2</td><td class="p-3">Kawin, 2 tanggungan</td><td class="p-3 font-mono">Rp 67.500.000</td></tr>
    <tr class="border-b"><td class="p-3 font-mono font-medium">K/3</td><td class="p-3">Kawin, 3 tanggungan (maksimal)</td><td class="p-3 font-mono">Rp 72.000.000</td></tr>
  </tbody>
</table>

<h3>5 Bracket Tarif Progresif Pasal 17 UU HPP</h3>
<ol>
  <li><strong>Lapis 1 (5%)</strong>: PKP Rp 0 sampai dengan Rp 60.000.000.</li>
  <li><strong>Lapis 2 (15%)</strong>: PKP di atas Rp 60.000.000 sampai dengan Rp 250.000.000.</li>
  <li><strong>Lapis 3 (25%)</strong>: PKP di atas Rp 250.000.000 sampai dengan Rp 500.000.000.</li>
  <li><strong>Lapis 4 (30%)</strong>: PKP di atas Rp 500.000.000 sampai dengan Rp 5.000.000.000 (5 Miliar).</li>
  <li><strong>Lapis 5 (35%)</strong>: PKP di atas Rp 5.000.000.000.</li>
</ol>
    `,
  },
  {
    id: 'art-ppn-dpp-dasar',
    title: 'Dasar-Dasar PPN: Mengenal DPP, Faktur Pajak, dan Barang/Jasa Bebas PPN',
    slug: 'dasar-dasar-ppn-dpp-faktur-dan-barang-bebas-pajak',
    excerpt:
      'Penjelasan komprehensif mengenai mekanisme Pajak Pertambahan Nilai (PPN), cara menghitung DPP inklusif dan eksklusif, serta daftar barang kebutuhan pokok yang dibebaskan.',
    category: 'ppn',
    subcategory: 'Pajak Konsumsi',
    author: {
      id: 'tim-edukasi-pajak',
      name: 'Tim Edukasi PajakPedia',
      role: 'Analis Kebijakan Fiskal & Pajak',
      bio: 'Spesialis riset regulasi perpajakan Indonesia.',
      credentials: 'BKP Pratama, Praktisi Pajak Terdaftar',
    },
    reviewer: {
      id: 'rev-hendra',
      name: 'Hendra Setiawan, S.E., Ak., M.Ak., BKP',
      credentials: 'Konsultan Pajak Terdaftar (BKP Madya), Anggota IKPI',
      organization: 'Kantor Konsultan Pajak & Edukasi Fiskal',
      verifiedDate: '11 Oktober 2026',
    },
    publishedAt: '2024-04-12',
    updatedAt: '2026-10-11',
    applicablePeriod: 'Berlaku Berdasarkan UU HPP No. 7/2021',
    coverImage: '/images/guide-umkm-business.jpg',
    imageAlt: 'Penerbitan faktur pajak dan perhitungan dasar pengenaan pajak atas transaksi penjualan',
    readingTimeMinutes: 5,
    keyTakeaways: [
      'PPN adalah pajak tidak langsung yang dipungut atas konsumsi barang dan jasa di dalam Daerah Pabean.',
      'Tarif PPN umum yang berlaku berdasarkan UU HPP adalah 11%.',
      'DPP (Dasar Pengenaan Pajak) adalah nilai dasar sebelum pajak: jika harga inklusif, rumusnya Nilai ÷ 1,11.',
      'Kebutuhan pokok beras, daging, sayuran segar, jasa kesehatan medis, dan jasa pendidikan dibebaskan dari pengenaan PPN untuk menjaga daya beli rakyat.',
    ],
    sources: [
      {
        title: 'Undang-Undang Harmonisasi Peraturan Perpajakan (Klaster PPN)',
        documentNumber: 'UU No. 7 Tahun 2021',
        issuingAuthority: 'DPR & Presiden RI',
        url: 'https://peraturan.bpk.go.id/Details/185162/uu-no-7-tahun-2021',
        effectiveDate: '1 April 2022',
        relevantArticles: 'Pasal 4, Pasal 7, Pasal 13',
        status: 'berlaku',
      },
    ],
    relatedArticleSlugs: [
      'pajak-umkm-0-5-bebas-pajak-500-juta',
      'memahami-ptkp-dan-pkp-pajak-penghasilan-orang-pribadi',
    ],
    status: 'published',
    seoTitle: 'Panduan Dasar PPN 11%: Cara Hitung DPP dan Faktur Pajak | PajakPedia',
    metaDescription:
      'Pahami cara menghitung PPN 11% harga inklusif vs eksklusif, mekanisme Faktur Pajak, dan kelompok barang serta jasa yang dibebaskan dari PPN.',
    content: `
<h3>Mekanisme Pengenaan PPN di Indonesia</h3>
<p>Pajak Pertambahan Nilai (PPN) adalah pajak atas konsumsi barang dan jasa di dalam wilayah Indonesia. Karakteristik utama PPN adalah:</p>
<ul>
  <li><strong>Pajak Tidak Langsung</strong>: Konsumen akhir yang memikul beban pajak, namun pihak penjual (Pengusaha Kena Pajak / PKP) yang berkewajiban memungut dan menyetorkannya ke kas negara.</li>
  <li><strong>Multi-stage Tax</strong>: Dikenakan pada setiap mata rantai jalur produksi dan distribusi, namun tidak bersifat kumulatif karena menggunakan mekanisme pengkreditan Pajak Masukan terhadap Pajak Keluaran.</li>
</ul>

<h3>Rumus DPP: Inklusif vs Eksklusif</h3>
<p>Dalam transaksi perdagangan, ada dua cara penulisan harga:</p>
<ol>
  <li><strong>Harga Belum Termasuk PPN (Eksklusif)</strong>:<br/>
  DPP = Nilai Barang.<br/>
  PPN = 11% × DPP.<br/>
  Total Tagihan = DPP + PPN.
  </li>
  <li><strong>Harga Sudah Termasuk PPN (Inklusif)</strong>:<br/>
  DPP = Total Tagihan ÷ 1,11.<br/>
  PPN = Total Tagihan - DPP (atau 11/111 × Total Tagihan).
  </li>
</ol>
    `,
  },
  {
    id: 'art-pajak-freelancer-nppn',
    title: 'Pajak Freelancer & Pekerja Bebas: Panduan Norma Penghitungan (NPPN)',
    slug: 'pajak-freelancer-dan-pekerja-bebas-panduan-nppn',
    excerpt:
      'Bagi konsultan, desainer, programmer independen, dan penulis: pelajari cara menggunakan Norma Penghitungan Penghasilan Neto (NPPN) tanpa harus pembukuan rumit.',
    category: 'karyawan-freelance',
    subcategory: 'Pekerja Bebas',
    author: {
      id: 'tim-edukasi-pajak',
      name: 'Tim Edukasi PajakPedia',
      role: 'Analis Kebijakan Fiskal & Pajak',
      bio: 'Spesialis riset regulasi perpajakan Indonesia.',
      credentials: 'BKP Pratama, Praktisi Pajak Terdaftar',
    },
    reviewer: {
      id: 'rev-hendra',
      name: 'Hendra Setiawan, S.E., Ak., M.Ak., BKP',
      credentials: 'Konsultan Pajak Terdaftar (BKP Madya), Anggota IKPI',
      organization: 'Kantor Konsultan Pajak & Edukasi Fiskal',
      verifiedDate: '11 Oktober 2026',
    },
    publishedAt: '2024-05-18',
    updatedAt: '2026-10-11',
    applicablePeriod: 'Berlaku Sesuai PER-17/PJ/2015 & UU HPP',
    coverImage: '/images/hero-tax-desk.jpg',
    imageAlt: 'Freelancer bekerja mandiri menghitung penghasilan neto menggunakan norma penghitungan',
    readingTimeMinutes: 6,
    keyTakeaways: [
      'Pekerja bebas bukan karyawan berhak menggunakan Norma Penghitungan Penghasilan Neto (NPPN) jika peredaran bruto setahun di bawah Rp 4,8 Miliar.',
      'Wajib memberitahukan penggunaan NPPN ke DJP paling lambat 3 bulan pertama tahun pajak (31 Maret).',
      'Persentase norma mencerminkan estimasi biaya operasional yang diakui negara tanpa perlu bukti kwitansi satu per satu.',
      'Setelah penghasilan neto diperoleh dari perkalian norma, barulah dikurangi PTKP dan dihitung dengan tarif progresif Pasal 17.',
    ],
    sources: [
      {
        title: 'Norma Penghitungan Penghasilan Neto',
        documentNumber: 'PER-17/PJ/2015',
        issuingAuthority: 'Direktorat Jenderal Pajak',
        url: 'https://pajak.go.id/id/peraturan/per-17-pj-2015',
        effectiveDate: '1 Januari 2016',
        relevantArticles: 'Pasal 2, Pasal 3, Lampiran Daftar Persentase Norma',
        status: 'berlaku',
      },
      {
        title: 'Undang-Undang Pajak Penghasilan',
        documentNumber: 'UU No. 36 Tahun 2008 stdd UU No. 7 Tahun 2021',
        issuingAuthority: 'DPR & Presiden RI',
        url: 'https://peraturan.bpk.go.id/Details/185162/uu-no-7-tahun-2021',
        effectiveDate: '1 Januari 2022',
        relevantArticles: 'Pasal 14',
        status: 'berlaku',
      },
    ],
    relatedArticleSlugs: [
      'memahami-ptkp-dan-pkp-pajak-penghasilan-orang-pribadi',
      'panduan-lengkap-pph-21-ter-pp-58-2023',
    ],
    status: 'published',
    seoTitle: 'Panduan Pajak Freelancer: Menghitung Penghasilan Neto dengan NPPN | PajakPedia',
    metaDescription:
      'Cara menghitung pajak freelancer dan pekerja mandiri menggunakan Norma Penghitungan Penghasilan Neto (NPPN), syarat pemberitahuan ke DJP, dan contoh kasus.',
    content: `
<h3>Siapa yang Termasuk Pekerja Bebas?</h3>
<p>Pekerja bebas (freelancer) dalam undang-undang perpajakan dikategorikan sebagai orang pribadi yang melakukan pekerjaan bebas, misalnya: dokter, konsultan, pengacara, akuntan, arsitek, programmer freelance, desainer grafis, penerjemah, dan konten kreator independen.</p>
<p>Karena mereka tidak bekerja dengan ikatan kerja tetap, mereka tidak mendapat slip gaji bulanan dari satu kantor saja, melainkan menerima honorarium dari berbagai klien.</p>

<h3>Kemudahan NPPN (Norma Penghitungan)</h3>
<p>Bagi freelancer dengan penghasilan bruto di bawah Rp 4,8 Miliar per tahun, negara tidak mewajibkan pembukuan akuntansi yang rumit (neraca dan laba-rugi formal). Sebagai gantinya, mereka cukup melakukan <strong>pencatatan peredaran bruto</strong> dan menghitung penghasilan neto menggunakan <strong>NPPN (Norma Penghitungan Penghasilan Neto)</strong>.</p>
<p>Contoh persentase norma untuk beberapa profesi di 10 ibukota provinsi (PER-17/PJ/2015):</p>
<ul>
  <li>Jasa Konsultan Manajemen: 50%</li>
  <li>Jasa Teknologi Informasi / Software: 50%</li>
  <li>Jasa Desain dan Periklanan: 50%</li>
  <li>Pekerja Seni / Penulis: 50%</li>
</ul>
<p>Artinya, negara mengakui bahwa 50% dari pendapatan kotor Anda adalah biaya operasional (laptop, internet, listrik, riset), sehingga hanya 50% sisanya yang dianggap sebagai penghasilan bersih (neto) sebelum dikurangi PTKP.</p>
    `,
  },
];
