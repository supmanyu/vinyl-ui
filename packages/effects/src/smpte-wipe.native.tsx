import { themes } from '@vinyl-ui/tokens';
import { useEffect, useState } from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedProps,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { decorative } from './a11y.native';
import type { SmpteWipeProps } from './types';
import { wipePath } from './wipe-path';

export interface NativeSmpteWipeProps extends SmpteWipeProps {
  /**
   * Colour of the cover that wipes away (native draws a cover instead of clipping).
   * Match it to whatever sits behind the component. Default: dark theme background.
   */
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const EASE = Easing.bezier(0.65, 0, 0.35, 1);

/** Reveals (or conceals) its children with an SMPTE-style geometric wipe. Re-key to replay. */
export function SmpteWipe({
  children,
  pattern = 'bar-left',
  mode = 'in',
  duration = 600,
  onEnd,
  color = themes.dark.background,
  className,
  style,
}: NativeSmpteWipeProps) {
  const reduced = useReducedMotion();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const p = useSharedValue(mode === 'in' ? 0 : 1);

  useEffect(() => {
    if (!size.w) return;
    p.value = withTiming(
      mode === 'in' ? 1 : 0,
      { duration: reduced ? 0 : duration, easing: EASE },
      (done) => {
        if (done && onEnd) runOnJS(onEnd)();
      },
    );
  }, [size.w, mode, duration, reduced, onEnd, p]);

  const animatedProps = useAnimatedProps(() => ({ d: wipePath(pattern, p.value, size.w, size.h) }));

  return (
    <View
      {...({ className } as object)}
      style={[style, mode === 'in' && !size.w && styles.hidden]}
      onLayout={(e) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
    >
      {children}
      {size.w > 0 && (
        <Svg {...decorative} style={StyleSheet.absoluteFill}>
          <AnimatedPath animatedProps={animatedProps} fill={color} fillRule="evenodd" />
        </Svg>
      )}
    </View>
  );
}

const styles = StyleSheet.create({ hidden: { opacity: 0 } });
