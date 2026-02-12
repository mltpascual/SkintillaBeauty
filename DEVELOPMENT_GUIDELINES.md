# Development Guidelines — Skintilla Beauty

> **Purpose:** This document synthesizes best practices from 8 specialized development disciplines into a single reference for all developers and AI agents working on the Skintilla Beauty project. It covers UI/UX, code quality, security, and testing.

---

## Table of Contents

1. [UI/UX & Frontend](#1-uiux--frontend)
2. [Code Quality & Best Practices](#2-code-quality--best-practices)
3. [Security](#3-security)
4. [Testing](#4-testing)

---

## 1. UI/UX & Frontend

### 1.1 Design Philosophy

The Skintilla Beauty project follows a **Botanical Atelier** design direction — an organic luxury editorial aesthetic. Every design decision should reinforce this identity. When in doubt, ask: "Does this choice reinforce or dilute our design philosophy?"

| Principle | Implementation |
|---|---|
| **Strategic Typography** | Cormorant Garamond (serif display) + Jost (geometric sans body). Never use a single weight for the entire interface. |
| **Functional Whitespace** | Treat whitespace as an active design ingredient. Generous padding, asymmetric layouts, editorial spacing. |
| **Depth & Texture** | Subtle shadows, gentle gradients, blur effects. Interfaces should feel polished and dimensional, not flat. |
| **Interactive Nuances** | Fluid transitions, hover effects, entrance animations. The UI should feel dynamic and responsive. |
| **Aesthetic Cohesion** | Warm cream/olive/gold/espresso palette enforced across all components. |

### 1.2 Component Design Rules

Components should be built with the following hierarchy of concerns:

1. **Accessibility first** — every interactive element must be keyboard-reachable with visible focus rings.
2. **Semantic HTML** — use `<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`, `<section>`, `<article>` for structure.
3. **Responsive by default** — design mobile-first, then enhance for tablet and desktop breakpoints.
4. **Dark mode aware** — all components must support both light and dark themes using CSS variables.

### 1.3 Accessibility Standards

| Rule | Details |
|---|---|
| **Focus Management** | Visible focus rings on all interactive elements. Use `focus-visible` for keyboard-only focus. |
| **ARIA Labels** | Icon-only buttons require `aria-label`. Decorative images use `alt=""`. |
| **Color Contrast** | Minimum 4.5:1 for body text, 3:1 for large text (WCAG AA). |
| **Reduced Motion** | Honor `prefers-reduced-motion` — provide reduced variant or disable animations. |
| **Form Inputs** | Every input needs a visible `<label>`. Use correct `type` and `inputmode`. Never block paste. |
| **Touch Targets** | Minimum 44×44px for all interactive elements on mobile. |

### 1.4 Typography Rules

- Use `…` (ellipsis character) not `...` (three dots).
- Use curly quotes `"` `"` not straight `"`.
- Non-breaking spaces for units: `10&nbsp;MB`, brand names.
- Loading states end with `…`: "Loading…", "Saving…".
- Use `font-variant-numeric: tabular-nums` for number columns.
- Use `text-wrap: balance` on headings to prevent widows.

### 1.5 Image & Media Guidelines

- All `<img>` elements need explicit `width` and `height` attributes to prevent CLS.
- Below-fold images must use `loading="lazy"`.
- Above-fold critical images use `fetchpriority="high"`.
- Static assets reside in `/home/ubuntu/webdev-static-assets/` and are referenced via CDN URLs — never copy images into the project directory.

### 1.6 Animation Guidelines

- Animate only `transform` and `opacity` (compositor-friendly properties).
- Never use `transition: all` — list properties explicitly.
- All animations must be interruptible and respond to user input mid-animation.
- Set correct `transform-origin` for scale and rotation effects.
- Parallax effects should be subtle (0.3–0.5 speed factor) to avoid motion sickness.

### 1.7 Layout & Responsive Design

- Use Flexbox and CSS Grid over JavaScript measurement for layout.
- Full-bleed layouts need `env(safe-area-inset-*)` for notches.
- Avoid unwanted scrollbars: use `overflow-x-hidden` on containers.
- URL should reflect state — filters, tabs, pagination in query params.
- Links use `<a>` or `<Link>` (supports Cmd/Ctrl+click, middle-click).

### 1.8 Dark Mode & Theming

- Use CSS variables defined in `client/src/index.css` for all colors.
- `color-scheme: dark` on `<html>` for dark themes.
- Native `<select>` elements need explicit `background-color` and `color` for Windows dark mode.
- Always pair `bg-{semantic}` with `text-{semantic}-foreground`.

### 1.9 Anti-Patterns to Avoid

- `user-scalable=no` or `maximum-scale=1` disabling zoom.
- `transition: all` instead of specific properties.
- `outline-none` without a `focus-visible` replacement.
- Inline `onClick` navigation without `<a>`.
- `<div>` or `<span>` with click handlers (should be `<button>`).
- Form inputs without labels.
- Icon buttons without `aria-label`.
- Hardcoded date/number formats (use `Intl.*`).

---

## 2. Code Quality & Best Practices

### 2.1 Naming Conventions

| Element | Convention | Example |
|---|---|---|
| **Variables** | Intention-revealing, camelCase | `elapsedTimeInDays` not `d` |
| **Functions** | Verb-based, descriptive | `calculateTotalPrice()` not `calc()` |
| **Components** | PascalCase, noun-based | `ProductCard`, `ShippingCalculator` |
| **CSS Classes** | Tailwind utilities or semantic names | `bg-primary`, `text-foreground` |
| **Files** | PascalCase for components, camelCase for hooks | `ProductCard.tsx`, `useScrollReveal.ts` |
| **Constants** | SCREAMING_SNAKE_CASE | `MAX_COMPARE_ITEMS` |

Avoid disinformation: do not use `accountList` if it is not a `List`. Make meaningful distinctions — avoid vague pairs like `ProductData` vs `ProductInfo`.

### 2.2 Function Design

Functions should follow the Single Responsibility Principle. Each function should do one thing, do it well, and do it only. Keep functions small and limit arguments to two or fewer where possible. Three or more arguments should be avoided — consider using an options object instead.

Functions must not have hidden side effects. If a function named `checkPassword` also initializes a session, that is a violation. Extract the side effect into a clearly named function.

### 2.3 Component Architecture

- Keep components small and focused on a single responsibility.
- Extract shared UI into `client/src/components/` for reuse instead of copy-paste.
- Use composition over inheritance — prefer props and children over deep component hierarchies.
- Separate data-fetching logic from presentation logic using custom hooks.
- Never call `setState` or navigation in the render phase — wrap in `useEffect`.

### 2.4 Error Handling

- Use exceptions over return codes to keep primary logic clean.
- Write `try-catch-finally` blocks first to define the scope of an operation.
- Never return `null` — it forces callers to perform null checks everywhere.
- Error messages should include the fix or next step, not just the problem.
- Sanitize error messages in production to prevent information leakage.

### 2.5 Comments & Documentation

Do not comment bad code — rewrite it. Clear code is better than commented code. Use well-named functions and variables to make the code self-explanatory.

**Good comments:** Legal disclaimers, explanations of intent for complex algorithms, clarification for external library usage, and TODOs with ticket references.

**Bad comments:** Mumbling, redundant restatements of the code, misleading descriptions, noise comments, and position markers.

### 2.6 Code Formatting

Follow the Newspaper Metaphor: high-level concepts at the top of the file, details at the bottom. Keep related lines of code close to each other. Declare variables near their usage. Use consistent indentation throughout the project.

### 2.7 Code Smells to Watch For

| Smell | Description |
|---|---|
| **Rigidity** | The system is difficult to change because every change forces many other changes. |
| **Fragility** | Changes cause the system to break in unexpected places. |
| **Immobility** | Components are hard to reuse in other contexts. |
| **Viscosity** | It is easier to do the wrong thing than the right thing. |
| **Needless Complexity** | Overly complex code that anticipates requirements that may never come. |
| **Needless Repetition** | Duplicated code that should be abstracted. |

---

## 3. Security

### 3.1 Authentication & Authorization

| Practice | Details |
|---|---|
| **Strong Authentication** | Use industry-standard protocols (OAuth 2.0, OpenID Connect). Never implement custom auth schemes. |
| **Password Hashing** | Use bcrypt or Argon2 — never store passwords in plain text. |
| **Token Management** | Use short-lived access tokens with refresh token rotation. Never store sensitive data in JWT payloads. |
| **Multi-Factor Authentication** | Implement MFA for sensitive operations. |
| **Session Management** | Implement secure session handling with proper timeouts and invalidation. |

### 3.2 Input Validation & Sanitization

All user input must be validated and sanitized on both client and server side. Use parameterized queries to prevent SQL injection — never use string concatenation for building queries. Validate data types, lengths, formats, and ranges. Reject unexpected input rather than trying to fix it.

### 3.3 Rate Limiting & Throttling

- Apply rate limiting per user or IP address to prevent abuse.
- Set up API throttling to control the rate of incoming requests.
- Configure request quotas to limit requests per time window.
- Gracefully handle rate limit errors with informative responses.
- Monitor for suspicious activity patterns.

### 3.4 Data Protection

- Use HTTPS/TLS to encrypt all data in transit.
- Encrypt sensitive data at rest in databases or files.
- Implement proper error handling to avoid leaking sensitive information.
- Use security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options).
- Never log sensitive data (passwords, tokens, PII).

### 3.5 Dependency Security

- Keep all dependencies and packages up to date.
- Run `npm audit` or equivalent regularly to check for known vulnerabilities.
- Pin dependency versions to avoid unexpected breaking changes.
- Review new dependencies before adding them — check maintenance status, download counts, and known issues.

### 3.6 Security Do's and Don'ts

**Do:**
- Use HTTPS everywhere.
- Implement authentication for all protected endpoints.
- Validate all user inputs.
- Implement CORS properly, only allowing trusted origins.
- Log security events and monitor for suspicious activity.

**Don't:**
- Store passwords in plain text.
- Use weak or default secrets.
- Expose stack traces in production.
- Disable CORS completely.
- Store sensitive data in JWT payloads.
- Ignore security updates for dependencies.

---

## 4. Testing

### 4.1 Test Strategy

Prioritize testing critical user journeys that are essential to the application's functionality. For Skintilla Beauty, the critical paths include:

| Critical Path | What to Test |
|---|---|
| **Product Browsing** | Product cards render, images load, hover effects work, modal opens with correct data. |
| **Skincare Quiz** | All 3 steps complete, correct product recommendation appears based on selections. |
| **Product Comparison** | Products can be selected, comparison modal shows correct data, max 3 limit enforced. |
| **Routine Builder** | Products can be added/removed from morning/evening routines, total price calculates correctly. |
| **Dark Mode** | Theme toggle switches all sections, no invisible text, proper contrast in both modes. |
| **Mobile Navigation** | Hamburger menu opens/closes, all links work, drawer animation is smooth. |

### 4.2 Test Implementation Best Practices

- **Stable Selectors:** Use `data-testid` attributes for test selectors rather than CSS classes or DOM structure, which are fragile.
- **Test Data Management:** Use consistent, deterministic test data. Avoid relying on external APIs or databases for unit tests.
- **Test Isolation:** Each test should be independent — no shared state between tests. Use `beforeEach` for setup and `afterEach` for cleanup.
- **Resilience:** Implement automatic retries for transient failures. Capture screenshots and traces for debugging failed tests.

### 4.3 F.I.R.S.T. Principles

| Principle | Description |
|---|---|
| **Fast** | Tests should run quickly to encourage frequent execution. |
| **Independent** | Tests should not depend on each other or share state. |
| **Repeatable** | Tests should produce the same results in any environment. |
| **Self-Validating** | Tests should have a clear pass/fail output — no manual inspection. |
| **Timely** | Tests should be written at the same time as the code, not after. |

### 4.4 CI/CD Integration

- Integrate E2E tests into the CI/CD pipeline to automate testing on every code change.
- Run tests in parallel to reduce execution time.
- Capture screenshots, videos, and logs as artifacts for debugging.
- Never run destructive tests against production environments.

### 4.5 Cross-Cutting Test Concerns

- **Cross-Browser Testing:** Test across Chrome, Firefox, and Safari at minimum.
- **Accessibility Validation:** Include accessibility checks (axe-core or similar) in automated tests.
- **Responsive Design:** Test on mobile (375px), tablet (768px), and desktop (1280px) viewports.
- **Performance:** Monitor Core Web Vitals (LCP, FID, CLS) and set budgets.

---

## Quick Reference Card

| Category | Key Rule |
|---|---|
| **Typography** | Cormorant Garamond for display, Jost for body. Never single-weight. |
| **Colors** | Use CSS variables from `index.css`. Never hardcode oklch values in components. |
| **Accessibility** | 4.5:1 contrast, visible focus rings, ARIA labels on icon buttons. |
| **Components** | Small, single-responsibility. Composition over inheritance. |
| **Functions** | One thing, no side effects, ≤2 arguments. |
| **Naming** | Intention-revealing. Verbs for functions, nouns for classes. |
| **Security** | Validate all input. HTTPS everywhere. Never log sensitive data. |
| **Testing** | Test critical user journeys. Use stable selectors. F.I.R.S.T. principles. |
| **Animation** | Only `transform`/`opacity`. Honor `prefers-reduced-motion`. |
| **Dark Mode** | All components must support both themes via CSS variables. |

---

*Generated by Manus AI — Last updated: February 2026*
