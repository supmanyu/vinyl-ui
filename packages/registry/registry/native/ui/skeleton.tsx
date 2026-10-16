// Adapted from React Native Reusables (MIT, © Founded Labs) — https://reactnativereusables.com

import * as React from 'react';
import type { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '@/registry/native/lib/utils';

const duration = 1000;

function Skeleton({
  className,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  const sv = useSharedValue(1);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (reduced) return;
    sv.value = withRepeat(withTiming(0.5, { duration }), -1, true);
  }, [reduced, sv]);

  const style = useAnimatedStyle(
    () => ({
      opacity: sv.value,
    }),
    [sv],
  );
  return (
    <Animated.View style={style} className={cn('bg-muted rounded-md', className)} {...props} />
  );
}

export { Skeleton };
