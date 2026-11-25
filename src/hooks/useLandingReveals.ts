import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useLandingReveals(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.IntersectionObserver || !window.matchMedia) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reveal = (target: HTMLElement) => {
      target.dataset.revealState = 'visible';
      observer.unobserve(target);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        }
      },
      { threshold: 0.12 },
    );

    function configure() {
      observer.disconnect();
      for (const target of targets) {
        if (reducedMotion.matches) {
          delete target.dataset.revealState;
        } else if (target.getBoundingClientRect().top <= window.innerHeight) {
          target.dataset.revealState = 'visible';
        } else {
          target.dataset.revealState = 'pending';
          observer.observe(target);
        }
      }
    }

    function revealFocusedContent(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      for (const target of targets) {
        if (target.dataset.revealState === 'pending' && target.contains(event.target))
          reveal(target);
      }
    }

    configure();
    root.addEventListener('focusin', revealFocusedContent);
    reducedMotion.addEventListener('change', configure);

    return () => {
      observer.disconnect();
      root.removeEventListener('focusin', revealFocusedContent);
      reducedMotion.removeEventListener('change', configure);
      for (const target of targets) delete target.dataset.revealState;
    };
  }, [rootRef]);
}
