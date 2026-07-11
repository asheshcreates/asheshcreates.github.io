import { Link } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  return (
    <nav className="project-nav">
      <Link to="/" className="project-nav__back">
        Landing Page
      </Link>
    </nav>
  )
}
