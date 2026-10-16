'use client';

import { CircleAlertIcon, DiscIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/registry/web/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/registry/web/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/registry/web/ui/alert-dialog';
import { AspectRatio } from '@/registry/web/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarGroup } from '@/registry/web/ui/avatar';
import { Button } from '@/registry/web/ui/button';
import { Checkbox } from '@/registry/web/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/registry/web/ui/collapsible';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/registry/web/ui/context-menu';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/registry/web/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/registry/web/ui/hover-card';
import { Label } from '@/registry/web/ui/label';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/registry/web/ui/menubar';
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/web/ui/popover';
import { Progress } from '@/registry/web/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/registry/web/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/registry/web/ui/select';
import { Separator } from '@/registry/web/ui/separator';
import { Skeleton } from '@/registry/web/ui/skeleton';
import { TestPattern } from '@/registry/web/ui/test-pattern';
import { Textarea } from '@/registry/web/ui/textarea';
import { Toggle } from '@/registry/web/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/registry/web/ui/toggle-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/registry/web/ui/tooltip';

/** Live demos for the shadcn/ui components restyled by Vinyl. */
export const SHADCN_PREVIEWS: Record<string, () => ReactNode> = {
  accordion: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="a">
        <AccordionTrigger>What's on side A?</AccordionTrigger>
        <AccordionContent>Five synth tracks recorded live to tape.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Is it Dolby NR?</AccordionTrigger>
        <AccordionContent>Dolby B, as the gods intended.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  alert: () => (
    <div className="grid w-full max-w-md gap-3">
      <Alert>
        <DiscIcon />
        <AlertTitle>Now playing</AlertTitle>
        <AlertDescription>Side A, track 3: "Neon Rain".</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertTitle>Tape jam</AlertTitle>
        <AlertDescription>Eject the cassette and wind it back with a pencil.</AlertDescription>
      </Alert>
    </div>
  ),
  'alert-dialog': () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Erase tape</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Erase side A?</AlertDialogTitle>
          <AlertDialogDescription>
            This records silence over every track. You can't undo it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep it</AlertDialogCancel>
          <AlertDialogAction>Erase</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  'aspect-ratio': () => (
    <div className="w-full max-w-sm">
      <AspectRatio ratio={4 / 3}>
        <TestPattern className="size-full">4:3</TestPattern>
      </AspectRatio>
    </div>
  ),
  avatar: () => (
    <div className="flex items-center gap-6">
      <Avatar>
        <AvatarFallback>DJ</AvatarFallback>
      </Avatar>
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>AX</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>KM</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>VR</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  ),
  checkbox: () => (
    <div className="flex items-center gap-3">
      <Checkbox id="loop" defaultChecked />
      <Label htmlFor="loop">Auto-reverse</Label>
    </div>
  ),
  collapsible: () => (
    <Collapsible className="w-full max-w-sm">
      <CollapsibleTrigger asChild>
        <Button variant="outline" size="sm">
          Liner notes
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapse-close data-[state=open]:animate-collapse-open">
        <p className="pt-3 text-muted-foreground text-sm">
          Recorded in one night on a borrowed four-track.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
  'context-menu': () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-md border-2 border-border border-dashed text-muted-foreground text-sm">
        Right-click the deck
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem>
          Play <ContextMenuShortcut>⌘P</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Rewind <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Eject</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  'dropdown-menu': () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Deck options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>Playback</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>Dolby NR</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Auto-reverse</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Clean heads</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  'hover-card': () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nightdrive</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 text-sm">
        <p className="font-bold font-display uppercase">Night Drive Radio</p>
        <p className="text-muted-foreground">Synthwave, all night, 88.6 FM.</p>
      </HoverCardContent>
    </HoverCard>
  ),
  label: () => (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="callsign">Callsign</Label>
      <input
        id="callsign"
        className="h-10 rounded-md border-2 border-input bg-background px-3 font-mono text-lg"
        placeholder="KVNL"
      />
    </div>
  ),
  menubar: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Deck</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Play <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Record <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Eject</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Tape</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Type I (Normal)</MenubarItem>
          <MenubarItem>Type II (Chrome)</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  popover: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Track info</Button>
      </PopoverTrigger>
      <PopoverContent className="text-sm">
        <p className="font-bold font-display uppercase">Neon Rain</p>
        <p className="text-muted-foreground">4:12 · 118 BPM · Side A</p>
      </PopoverContent>
    </Popover>
  ),
  progress: () => <Progress value={62} className="max-w-sm" aria-label="Rewinding" />,
  'radio-group': () => (
    <RadioGroup defaultValue="chrome">
      {['normal', 'chrome', 'metal'].map((v) => (
        <div key={v} className="flex items-center gap-3">
          <RadioGroupItem value={v} id={`tape-${v}`} />
          <Label htmlFor={`tape-${v}`}>{v}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
  select: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Pick a station" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>FM</SelectLabel>
          <SelectItem value="886">88.6 Night Drive</SelectItem>
          <SelectItem value="1012">101.2 Neon City</SelectItem>
          <SelectItem value="1077">107.7 Wave</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  separator: () => (
    <div className="flex h-5 items-center gap-4 text-sm">
      <span>Side A</span>
      <Separator orientation="vertical" />
      <span>Side B</span>
      <Separator orientation="vertical" />
      <span>Bonus</span>
    </div>
  ),
  skeleton: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="size-12" />
      <div className="grid gap-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  ),
  textarea: () => (
    <Textarea className="max-w-sm" placeholder="Dedicate a song…" aria-label="Dedication" />
  ),
  toggle: () => (
    <Toggle variant="outline" aria-label="Loop">
      Loop
    </Toggle>
  ),
  'toggle-group': () => (
    <ToggleGroup type="single" defaultValue="b" variant="outline">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
  tooltip: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Press PLAY to start</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
