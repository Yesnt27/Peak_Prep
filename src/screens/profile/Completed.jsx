import { useState } from 'react'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import { BackButton, TypeField } from '../../components/controls.jsx'
import hudson from '../../assets/profile/hudson.jpg'
import searchIcon from '../../assets/profile/search.svg'
import { SortMenu, sortCards } from '../home/Home.jsx'
import TrailCard from '../../components/TrailCard.jsx'
import { HIKES } from '../../data/hikes.js'
import './Completed.css'

// Completed hikes (Figma "Completed Hikes" cards): [hike key, date].
const DONE = {
  everest: ['everest', 'June 20, 2025'],
  grouse: ['grouse', 'July 25, 2025'],
  saintMark: ['saintMark', 'Dec 12, 2026'],
}

/**
 * Figma "Completed Hikes" 1767:8813. Round 36: one page with every completed hike (newest first);
 * the Recent / Favourited bar and the favourited page are gone. Sort works like Home's.
 */
export default function CompletedHikes() {
  const go = useGo()
  const [sort, setSort] = useState(null)
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  // Round 37: the search bar filters by hike name; sort reorders what's left.
  const cards = sortCards(
    [DONE.saintMark, DONE.grouse, DONE.everest]
      .map(([hike, date]) => ({ hike, date }))
      .filter(({ hike }) => HIKES[hike].title.toLowerCase().includes(q)),
    sort,
  )

  return (
    <Screen className="ch" fixed={<NavBar />}>
      <div className="ch-content">
        <BackButton onClick={() => go('/profile')} />
        <div className="ch-header">
          <h1>Completed hikes</h1>
          <button type="button" aria-label="Profile" onClick={() => go('/profile', 'smart')}>
            <img className="ch-avatar" src={hudson} alt="" />
          </button>
        </div>
        <div className="ch-search-row">
          <div className="ch-search">
            <img src={searchIcon} alt="" />
            <TypeField tone="faint" placeholder="Search hikes" enterKeyHint="search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search completed hikes" />
          </div>
          <SortMenu sort={sort} onChange={setSort} triggerClassName="ch-sort" />
        </div>
        <p className="ch-section">Training journeys</p>
        {cards.length === 0 && <p className="ch-none">No completed hikes with that name found</p>}
        {cards.map(({ hike, date }) => (
          <TrailCard key={hike} id={hike} date={date} />
        ))}
      </div>
    </Screen>
  )
}
