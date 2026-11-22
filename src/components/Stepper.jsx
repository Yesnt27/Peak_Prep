import stepperPlus from '../assets/icons/stepper-plus.svg'
import './Stepper.css'

/**
 * The app's one "−" / "+" (Round 22): "−" = light-grey circle that turns light red on hover /
 * press (Round 24); "+" = Figma's green circle with a light-grey ring on hover / press. Faded when disabled. Used by every stepper, the Packing "remove" button and
 * the friend profile's Add friend / Unfriend button.
 */
export function SignButton({ sign, label, className = '', ...rest }) {
  return (
    <button type="button" className={`sign-btn sign-btn--${sign} ${className}`} aria-label={label} {...rest}>
      <SignIcon sign={sign} />
    </button>
  )
}

/** Just the icon (inside a bigger button, e.g. "Unfriend"). */
export function SignIcon({ sign }) {
  // Round 24: "−" is a light-grey circle with a dark bar (light red on hover); "+" stays the green Figma circle.
  if (sign === 'minus')
    return (
      <span className="sign-icon sign-icon--minus" aria-hidden="true">
        <span />
      </span>
    )
  return <img className="sign-icon" src={stepperPlus} alt="" />
}

/**
 * "− n +" in a white box (workout sessions, max packing weight, years hiking).
 * `value` null/'' shows `placeholder` in grey until the first tap.
 */
export default function Stepper({ value, min = 0, max = 99, onChange, label, placeholder = 0, className = '' }) {
  const empty = value === null || value === undefined || value === ''
  const n = empty ? Number(placeholder) : Number(value)
  return (
    <div className={`stepper ${className}`}>
      {/* While blank, "−" answers with the shown number (e.g. 0 years hiking). */}
      <SignButton sign="minus" label={`Decrease ${label}`} disabled={!empty && n <= min} onClick={() => onChange(empty ? n : n - 1)} />
      <span className={empty ? 'stepper__value stepper__value--empty' : 'stepper__value'} aria-live="polite" aria-label={label}>
        {n}
      </span>
      <SignButton sign="plus" label={`Increase ${label}`} disabled={n >= max} onClick={() => onChange(n + 1)} />
    </div>
  )
}
