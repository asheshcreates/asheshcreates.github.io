import { useState } from 'react'
import Nav from '../components/Nav.jsx'
import { Reveal, RevealGrid } from '../components/Reveal.jsx'
import FlipTitle from '../components/FlipTitle.jsx'
import YouTubeLoop from '../components/YouTubeLoop.jsx'
import ProjectPager from '../components/ProjectPager.jsx'
import './PCC.css'

import fre8Poster from '../assets/pcc/thumbs/fre8-video-frame.jpg'
import heroPanelistsBanyan from '../assets/pcc/hero-panelists-banyan.png'
import banyanPolaroid from '../assets/pcc/banyan-ballroom-polaroid.jpg'
import theatreHub from '../assets/pcc/theatre-hub.jpg'
import thumbDhalla from '../assets/pcc/thumbs/dhalla.jpg'
import thumbVisionFilm from '../assets/pcc/thumbs/vision-film.jpg'
import thumbThiara from '../assets/pcc/thumbs/thiara.jpg'
import thumbSingh from '../assets/pcc/thumbs/singh.jpg'

// Hosted as unlisted YouTube embeds — public/videos/ is gitignored and every
// file here exceeds GitHub's 100MB push limit, so these can't be committed
// directly. See BRIEF.md Section 12 item 5 for the full constraint.
// FRE8 has its own dedicated section further down the page — not part of
// this block of 4.
const films = [
  {
    name: 'Amandipp Singh',
    role: 'Honoree film',
    key: 'singh',
    youtubeId: 'Cwlfi6R42HI',
    thumb: thumbSingh,
  },
  {
    name: 'Gala Video',
    role: 'The vision behind PCC',
    key: 'gala',
    youtubeId: 'HSQknM9vuLQ',
    thumb: thumbVisionFilm,
  },
  {
    name: 'Ruby Dhalla',
    role: 'Honoree film',
    key: 'dhalla',
    youtubeId: 'sVF84UBBzwU',
    thumb: thumbDhalla,
  },
  {
    name: 'Kim Thiara',
    role: 'Honoree film',
    key: 'thiara',
    youtubeId: '6EahZquGXc4',
    thumb: thumbThiara,
  },
]

function ClickToPlay({ film, hideCaption, className }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className={`pcc-video-tile${className ? ` ${className}` : ''}`}>
      <button
        type="button"
        className="pcc-video-tile__frame"
        onClick={() => setPlaying(true)}
        disabled={playing}
        aria-label={`Play ${film.name}`}
      >
        {playing ? (
          <iframe
            className="pcc-video-tile__video"
            src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={film.name}
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img className="pcc-video-tile__poster" src={film.thumb} alt="" />
            <span className="pcc-video-tile__play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
          </>
        )}
      </button>
      {!hideCaption && (
        <div className="pcc-video-tile__caption">
          <span className="pcc-video-tile__name">{film.name}</span>
          <span className="pcc-video-tile__role">{film.role}</span>
        </div>
      )}
    </div>
  )
}

export default function PCC() {
  return (
    <main className="pcc">
      <Nav />

      <section className="pcc-section pcc-section--hero">
        <FlipTitle
          lines={['Belong Gala 2026', 'Punjabi Chamber of Commerce']}
        />
        <Reveal tag="div" className="pcc-hero-photo">
          <img src={heroPanelistsBanyan} alt="Panelists on stage in front of the gold Banyan tree, framed in gold" />
        </Reveal>
      </section>

      <section className="pcc-section">
        <Reveal tag="p" className="pcc-copy">
          The brief was one word: BELONG. Harsimran Grewal and the PCC team
          came to us with that single instruction and asked us to build a
          visual language around it. The answer? A Banyan tree. A tree that
          spreads without a single center, the same way the Punjabi diaspora
          rebuilt communities seven seas away from the soil that we all
          share as a commonality, one connection at a time rather than from
          one root. We designed it, animated it, and carried it across
          every touchpoint.
        </Reveal>
      </section>

      <section className="pcc-section">
        <div className="pcc-banyan-row">
          <Reveal tag="div" className="pcc-banyan-row__media">
            <img
              className="pcc-banyan-row__image"
              src={banyanPolaroid}
              alt="The Banyan tree animation running live on the gala stage screen, in a polaroid frame"
            />
          </Reveal>
          <Reveal tag="p" className="pcc-copy pcc-banyan-row__text" delay={0.07}>
            The Banyan tree brought to life, built to run as a looping
            backdrop across the gala&rsquo;s stage and signage. Panelists
            sitting on the stage under it, or an acceptance speech being
            delivered for an award accepted, the Banyan tree represented a
            communion of a collective sharing wisdom and knowledge from
            experiences lived and transmuted.
          </Reveal>
        </div>
      </section>

      <section className="pcc-section">
        <Reveal tag="div" className="pcc-extra-photo">
          <YouTubeLoop
            className="pcc-recap-video"
            id="TSRy_JnM-pw"
            duration={16}
            title="Banyan tree animation, looping"
          />
        </Reveal>
      </section>

      <section className="pcc-section">
        <Reveal tag="p" className="pcc-copy">
          Alongside the visual identity, we were tasked with communicating
          a message bigger: A keynote introduction, the Punjabi
          Chamber&rsquo;s vision film, and individual documentary portraits
          of the evening&rsquo;s awardees. Click into any of the four below
          to watch.
        </Reveal>
      </section>

      <section className="pcc-section">
        <Reveal tag="div" className="pcc-hub">
          <img src={theatreHub} alt="A theatre screen showing the studio's film credits, framed by red curtains and seating" />
        </Reveal>
      </section>

      <section className="pcc-section">
        <RevealGrid className="pcc-video-grid">
          {films.map((film) => (
            <ClickToPlay film={film} key={film.key} />
          ))}
        </RevealGrid>
      </section>

      <Reveal tag="section" className="pcc-closing">
        <p className="pcc-closing__line">
          &ldquo;A sense of belonging is a felt feeling, and the only way
          to communicate it is to show what being human means.&rdquo;
        </p>
        <p className="pcc-closing__credit caps">
          Creative direction by Ashesh Arora.
        </p>
      </Reveal>

      {/* ---------- FRE8 (separate project, same page) ---------- */}
      <div className="pcc-divider">
        <span className="pcc-divider__rule" />
        <span className="pcc-divider__label caps">Also from the studio</span>
        <span className="pcc-divider__rule" />
      </div>

      <section className="pcc-section fre8-section">
        <FlipTitle lines={['FRE8']} />
        <Reveal tag="div" className="fre8-video">
          <ClickToPlay
            film={{ name: 'FRE8', youtubeId: 'b0CU6ovaSjY', thumb: fre8Poster }}
            hideCaption
          />
        </Reveal>
        <Reveal tag="p" className="pcc-copy" delay={0.07}>
          FRE8 is building an on-chain trucking and supply chain network,
          three platforms tracking freight movement on a blockchain ledger,
          built to solve something the industry has lived with for decades:
          fragmented systems and slow payment cycles.
        </Reveal>
        <Reveal tag="p" className="pcc-copy" delay={0.14}>
          The direction here was deliberately simple. One video, the team
          speaking directly to camera about the product. No manifesto.
          When the technology itself is unfamiliar, the fastest way to
          build trust isn&rsquo;t a big idea wrapped around it, it&rsquo;s
          a real person talking about it from the heart.
        </Reveal>
      </section>

      <ProjectPager slug="pcc" />
    </main>
  )
}
