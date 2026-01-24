# Phase 3: Intelligence Layer (Grok Vision Integration)

## Objective
Connect the frontend "Analyze" button to a Server Action that sends the document to Grok (xAI) for forensic analysis.

## Implementation Steps

### Step 1: Environment Setup
- Create a `.env.local` file in the root.
- Add variable: `XAI_API_KEY=xai-lCWf7QOz7bYsFhUxSh4aP1hEEcZU0SzF13udcu2yOJZ9DEktShmbzaiD24buqdLHDb6wJtbZeo24J329`
- Update `.gitignore` to ensure `.env.local` is never committed.

### Step 2: The Logic (Server Action)
- Create `src/actions/analyze-document.ts`.
- **Functionality:**
  1.  Receive the file form data.
  2.  Convert file to Base64 (so the AI can "see" it).
  3.  Construct a secure request to `https://api.x.ai/v1/chat/completions`.
  4.  **Model:** Use `grok-vision-beta` (or latest available vision model).

### Step 3: The "Forensic" System Prompt
- We must instruct Grok to output **STRICT JSON** only.
- **The Prompt Instructions:**
  "You are a forensic document expert for the UK rental market. Analyze this image for:
  1. **Visual Anomalies:** Mismatched fonts, pixelated logos vs sharp text (artifacts), alignment issues.
  2. **Content Logic:** Do dates make sense? Does the math (Balance + Credit - Debit) work?
  3. **PBSA & Visa Checks:** Check for CAS number formats, Visa rejection phrasing, and University letterhead authenticity.
  4. **Compliance:** Flag risks regarding UK Right-to-Rent 2026.
  
  Return a JSON object with:
  - `riskScore` (0-100, where 100 is safe, 0 is fraud).
  - `summary` (Short professional summary).
  - `flags` (Array of strings listing specific issues found).
  - `verdict` ('VERIFIED' | 'SUSPICIOUS' | 'FRAUD')."

### Step 4: Connecting the UI
- Update `src/app/scan/page.tsx`.
- Connect the "Analyze Document" button to the Server Action.
- Add a **Loading State**:
  - When clicked, show a "Scanning Document..." animation (use a spinner or progress bar).
  - Disable the button to prevent double-submission.
- Handle the Response:
  - If successful, redirect to a new page `/report/[id]` (or show results inline for now).
  - Handle errors (e.g., "API Key missing" or "Image too blurry").

## Acceptance Criteria
- User clicks "Analyze".
- App shows "Scanning...".
- The file is sent to the backend.
- A JSON response is received (simulated or real).
- The user is alerted when analysis is done.
