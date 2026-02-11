/*
 * Skintilla Beauty — Botanical Atelier Design
 * RecentlyViewed: Persistent bottom strip showing products the user has clicked
 * Slides up from the bottom, horizontally scrollable, dismissible
 * Uses localStorage to persist across page reloads
 */
import { useState, useEffect, useCallback } from "react";
import { X, ChevronRight, Clock } from "lucide-react";

export interface RecentProduct {
  name: string;
  category: string;
  price: string;
  image: string;
}

// Global event system for recently viewed products
const RECENTLY_VIEWED_KEY = "skintilla_recently_viewed";
const RECENTLY_VIEWED_EVENT = "skintilla:recently-viewed";
const MAX_ITEMS = 6;

export function addRecentlyViewed(product: RecentProduct) {
  try {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    let items: RecentProduct[] = stored ? JSON.parse(stored) : [];

    // Remove duplicate if exists
    items = items.filter((p) => p.name !== product.name);

    // Add to front
    items.unshift(product);

    // Limit to MAX_ITEMS
    items = items.slice(0, MAX_ITEMS);

    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(items));

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent(RECENTLY_VIEWED_EVENT));
  } catch {
    // localStorage not available
  }
}

export default function RecentlyViewed() {
  const [items, setItems] = useState<RecentProduct[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const loadItems = useCallback(() => {
    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    loadItems();
    window.addEventListener(RECENTLY_VIEWED_EVENT, loadItems);
    return () => window.removeEventListener(RECENTLY_VIEWED_EVENT, loadItems);
  }, [loadItems]);

  // Don't render if no items or dismissed
  if (items.length === 0 || !isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isExpanded ? "translate-y-0" : "translate-y-[calc(100%-44px)]"
      }`}
    >
      {/* Toggle bar — uses a div with two separate interactive children to avoid nested buttons */}
      <div
        className="w-full flex items-center justify-between px-6 lg:px-10 h-11 bg-[oklch(0.25_0.03_55)] border-t border-[oklch(0.72_0.10_80/0.2)] hover:bg-[oklch(0.28_0.03_55)] transition-colors duration-200 cursor-pointer"
        onClick={() => setIsExpanded((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded((prev) => !prev);
          }
        }}
        aria-label={isExpanded ? "Collapse recently viewed" : "Expand recently viewed"}
      >
        <div className="flex items-center gap-2.5">
          <Clock className="w-3.5 h-3.5 text-[oklch(0.72_0.10_80)]" />
          <span
            className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-[oklch(0.85_0.01_80)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Recently Viewed ({items.length})
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ChevronRight
            className={`w-3.5 h-3.5 text-[oklch(0.72_0.10_80)] transition-transform duration-300 ${
              isExpanded ? "rotate-90" : "-rotate-90"
            }`}
          />
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                e.preventDefault();
                setIsVisible(false);
              }
            }}
            className="text-[oklch(0.60_0.03_55)] hover:text-[oklch(0.85_0.01_80)] transition-colors duration-200 cursor-pointer"
            aria-label="Dismiss recently viewed"
          >
            <X className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Product strip */}
      <div className="bg-[oklch(0.22_0.03_55)] border-t border-[oklch(0.72_0.10_80/0.1)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
            {items.map((product) => (
              <a
                key={product.name}
                href="#products"
                className="group flex items-center gap-3 shrink-0 bg-[oklch(0.28_0.03_55)] rounded-xl p-2.5 pr-5 hover:bg-[oklch(0.32_0.03_55)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p
                    className="text-[0.6rem] font-medium tracking-[0.15em] uppercase text-[oklch(0.72_0.10_80)] mb-0.5 truncate"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {product.category}
                  </p>
                  <p
                    className="text-[0.85rem] font-semibold text-[oklch(0.90_0.01_80)] truncate group-hover:text-[oklch(0.72_0.10_80)] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {product.name}
                  </p>
                  <p
                    className="text-[0.75rem] text-[oklch(0.60_0.03_55)]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {product.price}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
