"use client";

import { defaultNawetConfig } from "@nawet/ds-core";
import type { NawetConfig, ThemePreference } from "@nawet/ds-core";
import { MotionConfig } from "motion/react";
import * as React from "react";

import { DirectionProvider } from "./direction";
import { Toaster } from "./toast";
import { TooltipProvider } from "./tooltip";

export interface NawetProviderProps extends Partial<NawetConfig> {
  children: React.ReactNode;
  toaster?: boolean;
  tooltipDelay?: number;
}

const NawetConfigContext = React.createContext<NawetConfig>(defaultNawetConfig);

const getSystemTheme = (): "dark" | "light" =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const reducedMotionFor = (
  motion: NawetConfig["motion"]
): "always" | "never" | "user" => {
  if (motion === "reduced") {
    return "always";
  }

  return motion === "full" ? "never" : "user";
};

const useDocumentTheme = (theme: ThemePreference | undefined): void => {
  React.useEffect(() => {
    if (!theme || typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    const apply = () => {
      const resolved = theme === "system" ? getSystemTheme() : theme;
      root.classList.toggle("dark", resolved === "dark");
      root.style.colorScheme = resolved;
      root.dataset.theme = resolved;
    };

    apply();

    if (theme !== "system") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", apply);

    return () => media.removeEventListener("change", apply);
  }, [theme]);
};

export const NawetProvider = ({
  children,
  density = defaultNawetConfig.density,
  direction = defaultNawetConfig.direction,
  locale = defaultNawetConfig.locale,
  motion = defaultNawetConfig.motion,
  theme,
  toaster = true,
  tooltipDelay = 0,
}: NawetProviderProps) => {
  React.useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    root.dir = direction;
    root.dataset.density = density;
    root.dataset.motion = motion;
  }, [density, direction, motion]);

  useDocumentTheme(theme);

  const config = React.useMemo<NawetConfig>(
    () => ({ density, direction, locale, motion, theme }),
    [density, direction, locale, motion, theme]
  );

  return (
    <NawetConfigContext.Provider value={config}>
      <DirectionProvider direction={direction}>
        <MotionConfig reducedMotion={reducedMotionFor(motion)}>
          <TooltipProvider delay={tooltipDelay}>
            {children}
            {toaster ? <Toaster /> : null}
          </TooltipProvider>
        </MotionConfig>
      </DirectionProvider>
    </NawetConfigContext.Provider>
  );
};

export const useNawetConfig = (): NawetConfig =>
  React.useContext(NawetConfigContext);
