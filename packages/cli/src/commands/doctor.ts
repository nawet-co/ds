import { readFile, realpath } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

import { intro, log, note, outro } from "@clack/prompts";
import pc from "picocolors";
import { gte } from "semver";

import { findCssEntry, hasStylesImport } from "../core/css.ts";
import { describeDetection, isFrameworkSupported } from "../core/detect.ts";
import { chooseFramework, chooseTarget } from "../core/prompts.ts";
import { resolveTarget } from "../core/workspaces.ts";

export interface DoctorCommandOptions {
  cwd: string;
  framework?: string;
  target?: string;
  yes?: boolean;
}

type CheckLevel = "error" | "success" | "warn";

interface Check {
  level: CheckLevel;
  message: string;
}

const installedVersion = async (
  targetDir: string,
  packageName: string
): Promise<string | undefined> => {
  try {
    const require = createRequire(path.join(targetDir, "package.json"));
    const packageJsonPath = require.resolve(`${packageName}/package.json`);
    const packageJson = JSON.parse(
      await readFile(packageJsonPath, "utf-8")
    ) as { version?: string };

    return packageJson.version;
  } catch {
    return undefined;
  }
};

const reactCopies = async (targetDir: string): Promise<string[]> => {
  const copies = new Set<string>();

  try {
    const require = createRequire(path.join(targetDir, "package.json"));
    copies.add(await realpath(require.resolve("react/package.json")));
  } catch {
    // React is checked separately.
  }

  try {
    copies.add(
      await realpath(
        path.join(
          targetDir,
          "node_modules/@nawet/ds-react/node_modules/react/package.json"
        )
      )
    );
  } catch {
    // The common case: the package correctly uses the consumer's React.
  }

  return [...copies];
};

const add = (checks: Check[], level: CheckLevel, message: string): void => {
  checks.push({ level, message });
};

// The command intentionally keeps all user-facing checks in one readable flow.
// eslint-disable-next-line complexity
export const runDoctor = async (
  options: DoctorCommandOptions
): Promise<number> => {
  intro(pc.bold("Nawet DS doctor"));

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
  const checks: Check[] = [];
  const frameworkPackage = `@nawet/ds-${framework}`;
  const frameworkVersion = await installedVersion(target.dir, frameworkPackage);

  if (frameworkVersion) {
    add(checks, "success", `${frameworkPackage} ${frameworkVersion}`);
  } else {
    add(checks, "error", `${frameworkPackage} is not installed.`);
  }

  const coreVersion = await installedVersion(target.dir, "@nawet/ds-core");
  if (coreVersion) {
    add(checks, "success", `@nawet/ds-core ${coreVersion}`);
  } else {
    add(checks, "error", "@nawet/ds-core is not installed.");
  }

  const detection = target.detections.find(
    (candidate) => candidate.framework === framework
  );

  if (detection) {
    const runtimeName = framework === "react" ? "react" : "solid-js";
    const runtimeVersion =
      (await installedVersion(target.dir, runtimeName)) ?? detection.version;

    if (isFrameworkSupported(framework, runtimeVersion)) {
      add(
        checks,
        "success",
        `${runtimeName} ${runtimeVersion ?? "version unknown"} is supported`
      );
    } else {
      add(checks, "error", `${runtimeName} ${runtimeVersion} is too old.`);
    }
  } else {
    add(
      checks,
      "warn",
      `Could not verify ${framework === "react" ? "React" : "Solid"} from package.json.`
    );
  }

  const tailwind = await installedVersion(target.dir, "tailwindcss");
  if (tailwind && gte(tailwind, "4.0.0")) {
    add(checks, "success", `tailwindcss ${tailwind}`);
  } else if (tailwind) {
    add(checks, "error", `tailwindcss ${tailwind} is not v4.`);
  } else {
    add(checks, "warn", "Could not resolve tailwindcss.");
  }

  if (framework === "react") {
    const copies = await reactCopies(target.dir);
    if (copies.length > 1) {
      add(
        checks,
        "error",
        "Multiple React copies detected. React must resolve from the consumer app."
      );
    } else if (copies.length === 1) {
      add(checks, "success", "Single React instance.");
    }
  }

  const cssEntry = await findCssEntry(target.dir);
  if (cssEntry) {
    const content = await readFile(cssEntry, "utf-8");
    if (hasStylesImport(content, framework)) {
      add(checks, "success", `Styles imported in ${cssEntry}.`);
    } else {
      add(
        checks,
        "error",
        `Add @import "@nawet/ds-${framework}/styles.css" to ${cssEntry}.`
      );
    }
  } else {
    add(checks, "warn", "Could not find a Tailwind CSS entrypoint.");
  }

  for (const check of checks) {
    const message = `${pc.dim(check.message)}`;

    if (check.level === "success") {
      log.success(message);
    } else if (check.level === "warn") {
      log.warn(message);
    } else {
      log.error(message);
    }
  }

  const errors = checks.filter((check) => check.level === "error").length;

  note(
    [
      `Target      ${target.name}`,
      `Framework   ${describeDetection({ evidence: [], framework })}`,
      `Detections  ${target.detections.map(describeDetection).join(", ") || "none"}`,
      `Errors      ${errors}`,
    ].join("\n"),
    "Result"
  );

  if (errors > 0) {
    outro(pc.red("Nawet DS needs attention."));
    return 1;
  }

  outro(pc.green("Nawet DS looks healthy."));
  return 0;
};
