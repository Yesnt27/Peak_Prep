/**
 * Prototype-only lesson progress (no backend). Kept in sessionStorage so a
 * refresh keeps it; a new tab starts again from the Figma state (2 of 4).
 */
const KEY = 'peakprep-lessons'

import { LESSONS as LESSON_DATA } from '../data/firstAid.js'
import { getAccount } from './account.js'

// "Brunswick Mountain Trail Safety" lessons: [name, scenario count, slug].
export const LESSONS = LESSON_DATA.map((l) => [l.name, `${l.scenarios.length} Scenarios`, l.slug])
// Demo account (Log In) starts from the Figma state; a new account (Sign Up) starts with none done.
const DEFAULT = { demo: ['Dehydration', 'Scramble Safety'], new: [] }
const key = () => `${KEY}-${getAccount().type}`

function read() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(key()))
    if (Array.isArray(saved)) return saved
  } catch {
    // storage blocked: fall back to the starting state
  }
  return DEFAULT[getAccount().type] ?? DEFAULT.demo
}

let memory = {} // used when sessionStorage is blocked

export function completedLessons() {
  return memory[key()] ?? read()
}

export function completeLesson(name) {
  const completed = completedLessons()
  if (completed.includes(name)) return
  memory = { ...memory, [key()]: [...completed, name] }
  try {
    sessionStorage.setItem(key(), JSON.stringify(memory[key()]))
  } catch {
    // ignore
  }
}
