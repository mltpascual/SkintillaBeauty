/**
 * SocialFeed — Botanical Atelier Design
 * Instagram-style masonry grid of user-generated content.
 * Hover reveals username, likes, and caption overlay.
 */

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Heart, MessageCircle, Instagram } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";

const socialPosts = [
  {
    image:
      "https://raw.githubusercontent.com/mltpascual/SkintillaBeauty/main/client/public/images/social-1.jpg",
    username: "@glowwithsarah",
    caption: "Morning ritual with my Radiance Serum ✨",
    likes: 2847,
    comments: 134,
    tall: false,
  },
  {
    image:
      "https://raw.githubusercontent.com/mltpascual/SkintillaBeauty/main/client/public/images/social-2.jpg",
    username: "@skincarejunkie",
    caption: "That post-moisturizer glow 🌿",
    likes: 3421,
    comments: 198,
    tall: true,
  },
  {
    image:
      "https://raw.githubusercontent.com/mltpascual/SkintillaBeauty/main/client/public/images/social-3.jpg",
    username: "@botanicalluxe",
    caption: "The whole collection, laid out beautifully 🌸",
    likes: 5102,
    comments: 267,
    tall: false,
  },
  {
    image:
      "https://raw.githubusercontent.com/mltpascual/SkintillaBeauty/main/client/public/images/social-4.jpg",
    username: "@selfcaresunday",
    caption: "Sunday morning gua sha ritual 🧖‍♀️",
    likes: 4215,
    comments: 189,
    tall: true,
  },
  {
    image:
      "https://raw.githubusercontent.com/mltpascual/SkintillaBeauty/main/client/public/images/social-5.jpg",
    username: "@rosepetalspa",
    caption: "Rose petal ritual — pure luxury 🌹",
    likes: 1893,
    comments: 87,
    tall: false,
  },
];

function formatNumber(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export default function SocialFeed() {
  const sectionRef = useScrollReveal();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { isDark } = useDarkMode();

  return (
    <section
      id="community"
      ref={sectionRef}
      className="py-24 lg:py-32 transition-colors duration-500"
      style={{ background: isDark ? "oklch(0.17 0.015 55)" : "oklch(0.97 0.008 80)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-14 stagger-children">
          <div className="fade-up flex items-center justify-center gap-6 mb-6">
            <div className="gold-divider w-[60px]" />
            <span
              className="text-[0.7rem] font-medium tracking-[0.25em] uppercase text-[oklch(0.72_0.10_80)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              #SkintillaGlow
            </span>
            <div className="gold-divider w-[60px]" />
          </div>
          <h2
            className={`fade-up text-[clamp(2rem,4vw,3.2rem)] leading-[1.15] font-semibold ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our{" "}
            <em className={`font-normal italic ${isDark ? "text-[oklch(0.60_0.06_145)]" : "text-[oklch(0.50_0.05_145)]"}`}>
              Community
            </em>
          </h2>
          <p
            className={`fade-up mt-4 text-[0.95rem] ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.50_0.03_55)]"} max-w-lg mx-auto font-light leading-relaxed`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Real people, real rituals. See how our community incorporates
            Skintilla into their daily self-care moments.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 stagger-children">
          {socialPosts.map((post, i) => (
            <div
              key={i}
              className={`fade-up relative overflow-hidden group cursor-pointer rounded-lg transition-all duration-400 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_oklch(0.25_0.03_55/0.12)] hover:z-10 ${
                post.tall ? "row-span-2" : ""
              }`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <img
                src={post.image}
                alt={post.caption}
                className={`w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:brightness-[1.05] ${
                  post.tall ? "h-full min-h-[400px]" : "aspect-square"
                }`}
                loading="lazy"
              />

              {/* Hover overlay */}
              <div
                className={`absolute inset-0 bg-[oklch(0.20_0.03_55/0.55)] flex flex-col items-center justify-center transition-opacity duration-300 ${
                  hoveredIdx === i ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Stats */}
                <div className="flex items-center gap-5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Heart className="h-4 w-4 text-white fill-white" />
                    <span
                      className="text-[0.8rem] text-white font-medium"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {formatNumber(post.likes)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="h-4 w-4 text-white" />
                    <span
                      className="text-[0.8rem] text-white font-medium"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {formatNumber(post.comments)}
                    </span>
                  </div>
                </div>

                {/* Username */}
                <p
                  className="text-[0.7rem] text-white/80 tracking-wide"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {post.username}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="text-center mt-12 fade-up">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-full border ${isDark ? "border-[oklch(0.50_0.05_145)] text-[oklch(0.50_0.05_145)] hover:bg-[oklch(0.50_0.05_145)]" : "border-[oklch(0.38_0.04_145)] text-[oklch(0.38_0.04_145)] hover:bg-[oklch(0.38_0.04_145)]"} hover:text-white transition-all duration-400 group`}
          >
            <Instagram className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            <span
              className="text-[0.7rem] font-medium tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Follow @skintillabeauty
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
