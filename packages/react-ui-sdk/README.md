# @nawet/ds-react-ui-sdk

React implementation of Nawet DS on [UI SDK](https://ui-sdk.dev). Separate from `@nawet/ds-react`, which stays on shadcn + Base UI.

## Install

```bash
pnpm add @nawet/ds-react-ui-sdk
```

The package depends on `@ui-sdk/react` and `@ui-sdk/core` at the same pinned beta version.

## Styles

Import the stylesheet once in your app's global CSS:

```css
@layer ui-sdk;

@import "tailwindcss";
@import "@nawet/ds-react-ui-sdk/styles.css";
@source "../src/**/*.{ts,tsx}";
```

`@layer ui-sdk;` must come before the Tailwind import. The package's stylesheet already declares it and imports `@ui-sdk/core/web.css`, so importing the stylesheet after Tailwind is enough in most setups.

The stylesheet maps UI SDK's `--ui-*` theme variables onto Nawet tokens, so parts inherit the design system palette rather than UI SDK's defaults.

## Components

```tsx
import { Rating } from "@nawet/ds-react-ui-sdk/components/rating";

<Rating aria-label="Rating" defaultValue={3} onValueChange={console.log} />;
```

### Rating

Five-star rating by default (`max={5}`). Each star is a radio in a radio group.

- Arrow keys move between stars and choose a rating.
- Space chooses the focused star.
- `loop` wraps at the ends.
- `deselectable` clears the rating when the checked star is pressed again.
- `readOnly` renders a static score.
- `value` + `onValueChange` control it; `defaultValue` leaves it uncontrolled.

Pass `itemClassName` to change the star size or add states. The default is `size-6` with a focus ring and a small highlight scale.

Built with UI SDK's `Rating` and `RatingItem` from `@ui-sdk/react/rating`; UI SDK owns roles, ARIA state, roving focus, and `data-slot` / `data-filled` attributes.
