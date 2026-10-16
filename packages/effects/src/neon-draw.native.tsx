import { themes } from '@vinyl-ui/tokens';
import { useEffect } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedProps,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { G } from 'react-native-svg';
import type { NeonDrawProps } from './types';

export interface NativeNeonDrawProps extends NeonDrawProps {
  style?: StyleProp<ViewStyle>;
}

const AnimatedG = Animated.createAnimatedComponent(G);
// Dash length longer than any path in a typical 0–100 viewBox (same default as the web).
const LENGTH = 1000;
const EASE = Easing.bezier(0.65, 0, 0.35, 1);

/** Traces react-native-svg shapes with a neon stroke. The glow is iOS-only (layer shadow). */
export function NeonDraw({
  children,
  viewBox,
  color = themes.dark.primary,
  strokeWidth = 2,
  duration = 1500,
  glow = true,
  label,
  onEnd,
  className,
  style,
}: NativeNeonDrawProps) {
  const reduced = useReducedMotion();
  const offset = useSharedValue(LENGTH);

  useEffect(() => {
    offset.value = withTiming(0, { duration: reduced ? 0 : duration, easing: EASE }, (done) => {
      if (done && onEnd) runOnJS(onEnd)();
    });
  }, [duration, reduced, onEnd, offset]);

  const animatedProps = useAnimatedProps(() => ({ strokeDashoffset: offset.value }));

  return (
    <View
      {...({ className } as object)}
      accessible={!!label}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={!label}
      style={[
        glow && {
          shadowColor: color,
          shadowOpacity: 1,
          shadowRadius: strokeWidth * 2,
          shadowOffset: { width: 0, height: 0 },
        },
        style,
      ]}
    >
      <Svg
        viewBox={viewBox}
        width="100%"
        height="100%"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <AnimatedG strokeDasharray={[LENGTH]} animatedProps={animatedProps}>
          {children}
        </AnimatedG>
      </Svg>
    </View>
  );
}
