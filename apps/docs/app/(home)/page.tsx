import { FilmBurn, RGBSplit, Scanlines, Shine, StripeText } from '@vinyl-ui/effects';
import { BlendIcon, PackageOpenIcon, ShieldCheckIcon, SmartphoneIcon } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { CopyCommand, NeonLoop, TapeDeck, WipeLoop } from '@/components/landing';
import { gitConfig } from '@/lib/shared';
import { Badge } from '@/registry/web/ui/badge';
import { Button } from '@/registry/web/ui/button';
import { GlitchText } from '@/registry/web/ui/glitch-text';
import { NeonTile } from '@/registry/web/ui/neon-tile';
import { Wordmark } from '@/registry/web/ui/wordmark';
import './road.css';

const GITHUB = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

const STATS = [
  ['33', 'Components'],
  ['7', 'Effects'],
  ['2', 'Platforms'],
  ['AA', 'Contrast, both themes'],
] as const;

const FEATURES: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <SmartphoneIcon />,
    title: 'Web + React Native',
    body: 'One token file builds Tailwind v4 CSS for the web and Uniwind CSS for native. Same component names, variants and props on both.',
  },
  {
    icon: <PackageOpenIcon />,
    title: 'You own the code',
    body: 'Components ship as a shadcn registry. Run npx shadcn add @vinyl/button and the source is yours to change. Tokens and effects update from npm.',
  },
  {
    icon: <BlendIcon />,
    title: 'Effects that behave',
    body: 'RGB splits, film burns and SMPTE wipes respect reduced motion, stay under three flashes per second and hide decorative layers from screen readers.',
  },
  {
    icon: <ShieldCheckIcon />,
    title: 'AA-checked themes',
    body: 'Night Drive and Sun-Faded are both tested so every surface/foreground pair meets WCAG AA. A unit test fails the build if one drifts.',
  },
];

function SectionHeading({
  track,
  title,
  children,
}: {
  track: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center">
      <span className="font-mono text-cyan text-xl uppercase tracking-widest">{track}</span>
      <h2 className="font-black font-display text-3xl uppercase tracking-tight md:text-4xl">
        {title}
      </h2>
      {children && <p className="text-muted-foreground">{children}</p>}
    </div>
  );
}

function EffectTile({ name, href, children }: { name: string; href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-lg border-2 border-foreground bg-card shadow-retro transition-transform hover:-translate-x-px hover:-translate-y-px"
    >
      <div className="relative flex h-48 items-center justify-center overflow-hidden">
        {children}
      </div>
      <div className="flex items-center justify-between border-foreground border-t-2 px-4 py-2.5">
        <span className="font-bold font-display text-xs uppercase tracking-widest">{name}</span>
        <span className="font-mono text-cyan text-lg transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <NeonTile size="sm" shine={false} className="shrink-0">
        {n}
      </NeonTile>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <h3 className="font-bold font-display uppercase tracking-wide">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-md border-2 border-border bg-night p-4 text-cream text-sm">
      <code>{children}</code>
    </pre>
  );
}

export default function HomePage() {
  return (
    <main className="dark flex flex-1 flex-col bg-background text-foreground">
      {/* ── Hero: the road ─────────────────────────────────────────── */}
      <section className="road-hero">
        <div className="road-stars" />
        <div className="road-sun" />
        <div className="road-floor-wrap" aria-hidden>
          <div className="road-floor">
            <div className="road-lane" />
          </div>
        </div>
        <div className="road-haze" />
        <div className="road-horizon" />
        <div className="road-scanlines" />

        <div className="road-content relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 pt-[8vh] text-center">
          <Badge variant="outline" className="bg-night/60 text-cream backdrop-blur">
            v0.1 · MIT · Web + React Native
          </Badge>
          <GlitchText className="text-6xl text-cream sm:text-7xl md:text-8xl">Vinyl UI</GlitchText>
          <p className="max-w-2xl text-cream/85 text-lg [text-shadow:0_1px_12px_#0b0b1e] md:text-xl">
            An open-source design system that looks like a late-night VHS broadcast, for React and
            React Native.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/docs">Get started</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/docs/components/button">Components</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="hidden text-cream sm:inline-flex">
              <a href={GITHUB}>GitHub</a>
            </Button>
          </div>
        </div>
        <div className="road-sign">
          <CopyCommand command="npx shadcn@latest add @vinyl/theme" />
        </div>
      </section>

      {/* ── Spec strip ─────────────────────────────────────────────── */}
      <section className="border-border border-y-2 bg-card">
        <dl className="mx-auto grid max-w-5xl grid-cols-2 md:grid-cols-4">
          {STATS.map(([value, label]) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 border-border px-4 py-8 odd:border-r-2 md:border-r-2 md:last:border-r-0"
            >
              <dt className="sr-only">{label}</dt>
              <dd className="font-black font-display text-4xl text-vice md:text-5xl">{value}</dd>
              <dd className="font-mono text-lg text-muted-foreground uppercase tracking-widest">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Why ────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24">
        <SectionHeading track="Track 01" title="Why Vinyl">
          The 80s aesthetic, built on the stack you already use: Tailwind CSS, shadcn/ui, React
          Native Reusables and Uniwind.
        </SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-4 rounded-lg border-2 border-border bg-card p-6"
            >
              <div className="flex size-11 items-center justify-center rounded-md border-2 border-yellow bg-sunset text-night [&_svg]:size-5">
                {f.icon}
              </div>
              <h3 className="font-bold font-display text-sm uppercase tracking-wide">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Effects reel ───────────────────────────────────────────── */}
      <section className="border-border border-y-2 bg-[#0e0c26]">
        <div className="mx-auto w-full max-w-6xl px-6 py-24">
          <SectionHeading track="Track 02" title="The effects reel">
            Seven effects with one API. CSS on the web, Reanimated + SVG on native.
          </SectionHeading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <EffectTile name="RGB split" href="/docs/effects/rgb-split">
              <span className="font-black font-display text-4xl text-cream">
                <RGBSplit animated intensity={3}>
                  CHROMA
                </RGBSplit>
              </span>
            </EffectTile>
            <EffectTile name="Film burn" href="/docs/effects/film-burn">
              <FilmBurn className="flex size-full items-center justify-center bg-ultraviolet font-black font-display text-2xl text-cream italic">
                SUMMER '86
              </FilmBurn>
            </EffectTile>
            <EffectTile name="Scanlines" href="/docs/effects/scanlines">
              <Scanlines className="flex size-full items-center justify-center bg-cyan font-mono text-6xl text-night">
                CH 03
              </Scanlines>
            </EffectTile>
            <EffectTile name="SMPTE wipe" href="/docs/effects/smpte-wipe">
              <WipeLoop />
            </EffectTile>
            <EffectTile name="Neon draw" href="/docs/effects/neon-draw">
              <NeonLoop />
            </EffectTile>
            <EffectTile name="Stripe text + shine" href="/docs/effects/stripe-text">
              <div className="flex items-center gap-6">
                <StripeText className="font-black font-display text-7xl italic">86</StripeText>
                <Shine className="rounded-xl">
                  <NeonTile shine={false}>V</NeonTile>
                </Shine>
              </div>
            </EffectTile>
          </div>
        </div>
      </section>

      {/* ── Components ─────────────────────────────────────────────── */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <span className="font-mono text-cyan text-xl uppercase tracking-widest">Track 03</span>
          <h2 className="font-black font-display text-3xl uppercase tracking-tight md:text-4xl">
            33 components, <span className="text-vice">one deck</span>
          </h2>
          <p className="text-muted-foreground">
            The tape deck is built entirely from Vinyl registry components: Card, Tabs, Badge,
            Progress, Switch, Tooltip and Button. Every shadcn/ui component you know, restyled with
            thick borders, hard shadows and SMPTE-wipe motion, plus Vinyl originals like Glitch
            Text, Neon Tile, Test Pattern and Wordmark.
          </p>
          <ul className="flex flex-wrap gap-2">
            {[
              'accordion',
              'dialog',
              'dropdown-menu',
              'select',
              'tabs',
              'tooltip',
              'glitch-text',
              'neon-tile',
              'wordmark',
            ].map((c) => (
              <li key={c}>
                <Badge asChild variant="outline">
                  <Link href={`/docs/components/${c}`}>{c}</Link>
                </Badge>
              </li>
            ))}
          </ul>
          <div>
            <Button asChild variant="outline">
              <Link href="/docs/components/accordion">Browse all components</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <TapeDeck />
        </div>
      </section>

      {/* ── Install ────────────────────────────────────────────────── */}
      <section className="border-border border-t-2 bg-card">
        <div className="mx-auto w-full max-w-3xl px-6 py-24">
          <SectionHeading track="Track 04" title="Press record">
            Three steps, the same on web and React Native. Only the registry URL changes.
          </SectionHeading>
          <div className="flex flex-col gap-10">
            <Step n={1} title="Point shadcn at the Vinyl registry">
              <Code>{`// components.json — use /r/native/ for React Native
{
  "registries": {
    "@vinyl": "https://vinyl-ui.pages.dev/r/web/{name}.json"
  }
}`}</Code>
            </Step>
            <Step n={2} title="Install the theme">
              <CopyCommand command="npx shadcn@latest add @vinyl/theme" />
              <p className="text-muted-foreground text-sm">
                Adds the Night Drive / Sun-Faded tokens and the effect utilities to your stylesheet.
              </p>
            </Step>
            <Step n={3} title="Add components">
              <CopyCommand command="npx shadcn@latest add @vinyl/button @vinyl/dialog" />
              <p className="text-muted-foreground text-sm">
                Full guides for{' '}
                <Link
                  className="text-primary underline underline-offset-4"
                  href="/docs/installation/web"
                >
                  web
                </Link>{' '}
                and{' '}
                <Link
                  className="text-primary underline underline-offset-4"
                  href="/docs/installation/native"
                >
                  React Native
                </Link>
                .
              </p>
            </Step>
          </div>
        </div>
      </section>

      {/* ── Outro ──────────────────────────────────────────────────── */}
      <section className="scanlines relative overflow-hidden border-border border-t-2 bg-night">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-24 text-center">
          <Wordmark
            size="lg"
            lines={['Night', 'Drive', 'Ready']}
            accent={<StripeText>86</StripeText>}
          />
          <p className="max-w-md text-cream/70">
            Free, open source and MIT licensed. Rewind is on the house.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/docs">Read the docs</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={GITHUB}>Star on GitHub</a>
            </Button>
          </div>
          <p className="font-mono text-lg text-muted-foreground uppercase tracking-widest">
            Be kind, rewind ⏪
          </p>
        </div>
      </section>
    </main>
  );
}
