# Social Media Content Analyzer

A minimal web app to extract text from PDFs and images (OCR) and provide simple, local engagement analysis.

Features:
- PDF parsing using pdf.js (in-browser)
- OCR for images using tesseract.js (in-browser)
- Simple analysis: word/sentence counts and basic suggestions

Why in-browser?
- Keeps the project simple and within GitHub Pages hosting
- No backend required, easier to submit and maintain

Run locally

1. Install dependencies:

   npm install

2. Start dev server:

   npm run dev

Build

  npm run build

Notes
- Keep branch as `main` and make the repository public for submission.
- Do not commit node_modules or secret files. Use .gitignore as needed.

Note: AI-based suggestions and cloud inference calls have been removed from this project.
The application now provides local, deterministic analysis (word/sentence counts and formatting suggestions) without requiring an external AI service.

Running the server proxy locally
--------------------------------
1. Change to the `server` folder and install dependencies:

```powershell
cd server
npm install
```

2. Create `server/.env` from `server/.env.example` and add your `GEMINI_KEY`.

3. Create `server/.env` from `server/.env.example` and add your Hugging Face server-side token as `HUGGING_FACE_KEY`.

4. Start the proxy:

```powershell
npm start
```

5. In your front-end `.env`, set `VITE_USE_SERVER_PROXY=true` and `VITE_SERVER_PROXY_URL=http://localhost:4000` then restart the dev server.

Minimal setup (only one key required)
------------------------------------
If you want the simplest workflow where you only provide a single API key:

1. Put your Hugging Face API key in the server's `.env` as `HUGGING_FACE_KEY` (copy `server/.env.example` to `server/.env` and edit).
2. Keep the front-end `.env` as shown in the project root `.env.example` (the project defaults to the local proxy `http://localhost:4000`).
3. Start the proxy (`cd server && npm start`) and then start the front-end (`npm run dev`).

With this configuration you only need to place the API key in `server/.env` — the front-end will call the proxy automatically and you do not need to configure per-endpoint URLs.
