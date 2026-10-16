import * as TabsPrimitive from '@rn-primitives/tabs';
import { Platform } from 'react-native';
import { FadeInLeft, ReduceMotion } from 'react-native-reanimated';
import { cn } from '@/registry/native/lib/utils';
import { NativeOnlyAnimatedView } from '@/registry/native/ui/native-only-animated-view';
import { TextClassContext } from '@/registry/native/ui/text';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root className={cn('flex flex-col gap-3', className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        'h-10 flex-row items-end gap-1 border-border border-b-2',
        Platform.select({ web: 'inline-flex w-fit', native: 'mr-auto' }),
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { value } = TabsPrimitive.useRootContext();
  const active = value === props.value;
  return (
    <TextClassContext.Provider
      value={cn(
        'text-xs uppercase tracking-widest',
        active ? 'text-foreground' : 'text-muted-foreground',
      )}
    >
      <TabsPrimitive.Trigger
        className={cn(
          '-mb-0.5 h-full flex-row items-center justify-center gap-1.5 border-b-2 px-3',
          Platform.select({
            web: 'inline-flex cursor-default whitespace-nowrap outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none',
          }),
          active ? 'border-primary' : 'border-transparent',
          props.disabled && 'opacity-50',
          className,
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

/** Panels slide in from the left (a bar-wipe nod) each time they become active. */
function TabsContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(Platform.select({ web: 'flex-1 outline-none' }), className)}
      {...props}
    >
      <NativeOnlyAnimatedView entering={FadeInLeft.duration(250).reduceMotion(ReduceMotion.System)}>
        {children}
      </NativeOnlyAnimatedView>
    </TabsPrimitive.Content>
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
