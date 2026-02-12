# C4 Component — Section Components

## Overview

| Attribute | Value |
|-----------|-------|
| **Name** | Section Components |
| **Type** | UI Component Library |
| **Technology** | React 19, Framer Motion, Tailwind CSS 4 |
| **Location** | `client/src/components/` (non-interactive sections) |

## Purpose

The Section Components group contains the 14+ visual sections that compose the Skintilla Beauty landing page. Each section is a self-contained React component responsible for its own layout, content, animations, and responsive behavior. Sections are composed vertically in `Home.tsx` and share the Botanical Atelier design system through Tailwind CSS classes and CSS custom properties.

## Software Features

| Section | File | Description |
|---------|------|-------------|
| Hero | `HeroSection.tsx` | Asymmetric editorial layout with AI-generated imagery, headline, and CTA |
| Brand Story | `StorySection.tsx` | Company narrative with lifestyle photos and milestone statistics |
| Products | `ProductsSection.tsx` | 4-product grid with video-on-hover, "New Arrivals" badges, and detail modal triggers |
| Ingredients | `IngredientsSection.tsx` | Natural ingredients showcase with botanical illustrations |
| Bundles | `BundlesSection.tsx` | 3 beauty bundles with pricing, countdown timer, and "Most Popular" badge |
| Testimonials | `TestimonialsSection.tsx` | Customer review carousel with star ratings and profile images |
| Social Feed | `SocialFeed.tsx` | Instagram-style grid (#SkintillaGlow) with hover overlays showing likes/comments |
| FAQ | `FAQSection.tsx` | 10 questions across 3 categories using Radix Accordion |
| Loyalty | `LoyaltyTeaser.tsx` | 3-tier rewards program (Petal, Bloom, Radiance) with benefits breakdown |
| Journal | `SkinJournal.tsx` | Editorial blog section with featured article and category grid |
| Footer | `Footer.tsx` | Site footer with navigation links, newsletter signup, and social icons |
| Announcement Bar | `AnnouncementBar.tsx` | Rotating promotional banner with 4 messages and dismiss button |
| Navbar | `Navbar.tsx` | Sticky navigation with links, dark mode toggle, and mobile hamburger drawer |
| Loading Screen | `LoadingScreen.tsx` | Branded splash screen with Skintilla logo fade-out animation |

## Shared Patterns

All section components follow these patterns:

1. **Scroll-triggered animations** via `useScrollReveal` hook or Framer Motion's `whileInView`.
2. **Dark mode support** through Tailwind's `dark:` variant classes.
3. **Responsive layouts** using Tailwind breakpoint utilities (`sm:`, `md:`, `lg:`).
4. **Consistent spacing** following the design system's vertical rhythm.
5. **OKLCH color tokens** referenced through CSS custom properties.

## Dependencies

| Dependency | Type | Purpose |
|------------|------|---------|
| Framer Motion | External | Scroll animations, parallax, staggered reveals |
| Radix Accordion | External | FAQ section expandable panels |
| Embla Carousel | External | Testimonials carousel |
| Lucide React | External | Icons throughout sections |
| useScrollReveal | Internal Hook | Intersection Observer-based fade-in |
| useParallax | Internal Hook | Parallax scrolling effect on images |
| ThemeContext | Internal Context | Dark mode class toggling |
| AnnouncementBarProvider | Internal Context | Navbar offset coordination |
