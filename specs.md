# Project: FraudGuard UK (PropTech Fraud Detection)

## Context
We are building a B2B SaaS application for the UK Rental Market (Landlords & PBSA providers). 
The goal is to detect fraudulent tenancy documents (fake bank statements, forged university letters, altered IDs) using AI Vision.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Component Library:** Shadcn UI
- **Icons:** Lucide React

## Design Aesthetic ("Corporate & Cool")
- **Vibe:** Professional, trustworthy, Fintech-like. Not playful.
- **Palette:** Dark mode support. Primary colors should be "Slate", "Zinc", or professional Navy/Grey.
- **Typography:** Clean, sans-serif (Inter or similar).

---

## Phase 1: Project Initialization & Shell (CURRENT TASK)

### Objective
Initialize the codebase and establish the visual identity. The app should look like a premium B2B tool immediately upon running.

### Step-by-Step Implementation Plan:

1.  **Initialize Next.js App**
    - Create a new Next.js project with TypeScript, Tailwind, and ESLint.
    - Clean up the default boilerplate (remove the Vercel default styling).

2.  **Install & Configure Shadcn UI**
    - Initialize Shadcn UI.
    - Select `Slate` or `Zinc` as the base color.
    - Enable CSS variables for easy dark mode toggling.

3.  **Create the App Layout (Shell)**
    - Create a `Sidebar` component:
        - Fixed width on the left.
        - Links: "Dashboard", "Scan Document" (Active), "Reports", "Settings".
        - Use Lucide icons for each.
    - Create a `Header` component:
        - Top bar.
        - Breadcrumbs (e.g., "Home > Dashboard").
        - User profile avatar placeholder on the right.

4.  **Create the Dashboard View (Home)**
    - Create a main content area.
    - Add a "Welcome" section.
    - Add placeholder "Stats Cards" (e.g., "Documents Scanned: 0", "Risks Detected: 0").
    - Ensure the background color provides contrast against the white/dark cards (e.g., `bg-slate-50` in light mode).

### Acceptance Criteria
- The app runs without errors (`npm run dev`).
- The sidebar and header are visible on all pages.
- The styling matches the "Corporate & Cool" aesthetic (no default Next.js branding left).
