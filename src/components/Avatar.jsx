import './Avatar.css'

/** Round profile photo; without a photo, a light-green circle with the first letter of the name. */
export default function Avatar({ src, name = '', size = 40, className = '' }) {
  const style = { width: size, height: size, fontSize: Math.round(size * 0.4) }
  return src ? (
    <img className={`avatar ${className}`} src={src} alt="" style={style} />
  ) : (
    <span className={`avatar avatar--empty ${className}`} style={style} aria-hidden="true">
      {(name.trim()[0] || '?').toUpperCase()}
    </span>
  )
}
