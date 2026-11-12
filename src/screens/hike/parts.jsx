import { BackButton } from '../../components/controls.jsx'
import hero from '../../assets/hike/hero.png'
import shareIcon from '../../assets/hike/share.svg'
import pinIcon from '../../assets/hike/pin.svg'
import friend1 from '../../assets/hike/friend-1.png'
import friend2 from '../../assets/hike/friend-2.svg'
import friend3 from '../../assets/hike/friend-3.svg'
import './parts.css'

/**
 * Pieces shared by "Hike Details (hifi)" and "Training overview (hi-fi)":
 * both open with the same Brunswick hero, then a row of teal key stats.
 */

export function Chip({ tone = 'white', children }) {
  return <span className={`hk-chip hk-chip--${tone}`}>{children}</span>
}

export function SectionHeader({ icon, title, sub, children }) {
  return (
    <div className="hk-section__header">
      <div className="hk-section__heading">
        <div className="hk-section__title">
          <img src={icon} alt="" />
          <h2>{title}</h2>
        </div>
        {sub && <p className="hk-section__sub">{sub}</p>}
      </div>
      {children}
    </div>
  )
}

/** `onBack` is omitted where the prototype gives the back button no link. */
export function HikeHero({ chips, onBack }) {
  return (
    <header className="hk-hero">
      <img className="hk-hero__img" src={hero} alt="" />
      <div className="hk-hero__scrim" />
      <div className="hk-hero__top">
        <BackButton onClick={onBack} />
        <span className="hk-hero__share">
          <img src={shareIcon} alt="" />
        </span>
      </div>
      <div className="hk-hero__title">
        <div className="hk-hero__chips">{chips}</div>
        <h1 className="hk-hero__name">Brunswick Mountain Trail</h1>
        <p className="hk-hero__loc">
          <img src={pinIcon} alt="" />
          Lions Bay, British Columbia, Canada
        </p>
        <div className="hk-hero__friends">
          <div className="hk-hero__avatars">
            <img src={friend1} alt="" />
            <img src={friend2} alt="" />
            <img src={friend3} alt="" />
          </div>
          <p>Siena &amp; 3 friends training</p>
        </div>
      </div>
    </header>
  )
}

/** `stats` is a list of [value, unit, label]. */
export function KeyStats({ stats }) {
  return (
    <div className="hk-stats">
      {stats.map(([value, unit, label]) => (
        <div className="hk-stat" key={label}>
          <p className="hk-stat__value">
            <span>{value}</span>
            <span className="hk-stat__unit">{unit}</span>
          </p>
          <p className="hk-stat__label">{label}</p>
        </div>
      ))}
    </div>
  )
}
