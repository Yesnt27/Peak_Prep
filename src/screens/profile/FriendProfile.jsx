import { SignIcon } from '../../components/Stepper.jsx'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { toggleFriend, useAccount } from '../../app/account.js'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import TrailCard from '../../components/TrailCard.jsx'
import Avatar from '../../components/Avatar.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import { BackButton } from '../../components/controls.jsx'
import { friendById } from '../../data/friends.js'
import './FriendProfile.css'


/**
 * Profile layout from "view-friend.png", shared by a friend's profile and the
 * user's own Profile tab. `stats`: [{ value, label, onClick? }];
 * `activities`: [hike key, date, with-text, liked]; `actions` sits under the header.
 */
export function ProfileView({
  photo,
  name,
  stats,
  level,
  hikes,
  progress,
  actions,
  section,
  activities,
  empty,
  onBack,
  onPhoto,
}) {
  return (
    <Screen className="fp" fixed={<NavBar />}>
      <div className={onBack ? 'fp-page' : 'fp-page fp-page--tab'}>
        {onBack && <BackButton className="fp-back" onClick={onBack} />}

        <header className="fp-head">
          {onPhoto ? (
            // Tapping the photo opens the phone's photo picker (Photo Library / Take Photo / Choose File).
            <label className="fp-photo-pick plus-btn">
              <Avatar className="fp-photo" src={photo} name={name} size={122} />
              <span className="fp-photo-pick__badge" aria-hidden="true">
                <SignIcon sign="plus" large />
              </span>
              <input
                type="file"
                accept="image/*"
                className="fp-photo-pick__input"
                aria-label={photo ? 'Change profile photo' : 'Add profile photo'}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) onPhoto(file)
                  e.target.value = ''
                }}
              />
            </label>
          ) : (
            <img className="fp-photo" src={photo} alt="" />
          )}
          <div className="fp-info">
            <h1 className="fp-name">{name}</h1>
            <div className="fp-stats">
              {stats.map(({ value, label, onClick }) =>
                onClick ? (
                  <button type="button" key={label} className="fp-stat fp-stat--link" onClick={onClick}>
                    <b>{value}</b>
                    {label}
                  </button>
                ) : (
                  <p key={label} className="fp-stat">
                    <b>{value}</b>
                    {label}
                  </p>
                ),
              )}
            </div>
            <div className="fp-level">
              <div className="fp-level__row">
                <span className="fp-level__name">
                  <Smile />
                  {level}
                </span>
                <span>{hikes} hikes</span>
              </div>
              <div className="fp-level__bar">
                <span style={{ width: `${progress * 100}%` }} />
              </div>
            </div>
          </div>
        </header>

        {actions}

        <div className="fp-section">{section}</div>
        <div className="fp-cards">
          {activities.length === 0 && empty}
          {activities.map(([key, date]) => (
            <TrailCard key={key + date} id={key} date={date} />
          ))}
        </div>
      </div>
    </Screen>
  )
}

/** Friend profile, one per friend: /profile/friends/:id. */
export default function FriendProfile() {
  const go = useGo()
  const friend = friendById(useParams().id)
  const location = useLocation()
  const account = useAccount()
  // Round 34: "Add friend" / "Unfriend" saves on both accounts (Friend List + friend count).
  const added = (account.friends ?? []).includes(friend?.id)
  const toggle = () => toggleFriend(friend.id)
  if (!friend) return <Navigate to="/profile/friends" replace />
  return (
    <ProfileView
      {...friend}
      onBack={() => go(location.state?.from ?? '/profile/friends', 'smart')}
      stats={[
        { value: friend.friends, label: 'Friends' },
        { value: friend.years, label: friend.years === 1 ? 'Year Exp.' : 'Years Exp.' },
      ]}
      actions={
        <button
          type="button"
          className={added ? 'fp-add fp-add--added' : 'fp-add plus-btn'}
          aria-pressed={added}
          onClick={toggle}
        >
          <SignIcon sign={added ? 'minus' : 'plus'} />
          {added ? 'Unfriend' : 'Add friend'}
        </button>
      }
      section={<h2 className="fp-section__title">Recent Activities</h2>}
    />
  )
}

function Smile() {
  return (
    <svg className="fp-smile" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 9.5c.6.9 1.5 1.4 2.5 1.4s1.9-.5 2.5-1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="6" cy="6.5" r=".8" fill="currentColor" />
      <circle cx="10" cy="6.5" r=".8" fill="currentColor" />
    </svg>
  )
}
