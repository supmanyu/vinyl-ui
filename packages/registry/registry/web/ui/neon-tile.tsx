import { Shine } from '@vinyl-ui/effects';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { cn } from '@/registry/web/lib/utils';

const neonTileVariants = cva(
  'relative inline-flex shrink-0 overflow-hidden rounded-xl border-2 border-yellow bg-sunset font-black font-display text-night italic shadow-[0_0_0_1px_var(--color-yellow),0_0_18px_var(--color-yellow),inset_0_0_12px_rgb(255_255_255/0.35)]',
  {
    variants: {
      size: {
        sm: 'size-12 text-xl',
        md: 'size-20 text-4xl',
        lg: 'size-32 text-6xl',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

/** Sunset-gradient app-icon tile with a glowing gold rim. Put a letter, icon or logo inside. */
function NeonTile({
  size,
  shine = true,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof neonTileVariants> & { shine?: boolean }) {
  const content = <span className="flex size-full items-center justify-center">{children}</span>;
  return (
    <div data-slot="neon-tile" className={cn(neonTileVariants({ size }), className)} {...props}>
      {shine ? <Shine className="size-full">{content}</Shine> : content}
    </div>
  );
}

export { NeonTile, neonTileVariants };
