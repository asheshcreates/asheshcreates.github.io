import { useState } from 'react'
import { motion } from 'framer-motion'
import { FlipChar, REVEAL_SPREAD } from './FlipBoard.jsx'
import './FlipTitle.css'

// Same split-flap treatment as the homepage projects list (FlipBoard),
// re-skinned as a centered, multi-line page title. `lines` is an array of
// strings so two-line titles (PCC) reveal top-to-bottom with each line's
// own left-to-right column sweep.
export default function FlipTitle({ lines, className, size = 'lg' }) {
  const [playToken, setPlayToken] = useState(0)
  const rows = Array.isArray(lines) ? lines : [lines]

  return (
    <motion.h1
      className={`flip-title${className ? ` ${className}` : ''}`}
      viewport={{ amount: 0.6 }}
      onViewportEnter={() => setPlayToken((t) => t + 1)}
    >
      {rows.map((line, li) => {
        const chars = line.toUpperCase().split('')
        const cols = chars.length
        return (
          <span className="flip-title__row" key={li}>
            {chars.map((char, ci) => (
              <FlipChar
                key={ci}
                target={char}
                size={size}
                colRatio={cols <= 1 ? 0 : ci / (cols - 1)}
                playToken={playToken}
                bonusToken={0}
              />
            ))}
          </span>
        )
      })}
    </motion.h1>
  )
}

// Exported for callers that want to size a custom reveal spread.
export { REVEAL_SPREAD }
