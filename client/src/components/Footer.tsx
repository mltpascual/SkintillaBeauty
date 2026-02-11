/*
 * Skintilla Beauty — Botanical Atelier Design
 * Footer: Warm, editorial footer with newsletter signup and navigation
 * Gold accents, botanical motifs, warm palette
 */
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing! Welcome to the Skintilla family.");
      setEmail("");
    }
  };

  return (
    <footer
      className="pt-20 lg:pt-28 pb-8"
      style={{ background: "oklch(0.25 0.03 55)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Newsletter CTA */}
        <div className="text-center mb-16 lg:mb-20">
          <h2
            className="text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] font-semibold text-[oklch(0.93_0.02_75)] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Join the{" "}
            <em className="font-normal italic text-[oklch(0.72_0.10_80)]">
              Skintilla
            </em>{" "}
            Ritual
          </h2>
          <p
            className="text-[0.95rem] text-[oklch(0.65_0.02_55)] max-w-md mx-auto mb-8 font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Subscribe for exclusive offers, skincare tips, and early access to
            new collections.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-5 py-3 bg-[oklch(0.30_0.03_55)] border border-[oklch(0.40_0.03_55)] text-[oklch(0.90_0.01_55)] placeholder:text-[oklch(0.50_0.02_55)] text-[0.85rem] tracking-wide focus:outline-none focus:border-[oklch(0.72_0.10_80)] transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
              aria-label="Email address"
            />
            <button
              type="submit"
              className="px-7 py-3 bg-[oklch(0.72_0.10_80)] text-[oklch(0.25_0.03_55)] text-[0.72rem] font-medium tracking-[0.15em] uppercase hover:bg-[oklch(0.78_0.10_80)] transition-colors duration-300"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="gold-divider mb-12" />

        {/* Footer grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div>
            <h3
              className="text-[1.5rem] font-semibold text-[oklch(0.93_0.02_75)] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Skintilla
            </h3>
            <p
              className="text-[0.85rem] text-[oklch(0.55_0.02_55)] leading-[1.7] font-light"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Luxury skincare rooted in nature. Crafted with care since 2019.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4
              className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[oklch(0.72_0.10_80)] mb-5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Shop
            </h4>
            <ul className="space-y-3">
              {["All Products", "Serums", "Moisturizers", "Bundles"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#products"
                      className="text-[0.85rem] text-[oklch(0.55_0.02_55)] hover:text-[oklch(0.82_0.08_80)] transition-colors duration-300 font-light"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[oklch(0.72_0.10_80)] mb-5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {["Our Story", "Ingredients", "Sustainability", "Press"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#story"
                      className="text-[0.85rem] text-[oklch(0.55_0.02_55)] hover:text-[oklch(0.82_0.08_80)] transition-colors duration-300 font-light"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[oklch(0.72_0.10_80)] mb-5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Support
            </h4>
            <ul className="space-y-3">
              {["Contact Us", "Shipping", "Returns", "FAQ"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toast("Feature coming soon!");
                    }}
                    className="text-[0.85rem] text-[oklch(0.55_0.02_55)] hover:text-[oklch(0.82_0.08_80)] transition-colors duration-300 font-light"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[oklch(0.35_0.02_55)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-[0.75rem] text-[oklch(0.45_0.02_55)] font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            &copy; 2025 Skintilla Beauty. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toast("Feature coming soon!");
                }}
                className="text-[0.72rem] text-[oklch(0.45_0.02_55)] hover:text-[oklch(0.72_0.10_80)] transition-colors duration-300"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
