import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

import { TALLY_FORM_URL } from '../../constants/landing';
import { trackCTA } from '../../utils/analytics';

type CTAButtonProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    location: string;
    variant?: 'primary' | 'secondary';
  }
>;

export function CTAButton({
  children,
  className = '',
  location,
  variant = 'primary',
  onClick,
  href = TALLY_FORM_URL,
  ...props
}: CTAButtonProps) {
  return (
    <a
      className={`cta-button cta-button--${variant} ${className}`.trim()}
      href={href}
      onClick={(event) => {
        trackCTA(String(children), location);
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
