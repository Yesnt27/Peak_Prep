import { useRef, useState } from 'react'
import { TypeField } from './controls.jsx'
import Button from './Button.jsx'
import searchIcon from '../assets/icons/search.png'
import { ScreenPortal } from './Screen.jsx'
import './BottomSheet.css'

/**
 * Figma overlay frames ("... bottom sheet"): 402 x 834, anchored to the bottom,
 * 25% black backdrop, closes on outside click. Opens with the prototype's
 * "move in" (300ms ease-out).
 * Round 30: no back arrow. Pull the sheet down by its handle, top bar or title to close it
 * (past 120px or a quick flick); a shorter pull springs back.
 */
export default function BottomSheet({ open, title, onClose, onDone = onClose, action, belowSearch, onSearch, searchPlaceholder = 'Search', children }) {
  const [drag, setDrag] = useState(0) // px pulled down
  const [leaving, setLeaving] = useState(false)
  const start = useRef(null)
  if (!open) return null

  const close = () => {
    setLeaving(true)
    setTimeout(() => {
      setLeaving(false)
      setDrag(0)
      onClose()
    }, 220)
  }
  const pull = {
    onPointerDown: (e) => {
      if (e.button > 0 || e.target.closest('button, input, textarea, a')) return
      start.current = { y: e.clientY, samples: [[e.clientY, e.timeStamp]] }
      e.currentTarget.setPointerCapture(e.pointerId)
    },
    onPointerMove: (e) => {
      if (!start.current) return
      start.current.samples = [...start.current.samples, [e.clientY, e.timeStamp]].filter(([, t]) => e.timeStamp - t < 100)
      setDrag(Math.max(0, e.clientY - start.current.y))
    },
    onPointerUp: (e) => {
      if (!start.current) return
      const dy = e.clientY - start.current.y
      // Flick: speed over the last 100ms of the pull.
      const [y0, t0] = start.current.samples[0]
      const fast = dy > 40 && (e.clientY - y0) / Math.max(1, e.timeStamp - t0) > 0.5
      start.current = null
      if (dy > 120 || fast) close()
      else setDrag(0)
    },
    onPointerCancel: () => {
      start.current = null
      setDrag(0)
    },
  }
  const style = leaving ? { transform: 'translateY(100%)', transition: 'transform 220ms var(--ease-out)' } : drag ? { transform: `translateY(${drag}px)` } : { transition: 'transform 200ms var(--ease-out)' }

  return (
    <ScreenPortal>
    <div className="sheet-layer">
      <div className="sheet-layer__backdrop" style={leaving ? { opacity: 0, transition: 'opacity 220ms' } : undefined} onClick={close} />
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title} style={style}>
        <div className="sheet__grab" {...pull}>
          <span className="sheet__handle" />
        </div>
        <div className="sheet__scroll">
          <div className="sheet__content">
            <div className="sheet__drag" {...pull}>
              <h2 className="sheet__title">{title}</h2>
              {action}
            </div>
            <div className="sheet__search-group">
              <div className="sheet__search">
                <img src={searchIcon} alt="" />
                <TypeField
                  placeholder={searchPlaceholder}
                  enterKeyHint="search"
                  onChange={onSearch ? (e) => onSearch(e.target.value) : undefined}
                />
              </div>
              {belowSearch}
            </div>
            {children}
          </div>
        </div>
        <Button className="sheet__done" onClick={onDone}>
          Done
        </Button>
      </div>
    </div>
    </ScreenPortal>
  )
}
