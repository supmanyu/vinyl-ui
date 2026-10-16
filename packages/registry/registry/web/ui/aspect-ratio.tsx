'use client';

// Adapted from shadcn/ui (MIT, © shadcn) — https://ui.shadcn.com
import { AspectRatio as AspectRatioPrimitive } from 'radix-ui';

function AspectRatio({ ...props }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
