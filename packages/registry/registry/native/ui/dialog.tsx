// Adapted from React Native Reusables (MIT, © Founded Labs) — https://reactnativereusables.com
import * as DialogPrimitive from '@rn-primitives/dialog';
import { X } from 'lucide-react-native';
import * as React from 'react';
import { type GestureResponderEvent, Platform, Text, View, type ViewProps } from 'react-native';
import {
  type EntryExitAnimationFunction,
  FadeIn,
  FadeOut,
  ReduceMotion,
  useReducedMotion,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';
import { cn } from '@/registry/native/lib/utils';
import { Icon } from '@/registry/native/ui/icon';
import { NativeOnlyAnimatedView } from '@/registry/native/ui/native-only-animated-view';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const FullWindowOverlay = Platform.OS === 'ios' ? RNFullWindowOverlay : React.Fragment;

// CRT power-on: a thin horizontal line that snaps open vertically.
const crtOn: EntryExitAnimationFunction = () => {
  'worklet';
  return {
    initialValues: { opacity: 0, transform: [{ scaleX: 0.6 }, { scaleY: 0.02 }] },
    animations: {
      opacity: withTiming(1, { duration: 80 }),
      transform: [
        { scaleX: withTiming(1, { duration: 140 }) },
        { scaleY: withDelay(100, withTiming(1, { duration: 200 })) },
      ],
    },
  };
};

// CRT power-off: collapse to a line, then fade.
const crtOff: EntryExitAnimationFunction = () => {
  'worklet';
  return {
    initialValues: { opacity: 1, transform: [{ scaleX: 1 }, { scaleY: 1 }] },
    animations: {
      opacity: withDelay(160, withTiming(0, { duration: 80 })),
      transform: [
        { scaleX: withDelay(120, withTiming(0.2, { duration: 120 })) },
        { scaleY: withTiming(0.02, { duration: 140 }) },
      ],
    },
  };
};

function DialogOverlay({
  className,
  children,
  onPress,
  ...props
}: Omit<React.ComponentProps<typeof DialogPrimitive.Overlay>, 'asChild'> & {
  children?: React.ReactNode;
}) {
  const { onOpenChange } = DialogPrimitive.useRootContext();
  const reduced = useReducedMotion();

  function onOverlayPress(event: GestureResponderEvent) {
    onPress?.(event);
    if (event.target === event.currentTarget && !event.isDefaultPrevented()) {
      onOpenChange(false);
    }
  }

  return (
    <FullWindowOverlay>
      <DialogPrimitive.Overlay
        className={cn(
          'absolute top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-night/80 p-2',
          Platform.select({ web: 'fixed cursor-default [&>*]:cursor-auto' }),
          className,
        )}
        {...props}
        onPress={Platform.select({ web: onOverlayPress, native: onPress })}
        asChild={Platform.OS !== 'web'}
      >
        <NativeOnlyAnimatedView
          entering={FadeIn.duration(150).reduceMotion(ReduceMotion.System)}
          exiting={FadeOut.duration(200).reduceMotion(ReduceMotion.System)}
          as="Pressable"
        >
          <NativeOnlyAnimatedView
            entering={reduced ? undefined : crtOn}
            exiting={reduced ? undefined : crtOff}
            style={{ width: '100%' }}
          >
            {children}
          </NativeOnlyAnimatedView>
        </NativeOnlyAnimatedView>
      </DialogPrimitive.Overlay>
    </FullWindowOverlay>
  );
}

function DialogContent({
  className,
  portalHost,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { portalHost?: string }) {
  return (
    <DialogPortal hostName={portalHost}>
      <DialogOverlay>
        <DialogPrimitive.Content
          className={cn(
            'z-50 mx-auto flex w-full flex-col gap-4 rounded-lg border-2 border-primary bg-background p-6 sm:max-w-lg',
            Platform.select({ web: 'shadow-neon' }),
            className,
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close
            className={cn(
              'absolute top-4 right-4 rounded-sm opacity-70 active:opacity-100',
              Platform.select({
                web: 'outline-none transition-opacity hover:opacity-100 focus-visible:ring-[3px] focus-visible:ring-ring/50',
              }),
            )}
            hitSlop={12}
          >
            <Icon as={X} className="size-4 shrink-0 text-foreground web:pointer-events-none" />
            <Text className="sr-only">Close</Text>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: ViewProps) {
  return (
    <View className={cn('flex flex-col gap-2 text-center sm:text-left', className)} {...props} />
  );
}

function DialogFooter({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn(
        'font-bold text-foreground text-lg uppercase leading-none tracking-wide',
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
