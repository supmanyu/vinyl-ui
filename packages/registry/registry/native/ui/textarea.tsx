// Adapted from React Native Reusables (MIT, © Founded Labs) — https://reactnativereusables.com

import { Platform, TextInput } from 'react-native';
import { cn } from '@/registry/native/lib/utils';

function Textarea({
  className,
  multiline = true,
  numberOfLines = Platform.select({ web: 2, native: 8 }), // On web, numberOfLines also determines initial height. On native, it determines the maximum height.
  ...props
}: React.ComponentProps<typeof TextInput> & React.RefAttributes<TextInput>) {
  return (
    <TextInput
      className={cn(
        'text-foreground border-input bg-background flex min-h-16 w-full flex-row rounded-md border-2 px-3 py-2 text-base',
        Platform.select({
          web: 'placeholder:text-muted-foreground focus-visible:border-secondary focus-visible:ring-secondary/40 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive field-sizing-content resize-y outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed',
          native: 'placeholder:text-muted-foreground focus:border-secondary',
        }),
        props.editable === false && 'opacity-50',
        className,
      )}
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical="top"
      {...props}
    />
  );
}

export { Textarea };
