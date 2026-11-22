# Component contract

Every `@nawet/ds-react` component follows these rules.

## Client boundaries

- Interactive components start with `"use client"`.
- Hooks, context, refs, browser APIs, and Motion require a client boundary.
- `pnpm --filter @nawet/ds-react check-client-boundaries` enforces this.

## Styling

- `className` is accepted and merged through `cn`.
- Component classes come from core recipes where the recipe is shared.
- Components use semantic tokens, not raw colors.
- RTL uses logical utilities (`ps`, `pe`, `ms`, `me`, `start`, `end`).

## DOM contract

Every visual or stateful part exposes:

```text
data-slot="component-part"
data-state="open | closed | checked | ..."
data-disabled
aria-invalid
```

These attributes are public contract: styling, tests, and framework ports rely on them.

## Props

- Native element props are forwarded.
- Base UI primitive props are preserved.
- `variant` and `size` are typed through the recipe.
- Controlled/uncontrolled state follows Base UI conventions where available.
- Polymorphism uses Base UI's `render` prop.

## Configuration

Runtime configuration belongs to `NawetProvider`:

```tsx
<NawetProvider
  density="compact"
  direction="rtl"
  locale="ar"
  motion="reduced"
  theme="dark"
>
```

Design values stay in CSS tokens. The provider owns behavior and context, not style values.

## Motion

- CSS transitions are for hover, press, color, and focus.
- Motion is for presence, overlays, and orchestration.
- Animation uses durations/easings from `@nawet/ds-core/tokens`.
- Reduced motion must be respected through `MotionConfig` and CSS fallbacks.
