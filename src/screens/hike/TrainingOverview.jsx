import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import NavBar from '../../components/NavBar.jsx'
import { useState } from 'react'
import { useTraining } from '../../app/account.js'
import { HIKES } from '../../data/hikes.js'
import { Chip, HikeHero } from './parts.jsx'
import ringTrack from '../../assets/training/ring-track.svg'
import calendarIcon from '../../assets/training/calendar.svg'
import chevRight from '../../assets/icons/chev-right.svg'
import dotDone from '../../assets/training/dot-done.svg'
import dotToday from '../../assets/training/dot-today.svg'
import bagIcon from '../../assets/training/bag.svg'
import shieldIcon from '../../assets/training/shield.svg'
import mtnIcon from '../../assets/hike/mtn-20.svg'
import './TrainingOverview.css'

// [weekday, date, dot]: 'done' = green dot, 'today' = selected day, null = no dot.
const WEEK = [
  ['S', '26', 'done'],
  ['M', '27', 'done'],
  ['T', '28', 'today'],
  ['W', '29', null],
  ['T', '30', null],
  ['F', '31', null],
  ['S', '01', null],
]

/** Figma "Training overview (hi-fi)" 1780:3125. */
/** Readiness ring + prep rows (Training overview and Training Schedule). */
/** The opened training's readiness: ring drawn from its % (Figma ring: 76px, 6.08px green arc from 12 o'clock). */
export function PrepStatus() {
  const training = useTraining()
  const rows = training.fresh
    ? [
        ['Prep status', 'Just started'],
        ['Training completed', '0 of 6 weeks'],
        ['Elevation goal', `0 / ${HIKES[training.hike].stats[1][0]} m`],
      ]
    : training.rows
  return (
    <div className="to-prep">
      <div className="to-ring">
        <img src={ringTrack} alt="" />
        <svg className="to-ring__fill" viewBox="0 0 76 76" aria-hidden="true">
          <circle
            cx="38"
            cy="38"
            r="34.96"
            pathLength="100"
            strokeDasharray={`${training.pct} 100`}
            transform="rotate(-90 38 38)"
          />
        </svg>
        <p className="to-ring__value">{training.pct}%</p>
        <p className="to-ring__label">ready</p>
      </div>
      <div className="to-prep__rows">
        {rows.map(([label, value]) => (
          <div className="to-prep__row" key={label}>
            <p className="to-prep__label">{label}</p>
            <p className="to-prep__value">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Week strip: the green pill starts on today (28) and moves to the tapped day. */
export function WeekStrip() {
  const { fresh } = useTraining()
  const [day, setDay] = useState('28')
  return (
    <div className="to-week">
      {WEEK.map(([weekday, date, dot]) => (
        <button
          type="button"
          className={date === day ? 'to-day to-day--today' : 'to-day'}
          key={date}
          aria-pressed={date === day}
          onClick={() => setDay(date)}
        >
          <p className="to-day__weekday">{weekday}</p>
          <p className="to-day__date">{date}</p>
          <span className="to-day__dot">
            {dot && !(fresh && dot === 'done') && <img src={date === day ? dotToday : dotDone} alt="" />}
          </span>
        </button>
      ))}
    </div>
  )
}

const TILES = [
  { title: 'Training Schedule', icon: calendarIcon, tone: 'teal', to: () => '/training/schedule' },
  { title: 'Bag Check', icon: bagIcon, tone: 'green', to: () => '/packing/all' },
  { title: 'Hiking Safety', icon: shieldIcon, tone: 'yellow', to: () => '/first-aid' },
  { title: 'About this trail', icon: mtnIcon, tone: 'white', to: (id) => `/hike/${id}` },
]

/** "training overview 3.png": photo + date + name, readiness card, then four tiles into the plan. */
export default function TrainingOverview() {
  const go = useGo()
  // The training opened from Home → Training, Hike Details or New training (Brunswick by default).
  const { hike: id, date } = useTraining()
  return (
    <Screen className="to" fixed={<NavBar />}>
      <HikeHero hike={HIKES[id]} minimal onBack={() => go('/home/training')} chips={date && <Chip>{date}</Chip>} />

      <div className="to-content">
        <PrepStatus />
        <div className="to-tiles">
          {TILES.map((t) => (
            <button
              type="button"
              key={t.title}
              className={`to-tile to-tile--${t.tone}`}
              onClick={() => go(t.to(id), 'smart')}
            >
              <img className="to-tile__icon" src={t.icon} alt="" />
              <span className="to-tile__title">{t.title}</span>
              <span className="to-tile__go" aria-hidden="true">
                <img src={chevRight} alt="" />
              </span>
            </button>
          ))}
        </div>
        {/* Not in the new design image; kept so the Completed Hike log stays reachable. */}
        <Button variant="primary" className="to-btn to-btn--round" onClick={() => go('/log/congrats')}>
          Hike Completed!
        </Button>
      </div>
    </Screen>
  )
}
