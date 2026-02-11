import { useEffect, useRef, useState } from "react";

/**
 * useParallax — returns a ref and a CSS transform value for parallax scrolling.
 * Attach the ref to the container, and apply the transform to the target element.
 * @param speed - Parallax speed factor. 0 = no effect, 0.5 = half speed, etc.
 */
export function useParallax(speed = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const windowH = window.innerHeight;
          // Only calculate when element is in or near viewport
          if (rect.bottom > -100 && rect.top < windowH + 100) {
            const center = rect.top + rect.height / 2;
            const viewCenter = windowH / 2;
            const delta = (center - viewCenter) * speed;
            setOffset(delta);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial calc

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset, transform: `translateY(${offset}px)` };
}

/**
 * useScrollProgress — returns a 0–1 progress value based on how far
 * through the viewport the element has scrolled.
 */
export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const windowH = window.innerHeight;
          // 0 when element enters viewport from bottom, 1 when it exits from top
          const raw = 1 - (rect.top / windowH);
          setProgress(Math.max(0, Math.min(1, raw)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { ref, progress };
}
