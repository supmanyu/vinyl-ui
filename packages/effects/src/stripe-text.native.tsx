import MaskedViewBase from '@react-native-masked-view/masked-view';
import { gradients } from '@vinyl-ui/tokens';
import { type ComponentType, type ReactElement, useId, useState } from 'react';
import { type StyleProp, StyleSheet, Text, type TextStyle, type ViewProps } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { decorative } from './a11y.native';
import type { StripeTextProps } from './types';

// The package's own types resolve React from its install location; pin them here.
const MaskedView = MaskedViewBase as unknown as ComponentType<
  ViewProps & { maskElement: ReactElement }
>;

export interface NativeStripeTextProps extends StripeTextProps {
  /** Applied to the text (size, weight). Colour is ignored. */
  style?: StyleProp<TextStyle>;
  /** Stripe pitch in px. Default: text height / 8. */
  pitch?: number;
  /** Gradient stops, top to bottom. Default: `gradients.vice.stops`. */
  stops?: readonly string[];
}

/**
 * Outrun slit type: the vice gradient cut into horizontal stripes, masked by the text.
 * Requires `@react-native-masked-view/masked-view`. Pass text as `children`.
 */
export function StripeText({
  children,
  className,
  style,
  pitch,
  stops = gradients.vice.stops,
}: NativeStripeTextProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [size, setSize] = useState({ w: 0, h: 0 });
  const cls = { className } as object;
  const step = pitch ?? Math.max(3, size.h / 8);
  const rows = size.h ? Math.ceil(size.h / step) : 0;

  return (
    <MaskedView
      style={styles.root}
      maskElement={
        <Text {...cls} style={style}>
          {children}
        </Text>
      }
    >
      {/* Invisible copy sizes the view and is what screen readers announce. */}
      <Text
        {...cls}
        style={[style, styles.hidden]}
        onLayout={(e) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
      >
        {children}
      </Text>
      {rows > 0 && (
        <Svg {...decorative} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id={id} x1="0" y1="0" x2="0" y2={size.h} gradientUnits="userSpaceOnUse">
              {stops.map((c, i) => (
                <Stop key={c} offset={i / (stops.length - 1)} stopColor={c} />
              ))}
            </LinearGradient>
          </Defs>
          {Array.from({ length: rows }, (_, i) => i * step).map((y) => (
            <Rect key={y} x="0" y={y} width={size.w} height={step * 0.7} fill={`url(#${id})`} />
          ))}
        </Svg>
      )}
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  root: { alignSelf: 'flex-start' },
  hidden: { opacity: 0 },
});
