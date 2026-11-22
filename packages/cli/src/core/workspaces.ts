import { readFile } from "node:fs/promises";
import path from "node:path";

import { glob } from "tinyglobby";
import { parse as parseYaml } from "yaml";

import { detectFrameworks } from "./detect.ts";
import { packageName, readPackageJson } from "./package-json.ts";
import type {
  PackageJson,
  ResolveTargetOptions,
  WorkspaceTarget,
} from "./types.ts";

interface WorkspacePatterns {
  include: string[];
  exclude: string[];
}

const readYaml = async (file: string): Promise<unknown> => {
  try {
    return parseYaml(await readFile(file, "utf-8"));
  } catch {
    return undefined;
  }
};

const workspacePatternsFromPackageJson = (
  packageJson: PackageJson
): string[] => {
  if (Array.isArray(packageJson.workspaces)) {
    return packageJson.workspaces;
  }

  return packageJson.workspaces?.packages ?? [];
};

const readWorkspacePatterns = async (
  root: string
): Promise<WorkspacePatterns> => {
  const pnpmWorkspace = await readYaml(path.join(root, "pnpm-workspace.yaml"));

  if (
    typeof pnpmWorkspace === "object" &&
    pnpmWorkspace !== null &&
    "packages" in pnpmWorkspace &&
    Array.isArray(pnpmWorkspace.packages)
  ) {
    const patterns = pnpmWorkspace.packages.filter(
      (pattern): pattern is string => typeof pattern === "string"
    );

    return {
      exclude: patterns
        .filter((pattern) => pattern.startsWith("!"))
        .map((pattern) => pattern.slice(1)),
      include: patterns.filter((pattern) => !pattern.startsWith("!")),
    };
  }

  const packageJson = await readPackageJson(root);
  const patterns = packageJson
    ? workspacePatternsFromPackageJson(packageJson)
    : [];

  return {
    exclude: patterns
      .filter((pattern) => pattern.startsWith("!"))
      .map((pattern) => pattern.slice(1)),
    include: patterns.filter((pattern) => !pattern.startsWith("!")),
  };
};

const listWorkspaceTargets = async (
  root: string
): Promise<WorkspaceTarget[]> => {
  const patterns = await readWorkspacePatterns(root);

  if (patterns.include.length === 0) {
    return [];
  }

  const packageJsonPaths = await glob(
    patterns.include.map((pattern) => `${pattern}/package.json`),
    {
      absolute: true,
      cwd: root,
      ignore: patterns.exclude.map((pattern) => `${pattern}/package.json`),
      onlyFiles: true,
    }
  );

  const targets = await Promise.all(
    packageJsonPaths.map(async (packageJsonPath): Promise<WorkspaceTarget> => {
      const dir = path.dirname(packageJsonPath);
      const packageJson = (await readPackageJson(dir)) ?? {};

      return {
        detections: detectFrameworks(packageJson),
        dir,
        name: packageName(packageJson),
        packageJson,
        packageJsonPath,
      };
    })
  );

  return targets
    .filter((target) => target.detections.length > 0)
    .toSorted((left, right) => left.dir.localeCompare(right.dir));
};

const targetFromDirectory = async (
  directory: string
): Promise<WorkspaceTarget | undefined> => {
  const packageJson = await readPackageJson(directory);

  if (!packageJson) {
    return undefined;
  }

  return {
    detections: detectFrameworks(packageJson),
    dir: directory,
    name: packageName(packageJson),
    packageJson,
    packageJsonPath: path.join(directory, "package.json"),
  };
};

export interface ResolvedTarget {
  candidates: WorkspaceTarget[];
  root: string;
  target?: WorkspaceTarget;
}

export const resolveTarget = async ({
  cwd,
  target,
}: ResolveTargetOptions): Promise<ResolvedTarget> => {
  const resolvedDirectory = path.resolve(cwd, target ?? ".");
  const directTarget = await targetFromDirectory(resolvedDirectory);

  if (directTarget && directTarget.detections.length > 0) {
    return {
      candidates: [directTarget],
      root: resolvedDirectory,
      target: directTarget,
    };
  }

  const candidates = await listWorkspaceTargets(resolvedDirectory);

  if (candidates.length > 0) {
    return {
      candidates,
      root: resolvedDirectory,
      target: candidates.length === 1 ? candidates[0] : undefined,
    };
  }

  return {
    candidates: [],
    root: resolvedDirectory,
    target: directTarget,
  };
};
