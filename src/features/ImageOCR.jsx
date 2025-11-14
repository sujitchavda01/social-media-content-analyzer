import React, { useState, useRef } from 'react'
import Tesseract from 'tesseract.js'
import { TextAnalysis } from './analysis'
import LoadingOverlay from '../components/LoadingOverlay'
import ErrorNotice from '../components/ErrorNotice'

/**
 * ImageOCR
 *
 * Component that accepts an image file, performs client-side OCR using
 * `tesseract.js` and returns the recognized text. Shows progress and a
 * preview of the uploaded image, and exposes download/clear actions.
 */
export default function ImageOCR() {
  const [text, setText] = useState('')
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)
  const [fileUploaded, setFileUploaded] = useState(false)

  const handleFiles = async (file) => {
    setError(null)
    setText('')
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }
    setLoading(true)
    try {
      const { data } = await Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text' && m.progress) setProgress(Math.round(m.progress * 100))
        }
      })
      setText(data.text)
      try {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      } catch (uerr) {
        console.warn('Failed to create preview URL', uerr)
      }
      setFileUploaded(true)
    } catch (e) {
      console.error(e)
      setError('Failed OCR: ' + (e?.message || 'unknown'))
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  const clearAll = () => {
    setText('')
    setError(null)
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
              accept="image/*"
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
                Drag & drop image here or press Enter to select
              </div>
          </label>
 
          <div className="controls" style={{marginTop:18,justifyContent:'center'}} />

          {loading && <LoadingOverlay message={`OCR in progress — ${progress}%`} progress={progress} />}
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
                <h3>Preview</h3>
                <img src={previewUrl} alt="Uploaded preview" />
              </div>
            )}
            {loading && <div className="loading">OCR in progress... {progress}%</div>}
            {error && <ErrorNotice message={error} onRetry={() => { setError(null); handleFiles(fileInputRef.current?.files?.[0]) }} onClose={() => setError(null)} />}
          </div>

          <div className="right">
            {(loading) && (
              <LoadingOverlay message={`OCR in progress — ${progress}%`} progress={progress} />
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
