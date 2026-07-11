import { Fragment, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './CascadeText.css'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]

// Flipboard-style cascade, no cell boxes. Every letter (headings and content
// alike) stays fully invisible until its own turn arrives, then flips
// ROTATIONS times, fast, before settling. The next letter's onset is
// normally triggered once the current one has flipped TRIGGER_ROTATIONS
// times (BASE_STAGGER). The first letter starts START_DELAY after the block
// scrolls into view. Scrolling out and back in replays the whole thing from
// invisibility again (viewport re-entry is not "once").
//
// A strict stagger makes long strings run long, so for longer strings the
// stagger is compressed to keep the whole block's reveal within
// ~TARGET_TOTAL (a single alphabet's own rotation stays 15 fast flips).
const FLIP_MS = 45
const ROTATIONS = 15
const TRIGGER_ROTATIONS = 7
const BASE_STAGGER = TRIGGER_ROTATIONS * FLIP_MS
const SETTLE = ROTATIONS * FLIP_MS
const START_DELAY = 500
const TARGET_TOTAL = 3000

function staggerFor(letterCount) {
  if (letterCount <= 1) return BASE_STAGGER
  const fit = (TARGET_TOTAL - SETTLE) / (letterCount - 1)
  return Math.min(BASE_STAGGER, fit)
}

function CascadeChar({ target, delay, playToken }) {
  const [display, setDisplay] = useState('')
  const [visible, setVisible] = useState(false)
  const timers = useRef([])

  const clear = () => {
    timers.current.forEach((id) => {
      clearTimeout(id)
      clearInterval(id)
    })
    timers.current = []
  }

  useEffect(() => {
    if (playToken === 0) return undefined
    clear()
    // Reset to invisible immediately so every re-entry replays the full
    // loop from nothing, rather than resuming from the previously settled
    // letter.
    setVisible(false)
    setDisplay('')
    let f = 0
    const startId = setTimeout(() => {
      setVisible(true)
      setDisplay(randomGlyph())
      const intId = setInterval(() => {
        f += 1
        if (f >= ROTATIONS) {
          setDisplay(target)
          clearInterval(intId)
        } else {
          setDisplay(randomGlyph())
        }
      }, FLIP_MS)
      timers.current.push(intId)
    }, delay)
    timers.current.push(startId)
    return clear
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playToken])

  return (
    <span className="cascade-char">
      <span className="cascade-char__sizer" aria-hidden="true">
        {target}
      </span>
      <span
        className="cascade-char__glyph"
        style={{ visibility: visible ? 'visible' : 'hidden' }}
      >
        {display}
      </span>
    </span>
  )
}

export default function CascadeText({ text, as = 'span', className }) {
  const [playToken, setPlayToken] = useState(0)
  const Tag = motion[as]
  const words = text.toUpperCase().split(' ')

  const letterCount = words.join('').length
  const stagger = staggerFor(letterCount)
  let animIndex = 0

  return (
    <Tag
      className={className}
      viewport={{ amount: 0.3 }}
      onViewportEnter={() => setPlayToken((t) => t + 1)}
      aria-label={text}
    >
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <Fragment key={wi}>
            {wi > 0 ? ' ' : null}
            <span className="cascade-word">
              {word.split('').map((ch, ci) => {
                const delay = START_DELAY + animIndex * stagger
                animIndex += 1
                return (
                  <CascadeChar
                    key={ci}
                    target={ch}
                    delay={delay}
                    playToken={playToken}
                  />
                )
              })}
            </span>
          </Fragment>
        ))}
      </span>
    </Tag>
  )
}
