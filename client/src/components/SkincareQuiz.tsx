
/*
 * Skintilla Beauty — Botanical Atelier Design
 * Skincare Quiz: Interactive multi-step quiz that recommends products based on skin type
 * Warm tones, gold accents, editorial serif typography, smooth transitions
 */
import { useState, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, RotateCcw } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";

interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; value: string; description: string }[];
}

interface ProductRecommendation {
  name: string;
  tagline: string;
  products: string[];
  routine: string;
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "How would you describe your skin type?",
    options: [
      { label: "Dry", value: "dry", description: "Tight, flaky, or rough texture" },
      { label: "Oily", value: "oily", description: "Shiny, enlarged pores, prone to breakouts" },
      { label: "Combination", value: "combination", description: "Oily T-zone, dry cheeks" },
      { label: "Sensitive", value: "sensitive", description: "Easily irritated, redness-prone" },
    ],
  },
  {
    id: 2,
    question: "What is your primary skin concern?",
    options: [
      { label: "Dullness", value: "dullness", description: "Lack of radiance and glow" },
      { label: "Fine Lines", value: "aging", description: "Wrinkles and loss of firmness" },
      { label: "Uneven Tone", value: "uneven", description: "Dark spots or hyperpigmentation" },
      { label: "Hydration", value: "hydration", description: "Dehydrated, needs moisture" },
    ],
  },
  {
    id: 3,
    question: "How much time do you dedicate to skincare daily?",
    options: [
      { label: "5 Minutes", value: "minimal", description: "Quick and simple routine" },
      { label: "10 Minutes", value: "moderate", description: "A balanced, mindful routine" },
      { label: "15+ Minutes", value: "extensive", description: "Full ritual with multiple steps" },
      { label: "Flexible", value: "flexible", description: "Varies day to day" },
    ],
  },
];

const getRecommendation = (answers: string[]): ProductRecommendation => {
  const [skinType, concern] = answers;

  if (concern === "dullness" || concern === "uneven") {
    return {
      name: "The Glow Ritual",
      tagline: "Radiance-boosting essentials for luminous skin",
      products: ["Radiance Serum", "Botanical Toner", "Velvet Moisturizer"],
      routine:
        "Start with the Botanical Toner to prep and balance, follow with the Radiance Serum for brightening, and seal with the Velvet Moisturizer for lasting hydration.",
    };
  }

  if (concern === "aging") {
    return {
      name: "The Complete Set",
      tagline: "Comprehensive anti-aging care for youthful radiance",
      products: ["Radiance Serum", "Eye Revival Cream", "Velvet Moisturizer", "Botanical Toner"],
      routine:
        "Cleanse, then apply the Botanical Toner. Layer the Radiance Serum for antioxidant protection, dab the Eye Revival Cream around the eyes, and finish with the Velvet Moisturizer.",
    };
  }

  if (skinType === "dry" || concern === "hydration") {
    return {
      name: "The Essentials",
      tagline: "Deep hydration for dry, thirsty skin",
      products: ["Velvet Moisturizer", "Botanical Toner"],
      routine:
        "After cleansing, apply the Botanical Toner to soothe and prep, then generously apply the Velvet Moisturizer to lock in deep, lasting hydration.",
    };
  }

  return {
    name: "The Glow Ritual",
    tagline: "A balanced routine for healthy, radiant skin",
    products: ["Radiance Serum", "Botanical Toner", "Velvet Moisturizer"],
    routine:
      "Start with the Botanical Toner, follow with the Radiance Serum, and finish with the Velvet Moisturizer. A simple yet effective ritual for everyday glow.",
  };
};

export default function SkincareQuiz() {
  const { isDark } = useDarkMode();
  const sectionRef = useScrollReveal();
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = useCallback((value: string) => {
    setSelectedOption(value);
  }, []);

  const handleNext = useCallback(() => {
    if (!selectedOption) return;
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  }, [selectedOption, answers, currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      const newAnswers = [...answers];
      const previousAnswer = newAnswers.pop();
      setAnswers(newAnswers);
      setSelectedOption(previousAnswer || null);
    }
  }, [currentStep, answers]);

  const handleReset = useCallback(() => {
    setStarted(false);
    setCurrentStep(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
  }, []);

  const recommendation = showResult ? getRecommendation(answers) : null;
  const progress = showResult
    ? 100
    : ((currentStep + (selectedOption ? 0.5 : 0)) / questions.length) * 100;

  return (
    <section
      id="quiz"
      ref={sectionRef}
      className="py-24 lg:py-36 transition-colors duration-500"
      style={{ background: isDark ? "oklch(0.20 0.015 55)" : "oklch(0.93 0.02 75)" }}
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
              Find Your Ritual
            </span>
            <div className="gold-divider w-[80px]" />
          </div>
          <h2
            className={`fade-up text-[clamp(2rem,4vw,3.2rem)] leading-[1.15] font-semibold ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Skincare{" "}
            <em className={`font-normal italic ${isDark ? "text-[oklch(0.60_0.06_145)]" : "text-[oklch(0.50_0.05_145)]"}`}>
              Quiz
            </em>
          </h2>
          <p
            className={`fade-up mt-5 text-[1rem] leading-[1.7] ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.50_0.03_55)]"} max-w-xl mx-auto font-light`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Answer three simple questions and discover the perfect Skintilla
            routine tailored to your unique skin.
          </p>
        </div>

        {/* Quiz Card */}
        <div className="fade-up max-w-2xl mx-auto">
          <div className={`${isDark ? "bg-[oklch(0.20_0.015_55)]" : "bg-[oklch(0.98_0.008_80)]"} border ${isDark ? "border-[oklch(0.28_0.015_55)]" : "border-[oklch(0.88_0.02_75)]"} p-8 lg:p-12 relative overflow-hidden`}>
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[oklch(0.72_0.10_80/0.3)]" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[oklch(0.72_0.10_80/0.3)]" />

            <AnimatePresence mode="wait">
              {/* Start Screen */}
              {!started && (
                <motion.div
                  key="start"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-[oklch(0.72_0.10_80/0.3)]">
                    <Sparkles
                      size={24}
                      strokeWidth={1.5}
                      className="text-[oklch(0.72_0.10_80)]"
                    />
                  </div>
                  <h3
                    className={`text-[1.8rem] font-semibold ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"} mb-3`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Discover Your Routine
                  </h3>
                  <p
                    className={`text-[0.92rem] ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.50_0.03_55)]"} mb-8 font-light max-w-sm mx-auto`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Take our 30-second quiz to find the perfect Skintilla
                    products for your skin type and goals.
                  </p>
                  <button
                    onClick={() => setStarted(true)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[0.75rem] font-medium tracking-[0.15em] uppercase bg-[oklch(0.38_0.04_145)] text-[oklch(0.98_0.008_80)] hover:bg-[oklch(0.32_0.04_145)] transition-all duration-300"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Start Quiz
                    <ArrowRight size={14} />
                  </button>
                </motion.div>
              )}

              {/* Questions */}
              {started && !showResult && (
                <motion.div
                  key={`question-${currentStep}`}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Progress bar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[0.65rem] tracking-[0.15em] uppercase ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.60_0.03_55)]"}`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Question {currentStep + 1} of {questions.length}
                      </span>
                      <span
                        className="text-[0.65rem] tracking-[0.15em] uppercase text-[oklch(0.72_0.10_80)]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className={`h-[2px] ${isDark ? "bg-[oklch(0.28_0.015_55)]" : "bg-[oklch(0.90_0.02_75)]"} overflow-hidden`}>
                      <motion.div
                        className="h-full bg-[oklch(0.72_0.10_80)]"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <h3
                    className={`text-[1.5rem] lg:text-[1.8rem] font-semibold ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"} mb-8`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {questions[currentStep].question}
                  </h3>

                  <div className="space-y-3 mb-8">
                    {questions[currentStep].options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className={`w-full text-left p-4 border transition-all duration-300 group ${
                          selectedOption === option.value
                            ? "border-[oklch(0.72_0.10_80)] bg-[oklch(0.72_0.10_80/0.06)]"
                            : `${isDark ? "border-[oklch(0.28_0.015_55)]" : "border-[oklch(0.88_0.02_75)]"} hover:border-[oklch(0.72_0.10_80/0.4)]`
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                              selectedOption === option.value
                                ? "border-[oklch(0.72_0.10_80)]"
                                : isDark ? "border-[oklch(0.4_0.015_55)]" : "border-[oklch(0.80_0.02_75)]"
                            }`}
                          >
                            {selectedOption === option.value && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2.5 h-2.5 rounded-full bg-[oklch(0.72_0.10_80)]"
                              />
                            )}
                          </div>
                          <div>
                            <span
                              className={`block text-[0.95rem] font-medium ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"}`}
                              style={{ fontFamily: "var(--font-body)" }}
                            >
                              {option.label}
                            </span>
                            <span
                              className={`block text-[0.8rem] ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.55_0.03_55)]"} font-light mt-0.5`}
                              style={{ fontFamily: "var(--font-body)" }}
                            >
                              {option.description}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleBack}
                      disabled={currentStep === 0}
                      className={`inline-flex items-center gap-2 text-[0.75rem] font-medium tracking-[0.12em] uppercase transition-all duration-300 ${
                        currentStep === 0
                          ? "text-[oklch(0.80_0.02_75)] cursor-not-allowed"
                          : `${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.50_0.03_55)]"} hover:text-[oklch(0.38_0.04_145)]`
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <ArrowLeft size={14} />
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!selectedOption}
                      className={`inline-flex items-center gap-2 px-7 py-3 rounded-full text-[0.75rem] font-medium tracking-[0.15em] uppercase transition-all duration-300 ${
                        selectedOption
                          ? "bg-[oklch(0.38_0.04_145)] text-[oklch(0.98_0.008_80)] hover:bg-[oklch(0.32_0.04_145)]"
                          : `${isDark ? "bg-[oklch(0.22_0.015_55)] text-[oklch(0.4_0.015_55)]" : "bg-[oklch(0.88_0.02_75)] text-[oklch(0.65_0.02_55)]"} cursor-not-allowed`
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {currentStep < questions.length - 1 ? "Next" : "See Results"}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Result */}
              {showResult && recommendation && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Progress bar — complete */}
                  <div className="mb-8">
                    <div className={`h-[2px] ${isDark ? "bg-[oklch(0.28_0.015_55)]" : "bg-[oklch(0.90_0.02_75)]"} overflow-hidden`}>
                      <div className="h-full w-full bg-[oklch(0.72_0.10_80)]" />
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center border border-[oklch(0.72_0.10_80/0.3)]">
                      <Sparkles
                        size={22}
                        strokeWidth={1.5}
                        className="text-[oklch(0.72_0.10_80)]"
                      />
                    </div>
                    <p
                      className="text-[0.7rem] font-medium tracking-[0.25em] uppercase text-[oklch(0.72_0.10_80)] mb-3"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Your Perfect Match
                    </p>
                    <h3
                      className={`text-[2rem] lg:text-[2.4rem] font-semibold ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"} mb-2`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {recommendation.name}
                    </h3>
                    <p
                      className={`text-[0.95rem] ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.50_0.03_55)]"} font-light italic`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {recommendation.tagline}
                    </p>
                  </div>

                  <div className="gold-divider mb-8" />

                  {/* Recommended products */}
                  <div className="mb-8">
                    <p
                      className={`text-[0.7rem] font-medium tracking-[0.2em] uppercase ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.50_0.03_55)]"} mb-4`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Recommended Products
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.products.map((product) => (
                        <span
                          key={product}
                          className={`px-4 py-2 text-[0.8rem] border border-[oklch(0.72_0.10_80/0.3)] ${isDark ? "text-[oklch(0.50_0.05_145)]" : "text-[oklch(0.38_0.04_145)]"} bg-[oklch(0.72_0.10_80/0.05)]`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Routine */}
                  <div className={`mb-8 p-5 ${isDark ? "bg-[oklch(0.16_0.015_55)]" : "bg-[oklch(0.96_0.015_80)]"} border ${isDark ? "border-[oklch(0.28_0.015_55)]" : "border-[oklch(0.88_0.02_75)]"}`}>
                    <p
                      className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[oklch(0.72_0.10_80)] mb-3"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Your Routine
                    </p>
                    <p
                      className={`text-[0.9rem] ${isDark ? "text-[oklch(0.65_0.015_75)]" : "text-[oklch(0.40_0.03_55)]"} leading-[1.7] font-light`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {recommendation.routine}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href="#bundles"
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[0.75rem] font-medium tracking-[0.15em] uppercase bg-[oklch(0.38_0.04_145)] text-[oklch(0.98_0.008_80)] hover:bg-[oklch(0.32_0.04_145)] transition-all duration-300"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Shop This Bundle
                      <ArrowRight size={14} />
                    </a>
                    <button
                      onClick={handleReset}
                      className={`inline-flex items-center gap-2 px-6 py-3.5 text-[0.75rem] font-medium tracking-[0.12em] uppercase ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.50_0.03_55)]"} hover:text-[oklch(0.38_0.04_145)] transition-colors duration-300`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <RotateCcw size={14} />
                      Retake Quiz
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
