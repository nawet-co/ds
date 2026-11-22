import { renderToString } from "react-dom/server";
import { expect, test } from "vitest";

import {
  Sidebar,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./sidebar";

test("sidebar edge resizes instead of toggling", () => {
  const html = renderToString(
    <SidebarProvider>
      <Sidebar>
        <SidebarRail />
      </Sidebar>
      <SidebarTrigger />
    </SidebarProvider>
  );

  expect(html).toContain('data-slot="sidebar-rail"');
  expect(html).toContain('role="separator"');
  expect(html).toContain('aria-orientation="vertical"');
  expect(html).toContain('aria-label="Resize Sidebar"');
  expect(html).toContain('aria-valuemin="192"');
  expect(html).toContain('aria-valuemax="512"');
  expect(html).not.toContain('aria-label="Toggle Sidebar"');
  expect(html).toContain('data-slot="sidebar-trigger"');
});

test("collapsed sidebar has no resize edge", () => {
  const html = renderToString(
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );

  expect(html).toContain('data-state="collapsed"');
  expect(html).not.toContain('data-slot="sidebar-rail"');
});
