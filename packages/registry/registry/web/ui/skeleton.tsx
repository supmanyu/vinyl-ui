// Adapted from shadcn/ui (MIT, © shadcn) — https://ui.shadcn.com
import { cn } from '@/registry/web/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('scanlines animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
