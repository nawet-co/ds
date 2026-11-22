import { readFile } from "node:fs/promises";
import path from "node:path";

import type { PackageJson } from "./types.ts";

export const readPackageJson = async (
  directory: string
): Promise<PackageJson | undefined> => {
  try {
    const content = await readFile(
      path.join(directory, "package.json"),
      "utf-8"
    );
    return JSON.parse(content) as PackageJson;
  } catch {
    return undefined;
  }
};

export const allDependencies = (
  packageJson: PackageJson
): Record<string, string> => ({
  ...packageJson.optionalDependencies,
  ...packageJson.peerDependencies,
  ...packageJson.devDependencies,
  ...packageJson.dependencies,
});

export const packageName = (packageJson: PackageJson): string =>
  packageJson.name ?? "unnamed package";
