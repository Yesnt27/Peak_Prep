import { createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'

// The current screen's root element, so overlays (bottom sheets) can render pinned to it
// from anywhere inside the scrolling content (Round 20).
const ScreenRoot = createContext(null)

/** Renders children into the screen root (pinned, not scrolling); inline if there is no screen. */
export function ScreenPortal({ children }) {
  const root = useContext(ScreenRoot)
  return root ? createPortal(children, root) : children
}

/**
 * One prototype screen. `children` scroll; anything passed as `fixed` stays
 * pinned to the device frame (Figma "fixed position when scrolling" layers).
 */
export default function Screen({ className = '', fixed = null, children }) {
  const [root, setRoot] = useState(null)
  return (
    <div className={`screen ${className}`} ref={setRoot}>
      <ScreenRoot.Provider value={root}>
        <div className="screen__scroll">{children}</div>
        {fixed}
      </ScreenRoot.Provider>
    </div>
  )
}
