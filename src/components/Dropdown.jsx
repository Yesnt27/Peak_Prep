import { useEffect, useRef, useState } from 'react'
import './Dropdown.css'

/**
 * The app's one dropdown (first built for Home "Sort: …"): a trigger button
 * that opens a small white menu; the picked option is light green.
 * `children(open)` renders the trigger's contents.
 */
export default function Dropdown({ options, value, onChange, label, className = '', triggerClassName = '', children }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false)
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  return (
    <div className={`dd ${className}`} ref={ref}>
      <button
        type="button"
        className={triggerClassName}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {children(open)}
      </button>
      {open && (
        <ul className="dd-menu" role="listbox">
          {options.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                role="option"
                aria-selected={o.id === value}
                className={o.id === value ? 'dd-option dd-option--selected' : 'dd-option'}
                onClick={() => {
                  onChange(o.id)
                  setOpen(false)
                }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
