/*
 * Skintilla Beauty — Botanical Atelier Design
 * useDarkMode: Convenience hook that returns isDark boolean and theme-aware color pairs
 * Sections use this to swap background/text colors for dark mode
 */
import { useTheme } from "@/contexts/ThemeContext";

// Common background pairs used across sections
export const sectionBg = {
  cream: { light: "oklch(0.96 0.015 80)", dark: "oklch(0.16 0.015 55)" },
  warmWhite: { light: "oklch(0.98 0.008 80)", dark: "oklch(0.18 0.015 55)" },
  parchment: { light: "oklch(0.93 0.02 75)", dark: "oklch(0.20 0.015 55)" },
  espresso: { light: "oklch(0.25 0.03 55)", dark: "oklch(0.12 0.01 55)" },
} as const;

// Common text color pairs
export const textColor = {
  heading: { light: "oklch(0.25 0.03 55)", dark: "oklch(0.90 0.015 75)" },
  body: { light: "oklch(0.40 0.03 55)", dark: "oklch(0.65 0.015 75)" },
  muted: { light: "oklch(0.50 0.03 55)", dark: "oklch(0.55 0.015 55)" },
  olive: { light: "oklch(0.38 0.04 145)", dark: "oklch(0.50 0.05 145)" },
  oliveItalic: { light: "oklch(0.50 0.05 145)", dark: "oklch(0.60 0.06 145)" },
} as const;

export function useDarkMode() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bg = (pair: { light: string; dark: string }) =>
    isDark ? pair.dark : pair.light;

  const tc = (pair: { light: string; dark: string }) =>
    isDark ? pair.dark : pair.light;

  return { isDark, bg, tc, sectionBg, textColor };
}
