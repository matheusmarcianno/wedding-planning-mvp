import { Container } from '../ui/Container';
import { CTAButton } from '../ui/CTAButton';
import { heroContent } from '../../constants/landing';

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__image" aria-hidden="true">
        <img src={heroContent.image} alt="" />
      </div>
      <Container className="hero__content">
        <div className="hero__copy">
          <p className="eyebrow">{heroContent.eyebrow}</p>
          <h1 id="hero-title">{heroContent.headline}</h1>
          <p>{heroContent.subheadline}</p>
          <CTAButton location="hero">{heroContent.cta}</CTAButton>
        </div>
      </Container>
    </section>
  );
}
