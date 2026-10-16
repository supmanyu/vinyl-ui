import { readFileSync } from 'node:fs';
import { wcagContrast } from 'culori';
import { describe, expect, it } from 'vitest';
import { themes } from '../dist/index.js';

const web = readFileSync(new URL('../dist/web.css', import.meta.url), 'utf8');
const native = readFileSync(new URL('../dist/native.css', import.meta.url), 'utf8');

const PAIRS = [
  'background',
  'card',
  'popover',
  'primary',
  'secondary',
  'muted',
  'accent',
  'destructive',
  'sidebar',
  'sidebar-primary',
  'sidebar-accent',
];

describe.each(Object.entries(themes))('%s theme', (name, theme) => {
  it('defines every semantic token on both platforms', () => {
    for (const key of Object.keys(theme)) {
      expect(web).toContain(`--${key}:`);
      expect(native).toContain(`--color-${key}:`);
    }
    expect(native).toContain(`@variant ${name}`);
  });

  it.each(PAIRS)('%s/foreground meets WCAG AA (4.5:1)', (bg) => {
    const fg = bg === 'background' ? 'foreground' : `${bg}-foreground`;
    const t = theme as Record<string, string>;
    expect(wcagContrast(t[bg]!, t[fg]!)).toBeGreaterThanOrEqual(4.5);
  });

  it('muted-foreground is readable on background', () => {
    expect(wcagContrast(theme.background, theme['muted-foreground'])).toBeGreaterThanOrEqual(4.5);
  });
});
