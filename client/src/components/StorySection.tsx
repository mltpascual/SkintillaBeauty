/*
 * Skintilla Beauty — Botanical Atelier Design
 * Story: Editorial two-column layout with lifestyle image and brand narrative
 * Dark mode aware
 */
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";
import { useParallax } from "@/hooks/useParallax";

const LIFESTYLE_IMAGE =
  "https://private-us-east-1.manuscdn.com/sessionFile/3ocyoQdcxp9Sw7E1buR1nN/sandbox/AYB0LnWgHFt76y2h1QDWTu-img-4_1770802525000_na1fn_bGlmZXN0eWxlLXJpdHVhbA.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvM29jeW9RZGN4cDlTdzdFMWJ1UjFuTi9zYW5kYm94L0FZQjBMbldnSEZ0NzZ5MmgxUURXVHUtaW1nLTRfMTc3MDgwMjUyNTAwMF9uYTFmbl9iR2xtWlhOMGVXeGxMWEpwZEhWaGJBLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=sia9mqFyzLJqcXFuh~E6KgeXZqiMqHm2WCpMLQfACepGmkY0dXhaWg3vp54c9JocvCtnO6dppB3x7ZK9XA~Y3FR8TdZYbTksKJDL59gMtJtUTQTcq2w-Gq~f4yJqeqh03o7yQxkXcMU12yYq3LnmKtA8tN8nvEc3Q3BQfUwQ~kCrBs7WS4XwKyfmvJTcdnM8kpxzbkhxJZVTQilqgorg7CxPV6CiEpNjynfj0XoZ~R2vrkz~PGmLJEobbRTjHcnWXW7wkVlcQKTH561cofRnMj4kj4PV-EMYsTv0vu15a22Za9smCdSsX6dX0e7TLximEkZuzFmEXpHPGzOK6zrmrg__";

export default function StorySection() {
  const sectionRef = useScrollReveal();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { ref: parallaxRef, transform: parallaxTransform } = useParallax(0.1);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="py-24 lg:py-36 transition-colors duration-500"
      style={{ background: isDark ? "oklch(0.18 0.015 55)" : "oklch(0.98 0.008 80)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="fade-up flex items-center gap-6 mb-16">
          <div className="gold-divider flex-1 max-w-[120px]" />
          <span
            className="text-[0.7rem] font-medium tracking-[0.25em] uppercase text-[oklch(0.72_0.10_80)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Our Story
          </span>
          <div className="gold-divider flex-1 max-w-[120px]" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="fade-left relative" ref={parallaxRef}>
            <div className="absolute -bottom-5 -left-5 w-full h-full border border-[oklch(0.72_0.10_80/0.25)] hidden lg:block" />
            <div className="overflow-hidden">
              <img
                src={LIFESTYLE_IMAGE}
                alt="A serene self-care ritual with Skintilla Beauty products"
                className="relative w-full h-[400px] lg:h-[520px] object-cover parallax-img"
                style={{ transform: parallaxTransform }}
                loading="lazy"
              />
            </div>
          </div>

          <div className="stagger-children">
            <h2
              className={`fade-up text-[clamp(2rem,4vw,3.2rem)] leading-[1.15] font-semibold mb-8 transition-colors duration-500 ${
                isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Where Nature Meets
              <br />
              <em className={`font-normal italic ${isDark ? "text-[oklch(0.60_0.06_145)]" : "text-[oklch(0.50_0.05_145)]"}`}>
                Luxury
              </em>
            </h2>

            <div className="fade-up gold-divider w-12 mb-8" />

            <p
              className={`fade-up text-[1.05rem] leading-[1.85] mb-6 font-light transition-colors duration-500 ${
                isDark ? "text-[oklch(0.65_0.015_75)]" : "text-[oklch(0.40_0.03_55)]"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span
                className={`text-[2.8rem] leading-[1] float-left mr-3 mt-1 font-semibold ${
                  isDark ? "text-[oklch(0.50_0.05_145)]" : "text-[oklch(0.38_0.04_145)]"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                F
              </span>
              ounded in 2019, Skintilla Beauty was born from a simple belief:
              that skincare should be both an indulgence and a science. We
              carefully source the finest botanical ingredients from around the
              world, blending them into formulations that truly pamper your skin.
            </p>

            <p
              className={`fade-up text-[1.05rem] leading-[1.85] mb-8 font-light transition-colors duration-500 ${
                isDark ? "text-[oklch(0.65_0.015_75)]" : "text-[oklch(0.40_0.03_55)]"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              Every product in our collection is designed for all skin types —
              because we believe everyone deserves a moment of luxury in their
              daily routine. From our signature serums to our curated beauty
              bundles, each piece is a testament to our commitment to quality,
              efficacy, and the art of self-care.
            </p>

            <div className="fade-up flex items-center gap-12">
              {[
                { num: "50+", label: "Natural Ingredients" },
                { num: "25k+", label: "Happy Customers" },
                { num: "100%", label: "Cruelty Free" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-12">
                  {i > 0 && <div className="w-[1px] h-12 bg-[oklch(0.72_0.10_80/0.4)]" />}
                  <div>
                    <span
                      className={`block text-[2.5rem] font-semibold ${
                        isDark ? "text-[oklch(0.50_0.05_145)]" : "text-[oklch(0.38_0.04_145)]"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {stat.num}
                    </span>
                    <span
                      className={`text-[0.7rem] tracking-[0.15em] uppercase ${
                        isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.50_0.03_55)]"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
