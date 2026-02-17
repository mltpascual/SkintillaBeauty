
/*
 * Skintilla Beauty — Botanical Atelier Design
 * Ingredients: Full-bleed image with overlaid ingredient cards
 * Warm tones, botanical focus, editorial typography
 */
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Leaf, Droplets, Sun, Heart } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useParallax } from "@/hooks/useParallax";

const INGREDIENTS_IMAGE =
  "https://raw.githubusercontent.com/mltpascual/SkintillaBeauty/main/client/public/images/ingredients-botanical.jpg";

const ingredients = [
  {
    icon: Leaf,
    name: "Botanical Extracts",
    detail: "Chamomile, rosehip, and green tea sourced from organic farms worldwide",
  },
  {
    icon: Droplets,
    name: "Hyaluronic Acid",
    detail: "Multi-weight molecules that hydrate at every layer of the skin",
  },
  {
    icon: Sun,
    name: "Vitamin C Complex",
    detail: "Stabilized ascorbic acid derivatives for brightening and protection",
  },
  {
    icon: Heart,
    name: "Nourishing Oils",
    detail: "Cold-pressed jojoba, argan, and rosehip oils for deep nourishment",
  },
];

export default function IngredientsSection() {
  const sectionRef = useScrollReveal();
  const { isDark } = useDarkMode();
  const { ref: parallaxRef, transform: parallaxTransform } = useParallax(0.08);

  return (
    <section
      id="ingredients"
      ref={sectionRef}
      className="py-24 lg:py-36 relative overflow-hidden transition-colors duration-500"
      style={{ background: isDark ? "oklch(0.20 0.015 55)" : "oklch(0.93 0.02 75)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20 stagger-children">
          <div className="fade-up flex items-center justify-center gap-6 mb-6">
            <div className="gold-divider w-[80px]" />
            <span
              className="text-[0.7rem] font-medium tracking-[0.25em] uppercase text-[oklch(0.72_0.10_80)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Pure Ingredients
            </span>
            <div className="gold-divider w-[80px]" />
          </div>
          <h2
            className={`fade-up text-[clamp(2rem,4vw,3.2rem)] leading-[1.15] font-semibold ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Nature&apos;s Finest,{" "}
            <em className={`font-normal italic ${isDark ? "text-[oklch(0.60_0.06_145)]" : "text-[oklch(0.50_0.05_145)]"}`}>
              Carefully Curated
            </em>
          </h2>
          <p
            className={`fade-up mt-5 text-[1rem] leading-[1.7] ${isDark ? "text-[oklch(0.65_0.015_75)]" : "text-[oklch(0.50_0.03_55)]"} max-w-xl mx-auto font-light`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            We believe in transparency. Every ingredient is chosen for its
            proven efficacy and gentle touch on your skin.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="fade-left relative order-2 lg:order-1" ref={parallaxRef}>
            <div className="overflow-hidden">
              <img
                src={INGREDIENTS_IMAGE}
                alt="Natural skincare ingredients including honey, aloe vera, chamomile, and essential oils"
                className="w-full h-[350px] lg:h-[480px] object-cover parallax-img"
                style={{ transform: parallaxTransform }}
                loading="lazy"
              />
            </div>
            {/* Decorative corner */}
            <div className="absolute -top-3 -right-3 w-20 h-20 border-t border-r border-[oklch(0.72_0.10_80/0.4)] hidden lg:block" />
            <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b border-l border-[oklch(0.72_0.10_80/0.4)] hidden lg:block" />
          </div>

          {/* Ingredient cards */}
          <div className="order-1 lg:order-2 stagger-children space-y-6">
            {ingredients.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className={`fade-right flex items-start gap-5 p-5 ${isDark ? "bg-[oklch(0.20_0.015_55/0.7)]" : "bg-[oklch(0.98_0.008_80/0.7)]"} backdrop-blur-sm border ${isDark ? "border-[oklch(0.28_0.015_55)]" : "border-[oklch(0.88_0.02_75)]"} rounded-xl transition-all duration-400 ease-out hover:border-[oklch(0.72_0.10_80/0.4)] hover:-translate-y-1 hover:shadow-[0_12px_30px_oklch(0.25_0.03_55/0.08),0_4px_8px_oklch(0.25_0.03_55/0.04)] group/card`}
                >
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-[oklch(0.72_0.10_80/0.3)] rounded-lg transition-all duration-400 group-hover/card:bg-[oklch(0.72_0.10_80/0.1)] group-hover/card:border-[oklch(0.72_0.10_80/0.5)]">
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className={`${isDark ? "text-[oklch(0.60_0.06_145)]" : "text-[oklch(0.50_0.05_145)]"} transition-transform duration-400 group-hover/card:scale-110`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-[1.15rem] font-semibold ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"} mb-1`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className={`text-[0.88rem] ${isDark ? "text-[oklch(0.65_0.015_75)]" : "text-[oklch(0.50_0.03_55)]"} leading-[1.6] font-light`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
