import { finalCTAContent, WhatsAppLinks } from '../../constants/landing';
import { useSectionAnalytics } from '../../hooks/useSectionAnalytics';
import { Container } from '../ui/Container';
import { CTAButton } from '../ui/CTAButton';

export function FinalCTASection() {
  const sectionRef = useSectionAnalytics('final-cta');

  return (
    <section className="final-cta" id="contato" ref={sectionRef} aria-labelledby="final-cta-title">
      <Container>
        <div className="final-cta__panel">
          <div className="final-cta__copy" data-reveal>
            <p className="eyebrow">Cerimonial por Excelência</p>
            <h2 id="final-cta-title">{finalCTAContent.title}</h2>
            <p>{finalCTAContent.text}</p>
          </div>
          <div className="final-cta__actions" id="final-cta-actions">
            <CTAButton location="final-cta">{finalCTAContent.cta}</CTAButton>
            <CTAButton
              href={WhatsAppLinks.general}
              location="final-cta-whatsapp"
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            >
              {finalCTAContent.secondaryCta}
            </CTAButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
