import { benefits } from '../../constants/landing';
import { useSectionAnalytics } from '../../hooks/useSectionAnalytics';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';

export function BenefitsSection() {
  const sectionRef = useSectionAnalytics('benefits');

  return (
    <section
      className="section section--light benefits"
      ref={sectionRef}
      aria-labelledby="benefits-title"
    >
      <Container>
        <div data-reveal>
          <SectionHeader
            titleId="benefits-title"
            eyebrow="Diferenciais de condução"
            title="Muito além da organização"
            text="Da montagem à recepção, a equipe acompanha cada etapa do evento."
          />
        </div>
        <div className="benefit-grid">
          {benefits.map((benefit, index) => (
            <article className="benefit-card" key={benefit.title} data-reveal>
              <span className="benefit-card__mark" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
