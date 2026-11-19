import { useState } from 'react'
import { Chip, SectionHeader } from './parts.jsx'
import chevDown from '../../assets/icons/chev-down.svg'
import gauge20 from '../../assets/hike/gauge-20.svg'
import gauge18 from '../../assets/hike/gauge-18.svg'
import clockIcon from '../../assets/hike/clock.svg'
import sunriseIcon from '../../assets/hike/sunrise.svg'
import shield16 from '../../assets/hike/shield-16.svg'
import pawIcon from '../../assets/hike/paw.svg'
import ticketIcon from '../../assets/hike/ticket.svg'
import carIcon from '../../assets/hike/car.svg'
import extIcon from '../../assets/hike/ext.svg'
import phoneIcon from '../../assets/hike/phone.svg'
import alertIcon from '../../assets/hike/alert.svg'
import sunIcon from '../../assets/hike/sun.svg'
import nosigIcon from '../../assets/hike/nosig.svg'
import dropIcon from '../../assets/hike/drop.svg'
import mtn18 from '../../assets/hike/mtn-18.svg'
import snowIcon from '../../assets/conditions/snow.png'

const CHALLENGE_ICONS = { sun: sunIcon, scramble: mtn18, signal: nosigIcon, water: dropIcon, alert: alertIcon, snow: snowIcon }

// The demo account's logged bests (Figma "Readiness gap"): 6.8 km and 726 m.
const LOGGED = { km: 6.8, m: 726 }
const num = (s) => parseFloat(String(s).replace(/,/g, ''))

/** A section whose content opens and closes from its header (chevron flips). Starts closed. */
export function Collapsible({ icon, title, sub, children }) {
  const [open, setOpen] = useState(false)
  return (
    <section className={open ? 'hd-section hd-collapse hd-collapse--open' : 'hd-section hd-collapse'}>
      <button type="button" className="hd-collapse__head" aria-expanded={open} onClick={() => setOpen(!open)}>
        <SectionHeader icon={icon} title={title} sub={open ? sub : undefined} />
        <img className="hd-collapse__chev" src={chevDown} alt="" />
      </button>
      <div className="hd-collapse__body">
        <div className="hd-collapse__inner">{children}</div>
      </div>
    </section>
  )
}

function Bar({ label, value, pct }) {
  return (
    <div className="hd-bar">
      <div className="hd-bar__head">
        <p className="hd-bar__label">{label}</p>
        <p className="hd-bar__value">{value}</p>
      </div>
      <div className="hd-bar__track">
        <div className="hd-bar__fill" style={{ width: `${Math.min(100, pct)}%` }} />
      </div>
    </div>
  )
}

/** Readiness gap (your logged bests vs this hike) + pace / start-by tiles. */
export function FitForYou({ hike, details, isNew }) {
  const km = num(hike.stats[0][0])
  const m = num(hike.stats[1][0])
  const logged = isNew ? { km: 0, m: 0 } : LOGGED
  const ratio = logged.km ? km / logged.km : null
  const chip = ratio == null ? 'No hikes logged' : ratio >= 1.5 ? 'Stretch goal' : ratio > 1 ? 'Step up' : 'Good fit'
  let gap
  if (ratio == null) gap = 'Log a hike to see how this one compares with what you’ve done.'
  else if (ratio > 1)
    gap = `About ${ratio.toFixed(1)}× longer than your longest logged hike${m > logged.m ? `, with +${Math.round(m - logged.m).toLocaleString('en-US')} m more elevation than your biggest climb day` : ''}.`
  else gap = 'Within the distance and climbing you’ve already logged. A good fit for your current fitness.'
  return (
    <section className="hd-section">
      <SectionHeader icon={gauge20} title="Fit for you">
        <Chip tone="yellow-1">{chip}</Chip>
      </SectionHeader>
      <div className="hd-gap">
        <div className="hd-gap__row">
          <span className="hd-icon hd-icon--36 hd-icon--white">
            <img src={gauge18} alt="" />
          </span>
          <div className="hd-gap__text">
            <p className="hd-gap__title">Readiness gap</p>
            <p className="hd-gap__body">{gap}</p>
          </div>
        </div>
        <Bar label="DISTANCE" value={`${logged.km} km logged / ${hike.stats[0][0]} km`} pct={(logged.km / km) * 100} />
        <Bar label="ELEVATION" value={`${logged.m} m logged / ${hike.stats[1][0]} m`} pct={(logged.m / m) * 100} />
      </div>
      <div className="hd-pair">
        <div className="hd-tile hd-tile--yellow">
          <span className="hd-icon hd-icon--32 hd-icon--yellow-1">
            <img src={clockIcon} alt="" />
          </span>
          <p className="hd-tile__label">Your pace</p>
          <p className="hd-tile__value">{details.pace.value}</p>
          <p className="hd-tile__sub">{details.pace.sub}</p>
        </div>
        <div className="hd-tile hd-tile--yellow">
          <span className="hd-icon hd-icon--32 hd-icon--yellow-1">
            <img src={sunriseIcon} alt="" />
          </span>
          <p className="hd-tile__label">{details.startBy.value.includes(':') ? 'Start by' : 'Best time'}</p>
          <p className="hd-tile__value">{details.startBy.value}</p>
          <p className="hd-tile__sub">{details.startBy.sub}</p>
        </div>
      </div>
    </section>
  )
}

function LinkRow({ icon, title, sub, href }) {
  const Tag = href ? 'a' : 'div'
  return (
    <Tag className="hd-link" {...(href ? { href, target: '_blank', rel: 'noreferrer' } : {})}>
      <span className="hd-icon hd-icon--32 hd-icon--light-green">
        <img src={icon} alt="" />
      </span>
      <div className="hd-link__text">
        <p className="hd-link__title">{title}</p>
        <p className="hd-link__sub">{sub}</p>
      </div>
      {href && <img className="hd-link__ext" src={extIcon} alt="" />}
    </Tag>
  )
}

export function Hazards({ details }) {
  const { wildlife, pass, access, report, emergency } = details
  return (
    <>
      <div className="hd-flag hd-flag--wildlife">
        <span className="hd-icon hd-icon--36 hd-icon--yellow-2">
          <img src={pawIcon} alt="" />
        </span>
        <div className="hd-flag__text">
          <div className="hd-flag__head">
            <p className="hd-flag__title">{wildlife.title}</p>
            <Chip>{wildlife.chip}</Chip>
          </div>
          <p className="hd-flag__body">{wildlife.body}</p>
        </div>
      </div>
      <div className="hd-pair">
        <div className="hd-tile">
          <span className="hd-icon hd-icon--32 hd-icon--teal">
            <img src={ticketIcon} alt="" />
          </span>
          <p className="hd-tile__title">{pass.title}</p>
          <p className="hd-tile__body">{pass.body}</p>
        </div>
        <div className="hd-tile">
          <span className="hd-icon hd-icon--32 hd-icon--teal">
            <img src={carIcon} alt="" />
          </span>
          <p className="hd-tile__title">{access.title}</p>
          <p className="hd-tile__body">{access.body}</p>
        </div>
      </div>
      <LinkRow icon={shield16} title={report.title} sub={report.sub} href={report.url} />
      <LinkRow icon={phoneIcon} title="Emergency services" sub={emergency} />
    </>
  )
}

export function Challenges({ items }) {
  return items.map((c) => (
    <div className="hd-flag" key={c.title}>
      <span className="hd-icon hd-icon--36 hd-icon--yellow-3">
        <img src={CHALLENGE_ICONS[c.icon]} alt="" />
      </span>
      <div className="hd-flag__text">
        <div className="hd-flag__head">
          <p className="hd-flag__title">{c.title}</p>
          <Chip tone="yellow-3">{c.chip}</Chip>
        </div>
        <p className="hd-flag__body">{c.body}</p>
      </div>
    </div>
  ))
}
