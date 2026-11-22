import { cancel, isCancel, select } from "@clack/prompts";

import { describeDetection, frameworkLabel } from "./detect.ts";
import { detectPackageManager } from "./package-manager.ts";
import type { Framework, PackageManager, WorkspaceTarget } from "./types.ts";

export class CancelledError extends Error {
  constructor(message = "Cancelled.") {
    super(message);
    this.name = "CancelledError";
  }
}

export const ensure = <T>(value: T | symbol): T => {
  if (isCancel(value)) {
    cancel("Cancelled.");
    throw new CancelledError();
  }

  return value as T;
};

const isFramework = (value: string): value is Framework =>
  value === "react" || value === "solid";

const isPackageManager = (value: string): value is PackageManager =>
  ["pnpm", "npm", "yarn", "bun"].includes(value);

export const chooseTarget = async (
  candidates: WorkspaceTarget[],
  yes: boolean
): Promise<WorkspaceTarget> => {
  const [first] = candidates;

  if (first && candidates.length === 1) {
    return first;
  }

  if (yes) {
    throw new Error(
      "Multiple workspaces detected. Pass -c <path> to select one."
    );
  }

  return ensure<WorkspaceTarget>(
    await select<WorkspaceTarget>({
      message: "Which workspace should receive Nawet DS?",
      options: candidates.map((candidate) => ({
        hint: candidate.detections
          .map((detection) => describeDetection(detection))
          .join(" · "),
        label: candidate.name,
        value: candidate,
      })),
    })
  );
};

export const chooseFramework = async (
  target: WorkspaceTarget,
  explicit: string | undefined,
  yes: boolean
): Promise<Framework> => {
  if (explicit) {
    if (!isFramework(explicit)) {
      throw new Error(`Unknown framework "${explicit}". Use react or solid.`);
    }

    return explicit;
  }

  const [first] = target.detections;

  if (target.detections.length === 1 && first) {
    return first.framework;
  }

  if (yes) {
    throw new Error(
      "Framework detection is ambiguous. Pass --framework react or --framework solid."
    );
  }

  const options: {
    disabled?: boolean;
    hint: string;
    label: string;
    value: Framework;
  }[] = target.detections.map((detection) => ({
    hint: detection.evidence.join(", "),
    label: frameworkLabel(detection.framework),
    value: detection.framework,
  }));

  if (options.length === 0) {
    options.push(
      {
        hint: "No React dependency found",
        label: "React",
        value: "react",
      },
      {
        disabled: true,
        hint: "Coming after Solid 2.0 support lands",
        label: "Solid",
        value: "solid",
      }
    );
  }

  return ensure<Framework>(
    await select<Framework>({
      message: "Which framework should Nawet DS target?",
      options,
    })
  );
};

export const choosePackageManager = async (
  target: WorkspaceTarget,
  explicit: string | undefined,
  yes: boolean
): Promise<PackageManager> => {
  if (explicit) {
    if (!isPackageManager(explicit)) {
      throw new Error(
        `Unknown package manager "${explicit}". Use pnpm, npm, yarn, or bun.`
      );
    }

    return explicit;
  }

  const detected = await detectPackageManager(target.dir);

  if (detected) {
    return detected;
  }

  if (yes) {
    throw new Error(
      "Could not detect a package manager. Pass --package-manager <manager>."
    );
  }

  return ensure<PackageManager>(
    await select<PackageManager>({
      message: "Which package manager should install the packages?",
      options: ["pnpm", "npm", "yarn", "bun"].map((manager) => ({
        label: manager,
        value: manager as PackageManager,
      })),
    })
  );
};
