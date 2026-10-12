export type ArticleStatus = 'published' | 'draft' | 'review' | 'archived';

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
  credentials?: string;
}

export interface Reviewer {
  id: string;
  name: string;
  credentials: string; // e.g. "BKP (Konsultan Pajak Terdaftar), Akuntan Berpraktik"
  organization?: string;
  verifiedDate: string;
}

export interface OfficialSource {
  title: string;
  documentNumber: string;
  issuingAuthority: string;
  url: string;
  effectiveDate: string;
  relevantArticles?: string;
  status: 'berlaku' | 'diperbarui' | 'dicabut' | 'peninjauan';
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: TaxCategory;
  subcategory?: string;
  author: Author;
  reviewer?: Reviewer;
  publishedAt: string;
  updatedAt: string;
  applicablePeriod: string;
  coverImage: string;
  imageAlt: string;
  readingTimeMinutes: number;
  keyTakeaways: string[];
  content: string; // Structured HTML or markdown
  formulas?: {
    name: string;
    formula: string;
    description: string;
  }[];
  sources: OfficialSource[];
  relatedArticleSlugs: string[];
  status: ArticleStatus;
  seoTitle: string;
  metaDescription: string;
  faq?: {
    question: string;
    answer: string;
  }[];
}

export type TaxCategory =
  | 'pajak-dasar'
  | 'pph-21'
  | 'ppn'
  | 'pajak-umkm'
  | 'karyawan-freelance'
  | 'coretax'
  | 'regulasi'
  | 'keuangan-pribadi'
  | 'bisnis-administrasi';

export interface CategoryInfo {
  id: TaxCategory;
  name: string;
  slug: string;
  description: string;
  articleCount?: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  slug: string;
  plainDefinition: string;
  technicalDefinition: string;
  example: string;
  relatedTerms: string[];
  officialSource: string;
  applicablePeriod: string;
  lastReviewedDate: string;
  category: TaxCategory;
}

export interface RegulatorySourceItem {
  id: string;
  title: string;
  authority: string;
  docNumber: string;
  publicationDate: string;
  effectiveDate: string;
  lastVerifiedDate: string;
  status: 'berlaku' | 'diperbarui' | 'dicabut';
  summary: string;
  url: string;
  keyPoints: string[];
}

export interface CorrectionReport {
  id: string;
  articleSlug: string;
  articleTitle: string;
  reporterName: string;
  reporterEmail: string;
  sectionOrParagraph: string;
  suggestedCorrection: string;
  supportingSourceUrl?: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'rejected';
}

export interface AdSenseSettings {
  enabled: boolean;
  publisherId: string; // e.g. "ca-pub-0000000000000000"
  placeholderMode: boolean; // renders clean editorial placeholder when true
  showTopBanner: boolean;
  showInArticle: boolean;
  showSidebar: boolean;
}

export type PTKPStatus =
  | 'TK/0'
  | 'TK/1'
  | 'TK/2'
  | 'TK/3'
  | 'K/0'
  | 'K/1'
  | 'K/2'
  | 'K/3';

export type TERCategory = 'A' | 'B' | 'C';
