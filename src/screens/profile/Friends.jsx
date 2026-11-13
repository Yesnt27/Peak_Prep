import { useState } from 'react'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import { BackButton, TypeField } from '../../components/controls.jsx'
import searchIcon from '../../assets/profile/search.svg'
import divider from '../../assets/profile/search-divider.svg'
import keyboard from '../../assets/profile/keyboard.jpg'
import amber from '../../assets/friends/amber.jpg'
import eli from '../../assets/friends/eli.jpg'
import sam from '../../assets/friends/sam.jpg'
import owen from '../../assets/friends/owen.jpg'
import natalia from '../../assets/friends/natalia.jpg'
import joanna from '../../assets/friends/joanna.jpg'
import joanne from '../../assets/friends/joanne.jpg'
import john from '../../assets/friends/john.jpg'
import './Friends.css'

/** Figma "view tag gr": pale green, hover light grey (300ms). No click action. */
function ViewTag() {
  return <span className="fr-chip fr-chip--view">View</span>
}

/** Figma "add friend": hover light grey, then click selects it (green). */
function AddChip() {
  const [added, setAdded] = useState(false)
  return (
    <button
      type="button"
      className={added ? 'fr-chip fr-chip--add fr-chip--added' : 'fr-chip fr-chip--add'}
      aria-pressed={added}
      onClick={() => setAdded(!added)}
    >
      Add
    </button>
  )
}

function Person({ photo, name, sub, action }) {
  return (
    <div className="fr-person">
      <div className="fr-person__who">
        <img className="fr-person__photo" src={photo} alt="" />
        <div className="fr-person__text">
          <p className="fr-person__name">{name}</p>
          <p className="fr-person__sub">{sub}</p>
        </div>
      </div>
      {action}
    </div>
  )
}

const FRIENDS = [
  [amber, 'Amber Kenz'],
  [eli, 'Eli Eifler'],
  [sam, 'Sam Eifler'],
  [owen, 'Owen Interino'],
  [natalia, 'Natalia Wang'],
]

/** Figma "Friendlist" 1646:13323. */
export function FriendList() {
  const go = useGo()
  return (
    <Screen className="fr" fixed={<NavBar />}>
      <div className="fr-content">
        <BackButton onClick={() => go('/profile', 'smart')} />
        <div className="fr-block">
          <h1 className="fr-title">Friend list</h1>
          <div className="fr-search-block">
            <button type="button" className="fr-search" onClick={() => go('/profile/friends/search')}>
              <img src={searchIcon} alt="" />
              <span className="fr-search__placeholder">Search </span>
            </button>
            <button type="button" className="fr-add-link" onClick={() => go('/profile/friends/add')}>
              add friends
            </button>
          </div>
          <div className="fr-list">
            {FRIENDS.map(([photo, name]) => (
              <Person key={name} photo={photo} name={name} sub="Friends since 2017" action={<ViewTag />} />
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}

/**
 * Figma "Add" 2136:3603 (add friends) and 2234:4055 (friend list search):
 * the same layout with the search typed in and an iOS keyboard screenshot.
 */
function SearchResults({ title, people }) {
  const go = useGo()
  return (
    <Screen className="fr">
      <div className="fr-panel" />
      <img className="fr-divider" src={divider} alt="" />
      <div className="fr-content">
        <BackButton onClick={() => go('/profile/friends')} />
        <div className="fr-block">
          <h1 className="fr-title">{title}</h1>
          <div className="fr-search fr-search--typed">
            <img src={searchIcon} alt="" />
            <TypeField defaultValue="Joanna B" enterKeyHint="search" />
          </div>
          <div className="fr-list">
            {people.map((p) => (
              <Person key={p.name} {...p} />
            ))}
          </div>
        </div>
      </div>
      <div className="fr-keyboard">
        <img src={keyboard} alt="" />
      </div>
    </Screen>
  )
}

export function AddFriends() {
  return (
    <SearchResults
      title="Add friends"
      people={[
        { photo: joanna, name: 'Joanna Brown', sub: '>3 years of experience', action: <AddChip /> },
        { photo: joanne, name: 'Joanne Blue', sub: '>5 years experience', action: <AddChip /> },
        { photo: john, name: 'John Bo', sub: '<1 year experience', action: <AddChip /> },
      ]}
    />
  )
}

export function FriendSearch() {
  return (
    <SearchResults
      title="Friend List"
      people={[
        { photo: joanna, name: 'Christopher Nolan', sub: 'Friends since 2022', action: <ViewTag /> },
        { photo: joanne, name: 'Miley Cyrus', sub: 'Friends since 2025', action: <ViewTag /> },
        { photo: john, name: 'Bob Dylan', sub: 'Friends since 2025', action: <ViewTag /> },
      ]}
    />
  )
}
