import React, { useState, useRef } from 'react'
import { TextAnalysis } from './analysis'
import LoadingOverlay from '../components/LoadingOverlay'
import ErrorNotice from '../components/ErrorNotice'

/**
 * PDFExtractor
 *
 * Component that accepts a PDF file, extracts textual content using a dynamically
 * imported `pdfjs-dist` legacy build, and renders a first-page preview for
 * scanned documents. Provides download and reset controls and surfaces errors
 * and loading states via `LoadingOverlay` and `ErrorNotice`.
 */
export default function PDFExtractor() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [errorStack, setErrorStack] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const fileInputRef = useRef(null)
  const [fileUploaded, setFileUploaded] = useState(false)
  const handleFiles = async (file) => {
    setError(null)
    setText('')
    if (!file) return
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file')
      return
    }
    setLoading(true)
    try {
      const pdfLib = await import('pdfjs-dist/legacy/build/pdf')
      const libVersion = pdfLib?.version || pdfLib?.pdfjsVersion || 'latest'
      pdfLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${libVersion}/build/pdf.worker.min.js`
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfLib.getDocument({ data: arrayBuffer }).promise
      let fullText = ''
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        const strings = content.items.map((it) => it.str)
        fullText += strings.join(' ') + '\n\n'
      }
      setText(fullText)
      
      try {
        setPreviewLoading(true)
        const firstPage = await pdf.getPage(1)
        const viewport = firstPage.getViewport({ scale: 1.5 })
        const canvas = document.createElement('canvas')
        canvas.width = Math.floor(viewport.width)
        canvas.height = Math.floor(viewport.height)
        const ctx = canvas.getContext('2d')
        await firstPage.render({ canvasContext: ctx, viewport }).promise
        const dataUrl = canvas.toDataURL('image/png')
        setPreviewUrl(dataUrl)
      } catch (previewErr) {
        console.warn('Preview render failed:', previewErr)
      } finally {
        setPreviewLoading(false)
      }
      setFileUploaded(true)
    } catch (e) {
      console.error('PDF parse error:', e)
      setError(e?.message || 'Failed to parse PDF')
      setErrorStack(e?.stack || JSON.stringify(e))
    } finally {
      setLoading(false)
    }
  }

  const clearAll = () => {
    setText('')
    setError(null)
    setErrorStack(null)
    setPreviewUrl(null)
    setFileUploaded(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const downloadText = () => {
    const blob = new Blob([text || ''], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'extracted-text.txt'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="extractor responsive">
      {!fileUploaded ? (
        <div className="dropzone-large">
          <label className="dropzone">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFiles(e.target.files[0])}
            />
                <div
                  className="drop-instructions"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click()
                  }}
                >
                  Drag & drop PDF here or press Enter to select
                </div>
          </label>

          <div className="controls" style={{marginTop:18,justifyContent:'center'}} />

          {loading && <LoadingOverlay message="Extracting text from PDF…" />}
          {error && <ErrorNotice message={error} onRetry={() => { setError(null); handleFiles(fileInputRef.current?.files?.[0]) }} onClose={() => setError(null)} />}
        </div>
      ) : (
        <>
          <div className="left">
            <button className="btn back" onClick={clearAll} aria-label="Back" title="Back">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H3.707l4.147 4.146a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 1 1 .708.708L3.707 7.5H14.5A.5.5 0 0 1 15 8z"/></svg>
                <span className="btn-label">Back</span>
              </button>

            {previewUrl && (
              <div className="preview">
                <h3>Preview (first page)</h3>
                <img src={previewUrl} alt="PDF preview" />
              </div>
            )}
          </div>

          <div className="right">
            {error && (
              <ErrorNotice message={error} onRetry={() => { setError(null); handleFiles(fileInputRef.current?.files?.[0]) }} onClose={() => setError(null)} />
            )}

            { (loading || previewLoading) && (
              <LoadingOverlay message={loading ? 'Extracting text from PDF…' : 'Rendering preview…'} />
            )}

            {errorStack && (
              <details style={{marginTop:12,color:'#ffb4b4'}}>
                <summary>Show full error (for debugging)</summary>
                <pre style={{whiteSpace:'pre-wrap'}}>{errorStack}</pre>
              </details>
            )}

            {text && (
              <article className="result">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <h2>Extracted Text</h2>
                  <div>
                    <button className="btn" onClick={downloadText}>Download text</button>
                  </div>
                </div>
                <pre>{text}</pre>

                <TextAnalysis text={text} />
              </article>
            )}
          </div>
        </>
      )}
    </section>
  )
}
