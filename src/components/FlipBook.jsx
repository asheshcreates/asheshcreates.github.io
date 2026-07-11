import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import './FlipBook.css'

// Playbill reader. `pages` is an ordered array of image sources, page 0 is
// the cover. Closed, it rests as a small tilted card in its grid slot that
// tracks the cursor like it's resting in a hand. On open, the modal grows
// outward from that exact spot on screen rather than fading in from
// nowhere.
//
// Inside, one page sits large and centered; the previous and next pages
// float smaller to either side as a preview of what's next. Advancing
// glides the whole set over — the side page grows and slides into the
// center, the old center shrinks out to the opposite side — rather than
// any page-turn/flip mechanic.
const COVER_BASE = { rotateY: -14, rotateX: 2 }
const TILT_SPRING = { stiffness: 160, damping: 22, mass: 0.7 }
const SIDE_OFFSET = 86 // % of a slide's own width
const SIDE_SCALE = 0.78
const SIDE_OPACITY = 0.45

export default function FlipBook({ pages, open, onOpenChange }) {
  const [current, setCurrent] = useState(0)
  const [origin, setOrigin] = useState('50% 50%')
  const coverRef = useRef(null)

  const coverRotateY = useSpring(COVER_BASE.rotateY, TILT_SPRING)
  const coverRotateX = useSpring(COVER_BASE.rotateX, TILT_SPRING)
  const coverScale = useSpring(1, { stiffness: 220, damping: 24 })

  const goTo = (i) => setCurrent(Math.max(0, Math.min(pages.length - 1, i)))
  const goPrev = () => goTo(current - 1)
  const goNext = () => goTo(current + 1)

  const openBook = () => {
    const rect = coverRef.current?.getBoundingClientRect()
    if (rect) {
      const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100
      const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100
      setOrigin(`${x}% ${y}%`)
    }
    onOpenChange(true)
  }

  const close = () => {
    setCurrent(0)
    onOpenChange(false)
  }

  useEffect(() => {
    if (!open) return undefined
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, current])

  const handleCoverMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - rect.left) / rect.width - 0.5
    const dy = (e.clientY - rect.top) / rect.height - 0.5
    coverRotateY.set(COVER_BASE.rotateY + dx * 22)
    coverRotateX.set(COVER_BASE.rotateX - dy * 18)
    coverScale.set(1.04)
  }

  const handleCoverLeave = () => {
    coverRotateY.set(COVER_BASE.rotateY)
    coverRotateX.set(COVER_BASE.rotateX)
    coverScale.set(1)
  }

  return (
    <>
      {!open && (
        <motion.button
          ref={coverRef}
          type="button"
          className="flipbook__cover-trigger"
          onClick={openBook}
          onMouseMove={handleCoverMove}
          onMouseLeave={handleCoverLeave}
          style={{ rotateY: coverRotateY, rotateX: coverRotateX, scale: coverScale }}
          aria-label="Open the Playbill"
        >
          <img src={pages[0]} alt="This Is Brampton Playbill cover" />
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="flipbook__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            <motion.div
              className="flipbook flipbook--open"
              onClick={(e) => e.stopPropagation()}
              style={{ transformOrigin: origin }}
              initial={{ opacity: 0, scale: 0.12 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ type: 'spring', stiffness: 190, damping: 24 }}
            >
              <button
                type="button"
                className="flipbook__close"
                onClick={close}
                aria-label="Close Playbill"
              >
                Close
              </button>

              <div className="flipbook__viewport">
                {pages.map((src, i) => {
                  const offset = i - current
                  if (Math.abs(offset) > 1) return null
                  const isCenter = offset === 0
                  return (
                    <motion.div
                      key={i}
                      className={`flipbook__slide${isCenter ? ' flipbook__slide--active' : ''}`}
                      animate={{
                        x: isCenter ? '0%' : `${offset < 0 ? '-' : ''}${SIDE_OFFSET}%`,
                        scale: isCenter ? 1 : SIDE_SCALE,
                        opacity: isCenter ? 1 : SIDE_OPACITY,
                      }}
                      transition={{ type: 'spring', stiffness: 240, damping: 30 }}
                      onClick={!isCenter ? () => goTo(i) : undefined}
                      aria-label={!isCenter ? `Go to page ${i + 1}` : undefined}
                    >
                      <img src={src} alt="" />
                    </motion.div>
                  )
                })}
              </div>

              <div className="flipbook__nav">
                <button type="button" onClick={goPrev} disabled={current === 0}>
                  &larr; Prev
                </button>
                <span className="flipbook__page-count">
                  {current + 1} / {pages.length}
                </span>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={current >= pages.length - 1}
                >
                  Next &rarr;
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
