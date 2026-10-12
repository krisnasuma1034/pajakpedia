import { CategoryInfo } from '../types';

export const TAX_CATEGORIES: CategoryInfo[] = [
  {
    id: 'pph-21',
    name: 'Pajak Penghasilan (PPh 21)',
    slug: 'pph-21',
    description: 'Panduan pemotongan PPh 21, skema TER PP 58/2023, PTKP, PKP, dan pelaporan SPT tahunan karyawan.',
  },
  {
    id: 'pajak-umkm',
    name: 'Pajak UMKM & Bisnis',
    slug: 'pajak-umkm',
    description: 'Fasilitas PPh Final 0,5% PP 55/2022, pembebasan omzet Rp 500 juta, pencatatan kas, dan kepatuhan usaha.',
  },
  {
    id: 'coretax',
    name: 'Panduan Coretax & Layanan Digital',
    slug: 'coretax',
    description: 'Integrasi NIK jadi NPWP 16 digit, pembuatan e-Billing, akses portal sistem inti administrasi perpajakan DJP.',
  },
  {
    id: 'ppn',
    name: 'Pajak Pertambahan Nilai (PPN)',
    slug: 'ppn',
    description: 'Pengenaan PPN 11%, rumus DPP inklusif/eksklusif, penerbitan Faktur Pajak, serta barang/jasa bebas PPN.',
  },
  {
    id: 'karyawan-freelance',
    name: 'Freelancer & Pekerja Mandiri',
    slug: 'karyawan-freelance',
    description: 'Norma Penghitungan Penghasilan Neto (NPPN), bukti potong berbagai pemberi kerja, dan hak pengurang pajak.',
  },
  {
    id: 'pajak-dasar',
    name: 'Dasar-Dasar Perpajakan',
    slug: 'pajak-dasar',
    description: 'Hak dan kewajiban Wajib Pajak, pemahaman NPWP, sistem self-assessment, dan filosofi gotong-royong perpajakan.',
  },
  {
    id: 'regulasi',
    name: 'Regulasi & Perubahan Aturan',
    slug: 'regulasi',
    description: 'Ikhtisar Undang-Undang perpajakan, Peraturan Pemerintah, dan Peraturan Menteri Keuangan yang sedang berlaku.',
  },
  {
    id: 'keuangan-pribadi',
    name: 'Keuangan Pribadi & Gaji',
    slug: 'keuangan-pribadi',
    description: 'Penghitungan take-home pay, potongan BPJS Ketenagakerjaan dan Kesehatan, THR, serta perencanaan tabungan.',
  },
  {
    id: 'bisnis-administrasi',
    name: 'Administrasi Bisnis & Pembukuan',
    slug: 'bisnis-administrasi',
    description: 'Format invoice, pencatatan peredaran bruto harian, manajemen dokumen, dan persiapan audit pembukuan.',
  },
];
