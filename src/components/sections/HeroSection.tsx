import { useRef } from 'react';

import { heroContent } from '../../constants/landing';
import { useHeroPhotoMotion } from '../../hooks/useHeroPhotoMotion';
import { Container } from '../ui/Container';
import { CTAButton } from '../ui/CTAButton';

const credentials = [
  { icon: 'clock', title: 'Equipe no local 3h antes', text: 'Conferência da montagem' },
  { icon: 'timer', title: 'Até 8h de coordenação', text: 'Acompanhamento ao longo do evento' },
  { icon: 'language', title: 'Recepção bilíngue', text: 'Disponível sob consulta' },
  {
    icon: 'location',
    title: 'Atendimento em Santa Catarina',
    text: 'Blumenau, Litoral e Florianópolis',
  },
];

export function HeroSection() {
  const hero = useRef<HTMLElement>(null);
  useHeroPhotoMotion(hero);
  const headline = heroContent.headline;

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title" ref={hero}>
      <Container>
        <div className="hero__metadata">
          <p className="eyebrow">{heroContent.eyebrow}</p>
          <p className="eyebrow">{heroContent.location}</p>
        </div>
        <div className="hero__grid">
          <div className="hero__copy">
            <h1 id="hero-title">
              {headline.start}
              <em>{headline.emphasis}</em>
              {headline.end}
            </h1>
            <p>{heroContent.subheadline}</p>
            <div className="hero__actions" id="hero-actions">
              <CTAButton location="hero">{heroContent.cta}</CTAButton>
              <a className="cta-button cta-button--quiet" href="#servicos">
                Conhecer serviços
              </a>
            </div>
          </div>
          <div className="hero__photo-track">
            <div className="hero__photo-slot">
              <figure className="hero__photo-frame">
                <img
                  src={heroContent.image}
                  alt="Jantar de casamento ao ar livre, com velas e mesas decoradas"
                  width="1376"
                  height="768"
                  fetchPriority="high"
                />
                <figcaption>
                  <span className="eyebrow">Cerimonial por Excelência</span>
                  <span>Presença atenta e coordenação no grande dia</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
        <ul className="hero__credentials" aria-label="Equipe e cobertura" data-reveal>
          {credentials.map(({ icon, title, text }) => (
            <li key={title}>
              <span className={`credential-icon credential-icon--${icon}`} aria-hidden="true" />
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
