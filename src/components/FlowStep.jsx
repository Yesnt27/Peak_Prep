import { useState } from 'react'
import useGo from '../app/useGo.js'
import Screen from './Screen.jsx'
import Button from './Button.jsx'
import { BackButton } from './controls.jsx'
import './FlowStep.css'

/**
 * Shared frame for the step-by-step flows ("Completed Hike - STEP x OF 6",
 * "New Training - STEP x OF 6"): back button, progress bar, pinned button.
 * `back` omitted = the prototype gives that back button no link.
 * `pinned={false}`: the button sits at the end of the page instead of being fixed (New training).
 * `ready={false}`: the button is greyed out and can't be pressed until an answer is picked.
 */
export function Step({
  label,
  step,
  of = 6,
  fill,
  back,
  next,
  nextTransition,
  cta = 'Continue',
  overlay,
  pinned = true,
  ready = true,
  children,
}) {
  const go = useGo()
  const button = (
    <Button
      className={pinned ? 'fs-cta' : 'fs-cta fs-cta--inline'}
      disabled={!ready}
      onClick={() => go(next, nextTransition)}
    >
      {cta}
    </Button>
  )
  return (
    <Screen
      className="fs"
      fixed={
        <>
          {pinned && button}
          {overlay}
        </>
      }
    >
      <BackButton className="fs-back" onClick={back ? () => go(back) : undefined} />
      <div className={pinned ? 'fs-content' : 'fs-content fs-content--inline'}>
        <div className="fs-progress">
          <p>
            {label} - STEP {step} OF {of}
          </p>
          <div className="fs-progress__track">
            <div className="fs-progress__fill" style={{ width: fill }} />
          </div>
        </div>
        {children}
        {!pinned && button}
      </div>
    </Screen>
  )
}

export function Field({ label, children }) {
  return (
    <div className="fs-field">
      <p className="fs-label">{label}</p>
      {children}
    </div>
  )
}

/**
 * Figma "4 options" / "option states": white rows, hover grey (300ms),
 * click selects (pale green, semibold); clicking the selected row clears it.
 * `selectable={false}` = rows that only have the hover state in the prototype.
 */
export function Options({ options, selectable = true, value, onChange }) {
  const [inner, setInner] = useState(null)
  // Uncontrolled by default; pass `value` + `onChange` to control it (e.g. Goal's custom goals).
  const selected = value !== undefined ? value : inner
  const setSelected = onChange ?? setInner
  return (
    <div className="fs-options">
      {options.map(({ label, icon }) => (
        <button
          type="button"
          key={label}
          className={selected === label ? 'fs-option fs-option--selected' : 'fs-option'}
          aria-pressed={selectable ? selected === label : undefined}
          onClick={selectable ? () => setSelected(selected === label ? null : label) : undefined}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}

/** A 24px "small icons" slot: an SVG, or a PNG used as a mask filled #414141. */
export function SmallIcon({ src, mask, maskStyle }) {
  return (
    <span className="fs-icon">
      {src && <img src={src} alt="" />}
      {mask && (
        <span
          className="fs-icon__mask"
          style={{ WebkitMaskImage: `url(${mask})`, maskImage: `url(${mask})`, ...maskStyle }}
        />
      )}
    </span>
  )
}
