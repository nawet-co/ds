import assert from "node:assert/strict";
import test from "node:test";

import {
  addStylesImport,
  hasStylesImport,
  hasUiSdkLayer,
  uiSdkLayerPrecedesTailwind,
} from "./css.ts";
import type { FrameworkSelection } from "./types.ts";

const baseUi: FrameworkSelection = {
  framework: "react",
  implementation: "base-ui",
};

const uiSdk: FrameworkSelection = {
  framework: "solid",
  implementation: "ui-sdk",
};

test("adds the framework stylesheet after the Tailwind import", () => {
  const content = '@import "tailwindcss";\n\nbody { color: red; }\n';
  const next = addStylesImport(content, {
    packageName: "@nawet/ds-react",
    selection: baseUi,
  });

  assert.match(
    next,
    /@import "tailwindcss";\n@import "@nawet\/ds-react\/styles.css";/u
  );
  assert.equal(hasStylesImport(next, "@nawet/ds-react"), true);
});

test("declares the UI SDK layer above Tailwind", () => {
  const content = '@import "tailwindcss";\n';
  const next = addStylesImport(content, {
    packageName: "@nawet/ds-solid-ui-sdk",
    selection: uiSdk,
  });

  assert.match(
    next,
    /^@layer ui-sdk;\n\n@import "tailwindcss";\n@import "@nawet\/ds-solid-ui-sdk\/styles.css";/u
  );
  assert.equal(hasUiSdkLayer(next), true);
  assert.equal(uiSdkLayerPrecedesTailwind(next), true);
});

test("hoists an existing UI SDK layer above Tailwind", () => {
  const content =
    '@import "tailwindcss";\n\n@layer ui-sdk;\n\nbody { margin: 0; }\n';
  const next = addStylesImport(content, {
    packageName: "@nawet/ds-react-ui-sdk",
    selection: { framework: "react", implementation: "ui-sdk" },
  });

  assert.match(next, /^@layer ui-sdk;\n\n@import "tailwindcss";/u);
  assert.equal(
    next.match(/@layer ui-sdk;/gu)?.length,
    1,
    "the layer is declared once"
  );
  assert.equal(uiSdkLayerPrecedesTailwind(next), true);
});

test("does not add the layer for Base UI", () => {
  const next = addStylesImport('@import "tailwindcss";\n', {
    packageName: "@nawet/ds-react",
    selection: baseUi,
  });

  assert.equal(hasUiSdkLayer(next), false);
});

test("detects the styles import regardless of quote style", () => {
  assert.equal(
    hasStylesImport(
      "@import '@nawet/ds-solid-ui-sdk/styles.css';",
      "@nawet/ds-solid-ui-sdk"
    ),
    true
  );
});

test("is idempotent", () => {
  const options = {
    packageName: "@nawet/ds-solid-ui-sdk",
    selection: uiSdk,
  };
  const once = addStylesImport('@import "tailwindcss";\n', options);
  const twice = addStylesImport(once, options);

  assert.equal(twice, once);
});

test("works without an existing Tailwind import", () => {
  const next = addStylesImport("body { margin: 0; }\n", {
    packageName: "@nawet/ds-react",
    selection: baseUi,
  });

  assert.match(next, /^@import "@nawet\/ds-react\/styles.css";/u);
});
