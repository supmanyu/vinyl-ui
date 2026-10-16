import * as SwitchPrimitives from '@rn-primitives/switch';
import { Platform } from 'react-native';
import { cn } from '@/registry/native/lib/utils';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitives.Root>) {
  return (
    <SwitchPrimitives.Root
      className={cn(
        'h-6 w-11 shrink-0 flex-row items-center rounded-sm border-2 border-foreground p-0.5',
        Platform.select({
          web: 'peer inline-flex outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed',
        }),
        props.checked ? 'bg-secondary' : 'bg-muted',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'size-4 rounded-[2px] transition-transform',
          Platform.select({ web: 'pointer-events-none block' }),
          props.checked ? 'translate-x-5 bg-secondary-foreground' : 'translate-x-0 bg-foreground',
        )}
      />
    </SwitchPrimitives.Root>
  );
}

export { Switch };
