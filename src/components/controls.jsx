import { useState } from 'react'
import backChevron from '../assets/icons/back-chevron.svg'
import backChevronLight from '../assets/first-aid/back-chevron-light.svg'
import addItemIcon from '../assets/icons/add-item.svg'
import dropdownArrow from '../assets/icons/dropdown-arrow.png'
import checkDefault from '../assets/icons/check-default.svg'
import checkHover from '../assets/icons/check-hover.svg'
import checkSelected from '../assets/icons/check-selected.svg'
import './controls.css'

/**
 * Round back button (Figma "Back button"). `darkHover` is the first-aid
 * variant (1646:12147): on hover it turns dark grey with a light chevron.
 */
export function BackButton({ className = '', label = 'Back', darkHover = false, ...rest }) {
  return (
    <button
      type="button"
      className={`back-btn ${darkHover ? 'back-btn--dark-hover' : ''} ${className}`}
      aria-label={label}
      {...rest}
    >
      <img className="back-btn__chev" src={backChevron} alt="" />
      {darkHover && <img className="back-btn__chev back-btn__chev--light" src={backChevronLight} alt="" />}
    </button>
  )
}

/** Figma "tag w/o icon states" and "tag w icon states": default / hover / selected. */
export function Tag({ icon, selected = false, compact = false, children, ...rest }) {
  const cls = ['tag', selected && 'tag--selected', icon && 'tag--icon', compact && 'tag--compact']
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
export function TagGroup({ options, compact = false, className = '' }) {
  const [selected, setSelected] = useState(null)
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
export function ToggleTag({ icon, children }) {
  const [selected, setSelected] = useState(false)
  return (
    <Tag icon={icon} selected={selected} onClick={() => setSelected(!selected)}>
      {children}
    </Tag>
  )
}

/** Figma "add item": white row with a green plus, turns pale green (#d4e6b8) on hover. */
export function AddItem({ children, className = '', ...rest }) {
  return (
    <button type="button" className={`add-item ${className}`} {...rest}>
      <img className="add-item__icon" src={addItemIcon} alt="" />
      <span>{children}</span>
    </button>
  )
}

/** Figma "toggle switch". */
export function ToggleSwitch({ label }) {
  const [on, setOn] = useState(false)
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
export function CheckRow({ children }) {
  const [selected, setSelected] = useState(false)
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
        <img className="check-row__img check-row__img--selected" src={checkSelected} alt="" />
      </span>
      <span className="check-row__label">{children}</span>
    </button>
  )
}

/** Figma "workout card states": default / hover / selected card. */
export function WorkoutCard({ icon, children }) {
  const [selected, setSelected] = useState(false)
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
export function FieldCard({ rows, className = '' }) {
  const [open, setOpen] = useState(null)
  return (
    <div className={`field-card ${className}`}>
      {rows.map((row) => {
        const expandable = Boolean(row.options)
        const isOpen = open === row.label
        const head = (
          <>
            <span className="field-card__label">{row.label}</span>
            <span className={expandable ? 'field-card__value field-card__value--dropdown' : 'field-card__value'}>
              {expandable ? (
                <span className="field-card__placeholder">input</span>
              ) : (
                <TypeField tone="light" className="field-card__input" placeholder="input" aria-label={row.label} />
              )}
              {expandable ? (
                <img
                  className={isOpen ? 'field-card__arrow field-card__arrow--open' : 'field-card__arrow'}
                  src={dropdownArrow}
                  alt=""
                />
              ) : (
                <img className="field-card__edit" src={row.icon} alt="" />
              )}
            </span>
          </>
        )
        return (
          <div className="field-card__item" key={row.label}>
            {expandable ? (
              <button
                type="button"
                className="field-card__row"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : row.label)}
              >
                {head}
              </button>
            ) : (
              <div className="field-card__row">{head}</div>
            )}
            {expandable && (
              <div className={isOpen ? 'field-card__panel field-card__panel--open' : 'field-card__panel'}>
                <div className="field-card__panel-inner">
                  <TagGroup options={row.options} compact={row.compact} className="field-card__tags" />
                </div>
              </div>
            )}
          </div>
        )
      })}
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
