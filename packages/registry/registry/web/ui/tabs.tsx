'use client';

import { Tabs as TabsPrimitive } from 'radix-ui';
import type * as React from 'react';
import { cn } from '@/registry/web/lib/utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-3', className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn('inline-flex h-10 w-fit items-end gap-1 border-border border-b-2', className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        '-mb-0.5 inline-flex h-full items-center gap-1.5 whitespace-nowrap border-transparent border-b-2 px-3 font-display text-muted-foreground text-xs uppercase tracking-widest outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-primary data-[state=active]:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className,
      )}
      {...props}
    />
  );
}

/** Panels bar-wipe in each time they become active. */
function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        'flex-1 outline-none [--wipe-duration:350ms] data-[state=active]:animate-wipe-bar-left',
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
