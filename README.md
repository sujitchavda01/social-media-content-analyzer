# Social Media Content Analyzer

Lightweight React + Vite application that extracts text from PDFs and images (via OCR) and provides deterministic, local engagement analysis (word/sentence counts and simple editorial suggestions).

Repository: https://github.com/sujitchavda01/social-media-content-analyzer

Status: Functional locally — no server required. (If you want hosting, see the Deployment section.)

## Features
- PDF parsing (in-browser) using `pdfjs-dist` (legacy build).
- Image OCR (in-browser) using `tesseract.js` with progress reporting.
- Local analysis: word/sentence counts, average sentence length, and simple improvement suggestions.
- Drag-and-drop and file picker interfaces for both PDFs and images.
- Accessible UI: keyboard-friendly dropzone, loading overlays, and error notices.

## Tech Stack
- React + Vite
- `pdfjs-dist` for PDF extraction
- `tesseract.js` for client-side OCR
- Plain CSS for styling

## Quick start (local)
1. Install dependencies:

```powershell
npm install
```

2. Run dev server:

```powershell
npm run dev
```

3. Build for production:

```powershell
npm run build
```

## Project structure (key files)
- `src/features/PDFExtractor.jsx` — PDF upload, extraction, and first-page preview
- `src/features/ImageOCR.jsx` — Image upload and OCR pipeline
- `src/features/analysis.jsx` — Deterministic analysis and suggestions
- `src/components/LoadingOverlay.jsx`, `ErrorNotice.jsx` — UX helpers
- `src/styles.css` — Global styling and responsive rules

## Design notes / current state
- AI/cloud inference calls were removed per project cleanup. The app provides local heuristics instead of calling external AI services.
- There is no server required to run the core functionality. If you previously used a server proxy, those instructions were intentionally removed.
- `.gitignore` excludes `node_modules/`, `dist/`, and `.env` to keep the repo clean for submission.

## 200-word approach (required)
The Social Media Content Analyzer implements a simple, robust pipeline for extracting and analysing textual content from user-supplied documents. For PDFs the app uses the `pdfjs-dist` legacy build to read page text content reliably inside the browser; for scanned images it uses `tesseract.js` to perform client-side OCR with a progress callback to keep the interface responsive. Extracted text is normalized and presented in a scrollable result area alongside a deterministic analysis module that calculates word count, sentence count, and average words per sentence. The heuristics then produce concise editorial suggestions (shorten long sentences, add a CTA near links, expand very short posts) that are actionable and easy for a reviewer or content author to apply. The UI emphasizes accessibility and clarity: a large keyboard-accessible dropzone, clear loading overlays, and dismissible error notices. By keeping processing client-side we avoid shipping secrets or introducing server-side dependencies; this makes the project easy to host on static hosts (GitHub Pages, Vercel) and streamlines review. The code is modular and documented, enabling future extensions such as optional server-side AI integration or improved language detection.

## Submission checklist
- Repository branch: `main` (public)
- No `node_modules/`, `dist/`, or `.env` committed
- README with run instructions and a 200-word approach present
- App runs locally via `npm install` / `npm run dev`

## Deployment
- You can host the built site on GitHub Pages, Vercel, or Netlify. After `npm run build` deploy the `dist/` folder or use the platform's automatic build step.

