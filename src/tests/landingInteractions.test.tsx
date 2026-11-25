import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrandHeader } from '../components/sections/BrandHeader';
import { FAQSection } from '../components/sections/FAQSection';
import { MobileStickyCTA } from '../components/sections/MobileStickyCTA';
import { CTAButton } from '../components/ui/CTAButton';
import { TALLY_FORM_URL } from '../utils/tallyUrl';

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('BrandHeader', () => {
  it('opens the compact navigation by keyboard and returns focus when Escape closes it', async () => {
    const user = userEvent.setup();
    render(<BrandHeader />);

    const menu = screen.getByRole('button', { name: /menu/i });
    expect(menu).toHaveAttribute('aria-expanded', 'false');

    menu.focus();
    await user.keyboard('{Enter}');
    expect(menu).toHaveAttribute('aria-expanded', 'true');

    const navigation = screen.getByRole('navigation', { name: 'Navegação principal' });
    expect(menu).toHaveAttribute('aria-controls', navigation.id);
    const servicesLink = within(navigation).getByRole('link', { name: 'Serviços' });
    expect(servicesLink).toHaveAttribute('href', '#servicos');

    servicesLink.focus();
    await user.keyboard('{Escape}');
    expect(menu).toHaveAttribute('aria-expanded', 'false');
    expect(menu).toHaveFocus();
  });
});

describe('FAQSection', () => {
  it('opens answers independently and toggles an answer with Enter or Space', async () => {
    const user = userEvent.setup();
    render(<FAQSection />);

    const first = screen.getByRole('button', { name: 'Como funciona o primeiro passo?' });
    const second = screen.getByRole('button', {
      name: 'Qual é o tempo de permanência da equipe no dia do evento?',
    });
    const firstAnswer = document.getElementById(first.getAttribute('aria-controls') ?? '');
    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(firstAnswer).toHaveAttribute('hidden');

    first.focus();
    await user.keyboard('{Enter}');
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(firstAnswer).toBeVisible();

    second.focus();
    await user.keyboard(' ');
    expect(second).toHaveAttribute('aria-expanded', 'true');
    expect(firstAnswer).toBeVisible();

    first.focus();
    await user.keyboard('{Enter}');
    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(firstAnswer).toHaveAttribute('hidden');
    expect(second).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('CTAButton', () => {
  it('emits analytics with the label and location on actual activation', async () => {
    const user = userEvent.setup();
    const listener = vi.fn();
    window.addEventListener('wedding-planning:analytics', listener);

    try {
      render(
        <CTAButton location="hero" onClick={(event) => event.preventDefault()}>
          Começar diagnóstico gratuito
        </CTAButton>,
      );

      await user.click(screen.getByRole('link', { name: 'Começar diagnóstico gratuito' }));

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].detail).toMatchObject({
        event: 'cta_click',
        label: 'Começar diagnóstico gratuito',
        location: 'hero',
      });
    } finally {
      window.removeEventListener('wedding-planning:analytics', listener);
    }
  });
});

describe('MobileStickyCTA', () => {
  it('offers the Tally link only between the hero and the final conversion actions', () => {
    vi.useFakeTimers();
    vi.stubGlobal('innerHeight', 800);

    let heroTop = 80;
    let finalTop = 1000;

    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      if (this.id === 'site-header') return new DOMRect(0, 0, 320, 64);
      if (this.id === 'hero-actions') return new DOMRect(0, heroTop, 320, 50);
      if (this.id === 'final-cta-actions') return new DOMRect(0, finalTop, 320, 50);
      return new DOMRect();
    });

    render(
      <>
        <header id="site-header" />
        <div id="hero-actions" />
        <div id="final-cta-actions" />
        <MobileStickyCTA />
      </>,
    );

    const cta = { name: 'Começar diagnóstico gratuito' };
    act(() => vi.advanceTimersToNextFrame());
    expect(screen.queryByRole('link', cta)).toBeNull();

    function updateViewport() {
      act(() => {
        window.dispatchEvent(new Event('scroll'));
        vi.advanceTimersToNextFrame();
      });
    }

    heroTop = 0;
    updateViewport();
    expect(screen.getByRole('link', cta)).toHaveAttribute('href', TALLY_FORM_URL);

    finalTop = 700;
    updateViewport();
    expect(screen.queryByRole('link', cta)).toBeNull();

    finalTop = 1000;
    updateViewport();
    expect(screen.getByRole('link', cta)).toBeVisible();

    heroTop = 80;
    updateViewport();
    expect(screen.queryByRole('link', cta)).toBeNull();
  });
});
