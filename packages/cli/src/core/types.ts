export type Framework = "react" | "solid";

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
