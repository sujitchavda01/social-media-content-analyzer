# Social Media Content Analyzer

A lightweight, client‑side React + Vite application that extracts text from PDFs and images (via OCR) and provides simple, deterministic engagement analysis. The project is designed according to assignment requirements — no AI/ML cloud calls, no backend server, and no deployment included.

## Overview

The Social Media Content Analyzer processes user‑uploaded PDFs and image files to extract text and generate basic editorial insights such as word count, sentence count, and improvement suggestions. All processing happens locally in the browser, ensuring privacy and making the project easy to review, run, and download.

## Features

* **PDF Parsing (client‑side):** Uses `pdfjs-dist` legacy build to extract text.
* **Image OCR:** Uses `tesseract.js` for in‑browser OCR with progress feedback.
* **Deterministic Text Analysis:** Word count, sentence count, average sentence length, and simple improvement hints.
* **User‑Friendly Uploads:** Drag‑and‑drop + file picker.
* **Accessible UI:** Keyboard‑friendly dropzone, clear loading states, and error notices.
* **Entirely Local:** No server, no cloud inference, no AI APIs.

## Tech Stack

* React + Vite
* `pdfjs-dist` (PDF parsing)
* `tesseract.js` (OCR)
* Plain CSS for styling

## Quick Start (Local)

```bash
npm install
npm run dev
npm run build
```

## Project Structure

* `src/features/PDFExtractor.jsx` – PDF upload, extraction, preview
* `src/features/ImageOCR.jsx` – Image OCR pipeline
* `src/features/analysis.jsx` – Analysis logic
* `src/components/LoadingOverlay.jsx`, `ErrorNotice.jsx`
* `src/styles.css`

## Approach

The Social Media Content Analyzer implements a concise, browser‑based workflow for extracting and analyzing text from PDFs and images. The application relies on `pdfjs-dist` to parse PDF text directly in the browser without external services. For image documents, the app uses `tesseract.js` to perform OCR with live progress updates, ensuring responsive feedback during processing. Once text is extracted, it passes through a deterministic analysis module that calculates word count, sentence boundaries, and average sentence length. Based on these metrics, the app generates straightforward editorial suggestions such as reducing overly long sentences or adding clarity for short posts. All processing occurs locally on the user’s device, improving privacy and simplifying setup since no backend is required. The interface includes accessible drag‑and‑drop zones, loading overlays, and error notices to ensure smooth interaction. The modular code structure allows easy maintenance and potential future expansion while adhering to the assignment requirement of minimal dependencies.

## Deployment

This project does not include deployment as per instructions, but it can be hosted on static platforms like GitHub Pages, Netlify, or Vercel by deploying the `dist/` folder.
