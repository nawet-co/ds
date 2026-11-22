import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { confirm, intro, log, note, outro, spinner } from "@clack/prompts";
import pc from "picocolors";

import { addStylesImport, findCssEntry, hasStylesImport } from "../core/css.ts";
import { frameworkLabel, isFrameworkSupported } from "../core/detect.ts";
import { installPackages } from "../core/install.ts";
import { packageManagerLabel } from "../core/package-manager.ts";
import {
  chooseFramework,
  choosePackageManager,
  chooseTarget,
  ensure,
} from "../core/prompts.ts";
import type { Framework, WorkspaceTarget } from "../core/types.ts";
import { resolveTarget } from "../core/workspaces.ts";

export interface InitCommandOptions {
  cwd: string;
  css?: boolean;
  dryRun?: boolean;
  framework?: string;
  install?: boolean;
  packageManager?: string;
  target?: string;
  yes?: boolean;
}

const validateTarget = (
  target: WorkspaceTarget,
  framework: Framework
): void => {
  const detection = target.detections.find(
    (candidate) => candidate.framework === framework
  );

  if (target.detections.length > 0 && !detection) {
    throw new Error(
      `${target.name} does not look like a ${frameworkLabel(framework)} project.`
    );
  }

  if (detection && !isFrameworkSupported(framework, detection.version)) {
    throw new Error(
      `${frameworkLabel(framework)} ${detection.version} is too old. Nawet DS requires ${framework === "react" ? "React 19+" : "Solid 2.0+"}.`
    );
  }

  if (framework === "solid") {
    throw new Error(
      "@nawet/ds-solid is reserved for later. Solid 2.0 support is not implemented yet."
    );
  }
};

export const runInit = async (options: InitCommandOptions): Promise<number> => {
  intro(pc.bold("Nawet DS"));

  const resolved = await resolveTarget({
    cwd: options.cwd,
    target: options.target,
  });

  if (resolved.candidates.length === 0) {
    log.error(
      "No workspace found. Run this inside an app package or pass -c <path>."
    );
    return 1;
  }

  const target = await chooseTarget(resolved.candidates, Boolean(options.yes));
  const framework = await chooseFramework(
    target,
    options.framework,
    Boolean(options.yes)
  );

  validateTarget(target, framework);

  const manager = await choosePackageManager(
    target,
    options.packageManager,
    Boolean(options.yes)
  );
  const packages = ["@nawet/ds-core", `@nawet/ds-${framework}`];
  const cssEntry = await findCssEntry(target.dir);

  if (!options.yes) {
    const proceed = ensure(
      await confirm({
        initialValue: true,
        message: `Install ${packages.join(" and ")} in ${target.name}?`,
      })
    );

    if (!proceed) {
      log.info("Installation cancelled.");
      return 0;
    }
  }

  note(
    [
      `Target     ${target.name}`,
      `Framework  ${frameworkLabel(framework)}`,
      `Manager    ${packageManagerLabel(manager)}`,
      `Packages   ${packages.join(", ")}`,
      `CSS        ${cssEntry ? path.relative(target.dir, cssEntry) : "not detected"}`,
    ].join("\n"),
    "Install plan"
  );

  if (options.dryRun) {
    outro(pc.dim("Dry run complete. Nothing was written."));
    return 0;
  }

  if (options.install === false) {
    log.info(
      `Skipped install. Run ${manager} add ${packages.join(" ")} manually.`
    );
  } else {
    const s = spinner();
    s.start("Installing packages");
    try {
      await installPackages(manager, packages, { cwd: target.dir });
      s.stop("Packages installed.");
    } catch (error) {
      s.stop(pc.red("Installation failed."));
      throw error;
    }
  }

  if (options.css !== false) {
    if (cssEntry) {
      const content = await readFile(cssEntry, "utf-8");

      if (hasStylesImport(content, framework)) {
        log.success(`Styles already imported in ${cssEntry}.`);
      } else {
        const add = options.yes
          ? true
          : ensure(
              await confirm({
                initialValue: true,
                message: `Add @nawet/ds-${framework}/styles.css to ${cssEntry}?`,
              })
            );

        if (add) {
          await writeFile(
            cssEntry,
            addStylesImport(content, framework),
            "utf-8"
          );
          log.success(`Updated ${cssEntry}.`);
        }
      }
    } else {
      log.warn("Could not find a Tailwind CSS entrypoint.");
      note(
        `@import "tailwindcss";\n@import "@nawet/ds-${framework}/styles.css";`,
        "Add this to your global CSS"
      );
    }
  }

  outro(pc.green("Nawet DS is ready."));

  return 0;
};
