import { FilmBurn, Scanlines } from '@vinyl-ui/effects';
import Link from 'next/link';
import { Button } from '@/registry/web/ui/button';
import { GlitchText } from '@/registry/web/ui/glitch-text';
import { TestPattern } from '@/registry/web/ui/test-pattern';

export default function HomePage() {
  return (
    <main className="dark flex flex-1 flex-col bg-background text-foreground">
      <FilmBurn className="flex flex-1 items-center">
        <Scanlines className="mx-auto grid w-full max-w-5xl items-center gap-12 px-6 py-24 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <GlitchText className="text-6xl md:text-7xl">Vinyl UI</GlitchText>
            <p className="max-w-md text-lg text-muted-foreground">
              An open-source 80s design system for React and React Native. Neon palette, RGB splits,
              film burns and SMPTE wipes, built on Tailwind CSS, shadcn/ui, React Native Reusables
              and Uniwind.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/docs">Get started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/docs/effects/smpte-wipe">See the effects</Link>
              </Button>
            </div>
          </div>
          <TestPattern className="border-2 border-foreground shadow-retro">Now playing</TestPattern>
        </Scanlines>
      </FilmBurn>
    </main>
  );
}
