import { renderToString } from "react-dom/server";
import { expect, test } from "vitest";

import { Button } from "./button";
import { NawetProvider, useNawetConfig } from "./providers";

const ConfigProbe = () => {
  const config = useNawetConfig();

  return (
    <span data-density={config.density} data-direction={config.direction}>
      {config.locale}
    </span>
  );
};

test("renders the configured provider tree", () => {
  const html = renderToString(
    <NawetProvider
      density="compact"
      direction="rtl"
      locale="ar"
      toaster={false}
    >
      <ConfigProbe />
      <Button>Configured button</Button>
    </NawetProvider>
  );

  expect(html).toContain('data-density="compact"');
  expect(html).toContain('data-direction="rtl"');
  expect(html).toContain(">ar<");
  expect(html).toContain('data-slot="button"');
  expect(html).toContain("Configured button");
});

test("provides defaults without an explicit provider", () => {
  const html = renderToString(<ConfigProbe />);

  expect(html).toContain('data-density="default"');
  expect(html).toContain('data-direction="ltr"');
  expect(html).toContain(">en<");
});
