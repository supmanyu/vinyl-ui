'use client';

import { Progress as ProgressPrimitive } from 'radix-ui';
// Adapted from shadcn/ui (MIT, © shadcn) — https://ui.shadcn.com
import type * as React from 'react';
import { cn } from '@/registry/web/lib/utils';

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'relative h-3 w-full overflow-hidden rounded-sm border-2 border-foreground bg-muted',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 bg-sunset transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
