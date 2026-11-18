import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import hudson from '../../assets/profile/hudson.jpg'
import iconHealth from '../../assets/profile/icon-health.png'
import iconPrivacy from '../../assets/profile/icon-privacy.png'
import { BackButton } from '../../components/controls.jsx'
import chevron from '../../assets/profile/chevron.svg'
import chevRightGreen from '../../assets/icons/chev-right-green.svg'
import { FRIENDS } from '../../data/friends.js'
import { ProfileView } from './FriendProfile.jsx'
import './Profile.css'

// Hudson's completed hikes (Figma "Completed Hikes": Recent + Favourited), newest first.
const COMPLETED = [
  ['saintMark', 'Dec 12, 2026', 'With Siena & Mark', true],
  ['grouse', 'July 25, 2025', 'With Siena & Mark', true],
  ['everest', 'June 20, 2025', 'With Siena & Mark', true],
]

/** Profile tab: the friend-profile layout for the user, with Health Stats + Settings. */
export default function Profile() {
  const go = useGo()
  return (
    <ProfileView
      photo={hudson}
      name="Hudson Kemp"
      stats={[
        { value: FRIENDS.length, label: 'Friends', onClick: () => go('/profile/friends', 'smart') },
        { value: '7+', label: 'Years Exp.' },
      ]}
      level="Advanced"
      hikes={COMPLETED.length}
      progress={0.6}
      actions={
        // Figma "profile card" style (profile.png): icon + label, hover light grey.
        <div className="pr-cards">
          <button type="button" className="pr-card pr-card--hover" onClick={() => go('/profile/health', 'smart')}>
            <img src={iconHealth} alt="" />
            <span>Health Stats</span>
          </button>
          <button type="button" className="pr-card pr-card--hover" onClick={() => go('/profile/settings', 'smart')}>
            <img src={iconPrivacy} alt="" />
            <span>Settings</span>
          </button>
        </div>
      }
      section={
        <>
          <h2 className="fp-section__title">Completed Hikes</h2>
          <button type="button" className="fp-link" onClick={() => go('/profile/completed', 'smart')}>
            <span>See all</span>
            <img src={chevRightGreen} alt="" />
          </button>
        </>
      }
      activities={COMPLETED}
    />
  )
}

const PRIVACY = {
  Account: ['Manage Profile', 'Passwords & Security', 'Notifications', 'Language'],
  Preferences: ['About Us', 'Theme', 'Help Center', 'Contact Us'],
}

/** Figma "Frame 1410103912" (Privacy) 1646:13422, titled "Settings" (Profile → Settings). Rows: hover only. */
export function Settings() {
  const go = useGo()
  return (
    <Screen className="pr">
      <div className="pv-content">
        <BackButton className="pv-back" onClick={() => go('/profile', 'smart')} />
        <div className="pv-body">
          <h1 className="pv-title">Settings</h1>
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
