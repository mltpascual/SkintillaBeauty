/*
 * Skintilla Beauty — Botanical Atelier Design
 * Product Comparison: Side-by-side comparison of 2-3 products
 * Shows ingredients, price, skin type suitability, benefits, size
 * Floating "Compare" button + full-screen comparison modal
 * Dark mode aware
 */
import { useState, useCallback, useEffect, createContext, useContext } from "react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { X, Plus, ArrowLeftRight, Check, Minus, Star } from "lucide-react";
import { toast } from "sonner";

export interface ComparableProduct {
  name: string;
  category: string;
  price: string;
  priceValue: number;
  size: string;
  image: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  skinTypes: string[];
  rating: number;
  reviewCount: number;
}

// All products available for comparison
export const comparableProducts: ComparableProduct[] = [
  {
    name: "Radiance Serum",
    category: "Face Serum",
    price: "$68",
    priceValue: 68,
    size: "30ml / 1 fl oz",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=800&fit=crop&q=80",
    description: "Vitamin C & rosehip oil blend for luminous, even-toned skin",
    ingredients: ["Vitamin C", "Rosehip Oil", "Hyaluronic Acid", "Niacinamide", "Squalane", "Vitamin E"],
    benefits: ["Brightens complexion", "Evens skin tone", "Antioxidant shield", "Lightweight formula"],
    skinTypes: ["Normal", "Combination", "Oily", "Dull"],
    rating: 4.8,
    reviewCount: 142,
  },
  {
    name: "Velvet Moisturizer",
    category: "Face Cream",
    price: "$54",
    priceValue: 54,
    size: "50ml / 1.7 fl oz",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=800&fit=crop&q=80",
    description: "Rich shea butter & hyaluronic acid for deep, lasting hydration",
    ingredients: ["Shea Butter", "Hyaluronic Acid", "Jojoba Oil", "Ceramides", "Aloe Vera", "Green Tea"],
    benefits: ["72-hour hydration", "Barrier repair", "Silky-smooth finish", "Non-comedogenic"],
    skinTypes: ["Dry", "Normal", "Sensitive", "Mature"],
    rating: 4.9,
    reviewCount: 198,
  },
  {
    name: "Botanical Toner",
    category: "Face Toner",
    price: "$42",
    priceValue: 42,
    size: "120ml / 4 fl oz",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=800&fit=crop&q=80",
    description: "Chamomile & witch hazel to soothe, balance, and refine pores",
    ingredients: ["Chamomile", "Witch Hazel", "Rose Water", "Glycerin", "Centella Asiatica", "Lavender Oil"],
    benefits: ["Pore refinement", "pH balancing", "Soothing formula", "Prep for serums"],
    skinTypes: ["All", "Sensitive", "Combination", "Oily"],
    rating: 4.7,
    reviewCount: 116,
  },
  {
    name: "Eye Revival Cream",
    category: "Eye Care",
    price: "$58",
    priceValue: 58,
    size: "15ml / 0.5 fl oz",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=800&fit=crop&q=80",
    description: "Peptide-rich formula to brighten dark circles and firm delicate skin",
    ingredients: ["Peptide Complex", "Caffeine", "Vitamin K", "Retinol", "Cucumber Extract", "Argan Oil"],
    benefits: ["Reduces dark circles", "Firms eye area", "Minimizes fine lines", "De-puffs morning eyes"],
    skinTypes: ["All", "Mature", "Tired", "Sensitive"],
    rating: 4.6,
    reviewCount: 87,
  },
];

// Context for managing comparison state globally
interface CompareContextType {
  selected: ComparableProduct[];
  toggleProduct: (product: ComparableProduct) => void;
  isSelected: (name: string) => boolean;
  clearAll: () => void;
  openModal: () => void;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<ComparableProduct[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleProduct = useCallback((product: ComparableProduct) => {
    setSelected((prev) => {
      const exists = prev.find((p) => p.name === product.name);
      if (exists) {
        return prev.filter((p) => p.name !== product.name);
      }
      if (prev.length >= 3) {
        toast("Maximum 3 products can be compared at once", {
          description: "Remove a product first to add a new one.",
        });
        return prev;
      }
      return [...prev, product];
    });
  }, []);

  const isSelected = useCallback(
    (name: string) => selected.some((p) => p.name === name),
    [selected]
  );

  const clearAll = useCallback(() => setSelected([]), []);
  const openModal = useCallback(() => setModalOpen(true), []);

  return (
    <CompareContext.Provider value={{ selected, toggleProduct, isSelected, clearAll, openModal }}>
      {children}
      {/* Floating Compare Bar */}
      {selected.length > 0 && !modalOpen && (
        <CompareFloatingBar
          selected={selected}
          onCompare={() => setModalOpen(true)}
          onClear={clearAll}
          onRemove={(name) => setSelected((prev) => prev.filter((p) => p.name !== name))}
        />
      )}
      {/* Comparison Modal */}
      {modalOpen && (
        <ComparisonModal
          products={selected}
          onClose={() => setModalOpen(false)}
          onRemove={(name) => setSelected((prev) => prev.filter((p) => p.name !== name))}
          onAddSlot={() => setModalOpen(false)}
        />
      )}
    </CompareContext.Provider>
  );
}

/* ─── Floating Compare Bar ─── */
function CompareFloatingBar({
  selected,
  onCompare,
  onClear,
  onRemove,
}: {
  selected: ComparableProduct[];
  onCompare: () => void;
  onClear: () => void;
  onRemove: (name: string) => void;
}) {
  const { isDark } = useDarkMode();

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-full shadow-2xl backdrop-blur-xl border transition-all duration-500 animate-in slide-in-from-bottom-4"
      style={{
        background: isDark ? "oklch(0.18 0.015 55 / 0.95)" : "oklch(0.99 0.005 80 / 0.95)",
        borderColor: isDark ? "oklch(0.30 0.02 55)" : "oklch(0.88 0.02 80)",
      }}
    >
      <ArrowLeftRight
        size={18}
        className="shrink-0"
        style={{ color: "oklch(0.50 0.05 145)" }}
      />

      {/* Product thumbnails */}
      <div className="flex items-center gap-2">
        {selected.map((p) => (
          <div key={p.name} className="relative group/thumb">
            <img
              src={p.image}
              alt={p.name}
              className="w-10 h-10 rounded-full object-cover border-2 transition-transform duration-200 group-hover/thumb:scale-110"
              style={{
                borderColor: "oklch(0.72 0.10 80)",
              }}
            />
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(p.name); }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200"
              style={{
                background: "oklch(0.55 0.20 27)",
                color: "white",
              }}
              aria-label={`Remove ${p.name} from comparison`}
            >
              <X size={10} />
            </button>
          </div>
        ))}
        {selected.length < 3 && (
          <div
            className="w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center"
            style={{
              borderColor: isDark ? "oklch(0.40 0.02 55)" : "oklch(0.80 0.02 80)",
              color: isDark ? "oklch(0.50 0.02 55)" : "oklch(0.60 0.02 80)",
            }}
          >
            <Plus size={14} />
          </div>
        )}
      </div>

      {/* Compare button */}
      <button
        onClick={onCompare}
        disabled={selected.length < 2}
        className="px-5 py-2 rounded-full text-[0.7rem] font-medium tracking-[0.15em] uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          fontFamily: "var(--font-body)",
          background: selected.length >= 2 ? "oklch(0.38 0.04 145)" : isDark ? "oklch(0.30 0.02 55)" : "oklch(0.85 0.02 80)",
          color: selected.length >= 2 ? "oklch(0.98 0.008 80)" : isDark ? "oklch(0.50 0.02 55)" : "oklch(0.60 0.02 80)",
        }}
      >
        Compare ({selected.length})
      </button>

      {/* Clear button */}
      <button
        onClick={onClear}
        className="p-1.5 rounded-full transition-colors duration-200 hover:bg-[oklch(0.55_0.20_27/0.1)]"
        style={{ color: isDark ? "oklch(0.50 0.02 55)" : "oklch(0.60 0.02 80)" }}
        aria-label="Clear comparison"
      >
        <X size={16} />
      </button>
    </div>
  );
}

/* ─── Comparison Modal ─── */
function ComparisonModal({
  products,
  onClose,
  onRemove,
  onAddSlot,
}: {
  products: ComparableProduct[];
  onClose: () => void;
  onRemove: (name: string) => void;
  onAddSlot: () => void;
}) {
  const { isDark } = useDarkMode();

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Collect all unique ingredients
  const allIngredients = Array.from(
    new Set(products.flatMap((p) => p.ingredients))
  ).sort();

  // Collect all unique benefits
  const allBenefits = Array.from(
    new Set(products.flatMap((p) => p.benefits))
  ).sort();

  // Collect all unique skin types
  const allSkinTypes = Array.from(
    new Set(products.flatMap((p) => p.skinTypes))
  ).sort();

  // Find best value (lowest price per ml)
  const pricePerMl = products.map((p) => {
    const ml = parseInt(p.size.match(/\d+/)?.[0] || "1");
    return { name: p.name, ppm: p.priceValue / ml };
  });
  const bestValue = pricePerMl.reduce((a, b) => (a.ppm < b.ppm ? a : b)).name;

  // Find highest rated
  const highestRated = products.reduce((a, b) => (a.rating > b.rating ? a : b)).name;

  const bgMain = isDark ? "oklch(0.14 0.01 55)" : "oklch(0.98 0.008 80)";
  const bgCard = isDark ? "oklch(0.18 0.015 55)" : "oklch(0.96 0.015 80)";
  const textPrimary = isDark ? "oklch(0.90 0.015 75)" : "oklch(0.25 0.03 55)";
  const textSecondary = isDark ? "oklch(0.55 0.015 55)" : "oklch(0.50 0.03 55)";
  const borderColor = isDark ? "oklch(0.25 0.015 55)" : "oklch(0.90 0.02 80)";
  const olive = "oklch(0.38 0.04 145)";
  const gold = "oklch(0.72 0.10 80)";

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div
        className="relative w-full max-w-5xl mx-4 my-8 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300"
        style={{ background: bgMain }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-8 py-5 border-b backdrop-blur-xl"
          style={{
            background: isDark ? "oklch(0.14 0.01 55 / 0.95)" : "oklch(0.98 0.008 80 / 0.95)",
            borderColor,
          }}
        >
          <div>
            <h2
              className="text-[1.5rem] sm:text-[1.8rem] font-semibold"
              style={{ fontFamily: "var(--font-display)", color: textPrimary }}
            >
              Compare <em style={{ color: olive }}>Products</em>
            </h2>
            <p
              className="text-[0.8rem] mt-1"
              style={{ fontFamily: "var(--font-body)", color: textSecondary }}
            >
              Side-by-side comparison of {products.length} products
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors duration-200 hover:bg-[oklch(0.50_0.03_55/0.1)]"
            style={{ color: textSecondary }}
            aria-label="Close comparison"
          >
            <X size={22} />
          </button>
        </div>

        {/* Product Cards Header */}
        <div className="px-6 sm:px-8 pt-6">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}
          >
            {products.map((p) => (
              <div
                key={p.name}
                className="relative rounded-xl p-4 text-center border transition-all duration-300"
                style={{ background: bgCard, borderColor }}
              >
                {/* Badges */}
                <div className="flex justify-center gap-1.5 mb-3 min-h-[24px]">
                  {p.name === bestValue && (
                    <span
                      className="text-[0.55rem] font-medium tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
                      style={{
                        fontFamily: "var(--font-body)",
                        background: "oklch(0.50 0.05 145 / 0.15)",
                        color: olive,
                      }}
                    >
                      Best Value
                    </span>
                  )}
                  {p.name === highestRated && (
                    <span
                      className="text-[0.55rem] font-medium tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
                      style={{
                        fontFamily: "var(--font-body)",
                        background: "oklch(0.72 0.10 80 / 0.15)",
                        color: gold,
                      }}
                    >
                      Top Rated
                    </span>
                  )}
                </div>

                <img
                  src={p.image}
                  alt={p.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover mx-auto mb-3"
                />
                <p
                  className="text-[0.6rem] font-medium tracking-[0.15em] uppercase mb-1"
                  style={{ fontFamily: "var(--font-body)", color: gold }}
                >
                  {p.category}
                </p>
                <h3
                  className="text-[1rem] sm:text-[1.15rem] font-semibold mb-1"
                  style={{ fontFamily: "var(--font-display)", color: textPrimary }}
                >
                  {p.name}
                </h3>
                <p
                  className="text-[1.2rem] font-medium mb-1"
                  style={{ fontFamily: "var(--font-display)", color: olive }}
                >
                  {p.price}
                </p>
                <p
                  className="text-[0.7rem]"
                  style={{ fontFamily: "var(--font-body)", color: textSecondary }}
                >
                  {p.size}
                </p>

                {/* Remove button */}
                <button
                  onClick={() => onRemove(p.name)}
                  className="absolute top-2 right-2 p-1 rounded-full transition-colors duration-200 hover:bg-[oklch(0.55_0.20_27/0.1)]"
                  style={{ color: textSecondary }}
                  aria-label={`Remove ${p.name}`}
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            {/* Add product slot */}
            {products.length < 3 && (
              <button
                onClick={onAddSlot}
                className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 py-8 transition-all duration-300 hover:border-[oklch(0.72_0.10_80)]"
                style={{
                  borderColor: isDark ? "oklch(0.30 0.02 55)" : "oklch(0.85 0.02 80)",
                  color: textSecondary,
                }}
              >
                <Plus size={24} />
                <span
                  className="text-[0.7rem] font-medium tracking-[0.1em] uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Add Product
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="px-6 sm:px-8 py-6 space-y-1">
          {/* Rating Row */}
          <CompareRow label="Rating" isDark={isDark} borderColor={borderColor}>
            {products.map((p) => (
              <div key={p.name} className="flex items-center justify-center gap-1.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={13}
                      fill={star <= Math.round(p.rating) ? "oklch(0.72 0.10 80)" : "none"}
                      stroke={star <= Math.round(p.rating) ? "oklch(0.72 0.10 80)" : isDark ? "oklch(0.40 0.02 55)" : "oklch(0.80 0.02 80)"}
                    />
                  ))}
                </div>
                <span
                  className="text-[0.75rem] font-medium"
                  style={{ fontFamily: "var(--font-body)", color: textPrimary }}
                >
                  {p.rating}
                </span>
                <span
                  className="text-[0.65rem]"
                  style={{ fontFamily: "var(--font-body)", color: textSecondary }}
                >
                  ({p.reviewCount})
                </span>
              </div>
            ))}
          </CompareRow>

          {/* Price per ml */}
          <CompareRow label="Value (per ml)" isDark={isDark} borderColor={borderColor}>
            {products.map((p) => {
              const ml = parseInt(p.size.match(/\d+/)?.[0] || "1");
              const ppm = (p.priceValue / ml).toFixed(2);
              return (
                <span
                  key={p.name}
                  className="text-[0.8rem] font-medium"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: p.name === bestValue ? olive : textPrimary,
                  }}
                >
                  ${ppm}/ml
                  {p.name === bestValue && (
                    <span className="ml-1 text-[0.6rem]">✦</span>
                  )}
                </span>
              );
            })}
          </CompareRow>

          {/* Skin Types */}
          <div className="pt-4">
            <h4
              className="text-[0.65rem] font-medium tracking-[0.2em] uppercase mb-3 px-2"
              style={{ fontFamily: "var(--font-body)", color: gold }}
            >
              Skin Type Suitability
            </h4>
          </div>
          {allSkinTypes.map((type) => (
            <CompareRow key={type} label={type} isDark={isDark} borderColor={borderColor}>
              {products.map((p) => (
                <span key={p.name}>
                  {p.skinTypes.includes(type) ? (
                    <Check size={16} style={{ color: olive }} />
                  ) : (
                    <Minus size={16} style={{ color: isDark ? "oklch(0.35 0.01 55)" : "oklch(0.82 0.01 80)" }} />
                  )}
                </span>
              ))}
            </CompareRow>
          ))}

          {/* Benefits */}
          <div className="pt-4">
            <h4
              className="text-[0.65rem] font-medium tracking-[0.2em] uppercase mb-3 px-2"
              style={{ fontFamily: "var(--font-body)", color: gold }}
            >
              Key Benefits
            </h4>
          </div>
          {allBenefits.map((benefit) => (
            <CompareRow key={benefit} label={benefit} isDark={isDark} borderColor={borderColor}>
              {products.map((p) => (
                <span key={p.name}>
                  {p.benefits.includes(benefit) ? (
                    <Check size={16} style={{ color: olive }} />
                  ) : (
                    <Minus size={16} style={{ color: isDark ? "oklch(0.35 0.01 55)" : "oklch(0.82 0.01 80)" }} />
                  )}
                </span>
              ))}
            </CompareRow>
          ))}

          {/* Ingredients */}
          <div className="pt-4">
            <h4
              className="text-[0.65rem] font-medium tracking-[0.2em] uppercase mb-3 px-2"
              style={{ fontFamily: "var(--font-body)", color: gold }}
            >
              Key Ingredients
            </h4>
          </div>
          {allIngredients.map((ingredient) => (
            <CompareRow key={ingredient} label={ingredient} isDark={isDark} borderColor={borderColor}>
              {products.map((p) => (
                <span key={p.name}>
                  {p.ingredients.includes(ingredient) ? (
                    <Check size={16} style={{ color: olive }} />
                  ) : (
                    <Minus size={16} style={{ color: isDark ? "oklch(0.35 0.01 55)" : "oklch(0.82 0.01 80)" }} />
                  )}
                </span>
              ))}
            </CompareRow>
          ))}
        </div>

        {/* Footer CTA */}
        <div
          className="sticky bottom-0 px-6 sm:px-8 py-4 border-t backdrop-blur-xl"
          style={{
            background: isDark ? "oklch(0.14 0.01 55 / 0.95)" : "oklch(0.98 0.008 80 / 0.95)",
            borderColor,
          }}
        >
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}
          >
            {products.map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  toast(`${p.name} added to cart`, {
                    description: `${p.price} · ${p.size}`,
                  });
                }}
                className="w-full py-2.5 rounded-full text-[0.7rem] font-medium tracking-[0.15em] uppercase transition-all duration-300 hover:opacity-90"
                style={{
                  fontFamily: "var(--font-body)",
                  background: olive,
                  color: "oklch(0.98 0.008 80)",
                }}
              >
                Add to Cart
              </button>
            ))}
            {products.length < 3 && <div />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Compare Row ─── */
function CompareRow({
  label,
  children,
  isDark,
  borderColor,
}: {
  label: string;
  children: React.ReactNode[];
  isDark: boolean;
  borderColor: string;
}) {
  const textPrimary = isDark ? "oklch(0.90 0.015 75)" : "oklch(0.25 0.03 55)";
  const textSecondary = isDark ? "oklch(0.55 0.015 55)" : "oklch(0.50 0.03 55)";
  const bgAlt = isDark ? "oklch(0.16 0.012 55 / 0.5)" : "oklch(0.97 0.01 80 / 0.5)";

  return (
    <div
      className="grid items-center gap-4 py-2.5 px-3 rounded-lg transition-colors duration-200 hover:bg-[oklch(0.50_0.03_55/0.04)]"
      style={{
        gridTemplateColumns: `140px repeat(${children.length}, 1fr)`,
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      <span
        className="text-[0.75rem] font-medium truncate"
        style={{ fontFamily: "var(--font-body)", color: textSecondary }}
      >
        {label}
      </span>
      {children.map((child, i) => (
        <div key={i} className="flex justify-center">
          {child}
        </div>
      ))}
    </div>
  );
}

/* ─── Compare Button for Product Cards ─── */
export function CompareCheckbox({ product }: { product: ComparableProduct }) {
  const { isSelected, toggleProduct } = useCompare();
  const { isDark } = useDarkMode();
  const selected = isSelected(product.name);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleProduct(product);
      }}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.6rem] font-medium tracking-[0.1em] uppercase transition-all duration-300 border ${
        selected
          ? "border-[oklch(0.38_0.04_145)] bg-[oklch(0.38_0.04_145/0.1)]"
          : isDark
            ? "border-[oklch(0.30_0.02_55)] bg-[oklch(0.18_0.015_55/0.8)] hover:border-[oklch(0.40_0.02_55)]"
            : "border-[oklch(0.88_0.02_80)] bg-[oklch(0.98_0.008_80/0.8)] hover:border-[oklch(0.72_0.10_80)]"
      }`}
      style={{ fontFamily: "var(--font-body)" }}
      aria-label={selected ? `Remove ${product.name} from comparison` : `Add ${product.name} to comparison`}
    >
      <ArrowLeftRight
        size={11}
        style={{ color: selected ? "oklch(0.38 0.04 145)" : isDark ? "oklch(0.50 0.02 55)" : "oklch(0.60 0.02 80)" }}
      />
      <span
        style={{ color: selected ? "oklch(0.38 0.04 145)" : isDark ? "oklch(0.60 0.02 55)" : "oklch(0.50 0.03 55)" }}
      >
        {selected ? "Comparing" : "Compare"}
      </span>
    </button>
  );
}
