import type { WipePattern } from './types';

const BLINDS = 8;

const rect = (x: number, y: number, w: number, h: number) => {
  'worklet';
  return `M${x} ${y}H${x + w}V${y + h}H${x}Z`;
};

/**
 * SVG path for a w×h cover with a hole showing `p` (0–1) of the revealed area.
 * Drawn with fill-rule="evenodd" so the hole is transparent. Runs on the UI thread.
 */
export function wipePath(pattern: WipePattern, p: number, w: number, h: number): string {
  'worklet';
  const cover = rect(0, 0, w, h);
  switch (pattern) {
    case 'bar-left':
      return cover + rect(0, 0, w * p, h);
    case 'bar-right':
      return cover + rect(w * (1 - p), 0, w * p, h);
    case 'bar-top':
      return cover + rect(0, 0, w, h * p);
    case 'bar-bottom':
      return cover + rect(0, h * (1 - p), w, h * p);
    case 'barn-door-v':
      return cover + rect((w / 2) * (1 - p), 0, w * p, h);
    case 'barn-door-h':
      return cover + rect(0, (h / 2) * (1 - p), w, h * p);
    case 'box':
      return cover + rect((w / 2) * (1 - p), (h / 2) * (1 - p), w * p, h * p);
    case 'iris': {
      const r = (p * Math.hypot(w, h)) / 2;
      const cx = w / 2;
      const cy = h / 2;
      return `${cover}M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;
    }
    case 'diagonal':
      return `${cover}M0 0H${2 * w * p}L0 ${2 * h * p}Z`;
    case 'blinds': {
      let d = cover;
      for (let i = 0; i < BLINDS; i++) d += rect(0, (i * h) / BLINDS, w, (h / BLINDS) * p);
      return d;
    }
  }
}
