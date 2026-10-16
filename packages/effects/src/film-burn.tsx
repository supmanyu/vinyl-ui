import type { FilmBurnProps } from './types';

/** Warm light-leak overlay drifting across its children. Decorative only. */
export function FilmBurn({ children, active = true, className }: FilmBurnProps) {
  return (
    <div className={[active && 'film-burn', className].filter(Boolean).join(' ')}>{children}</div>
  );
}
