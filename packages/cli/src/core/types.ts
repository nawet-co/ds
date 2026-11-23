export type Framework = "react" | "solid";

/**
 * The behavior layer a framework implementation is built on.
 *
 * Solid only ships one: `ui-sdk`.
 */
export type Implementation = "base-ui" | "ui-sdk";

export interface ImplementationOption {
  hint: string;
  implementation: Implementation;
  label: string;
}

export interface FrameworkSelection {
  framework: Framework;
  implementation: Implementation;
}

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export interface PackageJson {
  name?: string;
  version?: string;
  private?: boolean;
  packageManager?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  workspaces?: string[] | { packages?: string[] };
}

export interface WorkspaceTarget {
  dir: string;
  name: string;
  packageJson: PackageJson;
  packageJsonPath: string;
  detections: FrameworkDetection[];
}

export interface FrameworkDetection {
  framework: Framework;
  evidence: string[];
  version?: string;
  metaFramework?: string;
}

export interface ResolveTargetOptions {
  cwd: string;
  target?: string;
}
