import panoramaRidge from '../assets/home/panorama-ridge.jpg'
import blackTusk from '../assets/home/black-tusk.jpg'
import mountBrunswick from '../assets/home/mount-brunswick.jpg'
import wedgemountLake from '../assets/home/wedgemount-lake.jpg'
import saintMark from '../assets/profile/saint-mark.jpg'
import everest from '../assets/profile/everest.jpg'
import grouseGrind from '../assets/profile/grouse-grind.jpg'

/** Hike card data as shown in Figma "home/hike card" instances. */
export const HIKES = {
  panorama: {
    image: panoramaRidge,
    tag: 'HARD • ALPINE',
    title: 'Panorama Ridge',
    location: 'Garibaldi Provincial Park, BC',
    rating: '4.9 (1580)',
    stats: [['30.1', 'KM'], ['1,490', 'M ELEV'], ['8–10', 'HOURS']],
  },
  blackTusk: {
    image: blackTusk,
    tag: 'STRENUOUS • SCRAMBLE',
    title: 'The Black Tusk',
    location: 'Garibaldi Provincial Park, BC',
    rating: '4.5 (690)',
    stats: [['26.4', 'KM'], ['1,763', 'M ELEV'], ['9–11', 'HOURS']],
  },
  brunswick: {
    image: mountBrunswick,
    tag: 'STRENUOUS • SCRAMBLE',
    title: 'Brunswick Mountain Trail',
    location: 'Lions Bay, BC',
    rating: '4.8 (498)',
    stats: [['14.3', 'KM'], ['1,539', 'M ELEV'], ['7–9', 'HOURS']],
  },
  wedgemount: {
    image: wedgemountLake,
    tag: 'HARD • STEEP INCLINE',
    title: 'Wedgemount Lake',
    location: 'Whistler, BC',
    rating: '4.8 (810)',
    stats: [['12.0', 'KM'], ['1,200', 'M ELEV'], ['6–7', 'HOURS']],
  },
  // From Figma "Completed Hikes" cards (used on friend profiles).
  saintMark: {
    image: saintMark,
    tag: 'MODERATE • FLAT',
    title: 'Saint Mark Summit',
    location: 'West Van, BC',
    rating: '4.8 (215)',
    stats: [['10', 'KM'], ['570', 'M ELEV'], ['7–9', 'HOURS']],
  },
  everest: {
    image: everest,
    tag: 'DIFFICULT • SLOPE',
    title: 'Mt. Everest',
    location: 'Kathmandu, NPL',
    rating: '5.0 (303)',
    stats: [['130', 'KM'], ['5,545', 'M ELEV'], ['12–18', 'DAYS']],
  },
  grouse: {
    image: grouseGrind,
    tag: 'MODERATE • ARDUOUS',
    title: 'Grouse Grind',
    location: 'North Van, BC',
    rating: '4.3 (375)',
    stats: [['1.9', 'KM'], ['780', 'M ELEV'], ['7–9', 'HOURS']],
  },
}
