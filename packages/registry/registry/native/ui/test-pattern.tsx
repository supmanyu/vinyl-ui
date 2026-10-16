import { smpte } from '@vinyl-ui/tokens';
import { Text, View } from 'react-native';
import { cn } from '@/registry/native/lib/utils';

const { pluge } = smpte;
// SMPTE ECR 1-1978 bottom row, as flex weights out of 84.
const BOTTOM: [string, number][] = [
  [pluge.minusI, 15],
  [pluge.white, 15],
  [pluge.plusQ, 15],
  [pluge.black, 15],
  [pluge.superBlack, 4],
  [pluge.black, 4],
  [pluge.subBlack, 4],
  [pluge.black, 12],
];

/** SMPTE colour bars. Great for empty, offline and loading states; overlay a message via children. */
function TestPattern({
  className,
  children,
  label = 'Test pattern',
}: {
  className?: string;
  children?: string;
  label?: string;
}) {
  return (
    <View
      accessible
      role="img"
      aria-label={children ?? label}
      className={cn('aspect-video w-full flex-col overflow-hidden', className)}
    >
      <View className="flex-row" style={{ flex: 67 }}>
        {smpte.bars.map((c) => (
          <View key={c} style={{ flex: 1, backgroundColor: c }} />
        ))}
      </View>
      <View className="flex-row" style={{ flex: 8 }}>
        {smpte.castellations.map((c, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static, repeated colours
          <View key={i} style={{ flex: 1, backgroundColor: c }} />
        ))}
      </View>
      <View className="flex-row" style={{ flex: 25 }}>
        {BOTTOM.map(([c, w], i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static, repeated colours
          <View key={i} style={{ flex: w, backgroundColor: c }} />
        ))}
      </View>
      {children ? (
        <View className="absolute inset-0 items-center justify-center">
          <Text className="bg-night px-3 py-1 text-2xl text-cream uppercase tracking-widest">
            {children}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export { TestPattern };
