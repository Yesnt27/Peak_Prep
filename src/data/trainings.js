/**
 * Hikes the demo account (Log In) is already training for, in Home → Training order.
 * Each opens its own Training overview (/training): photo, name, date, readiness ring + rows.
 * Brunswick = Figma "Training overview (hi-fi)" 1780:3125. Black Tusk = the values on its
 * Home → Training card (date, 34% ready, 7 months to go); "On track" is set to fit.
 * Hikes started in New training are added per account (app/account.js → startTraining).
 */
export const DEMO_TRAININGS = [
  {
    hike: 'brunswick',
    date: 'Sat, Dec 12',
    trip: 'Summit hike',
    pct: 82,
    toGo: '10 days to go',
    rows: [
      ['Prep status', 'On optimal track'],
      ['Training completed', '3 of 6 weeks'],
      ['Elevation goal', '3,389 / 4,120 m'],
    ],
  },
  {
    hike: 'blackTusk',
    date: 'Jun 23–24',
    trip: 'Overnight',
    pct: 34,
    toGo: '7 months to go',
    rows: [
      ['Prep status', 'On track'],
      ['Hike date', 'Jun 23–24'],
      ['Time to go', '7 months'],
    ],
  },
]
