# Skintilla Beauty — Design System

> **Design Movement:** Botanical Atelier — an organic luxury editorial aesthetic inspired by high-end beauty magazines and brands like Aesop, Byredo, and Le Labo.

---

## Design Philosophy

Skintilla Beauty's visual identity is rooted in the tension between raw botanical nature and refined editorial luxury. Every design decision reinforces the idea that skincare is both a science and an art — a daily ritual worth savoring. The interface should feel like leafing through a curated beauty publication, not browsing a generic e-commerce template.

### Core Principles

1. **Editorial Restraint** — generous negative space, asymmetric layouts, and deliberate typography hierarchy create a sense of calm authority.
2. **Warm Materiality** — the palette draws from natural materials (parchment, olive leaves, burnished gold, espresso beans) rather than digital abstraction.
3. **Botanical Authenticity** — imagery, textures, and motifs reference real botanical ingredients, grounding the luxury in nature.
4. **Intentional Motion** — animations are smooth and purposeful, never gratuitous. Every transition reinforces the feeling of silk and softness.

---

## Color System

All colors use the OKLCH color space for perceptual uniformity across light and dark themes.

### Light Theme (Default)

| Token | OKLCH Value | Role |
|---|---|---|
| `--background` | `oklch(0.96 0.015 80)` | Warm cream page background |
| `--foreground` | `oklch(0.25 0.03 55)` | Deep espresso text |
| `--card` | `oklch(0.98 0.008 80)` | Warm white card surfaces |
| `--primary` | `oklch(0.38 0.04 145)` | Deep olive — primary actions |
| `--accent` | `oklch(0.72 0.10 80)` | Burnished gold — highlights and dividers |
| `--secondary` | `oklch(0.93 0.02 75)` | Parchment — subtle backgrounds |
| `--muted-foreground` | `oklch(0.50 0.03 55)` | Espresso light — secondary text |
| `--border` | `oklch(0.88 0.02 75)` | Soft parchment borders |

### Dark Theme

| Token | OKLCH Value | Role |
|---|---|---|
| `--background` | `oklch(0.16 0.015 55)` | Deep espresso background |
| `--foreground` | `oklch(0.90 0.015 75)` | Warm cream text |
| `--card` | `oklch(0.20 0.015 55)` | Slightly lighter espresso cards |
| `--primary` | `oklch(0.50 0.05 145)` | Lighter olive for dark surfaces |
| `--accent` | `oklch(0.72 0.10 80)` | Gold remains consistent across themes |
| `--secondary` | `oklch(0.22 0.015 55)` | Subtle dark surface variation |
| `--border` | `oklch(0.28 0.015 55)` | Muted dark borders |

### Named Brand Colors

| Name | Token | OKLCH Value | Usage |
|---|---|---|---|
| Cream | `--color-cream` | `oklch(0.96 0.015 80)` | Page backgrounds |
| Parchment | `--color-parchment` | `oklch(0.93 0.02 75)` | Section alternation |
| Olive | `--color-olive` | `oklch(0.38 0.04 145)` | Primary buttons, CTAs |
| Olive Light | `--color-olive-light` | `oklch(0.50 0.05 145)` | Hover states, dark theme primary |
| Gold | `--color-gold` | `oklch(0.72 0.10 80)` | Dividers, accents, badges |
| Gold Light | `--color-gold-light` | `oklch(0.82 0.08 80)` | Subtle gold highlights |
| Espresso | `--color-espresso` | `oklch(0.25 0.03 55)` | Body text, headings |
| Espresso Light | `--color-espresso-light` | `oklch(0.40 0.03 55)` | Secondary text |
| Warm White | `--color-warm-white` | `oklch(0.98 0.008 80)` | Card surfaces, overlays |

---

## Typography

### Font Pairing

| Role | Font | Weights | Usage |
|---|---|---|---|
| **Display** | Cormorant Garamond | 400, 500, 600, 700 (+ italics) | Headings, hero text, section titles, drop caps |
| **Body** | Jost | 300, 400, 500, 600 | Body text, navigation, buttons, labels, captions |

### Hierarchy Rules

- **H1 (Hero):** Cormorant Garamond, 700 weight, ~4rem–5rem, tight letter-spacing
- **H2 (Section):** Cormorant Garamond, 600 weight, ~2.5rem–3rem, with italic accent word
- **H3 (Card/Subsection):** Cormorant Garamond, 600 weight, ~1.5rem
- **Body:** Jost, 400 weight, 1rem (18px base), generous line-height (1.7)
- **Labels/Caps:** Jost, 500 weight, uppercase, 0.15em letter-spacing
- **Navigation:** Jost, 400 weight, uppercase, 0.08em letter-spacing

### Base Font Size

The root font size is set to **18px** on desktop and **17px** on mobile (≤640px). All rem-based values scale proportionally.

---

## Layout Paradigm

### Asymmetric Editorial Grid

The layout avoids centered, symmetrical grids in favor of editorial asymmetry:

- **Hero:** Split layout — text occupies ~45% left, hero image ~55% right, with the image extending to the viewport edge
- **Story:** Reversed split — lifestyle image left, text + stats right
- **Products:** Featured product large on the left, 2×2 grid of cards on the right
- **Ingredients:** Full-width botanical image with overlaid ingredient cards
- **Bundles:** 3-column card grid with a featured "Most Popular" center card
- **Journal:** Featured article (split layout) above a 4-column article grid

### Spacing System

- Section vertical padding: `py-24` to `py-32` (6rem–8rem)
- Content max-width: `1280px` with responsive padding
- Card gaps: `gap-6` to `gap-8`
- Component internal padding: `p-6` to `p-8`

---

## Signature Elements

### Gold Editorial Dividers

Horizontal gradient lines using the gold accent color, fading from transparent at the edges to solid gold in the center. Applied between major sections and as decorative accents.

```css
.gold-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, oklch(0.72 0.10 80) 20%, oklch(0.72 0.10 80) 80%, transparent 100%);
}
```

### Italic Accent Words

Section headings use a pattern where one key word is rendered in italic Cormorant Garamond to create visual rhythm: "Signature *Products*", "Nature's Finest, *Carefully Curated*", "Beauty *Bundles*".

### Rounded Pill Buttons

All interactive buttons use `rounded-full` for a soft, luxurious pill shape. Primary buttons use the olive background with warm white text; secondary buttons use transparent backgrounds with olive borders.

---

## Interaction Philosophy

### Hover Micro-Interactions

- **Product Cards:** Lift upward (-8px translateY) with layered shadow, image zoom (1.08 scale), gold underline reveal on product name, price scale-up
- **Ingredient Cards:** Subtle lift with icon color shift to gold
- **Bundle Cards:** Shadow lift with rounded corner enhancement
- **Testimonial Cards:** Lift with gold quote mark pulse
- **Social Feed:** Image zoom with overlay fade-in showing likes/comments

### Scroll Animations

All sections use Intersection Observer-based reveal animations:

- **fade-up:** Elements translate up 30px and fade in
- **fade-left / fade-right:** Directional entrance from left or right (40px)
- **scale-in:** Elements scale from 0.92 to 1.0
- **Stagger:** Children animate sequentially with 120ms delays (up to 8 children)

### Parallax Scrolling

Key images (hero, story, products, ingredients) use a subtle parallax effect where the image translates at a slower rate than the scroll, creating depth.

---

## Animation Guidelines

| Animation | Duration | Easing | Purpose |
|---|---|---|---|
| Scroll reveal | 900ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Section entrance |
| Hover lift | 400ms | `ease-out` | Card interaction feedback |
| Image zoom | 700ms | `ease-out` | Product card hover |
| Theme toggle | 200ms | `ease-in-out` | Dark/light mode switch |
| Announcement rotation | Crossfade, 5s interval | `ease-in-out` | Promotional cycling |
| Mobile drawer | 500ms stagger | `cubic-bezier(0.22, 1, 0.36, 1)` | Navigation reveal |
| Loading screen | 600ms fade-out | `ease-in-out` | Initial page load |

---

## Component Inventory

| Component | Description |
|---|---|
| `AnnouncementBar` | Rotating promotional banner, dismissible, fixed at top |
| `Navbar` | Sticky navigation with theme toggle and mobile drawer |
| `HeroSection` | Asymmetric split hero with parallax image |
| `StorySection` | Brand story with lifestyle image and stat counters |
| `ProductsSection` | Featured product + 4-card grid with video hover and compare |
| `ProductDetailModal` | Full product details with tabs, reviews, sticky cart bar |
| `ProductComparison` | Side-by-side comparison of 2-3 products |
| `IngredientsSection` | Botanical image with ingredient cards |
| `SkincareQuiz` | 3-step interactive quiz with product recommendations |
| `RoutineBuilder` | Drag-and-drop morning/evening routine builder |
| `BundlesSection` | Bundle cards with countdown timer |
| `ShippingCalculator` | Zip code-based shipping estimator |
| `BeforeAfterGallery` | Draggable comparison slider with customer stories |
| `SkinJournal` | Editorial blog section with featured article |
| `SocialFeed` | Instagram-style masonry grid |
| `FAQSection` | Accordion FAQ organized by category |
| `LoyaltyTeaser` | 3-tier rewards program showcase |
| `TestimonialsSection` | Customer review carousel |
| `Footer` | Newsletter signup, link columns, brand info |
| `ScrollToTop` | Floating scroll-to-top button |
| `RecentlyViewed` | Persistent bottom strip tracking viewed products |
| `LoadingScreen` | Branded splash screen with logo animation |
| `ThemeToggle` | Sun/moon dark mode toggle |

---

## Responsive Breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | < 640px | Single column, stacked layouts, hamburger drawer |
| Tablet | 640px – 1023px | 2-column grids, condensed navigation |
| Desktop | ≥ 1024px | Full editorial layouts, max-width 1280px |

---

## Accessibility

- All interactive elements have visible focus rings
- Color contrast ratios meet WCAG 2.1 AA standards in both themes
- Semantic HTML with proper heading hierarchy
- ARIA labels on interactive elements (buttons, toggles, sliders)
- Keyboard-navigable accordion, modal, and drawer components
- `prefers-reduced-motion` respected via Tailwind's `motion-safe` utilities
- Skip-to-content link for keyboard users
