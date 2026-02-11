# Overlap Fix Notes

## Problem
The AnnouncementBar and Navbar are overlapping. The AnnouncementBar has z-[60] and is relative positioned, while the Navbar header is `fixed top-0` with z-50. Since the Navbar is fixed to top-0, it sits on top of the page at the very top, overlapping the announcement bar.

## Solution
1. Make the AnnouncementBar sticky/fixed at the very top with higher z-index
2. Push the Navbar down by the height of the announcement bar (36px / h-9)
3. When announcement is dismissed, Navbar returns to top-0
4. The approach: Use a wrapper that provides the announcement bar height as an offset, and adjust the Navbar's `top` position dynamically based on whether the announcement bar is visible.

Best approach: Make the announcement bar non-fixed (it stays in document flow), and adjust the Navbar's `top` to sit below it. Since the Navbar is `fixed top-0`, we need to change it to `top-9` (36px) when the announcement bar is visible.

Simplest fix: Make the announcement bar fixed at the top with z-60, and offset the Navbar to `top-9` when announcement is visible. Use a shared state or CSS approach.

Actually simplest: Make announcement bar part of the document flow (not fixed), and the Navbar should be `sticky` instead of `fixed`, OR keep Navbar fixed but set its `top` to account for the announcement bar height.

Best approach for this case:
- Keep AnnouncementBar as a static element in document flow (it already is - it's `relative`)
- Change Navbar from `fixed top-0` to `sticky top-0` — but this won't work well with scroll behavior
- OR: Keep Navbar fixed, but dynamically set its `top` based on announcement bar visibility
- The announcement bar should also be fixed, sitting above the navbar

Let's go with: Both fixed. AnnouncementBar fixed at top-0 z-60. Navbar fixed at top-9 z-50. When announcement dismissed, Navbar transitions to top-0. Add a spacer div to push content down.
