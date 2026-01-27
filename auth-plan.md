 # Phase 7: Authentication (Clerk)
 
 ## Objective
 Protect the application routes (`/`, `/scan`) so only logged-in users can access them.
 
 ## Implementation Steps
 1. **Install Clerk:** Run `npm install @clerk/nextjs`.
 2. **Wrap Application:** Update `src/app/layout.tsx` to wrap the `<html>` tag with `<ClerkProvider>`.
 3. **Create Middleware:** Create `src/middleware.ts` in the root (same level as `src`).
    - Use the standard Clerk middleware configuration to protect all routes.
    - Matcher: `['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']`
 4. **Update Header:** Modify `src/components/layout/header.tsx`.
    - Remove the static `Avatar` component.
    - Import and add the `<UserButton />` component from `@clerk/nextjs`.
    - This adds the "Sign Out" and "Manage Account" features automatically.
