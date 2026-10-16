import { Slot } from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { View } from 'react-native';
import { cn } from '@/registry/native/lib/utils';
import { TextClassContext } from '@/registry/native/ui/text';

const badgeVariants = cva(
  'shrink-0 flex-row items-center justify-center gap-1 self-start overflow-hidden rounded-sm border px-2 py-0.5',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary',
        secondary: 'border-transparent bg-secondary',
        accent: 'border-transparent bg-accent',
        destructive: 'border-transparent bg-destructive',
        outline: 'border-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

const badgeTextVariants = cva('font-medium text-xs uppercase tracking-widest', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      accent: 'text-accent-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
});

type BadgeProps = React.ComponentProps<typeof View> &
  React.RefAttributes<View> & { asChild?: boolean } & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, asChild, ...props }: BadgeProps) {
  const Component = asChild ? Slot : View;
  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant })}>
      <Component className={cn(badgeVariants({ variant }), className)} {...props} />
    </TextClassContext.Provider>
  );
}

export type { BadgeProps };
export { Badge, badgeTextVariants, badgeVariants };
