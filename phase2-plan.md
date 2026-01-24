# Phase 2: Secure Document Ingestion

## Objective
Build a professional, secure drag-and-drop interface for users to upload tenancy documents (PDF, JPG, PNG).

## Implementation Steps

### Step 1: Install Dependencies
- Install `react-dropzone` for robust drag-and-drop handling.
- Install `framer-motion` for smooth animations (optional, but adds "cool" factor).
- Command: `npm install react-dropzone framer-motion`

### Step 2: Create the Upload Component (`src/components/upload/upload-zone.tsx`)
- **Visuals:**
  - A large, dashed-border container (Border-slate-300).
  - Hover state: Border turns Blue (Border-blue-500) and background tint changes when a file is dragged over.
  - Icon: Use a large `CloudUpload` icon from Lucide centered in the middle.
  - Text: "Drag & drop your document here, or click to browse."
  - Subtext: "Supports PDF, JPG, PNG (Max 10MB)."
  
- **Logic:**
  - Accept only: `application/pdf`, `image/jpeg`, `image/png`.
  - Reject: Any executable files (.exe, .js) or unknown types.
  - Max file size: 10MB.
  - State: Track `isDragActive` to change styling dynamically.

### Step 3: Create File Preview & List (`src/components/upload/file-list.tsx`)
- Once a file is dropped, hide the drop zone (or move it) and show the file in a "Staging Area".
- **Visuals:**
  - A clean list item with a file icon (FileText for PDF, ImageIcon for images).
  - Display the file name and file size (converted to KB/MB).
  - A "Remove" button (X icon) to clear the selection.
  - A large primary "Analyze Document" button that appears only when a valid file is selected.

### Step 4: Integrate into Scan Page
- Update `src/app/scan/page.tsx`.
- Add a header: "New Document Analysis".
- Embed the `UploadZone` component.
- Handle the state where the user selects a file, validates it, and prepares it for the next phase (Analysis).

### Security Requirements
- Ensure filenames are sanitized (remove special characters) before display.
- Prevent multiple file uploads for now (Single file focus for Phase 1).

## Acceptance Criteria
- User can drag a PDF or Image onto the zone.
- Invalid files are rejected (with a toast or error message).
- Valid files show a clean preview summary.
- The UI matches the "Corporate" styling (Slate/Blue).
