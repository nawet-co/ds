/**
 * Design token values as typed JS constants.
 * Useful for motion animations, canvas rendering, or anywhere CSS variables can't be used directly.
 *
 * These mirror the CSS custom properties in globals.css and should be kept in sync.
 *
 * @example
 * import { tokens } from "@/lib/tokens"
 * animate({ backgroundColor: tokens.colors.primary })
 */

export const tokens = {
  colors: {
    background: "var(--background)",
    foreground: "var(--foreground)",
    card: "var(--card)",
    cardForeground: "var(--card-foreground)",
    popover: "var(--popover)",
    popoverForeground: "var(--popover-foreground)",
    primary: "var(--primary)",
    primaryForeground: "var(--primary-foreground)",
    secondary: "var(--secondary)",
    secondaryForeground: "var(--secondary-foreground)",
    muted: "var(--muted)",
    mutedForeground: "var(--muted-foreground)",
    accent: "var(--accent)",
    accentForeground: "var(--accent-foreground)",
    destructive: "var(--destructive)",
    success: "var(--success)",
    successForeground: "var(--success-foreground)",
    warning: "var(--warning)",
    warningForeground: "var(--warning-foreground)",
    info: "var(--info)",
    infoForeground: "var(--info-foreground)",
    border: "var(--border)",
    input: "var(--input)",
    ring: "var(--ring)",
    chart: {
      "1": "var(--chart-1)",
      "2": "var(--chart-2)",
      "3": "var(--chart-3)",
      "4": "var(--chart-4)",
      "5": "var(--chart-5)",
    },
  },
  radius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
  },
} as const

export type ColorToken = keyof typeof tokens.colors
export type RadiusToken = keyof typeof tokens.radius
