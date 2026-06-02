import type { AnalyticsPayload } from '../types/analytics';

function emitAnalyticsEvent(payload: AnalyticsPayload): void {
  window.dispatchEvent(new CustomEvent('wedding-planning:analytics', { detail: payload }));
}

export function trackPageView(path = window.location.pathname): void {
  emitAnalyticsEvent({
    event: 'page_view',
    path,
    timestamp: new Date().toISOString(),
  });
}

export function trackCTA(label: string, location: string): void {
  emitAnalyticsEvent({
    event: 'cta_click',
    label,
    location,
    timestamp: new Date().toISOString(),
  });
}

export function trackSectionView(sectionId: string): void {
  emitAnalyticsEvent({
    event: 'section_view',
    sectionId,
    timestamp: new Date().toISOString(),
  });
}
