#!/usr/bin/env node
/**
 * Generate the typed token module from the token CSS files.
 *
 * Source of truth: src/styles/tokens/*.css
 * Output:          src/tokens.ts
 *
 * Usage:
 *   node --experimental-strip-types scripts/generate-tokens.ts
 *   node --experimental-strip-types scripts/generate-tokens.ts --check
 */

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { parse } from "postcss";

type CssRoot = ReturnType<typeof parse>;
type Declarations = Record<string, string>;

export interface TokenSources {
  base: string;
  chart: string;
  scale: string;
  semantic: string;
  theme: string;
}

export interface TextToken {
  lineHeight?: string;
  size?: string;
}

export interface TokenValues {
  colors: Record<string, Record<string, string> | string>;
  duration: Record<string, number>;
  ease: Record<string, string>;
  font: Record<string, string>;
  fontWeight: Record<string, string>;
  leading: Record<string, string>;
  radius: Record<string, string>;
  shadow: Record<string, string>;
  spacing: string;
  text: Record<string, TextToken>;
  tracking: Record<string, string>;
}

export interface TokenOutput {
  tokens: TokenValues;
  tokensTs: string;
}

export interface ParsedTokenCss {
  base: Record<string, Declarations>;
  dark: Declarations;
  root: Declarations;
  theme: Declarations;
}

const packageRoot = path.join(import.meta.dirname, "..");
const repoRoot = path.join(packageRoot, "../..");
const tokensDir = path.join(packageRoot, "src/styles/tokens");
const tokensTsPath = path.join(packageRoot, "src/tokens.ts");

const normalizeValue = (value: string): string =>
  value.trim().replaceAll(/\s+/gu, " ");

const getRuleDeclarations = (root: CssRoot, selector: string): Declarations => {
  const declarations: Declarations = {};
  const rule = root.nodes.find(
    (node) => node.type === "rule" && normalizeValue(node.selector) === selector
  );

  if (!rule || rule.type !== "rule") {
    return declarations;
  }

  rule.each((node) => {
    if (node.type === "decl") {
      declarations[node.prop] = normalizeValue(node.value);
    }
  });

  return declarations;
};

const getAtRuleDeclarations = (root: CssRoot, name: string): Declarations => {
  const declarations: Declarations = {};

  for (const atRule of root.nodes) {
    if (atRule.type !== "atrule" || atRule.name !== name) {
      continue;
    }

    atRule.each((node) => {
      if (node.type === "decl") {
        declarations[node.prop] = normalizeValue(node.value);
      }
    });
  }

  return declarations;
};

const getLayerRules = (
  root: CssRoot,
  layerName: string
): Record<string, Declarations> => {
  const rules: Record<string, Declarations> = {};

  for (const atRule of root.nodes) {
    if (
      atRule.type !== "atrule" ||
      atRule.name !== "layer" ||
      normalizeValue(atRule.params) !== layerName
    ) {
      continue;
    }

    atRule.each((node) => {
      if (node.type !== "rule") {
        return;
      }

      const declarations: Declarations = {};
      node.each((child) => {
        if (child.type === "decl") {
          declarations[child.prop] = normalizeValue(child.value);
        }
      });
      rules[normalizeValue(node.selector)] = declarations;
    });
  }

  return rules;
};

export const parseTokenCss = (source: string): ParsedTokenCss => {
  const root = parse(source);

  return {
    base: getLayerRules(root, "base"),
    dark: getRuleDeclarations(root, ".dark"),
    root: getRuleDeclarations(root, ":root"),
    theme: getAtRuleDeclarations(root, "theme"),
  };
};

const mergeDeclarations = (...sources: Declarations[]): Declarations => {
  const merged: Declarations = {};

  for (const source of sources) {
    Object.assign(merged, source);
  }

  return merged;
};

const camelCase = (value: string): string => {
  const [first = "", ...rest] = value.split("-");

  return (
    first +
    rest.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("")
  );
};

interface CollectOptions {
  exclude?: string[];
  filter?: (property: string) => boolean;
}

const collectByPrefix = (
  declarations: Declarations,
  prefix: string,
  options: CollectOptions = {}
): Declarations => {
  const { exclude = [], filter } = options;

  return Object.fromEntries(
    Object.entries(declarations)
      .filter(
        ([property]) =>
          property.startsWith(`--${prefix}-`) &&
          !exclude.some((excluded) => property.startsWith(`--${excluded}-`)) &&
          (!filter || filter(property))
      )
      .map(([property, value]) => [property.slice(prefix.length + 3), value])
  );
};

const collectTextTokens = (
  declarations: Declarations
): Record<string, TextToken> => {
  const text: Record<string, TextToken> = {};

  for (const [property, value] of Object.entries(declarations)) {
    if (!property.startsWith("--text-")) {
      continue;
    }

    const name = property.slice("--text-".length);
    const [sizeName, suffix] = name.split("--");

    if (!sizeName) {
      continue;
    }

    text[sizeName] ??= {};

    if (suffix === "line-height") {
      text[sizeName].lineHeight = value;
      continue;
    }

    if (!suffix) {
      text[sizeName].size = value;
    }
  }

  return text;
};

const parseDurationSeconds = (value: string): number => {
  const milliseconds = /^(?<value>-?\d*\.?\d+)ms$/u.exec(value);
  if (milliseconds?.groups?.value) {
    return Number(milliseconds.groups.value) / 1000;
  }

  const seconds = /^(?<value>-?\d*\.?\d+)s$/u.exec(value);
  if (seconds?.groups?.value) {
    return Number(seconds.groups.value);
  }

  return Number(value);
};

const assertMatchingModes = (light: Declarations, dark: Declarations): void => {
  const lightKeys = Object.keys(light).toSorted();
  const darkKeys = Object.keys(dark).toSorted();
  const missingInDark = lightKeys.filter((key) => !darkKeys.includes(key));
  const missingInLight = darkKeys.filter((key) => !lightKeys.includes(key));

  if (missingInDark.length > 0 || missingInLight.length > 0) {
    throw new Error(
      [
        "Semantic tokens must define the same keys in :root and .dark.",
        missingInDark.length > 0
          ? `Missing in .dark: ${missingInDark.join(", ")}`
          : "",
        missingInLight.length > 0
          ? `Missing in :root: ${missingInLight.join(", ")}`
          : "",
      ]
        .filter(Boolean)
        .join("\n")
    );
  }
};

const assertThemeCoversSemantics = (
  semantic: Declarations,
  theme: Declarations
): void => {
  const missing = Object.keys(semantic)
    .map((key) => key.replace(/^--/u, ""))
    .filter((key) => !theme[`--color-${key}`])
    .toSorted();

  if (missing.length > 0) {
    throw new Error(`Missing @theme color mappings: ${missing.join(", ")}`);
  }
};

const assertVarReferencesResolve = (groups: Declarations[]): void => {
  const defined = new Set(groups.flatMap((group) => Object.keys(group)));
  const dangling = new Set<string>();

  for (const group of groups) {
    for (const value of Object.values(group)) {
      for (const match of value.matchAll(/var\(\s*(?<name>--[\w-]+)/gu)) {
        const name = match.groups?.name;
        if (name && !defined.has(name)) {
          dangling.add(name);
        }
      }
    }
  }

  if (dangling.size > 0) {
    throw new Error(
      `Unresolved token references: ${[...dangling].toSorted().join(", ")}`
    );
  }
};

interface BuildTokenValuesInput {
  scale: Declarations;
  theme: Declarations;
}

const buildTokenValues = ({
  scale,
  theme,
}: BuildTokenValuesInput): TokenValues => {
  const colors: Record<string, Record<string, string> | string> = {};
  const chartColors: Record<string, string> = {};

  for (const [property, value] of Object.entries(theme)) {
    if (!property.startsWith("--color-")) {
      continue;
    }

    const name = property.slice("--color-".length);

    if (name.startsWith("chart-")) {
      chartColors[name.slice("chart-".length)] = value;
      continue;
    }

    colors[camelCase(name)] = value;
  }

  if (Object.keys(chartColors).length > 0) {
    colors.chart = chartColors;
  }

  const radius = collectByPrefix(theme, "radius");

  if (scale["--radius"]) {
    radius.base = scale["--radius"];
  }

  return {
    colors,
    duration: Object.fromEntries(
      Object.entries(collectByPrefix(scale, "duration")).map(([key, value]) => [
        key,
        parseDurationSeconds(value),
      ])
    ),
    ease: Object.fromEntries(
      Object.entries(collectByPrefix(theme, "ease")).map(([key, value]) => [
        camelCase(key),
        value,
      ])
    ),
    font: collectByPrefix(theme, "font", { exclude: ["font-weight"] }),
    fontWeight: collectByPrefix(theme, "font-weight"),
    leading: collectByPrefix(theme, "leading"),
    radius,
    shadow: collectByPrefix(theme, "shadow"),
    spacing: theme["--spacing"] ?? scale["--spacing"] ?? "0.25rem",
    text: collectTextTokens(theme),
    tracking: collectByPrefix(theme, "tracking"),
  };
};

const identifierPattern = /^[A-Za-z_$][A-Za-z0-9_$]*$/u;

const serialize = (value: unknown, depth = 0): string => {
  const indent = "  ".repeat(depth + 1);
  const closingIndent = "  ".repeat(depth);

  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (typeof value !== "object" || value === null) {
    return "null";
  }

  const entries = Object.entries(value as Record<string, unknown>);

  if (entries.length === 0) {
    return "{}";
  }

  const lines = entries.map(([key, entryValue]) => {
    const serializedKey = identifierPattern.test(key)
      ? key
      : JSON.stringify(key);

    return `${indent}${serializedKey}: ${serialize(entryValue, depth + 1)}`;
  });

  return `{\n${lines.join(",\n")}\n${closingIndent}}`;
};

export const renderTokensModule = (tokens: TokenValues): string => `/**
 * AUTO-GENERATED FILE. Do not edit by hand.
 *
 * Source: src/styles/tokens/*.css
 * Regenerate with: pnpm tokens:generate
 */

export const tokens = ${serialize(tokens)} as const

export type ColorToken = keyof typeof tokens.colors
export type RadiusToken = keyof typeof tokens.radius
export type FontToken = keyof typeof tokens.font
export type TextToken = keyof typeof tokens.text
export type FontWeightToken = keyof typeof tokens.fontWeight
export type LeadingToken = keyof typeof tokens.leading
export type TrackingToken = keyof typeof tokens.tracking
export type ShadowToken = keyof typeof tokens.shadow
export type EasingToken = keyof typeof tokens.ease
export type DurationToken = keyof typeof tokens.duration
`;

export const buildTokenOutput = (sources: TokenSources): TokenOutput => {
  const scale = parseTokenCss(sources.scale);
  const semantic = parseTokenCss(sources.semantic);
  const theme = parseTokenCss(sources.theme);
  const chart = parseTokenCss(sources.chart);
  const base = parseTokenCss(sources.base);

  const baseDeclarations = Object.values(base.base);
  const allDeclarations = [
    scale.root,
    scale.theme,
    semantic.root,
    semantic.dark,
    theme.theme,
    chart.root,
    ...baseDeclarations,
  ];

  assertMatchingModes(semantic.root, semantic.dark);
  assertThemeCoversSemantics(semantic.root, theme.theme);
  assertVarReferencesResolve(allDeclarations);

  const tokens = buildTokenValues({
    scale: mergeDeclarations(scale.root, scale.theme),
    theme: mergeDeclarations(theme.theme, scale.theme),
  });

  return {
    tokens,
    tokensTs: renderTokensModule(tokens),
  };
};

const formatContent = (file: string, content: string): string =>
  execFileSync(
    "pnpm",
    [
      "exec",
      "oxfmt",
      "--stdin-filepath",
      file,
      "-c",
      path.join(repoRoot, "oxfmt.config.ts"),
    ],
    { cwd: packageRoot, encoding: "utf-8", input: content }
  );

const readTokenFile = (file: string): string =>
  readFileSync(path.join(tokensDir, file), "utf-8");

const main = (): void => {
  const checkOnly = process.argv.includes("--check");
  const output = buildTokenOutput({
    base: readTokenFile("base.css"),
    chart: readTokenFile("chart.css"),
    scale: readTokenFile("scale.css"),
    semantic: readTokenFile("semantic.css"),
    theme: readTokenFile("theme.css"),
  });

  const content = formatContent(tokensTsPath, output.tokensTs);
  const relativePath = path.relative(packageRoot, tokensTsPath);

  if (checkOnly) {
    const current = readFileSync(tokensTsPath, "utf-8");

    if (current !== content) {
      console.error(
        `✖ ${relativePath} is out of date. Run \`pnpm tokens:generate\`.`
      );
      process.exitCode = 1;
    }

    return;
  }

  writeFileSync(tokensTsPath, content);
  console.log(`✔ ${relativePath}`);
};

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}
