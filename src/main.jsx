import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

/**
 * Entry point
 *
 * Bootstraps the React application into the DOM. This module intentionally
 * contains minimal logic — it only mounts the root `App` component.
 */
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
