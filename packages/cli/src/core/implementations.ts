import type {
  Framework,
  Implementation,
  ImplementationOption,
} from "./types.ts";

const REACT_IMPLEMENTATIONS: ImplementationOption[] = [
  {
    hint: "@nawet/ds-react",
    implementation: "base-ui",
    label: "shadcn + Base UI",
  },
  {
    hint: "@nawet/ds-react-ui-sdk",
    implementation: "ui-sdk",
    label: "UI SDK",
  },
];

const SOLID_IMPLEMENTATIONS: ImplementationOption[] = [
  {
    hint: "@nawet/ds-solid-ui-sdk",
    implementation: "ui-sdk",
    label: "UI SDK",
  },
];

const PACKAGES: Record<Framework, Partial<Record<Implementation, string>>> = {
  react: {
    "base-ui": "@nawet/ds-react",
    "ui-sdk": "@nawet/ds-react-ui-sdk",
  },
  solid: {
    "ui-sdk": "@nawet/ds-solid-ui-sdk",
  },
};

// Solid ships UI SDK and nothing else; React defaults to its existing Base UI
// implementation when prompts are skipped with --yes.
const DEFAULT_IMPLEMENTATIONS: Record<Framework, Implementation> = {
  react: "base-ui",
  solid: "ui-sdk",
};

const IMPLEMENTATION_LABELS: Record<Implementation, string> = {
  "base-ui": "shadcn + Base UI",
  "ui-sdk": "UI SDK",
};

export const implementationsFor = (
  framework: Framework
): ImplementationOption[] =>
  framework === "react" ? REACT_IMPLEMENTATIONS : SOLID_IMPLEMENTATIONS;

export const isImplementation = (value: string): value is Implementation =>
  value === "base-ui" || value === "ui-sdk";

export const supportsImplementation = (
  framework: Framework,
  implementation: Implementation
): boolean => Boolean(PACKAGES[framework][implementation]);

export const defaultImplementation = (framework: Framework): Implementation =>
  DEFAULT_IMPLEMENTATIONS[framework];

export const implementationLabel = (implementation: Implementation): string =>
  IMPLEMENTATION_LABELS[implementation];

export const packageFor = (
  framework: Framework,
  implementation: Implementation
): string => {
  const packageName = PACKAGES[framework][implementation];

  if (!packageName) {
    throw new Error(
      `${framework} does not have a ${implementationLabel(implementation)} implementation.`
    );
  }

  return packageName;
};

/** UI SDK requires `@layer ui-sdk;` above the Tailwind import. */
export const requiresUiSdkLayer = (implementation: Implementation): boolean =>
  implementation === "ui-sdk";
