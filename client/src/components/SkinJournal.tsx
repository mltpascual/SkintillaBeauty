/*
 * Skintilla Beauty — Botanical Atelier Design
 * Skin Journal: Editorial blog section with skincare articles
 * Magazine-style grid layout, dark mode aware — fully mobile responsive
 */
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDarkMode } from "@/hooks/useDarkMode";
import { BookOpen, Clock, ArrowRight, X } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  featured: boolean;
  content: string[];
}

const ARTICLES: Article[] = [
  {
    id: "layering-guide",
    title: "The Art of Layering: Your Complete Guide to Product Application Order",
    excerpt:
      "Discover the science-backed sequence for applying skincare products to maximize absorption and effectiveness.",
    category: "Skincare Tips",
    readTime: "5 min read",
    date: "Feb 2026",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&h=600&fit=crop",
    featured: true,
    content: [
      "The order in which you apply your skincare products matters more than you might think. As a general rule, products should be applied from thinnest to thickest consistency — this ensures each layer can penetrate the skin effectively.",
      "Start with your cleanser, followed by toner to balance your skin's pH. Next, apply serums — these concentrated formulas deliver active ingredients deep into the skin. Follow with eye cream, then moisturizer to lock everything in.",
      "In the morning, always finish with SPF. In the evening, you can swap SPF for a richer night cream or facial oil. Wait 30-60 seconds between each layer to allow proper absorption.",
      "Our Botanical Toner, Radiance Serum, and Velvet Moisturizer are formulated to work beautifully together, with each product enhancing the absorption of the next.",
    ],
  },
  {
    id: "vitamin-c",
    title: "Vitamin C: The Brightening Powerhouse Your Skin Craves",
    excerpt:
      "Why this antioxidant is the gold standard for luminous, even-toned skin — and how to use it effectively.",
    category: "Ingredient Spotlight",
    readTime: "4 min read",
    date: "Jan 2026",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop",
    featured: false,
    content: [
      "Vitamin C is one of the most well-researched skincare ingredients, proven to brighten skin, fade dark spots, and protect against environmental damage. It works by inhibiting melanin production and neutralizing free radicals.",
      "For best results, look for formulas with L-ascorbic acid at concentrations between 10-20%. Our Radiance Serum combines Vitamin C with rosehip oil for enhanced brightening without irritation.",
      "Apply Vitamin C in the morning before sunscreen for maximum antioxidant protection throughout the day. Store your serum in a cool, dark place to maintain potency.",
    ],
  },
  {
    id: "spring-routine",
    title: "Spring Skin Reset: Transitioning Your Routine for Warmer Weather",
    excerpt:
      "As temperatures rise, your skin's needs change. Here's how to adjust your routine for the season.",
    category: "Seasonal Routines",
    readTime: "6 min read",
    date: "Feb 2026",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    featured: false,
    content: [
      "Spring is the perfect time to reassess your skincare routine. As humidity increases, you may find that heavy winter creams feel too rich. Consider switching to lighter, water-based moisturizers.",
      "Exfoliation becomes more important in spring to slough off the dry, dull skin that accumulated during winter. Start with gentle chemical exfoliants like AHAs once or twice a week.",
      "Don't forget to upgrade your SPF — longer days mean more sun exposure. Our Botanical Toner is perfect for spring, providing lightweight hydration while balancing your skin after the harsh winter months.",
    ],
  },
  {
    id: "hyaluronic-acid",
    title: "Hyaluronic Acid: The Hydration Hero Behind Plump, Dewy Skin",
    excerpt:
      "This moisture-binding molecule can hold 1000x its weight in water. Learn how to harness its power.",
    category: "Ingredient Spotlight",
    readTime: "3 min read",
    date: "Dec 2025",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&h=600&fit=crop",
    featured: false,
    content: [
      "Hyaluronic acid is a naturally occurring molecule in our skin that acts like a sponge, drawing moisture from the environment and locking it in. As we age, our natural HA levels decline, leading to dryness and fine lines.",
      "When choosing HA products, look for formulas with multiple molecular weights — larger molecules hydrate the surface while smaller ones penetrate deeper layers. Our Velvet Moisturizer features a tri-weight hyaluronic acid complex for multi-level hydration.",
      "Apply HA to damp skin for best results — it needs moisture to bind to. Follow with a moisturizer to seal in the hydration.",
    ],
  },
  {
    id: "nighttime-ritual",
    title: "The Evening Ritual: Why Your Nighttime Routine Matters Most",
    excerpt:
      "Your skin does its heaviest repair work while you sleep. Make the most of those golden hours.",
    category: "Skincare Tips",
    readTime: "5 min read",
    date: "Jan 2026",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop",
    featured: false,
    content: [
      "While you sleep, your skin enters repair mode — cell turnover increases, collagen production ramps up, and blood flow to the skin rises. This makes your evening routine the most impactful part of your skincare regimen.",
      "Double cleansing is essential at night: start with an oil-based cleanser to dissolve makeup and sunscreen, then follow with a water-based cleanser to remove remaining impurities.",
      "Night is the ideal time for active ingredients like retinol, peptides, and AHAs. Our Eye Revival Cream is specifically formulated for overnight use, with peptides that work synergistically with your skin's natural repair cycle.",
    ],
  },
];

export default function SkinJournal() {
  const sectionRef = useScrollReveal();
  const { isDark } = useDarkMode();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const featuredArticle = ARTICLES[0];
  const otherArticles = ARTICLES.slice(1);

  return (
    <section
      id="journal"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-36 transition-colors duration-500"
      style={{ background: isDark ? "oklch(0.14 0.012 55)" : "oklch(0.98 0.008 80)" }}
      aria-label="Skin Journal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 stagger-children">
          <div className="fade-up flex items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="gold-divider w-[40px] sm:w-[80px]" />
            <span
              className="text-[0.65rem] sm:text-[0.7rem] font-medium tracking-[0.25em] uppercase text-[oklch(0.72_0.10_80)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              The Skin Journal
            </span>
            <div className="gold-divider w-[40px] sm:w-[80px]" />
          </div>
          <h2
            className={`fade-up text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.15] font-semibold ${
              isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Stories &{" "}
            <em
              className={`font-normal italic ${
                isDark ? "text-[oklch(0.60_0.06_145)]" : "text-[oklch(0.50_0.05_145)]"
              }`}
            >
              Insights
            </em>
          </h2>
          <p
            className={`fade-up mt-3 sm:mt-5 text-[0.88rem] sm:text-[1rem] leading-[1.7] max-w-xl mx-auto font-light ${
              isDark ? "text-[oklch(0.65_0.015_75)]" : "text-[oklch(0.50_0.03_55)]"
            }`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Expert advice, ingredient deep-dives, and seasonal rituals to elevate
            your skincare journey.
          </p>
        </div>

        {/* Featured Article */}
        <div
          className="fade-up mb-8 sm:mb-12 cursor-pointer group"
          onClick={() => setSelectedArticle(featuredArticle)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSelectedArticle(featuredArticle);
            }
          }}
          aria-label={`Read article: ${featuredArticle.title}`}
        >
          <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-xl sm:rounded-2xl">
            <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                <span
                  className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[0.6rem] sm:text-[0.65rem] tracking-[0.12em] uppercase bg-[oklch(0.72_0.10_80)] text-[oklch(0.20_0.03_55)] font-medium"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Featured
                </span>
              </div>
            </div>
            <div
              className={`p-5 sm:p-8 lg:p-12 flex flex-col justify-center transition-colors duration-500 ${
                isDark ? "bg-[oklch(0.20_0.015_55)]" : "bg-white"
              }`}
            >
              <span
                className="text-[0.62rem] sm:text-[0.68rem] tracking-[0.15em] uppercase text-[oklch(0.72_0.10_80)] mb-2 sm:mb-3"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {featuredArticle.category}
              </span>
              <h3
                className={`text-[clamp(1.1rem,2.5vw,1.8rem)] leading-[1.3] font-semibold mb-3 sm:mb-4 group-hover:text-[oklch(0.50_0.05_145)] transition-colors duration-300 ${
                  isDark ? "text-[oklch(0.88_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {featuredArticle.title}
              </h3>
              <p
                className={`text-[0.82rem] sm:text-[0.92rem] leading-[1.7] mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none ${
                  isDark ? "text-[oklch(0.60_0.015_75)]" : "text-[oklch(0.50_0.03_55)]"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <span
                  className={`flex items-center gap-1.5 text-[0.7rem] sm:text-[0.75rem] ${
                    isDark ? "text-[oklch(0.50_0.015_55)]" : "text-[oklch(0.60_0.03_55)]"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <Clock size={12} />
                  {featuredArticle.readTime}
                </span>
                <span
                  className={`text-[0.7rem] sm:text-[0.75rem] ${
                    isDark ? "text-[oklch(0.45_0.015_55)]" : "text-[oklch(0.65_0.03_55)]"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {featuredArticle.date}
                </span>
              </div>
              <div className="mt-4 sm:mt-6 flex items-center gap-2 text-[oklch(0.50_0.05_145)] text-[0.75rem] sm:text-[0.8rem] font-medium group-hover:gap-3 transition-all duration-300">
                <span style={{ fontFamily: "var(--font-body)" }}>Read Article</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* Article Grid — 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {otherArticles.map((article, index) => (
            <div
              key={article.id}
              className={`fade-up group cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                isDark
                  ? "bg-[oklch(0.20_0.015_55)] border-[oklch(0.28_0.015_55)] hover:border-[oklch(0.72_0.10_80/0.3)]"
                  : "bg-white border-[oklch(0.90_0.02_75)] hover:border-[oklch(0.72_0.10_80/0.3)]"
              }`}
              style={{ transitionDelay: `${index * 60}ms` }}
              onClick={() => setSelectedArticle(article)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedArticle(article);
                }
              }}
              aria-label={`Read article: ${article.title}`}
            >
              {/* Mobile: horizontal card layout / Desktop: vertical card */}
              <div className="flex sm:flex-col">
                <div className="relative overflow-hidden w-[120px] sm:w-full aspect-square sm:aspect-[3/2] shrink-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                    <span
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[0.55rem] sm:text-[0.6rem] tracking-[0.1em] uppercase font-medium ${
                        isDark
                          ? "bg-[oklch(0.20_0.015_55/0.85)] text-[oklch(0.72_0.10_80)]"
                          : "bg-white/90 text-[oklch(0.50_0.05_145)]"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-3 sm:p-5 flex flex-col justify-center flex-1 min-w-0">
                  <h4
                    className={`text-[0.82rem] sm:text-[0.92rem] leading-[1.35] sm:leading-[1.4] font-semibold mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-[oklch(0.50_0.05_145)] transition-colors duration-300 ${
                      isDark ? "text-[oklch(0.85_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {article.title}
                  </h4>
                  <p
                    className={`text-[0.72rem] sm:text-[0.78rem] leading-[1.5] sm:leading-[1.6] line-clamp-2 mb-2 sm:mb-4 ${
                      isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.55_0.03_55)]"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex items-center gap-1 sm:gap-1.5 text-[0.65rem] sm:text-[0.7rem] ${
                        isDark ? "text-[oklch(0.45_0.015_55)]" : "text-[oklch(0.60_0.03_55)]"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <Clock size={11} />
                      {article.readTime}
                    </span>
                    <ArrowRight
                      size={13}
                      className={`transition-all duration-300 group-hover:translate-x-1 ${
                        isDark ? "text-[oklch(0.50_0.015_55)]" : "text-[oklch(0.65_0.03_55)]"
                      } group-hover:text-[oklch(0.50_0.05_145)]`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Modal — fully responsive */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={selectedArticle.title}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedArticle(null)}
          />
          <div
            className={`relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl shadow-2xl ${
              isDark ? "bg-[oklch(0.18_0.015_55)]" : "bg-white"
            }`}
          >
            {/* Modal Header Image */}
            <div className="relative h-40 sm:h-56 overflow-hidden rounded-t-2xl">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                aria-label="Close article"
              >
                <X size={14} />
              </button>
              <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6">
                <span
                  className="px-2.5 sm:px-3 py-1 rounded-full text-[0.6rem] sm:text-[0.65rem] tracking-[0.1em] uppercase bg-[oklch(0.72_0.10_80)] text-[oklch(0.20_0.03_55)] font-medium"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {selectedArticle.category}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <span
                  className={`flex items-center gap-1.5 text-[0.7rem] sm:text-[0.75rem] ${
                    isDark ? "text-[oklch(0.50_0.015_55)]" : "text-[oklch(0.60_0.03_55)]"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <Clock size={12} />
                  {selectedArticle.readTime}
                </span>
                <span
                  className={`text-[0.7rem] sm:text-[0.75rem] ${
                    isDark ? "text-[oklch(0.40_0.015_55)]" : "text-[oklch(0.65_0.03_55)]"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {selectedArticle.date}
                </span>
              </div>

              <h2
                className={`text-[clamp(1.2rem,3vw,2rem)] leading-[1.25] font-semibold mb-4 sm:mb-6 ${
                  isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {selectedArticle.title}
              </h2>

              <div className="gold-divider w-[40px] sm:w-[60px] mb-4 sm:mb-6" />

              <div className="space-y-4 sm:space-y-5">
                {selectedArticle.content.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`text-[0.85rem] sm:text-[0.92rem] leading-[1.75] sm:leading-[1.8] ${
                      isDark ? "text-[oklch(0.65_0.015_75)]" : "text-[oklch(0.40_0.03_55)]"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {i === 0 && (
                      <span
                        className={`float-left text-[2.5rem] sm:text-[3rem] leading-[0.85] mr-2 sm:mr-3 mt-1 font-semibold ${
                          isDark ? "text-[oklch(0.60_0.06_145)]" : "text-[oklch(0.50_0.05_145)]"
                        }`}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {paragraph.charAt(0)}
                      </span>
                    )}
                    {i === 0 ? paragraph.slice(1) : paragraph}
                  </p>
                ))}
              </div>

              <div className="gold-divider w-full mt-6 sm:mt-8 mb-4 sm:mb-6" />

              <div className="flex items-center gap-3">
                <BookOpen size={14} className="text-[oklch(0.72_0.10_80)]" />
                <span
                  className={`text-[0.72rem] sm:text-[0.8rem] italic ${
                    isDark ? "text-[oklch(0.50_0.015_55)]" : "text-[oklch(0.55_0.03_55)]"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  From the Skintilla Beauty editorial team
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
