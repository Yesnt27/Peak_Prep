import { useSyncExternalStore } from 'react'
import { getAccount } from './account.js'
import { DEMO_PACKED } from '../data/packing.js'

/**
 * Packing state per training (Round 20), in sessionStorage like lesson progress (no backend):
 * packed item names, items added on Edit ({ group: [[name, weight]] }), the bag, and the weight limit.
 * Key: "<account>|<hike>". The demo account starts with DEMO_PACKED ticked.
 */
const KEY = 'peakprep-packing'
const listeners = new Set()

let store = (() => {
  try {
    return JSON.parse(sessionStorage.getItem(KEY)) ?? {}
  } catch {
    return {}
  }
})()

const keyFor = (hike) => `${getAccount().type}|${hike}`

export function packState(hike) {
  const demoStart = getAccount().type === 'demo' && hike === 'brunswick'
  return { packed: demoStart ? DEMO_PACKED : [], added: {}, bag: '', max: 12, unit: 'kg', ...store[keyFor(hike)] }
}

export function updatePack(hike, patch) {
  store = { ...store, [keyFor(hike)]: { ...packState(hike), ...patch } }
  try {
    sessionStorage.setItem(KEY, JSON.stringify(store))
  } catch {
    // ignore
  }
  listeners.forEach((l) => l())
}

export function usePacking() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => store,
  )
}

/* Typical weights (kg) of common hiking gear. First keyword that matches wins. */
const WEIGHTS = [
  [/tent/, 2.0],
  [/sleeping bag/, 1.2],
  [/sleeping pad|mat\b/, 0.5],
  [/crampon/, 0.9],
  [/rope/, 2.5],
  [/ice axe/, 0.5],
  [/stove/, 0.4],
  [/fuel|gas/, 0.35],
  [/pot|pan|cook/, 0.3],
  [/bear spray/, 0.4],
  [/helmet/, 0.35],
  [/pole/, 0.5],
  [/boot/, 1.2],
  [/shoe/, 0.8],
  [/puffy|down jacket|insulated/, 0.4],
  [/jacket|shell|rain/, 0.4],
  [/fleece|sweater|hoodie|mid ?layer/, 0.35],
  [/pants|trousers/, 0.35],
  [/shirt|base ?layer|top/, 0.2],
  [/thermos|flask/, 0.45],
  [/bottle|bladder|reservoir/, 0.2],
  [/filter|purif/, 0.1],
  [/camera/, 0.6],
  [/binocular/, 0.5],
  [/power ?bank|battery|charger/, 0.2],
  [/phone|gps|inreach|beacon|radio/, 0.2],
  [/headlamp|flashlight|torch/, 0.1],
  [/first aid|med/, 0.2],
  [/knee|brace|bandage|tape/, 0.15],
  [/knife|multi ?tool/, 0.1],
  [/map|compass/, 0.1],
  [/sunscreen|bug|insect|spray|lotion/, 0.1],
  [/sunglass|goggle/, 0.05],
  [/glove|mitt/, 0.1],
  [/hat|toque|beanie|buff|cap/, 0.08],
  [/sock/, 0.08],
  [/whistle|lighter|matches/, 0.03],
  [/emergency blanket|bivy/, 0.1],
  [/sandwich|lunch|meal/, 0.3],
  [/dinner|breakfast/, 0.6],
  [/warm layer/, 0.35],
  [/microspike/, 0.4],
  [/snack|bar|trail mix|nuts|jerky|fruit|apple|banana|chocolate/, 0.2],
  [/towel/, 0.1],
  [/toilet|trowel|tissue/, 0.1],
  [/pack|bag/, 0.3],
]

/** Best guess at an item's weight from its name, e.g. "Water (2L)" → "2.0 kg". */
export function guessWeight(name) {
  const text = name.toLowerCase().trim()
  if (!text) return '0.0 kg'
  if (/filter|tablet|purif|electrolyte|salts/.test(text)) return '0.05 kg'
  const litres = text.match(/(\d+(?:\.\d+)?)\s*(l|litre|liter)s?\b/)
  if (/water/.test(text)) return `${(litres ? Number(litres[1]) : 1).toFixed(1)} kg`
  const match = WEIGHTS.find(([re]) => re.test(text))
  const kg = match ? match[1] : 0.3
  return `${kg < 0.1 ? kg.toFixed(2) : kg.toFixed(1)} kg`
}
