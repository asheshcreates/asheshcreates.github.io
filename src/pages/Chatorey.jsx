import Nav from '../components/Nav.jsx'
import { Reveal, RevealGrid } from '../components/Reveal.jsx'
import ProjectPager from '../components/ProjectPager.jsx'
import './Chatorey.css'

import heroPhotoCard from '../assets/chatorey/hero/photo-card.png'
import heroNoteCard from '../assets/chatorey/hero/note-card.png'

import cd1 from '../assets/chatorey/creative-direction/1.jpeg'
import cd2 from '../assets/chatorey/creative-direction/2.jpeg'
import cd3 from '../assets/chatorey/creative-direction/3.jpeg'
import cd4 from '../assets/chatorey/creative-direction/4.jpeg'
import cd5 from '../assets/chatorey/creative-direction/5.jpeg'
import cd6 from '../assets/chatorey/creative-direction/6.jpeg'

import attireHero from '../assets/chatorey/attire/hero.jpeg'
import attireTeeModels from '../assets/chatorey/attire/tee.png'
import attireTeeFlat from '../assets/chatorey/attire/tee-flat-transparent.png'
import attireCap from '../assets/chatorey/attire/cap-transparent.png'
import attireApron from '../assets/chatorey/attire/apron-transparent.png'

import paperBag from '../assets/chatorey/packaging/paper-bag-transparent.png'
import teaCup from '../assets/chatorey/packaging/tea-cup-transparent.png'
import sandwichBox from '../assets/chatorey/packaging/sandwich-box-transparent.png'
import saladBowl from '../assets/chatorey/packaging/salad-bowl-transparent.png'

import bpPattern from '../assets/chatorey/butter-paper/pattern.jpeg'
import bpWordmark from '../assets/chatorey/butter-paper/wordmark-repeat.jpeg'
import bpMock1 from '../assets/chatorey/butter-paper/mockup-1.jpeg'
import bpMock2 from '../assets/chatorey/butter-paper/mockup-2.jpeg'
import bpMock3 from '../assets/chatorey/butter-paper/mockup-3.jpeg'
import bpMock4 from '../assets/chatorey/butter-paper/mockup-4.jpeg'

import irl1 from '../assets/chatorey/irl/1.jpg'
import irl2 from '../assets/chatorey/irl/2.jpg'

import dishHero from '../assets/chatorey/dishes/hero-samosa-chai.jpeg'
import dish1 from '../assets/chatorey/dishes/1.jpeg'
import dish2 from '../assets/chatorey/dishes/2.jpeg'
import dish3 from '../assets/chatorey/dishes/3.jpeg'
import dish4 from '../assets/chatorey/dishes/4.jpeg'
import dish5 from '../assets/chatorey/dishes/5.jpeg'
import dish6 from '../assets/chatorey/dishes/6.jpeg'
import dish7 from '../assets/chatorey/dishes/7.jpeg'
import dish8 from '../assets/chatorey/dishes/8.jpeg'

import art1 from '../assets/chatorey/artwork/1-tight.jpeg'
import art2 from '../assets/chatorey/artwork/2-tight.jpeg'
import art3 from '../assets/chatorey/artwork/3-tight.jpeg'
import art4 from '../assets/chatorey/artwork/4-tight.jpeg'

const creativeDirectionImages = [cd1, cd2, cd3, cd6, cd5, cd4]
const dishGridImages = [dish1, dish2, dish3, dish4, dish5, dish6, dish7, dish8]
const mockups = [bpMock1, bpMock2, bpMock3, bpMock4]

export default function Chatorey() {
  return (
    <main className="chatorey">
      <Nav />

      <section className="ch-hero">
        <div
          className="ch-hero__pattern"
          style={{ backgroundImage: `url(${bpPattern})` }}
        />
        <span className="ch-hero__badge caps">Rebrand</span>
        <div className="ch-hero__layout">
          <img
            src={heroPhotoCard}
            alt="Chatorey fries being tossed with spice"
            className="ch-hero__card"
          />
          <img
            src={heroNoteCard}
            alt="Chatorey is a bold Indian street food restaurant based in Scarborough. They came with a brand identity and needed it brought to life - visually, consistently, and at a level that reflects their vibe. Menu Photography Shoot | Brand Packaging | Art Direction"
            className="ch-hero__note"
          />
        </div>
      </section>

      <section className="ch-section">
        <Reveal tag="h2" className="ch-heading ch-heading--left caps">
          Creative Direction
        </Reveal>
        <RevealGrid className="ch-grid ch-grid--creative">
          {creativeDirectionImages.map((src, i) => (
            <img src={src} alt="" key={i} loading="lazy" />
          ))}
        </RevealGrid>
        <Reveal tag="p" className="ch-copy">
          For this campaign, we weren&rsquo;t just shooting people eating
          food. We were curating a feeling of warmth, ease, and &ldquo;the
          place to be.&rdquo; The visuals signal something to the right
          audience, and that audience signals it back. That&rsquo;s how you
          build a brand that attracts instead of chases. Strategy tells us
          who we&rsquo;re talking to. Creative direction tells us how it
          feels to be talked to.
        </Reveal>
      </section>

      <section className="ch-section">
        <Reveal tag="h2" className="ch-heading ch-heading--right ch-heading--small caps">
          Partner&rsquo;s Attire
        </Reveal>
        <div className="ch-attire-box">
          <div className="ch-attire">
            <div className="ch-attire__col ch-attire__col--main">
              <Reveal tag="div">
                <img src={attireHero} alt="Chatorey staff in branded aprons" />
              </Reveal>
              <Reveal tag="div" delay={0.07}>
                <img
                  src={attireTeeModels}
                  alt="Chatorey staff t-shirt back design on two models"
                />
              </Reveal>
            </div>
            <div className="ch-attire__col ch-attire__col--details">
              <Reveal tag="div" delay={0.1}>
                <img src={attireCap} alt="Chatorey branded cap" />
              </Reveal>
              <Reveal tag="div" delay={0.17}>
                <img src={attireTeeFlat} alt="Chatorey staff t-shirt design" />
              </Reveal>
              <Reveal tag="div" delay={0.24} className="ch-attire__apron">
                <img src={attireApron} alt="Chatorey branded apron" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="ch-section">
        <Reveal tag="h2" className="ch-heading ch-heading--left caps">
          Packaging
        </Reveal>
        <RevealGrid className="ch-grid ch-grid--four ch-grid--packaging">
          <div className="ch-packaging-tile">
            <img src={paperBag} alt="Chatorey paper bag" />
            <span className="caps">Paper Bag</span>
          </div>
          <div className="ch-packaging-tile">
            <img src={teaCup} alt="Chatorey tea cup" />
            <span className="caps">Tea Cup</span>
          </div>
          <div className="ch-packaging-tile">
            <img src={sandwichBox} alt="Chatorey sandwich box" />
            <span className="caps">Sandwich Box</span>
          </div>
          <div className="ch-packaging-tile">
            <img src={saladBowl} alt="Chatorey salad bowl" />
            <span className="caps">Salad Bowl</span>
          </div>
        </RevealGrid>
      </section>

      <section className="ch-section">
        <Reveal tag="h2" className="ch-heading ch-heading--right ch-heading--small caps">
          Butter Paper Design
        </Reveal>
        <div className="ch-grid ch-grid--texture">
          <Reveal tag="div" className="ch-texture-block">
            <img src={bpPattern} alt="Chatorey butter paper pattern" />
          </Reveal>
          <Reveal tag="div" className="ch-texture-block" delay={0.07}>
            <img src={bpWordmark} alt="Chatorey wordmark repeat pattern" />
          </Reveal>
        </div>
        <RevealGrid className="ch-grid ch-grid--four ch-grid--mockups">
          {mockups.map((src, i) => (
            <img src={src} alt="" key={i} loading="lazy" />
          ))}
        </RevealGrid>
      </section>

      <section className="ch-section">
        <Reveal tag="h2" className="ch-heading ch-heading--center ch-heading--quiet caps">
          IRL Visualization
        </Reveal>
        <div className="ch-irl">
          <Reveal tag="div">
            <img src={irl1} alt="Chatorey packaging arranged on a table" />
          </Reveal>
          <Reveal tag="div" delay={0.07}>
            <img src={irl2} alt="Chatorey staff serving in the restaurant" />
          </Reveal>
        </div>
      </section>

      <section className="ch-section">
        <div className="ch-samosa">
          <Reveal tag="div" className="ch-samosa__copy">
            <h3 className="ch-heading ch-heading--small caps">Samosa &amp; Chai</h3>
            <p className="ch-samosa__kicker">The hero duo. Styled to highlight</p>
            <p className="ch-samosa__text">
              Chatorey&rsquo;s branded cups alongside the warmth of a classic
              street food pairing. Moody lighting, crisp focus, immediate
              appetite appeal.
            </p>
            <p className="ch-samosa__text ch-samosa__text--quiet">
              Brand packaging visible throughout all menu shots, reinforcing
              brand recall at every touchpoint.
            </p>
          </Reveal>
          <Reveal tag="div" className="ch-dish-hero" delay={0.07}>
            <img src={dishHero} alt="Samosa and chai, the hero duo" />
          </Reveal>
        </div>
        <Reveal tag="h2" className="ch-heading ch-heading--left caps">
          Every Dish Tells A Story
        </Reveal>
        <RevealGrid className="ch-grid ch-grid--reflow">
          {dishGridImages.map((src, i) => (
            <img src={src} alt="" key={i} loading="lazy" />
          ))}
        </RevealGrid>
      </section>

      <section className="ch-section">
        <div className="ch-artwork">
          <Reveal tag="div" className="ch-artwork__frame ch-artwork__frame--a">
            <img src={art1} alt="" />
          </Reveal>
          <Reveal tag="div" className="ch-artwork__frame ch-artwork__frame--b" delay={0.07}>
            <img src={art2} alt="" />
          </Reveal>
          <Reveal
            tag="h2"
            className="ch-heading ch-heading--center caps ch-artwork__heading"
          >
            Monthly Artwork Rotation
          </Reveal>
          <Reveal tag="div" className="ch-artwork__frame ch-artwork__frame--c" delay={0.14}>
            <img src={art3} alt="" />
          </Reveal>
          <Reveal tag="div" className="ch-artwork__frame ch-artwork__frame--d" delay={0.21}>
            <img src={art4} alt="" />
          </Reveal>
        </div>
        <Reveal tag="p" className="ch-copy">
          Curated a custom art wall system for the restaurant&rsquo;s
          interior, original hand-drawn food illustrations printed and framed
          for the dining space, with a monthly rotation concept to keep the
          ambience fresh.
        </Reveal>
      </section>

      <Reveal tag="section" className="ch-closing">
        <p className="caps">
          Full menu photography shoot &middot; Branded social content &amp;
          reels &middot; Brand packaging direction &middot; Creative
          direction
        </p>
      </Reveal>

      <ProjectPager slug="chatorey" />
    </main>
  )
}
