import { createPortal } from 'react-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import './PlaygroundOverlay.css'

// Layout-mockup sandbox for a single project page: drag/resize the real
// images in place, and draw pen strokes / colored section boxes / sticky
// notes on top, so Ashesh can rough out "move this here, make this bigger,
// box off this section" directly on the live page instead of describing it.
// Everything lives in localStorage per pageKey and never touches the page's
// actual JSX/CSS — image moves are inline-style transforms applied at
// runtime, and annotations render in a portal layered on top.

const COLORS = ['#ff5a5f', '#ffb100', '#3ddc84', '#3aa0ff', '#b06bff', '#f2f2f2']
const TOOLS = { MOVE: 'move', PEN: 'pen', RECT: 'rect', TEXT: 'text' }

function loadState(pageKey) {
  try {
    const raw = localStorage.getItem(`playground:${pageKey}`)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveState(pageKey, state) {
  try {
    localStorage.setItem(`playground:${pageKey}`, JSON.stringify(state))
  } catch {
    /* ignore storage errors */
  }
}

export default function PlaygroundOverlay({ pageKey, rootSelector }) {
  const [active, setActive] = useState(false)
  const [tool, setTool] = useState(TOOLS.MOVE)
  const [color, setColor] = useState(COLORS[0])
  const [imageTransforms, setImageTransforms] = useState({})
  const [strokes, setStrokes] = useState([])
  const [rects, setRects] = useState([])
  const [notes, setNotes] = useState([])
  const [docHeight, setDocHeight] = useState(0)
  const [selected, setSelected] = useState(null)

  const imagesRef = useRef([])
  const dragRef = useRef(null)
  const drawRef = useRef(null)

  // Load saved state once.
  useEffect(() => {
    const saved = loadState(pageKey)
    if (saved) {
      setImageTransforms(saved.imageTransforms || {})
      setStrokes(saved.strokes || [])
      setRects(saved.rects || [])
      setNotes(saved.notes || [])
    }
  }, [pageKey])

  // Persist on every change.
  useEffect(() => {
    saveState(pageKey, { imageTransforms, strokes, rects, notes })
  }, [pageKey, imageTransforms, strokes, rects, notes])

  // Track document height so the overlay always covers the full scrollable page.
  useEffect(() => {
    const measure = () => setDocHeight(document.documentElement.scrollHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [active, imageTransforms, strokes, rects, notes])

  // Apply saved transforms to real <img> elements + (re)index them so every
  // image on the page has a stable id to key state off of.
  useEffect(() => {
    const root = document.querySelector(rootSelector) || document
    const imgs = Array.from(root.querySelectorAll('img'))
    imgs.forEach((img, i) => {
      if (!img.dataset.pgId) img.dataset.pgId = `img-${i}`
    })
    imagesRef.current = imgs
    imgs.forEach((img) => {
      const t = imageTransforms[img.dataset.pgId]
      img.style.transform = t ? `translate(${t.x}px, ${t.y}px)` : ''
      if (t?.width) img.style.width = `${t.width}px`
      if (t?.height) img.style.height = `${t.height}px`
      img.style.position = t ? 'relative' : ''
      img.style.zIndex = t ? '5' : ''
    })
  }, [rootSelector, imageTransforms, active])

  // Wire up drag + resize on images only while Move tool is active.
  useEffect(() => {
    if (!active || tool !== TOOLS.MOVE) return
    const root = document.querySelector(rootSelector) || document
    const imgs = Array.from(root.querySelectorAll('img'))

    const onPointerDown = (e) => {
      const img = e.currentTarget
      e.preventDefault()
      const id = img.dataset.pgId
      const current = imageTransforms[id] || { x: 0, y: 0 }
      const startX = e.clientX
      const startY = e.clientY
      setSelected({ kind: 'image', id })
      const onMove = (ev) => {
        const dx = ev.clientX - startX
        const dy = ev.clientY - startY
        img.style.transform = `translate(${current.x + dx}px, ${current.y + dy}px)`
        dragRef.current = { id, x: current.x + dx, y: current.y + dy }
      }
      const onUp = () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        if (dragRef.current) {
          const { id: did, x, y } = dragRef.current
          setImageTransforms((prev) => ({ ...prev, [did]: { ...prev[did], x, y } }))
          dragRef.current = null
        }
      }
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
    }

    imgs.forEach((img) => {
      img.style.cursor = 'grab'
      img.addEventListener('pointerdown', onPointerDown)
    })
    return () => {
      imgs.forEach((img) => {
        img.style.cursor = ''
        img.removeEventListener('pointerdown', onPointerDown)
      })
    }
  }, [active, tool, rootSelector, imageTransforms])

  const [handles, setHandles] = useState([])
  const recomputeHandles = useCallback(() => {
    if (!active || tool !== TOOLS.MOVE) {
      setHandles([])
      return
    }
    const scrollX = window.scrollX
    const scrollY = window.scrollY
    setHandles(
      imagesRef.current.map((img) => {
        const r = img.getBoundingClientRect()
        return {
          id: img.dataset.pgId,
          x: r.right + scrollX,
          y: r.bottom + scrollY,
          w: r.width,
          h: r.height,
        }
      }),
    )
  }, [active, tool])

  useEffect(() => {
    recomputeHandles()
    window.addEventListener('scroll', recomputeHandles, true)
    window.addEventListener('resize', recomputeHandles)
    return () => {
      window.removeEventListener('scroll', recomputeHandles, true)
      window.removeEventListener('resize', recomputeHandles)
    }
  }, [recomputeHandles, imageTransforms])

  const startResize = (handle) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    const img = imagesRef.current.find((i) => i.dataset.pgId === handle.id)
    if (!img) return
    const startX = e.clientX
    const startY = e.clientY
    const startW = handle.w
    const startH = handle.h
    const aspect = startW / startH
    const onMove = (ev) => {
      const dx = ev.clientX - startX
      const newW = Math.max(30, startW + dx)
      const newH = newW / aspect
      img.style.width = `${newW}px`
      img.style.height = `${newH}px`
      recomputeHandles()
      dragRef.current = { id: handle.id, width: newW, height: newH }
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      if (dragRef.current) {
        const { id, width, height } = dragRef.current
        setImageTransforms((prev) => ({ ...prev, [id]: { ...prev[id], width, height } }))
        dragRef.current = null
      }
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  // Pen / rect drawing on the SVG layer.
  const svgPointerDown = (e) => {
    if (tool === TOOLS.MOVE) return
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const x = e.clientX - rect.left + window.scrollX
    const y = e.clientY - rect.top + window.scrollY

    if (tool === TOOLS.PEN) {
      const id = `stroke-${Date.now()}`
      const points = [[x, y]]
      drawRef.current = { id, points }
      setStrokes((prev) => [...prev, { id, color, points: [...points] }])
      const onMove = (ev) => {
        const px = ev.clientX - rect.left + window.scrollX
        const py = ev.clientY - rect.top + window.scrollY
        drawRef.current.points.push([px, py])
        setStrokes((prev) =>
          prev.map((s) => (s.id === id ? { ...s, points: [...drawRef.current.points] } : s)),
        )
      }
      const onUp = () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        drawRef.current = null
      }
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
    } else if (tool === TOOLS.RECT) {
      const id = `rect-${Date.now()}`
      const start = { x, y }
      setRects((prev) => [...prev, { id, color, x, y, w: 0, h: 0 }])
      const onMove = (ev) => {
        const px = ev.clientX - rect.left + window.scrollX
        const py = ev.clientY - rect.top + window.scrollY
        const nx = Math.min(start.x, px)
        const ny = Math.min(start.y, py)
        const nw = Math.abs(px - start.x)
        const nh = Math.abs(py - start.y)
        setRects((prev) => prev.map((r) => (r.id === id ? { ...r, x: nx, y: ny, w: nw, h: nh } : r)))
      }
      const onUp = () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
      }
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
    } else if (tool === TOOLS.TEXT) {
      const id = `note-${Date.now()}`
      setNotes((prev) => [...prev, { id, color, x, y, text: 'Note' }])
      setSelected({ kind: 'note', id })
    }
  }

  const deleteSelected = () => {
    if (!selected) return
    if (selected.kind === 'image') {
      setImageTransforms((prev) => {
        const next = { ...prev }
        delete next[selected.id]
        return next
      })
      const img = imagesRef.current.find((i) => i.dataset.pgId === selected.id)
      if (img) {
        img.style.transform = ''
        img.style.width = ''
        img.style.height = ''
      }
    } else if (selected.kind === 'note') {
      setNotes((prev) => prev.filter((n) => n.id !== selected.id))
    } else if (selected.kind === 'rect') {
      setRects((prev) => prev.filter((r) => r.id !== selected.id))
    } else if (selected.kind === 'stroke') {
      setStrokes((prev) => prev.filter((s) => s.id !== selected.id))
    }
    setSelected(null)
  }

  const clearAnnotations = () => {
    setStrokes([])
    setRects([])
    setNotes([])
    setSelected(null)
  }

  const resetLayout = () => {
    imagesRef.current.forEach((img) => {
      img.style.transform = ''
      img.style.width = ''
      img.style.height = ''
    })
    setImageTransforms({})
    setSelected(null)
  }

  useEffect(() => {
    if (!active) return
    const onKeyDown = (e) => {
      if ((e.key === 'Backspace' || e.key === 'Delete') && selected) {
        const tag = document.activeElement?.tagName
        if (tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return
        e.preventDefault()
        deleteSelected()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, selected])

  const toggle = () => {
    setActive((v) => !v)
    setSelected(null)
  }

  return createPortal(
    <>
      <button
        type="button"
        className={`pg-toggle${active ? ' pg-toggle--active' : ''}`}
        onClick={toggle}
      >
        {active ? '✕ Exit layout mode' : '✎ Edit layout'}
      </button>

      {active && (
        <>
          <div className="pg-toolbar">
            <div className="pg-toolbar__group">
              {[
                [TOOLS.MOVE, '🖐', 'Move & resize'],
                [TOOLS.PEN, '✏️', 'Pen'],
                [TOOLS.RECT, '▢', 'Section box'],
                [TOOLS.TEXT, '📝', 'Note'],
              ].map(([id, icon, label]) => (
                <button
                  key={id}
                  type="button"
                  title={label}
                  className={`pg-tool${tool === id ? ' pg-tool--active' : ''}`}
                  onClick={() => setTool(id)}
                >
                  {icon}
                </button>
              ))}
            </div>
            <div className="pg-toolbar__group">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`pg-swatch${color === c ? ' pg-swatch--active' : ''}`}
                  style={{ background: c }}
                  onClick={() => setColor(c)}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
            <div className="pg-toolbar__group">
              <button type="button" className="pg-action" onClick={deleteSelected} disabled={!selected}>
                🗑 Delete
              </button>
              <button type="button" className="pg-action" onClick={clearAnnotations}>
                Clear notes
              </button>
              <button type="button" className="pg-action" onClick={resetLayout}>
                Reset images
              </button>
            </div>
          </div>

          <div
            className="pg-overlay"
            style={{ height: docHeight, pointerEvents: tool === TOOLS.MOVE ? 'none' : 'auto' }}
          >
            <svg
              className="pg-svg"
              width="100%"
              height={docHeight}
              onPointerDown={svgPointerDown}
            >
              {rects.map((r) => (
                <rect
                  key={r.id}
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  fill={r.color}
                  fillOpacity={0.18}
                  stroke={r.color}
                  strokeWidth={2}
                  onPointerDown={(e) => {
                    if (tool !== TOOLS.MOVE) return
                    e.stopPropagation()
                    setSelected({ kind: 'rect', id: r.id })
                  }}
                  style={{ pointerEvents: tool === TOOLS.MOVE ? 'auto' : 'none', cursor: 'pointer' }}
                />
              ))}
              {strokes.map((s) => (
                <polyline
                  key={s.id}
                  points={s.points.map((p) => p.join(',')).join(' ')}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onPointerDown={(e) => {
                    if (tool !== TOOLS.MOVE) return
                    e.stopPropagation()
                    setSelected({ kind: 'stroke', id: s.id })
                  }}
                  style={{ pointerEvents: tool === TOOLS.MOVE ? 'auto' : 'none', cursor: 'pointer' }}
                />
              ))}
              {handles.map((h) => (
                <rect
                  key={h.id}
                  x={h.x - 8}
                  y={h.y - 8}
                  width={16}
                  height={16}
                  fill="#f2f2f2"
                  stroke="#111"
                  strokeWidth={1.5}
                  style={{ pointerEvents: 'auto', cursor: 'nwse-resize' }}
                  onPointerDown={startResize(h)}
                />
              ))}
            </svg>

            {notes.map((n) => (
              <div
                key={n.id}
                className={`pg-note${selected?.id === n.id ? ' pg-note--selected' : ''}`}
                style={{ left: n.x, top: n.y, borderColor: n.color, pointerEvents: 'auto' }}
                onPointerDown={(e) => {
                  if (tool !== TOOLS.MOVE) return
                  e.stopPropagation()
                  setSelected({ kind: 'note', id: n.id })
                  const startX = e.clientX
                  const startY = e.clientY
                  const origX = n.x
                  const origY = n.y
                  const onMove = (ev) => {
                    const dx = ev.clientX - startX
                    const dy = ev.clientY - startY
                    setNotes((prev) =>
                      prev.map((note) =>
                        note.id === n.id ? { ...note, x: origX + dx, y: origY + dy } : note,
                      ),
                    )
                  }
                  const onUp = () => {
                    window.removeEventListener('pointermove', onMove)
                    window.removeEventListener('pointerup', onUp)
                  }
                  window.addEventListener('pointermove', onMove)
                  window.addEventListener('pointerup', onUp)
                }}
              >
                <div
                  className="pg-note__text"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    setNotes((prev) =>
                      prev.map((note) =>
                        note.id === n.id ? { ...note, text: e.currentTarget.textContent } : note,
                      ),
                    )
                  }
                >
                  {n.text}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>,
    document.body,
  )
}
