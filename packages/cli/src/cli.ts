import { readFileSync } from "node:fs";
import path from "node:path";

import { log } from "@clack/prompts";
import { Command } from "commander";

import { runDoctor } from "./commands/doctor.ts";
import { runInit } from "./commands/init.ts";
import { CancelledError } from "./core/prompts.ts";

const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf-8")
) as { version: string };

const program = new Command()
  .name("nawet-ds")
  .description("Install and verify Nawet Design System packages.")
  .version(packageJson.version)
  .showHelpAfterError();

program
  .command("init")
  .description("Install Nawet DS in a React or Solid workspace")
  .argument("[directory]", "workspace directory (defaults to cwd)")
  .option("-c, --cwd <path>", "directory to scan", process.cwd())
  .option("-f, --framework <framework>", "react or solid")
  .option(
    "-i, --implementation <implementation>",
    "base-ui (React) or ui-sdk (React and Solid)"
  )
  .option("-p, --package-manager <manager>", "pnpm, npm, yarn, or bun")
  .option("-y, --yes", "skip confirmation prompts")
  .option("--dry-run", "print the plan without writing or installing")
  .option("--no-install", "skip package installation")
  .option("--no-css", "skip CSS entrypoint changes")
  .action(
    async (
      directory: string | undefined,
      options: {
        css?: boolean;
        cwd: string;
        dryRun?: boolean;
        framework?: string;
        implementation?: string;
        install?: boolean;
        packageManager?: string;
        yes?: boolean;
      }
    ) => {
      process.exitCode = await runInit({
        css: options.css,
        cwd: path.resolve(options.cwd),
        dryRun: options.dryRun,
        framework: options.framework,
        implementation: options.implementation,
        install: options.install,
        packageManager: options.packageManager,
        target: directory,
        yes: options.yes,
      });
    }
  );

program
  .command("doctor")
  .description("Check a Nawet DS installation")
  .argument("[directory]", "workspace directory (defaults to cwd)")
  .option("-c, --cwd <path>", "directory to scan", process.cwd())
  .option("-f, --framework <framework>", "react or solid")
  .option(
    "-i, --implementation <implementation>",
    "base-ui (React) or ui-sdk (React and Solid)"
  )
  .option("-y, --yes", "skip confirmation prompts")
  .action(
    async (
      directory: string | undefined,
      options: {
        cwd: string;
        framework?: string;
        implementation?: string;
        yes?: boolean;
      }
    ) => {
      process.exitCode = await runDoctor({
        cwd: path.resolve(options.cwd),
        framework: options.framework,
        implementation: options.implementation,
        target: directory,
        yes: options.yes,
      });
    }
  );

try {
  await program.parseAsync(process.argv);
} catch (error) {
  if (!(error instanceof CancelledError)) {
    log.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
