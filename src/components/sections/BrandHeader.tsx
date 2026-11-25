import { useRef, useState } from 'react';

import { navigationLinks, WhatsAppLinks } from '../../constants/landing';
import { CTAButton } from '../ui/CTAButton';
import { Container } from '../ui/Container';

export function BrandHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  return (
    <header
      className="site-header"
      id="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <Container className="site-header__inner">
        <a
          className="site-header__brand"
          href="#inicio"
          aria-label="Cerimonial por Excelência, início"
          onClick={() => setMenuOpen(false)}
        >
          <span className="site-header__mark" aria-hidden="true">
            <img src="/logo-cerimonial-por-excelencia.png" alt="" width="1050" height="950" />
          </span>
          <span className="site-header__wordmark" aria-hidden="true">
            Cerimonial <span>por Excelência</span>
          </span>
        </a>
        <button
          className="site-header__menu"
          type="button"
          ref={menuButton}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="site-header__menu-icon" aria-hidden="true" />
          Menu
        </button>
        <nav
          className="site-header__nav"
          id="primary-navigation"
          aria-label="Navegação principal"
          data-open={menuOpen}
        >
          {navigationLinks.map((link) => (
            <a href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="site-header__actions">
            <CTAButton
              location="header-whatsapp"
              href={WhatsAppLinks.general}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            >
              WhatsApp
            </CTAButton>
            <CTAButton location="header">Diagnóstico gratuito</CTAButton>
          </div>
        </nav>
      </Container>
    </header>
  );
}
