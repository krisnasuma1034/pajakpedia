import type { IncomingMessage, ServerResponse } from 'http';
import { INITIAL_NEWS_SOURCES } from '../src/data/newsSources';
import { INITIAL_EXTERNAL_NEWS } from '../src/data/initialNews';
import { syncActiveNewsSources } from '../src/utils/newsSyncEngine';

/**
 * Vercel Serverless Function & Cron Job Handler for /api/sync-news
 */
export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Security check for cron secret or admin authorization if CRON_SECRET is configured
  const authHeader = req.headers['authorization'];
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    // If authorization header doesn't match configured secret
    return res.status(401).json({
      success: false,
      error: 'Akses tidak diizinkan. Kredensial sinkronisasi tidak valid.',
    });
  }

  try {
    const syncResult = await syncActiveNewsSources(
      INITIAL_NEWS_SOURCES,
      INITIAL_EXTERNAL_NEWS
    );

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        totalNews: syncResult.updatedNews.length,
        sourcesProcessed: syncResult.updatedSources.length,
        logs: syncResult.logs,
      },
      latestNews: syncResult.updatedNews.slice(0, 10),
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error?.message || 'Gagal menjalankan sinkronisasi berita di server.',
    });
  }
}
