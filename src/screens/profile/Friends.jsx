import { useState } from 'react'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import { BackButton, TypeField } from '../../components/controls.jsx'
import searchIcon from '../../assets/profile/search.svg'
import divider from '../../assets/profile/search-divider.svg'
import keyboard from '../../assets/profile/keyboard.jpg'
import { FRIENDS, PEOPLE, friendById } from '../../data/friends.js'
import { toggleFriend, useAccount } from '../../app/account.js'
import EmptyState from '../../components/EmptyState.jsx'
import Button from '../../components/Button.jsx'
import joanna from '../../assets/friends/joanna.jpg'
import joanne from '../../assets/friends/joanne.jpg'
import john from '../../assets/friends/john.jpg'
import './Friends.css'

/** Figma "view tag gr": pale green, hover light grey (300ms). Opens the friend's profile when given `onClick`. */
function ViewTag({ onClick }) {
  return onClick ? (
    <button type="button" className="fr-chip fr-chip--view" onClick={onClick}>
      View
    </button>
  ) : (
    <span className="fr-chip fr-chip--view">View</span>
  )
}

/**
 * Figma "add friend": hover light grey, then click selects it (green).
 * Controlled (`added` + `onToggle`) for a new account, where it really adds the friend and reads "Added".
 */
function AddChip({ added: value, onToggle }) {
  const [own, setOwn] = useState(false)
  const added = value ?? own
  return (
    <button
      type="button"
      className={added ? 'fr-chip fr-chip--add fr-chip--added' : 'fr-chip fr-chip--add'}
      aria-pressed={added}
      onClick={(e) => {
        e.stopPropagation()
        if (onToggle) onToggle()
        else setOwn(!added)
      }}
    >
      {onToggle && added ? 'Added' : 'Add'}
    </button>
  )
}

/** A person row. With `onOpen` the whole row opens their profile (the chip keeps its own action). */
function Person({ photo, name, sub, action, onOpen }) {
  const open = onOpen
    ? {
        role: 'button',
        tabIndex: 0,
        onClick: onOpen,
        onKeyDown: (e) => {
          if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            onOpen()
          }
        },
      }
    : {}
  return (
    <div className={onOpen ? 'fr-person fr-person--link' : 'fr-person'} {...open}>
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


/** Figma "Friendlist" 1646:13323. */
export function FriendList() {
  const go = useGo()
  const account = useAccount()
  const isNew = account.type === 'new'
  const mine = isNew ? (account.friends ?? []).map(friendById).filter(Boolean) : FRIENDS
  const view = (id) => go(`/profile/friends/${id}`, 'smart', '/profile/friends')
  return (
    <Screen className="fr" fixed={<NavBar />}>
      <div className="fr-content">
        <BackButton onClick={() => go('/profile', 'smart')} />
        <div className="fr-block">
          <h1 className="fr-title">Friend List</h1>
          <div className="fr-search-block">
            <button
              type="button"
              className="fr-search"
              onClick={() => go(isNew ? '/profile/friends/add' : '/profile/friends/search')}
            >
              <img src={searchIcon} alt="" />
              <span className="fr-search__placeholder">Search </span>
            </button>
            <button type="button" className="fr-add-link" onClick={() => go('/profile/friends/add')}>
              add friends
            </button>
          </div>
          <div className="fr-list">
            {/* A new account starts with no friends. */}
            {mine.length === 0 && (
              <EmptyState title="No friends yet" text="Add friends to train and hike together.">
                <Button onClick={() => go('/profile/friends/add')}>Add friends</Button>
              </EmptyState>
            )}
            {mine.map((f) => (
              <Person
                key={f.id}
                photo={f.photo}
                name={f.name}
                sub={isNew ? `${f.years} ${f.years === 1 ? 'year' : 'years'} of experience` : f.since}
                onOpen={() => view(f.id)}
                action={
                  <ViewTag
                    onClick={(e) => {
                      e.stopPropagation()
                      view(f.id)
                    }}
                  />
                }
              />
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

/** Add friends for a new account: real search over everyone, Add / Added, rows open profiles. */
function FindFriends() {
  const go = useGo()
  const account = useAccount()
  const [query, setQuery] = useState('')
  const friends = account.friends ?? []
  const people = PEOPLE.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
  return (
    <Screen className="fr" fixed={<NavBar />}>
      <div className="fr-content">
        <BackButton onClick={() => go('/profile/friends', 'smart')} />
        <div className="fr-block">
          <h1 className="fr-title">Add friends</h1>
          <div className="fr-search fr-search--typed">
            <img src={searchIcon} alt="" />
            <TypeField
              placeholder="Search by name"
              enterKeyHint="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search people"
            />
          </div>
          <div className="fr-list">
            {people.length === 0 && <EmptyState title="No one found" text="Try another name." />}
            {people.map((p) => (
              <Person
                key={p.id}
                photo={p.photo}
                name={p.name}
                sub={`${p.years} ${p.years === 1 ? 'year' : 'years'} of experience`}
                onOpen={() => go(`/profile/friends/${p.id}`, 'smart', '/profile/friends/add')}
                action={<AddChip added={friends.includes(p.id)} onToggle={() => toggleFriend(p.id)} />}
              />
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}

export function AddFriends() {
  const isNew = useAccount().type === 'new'
  if (isNew) return <FindFriends />
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
