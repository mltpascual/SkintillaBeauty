/*
 * Skintilla Beauty — Botanical Atelier Design
 * Bundles: Gift set showcase with editorial layout
 * Full-bleed image, overlaid pricing cards, gold accents
 */
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";
import { Gift, Sparkles, Package } from "lucide-react";

const BUNDLE_IMAGE =
  "https://private-us-east-1.manuscdn.com/sessionFile/3ocyoQdcxp9Sw7E1buR1nN/sandbox/AYB0LnWgHFt76y2h1QDWTu-img-5_1770802544000_na1fn_YnVuZGxlLWdpZnQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvM29jeW9RZGN4cDlTdzdFMWJ1UjFuTi9zYW5kYm94L0FZQjBMbldnSEZ0NzZ5MmgxUURXVHUtaW1nLTVfMTc3MDgwMjU0NDAwMF9uYTFmbl9ZblZ1Wkd4bExXZHBablEuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=dgoN9y89clWHP0Vl4nY7cZf4JcjIDlC7UwubB5PO5PbN2AF8OMPwG0pHR0TU~S9r5BFtyiOA70mHKzOP7M0TPAOtTn1ImFuTuubnf-HLYZG9OboB8NlFIi7DjwZ-OgIpIPMQXQ5ITT7HFEeU0hEhXEQw1GAjLpIbQ1ts9Ie0YbQrNebgiTMzkFlraog3olVjSrjEq10gKfK8XZITFU2mRi4nyFl1b-3IXtk9z0LpHgZvZOGM1-jJ41mpOo2efoCp-71STOurKALAza~90BwbTNp2P4yp6iOY1cSsH~Ot9xpiYlSCauDObxJXfjL0V90xuRDTXWEUYU3trRMiWfJ8ng__";

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

export default function BundlesSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="bundles"
      ref={sectionRef}
      className="py-24 lg:py-36"
      style={{ background: "oklch(0.98 0.008 80)" }}
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
              Curated Bundles
            </span>
            <div className="gold-divider w-[80px]" />
          </div>
          <h2
            className="fade-up text-[clamp(2rem,4vw,3.2rem)] leading-[1.15] font-semibold text-[oklch(0.25_0.03_55)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Beauty{" "}
            <em className="font-normal italic text-[oklch(0.50_0.05_145)]">
              Bundles
            </em>
          </h2>
          <p
            className="fade-up mt-5 text-[1rem] leading-[1.7] text-[oklch(0.50_0.03_55)] max-w-xl mx-auto font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Complete skincare rituals, thoughtfully bundled for every routine.
            The perfect gift — for yourself or someone you love.
          </p>
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
                  className={`fade-up relative p-6 border transition-all duration-300 cursor-pointer group ${
                    bundle.popular
                      ? "border-[oklch(0.72_0.10_80)] bg-[oklch(0.96_0.015_80)]"
                      : "border-[oklch(0.88_0.02_75)] bg-[oklch(0.98_0.008_80)] hover:border-[oklch(0.72_0.10_80/0.5)]"
                  }`}
                  onClick={() => toast("Shop coming soon! Stay tuned.")}
                >
                  {bundle.popular && (
                    <span
                      className="absolute -top-3 right-6 px-3 py-1 bg-[oklch(0.72_0.10_80)] text-[oklch(0.98_0.008_80)] text-[0.6rem] tracking-[0.2em] uppercase"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Most Popular
                    </span>
                  )}

                  <div className="flex items-start gap-5">
                    <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-[oklch(0.72_0.10_80/0.3)]">
                      <Icon
                        size={18}
                        strokeWidth={1.5}
                        className="text-[oklch(0.72_0.10_80)]"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3
                          className="text-[1.3rem] font-semibold text-[oklch(0.25_0.03_55)]"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {bundle.name}
                        </h3>
                        <div className="text-right">
                          <span
                            className="block text-[1.2rem] font-semibold text-[oklch(0.38_0.04_145)]"
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
                            className="text-[0.82rem] text-[oklch(0.50_0.03_55)] font-light before:content-['·'] before:mr-1.5 before:text-[oklch(0.72_0.10_80)]"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4">
                        <span
                          className="inline-flex items-center text-[0.72rem] font-medium tracking-[0.12em] uppercase text-[oklch(0.38_0.04_145)] group-hover:text-[oklch(0.72_0.10_80)] transition-colors duration-300"
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
      </div>
    </section>
  );
}
