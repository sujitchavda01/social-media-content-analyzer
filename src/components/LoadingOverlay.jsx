import React from 'react'

/**
 * LoadingOverlay
 *
 * Reusable, accessible overlay used to indicate background work. Accepts a
 * human-readable `message` and an optional numeric `progress` (0-100) to render
 * a visual progress bar.
 *
 * Props:
 * - message: string (default: 'Processing…') - short status for the user
 * - progress: number|null - optional progress percentage
 */
export default function LoadingOverlay({ message = 'Processing…', progress = null }) {
  return (
    <div className="overlay" role="status" aria-live="polite">
      <div className="overlay-card">
        <div className="spinner" aria-hidden="true"></div>
        <div className="overlay-text">
          <div className="overlay-message">{message}</div>
          {typeof progress === 'number' && (
            <div className="progress">
              <div className="progress-bar" style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
