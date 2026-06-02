import { steps } from '../../constants/landing';
import { useSectionAnalytics } from '../../hooks/useSectionAnalytics';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';

export function HowItWorksSection() {
  const sectionRef = useSectionAnalytics('how-it-works');

  return (
    <section className="section section--warm" ref={sectionRef} aria-labelledby="how-title">
      <Container>
        <SectionHeader eyebrow="Em poucos minutos" title="Como funciona" />
        <ol className="timeline">
          {steps.map((step, index) => (
            <li className="timeline__item reveal" key={step.title}>
              <span className="timeline__number" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
