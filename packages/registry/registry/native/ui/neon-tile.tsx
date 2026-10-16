import { Shine } from '@vinyl-ui/effects';
import { gradients, palette } from '@vinyl-ui/tokens';
import { cva, type VariantProps } from 'class-variance-authority';
import { useId } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { cn } from '@/registry/native/lib/utils';
import { TextClassContext } from '@/registry/native/ui/text';

const neonTileVariants = cva('overflow-hidden rounded-xl border-2 border-yellow', {
  variants: {
    size: { sm: 'size-12', md: 'size-20', lg: 'size-32' },
  },
  defaultVariants: { size: 'md' },
});

const TEXT = { sm: 'text-xl', md: 'text-4xl', lg: 'text-6xl' } as const;

// 135° like the web `bg-sunset`.
const { stops } = gradients.sunset;

/** Sunset-gradient app-icon tile with a glowing gold rim (glow is iOS-only). */
function NeonTile({
  size = 'md',
  shine = true,
  className,
  children,
}: VariantProps<typeof neonTileVariants> & {
  shine?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const content = (
    <View className="flex-1 items-center justify-center">
      <TextClassContext.Provider value={cn('font-black text-night italic', TEXT[size ?? 'md'])}>
        {children}
      </TextClassContext.Provider>
    </View>
  );
  return (
    <View style={styles.glow} className="self-start">
      <View className={cn(neonTileVariants({ size }), className)}>
        <Svg style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              {stops.map((c, i) => (
                <Stop key={c} offset={i / (stops.length - 1)} stopColor={c} />
              ))}
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill={`url(#${id})`} />
        </Svg>
        {shine ? <Shine style={styles.fill}>{content}</Shine> : content}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  glow: {
    shadowColor: palette.yellow,
    shadowOpacity: 0.9,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  fill: { flex: 1 },
});

export { NeonTile, neonTileVariants };
