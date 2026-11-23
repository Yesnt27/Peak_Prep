import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import NavBar from '../../components/NavBar.jsx'
import { useTraining } from '../../app/account.js'
import { HIKES } from '../../data/hikes.js'
import { elevationGoal } from '../../data/trainings.js'
import { Chip, HikeHero, KeyStats } from './parts.jsx'
import { Collapsible } from './HikeSections.jsx'
import { useTodaysWorkout } from './TrainingSchedule.jsx'
import { usePackSummary } from '../packing/Packing.jsx'
import { HIKE_DETAILS } from '../../data/hikeDetails.js'
import { EXERCISES } from '../../data/exercises.js'
import { dayKey } from '../../app/workouts.js'
import { LESSONS, completedLessons } from '../../app/progress.js'
import './HikeDetails.css'
import ringTrack from '../../assets/training/ring-track.svg'
import calendarIcon from '../../assets/training/calendar.svg'
import chevRight from '../../assets/icons/chev-right.svg'
import bagIcon from '../../assets/training/bag.svg'
import shieldIcon from '../../assets/training/shield.svg'
import mtnIcon from '../../assets/hike/mtn-20.svg'
import './TrainingOverview.css'

/** Figma "Training overview (hi-fi)" 1780:3125. */
/** Readiness ring + prep rows (Training overview and Training Schedule). */
/** The opened training's readiness: ring drawn from its % (Figma ring: 76px, 6.08px green arc from 12 o'clock). */
export function PrepStatus() {
  const training = useTraining()
  const rows = training.fresh
    ? [
        ['Prep status', 'Just started'],
        ['Training completed', '0 of 6 weeks'],
        ['Elevation goal', `0 / ${elevationGoal(HIKES[training.hike].stats[1][0]).toLocaleString('en-US')} m`],
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

/**
 * "training overview 5.png" (Round 20): hero, "About this trail" dropdown, readiness card, the
 * Training Schedule card (today's next exercise), then Hiking Safety and Bag Check with progress.
 */
export default function TrainingOverview() {
  const go = useGo()
  // The training opened from Home → Training, Hike Details or New training (Brunswick by default).
  const { hike: id, date } = useTraining()
  const hike = HIKES[id]
  const details = HIKE_DETAILS[id]
  const { planned, done, date: today } = useTodaysWorkout()
  const next = planned.find((e) => !done.includes(e)) ?? planned[planned.length - 1]
  const lessons = completedLessons().filter((n) => LESSONS.some(([name]) => name === n)).length
  const bag = usePackSummary()
  const [time, unit] = hike.stats[2]

  return (
    <Screen className="to" fixed={<NavBar />}>
      <HikeHero hike={hike} minimal onBack={() => go('/home/training')} chips={date && <Chip>{date}</Chip>} />

      <div className="to-content">
        <Collapsible icon={mtnIcon} title="About this trail">
          <div className="to-about">
            <KeyStats
              stats={[
                [hike.stats[0][0], 'km', 'distance'],
                [hike.stats[1][0], 'm', id === 'everest' ? 'highest point' : 'elevation gain'],
                [time, unit === 'DAYS' ? 'days' : 'hrs', 'est. time'],
              ]}
            />
            {details?.about && <p className="to-about__text">{details.about}</p>}
            <button type="button" className="to-about__link" onClick={() => go(`/hike/${id}`, 'smart', '/training')}>
              View full trail details
              <img src={chevRight} alt="" />
            </button>
          </div>
        </Collapsible>

        <PrepStatus />

        {/* Training Schedule: whole card → schedule; white card → today's next exercise. */}
        <div className="to-sched">
          <button type="button" className="to-sched__main" onClick={() => go('/training/schedule', 'smart')}>
            <img className="to-tile__icon" src={calendarIcon} alt="" />
            <span className="to-sched__title">Training Schedule</span>
            <span className="to-tile__sub">Daily training</span>
          </button>
          {planned.length > 0 ? (
            <button
              type="button"
              className="to-sched__today"
              onClick={() => go(`/training/exercise/${next}?date=${dayKey(today)}`, 'smart', '/training')}
            >
              <span className="to-sched__name">{EXERCISES[next].label.split(' · ')[0]}</span>
              <span className="to-tile__sub">
                {done.length}/{planned.length} completed
              </span>
              <span className="to-sched__row">
                <span className="to-sched__pill">View today’s training</span>
                <img src={chevRight} alt="" />
              </span>
            </button>
          ) : (
            <button type="button" className="to-sched__today" onClick={() => go('/training/schedule', 'smart')}>
              <span className="to-sched__name">Rest day</span>
              <span className="to-tile__sub">No training today</span>
              <span className="to-sched__row">
                <span className="to-sched__pill">View schedule</span>
                <img src={chevRight} alt="" />
              </span>
            </button>
          )}
        </div>

        <div className="to-tiles">
          <button type="button" className="to-tile to-tile--safety" onClick={() => go('/first-aid', 'smart')}>
            <img className="to-tile__chev" src={chevRight} alt="" />
            <img className="to-tile__icon" src={shieldIcon} alt="" />
            <span className="to-tile__title">Hiking Safety</span>
            <span className="to-tile__sub">
              {lessons}/{LESSONS.length} completed
            </span>
          </button>
          <button type="button" className="to-tile to-tile--green" onClick={() => go('/packing/to-pack', 'smart')}>
            <img className="to-tile__chev" src={chevRight} alt="" />
            <img className="to-tile__icon" src={bagIcon} alt="" />
            <span className="to-tile__title">Bag Check</span>
            <span className="to-tile__sub">
              {bag.packedCount}/{bag.total} items packed
            </span>
          </button>
        </div>

        {/* Not in the design image; kept so the Completed Hike log stays reachable. */}
        <Button className="to-btn to-btn--round" onClick={() => go('/log/congrats')}>
          Hike Completed!
        </Button>
      </div>
    </Screen>
  )
}
