'use client';

import { Label as LabelPrimitive } from 'radix-ui';
// Adapted from shadcn/ui (MIT, © shadcn) — https://ui.shadcn.com
import type * as React from 'react';
import { cn } from '@/registry/web/lib/utils';

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'flex items-center gap-2 font-display text-xs leading-none uppercase tracking-widest select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Label };
