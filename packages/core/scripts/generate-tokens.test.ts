import assert from "node:assert/strict";
import test from "node:test";

import { buildTokenOutput, parseTokenCss } from "./generate-tokens.ts";

const sources = {
  base: `
    @layer base {
      body {
        color: var(--foreground);
      }
    }
  `,
  chart: `
    :root {
      --chart-1: var(--background);
    }
  `,
  scale: `
    :root {
      --radius: 0.5rem;
      --duration-fast: 150ms;
    }

    @theme static {
      --spacing: 0.25rem;
      --radius-sm: calc(var(--radius) * 0.6);
      --text-sm: 0.875rem;
      --text-sm--line-height: 1.25rem;
      --font-weight-medium: 500;
      --font-sans: Figtree, sans-serif;
      --font-mono: monospace;
      --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.1);
      --ease-out: cubic-bezier(0, 0, 0.2, 1);
    }
  `,
  semantic: `
    :root {
      --background: white;
      --foreground: black;
    }

    .dark {
      --background: black;
      --foreground: white;
    }
  `,
  theme: `
    @theme inline {
      --color-background: var(--background);
      --color-foreground: var(--foreground);
    }
  `,
};

test("parseTokenCss handles comments and multiline values", () => {
  const parsed = parseTokenCss(`
    /* ignored */
    :root {
      --shadow:
        0 1px 2px red,
        0 2px 3px blue;
    }
  `);

  assert.equal(parsed.root["--shadow"], "0 1px 2px red, 0 2px 3px blue");
});

test("builds typed tokens from the token CSS", () => {
  const { tokens } = buildTokenOutput(sources);

  assert.equal(tokens.duration.fast, 0.15);
  assert.deepEqual(tokens.text.sm, {
    lineHeight: "1.25rem",
    size: "0.875rem",
  });
  assert.equal(tokens.radius.base, "0.5rem");
  assert.equal(tokens.radius.sm, "calc(var(--radius) * 0.6)");
  assert.equal(tokens.spacing, "0.25rem");
  assert.equal(tokens.font.mono, "monospace");
  assert.equal(tokens.ease.out, "cubic-bezier(0, 0, 0.2, 1)");
});

test("rejects semantic tokens without a dark counterpart", () => {
  assert.throws(
    () =>
      buildTokenOutput({
        ...sources,
        semantic: `
          :root { --background: white; --foreground: black; }
          .dark { --background: black; }
        `,
      }),
    /same keys/u
  );
});

test("rejects unresolved token references", () => {
  assert.throws(
    () =>
      buildTokenOutput({
        ...sources,
        base: `
          @layer base {
            body { color: var(--missing); }
          }
        `,
      }),
    /Unresolved token references/u
  );
});
