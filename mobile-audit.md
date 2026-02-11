# Mobile Responsiveness Audit

## RoutineBuilder Issues
1. Grid `lg:grid-cols-12` — on mobile it stacks, but product pool + drop zone both take full width. OK but:
   - Product pool cards: `gap-4` in flex items may overflow on very small screens (320px)
   - Drop zone `min-h-[320px]` — too tall for empty state on mobile, wastes space
   - Routine items inside drop zone: `flex items-center gap-4 p-4` — the row layout with step number + image + text + price + remove button may overflow on narrow screens
   - Morning/Evening tab buttons: `px-7 py-3` — could be tighter on mobile
   - Price summary box: looks fine, full-width button is good
   - Drag-and-drop doesn't work on mobile (touch) — need tap-to-add fallback (already has click handler, good)
   - Tip box at bottom of product pool: fine
   - "Drag products here" text should say "Tap products" on mobile

2. Key fixes needed:
   - Make routine item rows responsive (stack on very small screens or reduce padding)
   - Reduce drop zone min-height on mobile
   - Adjust tab button sizing for mobile
   - Update empty state text for mobile (no drag on touch)
   - Reduce padding on mobile for product pool cards

## SkinJournal Issues
1. Featured article: `grid lg:grid-cols-2` stacks on mobile — good
   - Image aspect ratio `aspect-[4/3]` on mobile — fine
   - Content padding `p-8 lg:p-12` — could be reduced on mobile to `p-5`
2. Article grid: `sm:grid-cols-2 lg:grid-cols-4` — on mobile (<640px) it's single column, good
3. Article modal:
   - `max-h-[85vh]` — good for mobile
   - `p-4` outer padding — good
   - Modal content `p-8` — should be `p-5` on mobile
   - Modal header image `h-56` — could be `h-40` on mobile
4. Key fixes needed:
   - Reduce featured article content padding on mobile
   - Reduce modal content padding on mobile
   - Reduce modal header image height on mobile

## ShippingCalculator Issues
1. Input row: `flex gap-3` with `max-w-[180px]` input — on very narrow screens the Calculate button may get squeezed
2. Results: `flex items-center justify-between p-4` — fine for mobile
3. Key fixes needed:
   - Make input row stack or allow input to be wider on mobile
   - Remove max-w on input for mobile, or make it responsive
   - Ensure Calculate button doesn't get too narrow
