import { services, WhatsAppLinks } from '../../constants/landing';
import { CTAButton } from '../ui/CTAButton';
import { Container } from '../ui/Container';
import { SectionIcon } from '../ui/SectionIcon';

export function ServicesSection() {
  return (
    <section
      className="section section--warm services"
      id="servicos"
      aria-labelledby="services-title"
    >
      <Container>
        <div className="services__intro" data-reveal>
          <div>
            <p className="eyebrow">Nossos serviços</p>
            <h2 id="services-title">Curadoria cerimonial sob medida para cada celebração</h2>
          </div>
          <p>Planejamento e coordenação para casamentos, celebrações e eventos corporativos.</p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article
              className={`service-card${service.href ? '' : ' service-card--featured'}`}
              key={service.title}
              data-reveal
            >
              <div className="service-card__content">
                <div className="service-card__header">
                  <p className="eyebrow">{service.category}</p>
                  <SectionIcon name={service.icon} />
                </div>
                <h3>{service.title}</h3>
                {service.subtitle && (
                  <p className="eyebrow service-card__subtitle">{service.subtitle}</p>
                )}
                <p>{service.description}</p>
                <ul className="service-card__list">
                  {service.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <CTAButton
                className="service-card__cta"
                location={`service-${index + 1}`}
                href={service.href}
                target={service.href ? '_blank' : undefined}
                rel={service.href ? 'noreferrer' : undefined}
                variant={service.href ? 'secondary' : 'primary'}
              >
                {service.cta}
              </CTAButton>
            </article>
          ))}
        </div>
        <div className="services__availability" data-reveal>
          <div className="services__availability-copy">
            <SectionIcon name="hourglass_top" />
            <p>
              <strong>Data próxima?</strong> Podemos avaliar a disponibilidade para assessoria de
              reta final.
            </p>
          </div>
          <CTAButton
            className="services__availability-cta"
            href={WhatsAppLinks.lateWeddingPlanning}
            location="service-late-wedding"
            target="_blank"
            rel="noreferrer"
            variant="secondary"
          >
            Consultar disponibilidade no WhatsApp
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
