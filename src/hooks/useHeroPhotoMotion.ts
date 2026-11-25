import { useEffect } from 'react';
import type { RefObject } from 'react';

const clampUnit = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => value * value * (3 - 2 * value);

export function getHeroPhotoExpansion(progress: number): number {
  return ease(clampUnit(progress * 2));
}

const isHeroAnchor = (hash: string) => !hash || hash === '#inicio' || hash === '#conteudo';

export function useHeroPhotoMotion(heroRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const hero = heroRef.current;
    const header = document.getElementById('site-header');
    const actions = hero?.querySelector('#hero-actions');
    const track = hero?.querySelector('.hero__photo-track');
    const slot = hero?.querySelector('.hero__photo-slot');

    if (!hero || !actions || !track || !slot || !window.matchMedia) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wideScene = window.matchMedia('(min-width: 64rem) and (min-height: 44rem)');
    let frame = 0;
    let runway = 0;
    let wasAwayFromTop = false;
    let freezeRunway = !isHeroAnchor(window.location.hash);

    function reset() {
      delete hero?.dataset.photoMotion;
      hero?.style.removeProperty('--hero-expansion');
      hero?.style.removeProperty('--hero-bleed-start');
      hero?.style.removeProperty('--hero-bleed-end');
      hero?.style.removeProperty('--hero-runway');
      runway = 0;
    }

    function update() {
      frame = 0;
      if (!hero || !actions || !track || !slot) return;
      if (reducedMotion.matches) {
        reset();
        return;
      }

      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      const heroBounds = hero.getBoundingClientRect();
      if (heroBounds.bottom <= 0 && hero.dataset.photoMotion === 'active') return;

      const slotBounds = slot.getBoundingClientRect();
      const trackBounds = track.getBoundingClientRect();
      const actionBounds = actions.getBoundingClientRect();
      const distanceIntoHero = headerBottom - heroBounds.top;
      if (wasAwayFromTop && distanceIntoHero <= 0) freezeRunway = false;
      wasAwayFromTop = distanceIntoHero > 0;

      if (!wideScene.matches) {
        runway = 0;
      } else if (!freezeRunway) {
        const travel = Math.min(200, window.innerHeight * 0.23);
        const roomToOpen = Math.max(0, actionBounds.bottom - trackBounds.top);
        runway = (roomToOpen + travel + 24) * ease(clampUnit((distanceIntoHero - 8) / 112));
      }

      // Express both limits relative to the current scroll position.
      const start = wideScene.matches
        ? Math.max(actionBounds.bottom - headerBottom, trackBounds.top - headerBottom - 16)
        : Math.max(heroBounds.top - headerBottom + 32, slotBounds.top - window.innerHeight * 0.65);
      const end = wideScene.matches
        ? trackBounds.top + runway - headerBottom - 24
        : slotBounds.bottom - headerBottom - slotBounds.height * 0.2;
      const expansion = end > start ? getHeroPhotoExpansion(-start / (end - start)) : 0;
      const viewportWidth = document.documentElement.clientWidth;

      hero.dataset.photoMotion = 'active';
      hero.style.setProperty('--hero-runway', `${runway}px`);
      hero.style.setProperty('--hero-expansion', String(expansion));
      hero.style.setProperty('--hero-bleed-start', `${Math.max(0, slotBounds.left) * expansion}px`);
      hero.style.setProperty(
        '--hero-bleed-end',
        `${Math.max(0, viewportWidth - slotBounds.right) * expansion}px`,
      );
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    function preserveAnchorPosition(event: MouseEvent) {
      if (event.defaultPrevented || !(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (anchor) freezeRunway = !isHeroAnchor(anchor.hash);
    }

    function handleHashChange() {
      freezeRunway = !isHeroAnchor(window.location.hash);
      schedule();
    }

    schedule();
    document.addEventListener('click', preserveAnchorPosition);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', handleHashChange);
    reducedMotion.addEventListener('change', schedule);
    wideScene.addEventListener('change', schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('click', preserveAnchorPosition);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', handleHashChange);
      reducedMotion.removeEventListener('change', schedule);
      wideScene.removeEventListener('change', schedule);
      reset();
    };
  }, [heroRef]);
}
