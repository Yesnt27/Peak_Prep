import amber from '../assets/friends/amber.jpg'
import eli from '../assets/friends/eli.jpg'
import sam from '../assets/friends/sam.jpg'
import owen from '../assets/friends/owen.jpg'
import natalia from '../assets/friends/natalia.jpg'

/**
 * Friend list (Figma "Friendlist" 1646:13323) and each friend's profile
 * (layout from the "view-friend.png" reference). Natalia's profile uses the
 * reference's stats and activities exactly; the others vary them.
 * `activities`: [hike key in data/hikes.js, date, with-text, liked].
 */
export const FRIENDS = [
  {
    id: 'amber-kenz',
    photo: amber,
    name: 'Amber Kenz',
    since: 'Friends since 2017',
    friends: 24,
    years: 4,
    level: 'Advanced',
    hikes: 32,
    progress: 0.8,
    activities: [
      ['panorama', 'Sep 14, 2026', 'With Siena & Mark', true],
      ['blackTusk', 'Aug 2, 2026', 'With Eli & Sam', true],
      ['saintMark', 'May 18, 2026', 'With Siena & Mark', false],
    ],
  },
  {
    id: 'eli-eifler',
    photo: eli,
    name: 'Eli Eifler',
    since: 'Friends since 2017',
    friends: 18,
    years: 2,
    level: 'Intermediate',
    hikes: 14,
    progress: 0.5,
    activities: [
      ['wedgemount', 'Oct 4, 2026', 'With Sam & Amber', true],
      ['grouse', 'Jul 25, 2026', 'With Sam', false],
      ['saintMark', 'Jun 9, 2026', 'With Siena & Mark', true],
    ],
  },
  {
    id: 'sam-eifler',
    photo: sam,
    name: 'Sam Eifler',
    since: 'Friends since 2017',
    friends: 9,
    years: 1,
    level: 'Beginner',
    hikes: 6,
    progress: 0.3,
    activities: [
      ['grouse', 'Oct 19, 2026', 'With Eli', true],
      ['saintMark', 'Aug 30, 2026', 'With Eli & Amber', false],
    ],
  },
  {
    id: 'owen-interino',
    photo: owen,
    name: 'Owen Interino',
    since: 'Friends since 2017',
    friends: 31,
    years: 6,
    level: 'Advanced',
    hikes: 47,
    progress: 0.95,
    activities: [
      ['brunswick', 'Sep 27, 2026', 'With Siena & Mark', true],
      ['blackTusk', 'Aug 16, 2026', 'With Amber', true],
      ['everest', 'Jun 20, 2025', 'With Siena & Mark', true],
    ],
  },
  {
    id: 'natalia-wang',
    photo: natalia,
    name: 'Natalia Wang',
    since: 'Friends since 2017',
    friends: 13,
    years: 1,
    level: 'Beginner',
    hikes: 5,
    progress: 0.15,
    activities: [
      ['saintMark', 'Dec 12, 2026', 'With Siena & Mark', true],
      ['everest', 'June 20, 2025', 'With Siena & Mark', true],
      ['grouse', 'July 25, 2025', 'With Siena & Mark', false],
    ],
  },
]

export const friendById = (id) => FRIENDS.find((f) => f.id === id)
