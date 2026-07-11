import Nav from '../components/Nav.jsx'
import { Reveal } from '../components/Reveal.jsx'
import FlipTitle from '../components/FlipTitle.jsx'
import ProjectPager from '../components/ProjectPager.jsx'
import './Solum.css'

import product from '../assets/solum/handoff/product.jpg'
import roster from '../assets/solum/handoff/roster.jpg'
import conceptGulfRitual from '../assets/solum/handoff/concept-01-gulf-ritual.jpg'
import conceptDesertBotany from '../assets/solum/handoff/concept-02-desert-botany.jpg'
import conceptIndustrialGym from '../assets/solum/handoff/concept-03-industrial-gym.jpg'

export default function Solum() {
  return (
    <main className="solum">
      <Nav />

      <section className="solum-section solum-section--hero">
        <FlipTitle lines={['Solum']} />
        <Reveal tag="p" className="solum-tagline" delay={0.07}>
          How one product became three campaigns
        </Reveal>
      </section>

      <section className="solum-section">
        <Reveal tag="p" className="solum-copy">
          Solum is a capability study. We built a men&rsquo;s skincare brand
          from nothing: naming, product line, packaging, a cast of six men,
          then took that single set of assets and proved it could carry
          three completely different campaigns without reshooting a single
          frame.
        </Reveal>
        <Reveal tag="p" className="solum-copy" delay={0.07}>
          Every asset here is AI generated. Every decision, casting,
          direction, world, mood, is still made by a studio. That
          distinction is the whole point of showing this.
        </Reveal>
      </section>

      <section className="solum-section">
        <Reveal tag="h2" className="solum-subhead caps">
          The Product
        </Reveal>
        <Reveal tag="p" className="solum-copy" delay={0.07}>
          The starting point was three mock products under one name, Solum.
          Latin for ground, the place everything starts from. Daily
          Cleanser, Facial Oil, Moisturizer. Eucalyptus and sage, amber
          glass, cream labels. Nothing ornate. A brand that doesn&rsquo;t
          shout.
        </Reveal>
        <Reveal tag="div" className="solum-full-image" delay={0.1}>
          <img src={product} alt="The three Solum products, Daily Cleanser, Facial Oil, and Moisturizer, in amber glass with cream labels" />
        </Reveal>
      </section>

      <section className="solum-section">
        <Reveal tag="h2" className="solum-subhead caps">
          The Roster
        </Reveal>
        <Reveal tag="p" className="solum-copy" delay={0.07}>
          Next came the cast. Six men, generated with real specificity: a
          particular bone structure, skin tone, haircut, cultural marker,
          not a generic attractive man repeated six times. That specificity
          is what lets one small roster carry three different worlds later
          without ever feeling recycled.
        </Reveal>
        <Reveal tag="div" className="solum-full-image" delay={0.1}>
          <img src={roster} alt="The six-man Solum cast, headshots and lifestyle shots side by side" />
        </Reveal>
      </section>

      <section className="solum-section">
        <Reveal tag="h2" className="solum-subhead caps">
          Creative Direction
        </Reveal>
        <Reveal tag="p" className="solum-copy" delay={0.07}>
          This is the part that actually matters for a client. The same
          product and the same six men can be directed into completely
          different markets, moods, and messages depending on who
          we&rsquo;re trying to reach.
        </Reveal>
        <Reveal tag="p" className="solum-copy" delay={0.14}>
          An audience in the Gulf reads gold, ceremony, and inherited
          ritual as trust. An audience training at 6am reads discipline
          and cold water as trust. The product never changes. The
          direction does. That&rsquo;s the capability being demonstrated
          here: one creative foundation, built once, translated as many
          times as a market requires.
        </Reveal>
      </section>

      <section className="solum-section">
        <Reveal tag="p" className="solum-copy solum-copy--intro">
          Three concepts came out of that foundation. Each one is a
          complete, self-contained world, built and read on its own. None
          of them borrow from each other, and none are meant to be read as
          one collage. What follows is each concept by itself, then what
          they add up to together.
        </Reveal>
      </section>

      <section className="solum-section solum-concept">
        <Reveal tag="span" className="solum-label caps">
          Concept 01
        </Reveal>
        <Reveal tag="h2" className="solum-subhead caps" delay={0.05}>
          The Gulf Ritual
        </Reveal>
        <Reveal tag="p" className="solum-copy" delay={0.1}>
          Gold trays, aged silver, embroidered textile, a dagger held with
          intention. This concept treats the product like an heirloom,
          something passed down rather than picked off a shelf. Every
          panel reinforces the same idea: care, ceremony, self-respect as
          inheritance.
        </Reveal>
        <Reveal tag="div" className="solum-full-image" delay={0.15}>
          <img src={conceptGulfRitual} alt="The Gulf Ritual campaign board: gold trays, aged silver, embroidered textile, and a dagger" />
        </Reveal>
      </section>

      <section className="solum-section solum-concept">
        <Reveal tag="span" className="solum-label caps">
          Concept 02
        </Reveal>
        <Reveal tag="h2" className="solum-subhead caps" delay={0.05}>
          Desert Botany
        </Reveal>
        <Reveal tag="p" className="solum-copy" delay={0.1}>
          Wide desert light, sage gathered by hand, water at the wadi.
          Where the Gulf Ritual concept is interior and ceremonial, this
          one is outdoor and elemental, the product tied back to the land
          its ingredients actually come from. Same product, same
          restraint, a completely different register.
        </Reveal>
        <Reveal tag="div" className="solum-full-image" delay={0.15}>
          <img src={conceptDesertBotany} alt="The Desert Botany campaign board: wide desert light, sage gathered by hand, and the wadi" />
        </Reveal>
      </section>

      <section className="solum-section solum-concept">
        <Reveal tag="span" className="solum-label caps">
          Concept 03
        </Reveal>
        <Reveal tag="h2" className="solum-subhead caps" delay={0.05}>
          The Industrial Gym
        </Reveal>
        <Reveal tag="p" className="solum-copy" delay={0.1}>
          Concrete, steel, cold water, effort. This concept has nothing to
          do with ceremony. It&rsquo;s discipline before the day starts,
          the product folded into a routine that already exists rather
          than introducing a new one. Same six men, same three products,
          an entirely different emotional temperature.
        </Reveal>
        <Reveal tag="div" className="solum-full-image" delay={0.15}>
          <img src={conceptIndustrialGym} alt="The Industrial Gym campaign board: concrete, steel, cold water, and effort" />
        </Reveal>
      </section>

      <section className="solum-section">
        <Reveal tag="p" className="solum-copy">
          Put together, these three concepts are the actual pitch.
          Preproduction, production, and post all run through one
          AI-assisted pipeline, and a campaign can be localized for a new
          market without reshooting a single frame. This is what a
          full-scope engagement with the studio looks like in practice.
          Solum is the proof. The next brand this happens for could be
          yours.
        </Reveal>
      </section>

      <Reveal tag="section" className="solum-closing">
        <p>
          &ldquo;One product&rsquo;s messaging, built once, translated
          across taste, geography, and market without rebuilding the brand
          each time.&rdquo;
        </p>
      </Reveal>

      <ProjectPager slug="solum" />
    </main>
  )
}
