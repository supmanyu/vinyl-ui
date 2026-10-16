'use client';

import { HoverCard as HoverCardPrimitive } from 'radix-ui';
// Adapted from shadcn/ui (MIT, © shadcn) — https://ui.shadcn.com
import type * as React from 'react';
import { cn } from '@/registry/web/lib/utils';

function HoverCard({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />;
}

function HoverCardContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border-2 bg-popover p-4 text-popover-foreground outline-hidden border-foreground shadow-retro [--wipe-duration:160ms] data-[state=open]:animate-wipe-barn-door-h data-[state=closed]:wipe-out data-[state=closed]:animate-wipe-box',
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardContent, HoverCardTrigger };
