/*
 * Skintilla Beauty — Botanical Atelier Design
 * Before & After Gallery: Interactive comparison slider + testimonial cards
 * Gold accents, editorial typography, warm palette
 */
import { useState, useRef, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      "https://private-us-east-1.manuscdn.com/sessionFile/3ocyoQdcxp9Sw7E1buR1nN/sandbox/O0KqIqJmCeC1PKsQCpUNnu-img-1_1770803498000_na1fn_YmVmb3JlLWFmdGVyLTE.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvM29jeW9RZGN4cDlTdzdFMWJ1UjFuTi9zYW5kYm94L08wS3FJcUptQ2VDMVBLc1FDcFVObnUtaW1nLTFfMTc3MDgwMzQ5ODAwMF9uYTFmbl9ZbVZtYjNKbExXRm1kR1Z5TFRFLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=MxMpwOHqJk5rn2NoupNKGD16y11oU1GLGVfxfQei1rNJVs6yb3PKamCg2N-ZUsSuThgnIr5VEd1P3hnuCyakHg2cDCLhwygiIO4NEdyiH9SaSP933zO5P7JHyiYaNOfE-aLIHOvtQcWyEn3y8fF0ySqOQ1d0xtWovTrpBzRKcUUrUQgmCpq3h4R2sgdMoL1SQURzi2vd3CSLydRkyUEKj7oLD5VZCEkR4KjPOaq6UROpuCA1Uw0EZtsXYVFHhOGrfr98x8wOA87lbEw~PUD0WMOYvtFkUl6BhFGsPnesVbbFHyiSKjmQ1ypA1YdgdEiA-WOc8BiqdY6wIBK1LbX~Wg__",
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
      "https://private-us-east-1.manuscdn.com/sessionFile/3ocyoQdcxp9Sw7E1buR1nN/sandbox/O0KqIqJmCeC1PKsQCpUNnu-img-2_1770803505000_na1fn_YmVmb3JlLWFmdGVyLTI.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvM29jeW9RZGN4cDlTdzdFMWJ1UjFuTi9zYW5kYm94L08wS3FJcUptQ2VDMVBLc1FDcFVObnUtaW1nLTJfMTc3MDgwMzUwNTAwMF9uYTFmbl9ZbVZtYjNKbExXRm1kR1Z5TFRJLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=owVhozbzA9jprYW13qJPJfqitkJD737kpEM3RoeI1a9cuqOUcPrbSkIUvpkHc8DPlip79aS-aeequt6fmTVXdRQgkOWOaMDxC~22v~ZAsmxE4o-AMkp4qsjnRsTZeAC8z8e5cdRdldh3amcTfvVsUWcDmpjoQkGcWPUfDfhUFMBZIt5mQnG8lYSvtUe80CLFLZS36CGWnmN7W1W~let6Wkhm4ybJN0UAjN50Mh3DoD9fD9GKkB7FkZLitosHl-SxAnPb5CpiAtKidm3V6fJNNJ-hQ7oKBvThU1LVO5UohEyRF1MVhhKbvrq5lW6qyB9O3HTEL1k6GC-aS1ZYvn3Hrw__",
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
      "https://private-us-east-1.manuscdn.com/sessionFile/3ocyoQdcxp9Sw7E1buR1nN/sandbox/O0KqIqJmCeC1PKsQCpUNnu-img-3_1770803531000_na1fn_YmVmb3JlLWFmdGVyLTM.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvM29jeW9RZGN4cDlTdzdFMWJ1UjFuTi9zYW5kYm94L08wS3FJcUptQ2VDMVBLc1FDcFVObnUtaW1nLTNfMTc3MDgwMzUzMTAwMF9uYTFmbl9ZbVZtYjNKbExXRm1kR1Z5TFRNLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=auRot4NzxcGA226-8U8LEqheNKPRy1rVBfPa~lmbFtkFBjP-6WoanSXwD01ZNjBKtzVnNGB7~OU~M6JX4zPP8AMGFZrdu0BTmj6R4-NO8r75bg6uVXWjxEh9kh7NYUanoi4d0~9pFuw6x7jLknHsEy3afGVqqyyZPASweqH1FG3rr3AUS16zTsBfFH~zpbdZDAha9EuPQx0NuLLDmRbSNT8yG-w9cAp19beIDdkQsFybSujXnrU8xim0w~ems7lWGM19Ge4ZAzQVUvt9bjIF6-kU53wSuAGlCHdSb2Glg70GO4WLoB3O38Y8hyIBjiUlM-QjRJUbqAq-PwVlncRBsw__",
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
        className="absolute top-0 bottom-0 w-[2px] bg-[oklch(0.98_0.008_80)] z-10"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[oklch(0.98_0.008_80)] border border-[oklch(0.72_0.10_80)] flex items-center justify-center shadow-lg">
          <ChevronLeft size={12} className="text-[oklch(0.50_0.03_55)] -mr-0.5" />
          <ChevronRight size={12} className="text-[oklch(0.50_0.03_55)] -ml-0.5" />
        </div>
      </div>

      {/* Labels */}
      <div
        className="absolute top-4 left-4 px-3 py-1 bg-[oklch(0.25_0.03_55/0.7)] backdrop-blur-sm text-[oklch(0.98_0.008_80)] text-[0.6rem] tracking-[0.2em] uppercase z-10"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Before
      </div>
      <div
        className="absolute top-4 right-4 px-3 py-1 bg-[oklch(0.72_0.10_80/0.8)] backdrop-blur-sm text-[oklch(0.98_0.008_80)] text-[0.6rem] tracking-[0.2em] uppercase z-10"
        style={{ fontFamily: "var(--font-body)" }}
      >
        After
      </div>
    </div>
  );
}

export default function BeforeAfterGallery() {
  const sectionRef = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = transformations[activeIndex];

  return (
    <section
      id="results"
      ref={sectionRef}
      className="py-24 lg:py-36"
      style={{ background: "oklch(0.98 0.008 80)" }}
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
            className="fade-up text-[clamp(2rem,4vw,3.2rem)] leading-[1.15] font-semibold text-[oklch(0.25_0.03_55)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Before &{" "}
            <em className="font-normal italic text-[oklch(0.50_0.05_145)]">
              After
            </em>
          </h2>
          <p
            className="fade-up mt-5 text-[1rem] leading-[1.7] text-[oklch(0.50_0.03_55)] max-w-xl mx-auto font-light"
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
                        : "w-3 h-[3px] bg-[oklch(0.82_0.04_75)] hover:bg-[oklch(0.72_0.10_80/0.5)]"
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
                className="p-6 bg-[oklch(0.96_0.015_80)] border border-[oklch(0.88_0.02_75)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[oklch(0.38_0.04_145)] flex items-center justify-center text-[oklch(0.98_0.008_80)] text-[0.85rem] font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                    {active.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      className="text-[0.9rem] font-medium text-[oklch(0.25_0.03_55)]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {active.name}
                    </p>
                    <p
                      className="text-[0.72rem] text-[oklch(0.55_0.03_55)]"
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
                      className="text-[0.82rem] text-[oklch(0.40_0.03_55)] font-light"
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
                      className="text-[0.82rem] text-[oklch(0.40_0.03_55)] font-light"
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
                      className="text-[0.82rem] text-[oklch(0.40_0.03_55)] font-light"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {active.duration}
                    </span>
                  </div>
                </div>

                <div className="gold-divider mb-5" />

                <p
                  className="text-[0.95rem] text-[oklch(0.35_0.03_55)] leading-[1.7] italic"
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
