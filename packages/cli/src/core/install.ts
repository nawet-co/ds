import { execa } from "execa";

import { addCommand } from "./package-manager.ts";
import type { PackageManager } from "./types.ts";

export interface RunCommandOptions {
  cwd: string;
  dryRun?: boolean;
}

const run = async (
  command: string,
  args: string[],
  { cwd, dryRun }: RunCommandOptions
): Promise<void> => {
  if (dryRun) {
    return;
  }

  try {
    await execa(command, args, { cwd, stdio: "pipe" });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${command} ${args.join(" ")} failed\n${message}`, {
      cause: error,
    });
  }
};

export const installPackages = async (
  manager: PackageManager,
  packages: string[],
  options: RunCommandOptions
): Promise<void> => {
  const { args, command } = addCommand(manager, packages);
  await run(command, args, options);
};
