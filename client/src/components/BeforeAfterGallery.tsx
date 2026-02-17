
/*
 * Skintilla Beauty — Botanical Atelier Design
 * Before & After Gallery: Interactive comparison slider + testimonial cards
 * Gold accents, editorial typography, warm palette
 */
import { useState, useRef, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";

interface TransformationStory {
  image: string;
  name: string;
  age: string;
  concern: string;
  product: string;
  duration: string;
  quote: string;
}

const transformations: TransformationStory[] = [
  {
    image:
      "https://raw.githubusercontent.com/mltpascual/SkintillaBeauty/main/client/public/images/before-after-1.jpg",
    name: "Mei L.",
    age: "28",
    concern: "Uneven skin tone & blemishes",
    product: "Radiance Serum + Botanical Toner",
    duration: "8 weeks",
    quote:
      "I noticed a visible difference in my skin's clarity within the first two weeks. After eight weeks, my complexion is the most even it's ever been.",
  },
  {
    image:
      "https://raw.githubusercontent.com/mltpascual/SkintillaBeauty/main/client/public/images/before-after-2.jpg",
    name: "Catherine D.",
    age: "42",
    concern: "Fine lines & tired-looking skin",
    product: "Eye Revival Cream + Velvet Moisturizer",
    duration: "12 weeks",
    quote:
      "The Eye Revival Cream has been a game-changer. My under-eye area looks brighter and firmer, and the fine lines around my eyes have visibly softened.",
  },
  {
    image:
      "https://raw.githubusercontent.com/mltpascual/SkintillaBeauty/main/client/public/images/before-after-3.jpg",
    name: "Aisha T.",
    age: "35",
    concern: "Hyperpigmentation & uneven texture",
    product: "The Glow Ritual Bundle",
    duration: "10 weeks",
    quote:
      "My dark spots have faded dramatically. The combination of the Radiance Serum and Botanical Toner has given me the most even, glowing complexion I've had in years.",
  },
];

function ImageSlider({ src }: { src: string }) {
  const { isDark } = useDarkMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);

  const updateSlider = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
      setSliderPos(percent);
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updateSlider(e.clientX);
    },
    [updateSlider]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updateSlider(e.clientX);
    },
    [updateSlider]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] lg:h-[380px] overflow-hidden cursor-col-resize select-none touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Full image (After — right side) */}
      <img
        src={src}
        alt="After transformation"
        className="absolute inset-0 w-full h-full object-cover object-center"
        draggable={false}
      />

      {/* Clipped overlay (Before — left side) — uses grayscale + lower brightness */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={src}
          alt="Before transformation"
          className="absolute inset-0 w-full h-full object-cover object-center grayscale brightness-90 contrast-90"
          draggable={false}
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-[oklch(0.98_0.008_80)] z-10 transition-colors duration-500"
        style={{
          left: `${sliderPos}%`,
          transform: "translateX(-50%)",
          backgroundColor: isDark ? "oklch(0.28 0.015 55)" : "oklch(0.98 0.008 80)",
        }}
      >
        {/* Handle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border border-[oklch(0.72_0.10_80)] flex items-center justify-center shadow-lg transition-colors duration-500"
          style={{
            backgroundColor: isDark
              ? "oklch(0.18 0.015 55)"
              : "oklch(0.98 0.008 80)",
          }}
        >
          <ChevronLeft
            size={12}
            className={`-mr-0.5 transition-colors duration-500 ${
              isDark ? "text-[oklch(0.65_0.015_75)]" : "text-[oklch(0.50_0.03_55)]"
            }`}
          />
          <ChevronRight
            size={12}
            className={`-ml-0.5 transition-colors duration-500 ${
              isDark ? "text-[oklch(0.65_0.015_75)]" : "text-[oklch(0.50_0.03_55)]"
            }`}
          />
        </div>
      </div>

      {/* Labels */}
      <div
        className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[oklch(0.25_0.03_55/0.7)] backdrop-blur-sm text-[oklch(0.98_0.008_80)] text-[0.6rem] tracking-[0.2em] uppercase z-10"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Before
      </div>
      <div
        className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[oklch(0.72_0.10_80/0.8)] backdrop-blur-sm text-[oklch(0.98_0.008_80)] text-[0.6rem] tracking-[0.2em] uppercase z-10"
        style={{ fontFamily: "var(--font-body)" }}
      >
        After
      </div>
    </div>
  );
}

export default function BeforeAfterGallery() {
  const sectionRef = useScrollReveal();
  const { isDark } = useDarkMode();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = transformations[activeIndex];

  return (
    <section
      id="results"
      ref={sectionRef}
      className="py-24 lg:py-36 transition-colors duration-500"
      style={{
        background: isDark
          ? "oklch(0.18 0.015 55)"
          : "oklch(0.98 0.008 80)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 stagger-children">
          <div className="fade-up flex items-center justify-center gap-6 mb-6">
            <div className="gold-divider w-[80px]" />
            <span
              className="text-[0.7rem] font-medium tracking-[0.25em] uppercase text-[oklch(0.72_0.10_80)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Real Results
            </span>
            <div className="gold-divider w-[80px]" />
          </div>
          <h2
            className={`fade-up text-[clamp(2rem,4vw,3.2rem)] leading-[1.15] font-semibold transition-colors duration-500 ${
              isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Before &{" "}
            <em
              className={`font-normal italic transition-colors duration-500 ${
                isDark
                  ? "text-[oklch(0.60_0.06_145)]"
                  : "text-[oklch(0.50_0.05_145)]"
              }`}
            >
              After
            </em>
          </h2>
          <p
            className={`fade-up mt-5 text-[1rem] leading-[1.7] max-w-xl mx-auto font-light transition-colors duration-500 ${
              isDark ? "text-[oklch(0.65_0.015_75)]" : "text-[oklch(0.50_0.03_55)]"
            }`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Real transformations from our community. Drag the slider to reveal
            the difference.
          </p>
        </div>

        {/* Gallery */}
        <div className="fade-up max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Image slider — takes 3 cols */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <ImageSlider src={active.image} />
              </motion.div>

              {/* Navigation dots */}
              <div className="flex items-center justify-center gap-3 mt-5">
                {transformations.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`transition-all duration-300 ${
                      i === activeIndex
                        ? "w-8 h-[3px] bg-[oklch(0.72_0.10_80)]"
                        : `w-3 h-[3px] ${isDark ? "bg-[oklch(0.35_0.015_55)] hover:bg-[oklch(0.72_0.10_80/0.5)]" : "bg-[oklch(0.82_0.04_75)] hover:bg-[oklch(0.72_0.10_80/0.5)]"}`
                    }`}
                    aria-label={`View transformation ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Story card — takes 2 cols */}
            <div className="lg:col-span-2">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`p-6 transition-colors duration-500 ${
                  isDark
                    ? "bg-[oklch(0.20_0.015_55)] border-[oklch(0.28_0.015_55)]"
                    : "bg-[oklch(0.96_0.015_80)] border-[oklch(0.88_0.02_75)]"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 bg-[oklch(0.38_0.04_145)] flex items-center justify-center text-[oklch(0.98_0.008_80)] text-[0.85rem] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {active.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      className={`text-[0.9rem] font-medium transition-colors duration-500 ${
                        isDark
                          ? "text-[oklch(0.90_0.015_75)]"
                          : "text-[oklch(0.25_0.03_55)]"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {active.name}
                    </p>
                    <p
                      className={`text-[0.75rem] font-light transition-colors duration-500 ${
                        isDark
                          ? "text-[oklch(0.55_0.015_55)]"
                          : "text-[oklch(0.50_0.02_55)]"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Age {active.age}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex items-start gap-3">
                    <span
                      className="text-[0.65rem] tracking-[0.15em] uppercase text-[oklch(0.72_0.10_80)] shrink-0 mt-0.5 w-16"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Concern
                    </span>
                    <span
                      className={`text-[0.82rem] font-light transition-colors duration-500 ${
                        isDark
                          ? "text-[oklch(0.65_0.015_75)]"
                          : "text-[oklch(0.40_0.03_55)]"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {active.concern}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span
                      className="text-[0.65rem] tracking-[0.15em] uppercase text-[oklch(0.72_0.10_80)] shrink-0 mt-0.5 w-16"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Used
                    </span>
                    <span
                      className={`text-[0.82rem] font-light transition-colors duration-500 ${
                        isDark
                          ? "text-[oklch(0.65_0.015_75)]"
                          : "text-[oklch(0.40_0.03_55)]"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {active.product}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span
                      className="text-[0.65rem] tracking-[0.15em] uppercase text-[oklch(0.72_0.10_80)] shrink-0 mt-0.5 w-16"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Period
                    </span>
                    <span
                      className={`text-[0.82rem] font-light transition-colors duration-500 ${
                        isDark
                          ? "text-[oklch(0.65_0.015_75)]"
                          : "text-[oklch(0.40_0.03_55)]"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {active.duration}
                    </span>
                  </div>
                </div>

                <div className="gold-divider mb-5" />

                <p
                  className={`text-[0.95rem] leading-[1.7] italic transition-colors duration-500 ${
                    isDark
                      ? "text-[oklch(0.85_0.015_75)]"
                      : "text-[oklch(0.35_0.03_55)]"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  &ldquo;{active.quote}&rdquo;
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
