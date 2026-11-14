# Nawet DS

The official design system of Nawet Co, embodying its signature aesthetic, refined styling, and deliberate taste.

## Overview

Nawet DS is a custom [shadcn](https://ui.shadcn.com/) registry of composable, accessible components published under `@nawet-ds`. Built around shadcn's design token architecture, the components integrate seamlessly with existing primitives while expressing the distinct visual identity, rhythm, and craft of Nawet Co.

Rather than generic defaults, Nawet DS delivers an opinionated collection of building blocks that cut boilerplate without compromising flexibility, responsive behavior, or design fidelity.

## Repository scope

This repository is public. It contains the design system source (`packages/ui`), the registry build, and the public showcase app (`apps/showcase`).

The Nawet marketing site is maintained in a separate private repository and consumes the published registry. It is intentionally not part of this workspace.

## Requirements

- React 19+
- [React Compiler](https://react.dev/learn/react-compiler) enabled in the consuming app.

Registry code should not add manual `useMemo` / `useCallback` — memoization is the compiler's responsibility, not the component's.

## Documentation

Explore the components and registry at [nawet-ds.abbes.dev](https://nawet-ds.abbes.dev).
