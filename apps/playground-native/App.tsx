import './global.css';

import { PortalHost } from '@rn-primitives/portal';
import {
  FilmBurn,
  NeonDraw,
  Scanlines,
  Shine,
  SmpteWipe,
  StripeText,
  WIPE_PATTERNS,
  type WipePattern,
} from '@vinyl-ui/effects';
import { themes } from '@vinyl-ui/tokens';
import { StatusBar } from 'expo-status-bar';
import { DiscIcon } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Path } from 'react-native-svg';
import { Uniwind, useUniwind } from 'uniwind';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/registry/native/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/registry/native/ui/alert';
import { Avatar, AvatarFallback } from '@/registry/native/ui/avatar';
import { Badge } from '@/registry/native/ui/badge';
import { Button } from '@/registry/native/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/native/ui/card';
import { Checkbox } from '@/registry/native/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/registry/native/ui/dialog';
import { GlitchText } from '@/registry/native/ui/glitch-text';
import { Input } from '@/registry/native/ui/input';
import { Label } from '@/registry/native/ui/label';
import { NeonTile } from '@/registry/native/ui/neon-tile';
import { Progress } from '@/registry/native/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/registry/native/ui/radio-group';
import { Separator } from '@/registry/native/ui/separator';
import { Skeleton } from '@/registry/native/ui/skeleton';
import { Switch } from '@/registry/native/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/native/ui/tabs';
import { TestPattern } from '@/registry/native/ui/test-pattern';
import { Text } from '@/registry/native/ui/text';
import { Textarea } from '@/registry/native/ui/textarea';
import { Toggle } from '@/registry/native/ui/toggle';
import { Wordmark } from '@/registry/native/ui/wordmark';

// Original demo mark: rounded tile, chevron "V" and a star.
const MARK = [
  'M20 8 H80 Q92 8 92 20 V80 Q92 92 80 92 H20 Q8 92 8 80 V20 Q8 8 20 8 Z',
  'M28 26 L48 70 L68 26',
  'M74.0 62.0 L76.5 68.6 L83.5 68.9 L78.0 73.3 L79.9 80.1 L74.0 76.2 L68.1 80.1 L70.0 73.3 L64.5 68.9 L71.5 68.6 Z',
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-muted-foreground text-xs uppercase tracking-widest">{title}</Text>
      {children}
    </View>
  );
}

export default function App() {
  const { theme } = useUniwind();
  const dark = theme === 'dark';
  const [tab, setTab] = useState('a');
  const [pattern, setPattern] = useState<WipePattern>('iris');
  const [replay, setReplay] = useState(0);
  const [loop, setLoop] = useState(true);
  const [tape, setTape] = useState('chrome');
  const [nr, setNr] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background">
        <StatusBar style={dark ? 'light' : 'dark'} />
        <ScrollView contentContainerClassName="gap-8 p-6">
          <View className="flex-row items-center gap-3">
            <Switch
              checked={dark}
              onCheckedChange={(v) => Uniwind.setTheme(v ? 'dark' : 'light')}
              aria-label="Night Drive"
            />
            <Text>{dark ? 'Night Drive' : 'Sun-Faded'}</Text>
          </View>

          <GlitchText>Vinyl UI</GlitchText>

          <Section title="Title sequence: neon draw → tile → wordmark">
            <View className="flex-row items-center gap-6">
              <NeonDraw
                key={`draw${replay}`}
                viewBox="0 0 100 100"
                label="Vinyl mark"
                style={{ width: 88, height: 88 }}
              >
                {MARK.map((d) => (
                  <Path key={d} d={d} />
                ))}
              </NeonDraw>
              <NeonTile>
                <Text>V</Text>
              </NeonTile>
            </View>
            <Wordmark
              lines={['Night', 'Drive', 'Radio']}
              accent={<StripeText className="font-black text-7xl italic">86</StripeText>}
            />
            <Shine className="rounded-md bg-ultraviolet p-4">
              <Text className="text-cream">Shine sweep</Text>
            </Shine>
          </Section>

          <Section title="shadcn components">
            <Alert icon={DiscIcon}>
              <AlertTitle>Now playing</AlertTitle>
              <AlertDescription>Side A, track 3: "Neon Rain".</AlertDescription>
            </Alert>
            <View className="flex-row items-center gap-4">
              <Avatar alt="DJ">
                <AvatarFallback>
                  <Text>DJ</Text>
                </AvatarFallback>
              </Avatar>
              <Separator orientation="vertical" className="h-8" />
              <Toggle pressed={nr} onPressedChange={setNr} variant="outline" aria-label="Dolby NR">
                <Text>Dolby NR</Text>
              </Toggle>
              <Skeleton className="h-8 w-20" />
            </View>
            <View className="flex-row items-center gap-3">
              <Checkbox checked={loop} onCheckedChange={setLoop} aria-labelledby="loop" />
              <Label nativeID="loop" onPress={() => setLoop(!loop)}>
                Auto-reverse
              </Label>
            </View>
            <RadioGroup value={tape} onValueChange={setTape}>
              {['normal', 'chrome', 'metal'].map((v) => (
                <View key={v} className="flex-row items-center gap-3">
                  <RadioGroupItem value={v} aria-labelledby={v} />
                  <Label nativeID={v} onPress={() => setTape(v)}>
                    {v}
                  </Label>
                </View>
              ))}
            </RadioGroup>
            <Progress value={62} aria-label="Rewinding" />
            <Textarea placeholder="Dedicate a song…" aria-label="Dedication" />
            <Accordion type="single" collapsible>
              <AccordionItem value="a">
                <AccordionTrigger>
                  <Text>What's on side A?</Text>
                </AccordionTrigger>
                <AccordionContent>
                  <Text>Five synth tracks.</Text>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>

          <Section title="Button">
            <View className="flex-row flex-wrap gap-3">
              <Button>
                <Text>Play</Text>
              </Button>
              <Button variant="secondary">
                <Text>Rewind</Text>
              </Button>
              <Button variant="outline">
                <Text>Eject</Text>
              </Button>
              <Button variant="destructive">
                <Text>Erase</Text>
              </Button>
              <Button variant="ghost">
                <Text>Ghost</Text>
              </Button>
            </View>
          </Section>

          <Section title="Badge">
            <View className="flex-row flex-wrap gap-2">
              <Badge>
                <Text>Side A</Text>
              </Badge>
              <Badge variant="secondary">
                <Text>33⅓</Text>
              </Badge>
              <Badge variant="accent">
                <Text>Hi-Fi</Text>
              </Badge>
              <Badge variant="outline">
                <Text>Mono</Text>
              </Badge>
            </View>
          </Section>

          <Section title="Card + Input">
            <Card>
              <CardHeader>
                <CardTitle>Mixtape</CardTitle>
                <CardDescription>C90 cassette</CardDescription>
              </CardHeader>
              <CardContent>
                <Input placeholder="Track name" />
              </CardContent>
              <CardFooter>
                <Button size="sm">
                  <Text>Record</Text>
                </Button>
              </CardFooter>
            </Card>
          </Section>

          <Section title="Tabs + Film burn + Scanlines">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="a">
                  <Text>Side A</Text>
                </TabsTrigger>
                <TabsTrigger value="b">
                  <Text>Side B</Text>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="a">
                <FilmBurn className="h-32 rounded-md bg-ultraviolet p-4">
                  <Text className="text-cream">Side A — film burn</Text>
                </FilmBurn>
              </TabsContent>
              <TabsContent value="b">
                <Scanlines className="h-32 rounded-md bg-cyan p-4">
                  <Text className="text-night">Side B — scanlines</Text>
                </Scanlines>
              </TabsContent>
            </Tabs>
          </Section>

          <Section title="Dialog">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Text>Open dialog</Text>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Insert tape</DialogTitle>
                  <DialogDescription>Please rewind.</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </Section>

          <Section title="SMPTE wipe + Test pattern">
            <View className="flex-row flex-wrap gap-2">
              {WIPE_PATTERNS.map((p) => (
                <Badge key={p} variant={p === pattern ? 'default' : 'outline'} asChild>
                  <Text
                    onPress={() => {
                      setPattern(p);
                      setReplay((n) => n + 1);
                    }}
                  >
                    {p}
                  </Text>
                </Badge>
              ))}
            </View>
            <SmpteWipe
              key={`${pattern}${replay}`}
              pattern={pattern}
              duration={900}
              color={themes[dark ? 'dark' : 'light'].background}
            >
              <TestPattern>No signal</TestPattern>
            </SmpteWipe>
          </Section>
        </ScrollView>
        <PortalHost />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
