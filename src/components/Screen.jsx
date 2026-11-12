/**
 * One prototype screen. `children` scroll; anything passed as `fixed` stays
 * pinned to the device frame (Figma "fixed position when scrolling" layers).
 */
export default function Screen({ className = '', fixed = null, children }) {
  return (
    <div className={`screen ${className}`}>
      <div className="screen__scroll">{children}</div>
      {fixed}
    </div>
  )
}
