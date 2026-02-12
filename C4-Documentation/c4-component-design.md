# C4 Component — Design System

## Overview

| Attribute | Value |
|-----------|-------|
| **Name** | Design System (Botanical Atelier) |
| **Type** | Style Layer |
| **Technology** | Tailwind CSS 4, OKLCH Color Space, CSS Custom Properties, Google Fonts |
| **Location** | `client/src/index.css`, `client/index.html` (font links) |

## Purpose

The Design System component defines the visual identity of Skintilla Beauty through CSS custom properties, Tailwind theme extensions, and typography configuration. It establishes the "Botanical Atelier" aesthetic — a warm, earthy, editorial design language that permeates every component. The design system supports both light and dark themes through OKLCH color tokens that maintain perceptual consistency across modes.

## Color Tokens

### Light Theme

| Token | OKLCH Value | Role |
|-------|-------------|------|
| `--background` | `oklch(0.96 0.015 80)` | Warm cream page background |
| `--foreground` | `oklch(0.25 0.03 55)` | Deep espresso text |
| `--primary` | `oklch(0.38 0.04 145)` | Deep olive — primary actions |
| `--accent` | `oklch(0.72 0.10 80)` | Burnished gold — highlights |
| `--card` | `oklch(0.98 0.008 80)` | Warm white card surfaces |
| `--secondary` | `oklch(0.93 0.02 75)` | Parchment — subtle backgrounds |

### Dark Theme

| Token | OKLCH Value | Role |
|-------|-------------|------|
| `--background` | `oklch(0.16 0.015 55)` | Deep espresso background |
| `--foreground` | `oklch(0.90 0.015 75)` | Warm cream text |
| `--primary` | `oklch(0.50 0.05 145)` | Lighter olive for dark surfaces |
| `--accent` | `oklch(0.72 0.10 80)` | Gold remains consistent |

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Headlines (H1–H3) | Cormorant Garamond | 400–700 | 2rem–4rem |
| Body text | Jost | 300–500 | 1rem (18px base) |
| Captions / Labels | Jost | 400 | 0.875rem |
| Buttons | Jost | 500 | 0.9375rem |

The base font size is set to 18px (desktop) and 17px (mobile) for improved readability. All rem-based sizing scales proportionally from this base.

## Layout Principles

The design system enforces asymmetric editorial layouts with generous negative space. Key layout patterns include offset grid compositions in the hero section, alternating image-text blocks in the story section, and card grids with varied column spans. The `container` class is customized to auto-center with responsive padding.

## Animation Tokens

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Fade-in on scroll | 600ms | ease-out | Intersection Observer |
| Parallax offset | Continuous | Linear | Scroll position |
| Hover lift | 300ms | ease | Mouse enter/leave |
| Theme transition | 300ms | ease | Theme toggle |
| Modal open/close | 200ms | spring | Dialog state change |

## Dependencies

| Dependency | Type | Purpose |
|------------|------|---------|
| Tailwind CSS 4 | External | Utility-first CSS framework with OKLCH support |
| Google Fonts CDN | External | Cormorant Garamond and Jost typeface delivery |
| tw-animate-css | External | Animation utility classes |
| tailwindcss-animate | External | Animation plugin |
| @tailwindcss/typography | External | Prose styling for editorial content |

## Related Documentation

The full design system specification is documented in [DESIGN.md](../DESIGN.md), which includes detailed color philosophy, signature visual elements, interaction guidelines, and component-specific styling rules.
