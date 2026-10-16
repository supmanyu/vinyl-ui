import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { cn } from '@/registry/web/lib/utils';

// Line colours cycle yellow → magenta → blue, each with a soft neon bloom.
const LINE = ['text-yellow', 'text-magenta', 'text-blue'] as const;

const wordmarkVariants = cva('flex items-center gap-3', {
  variants: {
    size: {
      sm: 'text-2xl',
      md: 'text-4xl',
      lg: 'text-6xl',
    },
  },
  defaultVariants: { size: 'md' },
});

/** Stacked, slanted multi-colour title lockup. `accent` sits beside the stack (try `<StripeText>`). */
function Wordmark({
  lines,
  accent,
  size,
  className,
  ...props
}: Omit<React.ComponentProps<'h2'>, 'children'> &
  VariantProps<typeof wordmarkVariants> & { lines: string[]; accent?: React.ReactNode }) {
  return (
    <h2
      data-slot="wordmark"
      aria-label={lines.join(' ')}
      className={cn(wordmarkVariants({ size }), className)}
      {...props}
    >
      <span
        aria-hidden
        className="-skew-x-8 flex flex-col font-black font-display uppercase italic leading-[0.85] tracking-tight"
      >
        {lines.map((line, i) => (
          <span key={line} className={cn('glow-text [--glow:8px]', LINE[i % LINE.length])}>
            {line}
          </span>
        ))}
      </span>
      {accent && (
        <span aria-hidden className="font-black font-display text-[2.6em] italic leading-none">
          {accent}
        </span>
      )}
    </h2>
  );
}

export { Wordmark, wordmarkVariants };
