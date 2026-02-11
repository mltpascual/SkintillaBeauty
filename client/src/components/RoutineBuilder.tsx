/*
 * Skintilla Beauty — Botanical Atelier Design
 * Routine Builder: Interactive drag-and-drop routine planner
 * Users build morning/evening routines from the product pool
 * Dark mode aware — fully mobile responsive
 */
import { useState, useRef, useCallback, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Sun, Moon, GripVertical, X, Sparkles, ShoppingBag, ArrowRight, Info, Plus } from "lucide-react";
import { toast } from "sonner";

interface RoutineProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  step: number;
  description: string;
  image: string;
}

const ALL_PRODUCTS: RoutineProduct[] = [
  {
    id: "toner",
    name: "Botanical Toner",
    category: "Toner",
    price: 42,
    step: 1,
    description: "Prep & balance skin pH",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=120&h=120&fit=crop",
  },
  {
    id: "serum",
    name: "Radiance Serum",
    category: "Serum",
    price: 68,
    step: 2,
    description: "Target concerns & brighten",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=120&h=120&fit=crop",
  },
  {
    id: "eye-cream",
    name: "Eye Revival Cream",
    category: "Eye Care",
    price: 58,
    step: 3,
    description: "Firm & brighten eye area",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=120&h=120&fit=crop",
  },
  {
    id: "moisturizer",
    name: "Velvet Moisturizer",
    category: "Moisturizer",
    price: 54,
    step: 4,
    description: "Lock in hydration & nourish",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=120&h=120&fit=crop",
  },
];

type RoutineTime = "morning" | "evening";

export default function RoutineBuilder() {
  const sectionRef = useScrollReveal();
  const { isDark } = useDarkMode();
  const [isMobile, setIsMobile] = useState(false);

  const [activeTab, setActiveTab] = useState<RoutineTime>("morning");
  const [morningRoutine, setMorningRoutine] = useState<RoutineProduct[]>([]);
  const [eveningRoutine, setEveningRoutine] = useState<RoutineProduct[]>([]);
  const [draggedProduct, setDraggedProduct] = useState<RoutineProduct | null>(null);
  const [dragOverZone, setDragOverZone] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const currentRoutine = activeTab === "morning" ? morningRoutine : eveningRoutine;
  const setCurrentRoutine = activeTab === "morning" ? setMorningRoutine : setEveningRoutine;

  const availableProducts = ALL_PRODUCTS.filter(
    (p) => !currentRoutine.find((r) => r.id === p.id)
  );

  const totalPrice = currentRoutine.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscount = currentRoutine.length >= 3 ? 0.15 : currentRoutine.length >= 2 ? 0.10 : 0;
  const discountedPrice = totalPrice * (1 - bundleDiscount);
  const savings = totalPrice - discountedPrice;

  const sortedRoutine = [...currentRoutine].sort((a, b) => a.step - b.step);

  const handleDragStart = useCallback((product: RoutineProduct) => {
    setDraggedProduct(product);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOverZone(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverZone(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOverZone(false);
      if (draggedProduct && !currentRoutine.find((p) => p.id === draggedProduct.id)) {
        setCurrentRoutine((prev) => [...prev, draggedProduct]);
        toast.success(`${draggedProduct.name} added to your ${activeTab} routine`);
      }
      setDraggedProduct(null);
    },
    [draggedProduct, currentRoutine, setCurrentRoutine, activeTab]
  );

  const addProduct = useCallback(
    (product: RoutineProduct) => {
      if (!currentRoutine.find((p) => p.id === product.id)) {
        setCurrentRoutine((prev) => [...prev, product]);
        toast.success(`${product.name} added to your ${activeTab} routine`);
      }
    },
    [currentRoutine, setCurrentRoutine, activeTab]
  );

  const removeProduct = useCallback(
    (productId: string) => {
      setCurrentRoutine((prev) => prev.filter((p) => p.id !== productId));
    },
    [setCurrentRoutine]
  );

  const clearRoutine = useCallback(() => {
    setCurrentRoutine([]);
  }, [setCurrentRoutine]);

  return (
    <section
      id="routine"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-36 transition-colors duration-500"
      style={{ background: isDark ? "oklch(0.16 0.015 55)" : "oklch(0.96 0.015 80)" }}
      aria-label="Routine Builder"
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
              Build Your Ritual
            </span>
            <div className="gold-divider w-[40px] sm:w-[80px]" />
          </div>
          <h2
            className={`fade-up text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.15] font-semibold ${
              isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Routine{" "}
            <em
              className={`font-normal italic ${
                isDark ? "text-[oklch(0.60_0.06_145)]" : "text-[oklch(0.50_0.05_145)]"
              }`}
            >
              Builder
            </em>
          </h2>
          <p
            className={`fade-up mt-3 sm:mt-5 text-[0.88rem] sm:text-[1rem] leading-[1.7] max-w-xl mx-auto font-light ${
              isDark ? "text-[oklch(0.65_0.015_75)]" : "text-[oklch(0.50_0.03_55)]"
            }`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            {isMobile
              ? "Tap products to add them to your morning or evening routine. We'll sort them and calculate your savings."
              : "Drag products into your morning or evening routine. We'll sort them in the recommended application order and calculate your bundle savings."}
          </p>
        </div>

        {/* Morning / Evening Tabs */}
        <div className="fade-up flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          {(["morning", "evening"] as RoutineTime[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-[0.7rem] sm:text-[0.75rem] font-medium tracking-[0.12em] uppercase transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[oklch(0.38_0.04_145)] text-[oklch(0.98_0.008_80)] shadow-lg"
                  : isDark
                  ? "border border-[oklch(0.30_0.015_55)] text-[oklch(0.65_0.015_75)] hover:border-[oklch(0.72_0.10_80/0.4)]"
                  : "border border-[oklch(0.85_0.02_75)] text-[oklch(0.45_0.03_55)] hover:border-[oklch(0.72_0.10_80/0.4)]"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
              aria-pressed={activeTab === tab}
              aria-label={`${tab} routine`}
            >
              {tab === "morning" ? <Sun size={14} /> : <Moon size={14} />}
              {tab}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
          {/* Product Pool */}
          <div className="lg:col-span-4 fade-up">
            <h3
              className={`text-[1rem] sm:text-[1.1rem] font-semibold mb-4 sm:mb-5 ${
                isDark ? "text-[oklch(0.85_0.015_75)]" : "text-[oklch(0.30_0.03_55)]"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              <Sparkles size={16} className="inline mr-2 text-[oklch(0.72_0.10_80)]" />
              Product Pool
            </h3>

            {/* Mobile: horizontal scroll strip / Desktop: vertical list */}
            <div className={`${isMobile ? "flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory" : "space-y-3"}`}>
              {availableProducts.length === 0 ? (
                <p
                  className={`text-[0.85rem] italic py-4 sm:py-6 text-center w-full ${
                    isDark ? "text-[oklch(0.50_0.015_55)]" : "text-[oklch(0.55_0.03_55)]"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  All products added!
                </p>
              ) : (
                availableProducts.map((product) => (
                  <div
                    key={product.id}
                    draggable={!isMobile}
                    onDragStart={() => handleDragStart(product)}
                    onDragEnd={() => setDraggedProduct(null)}
                    onClick={() => addProduct(product)}
                    className={`${
                      isMobile
                        ? "flex-shrink-0 w-[160px] snap-start flex flex-col items-center gap-2 p-3 rounded-xl border text-center"
                        : "flex items-center gap-4 p-3 sm:p-3.5 rounded-xl border cursor-grab active:cursor-grabbing"
                    } transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                      isDark
                        ? "bg-[oklch(0.20_0.015_55)] border-[oklch(0.28_0.015_55)] hover:border-[oklch(0.72_0.10_80/0.4)]"
                        : "bg-white border-[oklch(0.90_0.02_75)] hover:border-[oklch(0.72_0.10_80/0.4)]"
                    }`}
                    role="button"
                    aria-label={`Add ${product.name} to routine`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        addProduct(product);
                      }
                    }}
                  >
                    {!isMobile && (
                      <GripVertical
                        size={16}
                        className={`shrink-0 ${
                          isDark ? "text-[oklch(0.45_0.015_55)]" : "text-[oklch(0.65_0.03_55)]"
                        }`}
                      />
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`${isMobile ? "w-14 h-14" : "w-12 h-12"} rounded-lg object-cover shrink-0`}
                    />
                    <div className={`${isMobile ? "" : "flex-1 min-w-0"}`}>
                      <p
                        className={`text-[0.8rem] sm:text-[0.82rem] font-medium ${isMobile ? "" : "truncate"} ${
                          isDark ? "text-[oklch(0.85_0.015_75)]" : "text-[oklch(0.30_0.03_55)]"
                        }`}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {product.name}
                      </p>
                      {!isMobile && (
                        <p
                          className={`text-[0.72rem] ${
                            isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.55_0.03_55)]"
                          }`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Step {product.step} · {product.description}
                        </p>
                      )}
                    </div>
                    {isMobile ? (
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[0.78rem] font-semibold ${
                            isDark ? "text-[oklch(0.72_0.10_80)]" : "text-[oklch(0.50_0.05_145)]"
                          }`}
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          ${product.price}
                        </span>
                        <Plus size={14} className="text-[oklch(0.72_0.10_80)]" />
                      </div>
                    ) : (
                      <span
                        className={`text-[0.82rem] font-semibold shrink-0 ${
                          isDark ? "text-[oklch(0.72_0.10_80)]" : "text-[oklch(0.50_0.05_145)]"
                        }`}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        ${product.price}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Tip */}
            <div
              className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl border flex items-start gap-3 ${
                isDark
                  ? "bg-[oklch(0.20_0.015_55/0.5)] border-[oklch(0.28_0.015_55)]"
                  : "bg-[oklch(0.97_0.01_80)] border-[oklch(0.90_0.02_75)]"
              }`}
            >
              <Info size={16} className="shrink-0 mt-0.5 text-[oklch(0.72_0.10_80)]" />
              <p
                className={`text-[0.72rem] sm:text-[0.75rem] leading-[1.6] ${
                  isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.55_0.03_55)]"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                <strong>Tip:</strong>{" "}
                {isMobile
                  ? "Tap a product to add it. Add 2+ for 10% off, 3+ for 15% off!"
                  : "Drag products to the routine area or click to add. Add 2+ products for 10% off, 3+ for 15% off!"}
              </p>
            </div>
          </div>

          {/* Drop Zone / Routine */}
          <div className="lg:col-span-8 fade-up">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h3
                className={`text-[1rem] sm:text-[1.1rem] font-semibold ${
                  isDark ? "text-[oklch(0.85_0.015_75)]" : "text-[oklch(0.30_0.03_55)]"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {activeTab === "morning" ? (
                  <Sun size={16} className="inline mr-2 text-[oklch(0.72_0.10_80)]" />
                ) : (
                  <Moon size={16} className="inline mr-2 text-[oklch(0.72_0.10_80)]" />
                )}
                Your {activeTab === "morning" ? "Morning" : "Evening"} Routine
              </h3>
              {currentRoutine.length > 0 && (
                <button
                  onClick={clearRoutine}
                  className={`text-[0.68rem] sm:text-[0.72rem] tracking-[0.1em] uppercase px-3 sm:px-4 py-1.5 rounded-full border transition-all duration-300 hover:bg-red-500/10 hover:border-red-400/40 ${
                    isDark
                      ? "border-[oklch(0.30_0.015_55)] text-[oklch(0.55_0.015_55)]"
                      : "border-[oklch(0.85_0.02_75)] text-[oklch(0.55_0.03_55)]"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                  aria-label="Clear routine"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Drop zone */}
            <div
              ref={dropZoneRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`min-h-[200px] sm:min-h-[280px] lg:min-h-[320px] rounded-2xl border-2 border-dashed p-3 sm:p-4 lg:p-6 transition-all duration-300 ${
                dragOverZone
                  ? "border-[oklch(0.72_0.10_80)] bg-[oklch(0.72_0.10_80/0.05)] scale-[1.01]"
                  : isDark
                  ? "border-[oklch(0.28_0.015_55)] bg-[oklch(0.18_0.015_55/0.5)]"
                  : "border-[oklch(0.88_0.02_75)] bg-[oklch(0.98_0.008_80/0.5)]"
              }`}
              role="region"
              aria-label={`${activeTab} routine drop zone`}
            >
              {sortedRoutine.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[160px] sm:min-h-[240px] lg:min-h-[280px] gap-3 sm:gap-4">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 border-dashed ${
                      isDark ? "border-[oklch(0.30_0.015_55)]" : "border-[oklch(0.85_0.02_75)]"
                    }`}
                  >
                    <ShoppingBag
                      size={isMobile ? 18 : 24}
                      className={isDark ? "text-[oklch(0.40_0.015_55)]" : "text-[oklch(0.70_0.03_55)]"}
                    />
                  </div>
                  <p
                    className={`text-[0.82rem] sm:text-[0.9rem] text-center px-4 ${
                      isDark ? "text-[oklch(0.45_0.015_55)]" : "text-[oklch(0.60_0.03_55)]"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {isMobile
                      ? "Tap products above to build your routine"
                      : "Drag products here to build your routine"}
                  </p>
                  <p
                    className={`text-[0.7rem] sm:text-[0.75rem] text-center ${
                      isDark ? "text-[oklch(0.35_0.015_55)]" : "text-[oklch(0.70_0.03_55)]"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {isMobile ? "Products auto-sort by application order" : "Or click a product to add it"}
                  </p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {sortedRoutine.map((product, index) => (
                    <div
                      key={product.id}
                      className={`flex items-center gap-2 sm:gap-4 p-2.5 sm:p-3 lg:p-4 rounded-xl border transition-all duration-300 ${
                        isDark
                          ? "bg-[oklch(0.20_0.015_55)] border-[oklch(0.28_0.015_55)]"
                          : "bg-white border-[oklch(0.90_0.02_75)]"
                      }`}
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      {/* Step number */}
                      <div
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 text-[0.65rem] sm:text-[0.7rem] font-semibold bg-[oklch(0.38_0.04_145)] text-[oklch(0.98_0.008_80)]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {index + 1}
                      </div>

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg object-cover shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <span
                          className={`hidden sm:block text-[0.65rem] tracking-[0.12em] uppercase ${
                            isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.60_0.03_55)]"
                          }`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {product.category}
                        </span>
                        <p
                          className={`text-[0.82rem] sm:text-[0.95rem] font-semibold truncate ${
                            isDark ? "text-[oklch(0.88_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"
                          }`}
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {product.name}
                        </p>
                        <p
                          className={`hidden sm:block text-[0.78rem] ${
                            isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.55_0.03_55)]"
                          }`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {product.description}
                        </p>
                      </div>

                      {/* Arrow to next step — hidden on mobile */}
                      {index < sortedRoutine.length - 1 && (
                        <ArrowRight
                          size={14}
                          className={`shrink-0 hidden lg:block ${
                            isDark ? "text-[oklch(0.40_0.015_55)]" : "text-[oklch(0.70_0.03_55)]"
                          }`}
                        />
                      )}

                      <span
                        className={`text-[0.8rem] sm:text-[0.9rem] font-semibold shrink-0 ${
                          isDark ? "text-[oklch(0.72_0.10_80)]" : "text-[oklch(0.50_0.05_145)]"
                        }`}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        ${product.price}
                      </span>

                      <button
                        onClick={() => removeProduct(product.id)}
                        className={`shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-red-500/10 ${
                          isDark ? "text-[oklch(0.50_0.015_55)]" : "text-[oklch(0.60_0.03_55)]"
                        }`}
                        aria-label={`Remove ${product.name} from routine`}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Summary */}
            {currentRoutine.length > 0 && (
              <div
                className={`mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl border transition-all duration-300 ${
                  isDark
                    ? "bg-[oklch(0.20_0.015_55)] border-[oklch(0.28_0.015_55)]"
                    : "bg-white border-[oklch(0.90_0.02_75)]"
                }`}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span
                    className={`text-[0.8rem] sm:text-[0.85rem] ${
                      isDark ? "text-[oklch(0.65_0.015_75)]" : "text-[oklch(0.50_0.03_55)]"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Subtotal ({currentRoutine.length} product{currentRoutine.length > 1 ? "s" : ""})
                  </span>
                  <span
                    className={`text-[0.85rem] sm:text-[0.9rem] ${
                      isDark ? "text-[oklch(0.75_0.015_75)]" : "text-[oklch(0.35_0.03_55)]"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    ${totalPrice.toFixed(0)}
                  </span>
                </div>

                {bundleDiscount > 0 && (
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span
                      className="text-[0.8rem] sm:text-[0.85rem] text-[oklch(0.50_0.05_145)]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Bundle Discount ({Math.round(bundleDiscount * 100)}% off)
                    </span>
                    <span
                      className="text-[0.85rem] sm:text-[0.9rem] font-semibold text-[oklch(0.50_0.05_145)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      -${savings.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="gold-divider w-full my-3 sm:my-4" />

                <div className="flex items-center justify-between">
                  <span
                    className={`text-[0.92rem] sm:text-[1rem] font-semibold ${
                      isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Total
                  </span>
                  <div className="text-right">
                    <span
                      className={`text-[1.15rem] sm:text-[1.3rem] font-semibold ${
                        isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      ${discountedPrice.toFixed(2)}
                    </span>
                    {bundleDiscount > 0 && (
                      <span
                        className={`block text-[0.7rem] line-through ${
                          isDark ? "text-[oklch(0.45_0.015_55)]" : "text-[oklch(0.65_0.03_55)]"
                        }`}
                      >
                        ${totalPrice.toFixed(0)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => toast.success("Routine added to cart! Redirecting to checkout...")}
                  className="w-full mt-4 sm:mt-5 py-3 sm:py-3.5 rounded-full text-[0.72rem] sm:text-[0.75rem] font-medium tracking-[0.15em] uppercase bg-[oklch(0.38_0.04_145)] text-[oklch(0.98_0.008_80)] hover:bg-[oklch(0.32_0.04_145)] transition-all duration-300"
                  style={{ fontFamily: "var(--font-body)" }}
                  aria-label="Add routine to cart"
                >
                  <ShoppingBag size={14} className="inline mr-2" />
                  Add Routine to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
