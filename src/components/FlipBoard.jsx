import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './FlipBoard.css'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]

// Reveal: whole board settles at 5s. Each cell flips 25 times, and columns
// stagger left-to-right so the last column locks exactly at REVEAL_MS.
const REVEAL_MS = 5000
const REVEAL_FLIPS = 25
const REVEAL_FLIP_MS = 70
const REVEAL_FLIP_DURATION = REVEAL_FLIPS * REVEAL_FLIP_MS
const REVEAL_SPREAD = REVEAL_MS - REVEAL_FLIP_DURATION

// Hover: same wave shape but quick.
const HOVER_FLIPS = 10
const HOVER_FLIP_MS = 40
const HOVER_SPREAD = 500

export function FlipChar({ target, colRatio, playToken, bonusToken, size }) {
  const isSpace = target === ' '
  const [display, setDisplay] = useState(() => (isSpace ? ' ' : randomGlyph()))
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach((id) => {
      clearTimeout(id)
      clearInterval(id)
    })
    timers.current = []
  }

  const animate = (startDelay, flips, flipMs) => {
    clearTimers()
    let f = 0
    const startId = setTimeout(() => {
      const intId = setInterval(() => {
        f += 1
        if (f >= flips) {
          setDisplay(target)
          clearInterval(intId)
        } else {
          setDisplay(randomGlyph())
        }
      }, flipMs)
      timers.current.push(intId)
    }, startDelay)
    timers.current.push(startId)
  }

  useEffect(() => {
    if (isSpace) {
      setDisplay(' ')
      return undefined
    }
    if (playToken === 0) return undefined
    animate(colRatio * REVEAL_SPREAD, REVEAL_FLIPS, REVEAL_FLIP_MS)
    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playToken])

  useEffect(() => {
    if (isSpace || bonusToken === 0) return undefined
    animate(colRatio * HOVER_SPREAD, HOVER_FLIPS, HOVER_FLIP_MS)
    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bonusToken])

  return (
    <span
      className={`flip-char${isSpace ? ' flip-char--space' : ''}${
        size ? ` flip-char--${size}` : ''
      }`}
    >
      {display}
    </span>
  )
}

export { REVEAL_MS, REVEAL_FLIPS, REVEAL_FLIP_MS, REVEAL_SPREAD }

function FlipRow({ text, path, playToken }) {
  const [bonusToken, setBonusToken] = useState(0)
  const cols = text.length

  return (
    <Link
      to={path}
      className="flip-board__row"
      onMouseEnter={() => setBonusToken((t) => t + 1)}
    >
      {text.split('').map((char, c) => (
        <FlipChar
          key={c}
          target={char}
          colRatio={cols <= 1 ? 0 : c / (cols - 1)}
          playToken={playToken}
          bonusToken={bonusToken}
        />
      ))}
    </Link>
  )
}

export default function FlipBoard({ items }) {
  const [playToken, setPlayToken] = useState(0)

  const rowText = (item) => `${item.index}  ${item.name}`

  const maxLen = useMemo(
    () => Math.max(...items.map((item) => rowText(item).length)),
    [items],
  )

  const rows = useMemo(
    () =>
      items.map((item) => ({
        text: rowText(item).toUpperCase().padEnd(maxLen, ' '),
        path: item.path,
      })),
    [items, maxLen],
  )

  return (
    <motion.div
      className="flip-board"
      viewport={{ amount: 0.5 }}
      onViewportEnter={() => setPlayToken((t) => t + 1)}
    >
      {rows.map((row, i) => (
        <FlipRow key={i} text={row.text} path={row.path} playToken={playToken} />
      ))}
    </motion.div>
  )
}
