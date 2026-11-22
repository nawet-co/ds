# @nawet/ds-core

Framework-neutral foundation for Nawet DS.

## Owns

- design tokens and Tailwind theme
- `globals.css`
- shared `cn`
- framework-neutral CVA recipes
- shared slot/state contracts
- generated token values in `src/tokens.ts`

## Does not own

- React or Solid components
- hooks, signals, or providers
- framework-specific primitives
- framework-specific icon or motion bindings

Framework packages import tokens and recipes from here and remain responsible for their own component implementations.

## Usage

```css
@import "@nawet/ds-core/globals.css";
```

```ts
import { cn } from "@nawet/ds-core/utils";
import { tokens } from "@nawet/ds-core/tokens";
```

## Token pipeline

```bash
pnpm tokens:generate
pnpm tokens:check
pnpm test
```

Source of truth: `src/styles/tokens/*.css`.
