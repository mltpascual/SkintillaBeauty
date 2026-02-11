/**
 * ProductDetailModal — Botanical Atelier Design
 * Full-detail modal with ingredients, usage, reviews.
 * Uses Radix Dialog for accessibility.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Star, Droplets, Leaf, Clock, X } from "lucide-react";

export interface ProductData {
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  ingredients: string[];
  usage: string[];
  reviews: { name: string; rating: number; text: string; date: string }[];
  benefits: string[];
  size: string;
}

interface Props {
  product: ProductData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TABS = ["Overview", "Ingredients", "How to Use", "Reviews"] as const;
type Tab = (typeof TABS)[number];

export default function ProductDetailModal({
  product,
  open,
  onOpenChange,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  if (!product) return null;

  const avgRating =
    product.reviews.reduce((s, r) => s + r.rating, 0) /
    (product.reviews.length || 1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-none bg-[oklch(0.97_0.008_80)] max-h-[90vh] overflow-y-auto">
        {/* Hidden accessible title */}
        <DialogTitle className="sr-only">{product.name} Details</DialogTitle>
        <DialogDescription className="sr-only">
          View details, ingredients, usage, and reviews for {product.name}
        </DialogDescription>

        {/* Hero area */}
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative h-[300px] md:h-full min-h-[400px]">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.20_0.03_55/0.3)] to-transparent md:bg-gradient-to-r md:from-transparent md:to-[oklch(0.97_0.008_80/0.15)]" />
            {/* Category badge */}
            <div className="absolute top-5 left-5">
              <span
                className="inline-block px-3 py-1 text-[0.6rem] font-medium tracking-[0.2em] uppercase bg-[oklch(0.97_0.008_80/0.9)] text-[oklch(0.38_0.04_145)] backdrop-blur-sm"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {product.category}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-8 md:p-10 flex flex-col">
            <div className="mb-6">
              <h2
                className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold text-[oklch(0.25_0.03_55)] leading-tight mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {product.name}
              </h2>
              <p
                className="text-[0.9rem] text-[oklch(0.50_0.03_55)] leading-relaxed font-light mb-4"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {product.description}
              </p>

              {/* Rating + price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i <= Math.round(avgRating)
                            ? "fill-[oklch(0.72_0.10_80)] text-[oklch(0.72_0.10_80)]"
                            : "text-[oklch(0.85_0.02_80)]"
                        }`}
                      />
                    ))}
                  </div>
                  <span
                    className="text-[0.75rem] text-[oklch(0.55_0.03_55)]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    ({product.reviews.length} reviews)
                  </span>
                </div>
                <span
                  className="text-[1.5rem] font-semibold text-[oklch(0.38_0.04_145)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {product.price}
                </span>
              </div>
            </div>

            {/* Size */}
            <p
              className="text-[0.75rem] text-[oklch(0.55_0.03_55)] tracking-wide mb-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {product.size}
            </p>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-[oklch(0.88_0.02_80)] mb-6">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2.5 text-[0.7rem] tracking-[0.12em] uppercase transition-colors duration-300 relative ${
                    activeTab === tab
                      ? "text-[oklch(0.38_0.04_145)]"
                      : "text-[oklch(0.55_0.03_55)] hover:text-[oklch(0.38_0.04_145)]"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="modal-tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[oklch(0.72_0.10_80)]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex-1"
              >
                {activeTab === "Overview" && (
                  <div className="space-y-4">
                    <p
                      className="text-[0.85rem] text-[oklch(0.45_0.03_55)] leading-relaxed font-light"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {product.description}. Crafted with intention, this
                      formulation combines the finest botanical extracts with
                      cutting-edge skincare science for visible results.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {product.benefits.map((benefit, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-3 bg-[oklch(0.94_0.015_80)] rounded-sm"
                        >
                          <Leaf className="h-3.5 w-3.5 text-[oklch(0.50_0.05_145)] shrink-0" />
                          <span
                            className="text-[0.75rem] text-[oklch(0.40_0.03_55)]"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Ingredients" && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Droplets className="h-4 w-4 text-[oklch(0.50_0.05_145)]" />
                      <span
                        className="text-[0.7rem] tracking-[0.15em] uppercase text-[oklch(0.50_0.05_145)] font-medium"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Key Ingredients
                      </span>
                    </div>
                    <div className="space-y-2">
                      {product.ingredients.map((ing, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 py-2 border-b border-[oklch(0.92_0.01_80)] last:border-0"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.10_80)] shrink-0" />
                          <span
                            className="text-[0.82rem] text-[oklch(0.40_0.03_55)] font-light"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {ing}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "How to Use" && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-4 w-4 text-[oklch(0.50_0.05_145)]" />
                      <span
                        className="text-[0.7rem] tracking-[0.15em] uppercase text-[oklch(0.50_0.05_145)] font-medium"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Application Steps
                      </span>
                    </div>
                    <div className="space-y-4">
                      {product.usage.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <span
                            className="text-[1.4rem] font-light text-[oklch(0.80_0.08_80)] leading-none mt-0.5"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p
                            className="text-[0.82rem] text-[oklch(0.40_0.03_55)] font-light leading-relaxed"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Reviews" && (
                  <div className="space-y-5">
                    {product.reviews.map((review, i) => (
                      <div
                        key={i}
                        className="pb-4 border-b border-[oklch(0.92_0.01_80)] last:border-0"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-[oklch(0.38_0.04_145)] flex items-center justify-center">
                              <span
                                className="text-[0.6rem] font-medium text-[oklch(0.97_0.008_80)]"
                                style={{ fontFamily: "var(--font-body)" }}
                              >
                                {review.name.charAt(0)}
                              </span>
                            </div>
                            <span
                              className="text-[0.8rem] font-medium text-[oklch(0.30_0.03_55)]"
                              style={{ fontFamily: "var(--font-body)" }}
                            >
                              {review.name}
                            </span>
                          </div>
                          <span
                            className="text-[0.7rem] text-[oklch(0.65_0.02_55)]"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {review.date}
                          </span>
                        </div>
                        <div className="flex gap-0.5 mb-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`h-3 w-3 ${
                                s <= review.rating
                                  ? "fill-[oklch(0.72_0.10_80)] text-[oklch(0.72_0.10_80)]"
                                  : "text-[oklch(0.85_0.02_80)]"
                              }`}
                            />
                          ))}
                        </div>
                        <p
                          className="text-[0.8rem] text-[oklch(0.45_0.03_55)] font-light leading-relaxed"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {review.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <button
              onClick={() => onOpenChange(false)}
              className="mt-6 w-full py-3.5 text-[0.7rem] font-medium tracking-[0.2em] uppercase transition-all duration-300 bg-[oklch(0.38_0.04_145)] text-[oklch(0.97_0.008_80)] hover:bg-[oklch(0.32_0.04_145)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
