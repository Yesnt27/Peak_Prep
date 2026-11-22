/**
 * Get certified → "First aid courses near you" (Round 18).
 * `level` matches the Course level buttons, `categories` the category tags; a course
 * shows when it matches both (nothing picked = everything shows).
 * Lengths and links checked 2026-11-22 on each organisation's own site. Dates and prices
 * change, so the card says "See dates" and the link goes to the course page.
 */
export const COURSES = [
  {
    org: 'red-cross',
    name: 'CPR Level C',
    length: '5 hrs',
    level: 'Standard',
    categories: ['CPR'],
    url: 'https://myrc.redcross.ca/en/home-course-details/fa-cpr/',
  },
  {
    org: 'red-cross',
    name: 'Standard First Aid & CPR C',
    length: '2 days',
    level: 'Standard',
    categories: ['CPR', 'Emergency First-aid'],
    url: 'https://myrc.redcross.ca/en/home-course-details/fa-sfa/',
  },
  {
    org: 'st-johns',
    name: 'Intermediate First Aid CPR C + AED',
    length: '2 days',
    level: 'Standard',
    categories: ['CPR', 'Emergency First-aid'],
    url: 'https://sja.ca/en/product/2332',
  },
  {
    org: 'red-cross',
    name: 'Remote First Aid',
    length: '20 hrs',
    level: 'Standard',
    categories: ['Wilderness', 'CPR'],
    url: 'https://myrc.redcross.ca/en/home-course-details/fa-rfa/',
  },
  {
    org: 'lifesaving',
    name: 'Bronze Medallion',
    length: '15 hrs',
    level: 'Standard',
    categories: ['Aquatics'],
    url: 'https://www.lifesaving.bc.ca/courses/bronze-medallion/',
  },
  {
    org: 'red-cross',
    name: 'Wilderness First Aid',
    length: '40 hrs',
    level: 'Intermediate',
    categories: ['Wilderness', 'Emergency First-aid'],
    url: 'https://myrc.redcross.ca/en/home-course-details/fa-wfa/',
  },
  {
    org: 'lifesaving',
    name: 'Bronze Cross',
    length: '20 hrs',
    level: 'Intermediate',
    categories: ['Aquatics', 'Waterfront'],
    url: 'https://www.lifesaving.bc.ca/courses/bronze-cross/',
  },
  {
    org: 'red-cross',
    name: 'Wilderness First Responder',
    length: '80 hrs',
    level: 'Advanced',
    categories: ['Wilderness', 'Emergency First-aid', 'CPR'],
    url: 'https://myrc.redcross.ca/en/home-course-details/fa-wfr/',
  },
  {
    org: 'st-johns',
    name: 'Advanced First Aid with Oxygen & AED',
    length: '10 days',
    level: 'Advanced',
    categories: ['Emergency First-aid', 'CPR'],
    url: 'https://sja.ca/en/training/specialized-advanced-first-aid/advanced-first-aid-with-oxygen-aed',
  },
  {
    org: 'st-johns',
    name: 'Emergency Medical Responder',
    length: 'Blended',
    level: 'Advanced',
    categories: ['Emergency First-aid'],
    url: 'https://sja.ca/en/bcy-emr-training',
  },
  {
    org: 'lifesaving',
    name: 'National Lifeguard – Waterfront',
    length: '24–44 hrs',
    level: 'Advanced',
    categories: ['Waterfront', 'Aquatics'],
    url: 'https://www.lifesaving.bc.ca/programs-courses/lifeguarding/',
  },
]

export const CATEGORIES = ['Wilderness', 'CPR', 'Aquatics', 'Waterfront', 'Emergency First-aid']
