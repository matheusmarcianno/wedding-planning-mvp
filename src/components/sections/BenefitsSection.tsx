import { benefits } from '../../constants/landing';
import { useSectionAnalytics } from '../../hooks/useSectionAnalytics';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';

export function BenefitsSection() {
  const sectionRef = useSectionAnalytics('benefits');

  return (
    <section className="section section--light" ref={sectionRef} aria-labelledby="benefits-title">
      <Container>
        <SectionHeader
          eyebrow="Mais clareza antes das grandes decisões"
          title="Planeje seu casamento com mais segurança"
        />
        <div className="benefit-grid">
          {benefits.map((benefit) => (
            <article className="benefit-card reveal" key={benefit.title}>
              <span className="benefit-card__mark" aria-hidden="true" />
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
