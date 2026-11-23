import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import ShareButton from '../../components/ShareButton.jsx'
import { levelFor, planTraining, startTraining, useAccount } from '../../app/account.js'
import { Field, Options, SmallIcon, Step as FlowStep } from '../../components/FlowStep.jsx'
import TrailCard from '../../components/TrailCard.jsx'
import BottomSheet from '../../components/BottomSheet.jsx'
import { AddItem, BackButton, TagGroup, ToggleSwitch, ToggleTag, TypeField } from '../../components/controls.jsx'
import { HIKES, tripLimits } from '../../data/hikes.js'
import searchIcon from '../../assets/icons/search.png'
import yearArrow from '../../assets/new-training/year-arrow.png'
import checkGreen from '../../assets/icons/check-green.svg'
import dayHike from '../../assets/new-training/day-hike-mask.png'
import overnight from '../../assets/new-training/overnight-mask.png'
import multiDay from '../../assets/new-training/multi-day-mask.png'
import summit from '../../assets/new-training/summit.png'
import reachTop from '../../assets/new-training/reach-top-mask.png'
import feelGood from '../../assets/new-training/feel-good-mask.png'
import beatClock from '../../assets/new-training/beat-clock-mask.png'
import keepUp from '../../assets/new-training/keep-up-mask.png'
import flagMask from '../../assets/newtraining/flag-mask.png'
import joanna from '../../assets/friends/joanna.jpg'
import joanne from '../../assets/friends/joanne.jpg'
import john from '../../assets/friends/john.jpg'
import amber from '../../assets/friends/amber.jpg'
import eli from '../../assets/friends/eli.jpg'
import owen from '../../assets/friends/owen.jpg'
import './NewTraining.css'

/** New training steps: Continue sits at the end of the page and stays grey until an answer is picked. */
function Step(props) {
  return <FlowStep label="New Training" pinned={false} {...props} />
}

function Intro({ title, sub }) {
  return (
    <div className="fs-intro">
      <h1 className="fs-title nt-title">{title}</h1>
      {sub && <p className="fs-sub">{sub}</p>}
    </div>
  )
}

/* 1646:5644  new training 19 */
export function TargetHike() {
  const go = useGo()
  // A hike picked on "Hikes for your level" arrives as ?hike=<key>.
  const key = useSearchParams()[0].get('hike')
  const hike = HIKES[key] ?? HIKES.blackTusk
  // Tap the card to pick it; a hike chosen on "Hikes for your level" arrives already picked.
  const [picked, setPicked] = useState(Boolean(key))
  return (
    <Step
      step={1}
      fill={52}
      back="/home/training"
      next="/new-training/date"
      ready={picked}
      onNext={() => planTraining({ plannedHike: key ?? 'blackTusk' })}
    >
      <div className="fs-body nt-body">
        <Intro title="Target Hike" sub="The hike you’re training for." />
        <div className="nt-target">
          <Field label="Search trails:">
            <div className="fs-search nt-search">
              <img src={searchIcon} alt="" />
              <TypeField key={hike.title} defaultValue={key ? hike.title : 'Black Tusk'} enterKeyHint="search" />
            </div>
          </Field>
          <TrailCard id={key && HIKES[key] ? key : 'blackTusk'} selected={picked} onClick={() => setPicked(!picked)} />
          <button type="button" className="nt-link" onClick={() => go('/new-training/level', 'smart')}>
            Not sure yet? See hikes for your level
          </button>
        </div>
      </div>
    </Step>
  )
}

// Hikes that suit each level (Hudson, the demo account, is Advanced with 7+ yrs).
const LEVEL_HIKES = {
  Beginner: ['grouse', 'saintMark', 'wedgemount'],
  Intermediate: ['wedgemount', 'saintMark', 'panorama'],
  Advanced: ['blackTusk', 'brunswick', 'panorama', 'wedgemount'],
}

/** "Not sure yet?" → hikes for your level, as cards. Tapping one makes it the target hike. */
export function LevelHikes() {
  const go = useGo()
  const account = useAccount()
  const isNew = account.type === 'new'
  const level = isNew ? levelFor(account.years) : 'Advanced'
  const years = isNew ? account.years || '0' : '7+'
  return (
    <Screen className="fs">
      <BackButton className="fs-back" onClick={() => go('/new-training', 'smart')} />
      <div className="nt-level">
        <Intro
          title="Hikes for your level"
          sub={`Picked for ${/^[aeiou]/i.test(level) ? 'an' : 'a'} ${level.toLowerCase()} hiker with ${years} ${years === '1' ? 'year' : 'years'} of experience.`}
        />
        <div className="nt-level__cards">
          {LEVEL_HIKES[level].map((k) => (
            <TrailCard key={k} id={k} onClick={() => go(`/new-training?hike=${k}`, 'smart')} />
          ))}
        </div>
      </div>
    </Screen>
  )
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/* 1646:5688  new training 20 */
export function HikeDate() {
  const [year, setYear] = useState(2027)
  const [month, setMonth] = useState(null)
  // Round 30: opened from Hike Details (?hike=id) → back returns to that hike.
  const from = useSearchParams()[0].get('hike')
  return (
    <Step
      step={2}
      fill={85}
      back={from ? `/hike/${from}` : '/new-training'}
      next="/new-training/trip"
      ready={month !== null}
      onNext={() => planTraining({ plannedDate: `${month.slice(0, 3)} ${year}` })}
    >
      <div className="fs-body nt-body">
        <Intro title="Hike Date" />
        <Field label="Year">
          <div className="nt-year">
            <button
              type="button"
              className="nt-year__arrow"
              aria-label="Previous year"
              disabled={year <= 2026}
              onClick={() => setYear(year - 1)}
            >
              <img src={yearArrow} alt="" />
            </button>
            <span aria-live="polite">{year}</span>
            <button type="button" className="nt-year__arrow nt-year__arrow--next" aria-label="Next year" onClick={() => setYear(year + 1)}>
              <img src={yearArrow} alt="" />
            </button>
          </div>
        </Field>
        <Field label="Month">
          <div className="nt-months">
            {MONTHS.map((m) => (
              <button
                type="button"
                key={m}
                className={m === month ? 'nt-month nt-month--selected' : 'nt-month'}
                aria-pressed={m === month}
                onClick={() => setMonth(m === month ? null : m)}
              >
                {m}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Exact date (optional)">
          <div className="nt-exact">
            <TypeField tone="light" placeholder="30" inputMode="numeric" />
          </div>
        </Field>
      </div>
    </Step>
  )
}

/* 1646:5714  new training 21 */
export function TripType() {
  const account = useAccount()
  const hike = HIKES[account.plannedHike ?? 'blackTusk']
  const limits = tripLimits(hike)
  const [trip, setTrip] = useState(() => (account.plannedTrip && limits[account.plannedTrip] ? account.plannedTrip : null))
  const off = ['Day hike', 'Overnight'].filter((t) => !limits[t])
  return (
    <Step
      step={3}
      fill={180}
      back="/new-training/date"
      next="/new-training/who"
      ready={trip !== null}
      onNext={() => planTraining({ plannedTrip: trip })}
    >
      <div className="fs-body fs-body--center nt-body">
        <Intro title="Trip Type" sub="Day trip or a few nights out?" />
        <Options
          value={trip}
          onChange={setTrip}
          options={[
            {
              label: 'Day hike',
              icon: <SmallIcon mask={dayHike} maskStyle={{ left: 0.5, right: -0.5, WebkitMaskPosition: '-0.5px 0', maskPosition: '-0.5px 0' }} />,
            },
            { label: 'Overnight', icon: <SmallIcon mask={overnight} /> },
            {
              label: 'Multi-day trek',
              icon: <SmallIcon mask={multiDay} maskStyle={{ inset: '1.92px 0 -0.96px 0.96px', WebkitMaskPosition: '-0.96px -1.92px', maskPosition: '-0.96px -1.92px' }} />,
            },
            { label: 'Summit hike', icon: <SmallIcon src={summit} /> },
          ].map((o) => ({ ...o, disabled: !limits[o.label] }))}
        />
        {off.length > 0 && (
          <p className="fs-note">
            {limits.reason}, so {off.map((t) => t.toLowerCase()).join(' or ')} isn’t realistic.
          </p>
        )}
      </div>
    </Step>
  )
}

const FRIENDS = [
  [joanna, 'Joanna Brown', '@joannabrown32'],
  [joanne, 'Joanne Blue', '@joanne.blue'],
  [john, 'John Bo', '@john_bo2'],
  [amber, 'Amber Kenz', '@john_bo2'],
  [eli, 'Eli Eifler', '@john_bo2'],
  [owen, 'Owen Interino', '@john_bo2'],
]

/* 1646:5788  new training 23 (+ overlay 2175:7829) */
export function WhosComing() {
  const [sheet, setSheet] = useState(false)
  const [invited, setInvited] = useState([]) // names confirmed with Done
  const [picked, setPicked] = useState([]) // names ticked in the open sheet
  const [group, setGroup] = useState(null)
  const open = () => {
    setPicked(invited)
    setSheet(true)
  }
  const toggle = (name) => setPicked(picked.includes(name) ? picked.filter((n) => n !== name) : [...picked, name])
  return (
    <Step
      step={4}
      fill={256}
      back="/new-training/trip"
      next="/new-training/goal"
      ready={group !== null}
      overlay={
        <BottomSheet
          open={sheet}
          title="Invite Friends"
          onClose={() => setSheet(false)}
          onDone={() => {
            setInvited(picked)
            setSheet(false)
          }}
          action={<ShareButton label="Share invite link" />}
        >
          <div className="nt-friends">
            {FRIENDS.map(([photo, name, handle]) => {
              const on = picked.includes(name)
              return (
                <div className="nt-friend" key={name}>
                  <div className="nt-friend__who">
                    <img className="nt-friend__photo" src={photo} alt="" />
                    <div className="nt-friend__text">
                      <p className="nt-friend__name">{name}</p>
                      <p className="nt-friend__handle">{handle}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={on ? 'nt-friend__add nt-friend__add--on' : 'nt-friend__add'}
                    aria-pressed={on}
                    aria-label={on ? `Remove ${name}` : `Add ${name}`}
                    onClick={() => toggle(name)}
                  >
                    {on ? <img src={checkGreen} alt="" /> : 'Add'}
                  </button>
                </div>
              )
            })}
          </div>
        </BottomSheet>
      }
    >
      <div className="fs-body fs-body--center nt-body">
        <Intro title="Who’s coming?" />
        <Options
          value={group}
          onChange={setGroup}
          options={[
            { label: 'Solo' },
            { label: 'With a partner' },
            { label: 'Small group (3 to 5)' },
            { label: 'Big group (6+)' },
          ]}
        />
        <Field label="Invite friends to train together:">
          {invited.length > 0 && (
            <div className="nt-invited">
              {FRIENDS.filter(([, name]) => invited.includes(name)).map(([photo, name, handle]) => (
                <div className="nt-invited__row" key={name}>
                  <img src={photo} alt="" />
                  <div>
                    <p className="nt-invited__name">{name}</p>
                    <p className="nt-friend__handle">{handle}</p>
                  </div>
                  <img className="nt-invited__check" src={checkGreen} alt="Invited" />
                </div>
              ))}
            </div>
          )}
          <AddItem onClick={open}>Add Friend</AddItem>
        </Field>
      </div>
    </Step>
  )
}

/* 1646:5732  new training 8 */
export function Goal() {
  const [selected, setSelected] = useState(null)
  const [custom, setCustom] = useState([]) // the user's own goals
  const [draft, setDraft] = useState(null) // text being typed, or null
  const commit = () => {
    const goal = draft?.trim()
    if (goal) {
      if (!custom.includes(goal)) setCustom([...custom, goal])
      setSelected(goal)
    }
    setDraft(null)
  }
  return (
    <Step step={5} fill={298} back="/new-training/who" next="/new-training/schedule" ready={selected !== null}>
      <div className="fs-body fs-body--center nt-body">
        <Intro title="Goal" />
        <Options
          value={selected}
          onChange={setSelected}
          options={[
            {
              label: 'Reach the top',
              icon: <SmallIcon mask={reachTop} maskStyle={{ inset: '0.96px 0.96px 0 0', WebkitMaskPosition: '0 -0.96px', maskPosition: '0 -0.96px' }} />,
            },
            {
              label: 'Feel good after',
              icon: <SmallIcon mask={feelGood} maskStyle={{ inset: '1px 0 -1px 0', WebkitMaskPosition: '0 -1px', maskPosition: '0 -1px' }} />,
            },
            {
              label: 'Beat the clock',
              icon: <SmallIcon mask={beatClock} maskStyle={{ inset: '0 -1px 1px 2px', WebkitMaskPosition: '-2px 0', maskPosition: '-2px 0' }} />,
            },
            {
              label: 'Keep up with the group',
              icon: <SmallIcon mask={keepUp} maskStyle={{ inset: '0 1px 1px 0' }} />,
            },
            ...custom.map((label) => ({ label, icon: <SmallIcon mask={flagMask} /> })),
          ]}
        />
        {draft !== null && (
          <div className="fs-option nt-goal-new">
            <SmallIcon mask={flagMask} />
            <input
              className="nt-goal-new__input"
              autoFocus
              placeholder="Type your goal"
              aria-label="Your own goal"
              enterKeyHint="done"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.currentTarget.blur()
                if (e.key === 'Escape') setDraft(null)
              }}
            />
          </div>
        )}
        <AddItem className="nt-goal-add" onClick={() => (draft === null ? setDraft('') : commit())}>
          Add your own goal
        </AddItem>
      </div>
    </Step>
  )
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

/* 1646:5749  new training 22 */
export function Schedule() {
  const [days, setDays] = useState([])
  const [time, setTime] = useState(null)
  const toggleDay = (d) => setDays(days.includes(d) ? days.filter((x) => x !== d) : [...days, d])
  return (
    <Step
      step={6}
      fill={350}
      back="/new-training/goal"
      next="/training"
      nextTransition="smart"
      cta="Done"
      ready={days.length > 0 && time !== null}
      // Done adds the picked hike to Home → Training at 0% and opens its training page.
      onNext={() => startTraining({ days, time })}
    >
      <div className="fs-body fs-body--center nt-body">
        <Intro title="Your training schedule" sub="We’ll build the plan around your life." />
        <Field label="Training start date">
          <div className="fs-input">
            <TypeField defaultValue="10/30/2027" inputMode="numeric" />
          </div>
        </Field>
        <Field label="Training Availability">
          {/* Several days can be picked. */}
          <div className="nt-days nt-tiles">
            {DAYS.map((d) => (
              <ToggleTag key={d} selected={days.includes(d)} onChange={() => toggleDay(d)}>
                {d}
              </ToggleTag>
            ))}
          </div>
        </Field>
        <Field label="Time per session:">
          <TagGroup className="fs-tags nt-tiles" options={['15-30 min', '30-60 min', '1hr+']} value={time} onChange={setTime} />
        </Field>
        <div className="nt-toggle-row">
          <span>Include practice hikes</span>
          <ToggleSwitch label="Include practice hikes" />
        </div>
      </div>
    </Step>
  )
}
