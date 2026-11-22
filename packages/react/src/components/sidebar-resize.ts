import * as React from "react";

import {
  DEFAULTS,
  releaseSnap,
  stepDrag,
  type DragState,
} from "../lib/snap-point";

export const SNAP_DWELL_MS = 300;

export type SidebarResizeController = {
  previewSidebarWidth: (px: number) => number;
  commitSidebarWidth: (px: number) => void;
  getSidebarWidth: () => number | null;
  getSnapPoint: () => number | null;
};

type DragSession = {
  pointerId: number;
  originX: number;
  originWidth: number;
  side: "left" | "right";
  state: DragState;
  hand: number;
  cursor: string;
  userSelect: string;
};

function sideOf(node: HTMLElement): "left" | "right" {
  return node.closest("[data-side]")?.getAttribute("data-side") === "right"
    ? "right"
    : "left";
}

function measureSidebarWidth(rail: HTMLElement, fallback: number) {
  const gap = rail
    .closest("[data-slot=sidebar]")
    ?.querySelector("[data-slot=sidebar-gap]");
  const width = gap?.getBoundingClientRect().width ?? 0;
  return width > 0 ? width : fallback;
}

function markResizing(rail: HTMLElement, on: boolean) {
  const sidebar = rail.closest("[data-slot=sidebar]");
  if (!sidebar) return;
  if (on) sidebar.setAttribute("data-resizing", "true");
  else sidebar.removeAttribute("data-resizing");
}

/**
 * Pointer and keyboard wiring for the sidebar edge.
 * Keyboard changes the width directly. Pointer drags use the snap point.
 *
 * Snap-on-drag behavior adapted from "Snappy resizable panels" by Harsh Sharma:
 * https://imharsh.in/snappy-resizable-panels
 */
export function useSidebarDrag(
  sidebar: SidebarResizeController,
  bounds: { min: number; max: number; fallback: number }
) {
  const session = React.useRef<DragSession | null>(null);
  const dwell = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const dragging = React.useRef(false);
  const snapped = React.useRef(false);
  const liveWidth = React.useRef<number | null>(null);
  const sidebarRef = React.useRef(sidebar);
  sidebarRef.current = sidebar;

  const clearDwell = React.useCallback(() => {
    clearTimeout(dwell.current);
    dwell.current = undefined;
  }, []);

  React.useEffect(
    () => () => {
      clearDwell();
      const current = session.current;
      dragging.current = false;
      if (!current) return;
      document.body.style.cursor = current.cursor;
      document.body.style.userSelect = current.userSelect;
      session.current = null;
    },
    [clearDwell]
  );

  const paint = React.useCallback((rail: HTMLElement | null) => {
    if (!rail) return;
    const width = liveWidth.current;
    if (width != null) {
      rail.setAttribute("aria-valuenow", String(Math.round(width)));
    }
    if (snapped.current) rail.setAttribute("data-snapped", "");
    else rail.removeAttribute("data-snapped");
  }, []);

  const apply = React.useCallback(
    (rail: HTMLElement, next: ReturnType<typeof stepDrag>) => {
      const applied = sidebarRef.current.previewSidebarWidth(next.edge);
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
      const point = sidebarRef.current.getSnapPoint();
      snapped.current =
        point != null &&
        Math.abs(applied - point) <= DEFAULTS.snap &&
        (next.holding || next.free != null);
      paint(rail);

      if (next.dwell === "keep") return;
      clearDwell();
      if (next.dwell !== "restart") return;
      dwell.current = setTimeout(() => {
        const active = session.current;
        if (!active?.state.holding) return;
        active.state = releaseSnap(active.state, active.hand);
        const pointNow = sidebarRef.current.getSnapPoint();
        snapped.current =
          pointNow != null &&
          Math.abs(active.state.edge - pointNow) <= DEFAULTS.snap;
        paint(rail);
      }, SNAP_DWELL_MS);
    },
    [clearDwell, paint]
  );

  const finish = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const current = session.current;
      if (!current || current.pointerId !== event.pointerId) return;
      session.current = null;
      dragging.current = false;
      clearDwell();
      snapped.current = false;
      document.body.style.cursor = current.cursor;
      document.body.style.userSelect = current.userSelect;
      markResizing(event.currentTarget, false);
      const moved =
        Math.abs(current.state.edge - current.originWidth) >= 1 ||
        current.state.holding ||
        current.state.free != null;
      if (moved) sidebarRef.current.commitSidebarWidth(current.state.edge);
      else paint(event.currentTarget);
    },
    [clearDwell, paint]
  );

  const onPointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      const rail = event.currentTarget;
      const originWidth = measureSidebarWidth(
        rail,
        sidebarRef.current.getSidebarWidth() ?? bounds.fallback
      );
      rail.setPointerCapture(event.pointerId);
      markResizing(rail, true);
      dragging.current = true;
      session.current = {
        pointerId: event.pointerId,
        originX: event.clientX,
        originWidth,
        side: sideOf(rail),
        hand: originWidth,
        state: {
          holding: false,
          free: null,
          still: originWidth,
          edge: originWidth,
        },
        cursor: document.body.style.cursor,
        userSelect: document.body.style.userSelect,
      };
      liveWidth.current = originWidth;
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";
      event.preventDefault();
    },
    [bounds.fallback]
  );

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const current = session.current;
      if (!current || current.pointerId !== event.pointerId) return;
      const delta =
        current.side === "right"
          ? current.originX - event.clientX
          : event.clientX - current.originX;
      apply(
        event.currentTarget,
        stepDrag(
          current.state,
          current.originWidth + delta,
          sidebarRef.current.getSnapPoint(),
          DEFAULTS.snap,
          bounds.min,
          bounds.max
        )
      );
    },
    [apply, bounds.max, bounds.min]
  );

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const rail = event.currentTarget;
      const side = sideOf(rail);
      const grow = side === "right" ? "ArrowLeft" : "ArrowRight";
      const shrink = side === "right" ? "ArrowRight" : "ArrowLeft";
      const direction = event.key === grow ? 1 : event.key === shrink ? -1 : 0;
      if (direction === 0) return;
      event.preventDefault();
      markResizing(rail, true);
      const known = sidebarRef.current.getSidebarWidth();
      const origin = known ?? measureSidebarWidth(rail, bounds.fallback);
      const next = sidebarRef.current.previewSidebarWidth(
        origin + direction * DEFAULTS.spread
      );
      if (Math.abs(next - origin) < 1) {
        if (rail.dataset.keyboardResize !== "true") markResizing(rail, false);
        return;
      }
      liveWidth.current = next;
      snapped.current = false;
      rail.dataset.keyboardResize = "true";
      paint(rail);
    },
    [bounds.fallback, paint]
  );

  const commitKeyboard = React.useCallback((rail: HTMLDivElement) => {
    if (rail.dataset.keyboardResize !== "true") return;
    delete rail.dataset.keyboardResize;
    markResizing(rail, false);
    const width = sidebarRef.current.getSidebarWidth();
    if (width == null) return;
    sidebarRef.current.commitSidebarWidth(width);
  }, []);

  const onKeyUp = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      commitKeyboard(event.currentTarget);
    },
    [commitKeyboard]
  );

  const onBlur = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      commitKeyboard(event.currentTarget);
    },
    [commitKeyboard]
  );

  return {
    dragging,
    liveWidth,
    snapped,
    paint,
    onPointerDown,
    onPointerMove,
    onPointerUp: finish,
    onPointerCancel: finish,
    onKeyDown,
    onKeyUp,
    onBlur,
  };
}
