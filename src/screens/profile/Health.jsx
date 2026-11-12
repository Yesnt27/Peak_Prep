import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import { BackButton } from '../../components/controls.jsx'
import roundBack from '../../assets/profile/round-back.svg'
import roundEdit from '../../assets/profile/round-edit.svg'
import ringTrack from '../../assets/profile/ring-track.svg'
import ringCarbs from '../../assets/profile/ring-carbs.svg'
import ringProtein from '../../assets/profile/ring-protein.svg'
import ringFat from '../../assets/profile/ring-fat.svg'
import dashLine from '../../assets/profile/dash-line.svg'
import activityLegend from '../../assets/profile/activity-legend.svg'
import activityChart from '../../assets/profile/activity-chart.svg'
import maskBp from '../../assets/profile/mask-bp.png'
import maskWater from '../../assets/profile/mask-water.png'
import maskHeart from '../../assets/profile/mask-heart.png'
import maskSleep from '../../assets/profile/mask-sleep.png'
import doneIcon from '../../assets/profile/done.png'
import pencil from '../../assets/profile/pencil.png'
import chevron from '../../assets/profile/chevron.svg'
import './Health.css'

const RINGS = [
  ['carbs', '50%', ringCarbs, 'hi-ring--carbs'],
  ['protein', '68%', ringProtein, 'hi-ring--protein'],
  ['fat', '96%', ringFat, 'hi-ring--fat'],
]

// [label, mask, value parts [text, bold], dot position] from Figma "watah" tiles.
const TILES = [
  ['BP', maskBp, [['120/80 ', true], ['mmHg', false]], 'low'],
  ['Water', maskWater, [['3,700', true], [' ml ', false]], 'low'],
  ['Heart Rate', maskHeart, [['83', true], [' bmp', false]], 'low'],
  ['Sleep', maskSleep, [['7', true], ['h ', false], ['43', true], ['m', false]], 'high'],
]

/** Figma "Health info" 1646:13208. */
export function HealthInfo() {
  const go = useGo()
  return (
    <Screen className="hi">
      <div className="hi-content">
        <div className="hi-top">
          <button type="button" aria-label="Back" onClick={() => go('/profile', 'smart')}>
            <img src={roundBack} alt="" />
          </button>
          <button type="button" aria-label="Edit health stats" onClick={() => go('/profile/health/edit', 'smart')}>
            <img src={roundEdit} alt="" />
          </button>
        </div>
        <div className="hi-body">
          <h1 className="hi-title">Health Information</h1>
          <h2 className="hi-subtitle">Basic Information</h2>
          <div className="hi-tags">
            {['23 years', 'Male', '168lbs', '6ft3”'].map((t) => (
              <span className="hi-tag" key={t}>
                {t}
              </span>
            ))}
          </div>

          <div className="hi-card hi-cal">
            <p className="hi-cal__title">Daily Calories</p>
            <p className="hi-cal__value">
              <span>1285</span>
              <span className="hi-cal__unit">kcal</span>
            </p>
            <div className="hi-cal__bar">
              <div className="hi-cal__track" />
              <div className="hi-cal__fill" />
              <span className="hi-cal__min">0</span>
              <span className="hi-cal__max">3000</span>
            </div>
            <div className="hi-rings">
              {RINGS.map(([label, pct, arc, cls]) => (
                <div className={`hi-ring ${cls}`} key={label}>
                  <div className="hi-ring__graphic">
                    <img className="hi-ring__track" src={ringTrack} alt="" />
                    <img className="hi-ring__arc" src={arc} alt="" />
                    <span className="hi-ring__pct">{pct}</span>
                  </div>
                  <p className="hi-ring__label">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hi-card hi-steps">
            <div className="hi-steps__head">
              <p className="hi-muted-light">TOTAL</p>
              <p className="hi-steps__total">
                <span>2,648</span>
                <span className="hi-muted">steps</span>
              </p>
              <p className="hi-muted">Today</p>
            </div>
            <div className="hi-steps__chart">
              {[20, 56, 92].map((top) => (
                <img key={top} className="hi-steps__line" style={{ top: top - 1 }} src={dashLine} alt="" />
              ))}
              <div className="hi-steps__bars">
                <span style={{ height: 34 }} />
                <span style={{ height: 34 }} />
                <span className="hi-steps__bar--peak" style={{ height: 92 }} />
              </div>
              <span className="hi-steps__y" style={{ top: 81 }}>0</span>
              <span className="hi-steps__y" style={{ top: 46 }}>5000</span>
              <span className="hi-steps__y" style={{ top: 11 }}>20,000</span>
              <div className="hi-steps__x">
                <span>12AM</span>
                <span>6</span>
                <span>12</span>
                <span className="hi-steps__x-last">6</span>
              </div>
            </div>
          </div>

          <div className="hi-card hi-month">
            <div className="hi-month__head">
              <p className="hi-month__title">Monthly Activity</p>
              <p className="hi-muted">You are very active this month</p>
            </div>
            <div className="hi-month__chart">
              <img className="hi-month__legend" src={activityLegend} alt="" />
              <img className="hi-month__line" src={activityChart} alt="" />
              <div className="hi-month__x">
                <span>1</span>
                <span>15</span>
                <span>30</span>
              </div>
            </div>
          </div>

          <div className="hi-grid">
            {TILES.map(([label, mask, parts, dot]) => (
              <div className="hi-tile" key={label}>
                <div className="hi-tile__text">
                  <p className="hi-tile__label">
                    <span className="hi-tile__icon" style={{ WebkitMaskImage: `url(${mask})`, maskImage: `url(${mask})` }} />
                    {label}
                  </p>
                  <p className="hi-tile__value">
                    {parts.map(([text, bold], i) => (
                      <span key={i} className={bold ? 'hi-tile__bold' : undefined}>
                        {text}
                      </span>
                    ))}
                  </p>
                </div>
                <span className={`hi-meter hi-meter--${dot}`}>
                  <span className="hi-meter__bar" />
                  <span className="hi-meter__dot" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}

const FIELDS = [
  ['Age', '23'],
  ['Weight', '186lbs'],
  ['Height', '6ft3”t'],
  ['Calories Goal', '3000'],
]

/** Figma "Frame 1410103913" (Edit Health Stats) 1646:13446. */
export function EditHealthStats() {
  const go = useGo()
  const back = () => go('/profile/health', 'smart')
  return (
    <Screen className="eh">
      <div className="eh-content">
        <div className="eh-top">
          <BackButton onClick={back} />
          <button type="button" className="back-btn eh-done" aria-label="Done" onClick={back}>
            <img src={doneIcon} alt="" />
          </button>
        </div>
        <h1 className="eh-title">Edit Health Stats</h1>
        {/* Static fields, like the prototype (open question 4). */}
        <div className="eh-rows">
          <div className="eh-row">
            <span>Gender</span>
            <span className="eh-row__value eh-row__value--select">
              <b>Female</b>
              <img className="eh-chevron" src={chevron} alt="" />
            </span>
          </div>
          {FIELDS.map(([label, value]) => (
            <div className="eh-row" key={label}>
              <span>{label}</span>
              <span className="eh-row__value">
                <b>{value}</b>
                <img className="eh-pencil" src={pencil} alt="" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}
