"use client";

import { cn } from "@nawet/ds-core/utils";
import { Rating as RatingPrimitive, RatingItem } from "@ui-sdk/react/rating";
import type { ComponentProps } from "react";

type RatingPrimitiveProps = ComponentProps<typeof RatingPrimitive>;

export interface RatingProps extends Omit<
  RatingPrimitiveProps,
  "aria-label" | "children" | "className"
> {
  /** Names the radio group. Required: the stars have no visible label. */
  "aria-label": string;
  className?: string;
  /** Classes for each star, e.g. to change its size. */
  itemClassName?: string;
}

/**
 * Five-star rating built on UI SDK's rating primitive.
 *
 * Arrow keys move between stars and choose a rating; Space chooses the focused
 * star. Pass `max` for a different number of stars.
 */
const Rating = ({ className, itemClassName, ...props }: RatingProps) => (
  <RatingPrimitive
    className={cn("inline-flex items-center gap-1", className)}
    {...props}
  >
    <RatingItem
      className={cn(
        "focus-within:ring-ring/30 size-6 cursor-pointer rounded-sm transition-transform duration-(--duration-fast) ease-(--ease-out) outline-none focus-within:ring-3 data-highlighted:scale-110 [&_[data-slot=rating-radio]]:outline-none",
        itemClassName
      )}
    />
  </RatingPrimitive>
);

export { Rating };
