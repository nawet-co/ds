import { access, readFile } from "node:fs/promises";
import path from "node:path";

import { glob } from "tinyglobby";

import type { Framework } from "./types.ts";

const commonCssEntries = [
  "src/styles/global.css",
  "src/styles/index.css",
  "src/styles.css",
  "src/index.css",
  "src/global.css",
  "app/globals.css",
  "src/app/globals.css",
];

const importLine = (framework: Framework): string =>
  `@import "@nawet/ds-${framework}/styles.css";`;

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

  return contents.find(({ content }) =>
    /@import\s+["']tailwindcss["']/u.test(content)
  )?.file;
};

export const hasStylesImport = (
  content: string,
  framework: Framework
): boolean => content.includes(`@nawet/ds-${framework}/styles.css`);

export const addStylesImport = (
  content: string,
  framework: Framework
): string => {
  const line = importLine(framework);

  if (hasStylesImport(content, framework)) {
    return content;
  }

  const tailwindImport = /@import\s+["']tailwindcss["'];?/u.exec(content);

  if (tailwindImport) {
    const index = (tailwindImport.index ?? 0) + tailwindImport[0].length;

    return `${content.slice(0, index)}\n${line}${content.slice(index)}`;
  }

  return `${line}\n${content}`;
};
