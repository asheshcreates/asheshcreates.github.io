import chatoreyThumb from '../assets/homepage/chatorey-thumb.jpeg'
import tibThumb from '../assets/homepage/tib-thumb.jpg'
import pccThumb from '../assets/homepage/pcc-thumb.png'
import solumThumb from '../assets/solum/hero-bottle.jpg'

export const projects = [
  {
    slug: 'chatorey',
    name: 'Chatorey',
    year: 2026,
    thumb: chatoreyThumb,
    path: '/chatorey',
  },
  {
    slug: 'this-is-brampton',
    name: 'This Is Brampton',
    year: 2026,
    thumb: tibThumb,
    path: '/this-is-brampton',
  },
  {
    slug: 'pcc',
    name: 'Punjabi Chamber of Commerce',
    year: 2026,
    thumb: pccThumb,
    path: '/pcc',
  },
  {
    slug: 'solum',
    name: 'Solum',
    year: 2026,
    thumb: solumThumb,
    path: '/solum',
  },
]

export const clients = [
  'Enabled Talent',
  'Chatorey',
  'Punjabi Chamber of Commerce',
  'The Esteem Agency',
  'Fuelshine',
]

// Grouped by gravity of service: strategy/direction first, then craft/production.
// The two groups render with a blank line between them.
export const fieldGroups = [
  [
    'Brand identity',
    'Creative direction',
    'Concepting',
    'Visual systems',
    'Creative consultation',
  ],
  ['Documentary', 'Campaigns', 'Communications', 'Animation', 'Graphic design'],
]

// Ordered by gravity, most foundational first.
export const values = [
  'Culture and connection',
  'Purpose',
  'Authenticity',
  'Partnership',
  'Collaboration',
  'Innovation',
  'Quality',
  'Simplicity',
]
