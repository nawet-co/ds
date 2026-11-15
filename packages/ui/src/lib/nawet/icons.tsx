import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconArrowUpRight,
  IconCalendar,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconCircleCheck,
  IconClock,
  IconCopy,
  IconDots,
  IconDownload,
  IconExternalLink,
  IconEye,
  IconEyeOff,
  IconInfoCircle,
  IconLayoutSidebar,
  IconLoader2,
  IconMenu,
  IconMinus,
  IconMoon,
  IconPencil,
  IconPlus,
  IconSearch,
  IconSettings,
  IconSun,
  IconTrash,
  IconUpload,
  IconUser,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import type { Icon as TablerIcon } from "@tabler/icons-react";

/**
 * Central icon registry.
 *
 * Components and apps should consume icons as `Icons.name` / `<Icons.name />`
 * instead of importing them from an icon library directly.
 *
 * Keys are the public API: they describe intent, not the underlying glyph.
 * The value can be swapped for a different icon (or a different icon library)
 * without changing any consumer.
 */
export const Icons = {
  arrowDown: IconArrowDown,
  arrowLeft: IconArrowLeft,
  arrowRight: IconArrowRight,
  arrowUp: IconArrowUp,
  arrowUpRight: IconArrowUpRight,
  calendar: IconCalendar,
  check: IconCheck,
  chevronDown: IconChevronDown,
  chevronLeft: IconChevronLeft,
  chevronRight: IconChevronRight,
  chevronUp: IconChevronUp,
  clock: IconClock,
  close: IconX,
  copy: IconCopy,
  download: IconDownload,
  error: IconAlertOctagon,
  externalLink: IconExternalLink,
  eye: IconEye,
  eyeOff: IconEyeOff,
  info: IconInfoCircle,
  loading: IconLoader2,
  menu: IconMenu,
  minus: IconMinus,
  moon: IconMoon,
  moreHorizontal: IconDots,
  pencil: IconPencil,
  plus: IconPlus,
  search: IconSearch,
  settings: IconSettings,
  sidebarToggle: IconLayoutSidebar,
  success: IconCircleCheck,
  sun: IconSun,
  trash: IconTrash,
  upload: IconUpload,
  user: IconUser,
  users: IconUsers,
  warning: IconAlertTriangle,
} satisfies Record<string, TablerIcon>;

export type { IconProps } from "@tabler/icons-react";
export type Icon = TablerIcon;
export type IconName = keyof typeof Icons;
