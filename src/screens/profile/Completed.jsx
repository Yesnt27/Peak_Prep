import { useEffect, useState } from 'react'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import SegmentedTabs from '../../components/SegmentedTabs.jsx'
import { BackButton, TypeField } from '../../components/controls.jsx'
import hudson from '../../assets/profile/hudson.jpg'
import searchIcon from '../../assets/profile/search.svg'
import chevDown from '../../assets/icons/chev-down.svg'
import TrailCard from '../../components/TrailCard.jsx'
import './Completed.css'

// Completed hikes (Figma "Completed Hikes" cards): [hike key, date].
const DONE = {
  everest: ['everest', 'June 20, 2025'],
  grouse: ['grouse', 'July 25, 2025'],
  saintMark: ['saintMark', 'Dec 12, 2026'],
}

const TABS = [
  { id: 'recent', label: 'Recent', color: '#414141' },
  { id: 'favourited', label: 'Favourited', color: '#414141' },
]

/** Figma "Completed Hikes" 1767:8813 (Recent) and "fav completed hike" 1673:3790 (Favourited). */
export default function CompletedHikes({ tab }) {
  const go = useGo()
  const [selected, setSelected] = useState(tab)

  // Prototype: the pill swaps on press, then the other screen follows 100ms later.
  useEffect(() => {
    if (selected === tab) return undefined
    const timer = setTimeout(
      () => go(selected === 'recent' ? '/profile/completed' : '/profile/completed/favourited', 'smart'),
      100,
    )
    return () => clearTimeout(timer)
  }, [selected, tab, go])

  const cards = tab === 'recent' ? [DONE.everest, DONE.grouse] : [DONE.saintMark, DONE.grouse]

  return (
    <Screen className="ch" fixed={<NavBar />}>
      <div className="ch-content">
        <BackButton onClick={() => go('/profile', tab === 'favourited' ? 'smart' : undefined)} />
        <div className="ch-header">
          <h1>Completed hikes</h1>
          <button type="button" aria-label="Profile" onClick={() => go('/profile', 'smart')}>
            <img className="ch-avatar" src={hudson} alt="" />
          </button>
        </div>
        <SegmentedTabs className="ch-tabs" tabs={TABS} value={selected} animated onChange={setSelected} />
        <div className="ch-search-row">
          <div className="ch-search">
            <img src={searchIcon} alt="" />
            <TypeField tone="faint" placeholder="Search hikes" enterKeyHint="search" />
          </div>
          <div className="ch-sort">
            <span>Sort: Difficulty</span>
            <img src={chevDown} alt="" />
          </div>
        </div>
        <p className="ch-section">Training journeys</p>
        {cards.map(([key, date]) => (
          <TrailCard key={key} id={key} date={date} />
        ))}
      </div>
    </Screen>
  )
}
