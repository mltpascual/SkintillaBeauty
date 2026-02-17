/*
 * Skintilla Beauty — Botanical Atelier Design
 * Bundles: Gift set showcase with editorial layout
 * Full-bleed image, overlaid pricing cards, gold accents
 * Now with countdown timer for seasonal promotion
 */
import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";
import { Gift, Sparkles, Package, Timer } from "lucide-react";
import ShippingCalculator from "@/components/ShippingCalculator";
import { useDarkMode } from "@/hooks/useDarkMode";

const BUNDLE_IMAGE =
  "https://raw.githubusercontent.com/mltpascual/SkintillaBeauty/main/client/public/images/bundle-gift.jpg";

const bundles = [
  {
    icon: Sparkles,
    name: "The Glow Ritual",
    items: ["Radiance Serum", "Velvet Moisturizer", "Botanical Toner"],
    price: "$138",
    savings: "Save $26",
    popular: true,
  },
  {
    icon: Gift,
    name: "The Essentials",
    items: ["Velvet Moisturizer", "Botanical Toner"],
    price: "$82",
    savings: "Save $14",
    popular: false,
  },
  {
    icon: Package,
    name: "The Complete Set",
    items: [
      "Radiance Serum",
      "Velvet Moisturizer",
      "Botanical Toner",
      "Eye Revival Cream",
    ],
    price: "$189",
    savings: "Save $33",
    popular: false,
  },
];

/** Returns a target date that is always ~3 days in the future from now,
 *  anchored to midnight so it resets predictably. */
function getPromoEndDate(): Date {
  const now = new Date();
  const end = new Date(now);
  end.setDate(end.getDate() + 3);
  end.setHours(23, 59, 59, 0);
  return end;
}

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return time;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const { isDark } = useDarkMode();
  return (
    <div className="flex flex-col items-center">
      <span
        className={`text-[clamp(1.4rem,3vw,2rem)] font-semibold ${isDark ? "text-[oklch(0.50_0.05_145)]" : "text-[oklch(0.38_0.04_145)]"} leading-none tabular-nums`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span
        className={`text-[0.55rem] font-medium tracking-[0.2em] uppercase ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.55_0.03_55)]"} mt-1`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function BundlesSection() {
  const sectionRef = useScrollReveal();
  const { isDark } = useDarkMode();
  const [promoEnd] = useState(getPromoEndDate);
  const { days, hours, minutes, seconds } = useCountdown(promoEnd);

  return (
    <section
      id="bundles"
      ref={sectionRef}
      className="py-24 lg:py-36 transition-colors duration-500"
      style={{ background: isDark ? "oklch(0.18 0.015 55)" : "oklch(0.98 0.008 80)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14 stagger-children">
          <div className="fade-up flex items-center justify-center gap-6 mb-6">
            <div className="gold-divider w-[80px]" />
            <span
              className="text-[0.7rem] font-medium tracking-[0.25em] uppercase text-[oklch(0.72_0.10_80)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Curated Bundles
            </span>
            <div className="gold-divider w-[80px]" />
          </div>
          <h2
            className={`fade-up text-[clamp(2rem,4vw,3.2rem)] leading-[1.15] font-semibold ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Beauty{" "}
            <em className={`font-normal italic ${isDark ? "text-[oklch(0.60_0.06_145)]" : "text-[oklch(0.50_0.05_145)]"}`}>
              Bundles
            </em>
          </h2>
          <p
            className={`fade-up mt-5 text-[1rem] leading-[1.7] ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.50_0.03_55)]"} max-w-xl mx-auto font-light`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Complete skincare rituals, thoughtfully bundled for every routine.
            The perfect gift — for yourself or someone you love.
          </p>
        </div>

        {/* Countdown Timer Banner */}
        <div className="fade-up mb-14 lg:mb-18">
          <div
            className="relative overflow-hidden border border-[oklch(0.72_0.10_80/0.4)] px-6 py-6 lg:py-7"
            style={{ background: isDark ? "oklch(0.22 0.015 55)" : "oklch(0.95 0.02 80)" }}
          >
            {/* Subtle corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[oklch(0.72_0.10_80/0.5)]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[oklch(0.72_0.10_80/0.5)]" />

            <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10">
              {/* Label */}
              <div className="flex items-center gap-3">
                <Timer
                  className="h-5 w-5 text-[oklch(0.72_0.10_80)]"
                  strokeWidth={1.5}
                />
                <div className="text-center md:text-left">
                  <p
                    className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[oklch(0.72_0.10_80)]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Spring Glow Sale
                  </p>
                  <p
                    className={`text-[0.8rem] ${isDark ? "text-[oklch(0.65_0.015_75)]" : "text-[oklch(0.40_0.03_55)]"} font-light`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Extra 15% off all bundles — limited time
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-10 bg-[oklch(0.72_0.10_80/0.3)]" />

              {/* Countdown */}
              <div className="flex items-center gap-4">
                <CountdownUnit value={days} label="Days" />
                <span
                  className="text-[1.2rem] text-[oklch(0.72_0.10_80)] font-light -mt-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  :
                </span>
                <CountdownUnit value={hours} label="Hours" />
                <span
                  className="text-[1.2rem] text-[oklch(0.72_0.10_80)] font-light -mt-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  :
                </span>
                <CountdownUnit value={minutes} label="Mins" />
                <span
                  className="text-[1.2rem] text-[oklch(0.72_0.10_80)] font-light -mt-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  :
                </span>
                <CountdownUnit value={seconds} label="Secs" />
              </div>
            </div>
          </div>
        </div>

        {/* Layout: Image + Bundle Cards */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Bundle image */}
          <div className="fade-up relative">
            <img
              src={BUNDLE_IMAGE}
              alt="Skintilla Beauty gift set with serum, moisturizer, and face mist in a kraft box with dried flowers"
              className="w-full h-[380px] lg:h-[540px] object-cover"
              loading="lazy"
            />
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-[oklch(0.72_0.10_80/0.4)] hidden lg:block" />
          </div>

          {/* Bundle cards */}
          <div className="stagger-children space-y-5">
            {bundles.map((bundle) => {
              const Icon = bundle.icon;
              return (
                <div
                  key={bundle.name}
                  className={`fade-up relative p-6 border rounded-xl transition-all duration-400 ease-out cursor-pointer group hover:-translate-y-1 hover:shadow-[0_14px_35px_oklch(0.25_0.03_55/0.09),0_5px_10px_oklch(0.25_0.03_55/0.05)] ${
                    bundle.popular
                      ? `border-[oklch(0.72_0.10_80)] ${isDark ? "bg-[oklch(0.20_0.015_55)]" : "bg-[oklch(0.96_0.015_80)]"}`
                      : `${isDark ? "border-[oklch(0.28_0.015_55)]" : "border-[oklch(0.88_0.02_75)]"} ${isDark ? "bg-[oklch(0.20_0.015_55)]" : "bg-[oklch(0.98_0.008_80)]"} hover:border-[oklch(0.72_0.10_80/0.5)]`
                  }`}
                  onClick={() => toast("Shop coming soon! Stay tuned.")}
                >
                  {bundle.popular && (
                    <span
                      className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[oklch(0.72_0.10_80)] text-[oklch(0.98_0.008_80)] text-[0.6rem] tracking-[0.2em] uppercase"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Most Popular
                    </span>
                  )}

                  <div className="flex items-start gap-5">
                    <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-[oklch(0.72_0.10_80/0.3)] rounded-lg transition-all duration-400 group-hover:bg-[oklch(0.72_0.10_80/0.1)] group-hover:border-[oklch(0.72_0.10_80/0.5)]">
                      <Icon
                        size={18}
                        strokeWidth={1.5}
                        className="text-[oklch(0.72_0.10_80)] transition-transform duration-400 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3
                          className={`text-[1.3rem] font-semibold ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"}`}
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {bundle.name}
                        </h3>
                        <div className="text-right">
                          <span
                            className={`block text-[1.2rem] font-semibold ${isDark ? "text-[oklch(0.50_0.05_145)]" : "text-[oklch(0.38_0.04_145)]"}`}
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {bundle.price}
                          </span>
                          <span
                            className="text-[0.65rem] tracking-[0.1em] uppercase text-[oklch(0.72_0.10_80)]"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {bundle.savings}
                          </span>
                        </div>
                      </div>

                      <ul className="flex flex-wrap gap-x-4 gap-y-1">
                        {bundle.items.map((item) => (
                          <li
                            key={item}
                            className={`text-[0.82rem] ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.50_0.03_55)]"} font-light before:content-['·'] before:mr-1.5 before:text-[oklch(0.72_0.10_80)]`}
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4">
                        <span
                          className={`inline-flex items-center text-[0.72rem] font-medium tracking-[0.12em] uppercase ${isDark ? "text-[oklch(0.50_0.05_145)]" : "text-[oklch(0.38_0.04_145)]"} group-hover:text-[oklch(0.72_0.10_80)] transition-colors duration-300`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Add to Cart
                          <svg
                            className="ml-2 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shipping Calculator */}
        <ShippingCalculator />
      </div>
    </section>
  );
}
