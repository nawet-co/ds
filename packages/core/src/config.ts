export type Direction = "ltr" | "rtl";

export type Density = "compact" | "default" | "comfortable";

export type MotionPreference = "full" | "reduced" | "system";

export type ThemePreference = "dark" | "light" | "system";

export interface NawetConfig {
  density: Density;
  direction: Direction;
  locale: string;
  motion: MotionPreference;
  theme?: ThemePreference;
}

export const defaultNawetConfig: NawetConfig = {
  density: "default",
  direction: "ltr",
  locale: "en",
  motion: "system",
};

export const densityValues: Density[] = ["compact", "default", "comfortable"];

export const directionValues: Direction[] = ["ltr", "rtl"];

export const motionValues: MotionPreference[] = ["full", "reduced", "system"];

export const themeValues: ThemePreference[] = ["light", "dark", "system"];
