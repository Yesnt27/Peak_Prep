import { useEffect, useRef } from 'react'

const HOLD_AFTER = 400 // ms held before it starts repeating, so a tap is always one step
const SLOW = 120 // ms between the first few repeats
const FAST = 70 // ms between repeats after that
const SLOW_STEPS = 5

/**
 * Button props for "tap = one step, hold = keep stepping, faster after a moment" (Round 26).
 * `step` is re-read every render, so repeats always count from the current value.
 */
export default function useHoldRepeat(step, disabled) {
  const latest = useRef()
  latest.current = { step, disabled }
  const held = useRef(false) // this press repeated, so its click must not add one more step
  const stop = useRef(() => {})
  useEffect(() => () => stop.current(), [])

  const onPointerDown = (e) => {
    stop.current()
    held.current = false
    if (e.button !== 0) return
    let timer
    let count = 0
    const end = () => {
      clearTimeout(timer)
      // On the window: the button stops getting events once it disables itself at the limit.
      for (const type of ['pointerup', 'pointercancel', 'blur']) window.removeEventListener(type, end)
    }
    const repeat = () => {
      if (latest.current.disabled) return end()
      held.current = true
      latest.current.step()
      count += 1
      timer = setTimeout(repeat, count < SLOW_STEPS ? SLOW : FAST)
    }
    timer = setTimeout(repeat, HOLD_AFTER)
    for (const type of ['pointerup', 'pointercancel', 'blur']) window.addEventListener(type, end)
    stop.current = end
  }

  return {
    disabled,
    onPointerDown,
    onPointerLeave: () => stop.current(),
    onContextMenu: (e) => e.preventDefault(), // long-press menu on phones
    // detail 0 = keyboard or screen reader: always a single step.
    onClick: (e) => {
      if (held.current && e.detail !== 0) return
      step()
    },
  }
}
