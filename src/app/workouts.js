import { useSyncExternalStore } from 'react'
import { getAccount } from './account.js'

/**
 * Finished exercises per training day (Round 20), in sessionStorage like lesson progress.
 * Key: "<account>|<hike>|<YYYY-MM-DD>" → exercise ids done. The demo account starts with
 * earlier days done and the first two of today's exercises done (Figma "2 of 3 done").
 */
const KEY = 'peakprep-workouts'
const listeners = new Set()

let done = (() => {
  try {
    return JSON.parse(sessionStorage.getItem(KEY)) ?? {}
  } catch {
    return {}
  }
})()

export const dayKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const keyFor = (hike, date) => `${getAccount().type}|${hike}|${dayKey(date)}`

const startOfToday = () => {
  const t = new Date()
  t.setHours(0, 0, 0, 0)
  return t
}

/** Ids done on `date` (out of `planned`). */
export function doneOn(hike, date, planned, isDemo) {
  const saved = done[keyFor(hike, date)]
  if (saved) return saved
  if (!isDemo) return []
  const diff = date - startOfToday()
  if (diff < 0) return planned // earlier days: done
  if (diff === 0) return planned.slice(0, 2) // today: 2 of 3, as designed
  return []
}

export function setDone(hike, date, ids) {
  done = { ...done, [keyFor(hike, date)]: ids }
  try {
    sessionStorage.setItem(KEY, JSON.stringify(done))
  } catch {
    // ignore
  }
  listeners.forEach((l) => l())
}

/** Re-render when any exercise is ticked or finished. */
export function useWorkouts() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => done,
  )
}
