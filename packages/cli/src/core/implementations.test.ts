import assert from "node:assert/strict";
import test from "node:test";

import {
  defaultImplementation,
  implementationsFor,
  isImplementation,
  packageFor,
  requiresUiSdkLayer,
  supportsImplementation,
} from "./implementations.ts";

test("React offers both implementations", () => {
  assert.deepEqual(
    implementationsFor("react").map((option) => option.implementation),
    ["base-ui", "ui-sdk"]
  );
});

test("Solid only offers UI SDK", () => {
  assert.deepEqual(
    implementationsFor("solid").map((option) => option.implementation),
    ["ui-sdk"]
  );
  assert.equal(supportsImplementation("solid", "base-ui"), false);
  assert.equal(supportsImplementation("solid", "ui-sdk"), true);
});

test("defaults follow the plan", () => {
  assert.equal(defaultImplementation("react"), "base-ui");
  assert.equal(defaultImplementation("solid"), "ui-sdk");
});

test("maps every supported pair to a package", () => {
  assert.equal(packageFor("react", "base-ui"), "@nawet/ds-react");
  assert.equal(packageFor("react", "ui-sdk"), "@nawet/ds-react-ui-sdk");
  assert.equal(packageFor("solid", "ui-sdk"), "@nawet/ds-solid-ui-sdk");
  assert.throws(
    () => packageFor("solid", "base-ui"),
    /does not have a shadcn \+ Base UI implementation/u
  );
});

test("only UI SDK needs the cascade layer", () => {
  assert.equal(requiresUiSdkLayer("ui-sdk"), true);
  assert.equal(requiresUiSdkLayer("base-ui"), false);
  assert.equal(isImplementation("ui-sdk"), true);
  assert.equal(isImplementation("base-ui"), true);
  assert.equal(isImplementation("radix"), false);
});
