import { render, screen } from '@testing-library/react';
import { useRef } from 'react';

import { getHeroPhotoExpansion } from '../hooks/useHeroPhotoMotion';
import { useLandingReveals } from '../hooks/useLandingReveals';

function RevealExample() {
  const root = useRef<HTMLDivElement>(null);
  useLandingReveals(root);

  return (
    <div ref={root}>
      <p data-reveal>Já na tela</p>
      <button type="button" data-reveal>
        Abaixo da dobra
      </button>
    </div>
  );
}

function mockRevealViewport(reducedMotion: boolean) {
  const mediaQuery = Object.assign(new EventTarget(), { matches: reducedMotion });
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => mediaQuery),
  );
  vi.stubGlobal('innerHeight', 800);

  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: HTMLElement,
  ) {
    const top = this.textContent === 'Abaixo da dobra' ? 950 : 200;
    return new DOMRect(0, top, 320, 48);
  });

  return mediaQuery;
}

function mockIntersectionObserver() {
  const observer = { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() };
  let notify: IntersectionObserverCallback;

  function Observer(callback: IntersectionObserverCallback) {
    notify = callback;
    return observer;
  }

  vi.stubGlobal('IntersectionObserver', vi.fn(Observer));

  return {
    ...observer,
    sendEntry(target: Element, isIntersecting: boolean) {
      const bounds = new DOMRect(0, isIntersecting ? 650 : 950, 320, 48);
      notify(
        [
          {
            target,
            isIntersecting,
            boundingClientRect: bounds,
            intersectionRect: isIntersecting ? bounds : new DOMRect(),
            intersectionRatio: isIntersecting ? 1 : 0,
            rootBounds: new DOMRect(0, 0, 320, 800),
            time: 0,
          },
        ],
        observer as unknown as IntersectionObserver,
      );
    },
  };
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('hero photo expansion', () => {
  it('opens from the frame to full width', () => {
    expect(getHeroPhotoExpansion(-0.2)).toBe(0);
    expect(getHeroPhotoExpansion(0)).toBe(0);
    expect(getHeroPhotoExpansion(0.1)).toBeGreaterThan(0);
    expect(getHeroPhotoExpansion(0.25)).toBeGreaterThan(getHeroPhotoExpansion(0.1));
    expect(getHeroPhotoExpansion(0.5)).toBe(1);
  });

  it('holds full width as scrolling continues past the expansion range', () => {
    expect(getHeroPhotoExpansion(0.75)).toBe(1);
    expect(getHeroPhotoExpansion(1)).toBe(1);
    expect(getHeroPhotoExpansion(1.2)).toBe(1);
  });
});

describe('landing reveals', () => {
  it('leaves the first viewport visible and reveals each later item once', () => {
    mockRevealViewport(false);
    const observer = mockIntersectionObserver();
    const { unmount } = render(<RevealExample />);
    const inView = screen.getByText('Já na tela');
    const belowFold = screen.getByText('Abaixo da dobra');

    expect(inView).not.toHaveAttribute('data-reveal-state', 'pending');
    expect(belowFold).toHaveAttribute('data-reveal-state', 'pending');
    expect(observer.observe).toHaveBeenCalledWith(belowFold);

    observer.sendEntry(belowFold, false);
    expect(belowFold).toHaveAttribute('data-reveal-state', 'pending');

    observer.sendEntry(belowFold, true);
    expect(belowFold).toHaveAttribute('data-reveal-state', 'visible');
    expect(observer.unobserve).toHaveBeenCalledWith(belowFold);

    unmount();
    expect(observer.disconnect).toHaveBeenCalled();
  });

  it('keeps content visible when the visitor prefers reduced motion', () => {
    mockRevealViewport(true);
    const observer = mockIntersectionObserver();
    render(<RevealExample />);

    expect(screen.getByText('Abaixo da dobra')).not.toHaveAttribute('data-reveal-state', 'pending');
    expect(observer.observe).not.toHaveBeenCalled();
  });

  it('reveals an offscreen control as soon as keyboard focus reaches it', () => {
    mockRevealViewport(false);
    const observer = mockIntersectionObserver();
    render(<RevealExample />);
    const belowFold = screen.getByRole('button', { name: 'Abaixo da dobra' });

    expect(belowFold).toHaveAttribute('data-reveal-state', 'pending');
    belowFold.focus();

    expect(belowFold).toHaveAttribute('data-reveal-state', 'visible');
    expect(observer.unobserve).toHaveBeenCalledWith(belowFold);
  });

  it('clears pending states when reduced motion is enabled on an open page', () => {
    const mediaQuery = mockRevealViewport(false);
    const observer = mockIntersectionObserver();
    render(<RevealExample />);
    const belowFold = screen.getByText('Abaixo da dobra');

    expect(belowFold).toHaveAttribute('data-reveal-state', 'pending');
    mediaQuery.matches = true;
    mediaQuery.dispatchEvent(new Event('change'));

    expect(belowFold).not.toHaveAttribute('data-reveal-state', 'pending');
    expect(observer.disconnect).toHaveBeenCalled();
  });

  it('keeps content visible if IntersectionObserver is unavailable', () => {
    mockRevealViewport(false);
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<RevealExample />);

    expect(screen.getByText('Abaixo da dobra')).not.toHaveAttribute('data-reveal-state', 'pending');
  });
});
