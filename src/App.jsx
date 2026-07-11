import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Chatorey from './pages/Chatorey.jsx'
import TIB from './pages/TIB.jsx'
import PCC from './pages/PCC.jsx'
import Solum from './pages/Solum.jsx'
import { applyTheme, getManualTheme, timeBasedTheme } from './theme.js'

export default function App() {
  // Keep the schedule live: while there's no manual override, re-check the
  // time each minute so the theme flips at the 20:00 / 05:00 boundaries.
  useEffect(() => {
    const tick = () => {
      if (!getManualTheme()) applyTheme(timeBasedTheme())
    }
    tick()
    const id = setInterval(tick, 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chatorey" element={<Chatorey />} />
      <Route path="/this-is-brampton" element={<TIB />} />
      <Route path="/pcc" element={<PCC />} />
      <Route path="/solum" element={<Solum />} />
    </Routes>
  )
}
