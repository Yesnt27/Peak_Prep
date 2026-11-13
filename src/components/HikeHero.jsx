import { BackButton } from './controls.jsx'
import hero from '../assets/home/mount-brunswick.jpg'
import friend1 from '../assets/hike/friend-1.png'
import friend2 from '../assets/hike/friend-2.svg'
import friend3 from '../assets/hike/friend-3.svg'
import shareIcon from '../assets/hike/share.svg'
import pinIcon from '../assets/hike/pin.svg'
import './HikeHero.css'

/** Small rounded label used across the hike screens. */
export function Chip({ tone = 'white', tall = false, children }) {
  return <span className={`hd-chip hd-chip--${tone} ${tall ? 'hd-chip--tall' : ''}`}>{children}</span>
}

/** Section header: 20px icon + title, optional element on the right. */
export function SectionHead({ icon, title, sub, right, align = 'center' }) {
  return (
    <div className="hd-head" style={{ alignItems: align === 'end' ? 'flex-end' : 'center' }}>
      <div className="hd-head__left">
        <div className="hd-head__title">
          <img src={icon} alt="" />
          <h2>{title}</h2>
        </div>
        {sub && <p className="hd-head__sub">{sub}</p>}
      </div>
      {right}
    </div>
  )
}

/** Three teal stat tiles (value + unit, label). */
export function KeyStats({ stats }) {
  return (
    <div className="hd-stats">
      {stats.map(([value, unit, label]) => (
        <div className="hd-stat" key={label}>
          <p className="hd-stat__value">
            <span>{value}</span>
            <span className="hd-stat__unit">{unit}</span>
          </p>
          <p className="hd-stat__label">{label}</p>
        </div>
      ))}
    </div>
  )
}

/**
 * Brunswick Mountain hero (Hike Details + Training overview): photo, scrim,
 * back + share buttons, chips, title, location and friends line.
 */
export default function HikeHero({ chips, onBack }) {
  return (
    <header className="hd-hero">
      <img className="hd-hero__img" src={hero} alt="" />
      <div className="hd-hero__scrim" />
      <div className="hd-hero__top">
        <BackButton onClick={onBack} />
        <span className="hd-hero__share">
          <img src={shareIcon} alt="" />
        </span>
      </div>
      <div className="hd-hero__title">
        <div className="hd-hero__chips">{chips}</div>
        <h1>Brunswick Mountain Trail</h1>
        <p className="hd-hero__loc">
          <img src={pinIcon} alt="" />
          Lions Bay, British Columbia, Canada
        </p>
        <div className="hd-hero__friends">
          <span className="hd-hero__avatars">
            <img src={friend1} alt="" />
            <img src={friend2} alt="" />
            <img src={friend3} alt="" />
          </span>
          <span>Siena &amp; 3 friends training</span>
        </div>
      </div>
    </header>
  )
}
