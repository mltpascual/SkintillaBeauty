# Skintilla Beauty — Workflow

## Development Methodology

The project follows an iterative, feature-driven development approach. Each feature is implemented as a self-contained unit — a new section, interactive component, or cross-cutting concern (like dark mode) — and is checkpointed after completion. This allows safe rollback to any stable state if a subsequent change introduces regressions.

Development proceeds through a cycle of **design → implement → verify → checkpoint**. Design decisions are documented in `DESIGN.md` and referenced during implementation. Visual verification happens through the Manus preview panel or local dev server. Checkpoints serve as both version control and deployment gates.

## Git Workflow and Commit Conventions

The project uses a single-branch workflow managed through Manus checkpoints. Each checkpoint represents a deployable state with a descriptive message summarizing the changes. Checkpoint messages follow this pattern:

> "Checkpoint saved: [Brief summary of what was added/changed]. [Specific details of each feature or fix]."

For future multi-developer workflows, the recommended branching strategy is:

| Branch | Purpose | Merge Target |
|--------|---------|-------------|
| `main` | Production-ready code | — |
| `feature/*` | New features and sections | `main` via PR |
| `fix/*` | Bug fixes | `main` via PR |
| `design/*` | Visual/styling changes | `main` via PR |

## Code Organization Conventions

### Component Structure

Each major section of the landing page is a standalone component in `client/src/components/`. Components are organized by responsibility rather than by technical layer.

| Directory | Contents |
|-----------|----------|
| `client/src/components/` | Section components (Hero, Products, Quiz, etc.) |
| `client/src/components/ui/` | Reusable shadcn/ui primitives |
| `client/src/contexts/` | React context providers (Theme, Compare) |
| `client/src/hooks/` | Custom hooks (useParallax, useScrollReveal, useDarkMode) |
| `client/src/pages/` | Page-level components (Home, NotFound) |
| `client/src/lib/` | Utility functions |

### Naming Conventions

Component files use PascalCase (e.g., `HeroSection.tsx`, `ProductDetailModal.tsx`). Hook files use camelCase with the `use` prefix (e.g., `useParallax.ts`). Context files use PascalCase with the `Context` suffix (e.g., `ThemeContext.tsx`). CSS classes follow Tailwind conventions with custom utilities defined in `index.css`.

### Import Aliases

The `@/` alias maps to `client/src/`, enabling clean imports like `import { Button } from "@/components/ui/button"`. All imports should use this alias rather than relative paths when crossing directory boundaries.

## Code Review Requirements

Before checkpointing, each feature should pass the following review criteria:

1. **Type Safety** — `tsc --noEmit` produces no errors.
2. **Visual Consistency** — The feature matches the Botanical Atelier design system documented in `DESIGN.md`.
3. **Responsive Design** — The feature works correctly at mobile (< 640px), tablet (640–1024px), and desktop (> 1024px) breakpoints.
4. **Dark Mode** — All new elements support both light and dark themes.
5. **Accessibility** — Interactive elements are keyboard-navigable and have appropriate ARIA attributes.
6. **Performance** — No unnecessary re-renders, images are lazy-loaded, animations use `will-change` or `transform` for GPU acceleration.

## Testing Requirements

### Current State

The testing infrastructure (Vitest) is installed but the test suite is minimal. The priority testing targets for expansion are:

| Priority | Component | Test Type | Rationale |
|----------|-----------|-----------|-----------|
| High | Skincare Quiz | Integration | Multi-step flow with state management |
| High | Routine Builder | Integration | Drag-and-drop with complex state |
| Medium | Product Comparison | Unit | Data transformation and filtering |
| Medium | Theme Toggle | Unit | LocalStorage persistence |
| Low | Scroll animations | Visual | Framer Motion integration |

### Coverage Targets

The recommended minimum coverage targets are 80% for utility functions, 70% for hooks, and 60% for components. Visual regression testing should cover all major sections in both light and dark modes.

## Quality Assurance Gates

Before any deployment or major checkpoint, the following gates must pass:

1. `pnpm run check` — TypeScript compilation with no errors
2. `pnpm run build:static` — Static build completes successfully
3. Manual visual review in preview panel at three breakpoints
4. Dark mode toggle produces no visual artifacts
5. All interactive features (quiz, routine builder, comparison) function correctly

## Deployment Procedures

### Manus Hosting (Primary)

Deployment through Manus follows a checkpoint-then-publish workflow. After creating a checkpoint via `webdev_save_checkpoint`, the user clicks the "Publish" button in the Management UI. The platform handles build, CDN distribution, and domain routing automatically.

### Vercel (Alternative)

The `vercel.json` configuration is included for Vercel deployment. The process involves pushing to a GitHub repository and connecting it to Vercel. The `build:static` script outputs to `dist/public/` which Vercel serves as a static site with SPA routing rewrites.

### Pre-Deployment Checklist

Before deploying, verify that all local media files have been uploaded to CDN and replaced with CDN URLs in the codebase. Ensure the `.gitignore` excludes development artifacts. Confirm that SEO meta tags and Open Graph data in `index.html` are accurate and up to date.
