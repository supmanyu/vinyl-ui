import { View } from 'react-native';
import { cn } from '@/registry/native/lib/utils';
import { Text, TextClassContext } from '@/registry/native/ui/text';

type ViewProps = React.ComponentProps<typeof View> & React.RefAttributes<View>;
type TextProps = React.ComponentProps<typeof Text> & React.RefAttributes<typeof Text>;

function Card({ className, ...props }: ViewProps) {
  return (
    <TextClassContext.Provider value="text-card-foreground">
      <View
        className={cn(
          'flex flex-col gap-6 rounded-lg border-2 border-foreground border-r-4 border-b-4 bg-card py-6',
          className,
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function CardHeader({ className, ...props }: ViewProps) {
  return <View className={cn('flex flex-col gap-1.5 px-6', className)} {...props} />;
}

function CardTitle({ className, ...props }: TextProps) {
  return (
    <Text
      role="heading"
      aria-level={3}
      className={cn('font-bold uppercase leading-none tracking-wide', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: TextProps) {
  return <Text className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

function CardContent({ className, ...props }: ViewProps) {
  return <View className={cn('px-6', className)} {...props} />;
}

function CardFooter({ className, ...props }: ViewProps) {
  return <View className={cn('flex flex-row items-center px-6', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
