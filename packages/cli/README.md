# @nawet/ds-cli

Framework-aware installer and diagnostics for Nawet DS.

```bash
nawet-ds init
nawet-ds doctor
```

## Frameworks and implementations

The CLI targets two frameworks. Each framework maps to an implementation, and each pair maps to one package.

| Framework | Implementation   | Package                  |
| --------- | ---------------- | ------------------------ |
| React     | shadcn + Base UI | `@nawet/ds-react`        |
| React     | UI SDK           | `@nawet/ds-react-ui-sdk` |
| Solid     | UI SDK           | `@nawet/ds-solid-ui-sdk` |

`init` asks for the framework, then for the implementation. Solid ships UI SDK only, so it skips the second question and installs `@nawet/ds-solid-ui-sdk` directly. React keeps Base UI as the default when prompts are skipped.

UI SDK requires `@layer ui-sdk;` above the Tailwind import. When the selected implementation is UI SDK, `init` adds the layer statement and `doctor` verifies its position.

## Commands

### `init`

Detects the framework and target workspace, confirms the plan, installs `@nawet/ds-core` plus the framework package, and optionally adds the stylesheet import to the app's Tailwind entrypoint.

```bash
nawet-ds init
nawet-ds init -c apps/dashboard
nawet-ds init --framework react
nawet-ds init --framework react --implementation ui-sdk
nawet-ds init --framework solid
nawet-ds init --dry-run
```

When the target has no detectable framework, both React and Solid are offered. When exactly one framework is detected, it is selected automatically.

### `doctor`

Checks the installed package, framework and peer versions, Tailwind v4, the styles import, duplicate React copies (React only), and the UI SDK cascade layer (UI SDK only).

```bash
nawet-ds doctor
nawet-ds doctor -c apps/dashboard
nawet-ds doctor --framework solid
```

## Flags

```text
-f, --framework <react|solid>
-i, --implementation <base-ui|ui-sdk>
-c, --cwd <path>
-p, --package-manager <pnpm|npm|yarn|bun>
-y, --yes
    --dry-run
    --no-install
    --no-css
```

`--implementation base-ui` is React-only. Solid rejects it with an explicit error.

The CLI never silently guesses in a multi-workspace repository. Pass `-c` or choose a workspace interactively.
