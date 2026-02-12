# C4 Component — Page Router

## Overview

| Attribute | Value |
|-----------|-------|
| **Name** | Page Router |
| **Type** | Application Shell |
| **Technology** | React 19, Wouter 3.3, ErrorBoundary |
| **Location** | `client/src/App.tsx`, `client/src/main.tsx`, `client/src/pages/` |

## Purpose

The Page Router component serves as the application shell and entry point. It initializes the React application, configures global providers (theme, tooltips, toasts), defines client-side routes, and renders page-level components. The routing is handled by Wouter, a lightweight alternative to React Router that provides hash-free URL routing suitable for SPA deployments.

## Software Features

| Feature | Description |
|---------|-------------|
| Client-Side Routing | Maps URL paths to page components using Wouter's `<Switch>` and `<Route>` |
| Error Boundary | Catches and gracefully handles runtime errors in the component tree |
| Theme Provider | Wraps the application in a theme context for dark/light mode support |
| Toast System | Provides global toast notification capability via Sonner |
| Tooltip Provider | Enables tooltip functionality across all child components |

## Code Elements

| File | Description |
|------|-------------|
| `client/src/main.tsx` | React DOM entry point, mounts `<App />` to `#root` |
| `client/src/App.tsx` | Application shell with providers, router, and global UI |
| `client/src/pages/Home.tsx` | Main landing page composing all sections |
| `client/src/pages/NotFound.tsx` | 404 fallback page |
| `client/src/components/ErrorBoundary.tsx` | React error boundary for graceful error handling |

## Dependencies

| Dependency | Type | Purpose |
|------------|------|---------|
| Wouter | External | Client-side routing |
| ThemeContext | Internal | Theme provider wrapping the app |
| Sonner | External | Toast notification system |
| Radix Tooltip | External | Tooltip provider |
