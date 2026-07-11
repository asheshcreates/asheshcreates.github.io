import { useEffect, useState } from 'react'
import { applyTheme, setManualTheme } from '../theme.js'
import './ThemeToggle.css'

function getInitialTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)

  // Reflect theme changes coming from the time-of-day scheduler.
  useEffect(() => {
    const onChange = (e) => setTheme(e.detail)
    window.addEventListener('themechange', onChange)
    return () => window.removeEventListener('themechange', onChange)
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setManualTheme(next)
    applyTheme(next)
  }

  return (
    <button
      type="button"
      className={`theme-toggle theme-toggle--${theme}`}
      onClick={toggle}
      aria-label="Toggle light or dark theme"
      aria-pressed={theme === 'light'}
    >
      <svg
        className="bulb"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g className="bulb__rays">
          <line x1="12" y1="1.5" x2="12" y2="3.4" />
          <line x1="4.6" y1="4.6" x2="5.9" y2="5.9" />
          <line x1="19.4" y1="4.6" x2="18.1" y2="5.9" />
          <line x1="2.4" y1="11" x2="4.3" y2="11" />
          <line x1="21.6" y1="11" x2="19.7" y2="11" />
        </g>
        <path d="M8.6 13.7a4.8 4.8 0 1 1 6.8 0c-0.9 0.9-1.2 1.6-1.4 2.6h-4c-0.2-1-0.5-1.7-1.4-2.6z" />
        <path d="M10.7 11.4 12 9.9l1.3 1.5" />
        <line x1="10" y1="18.2" x2="14" y2="18.2" />
        <line x1="10.6" y1="20.2" x2="13.4" y2="20.2" />
      </svg>
    </button>
  )
}
