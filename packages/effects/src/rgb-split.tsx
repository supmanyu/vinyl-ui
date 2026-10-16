import type { CSSProperties } from 'react';
import type { RGBSplitProps } from './types';

/** Chromatic-aberration text. Wrap inline text; the split is a text-shadow so it stays accessible. */
export function RGBSplit({ children, intensity = 2, animated = false, className }: RGBSplitProps) {
  return (
    <span
      className={['rgb-split', animated && 'animate-glitch inline-block', className]
        .filter(Boolean)
        .join(' ')}
      style={{ '--rgb-split': `${intensity}px` } as CSSProperties}
    >
      {children}
    </span>
  );
}
