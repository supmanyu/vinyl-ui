import type { CSSProperties } from 'react';
import type { SmpteWipeProps, WipePattern } from './types';

// Literal class names so Tailwind's scanner picks them up from the built file.
const CLASS: Record<WipePattern, string> = {
  'bar-left': 'animate-wipe-bar-left',
  'bar-right': 'animate-wipe-bar-right',
  'bar-top': 'animate-wipe-bar-top',
  'bar-bottom': 'animate-wipe-bar-bottom',
  'barn-door-v': 'animate-wipe-barn-door-v',
  'barn-door-h': 'animate-wipe-barn-door-h',
  box: 'animate-wipe-box',
  iris: 'animate-wipe-iris',
  diagonal: 'animate-wipe-diagonal',
  blinds: 'animate-wipe-blinds',
};

/** Reveals (or conceals) its children with an SMPTE-style geometric wipe. Re-key to replay. */
export function SmpteWipe({
  children,
  pattern = 'bar-left',
  mode = 'in',
  duration = 600,
  onEnd,
  className,
}: SmpteWipeProps) {
  return (
    <div
      className={[CLASS[pattern], mode === 'out' && 'wipe-out', className]
        .filter(Boolean)
        .join(' ')}
      style={{ '--wipe-duration': `${duration}ms` } as CSSProperties}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) onEnd?.();
      }}
    >
      {children}
    </div>
  );
}
