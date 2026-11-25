import { useId, useState } from 'react';

import { faqs, WhatsAppLinks } from '../../constants/landing';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { CTAButton } from '../ui/CTAButton';

function FAQItem({ question, answer, contact }: (typeof faqs)[number]) {
  const panelId = useId();
  const [open, setOpen] = useState(false);

  return (
    <div className="faq__item" data-reveal>
      <h3>
        <button
          className="faq__trigger"
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((expanded) => !expanded)}
        >
          {question}
        </button>
      </h3>
      <div className="faq__answer" id={panelId} hidden={!open}>
        <p>{answer}</p>
        {contact && (
          <CTAButton
            className="faq__cta"
            href={WhatsAppLinks.general}
            location="faq"
            target="_blank"
            rel="noreferrer"
            variant="secondary"
          >
            Tirar uma dúvida pelo WhatsApp
          </CTAButton>
        )}
      </div>
    </div>
  );
}

export function FAQSection() {
  return (
    <section className="section section--warm faq" id="faq" aria-labelledby="faq-title">
      <Container>
        <div data-reveal>
          <SectionHeader
            titleId="faq-title"
            title="Perguntas frequentes"
            text="Como começar, onde atendemos e como a equipe atua no dia do evento."
          />
        </div>
        <div className="faq__list">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </Container>
    </section>
  );
}
