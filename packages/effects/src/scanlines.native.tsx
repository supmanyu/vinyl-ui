import { useId } from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import Svg, { Defs, Pattern, Rect } from 'react-native-svg';
import { decorative } from './a11y.native';
import type { ScanlinesProps } from './types';

export interface NativeScanlinesProps extends ScanlinesProps {
  style?: StyleProp<ViewStyle>;
}

/** CRT scanline overlay. Decorative only. */
export function Scanlines({ children, className, style }: NativeScanlinesProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <View {...({ className } as object)} style={style}>
      {children}
      <View {...decorative} style={StyleSheet.absoluteFill}>
        <Svg width="100%" height="100%">
          <Defs>
            <Pattern id={id} width="3" height="3" patternUnits="userSpaceOnUse">
              <Rect y="2" width="3" height="1" fill="#000000" fillOpacity={0.25} />
            </Pattern>
          </Defs>
          <Rect width="100%" height="100%" fill={`url(#${id})`} />
        </Svg>
      </View>
    </View>
  );
}
