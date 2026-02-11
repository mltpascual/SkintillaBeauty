/*
 * Skintilla Beauty — Botanical Atelier Design
 * Ingredients: Full-bleed image with overlaid ingredient cards
 * Warm tones, botanical focus, editorial typography
 */
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Leaf, Droplets, Sun, Heart } from "lucide-react";

const INGREDIENTS_IMAGE =
  "https://private-us-east-1.manuscdn.com/sessionFile/3ocyoQdcxp9Sw7E1buR1nN/sandbox/AYB0LnWgHFt76y2h1QDWTu-img-3_1770802525000_na1fn_aW5ncmVkaWVudHMtYm90YW5pY2Fs.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvM29jeW9RZGN4cDlTdzdFMWJ1UjFuTi9zYW5kYm94L0FZQjBMbldnSEZ0NzZ5MmgxUURXVHUtaW1nLTNfMTc3MDgwMjUyNTAwMF9uYTFmbl9hVzVuY21Wa2FXVnVkSE10WW05MFlXNXBZMkZzLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=cVnink543nWDzj0E5jt-pQ7B~pEx7ZEcYaDy7JnPndkuoQXayVHh5NbI9p83kDDK2TmVt0k3~Nr8fq9KrQo0GlIqClsWibXQ7hCK4S4QdqlbJPrZe4wInB0OEkh3x1hhDlt7MoSahOvgS6zndhd2OonnLY2fdc45-u1teO2ZzqDDMEkT2rcxoyqFecDEtcKRQU~sKkhi~MFpFizKWu-2ahihqLFORwqZAaeU5CAD7U-XyL2faqqDHtFb9EY2rMZ6Za4F2nIc3yNyqTMS81GVrg4SR4xoAnb-mM8MpWPmH7Q6UYtt0IKSx-UWIyKgmPxRVyIzNX56Na0Luh3cTP1QUw__";

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

  return (
    <section
      id="ingredients"
      ref={sectionRef}
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "oklch(0.93 0.02 75)" }}
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
            className="fade-up text-[clamp(2rem,4vw,3.2rem)] leading-[1.15] font-semibold text-[oklch(0.25_0.03_55)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Nature&apos;s Finest,{" "}
            <em className="font-normal italic text-[oklch(0.50_0.05_145)]">
              Carefully Curated
            </em>
          </h2>
          <p
            className="fade-up mt-5 text-[1rem] leading-[1.7] text-[oklch(0.50_0.03_55)] max-w-xl mx-auto font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We believe in transparency. Every ingredient is chosen for its
            proven efficacy and gentle touch on your skin.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="fade-up relative order-2 lg:order-1">
            <img
              src={INGREDIENTS_IMAGE}
              alt="Natural skincare ingredients including honey, aloe vera, chamomile, and essential oils"
              className="w-full h-[350px] lg:h-[480px] object-cover"
              loading="lazy"
            />
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
                  className="fade-up flex items-start gap-5 p-5 bg-[oklch(0.98_0.008_80/0.7)] backdrop-blur-sm border border-[oklch(0.88_0.02_75)] hover:border-[oklch(0.72_0.10_80/0.4)] transition-colors duration-300"
                >
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-[oklch(0.72_0.10_80/0.3)]">
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className="text-[oklch(0.50_0.05_145)]"
                    />
                  </div>
                  <div>
                    <h3
                      className="text-[1.15rem] font-semibold text-[oklch(0.25_0.03_55)] mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="text-[0.88rem] text-[oklch(0.50_0.03_55)] leading-[1.6] font-light"
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
