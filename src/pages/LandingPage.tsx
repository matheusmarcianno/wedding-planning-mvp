import { useEffect, useRef } from 'react';

import { BenefitsSection } from '../components/sections/BenefitsSection';
import { BrandHeader } from '../components/sections/BrandHeader';
import { DiagnosticSection } from '../components/sections/DiagnosticSection';
import { FAQSection } from '../components/sections/FAQSection';
import { FinalCTASection } from '../components/sections/FinalCTASection';
import { HeroSection } from '../components/sections/HeroSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { MobileStickyCTA } from '../components/sections/MobileStickyCTA';
import { ServicesSection } from '../components/sections/ServicesSection';
import { TrustSection } from '../components/sections/TrustSection';
import { CTAButton } from '../components/ui/CTAButton';
import { Container } from '../components/ui/Container';
import { INSTAGRAM_URL, navigationLinks, WhatsAppLinks } from '../constants/landing';
import { useLandingReveals } from '../hooks/useLandingReveals';
import { trackPageView } from '../utils/analytics';

export function LandingPage() {
  const main = useRef<HTMLElement>(null);
  useLandingReveals(main);

  useEffect(() => {
    trackPageView('/');
  }, []);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <BrandHeader />
      <main id="conteudo" tabIndex={-1} ref={main}>
        <HeroSection />
        <DiagnosticSection />
        <ServicesSection />
        <BenefitsSection />
        <HowItWorksSection />
        <TrustSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <MobileStickyCTA />
      <footer className="site-footer">
        <Container>
          <div className="site-footer__grid">
            <div>
              <a className="site-footer__brand" href="#inicio">
                Cerimonial por Excelência
              </a>
              <p>Planejamento e coordenação de casamentos, celebrações e eventos corporativos.</p>
              <p className="eyebrow">Direção por Victoria Klein</p>
            </div>
            <nav aria-label="Navegação do rodapé">
              <h2 className="eyebrow">Navegação</h2>
              <ul>
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h2 className="eyebrow">Atendimento regional</h2>
              <ul>
                <li>Blumenau e Vale Europeu</li>
                <li>Litoral catarinense</li>
                <li>Florianópolis</li>
                <li>Joinville e região Norte</li>
              </ul>
            </div>
            <div>
              <h2 className="eyebrow">Contato e avaliação</h2>
              <ul>
                <li>
                  <CTAButton
                    className="site-footer__link"
                    location="footer-whatsapp"
                    href={WhatsAppLinks.general}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </CTAButton>
                </li>
                <li>
                  <CTAButton className="site-footer__link" location="footer">
                    Diagnóstico de casamento
                  </CTAButton>
                </li>
                <li>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="site-footer__credits">Cerimonial por Excelência · Victoria Klein</p>
        </Container>
      </footer>
    </>
  );
}
