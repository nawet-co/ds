import { access, readFile } from "node:fs/promises";
import path from "node:path";

import { glob } from "tinyglobby";

import { requiresUiSdkLayer } from "./implementations.ts";
import type { FrameworkSelection } from "./types.ts";

const commonCssEntries = [
  "src/styles/global.css",
  "src/styles/index.css",
  "src/styles.css",
  "src/index.css",
  "src/global.css",
  "app/globals.css",
  "src/app/globals.css",
];

const TAILWIND_IMPORT = /@import\s+["']tailwindcss["'];?/u;
const UI_SDK_LAYER = /@layer\s+ui-sdk\s*;/u;

const exists = async (file: string): Promise<boolean> => {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
};

export const findCssEntry = async (
  targetDir: string
): Promise<string | undefined> => {
  const candidates = await Promise.all(
    commonCssEntries.map(async (entry) => {
      const file = path.join(targetDir, entry);
      return (await exists(file)) ? file : undefined;
    })
  );
  const commonEntry = candidates.find(Boolean);

  if (commonEntry) {
    return commonEntry;
  }

  const cssFiles = await glob("**/*.css", {
    absolute: true,
    cwd: targetDir,
    ignore: ["**/node_modules/**", "**/dist/**", "**/build/**"],
    onlyFiles: true,
  });
  const contents = await Promise.all(
    cssFiles.toSorted().map(async (file) => ({
      content: await readFile(file, "utf-8"),
      file,
    }))
  );

  return contents.find(({ content }) => TAILWIND_IMPORT.test(content))?.file;
};

export const hasStylesImport = (
  content: string,
  packageName: string
): boolean => content.includes(`${packageName}/styles.css`);

export const hasUiSdkLayer = (content: string): boolean =>
  UI_SDK_LAYER.test(content);

/**
 * UI SDK declares its cascade layer above Tailwind. The layer statement must
 * come first so Tailwind's layers resolve after it.
 */
export const uiSdkLayerPrecedesTailwind = (content: string): boolean => {
  const layerIndex = content.search(UI_SDK_LAYER);

  if (layerIndex === -1) {
    return false;
  }

  const tailwindIndex = content.search(TAILWIND_IMPORT);

  return tailwindIndex === -1 || layerIndex < tailwindIndex;
};

const ensureUiSdkLayer = (content: string): string => {
  if (uiSdkLayerPrecedesTailwind(content)) {
    return content;
  }

  // Drop an existing statement so it can be hoisted above Tailwind.
  const withoutLayer = content.replace(UI_SDK_LAYER, "").trimStart();

  return `@layer ui-sdk;\n\n${withoutLayer}`;
};

export interface StylesTarget {
  packageName: string;
  selection: FrameworkSelection;
}

export const addStylesImport = (
  content: string,
  { packageName, selection }: StylesTarget
): string => {
  const withLayer = requiresUiSdkLayer(selection.implementation)
    ? ensureUiSdkLayer(content)
    : content;
  const line = `@import "${packageName}/styles.css";`;

  if (hasStylesImport(withLayer, packageName)) {
    return withLayer;
  }

  const tailwindImport = TAILWIND_IMPORT.exec(withLayer);

  if (tailwindImport) {
    const index = (tailwindImport.index ?? 0) + tailwindImport[0].length;

    return `${withLayer.slice(0, index)}\n${line}${withLayer.slice(index)}`;
  }

  return `${line}\n${withLayer}`;
};
