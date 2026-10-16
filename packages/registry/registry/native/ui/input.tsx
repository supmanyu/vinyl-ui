import { Platform, TextInput } from 'react-native';
import { cn } from '@/registry/native/lib/utils';

function Input({
  className,
  ...props
}: React.ComponentProps<typeof TextInput> & React.RefAttributes<TextInput>) {
  return (
    <TextInput
      className={cn(
        'flex h-11 w-full min-w-0 flex-row items-center rounded-md border-2 border-input bg-background px-3 py-1 text-base text-foreground leading-5',
        props.editable === false && 'opacity-50',
        Platform.select({
          web: 'outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:border-secondary focus-visible:ring-[3px] focus-visible:ring-secondary/40',
          native: 'placeholder:text-muted-foreground focus:border-secondary',
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Input };
