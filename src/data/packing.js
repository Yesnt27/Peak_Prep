import winterGear from '../assets/packing/winter-gear.svg'
import healthSafety from '../assets/packing/health-safety.svg'
import foodWater from '../assets/packing/food-water.svg'
import electronics from '../assets/packing/electronics.svg'
import mtnIcon from '../assets/hike/mtn-20.svg'
import { HIKES } from './hikes.js'

/**
 * Packing list for one training (Round 20), built from the hike, its date and trip type:
 * - snow (Nov–Apr, or any hike gaining 3,000 m+) → Winter Gear; otherwise a Layers group
 * - hot months (Jun–Sep) → sun protection
 * - scrambles → helmet + gloves
 * - overnight / multi-day → Camping
 * Food & Water and Health & Safety follow the first aid lessons: water at ~0.5 L per hour of hiking,
 * electrolytes + salty snacks, a way to treat creek water, warm drinks and layers in the cold,
 * emergency blanket, whistle, map & compass.
 * Icons: the four Figma packing icons; Camping and Layers borrow other app icons until new ones arrive.
 */
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

/** Month index (0–11) from a training date such as "Sat, Dec 12", "Jun 23–24" or "Mar 2027". */
export function monthOf(date) {
  const m = String(date ?? '').toLowerCase().match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)
  return m ? MONTHS.indexOf(m[0]) : new Date().getMonth()
}

const num = (s) => parseFloat(String(s).replace(/,/g, ''))

export function tripInfo(training) {
  const hike = HIKES[training.hike]
  const month = monthOf(training.date)
  const [time, unit] = hike.stats[2]
  const [lo, hi = lo] = time.split(/[–-]/).map(parseFloat)
  const multiDay = unit.toUpperCase().startsWith('DAY')
  const overnight =
    multiDay || ['Overnight', 'Multi-day trek'].includes(training.trip) || /\d+\s*[–-]\s*\d+/.test(training.date ?? '')
  return {
    hike,
    hours: multiDay ? 8 : (lo + hi) / 2, // hiking hours per day
    overnight,
    snow: [10, 11, 0, 1, 2, 3].includes(month) || num(hike.stats[1][0]) >= 3000,
    hot: [5, 6, 7, 8].includes(month),
    scramble: /SCRAMBLE/.test(hike.tag),
    bc: /BC$/.test(hike.location),
  }
}

export function packingFor(training, injuries = []) {
  const t = tripInfo(training)
  const litres = t.overnight ? 2 : Math.min(4, Math.max(1, Math.round(t.hours * 0.5)))
  const groups = [
    t.snow
      ? {
          name: 'Winter Gear',
          icon: winterGear,
          items: ['Microspikes', 'Insulated Jacket', 'Rain Shell', 'Toque', 'Mittens', 'Spare Gloves'],
        }
      : { name: 'Layers', icon: winterGear, items: ['Warm Layer', 'Rain Shell', 'Light Gloves'] },
    {
      name: 'Food & Water',
      icon: foodWater,
      items: [
        `Water (${litres}L)`,
        'Electrolytes',
        'Salty Snacks',
        'Trail Mix',
        ...(t.hours >= 4 && !t.overnight ? ['Lunch'] : []),
        ...(t.hours >= 4 || t.overnight ? ['Water Filter or Tablets'] : []),
        ...(t.snow ? ['Thermos (warm drink)'] : []),
      ],
    },
    {
      name: 'Health & Safety',
      icon: healthSafety,
      items: [
        'First Aid Kit',
        'Emergency Blanket',
        'Whistle',
        'Map & Compass',
        ...(injuries.some((i) => /knee/i.test(i)) ? ['Knee Brace'] : []),
        ...(t.scramble ? ['Helmet', 'Grippy Gloves'] : []),
        ...(t.hot ? ['Sun Hat', 'Sunscreen', 'Sunglasses'] : []),
        ...(t.bc ? ['Bear Spray'] : []),
      ],
    },
    { name: 'Electronics', icon: electronics, items: ['Phone (offline map)', 'Power Bank', 'Headlamp'] },
    ...(t.overnight
      ? [
          {
            name: 'Camping',
            icon: mtnIcon,
            smallIcon: true,
            items: ['Tent', 'Sleeping Bag', 'Sleeping Pad', 'Stove & Fuel', 'Dinner & Breakfast'],
          },
        ]
      : []),
  ]
  return groups
}

// Demo account (Brunswick): packed to match the designed "8 of 11"-style progress.
export const DEMO_PACKED = [
  'Microspikes',
  'Insulated Jacket',
  'Rain Shell',
  'First Aid Kit',
  'Knee Brace',
  'Trail Mix',
  'Salty Snacks',
  'Power Bank',
  'Map & Compass',
  'Water (4L)',
]
