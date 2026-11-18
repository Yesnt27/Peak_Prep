import { useEffect, useState } from 'react'
import { shareSite } from '../app/share.js'
import shareIcon from '../assets/hike/share.svg'
import './ShareButton.css'

/** Opens the native share sheet with the prototype link; on desktop copies it and says "Link copied". */
export default function ShareButton({ label = 'Share' }) {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return undefined
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])
  return (
    <span className="share-wrap">
      <button
        type="button"
        className="share-btn"
        aria-label={label}
        onClick={async () => setCopied((await shareSite()) === 'copied')}
      >
        <img src={shareIcon} alt="" />
      </button>
      <span className={copied ? 'share-toast share-toast--show' : 'share-toast'} role="status">
        {copied ? 'Link copied' : ''}
      </span>
    </span>
  )
}
