import { useSyncExternalStore } from 'react'

/** Answers from the Completed Hike (Hiker Log) steps, shown on Review Details. sessionStorage only. */
const KEY = 'peakprep-hiker-log'
const EMPTY = { date: '', time: null, feel: null, prep: null, emergencies: [], body: null, notes: '' }

function read() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(KEY))
    if (saved && typeof saved === 'object') return { ...EMPTY, ...saved }
  } catch {
    // storage blocked
  }
  return EMPTY
}

let log = read()
const listeners = new Set()

export function setLog(patch) {
  log = { ...log, ...patch }
  try {
    sessionStorage.setItem(KEY, JSON.stringify(log))
  } catch {
    // ignore
  }
  listeners.forEach((l) => l())
}

export function useHikerLog() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => log,
  )
}
