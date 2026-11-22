import assert from "node:assert/strict";
import test from "node:test";

import {
  detectFrameworks,
  isFrameworkSupported,
  normalizeVersion,
} from "./detect.ts";

test("detects React from dependencies", () => {
  const [detection] = detectFrameworks({
    dependencies: {
      "@astrojs/react": "^7.1.0",
      astro: "^7.3.1",
      react: "^19.3.1",
      "react-dom": "^19.3.1",
    },
  });

  assert.equal(detection?.framework, "react");
  assert.equal(detection?.version, "19.3.1");
  assert.equal(detection?.metaFramework, "Astro");
  assert.deepEqual(detection?.evidence.toSorted(), [
    "@astrojs/react",
    "react",
    "react-dom",
  ]);
});

test("detects Solid from dependencies", () => {
  const [detection] = detectFrameworks({
    dependencies: {
      "@solidjs/start": "^2.0.0",
      "solid-js": "^2.0.0",
    },
  });

  assert.equal(detection?.framework, "solid");
  assert.equal(detection?.version, "2.0.0");
  assert.equal(detection?.metaFramework, "SolidStart");
});

test("reports ambiguous repositories", () => {
  const detections = detectFrameworks({
    dependencies: {
      react: "^19.3.1",
      "solid-js": "^2.0.0",
    },
  });

  assert.deepEqual(
    detections.map((detection) => detection.framework),
    ["react", "solid"]
  );
});

test("treats catalog and workspace versions as unknown", () => {
  assert.equal(normalizeVersion("catalog:"), undefined);
  assert.equal(normalizeVersion("workspace:*"), undefined);
  assert.equal(isFrameworkSupported("react"), true);
});

test("enforces minimum framework versions", () => {
  assert.equal(isFrameworkSupported("react", "18.3.1"), false);
  assert.equal(isFrameworkSupported("react", "19.0.0"), true);
  assert.equal(isFrameworkSupported("solid", "1.9.0"), false);
  assert.equal(isFrameworkSupported("solid", "2.0.0"), true);
});
