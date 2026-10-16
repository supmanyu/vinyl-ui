import { RGBSplit } from '@vinyl-ui/effects';
import type * as React from 'react';
import { cn } from '@/registry/web/lib/utils';

const SIZE = { 1: 'text-5xl', 2: 'text-4xl', 3: 'text-2xl', 4: 'text-xl' } as const;

/** Display heading with chromatic aberration. Use for short headings, never body copy. */
function GlitchText({
  level = 1,
  animated = true,
  intensity = 2,
  className,
  children,
  ...props
}: React.ComponentProps<'h1'> & { level?: 1 | 2 | 3 | 4; animated?: boolean; intensity?: number }) {
  const Tag = `h${level}` as const;
  return (
    <Tag
      data-slot="glitch-text"
      className={cn('font-black font-display uppercase tracking-tight', SIZE[level], className)}
      {...props}
    >
      <RGBSplit animated={animated} intensity={intensity}>
        {children}
      </RGBSplit>
    </Tag>
  );
}

export { GlitchText };
