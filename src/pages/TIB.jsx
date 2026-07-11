import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Reveal } from '../components/Reveal.jsx'
import FlipTitle from '../components/FlipTitle.jsx'
import VideoFrame from '../components/VideoFrame.jsx'
import FlipBook from '../components/FlipBook.jsx'
import ProjectPager from '../components/ProjectPager.jsx'
import './TIB.css'

import heroPoster from '../assets/tib/hero-poster.jpg'
import zinePage1 from '../assets/tib/zine/page-1.jpg'
import zinePage2 from '../assets/tib/zine/page-2.jpg'
import zinePage3 from '../assets/tib/zine/page-3.jpg'
import zinePage4 from '../assets/tib/zine/page-4.jpg'
import zinePage5 from '../assets/tib/zine/page-5.jpg'
import zinePage6 from '../assets/tib/zine/page-6.jpg'
import zinePage7 from '../assets/tib/zine/page-7.jpg'

const zinePages = [
  zinePage1,
  zinePage2,
  zinePage3,
  zinePage4,
  zinePage5,
  zinePage6,
  zinePage7,
]

export default function TIB() {
  const [playbillOpen, setPlaybillOpen] = useState(false)

  return (
    <main className="tib">
      <Link to="/" className="tib__close" aria-label="Back to homepage">
        &times;
      </Link>

      <div className="tib__grid">
        <div className="tib__cell tib__cell--video">
          <VideoFrame src="/videos/tib-hero.mp4" poster={heroPoster} />
        </div>

        <Reveal tag="div" className="tib__cell tib__cell--title">
          <FlipTitle lines={['This Is', 'Brampton']} size="xl" />
        </Reveal>

        <Reveal tag="div" className="tib__cell tib__cell--intro" delay={0.06}>
          <p className="tib__intro">
            Brampton doesn&rsquo;t get written about the way it deserves.
            This is our attempt at an ode, seven characters who look like the
            city actually looks, not the version that makes headlines.
          </p>
        </Reveal>

        <Reveal tag="div" className="tib__cell tib__cell--studio" delay={0.1}>
          <span className="tib__eyebrow caps">From the studio</span>
          <p className="tib__body">
            We don&rsquo;t take a brief and hand back deliverables. We build
            worlds and put real people in them. This Is Brampton is the
            clearest proof of that on the shelf: seven characters who never
            share a single frame, all of them somehow holding up the same
            city.
          </p>
          <p className="tib__body">
            That&rsquo;s the instinct we bring to every project we take on,
            whether it&rsquo;s a city, a restaurant, or a founder&rsquo;s
            first pitch deck. Treat the subject like it deserves a whole
            world built around it, not a checklist of deliverables.
          </p>
        </Reveal>

        <Reveal tag="div" className="tib__cell tib__cell--director" delay={0.14}>
          <span className="tib__eyebrow caps">From the creative director</span>
          <p className="tib__body">
            The epiphany came sitting in a gurdwara, having the communal
            meal, langar. Having lived in Canada for the last 4 years or so,
            I&rsquo;d only visited Brampton a handful of times, always
            afraid, having heard many stereotypes and stories. To my
            surprise, I had a great time and felt a sense of community
            instantly. So I just wanted to document that experience, exactly
            like this.
          </p>
          <span className="tib__signoff">
            &mdash; Ashesh Arora, Creative Director
          </span>
        </Reveal>

        <Reveal tag="div" className="tib__cell tib__cell--pbline" delay={0.18}>
          {!playbillOpen && (
            <p className="tib__playbill-invite">
              Enjoy flipping through the Playbill.
            </p>
          )}
        </Reveal>

        <div className="tib__cell tib__cell--pbobj">
          <FlipBook
            pages={zinePages}
            open={playbillOpen}
            onOpenChange={setPlaybillOpen}
          />
        </div>
      </div>

      <ProjectPager slug="this-is-brampton" />
    </main>
  )
}
