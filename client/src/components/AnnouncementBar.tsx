/*
 * Skintilla Beauty — Botanical Atelier Design
 * AnnouncementBar: Slim rotating banner fixed at the very top of the page
 * Cycles through promotions with smooth crossfade animation
 * Warm gold/olive palette, Jost typography
 */
import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { X } from "lucide-react";

const announcements = [
  { text: "Free shipping on orders over $75", icon: "✦" },
  { text: "New: Spring Glow Collection — Shop Now", icon: "❀" },
  { text: "Subscribe & save 20% on every order", icon: "✧" },
  { text: "Complimentary samples with every purchase", icon: "✦" },
];

// Context to share announcement bar visibility with Navbar
const AnnouncementContext = createContext<{ visible: boolean }>({ visible: true });
export const useAnnouncementBar = () => useContext(AnnouncementContext);

export function AnnouncementBarProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnnouncementContext.Provider value={{ visible: isVisible }}>
      <AnnouncementBarInner isVisible={isVisible} setIsVisible={setIsVisible} />
      {children}
    </AnnouncementContext.Provider>
  );
}

function AnnouncementBarInner({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (v: boolean) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextAnnouncement = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
      setIsAnimating(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(nextAnnouncement, 4000);
    return () => clearInterval(interval);
  }, [isVisible, nextAnnouncement]);

  if (!isVisible) return null;

  const current = announcements[currentIndex];

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] w-full overflow-hidden"
      style={{ background: "oklch(0.38 0.04 145)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-center h-9 relative">
        {/* Left dots — decorative */}
        <div className="hidden sm:flex items-center gap-1.5 absolute left-6 lg:left-10">
          {announcements.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex(i);
                  setIsAnimating(false);
                }, 300);
              }}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "bg-[oklch(0.72_0.10_80)] w-3"
                  : "bg-[oklch(0.96_0.015_80/0.3)] hover:bg-[oklch(0.96_0.015_80/0.5)]"
              }`}
              aria-label={`View announcement ${i + 1}`}
            />
          ))}
        </div>

        {/* Announcement text — crossfade */}
        <div
          className={`flex items-center gap-2 transition-all duration-300 ${
            isAnimating
              ? "opacity-0 translate-y-2"
              : "opacity-100 translate-y-0"
          }`}
        >
          <span className="text-[oklch(0.72_0.10_80)] text-[0.7rem]">
            {current.icon}
          </span>
          <span
            className="text-[0.68rem] sm:text-[0.72rem] font-medium tracking-[0.15em] uppercase text-[oklch(0.96_0.015_80)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {current.text}
          </span>
          <span className="text-[oklch(0.72_0.10_80)] text-[0.7rem]">
            {current.icon}
          </span>
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-6 lg:right-10 text-[oklch(0.96_0.015_80/0.5)] hover:text-[oklch(0.96_0.015_80)] transition-colors duration-200"
          aria-label="Close announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// Keep default export for backward compat, but it's now managed by the Provider
export default function AnnouncementBar() {
  return null; // Rendered by AnnouncementBarProvider instead
}
