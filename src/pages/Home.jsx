import { Reveal } from '../components/Reveal.jsx'
import FlipBoard from '../components/FlipBoard.jsx'
import CascadeText from '../components/CascadeText.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import reelBg from '../assets/home/projector-reel.png'
import { projects, clients, fieldGroups, values } from '../data/projects.js'
import './Home.css'

const flipItems = projects.map((project, i) => ({
  index: String(i + 1).padStart(2, '0'),
  name: project.name,
  path: project.path,
}))

const EMAIL = 'ashesh@ashesharorastudios.com'
const INSTAGRAM = 'https://www.instagram.com/ashesharorastudios/'
const LINKEDIN = 'https://www.linkedin.com/in/ashesh-arora-8498ab277'

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <img className="hero__reel-bg" src={reelBg} alt="" aria-hidden="true" />
        <div className="hero__topright">
          <ThemeToggle />
          <a className="hero__contact" href={`mailto:${EMAIL}`}>
            Reach Out
          </a>
        </div>
        <div className="hero__wordmark">
          <span className="wordmark hero__line">Ashesh</span>
          <span className="wordmark hero__line">Arora</span>
        </div>
        <div className="hero__flipboard">
          <FlipBoard items={flipItems} />
        </div>
        <div className="hero__studios">
          <span className="wordmark">Studios</span>
        </div>
      </section>

      <Reveal tag="section" className="about">
        <p className="about__line">
          A cultural IP and creative production studio building stories worth
          remembering.
        </p>
      </Reveal>

      <section className="pillars">
        <div className="pillar">
          <CascadeText as="h2" className="pillar__heading" text="Clients" />
          <ul className="pillar__list">
            {clients.map((item) => (
              <li key={item}>
                <CascadeText text={item} />
              </li>
            ))}
          </ul>
        </div>

        <div className="pillar">
          <CascadeText as="h2" className="pillar__heading" text="Fields" />
          {fieldGroups.map((group, gi) => (
            <ul className="pillar__list" key={gi}>
              {group.map((item) => (
                <li key={item}>
                  <CascadeText text={item} />
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="pillar">
          <CascadeText as="h2" className="pillar__heading" text="Values" />
          <ul className="pillar__list">
            {values.map((item) => (
              <li key={item}>
                <CascadeText text={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="footer">
        <a href={`mailto:${EMAIL}`}>Email</a>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </footer>
    </main>
  )
}
