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
 */
export function Step({ label, step, of = 6, fill, back, next, nextTransition, cta = 'Continue', overlay, children }) {
  const go = useGo()
  return (
    <Screen
      className="fs"
      fixed={
        <>
          <Button className="fs-cta" onClick={() => go(next, nextTransition)}>
            {cta}
          </Button>
          {overlay}
        </>
      }
    >
      <BackButton className="fs-back" onClick={back ? () => go(back) : undefined} />
      <div className="fs-content">
        <div className="fs-progress">
          <p>
            {label} - STEP {step} OF {of}
          </p>
          <div className="fs-progress__track">
            <div className="fs-progress__fill" style={{ width: fill }} />
          </div>
        </div>
        {children}
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
export function Options({ options, selectable = true }) {
  const [selected, setSelected] = useState(null)
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
