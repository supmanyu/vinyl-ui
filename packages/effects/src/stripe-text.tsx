import type { StripeTextProps } from './types';

/** Outrun slit type: the vice gradient cut into horizontal stripes. Stays real, selectable text. */
export function StripeText({ children, className }: StripeTextProps) {
  return <span className={['text-stripes', className].filter(Boolean).join(' ')}>{children}</span>;
}
