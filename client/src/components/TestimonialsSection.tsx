/*
 * Skintilla Beauty — Botanical Atelier Design
 * Testimonials: Editorial quote cards with gold accents
 * Staggered layout, serif quotes, warm palette
 */
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Star } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";

const testimonials = [
  {
    quote:
      "Skintilla has completely transformed my skincare routine. The Radiance Serum gives me a glow I never thought was possible without professional treatments.",
    name: "Amelia R.",
    title: "Verified Customer",
    rating: 5,
  },
  {
    quote:
      "I've tried countless luxury brands, but nothing compares to the quality and results from Skintilla. The Velvet Moisturizer is absolute heaven on my sensitive skin.",
    name: "Sarah K.",
    title: "Beauty Editor",
    rating: 5,
  },
  {
    quote:
      "The Glow Ritual bundle was the best gift I've ever given myself. Every product feels like a spa experience at home. My skin has never been happier.",
    name: "Priya M.",
    title: "Verified Customer",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const sectionRef = useScrollReveal();
  const { isDark } = useDarkMode();

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 lg:py-36 transition-colors duration-500"
      style={{ background: isDark ? "oklch(0.16 0.015 55)" : "oklch(0.96 0.015 80)" }}
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
              Kind Words
            </span>
            <div className="gold-divider w-[80px]" />
          </div>
          <h2
            className={`fade-up text-[clamp(2rem,4vw,3.2rem)] leading-[1.15] font-semibold ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            What Our{" "}
            <em className={`font-normal italic ${isDark ? "text-[oklch(0.60_0.06_145)]" : "text-[oklch(0.50_0.05_145)]"}`}>
              Community
            </em>{" "}
            Says
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-8 stagger-children">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`fade-up relative p-8 ${isDark ? "bg-[oklch(0.20_0.015_55)]" : "bg-[oklch(0.98_0.008_80)]"} ${isDark ? "border-[oklch(0.28_0.015_55)]" : "border-[oklch(0.88_0.02_75)]"} rounded-xl transition-all duration-400 ease-out hover:-translate-y-2 hover:shadow-[0_16px_40px_oklch(0.25_0.03_55/0.10),0_6px_12px_oklch(0.25_0.03_55/0.05)] hover:border-[oklch(0.72_0.10_80/0.3)] group/testimonial ${
                i === 1 ? "md:-translate-y-6 md:hover:-translate-y-8" : ""
              }`}
            >
              {/* Gold quote mark */}
              <span
                className="block text-[4rem] leading-[1] text-[oklch(0.72_0.10_80/0.3)] mb-2 transition-all duration-400 group-hover/testimonial:text-[oklch(0.72_0.10_80/0.6)] group-hover/testimonial:scale-110 origin-left"
                style={{ fontFamily: "var(--font-display)" }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    fill="oklch(0.72 0.10 80)"
                    stroke="oklch(0.72 0.10 80)"
                    strokeWidth={1}
                  />
                ))}
              </div>

              <p
                className={`text-[1.05rem] leading-[1.8] ${isDark ? "text-[oklch(0.65_0.015_75)]" : "text-[oklch(0.40_0.03_55)]"} mb-8 italic`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.quote}
              </p>

              <div className="gold-divider w-8 mb-4" />

              <p
                className={`text-[0.85rem] font-medium ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"}`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t.name}
              </p>
              <p
                className={`text-[0.72rem] tracking-[0.1em] uppercase ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.50_0.03_55)]"}`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
