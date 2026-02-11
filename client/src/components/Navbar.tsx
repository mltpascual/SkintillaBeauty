/*
 * Skintilla Beauty — Botanical Atelier Design
 * Navbar: Floating navigation with warm cream background, gold accents
 * Typography: Cormorant Garamond for brand name, Jost for nav links
 */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Our Story", href: "#story" },
  { label: "Products", href: "#products" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Quiz", href: "#quiz" },
  { label: "Bundles", href: "#bundles" },
  { label: "Results", href: "#results" },
  { label: "Community", href: "#community" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.96_0.015_80/0.92)] backdrop-blur-md shadow-[0_1px_0_oklch(0.72_0.10_80/0.3)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
        {/* Brand */}
        <a
          href="#"
          className="font-[var(--font-display)] text-2xl lg:text-[1.75rem] font-semibold tracking-wide text-espresso"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Skintilla
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[0.8rem] font-medium tracking-[0.15em] uppercase text-[oklch(0.40_0.03_55)] hover:text-[oklch(0.72_0.10_80)] transition-colors duration-300"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#bundles"
          className="hidden lg:inline-flex items-center px-6 py-2.5 text-[0.75rem] font-medium tracking-[0.15em] uppercase border border-[oklch(0.72_0.10_80)] text-[oklch(0.40_0.03_55)] hover:bg-[oklch(0.72_0.10_80)] hover:text-[oklch(0.98_0.008_80)] transition-all duration-300"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Shop Now
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[oklch(0.40_0.03_55)]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[oklch(0.96_0.015_80/0.97)] backdrop-blur-md px-6 pb-6 pt-2 border-t border-[oklch(0.72_0.10_80/0.2)]">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-[0.8rem] font-medium tracking-[0.15em] uppercase text-[oklch(0.40_0.03_55)] hover:text-[oklch(0.72_0.10_80)] transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#bundles"
            onClick={() => setMobileOpen(false)}
            className="mt-5 inline-flex items-center px-6 py-2.5 text-[0.75rem] font-medium tracking-[0.15em] uppercase border border-[oklch(0.72_0.10_80)] text-[oklch(0.40_0.03_55)] hover:bg-[oklch(0.72_0.10_80)] hover:text-[oklch(0.98_0.008_80)] transition-all duration-300"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Shop Now
          </a>
        </div>
      </div>
    </header>
  );
}
