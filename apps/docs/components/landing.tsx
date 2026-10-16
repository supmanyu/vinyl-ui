'use client';

import { NeonDraw, SmpteWipe, WIPE_PATTERNS } from '@vinyl-ui/effects';
import { CheckIcon, CopyIcon, PauseIcon, PlayIcon, RewindIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
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
import { Progress } from '@/registry/web/ui/progress';
import { Switch } from '@/registry/web/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/web/ui/tabs';
import { TestPattern } from '@/registry/web/ui/test-pattern';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/registry/web/ui/tooltip';

/** Shell command with a copy button. */
export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-3 rounded-md border-2 border-border bg-night/80 py-2 pr-2 pl-4 font-mono text-cream text-lg backdrop-blur">
      <span className="text-magenta" aria-hidden>
        $
      </span>
      <code className="flex-1 truncate">{command}</code>
      <Button
        size="icon"
        variant="ghost"
        className="size-8"
        aria-label={copied ? 'Copied' : 'Copy command'}
        onClick={async () => {
          await navigator.clipboard.writeText(command);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  );
}

/** Cycles through every SMPTE wipe pattern over a test pattern. */
export function WipeLoop() {
  const [i, setI] = useState(0);
  const pattern = WIPE_PATTERNS[i % WIPE_PATTERNS.length] ?? 'iris';
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <SmpteWipe
        key={i}
        pattern={pattern}
        duration={900}
        onEnd={() => setTimeout(() => setI((n) => n + 1), 900)}
      >
        <TestPattern className="w-48" />
      </SmpteWipe>
      <span className="font-mono text-cyan text-lg">pattern="{pattern}"</span>
    </div>
  );
}

const MARK = [
  'M20 8 H80 Q92 8 92 20 V80 Q92 92 80 92 H20 Q8 92 8 80 V20 Q8 8 20 8 Z',
  'M28 26 L48 70 L68 26',
  'M74.0 62.0 L76.5 68.6 L83.5 68.9 L78.0 73.3 L79.9 80.1 L74.0 76.2 L68.1 80.1 L70.0 73.3 L64.5 68.9 L71.5 68.6 Z',
];

/** Re-traces the demo mark every few seconds. */
export function NeonLoop() {
  const [run, setRun] = useState(0);
  return (
    <NeonDraw
      key={run}
      viewBox="0 0 100 100"
      className="size-28 text-magenta"
      duration={1600}
      label="Vinyl mark"
      onEnd={() => setTimeout(() => setRun((r) => r + 1), 2200)}
    >
      {MARK.map((d) => (
        <path key={d} d={d} />
      ))}
    </NeonDraw>
  );
}

const TRACKS = {
  a: [
    ['Neon Rain', '4:12'],
    ['Night Drive', '5:03'],
    ['Chrome Hearts', '3:47'],
    ['Sunset Strip', '4:30'],
  ],
  b: [
    ['VHS Dreams', '3:58'],
    ['Arcade Love', '4:21'],
    ['Laser Grid', '5:16'],
    ['Midnight Static', '6:02'],
  ],
} as const;

/** A working tape deck built only from Vinyl registry components. */
export function TapeDeck() {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(38);
  const [dolby, setDolby] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 1)), 400);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <TooltipProvider>
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Mixtape Vol. 86</CardTitle>
            <Badge variant={playing ? 'default' : 'outline'}>{playing ? 'Play' : 'Pause'}</Badge>
          </div>
          <CardDescription>C90 · Type II chrome · 45 min per side</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <Tabs defaultValue="a">
            <TabsList>
              <TabsTrigger value="a">Side A</TabsTrigger>
              <TabsTrigger value="b">Side B</TabsTrigger>
            </TabsList>
            {(['a', 'b'] as const).map((side) => (
              <TabsContent key={side} value={side}>
                <ol className="grid gap-1.5 font-mono text-lg">
                  {TRACKS[side].map(([track, time], n) => (
                    <li key={track} className="flex justify-between">
                      <span>
                        <span className="text-muted-foreground">
                          {side.toUpperCase()}
                          {n + 1}
                        </span>{' '}
                        {track}
                      </span>
                      <span className="text-muted-foreground">{time}</span>
                    </li>
                  ))}
                </ol>
              </TabsContent>
            ))}
          </Tabs>
          <Progress value={progress} aria-label="Tape position" />
          <div className="flex items-center justify-between text-sm">
            <label htmlFor="deck-dolby">Dolby NR</label>
            <Switch id="deck-dolby" checked={dolby} onCheckedChange={setDolby} />
          </div>
        </CardContent>
        <CardFooter className="gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                aria-label="Rewind"
                onClick={() => setProgress(0)}
              >
                <RewindIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Be kind, rewind</TooltipContent>
          </Tooltip>
          <Button glitch className="flex-1" onClick={() => setPlaying((p) => !p)}>
            {playing ? <PauseIcon /> : <PlayIcon />}
            {playing ? 'Pause' : 'Play'}
          </Button>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}
