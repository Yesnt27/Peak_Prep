import { TypeField } from './controls.jsx'
import { BackButton } from './controls.jsx'
import Button from './Button.jsx'
import searchIcon from '../assets/icons/search.png'
import './BottomSheet.css'

/**
 * Figma overlay frames ("... bottom sheet"): 402 x 834, anchored to the bottom,
 * 25% black backdrop, closes on outside click. Opens with the prototype's
 * "move in" (300ms ease-out); closing is instant, as prototyped.
 */
export default function BottomSheet({ open, title, onClose, onDone = onClose, action, belowSearch, children }) {
  if (!open) return null
  return (
    <div className="sheet-layer">
      <div className="sheet-layer__backdrop" onClick={onClose} />
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="sheet__scroll">
          <div className="sheet__content">
            <div className="sheet__top">
              <BackButton onClick={onClose} label="Close" />
              {action}
            </div>
            <h2 className="sheet__title">{title}</h2>
            <div className="sheet__search-group">
              <div className="sheet__search">
                <img src={searchIcon} alt="" />
                <TypeField placeholder="Search" enterKeyHint="search" />
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
  )
}
