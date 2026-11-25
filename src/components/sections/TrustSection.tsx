import {
  coverage,
  coverageRegions,
  INSTAGRAM_URL,
  trustContent,
  WhatsAppLinks,
} from '../../constants/landing';
import { useSectionAnalytics } from '../../hooks/useSectionAnalytics';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { CTAButton } from '../ui/CTAButton';
import { SectionIcon } from '../ui/SectionIcon';

export function TrustSection() {
  const sectionRef = useSectionAnalytics('trust');

  return (
    <section
      className="section trust"
      id="victoria-klein"
      ref={sectionRef}
      aria-labelledby="trust-title"
    >
      <span id="sobre" className="anchor-alias" aria-hidden="true" />
      <Container className="trust__layout">
        <figure className="trust__media" data-reveal>
          <div className="trust__image">
            <img
              src={trustContent.image}
              alt={trustContent.imageAlt}
              width={1200}
              height={896}
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption>
            <span className="eyebrow">Cerimonial por Excelência</span>
            <strong>Victoria Klein</strong>
          </figcaption>
        </figure>
        <div className="trust__copy" data-reveal>
          <SectionHeader
            titleId="trust-title"
            align="left"
            eyebrow="Sobre Victoria | Cerimonial por Excelência"
            title={trustContent.title}
            text={trustContent.text}
          />
          <p>{trustContent.detail}</p>
          <div className="trust__actions">
            <CTAButton location="trust-diagnostic">Iniciar diagnóstico para casamento</CTAButton>
            <CTAButton
              href={WhatsAppLinks.general}
              location="trust-whatsapp"
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            >
              Falar sobre seu evento
            </CTAButton>
          </div>
          <a className="trust__instagram" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram do Cerimonial
          </a>
        </div>
      </Container>
      <Container className="coverage">
        <div className="coverage__heading" data-reveal>
          <p className="eyebrow">Atuação geográfica</p>
          <h3 id="coverage-title">Regiões de atendimento em Santa Catarina</h3>
        </div>
        <div className="coverage-grid">
          {coverageRegions.map((region) => (
            <article className="coverage-card" key={region.title} data-reveal>
              <SectionIcon name={region.icon} />
              <h4>{region.title}</h4>
              <p>{region.cities}</p>
            </article>
          ))}
        </div>
        <div className="coverage__contact" data-reveal>
          <p>{coverage}</p>
          <CTAButton
            className="coverage__cta"
            href={WhatsAppLinks.availability}
            location="coverage"
            target="_blank"
            rel="noreferrer"
            variant="secondary"
          >
            Consultar disponibilidade em outra cidade
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
