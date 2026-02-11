/**
 * SocialFeed — Botanical Atelier Design
 * Instagram-style masonry grid of user-generated content.
 * Hover reveals username, likes, and caption overlay.
 */

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Heart, MessageCircle, Instagram } from "lucide-react";

const socialPosts = [
  {
    image:
      "https://private-us-east-1.manuscdn.com/sessionFile/3ocyoQdcxp9Sw7E1buR1nN/sandbox/Bp4Z7ku0TZGek5A3x20zrc-img-1_1770804107000_na1fn_c29jaWFsLTE.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvM29jeW9RZGN4cDlTdzdFMWJ1UjFuTi9zYW5kYm94L0JwNFo3a3UwVFpHZWs1QTN4MjB6cmMtaW1nLTFfMTc3MDgwNDEwNzAwMF9uYTFmbl9jMjlqYVdGc0xURS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=tPagKwgu8r762CpmKpbRtwZ1NVhuYQgtIi2FQRx-Bfl49OkI54~OHY3KszCb425-IqpObS-BRdWNS9S6QgVDbfqqe8Vw1MFJGT2InVrLcnzQFkoUsZ4j6JdLMqRK1fBGMN6UxSn--GGM61a~QH2fw8kFziitIOjENBGpXNmmEHCaFDdjdct4PG9~B~Q~R7RwXADgBF3lBBElPuuf~jAiefRUreaGOyNwFduVV2OQ1k0XRfSJj73e463aCVRtvFDsm1dtVXB55k1sxnznf0tel0WdsLr3t9g37hMmAqxqTNf77uTAAVIkdZ7mVICg4p-gOfKixLt-YS5SyD-9mooqNg__",
    username: "@glowwithsarah",
    caption: "Morning ritual with my Radiance Serum ✨",
    likes: 2847,
    comments: 134,
    tall: false,
  },
  {
    image:
      "https://private-us-east-1.manuscdn.com/sessionFile/3ocyoQdcxp9Sw7E1buR1nN/sandbox/Bp4Z7ku0TZGek5A3x20zrc-img-2_1770804117000_na1fn_c29jaWFsLTI.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvM29jeW9RZGN4cDlTdzdFMWJ1UjFuTi9zYW5kYm94L0JwNFo3a3UwVFpHZWs1QTN4MjB6cmMtaW1nLTJfMTc3MDgwNDExNzAwMF9uYTFmbl9jMjlqYVdGc0xUSS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=F42~--YIpf4pF2hfygH57ecs3sBxf9Az7zMZH4FvczKBPS57uDpn9Og8Xk4YB-dIpirzKR2jsPP9cag4ptobraJSUiyczpWu96I5DQs8iUbnZqS6rS3-LZRbsKfcWX7RWJ2PSzeSFbuhw3c4MCVy5sh6iCz4JXXea36f9nTOCzwLF811KFdTjKhSv2JfVxvfaACMX0dFJroG64o5O4c2YcEiC2kAVBvqGOjUm-QZChicOOAg43uG13OWoMv~cfXVZZcrMCakXhSSzDlP-knj4vJ3IhIczLzc7qVR8-JILMEC7vSb83nX-kOHnjof4qf8bZT~TGqblOWeL2XuA7CQ5g__",
    username: "@skincarejunkie",
    caption: "That post-moisturizer glow 🌿",
    likes: 3421,
    comments: 198,
    tall: true,
  },
  {
    image:
      "https://private-us-east-1.manuscdn.com/sessionFile/3ocyoQdcxp9Sw7E1buR1nN/sandbox/Bp4Z7ku0TZGek5A3x20zrc-img-3_1770804105000_na1fn_c29jaWFsLTM.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvM29jeW9RZGN4cDlTdzdFMWJ1UjFuTi9zYW5kYm94L0JwNFo3a3UwVFpHZWs1QTN4MjB6cmMtaW1nLTNfMTc3MDgwNDEwNTAwMF9uYTFmbl9jMjlqYVdGc0xUTS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=A410TvuHgnlRoYxd594gdgkKj4QK0ywzCnr2C4Nk1k9c45Ph8bk610WNpxgyYtD2M2bRyiHjaezFFLwbdvRQiu3yeMiKemkHVclq0Td8Jaz5e6EvPqi-8BCeV3ZxNTqfkaMaNO8d-duzge6Yp2pD6sfZBMVl-cOjv4LCkOLsGFuCEZHJSte6PsHSHuz5wZBo~HAIWAkTPLunwu8WjWdUhavk8UZ2WHWAg2eDmgxPk2JyMWH913kkfrXzY7C7OU~P2Kw8pjnotapj4tiPv-hfdDgRbR5V1Zi~4Sd3vRY~7sb0fyl7Qb7nZpMQWLoan-iNRrUR-OIMYWtuguTFa9CxCQ__",
    username: "@botanicalluxe",
    caption: "The whole collection, laid out beautifully 🌸",
    likes: 5102,
    comments: 267,
    tall: false,
  },
  {
    image:
      "https://private-us-east-1.manuscdn.com/sessionFile/3ocyoQdcxp9Sw7E1buR1nN/sandbox/Bp4Z7ku0TZGek5A3x20zrc-img-4_1770804109000_na1fn_c29jaWFsLTQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvM29jeW9RZGN4cDlTdzdFMWJ1UjFuTi9zYW5kYm94L0JwNFo3a3UwVFpHZWs1QTN4MjB6cmMtaW1nLTRfMTc3MDgwNDEwOTAwMF9uYTFmbl9jMjlqYVdGc0xUUS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=tQFfbxLs5mUT8xx2pLhGqUsDxoSZyfgOHXBOS~4CSmcliagYJBe5rRBx8zsa0Osd-ecsbJjRBNYXV6uXO8PHFO0EJDxWmBpjhJSHrftX9Q4BpScvL~W-EMJJ8ipxmwK0sLp1ODte45jh55WeCw1mELXmnl13lRA8UMr4SU8WObyPp5RiQ3IW5hVHZ3jQXGMNx9bTaT0zqE43xyBP7NMR6I7ZBWXw1ZH6m61RTZUfKeG0wZpCO5GQf76qeH9EyFM~ihubhXnzB~lpDJVDgWR-W27ite0Z3jqoL~O6DIzkzQ0JO1TdaVXCTozg5wxJ60cWAJM6isYrNmi4mPi9SCDbVw__",
    username: "@selfcaresunday",
    caption: "Sunday morning gua sha ritual 🧖‍♀️",
    likes: 4215,
    comments: 189,
    tall: true,
  },
  {
    image:
      "https://private-us-east-1.manuscdn.com/sessionFile/3ocyoQdcxp9Sw7E1buR1nN/sandbox/Bp4Z7ku0TZGek5A3x20zrc-img-5_1770804105000_na1fn_c29jaWFsLTU.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvM29jeW9RZGN4cDlTdzdFMWJ1UjFuTi9zYW5kYm94L0JwNFo3a3UwVFpHZWs1QTN4MjB6cmMtaW1nLTVfMTc3MDgwNDEwNTAwMF9uYTFmbl9jMjlqYVdGc0xUVS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=WYChnqnxqBYlcc4hOJLC6WD4MNOk30KDBL8y69BK3DicuIv3REKeofyZUTPBPtV0XgT~OnrTTUNfO2bVtglDTClSK6mmhYzBuB2ujoP1BE7IgFcFsdQ4ijxXq3I-OuZHSP2VubUL1tAOeDAvqsFyguIsh8~qCUYYOoaGw8wK-AmPZleTMYQPBe2wWtvlh6hZNj6vO9pf7KNtwXWYiAyjtUID4bQ5guYgPaN2VkVP-3MarygZWvDf8sVnZtTqgwHhMAxVhVS6guskX~n29DgiAFDvSnh~96WoMva6H7k1-JZkqGJm4LPB13Mrn8-6y6jcqAZkn7PomVA-1brfROM2nQ__",
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

  return (
    <section
      id="community"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "oklch(0.97 0.008 80)" }}
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
            className="fade-up text-[clamp(2rem,4vw,3.2rem)] leading-[1.15] font-semibold text-[oklch(0.25_0.03_55)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our{" "}
            <em className="font-normal italic text-[oklch(0.50_0.05_145)]">
              Community
            </em>
          </h2>
          <p
            className="fade-up mt-4 text-[0.95rem] text-[oklch(0.50_0.03_55)] max-w-lg mx-auto font-light leading-relaxed"
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
              className={`fade-up relative overflow-hidden group cursor-pointer ${
                post.tall ? "row-span-2" : ""
              }`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <img
                src={post.image}
                alt={post.caption}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.08] ${
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
            className="inline-flex items-center gap-3 px-8 py-3.5 border border-[oklch(0.38_0.04_145)] text-[oklch(0.38_0.04_145)] hover:bg-[oklch(0.38_0.04_145)] hover:text-[oklch(0.97_0.008_80)] transition-all duration-400 group"
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
