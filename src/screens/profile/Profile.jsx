import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import hudson from '../../assets/profile/hudson.jpg'
import searchIcon from '../../assets/profile/search.svg'
import iconCompleted from '../../assets/profile/icon-completed.png'
import iconHealth from '../../assets/profile/icon-health.png'
import iconFriends from '../../assets/profile/icon-friends.png'
import iconPrivacy from '../../assets/profile/icon-privacy.png'
import roundBack from '../../assets/profile/round-back.svg'
import chevron from '../../assets/profile/chevron.svg'
import './Profile.css'

// [label, icon, route, hasHover] — Figma: the Privacy card links but has no hover state.
const CARDS = [
  ['Completed hikes', iconCompleted, '/profile/completed', true],
  ['Health Stats', iconHealth, '/profile/health', true],
  ['Friends', iconFriends, '/profile/friends', true],
  ['Privacy', iconPrivacy, '/profile/privacy', false],
]

/** Figma "Profile" 1646:13300. */
export default function Profile() {
  const go = useGo()
  return (
    <Screen className="pr" fixed={<NavBar />}>
      <h1 className="pr-title">Profile</h1>
      <div className="pr-content">
        <div className="pr-user">
          <img className="pr-user__photo" src={hudson} alt="" />
          <div className="pr-user__text">
            <p className="pr-user__name">Hudson Kemp</p>
            <p className="pr-user__exp">7+ yrs of experience</p>
          </div>
        </div>
        <div className="pr-search">
          <img src={searchIcon} alt="" />
          <span>Search </span>
        </div>
        <div className="pr-cards">
          {CARDS.map(([label, icon, to, hover]) => (
            <button
              type="button"
              key={label}
              className={hover ? 'pr-card pr-card--hover' : 'pr-card'}
              onClick={() => go(to, 'smart')}
            >
              <img src={icon} alt="" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </Screen>
  )
}

const PRIVACY = {
  Account: ['Manage Profile', 'Passwords & Security', 'Notifications', 'Language'],
  Preferences: ['About Us', 'Theme', 'Help Center', 'Contact Us'],
}

/** Figma "Frame 1410103912" (Privacy) 1646:13422. Rows: hover only, no links. */
export function Privacy() {
  const go = useGo()
  return (
    <Screen className="pr">
      <div className="pv-content">
        <button type="button" className="pv-back" aria-label="Back" onClick={() => go('/profile', 'smart')}>
          <img src={roundBack} alt="" />
        </button>
        <div className="pv-body">
          <h1 className="pv-title">Privacy</h1>
          {Object.entries(PRIVACY).map(([section, rows]) => (
            <div className="pv-section" key={section}>
              <h2 className="pv-heading">{section}</h2>
              <div className="pv-rows">
                {rows.map((row) => (
                  <div className="pv-row" key={row}>
                    <span>{row}</span>
                    <img src={chevron} alt="" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}
