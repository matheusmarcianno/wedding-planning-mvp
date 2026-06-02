import { trustContent } from '../../constants/landing';
import { useSectionAnalytics } from '../../hooks/useSectionAnalytics';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';

export function TrustSection() {
  const sectionRef = useSectionAnalytics('trust');

  return (
    <section className="section trust" ref={sectionRef} aria-labelledby="trust-title">
      <Container className="trust__layout">
        <div className="trust__media">
          <img src={trustContent.image} alt="Mesa de doces com arranjos florais em casamento" />
        </div>
        <div className="trust__copy">
          <SectionHeader
            align="left"
            eyebrow="Experiência real de eventos"
            title={trustContent.title}
            text={trustContent.text}
          />
        </div>
      </Container>
    </section>
  );
}
