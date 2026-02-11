/*
 * Skintilla Beauty — Botanical Atelier Design
 * ProductVideoHover: Lazy-loaded looping video that plays on hover
 * Replaces static image zoom with immersive video clips
 * Falls back gracefully to image if video fails to load
 */
import { useState, useRef, useCallback, useEffect } from "react";

interface ProductVideoHoverProps {
  image: string;
  videoSrc: string;
  alt: string;
  className?: string;
}

export default function ProductVideoHover({
  image,
  videoSrc,
  alt,
  className = "",
}: ProductVideoHoverProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (videoRef.current && videoLoaded) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [videoLoaded]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoError(true);
  }, []);

  // Auto-play when video loads while already hovered
  useEffect(() => {
    if (isHovered && videoLoaded && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [isHovered, videoLoaded]);

  const showVideo = isHovered && videoLoaded && !videoError;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static image — always present as base layer */}
      <img
        src={image}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          showVideo
            ? "opacity-0 scale-[1.02]"
            : isHovered
              ? "scale-[1.08] brightness-[1.03]"
              : "scale-100"
        }`}
        loading="lazy"
      />

      {/* Lazy-loaded video — only loads when card enters viewport */}
      {isInView && !videoError && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Play icon indicator — shows briefly when video starts */}
      {isHovered && videoLoaded && !videoError && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[oklch(0.20_0.03_55/0.6)] backdrop-blur-sm rounded-full px-2.5 py-1 opacity-0 animate-[fadeInOut_2s_ease-in-out_forwards]">
          <svg
            className="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <span
            className="text-[0.55rem] text-white font-medium tracking-wider uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Playing
          </span>
        </div>
      )}

      {/* Loading shimmer when video is loading on hover */}
      {isHovered && !videoLoaded && !videoError && isInView && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_infinite]" />
      )}
    </div>
  );
}
