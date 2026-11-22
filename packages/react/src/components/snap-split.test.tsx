import { renderToString } from "react-dom/server";
import { expect, test } from "vitest";

import { SnapSplit } from "./snap-split";

test("renders a resize separator between the two panes", () => {
  const html = renderToString(
    <SnapSplit
      defaultWidth={500}
      label="Resize main"
      maxWidth={900}
      minWidth={320}
      storageKey="test:snap"
    >
      <div>start</div>
      <div>end</div>
    </SnapSplit>
  );

  expect(html).toContain('data-slot="snap-split"');
  expect(html).toContain('data-slot="snap-split-rail"');
  expect(html).toContain('role="separator"');
  expect(html).toContain('aria-orientation="vertical"');
  expect(html).toContain('aria-label="Resize main"');
  expect(html).toContain('aria-valuemin="320"');
  expect(html).toContain('aria-valuemax="900"');
  expect(html).toContain('aria-valuenow="500"');
  expect(html).toContain('tabindex="0"');
  expect(html).toContain("width:500px");
  expect(html).toContain("start");
  expect(html).toContain("end");
});

test("renders both panes in source order", () => {
  const html = renderToString(
    <SnapSplit>
      <span>first pane</span>
      <span>second pane</span>
    </SnapSplit>
  );

  expect(html.indexOf("first pane")).toBeLessThan(html.indexOf("second pane"));
  expect(html).toContain('data-pane="start"');
  expect(html).toContain('data-pane="end"');
});
