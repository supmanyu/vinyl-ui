import { useEffect, useId, useState } from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { decorative } from './a11y.native';
import type { ShineProps } from './types';

export interface NativeShineProps extends ShineProps {
  style?: StyleProp<ViewStyle>;
}

/** A diagonal sheen that sweeps across its children every cycle. Decorative only. */
export function Shine({ children, duration = 3000, className, style }: NativeShineProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const reduced = useReducedMotion();
  const [w, setW] = useState(0);
  const t = useSharedValue(0);

  useEffect(() => {
    if (!w || reduced) return;
    // Sweep for 60% of the cycle, rest for 40% — same rhythm as the web keyframes.
    t.value = withRepeat(
      withSequence(
        withTiming(1, { duration: duration * 0.6, easing: Easing.inOut(Easing.ease) }),
        withDelay(duration * 0.4, withTiming(0, { duration: 0 })),
      ),
      -1,
    );
    return () => cancelAnimation(t);
  }, [w, reduced, duration, t]);

  const sweep = useAnimatedStyle(() => ({ transform: [{ translateX: (t.value * 2 - 1) * w }] }));

  return (
    <View
      {...({ className } as object)}
      style={[styles.root, style]}
      onLayout={(e) => setW(e.nativeEvent.layout.width)}
    >
      {children}
      {w > 0 && !reduced && (
        <Animated.View {...decorative} style={[StyleSheet.absoluteFill, sweep]}>
          <Svg width="100%" height="100%">
            <Defs>
              <LinearGradient id={id} x1="0" y1="0" x2="1" y2="0.27">
                <Stop offset="0.35" stopColor="#FFFFFF" stopOpacity={0} />
                <Stop offset="0.5" stopColor="#FFFFFF" stopOpacity={0.5} />
                <Stop offset="0.65" stopColor="#FFFFFF" stopOpacity={0} />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill={`url(#${id})`} />
          </Svg>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({ root: { overflow: 'hidden' } });
