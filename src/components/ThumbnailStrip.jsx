import { Link } from 'react-router-dom'
import './ThumbnailStrip.css'

export default function ThumbnailStrip({ projects }) {
  const track = [...projects, ...projects]

  return (
    <div className="thumb-strip">
      <div className="thumb-strip__track">
        {track.map((project, i) => (
          <Link
            to={project.path}
            key={`${project.slug}-${i}`}
            className="thumb-strip__item"
          >
            <img src={project.thumb} alt={project.name} loading="lazy" />
            <div className="thumb-strip__caption">
              <span className="caps">{project.name}</span>
              <span>{project.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
