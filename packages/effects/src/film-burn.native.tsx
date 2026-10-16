import { effects } from '@vinyl-ui/tokens';
import { useEffect, useId } from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { decorative } from './a11y.native';
import type { FilmBurnProps } from './types';

export interface NativeFilmBurnProps extends FilmBurnProps {
  style?: StyleProp<ViewStyle>;
}

/** Warm light-leak overlay drifting across its children. Decorative only. */
export function FilmBurn({ children, active = true, className, style }: NativeFilmBurnProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const reduced = useReducedMotion();
  const t = useSharedValue(0);

  useEffect(() => {
    if (!active || reduced) return;
    t.value = withRepeat(
      withTiming(1, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
    return () => cancelAnimation(t);
  }, [active, reduced, t]);

  const drift = useAnimatedStyle(() => ({
    opacity: 0.55 + 0.3 * t.value,
    transform: [
      { translateX: -16 + 32 * t.value },
      { translateY: 10 - 20 * t.value },
      { scale: 1 + 0.15 * t.value },
    ],
  }));

  return (
    <View {...({ className } as object)} style={[styles.root, style]}>
      {children}
      {active && (
        <Animated.View {...decorative} style={[styles.overlay, drift]}>
          <Svg width="100%" height="100%">
            <Defs>
              <RadialGradient id={`${id}a`} cx="15%" cy="85%" rx="40%" ry="50%">
                <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.8} />
                <Stop offset="0.25" stopColor={effects.burn} stopOpacity={0.8} />
                <Stop offset="1" stopColor={effects.burn} stopOpacity={0} />
              </RadialGradient>
              <RadialGradient id={`${id}b`} cx="90%" cy="10%" rx="30%" ry="40%">
                <Stop offset="0" stopColor={effects.burn} stopOpacity={0.7} />
                <Stop offset="1" stopColor={effects.burn} stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Rect width="100%" height="100%" fill={`url(#${id}a)`} />
            <Rect width="100%" height="100%" fill={`url(#${id}b)`} />
          </Svg>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { overflow: 'hidden' },
  overlay: {
    position: 'absolute',
    top: '-20%',
    left: '-20%',
    right: '-20%',
    bottom: '-20%',
    mixBlendMode: 'screen',
  },
});
