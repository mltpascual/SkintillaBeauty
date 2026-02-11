/*
 * Skintilla Beauty — Botanical Atelier Design
 * LoyaltyTeaser: Rewards program teaser section
 * Warm editorial layout with gold accents, botanical motifs
 * Encourages sign-up with tier benefits preview
 */
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";
import { Star, Gift, Crown, Sparkles } from "lucide-react";

const tiers = [
  {
    name: "Petal",
    points: "0 – 499",
    icon: Sparkles,
    color: "oklch(0.72 0.10 80)",
    benefits: ["Birthday gift", "Early access to sales", "Free samples"],
  },
  {
    name: "Bloom",
    points: "500 – 1,499",
    icon: Star,
    color: "oklch(0.65 0.12 80)",
    benefits: [
      "10% off every order",
      "Exclusive bundles",
      "Free standard shipping",
    ],
  },
  {
    name: "Radiance",
    points: "1,500+",
    icon: Crown,
    color: "oklch(0.58 0.14 80)",
    benefits: [
      "15% off every order",
      "Free express shipping",
      "VIP product launches",
    ],
  },
];

export default function LoyaltyTeaser() {
  const sectionRef = useScrollReveal();

  const handleJoin = () => {
    toast.success("Welcome to Skintilla Rewards!", {
      description: "You'll receive a confirmation email shortly.",
    });
  };

  return (
    <section
      id="rewards"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "oklch(0.25 0.03 55)" }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, oklch(0.72 0.10 80) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — copy */}
          <div className="stagger-children">
            <div className="fade-up flex items-center gap-4 mb-6">
              <Gift className="w-5 h-5 text-[oklch(0.72_0.10_80)]" />
              <span
                className="text-[0.7rem] font-medium tracking-[0.25em] uppercase text-[oklch(0.72_0.10_80)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Rewards Program
              </span>
            </div>

            <h2
              className="fade-up text-[clamp(2rem,4vw,3rem)] leading-[1.15] font-semibold text-[oklch(0.96_0.015_80)] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Earn Points,{" "}
              <em className="font-normal italic text-[oklch(0.72_0.10_80)]">
                Unlock Rewards
              </em>
            </h2>

            <p
              className="fade-up text-[1rem] leading-[1.8] text-[oklch(0.65_0.02_80)] mb-8 max-w-lg font-light"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Join Skintilla Rewards and earn points with every purchase. Unlock
              exclusive perks, birthday gifts, and VIP access to new collections.
              It's our way of saying thank you for being part of the Skintilla
              family.
            </p>

            <div className="fade-up flex items-center gap-8 mb-10">
              <div>
                <p
                  className="text-[2rem] font-semibold text-[oklch(0.72_0.10_80)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  1pt
                </p>
                <p
                  className="text-[0.7rem] tracking-[0.1em] uppercase text-[oklch(0.55_0.02_80)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Per $1 spent
                </p>
              </div>
              <div className="w-px h-10 bg-[oklch(0.72_0.10_80/0.2)]" />
              <div>
                <p
                  className="text-[2rem] font-semibold text-[oklch(0.72_0.10_80)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  2x
                </p>
                <p
                  className="text-[0.7rem] tracking-[0.1em] uppercase text-[oklch(0.55_0.02_80)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Points on bundles
                </p>
              </div>
              <div className="w-px h-10 bg-[oklch(0.72_0.10_80/0.2)]" />
              <div>
                <p
                  className="text-[2rem] font-semibold text-[oklch(0.72_0.10_80)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  $5
                </p>
                <p
                  className="text-[0.7rem] tracking-[0.1em] uppercase text-[oklch(0.55_0.02_80)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Welcome reward
                </p>
              </div>
            </div>

            <button
              onClick={handleJoin}
              className="fade-up inline-flex items-center px-8 py-3.5 rounded-full text-[0.75rem] font-medium tracking-[0.2em] uppercase bg-[oklch(0.72_0.10_80)] text-[oklch(0.20_0.03_55)] hover:bg-[oklch(0.78_0.10_80)] transition-all duration-300 hover:shadow-[0_8px_30px_oklch(0.72_0.10_80/0.3)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Join Skintilla Rewards
            </button>
          </div>

          {/* Right — tier cards */}
          <div className="space-y-4 stagger-children">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.name}
                  className="fade-up group relative rounded-2xl p-6 border border-[oklch(0.72_0.10_80/0.12)] bg-[oklch(0.28_0.03_55)] hover:bg-[oklch(0.30_0.03_55)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_oklch(0.72_0.10_80/0.08)]"
                >
                  {/* Tier header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `${tier.color}` + "/0.15" }}
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: tier.color }}
                        />
                      </div>
                      <div>
                        <h3
                          className="text-[1.15rem] font-semibold text-[oklch(0.96_0.015_80)]"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {tier.name}
                        </h3>
                        <p
                          className="text-[0.65rem] tracking-[0.1em] uppercase text-[oklch(0.55_0.02_80)]"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {tier.points} points
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="flex flex-wrap gap-2">
                    {tier.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="text-[0.65rem] font-medium tracking-[0.05em] text-[oklch(0.75_0.02_80)] bg-[oklch(0.32_0.03_55)] rounded-full px-3 py-1.5"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {/* Decorative corner accent */}
                  <div
                    className="absolute top-0 right-0 w-16 h-16 opacity-[0.04] rounded-tr-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${tier.color}, transparent)`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
