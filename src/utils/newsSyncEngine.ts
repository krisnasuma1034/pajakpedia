import { ExternalNewsItem, NewsSource, NewsSyncLog, EditorialDraft, NewsCategory } from '../types';

/**
 * Utility to strip dangerous HTML and clean up CDATA / XML text
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalizes URL for deduplication by removing tracking params
 */
export function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Keep essential path and params, strip tracking UTM & fbclid
    const searchParams = new URLSearchParams(parsed.search);
    const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'];
    trackingParams.forEach((param) => searchParams.delete(param));

    parsed.search = searchParams.toString();
    parsed.hash = '';
    return parsed.toString().replace(/\/+$/, '');
  } catch {
    return url.trim().replace(/\/+$/, '');
  }
}

/**
 * Normalized string fingerprint for title comparison
 */
export function createTitleFingerprint(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 80);
}

/**
 * Classifies news into tax category based on Indonesian tax keywords
 */
export function classifyTaxCategory(title: string, content: string): NewsCategory {
  const combined = `${title} ${content}`.toLowerCase();

  if (combined.includes('coretax') || combined.includes('nik-npwp') || combined.includes('npwp 16 digit')) {
    return 'coretax';
  }
  if (combined.includes('umkm') || combined.includes('usaha mikro') || combined.includes('omzet 500')) {
    return 'pajak-umkm';
  }
  if (combined.includes('pph 21') || combined.includes('ter ') || combined.includes('ppn') || combined.includes('faktur pajak')) {
    return 'pph-ppn';
  }
  if (combined.includes('undang-undang') || combined.includes('peraturan pemerintah') || combined.includes('pmk') || combined.includes('uu hpp')) {
    return 'regulasi';
  }
  if (combined.includes('apbn') || combined.includes('penerimaan negara') || combined.includes('fiskal') || combined.includes('kemenkeu')) {
    return 'fiskal';
  }
  if (combined.includes('siaran pers') || combined.includes('pengumuman') || combined.includes('imbauan djp')) {
    return 'pengumuman';
  }
  return 'bisnis';
}

/**
 * Checks if a news item is relevant to taxation, business compliance, or fiscal policy
 */
export function isTaxOrEconomyRelevant(title: string, summary: string): boolean {
  const text = `${title} ${summary}`.toLowerCase();
  const taxKeywords = [
    'pajak', 'fiskal', 'djp', 'kemenkeu', 'cukai', 'pph', 'ppn',
    'apbn', 'anggaran', 'coretax', 'npwp', 'ptkp', 'pkp', 'bupot',
    'umkm', 'faktur', 'retribusi', 'penerimaan', 'keuangan', 'spt',
    'tarif', 'ekonomi', 'bisnis', 'investasi', 'neraca', 'devisa',
  ];
  return taxKeywords.some((kw) => text.includes(kw));
}

/**
 * Robust XML RSS / Atom parser running safely without heavy external binaries
 */
export function parseRssXml(xmlString: string, source: NewsSource): Omit<ExternalNewsItem, 'id' | 'fetchedAt' | 'verificationStatus' | 'editorialStatus' | 'isDuplicate' | 'isExternal'>[] {
  const results: any[] = [];

  // Match all <item> or <entry> elements
  const itemRegex = /<(?:item|entry)[\s>]([\s\S]*?)<\/(?:item|entry)>/gi;
  let match;

  while ((match = itemRegex.exec(xmlString)) !== null) {
    const itemContent = match[1];

    // Extract Title
    const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(itemContent);
    const rawTitle = titleMatch ? sanitizeText(titleMatch[1]) : '';
    if (!rawTitle) continue;

    // Extract Link
    let link = '';
    const linkTagMatch = /<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i.exec(itemContent);
    if (linkTagMatch) {
      link = linkTagMatch[1];
    } else {
      const linkTextMatch = /<link[^>]*>([\s\S]*?)<\/link>/i.exec(itemContent);
      if (linkTextMatch) {
        link = sanitizeText(linkTextMatch[1]);
      }
    }

    // Extract Description / Summary
    const descMatch = /<(?:description|summary|content:encoded)[^>]*>([\s\S]*?)<\/(?:description|summary|content:encoded)>/i.exec(itemContent);
    const rawSummary = descMatch ? sanitizeText(descMatch[1]) : '';

    // Filter for tax/economic relevance
    if (!isTaxOrEconomyRelevant(rawTitle, rawSummary)) {
      continue;
    }

    // Extract GUID or ID
    const guidMatch = /<(?:guid|id)[^>]*>([\s\S]*?)<\/(?:guid|id)>/i.exec(itemContent);
    const rawGuid = guidMatch ? sanitizeText(guidMatch[1]) : link || rawTitle;

    // Extract PubDate
    const pubDateMatch = /<(?:pubDate|published|updated)[^>]*>([\s\S]*?)<\/(?:pubDate|published|updated)>/i.exec(itemContent);
    let pubDateFormatted = new Date().toISOString().split('T')[0];
    if (pubDateMatch) {
      try {
        const parsedDate = new Date(sanitizeText(pubDateMatch[1]));
        if (!isNaN(parsedDate.getTime())) {
          pubDateFormatted = parsedDate.toISOString().split('T')[0];
        }
      } catch {
        // fallback to today
      }
    }

    // Extract Image if present in enclosure or media:content
    let imageUrl: string | undefined;
    const mediaMatch = /<(?:media:content|enclosure)[^>]*url=["']([^"']+)["']/i.exec(itemContent);
    if (mediaMatch) {
      imageUrl = mediaMatch[1];
    }

    results.push({
      sourceId: source.id,
      sourceName: source.name,
      title: rawTitle,
      originalUrl: link,
      canonicalUrl: normalizeUrl(link),
      guid: rawGuid,
      publishedAt: pubDateFormatted,
      category: classifyTaxCategory(rawTitle, rawSummary),
      summary: rawSummary.substring(0, 320) + (rawSummary.length > 320 ? '...' : ''),
      imageUrl,
    });
  }

  return results;
}

/**
 * Deduplicates and merges new news items against existing dataset
 */
export function deduplicateAndMergeNews(
  existingNews: ExternalNewsItem[],
  incomingItems: any[]
): {
  mergedNews: ExternalNewsItem[];
  itemsFound: number;
  itemsNew: number;
  itemsUpdated: number;
  itemsDuplicate: number;
} {
  const existingByGuid = new Map<string, ExternalNewsItem>();
  const existingByUrl = new Map<string, ExternalNewsItem>();
  const existingByFingerprint = new Map<string, ExternalNewsItem>();

  for (const item of existingNews) {
    if (item.guid) existingByGuid.set(item.guid, item);
    if (item.canonicalUrl) existingByUrl.set(item.canonicalUrl, item);
    existingByFingerprint.set(createTitleFingerprint(item.title), item);
  }

  let itemsNew = 0;
  let itemsUpdated = 0;
  let itemsDuplicate = 0;
  const newItemsToAdd: ExternalNewsItem[] = [];

  for (const incoming of incomingItems) {
    const guidMatch = existingByGuid.get(incoming.guid);
    const urlMatch = existingByUrl.get(incoming.canonicalUrl);
    const titleMatch = existingByFingerprint.get(createTitleFingerprint(incoming.title));

    const matched = guidMatch || urlMatch || titleMatch;

    if (matched) {
      itemsDuplicate++;
      // Check if metadata updated
      if (incoming.summary && incoming.summary.length > matched.summary.length) {
        matched.summary = incoming.summary;
        matched.fetchedAt = new Date().toISOString();
        itemsUpdated++;
      }
    } else {
      // Clean new item
      const newItem: ExternalNewsItem = {
        id: `news-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        sourceId: incoming.sourceId,
        sourceName: incoming.sourceName,
        title: incoming.title,
        originalUrl: incoming.originalUrl,
        canonicalUrl: incoming.canonicalUrl,
        guid: incoming.guid,
        publishedAt: incoming.publishedAt,
        fetchedAt: new Date().toISOString(),
        category: incoming.category,
        summary: incoming.summary,
        imageUrl: incoming.imageUrl,
        verificationStatus: 'menunggu_pemeriksaan', // defaults to review required
        editorialStatus: 'published',
        isDuplicate: false,
        isExternal: true,
      };
      newItemsToAdd.push(newItem);
      itemsNew++;

      // register into temporary lookup maps
      existingByGuid.set(newItem.guid, newItem);
      existingByUrl.set(newItem.canonicalUrl, newItem);
      existingByFingerprint.set(createTitleFingerprint(newItem.title), newItem);
    }
  }

  const merged = [...newItemsToAdd, ...existingNews];
  // Sort descending by date
  merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return {
    mergedNews: merged,
    itemsFound: incomingItems.length,
    itemsNew,
    itemsUpdated,
    itemsDuplicate,
  };
}

/**
 * Performs synchronization for all active feeds with timeout and error capture
 */
export async function syncActiveNewsSources(
  sources: NewsSource[],
  currentNews: ExternalNewsItem[]
): Promise<{
  updatedNews: ExternalNewsItem[];
  updatedSources: NewsSource[];
  logs: NewsSyncLog[];
}> {
  const updatedSources = [...sources];
  let accumulatedNews = [...currentNews];
  const logs: NewsSyncLog[] = [];

  for (let i = 0; i < updatedSources.length; i++) {
    const src = updatedSources[i];
    if (!src.active) continue;

    // If source has no feed (e.g. government site with WAF requiring manual curation)
    if (!src.feedUrl || src.lastFetchStatus === 'manual_only') {
      src.lastFetchedAt = new Date().toISOString();
      logs.push({
        id: `log-${Date.now()}-${i}`,
        sourceId: src.id,
        sourceName: src.name,
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        itemsFound: 0,
        itemsNew: 0,
        itemsUpdated: 0,
        itemsDuplicate: 0,
        status: 'success',
        errorSummary: 'Sumber pemerintah resmi mode kurasi manual (Feed otomatis tidak dibuka publik).',
      });
      continue;
    }

    const startTime = new Date().toISOString();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s limit

      const response = await fetch(src.feedUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'PajakPedia-Bot/1.0 (+https://pajakpedia.vercel.app; info@pajakpedia.id)',
          Accept: 'application/rss+xml, application/xml, text/xml, */*',
        },
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const xmlText = await response.text();
      const parsedItems = parseRssXml(xmlText, src);

      const dedupeResult = deduplicateAndMergeNews(accumulatedNews, parsedItems);
      accumulatedNews = dedupeResult.mergedNews;

      src.lastFetchedAt = new Date().toISOString();
      src.lastFetchStatus = 'success';
      src.lastErrorMessage = undefined;

      logs.push({
        id: `log-${Date.now()}-${i}`,
        sourceId: src.id,
        sourceName: src.name,
        startedAt: startTime,
        completedAt: new Date().toISOString(),
        itemsFound: dedupeResult.itemsFound,
        itemsNew: dedupeResult.itemsNew,
        itemsUpdated: dedupeResult.itemsUpdated,
        itemsDuplicate: dedupeResult.itemsDuplicate,
        status: 'success',
      });
    } catch (err: any) {
      src.lastFetchedAt = new Date().toISOString();
      src.lastFetchStatus = 'failed';
      src.lastErrorMessage = err?.message || 'Gagal mengambil feed';

      logs.push({
        id: `log-${Date.now()}-${i}`,
        sourceId: src.id,
        sourceName: src.name,
        startedAt: startTime,
        completedAt: new Date().toISOString(),
        itemsFound: 0,
        itemsNew: 0,
        itemsUpdated: 0,
        itemsDuplicate: 0,
        status: 'failed',
        errorSummary: err?.message || 'Gagal memproses feed',
      });
    }
  }

  return {
    updatedNews: accumulatedNews,
    updatedSources,
    logs,
  };
}
