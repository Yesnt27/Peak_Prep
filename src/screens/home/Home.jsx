import { TypeField } from '../../components/controls.jsx'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import HikeCard from '../../components/HikeCard.jsx'
import ListItem from '../../components/ListItem.jsx'
import SegmentedTabs from '../../components/SegmentedTabs.jsx'
import avatar from '../../assets/home/avatar.png'
import searchIcon from '../../assets/icons/search.svg'
import chevDown from '../../assets/icons/chev-down.svg'
import chevRightGreen from '../../assets/icons/chev-right-green.svg'
import { HIKES } from '../../data/hikes.js'
import './Home.css'

const TABS = [
  { id: 'saved', label: 'Saved', color: '#414141' },
  { id: 'explore', label: 'Explore' },
  { id: 'training', label: 'Training' },
]


// Sort options. Each reads the first number from a hike's stats
// (distance KM, M ELEV, HOURS), shortest / lowest first.
const SORTS = [
  { id: 'distance', label: 'Distance', stat: 0 },
  { id: 'elevation', label: 'Elevation', stat: 1 },
  { id: 'time', label: 'Time', stat: 2 },
]

const statValue = (hike, i) => parseFloat(hike.stats[i][0].replace(/,/g, ''))

// Cards keep the Figma order until a sort is picked from the menu.
function sortCards(cards, sort) {
  if (!sort) return cards
  const { stat } = SORTS.find((s) => s.id === sort)
  return [...cards].sort((a, b) => statValue(HIKES[a.hike], stat) - statValue(HIKES[b.hike], stat))
}

// Demo: every card opens the Brunswick Mountain hike details (/hike).
function CardList({ go, cards, sort }) {
  return sortCards(cards, sort).map(({ hike, ...props }) => (
    <HikeCard key={hike} {...HIKES[hike]} {...props} onClick={() => go('/hike')} />
  ))
}

function Saved({ go, sort }) {
  const cards = [
    { hike: 'panorama', saved: true, friends: true },
    { hike: 'blackTusk', saved: true },
    { hike: 'brunswick', saved: true, friends: true },
  ]
  return <CardList go={go} cards={cards} sort={sort} />
}

function Explore({ go, sort }) {
  const cards = [
    { hike: 'blackTusk' },
    { hike: 'brunswick', friends: true },
    { hike: 'wedgemount' },
    { hike: 'panorama', friends: true },
  ]
  return <CardList go={go} cards={cards} sort={sort} />
}

function SortMenu({ sort, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = SORTS.find((s) => s.id === sort) ?? SORTS[0]

  useEffect(() => {
    if (!open) return undefined
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false)
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  return (
    <div className="home__sort-wrap" ref={ref}>
      <button type="button" className="home__sort" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>Sort: {current.label}</span>
        <img className={open ? 'home__sort-arrow home__sort-arrow--open' : 'home__sort-arrow'} src={chevDown} alt="" />
      </button>
      {open && (
        <ul className="home__sort-menu" role="listbox">
          {SORTS.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                role="option"
                aria-selected={s.id === current.id}
                className={s.id === current.id ? 'home__sort-option home__sort-option--selected' : 'home__sort-option'}
                onClick={() => {
                  onChange(s.id)
                  setOpen(false)
                }}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Training({ go }) {
  return (
    <>
      <section className="today">
        <div className="today__head">
          <div className="today__label">
            <p className="today__title">Today's training</p>
            <p className="today__sub">Tue, Oct 28 · for Mount Brunswick</p>
          </div>
          <span className="today__count">2 of 3 done</span>
        </div>
        <ListItem label="Stair Climber · lv.6" meta="40 min" defaultChecked />
        <ListItem label="Weighted Walk · 15kg" meta="20 min" defaultChecked />
        <ListItem label="Endurance" meta="0.0 kg" />
        <div className="today__link">
          <span>Full analytics</span>
          <img src={chevRightGreen} alt="" />
        </div>
      </section>
      <HikeCard
        {...HIKES.brunswick}
        date="Sat, Dec 12"
        saved
        friends
        progress={{ text: '82% completed · 10 days to go', remaining: 58 }}
        onClick={() => go('/training')}
      />
      <HikeCard
        {...HIKES.blackTusk}
        date="Jun 23–24"
        saved
        progress={{ text: '34% completed · 7 months to go', remaining: 212 }}
        onClick={() => go('/training')}
      />
    </>
  )
}

const CONTENT = { saved: Saved, explore: Explore, training: Training }

/** Figma "Home - Saved2 / Explore2 / Training2". */
export default function Home() {
  const go = useGo()
  const { tab = 'saved' } = useParams()
  const active = CONTENT[tab] ? tab : 'saved'
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

  return (
    <Screen className="home" fixed={<NavBar />}>
      <div className="home__content">
        <header className="home__header">
          <div className="home__heading">
            <p className="home__eyebrow">PEAKPREP</p>
            <h1 className="home__title">Where to next?</h1>
          </div>
          <button type="button" className="home__avatar" aria-label="Profile" onClick={() => go('/profile', 'smart')}>
            <img src={avatar} alt="" />
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
        <Content go={go} sort={sort} />
      </div>
    </Screen>
  )
}
