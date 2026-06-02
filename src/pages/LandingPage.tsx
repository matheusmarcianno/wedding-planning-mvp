import { useEffect } from 'react';

import { BenefitsSection } from '../components/sections/BenefitsSection';
import { FinalCTASection } from '../components/sections/FinalCTASection';
import { HeroSection } from '../components/sections/HeroSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { MobileStickyCTA } from '../components/sections/MobileStickyCTA';
import { TrustSection } from '../components/sections/TrustSection';
import { trackPageView } from '../utils/analytics';

export function LandingPage() {
  useEffect(() => {
    trackPageView('/');
  }, []);

  return (
    <>
      <main>
        <HeroSection />
        <BenefitsSection />
        <HowItWorksSection />
        <TrustSection />
        <FinalCTASection />
      </main>
      <MobileStickyCTA />
    </>
  );
}
