import './AssetSlot.css'

// Visible placeholder for any image/video the studio still needs to supply.
// Renders instead of a broken <img>/<video> so missing assets are obvious
// in the live preview rather than silent, and names exactly what file goes
// where. Swap the real asset in and this disappears on its own.
export default function AssetSlot({ label, kind = 'image', aspect }) {
  return (
    <div
      className={`asset-slot asset-slot--${kind}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      <span className="asset-slot__icon" aria-hidden="true">
        {kind === 'video' ? '▶' : '✦'}
      </span>
      <span className="asset-slot__label">{label}</span>
    </div>
  )
}
