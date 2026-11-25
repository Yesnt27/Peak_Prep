import { TypeField } from '../../components/controls.jsx'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import TrailCard from '../../components/TrailCard.jsx'
import Dropdown from '../../components/Dropdown.jsx'
import ListItem from '../../components/ListItem.jsx'
import Avatar from '../../components/Avatar.jsx'
import Button from '../../components/Button.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import { openTraining, trainingsFor, useAccount } from '../../app/account.js'
import SegmentedTabs from '../../components/SegmentedTabs.jsx'
import avatar from '../../assets/home/avatar.png'
import searchIcon from '../../assets/icons/search.svg'
import chevDown from '../../assets/icons/chev-down.svg'
import chevRightGreen from '../../assets/icons/chev-right-green.svg'
import { HIKES } from '../../data/hikes.js'
import { EXERCISES, workoutFor } from '../../data/exercises.js'
import { doneOn, setDone, useWorkouts } from '../../app/workouts.js'
import './Home.css'

const TABS = [
  // Round 32: Explore / Training / Saved; Home opens on Training.
  { id: 'explore', label: 'Explore', color: '#414141' },
  { id: 'training', label: 'Training' },
  { id: 'saved', label: 'Saved' },
]


// Sort options. Each reads the first number from a hike's stats
// (distance KM, M ELEV, HOURS), shortest / lowest first.
export const SORTS = [
  { id: 'distance', label: 'Distance', stat: 0 },
  { id: 'elevation', label: 'Elevation', stat: 1 },
  { id: 'time', label: 'Time', stat: 2 },
]

const statValue = (hike, i) => parseFloat(hike.stats[i][0].replace(/,/g, ''))

// Cards keep the Figma order until a sort is picked from the menu.
export function sortCards(cards, sort) {
  if (!sort) return cards
  const { stat } = SORTS.find((s) => s.id === sort)
  return [...cards].sort((a, b) => statValue(HIKES[a.hike], stat) - statValue(HIKES[b.hike], stat))
}

// Each card opens its own hike's details (/hike/:id).
function CardList({ cards, sort }) {
  // eslint-disable-next-line no-unused-vars
  return sortCards(cards, sort).map(({ hike, friends, ...props }) => <TrailCard key={hike} id={hike} {...props} />)
}

/** Saved = the hikes this account liked (Round 30: the demo account too; hearts are shared app-wide). */
function Saved({ go, sort, account, onExplore }) {
  const liked = account.liked ?? []
  if (!liked.length)
    return (
      <EmptyState title="No saved hikes yet" text="Tap the heart on a hike to save it here.">
        <Button onClick={onExplore}>Explore hikes</Button>
      </EmptyState>
    )
  return <CardList go={go} sort={sort} cards={liked.map((hike) => ({ hike }))} />
}

function Explore({ go, sort, account }) {
  const isNew = account.type === 'new'
  const cards = [
    { hike: 'blackTusk' },
    { hike: 'brunswick', friends: !isNew },
    { hike: 'wedgemount' },
    { hike: 'panorama', friends: !isNew },
  ]
  return <CardList go={go} cards={cards} sort={sort} />
}

/** "Sort: …" menu (Home; Completed hikes uses it too, Round 36). */
export function SortMenu({ sort, onChange, triggerClassName = 'home__sort' }) {
  const current = SORTS.find((s) => s.id === sort) ?? SORTS[0]
  return (
    <Dropdown options={SORTS} value={sort} onChange={onChange} triggerClassName={triggerClassName}>
      {(open) => (
        <>
          <span>Sort: {current.label}</span>
          <img className={open ? 'dd-arrow dd-arrow--open' : 'dd-arrow'} src={chevDown} alt="" />
        </>
      )}
    </Dropdown>
  )
}

// Session lengths from Figma (Home → Training).
const MINUTES = { stairs: '40 min', weightedWalk: '20 min', endurance: '20 min' }

function Training({ go, account }) {
  useWorkouts()
  const trainings = trainingsFor(account)
  // Each card opens the Training overview for its own hike.
  const open = (hike) => {
    openTraining(hike)
    go('/training', 'smart')
  }
  const cards = trainings.map((t) => (
    <TrailCard
      key={t.hike}
      id={t.hike}
      date={t.date}
      progress={{ pct: t.pct, text: t.fresh ? '0% ready · just started' : `${t.pct}% ready · ${t.toGo}` }}
      onClick={() => open(t.hike)}
    />
  ))
  if (account.type === 'new') {
    if (!trainings.length)
      return (
        <EmptyState title="No training yet" text="Pick a hike and we’ll build a training plan around it.">
          <Button onClick={() => go('/new-training')}>Start training journey</Button>
        </EmptyState>
      )
    return cards
  }
  // Round 21: today's date and the same ticks as Daily Training (Brunswick, the first demo training).
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const main = trainings.find((t) => t.hike === 'brunswick') ?? trainings[0]
  const planned = workoutFor(main, today, true)
  const done = doneOn(main.hike, today, planned, true)
  return (
    <>
      <section className="today">
        <div className="today__head">
          <div className="today__label">
            <p className="today__title">Today's training</p>
            <p className="today__sub">
              {today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · for {HIKES[main.hike].title}
            </p>
          </div>
          <span className="today__count">
            {done.length} of {planned.length} done
          </span>
        </div>
        {planned.map((id) => (
          <ListItem
            key={id}
            label={EXERCISES[id].label}
            meta={MINUTES[id]}
            checked={done.includes(id)}
            onChange={() => setDone(main.hike, today, done.includes(id) ? done.filter((d) => d !== id) : [...done, id])}
          />
        ))}
        <button type="button" className="today__link" onClick={() => go('/training/schedule', 'smart', '/home/training')}>
          <span>Full analytics</span>
          <img src={chevRightGreen} alt="" />
        </button>
      </section>
      {/* Hikes being trained for: the prep-progress card, opening that hike's training plan. */}
      {cards}
    </>
  )
}

const CONTENT = { saved: Saved, explore: Explore, training: Training }

/** Figma "Home - Saved2 / Explore2 / Training2". */
export default function Home() {
  const go = useGo()
  const { tab = 'training' } = useParams()
  const active = CONTENT[tab] ? tab : 'training'
  // The tab highlight changes on click; the screen itself follows 300ms later,
  // matching the prototype's "after delay" navigation between the Home frames.
  const [selected, setSelected] = useState(active)
  const [sort, setSort] = useState(null)

  useEffect(() => {
    if (selected === active) return undefined
    const timer = setTimeout(() => go(`/home/${selected}`), 300)
    return () => clearTimeout(timer)
  }, [selected, active, go])

  const Content = CONTENT[active]
  const account = useAccount()

  return (
    <Screen className="home" fixed={<NavBar />}>
      <div className="home__content">
        <header className="home__header">
          <div className="home__heading">
            <p className="home__eyebrow">PEAKPREP</p>
            <h1 className="home__title">Where to next?</h1>
          </div>
          <button type="button" className="home__avatar" aria-label="Profile" onClick={() => go('/profile', 'smart')}>
            {account.type === 'new' ? <Avatar src={account.photo} name={account.name} size={38} /> : <img src={avatar} alt="" />}
          </button>
        </header>
        <SegmentedTabs tabs={TABS} value={selected} onChange={setSelected} />
        <div className="home__search-row">
          <div className="home__search">
            <img src={searchIcon} alt="" />
            <TypeField tone="faint" placeholder="Search hikes" enterKeyHint="search" />
          </div>
          <SortMenu sort={sort} onChange={setSort} />
        </div>
        <Content go={go} sort={sort} account={account} onExplore={() => setSelected('explore')} />
      </div>
    </Screen>
  )
}
