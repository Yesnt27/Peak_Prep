import { TypeField } from '../../components/controls.jsx'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import HikeCard from '../../components/HikeCard.jsx'
import Dropdown from '../../components/Dropdown.jsx'
import ListItem from '../../components/ListItem.jsx'
import Avatar from '../../components/Avatar.jsx'
import Button from '../../components/Button.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import { toggleLike, useAccount } from '../../app/account.js'
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

/** A new account: hearts save into the account; Saved lists only what they liked. */
function likeProps(account, hike) {
  return { saved: account.liked.includes(hike), onLike: () => toggleLike(hike) }
}

function Saved({ go, sort, account, onExplore }) {
  if (account.type === 'new') {
    if (!account.liked.length)
      return (
        <EmptyState title="No saved hikes yet" text="Tap the heart on a hike to save it here.">
          <Button onClick={onExplore}>Explore hikes</Button>
        </EmptyState>
      )
    return <CardList go={go} sort={sort} cards={account.liked.map((hike) => ({ hike, ...likeProps(account, hike) }))} />
  }
  const cards = [
    { hike: 'panorama', saved: true, friends: true },
    { hike: 'blackTusk', saved: true },
    { hike: 'brunswick', saved: true, friends: true },
  ]
  return <CardList go={go} cards={cards} sort={sort} />
}

function Explore({ go, sort, account }) {
  const isNew = account.type === 'new'
  const cards = [
    { hike: 'blackTusk' },
    { hike: 'brunswick', friends: !isNew },
    { hike: 'wedgemount' },
    { hike: 'panorama', friends: !isNew },
  ].map((c) => (isNew ? { ...c, ...likeProps(account, c.hike) } : c))
  return <CardList go={go} cards={cards} sort={sort} />
}

function SortMenu({ sort, onChange }) {
  const current = SORTS.find((s) => s.id === sort) ?? SORTS[0]
  return (
    <Dropdown options={SORTS} value={sort} onChange={onChange} triggerClassName="home__sort">
      {(open) => (
        <>
          <span>Sort: {current.label}</span>
          <img className={open ? 'dd-arrow dd-arrow--open' : 'dd-arrow'} src={chevDown} alt="" />
        </>
      )}
    </Dropdown>
  )
}

function Training({ go, account }) {
  if (account.type === 'new') {
    if (!account.training)
      return (
        <EmptyState title="No training yet" text="Pick a hike and we’ll build a training plan around it.">
          <Button onClick={() => go('/new-training')}>Start training journey</Button>
        </EmptyState>
      )
    const key = account.training.hike
    return (
      <HikeCard
        {...HIKES[key]}
        {...likeProps(account, key)}
        progress={{ text: '0% completed · just started', remaining: '100%' }}
        onClick={() => go('/training')}
      />
    )
  }
  return (
    <>
      <section className="today">
        <div className="today__head">
          <div className="today__label">
            <p className="today__title">Today's training</p>
            <p className="today__sub">Tue, Oct 28 · for Brunswick Mountain Trail</p>
          </div>
          <span className="today__count">2 of 3 done</span>
        </div>
        <ListItem label="Stair Climber · lv.6" meta="40 min" defaultChecked />
        <ListItem label="Weighted Walk · 15kg" meta="20 min" defaultChecked />
        <ListItem label="Endurance" meta="20 min" />
        <button type="button" className="today__link" onClick={() => go('/training/schedule', 'smart', '/home/training')}>
          <span>Full analytics</span>
          <img src={chevRightGreen} alt="" />
        </button>
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
