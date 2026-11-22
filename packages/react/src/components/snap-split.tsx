"use client";

import { cn } from "@nawet/ds-core/utils";
import * as React from "react";

import { useSnapPoint } from "../hooks/use-snap-point";

export interface SnapSplitProps extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  /** Exactly two panes: the resizable start pane, then the fill end pane. */
  children: React.ReactNode;
  /** Initial start-pane size in px. */
  defaultWidth?: number;
  /** Smallest start-pane size in px. */
  minWidth?: number;
  /** Largest start-pane size in px. */
  maxWidth?: number;
  /** localStorage key for the learned snap point and last size. */
  storageKey?: string;
  /** Accessible name for the resize handle. */
  label?: string;
  orientation?: "horizontal" | "vertical";
}

/**
 * Two-pane split whose edge learns where you like to leave it and snaps there.
 *
 * The snap behavior is described in "Snappy resizable panels" by Harsh Sharma:
 * https://imharsh.in/snappy-resizable-panels
 */
function SnapSplit({
  children,
  defaultWidth = 640,
  minWidth = 320,
  maxWidth = 960,
  storageKey,
  label = "Resize panes",
  orientation = "horizontal",
  className,
  style,
  ...props
}: SnapSplitProps) {
  const paneRef = React.useRef<HTMLDivElement>(null);
  const liveWidth = React.useRef<number | null>(null);
  const vertical = orientation === "vertical";

  const getWidth = React.useCallback(() => {
    const node = paneRef.current;
    if (!node) {
      return null;
    }
    const rect = node.getBoundingClientRect();
    return vertical ? rect.height : rect.width;
  }, [vertical]);

  const setWidth = React.useCallback(
    (raw: number) => {
      const next = Math.min(maxWidth, Math.max(minWidth, raw));
      liveWidth.current = next;
      const node = paneRef.current;
      if (node) {
        if (vertical) {
          node.style.height = `${next}px`;
        } else {
          node.style.width = `${next}px`;
        }
      }
      return next;
    },
    [maxWidth, minWidth, vertical]
  );

  const { width, handlers } = useSnapPoint({
    defaultWidth,
    getWidth,
    max: maxWidth,
    min: minWidth,
    orientation,
    setWidth,
    storageKey,
  });

  // A pointer move writes the size on the node. The style prop would put the
  // last committed size back on the next render, so re-apply the live one.
  React.useLayoutEffect(() => {
    const node = paneRef.current;
    const live = liveWidth.current;
    if (!node || live == null) {
      return;
    }
    if (vertical) {
      node.style.height = `${live}px`;
    } else {
      node.style.width = `${live}px`;
    }
  });

  const [start, end] = React.Children.toArray(children);

  return (
    <div
      data-slot="snap-split"
      data-snap-split=""
      data-orientation={vertical ? "vertical" : "horizontal"}
      className={cn(
        "group/snap-split flex min-h-0 w-full min-w-0 overflow-hidden",
        vertical ? "flex-col" : "flex-row",
        className
      )}
      style={style}
      {...props}
    >
      <div
        data-slot="snap-split-pane"
        data-pane="start"
        ref={paneRef}
        className={cn(
          "relative min-h-0 min-w-0 shrink-0 overflow-hidden transition-[width,height] duration-200 ease-linear group-data-[resizing=true]/snap-split:transition-none",
          vertical ? "w-full" : "h-full"
        )}
        style={
          vertical
            ? { height: `${width ?? defaultWidth}px` }
            : { width: `${width ?? defaultWidth}px` }
        }
      >
        {start}
      </div>

      <div
        data-slot="snap-split-rail"
        role="separator"
        aria-label={label}
        aria-orientation={vertical ? "horizontal" : "vertical"}
        aria-valuemax={maxWidth}
        aria-valuemin={minWidth}
        aria-valuenow={Math.round(width ?? defaultWidth)}
        tabIndex={0}
        title={label}
        className={cn(
          "bg-border focus-visible:ring-ring/50 data-snapped:bg-ring relative z-10 shrink-0 touch-none transition-colors outline-none select-none focus-visible:ring-3",
          vertical
            ? "h-px w-full cursor-ns-resize after:absolute after:inset-x-0 after:-top-1 after:h-2 after:content-['']"
            : "h-full w-px cursor-ew-resize after:absolute after:inset-y-0 after:-start-1 after:w-2 after:content-['']"
        )}
        {...handlers}
      />

      <div
        data-slot="snap-split-pane"
        data-pane="end"
        className="relative min-h-0 min-w-0 flex-1 overflow-hidden"
      >
        {end}
      </div>
    </div>
  );
}

export { SnapSplit };
