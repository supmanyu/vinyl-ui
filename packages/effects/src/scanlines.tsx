import type { ScanlinesProps } from './types';

/** CRT scanline overlay. Decorative only. */
export function Scanlines({ children, className }: ScanlinesProps) {
  return <div className={['scanlines', className].filter(Boolean).join(' ')}>{children}</div>;
}
