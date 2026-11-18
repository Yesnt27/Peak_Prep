import { useState } from 'react'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Dropdown from '../../components/Dropdown.jsx'
import { BackButton } from '../../components/controls.jsx'
import dashLine from '../../assets/profile/dash-line.svg'
import activityLegend from '../../assets/profile/activity-legend.svg'
import activityChart from '../../assets/profile/activity-chart.svg'
import maskHeart from '../../assets/profile/mask-heart.png'
import maskSleep from '../../assets/profile/mask-sleep.png'
import pencil from '../../assets/profile/pencil.png'
import chevron from '../../assets/profile/chevron.svg'
import './Health.css'

// [label, mask, value parts [text, bold], dot position] from Figma "watah" tiles.
const TILES = [
  ['Heart Rate', maskHeart, [['83', true], [' bmp', false]], 'low'],
  ['Sleep', maskSleep, [['7', true], ['h ', false], ['43', true], ['m', false]], 'high'],
]

const GENDERS = ['Female', 'Male', 'Non-binary', 'Prefer not to say'].map((g) => ({ id: g, label: g }))

// Values from the "Health info.png" reference (Figma Edit Health Stats).
const FIELDS = [
  ['Age', '23', 'numeric'],
  ['Weight', '186lbs', 'text'],
  ['Height', '6ft3”', 'text'],
]

/** A row whose value turns into a text field when tapped (pencil cue), saved on Enter or tapping away. */
function EditRow({ label, initial, inputMode }) {
  const [value, setValue] = useState(initial)
  const [editing, setEditing] = useState(false)
  const done = (v) => {
    setValue(v.trim() || value)
    setEditing(false)
  }
  return (
    <div className={editing ? 'hi-row hi-row--editing' : 'hi-row'}>
      <span>{label}</span>
      {editing ? (
        <input
          className="hi-row__input"
          autoFocus
          defaultValue={value}
          inputMode={inputMode}
          enterKeyHint="done"
          aria-label={label}
          onFocus={(e) => e.target.select()}
          onBlur={(e) => done(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur()
            if (e.key === 'Escape') setEditing(false)
          }}
        />
      ) : (
        <button type="button" className="hi-row__value" aria-label={`Edit ${label}: ${value}`} onClick={() => setEditing(true)}>
          <b>{value}</b>
          <img className="hi-pencil" src={pencil} alt="" />
        </button>
      )}
    </div>
  )
}

/** Figma "Health info" 1646:13208, laid out as the "Health info.png" reference: edit in place. */
export function HealthInfo() {
  const go = useGo()
  const [gender, setGender] = useState('Female')
  return (
    <Screen className="hi">
      <div className="hi-content">
        <BackButton className="hi-back" onClick={() => go('/profile', 'smart')} />
        <div className="hi-body">
          <h1 className="hi-title">Health Information</h1>
          <h2 className="hi-subtitle">Basic Information</h2>
          <div className="hi-rows">
            <div className="hi-row">
              <span>Gender</span>
              <Dropdown options={GENDERS} value={gender} onChange={setGender} label="Gender" triggerClassName="hi-row__value">
                {(open) => (
                  <>
                    <b>{gender}</b>
                    <img className={open ? 'hi-chevron dd-arrow dd-arrow--open' : 'hi-chevron dd-arrow'} src={chevron} alt="" />
                  </>
                )}
              </Dropdown>
            </div>
            {FIELDS.map(([label, value, mode]) => (
              <EditRow key={label} label={label} initial={value} inputMode={mode} />
            ))}
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
