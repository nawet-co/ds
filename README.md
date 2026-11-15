# Nawet DS

The official design system of Nawet Co. A [shadcn](https://ui.shadcn.com/) registry of composable, accessible components built on Base UI and Tailwind CSS v4.

## Install

```bash
pnpm dlx shadcn@latest add @nawet/button
```

Install the whole system:

```bash
pnpm dlx shadcn@latest add @nawet/base
```

Or install from GitHub:

```bash
pnpm dlx shadcn@latest add nawet-co/ds/button
```

## Requirements

React 19+, Tailwind CSS v4, React Compiler, and `@import "shadcn/tailwind.css";` in your global CSS.

## Development

```bash
pnpm registry:build
pnpm registry:validate
```

Components and usage: [nawet-ds.abbes.dev](https://nawet-ds.abbes.dev)

MIT licensed.
