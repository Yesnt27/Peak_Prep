import { useEffect, useState } from 'react'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import SegmentedTabs from '../../components/SegmentedTabs.jsx'
import { BackButton, TypeField } from '../../components/controls.jsx'
import hudson from '../../assets/profile/hudson.jpg'
import friendA from '../../assets/profile/friend-a.jpg'
import friendB from '../../assets/profile/friend-b.jpg'
import everest from '../../assets/profile/everest.jpg'
import grouse from '../../assets/profile/grouse-grind.jpg'
import saintMark from '../../assets/profile/saint-mark.jpg'
import searchIcon from '../../assets/profile/search.svg'
import chevDown from '../../assets/icons/chev-down.svg'
import HikeCard from '../../components/HikeCard.jsx'
import './Completed.css'

// Card data as shown in Figma ("AYS" in the file is shown as "DAYS").
const HIKES = {
  everest: { image: everest, date: 'June 20, 2025', tag: 'DIFFICULT • SLOPE', title: 'Mt. Everest', place: 'Kathmandu, NPL', rating: '5.0 (303)', stats: [['130', 'KM'], ['5,545', 'M ELEV'], ['12-18', 'DAYS']] },
  grouse: { image: grouse, date: 'July 25, 2025', tag: 'MODERATE • ARDUOUS', title: 'Grouse Grind', place: 'North Van, BC', rating: '4.3 (375)', stats: [['1.9', 'KM'], ['780', 'M ELEV'], ['7-9', 'HOURS']] },
  saintMark: { image: saintMark, date: 'Dec 12, 2026', tag: 'MODERATE • FLAT', title: 'Saint Mark Summit', place: 'West Van, BC', rating: '4.8 (215)', stats: [['10', 'KM'], ['570', 'M ELEV'], ['7-9', 'HOURS']] },
}

/** The app's standard hike card, with the "With Siena & Mark" row (Figma "Hike" card 1580:2147). */
function CompletedCard({ place, ...hike }) {
  return (
    <HikeCard
      {...hike}
      location={place}
      saved
      friends
      friendsText="With Siena & Mark"
      avatars={[hudson, friendA, friendB]}
    />
  )
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

  const cards = tab === 'recent' ? [HIKES.everest, HIKES.grouse] : [HIKES.saintMark, HIKES.grouse]

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
        {cards.map((h) => (
          <CompletedCard key={h.title} {...h} />
        ))}
      </div>
    </Screen>
  )
}
