/**
 * Single source of truth for Vinyl UI design tokens.
 * `scripts/build.ts` turns this into web.css (Tailwind v4 + shadcn), native.css (Uniwind) and JS.
 *
 * Semantic values are a hex colour, a palette name (`magenta`) or a ramp step (`dusk-800`).
 */

/** Signature 80s colours. Each one also gets a 50–950 ramp generated in OKLCH. */
export const palette = {
  night: '#0B0B1E',
  dusk: '#3A3558', // neutral: desaturated night-sky violet
  ultraviolet: '#7B2CBF',
  magenta: '#FF2E97',
  cyan: '#00E5FF',
  orange: '#FF6B35',
  yellow: '#FFD23F',
  mint: '#2DE2A6',
  laser: '#FF3B3B',
  blue: '#3D63FF', // electric blue — the cool end of the vice gradient
  cream: '#F4EBD9',
} as const;

/** SMPTE ECR 1-1978 colour bars (75%), used by TestPattern and wipes. */
export const smpte = {
  bars: ['#C0C0C0', '#C0C000', '#00C0C0', '#00C000', '#C000C0', '#C00000', '#0000C0'],
  castellations: ['#0000C0', '#131313', '#C000C0', '#131313', '#00C0C0', '#131313', '#C0C0C0'],
  pluge: {
    minusI: '#00214C',
    white: '#FFFFFF',
    plusQ: '#32006A',
    black: '#131313',
    superBlack: '#090909',
    subBlack: '#1D1D1D',
  },
} as const;

/** Theme-invariant effect colours (chromatic aberration channels, burn, scanlines). */
export const effects = {
  'glitch-r': '#FF0055',
  'glitch-g': '#00FF9F',
  'glitch-b': '#00B8FF',
  burn: '#FF7A1A',
  scanline: '#00000040',
} as const;

/**
 * Signature gradients. `angle` in CSS degrees; stops are palette references or hex.
 * Web: `--gradient-*` variables + `bg-*` / `text-*` utilities. Native: resolved stops via JS.
 */
export const gradients = {
  /** Diagonal dusk sky — tiles, hero fills. */
  sunset: { angle: 135, stops: ['magenta', 'orange', 'yellow'] },
  /** Top-to-bottom neon stack — striped type, slats. */
  vice: { angle: 180, stops: ['yellow', 'orange', 'magenta', 'ultraviolet', 'blue'] },
} as const;

const shared = {
  'chart-1': 'magenta',
  'chart-2': 'cyan',
  'chart-3': 'yellow',
  'chart-4': 'mint',
  'chart-5': 'orange',
} as const;

/** "Night Drive" — the default. */
export const dark = {
  background: 'night',
  foreground: 'cream',
  card: 'dusk-950',
  'card-foreground': 'cream',
  popover: 'dusk-950',
  'popover-foreground': 'cream',
  primary: 'magenta',
  'primary-foreground': 'night',
  secondary: 'cyan',
  'secondary-foreground': 'night',
  muted: 'dusk-900',
  'muted-foreground': 'dusk-300',
  accent: 'ultraviolet-700',
  'accent-foreground': 'cream',
  destructive: 'laser',
  'destructive-foreground': 'night',
  border: 'dusk-800',
  input: 'dusk-800',
  ring: 'cyan',
  ...shared,
  sidebar: 'dusk-950',
  'sidebar-foreground': 'cream',
  'sidebar-primary': 'magenta',
  'sidebar-primary-foreground': 'night',
  'sidebar-accent': 'dusk-900',
  'sidebar-accent-foreground': 'cream',
  'sidebar-border': 'dusk-800',
  'sidebar-ring': 'cyan',
} as const;

/** "Sun-Faded" — bleached Polaroid light mode. */
export const light: Record<keyof typeof dark, string> = {
  background: 'cream',
  foreground: 'night',
  card: '#FBF6EC',
  'card-foreground': 'night',
  popover: '#FBF6EC',
  'popover-foreground': 'night',
  primary: 'magenta-600',
  'primary-foreground': '#FFFFFF',
  secondary: 'ultraviolet',
  'secondary-foreground': '#FFFFFF',
  muted: '#E9DEC8',
  'muted-foreground': 'dusk-700',
  accent: 'cyan-200',
  'accent-foreground': 'night',
  destructive: 'laser-600',
  'destructive-foreground': '#FFFFFF',
  border: '#D9CBB0',
  input: '#D9CBB0',
  ring: 'ultraviolet',
  ...shared,
  sidebar: '#EFE4CF',
  'sidebar-foreground': 'night',
  'sidebar-primary': 'magenta-600',
  'sidebar-primary-foreground': '#FFFFFF',
  'sidebar-accent': '#E9DEC8',
  'sidebar-accent-foreground': 'night',
  'sidebar-border': '#D9CBB0',
  'sidebar-ring': 'ultraviolet',
};

/** Geometric: tight corners. */
export const radius = '0.25rem';

/** Font stacks. Load the named faces yourself (next/font, @fontsource, expo-font). */
export const fonts = {
  sans: '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
  display: '"Orbitron", "Space Grotesk", ui-sans-serif, system-ui, sans-serif',
  mono: '"VT323", ui-monospace, SFMono-Regular, Menlo, monospace',
} as const;

/** Hard offset "neon" shadows (web only; RN components use borders). */
export const shadows = {
  retro: '4px 4px 0 0 var(--foreground)',
  neon: '0 0 0 1px var(--primary), 0 0 12px 0 var(--primary)',
} as const;
