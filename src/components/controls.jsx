import { useState } from 'react'
import backChevron from '../assets/icons/back-chevron.svg'
import dropdownArrow from '../assets/icons/dropdown-arrow.png'
import checkDefault from '../assets/icons/check-default.svg'
import checkHover from '../assets/icons/check-hover.svg'
import checkGreen from '../assets/icons/check-green.svg'
import Dropdown from './Dropdown.jsx'
import { SignIcon } from './Stepper.jsx'
import './controls.css'

/** Round back button (Figma "Back button"). Hover / press: light grey (the dark-grey hover was removed). */
export function BackButton({ className = '', label = 'Back', ...rest }) {
  return (
    <button type="button" className={`back-btn ${className}`} aria-label={label} {...rest}>
      <img className="back-btn__chev" src={backChevron} alt="" />
    </button>
  )
}

const ICONS = {
  pencil: (
    <path d="M14.2 4.3l1.5-1.5a1.6 1.6 0 0 1 2.3 0l1.2 1.2a1.6 1.6 0 0 1 0 2.3l-1.5 1.5M14.2 4.3L4.6 13.9 3.5 18.5l4.6-1.1 9.6-9.6M14.2 4.3l3.5 3.5" />
  ),
  check: <path d="M4.5 11.5l4.5 4.5L17.5 6.5" />,
}

/**
 * Round icon button in the back button's style (same size, border, shadow, dark hover),
 * drawn as a vector so it stays sharp: `icon` = "pencil" (edit) or "check" (done).
 */
export function IconButton({ icon, label, className = '', ...rest }) {
  return (
    <button type="button" className={`back-btn icon-btn ${className}`} aria-label={label} {...rest}>
      <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {ICONS[icon]}
      </svg>
    </button>
  )
}

/** Figma "tag w/o icon states" and "tag w icon states": default / hover / selected. */
export function Tag({ icon, selected = false, compact = false, className = '', children, ...rest }) {
  const cls = ['tag', selected && 'tag--selected', icon && 'tag--icon', compact && 'tag--compact', className]
    .filter(Boolean)
    .join(' ')
  return (
    <button type="button" className={cls} aria-pressed={selected} {...rest}>
      {icon && <img className="tag__icon" src={icon} alt="" />}
      <span>{children}</span>
    </button>
  )
}

/** Figma "meow": a wrapping row of tags where one can be selected at a time. */
export function TagGroup({ options, compact = false, className = '', value, onChange }) {
  const [inner, setInner] = useState(null)
  // Uncontrolled by default; pass `value` + `onChange` to control it.
  const selected = value !== undefined ? value : inner
  const setSelected = onChange ?? setInner
  return (
    <div className={`tag-group ${className}`}>
      {options.map((option) => (
        <Tag
          key={option}
          compact={compact}
          selected={selected === option}
          onClick={() => setSelected(selected === option ? null : option)}
        >
          {option}
        </Tag>
      ))}
    </div>
  )
}

/** A tag that toggles on its own (used for multi-select tag lists). */
export function ToggleTag({ icon, children, selected: value, onChange }) {
  const [inner, setInner] = useState(false)
  const selected = value !== undefined ? value : inner
  const setSelected = onChange ?? setInner
  return (
    <Tag icon={icon} selected={selected} onClick={() => setSelected(!selected)}>
      {children}
    </Tag>
  )
}

/** Figma "add item": white row with the app's "+"; only the "+" changes on hover / press (Round 28). */
export function AddItem({ children, className = '', ...rest }) {
  return (
    <button type="button" className={`add-item plus-btn ${className}`} {...rest}>
      <SignIcon sign="plus" />
      <span>{children}</span>
    </button>
  )
}

/** Figma "toggle switch". */
export function ToggleSwitch({ label, defaultOn = false, on: value, onChange }) {
  const [inner, setInner] = useState(defaultOn)
  // Uncontrolled by default; pass `on` + `onChange` to control it.
  const on = value !== undefined ? value : inner
  const setOn = onChange ?? setInner
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={on ? 'toggle toggle--on' : 'toggle'}
      onClick={() => setOn(!on)}
    >
      <span className="toggle__knob" />
    </button>
  )
}

/** Figma "content + checkmark": default / hover / selected row. */
export function CheckRow({ children, selected: value, onChange }) {
  const [inner, setInner] = useState(false)
  const selected = value !== undefined ? value : inner
  const setSelected = onChange ?? setInner
  return (
    <button
      type="button"
      className={selected ? 'check-row check-row--selected' : 'check-row'}
      aria-pressed={selected}
      onClick={() => setSelected(!selected)}
    >
      <span className="check-row__box">
        <img className="check-row__img check-row__img--default" src={checkDefault} alt="" />
        <img className="check-row__img check-row__img--hover" src={checkHover} alt="" />
        <img className="check-row__img check-row__img--selected" src={checkGreen} alt="" />
      </span>
      <span className="check-row__label">{children}</span>
    </button>
  )
}

/** Figma "workout card states": default / hover / selected card. */
export function WorkoutCard({ icon, children, selected: value, onChange }) {
  const [inner, setInner] = useState(false)
  const selected = value !== undefined ? value : inner
  const setSelected = onChange ?? setInner
  return (
    <button
      type="button"
      className={selected ? 'workout-card workout-card--selected' : 'workout-card'}
      aria-pressed={selected}
      onClick={() => setSelected(!selected)}
    >
      <img className="workout-card__icon" src={icon} alt="" />
      <span>{children}</span>
    </button>
  )
}

/**
 * Figma "hiker profile" / "toughest hike" cards: labelled rows separated by
 * hairlines. Rows with `options` open a tag list below them (one row open at
 * a time); rows with `icon` just show that icon next to the placeholder.
 */
/** `values` / `onChange(label, value)` are optional: they let a form keep what was typed or picked. */
export function FieldCard({ rows, className = '', values, onChange }) {
  // Picked options show in the row (empty until picked); the caller can also keep them.
  const [own, setOwn] = useState({})
  const vals = values ?? own
  const change = (label, value) => {
    if (!values) setOwn({ ...own, [label]: value })
    onChange?.(label, value)
  }
  return (
    <div className={`field-card ${className}`}>
      {rows.map((row) => (
        <div className="field-card__item" key={row.label}>
          <div className="field-card__row">
            <span className="field-card__label">{row.label}</span>
            {row.options ? (
              // Round 18: option rows use the app's one dropdown (Home "Sort" menu).
              <Dropdown
                options={row.options.map((o) => ({ id: o, label: o }))}
                value={vals[row.label] ?? null}
                onChange={(v) => change(row.label, v)}
                label={row.label}
                triggerClassName="field-card__value field-card__value--dropdown"
              >
                {(open) => (
                  <>
                    {vals[row.label] ? (
                      <span className="field-card__picked">{vals[row.label]}</span>
                    ) : (
                      <span className="field-card__placeholder">Choose</span>
                    )}
                    <img className={open ? 'field-card__arrow dd-arrow dd-arrow--open' : 'field-card__arrow dd-arrow'} src={dropdownArrow} alt="" />
                  </>
                )}
              </Dropdown>
            ) : (
              <span className="field-card__value">
                {row.render ? (
                  row.render()
                ) : (
                  <TypeField
                    tone="light"
                    className="field-card__input"
                    aria-label={row.label}
                    inputMode={row.inputMode}
                    placeholder={row.placeholder}
                    defaultValue={vals[row.label]}
                    onChange={(e) => change(row.label, e.target.value)}
                  />
                )}
                {/* Unit dropdown (Round 21), e.g. lbs / kg. No pencils (Round 25). */}
                {row.unitControl}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Figma "4 options" / "option states": stacked full-width cards, one can be
 * selected (green, semibold); tapping it again clears it. Hover is light grey.
 */
export function OptionGroup({ options, multi = false }) {
  // `multi`: each card toggles on its own (standalone "option states" instances).
  const [picked, setPicked] = useState([])
  const selected = multi ? null : picked[0] ?? null
  const isOn = (label) => picked.includes(label)
  const setSelected = (label) => setPicked(label === null ? [] : [label])
  const toggle = (label) => setPicked(isOn(label) ? picked.filter((l) => l !== label) : [...picked, label])
  return (
    <div className="options">
      {options.map((option) => {
        const { label, icon } = typeof option === 'string' ? { label: option } : option
        return (
          <button
            type="button"
            key={label}
            className={isOn(label) ? 'option option--selected' : 'option'}
            aria-pressed={isOn(label)}
            onClick={() => (multi ? toggle(label) : setSelected(selected === label ? null : label))}
          >
            {icon}
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}

/** A 24px icon drawn from a Figma image mask, filled with the body grey. */
export function MaskIcon({ src, size = 24, color }) {
  return (
    <span
      className="mask-icon"
      style={{
        width: size,
        height: size,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        ...(color ? { background: color } : {}),
      }}
    />
  )
}

/**
 * A real text box so the phone keyboard opens. Looks like the static Figma
 * text it replaces: Figma's text becomes the placeholder, or the starting
 * value when Figma shows the field already filled in.
 */
export function TypeField({ placeholder, defaultValue, multiline = false, tone, className = '', ...rest }) {
  const Tag = multiline ? 'textarea' : 'input'
  const cls = ['type-field', tone && `type-field--${tone}`, className].filter(Boolean).join(' ')
  return <Tag className={cls} placeholder={placeholder} defaultValue={defaultValue} {...rest} />
}
