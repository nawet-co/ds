// @ts-check
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const uiSrc = fileURLToPath(new URL("../../packages/ui/src", import.meta.url));
const appSrc = fileURLToPath(new URL("src", import.meta.url));
const repoRoot = fileURLToPath(new URL("../..", import.meta.url));
const shadcnBin = fileURLToPath(
  new URL("../../packages/ui/node_modules/.bin/shadcn", import.meta.url)
);

/**
 * Rebuild registry.json into the public /r folder before Astro runs.
 * The deploy build runs Astro programmatically, so an npm lifecycle script
 * cannot cover it.
 *
 * @param {{ command: "dev" | "build" | "preview" | "sync" }} context
 *   Astro command currently running.
 */
const setupRegistry = ({ command }) => {
  if (command !== "build" && command !== "dev") {
    return;
  }

  execFileSync(
    shadcnBin,
    ["build", "registry.json", "-c", repoRoot, "-o", "apps/showcase/public/r"],
    { cwd: repoRoot, stdio: "inherit" }
  );
};

const registryBuild = () => ({
  hooks: {
    "astro:config:setup": setupRegistry,
  },
  name: "nawet-registry-build",
});

// https://astro.build/config
export default defineConfig({
  integrations: [react({ compiler: true }), registryBuild()],
  output: "server",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        {
          find: /^@\/components\/ui\/(?<path>.*)$/u,
          replacement: `${uiSrc}/components/$1`,
        },
        {
          find: /^@\/components\/(?<path>.*)$/u,
          replacement: `${uiSrc}/components/$1`,
        },
        {
          find: /^@\/hooks\/(?<path>.*)$/u,
          replacement: `${uiSrc}/hooks/$1`,
        },
        {
          find: /^@\/lib\/icons$/u,
          replacement: `${uiSrc}/lib/nawet/icons.tsx`,
        },
        {
          find: /^@\/lib\/(?<path>.*)$/u,
          replacement: `${uiSrc}/lib/$1`,
        },
        { find: /^@\/(?<path>.*)$/u, replacement: `${appSrc}/$1` },
      ],
    },
  },
});
