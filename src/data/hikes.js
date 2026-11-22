import panoramaRidge from '../assets/home/panorama-ridge.jpg'
import blackTusk from '../assets/home/black-tusk.jpg'
import mountBrunswick from '../assets/home/mount-brunswick.jpg'
import wedgemountLake from '../assets/home/wedgemount-lake.jpg'
import saintMark from '../assets/profile/saint-mark.jpg'
import everest from '../assets/profile/everest.jpg'
import grouseGrind from '../assets/profile/grouse-grind.jpg'
import panorama2 from '../assets/hikes/panorama-2.jpg'
import panorama3 from '../assets/hikes/panorama-3.jpg'
import panorama4 from '../assets/hikes/panorama-4.jpg'
import blackTusk2 from '../assets/hikes/blackTusk-2.jpg'
import blackTusk3 from '../assets/hikes/blackTusk-3.jpg'
import blackTusk4 from '../assets/hikes/blackTusk-4.jpg'
import brunswick2 from '../assets/hikes/brunswick-2.jpg'
import brunswick3 from '../assets/hikes/brunswick-3.jpg'
import wedgemount2 from '../assets/hikes/wedgemount-2.jpg'
import wedgemount3 from '../assets/hikes/wedgemount-3.jpg'
import wedgemount4 from '../assets/hikes/wedgemount-4.jpg'
import saintMark2 from '../assets/hikes/saintMark-2.jpg'
import everest2 from '../assets/hikes/everest-2.jpg'
import everest3 from '../assets/hikes/everest-3.jpg'
import everest4 from '../assets/hikes/everest-4.jpg'
import grouse2 from '../assets/hikes/grouse-2.jpg'
import grouse3 from '../assets/hikes/grouse-3.jpg'
import grouse4 from '../assets/hikes/grouse-4.jpg'

/**
 * Hike card data (Figma "home/hike card"). `image` is the Figma photo; `photos` adds the
 * openly licensed Commons photos for the card carousel (credits: data/photoCredits.js).
 * Stats for Saint Mark's Summit and the Grouse Grind are corrected from research (Figma had
 * 7–9 hours / 1.9 km); the rest match Figma.
 */
export const HIKES = {
  panorama: {
    image: panoramaRidge,
    photos: [panoramaRidge, panorama2, panorama3, panorama4],
    tag: 'HARD • ALPINE',
    title: 'Panorama Ridge',
    location: 'Garibaldi Provincial Park, BC',
    rating: '4.9 (1580)',
    stats: [['30.1', 'KM'], ['1,490', 'M ELEV'], ['8–10', 'HOURS']],
  },
  blackTusk: {
    image: blackTusk,
    photos: [blackTusk, blackTusk2, blackTusk3, blackTusk4],
    tag: 'STRENUOUS • SCRAMBLE',
    title: 'The Black Tusk',
    location: 'Garibaldi Provincial Park, BC',
    rating: '4.5 (690)',
    stats: [['26.4', 'KM'], ['1,763', 'M ELEV'], ['9–11', 'HOURS']],
  },
  brunswick: {
    image: mountBrunswick,
    photos: [mountBrunswick, brunswick2, brunswick3],
    tag: 'STRENUOUS • SCRAMBLE',
    title: 'Brunswick Mountain Trail',
    location: 'Lions Bay, BC',
    rating: '4.8 (498)',
    stats: [['14.3', 'KM'], ['1,539', 'M ELEV'], ['7–9', 'HOURS']],
  },
  wedgemount: {
    image: wedgemountLake,
    photos: [wedgemountLake, wedgemount2, wedgemount3, wedgemount4],
    tag: 'HARD • STEEP INCLINE',
    title: 'Wedgemount Lake',
    location: 'Whistler, BC',
    rating: '4.8 (810)',
    stats: [['12.0', 'KM'], ['1,200', 'M ELEV'], ['6–7', 'HOURS']],
  },
  saintMark: {
    image: saintMark,
    photos: [saintMark, saintMark2],
    tag: 'MODERATE • FLAT',
    title: 'Saint Mark Summit',
    location: 'West Van, BC',
    rating: '4.8 (215)',
    stats: [['11', 'KM'], ['460', 'M ELEV'], ['4–5', 'HOURS']],
  },
  everest: {
    image: everest,
    photos: [everest, everest2, everest3, everest4],
    tag: 'DIFFICULT • SLOPE',
    title: 'Mt. Everest',
    location: 'Kathmandu, Nepal',
    rating: '5.0 (303)',
    stats: [['130', 'KM'], ['5,545', 'M ELEV'], ['12–18', 'DAYS']],
  },
  grouse: {
    image: grouseGrind,
    photos: [grouseGrind, grouse2, grouse3, grouse4],
    tag: 'MODERATE • ARDUOUS',
    title: 'Grouse Grind',
    location: 'North Van, BC',
    rating: '4.3 (375)',
    stats: [['2.5', 'KM'], ['800', 'M ELEV'], ['1–2', 'HOURS']],
  },
}

/**
 * Which trip types are realistic for a hike (Round 20), from its time stat: a hike measured in
 * days can't be a day hike, and one needing more than 2 days can't be an overnight.
 * Day hikes also top out at ~14 hours on the trail.
 */
export function tripLimits(hike) {
  const [time, unit] = hike.stats[2]
  const [lo, hi = lo] = time.split(/[–-]/).map(parseFloat)
  const days = unit.toUpperCase().startsWith('DAY')
  return {
    'Day hike': !days && hi <= 14,
    Overnight: !days || lo <= 2,
    'Multi-day trek': true,
    'Summit hike': true,
    reason: days ? `${hike.title} takes ${time} days` : `${hike.title} takes ${time} hours`,
  }
}
