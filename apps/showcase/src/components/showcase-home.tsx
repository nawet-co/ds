"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@nawet/ds-react/components/accordion";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@nawet/ds-react/components/alert";
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
} from "@nawet/ds-react/components/alert-dialog";
import { AspectRatio } from "@nawet/ds-react/components/aspect-ratio";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@nawet/ds-react/components/attachment";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@nawet/ds-react/components/avatar";
import { Badge } from "@nawet/ds-react/components/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@nawet/ds-react/components/breadcrumb";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@nawet/ds-react/components/bubble";
import { Button } from "@nawet/ds-react/components/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@nawet/ds-react/components/button-group";
import { Calendar } from "@nawet/ds-react/components/calendar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nawet/ds-react/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@nawet/ds-react/components/carousel";
import { Checkbox } from "@nawet/ds-react/components/checkbox";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@nawet/ds-react/components/code-block";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@nawet/ds-react/components/collapsible";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@nawet/ds-react/components/combobox";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@nawet/ds-react/components/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@nawet/ds-react/components/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nawet/ds-react/components/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@nawet/ds-react/components/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@nawet/ds-react/components/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@nawet/ds-react/components/empty";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@nawet/ds-react/components/field";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@nawet/ds-react/components/hover-card";
import { Input } from "@nawet/ds-react/components/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@nawet/ds-react/components/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@nawet/ds-react/components/input-otp";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@nawet/ds-react/components/item";
import { Kbd, KbdGroup } from "@nawet/ds-react/components/kbd";
import { Label } from "@nawet/ds-react/components/label";
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@nawet/ds-react/components/marker";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@nawet/ds-react/components/menubar";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@nawet/ds-react/components/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@nawet/ds-react/components/message-scroller";
import {
  NativeSelect,
  NativeSelectOption,
} from "@nawet/ds-react/components/native-select";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@nawet/ds-react/components/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@nawet/ds-react/components/pagination";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@nawet/ds-react/components/popover";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@nawet/ds-react/components/progress";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@nawet/ds-react/components/questionnaire";
import {
  RadioGroup,
  RadioGroupItem,
} from "@nawet/ds-react/components/radio-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@nawet/ds-react/components/resizable";
import { ScrollArea } from "@nawet/ds-react/components/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nawet/ds-react/components/select";
import { Separator } from "@nawet/ds-react/components/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@nawet/ds-react/components/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@nawet/ds-react/components/sidebar";
import { Skeleton } from "@nawet/ds-react/components/skeleton";
import { Slider } from "@nawet/ds-react/components/slider";
import { Spinner } from "@nawet/ds-react/components/spinner";
import { Switch } from "@nawet/ds-react/components/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@nawet/ds-react/components/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@nawet/ds-react/components/tabs";
import { Textarea } from "@nawet/ds-react/components/textarea";
import { toast } from "@nawet/ds-react/components/toast";
import { Toggle } from "@nawet/ds-react/components/toggle";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@nawet/ds-react/components/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@nawet/ds-react/components/tooltip";
import {
  Trace,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@nawet/ds-react/components/trace";
import { Icons } from "@nawet/ds-react/icons";
import { useState } from "react";

import { RevenueChart } from "./revenue-chart";

const pages = [
  { badge: "Home", icon: Icons.settings, label: "Overview" },
  { icon: Icons.users, label: "Components" },
  { icon: Icons.calendar, label: "Patterns" },
  { icon: Icons.info, label: "Foundations" },
  { icon: Icons.search, label: "Search" },
];

const Section = ({
  children,
  eyebrow,
  title,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
}) => (
  <section className="space-y-4">
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-muted-foreground text-[0.6875rem] font-medium tracking-[0.18em] uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight">{title}</h2>
      </div>
      <Separator className="mb-2 hidden flex-1 sm:block" />
    </div>
    {children}
  </section>
);

export const ShowcaseHome = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Nawet DS">
                <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-xl text-xs font-semibold">
                  N
                </div>
                <div className="grid min-w-0 flex-1 text-start leading-tight">
                  <span className="truncate text-sm font-semibold">
                    Nawet DS
                  </span>
                  <span className="text-muted-foreground truncate text-[0.6875rem]">
                    Kitchen sink
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarInput
            aria-label="Filter components"
            placeholder="Filter components…"
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Pages</SidebarGroupLabel>
            <SidebarGroupAction aria-label="Add page">
              <Icons.plus />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {pages.map((page, index) => (
                  <SidebarMenuItem key={page.label}>
                    <SidebarMenuButton
                      isActive={index === 0}
                      tooltip={page.label}
                    >
                      <page.icon />
                      <span>{page.label}</span>
                    </SidebarMenuButton>
                    {page.badge ? (
                      <SidebarMenuBadge>{page.badge}</SidebarMenuBadge>
                    ) : null}
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="More">
                    <Icons.moreHorizontal />
                    <span>More</span>
                  </SidebarMenuButton>
                  <SidebarMenuAction aria-label="More options">
                    <Icons.chevronRight />
                  </SidebarMenuAction>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton isActive>
                        <span>All components</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <span>Utilities</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Loading state</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuSkeleton showIcon />
                <SidebarMenuSkeleton />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <Avatar className="size-8">
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div className="grid min-w-0 flex-1 text-start leading-tight">
                  <span className="truncate text-sm font-medium">Abbes</span>
                  <span className="text-muted-foreground truncate text-[0.6875rem]">
                    Design engineer
                  </span>
                </div>
                <Icons.chevronUp className="ms-auto size-4" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="min-w-0">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-3">
          <SidebarTrigger />
          <Separator className="h-4" orientation="vertical" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Showcase</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ms-auto flex items-center gap-1">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    New window <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Share</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink href="#">Tokens</NavigationMenuLink>
                    <NavigationMenuLink href="#">Components</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Tooltip>
              <TooltipTrigger
                render={<Button size="icon-sm" variant="ghost" />}
              >
                <Icons.info />
              </TooltipTrigger>
              <TooltipContent>
                Tooltip provider is configured globally.
              </TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button size="icon-sm" variant="ghost" />}
              >
                <Icons.moreHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Session</DropdownMenuLabel>
                <DropdownMenuItem>
                  Profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <ResizablePanelGroup
          className="h-[calc(100svh-3.5rem)] min-h-0"
          orientation="horizontal"
        >
          <ResizablePanel defaultSize={68} minSize={40}>
            <ScrollArea className="h-full">
              <div className="space-y-10 p-4 pb-16 md:p-6">
                <section className="bg-card text-card-foreground relative overflow-hidden rounded-4xl border p-6 md:p-8">
                  <div className="relative z-10 max-w-2xl space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>Nawet DS</Badge>
                      <Badge variant="secondary">Kitchen sink</Badge>
                      <Badge variant="outline">Base UI</Badge>
                    </div>
                    <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance">
                      Every component, one surface.
                    </h1>
                    <p className="text-muted-foreground max-w-lg">
                      A distributed gallery for testing composition, hierarchy,
                      density, and the raw HTML type system together.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button>
                        <Icons.plus /> Create
                      </Button>
                      <Button variant="outline">Preview</Button>
                      <ButtonGroup>
                        <Button variant="outline">Day</Button>
                        <ButtonGroupSeparator />
                        <Button variant="outline">Week</Button>
                        <ButtonGroupText>⌘K</ButtonGroupText>
                      </ButtonGroup>
                      <Toggle size="sm">Pin</Toggle>
                      <ToggleGroup multiple size="sm" variant="outline">
                        <ToggleGroupItem value="bold">B</ToggleGroupItem>
                        <ToggleGroupItem value="italic">I</ToggleGroupItem>
                        <ToggleGroupItem value="underline">U</ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </div>
                  <div className="bg-primary/10 pointer-events-none absolute -end-20 -top-20 size-72 rounded-full blur-3xl" />
                  <div className="bg-secondary/50 pointer-events-none absolute end-20 -bottom-28 size-56 rounded-full blur-3xl" />
                </section>

                <Section eyebrow="Status" title="Feedback and progress">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <Alert>
                        <Icons.info />
                        <AlertTitle>System connected</AlertTitle>
                        <AlertDescription>
                          All components share the same tokens and state model.
                        </AlertDescription>
                        <AlertAction>
                          <Button size="xs" variant="ghost">
                            Dismiss
                          </Button>
                        </AlertAction>
                      </Alert>
                      <Alert variant="success">
                        <Icons.success />
                        <AlertTitle>Deployment ready</AlertTitle>
                        <AlertDescription>
                          Visual parity starts with the same primitives.
                        </AlertDescription>
                      </Alert>
                      <Alert variant="warning">
                        <Icons.warning />
                        <AlertTitle>Review pending</AlertTitle>
                        <AlertDescription>
                          Motion and contrast checks are still in progress.
                        </AlertDescription>
                      </Alert>
                    </div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Progress and loading</CardTitle>
                        <CardDescription>
                          Progress, spinner, skeleton, and empty states.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <div className="space-y-2">
                          <Progress value={64}>
                            <ProgressLabel>Upload</ProgressLabel>
                            <ProgressValue />
                          </Progress>
                        </div>
                        <div className="flex items-center gap-3">
                          <Spinner />
                          <span className="text-muted-foreground text-sm">
                            Syncing workspace
                          </span>
                          <KbdGroup className="ms-auto">
                            <Kbd>⌘</Kbd>
                            <Kbd>K</Kbd>
                          </KbdGroup>
                        </div>
                        <div className="flex items-center gap-3">
                          <Skeleton className="size-9 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-3 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </Section>

                <Section eyebrow="Input" title="Forms and fields">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>
                          Labels, fields, groups, and native controls.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <FieldGroup>
                          <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input id="name" placeholder="Ada Lovelace" />
                            <FieldDescription>
                              Displayed on your profile.
                            </FieldDescription>
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="bio">Bio</FieldLabel>
                            <Textarea
                              id="bio"
                              placeholder="A short introduction"
                            />
                          </Field>
                          <Field orientation="horizontal">
                            <Switch id="updates" />
                            <FieldLabel htmlFor="updates">
                              Product updates
                            </FieldLabel>
                          </Field>
                        </FieldGroup>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Controls</CardTitle>
                        <CardDescription>
                          Select, search, OTP, and grouped input.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="role">Role</Label>
                          <Select defaultValue="design">
                            <SelectTrigger id="role">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="design">
                                Design engineer
                              </SelectItem>
                              <SelectItem value="frontend">
                                Frontend engineer
                              </SelectItem>
                              <SelectItem value="product">Product</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="team">Team</Label>
                          <NativeSelect defaultValue="platform" id="team">
                            <NativeSelectOption value="platform">
                              Platform
                            </NativeSelectOption>
                            <NativeSelectOption value="growth">
                              Growth
                            </NativeSelectOption>
                          </NativeSelect>
                        </div>
                        <div className="grid gap-2">
                          <Label>Search</Label>
                          <Combobox items={["React", "Solid", "TypeScript"]}>
                            <ComboboxInput placeholder="Search frameworks…" />
                            <ComboboxContent>
                              <ComboboxEmpty>No matches.</ComboboxEmpty>
                              <ComboboxList>
                                <ComboboxItem value="React">React</ComboboxItem>
                                <ComboboxItem value="Solid">Solid</ComboboxItem>
                                <ComboboxItem value="TypeScript">
                                  TypeScript
                                </ComboboxItem>
                              </ComboboxList>
                            </ComboboxContent>
                          </Combobox>
                        </div>
                        <div className="grid gap-2">
                          <Label>One-time code</Label>
                          <InputOTP maxLength={6}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Selection</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <div className="flex items-center gap-3">
                          <Checkbox defaultChecked id="terms" />
                          <Label htmlFor="terms">Accept terms</Label>
                        </div>
                        <RadioGroup className="flex gap-4" defaultValue="a">
                          <div className="flex items-center gap-2">
                            <RadioGroupItem id="a" value="a" />
                            <Label htmlFor="a">Option A</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem id="b" value="b" />
                            <Label htmlFor="b">Option B</Label>
                          </div>
                        </RadioGroup>
                        <Slider defaultValue={[55]} max={100} step={1} />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Field variations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <FieldSet>
                          <FieldLegend>Workspace</FieldLegend>
                          <Field>
                            <FieldLabel htmlFor="workspace">Slug</FieldLabel>
                            <InputGroup>
                              <InputGroupAddon>
                                <InputGroupText>nawet.app/</InputGroupText>
                              </InputGroupAddon>
                              <InputGroupInput
                                id="workspace"
                                placeholder="studio"
                              />
                              <InputGroupAddon align="inline-end">
                                <Icons.check />
                              </InputGroupAddon>
                            </InputGroup>
                            <FieldDescription>
                              Used in URLs and APIs.
                            </FieldDescription>
                          </Field>
                        </FieldSet>
                      </CardContent>
                    </Card>
                  </div>
                </Section>

                <Section eyebrow="Data" title="Tables, items, and navigation">
                  <div className="grid gap-5 md:grid-cols-[1.4fr_1fr]">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent work</CardTitle>
                        <CardDescription>
                          Table, badge, item, and pagination.
                        </CardDescription>
                        <CardAction>
                          <Button size="xs" variant="outline">
                            Export
                          </Button>
                        </CardAction>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableCaption>
                            Latest design-system changes.
                          </TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-end">
                                Updated
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {["Tokens", "Provider", "Gallery"].map(
                              (name, index) => (
                                <TableRow key={name}>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Avatar className="size-7">
                                        <AvatarFallback>
                                          {name.slice(0, 1)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="font-medium">
                                        {name}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant={
                                        index === 2 ? "outline" : "success"
                                      }
                                    >
                                      {index === 2 ? "Active" : "Shipped"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-muted-foreground text-end">
                                    {index + 1}d ago
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TableCell colSpan={3}>
                                <Pagination>
                                  <PaginationContent>
                                    <PaginationItem>
                                      <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                      <PaginationLink href="#" isActive>
                                        1
                                      </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                      <PaginationLink href="#">
                                        2
                                      </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                      <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                      <PaginationNext href="#" />
                                    </PaginationItem>
                                  </PaginationContent>
                                </Pagination>
                              </TableCell>
                            </TableRow>
                          </TableFooter>
                        </Table>
                      </CardContent>
                    </Card>
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Queue</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ItemGroup>
                            <Item>
                              <ItemMedia variant="icon">
                                <Icons.clock />
                              </ItemMedia>
                              <ItemContent>
                                <ItemTitle>Motion pass</ItemTitle>
                                <ItemDescription>
                                  Adopt overlays and reduced motion.
                                </ItemDescription>
                              </ItemContent>
                            </Item>
                            <Item>
                              <ItemMedia variant="icon">
                                <Icons.success />
                              </ItemMedia>
                              <ItemContent>
                                <ItemTitle>Typography</ItemTitle>
                                <ItemDescription>
                                  Raw HTML defaults are in place.
                                </ItemDescription>
                              </ItemContent>
                            </Item>
                          </ItemGroup>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Empty and marker</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Marker variant="separator">
                            <MarkerIcon>
                              <Icons.info />
                            </MarkerIcon>
                            <MarkerContent>Today</MarkerContent>
                          </Marker>
                          <Empty>
                            <EmptyHeader>
                              <EmptyMedia variant="icon">
                                <Icons.search />
                              </EmptyMedia>
                              <EmptyTitle>No results</EmptyTitle>
                              <EmptyDescription>
                                Try a broader query.
                              </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                              <Button size="xs" variant="outline">
                                Clear filters
                              </Button>
                            </EmptyContent>
                          </Empty>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </Section>

                <Section
                  eyebrow="Composition"
                  title="Panels, accordion, tabs, and carousel"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Tabs + accordion</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Tabs defaultValue="overview">
                          <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                          </TabsList>
                          <TabsContent
                            className="text-muted-foreground pt-4 text-sm"
                            value="overview"
                          >
                            Tabs, collapsible, and accordion share the same
                            spacing language.
                          </TabsContent>
                          <TabsContent
                            className="text-muted-foreground pt-4 text-sm"
                            value="details"
                          >
                            Every control is keyboard reachable.
                          </TabsContent>
                        </Tabs>
                        <Accordion defaultValue={["item-1"]}>
                          <AccordionItem value="item-1">
                            <AccordionTrigger>
                              What is in core?
                            </AccordionTrigger>
                            <AccordionContent>
                              Tokens, styles, recipes, and configuration types.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-2">
                            <AccordionTrigger>
                              What is in React?
                            </AccordionTrigger>
                            <AccordionContent>
                              Components, hooks, providers, icons, and motion.
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        <Collapsible defaultOpen>
                          <CollapsibleTrigger
                            render={<Button size="xs" variant="ghost" />}
                          >
                            <Icons.chevronDown /> Toggle details
                          </CollapsibleTrigger>
                          <CollapsibleContent className="text-muted-foreground pt-3 text-sm">
                            Collapsible content uses the same disclosure
                            behavior.
                          </CollapsibleContent>
                        </Collapsible>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Carousel and aspect ratio</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Carousel className="w-full">
                          <CarouselContent>
                            {["One", "Two", "Three"].map((item) => (
                              <CarouselItem key={item}>
                                <AspectRatio ratio={16 / 9}>
                                  <div className="from-primary/20 via-secondary to-muted flex size-full items-center justify-center rounded-3xl bg-gradient-to-br text-lg font-semibold">
                                    {item}
                                  </div>
                                </AspectRatio>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      </CardContent>
                    </Card>
                  </div>
                </Section>

                <Section
                  eyebrow="Overlays"
                  title="Menus, dialogs, and surfaces"
                >
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Dialog</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Dialog>
                          <DialogTrigger render={<Button variant="outline" />}>
                            Open dialog
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit workspace</DialogTitle>
                              <DialogDescription>
                                Update the shared configuration.
                              </DialogDescription>
                            </DialogHeader>
                            <Input defaultValue="Nawet Studio" />
                            <DialogFooter>
                              <Button>Save</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Alert dialog</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <AlertDialog>
                          <AlertDialogTrigger
                            render={<Button variant="outline" />}
                          >
                            Delete
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete workspace?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Sheet</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Sheet>
                          <SheetTrigger render={<Button variant="outline" />}>
                            Open sheet
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Sheet panel</SheetTitle>
                              <SheetDescription>
                                Side content surface.
                              </SheetDescription>
                            </SheetHeader>
                          </SheetContent>
                        </Sheet>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Drawer</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Drawer>
                          <DrawerTrigger render={<Button variant="outline" />}>
                            Open drawer
                          </DrawerTrigger>
                          <DrawerContent>
                            <DrawerHeader>
                              <DrawerTitle>Drawer</DrawerTitle>
                              <DrawerDescription>
                                Bottom sheet surface.
                              </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                              <DrawerClose
                                render={<Button variant="outline" />}
                              >
                                Close
                              </DrawerClose>
                            </DrawerFooter>
                          </DrawerContent>
                        </Drawer>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Popover, hover card, tooltip</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-wrap items-center gap-2">
                        <Popover>
                          <PopoverTrigger render={<Button variant="outline" />}>
                            Popover
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverHeader>
                              <PopoverTitle>Popover</PopoverTitle>
                              <PopoverDescription>
                                Anchored floating content.
                              </PopoverDescription>
                            </PopoverHeader>
                          </PopoverContent>
                        </Popover>
                        <HoverCard>
                          <HoverCardTrigger render={<Button variant="ghost" />}>
                            Hover card
                          </HoverCardTrigger>
                          <HoverCardContent>
                            <p className="text-sm">A richer hover preview.</p>
                          </HoverCardContent>
                        </HoverCard>
                        <Tooltip>
                          <TooltipTrigger render={<Button variant="ghost" />}>
                            Tooltip
                          </TooltipTrigger>
                          <TooltipContent>
                            Small contextual hint.
                          </TooltipContent>
                        </Tooltip>
                        <Button
                          onClick={() =>
                            toast.add({
                              description: "Toast is mounted by NawetProvider.",
                              title: "Toast",
                            })
                          }
                          variant="secondary"
                        >
                          Toast
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Context menu</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ContextMenu>
                          <ContextMenuTrigger className="text-muted-foreground flex h-24 items-center justify-center rounded-2xl border border-dashed text-sm">
                            Right-click this area
                          </ContextMenuTrigger>
                          <ContextMenuContent>
                            <ContextMenuItem>
                              Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                            </ContextMenuItem>
                            <ContextMenuItem>Duplicate</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem variant="destructive">
                              Delete
                            </ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>
                      </CardContent>
                    </Card>
                  </div>
                </Section>

                <Section
                  eyebrow="Rich content"
                  title="Code, calendar, and attachments"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Code block</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CodeBlock>
                          <CodeBlockHeader>
                            <CodeBlockTitle>button.tsx</CodeBlockTitle>
                            <CodeBlockActions>
                              <CodeBlockCopyButton
                                value={"<Button>Save</Button>"}
                              />
                            </CodeBlockActions>
                          </CodeBlockHeader>
                          <CodeBlockContent lineNumbers>
                            {`<Button variant="outline">\n  Save changes\n</Button>`}
                          </CodeBlockContent>
                        </CodeBlock>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Calendar</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Calendar
                          mode="single"
                          onSelect={setDate}
                          selected={date}
                        />
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Attachments</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-3">
                        <Attachment>
                          <AttachmentMedia>
                            <Icons.download />
                          </AttachmentMedia>
                          <AttachmentContent>
                            <AttachmentTitle>tokens.css</AttachmentTitle>
                            <AttachmentDescription>12 KB</AttachmentDescription>
                          </AttachmentContent>
                          <AttachmentActions>
                            <AttachmentAction>Open</AttachmentAction>
                          </AttachmentActions>
                        </Attachment>
                        <Attachment state="idle">
                          <AttachmentMedia>
                            <Icons.upload />
                          </AttachmentMedia>
                          <AttachmentContent>
                            <AttachmentTitle>Add file</AttachmentTitle>
                            <AttachmentDescription>
                              Drop or browse
                            </AttachmentDescription>
                          </AttachmentContent>
                        </Attachment>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Trace</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Trace>
                          <TraceLine status="running">
                            <TraceIcon>
                              <Icons.loading />
                            </TraceIcon>
                            <TraceTitle>Generating tokens</TraceTitle>
                          </TraceLine>
                          <TraceLine>
                            <TraceIcon>
                              <Icons.check />
                            </TraceIcon>
                            <TraceTitle>Validated registry</TraceTitle>
                            <TraceDescription>3 checks passed</TraceDescription>
                          </TraceLine>
                        </Trace>
                      </CardContent>
                    </Card>
                  </div>
                </Section>
              </div>
            </ScrollArea>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={32} minSize={24}>
            <ScrollArea className="h-full">
              <div className="space-y-5 p-4 pb-16">
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>
                      Live chart and data surface.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RevenueChart />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MessageScrollerProvider>
                      <MessageScroller className="bg-muted/20 h-72 rounded-2xl border">
                        <MessageScrollerViewport>
                          <MessageScrollerContent className="p-3">
                            <MessageScrollerItem>
                              <MessageGroup>
                                <Message>
                                  <MessageAvatar>
                                    <Avatar className="size-8">
                                      <AvatarFallback>N</AvatarFallback>
                                    </Avatar>
                                  </MessageAvatar>
                                  <MessageContent>
                                    <MessageHeader>Nawet</MessageHeader>
                                    <BubbleGroup>
                                      <Bubble>
                                        <BubbleContent>
                                          The same components work in dense
                                          panels.
                                        </BubbleContent>
                                        <BubbleReactions>3</BubbleReactions>
                                      </Bubble>
                                      <Bubble align="end" variant="secondary">
                                        <BubbleContent>
                                          Let&apos;s ship it.
                                        </BubbleContent>
                                      </Bubble>
                                    </BubbleGroup>
                                    <MessageFooter>Just now</MessageFooter>
                                  </MessageContent>
                                </Message>
                              </MessageGroup>
                            </MessageScrollerItem>
                          </MessageScrollerContent>
                        </MessageScrollerViewport>
                        <MessageScrollerButton direction="end" />
                      </MessageScroller>
                    </MessageScrollerProvider>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Questionnaire</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Questionnaire
                      items={[
                        {
                          choices: [{ value: "ship" }, { value: "learn" }],
                          name: "goal",
                        },
                      ]}
                    >
                      <QuestionnaireProgress />
                      <QuestionnaireItem name="goal">
                        <QuestionnaireTitle>
                          What is the goal?
                        </QuestionnaireTitle>
                        <QuestionnaireDescription>
                          One question, one shared component.
                        </QuestionnaireDescription>
                        <QuestionnaireChoices>
                          <QuestionnaireChoice value="ship">
                            Ship the system
                            <QuestionnaireChoiceDescription>
                              Package first.
                            </QuestionnaireChoiceDescription>
                          </QuestionnaireChoice>
                          <QuestionnaireChoice value="learn">
                            Explore patterns
                            <QuestionnaireChoiceDescription>
                              Keep iterating.
                            </QuestionnaireChoiceDescription>
                          </QuestionnaireChoice>
                        </QuestionnaireChoices>
                        <QuestionnaireActions>
                          <QuestionnaireNext>Next</QuestionnaireNext>
                          <QuestionnaireSubmit>Submit</QuestionnaireSubmit>
                        </QuestionnaireActions>
                      </QuestionnaireItem>
                    </Questionnaire>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Command</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => setCommandOpen(true)}
                      variant="outline"
                    >
                      Open command palette
                    </Button>
                    <CommandDialog
                      onOpenChange={setCommandOpen}
                      open={commandOpen}
                    >
                      <Command>
                        <CommandInput placeholder="Type a command…" />
                        <CommandList>
                          <CommandEmpty>No results.</CommandEmpty>
                          <CommandGroup heading="Actions">
                            <CommandItem>
                              <Icons.plus /> New component
                              <CommandShortcut>⌘N</CommandShortcut>
                            </CommandItem>
                            <CommandItem>
                              <Icons.search /> Search
                              <CommandShortcut>⌘K</CommandShortcut>
                            </CommandItem>
                          </CommandGroup>
                          <CommandSeparator />
                          <CommandGroup heading="Settings">
                            <CommandItem>
                              <Icons.settings /> Preferences
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </CommandDialog>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between gap-3">
                      <AvatarGroup>
                        <Avatar>
                          <AvatarFallback>AL</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback>MK</AvatarFallback>
                        </Avatar>
                        <AvatarGroupCount>+4</AvatarGroupCount>
                      </AvatarGroup>
                      <Badge variant="outline">6 members</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" variant="outline">
                      Manage team
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </SidebarInset>
    </SidebarProvider>
  );
};
