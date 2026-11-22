# Tokens

The CSS files in this folder are the source of truth for framework-neutral design tokens.

| File | Contents |
| --- | --- |
| `scale.css` | Radius, density, motion durations, type, weight, leading, tracking, shadow, easing |
| `semantic.css` | Light and dark semantic colors, side by side |
| `theme.css` | Tailwind `@theme inline` mappings (colors, radius) |
| `chart.css` | TanStack Charts variables |
| `base.css` | Base element styles |

`scale.css` uses `@theme static` so every scale token is emitted as a CSS variable even when no utility currently uses it. `theme.css` uses `@theme inline` because its values reference mode-aware variables.

`globals.css` imports these files and `vendor/shadcn.css` (MIT, vendored Tailwind variants/utilities). Framework packages import `@nawet/ds-core/globals.css` and add their own `@source` for component classes.

The generator turns the CSS into:

- `src/tokens.ts` — typed values for Motion, charts, canvas, etc.

## Workflow

```bash
pnpm tokens:generate   # update tokens.ts
pnpm tokens:check      # fail if the generated token file is stale
pnpm test              # generator fixture + validation tests
```

Edit the CSS, then run `pnpm tokens:generate`.

## Guardrails

Generation fails when:

- `:root` and `.dark` do not define the same semantic keys
- a semantic token has no `@theme` color mapping
- a `var(--token)` references an undefined token

The parser uses PostCSS, so comments, multiline values, and future CSS syntax are handled correctly.

`pnpm check` runs `tokens:check` and the generator tests.
