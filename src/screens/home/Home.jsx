import { useEffect, useState } from 'react'
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
import panoramaRidge from '../../assets/home/panorama-ridge.jpg'
import blackTusk from '../../assets/home/black-tusk.jpg'
import mountBrunswick from '../../assets/home/mount-brunswick.jpg'
import wedgemountLake from '../../assets/home/wedgemount-lake.jpg'
import './Home.css'

const TABS = [
  { id: 'saved', label: 'Saved', color: '#414141' },
  { id: 'explore', label: 'Explore' },
  { id: 'training', label: 'Training' },
]

const HIKES = {
  panorama: {
    image: panoramaRidge,
    tag: 'HARD • ALPINE',
    title: 'Panorama Ridge',
    location: 'Garibaldi Provincial Park, BC',
    rating: '4.9 (1580)',
    stats: [['30.1', 'KM'], ['1,490', 'M ELEV'], ['8–10', 'HOURS']],
  },
  blackTusk: {
    image: blackTusk,
    tag: 'STRENUOUS • SCRAMBLE',
    title: 'The Black Tusk',
    location: 'Garibaldi Provincial Park, BC',
    rating: '4.5 (690)',
    stats: [['26.4', 'KM'], ['1,763', 'M ELEV'], ['9–11', 'HOURS']],
  },
  brunswick: {
    image: mountBrunswick,
    tag: 'STRENUOUS • SCRAMBLE',
    title: 'Mount Brunswick',
    location: 'Lions Bay, BC',
    rating: '4.8 (498)',
    stats: [['14.3', 'KM'], ['1,539', 'M ELEV'], ['7–9', 'HOURS']],
  },
  wedgemount: {
    image: wedgemountLake,
    tag: 'HARD • STEEP INCLINE',
    title: 'Wedgemount Lake',
    location: 'Whistler, BC',
    rating: '4.8 (810)',
    stats: [['12.0', 'KM'], ['1,200', 'M ELEV'], ['6–7', 'HOURS']],
  },
}

function Saved({ go }) {
  return (
    <>
      <HikeCard {...HIKES.panorama} saved friends />
      <HikeCard {...HIKES.blackTusk} saved onClick={() => go('/hike')} />
      <HikeCard {...HIKES.brunswick} saved friends />
    </>
  )
}

function Explore({ go }) {
  return (
    <>
      <HikeCard {...HIKES.blackTusk} onClick={() => go('/hike')} />
      <HikeCard {...HIKES.brunswick} friends onClick={() => go('/hike')} />
      <HikeCard {...HIKES.wedgemount} />
      <HikeCard {...HIKES.panorama} friends />
    </>
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
          <img className="home__avatar" src={avatar} alt="" />
        </header>
        <SegmentedTabs tabs={TABS} value={selected} onChange={setSelected} />
        <div className="home__search-row">
          <div className="home__search">
            <img src={searchIcon} alt="" />
            <span>Search hikes</span>
          </div>
          <div className="home__sort">
            <span>Sort: Distance</span>
            <img src={chevDown} alt="" />
          </div>
        </div>
        <Content go={go} />
      </div>
    </Screen>
  )
}
