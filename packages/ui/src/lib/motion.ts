/**
 * Shared motion transition presets for consistent animations across all UI components.
 * Import this instead of hardcoding transition values in individual components.
 *
 * @example
 * import { transitions } from "@nawet/ui/lib/motion"
 *
 * <motion.div transition={transitions.spring} ... />
 */

import type { Transition } from "motion/react"

export const transitions = {
  /** Fast, tight spring — default for popups, popovers, tooltips */
  spring: { type: "spring", duration: 0.15, bounce: 0 } satisfies Transition,
  /** Medium spring — for panels, drawers, modals */
  springMedium: { type: "spring", duration: 0.25, bounce: 0 } satisfies Transition,
  /** Bouncy spring — for playful micro-interactions */
  springBouncy: { type: "spring", duration: 0.3, bounce: 0.25 } satisfies Transition,
  /** Linear fade — for overlays and backdrops */
  fade: { duration: 0.15, ease: "easeOut" } satisfies Transition,
} as const

export type TransitionPreset = keyof typeof transitions
