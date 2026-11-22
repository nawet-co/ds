# @nawet/ds-react

React implementation of Nawet DS, built on Base UI.

## Owns

- React components
- React hooks
- providers
- React icon adapter
- Motion React presets
- React-specific styling entrypoint

## Usage

```bash
pnpm add @nawet/ds-react
```

```css
@import "tailwindcss";
@import "@nawet/ds-react/styles.css";
@source "../src/**/*.{ts,tsx}";
```

```tsx
import { Button } from "@nawet/ds-react/components/button";
import { Providers } from "@nawet/ds-react/components/providers";
```

`@nawet/ds-react/styles.css` imports the framework-neutral core styles and scans this package's source files for Tailwind classes.
