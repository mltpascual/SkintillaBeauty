# TypeScript Style Guide — Skintilla Beauty

## General Principles

This project uses TypeScript 5.6 with strict mode enabled. All source files use the `.tsx` extension for components and `.ts` for non-JSX modules. The codebase targets ES2022+ features and uses ES module syntax exclusively.

## Type Annotations

Prefer explicit return types on exported functions and component props interfaces. Use `interface` for object shapes that may be extended and `type` for unions, intersections, and utility types. Avoid `any` — use `unknown` with type guards when the type is genuinely uncertain.

```typescript
// Preferred: explicit interface for component props
interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  isNew?: boolean;
  onAddToCart: (productId: string) => void;
}

// Preferred: type for unions
type ThemeMode = "light" | "dark";
type SkinType = "dry" | "oily" | "combination" | "sensitive" | "normal";
```

## Component Patterns

Components use function declarations with explicit typing. State management uses React hooks (`useState`, `useEffect`, `useContext`, `useMemo`, `useCallback`). Custom hooks are extracted to `client/src/hooks/` when logic is reused across components.

```typescript
export default function ProductCard({ name, price, image, isNew, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  // ...
}
```

## Import Organization

Imports follow this order, separated by blank lines: (1) React and React DOM, (2) third-party libraries, (3) internal components and hooks via `@/` alias, (4) types and interfaces, (5) assets and styles.

## Tailwind CSS Integration

Tailwind classes are composed using the `cn()` utility from `@/lib/utils`. Conditional classes use the `clsx` pattern within `cn()`. Avoid inline style objects when Tailwind utilities suffice.

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "rounded-full px-6 py-3 transition-all duration-300",
  isActive ? "bg-olive-800 text-cream-50" : "bg-cream-100 text-olive-800",
  className
)} />
```

## Error Handling

Use `ErrorBoundary` components for UI error isolation. Async operations use try/catch with user-friendly error messages displayed via Sonner toast notifications. Never swallow errors silently.
