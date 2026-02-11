/*
 * Skintilla Beauty — Botanical Atelier Design
 * Products: Asymmetric grid of product cards with hover reveals
 * Gold dividers, editorial typography, warm palette
 */
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";

const PRODUCT_IMAGE =
  "https://private-us-east-1.manuscdn.com/sessionFile/3ocyoQdcxp9Sw7E1buR1nN/sandbox/AYB0LnWgHFt76y2h1QDWTu-img-2_1770802535000_na1fn_cHJvZHVjdC1jb2xsZWN0aW9u.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvM29jeW9RZGN4cDlTdzdFMWJ1UjFuTi9zYW5kYm94L0FZQjBMbldnSEZ0NzZ5MmgxUURXVHUtaW1nLTJfMTc3MDgwMjUzNTAwMF9uYTFmbl9jSEp2WkhWamRDMWpiMnhzWldOMGFXOXUuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=cKPfrKtJGK0XG9WglSaJ-uYoUWSR2zYq6D6a76L0hNbf9yJXto9Ct1xpoc7Lj35E7FWLmUnrozRRFlbM-drdq1PfXKfZccnK99Xwoo89pDg~gBRHfqhy5nIkWMUmyf1ooNSObB5XST2TvJQmFuWzN1iRyybyf7gSnQOPUNifwBZwuvGy8dT91ndTCpub1UEUGVXfqe4Sc1LLRnjgFpWfFCCLUyKCdfq7ZCyqRsBUwAb-2ToPDXHaGaHdaQ32oZ4Zo3sqriKXUarrfn1zfbFB8j3-EraYRbffSkWQO8jEdbBGgQCq8a17CPakp2d6K64Mc2dX4L4cuAE-ysfKLgiO~Q__";

const products = [
  {
    name: "Radiance Serum",
    category: "Face Serum",
    description: "Vitamin C & rosehip oil blend for luminous, even-toned skin",
    price: "$68",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=800&fit=crop&q=80",
  },
  {
    name: "Velvet Moisturizer",
    category: "Face Cream",
    description: "Rich shea butter & hyaluronic acid for deep, lasting hydration",
    price: "$54",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=800&fit=crop&q=80",
  },
  {
    name: "Botanical Toner",
    category: "Face Toner",
    description: "Chamomile & witch hazel to soothe, balance, and refine pores",
    price: "$42",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=800&fit=crop&q=80",
  },
  {
    name: "Eye Revival Cream",
    category: "Eye Care",
    description: "Peptide-rich formula to brighten dark circles and firm delicate skin",
    price: "$58",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=800&fit=crop&q=80",
  },
];

export default function ProductsSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-24 lg:py-36"
      style={{ background: "oklch(0.96 0.015 80)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 lg:mb-20">
          <div className="stagger-children">
            <div className="fade-up flex items-center gap-6 mb-6">
              <div className="gold-divider w-[80px]" />
              <span
                className="text-[0.7rem] font-medium tracking-[0.25em] uppercase text-[oklch(0.72_0.10_80)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                The Collection
              </span>
            </div>
            <h2
              className="fade-up text-[clamp(2rem,4vw,3.2rem)] leading-[1.15] font-semibold text-[oklch(0.25_0.03_55)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Signature{" "}
              <em className="font-normal italic text-[oklch(0.50_0.05_145)]">
                Products
              </em>
            </h2>
          </div>
          <p
            className="fade-up mt-4 lg:mt-0 text-[0.95rem] leading-[1.7] text-[oklch(0.50_0.03_55)] max-w-md font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Each formulation is a carefully balanced blend of botanical extracts
            and cutting-edge skincare science.
          </p>
        </div>

        {/* Featured product image + grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Large featured image */}
          <div className="lg:col-span-5 fade-up">
            <div className="relative group overflow-hidden">
              <img
                src={PRODUCT_IMAGE}
                alt="Skintilla Beauty product collection on stone pedestal"
                className="w-full h-[400px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.25_0.03_55/0.4)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p
                  className="text-[oklch(0.98_0.008_80)] text-[0.75rem] tracking-[0.15em] uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  The Complete Collection
                </p>
              </div>
            </div>
          </div>

          {/* Product cards grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 stagger-children">
            {products.map((product) => (
              <div
                key={product.name}
                className="fade-up group cursor-pointer"
                onClick={() => toast("Shop coming soon! Stay tuned.")}
              >
                <div className="relative overflow-hidden mb-4 bg-[oklch(0.93_0.02_75)]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[240px] lg:h-[260px] object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[oklch(0.38_0.04_145/0.08)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <p
                      className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[oklch(0.72_0.10_80)] mb-1"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {product.category}
                    </p>
                    <h3
                      className="text-[1.3rem] font-semibold text-[oklch(0.25_0.03_55)] group-hover:text-[oklch(0.38_0.04_145)] transition-colors duration-300"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-[0.85rem] text-[oklch(0.50_0.03_55)] mt-1 font-light leading-[1.6]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {product.description}
                    </p>
                  </div>
                  <span
                    className="text-[1.1rem] font-medium text-[oklch(0.38_0.04_145)] shrink-0 ml-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {product.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
