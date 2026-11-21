# Nawet DS

The official design system of Nawet Co. A [shadcn](https://ui.shadcn.com/) registry of composable, accessible components built on Base UI and Tailwind CSS v4.

## Install

First, register the Nawet registry in your `components.json`:

```json
{
  "registries": {
    "@nawet": "https://nawet-ds.abbes.dev/r/{name}.json"
  }
}
```

### Single app

Run the command at the app root, where `components.json` lives:

```bash
pnpm dlx shadcn@latest add @nawet/button
```

Install the whole system:

```bash
pnpm dlx shadcn@latest add @nawet/base
```

### Monorepo

shadcn needs a single workspace as the install target. Run the command from
that workspace, or point at it with `-c`:

```bash
# app workspace
pnpm dlx shadcn@latest add @nawet/button -c apps/dashboard

# shared design-system package
pnpm dlx shadcn@latest add @nawet/button -c packages/design-system
```

Running at the monorepo root without `-c` is rejected by shadcn. Files are
installed under the target workspace's `ui` alias, namespaced as `nawet/`
(default: `src/components/ui/nawet/`). Components import each other from that
same alias, so keep it consistent across the workspace.

Or install from GitHub without the registry config:

```bash
pnpm dlx shadcn@latest add nawet-co/ds/button
```

## Requirements

React 19+, Tailwind CSS v4, React Compiler, and `@import "shadcn/tailwind.css";` in your global CSS.

Your `components.json` must define the `ui`, `lib`, and `hooks` aliases — the
registry installs into `ui` and imports shared code from `lib`/`hooks`:

```json
{
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks",
    "utils": "@/lib/utils"
  }
}
```

## Development

```bash
pnpm registry:build
pnpm registry:validate
```

Components and usage: [nawet-ds.abbes.dev](https://nawet-ds.abbes.dev)

MIT licensed.
