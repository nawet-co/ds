import assert from "node:assert/strict";
import test from "node:test";

import { addStylesImport, hasStylesImport } from "./css.ts";

test("adds the framework stylesheet after the Tailwind import", () => {
  const content = '@import "tailwindcss";\n\nbody { color: red; }\n';
  const next = addStylesImport(content, "react");

  assert.match(
    next,
    /@import "tailwindcss";\n@import "@nawet\/ds-react\/styles.css";/u
  );
  assert.equal(hasStylesImport(next, "react"), true);
});

test("is idempotent", () => {
  const once = addStylesImport('@import "tailwindcss";\n', "react");
  const twice = addStylesImport(once, "react");

  assert.equal(twice, once);
});

test("works without an existing Tailwind import", () => {
  const next = addStylesImport("body { margin: 0; }\n", "react");

  assert.match(next, /^@import "@nawet\/ds-react\/styles.css";/u);
});
