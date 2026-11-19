import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import NavBar from '../../components/NavBar.jsx'
import ListItem from '../../components/ListItem.jsx'
import { Fragment } from 'react'
import { LESSONS, completedLessons } from '../../app/progress.js'
import { useAccount } from '../../app/account.js'
import { HIKES } from '../../data/hikes.js'
import { Chip, HikeHero, KeyStats, SectionHeader } from './parts.jsx'
import TrainingCalendar from './TrainingCalendar.jsx'
import ringTrack from '../../assets/training/ring-track.svg'
import ringFill from '../../assets/training/ring-fill.svg'
import bagIcon from '../../assets/training/bag.svg'
import shieldIcon from '../../assets/training/shield.svg'
import checkIcon from '../../assets/training/check.svg'
import './TrainingOverview.css'

function BagStat({ title, value, unit, note, remaining, fill }) {
  return (
    <div className="to-bag-stat">
      <p className="to-bag-stat__title">{title}</p>
      <p className="to-bag-stat__value">
        <span className="to-bag-stat__num">{value}</span>
        <span className="to-bag-stat__unit">{unit}</span>
      </p>
      <p className="to-bag-stat__note">{note}</p>
      <div className="to-bag-stat__bar" style={{ paddingRight: remaining }}>
        <div className="to-bag-stat__fill" style={fill ? { flex: 'none', width: fill } : undefined} />
      </div>
    </div>
  )
}

/** Figma "Training overview (hi-fi)" 1780:3125. */
/** Readiness ring + prep rows (Training overview and Training Schedule). */
/** A new account's training: the hike they picked, with nothing done yet. */
function useFreshTraining() {
  const account = useAccount()
  return account.type === 'new' ? HIKES[account.training?.hike ?? account.plannedHike ?? 'blackTusk'] : null
}

export function PrepStatus() {
  const fresh = useFreshTraining()
  const rows = fresh
    ? [
        ['Prep status', 'Just started'],
        ['Training completed', '0 of 6 weeks'],
        ['Elevation goal', `0 / ${fresh.stats[1][0]} m`],
      ]
    : [
        ['Prep status', 'On optimal track'],
        ['Training completed', '3 of 6 weeks'],
        ['Elevation goal', '3,389 / 4,120 m'],
      ]
  return (
    <div className="to-prep">
      <div className="to-ring">
        <img src={ringTrack} alt="" />
        {!fresh && <img src={ringFill} alt="" />}
        <p className="to-ring__value">{fresh ? '0%' : '82%'}</p>
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

export default function TrainingOverview() {
  const go = useGo()
  const done = completedLessons()
  const upNext = LESSONS.find(([name]) => !done.includes(name))
  const fresh = useFreshTraining()
  // Difficulty chip from the card tag, e.g. "HARD • ALPINE" → "Hard".
  const level = fresh ? fresh.tag.split(' • ')[0].toLowerCase().replace(/^./, (c) => c.toUpperCase()) : 'Hard'
  return (
    <Screen className="to" fixed={<NavBar />}>
      <HikeHero
        hike={fresh ?? undefined}
        friends={!fresh}
        onBack={() => go('/home/training')}
        chips={
          <>
            <Chip tone="yellow-1">{level}</Chip>
            {!fresh && <Chip>Sat, Dec 12</Chip>}
          </>
        }
      />

      <div className="to-content">
        <KeyStats
          stats={
            fresh
              ? [
                  [fresh.stats[1][0], 'm', 'in elevation'],
                  [fresh.stats[0][0], 'km', 'in distance'],
                  [fresh.stats[2][0], fresh.stats[2][1] === 'DAYS' ? 'days' : 'hrs', 'est. time'],
                ]
              : [
                  ['1,539', 'm', 'in elevation'],
                  ['14.3', 'km', 'in distance'],
                  ['7–9', 'hrs', 'est. time'],
                ]
          }
        />

        <PrepStatus />

        <section className="to-section">
          <TrainingCalendar />
          <p className="to-daily">Daily training · {fresh ? 0 : 2} of 3 done</p>
          <ListItem label="Stair Climber · lv.6" meta="40 min" />
          <ListItem label="Weighted Walk · 15kg" meta="20 min" />
          <ListItem label="Endurance" meta="20 min" />
          <Button className="to-btn" onClick={() => go('/training/schedule', 'smart')}>
            View Training Schedule
          </Button>
        </section>

        <section className="to-section">
          <SectionHeader icon={bagIcon} title="Bag check" sub="Osprey Talon 33L">
            <Chip tone="yellow-3">{fresh ? '0 / 12 kg' : '10.2 / 12 kg'}</Chip>
          </SectionHeader>
          <div className="to-bag">
            {fresh ? (
              <>
                <BagStat title="Packed" value="0" unit="of 11" note="11 left to pack" remaining="100%" />
                <BagStat title="Weight" value="0" unit="kg" note="0% of 12 kg limit" remaining="100%" />
              </>
            ) : (
              <>
                <BagStat title="Packed" value="8" unit="of 11" note="3 left to pack" remaining={21} fill={101} />
                <BagStat title="Weight" value="7.8" unit="kg" note="85% of 12 kg limit" remaining={21} />
              </>
            )}
          </div>
          <Button className="to-btn" onClick={() => go('/packing/all')}>
            Packing List
          </Button>
        </section>

        <section className="to-section to-safety">
          <SectionHeader icon={shieldIcon} title="Hiking safety" sub="Brunswick Mountain Trail Safety">
            <Chip tone="yellow-1">
              {done.length} of {LESSONS.length}
            </Chip>
          </SectionHeader>
          <div className="to-safety__card">
            <div className="to-steps">
              {LESSONS.map(([name], i) => {
                const isDone = done.includes(name)
                const state = isDone ? 'done' : upNext?.[0] === name ? 'current' : 'todo'
                return (
                  <Fragment key={name}>
                    {i > 0 && <span className={isDone ? 'to-step__line to-step__line--done' : 'to-step__line'} />}
                    <span className={`to-step to-step--${state}`}>{isDone ? <img src={checkIcon} alt="" /> : i + 1}</span>
                  </Fragment>
                )
              })}
            </div>
            <div className="to-next">
              <div className="to-next__text">
                <p className="to-next__label">{upNext ? 'Up next' : 'All lessons'}</p>
                <p className="to-next__title">{upNext ? upNext[0] : 'Complete'}</p>
              </div>
              {upNext && <Chip tone="yellow-1">{upNext[1].toLowerCase()}</Chip>}
            </div>
            <Button variant="primary" className="to-btn to-btn--round" onClick={() => go('/first-aid')}>
              Continue lesson
            </Button>
          </div>
        </section>

        <Button variant="primary" className="to-btn to-btn--round" onClick={() => go('/log/congrats')}>
          Hike Completed!
        </Button>
      </div>
    </Screen>
  )
}
