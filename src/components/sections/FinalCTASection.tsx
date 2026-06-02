import { finalCTAContent } from '../../constants/landing';
import { useSectionAnalytics } from '../../hooks/useSectionAnalytics';
import { Container } from '../ui/Container';
import { CTAButton } from '../ui/CTAButton';

export function FinalCTASection() {
  const sectionRef = useSectionAnalytics('final-cta');

  return (
    <section className="final-cta" ref={sectionRef} aria-labelledby="final-cta-title">
      <Container>
        <div className="final-cta__panel">
          <p className="eyebrow">Diagnóstico gratuito</p>
          <h2 id="final-cta-title">{finalCTAContent.title}</h2>
          <p>{finalCTAContent.text}</p>
          <CTAButton location="final-cta">{finalCTAContent.cta}</CTAButton>
        </div>
      </Container>
    </section>
  );
}
