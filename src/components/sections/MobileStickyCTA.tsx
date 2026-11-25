import { useEffect, useState } from 'react';

import { heroContent } from '../../constants/landing';
import { CTAButton } from '../ui/CTAButton';

export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero-actions');
    const final = document.getElementById('final-cta-actions');
    const header = document.getElementById('site-header');
    if (!hero || !final) return;

    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
        setVisible(
          hero.getBoundingClientRect().bottom <= headerBottom &&
            final.getBoundingClientRect().top > window.innerHeight,
        );
      });
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <div className="mobile-sticky-cta" hidden={!visible}>
      <CTAButton location="mobile-sticky">{heroContent.cta}</CTAButton>
    </div>
  );
}
