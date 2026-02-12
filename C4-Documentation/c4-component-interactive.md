# C4 Component — Interactive Features

## Overview

| Attribute | Value |
|-----------|-------|
| **Name** | Interactive Features |
| **Type** | Application Components |
| **Technology** | React 19, Framer Motion, Radix UI, React DnD |
| **Location** | `client/src/components/` (interactive components) |

## Purpose

The Interactive Features component group contains the complex, stateful components that provide the application's engagement and personalization capabilities. Unlike the section components (which are primarily presentational), these components manage multi-step flows, drag-and-drop interactions, comparison state, and dynamic calculations.

## Software Features

| Component | File | Description |
|-----------|------|-------------|
| **Skincare Quiz** | `SkincareQuiz.tsx` | 3-step flow: skin type → concerns → texture preference → personalized recommendation |
| **Routine Builder** | `RoutineBuilder.tsx` | Drag-and-drop interface for morning/evening skincare routine assembly |
| **Product Comparison** | `ProductComparison.tsx` | Side-by-side modal comparing 2–3 products across 8 criteria |
| **Before & After Gallery** | `BeforeAfterGallery.tsx` | Draggable slider comparing before/after skin transformation images |
| **Product Detail Modal** | `ProductDetailModal.tsx` | 4-tab modal (Overview, Ingredients, How to Use, Reviews) with sticky mobile cart bar |
| **Shipping Calculator** | `ShippingCalculator.tsx` | Zip code-based shipping cost estimation widget |
| **Product Video Hover** | `ProductVideoHover.tsx` | Lazy-loaded video playback triggered on product card hover |
| **Scroll to Top** | `ScrollToTop.tsx` | Floating button appearing after 600px scroll |
| **Recently Viewed** | `RecentlyViewed.tsx` | Expandable bottom strip tracking viewed products via localStorage |
| **Theme Toggle** | `ThemeToggle.tsx` | Sun/moon icon button toggling dark/light mode |

## State Management Patterns

| Component | State Type | Persistence |
|-----------|-----------|-------------|
| Skincare Quiz | Local `useState` (step, selections) | None (resets on navigation) |
| Routine Builder | Local `useState` (morning/evening arrays) | None |
| Product Comparison | React Context (`CompareProvider`) | Session only |
| Recently Viewed | `localStorage` + `useState` | Persistent across sessions |
| Theme Toggle | React Context + `localStorage` | Persistent across sessions |
| Product Detail Modal | Local `useState` (open/close, active tab) | None |

## Dependencies

| Dependency | Type | Purpose |
|------------|------|---------|
| Framer Motion | External | Modal animations, step transitions, drag interactions |
| Radix Dialog | External | Accessible modal overlay for product details and comparison |
| Radix Tabs | External | Tab navigation in product detail modal |
| Sonner | External | Toast notifications for cart actions |
| Lucide React | External | Icons for interactive controls |
| CompareProvider | Internal Context | Shared state for product comparison selections |
| ThemeContext | Internal Context | Theme state for toggle component |
