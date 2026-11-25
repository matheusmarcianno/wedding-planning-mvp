import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { BenefitsSection } from '../components/sections/BenefitsSection';
import { DiagnosticSection } from '../components/sections/DiagnosticSection';
import { FinalCTASection } from '../components/sections/FinalCTASection';
import { HeroSection } from '../components/sections/HeroSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { TrustSection } from '../components/sections/TrustSection';
import { LandingPage } from '../pages/LandingPage';
import { trackCTA, trackPageView, trackSectionView } from '../utils/analytics';
import { TALLY_FORM_URL } from '../utils/tallyUrl';

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

function setPageSearch(search: string) {
  window.history.pushState({}, '', search ? `/${search}` : '/');
}

beforeEach(() => {
  setPageSearch('');
});

describe('HeroSection', () => {
  it('presents the brand promise and links the primary CTA to Tally', () => {
    render(<HeroSection />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'O casamento que você sonha, conduzido com serenidade, precisão e afeto.',
    );
    expect(screen.getByRole('link', { name: 'Começar diagnóstico gratuito' })).toHaveAttribute(
      'href',
      TALLY_FORM_URL,
    );
    expect(screen.getByRole('link', { name: 'Conhecer serviços' })).toHaveAttribute(
      'href',
      '#servicos',
    );
  });
});

describe('DiagnosticSection', () => {
  it('keeps the Tally lead diagnostic prominent and explains what it covers', () => {
    render(<DiagnosticSection />);

    expect(
      screen.getByRole('heading', {
        name: 'Diagnóstico de Cerimonial & Planejamento',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/orçamento, no estilo e no número de convidados/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Fazer meu diagnóstico gratuito' })).toHaveAttribute(
      'href',
      TALLY_FORM_URL,
    );
  });
});

describe('ServicesSection', () => {
  it('shows the three service categories with their intended contact routes', () => {
    render(<ServicesSection />);

    expect(
      screen.getByRole('heading', { name: 'Assessoria completa para casamentos' }),
    ).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Celebrações e aniversários' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Eventos corporativos' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Fazer diagnóstico do casamento' })).toHaveAttribute(
      'href',
      TALLY_FORM_URL,
    );
    const celebrationUrl = new URL(
      (screen.getByRole('link', { name: 'Conversar sobre uma celebração' }) as HTMLAnchorElement)
        .href,
    );
    const corporateUrl = new URL(
      (
        screen.getByRole('link', {
          name: 'Conversar sobre evento corporativo',
        }) as HTMLAnchorElement
      ).href,
    );
    expect(`${celebrationUrl.origin}${celebrationUrl.pathname}`).toBe(
      'https://wa.me/5547996474116',
    );
    expect(celebrationUrl.searchParams.get('text')).toMatch(/cerimonial de uma celebração/i);
    expect(`${corporateUrl.origin}${corporateUrl.pathname}`).toBe('https://wa.me/5547996474116');
    expect(corporateUrl.searchParams.get('text')).toMatch(/cerimonial de um evento corporativo/i);
  });
});

describe('BenefitsSection', () => {
  it('renders the practical benefits of the service', () => {
    render(<BenefitsSection />);

    expect(screen.getByText('Presença antecipada')).toBeInTheDocument();
    expect(screen.getByText('Coordenação contínua de até 8h')).toBeInTheDocument();
    expect(screen.getByText('Tranquilidade para celebrar')).toBeInTheDocument();
    expect(screen.getByText('Recepção bilíngue sob consulta')).toBeInTheDocument();
    for (const number of ['01', '02', '03', '04']) {
      expect(screen.getByText(number)).toBeVisible();
    }
  });
});

describe('HowItWorksSection', () => {
  it('renders each step of the client journey', () => {
    render(<HowItWorksSection />);

    expect(screen.getByText('A gente se conhece')).toBeInTheDocument();
    expect(screen.getByText('Planejamos juntos')).toBeInTheDocument();
    expect(screen.getByText('Visitamos o local')).toBeInTheDocument();
    expect(screen.getByText('Alinhamos os detalhes')).toBeInTheDocument();
    expect(screen.getByText('Coordenamos o grande dia')).toBeInTheDocument();
  });
});

describe('TrustSection', () => {
  it('introduces the professional and service regions with editorial imagery', () => {
    render(<TrustSection />);

    expect(
      screen.getByRole('heading', {
        name: 'Planejamento estruturado e presença atenta para o seu evento.',
      }),
    ).toBeVisible();
    expect(screen.getByText('Blumenau e Vale Europeu')).toBeInTheDocument();
    expect(screen.getByText('Litoral catarinense')).toBeInTheDocument();
    expect(screen.getByText('Joinville e Região Norte')).toBeInTheDocument();
    expect(screen.getByText('Sobre Victoria | Cerimonial por Excelência')).toBeVisible();
    expect(screen.getByRole('link', { name: 'Instagram do Cerimonial' })).toHaveAttribute(
      'href',
      'https://www.instagram.com/cerimonialporexcelencia/',
    );
    expect(
      screen.getByRole('img', { name: /detalhes de papelaria e planejamento/i }),
    ).toHaveAttribute('src', '/cerimonial-planning-details.jpg');
    expect(
      screen.getByRole('link', { name: 'Consultar disponibilidade em outra cidade' }),
    ).toHaveAttribute('href', expect.stringContaining('https://wa.me/5547996474116'));
  });
});

describe('FinalCTASection', () => {
  it('offers Tally for wedding leads and WhatsApp for direct conversation', () => {
    render(<FinalCTASection />);

    expect(
      screen.getByRole('heading', {
        name: 'Prontos para planejar sua celebração com tranquilidade?',
      }),
    ).toBeVisible();
    expect(screen.getByRole('link', { name: 'Começar diagnóstico gratuito' })).toHaveAttribute(
      'href',
      TALLY_FORM_URL,
    );
    expect(screen.getByRole('link', { name: 'Conversar pelo WhatsApp' })).toHaveAttribute(
      'href',
      expect.stringContaining('https://wa.me/5547996474116'),
    );
  });
});

describe('LandingPage', () => {
  it('renders the full experience with semantic landmarks and core sections', () => {
    renderWithRouter(<LandingPage />);

    const main = screen.getByRole('main');
    expect(within(main).getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Curadoria cerimonial sob medida para cada celebração' }),
    ).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Muito além da organização' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Perguntas frequentes' })).toBeVisible();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('forwards current query parameters to every Tally CTA', () => {
    const campaign =
      '?utm_source=instagram&utm_medium=bio&utm_campaign=landing&ref=convite%2Fcasal';
    setPageSearch(campaign);
    renderWithRouter(<LandingPage />);

    const expectedUrl = `${TALLY_FORM_URL}${campaign}`;
    const tallyLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith(TALLY_FORM_URL));

    expect(tallyLinks.length).toBeGreaterThanOrEqual(5);
    tallyLinks.forEach((link) => expect(link).toHaveAttribute('href', expectedUrl));
  });

  it('points each navigation anchor to a section in the shared landing page', () => {
    renderWithRouter(<LandingPage />);

    const navigation = screen.getByRole('navigation', { name: 'Navegação principal' });
    const anchors = within(navigation)
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('#'));

    expect(anchors.length).toBeGreaterThanOrEqual(5);
    anchors.forEach((link) => {
      const id = link.getAttribute('href')!.slice(1);
      expect(document.getElementById(id)).toBeInTheDocument();
    });
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
    expect(listener.mock.calls[0][0].detail).toMatchObject({ event: 'page_view', path: '/teste' });
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
