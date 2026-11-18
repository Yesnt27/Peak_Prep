import { useEffect, useState } from 'react'
import useGo from '../app/useGo.js'
import mountains from '../assets/splash/mountains.svg'
import mountainsEnd from '../assets/splash/mountains-end.svg'
import './Splash.css'

// The five "Open App" frames. The wordmark is a fixed mask; the artwork behind
// it moves to these offsets (relative to the wordmark), using each prototype
// connection's duration and easing. Every step fires 30ms after the previous.
const STEPS = [
  { x: -37.95, y: 85.536, ms: 0, ease: 'var(--ease-out)' },
  { x: -29.95, y: -38.464, ms: 300, ease: 'var(--ease-out)' },
  { x: -31.95, y: -90.464, ms: 300, ease: 'var(--ease-in)' },
  { x: -40.95, y: -168.464, ms: 200, ease: 'var(--ease-in)' },
  { x: -34.95, y: -199.464, ms: 200, ease: 'var(--ease-in)' },
]
const STEP_DELAY = 30

export default function Splash() {
  const go = useGo()
  const [step, setStep] = useState(0)

  // Phone browsers tint their top/bottom bars from theme-color: green during the intro, back to grey after.
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    meta?.setAttribute('content', '#629000')
    return () => meta?.setAttribute('content', '#f5f5f8')
  }, [])

  // Plays on its own: a short hold on the wordmark, then the animation starts.
  useEffect(() => {
    if (step !== 0) return undefined
    const timer = setTimeout(() => setStep(1), 600)
    return () => clearTimeout(timer)
  }, [step])

  useEffect(() => {
    if (step === 0) return undefined
    const timer = setTimeout(() => {
      if (step < STEPS.length - 1) setStep(step + 1)
      else go('/welcome', 'smart-in')
    }, STEPS[step].ms + STEP_DELAY)
    return () => clearTimeout(timer)
  }, [step, go])

  const { x, y, ms, ease } = STEPS[step]
  const last = step === STEPS.length - 1

  return (
    <div className="splash">
      <div className="splash__mark" role="img" aria-label="Peak Prep">
        <span
          className="splash__art"
          style={{ transform: `translate(${x}px, ${y}px)`, transition: `transform ${ms}ms ${ease}` }}
        >
          <span className="splash__white" />
          <img className="splash__mountains" src={mountains} alt="" />
          <img
            className="splash__mountains splash__mountains--end"
            src={mountainsEnd}
            alt=""
            style={{ opacity: last ? 1 : 0, transition: `opacity ${ms}ms ${ease}` }}
          />
        </span>
      </div>
    </div>
  )
}
