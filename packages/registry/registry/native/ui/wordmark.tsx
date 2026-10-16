import { palette } from '@vinyl-ui/tokens';
import { cva, type VariantProps } from 'class-variance-authority';
import { Text, View } from 'react-native';
import { cn } from '@/registry/native/lib/utils';

// Line colours cycle yellow → magenta → blue, each with a soft neon bloom.
const LINE = [palette.yellow, palette.magenta, palette.blue] as const;

const wordmarkVariants = cva('font-black uppercase italic tracking-tight', {
  variants: {
    size: { sm: 'text-2xl', md: 'text-4xl', lg: 'text-6xl' },
  },
  defaultVariants: { size: 'md' },
});

/** Stacked, slanted multi-colour title lockup. `accent` sits beside the stack (try `<StripeText>`). */
function Wordmark({
  lines,
  accent,
  size,
  className,
}: VariantProps<typeof wordmarkVariants> & {
  lines: string[];
  accent?: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      accessible
      role="heading"
      aria-label={lines.join(' ')}
      className={cn('flex-row items-center gap-3 self-start', className)}
    >
      <View style={{ transform: [{ skewX: '-8deg' }] }}>
        {lines.map((line, i) => {
          const color = LINE[i % LINE.length];
          return (
            <Text
              key={line}
              className={wordmarkVariants({ size })}
              style={{ color, lineHeight: undefined, textShadowColor: color, textShadowRadius: 8 }}
            >
              {line}
            </Text>
          );
        })}
      </View>
      {accent}
    </View>
  );
}

export { Wordmark, wordmarkVariants };
