/*
 * Skintilla Beauty — Botanical Atelier Design
 * ThemeToggle: Elegant sun/moon toggle for dark mode switching
 * Smooth morphing animation between sun and moon icons
 */
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  if (!toggleTheme) return null;

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 flex items-center justify-center rounded-full border border-[oklch(0.72_0.10_80/0.4)] hover:border-[oklch(0.72_0.10_80)] hover:bg-[oklch(0.72_0.10_80/0.1)] transition-all duration-300 group"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {/* Sun icon — visible in light mode */}
      <Sun
        className={`absolute w-4 h-4 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          theme === "light"
            ? "opacity-100 rotate-0 scale-100 text-[oklch(0.72_0.10_80)]"
            : "opacity-0 rotate-90 scale-50 text-[oklch(0.72_0.10_80)]"
        }`}
        strokeWidth={1.5}
      />
      {/* Moon icon — visible in dark mode */}
      <Moon
        className={`absolute w-4 h-4 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          theme === "dark"
            ? "opacity-100 rotate-0 scale-100 text-[oklch(0.72_0.10_80)]"
            : "opacity-0 -rotate-90 scale-50 text-[oklch(0.72_0.10_80)]"
        }`}
        strokeWidth={1.5}
      />
    </button>
  );
}
