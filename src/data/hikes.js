import panoramaRidge from '../assets/home/panorama-ridge.jpg'
import blackTusk from '../assets/home/black-tusk.jpg'
import mountBrunswick from '../assets/home/mount-brunswick.jpg'
import wedgemountLake from '../assets/home/wedgemount-lake.jpg'

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
    title: 'Mount Brunswick',
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
}
