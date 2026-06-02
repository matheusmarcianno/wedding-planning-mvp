import { useEffect, useRef } from 'react';

import { trackSectionView } from '../utils/analytics';

export function useSectionAnalytics(sectionId: string) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      trackSectionView(sectionId);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackSectionView(sectionId);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [sectionId]);

  return ref;
}
