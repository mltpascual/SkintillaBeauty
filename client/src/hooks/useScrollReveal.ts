import { useEffect, useRef } from "react";

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe the container and all animated children
    const fadeElements = el.querySelectorAll(".fade-up, .fade-left, .fade-right, .scale-in");
    fadeElements.forEach((child) => observer.observe(child));
    if (el.classList.contains("fade-up") || el.classList.contains("fade-left") || el.classList.contains("fade-right") || el.classList.contains("scale-in")) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
