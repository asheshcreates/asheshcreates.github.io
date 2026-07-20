import { useEffect, useRef, useId } from 'react'
import './YouTubeLoop.css'

// Standing rule for ambient looping YouTube embeds (e.g. PCC's Banyan tree
// animation): trim 2s off the start and end, then loop the trimmed range
// forever with zero user control — no play/pause, no scrub, no click-to-seek.
// Driven by the real YouTube IFrame Player API (not URL start/end params,
// which don't reliably autoplay/loop together) so the trim point is exact
// and playback is guaranteed to resume. `pointer-events: none` on the
// resulting iframe is what actually removes interaction.
const TRIM_SECONDS = 2

let apiReadyPromise = null
function loadYouTubeIframeAPI() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT)
  if (apiReadyPromise) return apiReadyPromise
  apiReadyPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (previous) previous()
      resolve(window.YT)
    }
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }
  })
  return apiReadyPromise
}

export default function YouTubeLoop({ id, duration, className, title }) {
  const rawId = useId()
  const mountId = `yt-loop-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`
  const playerRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    const start = TRIM_SECONDS
    const end = Math.max(start + 1, Math.round(duration) - TRIM_SECONDS)

    // Some browsers (notably Safari/iOS/WebKit) silently reject the initial
    // programmatic playVideo() call — even muted — with no error and no
    // retry of their own. Two layers of defense against a dead-looking loop:
    // (1) every animation frame, if the player isn't actually PLAYING, ask
    // it to play again; (2) the first real user interaction anywhere on the
    // page (click/scroll/touch — not a visible control, just an implicit
    // "browser now trusts this tab" signal) forces one more attempt.
    const unlockListeners = []
    const armInteractionUnlock = () => {
      const unlock = () => {
        const player = playerRef.current
        if (player && typeof player.playVideo === 'function') player.playVideo()
      }
      ;['pointerdown', 'touchstart', 'scroll', 'keydown'].forEach((evt) => {
        window.addEventListener(evt, unlock, { passive: true, once: true })
        unlockListeners.push([evt, unlock])
      })
    }

    loadYouTubeIframeAPI().then((YT) => {
      if (cancelled) return

      const tick = () => {
        const player = playerRef.current
        if (player && typeof player.getCurrentTime === 'function') {
          if (player.getCurrentTime() >= end) {
            player.seekTo(start, true)
          }
          if (
            typeof player.getPlayerState === 'function' &&
            player.getPlayerState() !== YT.PlayerState.PLAYING
          ) {
            player.playVideo()
          }
        }
        rafRef.current = requestAnimationFrame(tick)
      }

      playerRef.current = new YT.Player(mountId, {
        videoId: id,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          iv_load_policy: 3,
          start,
        },
        events: {
          onReady: (e) => {
            e.target.mute()
            e.target.playVideo()
            armInteractionUnlock()
            rafRef.current = requestAnimationFrame(tick)
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.ENDED) {
              e.target.seekTo(start, true)
              e.target.playVideo()
            }
          },
        },
      })
    })

    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      unlockListeners.forEach(([evt, fn]) => window.removeEventListener(evt, fn))
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy()
      }
      playerRef.current = null
    }
  }, [id, duration, mountId])

  return (
    <div className={`youtube-loop${className ? ` ${className}` : ''}`}>
      <div id={mountId} title={title} />
    </div>
  )
}
