import { coerce, gte, minVersion } from "semver";

import { allDependencies } from "./package-json.ts";
import type { Framework, FrameworkDetection, PackageJson } from "./types.ts";

const REACT_DEPENDENCIES = [
  "react",
  "react-dom",
  "next",
  "@remix-run/react",
  "@tanstack/react-router",
  "@tanstack/react-start",
  "@astrojs/react",
  "vite-plugin-react",
  "@vitejs/plugin-react",
] as const;

const SOLID_DEPENDENCIES = [
  "solid-js",
  "@solidjs/web",
  "@solidjs/start",
  "@solidjs/router",
  "vite-plugin-solid",
  "@solidjs/vite-plugin",
] as const;

const META_FRAMEWORKS: { dependency: string; name: string }[] = [
  { dependency: "next", name: "Next.js" },
  { dependency: "astro", name: "Astro" },
  { dependency: "@remix-run/react", name: "Remix" },
  { dependency: "@tanstack/react-start", name: "TanStack Start" },
  { dependency: "@solidjs/start", name: "SolidStart" },
  { dependency: "expo", name: "Expo" },
];

const frameworkDependencies: Record<Framework, readonly string[]> = {
  react: REACT_DEPENDENCIES,
  solid: SOLID_DEPENDENCIES,
};

export const normalizeVersion = (range?: string): string | undefined => {
  if (!range) {
    return undefined;
  }

  if (range.includes(":") && !range.startsWith("npm:")) {
    return undefined;
  }

  const parsed =
    minVersion(range) ??
    coerce(range) ??
    (range.startsWith("npm:") ? coerce(range.slice("npm:".length)) : null);

  return parsed?.version;
};

export const detectFrameworks = (
  packageJson: PackageJson
): FrameworkDetection[] => {
  const dependencies = allDependencies(packageJson);
  const detections: FrameworkDetection[] = [];

  for (const framework of ["react", "solid"] as const) {
    const evidence = frameworkDependencies[framework].filter(
      (name) => dependencies[name] !== undefined
    );

    if (evidence.length === 0) {
      continue;
    }

    const versionSource =
      framework === "react" ? dependencies.react : dependencies["solid-js"];
    const metaFramework = META_FRAMEWORKS.find(
      ({ dependency }) => dependencies[dependency] !== undefined
    )?.name;

    detections.push({
      evidence,
      framework,
      metaFramework,
      version: normalizeVersion(versionSource),
    });
  }

  return detections;
};

export const isFrameworkSupported = (
  framework: Framework,
  version?: string
): boolean => {
  if (!version) {
    return true;
  }

  return gte(version, framework === "react" ? "19.0.0" : "2.0.0");
};

export const frameworkLabel = (framework: Framework): string =>
  framework === "react" ? "React" : "Solid";

export const describeDetection = (detection: FrameworkDetection): string => {
  const version = detection.version ? ` ${detection.version}` : "";
  const meta = detection.metaFramework ? ` · ${detection.metaFramework}` : "";
  return `${frameworkLabel(detection.framework)}${version}${meta}`;
};
