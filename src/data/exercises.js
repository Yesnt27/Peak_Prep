import stairClimber from '../assets/exercises/stair-climber.jpg'
import weightedWalk from '../assets/exercises/weighted-walk.jpg'
import endurance from '../assets/exercises/endurance.jpg'
import stepUps from '../assets/exercises/step-ups.png'
import walkingLunges from '../assets/exercises/walking-lunges.png'
import chairSquat from '../assets/exercises/chair-squat.jpg'

const commons = (file) => `https://commons.wikimedia.org/wiki/File:${file}`

/**
 * Training exercises (Round 20). `label` is what Daily Training lists and the exercise page's
 * title; `how` is shown under the photo. Photos / drawings are openly licensed from
 * Wikimedia Commons (researched 2026-11-22), resized to 800px; `drawing` = line art on white.
 */
export const EXERCISES = {
  stairs: {
    label: 'Stair Climber · lv. 6',
    image: stairClimber,
    how: 'Stand tall and hold the rails lightly. Step with your whole foot at a steady pace you could keep talking at.',
    credit: { artist: 'Benjamín Núñez González', license: 'CC BY-SA 4.0', source: commons('Life_Fitness,_Stair_Climbing,_Spain,_2016.JPG') },
  },
  weightedWalk: {
    label: 'Weighted Walk · 15kg',
    image: weightedWalk,
    how: 'Load your hiking pack and walk uphill or up stairs. Keep the hip belt snug and take short, steady steps.',
    credit: { artist: 'Krishna k. sahh', license: 'CC0', source: commons('Two_hikers_ascending_a_stone-stepped_forest_path.jpg') },
  },
  endurance: {
    label: 'Endurance',
    image: endurance,
    how: 'Brisk walk or easy jog. Breathe through your nose if you can; slow down if you can’t hold a conversation.',
    credit: { artist: 'Shixart1985', license: 'CC BY 2.0', source: commons('Woman_jogging_in_a_park_during_the_day_with_trees_and_natural_light_in_the_background.jpg') },
  },
  stepUps: {
    label: 'Step-ups',
    image: stepUps,
    drawing: true,
    how: 'Step onto a sturdy bench or stair with one foot, push through the heel to stand, then step down. Switch legs.',
    credit: { artist: 'Everkinetic', license: 'CC BY-SA 3.0', source: commons('Step-ups-2-801x1024.png') },
  },
  lunges: {
    label: 'Walking Lunges',
    image: walkingLunges,
    drawing: true,
    how: 'Step forward and lower until both knees bend to about 90°, then bring the back foot through into the next lunge.',
    credit: { artist: 'Everkinetic', license: 'CC BY-SA 3.0', source: commons('Walking-lunges-2.png') },
  },
  squats: {
    label: 'Chair Squats',
    image: chairSquat,
    drawing: true,
    how: 'Feet hip-width apart, sit back until you lightly touch the chair, then stand up through your heels.',
    credit: { artist: 'BruceBlaus', license: 'CC BY-SA 4.0', source: commons('Exercise_Chair_Squat.png') },
  },
}

// The demo account's daily plan (Figma Training Schedule 2068:5154).
const DEMO_DAY = ['stairs', 'weightedWalk', 'endurance']
// A new account alternates two sessions on its training days; 15–30 min sessions do two exercises.
const SESSIONS = [
  ['stairs', 'stepUps', 'endurance'],
  ['weightedWalk', 'lunges', 'squats'],
]

export const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/** The exercise ids planned for `date` on this training ([] = rest day). */
export function workoutFor(training, date, isDemo) {
  if (isDemo && !training.fresh) return DEMO_DAY
  const days = training.days ?? []
  if (!days.includes(WEEKDAYS[date.getDay()])) return []
  const dayNumber = Math.floor(date.getTime() / 86400000)
  const session = SESSIONS[dayNumber % 2]
  return training.time === '15-30 min' ? session.slice(0, 2) : session
}
