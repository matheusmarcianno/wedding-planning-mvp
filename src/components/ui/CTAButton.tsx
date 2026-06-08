import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

import { trackCTA } from '../../utils/analytics';
import { buildTallyUrl } from '../../utils/tallyUrl';

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
  href = buildTallyUrl(window.location.search),
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
