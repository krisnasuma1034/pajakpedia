import React from 'react';
import { AdSenseSettings } from '../types';

interface AdSlotProps {
  slotId: string;
  format?: 'banner' | 'in-article' | 'rectangle';
  className?: string;
  settings?: AdSenseSettings;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId,
  format = 'banner',
  className = '',
  settings = {
    enabled: false,
    publisherId: '',
    placeholderMode: true,
    showTopBanner: true,
    showInArticle: true,
    showSidebar: true,
  },
}) => {
  // If ads are fully disabled by admin and placeholder mode is off, render nothing
  if (!settings.enabled && !settings.placeholderMode) {
    return null;
  }

  // Placeholder Mode: Show clean, dignified editorial placement container
  // adhering to Google AdSense Better Ads Standards (no deceptive clicks, clear label)
  if (settings.placeholderMode || !settings.publisherId) {
    return (
      <aside
        aria-label="Area Penempatan Iklan atau Kemitraan Editorial"
        className={`my-6 mx-auto w-full max-w-4xl border border-dashed border-slate-300 bg-slate-50/70 p-4 rounded-lg text-center transition-all ${className}`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
          <span className="text-[11px] font-medium tracking-wider uppercase text-slate-400">
            Kemitraan Editorial / Ruang Iklan Terverifikasi
          </span>
          <span className="text-[11px] text-slate-400 font-mono">Slot ID: {slotId}</span>
        </div>
        <div className="py-4 px-2 flex flex-col items-center justify-center text-slate-500">
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Ruang iklan ini disiapkan untuk mitra resmi dan Google AdSense yang mematuhi standar privasi dan editorial PajakPedia.
          </p>
          <span className="mt-2 text-[11px] text-slate-400">
            Format: {format.toUpperCase()} · Mode Placeholder Aktif
          </span>
        </div>
      </aside>
    );
  }

  // When a valid publisher ID is configured and live:
  return (
    <div
      className={`my-6 mx-auto w-full text-center overflow-hidden ${className}`}
      data-ad-client={settings.publisherId}
      data-ad-slot={slotId}
    >
      <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">
        Sponsor / Iklan
      </div>
      <div className="min-h-[90px] bg-slate-100 flex items-center justify-center border border-slate-200 rounded">
        {/* Real AdSense container hook */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={settings.publisherId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};
