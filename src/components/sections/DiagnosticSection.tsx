import { diagnosticContent } from '../../constants/landing';
import { useSectionAnalytics } from '../../hooks/useSectionAnalytics';
import { Container } from '../ui/Container';
import { CTAButton } from '../ui/CTAButton';

export function DiagnosticSection() {
  const sectionRef = useSectionAnalytics('diagnostic');

  return (
    <section
      className="section diagnostic"
      id="diagnostico"
      ref={sectionRef}
      aria-labelledby="diagnostic-title"
    >
      <Container className="diagnostic__layout">
        <div className="diagnostic__copy" data-reveal>
          <p className="eyebrow">{diagnosticContent.eyebrow}</p>
          <h2 id="diagnostic-title">{diagnosticContent.title}</h2>
          <p className="diagnostic__intro">{diagnosticContent.text}</p>
          <ul className="diagnostic__benefits">
            {diagnosticContent.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
        <div className="diagnostic__card" data-reveal>
          <p className="eyebrow">Questionário on-line</p>
          <h3>Sem custo</h3>
          <p>Um ponto de partida para organizar o seu casamento.</p>
          <CTAButton location="diagnostic">{diagnosticContent.cta}</CTAButton>
        </div>
      </Container>
    </section>
  );
}
