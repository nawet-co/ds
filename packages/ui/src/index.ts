/**
 * @nawet/ui — types-only barrel
 *
 * This file is the "." export of the package (types only, no runtime bundle).
 * It exists for IDE discoverability and package-level type imports.
 *
 * Import components, hooks, and utilities via their subpaths:
 *   import { Button } from "@/components/ui/nawet/button"
 *   import { useIsMobile } from "@/hooks/nawet/use-mobile"
 *   import { transitions } from "@/lib/nawet/motion"
 *   import { tokens } from "@/lib/nawet/tokens"
 *   import { cn } from "@/lib/nawet/utils"
 */

// Re-export types from lib
export type { TransitionPreset } from "./lib/nawet/motion";
export type { ColorToken, RadiusToken } from "./lib/nawet/tokens";
export type { UseControllableOptions } from "./hooks/nawet/use-controllable";
