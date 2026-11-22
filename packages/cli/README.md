# @nawet/ds-cli

Framework-aware installer and diagnostics for Nawet DS.

```bash
nawet-ds init
nawet-ds doctor
```

## Commands

### `init`

Detects the framework and target workspace, confirms the plan, installs `@nawet/ds-core` plus the framework package, and optionally adds the stylesheet import to the app's Tailwind entrypoint.

```bash
nawet-ds init
nawet-ds init -c apps/dashboard
nawet-ds init --framework react --yes
nawet-ds init --dry-run
```

### `doctor`

Checks framework and peer versions, Tailwind v4, package installation, styles import, and duplicate React copies.

```bash
nawet-ds doctor
nawet-ds doctor -c apps/dashboard
```

## Flags

```text
-f, --framework <react|solid>
-c, --cwd <path>
-p, --package-manager <pnpm|npm|yarn|bun>
-y, --yes
    --dry-run
    --no-install
    --no-css
```

The CLI never silently guesses in a multi-workspace repository. Pass `-c` or choose a workspace interactively.
