# Mobile Responsiveness Polish

## Objective
Fix the layout on mobile devices (phones/tablets). The sidebar should collapse, and content should stack vertically.

## Implementation Steps

### Step 1: Responsive Sidebar (The "Hamburger" Fix)
- Modify `src/components/layout/sidebar.tsx`:
  - Add the class `hidden md:flex` to the main sidebar container. 
  - This effectively removes it from the screen on mobile devices.

### Step 2: Create Mobile Navigation (`src/components/layout/mobile-nav.tsx`)
- Use the Shadcn `Sheet` component (Drawer).
- **Trigger:** A "Menu" icon (Hamburger) that appears in the Header ONLY on mobile (`md:hidden`).
- **Content:** When clicked, it slides out a menu containing the same links as the sidebar.

### Step 3: Update Header & Layout
- Modify `src/components/layout/header.tsx`:
  - Add the `MobileNav` component to the left side of the header.
  - Ensure the header looks good on small screens (padding adjustments).

### Step 4: Fix Dashboard Grids
- Modify `src/app/page.tsx` (Dashboard):
  - Change the stats grid to: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`.
  - Wrap the "Recent Activity" table in a `div` with `overflow-x-auto` so it scrolls horizontally instead of breaking the page.

### Step 5: Fix Scan Page
- Modify `src/app/scan/page.tsx`:
  - Ensure the drag-and-drop zone has sensible padding on mobile (`p-4` instead of `p-10`).
  - Stack the buttons (Analyze, Download) vertically on mobile (`flex-col` vs `flex-row`).
