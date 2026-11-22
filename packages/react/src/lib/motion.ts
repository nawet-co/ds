/**
 * Shared motion transition presets for consistent animations across all UI components.
 * Import this instead of hardcoding transition values in individual components.
 *
 * Values come from the generated token layer so CSS and JS stay in sync.
 *
 * @example
 * import { transitions } from "@nawet/ds-react/motion"
 *
 * <motion.div transition={transitions.spring} ... />
 */

import { tokens } from "@nawet/ds-core/tokens";
import type { Transition } from "motion/react";

const toBezier = (value: string): [number, number, number, number] => {
  const match = /cubic-bezier\((?<values>[^)]+)\)/u.exec(value);

  if (!match?.groups?.values) {
    return [0.4, 0, 0.2, 1];
  }

  const values = match.groups.values.split(",").map(Number);

  return [values[0] ?? 0, values[1] ?? 0, values[2] ?? 1, values[3] ?? 1];
};

const easeOut = toBezier(tokens.ease.out);

export const transitions = {
  /** Linear fade — for overlays and backdrops */
  fade: { duration: tokens.duration.fast, ease: easeOut } satisfies Transition,
  /** Fast, tight spring — default for popups, popovers, tooltips */
  spring: {
    bounce: 0,
    duration: tokens.duration.fast,
    type: "spring",
  } satisfies Transition,
  /** Bouncy spring — for playful micro-interactions */
  springBouncy: {
    bounce: 0.25,
    duration: tokens.duration.slow,
    type: "spring",
  } satisfies Transition,
  /** Medium spring — for panels, drawers, modals */
  springMedium: {
    bounce: 0,
    duration: tokens.duration.medium,
    type: "spring",
  } satisfies Transition,
} as const;

export type TransitionPreset = keyof typeof transitions;
