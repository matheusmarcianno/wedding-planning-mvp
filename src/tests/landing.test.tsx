import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { BenefitsSection } from '../components/sections/BenefitsSection';
import { FinalCTASection } from '../components/sections/FinalCTASection';
import { HeroSection } from '../components/sections/HeroSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { MobileStickyCTA } from '../components/sections/MobileStickyCTA';
import { TrustSection } from '../components/sections/TrustSection';
import { TALLY_FORM_URL } from '../constants/landing';
import { LandingPage } from '../pages/LandingPage';
import { trackCTA, trackPageView, trackSectionView } from '../utils/analytics';

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('HeroSection', () => {
  it('renders the headline and CTA with the Tally URL', () => {
    render(<HeroSection />);

    expect(
      screen.getByRole('heading', {
        name: 'Descubra quanto custa o casamento que você está planejando',
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Começar Diagnóstico Gratuito' })).toHaveAttribute(
      'href',
      TALLY_FORM_URL,
    );
  });
});

describe('BenefitsSection', () => {
  it('renders all benefit cards', () => {
    render(<BenefitsSection />);

    expect(screen.getByText('Entenda seu orçamento')).toBeInTheDocument();
    expect(screen.getByText('Descubra seu perfil')).toBeInTheDocument();
    expect(screen.getByText('Receba orientação profissional')).toBeInTheDocument();
  });
});

describe('HowItWorksSection', () => {
  it('renders all steps', () => {
    render(<HowItWorksSection />);

    expect(screen.getByText('Responda o diagnóstico')).toBeInTheDocument();
    expect(screen.getByText('Receba uma análise inicial')).toBeInTheDocument();
    expect(screen.getByText('Decida seus próximos passos')).toBeInTheDocument();
  });
});

describe('TrustSection', () => {
  it('renders the approved trust copy', () => {
    render(<TrustSection />);

    expect(
      screen.getByRole('heading', {
        name: 'Criado com apoio de profissionais do mercado de eventos',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Este diagnóstico foi estruturado com base na experiência prática de profissionais que atuam na organização de casamentos e eventos.',
      ),
    ).toBeInTheDocument();
  });
});

describe('FinalCTASection', () => {
  it('renders the final CTA', () => {
    render(<FinalCTASection />);

    expect(screen.getByRole('heading', { name: 'Pronto para começar?' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Iniciar Diagnóstico' })).toHaveAttribute(
      'href',
      TALLY_FORM_URL,
    );
  });
});

describe('LandingPage', () => {
  it('renders all required sections with semantic landmarks', () => {
    renderWithRouter(<LandingPage />);

    const main = screen.getByRole('main');

    expect(within(main).getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Planeje seu casamento com mais segurança' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Como funciona' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Criado com apoio de profissionais do mercado de eventos',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Pronto para começar?' })).toBeInTheDocument();
  });

  it('includes accessible CTA link names', () => {
    renderWithRouter(<LandingPage />);

    expect(screen.getByRole('link', { name: 'Começar Diagnóstico Gratuito' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Iniciar Diagnóstico' })).toBeVisible();
  });
});

describe('MobileStickyCTA', () => {
  it('renders the mobile sticky CTA with the Tally URL', () => {
    render(<MobileStickyCTA />);

    expect(screen.getByRole('link', { name: 'Começar Diagnóstico' })).toHaveAttribute(
      'href',
      TALLY_FORM_URL,
    );
  });
});

describe('analytics utility', () => {
  it('emits page, CTA, and section events without a provider', () => {
    const listener = vi.fn();
    window.addEventListener('wedding-planning:analytics', listener);

    trackPageView('/teste');
    trackCTA('Começar', 'hero');
    trackSectionView('benefits');

    expect(listener).toHaveBeenCalledTimes(3);
    expect(listener.mock.calls[0][0].detail).toMatchObject({
      event: 'page_view',
      path: '/teste',
    });
    expect(listener.mock.calls[1][0].detail).toMatchObject({
      event: 'cta_click',
      label: 'Começar',
      location: 'hero',
    });
    expect(listener.mock.calls[2][0].detail).toMatchObject({
      event: 'section_view',
      sectionId: 'benefits',
    });

    window.removeEventListener('wedding-planning:analytics', listener);
  });
});
