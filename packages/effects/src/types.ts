import type { ReactNode } from 'react';

/** Subset of SMPTE 259M transition wipes. */
export const WIPE_PATTERNS = [
  'bar-left', // SMPTE 1 — horizontal bar, left → right
  'bar-right',
  'bar-top', // SMPTE 2 — vertical bar, top → bottom
  'bar-bottom',
  'barn-door-v', // SMPTE 21 — vertical barn door
  'barn-door-h', // SMPTE 22 — horizontal barn door
  'box', // box from centre
  'iris', // round iris
  'diagonal', // top-left diagonal
  'blinds', // venetian blinds — 8 slats opening together
] as const;

export type WipePattern = (typeof WIPE_PATTERNS)[number];

export interface RGBSplitProps {
  children?: ReactNode;
  /** Channel offset in px. Default 2. */
  intensity?: number;
  /** Periodic glitch bursts. Ignored under reduced motion. Default false. */
  animated?: boolean;
  className?: string;
}

export interface FilmBurnProps {
  children?: ReactNode;
  /** Show the burn overlay. Default true. */
  active?: boolean;
  className?: string;
}

export interface ScanlinesProps {
  children?: ReactNode;
  className?: string;
}

export interface SmpteWipeProps {
  children?: ReactNode;
  pattern?: WipePattern;
  /** `in` reveals the children, `out` conceals them. Default `in`. */
  mode?: 'in' | 'out';
  /** Milliseconds. Default 600. Collapses to ~0 under reduced motion. */
  duration?: number;
  /** Fires when the wipe finishes (also under reduced motion). */
  onEnd?: () => void;
  className?: string;
}

export interface StripeTextProps {
  /** Text to fill with the striped vice gradient. Display sizes only. */
  children?: ReactNode;
  className?: string;
}

export interface NeonDrawProps {
  /** SVG shapes to trace (DOM `<path>` on web, react-native-svg `<Path>` on native). */
  children?: ReactNode;
  /** SVG viewBox for the shapes, e.g. `"0 0 100 100"`. */
  viewBox: string;
  /** Stroke colour. Default `currentColor` (web) / theme primary (native). */
  color?: string;
  /** Default 2 (viewBox units). */
  strokeWidth?: number;
  /** Milliseconds. Default 1500. Collapses to ~0 under reduced motion. */
  duration?: number;
  /** Neon bloom around the stroke. Default true. */
  glow?: boolean;
  /** Accessible name. Without it the drawing is treated as decorative. */
  label?: string;
  /** Fires when the stroke finishes drawing (also under reduced motion). */
  onEnd?: () => void;
  className?: string;
}

export interface ShineProps {
  children?: ReactNode;
  /** Milliseconds per cycle (sweep + pause). Default 3000. */
  duration?: number;
  className?: string;
}
