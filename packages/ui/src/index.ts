/**
 * @nawet/ui — types-only barrel
 *
 * This file is the "." export of the package (types only, no runtime bundle).
 * It exists for IDE discoverability and package-level type imports.
 *
 * Import components, hooks, and utilities via their subpaths:
 *   import { Button } from "@/components/ui/button"
 *   import { useIsMobile } from "@/hooks/use-mobile"
 *   import { transitions } from "@/lib/motion"
 *   import { tokens } from "@/lib/tokens"
 *   import { cn } from "@/lib/utils"
 */

// Re-export types from lib
export type { TransitionPreset } from "./lib/motion"
export type { ColorToken, RadiusToken } from "./lib/tokens"
export type { UseControllableOptions } from "./hooks/use-controllable"
