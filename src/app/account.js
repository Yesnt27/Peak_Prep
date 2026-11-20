import { useSyncExternalStore } from 'react'
import { DEMO_TRAININGS } from '../data/trainings.js'

/**
 * Who is using the prototype (no backend):
 * - Log In  → the demo account (Hudson Kemp), i.e. the screens exactly as designed.
 * - Sign Up → a new account that starts empty and fills in from the sign-up steps.
 * Kept in sessionStorage so a refresh keeps it; a new tab starts on the demo account.
 */
const KEY = 'peakprep-account'

const NEW_ACCOUNT = {
  type: 'new',
  name: '',
  age: '',
  weight: '',
  height: '',
  sex: '',
  years: '',
  frequency: '',
  photo: null, // data URL of the picked image
  liked: [], // hike keys (data/hikes.js)
  friends: [], // person ids (data/friends.js)
  plannedHike: null, // picked on New training → Target Hike
  trainings: [], // [{ hike, date }] started in New training (newest first)
  activeTraining: null, // hike key of the training opened last (shown on /training)
}

const DEMO = { type: 'demo' }

function read() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(KEY))
    if (saved && saved.type) return saved
  } catch {
    // storage blocked: demo account
  }
  return DEMO
}

let account = read()
const listeners = new Set()

function set(next) {
  account = next
  try {
    sessionStorage.setItem(KEY, JSON.stringify(account))
  } catch {
    // storage full or blocked (e.g. a very large photo): keep it in memory only
  }
  listeners.forEach((l) => l())
}

export const getAccount = () => account
export const isNewAccount = () => account.type === 'new'

export function logIn() {
  set(DEMO)
}

/** Sign out: back to the demo account state; the caller sends the user to the Log In / Sign Up screen. */
export function signOut() {
  set(DEMO)
}

export function signUp() {
  try {
    sessionStorage.removeItem('peakprep-lessons-new') // a fresh account starts with no lessons done
  } catch {
    // ignore
  }
  set({ ...NEW_ACCOUNT })
}

/** Merge fields into a new account (ignored on the demo account). */
export function updateAccount(patch) {
  if (account.type !== 'new') return
  set({ ...account, ...patch })
}

export function toggleLike(key) {
  const liked = account.liked ?? []
  updateAccount({ liked: liked.includes(key) ? liked.filter((k) => k !== key) : [...liked, key] })
}

export function toggleFriend(id) {
  const friends = account.friends ?? []
  updateAccount({ friends: friends.includes(id) ? friends.filter((f) => f !== id) : [...friends, id] })
}

/* ---------- Trainings (both account types) ---------- */

/** New training answers kept until Done (works on the demo account too). */
export function planTraining(patch) {
  set({ ...account, ...patch })
}

/** New training → Done: add the planned hike at 0% and open it. */
export function startTraining() {
  const hike = account.plannedHike ?? 'blackTusk'
  const others = (account.trainings ?? []).filter((t) => t.hike !== hike)
  set({ ...account, trainings: [{ hike, date: account.plannedDate }, ...others], activeTraining: hike })
}

/** Remember which training /training (and its Packing / Safety / Hike log pages) shows. */
export function openTraining(hike) {
  if (account.activeTraining !== hike) set({ ...account, activeTraining: hike })
}

/**
 * Every hike this account trains for, newest first: ones started in New training (0%, `fresh`),
 * then, on the demo account, the designed ones (data/trainings.js).
 */
export function trainingsFor(acc) {
  const started = [...(acc.trainings ?? []), ...(acc.training ? [acc.training] : [])] // `training` = before Round 19
    .filter((t, i, all) => all.findIndex((o) => o.hike === t.hike) === i)
    .map((t) => ({ ...t, pct: 0, fresh: true }))
  const designed = acc.type === 'new' ? [] : DEMO_TRAININGS.filter((d) => !started.some((t) => t.hike === d.hike))
  return [...started, ...designed]
}

/** The training /training shows: the one opened last, else the first; a new account with none previews its planned hike. */
export function useTraining() {
  const acc = useAccount()
  const list = trainingsFor(acc)
  return list.find((t) => t.hike === acc.activeTraining) ?? list[0] ?? { hike: acc.plannedHike ?? 'blackTusk', pct: 0, fresh: true }
}

/** React hook: re-renders when the account changes. */
export function useAccount() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => account,
  )
}

/** Beginner / Intermediate / Advanced from years of hiking. */
export function levelFor(years) {
  const n = parseFloat(years)
  if (!Number.isFinite(n) || n < 2) return 'Beginner'
  if (n < 5) return 'Intermediate'
  return 'Advanced'
}

/** Downscale a picked image to a small square-ish JPEG data URL (keeps sessionStorage small). */
export function readPhoto(file, size = 320) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, size / Math.min(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
    img.onerror = (e) => {
      URL.revokeObjectURL(url)
      reject(e)
    }
    img.src = url
  })
}
