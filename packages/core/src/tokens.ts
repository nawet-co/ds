/**
 * AUTO-GENERATED FILE. Do not edit by hand.
 *
 * Source: src/styles/tokens/*.css
 * Regenerate with: pnpm tokens:generate
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
    primaryHover: "var(--primary-hover)",
    primaryActive: "var(--primary-active)",
    secondaryHover: "var(--secondary-hover)",
    destructiveHover: "var(--destructive-hover)",
    surfaceRaised: "var(--surface-raised)",
    surfaceOverlay: "var(--surface-overlay)",
    borderStrong: "var(--border-strong)",
    ringOffset: "var(--ring-offset)",
    overlay: "var(--overlay)",
    sidebar: "var(--sidebar)",
    sidebarForeground: "var(--sidebar-foreground)",
    sidebarPrimary: "var(--sidebar-primary)",
    sidebarPrimaryForeground: "var(--sidebar-primary-foreground)",
    sidebarAccent: "var(--sidebar-accent)",
    sidebarAccentForeground: "var(--sidebar-accent-foreground)",
    sidebarBorder: "var(--sidebar-border)",
    sidebarRing: "var(--sidebar-ring)",
    chart: {
      "1": "var(--chart-1)",
      "2": "var(--chart-2)",
      "3": "var(--chart-3)",
      "4": "var(--chart-4)",
      "5": "var(--chart-5)",
    },
  },
  duration: {
    instant: 0,
    fast: 0.15,
    medium: 0.25,
    slow: 0.3,
    slower: 0.5,
    slowest: 0.8,
  },
  ease: {
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  font: {
    sans: '"Figtree Variable", sans-serif',
    heading: '"Montserrat Variable", sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  leading: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
  radius: {
    sm: "calc(var(--radius) * 0.6)",
    md: "calc(var(--radius) * 0.8)",
    lg: "var(--radius)",
    xl: "calc(var(--radius) * 1.4)",
    "2xl": "calc(var(--radius) * 1.8)",
    "3xl": "calc(var(--radius) * 2.2)",
    "4xl": "calc(var(--radius) * 2.6)",
    base: "0.625rem",
  },
  shadow: {
    "2xs": "0 1px rgb(0 0 0 / 0.05)",
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  },
  spacing: "0.25rem",
  text: {
    "2xs": {
      size: "0.625rem",
      lineHeight: "0.875rem",
    },
    xs: {
      size: "0.75rem",
      lineHeight: "1rem",
    },
    sm: {
      size: "0.875rem",
      lineHeight: "1.25rem",
    },
    base: {
      size: "1rem",
      lineHeight: "1.5rem",
    },
    lg: {
      size: "1.125rem",
      lineHeight: "1.75rem",
    },
    xl: {
      size: "1.25rem",
      lineHeight: "1.75rem",
    },
    "2xl": {
      size: "1.5rem",
      lineHeight: "2rem",
    },
    "3xl": {
      size: "1.875rem",
      lineHeight: "2.25rem",
    },
    "4xl": {
      size: "2.25rem",
      lineHeight: "2.5rem",
    },
  },
  tracking: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
} as const;

export type ColorToken = keyof typeof tokens.colors;
export type RadiusToken = keyof typeof tokens.radius;
export type FontToken = keyof typeof tokens.font;
export type TextToken = keyof typeof tokens.text;
export type FontWeightToken = keyof typeof tokens.fontWeight;
export type LeadingToken = keyof typeof tokens.leading;
export type TrackingToken = keyof typeof tokens.tracking;
export type ShadowToken = keyof typeof tokens.shadow;
export type EasingToken = keyof typeof tokens.ease;
export type DurationToken = keyof typeof tokens.duration;
