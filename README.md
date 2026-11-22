# Nawet DS

The official design system of Nawet Co. A framework-neutral core with a React implementation built on Base UI and Tailwind CSS v4.

## Packages

```text
@nawet/ds-core     tokens, CSS, recipes, contracts
@nawet/ds-react    React components, hooks, providers
@nawet/ds-solid    reserved for Solid 2.0
@nawet/ds-cli      framework-aware installer and doctor
```

Repository layout:

```text
apps/showcase      documentation / preview app
packages/core      design system core
packages/react     React implementation
packages/solid     reserved Solid implementation
packages/cli       installer and doctor CLI
infra              Alchemy deployment stack
```

`@nawet/ds-core` does not depend on React or Solid. Framework packages own their components, hooks/signals, providers, primitives, Icons, and motion bindings.

## Install

```bash
pnpm add @nawet/ds-react
```

`@nawet/ds-core` is installed transitively. Add it directly if you use token values in JavaScript.

Import the framework stylesheet in your global CSS:

```css
@import "tailwindcss";
@import "@nawet/ds-react/styles.css";

/* Scan your app's files for Tailwind classes */
@source "../src/**/*.{ts,tsx}";
```

Use components from subpaths:

```tsx
import { Button } from "@nawet/ds-react/components/button";
```

There is no shadcn registry install step. Components are normal package imports.

## CLI

```bash
pnpm dlx @nawet/ds-cli init
pnpm dlx @nawet/ds-cli doctor
```

The CLI detects the framework and workspace, confirms the plan, installs the core and framework packages, and can add the stylesheet import to the app's Tailwind entrypoint. See [packages/cli](packages/cli/README.md).

## Requirements

- Tailwind CSS v4
- React 19+ for `@nawet/ds-react`
- React Compiler is recommended

## Development

```bash
pnpm tokens:generate   # regenerate tokens.ts from the token CSS
pnpm tokens:check      # fail if the generated token file is stale
pnpm test              # token generator and validation tests
```

Design tokens live in `packages/core/src/styles/tokens/`. See the [tokens README](packages/core/src/styles/tokens/README.md) for the pipeline.

Components and usage: [nawet-ds.abbes.dev](https://nawet-ds.abbes.dev)

MIT licensed.
