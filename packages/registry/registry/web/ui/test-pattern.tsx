import { smpte } from '@vinyl-ui/tokens';
import type * as React from 'react';
import { cn } from '@/registry/web/lib/utils';

const { pluge } = smpte;
// SMPTE ECR 1-1978 bottom row, as flex-grow weights out of 84.
const BOTTOM: [string, number][] = [
  [pluge.minusI, 15],
  [pluge.white, 15],
  [pluge.plusQ, 15],
  [pluge.black, 15],
  [pluge.superBlack, 4],
  [pluge.black, 4],
  [pluge.subBlack, 4],
  [pluge.black, 12],
];

/** SMPTE colour bars. Great for empty, offline and loading states; overlay a message via children. */
function TestPattern({
  className,
  children,
  label = 'Test pattern',
  ...props
}: React.ComponentProps<'div'> & { label?: string }) {
  return (
    <div
      role="img"
      aria-label={typeof children === 'string' ? children : label}
      data-slot="test-pattern"
      className={cn('relative flex aspect-video w-full flex-col overflow-hidden', className)}
      {...props}
    >
      <div className="flex basis-[67%]">
        {smpte.bars.map((c) => (
          <div key={c} className="flex-1" style={{ background: c }} />
        ))}
      </div>
      <div className="flex basis-[8%]">
        {smpte.castellations.map((c, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static, repeated colours
          <div key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>
      <div className="flex basis-[25%]">
        {BOTTOM.map(([c, w], i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static, repeated colours
          <div key={i} style={{ background: c, flexGrow: w }} />
        ))}
      </div>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-night px-3 py-1 font-mono text-2xl text-cream uppercase tracking-widest">
            {children}
          </span>
        </div>
      )}
    </div>
  );
}

export { TestPattern };
