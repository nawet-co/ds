import { access } from "node:fs/promises";
import path from "node:path";

import { readPackageJson } from "./package-json.ts";
import type { PackageManager } from "./types.ts";

const lockfiles: { file: string; manager: PackageManager }[] = [
  { file: "pnpm-lock.yaml", manager: "pnpm" },
  { file: "bun.lock", manager: "bun" },
  { file: "bun.lockb", manager: "bun" },
  { file: "yarn.lock", manager: "yarn" },
  { file: "package-lock.json", manager: "npm" },
  { file: "npm-shrinkwrap.json", manager: "npm" },
];

const packageManagers: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];

const exists = async (file: string): Promise<boolean> => {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
};

const detectInDirectory = async (
  directory: string
): Promise<PackageManager | undefined> => {
  const fromLockfiles = await Promise.all(
    lockfiles.map(async ({ file, manager }) =>
      (await exists(path.join(directory, file))) ? manager : undefined
    )
  );
  const fromLockfile = fromLockfiles.find(Boolean);

  if (fromLockfile) {
    return fromLockfile;
  }

  const packageJson = await readPackageJson(directory);
  const declared = packageJson?.packageManager?.split("@")[0];
  const fromField = packageManagers.find((manager) => manager === declared);

  if (fromField) {
    return fromField;
  }

  const parent = path.dirname(directory);

  return parent === directory ? undefined : detectInDirectory(parent);
};

export const detectPackageManager = (
  directory: string
): Promise<PackageManager | undefined> =>
  detectInDirectory(path.resolve(directory));

export const addCommand = (
  manager: PackageManager,
  packages: string[]
): { args: string[]; command: PackageManager } => ({
  args: ["add", ...packages],
  command: manager,
});

export const packageManagerLabel = (manager: PackageManager): string => manager;
