# Skintilla Beauty

**Luxury Natural Skincare — Est. 2019**

Skintilla Beauty is a premium skincare brand landing page built with React 19, Tailwind CSS 4, and shadcn/ui. The site showcases pampering skincare products and curated beauty bundles for all skin types, combining natural ingredients with luxurious formulations for an effective, rejuvenating experience. The design follows a **Botanical Atelier** aesthetic — an editorial luxury style inspired by high-end beauty publications.

---

## Key Features

| Feature | Description |
|---|---|
| **Interactive Skincare Quiz** | 3-step quiz recommending products based on skin type, concerns, and routine preferences |
| **Product Comparison** | Side-by-side comparison of 2-3 products on ingredients, price, ratings, and skin suitability |
| **Routine Builder** | Drag-and-drop morning/evening skincare routine builder with bundle pricing |
| **Before & After Gallery** | Draggable comparison slider showcasing customer transformation stories |
| **Product Detail Modals** | Full product details with tabs for Overview, Ingredients, How to Use, and Reviews |
| **Video-on-Hover** | Lazy-loaded looping product videos that play when hovering over product cards |
| **Dark Mode** | Full light/dark theme toggle with a warm espresso dark palette |
| **Shipping Calculator** | Zip code-based shipping estimator with delivery date and cost estimates |
| **Loyalty Program Teaser** | 3-tier rewards program (Petal, Bloom, Radiance) showcase |
| **Skin Journal** | Editorial blog section with featured articles and category-based filtering |
| **Social Proof Feed** | Instagram-style masonry grid with user-generated content |
| **FAQ Accordion** | 10 questions organized into 3 categories with smooth expand/collapse |
| **Announcement Bar** | Rotating promotional banner with crossfade animation |
| **Recently Viewed** | Persistent bottom strip tracking clicked products via localStorage |
| **Parallax Scrolling** | Subtle depth effects on hero, story, product, and ingredient images |
| **Scroll Animations** | Intersection Observer-based fade-up, fade-left, fade-right, and scale-in reveals |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | shadcn/ui (Radix primitives) |
| **Animation** | Framer Motion + CSS transitions |
| **Routing** | Wouter |
| **Icons** | Lucide React |
| **Toasts** | Sonner |
| **Language** | TypeScript 5.6 |
| **Package Manager** | pnpm 10 |
| **Deployment** | Vercel (static SPA) |

---

## Prerequisites

Before running the project locally, ensure you have the following installed:

- **Node.js** 20 or higher
- **pnpm** 10 or higher (install via `npm install -g pnpm`)
- A modern browser (Chrome, Firefox, Safari, or Edge)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/skintilla-beauty.git
cd skintilla-beauty
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start the Development Server

```bash
pnpm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000). Vite's Hot Module Replacement (HMR) is enabled, so changes to source files will be reflected instantly in the browser.

### 4. Build for Production

For a static build suitable for Vercel or any static hosting provider:

```bash
pnpm run build:static
```

The output will be generated in the `dist/public/` directory. This is a pure client-side SPA with no server-side rendering required.

### 5. Preview the Production Build

```bash
pnpm run preview
```

---

## Project Architecture

### Directory Structure

```
skintilla-beauty/
├── client/
│   ├── index.html              # HTML entry point with SEO meta tags, OG data, JSON-LD
│   ├── public/                 # Static assets (copied verbatim to build output)
│   └── src/
│       ├── App.tsx             # Root component with routing and theme provider
│       ├── main.tsx            # React entry point
│       ├── index.css           # Global styles, design tokens, animations
│       ├── pages/
│       │   ├── Home.tsx        # Main landing page assembling all sections
│       │   └── NotFound.tsx    # 404 page
│       ├── components/
│       │   ├── AnnouncementBar.tsx      # Rotating promotional banner
│       │   ├── Navbar.tsx               # Sticky nav with theme toggle + mobile drawer
│       │   ├── HeroSection.tsx          # Asymmetric hero with parallax
│       │   ├── StorySection.tsx         # Brand story with stats
│       │   ├── ProductsSection.tsx      # Product grid with video hover + compare
│       │   ├── ProductDetailModal.tsx   # Product modal with tabs + sticky cart
│       │   ├── ProductComparison.tsx    # Side-by-side product comparison
│       │   ├── ProductVideoHover.tsx    # Lazy video-on-hover component
│       │   ├── IngredientsSection.tsx   # Natural ingredients showcase
│       │   ├── SkincareQuiz.tsx         # Interactive 3-step skincare quiz
│       │   ├── RoutineBuilder.tsx       # Drag-and-drop routine builder
│       │   ├── BundlesSection.tsx       # Bundle cards with countdown timer
│       │   ├── ShippingCalculator.tsx   # Zip code shipping estimator
│       │   ├── BeforeAfterGallery.tsx   # Before/after comparison slider
│       │   ├── SkinJournal.tsx          # Editorial blog section
│       │   ├── SocialFeed.tsx           # Instagram-style social grid
│       │   ├── FAQSection.tsx           # Accordion FAQ by category
│       │   ├── LoyaltyTeaser.tsx        # Rewards program showcase
│       │   ├── TestimonialsSection.tsx   # Customer review carousel
│       │   ├── Footer.tsx               # Newsletter + links + brand info
│       │   ├── ScrollToTop.tsx          # Floating scroll-to-top button
│       │   ├── RecentlyViewed.tsx       # Persistent recently viewed strip
│       │   ├── LoadingScreen.tsx        # Branded splash screen
│       │   ├── ThemeToggle.tsx          # Sun/moon dark mode toggle
│       │   └── ui/                      # shadcn/ui primitive components
│       ├── hooks/
│       │   ├── useScrollReveal.ts       # Intersection Observer scroll animations
│       │   ├── useParallax.ts           # Parallax scroll effect
│       │   ├── useDarkMode.ts           # Dark mode utility hook
│       │   └── useMobile.tsx            # Mobile breakpoint detection
│       ├── contexts/
│       │   └── ThemeContext.tsx          # Light/dark theme provider
│       └── lib/
│           └── utils.ts                 # Tailwind merge + class utilities
├── server/
│   └── index.ts                # Express server for production (serves static files)
├── vercel.json                 # Vercel deployment configuration
├── DESIGN.md                   # Complete design system documentation
├── DEVELOPMENT_GUIDELINES.md   # Coding standards and best practices
├── conductor/                  # Project context artifacts
│   ├── index.md                # Context hub and navigation
│   ├── product.md              # Product vision, users, roadmap
│   ├── product-guidelines.md   # Brand voice and copy standards
│   ├── tech-stack.md           # Technology choices and dependencies
│   ├── workflow.md             # Development practices and conventions
│   └── tracks.md               # Work unit registry and history
├── C4-Documentation/           # Architecture documentation (C4 model)
│   ├── c4-context.md           # System context with personas and journeys
│   ├── c4-container.md         # Container-level deployment architecture
│   ├── c4-component.md         # Component index and relationships
│   └── c4-component-*.md       # Detailed component documentation
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite build configuration
```

### Page Composition

The `Home.tsx` page assembles all section components in the following order:

```
LoadingScreen
├── AnnouncementBar (fixed top)
├── Navbar (sticky, below announcement)
├── HeroSection
├── StorySection
├── ProductsSection (with ProductDetailModal + ProductComparison)
├── IngredientsSection
├── SkincareQuiz
├── RoutineBuilder
├── BundlesSection (with ShippingCalculator + countdown timer)
├── BeforeAfterGallery
├── SkinJournal
├── SocialFeed
├── FAQSection
├── LoyaltyTeaser
├── TestimonialsSection
├── Footer
├── ScrollToTop (floating)
└── RecentlyViewed (persistent bottom strip)
```

### State Management

The application uses React's built-in state management without external libraries:

| State | Mechanism | Scope |
|---|---|---|
| Theme (dark/light) | React Context + localStorage | Global |
| Product comparison | React Context (CompareProvider) | Page-level |
| Announcement bar visibility | React Context | Page-level |
| Recently viewed products | localStorage | Persistent |
| Quiz answers | Component state | Local |
| Routine builder selections | Component state | Local |
| Modal open/close | Component state | Local |

### Animation System

The project uses a layered animation approach documented in detail in `DESIGN.md`:

1. **Scroll Reveal** — Intersection Observer triggers CSS class transitions (fade-up, fade-left, fade-right, scale-in) with staggered delays for child elements.
2. **Parallax** — Custom `useParallax` hook applies `translateY` transforms based on scroll position for depth effects on images.
3. **Hover Micro-Interactions** — CSS transitions for card lift, shadow, image zoom, and color shifts.
4. **Framer Motion** — Used for complex component animations (mobile drawer, modal transitions).

---

## Design System

The complete design system is documented in `DESIGN.md`. Key highlights:

### Typography

| Role | Font | Weights |
|---|---|---|
| Display (headings) | Cormorant Garamond | 400, 500, 600, 700 |
| Body (text, UI) | Jost | 300, 400, 500, 600 |

### Color Palette

The palette uses OKLCH color space and draws from natural materials:

| Name | Light Theme | Dark Theme | Usage |
|---|---|---|---|
| Cream | `oklch(0.96 0.015 80)` | — | Page background |
| Espresso | `oklch(0.25 0.03 55)` | `oklch(0.16 0.015 55)` | Text / dark bg |
| Olive | `oklch(0.38 0.04 145)` | `oklch(0.50 0.05 145)` | Primary actions |
| Gold | `oklch(0.72 0.10 80)` | `oklch(0.72 0.10 80)` | Accents, dividers |
| Parchment | `oklch(0.93 0.02 75)` | `oklch(0.22 0.015 55)` | Section alternation |

### Base Font Size

The root font size is **18px** on desktop and **17px** on mobile (breakpoint at 640px). All rem-based values scale proportionally.

---

## Deployment

### Vercel (Recommended)

The project includes a `vercel.json` configuration file for seamless deployment:

1. Push the repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Vercel will auto-detect the configuration from `vercel.json`:
   - **Build Command:** `pnpm run build:static`
   - **Output Directory:** `dist/public`
   - **Framework:** Vite
4. Deploy. The SPA routing is handled by the `rewrites` rule in `vercel.json`.

### Other Static Hosts

Since this is a pure static SPA, it can be deployed to any static hosting provider:

```bash
# Build the project
pnpm run build:static

# The output in dist/public/ can be uploaded to:
# - Netlify (drag and drop dist/public/)
# - GitHub Pages
# - AWS S3 + CloudFront
# - Firebase Hosting
```

For SPA routing support, ensure your hosting provider is configured to serve `index.html` for all routes (the `vercel.json` already handles this for Vercel).

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `pnpm run dev` | Start Vite dev server with HMR on port 3000 |
| `build` | `pnpm run build` | Full build (client + server) |
| `build:static` | `pnpm run build:static` | Static client-only build for Vercel |
| `preview` | `pnpm run preview` | Preview production build locally |
| `check` | `pnpm run check` | TypeScript type checking |
| `format` | `pnpm run format` | Format code with Prettier |

---

## SEO

The project includes comprehensive SEO optimization:

- **Meta Tags** — Title, description, keywords, author, robots, and theme-color
- **Open Graph** — Full OG tags for Facebook/LinkedIn sharing with image, title, and description
- **Twitter Cards** — Summary large image card for Twitter sharing
- **JSON-LD Structured Data** — Organization schema, Product schema (ItemList), and FAQ schema
- **Canonical URL** — Prevents duplicate content issues
- **Semantic HTML** — Proper heading hierarchy, landmark elements, and ARIA attributes

---

## Responsive Design

The site is fully responsive across three breakpoints:

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | < 640px | Single column, hamburger drawer, stacked cards |
| Tablet | 640px – 1023px | 2-column grids, condensed navigation |
| Desktop | ≥ 1024px | Full editorial layouts, max-width 1280px |

Key mobile optimizations include touch-friendly tap targets, stacked layouts for the Routine Builder and Skin Journal, full-width inputs in the Shipping Calculator, and a full-screen slide-in navigation drawer with staggered link animations.

---

## Accessibility

The project follows WCAG 2.1 AA guidelines:

- Visible focus rings on all interactive elements
- Color contrast ratios meeting AA standards in both light and dark themes
- Semantic HTML with proper heading hierarchy (h1 through h4)
- ARIA labels on buttons, toggles, sliders, and interactive elements
- Keyboard-navigable accordions, modals, and drawer components
- `prefers-reduced-motion` support via Tailwind's motion-safe utilities
- Proper alt text on all images

---

## Browser Support

| Browser | Version |
|---|---|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 15+ |
| Edge | 90+ |

The project uses modern CSS features (OKLCH colors, `clip-path`, CSS custom properties) that require relatively recent browser versions.

---

## Documentation

The project includes a comprehensive documentation suite:

| Document | Purpose |
|----------|--------|
| [DESIGN.md](./DESIGN.md) | Visual design system — colors, typography, layout, animations |
| [DEVELOPMENT_GUIDELINES.md](./DEVELOPMENT_GUIDELINES.md) | Coding standards synthesized from 8 specialized development skills |
| [conductor/product.md](./conductor/product.md) | Product vision, target users, features, and roadmap |
| [conductor/tech-stack.md](./conductor/tech-stack.md) | Technology choices, dependencies, and architecture decisions |
| [conductor/workflow.md](./conductor/workflow.md) | Development practices, conventions, and deployment procedures |
| [C4-Documentation/c4-context.md](./C4-Documentation/c4-context.md) | System context with personas and user journeys |
| [C4-Documentation/c4-component.md](./C4-Documentation/c4-component.md) | Component architecture and relationship diagrams |

---

## License

MIT

---

## Credits

- **Design & Development:** Built with the Botanical Atelier design system
- **Typography:** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) by Christian Thalmann, [Jost](https://fonts.google.com/specimen/Jost) by Owen Earl
- **Icons:** [Lucide](https://lucide.dev/)
- **UI Primitives:** [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Product Videos:** [Pexels](https://www.pexels.com/) (free stock video)
- **Photography:** [Unsplash](https://unsplash.com/) (free stock photography) + AI-generated imagery
