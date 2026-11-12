import { useState } from 'react'
import backChevron from '../assets/icons/back-chevron.svg'
import addItemIcon from '../assets/icons/add-item.svg'
import dropdownArrow from '../assets/icons/dropdown-arrow.png'
import checkDefault from '../assets/icons/check-default.svg'
import checkHover from '../assets/icons/check-hover.svg'
import checkSelected from '../assets/icons/check-selected.svg'
import './controls.css'

/** Round back button (Figma "Back button"). */
export function BackButton({ className = '', label = 'Back', ...rest }) {
  return (
    <button type="button" className={`back-btn ${className}`} aria-label={label} {...rest}>
      <img src={backChevron} alt="" />
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

/** Figma "add item": white row with a green plus, turns pale yellow on hover. */
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
              <span className="field-card__placeholder">input</span>
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
