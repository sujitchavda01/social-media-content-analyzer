import React from 'react'

/**
 * ErrorNotice
 *
 * Lightweight, accessible component to surface an error message with optional
 * retry and dismiss actions. Designed to be used where an operation failed and
 * the consumer wants to offer retry/close affordances.
 *
 * Props:
 * - message: string - user-visible error text
 * - onRetry?: () => void - optional retry handler
 * - onClose?: () => void - optional dismiss handler
 */
export default function ErrorNotice({ message, onRetry, onClose }) {
  return (
    <div className="error-notice" role="alert">
      <div className="error-inner">
        <div className="error-message">{message}</div>
        <div className="error-actions">
          {onRetry && <button className="btn" onClick={onRetry}>Retry</button>}
          {onClose && <button className="btn muted" onClick={onClose} style={{marginLeft:8}}>Dismiss</button>}
        </div>
      </div>
    </div>
  )
}
