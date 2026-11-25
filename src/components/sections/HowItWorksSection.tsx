import { useEffect, useRef } from 'react';

import { steps } from '../../constants/landing';
import { useSectionAnalytics } from '../../hooks/useSectionAnalytics';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';

export function HowItWorksSection() {
  const sectionRef = useSectionAnalytics('how-it-works');
  const timelineRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    const lastRow = timeline?.lastElementChild;

    if (!timeline || !(lastRow instanceof HTMLLIElement)) return;

    let activeRow = lastRow;

    const updateAccent = () => {
      timeline.style.setProperty('--timeline-accent-top', `${activeRow.offsetTop}px`);
      timeline.style.setProperty('--timeline-accent-height', `${activeRow.offsetHeight}px`);
    };

    const selectRow = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !(event.target instanceof Element)) return;

      const row = event.target.closest('li');
      if (!(row instanceof HTMLLIElement) || row.parentElement !== timeline || row === activeRow) {
        return;
      }

      activeRow = row;
      updateAccent();
    };

    const resetRow = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || activeRow === lastRow) return;

      activeRow = lastRow;
      updateAccent();
    };

    updateAccent();
    timeline.dataset.accentReady = '';
    timeline.addEventListener('pointerover', selectRow);
    timeline.addEventListener('pointerleave', resetRow);

    const resizeObserver = window.ResizeObserver ? new ResizeObserver(updateAccent) : null;
    if (resizeObserver) {
      for (const row of timeline.children) resizeObserver.observe(row);
    } else {
      window.addEventListener('resize', updateAccent);
    }

    return () => {
      timeline.removeEventListener('pointerover', selectRow);
      timeline.removeEventListener('pointerleave', resetRow);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateAccent);
      delete timeline.dataset.accentReady;
    };
  }, []);

  return (
    <section
      className="section section--warm methodology"
      id="metodologia"
      ref={sectionRef}
      aria-labelledby="how-title"
    >
      <span id="processo" className="anchor-alias" aria-hidden="true" />
      <Container>
        <div data-reveal>
          <SectionHeader
            titleId="how-title"
            eyebrow="Metodologia de planejamento"
            title="Como construímos o seu dia"
            text="Cinco etapas da primeira conversa à coordenação no dia do evento."
            align="left"
          />
        </div>
        <ol className="timeline" ref={timelineRef}>
          {steps.map((step, index) => (
            <li className="timeline__item" key={step.title} data-reveal>
              <span className="timeline__number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="timeline__heading">
                <h3>{step.title}</h3>
                <p className="eyebrow">{step.label}</p>
              </div>
              <p className="timeline__description">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
