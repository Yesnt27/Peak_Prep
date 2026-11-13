import { useState } from 'react'
import checkDefault from '../assets/icons/check-default.svg'
import checkSelected from '../assets/icons/list-item-checked.svg'
import checkGreen from '../assets/icons/check-green.svg'
import './ListItem.css'

/**
 * Figma "packing-list-item": a checkable row with a small value on the right.
 * Default → hover (circle fills green) → click (checkmark) → click (back to default).
 */
export default function ListItem({ label, meta, defaultChecked = false, tone = 'yellow' }) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <button
      type="button"
      className={checked ? 'list-item list-item--checked' : 'list-item'}
      aria-pressed={checked}
      onClick={() => setChecked(!checked)}
    >
      <span className="list-item__main">
        <span className="list-item__box">
          <img className="list-item__img list-item__img--default" src={checkDefault} alt="" />
          <span className="list-item__hover" />
          <img className="list-item__img list-item__img--checked" src={tone === 'green' ? checkGreen : checkSelected} alt="" />
        </span>
        <span className="list-item__label">{label}</span>
      </span>
      <span className="list-item__meta">{meta}</span>
    </button>
  )
}
