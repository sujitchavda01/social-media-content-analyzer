import React, { useState } from 'react'
import PDFExtractor from './features/PDFExtractor'
import ImageOCR from './features/ImageOCR'

/**
 * App
 *
 * Root application component for the Social Media Content Analyzer. Presents a
 * mode switch to select PDF or image input, and renders the corresponding
 * extractor component. Contains a brief tips/help panel for quick guidance.
 */
export default function App() {
  const [mode, setMode] = useState('pdf')
  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <h1>Social Media Content Analyzer</h1>
          <p className="tag">Extract text from PDFs/images</p>
        </div>
        <nav className="mode-switch" role="tablist" aria-label="Select input type">
          <button role="tab" aria-selected={mode === 'pdf'} onClick={() => setMode('pdf')} className={mode === 'pdf' ? 'active' : ''}>PDF</button>
          <button role="tab" aria-selected={mode === 'image'} onClick={() => setMode('image')} className={mode === 'image' ? 'active' : ''}>Image</button>
        </nav>
      </header>

      <main className="container">
        <section className="workspace">
          {mode === 'pdf' ? <PDFExtractor /> : <ImageOCR />}
        </section>
        <aside className="help">
          <div className="card">
            <h3>Tips</h3>
            <ul>
              <li>Use clear headings and short sentences for better engagement.</li>
              <li>Include 1–2 relevant hashtags, not more than 5.</li>
            </ul>
          </div>
          <div className="card small">
            <h4>Shortcuts</h4>
            <ul>
              <li><strong>Download:</strong> Save extracted text as .txt</li>
              <li><strong>Select new file:</strong> Reset the view</li>
            </ul>
          </div>
        </aside>
      </main>

      <footer className="app-footer">
        <small>Made for technical assessment — optimized for clarity and responsiveness.</small>
      </footer>
    </div>
  )
}
