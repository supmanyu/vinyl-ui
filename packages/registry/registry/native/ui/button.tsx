import { cva, type VariantProps } from 'class-variance-authority';
import { Platform, Pressable } from 'react-native';
import { cn } from '@/registry/native/lib/utils';
import { TextClassContext } from '@/registry/native/ui/text';

// Thick bottom/right border = hard retro shadow; it thins and the button shifts on press.
const raised =
  'border-foreground border-b-4 border-r-4 active:translate-x-0.5 active:translate-y-0.5 active:border-b-2 active:border-r-2';

const buttonVariants = cva(
  cn(
    'group shrink-0 flex-row items-center justify-center gap-2 rounded-md border-2',
    Platform.select({
      web: 'outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none',
    }),
  ),
  {
    variants: {
      variant: {
        default: cn('bg-primary', raised),
        secondary: cn('bg-secondary', raised),
        destructive: cn('bg-destructive', raised),
        outline: 'border-primary bg-transparent active:bg-primary',
        ghost: 'border-transparent active:bg-accent',
        link: 'border-transparent',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 gap-1.5 px-3',
        lg: 'h-12 px-8',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

const buttonTextVariants = cva('font-bold text-sm uppercase tracking-wider', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-primary group-active:text-primary-foreground',
      ghost: 'text-foreground group-active:text-accent-foreground',
      link: 'text-primary group-active:underline',
    },
    size: { default: '', sm: 'text-xs', lg: 'text-base', icon: '' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        className={cn(props.disabled && 'opacity-50', buttonVariants({ variant, size }), className)}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export type { ButtonProps };
export { Button, buttonTextVariants, buttonVariants };
