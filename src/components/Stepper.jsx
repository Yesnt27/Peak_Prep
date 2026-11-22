import useHoldRepeat from './useHoldRepeat.js'
import './Stepper.css'

/**
 * The app's one "−" / "+": "−" = light-grey circle, light red on hover / press (Round 24);
 * "+" = light-green circle, PeakPrep green on hover / press (Round 28). Every "+"
 * in the app except the nav bar's Create tab (Round 29) is this icon: put `plus-btn` on whatever is tapped and a SignIcon inside it.
 */
export function SignButton({ sign, label, className = '', ...rest }) {
  return (
    <button type="button" className={`sign-btn sign-btn--${sign} ${sign === 'plus' ? 'plus-btn' : ''} ${className}`} aria-label={label} {...rest}>
      <SignIcon sign={sign} />
    </button>
  )
}

/** Just the icon (inside a bigger button, e.g. "Unfriend"). */
export function SignIcon({ sign, large = false }) {
  // `large`: 25px, for the profile photo badge.
  return (
    <span className={`sign-icon sign-icon--${sign}${large ? ' sign-icon--large' : ''}`} aria-hidden="true">
      <span />
    </span>
  )
}

/**
 * "− n +" in a white box (workout sessions, max packing weight, years hiking).
 * `value` null/'' shows `placeholder` in grey until the first tap.
 * Tap = one step; press and hold = keep going, faster after a moment (Round 26).
 */
export default function Stepper({ value, min = 0, max = 99, onChange, label, placeholder = 0, className = '' }) {
  const empty = value === null || value === undefined || value === ''
  const n = empty ? Number(placeholder) : Number(value)
  const down = useHoldRepeat(() => onChange(empty ? n : n - 1), !empty && n <= min)
  const up = useHoldRepeat(() => onChange(n + 1), n >= max)
  return (
    <div className={`stepper ${className}`}>
      {/* While blank, "−" answers with the shown number (e.g. 0 years hiking). */}
      <SignButton sign="minus" label={`Decrease ${label}`} {...down} />
      <span className={empty ? 'stepper__value stepper__value--empty' : 'stepper__value'} aria-live="polite" aria-label={label}>
        {n}
      </span>
      <SignButton sign="plus" label={`Increase ${label}`} {...up} />
    </div>
  )
}
