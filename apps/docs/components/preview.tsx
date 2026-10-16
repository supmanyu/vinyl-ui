'use client';

import {
  FilmBurn,
  NeonDraw,
  RGBSplit,
  Scanlines,
  Shine,
  SmpteWipe,
  StripeText,
  WIPE_PATTERNS,
  type WipePattern,
} from '@vinyl-ui/effects';
import { type ReactNode, useEffect, useState } from 'react';
import { Badge } from '@/registry/web/ui/badge';
import { Button } from '@/registry/web/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/web/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/registry/web/ui/dialog';
import { GlitchText } from '@/registry/web/ui/glitch-text';
import { Input } from '@/registry/web/ui/input';
import { NeonTile } from '@/registry/web/ui/neon-tile';
import { Switch } from '@/registry/web/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/web/ui/tabs';
import { TestPattern } from '@/registry/web/ui/test-pattern';
import { Wordmark } from '@/registry/web/ui/wordmark';
import { SHADCN_PREVIEWS } from './preview-shadcn';

// Original demo mark: rounded tile, chevron "V" and a star.
const MARK = [
  'M20 8 H80 Q92 8 92 20 V80 Q92 92 80 92 H20 Q8 92 8 80 V20 Q8 8 20 8 Z',
  'M28 26 L48 70 L68 26',
  'M74.0 62.0 L76.5 68.6 L83.5 68.9 L78.0 73.3 L79.9 80.1 L74.0 76.2 L68.1 80.1 L70.0 73.3 L64.5 68.9 L71.5 68.6 Z',
];

const markPaths = MARK.map((d) => <path key={d} d={d} />);

function Replay({ children }: { children: (run: number) => ReactNode }) {
  const [run, setRun] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      {children(run)}
      <Button size="sm" variant="outline" onClick={() => setRun((r) => r + 1)}>
        Replay
      </Button>
    </div>
  );
}

/** The whole 80s ident: caption → neon trace → tile → striped numeral → wordmark → fade. */
function TitleSequence() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const next: Record<number, [number, number]> = { 0: [1, 1200], 2: [3, 1600], 4: [5, 2600] };
    const step = next[stage];
    if (!step) return;
    const t = setTimeout(() => setStage(step[0]), step[1]);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="dark flex aspect-[3/4] w-72 items-center justify-center overflow-hidden rounded-lg border-2 border-border bg-black">
        {stage === 0 && (
          <p className="text-center text-cream text-sm">If Vinyl UI had an opening in 1986</p>
        )}
        {stage === 1 && (
          <NeonDraw
            viewBox="0 0 100 100"
            className="size-28 text-magenta"
            duration={1400}
            onEnd={() => setStage(2)}
          >
            {markPaths}
          </NeonDraw>
        )}
        {stage === 2 && (
          <SmpteWipe pattern="diagonal" duration={500}>
            <NeonTile size="lg">V</NeonTile>
          </SmpteWipe>
        )}
        {stage === 3 && (
          <SmpteWipe
            pattern="blinds"
            duration={800}
            onEnd={() => setTimeout(() => setStage(4), 700)}
          >
            <StripeText className="font-black font-display text-8xl italic">86</StripeText>
          </SmpteWipe>
        )}
        {stage >= 4 && (
          <div className={stage === 5 ? 'opacity-0 transition-opacity duration-1000' : undefined}>
            <SmpteWipe pattern="barn-door-h" duration={500}>
              <Wordmark
                size="sm"
                lines={['Night', 'Drive', 'Radio']}
                accent={<StripeText>86</StripeText>}
              />
            </SmpteWipe>
          </div>
        )}
      </div>
      <Button size="sm" variant="outline" onClick={() => setStage(0)}>
        Replay
      </Button>
    </div>
  );
}

function WipeDemo() {
  const [pattern, setPattern] = useState<WipePattern>('iris');
  const [n, setN] = useState(0);
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex flex-wrap gap-1.5">
        {WIPE_PATTERNS.map((p) => (
          <Button
            key={p}
            size="sm"
            variant={p === pattern ? 'default' : 'outline'}
            onClick={() => {
              setPattern(p);
              setN((x) => x + 1);
            }}
          >
            {p}
          </Button>
        ))}
      </div>
      <SmpteWipe key={`${pattern}${n}`} pattern={pattern} duration={900}>
        <TestPattern />
      </SmpteWipe>
    </div>
  );
}

const PREVIEWS: Record<string, () => ReactNode> = {
  ...SHADCN_PREVIEWS,
  button: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Play</Button>
      <Button variant="secondary">Rewind</Button>
      <Button variant="outline">Eject</Button>
      <Button variant="destructive">Erase</Button>
      <Button variant="ghost">Ghost</Button>
      <Button glitch>Glitch</Button>
    </div>
  ),
  badge: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Side A</Badge>
      <Badge variant="secondary">33⅓</Badge>
      <Badge variant="accent">Hi-Fi</Badge>
      <Badge variant="destructive">Rec</Badge>
      <Badge variant="outline">Mono</Badge>
    </div>
  ),
  card: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Mixtape</CardTitle>
        <CardDescription>C90 cassette · 45 min per side</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">Side A: synths. Side B: more synths.</CardContent>
      <CardFooter>
        <Button size="sm">Record</Button>
      </CardFooter>
    </Card>
  ),
  input: () => <Input className="max-w-sm" placeholder="Track name" />,
  switch: () => (
    <div className="flex items-center gap-3 text-sm">
      <Switch id="dolby" defaultChecked />
      <label htmlFor="dolby">Dolby NR</label>
    </div>
  ),
  tabs: () => (
    <Tabs defaultValue="a" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="a">Side A</TabsTrigger>
        <TabsTrigger value="b">Side B</TabsTrigger>
      </TabsList>
      <TabsContent value="a" className="rounded-md bg-ultraviolet p-4 text-cream">
        Neon dreams, track 1–5.
      </TabsContent>
      <TabsContent value="b" className="rounded-md bg-cyan p-4 text-night">
        Night drive, track 6–10.
      </TabsContent>
    </Tabs>
  ),
  dialog: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Insert tape</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Be kind, rewind</DialogTitle>
          <DialogDescription>This tape is at the end of side B.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Rewind</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  'glitch-text': () => <GlitchText>Night Drive</GlitchText>,
  'test-pattern': () => <TestPattern className="max-w-md">No signal</TestPattern>,
  'rgb-split': () => (
    <p className="font-black font-display text-4xl uppercase">
      <RGBSplit intensity={3} animated>
        Chroma
      </RGBSplit>
    </p>
  ),
  'film-burn': () => (
    <FilmBurn className="flex h-40 w-full max-w-md items-end rounded-md bg-ultraviolet p-4 font-display text-cream uppercase">
      Summer '86
    </FilmBurn>
  ),
  scanlines: () => (
    <Scanlines className="flex h-40 w-full max-w-md items-center justify-center rounded-md bg-cyan font-mono text-3xl text-night">
      CH 03
    </Scanlines>
  ),
  'smpte-wipe': WipeDemo,
  'neon-draw': () => (
    <Replay>
      {(run) => (
        <NeonDraw
          key={run}
          viewBox="0 0 100 100"
          className="size-32 text-magenta"
          label="Vinyl mark"
        >
          {markPaths}
        </NeonDraw>
      )}
    </Replay>
  ),
  shine: () => (
    <Shine className="rounded-lg bg-ultraviolet px-10 py-8 font-display text-2xl text-cream uppercase">
      Chrome finish
    </Shine>
  ),
  'stripe-text': () => (
    <StripeText className="font-black font-display text-8xl italic">VICE</StripeText>
  ),
  'neon-tile': () => (
    <div className="flex items-end gap-6">
      <NeonTile size="sm">V</NeonTile>
      <NeonTile>V</NeonTile>
      <NeonTile size="lg">V</NeonTile>
    </div>
  ),
  wordmark: () => (
    <Wordmark size="lg" lines={['Night', 'Drive', 'Radio']} accent={<StripeText>86</StripeText>} />
  ),
  'title-sequence': TitleSequence,
};

/** Live preview of a registry item or effect, rendered from source. */
export function Preview({ name }: { name: keyof typeof PREVIEWS }) {
  const Demo = PREVIEWS[name];
  if (!Demo) throw new Error(`No preview named "${name}"`);
  return (
    <div className="not-prose my-6 flex min-h-48 items-center justify-center overflow-hidden rounded-lg border-2 border-border bg-background p-8 text-foreground">
      <Demo />
    </div>
  );
}
