// Theme resolution: default follows time of day (dark 20:00–05:00, light
// otherwise). A manual toggle overrides the schedule and is remembered.
const MANUAL_KEY = 'theme-manual'

export function timeBasedTheme(date = new Date()) {
  const h = date.getHours()
  return h >= 20 || h < 5 ? 'dark' : 'light'
}

export function getManualTheme() {
  try {
    const v = localStorage.getItem(MANUAL_KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

export function setManualTheme(theme) {
  try {
    localStorage.setItem(MANUAL_KEY, theme)
  } catch {
    /* ignore storage errors */
  }
}

export function effectiveTheme() {
  return getManualTheme() ?? timeBasedTheme()
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }))
}
