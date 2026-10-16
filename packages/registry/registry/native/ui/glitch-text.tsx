import { RGBSplit } from '@vinyl-ui/effects';
import { View } from 'react-native';
import { cn } from '@/registry/native/lib/utils';

const SIZE = { 1: 'text-5xl', 2: 'text-4xl', 3: 'text-2xl', 4: 'text-xl' } as const;

/** Display heading with chromatic aberration. Use for short headings, never body copy. */
function GlitchText({
  level = 1,
  animated = true,
  intensity = 2,
  className,
  children,
}: {
  level?: 1 | 2 | 3 | 4;
  animated?: boolean;
  intensity?: number;
  className?: string;
  children: string;
}) {
  return (
    <View accessible role="heading" aria-level={level} aria-label={children}>
      <RGBSplit
        animated={animated}
        intensity={intensity}
        className={cn(
          'font-black text-foreground uppercase tracking-tight',
          SIZE[level],
          className,
        )}
      >
        {children}
      </RGBSplit>
    </View>
  );
}

export { GlitchText };
