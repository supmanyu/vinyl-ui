import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type * as React from 'react';
import { cn } from '@/registry/web/lib/utils';

// "Pressed into the console": hard offset shadow that collapses on press.
const raised =
  'border-foreground shadow-retro hover:-translate-x-px hover:-translate-y-px active:translate-x-1 active:translate-y-1 active:shadow-none motion-reduce:transform-none';

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 font-display text-sm font-bold uppercase tracking-wider outline-none transition-[translate,box-shadow,background-color,color] focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: cn('bg-primary text-primary-foreground', raised),
        secondary: cn('bg-secondary text-secondary-foreground', raised),
        destructive: cn('bg-destructive text-destructive-foreground', raised),
        outline:
          'border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-neon',
        ghost: 'border-transparent hover:bg-accent hover:text-accent-foreground',
        link: 'border-transparent text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-5 has-[>svg]:px-4',
        sm: 'h-8 gap-1.5 px-3 text-xs has-[>svg]:px-2.5',
        lg: 'h-12 px-8 text-base has-[>svg]:px-6',
        icon: 'size-10',
      },
      /** Chromatic-aberration text on hover/focus. */
      glitch: {
        true: 'hover:rgb-split focus-visible:rgb-split',
        false: '',
      },
    },
    defaultVariants: { variant: 'default', size: 'default', glitch: false },
  },
);

function Button({
  className,
  variant,
  size,
  glitch,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, glitch, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
