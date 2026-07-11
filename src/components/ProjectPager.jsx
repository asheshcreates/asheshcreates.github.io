import { Link } from 'react-router-dom'
import { projects } from '../data/projects.js'
import './ProjectPager.css'

// Cross-project navigation for the bottom of every project page. Previous
// project sits bottom-left, next sits bottom-right, wrapping around the
// order defined in projects.js — mirrors the homepage's own project list.
export default function ProjectPager({ slug }) {
  const idx = projects.findIndex((p) => p.slug === slug)
  if (idx === -1) return null

  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]

  return (
    <nav className="project-pager">
      <Link to={prev.path} className="project-pager__link project-pager__link--prev">
        <span className="project-pager__arrow">&larr;</span>
        <span className="project-pager__text">Explore: {prev.name}</span>
      </Link>
      <Link to={next.path} className="project-pager__link project-pager__link--next">
        <span className="project-pager__text">Explore: {next.name}</span>
        <span className="project-pager__arrow">&rarr;</span>
      </Link>
    </nav>
  )
}
