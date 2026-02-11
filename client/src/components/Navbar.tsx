/*
 * Skintilla Beauty — Botanical Atelier Design
 * Navbar: Floating navigation with warm cream background, gold accents
 * Mobile: Full-screen slide-in drawer with staggered link animations
 * Typography: Cormorant Garamond for brand name, Jost for nav links
 */
import { useState, useEffect, useCallback } from "react";

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

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
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
            className="font-[var(--font-display)] text-2xl lg:text-[1.75rem] font-semibold tracking-wide text-espresso relative z-[60]"
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
            className="hidden lg:inline-flex items-center px-6 py-2.5 rounded-full text-[0.75rem] font-medium tracking-[0.15em] uppercase border border-[oklch(0.72_0.10_80)] text-[oklch(0.40_0.03_55)] hover:bg-[oklch(0.72_0.10_80)] hover:text-[oklch(0.98_0.008_80)] transition-all duration-300"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Shop Now
          </a>

          {/* Hamburger Toggle — animated bars morph to X */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative z-[60] w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              {/* Top bar */}
              <span
                className={`block h-[1.5px] bg-[oklch(0.30_0.03_55)] rounded-full transition-all duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] origin-center ${
                  mobileOpen
                    ? "rotate-45 translate-y-[9.5px]"
                    : "rotate-0 translate-y-0"
                }`}
              />
              {/* Middle bar */}
              <span
                className={`block h-[1.5px] bg-[oklch(0.30_0.03_55)] rounded-full transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] ${
                  mobileOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                }`}
              />
              {/* Bottom bar */}
              <span
                className={`block h-[1.5px] bg-[oklch(0.30_0.03_55)] rounded-full transition-all duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] origin-center ${
                  mobileOpen
                    ? "-rotate-45 -translate-y-[9.5px]"
                    : "rotate-0 translate-y-0"
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Full-screen Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[55] lg:hidden transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[oklch(0.20_0.03_55/0.3)] backdrop-blur-sm transition-opacity duration-500 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        {/* Drawer panel — slides in from right */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-[420px] bg-[oklch(0.97_0.012_80)] shadow-[-8px_0_40px_oklch(0.20_0.03_55/0.15)] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer content */}
          <div className="flex flex-col justify-center h-full px-10 pt-20 pb-10">
            {/* Gold decorative line */}
            <div
              className={`w-10 h-[1px] bg-[oklch(0.72_0.10_80)] mb-8 transition-all duration-500 delay-200 ${
                mobileOpen ? "opacity-100 w-10" : "opacity-0 w-0"
              }`}
            />

            {/* Staggered nav links */}
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`group flex items-center py-3 transition-all ease-[cubic-bezier(0.77,0,0.175,1)] ${
                    mobileOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8"
                  }`}
                  style={{
                    transitionDuration: "500ms",
                    transitionDelay: mobileOpen ? `${150 + i * 60}ms` : "0ms",
                  }}
                >
                  {/* Index number */}
                  <span
                    className="text-[0.65rem] font-light tracking-wider text-[oklch(0.72_0.10_80)] mr-4 tabular-nums"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Link label */}
                  <span
                    className="text-[1.6rem] font-semibold text-[oklch(0.25_0.03_55)] group-hover:text-[oklch(0.50_0.05_145)] transition-colors duration-300 leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {link.label}
                  </span>
                  {/* Hover arrow */}
                  <svg
                    className="ml-auto w-5 h-5 text-[oklch(0.72_0.10_80)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div
              className={`mt-auto pt-8 border-t border-[oklch(0.72_0.10_80/0.2)] transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
                mobileOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: mobileOpen
                  ? `${150 + navLinks.length * 60 + 100}ms`
                  : "0ms",
              }}
            >
              <a
                href="#bundles"
                onClick={closeMenu}
                className="inline-flex items-center justify-center w-full px-8 py-4 rounded-full text-[0.75rem] font-medium tracking-[0.2em] uppercase bg-[oklch(0.38_0.04_145)] text-[oklch(0.96_0.015_80)] hover:bg-[oklch(0.30_0.04_145)] transition-colors duration-300"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Shop Now
              </a>

              {/* Brand tagline */}
              <p
                className="mt-6 text-center text-[0.7rem] tracking-[0.15em] uppercase text-[oklch(0.60_0.03_55)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Est. 2019 — Luxury Skincare
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
