import { effects } from '@vinyl-ui/tokens';
import { useEffect } from 'react';
import { type StyleProp, StyleSheet, Text, type TextStyle, View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { decorative } from './a11y.native';
import type { RGBSplitProps } from './types';

export interface NativeRGBSplitProps extends RGBSplitProps {
  /** Applied to every text layer (font, size, colour of the front layer). */
  style?: StyleProp<TextStyle>;
}

const snap = { duration: 0 };

/**
 * Chromatic-aberration text: two tinted, offset copies behind the real text.
 * `className` is forwarded to each Text layer (Uniwind), `children` should be text.
 */
export function RGBSplit({
  children,
  intensity = 2,
  animated = false,
  className,
  style,
}: NativeRGBSplitProps) {
  const reduced = useReducedMotion();
  const jitter = useSharedValue(0);

  useEffect(() => {
    if (!animated || reduced) {
      jitter.value = 0;
      return;
    }
    // ~0.3s burst every 4s, matching the web keyframes.
    jitter.value = withRepeat(
      withSequence(
        withDelay(3600, withTiming(2, snap)),
        withDelay(120, withTiming(-1.5, snap)),
        withDelay(120, withTiming(0, snap)),
      ),
      -1,
    );
    return () => cancelAnimation(jitter);
  }, [animated, reduced, jitter]);

  const red = useAnimatedStyle(() => ({
    transform: [{ translateX: -intensity * (1 + jitter.value) }],
  }));
  const blue = useAnimatedStyle(() => ({
    transform: [{ translateX: intensity * (1 - jitter.value) }],
  }));
  const cls = { className } as object;

  return (
    <View style={styles.root}>
      <Animated.Text
        {...decorative}
        {...cls}
        style={[style, styles.layer, { color: effects['glitch-r'] }, red]}
      >
        {children}
      </Animated.Text>
      <Animated.Text
        {...decorative}
        {...cls}
        style={[style, styles.layer, { color: effects['glitch-b'] }, blue]}
      >
        {children}
      </Animated.Text>
      <Text {...cls} style={style}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignSelf: 'flex-start' },
  layer: { position: 'absolute', top: 0, left: 0, right: 0 },
});
