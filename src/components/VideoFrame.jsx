import { useEffect, useRef, useState } from 'react'
import AssetSlot from './AssetSlot.jsx'
import './VideoFrame.css'

function formatTime(t) {
  if (!Number.isFinite(t)) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

// Shared "screen" treatment for every autoplay video on the site (TIB hero,
// FRE8 founder video, PCC's banyan loop). Starts muted and autoplaying, with
// a play/pause control and a scrubbable timeline so it's never a locked-in
// background loop. Pass `silent` for a loop with no audio track and no
// narrative to watch (PCC's tree animation) — it stays a pure ambient
// backdrop with no controls at all.
export default function VideoFrame({ src, poster, silent = false, label, className }) {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [scrubbing, setScrubbing] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el || silent) return
    const onTime = () => {
      if (!scrubbing) setProgress(el.currentTime)
    }
    const onMeta = () => setDuration(el.duration)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('loadedmetadata', onMeta)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('loadedmetadata', onMeta)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
    }
  }, [silent, scrubbing])

  if (!src) {
    return (
      <div className={`video-frame${className ? ` ${className}` : ''}`}>
        <AssetSlot label={label} kind="video" />
      </div>
    )
  }

  const toggleMute = () => {
    const el = videoRef.current
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
  }

  const togglePlay = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) el.play()
    else el.pause()
  }

  const seekTo = (clientX, track) => {
    const el = videoRef.current
    if (!el || !duration) return
    const rect = track.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    el.currentTime = ratio * duration
    setProgress(ratio * duration)
  }

  const handleScrubDown = (e) => {
    setScrubbing(true)
    seekTo(e.clientX, e.currentTarget)
    const track = e.currentTarget
    const onMove = (ev) => seekTo(ev.clientX, track)
    const onUp = () => {
      setScrubbing(false)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const pct = duration ? (progress / duration) * 100 : 0

  return (
    <div className={`video-frame${className ? ` ${className}` : ''}`}>
      <video
        ref={videoRef}
        className="video-frame__video"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
      {!silent && (
        <div className="video-frame__controls">
          <button
            type="button"
            className="video-frame__play"
            onClick={togglePlay}
            aria-label={playing ? 'Pause video' : 'Play video'}
          >
            {playing ? '⏸' : '▶'}
          </button>
          <div
            className="video-frame__track"
            onPointerDown={handleScrubDown}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={progress}
          >
            <div className="video-frame__track-fill" style={{ width: `${pct}%` }} />
            <div className="video-frame__track-thumb" style={{ left: `${pct}%` }} />
          </div>
          <span className="video-frame__time">
            {formatTime(progress)} / {formatTime(duration)}
          </span>
          <button
            type="button"
            className="video-frame__unmute"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
          >
            {muted ? '\u{1F507}' : '\u{1F50A}'}
          </button>
        </div>
      )}
    </div>
  )
}
