# C4 Component — UI Primitives

## Overview

| Attribute | Value |
|-----------|-------|
| **Name** | UI Primitives (shadcn/ui) |
| **Type** | Component Library |
| **Technology** | React 19, Radix UI, Tailwind CSS 4, class-variance-authority |
| **Location** | `client/src/components/ui/` |

## Purpose

The UI Primitives component provides the foundational, reusable building blocks used throughout the application. These are shadcn/ui components built on Radix UI primitives, customized to match the Botanical Atelier design system. They handle accessibility, keyboard navigation, and focus management out of the box, allowing section and interactive components to focus on business logic and layout.

## Component Inventory

| Component | File | Radix Primitive | Usage |
|-----------|------|----------------|-------|
| Accordion | `accordion.tsx` | `@radix-ui/react-accordion` | FAQ section |
| Button | `button.tsx` | Radix Slot | CTAs, form submissions, cart actions |
| Card | `card.tsx` | — | Product cards, bundle cards, testimonial cards |
| Dialog | `dialog.tsx` | `@radix-ui/react-dialog` | Product detail modal, comparison modal |
| Tabs | `tabs.tsx` | `@radix-ui/react-tabs` | Product detail modal tabs |
| Tooltip | `tooltip.tsx` | `@radix-ui/react-tooltip` | Icon button labels |
| Sonner/Toast | `sonner.tsx` | Sonner | Cart action confirmations |
| Select | `select.tsx` | `@radix-ui/react-select` | Quiz selections, shipping calculator |
| Separator | `separator.tsx` | `@radix-ui/react-separator` | Visual dividers |
| Badge | `badge.tsx` | — | "New Arrivals," "Most Popular" labels |
| Input | `input.tsx` | — | Newsletter signup, shipping calculator |
| Drawer | `drawer.tsx` | Vaul | Mobile navigation drawer |

The full `ui/` directory contains 40+ components, though many are available but not yet actively used. The components listed above are the ones currently integrated into the landing page.

## Customization Approach

All shadcn/ui components are customized through Tailwind CSS classes and the `cn()` utility function. The `class-variance-authority` library manages component variants (size, color, style). Global design tokens (colors, border-radius, shadows) are defined as CSS custom properties in `client/src/index.css` and consumed by the components through Tailwind's theme system.

## Dependencies

| Dependency | Type | Purpose |
|------------|------|---------|
| Radix UI (multiple packages) | External | Accessible, unstyled primitives |
| class-variance-authority | External | Variant management |
| tailwind-merge | External | Intelligent class merging |
| clsx | External | Conditional class composition |
| Vaul | External | Drawer component |
| Sonner | External | Toast notifications |
