/*
 * Skintilla Beauty — Botanical Atelier Design
 * Hero: Asymmetric split layout — oversized serif typography left, product imagery right
 * Dark mode aware — adapts background, text, and overlay colors
 */
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";
import { useParallax } from "@/hooks/useParallax";

const HERO_IMAGE =
  "https://raw.githubusercontent.com/mltpascual/SkintillaBeauty/main/client/public/images/hero-banner.jpg";

export default function HeroSection() {
  const sectionRef = useScrollReveal(0.1);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { ref: parallaxRef, transform: parallaxTransform } = useParallax(0.12);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-28 lg:pt-8 transition-colors duration-500"
      style={{ background: isDark ? "oklch(0.16 0.015 55)" : "oklch(0.96 0.015 80)" }}
    >
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[calc(100vh-5rem)]">
          {/* Left: Typography */}
          <div className="lg:col-span-5 lg:pr-8 order-2 lg:order-1 stagger-children">
            <div className="fade-up w-16 h-[1px] bg-[oklch(0.72_0.10_80)] mb-8" />

            <p
              className="fade-up text-[0.75rem] font-medium tracking-[0.25em] uppercase text-[oklch(0.72_0.10_80)] mb-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Est. 2019 — Luxury Skincare
            </p>

            <h1
              className={`fade-up text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-semibold mb-6 transition-colors duration-500 ${
                isDark ? "text-[oklch(0.92_0.01_75)]" : "text-[oklch(0.25_0.03_55)]"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Pamper Your
              <br />
              <em className={`font-normal italic ${isDark ? "text-[oklch(0.60_0.06_145)]" : "text-[oklch(0.50_0.05_145)]"}`}>
                Natural
              </em>{" "}
              Beauty
            </h1>

            <p
              className={`fade-up text-[1.05rem] leading-[1.8] max-w-md mb-10 font-light transition-colors duration-500 ${
                isDark ? "text-[oklch(0.65_0.015_75)]" : "text-[oklch(0.40_0.03_55)]"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              Curated skincare rituals that combine the finest natural
              ingredients with luxurious formulations — designed for every skin
              type, crafted for radiant results.
            </p>

            <div className="fade-up flex flex-wrap gap-4">
              <a
                href="#products"
                className="inline-flex items-center px-8 py-3.5 rounded-full text-[0.75rem] font-medium tracking-[0.15em] uppercase bg-[oklch(0.38_0.04_145)] text-[oklch(0.98_0.008_80)] hover:bg-[oklch(0.32_0.04_145)] transition-all duration-300"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Explore Collection
              </a>
              <a
                href="#story"
                className={`inline-flex items-center px-8 py-3.5 rounded-full text-[0.75rem] font-medium tracking-[0.15em] uppercase border border-[oklch(0.72_0.10_80)] hover:bg-[oklch(0.72_0.10_80/0.1)] transition-all duration-300 ${
                  isDark ? "text-[oklch(0.80_0.015_75)]" : "text-[oklch(0.40_0.03_55)]"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                Our Story
              </a>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative" ref={parallaxRef}>
            <div className="fade-up relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-full h-full border border-[oklch(0.72_0.10_80/0.3)] hidden lg:block" />
              <img
                src={HERO_IMAGE}
                alt="Skintilla Beauty luxury skincare products arranged with botanicals"
                className="relative w-full h-[50vh] lg:h-[75vh] object-cover parallax-img"
                style={{ transform: parallaxTransform }}
                loading="eager"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  isDark ? "from-[oklch(0.16_0.015_55/0.4)]" : "from-[oklch(0.96_0.015_80/0.2)]"
                } to-transparent`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 opacity-60">
        <span
          className={`text-[0.65rem] tracking-[0.2em] uppercase ${
            isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.50_0.03_55)]"
          }`}
          style={{ fontFamily: "var(--font-body)" }}
        >
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-[oklch(0.72_0.10_80)] animate-pulse" />
      </div>
    </section>
  );
}
