/*
 * Skintilla Beauty — Botanical Atelier Design
 * LoadingScreen: Branded splash screen with logo fade-out
 * Warm cream background, Cormorant Garamond typography, gold accent line
 */
import { useState, useEffect } from "react";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function LoadingScreen() {
  const { isDark } = useDarkMode();
  const [phase, setPhase] = useState<"loading" | "fadeOut" | "done">("loading");

  useEffect(() => {
    // Show loading for 1.5s, then fade out over 0.6s
    const showTimer = setTimeout(() => setPhase("fadeOut"), 1500);
    const hideTimer = setTimeout(() => setPhase("done"), 2100);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-600 ease-[cubic-bezier(0.77,0,0.175,1)] transition-colors duration-500 ${
        phase === "fadeOut" ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: isDark ? "oklch(0.16 0.015 55)" : "oklch(0.96 0.015 80)" }}
    >
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Logo */}
      <div
        className="animate-[fadeInUp_0.8s_ease-out_0.2s_both]"
      >
        <h1
          className={`text-4xl sm:text-5xl font-semibold tracking-wide ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"}`}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Skintilla
        </h1>
      </div>

      {/* Gold accent line — expands from center */}
      <div
        className="mt-5 h-[1px] animate-[expandLine_0.8s_ease-out_0.5s_both]"
        style={{ background: "oklch(0.72 0.10 80)" }}
      />

      {/* Tagline */}
      <p
        className={`mt-4 text-[0.7rem] tracking-[0.25em] uppercase ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.55_0.03_55)]"} animate-[fadeInUp_0.8s_ease-out_0.7s_both]`}
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        Luxury Skincare — Est. 2019
      </p>

      {/* Loading dots */}
      <div className="mt-8 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.10_80)]"
            style={{
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes expandLine {
          from {
            width: 0;
          }
          to {
            width: 60px;
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
