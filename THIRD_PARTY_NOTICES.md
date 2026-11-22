# Third-party notices

This project adapts code and techniques from the sources below. Each entry names the files that carry the adapted work so provenance stays traceable.

## shadcn/ui

Tailwind variants, utilities, and component patterns derive from shadcn/ui.

- Source: https://github.com/shadcn-ui/ui
- License: MIT
- Files: `packages/core/src/styles/tailwind-extras.css`, `packages/react/src/components/*` (component structure and styling)

## Snappy resizable panels

The sidebar's learned snap-point behavior is adapted from "Snappy resizable panels" by Harsh Sharma (November 2026). The algorithm and tuning defaults (spread, half-life, min weight, snap zone, correction window, keep count) are ported to the sidebar; the implementation is a standalone port rather than the article's `useSnapPoint` / `favourite` source files, so no license is asserted for it here.

- Source: https://imharsh.in/snappy-resizable-panels
- Author: Harsh Sharma (https://imharsh.in)
- Files: `packages/react/src/lib/snap-point.ts`, `packages/react/src/components/sidebar-resize.ts`, `packages/react/src/components/sidebar.tsx`
