# Skintilla Beauty — Tech Stack

## Overview

Skintilla Beauty is built as a modern single-page application using React 19 with TypeScript, styled with Tailwind CSS 4, and bundled with Vite 7. The project follows a static-first architecture — all content is client-rendered with no server-side data fetching in the current phase. The technology choices prioritize developer experience, performance, and visual polish.

## Primary Languages and Frameworks

| Technology | Version | Role |
|-----------|---------|------|
| **TypeScript** | 5.6.3 | Primary language for all source code |
| **React** | 19.2.1 | UI component library |
| **React DOM** | 19.2.1 | DOM rendering |
| **Vite** | 7.1.7 | Build tool and dev server |
| **Tailwind CSS** | 4.1.14 | Utility-first CSS framework |
| **Node.js** | 22.13.0 | Runtime environment |
| **pnpm** | 10.15.1 | Package manager |

## Key Dependencies

### UI Component Library

The project uses **shadcn/ui** components built on Radix UI primitives. These provide accessible, unstyled building blocks that are customized to match the Botanical Atelier design system. Key Radix packages include accordion, dialog, tabs, select, tooltip, and navigation-menu.

### Animation and Interaction

| Package | Version | Purpose |
|---------|---------|---------|
| **Framer Motion** | 12.23.22 | Page transitions, scroll-triggered animations, parallax effects, staggered reveals |
| **Embla Carousel** | 8.6.0 | Testimonials carousel with touch support |

### Styling Utilities

| Package | Version | Purpose |
|---------|---------|---------|
| **tailwind-merge** | 3.3.1 | Intelligent Tailwind class merging |
| **class-variance-authority** | 0.7.1 | Component variant management |
| **clsx** | 2.1.1 | Conditional class composition |
| **tw-animate-css** | 1.4.0 | CSS animation utilities for Tailwind |
| **tailwindcss-animate** | 1.0.7 | Animation plugin for Tailwind |

### Routing and State

| Package | Version | Purpose |
|---------|---------|---------|
| **Wouter** | 3.3.5 | Lightweight client-side routing |
| **next-themes** | 0.4.6 | Theme management (dark/light mode) |

### Form and Validation

| Package | Version | Purpose |
|---------|---------|---------|
| **React Hook Form** | 7.64.0 | Form state management |
| **Zod** | 4.1.12 | Schema validation |
| **@hookform/resolvers** | 5.2.2 | Zod integration for React Hook Form |

### Utilities

| Package | Version | Purpose |
|---------|---------|---------|
| **Lucide React** | 0.453.0 | Icon library |
| **Recharts** | 2.15.2 | Data visualization (available for future use) |
| **Sonner** | 2.0.7 | Toast notifications |
| **nanoid** | 5.1.5 | Unique ID generation |
| **Axios** | 1.12.0 | HTTP client (available for future API integration) |

## Infrastructure and Deployment

| Aspect | Choice | Notes |
|--------|--------|-------|
| **Hosting** | Manus built-in hosting / Vercel | Static site deployment with SPA routing |
| **CDN** | Manus CDN / Vercel Edge | Static asset delivery |
| **Build Output** | `dist/` directory | Vite static build |
| **Domain** | `*.manus.space` (default) | Custom domain configurable |

The `vercel.json` configuration handles SPA routing by rewriting all routes to `index.html`. The `build:static` script produces a clean static build suitable for any static hosting provider.

## Development Tools and Environment

| Tool | Purpose |
|------|---------|
| **Vite Dev Server** | Hot module replacement, fast refresh |
| **TypeScript Compiler** | Type checking via `tsc --noEmit` |
| **Prettier** | Code formatting |
| **ESBuild** | Fast TypeScript/JSX compilation |
| **PostCSS** | CSS processing pipeline |
| **Autoprefixer** | Vendor prefix automation |

## Testing Frameworks

| Framework | Version | Status |
|-----------|---------|--------|
| **Vitest** | 2.1.4 | Installed, test suite to be expanded |

Testing infrastructure is in place but the test suite is minimal in the current phase. The recommended testing strategy includes unit tests for utility functions, component tests for interactive features (quiz, routine builder), and visual regression tests for the design system.

## Code Quality Tools

TypeScript strict mode is enabled for type safety. Prettier handles formatting consistency. The project uses ES modules throughout (`"type": "module"` in package.json). Import aliases are configured via `tsconfig.json` with `@/` mapping to `client/src/`.

## External Services

| Service | Usage | Integration Method |
|---------|-------|--------------------|
| **Pexels** | Product hover videos | Direct CDN URLs (no API key required for public videos) |
| **Google Fonts** | Typography (Cormorant Garamond, Jost) | CDN link in `index.html` |
| **Manus CDN** | AI-generated images | Direct URLs from image generation |

## Architecture Decisions

The decision to use a static-first architecture was driven by the project's current scope as a landing page and product showcase. All product data is embedded in the client bundle, eliminating the need for a database or API layer. This simplifies deployment, improves performance (no network waterfall for data), and reduces infrastructure costs. The architecture is designed to evolve — adding `web-db-user` features via Manus will introduce Express, PostgreSQL, and authentication when e-commerce functionality is needed.

Framer Motion was chosen over CSS-only animations for its declarative API, scroll-triggered animation support, and layout animation capabilities. The parallax effects, staggered reveals, and page transitions all benefit from Framer Motion's spring-based physics engine.

Tailwind CSS 4 with OKLCH color format was selected for its perceptually uniform color space, which produces more natural-looking color gradients and theme transitions — particularly important for the dark mode implementation.
