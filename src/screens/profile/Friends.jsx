import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BottomSheet from '../../components/BottomSheet.jsx'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import { BackButton, TypeField } from '../../components/controls.jsx'
import searchIcon from '../../assets/profile/search.svg'
import { PEOPLE, friendById } from '../../data/friends.js'
import { toggleFriend, useAccount } from '../../app/account.js'
import EmptyState from '../../components/EmptyState.jsx'
import Button from '../../components/Button.jsx'
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
  const all = (account.friends ?? []).map(friendById).filter(Boolean)
  // Round 32: the search bar types in place (the phone keyboard opens) and filters this list.
  const [query, setQuery] = useState('')
  // /profile/friends?add=1 (old /profile/friends/add links) opens the Add friends sheet.
  const [adding, setAdding] = useState(useSearchParams()[0].has('add'))
  const q = query.trim().toLowerCase()
  const mine = q ? all.filter((f) => f.name.toLowerCase().includes(q)) : all
  const view = (id) => go(`/profile/friends/${id}`, 'smart', '/profile/friends')
  return (
    <Screen className="fr" fixed={<NavBar />}>
      <div className="fr-content">
        <BackButton onClick={() => go('/profile', 'smart')} />
        <div className="fr-block">
          <h1 className="fr-title">Friend List</h1>
          <div className="fr-search-block">
            <label className="fr-search fr-search--typed">
              <img src={searchIcon} alt="" />
              <TypeField
                placeholder="Search"
                enterKeyHint="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search friends"
              />
            </label>
            <button type="button" className="fr-add-link" onClick={() => setAdding(true)}>
              add friends
            </button>
          </div>
          <div className="fr-list">
            {/* A new account starts with no friends. */}
            {q && mine.length === 0 && <p className="fr-none">No friends with that name found</p>}
            {!q && mine.length === 0 && (
              <EmptyState title="No friends yet" text="Add friends to train and hike together.">
                <Button onClick={() => setAdding(true)}>Add friends</Button>
              </EmptyState>
            )}
            {mine.map((f) => (
              <Person
                key={f.id}
                photo={f.photo}
                name={f.name}
                sub={!isNew && f.since ? f.since : `${f.years} ${f.years === 1 ? 'year' : 'years'} of experience`}
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
      {adding && <AddFriendsSheet open onClose={() => setAdding(false)} />}
    </Screen>
  )
}

/**
 * Round 33: Add friends is a pull-down sheet over the Friend List (was its own page), with the
 * same person rows, a search that filters by name and no text under it. "Add" saves the friend
 * on both accounts (Round 34): the Friend List and the Profile friend count update.
 */
function AddFriendsSheet({ open, onClose }) {
  const go = useGo()
  const account = useAccount()
  const [query, setQuery] = useState('')
  const friends = account.friends ?? []
  const q = query.trim().toLowerCase()
  // Round 34: people you aren't friends with yet (both accounts); "Add" saves them right away.
  const [shown] = useState(() => PEOPLE.filter((p) => !friends.includes(p.id)).map((p) => p.id))
  const people = PEOPLE.filter((p) => shown.includes(p.id) && p.name.toLowerCase().includes(q))
  const close = () => {
    setQuery('')
    onClose()
  }
  return (
    <BottomSheet open={open} title="Add friends" onClose={close} onSearch={setQuery}>
      <div className="fr-list">
        {people.length === 0 && <p className="fr-none">No one with that name found</p>}
        {people.map((p) => (
          <Person
            key={p.id}
            photo={p.photo}
            name={p.name}
            sub={`${p.years} ${p.years === 1 ? 'year' : 'years'} of experience`}
            onOpen={() => go(`/profile/friends/${p.id}`, 'smart', '/profile/friends')}
            action={<AddChip added={friends.includes(p.id)} onToggle={() => toggleFriend(p.id)} />}
          />
        ))}
      </div>
    </BottomSheet>
  )
}
