/*
 * Skintilla Beauty — Botanical Atelier Design
 * Products: Asymmetric grid of product cards with video hover reveals
 * Gold dividers, editorial typography, warm palette
 * Video clips play on hover, replacing static image zoom
 */
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ProductDetailModal, {
  type ProductData,
} from "@/components/ProductDetailModal";
import ProductVideoHover from "@/components/ProductVideoHover";
import { addRecentlyViewed } from "@/components/RecentlyViewed";

const PRODUCT_IMAGE =
  "https://private-us-east-1.manuscdn.com/sessionFile/3ocyoQdcxp9Sw7E1buR1nN/sandbox/AYB0LnWgHFt76y2h1QDWTu-img-2_1770802535000_na1fn_cHJvZHVjdC1jb2xsZWN0aW9u.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvM29jeW9RZGN4cDlTdzdFMWJ1UjFuTi9zYW5kYm94L0FZQjBMbldnSEZ0NzZ5MmgxUURXVHUtaW1nLTJfMTc3MDgwMjUzNTAwMF9uYTFmbl9jSEp2WkhWamRDMWpiMnhzWldOMGFXOXUuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=cKPfrKtJGK0XG9WglSaJ-uYoUWSR2zYq6D6a76L0hNbf9yJXto9Ct1xpoc7Lj35E7FWLmUnrozRRFlbM-drdq1PfXKfZccnK99Xwoo89pDg~gBRHfqhy5nIkWMUmyf1ooNSObB5XST2TvJQmFuWzN1iRyybyf7gSnQOPUNifwBZwuvGy8dT91ndTCpub1UEUGVXfqe4Sc1LLRnjgFpWfFCCLUyKCdfq7ZCyqRsBUwAb-2ToPDXHaGaHdaQ32oZ4Zo3sqriKXUarrfn1zfbFB8j3-EraYRbffSkWQO8jEdbBGgQCq8a17CPakp2d6K64Mc2dX4L4cuAE-ysfKLgiO~Q__";

const products: (ProductData & { videoSrc: string })[] = [
  {
    name: "Radiance Serum",
    category: "Face Serum",
    description:
      "Vitamin C & rosehip oil blend for luminous, even-toned skin",
    price: "$68",
    size: "30ml / 1 fl oz",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=800&fit=crop&q=80",
    videoSrc:
      "https://videos.pexels.com/video-files/7305132/7305132-sd_960_506_25fps.mp4",
    ingredients: [
      "Vitamin C (L-Ascorbic Acid) — Brightens and evens skin tone",
      "Rosehip Seed Oil — Rich in retinoids and essential fatty acids",
      "Hyaluronic Acid — Deep hydration and plumping",
      "Niacinamide — Minimizes pores and strengthens barrier",
      "Squalane — Lightweight moisture lock",
      "Vitamin E — Antioxidant protection",
    ],
    usage: [
      "Cleanse and tone your face. Pat skin until slightly damp.",
      "Dispense 3–4 drops of serum onto fingertips.",
      "Gently press and pat onto face and neck, avoiding the eye area.",
      "Allow 30 seconds to absorb, then follow with moisturizer.",
      "Use morning and evening for best results.",
    ],
    benefits: [
      "Brightens complexion",
      "Evens skin tone",
      "Antioxidant shield",
      "Lightweight formula",
    ],
    reviews: [
      {
        name: "Sarah M.",
        rating: 5,
        text: "My skin has never looked this radiant. After two weeks, my dark spots started fading noticeably.",
        date: "Jan 2026",
      },
      {
        name: "Priya K.",
        rating: 5,
        text: "Absorbs beautifully without any sticky residue. My makeup glides on so much better now.",
        date: "Dec 2025",
      },
      {
        name: "Emma L.",
        rating: 4,
        text: "Love the glow it gives. Took about a month to see real results, but worth the wait.",
        date: "Nov 2025",
      },
    ],
  },
  {
    name: "Velvet Moisturizer",
    category: "Face Cream",
    description:
      "Rich shea butter & hyaluronic acid for deep, lasting hydration",
    price: "$54",
    size: "50ml / 1.7 fl oz",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=800&fit=crop&q=80",
    videoSrc:
      "https://videos.pexels.com/video-files/6664395/6664395-sd_960_464_30fps.mp4",
    ingredients: [
      "Shea Butter — Intense nourishment and softening",
      "Hyaluronic Acid — Multi-layer hydration",
      "Jojoba Oil — Balances natural oil production",
      "Ceramides — Restores and protects skin barrier",
      "Aloe Vera — Soothes and calms irritation",
      "Green Tea Extract — Antioxidant defense",
    ],
    usage: [
      "After cleansing and applying serum, take a pearl-sized amount.",
      "Warm between fingertips for 5 seconds.",
      "Press gently onto face and neck in upward motions.",
      "Pay extra attention to dry areas around cheeks and forehead.",
      "Use morning and evening. Layer under SPF in the morning.",
    ],
    benefits: [
      "72-hour hydration",
      "Barrier repair",
      "Silky-smooth finish",
      "Non-comedogenic",
    ],
    reviews: [
      {
        name: "Olivia R.",
        rating: 5,
        text: "The texture is incredible — rich but never greasy. My dry winter skin finally feels comfortable.",
        date: "Jan 2026",
      },
      {
        name: "Mia T.",
        rating: 5,
        text: "I've tried dozens of moisturizers. This is the one. My skin drinks it up instantly.",
        date: "Dec 2025",
      },
      {
        name: "Aisha N.",
        rating: 4,
        text: "Beautiful product. The scent is subtle and natural. Wish it came in a bigger size!",
        date: "Oct 2025",
      },
    ],
  },
  {
    name: "Botanical Toner",
    category: "Face Toner",
    description:
      "Chamomile & witch hazel to soothe, balance, and refine pores",
    price: "$42",
    size: "120ml / 4 fl oz",
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=800&fit=crop&q=80",
    videoSrc:
      "https://videos.pexels.com/video-files/7011328/7011328-sd_640_360_25fps.mp4",
    ingredients: [
      "Chamomile Extract — Calms redness and irritation",
      "Witch Hazel — Natural astringent for pore refinement",
      "Rose Water — Hydrates and refreshes",
      "Glycerin — Draws moisture to the skin",
      "Centella Asiatica — Promotes healing and repair",
      "Lavender Oil — Gentle antibacterial properties",
    ],
    usage: [
      "After cleansing, mist or apply with a cotton pad.",
      "Gently sweep across face and neck.",
      "Allow to air dry for 15 seconds.",
      "Follow with serum and moisturizer.",
      "Can also be used as a refreshing mid-day mist over makeup.",
    ],
    benefits: [
      "Pore refinement",
      "pH balancing",
      "Soothing formula",
      "Prep for serums",
    ],
    reviews: [
      {
        name: "Lily C.",
        rating: 5,
        text: "My pores look so much smaller after just one week. The chamomile scent is divine.",
        date: "Jan 2026",
      },
      {
        name: "Grace H.",
        rating: 4,
        text: "Really gentle on my sensitive skin. I use it as a setting mist too — works beautifully.",
        date: "Nov 2025",
      },
      {
        name: "Zoe P.",
        rating: 5,
        text: "This toner transformed my routine. My serums absorb so much better now.",
        date: "Oct 2025",
      },
    ],
  },
  {
    name: "Eye Revival Cream",
    category: "Eye Care",
    description:
      "Peptide-rich formula to brighten dark circles and firm delicate skin",
    price: "$58",
    size: "15ml / 0.5 fl oz",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=800&fit=crop&q=80",
    videoSrc:
      "https://videos.pexels.com/video-files/7305327/7305327-sd_506_960_25fps.mp4",
    ingredients: [
      "Peptide Complex — Stimulates collagen for firming",
      "Caffeine — Reduces puffiness and dark circles",
      "Vitamin K — Targets discoloration under eyes",
      "Retinol (encapsulated) — Gentle anti-aging action",
      "Cucumber Extract — Cooling and de-puffing",
      "Argan Oil — Nourishes delicate eye area",
    ],
    usage: [
      "Use the gold applicator tip to dispense a small amount.",
      "Dot product gently around the orbital bone area.",
      "Using your ring finger, tap lightly in a circular motion.",
      "Never pull or drag the delicate eye area skin.",
      "Use morning and evening before moisturizer.",
    ],
    benefits: [
      "Reduces dark circles",
      "Firms eye area",
      "Minimizes fine lines",
      "De-puffs morning eyes",
    ],
    reviews: [
      {
        name: "Catherine D.",
        rating: 5,
        text: "The Eye Revival Cream has been a game-changer. My under-eye area looks brighter and firmer.",
        date: "Jan 2026",
      },
      {
        name: "Nina W.",
        rating: 4,
        text: "Noticed a real difference in my fine lines after about 3 weeks. Very gentle formula.",
        date: "Dec 2025",
      },
      {
        name: "Rachel B.",
        rating: 5,
        text: "Finally a product that actually works on my dark circles. I look so much more rested.",
        date: "Nov 2025",
      },
    ],
  },
];

export default function ProductsSection() {
  const sectionRef = useScrollReveal();
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const openProduct = (product: ProductData) => {
    setSelectedProduct(product);
    setModalOpen(true);
    // Track recently viewed
    addRecentlyViewed({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <>
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
              Each formulation is a carefully balanced blend of botanical
              extracts and cutting-edge skincare science.
            </p>
          </div>

          {/* Featured product image + grid */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-6">
            {/* Large featured image */}
            <div className="lg:col-span-5 fade-up">
              <div className="relative group overflow-hidden rounded-xl transition-shadow duration-500 hover:shadow-[0_20px_50px_oklch(0.25_0.03_55/0.12),0_8px_16px_oklch(0.25_0.03_55/0.06)]">
                <img
                  src={PRODUCT_IMAGE}
                  alt="Skintilla Beauty product collection on stone pedestal"
                  className="w-full h-[400px] lg:h-[600px] object-cover transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:brightness-[1.02]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.25_0.03_55/0.4)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
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
                  className="fade-up group cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_16px_40px_oklch(0.25_0.03_55/0.10),0_6px_12px_oklch(0.25_0.03_55/0.06)] rounded-xl p-3 -m-3"
                  onClick={() => openProduct(product)}
                >
                  {/* Video hover container */}
                  <div className="relative overflow-hidden mb-4 bg-[oklch(0.93_0.02_75)] rounded-lg">
                    <ProductVideoHover
                      image={product.image}
                      videoSrc={product.videoSrc}
                      alt={product.name}
                      className="w-full h-[240px] lg:h-[260px]"
                    />
                    {/* Hover overlay with "View Details" */}
                    <div className="absolute inset-0 bg-[oklch(0.38_0.04_145/0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span
                        className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-white bg-[oklch(0.38_0.04_145/0.85)] px-5 py-2.5 rounded-full backdrop-blur-sm translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        View Details
                      </span>
                    </div>
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
                        className="text-[1.3rem] font-semibold text-[oklch(0.25_0.03_55)] group-hover:text-[oklch(0.38_0.04_145)] transition-colors duration-300 relative inline-block"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {product.name}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[oklch(0.72_0.10_80)] group-hover:w-full transition-all duration-500 ease-out" />
                      </h3>
                      <p
                        className="text-[0.85rem] text-[oklch(0.50_0.03_55)] mt-1 font-light leading-[1.6]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {product.description}
                      </p>
                    </div>
                    <span
                      className="text-[1.1rem] font-medium text-[oklch(0.38_0.04_145)] shrink-0 ml-4 transition-all duration-300 group-hover:scale-110 group-hover:text-[oklch(0.50_0.05_145)]"
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

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
