import type { CSSProperties } from 'react';
import type { ShineProps } from './types';

/** A diagonal sheen that sweeps across its children every cycle. Decorative only. */
export function Shine({ children, duration = 3000, className }: ShineProps) {
  return (
    <div className={['relative overflow-hidden', className].filter(Boolean).join(' ')}>
      {children}
      <span
        aria-hidden
        className="animate-shine"
        style={{ '--shine-duration': `${duration}ms` } as CSSProperties}
      />
    </div>
  );
}
