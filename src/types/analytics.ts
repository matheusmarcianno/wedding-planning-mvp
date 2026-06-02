export type AnalyticsEventName = 'page_view' | 'cta_click' | 'section_view';

export type AnalyticsPayload = {
  event: AnalyticsEventName;
  timestamp: string;
  path?: string;
  label?: string;
  location?: string;
  sectionId?: string;
};
