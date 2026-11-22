import * as React from "react";

import {
  DEFAULTS,
  favourite,
  parseStoredSnap,
  record,
  releaseSnap,
  stepDrag,
  type DragState,
  type Sample,
  type StoredSnap,
  type Tuning,
} from "../lib/snap-point";

/** Time spent resting on the snap point before it lets go, in ms. */
export const SNAP_DWELL_MS = 300;

type Side = "start" | "end";
type Orientation = "horizontal" | "vertical";

type DragSession = {
  pointerId: number;
  originPos: number;
  originSize: number;
  side: Side;
  rtl: boolean;
  state: DragState;
  hand: number;
  cursor: string;
  userSelect: string;
};

export interface UseSnapPointOptions {
  /** Smallest size in px. */
  min: number;
  /** Largest size in px. */
  max: number;
  /** Size used before a stored or measured size is available. */
  defaultWidth: number;
  /** localStorage key. Omit to skip persistence. */
  storageKey?: string;
  /** Which side of the resizable pane the rail sits on. */
  side?: Side;
  /** Drag axis. Defaults to horizontal. */
  orientation?: Orientation;
  tuning?: Tuning;
  /** Read the pane's current size in px. */
  getWidth: () => number | null;
  /**
   * Apply a live size in px and return the value actually applied. This is
   * called on every pointer move, so write to the DOM directly rather than
   * through React state.
   */
  setWidth: (width: number) => number;
  /** Called once a size is committed (pointer up, keyboard release). */
  onCommit?: (width: number) => void;
}

export interface SnapPointHandlers {
  onPointerDown: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerCancel: (event: React.PointerEvent<HTMLElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  onKeyUp: (event: React.KeyboardEvent<HTMLElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLElement>) => void;
}

export interface UseSnapPointResult {
  /** Last committed size in px, or null before the first commit/mount. */
  width: number | null;
  /** The learned snap point in px, or null while no hill is tall enough. */
  snapPoint: number | null;
  handlers: SnapPointHandlers;
}

const readStored = (storageKey: string | undefined): StoredSnap | null => {
  if (!storageKey) {
    return null;
  }

  try {
    return parseStoredSnap(localStorage.getItem(storageKey));
  } catch {
    return null;
  }
};

const writeStored = (
  storageKey: string | undefined,
  value: StoredSnap
): void => {
  if (!storageKey) {
    return;
  }

  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
  } catch {
    // Private mode and blocked storage still leave the drag working.
  }
};

const markResizing = (rail: HTMLElement, on: boolean): void => {
  const scope = rail.closest("[data-snap-split]") ?? rail;
  if (on) {
    scope.setAttribute("data-resizing", "true");
  } else {
    scope.removeAttribute("data-resizing");
  }
};

const isRtl = (rail: HTMLElement): boolean =>
  getComputedStyle(rail).direction === "rtl";

export function useSnapPoint(options: UseSnapPointOptions): UseSnapPointResult {
  const optionsRef = React.useRef(options);
  optionsRef.current = options;

  const [samples, setSamples] = React.useState<Sample[]>([]);
  const samplesRef = React.useRef<Sample[]>([]);
  samplesRef.current = samples;

  const [width, setWidthState] = React.useState<number | null>(null);

  const snapPoint = React.useMemo(
    () => favourite(samples, options.tuning)?.width ?? null,
    [samples, options.tuning]
  );
  const snapPointRef = React.useRef<number | null>(null);
  snapPointRef.current = snapPoint;

  const session = React.useRef<DragSession | null>(null);
  const dwell = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const snapped = React.useRef(false);
  const liveWidth = React.useRef<number | null>(null);

  const clearDwell = React.useCallback(() => {
    clearTimeout(dwell.current);
    dwell.current = undefined;
  }, []);

  React.useEffect(
    () => () => {
      clearDwell();
      const current = session.current;
      if (!current) {
        return;
      }
      document.body.style.cursor = current.cursor;
      document.body.style.userSelect = current.userSelect;
      session.current = null;
    },
    [clearDwell]
  );

  const paint = React.useCallback((rail: HTMLElement | null) => {
    if (!rail) {
      return;
    }

    const size = liveWidth.current;
    if (size != null) {
      rail.setAttribute("aria-valuenow", String(Math.round(size)));
    }

    if (snapped.current) {
      rail.setAttribute("data-snapped", "");
    } else {
      rail.removeAttribute("data-snapped");
    }
  }, []);

  const apply = React.useCallback(
    (rail: HTMLElement, next: ReturnType<typeof stepDrag>) => {
      const applied = optionsRef.current.setWidth(next.edge);
      const current = session.current;
      if (current) {
        current.state = {
          holding: next.holding,
          free: next.free,
          still: next.still,
          edge: applied,
        };
        current.hand = next.hand;
      }

      liveWidth.current = applied;
      const point = snapPointRef.current;
      snapped.current =
        point != null &&
        Math.abs(applied - point) <= DEFAULTS.snap &&
        (next.holding || next.free != null);
      paint(rail);

      if (next.dwell === "keep") {
        return;
      }

      clearDwell();
      if (next.dwell !== "restart") {
        return;
      }

      dwell.current = setTimeout(() => {
        const active = session.current;
        if (!active?.state.holding) {
          return;
        }
        active.state = releaseSnap(active.state, active.hand);
        const pointNow = snapPointRef.current;
        snapped.current =
          pointNow != null &&
          Math.abs(active.state.edge - pointNow) <= DEFAULTS.snap;
        paint(rail);
      }, SNAP_DWELL_MS);
    },
    [clearDwell, paint]
  );

  const commit = React.useCallback((rawWidth: number) => {
    const current = optionsRef.current;
    const next = Math.min(
      current.max,
      Math.max(current.min, Math.round(rawWidth))
    );
    const recorded = record(
      samplesRef.current,
      next,
      Date.now(),
      current.tuning
    );
    samplesRef.current = recorded;
    setSamples(recorded);
    setWidthState(next);
    const applied = current.setWidth(next);
    writeStored(current.storageKey, { width: applied, samples: recorded });
    current.onCommit?.(applied);
  }, []);

  const finish = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const current = session.current;
      if (!current || current.pointerId !== event.pointerId) {
        return;
      }

      session.current = null;
      clearDwell();
      snapped.current = false;
      document.body.style.cursor = current.cursor;
      document.body.style.userSelect = current.userSelect;
      markResizing(event.currentTarget, false);

      const moved =
        Math.abs(current.state.edge - current.originSize) >= 1 ||
        current.state.holding ||
        current.state.free != null;
      if (moved) {
        commit(current.state.edge);
      } else {
        paint(event.currentTarget);
      }
    },
    [clearDwell, commit, paint]
  );

  const onPointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.button !== 0) {
        return;
      }

      const rail = event.currentTarget;
      const current = optionsRef.current;
      const originSize = current.getWidth() ?? Math.round(current.defaultWidth);
      const horizontal = current.orientation !== "vertical";

      rail.setPointerCapture?.(event.pointerId);
      markResizing(rail, true);
      session.current = {
        pointerId: event.pointerId,
        originPos: horizontal ? event.clientX : event.clientY,
        originSize,
        side: current.side ?? "start",
        rtl: horizontal && isRtl(rail),
        hand: originSize,
        state: {
          holding: false,
          free: null,
          still: originSize,
          edge: originSize,
        },
        cursor: document.body.style.cursor,
        userSelect: document.body.style.userSelect,
      };
      liveWidth.current = originSize;
      document.body.style.cursor = horizontal ? "ew-resize" : "ns-resize";
      document.body.style.userSelect = "none";
      event.preventDefault();
    },
    []
  );

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const current = session.current;
      if (!current || current.pointerId !== event.pointerId) {
        return;
      }

      const currentOptions = optionsRef.current;
      const horizontal = currentOptions.orientation !== "vertical";
      let delta =
        (horizontal ? event.clientX : event.clientY) - current.originPos;

      if (horizontal) {
        if (current.side === "end") {
          delta = -delta;
        }
        if (current.rtl) {
          delta = -delta;
        }
      }

      apply(
        event.currentTarget,
        stepDrag(
          current.state,
          current.originSize + delta,
          snapPointRef.current,
          currentOptions.tuning?.snap ?? DEFAULTS.snap,
          currentOptions.min,
          currentOptions.max
        )
      );
    },
    [apply]
  );

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const rail = event.currentTarget;
      const current = optionsRef.current;
      const horizontal = current.orientation !== "vertical";
      const side = current.side ?? "start";
      const growsLeft = (side === "end") !== (horizontal && isRtl(rail));
      const growKey = horizontal
        ? growsLeft
          ? "ArrowLeft"
          : "ArrowRight"
        : "ArrowDown";
      const shrinkKey = horizontal
        ? growsLeft
          ? "ArrowRight"
          : "ArrowLeft"
        : "ArrowUp";
      const direction =
        event.key === growKey ? 1 : event.key === shrinkKey ? -1 : 0;

      if (direction === 0) {
        return;
      }

      event.preventDefault();
      markResizing(rail, true);

      const known = current.getWidth() ?? current.defaultWidth;
      const next = current.setWidth(
        Math.min(
          current.max,
          Math.max(current.min, known + direction * DEFAULTS.spread)
        )
      );

      if (Math.abs(next - known) < 1) {
        if (rail.dataset.keyboardResize !== "true") {
          markResizing(rail, false);
        }
        return;
      }

      liveWidth.current = next;
      snapped.current = false;
      rail.dataset.keyboardResize = "true";
      paint(rail);
    },
    [paint]
  );

  const commitKeyboard = React.useCallback(
    (rail: HTMLElement) => {
      if (rail.dataset.keyboardResize !== "true") {
        return;
      }

      delete rail.dataset.keyboardResize;
      markResizing(rail, false);
      const current = optionsRef.current.getWidth();
      if (current == null) {
        return;
      }
      commit(current);
    },
    [commit]
  );

  const onKeyUp = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      commitKeyboard(event.currentTarget);
    },
    [commitKeyboard]
  );

  const onBlur = React.useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      commitKeyboard(event.currentTarget);
    },
    [commitKeyboard]
  );

  // Restore the stored width and samples once the pane is mounted.
  React.useEffect(() => {
    const stored = readStored(optionsRef.current.storageKey);
    if (!stored) {
      return;
    }

    if (stored.samples.length > 0) {
      samplesRef.current = stored.samples;
      setSamples(stored.samples);
    }

    if (stored.width != null) {
      const current = optionsRef.current;
      const next = Math.min(current.max, Math.max(current.min, stored.width));
      setWidthState(next);
      current.setWidth(next);
    }
  }, []);

  return {
    width,
    snapPoint,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finish,
      onPointerCancel: finish,
      onKeyDown,
      onKeyUp,
      onBlur,
    },
  };
}
