/**
 * Prototype-only lesson progress (no backend). Kept in sessionStorage so a
 * refresh keeps it; a new tab starts again from the Figma state (2 of 4).
 */
const KEY = 'peakprep-lessons'

// Figma "Brunsick Mountain Safety" lessons: [name, scenario count].
export const LESSONS = [
  ['Dehydration', '8 Scenarios'],
  ['Scramble Safety', '8 Scenarios'],
  ['Heat Exposure', '8 Scenarios'],
  ['Snowy Peaks', '3 Scenarios'],
]
const DEFAULT = ['Dehydration', 'Scramble Safety']

function read() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(KEY))
    if (Array.isArray(saved)) return saved
  } catch {
    // storage blocked: fall back to the Figma state
  }
  return DEFAULT
}

let completed = read()

export function completedLessons() {
  return completed
}

export function completeLesson(name) {
  if (completed.includes(name)) return
  completed = [...completed, name]
  try {
    sessionStorage.setItem(KEY, JSON.stringify(completed))
  } catch {
    // ignore
  }
}
