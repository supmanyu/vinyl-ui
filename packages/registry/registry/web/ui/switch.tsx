'use client';

import { Switch as SwitchPrimitive } from 'radix-ui';
import type * as React from 'react';
import { cn } from '@/registry/web/lib/utils';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer inline-flex h-6 w-11 shrink-0 items-center rounded-sm border-2 border-foreground p-0.5 outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-secondary data-[state=unchecked]:bg-muted',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-4 rounded-[2px] bg-foreground transition-transform data-[state=checked]:translate-x-5 data-[state=checked]:bg-secondary-foreground data-[state=unchecked]:translate-x-0"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
